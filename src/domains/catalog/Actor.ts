/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { IsNotEmptyObject, ValidateNested, IsString, IsDefined, IsNotEmpty, IsArray, IsOptional } from 'class-validator';
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

export class Template {
    @IsOptional()
    @Type(type => CodeObject)
    @ValidateNested({ each: true })
    workflow: CodeObject[];

    @IsOptional()
    @Type(type => CodeObject)
    @ValidateNested({ each: true })
    application: CodeObject[];
}

export default class {
    @IsDefined()
    @Type(type => CatalogItem)
    @ValidateNested()
    @IsNotEmptyObject()
    catalogItem: CatalogItem;

    template: Template;
}
