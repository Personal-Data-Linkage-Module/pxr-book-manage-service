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
    IsNumber,
    IsDefined,
    IsOptional
} from 'class-validator';

export default class PostSearchUserReqDto {
    /** actor */
    @IsNumber()
    @IsOptional()
    actor: number = null;

    /** app */
    @IsNumber()
    @IsOptional()
    app: number = null;

    /** wf */
    @IsNumber()
    @IsOptional()
    wf: number = null;

    /** userId */
    @IsString()
    @IsDefined()
    userId: string = null;
}
