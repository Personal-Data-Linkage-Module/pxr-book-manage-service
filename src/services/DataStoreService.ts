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
import DataStoreServiceDto from '../services/dto/DataStoreServiceDto';
import PostDataStoreReqDto from '../resources/dto/PostDataStoreReqDto';
import Operator from '../resources/dto/OperatorReqDto';
/* eslint-enable */
import Config from '../common/Config';
import CatalogService from './CatalogService';
import CatalogDto from './dto/CatalogDto';
import EntityOperation from '../repositories/EntityOperation';
import DataOperation from '../repositories/postgres/DataOperation';
import DataOperationDataType from '../repositories/postgres/DataOperationDataType';
import GetDataStoreResDto from '../resources/dto/GetDataStoreByIdResDto';
import { OperatorType } from '../common/Operator';
import AppError from '../common/AppError';
import { ResponseCode } from '../common/ResponseCode';
import { connectDatabase } from '../common/Connection';
import PostDataStorePermissionResDto from '../resources/dto/PostDataStorePermissionResDto';
import { IDataOperationAsset, IDataOperationRequest } from '../common/DataOperationRequest';
import PermissionAnalyzer from '../common/PermissionAnalyzer';
const config = Config.ReadConfig('./config/config.json');
const message = Config.ReadConfig('./config/message.json');

@Service()
export default class DataStoreService {
    /**
     * データ蓄積定義追加
     * @param dataStorePostDto
     * リファクタ履歴
     *  separate : checkActorCatalogForPostDataStore（アクター別処理）
     *  separate : insertDataStore（データ蓄積定義、データ種登録処理）
     */
    public async postDataStore (dto: DataStoreServiceDto): Promise<any> {
        // dtoから扱いやすいように値を取り出す
        const operator = dto.operator;
        const request = dto.request as PostDataStoreReqDto;

        // PXR-IDが取得できているか確認
        if (!operator.getPxrId()) {
            throw new AppError(message.EMPTY_PXR_ID, ResponseCode.UNAUTHORIZED);
        }

        // リクエスト.actorでカタログを取得
        // カタログ取得データオブジェクトを生成
        const catalogDto = new CatalogDto();
        await this.checkActorCatalogForPostDataStore(catalogDto, request, operator);

        // リクエスト.appでカタログを取得
        const catalogService = new CatalogService();
        const providerCatalog = await catalogService.getCatalogInfo(catalogDto);

        // 取得したカタログのtemplate.storeが空でない事を確認
        if (providerCatalog['template'] &&
            providerCatalog['template']['store'] &&
            providerCatalog['template']['store'].length <= 0
        ) {
            throw new AppError(message.NOT_STORE_CATALOG_CODE, ResponseCode.BAD_REQUEST);
        }

        // request.storeのカタログを取得
        catalogDto.setCode(request.store._value);
        catalogDto.setVersion(request.store._ver);
        const storeCatalog = await catalogService.getCatalogInfo(catalogDto);
        if (!storeCatalog || !storeCatalog['template']['store'] || !Array.isArray(storeCatalog['template']['store'])) {
            throw new AppError(message.NOT_STORE_CATALOG_CODE, ResponseCode.BAD_REQUEST);
        }
        const stores: any[] = storeCatalog['template']['store'];

        // PXR-IDからブックIDを取得
        const book = await EntityOperation.isPxrIdExists(operator.getPxrId());
        // ブックが取得できなかった場合
        if (!book) {
            throw new AppError(message.NOT_EXIST_BOOK, ResponseCode.UNAUTHORIZED);
        }

        // データ蓄積定義登録
        await this.insertDataStore(book, request, operator, stores);

        // レスポンスを返す
        return { result: 'success' };
    }

    /**
     * データ蓄積定義、データ種登録処理
     * @param book
     * @param request
     * @param operator
     * @param shares
     * リファクタ履歴
     *  separate : insertDataOperation（データ蓄積定義追加）
     *  inner : checkExeclude（同意判定）
     *  inner : insertDataOperationDataType（データ蓄積定義データ種登録）
     */
    private async insertDataStore (book: MyConditionBook, request: PostDataStoreReqDto, operator: Operator, stores: any[]) {
        const connection = await connectDatabase();
        await connection.transaction(async (trans) => {
            const dataOperation = await EntityOperation.getDataOperation(
                book.id,
                request.actor._value,
                request.app ? request.app._value : null,
                null,
                request.store._value,
                true
            );
            let dataOperationId: number;
            if (dataOperation) {
                dataOperationId = dataOperation.id;
                await EntityOperation.updateDataOperationCatalogVersion(trans, dataOperationId, request.store._ver, operator.getLoginId());
                await EntityOperation.deleteDataOperationDataTypeRecord(trans, dataOperationId, operator.getLoginId());
            } else {
                // データ登録
                dataOperationId = await this.insertDataOperation(dataOperation, book, request, operator, trans, dataOperationId);
            }

            for (const store of stores) {
                const catalogUuid = store['id'];
                if (store['document'] && Array.isArray(store['document'])) {
                    for (const document of store['document']) {
                        let consentFlg = true;
                        if (request.excludeDocument) {
                            consentFlg = checkExeclude(request.excludeDocument, document, consentFlg);
                        }
                        await insertDataOperationDataType(catalogUuid, dataOperationId, consentFlg, trans, document, null, null);
                    }
                }
                if (store['event'] && Array.isArray(store['event'])) {
                    for (const event of store['event']) {
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
        // データ蓄積定義データ種登録
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
     * データ蓄積定義追加
     * @param dataOperation
     * @param book
     * @param request
     * @param operator
     * @param trans
     * @param dataOperationId
     * @returns
     */
    private async insertDataOperation (dataOperation: DataOperation, book: MyConditionBook, request: PostDataStoreReqDto, operator: Operator, trans: any, dataOperationId: number) {
        dataOperation = new DataOperation();
        dataOperation.bookId = book.id;
        dataOperation.type = 'store';
        dataOperation.actorCatalogCode = request.actor._value;
        dataOperation.actorCatalogVersion = request.actor._ver;
        dataOperation.appCatalogCode = request.app._value;
        dataOperation.appCatalogVersion = request.app._ver;
        dataOperation.wfCatalogCode = null;
        dataOperation.wfCatalogVersion = null;
        dataOperation.operationCatalogCode = request.store._value;
        dataOperation.operationCatalogVersion = request.store._ver;
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
    private async checkActorCatalogForPostDataStore (catalogDto: CatalogDto, request: PostDataStoreReqDto, operator: Operator) {
        // リクエスト.actorでカタログを取得
        // カタログ取得データオブジェクトを生成
        catalogDto.setUrl(config['catalogUrl']);
        catalogDto.setCode(request.actor._value);
        catalogDto.setOperator(operator);
        catalogDto.setMessage(message);
        // カタログサービスから対象カタログを取得
        const catalogService: CatalogService = new CatalogService();
        const actorCatalog = await catalogService.getCatalogInfo(catalogDto);

        // 取得したカタログのtemplate.applicationにリクエストのappが含まれているか確認
        const ns: string = actorCatalog['catalogItem'] ? actorCatalog['catalogItem']['ns'] : '';
        if (ns.indexOf('/app') >= 0 && request.app) {
            // applicationの場合
            const flg = checkContainCode(actorCatalog, request.app._value, 'application');
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
        function checkContainCode (targetActorCatalog: any, code: number, type: 'application') {
            if (!targetActorCatalog['template'] || !targetActorCatalog['template'][type]) {
                throw new AppError(message.ACTOR_CATALOG_INVALID, ResponseCode.BAD_REQUEST);
            }

            // template[application]内にリクエスト[app]が存在するか確認
            const codeList = targetActorCatalog['template'][type];
            let flg = false;
            for (const codeObj of codeList) {
                if (codeObj && codeObj['_value'] === code) {
                    flg = true;
                    break;
                }
            }
            return flg;
        }
    }

    /**
     * データ蓄積定義取得
     * @param dataStorePostDto
     * リファクタ履歴
     *  separate : setEventData（共通処理のため）
     *  separate : setDocumentData（共通処理のため）
     *  separate : checkActorCatalogForGetStoreData（アクター別処理）
     *  separate : createResponseElement（レスポンスデータ作成処理）
     *  separate : findCatalog（共通処理のため）
     *  separate : createResponse（レスポンス生成処理）
     *  separate : setDataTypeForInd（蓄積データ種設定）
     *  separate : setDataType（蓄積データ種設定）
     */
    public async getDataStore (dataStoreGetDto: DataStoreServiceDto): Promise<any> {
        // dtoから扱いやすいように値を取り出す
        const userId = dataStoreGetDto.getUserId();
        const actor = dataStoreGetDto.getActor();
        const appCatalogCode = dataStoreGetDto.getAppCatalogCode();
        const wfCatalogCode: number = null;
        const operator = dataStoreGetDto.getOperator();

        let bookId: number = null;
        // オペレーター種別が個人の場合
        if (operator.getType() === OperatorType.TYPE_IND) {
            // PXR-IDが取得できているか確認
            if (!operator.getPxrId()) {
                throw new AppError(message.EMPTY_PXR_ID, ResponseCode.UNAUTHORIZED);
            }
            // ブックを取得
            const book = await EntityOperation.isPxrIdExists(operator.getPxrId());
            // ブックが取得できなかった場合
            if (!book) {
                throw new AppError(message.NOT_EXIST_BOOK, ResponseCode.UNAUTHORIZED);
            }
            bookId = book.id;
        } else {
            // オペレーター種別がWF職員、アプリケーションの場合
            // アクターコード、バージョンが存在する場合
            const actorCode = Number(actor['_value']);
            if (actorCode) {
                await this.checkActorCatalogForGetStoreData(actorCode, operator, appCatalogCode);
            } else {
                // アクターコード/バージョンが取得できない場合
                throw new AppError(message.REQUEST_UNAUTORIZED, ResponseCode.UNAUTHORIZED);
            }

            // 利用者IDからブックIDを取得する
            const userIdResult = await EntityOperation.getUserIdCooperateBookId(userId, actor, appCatalogCode, wfCatalogCode);
            if (userIdResult === null) {
                throw new AppError(message.NOT_FOUND_BOOK_ID, ResponseCode.BAD_REQUEST);
            }
            bookId = userIdResult.getBookId();
        }

        let res: GetDataStoreResDto[] = [];
        // 対象のデータ操作定義を取得
        const dataOperations = await EntityOperation.getStoreDataOperationsByBookId(bookId, appCatalogCode, wfCatalogCode);
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

        // 取得したデータ種を設定
        res = await this.setDataTypeForInd(dataOperations, operationCatalogs, res);
        return res;
    }

    /**
     * 蓄積データ種取得（個人）
     * @param dataOperations
     * @param operationCatalogs
     * @param res
     * @returns
     */
    private async setDataTypeForInd (dataOperations: DataOperation[], operationCatalogs: any[], res: GetDataStoreResDto[]) {
        for (const dataOperation of dataOperations) {
            const storeCatalog = operationCatalogs.find(ele =>
                Number(ele['catalogItem']['_code']['_value']) === dataOperation.operationCatalogCode &&
                Number(ele['catalogItem']['_code']['_ver']) === dataOperation.operationCatalogVersion
            );
            const dataTypes = await EntityOperation.getDataOperationDataTypeByDataOperationId(dataOperation.id);
            for (const dataType of dataTypes) {
                if (!dataType.consentFlg) {
                    continue;
                }
                // resに同じuuidが存在するか確認
                let resEle = res.find(ele =>
                    ele.storeCatalogId === dataType.catalogUuid
                );
                if (resEle) {
                    // あれば、そのuuidに対して操作
                    const event = resEle.event.find(ele =>
                        ele._code._value === dataType.eventCatalogCode &&
                        ele._code._ver === dataType.eventCatalogVersion
                    );
                    if (event) {
                        await this.setEventData(dataType, storeCatalog, event);
                    } else {
                        const resEvent: any = { thing: [] };
                        await this.setEventData(dataType, storeCatalog, resEvent);
                        if (resEvent.thing.length > 0) {
                            resEle.event.push({
                                _code: {
                                    _value: dataType.eventCatalogCode,
                                    _ver: dataType.eventCatalogVersion
                                },
                                thing: resEvent.thing
                            });
                        }
                    }
                } else {
                    // なければ新規追加
                    resEle = this.createResponseElement(resEle, dataOperation, dataType);
                    await this.setDocumentData(dataType, storeCatalog, resEle);
                    resEle.document = resEle.document.length > 0 ? resEle.document : [];
                    const resEvent: any = { thing: [] };
                    await this.setEventData(dataType, storeCatalog, resEvent);
                    resEle.event = resEvent.thing.length > 0
                        ? [
                            {
                                _code: {
                                    _value: dataType.eventCatalogCode,
                                    _ver: dataType.eventCatalogVersion
                                },
                                thing: resEvent.thing
                            }
                        ]
                        : [];
                    if (resEle.event.length > 0 || resEle.document.length > 0) {
                        res.push(resEle);
                    }
                }
            }
        }
        return res;
    }

    /**
     * リクエストコードがアクターカタログに存在するかどうかの判定処理
     * @param actorCode
     * @param operator
     * @param appCatalogCode
     * リファクタ履歴
     *  inner : checkContainCode（共通処理のため）
     */
    private async checkActorCatalogForGetStoreData (actorCode: number, operator: Operator, appCatalogCode: number) {
        // カタログ取得データオブジェクトを生成
        const catalogDto = new CatalogDto();
        catalogDto.setOperator(operator);
        catalogDto.setUrl(config['catalogUrl']);
        catalogDto.setCode(actorCode);
        catalogDto.setMessage(message);

        // カタログサービスから対象カタログを取得
        const catalogService: CatalogService = new CatalogService();
        const actorCatalog = await catalogService.getCatalogInfo(catalogDto);

        // 取得したカタログのtemplate.applicationにリクエストのappが含まれているか確認
        const ns: string = actorCatalog['catalogItem'] ? actorCatalog['catalogItem']['ns'] : '';
        if (ns.indexOf('/wf') >= 0) {
            // サポート対象外：WF
            throw new AppError(message.UNSUPPORTED_ACTOR, ResponseCode.BAD_REQUEST);
        } else if (ns.indexOf('/app') >= 0) {
            // applicationの場合
            // appの指定が無い場合エラー
            if (!appCatalogCode) {
                throw new AppError(message.EMPTY_APP_CATALOG_CODE, ResponseCode.BAD_REQUEST);
            }
            const flg = checkContainCode(actorCatalog, appCatalogCode, 'application');
            // 存在しない場合
            if (!flg) {
                throw new AppError(message.APP_CATALOG_CODE_NOT_EXIST, ResponseCode.BAD_REQUEST);
            }
        } else {
            // wf、app以外だった場合
            throw new AppError(message.ACTOR_CATALOG_INVALID, ResponseCode.UNAUTHORIZED);
        }
        // 対象コードがアクターカタログに含まれているか
        function checkContainCode (targetActorCatalog: any, code: number, type: 'application') {
            // template[application]が無い場合エラー
            if (!targetActorCatalog['template'] || !targetActorCatalog['template'][type]) {
                throw new AppError(message.ACTOR_CATALOG_INVALID, ResponseCode.UNAUTHORIZED);
            }

            // template[application]内にリクエスト[app]が存在するか確認
            const codeList = targetActorCatalog['template'][type];
            let flg = false;
            for (const codeObj of codeList) {
                if (codeObj && codeObj['_value'] === code) {
                    flg = true;
                    break;
                }
            }
            return flg;
        }
    }

    /**
     * データ種（イベント、モノ）取得
     * @param dataType
     * @param storeCatalog
     * @param event
     * @returns
    */
    private async setEventData (dataType: any, storeCatalog: any, event: any) {
        let version = dataType.thingCatalogVersion;
        while (true) {
            const stores: any[] = storeCatalog['template']['store'];
            const store = stores.find(ele =>
                ele['id'] === dataType.catalogUuid
            ) || {};
            const catalogEvent = this.findCatalog(store, dataType.eventCatalogCode, dataType.eventCatalogVersion, 'event') || {};
            const catalogThing = this.findCatalog(catalogEvent, dataType.thingCatalogCode, version, 'thing');
            if (catalogThing) {
                if (
                    version !== dataType.thingCatalogVersion && catalogThing['requireConsent']
                ) {
                    break;
                }
                event.thing.push({
                    _code: {
                        _value: dataType.thingCatalogCode,
                        _ver: dataType.thingCatalogVersion
                    }
                });
                version++;
            } else {
                break;
            }
        }
    }

    /**
     * データ種（ドキュメント）取得
     * @param dataType
     * @param storeCatalog
     * @param resArray
     * @returns
     */
    private async setDocumentData (dataType: any, storeCatalog: any, resArray: any) {
        let version = dataType.documentCatalogVersion;
        while (true) {
            const stores: any[] = storeCatalog['template']['store'];
            const store = stores.find(ele =>
                ele['id'] === dataType.catalogUuid
            ) || {};
            const catalogDocument = this.findCatalog(store, dataType.documentCatalogCode, dataType.documentCatalogVersion, 'document');
            if (catalogDocument) {
                if (
                    version !== dataType.documentCatalogVersion && catalogDocument['requireConsent']
                ) {
                    break;
                }
                resArray.document.push({
                    _code: {
                        _value: dataType.documentCatalogCode,
                        _ver: dataType.documentCatalogVersion
                    }
                });
                version++;
            } else {
                break;
            }
        }
        return resArray;
    }

    /**
     * レスポンスデータ作成
     * @param resEle
     * @param dataOperation
     * @param dataType
     * @returns
     */
    private createResponseElement (resEle: GetDataStoreResDto, dataOperation: DataOperation, dataType: DataOperationDataType) {
        resEle = new GetDataStoreResDto();
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
        } else {
            // サポート対象外：WF
            throw new AppError(message.UNSUPPORTED_ACTOR, ResponseCode.BAD_REQUEST);
        }
        resEle.store = {
            _value: dataOperation.operationCatalogCode,
            _ver: dataOperation.operationCatalogVersion
        };
        resEle.storeCatalogId = dataType.catalogUuid;
        resEle.document = [];
        return resEle;
    }

    /**
     * カタログのデータ種一覧の中から対象コードのものを返却
     * @param catalog
     * @param code
     * @param version
     * @param type
     * @returns
     */
    private findCatalog (catalog: any, code: number, version: Number, type: 'document' | 'event' | 'thing') {
        const dataTypeList: any[] = catalog[type] ? catalog[type] : [];
        const target = dataTypeList.find(ele =>
            Number(ele['code']['_value']) === code &&
            Number(ele['code']['_ver']) === version
        );
        return target;
    }

    /**
     * 蓄積可否判定
     * @param storePermissionDto
     */
    public async checkDataStorePermission (storePermissionDto: DataStoreServiceDto): Promise<PostDataStorePermissionResDto> {
        const appCode = storePermissionDto.getAppCatalogCode() ? storePermissionDto.getAppCatalogCode() : null;
        const wfCode = storePermissionDto.getWfCatalogCode() ? storePermissionDto.getWfCatalogCode() : null;
        // pxrId取得
        const book = await EntityOperation.getConditionBookRecordFromUser(storePermissionDto.getUserId(), storePermissionDto.getActorCatalogCode(), appCode, wfCode, null, null);
        if (!book || book.length === 0) {
            throw new AppError(message.CAN_NOT_FIND_BOOK, ResponseCode.BAD_REQUEST);
        }
        const pxrId = book[0].pxrId;

        const catalogService = new CatalogService();
        // analyzerインスタンス生成、有効な蓄積定義の特定
        const asset: IDataOperationAsset[] = [{
            actor: storePermissionDto.getActorCatalogCode(),
            asset: appCode || wfCode
        }];
        const analyzer = PermissionAnalyzer
            .create(storePermissionDto.getOperator(), EntityOperation.agreementAccessor, catalogService.catalogAccessor)
            .setDataOperationType('STORE');
        await analyzer.setAgreement(pxrId, 'STORE', asset);
        await analyzer.setAssetCatalog();
        await analyzer.specifyTarget();

        // リクエストの各データ種について、蓄積可否判定
        let isAllPermitted = true;
        for (const datatype of storePermissionDto.getDatatype()) {
            // リクエスト生成
            const permissionRequest: IDataOperationRequest = {
                pxrId: pxrId,
                operationType: 'STORE',
                storedBy: {
                    actor: storePermissionDto.getActorCatalogCode(),
                    asset: storePermissionDto.getAppCatalogCode() || storePermissionDto.getWfCatalogCode()
                },
                shareTo: null,
                dataType: {
                    type: null,
                    code: datatype
                }
            };
            // 判定
            const isPermittedResponse = await analyzer.isPermitted(permissionRequest);
            if (!isPermittedResponse.checkResult) {
                // いずれかのデータ種で蓄積不可判定が出た場合、不可判定にする
                isAllPermitted = false;
                break;
            }
        }
        // レスポンス生成
        const res = new PostDataStorePermissionResDto();
        if (isAllPermitted) {
            // 可判定
            res.setCheckResult(true);
            res.setDatatype(storePermissionDto.getDatatype());
        } else {
            // 不可判定
            res.setCheckResult(false);
            res.setDatatype(null);
        }
        return res;
    }

    /**
     * データ蓄積定義削除
     * @param dataStorePostDto
     */
    public async deleteDataStore (dataStorePostDto: DataStoreServiceDto): Promise<any> {
        // dtoから扱いやすいように値を取り出す
        const operator = dataStorePostDto.getOperator();
        const pxrId = operator.getPxrId();
        const storeId = dataStorePostDto.getStoreId();

        // ブックを取得
        const book = await EntityOperation.isPxrIdExists(pxrId);
        // 紐付くブックがない場合はエラー
        if (book === null) {
            throw new AppError(message.CAN_NOT_FIND_BOOK, ResponseCode.BAD_REQUEST);
        }

        // データ操作定義の存在確認
        const dataStoreSettings = await EntityOperation.getDataOperationRecordFromStoreId(storeId, book.id);
        // 存在しなければエラー
        if (!dataStoreSettings) {
            throw new AppError(message.NOT_FOUND_DATA_STORE_SETTING, ResponseCode.NOT_FOUND);
        }
        // 存在しなければエラー
        const dataTypes = await EntityOperation.getDataTypes(storeId);
        if (dataTypes.length === 0) {
            throw new AppError(message.NOT_FOUND_DATA_TYPE, ResponseCode.NOT_FOUND);
        }

        // データ操作定義の蓄積情報を削除
        const connection = await connectDatabase();
        await connection.transaction(async trans => {
            await EntityOperation.deleteDataOperationRecord(trans, storeId, operator.getLoginId());
            await EntityOperation.deleteDataOperationDataTypeRecord(trans, storeId, operator.getLoginId());
        });

        const ret = {
            result: 'success'
        };
        return ret;
    }
}
