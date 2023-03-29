/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import OperatorDomain from '../domains/OperatorDomain';
/* eslint-enable */

/**
 * 初期案内について、SMSを送信する
 * @param initialPassword
 * @param plainPhoneNumber
 */
export async function sendGuidance (
    id: string,
    plainPhoneNumber: string,
    operator: OperatorDomain
) {
    // 流通制御のカタログから初期ログインurlを取得する
    // 利用者情報の電話番号に対して、ID情報と初期ログイン用のurlを含むSNSを送信する
    const message: string = null;
    const phoneNumber: string = null;
    return sendMessage(message, phoneNumber);
}

/**
 * パスワードを送信する
 * @param initialPassword
 * @param plainPhoneNumber
 */
export async function sendPassword (
    initialPassword: string,
    plainPhoneNumber: string
) {
    // 利用者情報の電話番号に対して、初期パスワードを含むSNSを送信する
    const phoneNumber: string = null;
    return sendMessage(initialPassword, phoneNumber);
}

/**
 * メッセージの送信を行う
 * @param message
 * @param phoneNumber
 */
export async function sendMessage (message: string, phoneNumber: string) {
}
