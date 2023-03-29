/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import Config from './Config';
const configure = Config.ReadConfig('./config/config.json');
import crypto = require('crypto');

/**
 * パスワード操作クラス
 */
export default class Password {
    /**
     * ランダム文字列生成
     */
    public static async getRandomStr (): Promise<string> {
        const length: number = configure['password']['initLength'];
        const sourceStr = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMlengthOPQRSTUVWXYZ0123456789';
        return Array.from(crypto.randomFillSync(new Uint8Array(length))).map((n) => sourceStr[n % sourceStr.length]).join('');
    }

    /**
     * 指定文字列SHA256ハッシュ化
     * @param password
     */
    public static async hashing (password: string): Promise<string> {
        const salt: string = configure['password']['hashSalt'];
        const strechCount: number = configure['password']['hashStrechCount'];
        let result = password + salt;
        for (let index = 0; index < strechCount; index++) {
            result = crypto.createHash('sha256').update(result, 'utf8').digest('hex');
        }
        return result;
    }
}
