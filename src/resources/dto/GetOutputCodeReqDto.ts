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

// import { IsUUID, IsString, IsNumber, IsDateString } from 'class-validator';
import {
    IsDefined,
    IsNumber
} from 'class-validator';
import { Transform } from 'class-transformer';
/* eslint-disable */
import { transformToNumber } from '../../common/Transform';
/* eslint-enable */

export default class GetOutputCodeReqDto {
    /**
     * スキップ行数
     */
    @IsDefined()
    @IsNumber()
    @Transform(transformToNumber)
    offset: number = 0;

    /**
     * 取得件数
     */
    @IsDefined()
    @IsNumber()
    @Transform(transformToNumber)
    limit: number = 10;
}
