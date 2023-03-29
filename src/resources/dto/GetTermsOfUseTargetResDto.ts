/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Transform, Type } from "class-transformer";
import { IsArray, IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { transformToNumber } from "../../common/Transform";


export class CodeObject {
    @IsDefined()
    @IsNumber()
    @Transform(transformToNumber)
    _value: number;

    @IsDefined()
    @IsNumber()
    @Transform(transformToNumber)
    _ver: number;
}

export default class GetTermsOfUseTargetResDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    pxrId: number;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CodeObject)
    termOfUse: CodeObject[];
}
