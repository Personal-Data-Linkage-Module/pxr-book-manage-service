/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import {
    IsNumber,
    IsDefined,
    IsString,
    ValidateNested,
    IsNotEmptyObject,
    IsArray,
    IsNotEmpty,
    IsBoolean,
    IsOptional
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { transformToNumber, transformToBooleanFromString } from '../../common/Transform';

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
    item: Item[]
}

export class UserInformation {
    @IsDefined()
    @Type(() => CodeObject)
    @ValidateNested()
    @IsNotEmptyObject()
    _code: CodeObject;

    @IsDefined()
    @IsArray()
    @Type(() => ItemGroup)
    @ValidateNested({ each: true })
    'item-group': ItemGroup[];
}

/* eslint-enable */
export default class PostUserInfoReqDto {
    /** pxrId */
    @IsString()
    pxrId: string;

    /** userInfo */
    @IsDefined()
    @Type(() => UserInformation)
    @ValidateNested()
    userInfo: UserInformation;
}
