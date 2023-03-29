/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { transformToNumber } from '../../common/Transform';
import { Transform, Type } from 'class-transformer';
import {
    IsNumber,
    IsObject,
    IsNotEmptyObject,
    IsOptional,
    IsArray,
    ValidateNested,
    IsDefined,
    IsString,
    IsNotEmpty
} from 'class-validator';
/* eslint-enable */

export class CodeOnlyObject {
    @IsNumber()
    @IsDefined()
    @Transform(transformToNumber)
    _value: number;
}

export class CodeObject {
    @IsNumber()
    @IsDefined()
    @Transform(transformToNumber)
    _value: number;

    @IsNumber()
    @IsDefined()
    @Transform(transformToNumber)
    _ver: number;
}

export class Identifier {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    document: string;

    @IsOptional()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    event: string | string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    thing: string[];
}

export default class {
    @Type(type => CodeOnlyObject)
    @IsObject()
    @IsOptional()
    @IsNotEmptyObject()
    @ValidateNested()
    actor: CodeOnlyObject;

    @Type(type => CodeOnlyObject)
    @IsObject()
    @IsOptional()
    @ValidateNested()
    app: CodeOnlyObject;

    @Type(type => CodeOnlyObject)
    @IsObject()
    @IsOptional()
    @ValidateNested()
    wf: CodeOnlyObject;

    @IsOptional()
    @Type(type => CodeObject)
    @IsArray()
    @ValidateNested({ each: true })
    document: CodeObject[];

    @IsOptional()
    @Type(type => CodeObject)
    @IsArray()
    @ValidateNested({ each: true })
    event: CodeObject[];

    @IsOptional()
    @Type(type => CodeObject)
    @IsArray()
    @ValidateNested({ each: true })
    thing: CodeObject[];

    @IsOptional()
    @Type(type => Identifier)
    @IsArray()
    @ValidateNested({ each: true })
    identifier: Identifier[];
}
