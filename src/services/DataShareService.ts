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
        const myBook = await getConnection('postgres').getRepository(MyConditionBook).findOne({
            id: parseInt(cooperate.bookId + ''),
            isDisabled: false
        });
        if (!myBook) { throw new AppError(message.CAN_NOT_FIND_BOOK, 400); }
        const dataOperateDefinitions = await (async () => {
            return getConnection('postgres').getRepository(DataOperation).find({
                where: {
                    bookId: myBook.id,
                    type: 'share',
                    appCatalog: app,
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
