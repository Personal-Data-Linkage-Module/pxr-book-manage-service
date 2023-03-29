/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Request } from 'express';
import {
    JsonController, Post, Body, Header, Req, UseBefore
} from 'routing-controllers';
import PostIdentitySearchReqDto from './dto/PostIdentitySearchReqDto';
import PostIdentitySearchResDto from './dto/PostIdentitySearchResDto';
import SessionCheckDto from '../services/dto/SessionCheckDto';
import SessionCheckService from '../services/SessionCheckService';
import IdentitySearchServiceDto from '../services/dto/IdentitySearchServiceDto';
import IdentitySearchService from '../services/IdentitySearchService';
import PostIdentitySearchRequestValidator from './validator/PostIdentitySearchRequestValidator';
import EnableSimpleBackPressure from './backpressure/EnableSimpleBackPressure';
import { OperatorType } from '../common/Operator';
import Config from '../common/Config';
/* eslint-enable */

/**
 * 本人性確認事項取得コントローラ
 */
@JsonController('/book-manage')
export default class IdentityController {
    @Post('/identity')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(PostIdentitySearchRequestValidator)
    async postIdentitySearch (@Req() req: Request, @Body() dto: PostIdentitySearchReqDto) {
        const configure = Config.ReadConfig('./config/config.json');
        const message = Config.ReadConfig('./config/message.json');

        // セッションチェックデータオブジェクトを生成
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setMessage(message);

        // 除外するオペレータタイプの指定
        const ignoreOperators: number[] = [OperatorType.TYPE_IND, OperatorType.TYPE_APP];
        sessionCheckDto.setIgnoreOperatorTypeList(ignoreOperators);

        // サービス層のセッションチェックを実行
        const sessionCheckService: SessionCheckService = new SessionCheckService();
        await sessionCheckService.isSessionCheck(sessionCheckDto);

        // サービス層の一覧取得処理を実行
        const serviceDto = new IdentitySearchServiceDto();
        serviceDto.setPxrId(dto.pxrId);
        serviceDto.setMessage(message);
        const identitySearchService = new IdentitySearchService();
        const resDto: PostIdentitySearchResDto = await identitySearchService.getMyConditionBook(serviceDto);
        const resJson = resDto.getAsJson();
        return resJson;
    }
}
