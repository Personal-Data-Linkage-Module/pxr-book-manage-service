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
    IsString,
    IsNumber,
    IsDate,
    IsOptional,
    IsArray,
    Min,
    IsBoolean,
    ValidateNested
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { transformToDateTime, IsNotEmptyArray, IsStringEmptyInArray } from '../../common/Transform';

class CreatedAt {
    @Transform(transformToDateTime)
    @IsDate()
    @IsOptional()
    start: Date;

    @Transform(transformToDateTime)
    @IsDate()
    @IsOptional()
    end: Date;
}

export default class PostSearchReqDto {
    /** pxrId */
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @IsNotEmptyArray()
    @IsStringEmptyInArray()
    pxrId: string[];

    /** createdAt */
    @IsOptional()
    @Type(() => CreatedAt)
    @ValidateNested()
    createdAt: CreatedAt;

    /** offset */
    @Min(0)
    @IsNumber()
    @IsOptional()
    offset: number = null;

    /** limit */
    @Min(1)
    @IsNumber()
    @IsOptional()
    limit: number = null;

    /** includeDeleteCoop */
    @IsBoolean()
    @IsOptional()
    includeDeleteCoop: boolean = null;
}
