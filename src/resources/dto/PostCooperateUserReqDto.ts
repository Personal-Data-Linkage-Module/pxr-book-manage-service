/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import {
    IsDefined,
    IsNumber,
    IsString,
    IsOptional,
    ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';

export class Code {
    @IsNumber()
    @IsDefined()
    _value: number;

    @IsNumber()
    @IsDefined()
    _ver: number;
}
/* eslint-enable */

/**
 * POST: 利用者ID設定のリクエストDTO
 */
export default class PostCooperateUserReqDto {
    @IsString()
    @IsDefined()
    pxrId: string;

    @IsString()
    @IsDefined()
    userId: string;

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
}
