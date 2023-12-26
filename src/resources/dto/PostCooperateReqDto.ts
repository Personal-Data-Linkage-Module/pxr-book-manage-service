/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 *
 *
 *
 * $Date$
 * $Revision$
 * $Author$
 *
 * TEMPLATE VERSION :  76463
 */

// SDE-IMPL-REQUIRED 本ファイルをコピーしコントローラーに定義した各 REST API のリクエスト・レスポンスごとにDTOを作成します。

import {
    IsString,
    IsDefined,
    IsNotEmpty
} from 'class-validator';
/**
 * POST: 利用者ID連携サービスのリクエストDTO
 */
export default class PostCooperateReqDto {
    /** 本人性確認コード */
    @IsString()
    @IsDefined()
    @IsNotEmpty()
        identifyCode: string;

    public getIdentifyCode (): string {
        return this.identifyCode;
    }
}
