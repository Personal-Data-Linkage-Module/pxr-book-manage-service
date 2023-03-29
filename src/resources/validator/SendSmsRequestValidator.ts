/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { transformAndValidate } from 'class-transformer-validator';
import AppError from '../../common/AppError';
import { Request, Response, NextFunction } from 'express';
import SendSms from '../../resources/dto/SendSms';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import Config from '../../common/Config';
const Message = Config.ReadConfig('./config/message.json');
/* eslint-enable */

@Middleware({ type: 'before' })
export default class implements ExpressMiddlewareInterface {
    async use (request: Request, response: Response, next: NextFunction) {
        const dto = await transformAndValidate(SendSms, request.body);
        if (Array.isArray(dto)) {
            throw new AppError(Message.REQUEST_IS_ARRAY, 400);
        }

        next();
    }
}
