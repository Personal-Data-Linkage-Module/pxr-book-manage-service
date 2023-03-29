/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
/* eslint-enable */
import { transformAndValidate } from 'class-transformer-validator';
import PostGetIndAccessLogReqDto from '../dto/PostGetIndAccessLogReqDto';
import AppError from '../../common/AppError';
import Config from '../../common/Config';
import { ResponseCode } from '../../common/ResponseCode';
const Message = Config.ReadConfig('./config/message.json');

@Middleware({ type: 'before' })
export default class PostGetIndAccessLogRequestValidator implements ExpressMiddlewareInterface {
    async use (request: Request, response: Response, next: NextFunction): Promise<void> {
        // 空かどうか判定し、空と判定した場合にはエラーをスロー
        if (!request.body || JSON.stringify(request.body) === JSON.stringify({})) {
            throw new AppError(Message.REQUEST_IS_EMPTY, ResponseCode.BAD_REQUEST);
        }

        // パラメータバリデーション
        const dto = await transformAndValidate(PostGetIndAccessLogReqDto, request.body);
        // 配列であればエラー
        if (Array.isArray(dto)) {
            throw new AppError(Message.UNEXPECTED_ARRAY_REQUEST, 400);
        }

        // conditionが存在する場合
        if (dto.condition && dto.condition.length > 0) {
            for (const con of dto.condition) {
                if (con.wf) {
                    // サポート対象外：WF
                    throw new AppError(Message.UNSUPPORTED_ACTOR, ResponseCode.BAD_REQUEST);
                }
                // appは必須
                if (!con.app) {
                    throw new AppError(Message.EMPTY_WF_AND_APP, 400);
                }
            }
        }

        // startとendの両方が設定されている場合
        if (dto.accessAt && dto.accessAt.start && dto.accessAt.end) {
            const startDate: Date = new Date(dto.accessAt.start);
            const endDate: Date = new Date(dto.accessAt.end);
            // startの方が過去日になっていなければエラー
            if (this.getDateTimeDiff(startDate, endDate) < 0) {
                throw new AppError(Message.DATE_SCOPE_INVALID, 400);
            }
        }

        next();
    }

    /**
     * 日付期間差異取得
     * @param from
     * @param to
     */
    private getDateTimeDiff (from: Date, to: Date): number {
        return to.getTime() - from.getTime();
    }
}
