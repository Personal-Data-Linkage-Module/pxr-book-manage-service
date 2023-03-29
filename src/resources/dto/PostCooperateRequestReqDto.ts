/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import {
    IsDefined,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { transformToNumber } from '../../common/Transform';

export class Code {
    @IsNumber()
    @IsDefined()
    @Transform(transformToNumber)
    _value: number;

    @IsNumber()
    @IsDefined()
    @Transform(transformToNumber)
    _ver: number;
}
/* eslint-enable */

/**
 * POST: 利用者ID連携申請のリクエストDTO
 */
export default class PostCooperateRequestReqDto {
    @IsOptional()
    @IsString()
    pxrId?: string;

    @IsDefined()
    @Type(() => Code)
    @ValidateNested()
    actor: Code;

    @IsOptional()
    @Type(() => Code)
    @ValidateNested()
    region?: Code | null;

    @IsOptional()
    @Type(() => Code)
    @ValidateNested()
    app?: Code | null;

    @IsOptional()
    @Type(() => Code)
    @ValidateNested()
    wf?: Code | null;

    @IsOptional()
    @IsString()
    userId?: string;
}
