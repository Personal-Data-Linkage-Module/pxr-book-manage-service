/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import { transformAndValidate } from 'class-transformer-validator';
/* eslint-enable */
import PostCooperateReqDto from '../dto/PostCooperateReqDto';
import AppError from '../../common/AppError';
import Config from '../../common/Config';

@Middleware({ type: 'before' })
export default class PostCooperateRequestValidator implements ExpressMiddlewareInterface {
    async use (request: Request, response: Response, next: NextFunction): Promise<void> {
        const message = Config.ReadConfig('./config/message.json');
        // 空かどうか判定し、空と判定した場合にはエラーをスローする
        if (!request.body || JSON.stringify(request.body) === JSON.stringify({})) {
            throw new AppError(message.REQUEST_IS_EMPTY, 400);
        }

        const dto = await transformAndValidate(PostCooperateReqDto, request.body);
        // 配列であればエラー
        if (Array.isArray(dto)) {
            throw new AppError(message.UNEXPECTED_ARRAY_REQUEST, 400);
        }

        next();
    }
}
