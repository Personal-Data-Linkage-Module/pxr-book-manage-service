/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import { transformAndValidate } from 'class-transformer-validator';
import PostSearchCooperateReqDto from '../dto/PostSearchCooperateReqDto';
import AppError from '../../common/AppError';
import Config from '../../common/Config';
import { ResponseCode } from '../../common/ResponseCode';
const message = Config.ReadConfig('./config/message.json');
/* eslint-enable */

@Middleware({ type: 'before' })
export default class PostSearchCooperateRequestValidator implements ExpressMiddlewareInterface {
    async use (request: Request, response: Response, next: NextFunction) {
        if (JSON.stringify(request.body) === JSON.stringify({})) {
            throw new AppError(message.REQUEST_IS_EMPTY, ResponseCode.BAD_REQUEST);
        }
        const dto = await transformAndValidate(PostSearchCooperateReqDto, request.body);
        if (Array.isArray(dto)) {
            throw new AppError(message.REQUEST_IS_ARRAY, ResponseCode.BAD_REQUEST);
        }
        // wfが設定されていたらエラー
        if (dto.wf) {
            throw new AppError(message.UNSUPPORTED_ACTOR, ResponseCode.BAD_REQUEST);
        }
        next();
    }
}
