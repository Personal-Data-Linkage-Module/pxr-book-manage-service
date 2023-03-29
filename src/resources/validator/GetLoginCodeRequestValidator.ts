/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
/* eslint-enable */
import { transformAndValidate } from 'class-transformer-validator';
import GetLoginCodeReqDto from '../dto/GetLoginCodeReqDto';

@Middleware({ type: 'before' })
export default class GetLoginCodeRequestValidator implements ExpressMiddlewareInterface {
    async use (request: Request, response: Response, next: NextFunction): Promise<void> {
        // パラメータを取得
        await transformAndValidate(GetLoginCodeReqDto, request.body);
        next();
    }
}
