/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import express = require('express');
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import AppError from '../../common/AppError';
import { transformToBooleanFromString } from '../../common/Transform';
import Config from '../../common/Config';
const Message = Config.ReadConfig('./config/message.json');
/* eslint-enable */

@Middleware({ type: 'before' })
export default class implements ExpressMiddlewareInterface {
    async use (req: express.Request, res: express.Response, next: express.NextFunction) {
        const expiration = transformToBooleanFromString(req.query.expiration);
        if (req.query.expiration && typeof expiration !== 'boolean') {
            throw new AppError(Message.EXPIRATION_IS_NOT_BOOLEAN, 400);
        }

        next();
    }
}
