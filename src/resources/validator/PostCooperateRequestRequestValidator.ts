/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import { transformAndValidate } from 'class-transformer-validator';
/* eslint-enable */
import PostCooperateRequestReqDto from '../dto/PostCooperateRequestReqDto';
import AppError from '../../common/AppError';
import Config from '../../common/Config';

@Middleware({ type: 'before' })
export default class PostCooperateRequestRequestValidator implements ExpressMiddlewareInterface {
    async use (request: Request, response: Response, next: NextFunction): Promise<void> {
        const message = Config.ReadConfig('./config/message.json');
        // 空かどうか判定し、空と判定した場合にはエラーをスローする
        if (!request.body || JSON.stringify(request.body) === JSON.stringify({})) {
            throw new AppError(message.REQUEST_IS_EMPTY, 400);
        }

        const dto = await transformAndValidate(
            PostCooperateRequestReqDto, request.body
        ) as PostCooperateRequestReqDto;
        // 配列であればエラー
        if (Array.isArray(dto)) {
            throw new AppError(message.UNEXPECTED_ARRAY_REQUEST, 400);
        }

        // wfが設定されている場合
        if (dto.wf) {
            throw new AppError(message.UNSUPPORTED_ACTOR, 400);
        }
        // region, appが2つ以上設定されている場合
        if ((dto.region && dto.app)) {
            throw new AppError(message.SET_WF_AND_APP, 400);
        }

        next();
    }
}
