/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 *
 *
 *
 * $Date$
 * $Revision$
 * $Author$
 *
 * TEMPLATE VERSION :  76463
 */

/* eslint-disable */
import { Service } from 'typedi';
import MyConditionBook from '../repositories/postgres/MyConditionBook';
import PostDataShareReqDto from '../resources/dto/PostDataShareReqDto';
import DataShareServiceDto from './dto/DataShareServiceDto';
import GetSharedDefinition from '../resources/dto/GetSharedDefinition';
import Operator from '../resources/dto/OperatorReqDto';
import OperatorDomain from '../domains/OperatorDomain';
import { getConnection, IsNull } from 'typeorm';
import UserIdCooperate from '../repositories/postgres/UserIdCooperate';
/* eslint-enable */
import Config from '../common/Config';
import CatalogService from './CatalogService';
import CatalogDto from './dto/CatalogDto';
import EntityOperation from '../repositories/EntityOperation';
import DataOperation from '../repositories/postgres/DataOperation';
import DataOperationDataType from '../repositories/postgres/DataOperationDataType';
import AppError from '../common/AppError';
import { ResponseCode } from '../common/ResponseCode';
import { connectDatabase } from '../common/Connection';
import GetDataShareResDto from '../resources/dto/GetDataShareResDto';
import { applicationLogger } from '../common/logging';
import CTokenLedgerService from './CTokenLedgerService';
import CTokenLedgerDto from './dto/CTokenLedgerDto';
import PermissionAnalyzer, { IDataShareObject } from '../common/PermissionAnalyzer';
import { IDataOperationRequest } from '../common/DataOperationRequest';
import { CodeObject } from '../resources/dto/PostBookOpenReqDto';
import { Condition, IShareTriggerCatalog } from '../domains/catalog/Catalogs';
import PostDataSharePermissionResDto, { Permission } from '../resources/dto/PostDataSharePermissionResDto';
const config = Config.ReadConfig('./config/config.json');
const message = Config.ReadConfig('./config/message.json');

@Service()
export default class DataShareService {
    /**
     * データ共有定義取得（個人）
     * @param dto
     * リファクタ履歴
     *  separate : setData（共通処理のため）
     *  separate : createResponseElement（レスポンスデータ作成処理）
     *  separate : setResEle（レスポンスデータ設定処理）
     */
    public async getDataShareInd (dto: DataShareServiceDto): Promise<any> {
        // dtoから扱いやすいように値を取り出す
        const operator = dto.operator;
        const request = dto.request as GetSharedDefinition;

        // ブックを取得
        const book = await EntityOperation.isPxrIdExists(operator.getPxrId());
        // ブックが取得できなかった場合
        if (!book) {
            throw new AppError(message.NOT_EXIST_BOOK, ResponseCode.UNAUTHORIZED);
        }

        const res: GetDataShareResDto[] = [];
        // 対象のデータ操作定義を取得
        const dataOperations = await EntityOperation.getShareDataOperationsByBookId(book.id, request.app, null);
        if (!dataOperations || dataOperations.length === 0) {
            return res;
        }
        const dataOperationCatalogCodes: {
            _code: {
                _value: number,
                _ver: number
            }
        }[] = [];
        for (const dataOperation of dataOperations) {
            const reqEle = {
                _code: {
                    _value: dataOperation.operationCatalogCode,
                    _ver: dataOperation.operationCatalogVersion
                }
            };
            dataOperationCatalogCodes.push(reqEle);
        }
        // カタログ取得データオブジェクトを生成
        const catalogDto = new CatalogDto();
        catalogDto.setUrl(config['catalogUrl']);
        catalogDto.setRequest(dataOperationCatalogCodes);
        catalogDto.setOperator(operator);
        catalogDto.setMessage(message);
        const operationCatalogs = await new CatalogService().getCatalogInfos(catalogDto);
        if (!operationCatalogs || !Array.isArray(operationCatalogs)) {
            throw new AppError(message.FAILED_CATALOG_GET, ResponseCode.INTERNAL_SERVER_ERROR);
        }

        for (const dataOperation of dataOperations) {
            const shareCatalog = operationCatalogs.find(ele =>
                Number(ele['catalogItem']['_code']['_value']) === dataOperation.operationCatalogCode &&
                Number(ele['catalogItem']['_code']['_ver']) === dataOperation.operationCatalogVersion
            );
            if (!shareCatalog) {
                // Shareカタログが取得できなければ次へ
                continue;
            }
            const dataTypes = await EntityOperation.getDataOperationDataTypeByDataOperationId(dataOperation.id);
            for (const dataType of dataTypes) {
                if (!dataType.consentFlg) {
                    continue;
                }
                // resに同じuuidが存在するか確認
                let resEle = res.find(ele =>
                    ele.shareCatalogId === dataType.catalogUuid
                );
                if (resEle) {
                    // あれば、そのuuidに対して操作
                    let event;
                    if (resEle.event && Array.isArray(resEle.event)) {
                        event = resEle.event.find(ele =>
                            ele._code._value === dataType.eventCatalogCode &&
                            ele._code._ver === dataType.eventCatalogVersion
                        );
                    }
                    if (event) {
                        // レスポンスに設定済みのイベントデータの場合
                        // 各データを設定する
                        await this.setData(dataType, shareCatalog, event, resEle);
                    } else {
                        // レスポンスに未設定のイベントデータの場合
                        const resData: any = {
                            document: [],
                            thing: []
                        };
                        const resEvent: any = {
                            thing: []
                        };
                        // データ取得
                        await this.setData(dataType, shareCatalog, resEvent, resData);
                        // 取得したデータをレスポンスに設定
                        this.setResEle(resData, resEle, resEvent, dataType);
                    }
                } else {
                    // なければ新規追加
                    resEle = this.createResponseElement(resEle, dataOperation, dataType);
                    const resData: any = {
                        document: [],
                        thing: []
                    };
                    const resEvent: any = {
                        thing: []
                    };
                    // データ取得
                    await this.setData(dataType, shareCatalog, resEvent, resData);
                    // 取得したデータをレスポンスに設定
                    this.setResEle(resData, resEle, resEvent, dataType);
                    res.push(resEle);
                }
            }
        }
        return res;
    }

    /**
     * レスポンスデータ設定
     * @param resData
     * @param resEle
     * @param resEvent
     * @param dataType
     */
    private setResEle (resData: any, resEle: GetDataShareResDto, resEvent: any, dataType: DataOperationDataType) {
        if (resData.document.length > 0) {
            resEle.document = resData.document;
        }
        if (resEvent.thing.length > 0) {
            resEle.event = resEle.event || [];
            resEle.event.push(
                {
                    _code: {
                        _value: dataType.eventCatalogCode,
                        _ver: dataType.eventCatalogVersion
                    },
                    thing: resEvent.thing
                }
            );
        }
        if (resData.thing.length > 0) {
            resEle.thing = resData.thing;
        }
    }

    /**
     * レスポンスデータ作成
     * @param resEle
     * @param dataOperation
     * @param dataType
     * @returns
     */
    private createResponseElement (resEle: GetDataShareResDto, dataOperation: DataOperation, dataType: DataOperationDataType) {
        resEle = new GetDataShareResDto();
        resEle.id = dataOperation.id;
        resEle.actor = {
            _value: dataOperation.actorCatalogCode,
            _ver: dataOperation.actorCatalogVersion
        };
        if (dataOperation.appCatalogCode) {
            resEle.app = {
                _value: dataOperation.appCatalogCode,
                _ver: dataOperation.appCatalogVersion
            };
            resEle.wf = null;
        }
        resEle.share = {
            _value: dataOperation.operationCatalogCode,
            _ver: dataOperation.operationCatalogVersion
        };
        resEle.shareCatalogId = dataType.catalogUuid;
        return resEle;
    }

    /**
     * データ種取得
     * @param dataType
     * @param shareCatalog
     * @param event
     * @param resEle
     * @returns
     * リファクタ履歴
     *  inner : findCatalog（共通処理のため）
     *  inner : checkVersionAndRequireConsent（共通処理のため）
     *  inner : getCodeObj（共通処理のため）
     */
    private async setData (dataType: any, shareCatalog: any, event: any, resEle: any) {
        let docVersion = dataType.documentCatalogVersion;
        let version = dataType.thingCatalogVersion;
        while (true) {
            // 同識別子の共有定義を取得
            const shares: any[] = shareCatalog['template']['share'];
            const share = shares.find(ele =>
                ele['id'] === dataType.catalogUuid
            );
            const catalogEvent = findCatalog(share, dataType.eventCatalogCode, dataType.eventCatalogVersion, 'event');
            if (catalogEvent) {
                // 対象イベントコードが共有定義内に存在した場合
                const catalogThing = findCatalog(catalogEvent, dataType.thingCatalogCode, version, 'thing');
                if (catalogThing) {
                    // 対象モノコードがイベント内に存在した場合、モノを設定
                    if (checkVersionAndRequireConsent(version, dataType.thingCatalogVersion, catalogThing['requireConsent'])) {
                        // 未同意もしくはバージョンが異なる場合、処理を終了する
                        break;
                    }
                    event.thing.push(getCodeObj(dataType.thingCatalogCode, dataType.thingCatalogVersion));
                    version++;
                } else {
                    break;
                }
            } else {
                const catalogThing = findCatalog(share, dataType.thingCatalogCode, version, 'thing');
                if (catalogThing) {
                    // 対象モノコードが共有定義内に存在した場合、モノを設定
                    if (checkVersionAndRequireConsent(version, dataType.thingCatalogVersion, catalogThing['requireConsent'])) {
                        // 未同意もしくはバージョンが異なる場合、処理を終了する
                        break;
                    }
                    if (!resEle.thing || !Array.isArray(resEle.thing)) {
                        resEle.thing = [];
                    }
                    resEle.thing.push(getCodeObj(dataType.thingCatalogCode, dataType.thingCatalogVersion));
                    version++;
                } else {
                    const catalogDoc = findCatalog(share, dataType.documentCatalogCode, docVersion, 'document');
                    if (catalogDoc) {
                        // 対象ドキュメントコードが共有定義内に存在した場合、ドキュメントを設定
                        if (checkVersionAndRequireConsent(docVersion, dataType.documentCatalogVersion, catalogDoc['requireConsent'])) {
                            // 未同意もしくはバージョンが異なる場合、処理を終了する
                            break;
                        }
                        if (!resEle.document || !Array.isArray(resEle.document)) {
                            resEle.document = [];
                        }
                        resEle.document.push(getCodeObj(dataType.documentCatalogCode, dataType.documentCatalogVersion));
                        docVersion++;
                    } else {
                        break;
                    }
                }
            }
        }
        return event;
        // バージョン、同意チェック
        function checkVersionAndRequireConsent (currentVer: number, targetVer: number, requireConsent: boolean) {
            return currentVer !== targetVer && requireConsent;
        }
        // カタログのデータ種一覧の中から対象コードのものを返却
        function findCatalog (catalog: any, _value: number, _ver: number, type: 'document' | 'event' | 'thing') {
            const dataTypeList: any[] = catalog[type] ? catalog[type] : [];
            const target = dataTypeList.find(ele =>
                Number(ele['code']['_value']) === _value &&
                Number(ele['code']['_ver']) === _ver
            );
            return target;
        }
        // コードオブジェクト取得
        function getCodeObj (_value: number, _ver: number) {
            return {
                _code: {
                    _value: _value,
                    _ver: _ver
                }
            };
        }
    }

    /**
     * 共有可否判定
     * @param storePermissionDto
     */
    public async checkDataSharePermission (dto: DataShareServiceDto): Promise<PostDataSharePermissionResDto> {
        const appCode = dto.appCode ? dto.appCode : null;
        const wfCode = dto.wfCode ? dto.wfCode : null;
        const assetCode = appCode || wfCode;
        // pxrId取得
        const book = await EntityOperation.getConditionBookRecordFromUser(dto.userId, dto.actorCode, appCode, wfCode);
        if (!book || book.length === 0) {
            throw new AppError(message.CAN_NOT_FIND_BOOK, ResponseCode.BAD_REQUEST);
        }
        const pxrId = book[0].pxrId;

        const catalogService = new CatalogService();
        // analyzerインスタンス生成、有効な共有定義の特定
        const analyzer = PermissionAnalyzer
            .create(dto.operator, EntityOperation.agreementAccessor, catalogService.catalogAccessor, catalogService.shareRestrictionAccessor)
            .setDataOperationType('SHARE_CONTINUOUS');
        await analyzer.setAgreement(pxrId, 'SHARE_CONTINUOUS', null);
        await analyzer.setAssetCatalog();
        await analyzer.specifyTarget();

        if (!dto.isTriggerRequest) {
            // 共有トリガーからのリクエストでなければ、analyzerによる通常の共有可否判定を行う
            const { permission: isAllPermitted, permissionResults } = await this.checkPermissionByAnalyzer(analyzer, dto, pxrId, assetCode);
            // レスポンス生成
            const res = new PostDataSharePermissionResDto();
            if (isAllPermitted) {
                // 可判定
                res.setCheckResult(true);
                res.setPermission(permissionResults);
            } else {
                // 不可判定
                res.setCheckResult(false);
                res.setPermission(null);
            }
            return res;
        } else {
            // 共有トリガーからのリクエストの場合、共有トリガーによる共有可否判定を行う
            if (!dto.sourceActorCode) {
                // 共有トリガーからのリクエストの場合、共有元アクター指定が無ければエラー
                throw new AppError(message.REQUIRE_SOURCE_ACTOR_FOR_SHARE_TRIGGER, ResponseCode.BAD_REQUEST);
            }
            const assets = analyzer.getAsset();
            const shareToAsset = assets.get(assetCode);
            const validShares = shareToAsset.validShare;
            const checkResult = await this.checkPermissionByTrigger(validShares, dto);
            const res = new PostDataSharePermissionResDto();
            if (checkResult) {
                // 共有元アクター、共有可データ種の情報はリクエストから取得
                res.setCheckResult(true);
                res.setPermission([
                    {
                        sourceActorCode: dto.sourceActorCode,
                        document: dto.document,
                        event: dto.event,
                        thing: dto.thing
                    }
                ]);
            } else {
                res.setCheckResult(false);
                res.setPermission(null);
            }
        }
    }

    /**
     * analyzerによる通常の共有可否判定
     * @param analyzer analyzerインスタンス
     * @param dto 共有可否判定APIのDto
     * @param pxrId 対象個人のPXR-ID
     * @param assetCode 共有先アセットコード
     * @returns isAllPermitted: 共有可否判定結果, permissionResults: 共有元アクターごとの共有可データ種情報
     */
    private async checkPermissionByAnalyzer (analyzer: PermissionAnalyzer, dto: DataShareServiceDto, pxrId: string, assetCode: number): Promise<{ permission: boolean, permissionResults: Permission[]}> {
        // 共有リクエストにeventが含まれる場合、共有定義で配下に設定されているthingを取得する
        let extendEveThings: CodeObject[] = [];
        if (dto.event && dto.event.length > 0) {
            const assets = analyzer.getAsset();
            const shareToAsset = assets.get(assetCode);
            const validShares = shareToAsset.validShare;
            if (!validShares || validShares.size === 0) {
                // 共有先アセットに有効な共有定義カタログがない場合は不可判定
                return { permission: false, permissionResults: null };
            }
            extendEveThings = await this.getExtendTargetEveThings(validShares, dto.event, dto.thing);
        }

        // リクエストの各データ種について、共有可否判定を行う
        // analyzerによる可否判定のリクエストテンプレート生成
        const permissionRequest: IDataOperationRequest = {
            pxrId: pxrId,
            operationType: 'SHARE_CONTINUOUS',
            storedBy: dto.sourceActorCode
                ? {
                    actor: dto.sourceActorCode,
                    asset: dto.sourceAssetCode
                }
                : null,
            shareTo: {
                actor: dto.actorCode,
                asset: assetCode
            },
            dataType: null
        };

        // 共有可否判定収集用配列を定義
        const permissionResults: {
            type: 'document' | 'event' | 'thing',
            code: CodeObject,
            sourceActorList: number[]
        }[] = [];
        // リクエストのドキュメントについて共有可否判定
        if (dto.document && dto.document.length > 0) {
            for (const targetDocument of dto.document) {
                const { isPermitted, sourceActorList } = await this.checkPermission(analyzer, permissionRequest, pxrId, dto.operator, dto.sourceActorCode, 'document', targetDocument);
                if (isPermitted) {
                    permissionResults.push({
                        type: 'document',
                        code: targetDocument,
                        sourceActorList: sourceActorList
                    });
                }
            }
        }
        // リクエストのイベントについて共有可否判定
        if (dto.event && dto.event.length > 0) {
            for (const targetEvent of dto.event) {
                const { isPermitted, sourceActorList } = await this.checkPermission(analyzer, permissionRequest, pxrId, dto.operator, dto.sourceActorCode, 'event', targetEvent);
                if (isPermitted) {
                    permissionResults.push({
                        type: 'event',
                        code: targetEvent,
                        sourceActorList: sourceActorList
                    });
                }
            }
        }
        // イベント配下のモノについて共有可否判定
        if (extendEveThings.length > 0) {
            for (const extendEveThing of extendEveThings) {
                const { isPermitted, sourceActorList } = await this.checkPermission(analyzer, permissionRequest, pxrId, dto.operator, dto.sourceActorCode, 'thing', extendEveThing);
                if (isPermitted) {
                    permissionResults.push({
                        type: 'thing',
                        code: extendEveThing,
                        sourceActorList: sourceActorList
                    });
                }
            }
        }
        // リクエストのモノについて共有可否判定
        if (dto.thing && dto.thing.length > 0) {
            for (const targetThing of dto.thing) {
                const { isPermitted, sourceActorList } = await this.checkPermission(analyzer, permissionRequest, pxrId, dto.operator, dto.sourceActorCode, 'thing', targetThing);
                if (isPermitted) {
                    permissionResults.push({
                        type: 'thing',
                        code: targetThing,
                        sourceActorList: sourceActorList
                    });
                }
            }
        }

        // 各データ種の判定結果から、共有元アクターごとの共有可データ種リストを作成
        const permissionList: Permission[] = [];
        for (const permissionResult of permissionResults) {
            for (const sourceActor of permissionResult.sourceActorList) {
                const targetSourceActor = permissionList.find((ele) => ele.sourceActorCode === sourceActor);
                if (targetSourceActor) {
                    targetSourceActor[permissionResult.type].push(permissionResult.code);
                } else {
                    permissionList.push({
                        sourceActorCode: sourceActor,
                        document: permissionResult.type === 'document' ? [permissionResult.code] : [],
                        event: permissionResult.type === 'event' ? [permissionResult.code] : [],
                        thing: permissionResult.type === 'thing' ? [permissionResult.code] : []
                    });
                }
            }
        }
        if (permissionList.length === 0) {
            // 全てのデータ種において不可判定、または全てのデータ種において共有可能な共有元アクターが0件の場合は不可判定とする
            return { permission: false, permissionResults: null };
        }
        return { permission: true, permissionResults: permissionList };
    }

    /**
     * 共有トリガーカタログの開始/終了判定条件に、リクエストの各データ種が全て含まれるか判定する
     * @param condition トリガー定義カタログの開始または終了判定条件
     * @param document リクエストのドキュメントリスト
     * @param event リクエストのイベントリスト
     * @param thing リクエストのモノリスト
     * @returns 判定結果
     */
    private checkTriggerCondition (condition: Condition, document: CodeObject[], event: CodeObject[], thing: CodeObject[]) {
        if (document && document.length > 0) {
            if (!this.checkTriggerConditionDataType(condition, 'document', document)) {
                return false;
            }
        }
        if (event && event.length > 0) {
            if (!this.checkTriggerConditionDataType(condition, 'event', event)) {
                return false;
            }
        }
        if (thing && thing.length > 0) {
            if (!this.checkTriggerConditionDataType(condition, 'thing', thing)) {
                return false;
            }
        }
        return true;
    }

    /**
     * 判定条件に対象データ種リストの要素が全て含まれるか判定する
     * @param condition トリガー定義カタログの開始または終了判定条件
     * @param type 判定対象データ種別
     * @param dataTypeList 判定対象データ種リスト
     * @returns 判定結果
     */
    private checkTriggerConditionDataType (condition: Condition, type: 'document' | 'event' | 'thing', dataTypeList: CodeObject[]): boolean {
        const conditionDataType = condition[type] && condition[type].length > 0 ? condition[type] : null;
        if (conditionDataType) {
            for (const dataType of dataTypeList) {
                const isExist = conditionDataType.some((ele) => ele._value === dataType._value && ele._ver === dataType._ver);
                if (!isExist) {
                    // 不可判定
                    return false;
                }
            }
        } else {
            // 不可判定
            return false;
        }
        // 全てのリクエストデータ種が判定条件データ種リストに含まれれば可判定
        return true;
    }

    /**
     * 共有トリガーの開始・終了判定時の共有可否判定
     * @param validShares 共有先アセットの有効な共有定義マップ
     * @param dto 共有可否判定リクエストDto
     * @returns 共有可否判定結果
     */
    private async checkPermissionByTrigger (validShares: Map<number, IDataShareObject>, dto: DataShareServiceDto): Promise<boolean> {
        for (const [, validShare] of validShares) {
            // 共有先アセットの有効な共有定義オブジェクトそれぞれについて、紐づいている共有トリガー定義があれば判定を行う
            if (validShare.storeEventNotificate && validShare.storeEventNotificate.size > 0) {
                for (const [, storeEventNotificates] of validShare.storeEventNotificate) {
                    if (storeEventNotificates && storeEventNotificates.size > 0) {
                        // 蓄積イベント通知定義カタログコードが一致するマップの各要素について、種別と定義カタログコード情報は変わらないため、１番目の要素に対してのみ処理を行う
                        const storeEvent = storeEventNotificates.values[0];
                        if (storeEvent.type === 'share-trigger') {
                            // カタログサービスから共有トリガー定義カタログを取得
                            const catalogService = new CatalogService();
                            const catalogDto = new CatalogDto();
                            catalogDto.setUrl(config['catalogUrl']);
                            catalogDto.setMessage(message);
                            catalogDto.setOperator(dto.operator);
                            catalogDto.setCode(storeEvent.notificationCatalogCode._value);
                            catalogDto.setVersion(storeEvent.notificationCatalogCode._ver);
                            const triggerCatalog = await catalogService.getCatalogInfo(catalogDto) as IShareTriggerCatalog;
                            const startCondition = triggerCatalog.template.startCondition;
                            const endCondition = triggerCatalog.template.endCondition;

                            // 開始判定、終了判定に対してリクエストのコードがあるかどうかチェック
                            // 開始判定の中に全部そろってるか、あるいは終了判定の中に全部そろってるかを確認する
                            const checkStartCondition = this.checkTriggerCondition(startCondition, dto.document, dto.event, dto.thing);
                            const checkEndCondition = this.checkTriggerCondition(endCondition, dto.document, dto.event, dto.thing);

                            if (checkStartCondition || checkEndCondition) {
                                // 開始判定条件、終了判定条件のいずれかが可判定の場合、可判定を返す
                                return true;
                            }
                        }
                    }
                }
            }
        }
        // ループ終了後、どの共有トリガー定義でも可判定が出なかった場合は不可判定を返す
        return false;
    }

    /**
     * 追加判定対象となるイベント配下のモノを取得する
     * @param validShares 共有先アセットの有効な共有定義オブジェクトリスト
     * @param event リクエストのイベント配列
     * @param thing リクエストのモノ配列
     * @returns 追加判定対象のイベント配下モノリスト
     */
    private async getExtendTargetEveThings (validShares: Map<number, IDataShareObject>, event: CodeObject[], thing: CodeObject[]): Promise<CodeObject[]> {
        let targetEveThings: CodeObject[] = [];
        // リクエストのイベント配列の各要素についてチェック
        for (const targetEvent of event) {
            // 共有先アセットの有効な共有定義カタログそれぞれを調べる
            for (const [, validShareObject] of validShares) {
                const shareCatalog = validShareObject.shareCatalog;
                // 有効な共有定義カタログの各share配列について、リクエストのeventと一致する要素があるかチェック
                for (const share of shareCatalog.template.share) {
                    if (share.event && share.event.length > 0) {
                        const eventShareDefinition = share.event.find((ele) => ele.code._value === targetEvent._value && ele.code._ver === targetEvent._ver);
                        // 一致するeventがある場合、その配下のthingをチェック対象に追加
                        // 既に同じthingがチェック対象に入っている場合はスキップ
                        if (eventShareDefinition && eventShareDefinition.thing && eventShareDefinition.thing.length > 0) {
                            for (const targetThing of eventShareDefinition.thing) {
                                if (targetEveThings.some((ele) => ele._value === targetThing.code._value && ele._ver === targetThing.code._ver)) {
                                    continue;
                                } else {
                                    targetEveThings.push({
                                        _value: targetThing.code._value,
                                        _ver: targetThing.code._ver
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }

        // リクエストにthingも指定されている場合、targetThingをeveThingだけにあるthing（必須でないthing）のみにフィルタする
        if (thing && thing.length > 0) {
            for (const targetThing of thing) {
                targetEveThings = targetEveThings.filter((ele) => !(ele._value === targetThing._value && ele._ver === targetThing._ver));
            }
        }
        return targetEveThings;
    }

    /**
     * データ種ごとに可否判定を行う
     * @param analyzer analyzerインスタンス
     * @param permissions 共有元アクターごとの共有可データ種情報
     * @param permissionRequest analyzerの可否判定リクエストテンプレート
     * @param pxrId 対象個人PXR-ID
     * @param operator 実行オペレータ情報
     * @param sourceActorCode リクエストで指定された共有元アクターコード
     * @param targetType 対象データ種別
     * @param targetData 対象データ種コード・バージョン情報
     * @returns isPermitted: 判定結果, permissions: 共有元アクターごとの共有可データ種情報
     */
    private async checkPermission (analyzer: PermissionAnalyzer, permissionRequest: IDataOperationRequest, pxrId: string, operator: Operator, sourceActorCode: number, targetType: 'document' | 'event' | 'thing', targetData: CodeObject): Promise<{isPermitted: boolean, sourceActorList: number[]}> {
        let isPermitted = true;
        let sourceActorList: number[] = [];
        // リクエスト生成
        permissionRequest.dataType = {
            type: targetType,
            code: targetData
        };
        // 判定
        const isPermittedResult = await analyzer.isPermitted(permissionRequest);
        if (!isPermittedResult.checkResult) {
            // analyzerでの判定結果が不可の場合、不可判定を返却
            isPermitted = false;
        } else {
            // 判定レスポンスのsourceActor, prohibitedSourceActorの情報、およびリクエストの共有元指定から共有元アクターを特定
            sourceActorList = await this.specifySourceActorList(isPermittedResult.sourceActor, isPermittedResult.prohibitedSourceActor, operator, sourceActorCode, pxrId, targetType, targetData);
        }
        return { isPermitted, sourceActorList };
    }

    /**
     * 共有元アクターの特定
     * @param sourceActor analyzerによる共有可否判定結果の蓄積アクターリスト
     * @param prohibitedSourceActor analyzerによる共有可否判定結果の禁止アクターリスト
     * @param operator オペレータ情報
     * @param storedByActor リクエストで指定された共有元アクターコード
     * @param pxrId 対象個人のPXR-ID
     * @param targetDataType 対象データ種コード・バージョン
     * @returns 共有元アクターコードリスト
     */
    private async specifySourceActorList (sourceActor: number[], prohibitedSourceActor: number[], operator: Operator, storedByActor: number, pxrId: string, targetType: 'document' | 'event' | 'thing', targetDataType: CodeObject): Promise<number[]> {
        let sourceActorList: number[] = [];
        if (sourceActor.length > 0) {
            // 判定結果に蓄積アクター情報がある場合は、共有元アクターの候補としてそれを使用する
            sourceActorList.push(...sourceActor);
        } else {
            // なければ、対象データのcTokenから共有元アクターの候補を取得する
            const cTokenLedgerDto = new CTokenLedgerDto();
            cTokenLedgerDto.setOperator(operator);
            cTokenLedgerDto.setUrl(config['ctokenLedgerUrl']);
            cTokenLedgerDto.setPxrId(pxrId);
            cTokenLedgerDto.setType(targetType);
            cTokenLedgerDto.setData([targetDataType]);
            cTokenLedgerDto.setConfigure(config);
            cTokenLedgerDto.setMessage(message);
            const cTokenLedgerService: CTokenLedgerService = new CTokenLedgerService();
            const cTokens = await cTokenLedgerService.postCTokenSearchByData(cTokenLedgerDto);
            if (cTokens && cTokens.length > 0) {
                const cTokenActors: number[] = [];
                cTokens.forEach((ele) => cTokenActors.push(ele.actor._value));
                // 重複除去
                sourceActorList = Array.from(new Set(cTokenActors));
            } else {
                // 対象データを蓄積しているアクターが無い場合は共有元アクターなし
                // 未蓄積の状態、データ種単位で禁止されているわけでは無いので通していい
                sourceActorList = [];
            }
        }

        // 判定結果に禁止アクター情報がある場合、フィルター処理する
        if (sourceActorList.length > 0 && prohibitedSourceActor.length > 0) {
            sourceActorList = sourceActorList.filter((ele) => !prohibitedSourceActor.includes(ele));
        }
        // リクエストの共有元指定がある場合、フィルター処理する
        if (sourceActorList.length > 0 && storedByActor) {
            sourceActorList = sourceActorList.filter((ele) => ele === storedByActor);
        }
        return sourceActorList;
    }

    /**
     * データ共有定義追加
     * @param dto
     * リファクタ履歴
     *  separate : checkActorCatalog（アクター別処理）
     *  separate : insertDataShare（データ共有定義、データ種登録処理）
     *  separate : insertDataShareOperation（データ共有定義登録処理）
     */
    public async postDataShare (dto: DataShareServiceDto): Promise<any> {
        // dtoから扱いやすいように値を取り出す
        const operator = dto.operator;
        const request = dto.request as PostDataShareReqDto;

        // ブックを取得
        const book = await EntityOperation.isPxrIdExists(dto.operator.getPxrId());
        // 紐付くブックがない場合はエラー
        if (!book) {
            throw new AppError(message.CAN_NOT_FIND_BOOK, ResponseCode.BAD_REQUEST);
        }

        // リクエスト.appでカタログを取得
        const catalogDto = new CatalogDto();
        catalogDto.setOperator(operator);
        catalogDto.setMessage(message);
        await this.checkActorCatalog(catalogDto, request);
        const catalogService: CatalogService = new CatalogService();
        const providerCatalog = await catalogService.getCatalogInfo(catalogDto);

        // 取得したカタログのtemplate.shareが空でない事を確認
        if (providerCatalog['template'] &&
            providerCatalog['template']['share'] &&
            providerCatalog['template']['share'].length <= 0
        ) {
            throw new AppError(message.NOT_SHARE_CATALOG_CODE, ResponseCode.BAD_REQUEST);
        }

        // request.shareのカタログを取得
        catalogDto.setCode(request.share._value);
        catalogDto.setVersion(request.share._ver);
        const shareCatalog = await catalogService.getCatalogInfo(catalogDto);
        if (!shareCatalog || !shareCatalog['template']['share'] || !Array.isArray(shareCatalog['template']['share'])) {
            throw new AppError(message.NOT_SHARE_CATALOG_CODE, ResponseCode.BAD_REQUEST);
        }
        const shares: any[] = shareCatalog['template']['share'];

        // データ共有定義、データ種登録
        await this.insertDataShare(book, request, operator, shares);

        // レスポンスを返す
        return { result: 'success' };
    }

    /**
     * データ共有定義、データ種登録処理
     * @param book
     * @param request
     * @param operator
     * @param shares
     * リファクタ履歴
     *  inner : checkExeclude（同意判定）
     *  inner : insertDataOperationDataType（データ共有定義データ種登録）
     */
    private async insertDataShare (book: MyConditionBook, request: PostDataShareReqDto, operator: Operator, shares: any[]) {
        const connection = await connectDatabase();
        await connection.transaction(async (trans) => {
            const dataOperation = await EntityOperation.getDataOperation(
                book.id,
                request.actor._value,
                request.app ? request.app._value : null,
                null,
                request.share._value,
                true
            );
            let dataOperationId: number;
            if (dataOperation) {
                dataOperationId = dataOperation.id;
                await EntityOperation.updateDataOperationCatalogVersion(trans, dataOperationId, request.share._ver, operator.getLoginId());
                await EntityOperation.deleteDataOperationDataTypeRecord(trans, dataOperationId, operator.getLoginId());
            } else {
                // データ登録
                dataOperationId = await this.insertDataShareOperation(dataOperation, book, request, operator, trans, dataOperationId);
            }

            for (const share of shares) {
                const catalogUuid = share['id'];
                if (share['document'] && Array.isArray(share['document'])) {
                    for (const document of share['document']) {
                        let consentFlg = true;
                        if (request.excludeDocument) {
                            consentFlg = checkExeclude(request.excludeDocument, document, consentFlg);
                        }
                        await insertDataOperationDataType(catalogUuid, dataOperationId, consentFlg, trans, document, null, null);
                    }
                }
                if (share['event'] && Array.isArray(share['event'])) {
                    for (const event of share['event']) {
                        if (event['thing'] && Array.isArray(event['thing'])) {
                            for (const thing of event['thing']) {
                                let consentFlg = true;
                                if (request.excludeEvent) {
                                    const excludeEvent = request.excludeEvent.find(ele => ele.code._value === Number(event['code']['_value']) &&
                                        ele.code._ver === Number(event['code']['_ver'])
                                    );
                                    if (excludeEvent) {
                                        consentFlg = checkExeclude(excludeEvent.excludeThing, thing, consentFlg);
                                    }
                                }
                                await insertDataOperationDataType(catalogUuid, dataOperationId, consentFlg, trans, null, event, thing);
                            }
                        }
                    }
                }
                if (share['thing'] && Array.isArray(share['thing'])) {
                    for (const thing of share['thing']) {
                        let consentFlg = true;
                        if (request.excludeThing) {
                            consentFlg = checkExeclude(request.excludeThing, thing, consentFlg);
                        }
                        await insertDataOperationDataType(catalogUuid, dataOperationId, consentFlg, trans, null, null, thing);
                    }
                }
            }
        });
        // 同意チェック
        function checkExeclude (execlude: any[], dataType: any, consentFlg: boolean) {
            const exclude = execlude.find(ele => ele.code._value === Number(dataType['code']['_value']) &&
                ele.code._ver === Number(dataType['code']['_ver'])
            );
            if (exclude) {
                consentFlg = false;
            }
            return consentFlg;
        }
        // データ共有定義データ種登録
        async function insertDataOperationDataType (catalogUuid: any, dataOperationId: number, consentFlg: boolean, trans: any, document: any, event: any, thing: any) {
            const dataType = new DataOperationDataType();
            dataType.dataOperationId = dataOperationId;
            dataType.catalogUuid = catalogUuid;
            dataType.documentCatalogCode = document ? Number(document['code']['_value']) : null;
            dataType.documentCatalogVersion = document ? Number(document['code']['_ver']) : null;
            dataType.eventCatalogCode = event ? Number(event['code']['_value']) : null;
            dataType.eventCatalogVersion = event ? Number(event['code']['_ver']) : null;
            dataType.thingCatalogCode = thing ? Number(thing['code']['_value']) : null;
            dataType.thingCatalogVersion = thing ? Number(thing['code']['_ver']) : null;
            dataType.consentFlg = consentFlg;
            dataType.createdBy = operator.getLoginId();
            dataType.updatedBy = operator.getLoginId();
            await EntityOperation.insertDataOperationDataType(trans, dataType);
        }
    }

    /**
     * データ共有定義追加
     * @param dataOperation
     * @param book
     * @param request
     * @param operator
     * @param trans
     * @param dataOperationId
     * @returns
     */
    private async insertDataShareOperation (dataOperation: DataOperation, book: MyConditionBook, request: PostDataShareReqDto, operator: Operator, trans: any, dataOperationId: number) {
        dataOperation = new DataOperation();
        dataOperation.bookId = book.id;
        dataOperation.type = 'share';
        dataOperation.actorCatalogCode = request.actor._value;
        dataOperation.actorCatalogVersion = request.actor._ver;
        dataOperation.appCatalogCode = request.app._value;
        dataOperation.appCatalogVersion = request.app._ver;
        dataOperation.wfCatalogCode = null;
        dataOperation.wfCatalogVersion = null;
        dataOperation.operationCatalogCode = request.share._value;
        dataOperation.operationCatalogVersion = request.share._ver;
        dataOperation.attributes = null;
        dataOperation.createdBy = operator.getLoginId();
        dataOperation.updatedBy = operator.getLoginId();
        const ret = await EntityOperation.insertDataOperation(trans, dataOperation);
        dataOperationId = parseInt(ret.raw[0].id);
        return dataOperationId;
    }

    /**
     * リクエストコードがアクターカタログに存在するかどうかの判定処理
     * @param catalogDto
     * @param request
     * @param operator
     * リファクタ履歴
     *  inner : checkContainCode（共通処理のため）
     */
    private async checkActorCatalog (catalogDto: CatalogDto, request: PostDataShareReqDto) {
        // リクエスト.actorでカタログを取得
        // カタログ取得データオブジェクトを生成
        catalogDto.setUrl(config['catalogUrl']);
        catalogDto.setCode(request.actor._value);
        // カタログサービスから対象カタログを取得
        const catalogService: CatalogService = new CatalogService();
        const actorCatalog = await catalogService.getCatalogInfo(catalogDto);

        // 取得したカタログのtemplate.applicationにリクエストのappが含まれているか確認
        const ns: string = actorCatalog['catalogItem'] ? actorCatalog['catalogItem']['ns'] : '';
        if (ns.indexOf('/app') >= 0 && request.app) {
            // applicationの場合
            const flg = await checkContainCode(actorCatalog, request.app._value);
            // 存在しない場合
            if (!flg) {
                throw new AppError(message.APP_CATALOG_CODE_NOT_EXIST, ResponseCode.BAD_REQUEST);
            }

            // カタログ取得のリクエストをセット
            catalogDto.setCode(request.app._value);
        } else {
            throw new AppError(message.ACTOR_CATALOG_INVALID, ResponseCode.BAD_REQUEST);
        }
        // 対象コードがアクターカタログに含まれているか
        async function checkContainCode (targetActorCatalog: any, code: number) {
            if (!targetActorCatalog['template'] || !targetActorCatalog['template']['application']) {
                throw new AppError(message.ACTOR_CATALOG_INVALID, ResponseCode.BAD_REQUEST);
            }

            // template[application]内にリクエスト[app]が存在するか確認
            const codeList = targetActorCatalog['template']['application'];
            let flg = false;
            for (const index in codeList) {
                const codeObj = codeList[index];
                if (codeObj && codeObj['_value'] === code) {
                    flg = true;
                    break;
                }
            }
            return flg;
        }
    }

    /**
     * データ共有定義削除
     * @param dto
     */
    public async deleteDataShare (dto: DataShareServiceDto): Promise<any> {
        // ブックを取得
        const book = await EntityOperation.isPxrIdExists(dto.operator.getPxrId());
        // 紐付くブックがない場合はエラー
        if (!book) {
            throw new AppError(message.CAN_NOT_FIND_BOOK, ResponseCode.BAD_REQUEST);
        }

        // データ操作定義の存在確認
        const dataShareSettings = await EntityOperation.getDataOperationRecordFromShareId(dto.shareId, book.id);
        // 存在しなければエラー
        if (!dataShareSettings) {
            throw new AppError(message.NOT_FOUND_DATA_SHARE_SETTING, ResponseCode.NOT_FOUND);
        }
        // BookIdと一致しなければエラー
        if (book.id !== dataShareSettings.bookId) {
            throw new AppError(message.NOT_FOUND_BOOK_ID_DATA_SHARE_SETTING, ResponseCode.BAD_REQUEST);
        }
        // 存在しなければエラー
        const dataTypes = await EntityOperation.getDataTypes(dto.shareId);
        if (dataTypes.length === 0) {
            throw new AppError(message.NOT_FOUND_DATA_TYPE, ResponseCode.NOT_FOUND);
        }

        // データ操作定義の共有情報を削除
        const connection = await connectDatabase();
        await connection.transaction(async trans => {
            await EntityOperation.deleteDataOperationRecord(trans, dto.shareId, dto.operator.getLoginId());
            await EntityOperation.deleteDataOperationDataTypeRecord(trans, dto.shareId, dto.operator.getLoginId());
        });

        return { result: 'success' };
    }

    /**
     * 個人用に対し、それ以外でも取得可能な定義の処理
     * @param operator
     * @param id
     * @param wf
     * @param app
     */
    async getForAny (operator: OperatorDomain, id: string, wf?: number, app?: number, actor?: number) {
        // TODO リレーションの確認処理が必要
        let actorCode = null;
        if (actor) {
            actorCode = actor;
        } else {
            actorCode = operator.actorCode;
        }
        const cooperate = await (async () => {
            return getConnection('postgres').getRepository(UserIdCooperate).findOne({
                select: ['bookId'],
                where: {
                    userId: id,
                    appCatalogCode: app,
                    actorCatalogCode: actorCode,
                    isDisabled: false
                }
            });
        })();
        if (!cooperate) { throw new AppError(message.CAN_NOT_FIND_COOPERATE, 400); }
        const myBook = await getConnection('postgres').getRepository(MyConditionBook).findOneBy({
            id: parseInt(cooperate.bookId + ''),
            isDisabled: false
        });
        if (!myBook) { throw new AppError(message.CAN_NOT_FIND_BOOK, 400); }
        const dataOperateDefinitions = await (async () => {
            return getConnection('postgres').getRepository(DataOperation).find({
                where: {
                    bookId: myBook.id,
                    type: 'share',
                    appCatalogCode: app,
                    wfCatalogCode: IsNull(),
                    actorCatalogCode: actorCode,
                    isDisabled: false
                },
                order: {
                    id: 'ASC'
                }
            });
        })();
        if (!dataOperateDefinitions) { throw new AppError('', 204); }

        const data = [];
        for (const operateDefinition of dataOperateDefinitions) {
            const shares: any[] = [];
            // レスポンス生成
            const share = {
                code: {
                    _value: operateDefinition.operationCatalogCode,
                    _ver: operateDefinition.operationCatalogVersion
                }
            };
            applicationLogger.info('share: ' + JSON.stringify(share));
            shares.push(share);
            // Book運用
            data.push({
                id: parseInt(operateDefinition.id + ''),
                actor: { _value: parseInt(operateDefinition.actorCatalogCode + '') },
                app: { _value: parseInt(operateDefinition.appCatalogCode + '') },
                share: shares
            });
        }

        if (!data.length) { throw new AppError('', 204); }
        return data;
    }
}
