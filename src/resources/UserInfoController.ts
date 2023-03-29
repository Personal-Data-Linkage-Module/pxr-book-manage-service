/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Request, Response } from 'express';
import {
    JsonController, Post, Body, Header, Req, UseBefore, Res
} from 'routing-controllers';
import PostUserInfoSearchResDto from './dto/PostUserInfoSearchResDto';
/* eslint-enable */
import { transformAndValidate } from 'class-transformer-validator';
import EnableSimpleBackPressure from './backpressure/EnableSimpleBackPressure';
import Config from '../common/Config';
import SessionCheckDto from '../services/dto/SessionCheckDto';
import SessionCheckService from '../services/SessionCheckService';
import PostUserInfoSearchRequestValidator from './validator/PostUserInfoSearchRequestValidator';
import PostUserInfoSearchReqDto from './dto/PostUserInfoSearchReqDto';
import PostUserInfoRequestValidator from './validator/PostUserInfoRequestValidator';
import PostUserInfoReqDto from './dto/PostUserInfoReqDto';
import UserInfoServiceDto from '../services/dto/UserInfoServiceDto';
import UserInfoService from '../services/UserInfoService';
const configure = Config.ReadConfig('./config/config.json');
const message = Config.ReadConfig('./config/message.json');

/**
 * 利用者管理情報コントローラ
 */
@JsonController('/book-manage/user/info')
export default class UserInfoController {
    @Post('/search')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(PostUserInfoSearchRequestValidator)
    async postUserInfoSearch (@Req() req: Request, @Res() res: Response) {
        // リクエストバリデーション
        let dto = await transformAndValidate(PostUserInfoSearchReqDto, req.body);
        dto = <PostUserInfoSearchReqDto[]>dto;

        // セッションチェックデータオブジェクトを生成
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setMessage(message);

        // サービス層のセッションチェックを実行
        const sessionCheckService: SessionCheckService = new SessionCheckService();
        const operator = await sessionCheckService.isSessionCheck(sessionCheckDto);

        // セッションアクターチェック
        await sessionCheckService.isActorSessionCheck(sessionCheckDto, operator);

        // サービス層の処理を実行
        const serviceDto = new UserInfoServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setRequest<PostUserInfoSearchReqDto[]>(dto);
        const resDto: PostUserInfoSearchResDto = await new UserInfoService().getUserInfo(serviceDto);
        return resDto.getAsJson();
    }

    @Post()
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(PostUserInfoRequestValidator)
    async postUserInfo (@Req() req: Request, @Res() res: Response) {
        // リクエストバリデーション
        let dto = await transformAndValidate(PostUserInfoReqDto, req.body);
        dto = <PostUserInfoReqDto>dto;

        // サービス層のセッションチェックを実行
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setMessage(message);
        const operator = await new SessionCheckService().isSessionCheck(sessionCheckDto);

        // サービス層の処理を実行
        const serviceDto = new UserInfoServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setRequest<PostUserInfoReqDto>(dto);
        return new UserInfoService().postUserInfo(serviceDto);
    }
}
