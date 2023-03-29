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
import { transformAndValidate } from 'class-transformer-validator';
import OutputServiceDto from './dto/OutputServiceDto';
import McdOutputCodeDataFile from '../repositories/postgres/McdOutputCodeDataFile';
import MyConditionDataOutputCode from '../repositories/postgres/MyConditionDataOutputCode';
import PostUpdateMcdOutputCodeDataFileReqDto from '../resources/dto/PostUpdateMcdOutputCodeDataFileReqDto';
import PostGetMcdOutputCodeDataFileReqDto from '../resources/dto/PostGetMcdOutputCodeDataFileReqDto';
import PostGetOutputCodeReqDto from '../resources/dto/PostGetOutputCodeReqDto';
import PostOutputPrepareReqDto, { CodeObject } from '../resources/dto/PostOutputPrepareReqDto';
import PostCreateMcdOutputCodeDataFileReqDto from '../resources/dto/PostCreateMcdOutputCodeDataFileReqDto';
import McdOutputCodeDataType from '../repositories/postgres/McdOutputCodeDataType';
import McdOutputCodeActor from '../repositories/postgres/McdOutputCodeActor';
import MyConditionBook from '../repositories/postgres/MyConditionBook';
import PutUpdateOutputCodeReqDto from '../resources/dto/PutUpdateOutputCodeReqDto';
import OperatorReqDto from '../resources/dto/OperatorReqDto';
/* eslint-enable */
import AppError from '../common/AppError';
import { applicationLogger } from '../common/logging';
import { connectDatabase } from '../common/Connection';
import { ResponseCode } from '../common/ResponseCode';
import CatalogService from './CatalogService';
import Config from '../common/Config';
import { OperatorType } from '../common/Operator';
import EntityOperation from '../repositories/EntityOperation';
import CatalogDto from './dto/CatalogDto';
import { DateTimeFormatString } from '../common/Transform';
import moment = require('moment');
import uuid = require('uuid');
const Message = Config.ReadConfig('./config/message.json');
const Configure = Config.ReadConfig('./config/config.json');

/**
 * データ出力サービス
 */
@Service()
export default class OutputService {
    /**
     * My-Condition-Data出力コード取得
     * リファクタ履歴
     *  separate : checkActorCatalogForGetOutputCode（アクターカタログチェック処理）
     *  separate : getMcdOutputCodes（My-Condition-Data出力コード取得処理）
     *  separate : createResponseGetOutputCode（レスポンス生成処理）
     */
    public async getOutputCodeRecord (dto: OutputServiceDto): Promise<any> {
        const processing = 1;
        const operator = dto.getOperator();
        let request = await transformAndValidate(PostGetOutputCodeReqDto, dto.getRequestBody());
        request = <PostGetOutputCodeReqDto>request;
        // アクターがapp-p, wf-pであれば、app, wfが設定されていることかつ、アクターとそのapp, wfが関連していること
        await this.checkActorCatalogForGetOutputCode(operator, request);
        // My-Condition-Data出力コード取得
        const mcdOutputCodes = await this.getMcdOutputCodes(request, processing, dto.getOffset(), dto.getLimit());

        // レスポンスを生成
        const response = await this.createResponseGetOutputCode(mcdOutputCodes);

        // レスポンスを返す
        return response;
    }

    /**
     * レスポンス作成（My-Condition-Data出力コード取得）
     * @param mcdOutputCodes
     * @returns
     * リファクタ履歴
     *  inner : setCodeObj（共通処理）
     */
    private async createResponseGetOutputCode (mcdOutputCodes: {}[]) {
        const response: {}[] = [];
        for (const outputCode of mcdOutputCodes) {
            // bookIdでMyConditionBookを取得する
            const output = new MyConditionDataOutputCode(outputCode);
            const book: MyConditionBook = await EntityOperation.getBookRecordById(output.getBookId());
            if (!book || !book.pxrId) {
                // Bookが取得できなければエラー
                applicationLogger.info(Message.EMPTY_PXR_ID);
                continue;
            }

            const res: any = {};
            res.id = output.getId();
            res.bookId = output.bookId;
            res.pxrId = book.pxrId;
            res.code = output.getCode();
            res.type = output.getOutputType();
            if (output.getActorCatalogCode()) {
                res.actor = setCodeObj(output.getActorCatalogCode(), output.getActorCatalogVersion());
            }
            if (output.getRegionCatalogCode()) {
                res.region = setCodeObj(output.getRegionCatalogCode(), output.getRegionCatalogVersion());
            }
            if (output.getAppCatalogCode()) {
                res.app = setCodeObj(output.getAppCatalogCode(), output.getAppCatalogVersion());
            }
            res.s3Bucket = output.getS3bucketName();
            if (output.getPresignedUrlExpireAt()) {
                res.dlUrlExpirationDate = moment(output.getPresignedUrlExpireAt()).tz(Configure['timezone']).format(DateTimeFormatString);
            }
            res.status = output.getPresignedUrlStatus();
            res.bookCloseAvailable = book.bookCloseAvailable;
            res.cooperationCancelApproved = output.getReleaseCooperateApprovalStatus();
            res.cooperationCanceled = output.getReleaseCooperateStatus();
            res.cooperationServiceCanceled = output.getReleaseServiceCooperateStatus();
            res.processing = output.getIsProcessing() ? 1 : 0;
            response.push(res);
        }
        return response;
        // コードオブジェクト生成
        function setCodeObj (_value: number, _ver: number) {
            return {
                _value: _value,
                _ver: _ver
            };
        }
    }

    /**
     * My-Condition-Data出力取得
     * @param request
     * @param processing
     * @returns
     */
    private async getMcdOutputCodes (request: any, processing: number, offset: number, limit: number) {
        const entity = new MyConditionDataOutputCode();
        let bookId;
        if (request.bookId) {
            bookId = Number(request.bookId);
        } else if (request.pxrId) {
            const book = await EntityOperation.isPxrIdExists(request.pxrId);
            if (!book) {
                return [];
            }
            bookId = book.id;
        }
        entity.bookId = bookId;
        entity.code = request.code;
        entity.outputType = request.type;
        if (request.actor) {
            entity.actorCatalogCode = request.actor._value;
        }
        if (request.region) {
            entity.regionCatalogCode = request.region._value;
        }
        if (request.app) {
            entity.appCatalogCode = request.app._value;
        }
        if (request.wf) {
            // サポート対象外：WF
            throw new AppError(Message.UNSUPPORTED_ACTOR, ResponseCode.BAD_REQUEST);
        }
        entity.bucketName = request.s3Bucket;
        entity.presignedUrlExpireAt = request.expirationDate;
        entity.presignedUrlStatus = request.status;
        entity.releaseCooperateApprovalStatus = request.cooperationCancelApproved;
        entity.releaseCooperateStatus = request.cooperationCanceled;
        entity.releaseServiceCooperateStatus = request.cooperationServiceCanceled;
        if (request && typeof request.processing === 'number') {
            entity.isProcessing = request.processing === processing;
        }

        const mcdOutputCodes: MyConditionDataOutputCode[] = await EntityOperation.getMyConditionDataOutputCodeRecord(entity, offset, limit);
        return mcdOutputCodes;
    }

    /**
     * アクターカタログチェック
     * @param operator
     * @param request
     */
    private async checkActorCatalogForGetOutputCode (operator: OperatorReqDto, request: PostGetOutputCodeReqDto) {
        const catalogDto = new CatalogDto();
        catalogDto.setUrl(Configure['catalogUrl']);
        catalogDto.setOperator(operator);
        catalogDto.setMessage(Message);
        catalogDto.setProcNum(0);
        catalogDto.setCode(operator.getActorCode());
        catalogDto.setVersion(null);
        const actorCatalog = await new CatalogService().getCatalogInfo(catalogDto);
        const appPattern: string = '^.+\\/actor\\/app';
        const wfPattern: string = '^.+\\/actor\\/wf';
        if (RegExp(appPattern).test(actorCatalog['catalogItem']['ns'])) {
            const targetApp = request.app;
            if (!targetApp) {
                throw new AppError(Message.EMPTY_APP_CATALOG_CODE, ResponseCode.BAD_REQUEST);
            }
            const applications: any[] = actorCatalog['template']['application'];
            if (!applications.some(ele => Number(ele['_value']) === targetApp._value)) {
                throw new AppError(Message.REQUEST_APPLICATION_IS_NOT_RELATION, ResponseCode.BAD_REQUEST);
            }
        }
        if (RegExp(wfPattern).test(actorCatalog['catalogItem']['ns'])) {
            // サポート対象外：WF
            throw new AppError(Message.UNSUPPORTED_ACTOR, ResponseCode.BAD_REQUEST);
        }
    }

    /**
     * My-Condition-Data出力コード更新
     */
    public async updateOutputCodeRecord (dto: OutputServiceDto): Promise<any> {
        const processing = 1;
        const operator = dto.getOperator();
        let request = await transformAndValidate(PutUpdateOutputCodeReqDto, dto.getRequestBody());
        request = <PutUpdateOutputCodeReqDto>request;
        // 更新対象のEntityを取得
        const entity = await EntityOperation.getMyConditionDataOutputCodeById(dto.getId());
        // 更新項目の設定
        if (request.bookId) {
            entity.bookId = Number(request.bookId);
        }
        if (request.code) {
            entity.code = request.code;
        }
        if (request.type) {
            entity.outputType = request.type;
        }
        if (request.actor) {
            entity.actorCatalogCode = request.actor._value;
            entity.actorCatalogVersion = request.actor._ver;
        }
        if (request.region) {
            entity.regionCatalogCode = request.region._value;
            entity.regionCatalogVersion = request.region._ver;
        }
        if (request.app) {
            entity.appCatalogCode = request.app._value;
            entity.appCatalogVersion = request.app._ver;
        }
        if (request.wf) {
            // サポート対象外：WF
            throw new AppError(Message.UNSUPPORTED_ACTOR, ResponseCode.BAD_REQUEST);
        }
        if (request.s3Bucket) {
            entity.bucketName = request.s3Bucket;
        }
        if (request.expirationDate) {
            entity.presignedUrlExpireAt = request.expirationDate;
        }
        if (request && typeof request.status === 'number') {
            entity.presignedUrlStatus = Number(request.status);
        }
        if (request && typeof request.cooperationCancelApproved === 'number') {
            entity.releaseCooperateApprovalStatus = Number(request.cooperationCancelApproved);
        }
        if (request && typeof request.cooperationCanceled === 'number') {
            entity.releaseCooperateStatus = Number(request.cooperationCanceled);
        }
        if (request && typeof request.cooperationServiceCanceled === 'number') {
            entity.releaseServiceCooperateStatus = Number(request.cooperationServiceCanceled);
        }
        if (request && typeof request.processing === 'number') {
            entity.isProcessing = Number(request.processing) === processing;
        }
        entity.updatedBy = operator.getLoginId();

        // 更新を実行
        await EntityOperation.updateMyConditionDataOutputCodeById(entity);
        return { result: 'success' };
    }

    /**
     * 出力データ管理取得
     * リファクタ履歴
     *  separate : getOutputDataFile（出力データ管理取得処理）
     *  separate : createResponseForGetMcdOutputDataFile（レスポンス作成処理）
     */
    public async getMcdOutputDataFile (dto: OutputServiceDto): Promise<any> {
        let request = await transformAndValidate(PostGetMcdOutputCodeDataFileReqDto, dto.getRequestBody());
        request = <PostGetMcdOutputCodeDataFileReqDto>request;
        // 出力データ管理レコード取得
        const ret = await this.getOutputDataFile(request, dto);

        // レスポンスを生成
        const response: {}[] = this.createResponseForGetMcdOutputDataFile(ret);
        // レスポンスを返す
        return response;
    }

    /**
     * レスポンス作成（出力データ管理取得）
     * @param ret
     * @returns
     * リファクタ履歴
     *  inner : setCodeObj（共通処理）
     */
    private createResponseForGetMcdOutputDataFile (ret: any[]) {
        const response: {}[] = [];
        for (const dataFile of ret) {
            const res: any = {};
            res.id = dataFile['id'];
            res.pxrId = dataFile['pxrId'];
            res.mcdOutputCodeId = Number(dataFile['mcdOutputCodeId']);
            res.mcdOutputCodeActorId = dataFile['mcdOutputCodeActorId'] ? Number(dataFile['mcdOutputCodeActorId']) : null;
            res.code = dataFile['code'];
            res.outputType = dataFile['outputType'];
            res.s3Bucket = dataFile['s3Bucket'];
            if (dataFile['expirationDate']) {
                res.expirationDate = moment(dataFile['expirationDate']).tz(Configure['timezone']).format(DateTimeFormatString);
            }
            if (dataFile['regionCatalogCode']) {
                res.region = setCodeObj(dataFile['regionCatalogCode'], dataFile['regionCatalogVersion']);
            }
            res.actor = setCodeObj(Number(dataFile['actorCatalogCode']), Number(dataFile['actorCatalogVersion']));
            if (dataFile['appCatalogCode']) {
                res.app = setCodeObj(dataFile['appCatalogCode'], dataFile['appCatalogVersion']);
            }
            res.request = dataFile['request'];
            res.outputFileType = dataFile['outputFileType'];
            res.uploadFileType = dataFile['uploadFileType'];
            res.extDataRequested = dataFile['extDataRequested'];
            res.fileName = dataFile['fileName'];
            res.inputFileIsReady = dataFile['inputFileIsReady'];
            res.outputStatus = dataFile['outputStatus'];
            res.isDeleteTarget = dataFile['isDeleteTarget'];
            res.deleteStatus = dataFile['deleteStatus'];
            res.processing = dataFile['processing'] ? 1 : 0;
            response.push(res);
        }
        return response;
        // コードオブジェクト生成
        function setCodeObj (_value: number, _ver: number) {
            return {
                _value: _value,
                _ver: _ver
            };
        }
    }

    /**
     * 出力データ管理レコード取得
     * @param request
     * @param dto
     * @returns
     */
    private async getOutputDataFile (request: PostGetMcdOutputCodeDataFileReqDto, dto: OutputServiceDto) {
        const processing = 1;
        const entity = new McdOutputCodeDataFile();
        entity.mcdOutputCodeActorId = request.mcdOutputCodeActorId;
        entity.mcdOutputCode = request.code;
        if (request.actor) {
            entity.actorCatalogCode = request.actor._value;
            entity.actorCatalogVersion = request.actor._ver;
        }
        entity.ouputDataApprovalStatus = dto.getApproved();
        entity.outputFileType = request.outputFileType;
        entity.uploadFileType = request.uploadFileType;
        entity.notificationStatus = request.extDataRequested;
        entity.inputFilePreparationStatus = request.inputFileIsReady;
        entity.outputStatus = request.outputStatus;
        entity.deleteDataSpec = request.isDeleteTarget;
        entity.deleteStatus = request.deleteStatus;
        if (request && typeof request.processing === 'number') {
            entity.isProcessing = request.processing === processing;
        } else {
            entity.isProcessing = undefined;
        }
        const ret = await EntityOperation.getMcdOutputCodeDataFile(entity, request.outputTypes, dto.getOffset(), dto.getLimit());
        return ret;
    }

    /**
     * 出力データ管理更新
     * リファクタ履歴
     *  separate : createResponseForUpdateMcdOutputDataFile（レスポンス作成処理）
     */
    public async updateMcdOutputDataFile (dto: OutputServiceDto): Promise<any> {
        const processing = 1;
        const operator = dto.getOperator();
        let request = await transformAndValidate(PostUpdateMcdOutputCodeDataFileReqDto, dto.getRequestBody());
        request = <PostUpdateMcdOutputCodeDataFileReqDto>request;

        // 更新対象のEntityを取得
        const entity: any = await EntityOperation.getMcdOutputCodeDataFileById(dto.getId());
        // 更新項目の設定
        if (request.mcdOutputCodeActorId) {
            entity.mcdOutputCodeActorId = request.mcdOutputCodeActorId;
        }
        if (request.code) {
            entity.mcdOutputCode = request.code;
        }
        if (request.actor) {
            entity.actorCatalogCode = request.actor._value;
            entity.actorCatalogVersion = request.actor._ver;
        }
        if (request && typeof request.outputApproved === 'number') {
            entity.ouputDataApprovalStatus = request.outputApproved;
        }
        if (request.outputFileType) {
            entity.outputFileType = request.outputFileType;
        }
        if (request.uploadFileType) {
            entity.uploadFileType = request.uploadFileType;
        }
        if (request && typeof request.extDataRequested === 'number') {
            entity.notificationStatus = request.extDataRequested;
        }
        if (request.fileName) {
            entity.fileName = request.fileName;
        }
        if (request && typeof request.inputFileIsReady === 'number') {
            entity.inputFilePreparationStatus = request.inputFileIsReady;
        }
        if (request && typeof request.outputStatus === 'number') {
            entity.outputStatus = request.outputStatus;
        }
        if (request && typeof request.isDeleteTarget === 'number') {
            entity.deleteDataSpec = request.isDeleteTarget;
        }
        if (request && typeof request.deleteStatus === 'number') {
            entity.deleteStatus = request.deleteStatus;
        }
        if (request && typeof request.processing === 'number') {
            entity.isProcessing = request.processing === processing;
        }
        entity.updatedBy = operator.getLoginId();

        // 更新を実行
        const ret: McdOutputCodeDataFile = await EntityOperation.saveEntity(entity);

        // レスポンスを生成
        const response: any = this.createResponseForUpdateMcdOutputDataFile(ret);

        // レスポンスを返す
        return response;
    }

    /**
     * レスポンス作成（出力データ管理更新）
     * @param ret
     * @returns
     */
    private createResponseForUpdateMcdOutputDataFile (ret: McdOutputCodeDataFile): any {
        return {
            mcdOutputCodeActorId: ret.mcdOutputCodeActorId,
            code: ret.mcdOutputCode,
            actor: {
                _value: ret.actorCatalogCode,
                _ver: ret.actorCatalogVersion
            },
            outputApproved: ret.ouputDataApprovalStatus,
            outputFileType: ret.outputFileType,
            uploadFileType: ret.uploadFileType,
            extDataRequested: ret.notificationStatus,
            fileName: ret.fileName,
            inputFileIsReady: ret.inputFilePreparationStatus,
            outputStatus: ret.outputStatus,
            isDeleteTarget: ret.deleteDataSpec,
            deleteStatus: ret.deleteStatus,
            processing: ret.isProcessing ? 1 : 0
        };
    }

    /**
     * データ出力準備
     * リファクタ履歴
     *  separate : insertMyConditionDataOutputCode（My-Condition-Data出力コード登録）
     *  separate : getTargetWfAppCode（対象WF/APPコード設定）
     *  separate : insertOutputActorOrReserveDeletion（出力データ収集アクター登録）
     */
    public async prepare (dto: OutputServiceDto): Promise<any> {
        // オペレータ情報を取得
        const operator = dto.getOperator();
        let request = await transformAndValidate(PostOutputPrepareReqDto, dto.getRequestBody());
        request = <PostOutputPrepareReqDto>request;

        // 3. 個人であればログイン情報.pxrId, 運営メンバーであればリクエスト.pxrIdでMy-Condition-Bookテーブルを取得する
        const pxrId = operator.getType() === OperatorType.TYPE_IND ? operator.getPxrId() : request.pxrId;
        const myConditionBook = await EntityOperation.isPxrIdExists(pxrId);
        if (!myConditionBook) {
            throw new AppError(Message.FAILED_OPERATOR_GET_PXR_ID, 400);
        }

        // 4. コードを発行する
        const code = uuid();

        // 5. カタログ GET /catalog/name でext_nameを取得する
        const catalogDto = new CatalogDto();
        catalogDto.setUrl(Configure['catalogUrl']);
        catalogDto.setOperator(operator);
        catalogDto.setMessage(Message);
        const catalogService = new CatalogService();
        const extName = await catalogService.getExtName(catalogDto);

        let touCatalog;
        let targetAppWfCodes = [];
        if (request.type === 2 || request.type === 3) {
            // 6. 出力タイプがRegion利用終了: 2,  Region利用自動終了: 3の場合
            // リージョンカタログコードを使用してリージョンカタログを取得する
            catalogDto.setProcNum(0);
            catalogDto.setCode(request.region._value);
            catalogDto.setVersion(null);
            const regionCatalog = await catalogService.getCatalogInfo(catalogDto);

            // 7. 6で取得したリージョンカタログのtemplate.terms-of-use._valueを使用して、リージョン利用規約を取得する
            catalogDto.setCode(regionCatalog['template']['terms-of-use']['_value']);
            catalogDto.setVersion(null);
            touCatalog = await catalogService.getCatalogInfo(catalogDto);

            // 8. 6で取得したリージョンカタログのtemplate.app-alliance, wf-allianceの全要素の_valueでカタログ取得する
            targetAppWfCodes = await this.getTargetWfAppCode(regionCatalog, request, myConditionBook.id, catalogDto, catalogService);
        } else if (request.type === 4 || request.type === 5) {
            // 11. 出力タイプがBook閉鎖: 4, Book強制閉鎖: 5の場合
            // ns: catalog/ext/{ext_name}/terms_of_use/platformのカタログを取得する
            const ns = 'catalog/ext/' + extName + '/terms-of-use/platform';
            catalogDto.setProcNum(1);
            catalogDto.setNs(ns);
            const res = await catalogService.getCatalogInfo(catalogDto);
            touCatalog = res[0];
        }

        // 13. My-Condition-Data出力コードにレコードを登録する
        const { outputCode, myConditionDataOutputCode }: { outputCode: MyConditionDataOutputCode; myConditionDataOutputCode: any; } = await this.insertMyConditionDataOutputCode(myConditionBook, code, request, operator);

        if (request.type === 4 || request.type === 5) {
            // bookのstatusを3: 終了に変更
            const bookEnd = 3;
            const connection = await connectDatabase();
            await connection.transaction(async trans => {
                await EntityOperation.updateBookStatusConsentRequest(trans, myConditionBook.id, bookEnd, operator.getLoginId());
            });
        }

        // 出力データ収集アクター登録（利用者連携情報がない場合は削除予約を行う）
        await this.insertOutputActorOrReserveDeletion(request, myConditionBook, targetAppWfCodes, outputCode, touCatalog, operator, myConditionDataOutputCode);

        // 16. 4で発行したコードをリクエストに追加する
        const requestBody = dto.getRequestBody();
        requestBody['code'] = code;

        // 17. リクエストをレスポンスとして返却する
        return requestBody;
    }

    /**
     * 出力データ収集アクター登録（利用者連携情報がない場合は削除予約を行う）
     * @param request
     * @param myConditionBook
     * @param targetAppWfCodes
     * @param outputCode
     * @param touCatalog
     * @param operator
     * @param myConditionDataOutputCode
     */
    private async insertOutputActorOrReserveDeletion (request: PostOutputPrepareReqDto, myConditionBook: MyConditionBook, targetAppWfCodes: any[], outputCode: MyConditionDataOutputCode, touCatalog: any, operator: OperatorReqDto, myConditionDataOutputCode: any) {
        if (request.type === 2 || request.type === 3 || request.type === 4 || request.type === 5) {
            // 12. bookIdでAPP/WFが設定されている利用者ID連携テーブルを取得する
            const cooperates = await EntityOperation.getAppWfCooperatedRecordByBookIdAndAppWfCodes(myConditionBook.id, targetAppWfCodes);
            if (cooperates && cooperates.length > 0) {
                for (const cooperate of cooperates) {
                    const entity: any = new McdOutputCodeActor();
                    entity.mcdOutputCodeId = outputCode.id;
                    entity.actorCatalogCode = cooperate.actorCatalogCode;
                    entity.actorCatalogVersion = cooperate.actorCatalogVersion;
                    entity.appCatalogCode = cooperate.appCatalogCode > 0 ? cooperate.appCatalogCode : null;
                    entity.appCatalogVersion = cooperate.appCatalogVersion > 0 ? cooperate.appCatalogVersion : null;
                    entity.wfCatalogCode = null;
                    entity.wfCatalogVersion = null;
                    entity.releaseCooperateSpec = request.cooperationRelease ? 0 : 1;
                    entity.releaseCooperateStatus = request.cooperationRelease ? 0 : 1;
                    entity.returnDataSpec = touCatalog['template']['returning-data-flag'] ? 1 : 0;
                    entity.approvalStatus = 1;
                    entity.deleteDataSpec = touCatalog['template']['deleting-data-flag'] ? 1 : 0;
                    entity.createdBy = operator.getLoginId();
                    entity.updatedBy = operator.getLoginId();
                    await EntityOperation.saveEntity(entity);
                }
            } else if (request.type === 4 || request.type === 5) {
                // 出力タイプがBook閉鎖: 4, Book強制閉鎖: 5 かつ利用者ID連携がない場合
                // Book削除予約を行い、My-Condition-Data出力コードを削除する
                await EntityOperation.updateReserveDeletionBook(myConditionBook.id, operator.getLoginId());
                myConditionDataOutputCode.id = outputCode.id;
                myConditionDataOutputCode.isDisabled = true;
                await EntityOperation.saveEntity(myConditionDataOutputCode);
            }
        }
    }

    /**
     * 対象APP/WFコード取得
     * @param regionCatalog
     * @param request
     * @param bookId
     * @param catalogDto
     * @param catalogService
     * @returns
     * リファクタ履歴
     *  inenr : setAppWfCode（app/wfコード設定共通処理）
     */
    private async getTargetWfAppCode (regionCatalog: any, request: any, bookId: number, catalogDto: CatalogDto, catalogService: CatalogService) {
        const targetAppWfCodes = [];
        let appWfCodes: any[] = [];
        if (setAppWfCode(regionCatalog, appWfCodes, 'wf').length > 0) {
            // サポート対象外：WF
            throw new AppError(Message.UNSUPPORTED_ACTOR, ResponseCode.BAD_REQUEST);
        }
        appWfCodes = setAppWfCode(regionCatalog, appWfCodes, 'app');
        if (appWfCodes.length > 0) {
            catalogDto.setRequest(appWfCodes);
            const appWfCatalogs = await catalogService.getCatalogInfos(catalogDto);
            for (const appWf of appWfCatalogs) {
                // 9. 8で取得したカタログのregion-allianceを取得する。指定したregionのカタログコードしかなければ、10はスキップする
                if (appWf['template'] && appWf['template']['region-alliance'] && Array.isArray(appWf['template']['region-alliance']) && appWf['template']['region-alliance'].length > 0) {
                    const otherRegions = [];
                    const regions = appWf['template']['region-alliance'];
                    for (const region of regions) {
                        if (Number(request.region._value) !== Number(region['_value'])) {
                            otherRegions.push(region['_value']);
                        }
                    }
                    if (otherRegions.length > 0) {
                        // 10. 利用者ID連携テーブルを取得する。取得が出来た場合、該当のapp-alliance, wf-allianceのコードを持つアプリケーション、ワークフローは出力コード収集アクターの対象としない
                        const cooperates = await EntityOperation.getCooperatedRecordByBookIdAndRegions(bookId, otherRegions);
                        if (cooperates && cooperates.length > 0) {
                            continue;
                        }
                    }
                    targetAppWfCodes.push(appWf['catalogItem']['_code']['_value']);
                }
            }
        }
        return targetAppWfCodes;
        // app/wfコード設定
        function setAppWfCode (targetCatalog: any, targetCodes: any[], wfOrApp: 'wf' | 'app') {
            if (targetCatalog['template'] && targetCatalog['template'][wfOrApp + '-alliance'] &&
                Array.isArray(targetCatalog['template'][wfOrApp + '-alliance']) &&
                targetCatalog['template'][wfOrApp + '-alliance'].length > 0) {
                const wfApps = targetCatalog['template'][wfOrApp + '-alliance'];
                for (const wfApp of wfApps) {
                    targetCodes.push({
                        _code: {
                            _value: wfApp['_value'],
                            _ver: null
                        }
                    });
                }
            }
            return targetCodes;
        }
    }

    /**
     * My-Condition-Data出力コードにレコード
     * @param myConditionBook
     * @param code
     * @param request
     * @param operator
     * @returns
     */
    private async insertMyConditionDataOutputCode (myConditionBook: MyConditionBook, code: string, request: PostOutputPrepareReqDto, operator: OperatorReqDto) {
        const myConditionDataOutputCode: any = new MyConditionDataOutputCode();
        myConditionDataOutputCode.bookId = myConditionBook.id;
        myConditionDataOutputCode.code = code;
        myConditionDataOutputCode.outputType = request.type;
        if (request.actor) {
            myConditionDataOutputCode.actorCatalogCode = request.actor._value;
            myConditionDataOutputCode.actorCatalogVersion = request.actor._ver;
        }
        if (request.region) {
            myConditionDataOutputCode.regionCatalogCode = request.region._value;
            myConditionDataOutputCode.regionCatalogVersion = request.region._ver;
        }
        myConditionDataOutputCode.bucketName = null;
        myConditionDataOutputCode.presignedUrlExpireAt = null;
        myConditionDataOutputCode.presignedUrlStatus = 0;
        // Region利用者連携解除承認ステータス（承認不要：0, 未承認: 1, 承認：2, 否認：3）
        myConditionDataOutputCode.releaseCooperateApprovalStatus = 0;
        // Region利用者連携解除ステータス（0: 未処理, 1: 処理済）
        myConditionDataOutputCode.releaseCooperateStatus = request.cooperationRelease ? 0 : 1;
        myConditionDataOutputCode.releaseServiceCooperateStatus = request.cooperationRelease ? 0 : 1;
        myConditionDataOutputCode.isProcessing = false;
        myConditionDataOutputCode.createdBy = operator.getLoginId();
        myConditionDataOutputCode.updatedBy = operator.getLoginId();
        const outputCode: MyConditionDataOutputCode = await EntityOperation.saveEntity(myConditionDataOutputCode);
        return { outputCode, myConditionDataOutputCode };
    }

    /**
     * 出力データ管理作成
     */
    public async createMcdOutputDataFile (dto: OutputServiceDto) {
        const processing = 1;
        let request = await transformAndValidate(PostCreateMcdOutputCodeDataFileReqDto, dto.getRequestBody());
        request = <PostCreateMcdOutputCodeDataFileReqDto>request;
        const entity: any = new McdOutputCodeDataFile();
        entity.mcdOutputCodeActorId = request.mcdOutputCodeActorId;
        entity.mcdOutputCode = request.code;
        if (request.actor) {
            entity.actorCatalogCode = request.actor._value;
            entity.actorCatalogVersion = request.actor._ver;
        }
        entity.ouputDataApprovalStatus = request.outputApproved;
        entity.outputFileType = request.outputFileType;
        entity.uploadFileType = request.uploadFileType;
        entity.fileName = request.fileName;
        entity.notificationStatus = request.extDataRequested;
        entity.inputFilePreparationStatus = request.inputFileIsReady;
        entity.outputStatus = request.outputStatus;
        entity.deleteDataSpec = request.isDeleteTarget;
        entity.deleteStatus = request.deleteStatus;
        if (request && typeof request.processing === 'number') {
            entity.isProcessing = request.processing === processing;
        }

        // 更新を実行
        const ret: McdOutputCodeDataFile = await EntityOperation.saveEntity(entity);

        // レスポンスを生成
        const response: any = {
            id: ret.id,
            mcdOutputCodeActorId: ret.mcdOutputCodeActorId,
            code: ret.mcdOutputCode,
            actor: {
                _value: ret.actorCatalogCode,
                _ver: ret.actorCatalogVersion
            },
            outputApproved: ret.ouputDataApprovalStatus,
            outputFileType: ret.outputFileType,
            uploadFileType: ret.uploadFileType,
            extDataRequested: ret.notificationStatus,
            fileName: ret.fileName,
            inputFileIsReady: ret.inputFilePreparationStatus,
            outputStatus: ret.outputStatus,
            isDeleteTarget: ret.deleteDataSpec,
            deleteStatus: ret.deleteStatus,
            processing: ret.isProcessing ? 1 : 0
        };

        // レスポンスを返す
        return response;
    }

    /**
     * 出力データ収集アクター取得
     * リファクタ履歴
     *  separate : setResponse（レコードをレスポンスに設定する処理）
     *  separate : setCondition（出力データ収集アクター設定処理）
     *  inner : setDataCode（データ種コード設定処理）
     *  inner : setDataId（データ種識別子設定処理）
     */
    public async getOutputCondition (dto: OutputServiceDto) {
        const ret = await EntityOperation.getOutputCondition(dto.getOffset(), dto.getLimit(), Number(dto.getId()), Number(dto.mcdOutputCodeId), Number(dto.getApproved()), dto.getIsServiceCanceled());
        const response: {}[] = [];
        let condition: any = null;
        let dataType: any = null;
        let event: any = null;
        let res = null;
        let code = '';
        let actorId = '';
        for (const outputCode of ret) {
            if (!res || code !== outputCode['code']) {
                // My-Condition-Data出力が異なるレコードの場合
                ({ condition, res, code, actorId } = this.setResponse(condition, dataType, res, code, outputCode, actorId, response));
            }
            if (!actorId || actorId !== outputCode['id']) {
                // 出力データ収集アクターが異なるレコードの場合
                // conditionを作成
                ({ condition, dataType, actorId } = this.setCondition(condition, dataType, res, actorId, outputCode));
            }
            if (outputCode['documentCode'] && !outputCode['eventCode'] && !outputCode['thingCode']) {
                dataType = setDataCode(dataType, Number(outputCode['documentCode']), Number(outputCode['documentVersion']), 'document');
            }
            if (outputCode['documentId'] && !outputCode['eventId'] && !outputCode['thingId']) {
                dataType = setDataId(dataType, outputCode['documentId'], 'document');
            }
            if (outputCode['eventCode']) {
                dataType = dataType || {};
                dataType['event'] = dataType['event'] || [];
                if (!event || event['_code']['_value'] !== outputCode['eventCode']) {
                    event = {
                        _code: {
                            _value: Number(outputCode['eventCode']),
                            _ver: Number(outputCode['eventVersion'])
                        }
                    };
                }
                if (outputCode['thingCode']) {
                    event = setDataCode(event, Number(outputCode['thingCode']), Number(outputCode['thingVersion']), 'thing');
                }
                dataType['event'].push(event);
            }
            if (outputCode['eventId']) {
                dataType = dataType || {};
                dataType['eventEntity'] = dataType['eventEntity'] || [];
                if (!event || event['id'] !== outputCode['eventId']) {
                    event = {
                        id: outputCode['eventId']
                    };
                }
                if (outputCode['thingId']) {
                    event = setDataId(event, outputCode['thingId'], 'thing');
                }
                dataType['eventEntity'].push(event);
            }
            if (!outputCode['documentCode'] && !outputCode['eventCode'] && outputCode['thingCode']) {
                dataType = setDataCode(dataType, Number(outputCode['thingCode']), Number(outputCode['thingVersion']), 'thing');
            }
            if (!outputCode['documentId'] && !outputCode['eventId'] && outputCode['thingId']) {
                dataType = setDataId(dataType, outputCode['thingId'], 'thing');
            }
        }
        if (condition) {
            condition.dataType = dataType;
            res['condition'] = res['condition'] || [];
            res['condition'].push(condition);
        }
        return response;
        // 各データ種識別子設定
        function setDataId (data: any, id: string, type: 'document' | 'thing') {
            data = data || {};
            data[type + 'Entity'] = data[type + 'Entity'] || [];
            data[type + 'Entity'].push(id);
            return data;
        }
        // 各データ種コード設定
        function setDataCode (data: any, _value: number, _ver: number, type: 'document' | 'thing') {
            data = data || {};
            data[type] = data[type] || [];
            const document = {
                _value: Number(_value),
                _ver: Number(_ver)
            };
            data[type].push(document);
            return data;
        }
    }

    /**
     * レスポンス設定
     * @param condition
     * @param dataType
     * @param res
     * @param code
     * @param outputCode
     * @param actorId
     * @param response
     * @returns
     */
    private setResponse (condition: any, dataType: any, res: any, code: string, outputCode: any, actorId: string, response: {}[]) {
        if (condition) {
            condition.dataType = dataType;
            res['condition'] = res['condition'] || [];
            res['condition'].push(condition);
        }
        condition = null;
        code = outputCode['code'];
        actorId = '';
        res = {
            code: outputCode['code'],
            type: Number(outputCode['type']),
            condition: condition
        };
        response.push(res);
        return { condition, res, code, actorId };
    }

    /**
     * 出力データ収集アクター設定
     * @param condition
     * @param dataType
     * @param res
     * @param actorId
     * @param outputCode
     * @returns
     */
    private setCondition (condition: any, dataType: any, res: { code: any; type: number; condition: any; }, actorId: string, outputCode: any) {
        if (condition) {
            condition.dataType = dataType;
            res['condition'] = res['condition'] || [];
            res['condition'].push(condition);
        }
        dataType = null;
        actorId = outputCode['id'];
        condition = {
            id: Number(outputCode['id']),
            actor: {
                _value: Number(outputCode['actorCode']),
                _ver: Number(outputCode['actorVersion'])
            },
            returnable: Number(outputCode['returnable']),
            deletable: Number(outputCode['deletable']),
            dataType: dataType,
            request: outputCode['request']
        };
        if (outputCode['start'] || outputCode['end']) {
            condition['period'] = {};
            condition['period']['start'] = outputCode['start'];
            condition['period']['end'] = outputCode['end'];
        }
        if (outputCode['appCode']) {
            condition['app'] = {};
            condition['app']['_value'] = Number(outputCode['appCode']);
            condition['app']['_ver'] = Number(outputCode['appVersion']);
        }
        return { condition, dataType, actorId };
    }
}
