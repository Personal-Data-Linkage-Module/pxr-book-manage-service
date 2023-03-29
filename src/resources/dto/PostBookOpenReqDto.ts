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
    IsOptional,
    ValidateNested,
    IsNotEmptyObject,
    IsBoolean
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { transformToNumber, transformToBooleanFromString, IsNotEmptyArray } from '../../common/Transform';

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

export class Item {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsDefined()
    @Type(() => CodeObject)
    @ValidateNested()
    @IsNotEmptyObject()
    type: CodeObject;

    @IsOptional()
    content: string | boolean | number | undefined | null;

    @IsBoolean()
    @IsOptional()
    @Transform(transformToBooleanFromString)
    'changeable-flag': boolean;
}

export class ItemGroup {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsDefined()
    @IsArray()
    @Type(() => Item)
    @ValidateNested({ each: true })
    @IsNotEmptyArray()
    item: Item[]
}

export class Identification {
    @IsDefined()
    @Type(() => CodeObject)
    @ValidateNested()
    @IsNotEmptyObject()
    _code: CodeObject;

    @IsDefined()
    @IsArray()
    @Type(() => ItemGroup)
    @ValidateNested({ each: true })
    @IsNotEmptyArray()
    'item-group': ItemGroup[];
}

export default class PostBookOpenReqDto {
    /** pxrId */
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    pxrId: string;

    /** loginId */
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    loginId: string;

    /** userId */
    @IsString()
    @IsOptional()
    userId: string;

    /** idServiceFlg */
    @IsOptional()
    @IsBoolean()
    idServiceFlg: boolean;

    /** attributes */
    @IsOptional()
    attributes: any = null;

    /** appendix */
    @IsOptional()
    appendix: any = null;

    /** identification */
    @IsDefined()
    @IsArray()
    @Type(() => Identification)
    @ValidateNested({ each: true })
    @IsNotEmptyArray()
    identification: Identification[];

    /** userInformation */
    @IsDefined()
    @Type(() => Identification)
    @ValidateNested()
    userInformation: Identification;

    /** platform_terms_of_use */
    @IsDefined()
    @Type(() => CodeObject)
    @ValidateNested()
    @IsNotEmpty()
    'platform_terms_of_use': CodeObject;
}
