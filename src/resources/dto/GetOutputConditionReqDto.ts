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
import { transformToNumber, transformToBooleanFromString } from '../../common/Transform';

export default class GetOutputConditionReqDto {
    @IsDefined()
    @IsNumber()
    @Transform(({ value }) => { return transformToNumber(value); })
        offset: number = 0;

    @IsDefined()
    @IsNumber()
    @Transform(({ value }) => { return transformToNumber(value); })
        limit: number = 10;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => { return transformToNumber(value); })
        id?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => { return transformToNumber(value); })
        mcdOutputCodeId?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => { return transformToNumber(value); })
        approved?: number;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => { return transformToBooleanFromString(value); })
        isServiceCanceled: boolean = false;
}
