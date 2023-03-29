/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Request } from 'express';
import {
    JsonController, Post, Header, Req, UseBefore
} from 'routing-controllers';
import GetLoginCodeResDto from './dto/GetLoginCodeResDto';
import GetLoginCodeReqDto from './dto/GetLoginCodeReqDto';
import { OperatorType } from '../common/Operator';
import { transformAndValidate } from 'class-transformer-validator';
import SessionCheckDto from '../services/dto/SessionCheckDto';
import SessionCheckService from '../services/SessionCheckService';
import EnableSimpleBackPressure from './backpressure/EnableSimpleBackPressure';
import Config from '../common/Config';
import LoginCodeService from '../services/LoginCodeService';
import LoginCodeServiceDto from '../services/dto/LoginCodeServiceDto';
import GetLoginCodeRequestValidator from './validator/GetLoginCodeRequestValidator';
import AppError from '../common/AppError';
import { ResponseCode } from '../common/ResponseCode';
/* eslint-enable */

/**
 * ログインコード再作成コントローラ
 */
@JsonController('/book-manage')
export default class LoginCodeController {
    @Post('/login-code')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(GetLoginCodeRequestValidator)
    async getLoginCode (@Req() req: Request) {
        const configure = Config.ReadConfig('./config/config.json');
        const message = Config.ReadConfig('./config/message.json');

        // パラメータを取得
        let dto = await transformAndValidate(GetLoginCodeReqDto, req.body);
        dto = <GetLoginCodeReqDto>dto;

        // セッションチェックデータオブジェクトを生成
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setMessage(message);

        // 除外するオペレータタイプの指定
        const ignoreOperators: number[] = [OperatorType.TYPE_IND, OperatorType.TYPE_WF, OperatorType.TYPE_APP];
        sessionCheckDto.setIgnoreOperatorTypeList(ignoreOperators);

        // サービス層のセッションチェックを実行
        const sessionCheckService: SessionCheckService = new SessionCheckService();
        const operator = await sessionCheckService.isSessionCheck(sessionCheckDto);

        // BOOK開設権限がない場合
        if (!operator['auth'] ||
            !operator['auth']['book'] ||
            !operator['auth']['book']['create'] ||
            operator['auth']['book']['create'] !== true) {
            // エラーを返す
            throw new AppError(message.REQUEST_UNAUTORIZED, ResponseCode.UNAUTHORIZED);
        }

        // サービス層のパスワードリセット処理を実行
        const serviceDto = new LoginCodeServiceDto();
        serviceDto.setPxrId(dto.pxrId);
        serviceDto.setConfig(configure);
        serviceDto.setMessage(message);
        serviceDto.setOperator(operator);
        const searchService = new LoginCodeService();
        const resDto: GetLoginCodeResDto = await searchService.reCreateLoginCode(serviceDto);

        // レスポンスを返す
        const resJson = resDto.getAsJson();
        return resJson;
    }
}
