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
import { ResponseCode } from '../../common/ResponseCode';
import PostOutputPrepareReqDto from '../..//resources/dto/PostOutputPrepareReqDto';
const Message = Config.ReadConfig('./config/message.json');

@Middleware({ type: 'before' })
export default class PostOutputPrepareRequestValidator implements ExpressMiddlewareInterface {
    async use (request: Request, response: Response, next: NextFunction): Promise<void> {
        // 空かどうか判定し、空と判定した場合にはエラーをスロー
        if (!request.body || JSON.stringify(request.body) === JSON.stringify({})) {
            throw new AppError(Message.REQUEST_IS_EMPTY, ResponseCode.BAD_REQUEST);
        }
        const dto = await transformAndValidate(PostOutputPrepareReqDto, request.body);
        if (Array.isArray(dto)) {
            throw new AppError(Message.REQUEST_IS_ARRAY, 400);
        }
        if (dto.type < 2 || dto.type > 5) {
            throw new AppError(Message.INVALID_TYPE, 400);
        }
        if (!dto.actor && (dto.type === 2 || dto.type === 3)) {
            throw new AppError(Message.REQUIRED_ACTOR_FOR_OUTPUT, 400);
        }
        if (!dto.region && (dto.type === 2 || dto.type === 3)) {
            throw new AppError(Message.REQUIRED_REGION_FOR_REGION_END, 400);
        }
        if (dto.region && !dto.cooperationRelease) {
            throw new AppError(Message.REQUIRED_COOPERATION_RELEASE, 400);
        }
        next();
    }
}
