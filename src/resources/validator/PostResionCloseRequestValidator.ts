/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import { transformAndValidate } from 'class-transformer-validator';
/* eslint-enable */
import PostRegionCloseReqDto from '../dto/PostRegionCloseReqDto';
import AppError from '../../common/AppError';
import Config from '../../common/Config';
import { sprintf } from 'sprintf-js';
import moment = require('moment-timezone');

@Middleware({ type: 'before' })
export default class PostResionCloseRequestValidator implements ExpressMiddlewareInterface {
    async use (request: Request, response: Response, next: NextFunction): Promise<void> {
        const message = Config.ReadConfig('./config/message.json');
        // 空かどうか判定し、空と判定した場合にはエラーをスローする
        if (!request.body || JSON.stringify(request.body) === JSON.stringify({})) {
            throw new AppError(message.REQUEST_IS_EMPTY, 400);
        }

        const dto = await transformAndValidate(
            PostRegionCloseReqDto, request.body
        ) as PostRegionCloseReqDto;

        // 配列であればエラー
        if (Array.isArray(dto)) {
            throw new AppError(message.UNEXPECTED_ARRAY_REQUEST, 400);
        }

        // closeDateがISO8601のフォーマットに合わない場合はエラー
        if (!moment(dto.endDate, moment.ISO_8601, true).isValid()) {
            throw new AppError(sprintf(message.DATE_INVALID, 'endDate'), 400);
        }

        next();
    }
}
