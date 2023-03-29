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

/* eslint-disable */
import { IsString, IsDefined, IsNotEmpty, ValidateNested, IsOptional, IsDate, IsNumber, Contains, Validate, Matches, IsArray } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { transformToDateTime, transformToNumber } from '../../common/Transform';

/**
 * POST: Book参照依頼APIのリクエストDTO
 */
export class CodeVersionObject {
    @Transform(transformToNumber)
    @IsNumber()
    @IsNotEmpty()
    @IsDefined()
    _value: number;

    @Transform(transformToNumber)
    @IsNumber()
    @IsDefined()
    _ver: number;
}

export class CodeObject {
    @Transform(transformToNumber)
    @IsNumber()
    @IsNotEmpty()
    @IsDefined()
    _value: number;
}

export class DateStartEndObject {
    @Transform(transformToDateTime)
    @IsDate()
    @IsNotEmpty()
    @IsDefined()
    start: Date;

    @Transform(transformToDateTime)
    @IsDate()
    @IsDefined()
    end: Date;
}

export class Condition {
    /**
     * アクターオブジェクト
     */
    @Type(() => CodeObject)
    @ValidateNested()
    @IsDefined()
    actor?: CodeObject;

    /**
     * コードオブジェクト
     */
    @IsOptional()
    @IsArray()
    @Type(() => CodeVersionObject)
    @ValidateNested({ each: true })
    _code?: CodeVersionObject[];

    /**
     * アプリケーションオブジェクト
     */
    @IsOptional()
    @Type(() => CodeObject)
    @ValidateNested()
    app?: CodeObject;

    /**
     * ワークフローオブジェクト
     */
    @IsOptional()
    @Type(() => CodeObject)
    @ValidateNested()
    wf?: CodeObject;
}

export default class PostGetBookReqDto {
    /**
     * 検索更新日時
     */
    @IsOptional()
    @Type(() => DateStartEndObject)
    @ValidateNested()
    updatedAt: DateStartEndObject;

    /**
     * タイプ
     */
    @IsOptional()
    @Matches(new RegExp(/^(document|event|thing)$/))
    @IsString()
    @IsNotEmpty()
    type: string;

    /**
     * 識別子
     */
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    identifier: string[];

    /**
     * 検索条件
     */
    @IsOptional()
    @IsArray()
    @Type(() => Condition)
    @ValidateNested({ each: true })
    condition: Condition[];
}
