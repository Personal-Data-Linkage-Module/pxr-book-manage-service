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
    IsArray,
    IsOptional,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { transformToNumber } from '../../common/Transform';

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

/* eslint-enable */
export default class PostGetOutputConditionDataMngReqDto {
    /** 出力データ収集アクターID */
    @IsOptional()
    @Transform(transformToNumber)
    @IsNumber()
    mcdOutputCodeActorId: number;

    /** コード */
    @IsOptional()
    @IsString()
    code: string;

    /** 出力タイプ */
    @IsOptional()
    @IsArray()
    @Transform(transformToNumber)
    @IsNumber()
    outputTypes: number[];

    /** actor */
    @IsOptional()
    @Type(() => CodeObject)
    @ValidateNested()
    actor: CodeObject;

    /** app */
    @IsOptional()
    @Type(() => CodeObject)
    @ValidateNested()
    app: CodeObject;

    /** wf */
    @IsOptional()
    @Type(() => CodeObject)
    @ValidateNested()
    wf: CodeObject;

    /** 出力ファイル種別(ダウンロード: 1, アップロード: 2) */
    @IsOptional()
    @Transform(transformToNumber)
    @IsNumber()
    outputFileType: number;

    /** アップロードファイル種別(利用者データ: 1, 個別データ: 2) */
    @IsOptional()
    @Transform(transformToNumber)
    @IsNumber()
    uploadFileType: number;

    /** 個別データ通知ステータス（未通知:0, 通知済:1） */
    @IsOptional()
    @Transform(transformToNumber)
    @IsNumber()
    extDataRequested: number;

    /** 入力ファイル準備ステータス（未完了：0, 完了：1） */
    @IsOptional()
    @Transform(transformToNumber)
    @IsNumber()
    inputFileIsReady: number;

    /** 出力ステータス（未作成：0, 作成済：1） */
    @IsOptional()
    @Transform(transformToNumber)
    @IsNumber()
    outputStatus: number;

    /** データ削除指定（削除不可：0, 削除可：1） */
    @IsOptional()
    @Transform(transformToNumber)
    @IsNumber()
    isDeleteTarget: number;

    /** 削除ステータス（削除なし:0, 削除準備中：1, 削除待ち:2, 削除済：3） */
    @IsOptional()
    @Transform(transformToNumber)
    @IsNumber()
    deleteStatus: number;

    /** 処理中フラグ（処理中：1） */
    @IsOptional()
    @Transform(transformToNumber)
    @IsNumber()
    processing: number;
}
