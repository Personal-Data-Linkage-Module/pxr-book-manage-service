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
 * POST: 共有アクセス取得依頼APIのリクエストDTO
 */
export class CodeVersionObject {
    @Transform(transformToNumber)
    @IsNumber()
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
    @IsOptional()
    start: Date;

    @Transform(transformToDateTime)
    @IsDate()
    @IsOptional()
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

    /**
     * ドキュメント
     */
    @IsOptional()
    @IsArray()
    @Type(() => CodeVersionObject)
    @ValidateNested({ each: true })
    document?: CodeVersionObject[];

    /**
     * イベント
     */
    @IsOptional()
    @IsArray()
    @Type(() => CodeVersionObject)
    @ValidateNested({ each: true })
    event?: CodeVersionObject[];

    /**
     * モノ
     */
    @IsOptional()
    @IsArray()
    @Type(() => CodeVersionObject)
    @ValidateNested({ each: true })
    thing?: CodeVersionObject[];
}

export default class PostGetIndAccessLogReqDto {
    /**
     * 検索開始日時
     */
    @IsOptional()
    @Type(() => DateStartEndObject)
    @ValidateNested()
    accessAt: DateStartEndObject;

    /**
     * 検索条件
     */
    @IsOptional()
    @IsArray()
    @Type(() => Condition)
    @ValidateNested({ each: true })
    condition: Condition[];
}
