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

// SDE-IMPL-REQUIRED 本ファイルをコピーしてサービスレイヤーの処理を実装します。

import { Service } from 'typedi';
/* eslint-disable */
import CooperateServiceDto from '../services/dto/CooperateServiceDto';
import OperatorReqDto from '../resources/dto/OperatorReqDto';
import MyConditionBook from '../repositories/postgres/MyConditionBook';
/* eslint-enable */
import IdentityDto from './dto/IdentityServiceDto';
import IdentityService from './IdentityService';
import CatalogService from './CatalogService';
import CatalogDto from './dto/CatalogDto';
import PostCooperateRequestResDto from '../resources/dto/PostCooperateRequestResDto';
import EntityOperation from '../repositories/EntityOperation';
import AppError from '../common/AppError';
import { ResponseCode } from '../common/ResponseCode';
import UserIdCooperate from '../repositories/postgres/UserIdCooperate';
import DataOperation from '../repositories/postgres/DataOperation';
import { connectDatabase } from '../common/Connection';
import { sprintf } from 'sprintf-js';
import { OperatorType } from '../common/Operator';
import IdService from './IdService_Stub';
import moment = require('moment-timezone');
import urljoin = require('url-join');

@Service()
export default class CooperateService {
    /**
     * 利用者ID連携
     * 本人性確認サービスを呼び出し取得したデータを元に利用者ID連携テーブルにデータを作成する
     * 1.MyConditionBookテーブルにデータが存在すること
     * 2.利用者ID連携テーブルにはデータがないこと
     * @param connection
     * @param bookCooperateDto
     * リファクタ履歴
     *  separate : coopIDService（特定技術のため）
     */
    public async setIdentityData (cooperateDto: CooperateServiceDto): Promise<any> {
        const configure = cooperateDto.getConfigure();
        const operator = cooperateDto.getOperator();
        const message = cooperateDto.getMessage();

        // 本人性確認データオブジェクトを生成
        const identityDto = new IdentityDto();
        const identityUrl = configure['identityUrl'];
        identityDto.setUrl(urljoin(identityUrl, '/collate'));
        const body = JSON.stringify({
            identifyCode: cooperateDto.getIdentifyCode()
        });
        identityDto.setBody(body);
        identityDto.setOperator(operator);
        identityDto.setMessage(message);

        // 本人性確認サービスを生成
        const identityService: IdentityService = new IdentityService();
        const identityData = await identityService.postIdentity(identityDto);

        // 利用者ID連携データを取得
        const book = await EntityOperation.isPxrIdExists(identityData.pxrId);
        if (!book) {
            throw new AppError(message.TARGET_NO_DATA, ResponseCode.NOT_FOUND);
        }

        const bookId: number = book.id;
        const actorCode = Number(identityData.actor._value);
        const regionCode = identityData.region ? Number(identityData.region._value) : null;
        const appCode = identityData.app ? Number(identityData.app._value) : null;
        // identityData.wfが存在する場合エラー
        if (identityData.wf) {
            throw new AppError(message.UNSUPPORTED_ACTOR, ResponseCode.BAD_REQUEST);
        }
        const wfCode: number = null;
        const userId = identityData.userId;

        // regionCode, appCodeがいずれも設定されていない場合エラー
        if ((!regionCode && !appCode)) {
            throw new AppError(message.EMPTY_REGION_AND_APP, 400);
        }

        // 一致するレコードがない場合エラー
        const cooperate = await EntityOperation.getCooperate(bookId, actorCode, regionCode, appCode, wfCode, userId);
        if (!cooperate) {
            throw new AppError(message.PENDING_COOPERATE_NOT_FOUND, ResponseCode.BAD_REQUEST);
        }
        // 連携申請中以外エラー
        if (cooperate.status !== 0) {
            throw new AppError(message.NOT_COOP_REQUEST, ResponseCode.BAD_REQUEST);
        }

        // IDService利用者連携
        await this.coopIDService(configure, operator, message, regionCode, actorCode, appCode, userId, book);

        const connection = await connectDatabase();
        await connection.transaction(async trans => {
            // ステータスをセット
            cooperate.status = 1;
            cooperate.startAt = new Date();
            cooperate.updatedBy = operator.getLoginId();

            // 更新を実行
            await EntityOperation.setStatusToCooperate(trans, cooperate);
        });

        // レスポンスの生成
        const response = new PostCooperateRequestResDto();
        response.pxrId = book.pxrId;
        response.setFromEntity(cooperate);

        // レスポンスを返す
        return response.getAsJson();
    }

    /**
     * IDサービス利用者連携
     * @param configure
     * @param operator
     * @param message
     * @param regionCode
     * @param actorCode
     * @param appCode
     * @param userId
     * @param book
     */
    private async coopIDService (configure: any, operator: OperatorReqDto, message: any, regionCode: number, actorCode: number, appCode: number, userId: any, book: MyConditionBook) {
        // グローバル設定カタログを取得し、IDサービスを使用する設定となっているか確認する
        const globalSettingDto = new CatalogDto();
        globalSettingDto.setUrl(configure['catalogUrl']);
        globalSettingDto.setCode(configure['globalCatalogCode']);
        globalSettingDto.setOperator(operator);
        globalSettingDto.setProcNum(0);
        globalSettingDto.setMessage(message);

        const globalSetting = await new CatalogService().getCatalogInfo(globalSettingDto);
        if (globalSetting && globalSetting['template'] && globalSetting['template']['use_id_connect']) {
            let orgId = '';
            if (regionCode) {
                orgId = actorCode + '_' + regionCode;
            } else if (appCode) {
                orgId = actorCode + '_' + appCode;
            }

            // IDサービス連携
            // IDサービスログイン情報に利用者連携情報を紐づける
            // ログイン不要のためダミー用のパスワードを付与
            const idServiceBody = {
                id: userId,
                password: 'dummy_password',
                passwordflg: '1',
                orgid: orgId
            };
            // IDサービスを呼出
            const idService: IdService = new IdService();
            await idService.registerThreeKey(book.pxrId, idServiceBody, operator);
        }
    }

    /**
     * 利用者ID連携解除
     * @param cooperateDto
     * リファクタ履歴
     *  separate : checkActorCatalog（アクターカタログ正規判定処理）
     *  separate : deleteIDService（特定技術処理のため）
     */
    public async releaseIdentityData (cooperateDto: CooperateServiceDto): Promise<any> {
        const configure = cooperateDto.getConfigure();
        const operator = cooperateDto.getOperator();
        const message = cooperateDto.getMessage();
        const actorCode = operator.getActorCode();
        const actorVersion = operator.getActorVersion();

        // 以下通知が必要になったら有効化する
        // const notificationCategoryCode = 156;
        // const notificationCategoryVersion = 1;

        // 本人性確認データオブジェクトを生成
        const identityDto = new IdentityDto();
        const identityUrl = configure['identityUrl'];
        const cooperateUrl: string = urljoin(identityUrl, '/collate');
        identityDto.setUrl(cooperateUrl);
        const body = JSON.stringify({
            identifyCode: cooperateDto.getIdentifyCode()
        });
        identityDto.setBody(body);
        identityDto.setOperator(operator);
        identityDto.setMessage(message);

        // 本人性確認サービスを生成
        const identityService: IdentityService = new IdentityService();
        const identityData = await identityService.postIdentity(identityDto);

        // 照合結果からデータ取得
        const regionCode = identityData['region'] ? Number(identityData['region']['_value']) : null;
        const appCode = identityData['app'] ? Number(identityData['app']['_value']) : null;
        // identityData.wfが存在する場合エラー
        if (identityData['wf']) {
            throw new AppError(message.UNSUPPORTED_ACTOR, ResponseCode.BAD_REQUEST);
        }
        const wfCode: number = null;
        const userId = identityData['userId'];
        const pxrId = identityData['pxrId'];
        // ログイン情報からカタログを取得してappまたはwfコードが一致するか確認する
        await this.checkActorCatalog(operator, configure, actorCode, message, regionCode, appCode);

        // MyConditionBookデータを取得
        const myConditionBook = await EntityOperation.isPxrIdExists(pxrId);
        // MyConditionBookデータが存在しない場合
        if (!myConditionBook) {
            throw new AppError(message.TARGET_NO_DATA, ResponseCode.NOT_FOUND);
        }

        // 削除対象データを取得
        const userIdCooperateEntity: UserIdCooperate = await EntityOperation.getUserIdCooperateRecordFromUserIdAndCode(myConditionBook.id, actorCode, regionCode, wfCode, appCode, userId);

        // 連携申請中以外エラー
        if (userIdCooperateEntity.status !== 2) {
            throw new AppError(message.NOT_COOP_RELEASE_REQUEST, ResponseCode.BAD_REQUEST);
        }

        // 関連テーブルの該当データ削除
        const connection = await connectDatabase();
        await connection.transaction(async trans => {
            // 利用者ID連携データを削除
            const cooperateResult = await EntityOperation.deleteUserIdCooperateRecordActorWfApUser(trans, myConditionBook.id, actorCode, regionCode, wfCode, appCode, userId, operator.getLoginId());
            if (cooperateResult.raw.length === 0) {
                throw new AppError(message.TARGET_NO_DATA, ResponseCode.NOT_FOUND);
            }

            // データ蓄積定義とデータ種を削除
            const dataOperation = new DataOperation();
            dataOperation.bookId = myConditionBook.id;
            dataOperation.actorCatalogCode = actorCode;
            dataOperation.actorCatalogVersion = actorVersion;
            dataOperation.appCatalogCode = appCode;
            dataOperation.wfCatalogCode = wfCode;
            dataOperation.type = 'store';
            dataOperation.updatedBy = operator.getLoginId();
            const delResult = await EntityOperation.deleteDataOperationRecordFromActor(trans, dataOperation);
            for (let i = 0; i < delResult.raw.length; i++) {
                await EntityOperation.deleteDataOperationDataTypeRecord(trans, delResult.raw[i].id, operator.getLoginId());
            }
            // IDService連携削除
            await this.deleteIDService(configure, operator, message, pxrId, userId, actorCode, regionCode, appCode);
        });

        // レスポンスを返す
        return userIdCooperateEntity;
    }

    /**
     * IDService連携削除
     * @param configure
     * @param operator
     * @param message
     * @param pxrId
     * @param userId
     * @param actorCode
     * @param regionCode
     * @param appCode
     */
    private async deleteIDService (configure: any, operator: OperatorReqDto, message: any, pxrId: any, userId: any, actorCode: number, regionCode: number, appCode: number) {
        // グローバル設定カタログを取得し、IDサービスを使用する設定となっているか確認する
        const globalSettingDto = new CatalogDto();
        globalSettingDto.setUrl(configure['catalogUrl']);
        globalSettingDto.setCode(configure['globalCatalogCode']);
        globalSettingDto.setOperator(operator);
        globalSettingDto.setProcNum(0);
        globalSettingDto.setMessage(message);

        const globalSetting = await new CatalogService().getCatalogInfo(globalSettingDto);
        if (globalSetting && globalSetting['template'] && globalSetting['template']['use_id_connect']) {
            // IDサービス連携解除
            const idService: IdService = new IdService();
            await idService.deleteThreekey(pxrId, userId, actorCode, regionCode, appCode);
        }
    }

    /**
     * ログイン情報のアクターカタログ判定
     * @param operator
     * @param configure
     * @param actorCode
     * @param message
     * @param regionCode
     * @param appCode
     * リファクタ履歴
     *  inner : checkContainCode（共通処理）
     */
    private async checkActorCatalog (operator: OperatorReqDto, configure: any, actorCode: number, message: any, regionCode: number, appCode: number) {
        const catalogDto = new CatalogDto();
        catalogDto.setOperator(operator);
        catalogDto.setUrl(configure['catalogUrl']);
        catalogDto.setCode(actorCode);
        catalogDto.setMessage(message);
        const catalogService: CatalogService = new CatalogService();
        const catalogInfo = await catalogService.getCatalogInfo(catalogDto);
        const ns: string = catalogInfo['catalogItem'] ? catalogInfo['catalogItem']['ns'] : null;
        if (ns.indexOf('/region-root') >= 0) {
            // region-rootの場合
            const flg = await checkContainCode(catalogInfo, regionCode, 'region');
            // 存在しない場合
            if (!flg) {
                throw new AppError(message.APP_CATALOG_CODE_NOT_EXIST, ResponseCode.BAD_REQUEST);
            }
        } else if (ns.indexOf('/app') >= 0) {
            // applicationの場合
            const flg = await checkContainCode(catalogInfo, appCode, 'application');
            // 存在しない場合
            if (!flg) {
                throw new AppError(message.APP_CATALOG_CODE_NOT_EXIST, ResponseCode.BAD_REQUEST);
            }
        } else if ((ns.indexOf('/wf') >= 0) || (ns.indexOf('/data-trader') >= 0)) {
            // workflow, traderはサポート外につきエラー
            throw new AppError(message.UNSUPPORTED_ACTOR, ResponseCode.BAD_REQUEST);
        } else {
            throw new AppError(message.ACTOR_CATALOG_INVALID, ResponseCode.BAD_REQUEST);
        }
        // 対象コードがアクターカタログに含まれているか
        async function checkContainCode (catalog: any, targetCode: number, type: 'region' | 'application') {
            if (!catalog['template'] || !catalog['template'][type]) {
                throw new AppError(message.ACTOR_CATALOG_INVALID, ResponseCode.BAD_REQUEST);
            }
            // template内にリクエストのコードが存在するか確認
            const codeList = catalog['template'][type];
            let flg = false;
            for (const code of codeList) {
                if (code['_value'] === targetCode) {
                    flg = true;
                    break;
                }
            }
            return flg;
        }
    }

    /**
     * 利用者ID連携情報を返却する
     * 1.MyConditionBookテーブルにデータが存在すること
     * 2.紐付く利用者ID連携テーブル情報を取得
     * 3.利用者ID連携テーブル情報とともに最新のカタログバージョンを設定して返却
     * @param bookCooperateDto
     * リファクタ履歴
     *  separate : setCodeData（region, app, wf別処理）
     */
    public async getCooperate (cooperateDto: CooperateServiceDto): Promise<any> {
        const operator = cooperateDto.getOperator();
        const message = cooperateDto.getMessage();
        const configure = cooperateDto.getConfigure();

        // 利用者ID連携データを取得
        const myConditionBook = await EntityOperation.isPxrIdExists(operator.getPxrId());
        // MyConditionBookデータがない場合
        if (!myConditionBook) {
            throw new AppError(message.TARGET_NO_DATA, ResponseCode.NOT_FOUND);
        }
        const userIdCooperateList = await EntityOperation.getUserIdCooperate(myConditionBook.id);
        // 対象データが存在しない場合
        if ((!userIdCooperateList) || (userIdCooperateList.length === 0)) {
            throw new AppError(message.BOOK_COOPERATE_NOT_EXISTS, ResponseCode.NOT_FOUND);
        }

        // レスポンスを生成
        const catalogDto = new CatalogDto();
        catalogDto.setOperator(operator);
        catalogDto.setUrl(configure['catalogUrl']);
        catalogDto.setMessage(message);
        const catalogService: CatalogService = new CatalogService();
        const retDataList: Array<any> = [];
        for (let i = 0; i < userIdCooperateList.length; i++) {
            const retData: any = {};
            // カタログから最新のカタログバージョンを取得する
            catalogDto.setCode(userIdCooperateList[i].actorCatalogCode);
            const catalogInfo = await catalogService.getCatalogInfo(catalogDto);
            const actor = catalogInfo['catalogItem'] ? catalogInfo['catalogItem']['_code'] : null;
            let actorVersion = null;
            if (actor) {
                actorVersion = actor._ver;
            } else {
                throw new AppError(sprintf(message.FAILED_CATALOG_SET, 'アクター'), ResponseCode.SERVICE_UNAVAILABLE);
            }
            retData.actor = {
                _value: Number(userIdCooperateList[i].actorCatalogCode),
                _ver: actorVersion
            };
            await this.setCodeData(userIdCooperateList[i], catalogDto, catalogService, message, retData);
            retData.userId = userIdCooperateList[i].userId;
            retData.startAt = userIdCooperateList[i].startAt ? moment(userIdCooperateList[i].startAt).tz('Asia/Tokyo').format('YYYY-MM-DDTHH:mm:ss.SSSZZ') : null;
            retData.status = userIdCooperateList[i].status;
            retDataList.push(retData);
        }

        return retDataList;
    }

    /**
     * region, app, wfコードを取得する
     * @param userIdCooperateList
     * @param catalogDto
     * @param catalogService
     * @param message
     * @param retData
     * リファクタ履歴
     *  inner : checkAndSetCodeData（app/wf/regionカタログコード設定処理）
     */
    private async setCodeData (userIdCooperate: UserIdCooperate, catalogDto: CatalogDto, catalogService: CatalogService, message: any, retData: any) {
        // region
        if (userIdCooperate.regionCatalogCode) {
            await checkAndSetCodeData(userIdCooperate.regionCatalogCode, 'region');
        }
        // app
        if (userIdCooperate.appCatalogCode) {
            await checkAndSetCodeData(userIdCooperate.appCatalogCode, 'app');
        }
        // wf
        if (userIdCooperate.wfCatalogCode) {
            throw new AppError(message.UNSUPPORTED_ACTOR, ResponseCode.BAD_REQUEST);
        }
        // app/wf/regionカタログコード設定
        async function checkAndSetCodeData (code: number, type: 'region' | 'app') {
            catalogDto.setCode(code);
            const catalogInfo = await catalogService.getCatalogInfo(catalogDto);
            const codeObj = catalogInfo['catalogItem'] ? catalogInfo['catalogItem']['_code'] : null;
            let _ver = null;
            if (codeObj) {
                _ver = codeObj._ver;
            } else {
                throw new AppError(sprintf(message.FAILED_CATALOG_SET, type), ResponseCode.SERVICE_UNAVAILABLE);
            }
            retData[type] = {
                _value: Number(code),
                _ver: _ver
            };
        }
    }

    /**
     * 利用者ID連携申請
     * @param dto
     * リファクタ履歴
     *  separate : checkPxrId（pxrId存在チェック）
     *  seprate : checkDuplicate（重複チェック）
     */
    public async saveCooperateRequest (dto: CooperateServiceDto): Promise<any> {
        const operator = dto.getOperator();
        const message = dto.getMessage();

        this.checkPxrId(operator, dto, message);

        const pxrId = dto.getPxrId() ? dto.getPxrId() : operator.getPxrId();

        // Bookを取得
        const book = await EntityOperation.isPxrIdExists(pxrId);
        if (!book) {
            throw new AppError(message.TARGET_NO_DATA, ResponseCode.NOT_FOUND);
        }

        const bookId: number = book.id;
        const actorCode = dto.getActorCode();
        const actorVersion = dto.getActorVersion();
        const regionCode = dto.getRegionCode() ? dto.getRegionCode() : null;
        const regionVersion = dto.getRegionVersion() ? dto.getRegionVersion() : null;
        const appCode = dto.getAppCode() ? dto.getAppCode() : null;
        const appVersion = dto.getAppVersion() ? dto.getAppVersion() : null;
        const wfCode: number = null;
        const wfVersion: number = null;
        const userId = dto.getUserId();

        await this.checkDuplicate(bookId, actorCode, regionCode, appCode, wfCode, message, userId);

        // エンティティを生成
        const entity: any = new UserIdCooperate();
        entity.bookId = bookId;
        entity.actorCatalogCode = actorCode;
        entity.actorCatalogVersion = actorVersion;
        entity.regionCatalogCode = regionCode;
        entity.regionCatalogVersion = regionVersion;
        entity.appCatalogCode = appCode;
        entity.appCatalogVersion = appVersion;
        entity.wfCatalogCode = wfCode;
        entity.wfCatalogVersion = wfVersion;
        entity.status = 0;
        entity.createdBy = operator.getLoginId();
        entity.updatedBy = operator.getLoginId();

        // リクエストにuserIdがある場合はuserIdも保存
        if (userId) {
            entity.userId = userId;
        }

        // 登録を実行
        await EntityOperation.saveEntity(entity);

        // レスポンスの生成
        const response = new PostCooperateRequestResDto();
        response.pxrId = pxrId;
        response.setFromEntity(entity);

        // レスポンスを返す
        return response.getAsJson();
    }

    /**
     * 既存レコード重複チェック
     * @param bookId
     * @param actorCode
     * @param regionCode
     * @param appCode
     * @param wfCode
     * @param message
     * @param userId
     */
    private async checkDuplicate (bookId: number, actorCode: number, regionCode: number, appCode: number, wfCode: number, message: any, userId: string) {
        // bookId,actorCode,wfCode(appCode)が一致するレコードが既にある場合エラー
        const cooperate = await EntityOperation.getCooperate(bookId, actorCode, regionCode, appCode, wfCode, null);
        if (cooperate) {
            throw new AppError(message.BOOK_COOPERATE_EXISTS, ResponseCode.BAD_REQUEST);
        }

        // リクエストにuserIdがある場合は利用者IDの重複チェック
        if (userId) {
            const duplicate = await EntityOperation.getDuplicateUserId(actorCode, appCode, wfCode, userId);
            if (duplicate) {
                throw new AppError(message.USER_ID_ALREADY_USERD, ResponseCode.BAD_REQUEST);
            }
        }
    }

    /**
     * pxrIdチェック
     * @param operator
     * @param dto
     * @param message
     */
    private checkPxrId (operator: OperatorReqDto, dto: CooperateServiceDto, message: any) {
        // 個人の場合、pxrIdがあったらエラー
        if (operator.getType() === OperatorType.TYPE_IND &&
            dto.getPxrId() !== null) {
            throw new AppError(message.validation.isEmpty + ': pxrId', ResponseCode.BAD_REQUEST);
        }

        // 運営メンバーの場合、pxrIdが無ければエラー
        if (operator.getType() === OperatorType.TYPE_MANAGE_MEMBER &&
            dto.getPxrId() === null) {
            throw new AppError(sprintf(message.NO_PARAM, 'pxrId'), ResponseCode.BAD_REQUEST);
        }
    }

    /**
     * 利用者ID連携解除申請
     * @param dto
     *  separate : checkPxrId（pxrId存在チェック）
     */
    public async saveCooperateRequestRelease (dto: CooperateServiceDto): Promise<any> {
        const operator = dto.getOperator();
        const message = dto.getMessage();

        this.checkPxrId(operator, dto, message);

        const pxrId = dto.getPxrId() ? dto.getPxrId() : operator.getPxrId();

        // Bookを取得
        const book = await EntityOperation.isPxrIdExists(pxrId);
        if (!book) {
            throw new AppError(message.TARGET_NO_DATA, ResponseCode.NOT_FOUND);
        }

        const bookId: number = book.id;
        const actorCode = dto.getActorCode();
        const regionCode = dto.getRegionCode() ? dto.getRegionCode() : null;
        const appCode = dto.getAppCode() ? dto.getAppCode() : null;
        const wfCode: number = null;

        // bookId,actorCode,wfCode(appCode)が一致するレコードがない場合エラー
        const cooperate = await EntityOperation.getCooperate(bookId, actorCode, regionCode, appCode, wfCode, null);
        if (cooperate === null) {
            throw new AppError(message.BOOK_COOPERATE_NOT_EXISTS, ResponseCode.BAD_REQUEST);
        }

        // 登録を実行
        await EntityOperation.updateCooperateRelease(cooperate.id, operator);

        // レスポンスの生成
        const response = new PostCooperateRequestResDto();
        response.pxrId = pxrId;
        response.setFromEntity(cooperate);

        // レスポンスを返す
        return response.getAsJson();
    }

    /**
     * 利用者ID設定
     * @param dto
     */
    public async setUserId (dto: CooperateServiceDto): Promise<any> {
        const operator = dto.getOperator();
        const message = dto.getMessage();

        // Bookを取得
        const book = await EntityOperation.isPxrIdExists(dto.getPxrId());
        if (!book) {
            throw new AppError(message.TARGET_NO_DATA, ResponseCode.NOT_FOUND);
        }

        const bookId: number = book.id;
        const actorCode = dto.getActorCode();
        const regionCode = dto.getRegionCode() ? dto.getRegionCode() : null;
        const appCode = dto.getAppCode() ? dto.getAppCode() : null;
        const wfCode: number = null;
        const userId = dto.getUserId();

        // 一致するレコードがない場合エラー
        const cooperate = await EntityOperation.getCooperate(bookId, actorCode, regionCode, appCode, wfCode, null);
        if (!cooperate) {
            throw new AppError(message.PENDING_COOPERATE_NOT_FOUND, ResponseCode.BAD_REQUEST);
        }
        // 既に連携済みの場合エラー
        if (cooperate.status === 1) {
            throw new AppError(message.COOPERATE_ALREADY_LINKED, ResponseCode.BAD_REQUEST);
        }

        // 利用者IDの重複チェック
        const duplicate = await EntityOperation.getDuplicateUserId(actorCode, appCode, wfCode, userId);
        if (duplicate) {
            throw new AppError(message.USER_ID_ALREADY_USERD, ResponseCode.BAD_REQUEST);
        }

        const connection = await connectDatabase();
        await connection.transaction(async trans => {
            // 利用者IDをセット
            cooperate.userId = userId;
            cooperate.updatedBy = operator.getLoginId();

            // 更新を実行
            await EntityOperation.setUserIdToCooperate(trans, cooperate);
        });

        // レスポンスの生成
        const response = new PostCooperateRequestResDto();
        response.pxrId = dto.getPxrId();
        response.setFromEntity(cooperate);

        // レスポンスを返す
        return response.getAsJson();
    }
}
