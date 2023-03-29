/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import {
    IsDefined,
    IsNumber,
    IsString,
    ValidateNested
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { transformToNumber } from '../../common/Transform';

export class Code {
    @Transform(transformToNumber)
    @IsNumber()
    @IsDefined()
    _value: number;

    @Transform(transformToNumber)
    @IsNumber()
    @IsDefined()
    _ver: number;
}
/* eslint-enable */

/**
 * POST: Region終了対象追加のリクエストDTO
 */
export default class PostRegionCloseReqDto {
    @IsDefined()
    @Type(() => Code)
    @ValidateNested()
    actor: Code;

    @IsDefined()
    @Type(() => Code)
    @ValidateNested()
    region: Code;

    @IsDefined()
    @IsString()
    endDate: string;
}
