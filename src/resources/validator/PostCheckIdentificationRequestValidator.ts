/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
/* eslint-enable */
import { transformAndValidate } from 'class-transformer-validator';
import PostCheckIdentificationReqDto from '../dto/PostCheckIdentificationReqDto';
import AppError from '../../common/AppError';
import { sprintf } from 'sprintf-js';
import Config from '../../common/Config';

@Middleware({ type: 'before' })
export default class PostCheckIdentificationRequestValidator implements ExpressMiddlewareInterface {
    async use (request: Request, response: Response, next: NextFunction): Promise<void> {
        const message = Config.ReadConfig('./config/message.json');
        // 空かどうか判定し、空と判定した場合にはエラーをスローする
        if (!request.body || JSON.stringify(request.body) === JSON.stringify({})) {
            throw new AppError(message.REQUEST_IS_EMPTY, 400);
        }

        const requestData = request.body;
        if (this.isEmpty(requestData['identification'])) {
            throw new AppError(sprintf(message.EMPTY_PARAM, 'identification'), 400);
        }
        if (requestData['identification'].length <= 0) {
            throw new AppError(sprintf(message.EMPTY_PARAM, 'identification'), 400);
        }

        // identificationの内部確認
        const target = requestData['identification'];
        for (let index: number = 0; index < target.length; index++) {
            const ident = target[index];
            // _codeの必須チェックおよび空文字判定
            if (this.isUndefined(ident['_code'])) {
                throw new AppError(sprintf(message.NO_PARAM, '_code'), 400);
            }
            if (this.isEmpty(ident['_code'])) {
                throw new AppError(sprintf(message.EMPTY_PARAM, '_code'), 400);
            }
            // _code._valueの必須チェックおよび空文字判定、数字判定
            if (this.isUndefined(ident['_code']['_value'])) {
                throw new AppError(sprintf(message.NO_PARAM, '_code._value'), 400);
            }
            if (this.isEmpty(ident['_code']['_value'])) {
                throw new AppError(sprintf(message.EMPTY_PARAM, '_code._value'), 400);
            }
            if (!this.isNumber(ident['_code']['_value'])) {
                throw new AppError(sprintf(message.NUMBER_INVALID, '_code._value'), 400);
            }
            // _code._verの必須チェックおよび空文字判定、数字判定
            if (this.isUndefined(ident['_code']['_ver'])) {
                throw new AppError(sprintf(message.NO_PARAM, '_code._ver'), 400);
            }
            if (this.isEmpty(ident['_code']['_ver'])) {
                throw new AppError(sprintf(message.EMPTY_PARAM, '_code._ver'), 400);
            }
            if (!this.isNumber(ident['_code']['_ver'])) {
                throw new AppError(sprintf(message.NUMBER_INVALID, '_code._ver'), 400);
            }
            // item-groupの必須チェックおよび要素0、Array型判定
            if (this.isUndefined(ident['item-group'])) {
                throw new AppError(sprintf(message.NO_PARAM, 'item-group'), 400);
            }
            if (this.isEmpty(ident['item-group'])) {
                throw new AppError(sprintf(message.EMPTY_PARAM, 'item-group'), 400);
            }
            if (!Array.isArray(ident['item-group'])) {
                throw new AppError(sprintf(message.NO_ARRAY_PARAM, 'item-group'), 400);
            }
            if (ident['item-group'].length <= 0) {
                throw new AppError(sprintf(message.EMPTY_PARAM, 'item-group'), 400);
            }
            // item-groupの中身をチェック
            for (let j = 0; j < ident['item-group'].length; j++) {
                const itemGroup = ident['item-group'][j];
                // titleの必須チェックおよび空文字判定
                if (this.isUndefined(itemGroup['title'])) {
                    throw new AppError(sprintf(message.NO_PARAM, 'item-group.title'), 400);
                }
                if (this.isEmpty(itemGroup['title'])) {
                    throw new AppError(sprintf(message.EMPTY_PARAM, 'item-group.title'), 400);
                }
                // itemの必須チェックおよび要素0、Array型判定
                if (this.isUndefined(itemGroup['item'])) {
                    throw new AppError(sprintf(message.NO_PARAM, 'item-group.item'), 400);
                }
                if (this.isEmpty(itemGroup['item'])) {
                    throw new AppError(sprintf(message.EMPTY_PARAM, 'item-group.item'), 400);
                }
                if (!Array.isArray(itemGroup['item'])) {
                    throw new AppError(sprintf(message.NO_ARRAY_PARAM, 'item-group.item'), 400);
                }
                if (itemGroup['item'].length <= 0) {
                    throw new AppError(sprintf(message.EMPTY_PARAM, 'item-group.item'), 400);
                }
                // itemの中身をチェック
                for (let n = 0; n < itemGroup['item'].length; n++) {
                    // titleがない、または空の場合、エラー
                    const item = itemGroup['item'][n];
                    if (this.isUndefined(item['title'])) {
                        throw new AppError(sprintf(message.NO_PARAM, 'item-group.item.title'), 400);
                    }
                    if (this.isEmpty(item['title'])) {
                        throw new AppError(sprintf(message.EMPTY_PARAM, 'item-group.item.title'), 400);
                    }
                    // typeがない、または空の場合、エラー
                    if (this.isUndefined(item['type'])) {
                        throw new AppError(sprintf(message.NO_PARAM, 'item-group.item.type'), 400);
                    }
                    if (this.isEmpty(item['type'])) {
                        throw new AppError(sprintf(message.EMPTY_PARAM, 'item-group.item.type'), 400);
                    }
                    // type._valueがない、または空、数字以外の場合、エラー
                    if (this.isUndefined(item['type']['_value'])) {
                        throw new AppError(sprintf(message.NO_PARAM, 'item-group.item.type._value'), 400);
                    }
                    if (this.isEmpty(item['type']['_value'])) {
                        throw new AppError(sprintf(message.EMPTY_PARAM, 'item-group.item.type._value'), 400);
                    }
                    if (!this.isNumber(item['type']['_value'])) {
                        throw new AppError(sprintf(message.NUMBER_INVALID, 'item-group.item.type._value'), 400);
                    }
                    // type._verがない、または空、数字以外の場合、エラー
                    if (this.isUndefined(item['type']['_ver'])) {
                        throw new AppError(sprintf(message.NO_PARAM, 'item-group.item.type._ver'), 400);
                    }
                    if (this.isEmpty(item['type']['_ver'])) {
                        throw new AppError(sprintf(message.EMPTY_PARAM, 'item-group.item.type._ver'), 400);
                    }
                    if (!this.isNumber(item['type']['_ver'])) {
                        throw new AppError(sprintf(message.NUMBER_INVALID, 'item-group.item.type._ver'), 400);
                    }
                }
            }
        }

        await transformAndValidate(PostCheckIdentificationReqDto, request.body);

        next();
    }

    /**
     * 空判定
     * @param target
     */
    private isEmpty (target: any): boolean {
        // null, ''は空文字と判定
        return target == null || target === '';
    }

    /**
     * undefined判定
     * @param target
     */
    private isUndefined (target: any): boolean {
        return target === undefined;
    }

    /**
     * 数値判定
     * @param target
     */
    private isNumber (target: any): boolean {
        // null, falseは数値ではないと判定
        if (target == null || target === false) {
            return false;
        }
        return !isNaN(Number(target));
    }
}
