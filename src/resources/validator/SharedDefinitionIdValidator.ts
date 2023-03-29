/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import { sprintf } from 'sprintf-js';
/* eslint-enable */
import { ResponseCode } from '../../common/ResponseCode';
import AppError from '../../common/AppError';
import Config from '../../common/Config';
const message = Config.ReadConfig('./config/message.json');

@Middleware({ type: 'before' })
export default class implements ExpressMiddlewareInterface {
    async use (request: Request, response: Response, next: NextFunction): Promise<void> {
        if (!this.isNumber(request.params['shareId'])) {
            throw new AppError(sprintf(message.NUMBER_INVALID, 'shareId'), ResponseCode.NOT_FOUND);
        }
        next();
    }

    /**
     * 数値判定
     * @param target
     */
    private isNumber (target: any): boolean {
        return !isNaN(Number(target));
    }
}
