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
    IsOptional,
    IsDate,
    Min,
    Max
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { transformToNumber, transformToBooleanFromString, transformToDateTime } from '../../common/Transform';

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

/** イベント */
export class EventEntity {
    /** イベント識別子 */
    @IsNotEmpty({ each: true })
    @IsString()
    @IsOptional()
    id: string;

    /** モノ識別子 */
    @IsNotEmpty({ each: true })
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    thingEntity: string[];
}

/** イベント */
export class Event {
    /** イベントカタログ */
    @IsOptional()
    @Type(() => CodeObject)
    @ValidateNested()
    _code: CodeObject;

    /** モノカタログ */
    @Type(() => CodeObject)
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    thing: CodeObject[];
}

/** 出力データタイプ */
export class DataType {

    /** ドキュメント */
    @Type(() => CodeObject)
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    document: CodeObject[];

    /** ドキュメント識別子 */
    @IsNotEmpty({ each: true })
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    documentEntity: string[];

    /** イベント */
    @Type(() => Event)
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    event: Event[];

    /** イベント識別子 */
    @Type(() => EventEntity)
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true})
    eventEntity: EventEntity[];

    /** モノ */
    @Type(() => CodeObject)
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    thing: CodeObject[];

    /** モノ識別子 */
    @IsNotEmpty({ each: true })
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    thingEntity: string[];
}

/* eslint-enable */
export default class PostOutputPrepareReqDto {
    /** 出力タイプ */
    @Transform(transformToNumber)
    @IsDefined()
    @IsNumber()
    @IsNotEmpty()
    type: number;

    /** Pxr-ID */
    @IsOptional()
    @IsString()
    pxrId: string;

    /** actor */
    @IsOptional()
    @Type(() => CodeObject)
    @ValidateNested()
    actor: CodeObject;

    /** region */
    @IsOptional()
    @Type(() => CodeObject)
    @ValidateNested()
    region: CodeObject;

    /** 利用者ID連携解除フラグ */
    @Transform(transformToBooleanFromString)
    @IsOptional()
    @IsBoolean()
    cooperationRelease: boolean;
}
