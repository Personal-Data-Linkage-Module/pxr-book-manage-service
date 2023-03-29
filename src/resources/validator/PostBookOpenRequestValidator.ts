/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import { transformAndValidate } from 'class-transformer-validator';
import PostBookOpenReqDto from '../dto/PostBookOpenReqDto';
import AppError from '../../common/AppError';
import Config from '../../common/Config';
const Message = Config.ReadConfig('./config/message.json');
/* eslint-enable */

@Middleware({ type: 'before' })
export default class PostBookOpenRequestValidator implements ExpressMiddlewareInterface {
    async use (request: Request, response: Response, next: NextFunction): Promise<void> {
        const dto = await transformAndValidate(PostBookOpenReqDto, request.body);
        if (Array.isArray(dto)) {
            throw new AppError(Message.REQUEST_IS_ARRAY, 400);
        }

        next();
    }
}
