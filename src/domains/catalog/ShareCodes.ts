/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { IsNotEmptyObject, ValidateNested, IsString, IsArray, IsDefined, IsNotEmpty, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { CodeObject } from '../../resources/dto/PostBookOpenReqDto';
import { IsNotEmptyArray } from '../../common/Transform';
/* eslint-enable */

export class CatalogItem {
    @IsString()
    @IsNotEmpty()
    ns: string;

    @IsDefined()
    @Type(type => CodeObject)
    @ValidateNested()
    @IsNotEmptyObject()
    _code: CodeObject;
}

export class Codes {
    @IsDefined()
    @Type(type => CodeObject)
    @ValidateNested({ each: true })
    @IsNotEmptyArray()
    @IsArray()
    document: CodeObject[];

    @IsDefined()
    @Type(type => CodeObject)
    @ValidateNested({ each: true })
    @IsNotEmptyArray()
    @IsArray()
    event: CodeObject[];

    @IsDefined()
    @Type(type => CodeObject)
    @ValidateNested({ each: true })
    @IsNotEmptyArray()
    @IsArray()
    thing: CodeObject[];
}

export class Template {
    @IsDefined()
    @Type(type => Codes)
    @ValidateNested({ each: true })
    @IsNotEmptyArray()
    @IsArray()
    share: Codes[];
}

export default class {
    @IsDefined()
    @Type(type => CatalogItem)
    @ValidateNested()
    @IsNotEmptyObject()
    catalogItem: CatalogItem;

    @IsDefined()
    @Type(type => Template)
    @ValidateNested()
    @IsNotEmptyObject()
    template: Template;
}
