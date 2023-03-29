/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
/* eslint-enable */
import { transformAndValidate } from 'class-transformer-validator';
import GetDataStoreReqDto from '../dto/GetDataStoreByIdReqDto';
import AppError from '../../common/AppError';
import { sprintf } from 'sprintf-js';
import Config from '../../common/Config';
import { ResponseCode } from '../../common/ResponseCode';

@Middleware({ type: 'before' })
export default class GetDataStoreRequestValidator implements ExpressMiddlewareInterface {
    async use (request: Request, response: Response, next: NextFunction): Promise<void> {
        const message = Config.ReadConfig('./config/message.json');

        // 両方指定の場合はエラー
        if (request.query['wf']) {
            // サポート対象外：WF
            throw new AppError(message.UNSUPPORTED_ACTOR, ResponseCode.BAD_REQUEST);
        }

        // 指定されている場合に数値でない場合はエラー
        if ((request.query['app']) && (!this.isNumber(request.query['app']))) {
            throw new AppError(sprintf(message.NUMBER_INVALID, 'app'), ResponseCode.BAD_REQUEST);
        }

        await transformAndValidate(GetDataStoreReqDto, request.query);

        next();
    }

    /**
     * 数値判定
     * @param target
     */
    protected isNumber (target: any): boolean {
        return !isNaN(Number(target));
    }
}
