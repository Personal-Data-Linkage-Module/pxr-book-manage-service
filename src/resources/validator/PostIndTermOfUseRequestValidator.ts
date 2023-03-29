/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import AppError from '../../common/AppError';
import Config from '../../common/Config';
import express = require('express');
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
const Message = Config.ReadConfig('./config/message.json');

@Middleware({ type: 'before' })
export default class implements ExpressMiddlewareInterface {
    async use (req: express.Request, res: express.Response, next: express.NextFunction) {
        const message = Config.ReadConfig('./config/message.json');
        // 空かどうか判定し、空と判定した場合にはエラーをスローする
        if (!req.body || JSON.stringify(req.body) === JSON.stringify({})) {
            throw new AppError(message.REQUEST_IS_EMPTY, 400);
        }
        next();
    }
}
