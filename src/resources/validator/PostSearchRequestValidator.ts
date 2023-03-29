/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import { transformAndValidate } from 'class-transformer-validator';
import PostSearchReqDto from '../dto/PostSearchReqDto';
import AppError from '../../common/AppError';
import Config from '../../common/Config';
const message = Config.ReadConfig('./config/message.json');
/* eslint-enable */

@Middleware({ type: 'before' })
export default class PostSearchRequestValidator implements ExpressMiddlewareInterface {
    async use (request: Request, response: Response, next: NextFunction) {
        if (JSON.stringify(request.body) === JSON.stringify({})) {
            throw new AppError(message.REQUEST_IS_EMPTY, 400);
        }
        const dto = await transformAndValidate(PostSearchReqDto, request.body);
        if (Array.isArray(dto)) {
            throw new AppError(message.REQUEST_IS_ARRAY, 400);
        }
        if (
            dto.createdAt &&
            dto.createdAt.end &&
            dto.createdAt.start &&
            dto.createdAt.end.getTime() - dto.createdAt.start.getTime() < 0
        ) {
            throw new AppError(message.DATE_SCOPE_INVALID, 400);
        }
        // offsetを指定してlimitが指定していない
        if (dto.offset !== null && !dto.limit) {
            throw new AppError(message.MISSING_LIMIT, 400);
        }
        // limitを指定してoffsetを指定していない
        if (dto.limit && dto.offset === null) {
            throw new AppError(message.MISSING_OFFSET, 400);
        }

        next();
    }
}
