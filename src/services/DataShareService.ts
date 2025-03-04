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
import PostDataSharePermissionResDto, { Permission } from '../resources/dto/PostDataSharePermissionResDto';
import { IDataOperationRequest } from '../common/DataOperationRequest';
import PermissionAnalyzer, { IDataShareObject } from '../common/PermissionAnalyzer';
import { CodeObject } from 'resources/dto/PostBookOpenReqDto';
import { Condition, IShareTriggerCatalog } from 'domains/catalog/Catalogs';
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
import { OperatorType } from '../common/Operator';
import CTokenLedgerService from './CTokenLedgerService';
import CTokenLedgerDto from './dto/CTokenLedgerDto';
import UserIdCooperate from 'repositories/postgres/UserIdCooperate';
const config = Config.ReadConfig('./config/config.json');
const message = Config.ReadConfig('./config/message.json');

@Service()
export default class DataShareService {
    /**
     * データ共有定義取得
     * @param dto
     */
    public async getDataShareInd (dto: DataShareServiceDto): Promise<GetDataShareResDto[]> {
        // dtoから扱いやすいように値を取り出す
        const operator = dto.operator;
        const request = dto.request as GetSharedDefinition;
        const userId = request.id;
        const appCatalogCode = request.app;
        const wfCatalogCode = request.wf;
        let actor = null;

        // PXR-IDの特定
        let pxrId = null;
        if (operator.getType() === OperatorType.TYPE_IND) {
            // PXR-IDが取得できているか確認
            if (!operator.getPxrId()) {
                throw new AppError(message.EMPTY_PXR_ID, ResponseCode.UNAUTHORIZED);
            }
            pxrId = operator.getPxrId();

            // ブックを取得
            const book = await EntityOperation.isPxrIdExists(pxrId);
            // ブックが取得できなかった場合
            if (!book) {
                throw new AppError(message.NOT_EXIST_BOOK, ResponseCode.UNAUTHORIZED);
            }
        } else {
            // 利用者IDが設定されていない場合はエラー
            if (!userId) {
                throw new AppError(message.REQUIRED_USER_ID, 400);
            }
            if (request.actor) {
                actor = request.actor;
            } else {
                actor = operator.getActorCode();
            }
            // pxrId取得
            const book = await EntityOperation.getConditionBookRecordFromUser(userId, actor, appCatalogCode, wfCatalogCode, null, null);
            if (!book || book.length === 0) {
                throw new AppError(message.NOT_EXIST_BOOK, ResponseCode.UNAUTHORIZED);
            }
            pxrId = book[0].pxrId;
        }

        const catalogService = new CatalogService();
        // analyzerインスタンス生成、有効な共有定義の特定
        const analyzer = PermissionAnalyzer
            .create(dto.operator, EntityOperation.agreementAccessor, catalogService.catalogAccessor, catalogService.shareRestrictionAccessor)
            .setDataOperationType('SHARE_CONTINUOUS');
        await analyzer.setAgreement(pxrId, 'SHARE_CONTINUOUS', null);
        await analyzer.setAssetCatalog();
        await analyzer.specifyTarget();

        // 取得対象のアセットの特定
        const coops = await EntityOperation.getUserIdByPxrId(pxrId, actor, appCatalogCode, wfCatalogCode);
        if (!coops || coops.length === 0) {
            throw new AppError(message.CAN_NOT_FIND_COOPERATE, 400);
        }

        // レスポンスの作成
        const res: GetDataShareResDto[] = await this.createGetDataShareResponse(coops, analyzer);
        if (res.length === 0) {
            throw new AppError('', 204);
        }
        // レスポンスを返す
        return res;
    }

    /**
     * 共有定義取得のレスポンスを作成する
     * @param coops 利用者ID連携連携情報
     * @param analyzer アナライザ
     * @returns 共有定義取得のレスポンス
     */
    private async createGetDataShareResponse (coops: UserIdCooperate[], analyzer: PermissionAnalyzer): Promise<GetDataShareResDto[]> {
        const res: GetDataShareResDto[] = [];
        for (const coop of coops) {
            const assetCode = coop.appCatalogCode ? coop.appCatalogCode : coop.wfCatalogCode;
            const asset = analyzer.getAsset().get(assetCode);
            if (!asset) {
                // アセットが取得できない場合は次の連携情報へ
                continue;
            }
            // 同意情報の取得
            const agreementForAsset = analyzer.getAgreement().get(assetCode);
            if (!asset.validShare || !agreementForAsset) {
                // 有効な定義または同意がない場合は次のasset
                continue;
            }

            for (const [shareCode, shareCatalog] of asset.validShare) {
                // 共有同意の抽出
                const agreement = agreementForAsset.share.find(ele => Number(ele.target._value) === shareCatalog.shareCatalog.catalogItem._code._value
                );
                if (!agreement) {
                    // 対象の定義に同意していない場合は次の定義へ
                    continue;
                }
                // shareの単位に処理
                for (const share of shareCatalog.shareCatalog.template.share) {
                    const resEle = new GetDataShareResDto();
                    resEle.id = agreement.id;
                    resEle.actor = agreementForAsset.actor;
                    if (coop.appCatalogCode) {
                        resEle.app = agreementForAsset.asset;
                        resEle.wf = null;
                    }
                    resEle.share = shareCatalog.shareCatalog.catalogItem._code;
                    resEle.shareCatalogId = share.id;
                    resEle.document = [];
                    resEle.event = [];
                    resEle.thing = [];

                    if (share.document) {
                        for (const doc of share.document) {
                            // 共有可否判定
                            const isPermitted = await isPermittedDataType(coop, doc.code, analyzer, 'document');
                            if (isPermitted) {
                                resEle.document.push({
                                    _code: doc.code
                                });
                            }
                        }
                    }

                    if (share.event) {
                        for (const eve of share.event) {
                            const resEvent: any = { thing: [] };
                            if (eve.thing) {
                                for (const thi of eve.thing) {
                                    // 共有可否判定
                                    const isPermitted = await isPermittedDataType(coop, thi.code, analyzer, 'thing');
                                    if (isPermitted) {
                                        resEvent.thing.push({
                                            _code: thi.code
                                        });
                                    }
                                }
                                if (resEvent.thing.length > 0) {
                                    // イベントに紐づくモノが存在する場合、レスポンスに追加する
                                    resEle.event.push({
                                        _code: eve.code,
                                        thing: resEvent.thing
                                    });
                                }
                            }
                        }
                    }

                    if (share.thing) {
                        for (const thi of share.thing) {
                            // 共有可否判定
                            const isPermitted = await isPermittedDataType(coop, thi.code, analyzer, 'thing');
                            if (isPermitted) {
                                resEle.thing.push({
                                    _code: thi.code
                                });
                            }
                        }
                    }

                    if (resEle.event.length > 0 || resEle.document.length > 0 || resEle.thing.length > 0) {
                        res.push(resEle);
                    }
                }
            }
        }
        return res;

        /**
         * 対象のデータ種が共有可能かアナライザで判定する
         * @param coop 連携情報
         * @param code データ種
         * @param analyzer アナライザ
         * @param type データ種別
         * @returns 共有可否
         */
        async function isPermittedDataType (coop: UserIdCooperate, code: CodeObject, analyzer: PermissionAnalyzer, type: 'document' | 'event' | 'thing'): Promise<boolean> {
            // リクエスト生成
            const permissionRequest: IDataOperationRequest = {
                pxrId: analyzer.getPxrId(),
                operationType: 'SHARE_CONTINUOUS',
                storedBy: null,
                shareTo: {
                    actor: coop.actorCatalogCode,
                    asset: coop.appCatalogCode || coop.wfCatalogCode
                },
                dataType: {
                    type: type,
                    code: code
                }
            };
            // 蓄積可否判定
            const isPermittedResponse = await analyzer.isPermitted(permissionRequest);

            return isPermittedResponse.checkResult;
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
        const book = await EntityOperation.getConditionBookRecordFromUser(dto.userId, dto.actorCode, appCode, wfCode, null, null);
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
}
