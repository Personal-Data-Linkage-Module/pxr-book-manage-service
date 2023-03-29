/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { transformAndValidate } from 'class-transformer-validator';
import AppError from '../../common/AppError';
import Config from '../../common/Config';
import express = require('express');
import CreateSharedDefinition from '../dto/CreateSharedDefinition';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { ResponseCode } from '../../common/ResponseCode';
const Message = Config.ReadConfig('./config/message.json');

@Middleware({ type: 'before' })
export default class implements ExpressMiddlewareInterface {
    async use (req: express.Request, res: express.Response, next: express.NextFunction) {
        const dto = await transformAndValidate(
            CreateSharedDefinition,
            req.body
        );
        if (Array.isArray(dto)) {
            throw new AppError(Message.REQUEST_IS_ARRAY, 400);
        }
        if (dto.wf) {
            // サポート対象外：WF
            throw new AppError(Message.UNSUPPORTED_ACTOR, ResponseCode.BAD_REQUEST);
        }
        if (!dto.app) {
            throw new AppError(Message.REQUIRE_APP_OR_WF_CODE, ResponseCode.BAD_REQUEST);
        }
        next();
    }
}
