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
 * POST: Book設APIのリクエストDTO
 */
export default class PostCheckPxrIdReqDto {
    /** pxrId */
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    pxrId: string;
}
