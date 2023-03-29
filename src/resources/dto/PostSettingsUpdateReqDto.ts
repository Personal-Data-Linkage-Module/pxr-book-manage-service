/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Type } from 'class-transformer';
import { IsDefined, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { IsNotEmptyArray } from '../../common/Transform';
/* eslint-enable */

export class CodeObject {
    @IsDefined()
    @IsNumber()
    _value: number;

    @IsOptional()
    @IsNumber()
    _ver: number;
}

export default class PostSettingsUpdateReqDto {
    @IsDefined()
    @IsNotEmptyArray()
    @Type(type => CodeObject)
    @ValidateNested({ each: true })
    codes: CodeObject[];
}
