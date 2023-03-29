/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { IsNotEmptyObject, ValidateNested, IsString, IsDefined, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { CodeObject } from '../../resources/dto/PostBookOpenReqDto';
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

export default class {
    @IsDefined()
    @Type(type => CatalogItem)
    @ValidateNested()
    @IsNotEmptyObject()
    catalogItem: CatalogItem;
}
