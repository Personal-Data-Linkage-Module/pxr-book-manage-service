/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Request } from 'express';
import {
    JsonController, Post, Body, Header, Req, UseBefore, QueryParam
} from 'routing-controllers';
import PostSearchReqDto from './dto/PostSearchReqDto';
import PostSearchResDto from './dto/PostSearchResDto';
import PostSearchUserReqDto from './dto/PostSearchUserReqDto';
import PostSearchUserResDto from './dto/PostSearchUserResDto';
import PostSearchCooperateReqDto from './dto/PostSearchCooperateReqDto';
import PostSearchCooperateResDto from './dto/PostSearchCooperateResDto';
import SessionCheckDto from '../services/dto/SessionCheckDto';
import SessionCheckService from '../services/SessionCheckService';
import SearchServiceDto from '../services/dto/SearchServiceDto';
import SearchUserServiceDto from '../services/dto/SearchUserServiceDto';
import SearchCooperateServiceDto from '../services/dto/SearchCooperateServiceDto';
import SearchService from '../services/SearchService';
import PostSearchRequestValidator from './validator/PostSearchRequestValidator';
import PostSearchUserRequestValidator from './validator/PostSearchUserRequestValidator';
import PostSearchCooperateRequestValidator from './validator/PostSearchCooperateRequestValidator';
import EnableSimpleBackPressure from './backpressure/EnableSimpleBackPressure';
import Config from '../common/Config';
/* eslint-enable */

/**
 * My-Condition-Book一覧取得コントローラ
 */
@JsonController('/book-manage')
export default class SearchController {
    @Post('/search')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(PostSearchRequestValidator)
    async postSearch (@Req() req: Request, @Body() dto: PostSearchReqDto, @QueryParam('disableFlg') disableFlg?: number) {
        const configure = Config.ReadConfig('./config/config.json');
        const message = Config.ReadConfig('./config/message.json');

        // セッションチェックデータオブジェクトを生成
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setMessage(message);

        // サービス層のセッションチェックを実行
        const sessionCheckService: SessionCheckService = new SessionCheckService();
        const operator = await sessionCheckService.isSessionCheck(sessionCheckDto);

        // サービス層の一覧取得処理を実行
        const serviceDto = new SearchServiceDto();
        serviceDto.setPxrIdList(dto.pxrId);
        if (dto.createdAt) {
            serviceDto.setStart(dto.createdAt.start);
            serviceDto.setEnd(dto.createdAt.end);
        }
        serviceDto.setOffset(dto.offset);
        serviceDto.setLimit(dto.limit);
        serviceDto.setIncludeDeleteCoop(dto.includeDeleteCoop);
        const searchService = new SearchService();
        serviceDto.setOperator(operator);
        serviceDto.setMessage(message);
        serviceDto.setDisableFlg(disableFlg && disableFlg === 1);
        const resDto: PostSearchResDto = await searchService.getMyConditionBookList(serviceDto);
        const resJson = resDto.getAsJson();
        return resJson;
    }

    @Post('/search/user')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(PostSearchUserRequestValidator)
    async postSearchUser (@Req() req: Request, @Body() dto: PostSearchUserReqDto) {
        const configure = Config.ReadConfig('./config/config.json');
        const message = Config.ReadConfig('./config/message.json');

        // セッションチェックデータオブジェクトを生成
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setMessage(message);

        // サービス層のセッションチェックを実行
        const sessionCheckService: SessionCheckService = new SessionCheckService();
        const operator = await sessionCheckService.isSessionCheck(sessionCheckDto);

        // サービス層の一覧取得処理を実行
        const serviceDto = new SearchUserServiceDto();
        serviceDto.setActor(dto.actor);
        serviceDto.setApp(dto.app);
        serviceDto.setWf(dto.wf);
        serviceDto.setUserId(dto.userId);
        serviceDto.setOperator(operator);
        serviceDto.setMessage(message);
        const searchService = new SearchService();
        const resDto: PostSearchUserResDto = await searchService.getMyConditionBookFromUser(serviceDto);
        const resJson = resDto.getAsJson();
        return resJson;
    }

    @Post('/search/cooperate')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(PostSearchCooperateRequestValidator)
    async postSearchCooperate (@Req() req: Request, @Body() dto: PostSearchCooperateReqDto) {
        const configure = Config.ReadConfig('./config/config.json');
        const message = Config.ReadConfig('./config/message.json');

        // セッションチェックデータオブジェクトを生成
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setMessage(message);

        // サービス層のセッションチェックを実行
        const sessionCheckService: SessionCheckService = new SessionCheckService();
        const operator = await sessionCheckService.isSessionCheck(sessionCheckDto);

        // サービス層の一覧取得処理を実行
        const serviceDto = new SearchCooperateServiceDto();
        serviceDto.setActor(dto.actor);
        serviceDto.setApp(dto.app);
        serviceDto.setWf(dto.wf);
        serviceDto.setOperator(operator);
        serviceDto.setMessage(message);
        const searchService = new SearchService();
        const resDto: PostSearchCooperateResDto = await searchService.getUserFromCooperate(serviceDto);
        const resJson = resDto.getAsJson();
        return resJson;
    }
}
