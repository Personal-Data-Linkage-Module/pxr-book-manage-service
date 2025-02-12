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
import { IDataOperationAsset, IDataOperationRequest } from 'common/DataOperationRequest';
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
import UserIdCooperate from 'repositories/postgres/UserIdCooperate';
import { CodeObject } from 'resources/dto/PostBookOpenReqDto';
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
     */
    public async getDataStore (dataStoreGetDto: DataStoreServiceDto): Promise<GetDataStoreResDto[]> {
        // dtoから扱いやすいように値を取り出す
        const userId = dataStoreGetDto.getUserId();
        const actor = dataStoreGetDto.getActor();
        const appCatalogCode = dataStoreGetDto.getAppCatalogCode();
        const wfCatalogCode: number = null;
        const operator = dataStoreGetDto.getOperator();
        let actorCode: number = null;

        // PXR-IDの特定
        let pxrId = null;
        if (operator.getType() === OperatorType.TYPE_IND) {
            if (operator.getType() === OperatorType.TYPE_IND) {
                // PXR-IDが取得できているか確認
                if (!operator.getPxrId()) {
                    throw new AppError(message.EMPTY_PXR_ID, ResponseCode.UNAUTHORIZED);
                }
                pxrId = operator.getPxrId();
            } else {
                pxrId = dataStoreGetDto.getPxrId();
            }
            // ブックを取得
            const book = await EntityOperation.isPxrIdExists(pxrId);
            // ブックが取得できなかった場合
            if (!book) {
                throw new AppError(message.NOT_EXIST_BOOK, ResponseCode.UNAUTHORIZED);
            }
        } else {
            // オペレーター種別がWF職員、アプリケーションの場合
            // アクターコード、バージョンが存在する場合
            actorCode = Number(actor['_value']);
            if (actorCode) {
                await this.checkActorCatalogForGetStoreData(actorCode, operator, appCatalogCode);
            } else {
                // アクターコード/バージョンが取得できない場合
                throw new AppError(message.REQUEST_UNAUTORIZED, ResponseCode.UNAUTHORIZED);
            }

            // 利用者IDが設定されていない場合はエラー
            if (!userId) {
                throw new AppError(message.REQUIRED_USER_ID, 400);
            }
            // pxrId取得
            const book = await EntityOperation.getConditionBookRecordFromUser(userId, actorCode, appCatalogCode, wfCatalogCode, null, null);
            if (!book || book.length === 0) {
                throw new AppError(message.NOT_EXIST_BOOK, ResponseCode.UNAUTHORIZED);
            }
            pxrId = book[0].pxrId;
        }

        const catalogService = new CatalogService();
        // analyzerインスタンス生成、有効な蓄積定義の特定
        const analyzer = PermissionAnalyzer
            .create(operator, EntityOperation.agreementAccessor, catalogService.catalogAccessor)
            .setDataOperationType('STORE');
        await analyzer.setAgreement(pxrId, 'STORE', null);
        await analyzer.setAssetCatalog();
        await analyzer.specifyTarget();

        // 取得対象のアセットの特定
        const coops = await EntityOperation.getUserIdByPxrId(pxrId, actorCode, appCatalogCode, wfCatalogCode);
        if (!coops || coops.length === 0) {
            throw new AppError(message.CAN_NOT_FIND_COOPERATE, 400);
        }

        // レスポンスの作成
        const res: GetDataStoreResDto[] = await this.createGetDataStoreResponse(coops, analyzer);
        // レスポンスを返す
        return res;
    }

    /**
     * 蓄積定義取得のレスポンスを作成する
     * @param coops 利用者ID連携情報
     * @param analyzer アナライザ
     * @returns 蓄積定義取得のレスポンス
     */
    private async createGetDataStoreResponse (coops: UserIdCooperate[], analyzer: PermissionAnalyzer) {
        const res: GetDataStoreResDto[] = [];
        for (const coop of coops) {
            const assetCode = coop.appCatalogCode ? coop.appCatalogCode : coop.wfCatalogCode;
            const asset = analyzer.getAsset().get(assetCode);
            if (!asset) {
                // アセットが取得できない場合は次の連携情報へ
                continue;
            }
            // 同意情報の取得
            const agreementForAsset = analyzer.getAgreement().get(assetCode);
            if (!asset.validStore || !agreementForAsset) {
                // 有効な定義または同意がない場合は次のasset
                continue;
            }

            for (const [storeCode, storeCatalog] of asset.validStore) {
                // 蓄積同意の抽出
                const agreement = agreementForAsset.store.find(ele => Number(ele.target._value) === storeCatalog.catalogItem._code._value);
                // storeの単位に処理
                for (const store of storeCatalog.template.store) {
                    const resEle = new GetDataStoreResDto();
                    resEle.id = agreement.id;
                    resEle.actor = agreementForAsset.actor;
                    if (coop.appCatalogCode) {
                        resEle.app = agreementForAsset.asset;
                        resEle.wf = null;
                    }
                    resEle.store = storeCatalog.catalogItem._code;
                    resEle.storeCatalogId = store.id;
                    resEle.document = [];
                    resEle.event = [];

                    if (store.document) {
                        for (const doc of store.document) {
                            // 蓄積可否判定
                            const isPermitted = await isPermittedDataType(coop, doc.code, analyzer, 'document');
                            if (isPermitted) {
                                resEle.document.push({
                                    _code: doc.code
                                });
                            }
                        }
                    }

                    if (store.event) {
                        for (const eve of store.event) {
                            const resEvent: any = { thing: [] };
                            if (eve.thing) {
                                for (const thi of eve.thing) {
                                    // 蓄積可否判定
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
                    if (resEle.event.length > 0 || resEle.document.length > 0) {
                        res.push(resEle);
                    }
                }
            }
        }
        return res;

        /**
         * 対象のデータ種が蓄積可能かアナライザで判定する
         * @param coop 連携情報
         * @param code データ種
         * @param analyzer アナライザ
         * @param type データ種別
         * @returns 蓄積可否
         */
        async function isPermittedDataType (coop: UserIdCooperate, code: CodeObject, analyzer: PermissionAnalyzer, type: 'document' | 'event' | 'thing'): Promise<boolean> {
            // リクエスト生成
            const permissionRequest: IDataOperationRequest = {
                pxrId: analyzer.getPxrId(),
                operationType: 'STORE',
                storedBy: {
                    actor: coop.actorCatalogCode,
                    asset: coop.appCatalogCode || coop.wfCatalogCode
                },
                shareTo: null,
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
        let isPermitted = true;
        const permittedData: CodeObject[] = [];
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
                isPermitted = false;
            } else {
                permittedData.push(datatype);
            }
        }
        if (storePermissionDto.getAllowPartialStore() === true && permittedData.length > 0) {
            // 一部蓄積可 かつ 許可されたデータ種がある場合、可判定にする
            isPermitted = true;
        }
        // レスポンス生成
        const res = new PostDataStorePermissionResDto();
        if (isPermitted) {
            // 可判定
            res.setCheckResult(true);
            res.setDatatype(permittedData);
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
