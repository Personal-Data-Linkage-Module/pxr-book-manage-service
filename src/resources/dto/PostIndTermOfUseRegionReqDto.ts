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
/* eslint-disable */
import { Type } from 'class-transformer';
import { IsDefined, IsNumber, ValidateNested } from 'class-validator';
/* eslint-enable */

export class CodeObject {
    @IsDefined()
    @IsNumber()
    _value: number;

    @IsDefined()
    @IsNumber()
    _ver: number;
}

/**
 * POST: データ出力APIのリクエストDTO
 */
export default class PostIndTermOfUseRegionReqDto {
    @IsDefined()
    @Type(() => CodeObject)
    @ValidateNested()
    actor: CodeObject;

    @IsDefined()
    @Type(() => CodeObject)
    @ValidateNested()
    region: CodeObject;

    @IsDefined()
    @Type(() => CodeObject)
    @ValidateNested()
    _code: CodeObject;
}
