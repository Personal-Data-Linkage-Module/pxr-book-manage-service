/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import AppError from '../../common/AppError';
import { NextFunction, Request, Response } from 'express';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import Config from '../../common/Config';
import { ResponseCode } from '../../common/ResponseCode';
import { transformAndValidate } from 'class-transformer-validator';
import PostStoreEventReqDto from '../../resources/dto/PostStoreEventReqDto';
import { applicationLogger } from '../../common/logging';
/* eslint-enable */
const Message = Config.ReadConfig('./config/message.json');

/**
 * イベント蓄積通知定義更新のバリデーションチェック
 */
@Middleware({ type: 'before' })
export default class PostStoreEventValidator implements ExpressMiddlewareInterface {
    async use (request: Request, response: Response, next: NextFunction) {
        applicationLogger.info('request.body: ' + JSON.stringify(request.body));
        // リクエストが空か確認
        if (!request.body || JSON.stringify(request.body) === JSON.stringify({})) {
            throw new AppError(Message.REQUEST_IS_EMPTY, ResponseCode.BAD_REQUEST);
        }

        const dto = await transformAndValidate(
            PostStoreEventReqDto,
            request.body
        );
        if (Array.isArray(dto)) {
            throw new AppError('リクエストボディが配列であることを許容しません', ResponseCode.BAD_REQUEST);
        }
        next();
    }
}
