/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
/* eslint-enable */
import AppError from '../../common/AppError';
import Config from '../../common/Config';
import { sprintf } from 'sprintf-js';
import { ResponseCode } from '../../common/ResponseCode';

@Middleware({ type: 'before' })
export default class DeleteDataStoreRequestValidator implements ExpressMiddlewareInterface {
    async use (request: Request, response: Response, next: NextFunction): Promise<void> {
        const message = Config.ReadConfig('./config/message.json');

        if (!this.isNumber(request.params['storeId'])) {
            throw new AppError(sprintf(message.NUMBER_INVALID, 'storeId'), ResponseCode.NOT_FOUND);
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
