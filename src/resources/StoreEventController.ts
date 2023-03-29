/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import Config from '../common/Config';
import { Request } from 'express';
import { Body, Header, JsonController, Post, Req, UseBefore } from 'routing-controllers';
import { transformAndValidate } from 'class-transformer-validator';
import SessionCheckDto from '../services/dto/SessionCheckDto';
import { OperatorType } from '../common/Operator';
import SessionCheckService from '../services/SessionCheckService';
import PostStoreEventNotificateReqDto from './dto/PostStoreEventNotificateReqDto';
import PostStoreEventNotificateValidator from './validator/PostStoreEventNotificateValidator';
import StoreEventService from '../services/StoreEventService';
import PostStoreEventValidator from './validator/PostStoreEventValidator';
import PostStoreEventReqDto from './dto/PostStoreEventReqDto';
/* eslint-enable */
const config = Config.ReadConfig('./config/config.json');

@JsonController('/book-manage')
export default class StoreEventController {
    /**
     * 蓄積イベント通知定義更新
     */
    @Post('/store-event')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @UseBefore(PostStoreEventValidator)
    async postStoreEvent (@Req() req: Request) {
        const dto = await transformAndValidate(PostStoreEventReqDto, req.body) as PostStoreEventReqDto;
        // サービス層のセッションチェックを実行
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(config['catalogUrl']);
        sessionCheckDto.setOperatorUrl(config['operatorUrl']);
        const operator = await new SessionCheckService().isSessionCheck(sessionCheckDto);

        // 蓄積イベント通知処理を実行
        const response = await new StoreEventService().postStoreEvent(dto, operator);
        return response;
    }

    /**
     * 蓄積イベント通知
     */
    @Post('/store-event/notificate')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @UseBefore(PostStoreEventNotificateValidator)
    async postStoreEventNotificate (@Req() req: Request) {
        const dto = await transformAndValidate(
            PostStoreEventNotificateReqDto,
            req.body
        ) as PostStoreEventNotificateReqDto;

        // サービス層のセッションチェックを実行
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(config['catalogUrl']);
        sessionCheckDto.setOperatorUrl(config['operatorUrl']);
        // typeがワークフロー職員またはアプリケーション 以外の場合はエラー
        sessionCheckDto.setIgnoreOperatorTypeList([OperatorType.TYPE_IND, OperatorType.TYPE_MANAGE_MEMBER]);
        const operator = await new SessionCheckService().isSessionCheck(sessionCheckDto);

        // 蓄積イベント通知処理を実行
        const response = await new StoreEventService().postStoreEventNotificate(operator, dto);
        return response;
    }
}
