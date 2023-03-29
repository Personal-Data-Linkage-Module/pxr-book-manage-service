/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import AppError from '../../common/AppError';
import { NextFunction, Request, Response } from 'express';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import Config from '../../common/Config';
import { ResponseCode } from '../../common/ResponseCode';
import PostStoreEventNotificateReqDto, { CMatrix } from '../../resources/dto/PostStoreEventNotificateReqDto';
import { transformAndValidate } from 'class-transformer-validator';
/* eslint-enable */
const Message = Config.ReadConfig('./config/message.json');

/**
 * イベント蓄積通知のバリデーションチェック
 */
@Middleware({ type: 'before' })
export default class PostStoreEventNotificateValidator implements ExpressMiddlewareInterface {
    async use (request: Request, response: Response, next: NextFunction) {
        // リクエストが空か確認
        if (!request.body || JSON.stringify(request.body) === JSON.stringify({})) {
            throw new AppError(Message.REQUEST_IS_EMPTY, ResponseCode.BAD_REQUEST);
        }

        const dto = await transformAndValidate(
            PostStoreEventNotificateReqDto,
            request.body
        );
        if (Array.isArray(dto)) {
            throw new AppError('リクエストボディが配列であることを許容しません', ResponseCode.BAD_REQUEST);
        }
        if (dto.add && dto.add.length > 0) {
            this.checkUnsupportedActor(dto.add);
        }
        if (dto.update && dto.update.length > 0) {
            this.checkUnsupportedActor(dto.update);
        }
        if (dto.delete && dto.delete.length > 0) {
            this.checkUnsupportedActor(dto.delete);
        }
        next();
    }

    private checkUnsupportedActor (cmatrixList: CMatrix[]) {
        for (const cmatrix of cmatrixList) {
            for (const document of cmatrix.document) {
                if (!document.docAppCatalogCode) {
                    throw new AppError(Message.EMPTY_WF_AND_APP, ResponseCode.BAD_REQUEST);
                }
            }
            if (!cmatrix.event.eventAppCatalogCode) {
                throw new AppError(Message.EMPTY_WF_AND_APP, ResponseCode.BAD_REQUEST);
            }
            for (const thing of cmatrix.thing) {
                if (!thing.thingAppCatalogCode) {
                    throw new AppError(Message.EMPTY_WF_AND_APP, ResponseCode.BAD_REQUEST);
                }
            }
        }
    }
}
