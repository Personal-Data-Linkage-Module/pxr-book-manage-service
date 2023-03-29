/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { transformAndValidate } from 'class-transformer-validator';
import express = require('express');
import GetSharedDefinition from '../../resources/dto/GetSharedDefinition';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import AppError from '../../common/AppError';
import Config from '../../common/Config';
import { ResponseCode } from '../../common/ResponseCode';
const Message = Config.ReadConfig('./config/message.json');

@Middleware({ type: 'before' })
export default class implements ExpressMiddlewareInterface {
    async use (req: express.Request, res: express.Response, next: express.NextFunction) {
        const dto = await transformAndValidate(
            GetSharedDefinition,
            req.query
        );
        if (dto.wf) {
            // サポート対象外：WF
            throw new AppError(Message.UNSUPPORTED_ACTOR, ResponseCode.BAD_REQUEST);
        }
        if (dto.id && !dto.app) {
            throw new AppError(Message.REQUIRED_APP_OR_WF_WITH_ID, ResponseCode.BAD_REQUEST);
        }
        next();
    }
}
