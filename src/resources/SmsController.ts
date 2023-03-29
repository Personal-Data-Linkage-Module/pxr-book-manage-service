/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import Config from '../common/Config';
import { sendGuidance, sendPassword } from '../common/Sms_Stub';
/* eslint-disable */
import express = require('express');
import { Body, Header, JsonController, Post, Req, UseBefore } from 'routing-controllers';
import OperatorService from '../services/OperatorService';
import EnableSimpleBackPressure from './backpressure/EnableSimpleBackPressure';
import SendSms from './dto/SendSms';
import SendSmsRequestValidator from './validator/SendSmsRequestValidator';
import AppError from '../common/AppError';
import config = require('config');
const message = Config.ReadConfig('./config/message.json');
/* eslint-enable */

@JsonController('/book-manage/sms/open')
export default class {
    @Post()
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(SendSmsRequestValidator)
    async send (@Req() req: express.Request, @Body() dto: SendSms) {
        const operator = await OperatorService.authMe(req);

        // 利用者情報を取得する
        const userInfo = await OperatorService.getUserInfo(dto.pxrId, operator);

        // 電話番号だけ取り出す
        const phoneNumber = await (async u => {
            if (!u || !Array.isArray(u['item-group'])) {
                return null;
            }
            for (const itemGroup of u['item-group']) {
                for (const item of itemGroup.item) {
                    if (item.type._value === parseInt(config.get('phoneNumberCode'))) {
                        const value = item.content;
                        return value;
                    }
                }
            }
        })(userInfo);
        if (typeof phoneNumber !== 'string') {
            throw new AppError(message.NOT_AVAILABLE_PHONE_NUMBER, 400);
        }

        // SMSを送信する
        await sendGuidance(dto.pxrId, phoneNumber, operator);
        // 本文とパスワードが前後しないようsleepを入れる
        await this.sleep(5000);
        // パスワードを送信する
        await sendPassword(dto.initialPassword, phoneNumber);

        return { status: 'success' };
    }

    private async sleep (ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
