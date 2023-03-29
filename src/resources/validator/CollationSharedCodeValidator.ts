/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import express = require('express');
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { transformAndValidate } from 'class-transformer-validator';
import CollationSharedCode from '../../resources/dto/CollationSharedCode';
import Config from '../../common/Config';
import AppError from '../../common/AppError';
const Message = Config.ReadConfig('./config/message.json');
/* eslint-enable */

@Middleware({ type: 'before' })
export default class implements ExpressMiddlewareInterface {
    async use (req: express.Request, res: express.Response, next: express.NextFunction) {
        const dto = await transformAndValidate(CollationSharedCode, req.body);
        if (Array.isArray(dto)) {
            throw new AppError(Message.REQUEST_IS_ARRAY, 400);
        }
        next();
    }
}
