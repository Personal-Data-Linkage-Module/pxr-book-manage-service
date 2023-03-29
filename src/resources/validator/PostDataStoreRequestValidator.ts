/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
/* eslint-enable */
import { transformAndValidate } from 'class-transformer-validator';
import PostDataStoreReqDto from '../dto/PostDataStoreReqDto';
import AppError from '../../common/AppError';
import Config from '../../common/Config';
import { ResponseCode } from '../../common/ResponseCode';

@Middleware({ type: 'before' })
export default class PostDataStoreRequestValidator implements ExpressMiddlewareInterface {
    async use (request: Request, response: Response, next: NextFunction): Promise<void> {
        const message = Config.ReadConfig('./config/message.json');
        // 空かどうか判定し、空と判定した場合にはエラーをスローする
        if (!request.body || JSON.stringify(request.body) === JSON.stringify({})) {
            throw new AppError(message.REQUEST_IS_EMPTY, ResponseCode.BAD_REQUEST);
        }
        const dto = await transformAndValidate(PostDataStoreReqDto, request.body) as PostDataStoreReqDto;

        // wfとappのチェック（どちらか一方のみ_codeオブジェクトならOK）
        // 双方が_codeオブジェクトの場合、エラー
        if (dto.wf) {
            // サポート対象外：WF
            throw new AppError(message.UNSUPPORTED_ACTOR, ResponseCode.BAD_REQUEST);
        }
        if (!dto.app) {
            throw new AppError(message.EMPTY_WF_AND_APP, ResponseCode.BAD_REQUEST);
        }
        next();
    }
}
