/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
/* eslint-enable */
import { transformAndValidate } from 'class-transformer-validator';
import AppError from '../../common/AppError';
import Config from '../../common/Config';
import PostUserInfoSearchReqDto from '../../resources/dto/PostUserInfoSearchReqDto';
const message = Config.ReadConfig('./config/message.json');

@Middleware({ type: 'before' })
export default class PostUserInfoSearchRequestValidator implements ExpressMiddlewareInterface {
    async use (request: Request, response: Response, next: NextFunction) {
        if (JSON.stringify(request.body) === JSON.stringify({})) {
            throw new AppError(message.REQUEST_IS_EMPTY, 400);
        }
        // リクエストバリデーション
        await transformAndValidate(PostUserInfoSearchReqDto, request.body);
        next();
    }
}
