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

import {
    IsString,
    IsDefined,
    IsNotEmpty,
    IsNumber,
    IsArray,
    IsOptional
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * POST: Book設APIのリクエストDTO
 */

class Code {
    @IsDefined()
    @IsNumber()
    _value: number;

    @IsDefined()
    @IsNumber()
    _ver: number;
}

class Item {
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    title: string

    @IsDefined()
    @Type(() => Code)
    type: Code;

    @IsOptional()
    content: string | boolean | number | undefined | null;
}

class ItemGroup {
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    title: string

    @IsDefined()
    @Type(() => Item)
    item: Item[];
}

class Template {
    @IsDefined()
    @Type(() => Code)
    _code: Code;

    @IsDefined()
    @Type(() => ItemGroup)
    'item-group': ItemGroup[];
}

class Identification {
    @IsDefined()
    @Type(() => Template)
    template: Template;
}
export default class PostCheckIdentificationReqDto {
    /** identification */
    @IsDefined()
    @IsNotEmpty()
    @IsArray()
    @Type(() => Identification)
    identification: Identification[];
}
