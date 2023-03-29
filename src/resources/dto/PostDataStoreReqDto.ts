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
    IsString,
    ValidateNested
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
    @ValidateNested()
    code: Code;
}

class ExcludeThing {
    @IsDefined()
    @Type(() => Code)
    @ValidateNested()
    code: Code;
}

class ExcludeEvent {
    @IsDefined()
    @Type(() => Code)
    @ValidateNested()
    code: Code;

    /** thing */
    @IsDefined()
    @IsArray()
    @Type(() => ExcludeThing)
    @ValidateNested({ each: true })
    excludeThing: ExcludeThing[];
}

export default class PostDataStoreReqDto {
    /** actor */
    @IsDefined()
    @Type(() => Code)
    @ValidateNested()
    actor: Code;

    /** app */
    @IsOptional()
    @Type(() => Code)
    @ValidateNested()
    app: Code;

    /** wf */
    @IsOptional()
    @Type(() => Code)
    @ValidateNested()
    wf: Code;

    /** store */
    @IsDefined()
    @Type(() => Code)
    @ValidateNested()
    store: Code;

    /** store_catalog_id */
    @IsDefined()
    @IsString()
    storeCatalogId: string;

    /** 蓄積対象外ドキュメント */
    @IsOptional()
    @IsArray()
    @Type(() => ExcludeDocument)
    @ValidateNested({ each: true })
    excludeDocument: ExcludeDocument[];

    /** 蓄積対象外イベント */
    @IsOptional()
    @IsArray()
    @Type(() => ExcludeEvent)
    @ValidateNested({ each: true })
    excludeEvent: ExcludeEvent[];
}
