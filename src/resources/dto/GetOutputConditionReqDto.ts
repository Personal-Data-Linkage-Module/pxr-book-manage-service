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
import { IsBoolean, IsDefined, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { transformToNumber } from '../../common/Transform';

export default class GetOutputConditionReqDto {
    @IsDefined()
    @IsNumber()
    @Transform(transformToNumber)
    offset: number;

    @IsDefined()
    @IsNumber()
    @Transform(transformToNumber)
    limit: number = 10;

    @IsOptional()
    @IsNumber()
    @Transform(transformToNumber)
    id?: number;

    @IsOptional()
    @IsNumber()
    @Transform(transformToNumber)
    mcdOutputCodeId?: number;

    @IsOptional()
    @IsNumber()
    @Transform(transformToNumber)
    approved?: number;

    @IsOptional()
    @IsBoolean()
    isServiceCanceled: boolean = false;
}
