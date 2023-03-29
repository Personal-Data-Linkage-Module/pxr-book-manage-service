/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import { Expose, Transform, Type } from 'class-transformer';
import { IsArray, IsDefined, IsNotEmpty, IsNotEmptyObject, IsNumber, IsString, IsUUID, ValidateNested } from 'class-validator';
import { transformToNumber } from '../../common/Transform';
/**
 * CodeObject
 */
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
/**
 * 蓄積イベント通知定義更新リクエストDTO
 */
export default class PostStoreEventReqDto {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    type: string;

    @IsDefined()
    @IsNotEmptyObject()
    @Type(() => CodeObject)
    @ValidateNested()
    notificateCatalog: CodeObject;

    @IsDefined()
    @IsNotEmptyObject()
    @Type(() => CodeObject)
    @ValidateNested()
    shareCode: CodeObject;

    @IsDefined()
    @IsNotEmpty()
    @IsArray()
    @IsUUID('all', { each: true })
    @Expose({ name: 'shareUUID' })
    shareUuid: string[];
}
