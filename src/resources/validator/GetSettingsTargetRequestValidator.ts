/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
/* eslint-enable */
import { transformAndValidate } from 'class-transformer-validator';
import GetSettingsTargetReqDto from '../dto/GetSettingsTargetReqDto';

@Middleware({ type: 'before' })
export default class GetSettingsTargetRequestValidator implements ExpressMiddlewareInterface {
    async use (request: Request, response: Response, next: NextFunction): Promise<void> {
        await transformAndValidate(GetSettingsTargetReqDto, request.query);
        next();
    }
}
