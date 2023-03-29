/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Request, Response } from 'express';
import {
    JsonController, Post, Body, Header, Res, Req, UseBefore
} from 'routing-controllers';
import PostCTokenSearchReqDto from './dto/PostCTokenSearchReqDto';
import PostCTokenSearchResDto from './dto/PostCTokenSearchResDto';
import Operator from './dto/OperatorReqDto';
import SessionCheckDto from '../services/dto/SessionCheckDto';
import SessionCheckService from '../services/SessionCheckService';
import CTokenSearchServiceDto from '../services/dto/CTokenSearchServiceDto';
import CTokenSearchService from '../services/CTokenSearchService';
import PostCTokenSearchRequestValidator from './validator/PostCTokenSearchRequestValidator';
import EnableSimpleBackPressure from './backpressure/EnableSimpleBackPressure';
import { OperatorType } from '../common/Operator';
import Config from '../common/Config';
/* eslint-enable */

/**
 * 本人性確認事項取得コントローラ
 */
@JsonController('/book-manage')
export default class CTokenSearchController {
    @Post('/ctoken')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(PostCTokenSearchRequestValidator)
    async postCTokenSearch (@Req() req: Request, @Body() dto: PostCTokenSearchReqDto) {
        const configure = Config.ReadConfig('./config/config.json');
        const message = Config.ReadConfig('./config/message.json');

        // セッションチェックデータオブジェクトを生成
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setMessage(message);

        // 除外するオペレータタイプの指定
        const ignoreOperators: number[] = [OperatorType.TYPE_APP, OperatorType.TYPE_WF, OperatorType.TYPE_MANAGE_MEMBER];
        sessionCheckDto.setIgnoreOperatorTypeList(ignoreOperators);

        // サービス層のセッションチェックを実行
        const sessionCheckService: SessionCheckService = new SessionCheckService();
        const operator: Operator = await sessionCheckService.isSessionCheck(sessionCheckDto);

        // サービス層の一覧取得処理を実行
        const serviceDto = new CTokenSearchServiceDto();
        serviceDto.setOperator(operator);
        if (dto.createAt) {
            serviceDto.setStartAt(dto.createAt.start ? new Date(dto.createAt.start) : null);
            serviceDto.setEndAt(dto.createAt.end ? new Date(dto.createAt.end) : null);
        }
        serviceDto.setConfigure(configure);
        serviceDto.setMessage(message);
        const cTokenService = new CTokenSearchService();
        const resDto: PostCTokenSearchResDto = await cTokenService.getCTokenSearch(serviceDto);
        const resJson = resDto.getAsJson();
        return resJson;
    }
}
