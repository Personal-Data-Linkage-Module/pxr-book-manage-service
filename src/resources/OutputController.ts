/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Request } from 'express';
import {
    JsonController, Post, Header, Req, UseBefore, QueryParam, Put, Get, QueryParams
} from 'routing-controllers';
import { transformAndValidate } from 'class-transformer-validator';
import EnableSimpleBackPressure from './backpressure/EnableSimpleBackPressure';
import OutputService from '../services/OutputService';
import OutputServiceDto from '../services/dto/OutputServiceDto';
import Config from '../common/Config';
import PostGetOutputCodeReqDto from './dto/PostGetOutputCodeReqDto';
import PostOutputPrepareReqDto from './dto/PostOutputPrepareReqDto';
import SessionCheckDto from '../services/dto/SessionCheckDto';
import { OperatorType } from '../common/Operator';
import SessionCheckService from '../services/SessionCheckService';
import PostGetMcdOutputCodeDataFileReqDto from './dto/PostGetMcdOutputCodeDataFileReqDto';
import PostUpdateMcdOutputCodeDataFileRequestValidator from './validator/PostUpdateMcdOutputCodeDataFileRequestValidator';
import PostUpdateMcdOutputCodeDataFileReqDto from './dto/PostUpdateMcdOutputCodeDataFileReqDto';
import PostGetMcdOutputCodeDataFileRequestValidator from './validator/PostGetMcdOutputCodeDataFileRequestValidator';
import PostGetOutputCodeRequestValidator from './validator/PostGetOutputCodeRequestValidator';
import AppError from '../common/AppError';
import PostOutputPrepareRequestValidator from './validator/PostOutputPrepareRequestValidator';
import PutUpdateOutputCodeRequestValidator from './validator/PutUpdateOutputCodeRequestValidator';
import PutUpdateOutputCodeReqDto from './dto/PutUpdateOutputCodeReqDto';
import PostCreateMcdOutputCodeDataFileRequestValidator from './validator/PostCreateMcdOutputCodeDataFileRequestValidator';
import PostCreateMcdOutputCodeDataFileReqDto from './dto/PostCreateMcdOutputCodeDataFileReqDto';
import GetOutputConditionReqDto from './dto/GetOutputConditionReqDto';
/* eslint-enable */

/**
 * データ出力コントローラ
 */
@JsonController('/book-manage')
export default class OutputController {
    /**
     * My-Condition-Data出力コード取得
     */
    @Post('/output')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(PostGetOutputCodeRequestValidator)
    async postGetOutputCode (@QueryParam('offset') offset: number, @QueryParam('limit') limit: number, @Req() req: Request) {
        const configure = Config.ReadConfig('./config/config.json');

        // サービス層のセッションチェックを実行
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setIgnoreOperatorTypeList([OperatorType.TYPE_IND]);
        const operator = await new SessionCheckService().isSessionCheck(sessionCheckDto);

        // body, paramsを統合
        const data = Object.assign(req.body, req.params);

        // パラメータを取得
        let dto = await transformAndValidate(PostGetOutputCodeReqDto, data);
        dto = <PostGetOutputCodeReqDto>dto;

        // My-Condition-Data出力コード取得オブジェクトを生成
        const outputDto = new OutputServiceDto();
        outputDto.setOperator(operator);
        outputDto.setRequest(dto);
        outputDto.setOffset(offset);
        outputDto.setLimit(limit);

        // サービス層のデータ出力を実行
        const ret = await new OutputService().getOutputCodeRecord(outputDto);
        return ret;
    }

    /**
     * My-Condition-Data出力コード更新
     */
    @Put('/output/:id')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(PutUpdateOutputCodeRequestValidator)
    async putOutputCodeId (@Req() req: Request) {
        const configure = Config.ReadConfig('./config/config.json');

        // サービス層のセッションチェックを実行
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setIgnoreOperatorTypeList([OperatorType.TYPE_IND, OperatorType.TYPE_WF, OperatorType.TYPE_APP]);
        const operator = await new SessionCheckService().isSessionCheck(sessionCheckDto);

        // body, paramsを統合
        const data = Object.assign(req.body, req.params);

        // パラメータを取得
        let dto = await transformAndValidate(PutUpdateOutputCodeReqDto, data);
        dto = <PutUpdateOutputCodeReqDto>dto;

        // データ出力オブジェクトを生成
        const outputDto = new OutputServiceDto();
        outputDto.setOperator(operator);
        outputDto.setId(parseInt(dto.id));
        outputDto.setRequest(dto);

        // サービス層のデータ出力を実行
        const service: OutputService = new OutputService();
        const ret = await service.updateOutputCodeRecord(outputDto);
        return ret;
    }

    /**
     * 出力データ収集アクター取得
     */
    @Get('/output/condition')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    async getOutputCondition (@Req() req: Request, @QueryParams() dto: GetOutputConditionReqDto) {
        const configure = Config.ReadConfig('./config/config.json');

        // サービス層のセッションチェックを実行
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setIgnoreOperatorTypeList([OperatorType.TYPE_IND, OperatorType.TYPE_WF, OperatorType.TYPE_APP]);
        const operator = await new SessionCheckService().isSessionCheck(sessionCheckDto);

        // 出力データ収集アクター取得オブジェクトを生成
        const outputDto = new OutputServiceDto();
        outputDto.setOperator(operator);
        outputDto.setOffset(dto.offset);
        outputDto.setLimit(dto.limit);
        outputDto.setIsServiceCanceled(dto.isServiceCanceled);
        outputDto.setId(dto.id);
        outputDto.mcdOutputCodeId = dto.mcdOutputCodeId;
        outputDto.setApproved(dto.approved);

        // サービス層のデータ出力を実行
        const ret = await new OutputService().getOutputCondition(outputDto);
        return ret;
    }

    /**
     * 出力データ管理取得
     */
    @Post('/output/condition/data_mng/search')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(PostGetMcdOutputCodeDataFileRequestValidator)
    async postGetMcdOutputCodeDataFile (@Req() req: Request, @QueryParam('offset') offset: number, @QueryParam('limit') limit: number, @QueryParam('approved') approved?: number) {
        const configure = Config.ReadConfig('./config/config.json');

        // サービス層のセッションチェックを実行
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setIgnoreOperatorTypeList([OperatorType.TYPE_IND, OperatorType.TYPE_WF, OperatorType.TYPE_APP]);
        const operator = await new SessionCheckService().isSessionCheck(sessionCheckDto);

        // body, paramsを統合
        const data = Object.assign(req.body, req.params);

        // パラメータを取得
        let dto = await transformAndValidate(PostGetMcdOutputCodeDataFileReqDto, data);
        dto = <PostGetMcdOutputCodeDataFileReqDto>dto;

        // My-Condition-Data出力コード取得オブジェクトを生成
        const outputDto = new OutputServiceDto();
        outputDto.setOperator(operator);
        outputDto.setRequest(dto);
        outputDto.setOffset(offset);
        outputDto.setLimit(limit);
        outputDto.setApproved(approved);

        // サービス層のデータ出力を実行
        const ret = await new OutputService().getMcdOutputDataFile(outputDto);
        return ret;
    }

    /**
     * 出力データ管理更新
     */
    @Put('/output/condition/data_mng/:id')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(PostUpdateMcdOutputCodeDataFileRequestValidator)
    async postUpdateMcdOutputCodeDataFile (@Req() req: Request) {
        const configure = Config.ReadConfig('./config/config.json');
        // サービス層のセッションチェックを実行
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setIgnoreOperatorTypeList([OperatorType.TYPE_IND, OperatorType.TYPE_WF, OperatorType.TYPE_APP]);
        const operator = await new SessionCheckService().isSessionCheck(sessionCheckDto);

        // body, paramsを統合
        const data = Object.assign(req.body, req.params);

        // パラメータを取得
        let dto = await transformAndValidate(PostUpdateMcdOutputCodeDataFileReqDto, data);
        dto = <PostUpdateMcdOutputCodeDataFileReqDto>dto;

        // My-Condition-Data出力コード取得オブジェクトを生成
        const outputDto = new OutputServiceDto();
        outputDto.setOperator(operator);
        outputDto.setRequest(dto);
        outputDto.setId(parseInt(dto.id));

        // サービス層のデータ出力を実行
        const ret = await new OutputService().updateMcdOutputDataFile(outputDto);
        return ret;
    }

    /**
     * データ出力準備
     */
    @Post('/output/condition/prepare')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(PostOutputPrepareRequestValidator)
    async postOutputPrepare (@Req() req: Request) {
        const configure = Config.ReadConfig('./config/config.json');
        const Message = Config.ReadConfig('./config/message.json');
        // body, paramsを統合
        const data = Object.assign(req.body, req.params);

        // パラメータを取得
        let dto = await transformAndValidate(PostOutputPrepareReqDto, data);
        dto = <PostOutputPrepareReqDto>dto;

        // サービス層のセッションチェックを実行
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setIgnoreOperatorTypeList([OperatorType.TYPE_WF, OperatorType.TYPE_APP]);
        const operator = await new SessionCheckService().isSessionCheck(sessionCheckDto);

        // ログイン情報.typeが0: 個人であれば、リクエスト.出力タイプが3(Region利用自動終了)、4(Book閉鎖)であることを確認する
        if (OperatorType.TYPE_IND === operator.getType() && !(dto.type === 3 || dto.type === 4)) {
            throw new AppError(Message.REQUEST_UNAUTORIZED, 400);
        }
        // pxrId: 個人がリクエストした際にあったらエラー。運営メンバーがリクエストした際になければエラー
        if (OperatorType.TYPE_IND === operator.getType() && dto.pxrId) {
            throw new AppError(Message.REQUEST_UNAUTORIZED, 400);
        }
        if (OperatorType.TYPE_MANAGE_MEMBER === operator.getType() && !dto.pxrId) {
            throw new AppError(Message.REQUEST_UNAUTORIZED, 400);
        }
        // データ出力オブジェクトを生成
        const outputDto = new OutputServiceDto();
        outputDto.setOperator(operator);
        outputDto.setRequest(dto);

        // サービス層のデータ出力を実行
        const ret = await new OutputService().prepare(outputDto);
        return ret;
    }

    /**
     * データ管理作成
     */
    @Post('/output/condition/data_mng')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(PostCreateMcdOutputCodeDataFileRequestValidator)
    async postCreateOutputConditionDataMng (@Req() req: Request) {
        const configure = Config.ReadConfig('./config/config.json');

        // サービス層のセッションチェックを実行
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setIgnoreOperatorTypeList([OperatorType.TYPE_IND, OperatorType.TYPE_WF, OperatorType.TYPE_APP]);
        const operator = await new SessionCheckService().isSessionCheck(sessionCheckDto);

        // body, paramsを統合
        const data = Object.assign(req.body, req.params);

        // パラメータを取得
        let dto = await transformAndValidate(PostCreateMcdOutputCodeDataFileReqDto, data);
        dto = <PostCreateMcdOutputCodeDataFileReqDto>dto;

        // My-Condition-Data出力コード取得オブジェクトを生成
        const outputDto = new OutputServiceDto();
        outputDto.setOperator(operator);
        outputDto.setRequest(dto);

        const ret = await new OutputService().createMcdOutputDataFile(outputDto);
        return ret;
    }
}
