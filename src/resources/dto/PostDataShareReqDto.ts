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
    IsDefined,
    IsNumber,
    IsArray,
    IsOptional,
    IsString
} from 'class-validator';
import { Type } from 'class-transformer';

class Code {
    @IsDefined()
    @IsNumber()
    _value: number;

    @IsDefined()
    @IsNumber()
    _ver: number;
}

class ExcludeDocument {
    @IsDefined()
    @Type(() => Code)
    code: Code;
}

class ExcludeThing {
    @IsDefined()
    @Type(() => Code)
    code: Code;
}

class ExcludeEvent {
    @IsDefined()
    @Type(() => Code)
    code: Code;

    /** thing */
    @IsDefined()
    @IsArray()
    @Type(() => ExcludeThing)
    excludeThing: ExcludeThing[];
}

export default class PostDataShareReqDto {
    /** actor */
    @IsDefined()
    @Type(() => Code)
    actor: Code;

    /** app */
    @IsOptional()
    @Type(() => Code)
    app: Code;

    /** wf */
    @IsOptional()
    @Type(() => Code)
    wf: Code;

    /** store */
    @IsDefined()
    @Type(() => Code)
    share: Code;

    /** store_catalog_id */
    @IsDefined()
    @IsString()
    shareCatalogId: string;

    /** document */
    @IsOptional()
    @IsArray()
    @Type(() => ExcludeDocument)
    excludeDocument: ExcludeDocument[];

    /** event */
    @IsOptional()
    @IsArray()
    @Type(() => ExcludeEvent)
    excludeEvent: ExcludeEvent[];

    /** thing */
    @IsOptional()
    @IsArray()
    @Type(() => ExcludeThing)
    excludeThing: ExcludeThing[];
}
