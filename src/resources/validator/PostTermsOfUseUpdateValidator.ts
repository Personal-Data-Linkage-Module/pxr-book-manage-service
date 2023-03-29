/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import express = require('express');
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { transformAndValidate } from 'class-transformer-validator';
import Config from '../../common/Config';
import AppError from '../../common/AppError';
import PostTermsOfUseUpdateReqDto from '../../resources/dto/PostTermsOfUseUpdateReqDto';
const message = Config.ReadConfig('./config/message.json');
/* eslint-enable */

@Middleware({ type: 'before' })
export default class PostTermsOfUseUpdateRequestValidator implements ExpressMiddlewareInterface {
    async use (req: express.Request, res: express.Response, next: express.NextFunction) {
        const dto = await transformAndValidate(PostTermsOfUseUpdateReqDto, req.body);
        if (Array.isArray(dto)) {
            throw new AppError(message.REQUEST_IS_ARRAY, 400);
        }
        next();
    }
}
