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
import { IsString, IsDefined, IsNotEmpty, ValidateNested, IsOptional, IsNumber } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { transformToNumber } from '../../common/Transform';

/**
 * POST: My-Condition-Data出力コード取得APIのリクエストDTO
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

export default class PostUpdateMcdOutputCodeDataFileReqDto {

    /**
     * My-Condition-Data出力コードID
     */
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    id: string;

    /**
     * 出力データ収集アクターID
     */
    @IsOptional()
    @IsNumber()
    mcdOutputCodeActorId: number;

    /**
     * コード
     */
    @IsOptional()
    @IsString()
    code: string;

    /**
     * アクターオブジェクト
     */
    @IsOptional()
    @Type(() => CodeVersionObject)
    @ValidateNested()
    actor?: CodeVersionObject;

    /**
     * データ出力承認ステータス（未回答：0, 承認：1, 否認：2）
     */
    @IsOptional()
    @IsNumber()
    outputApproved: number;

    /**
     * 出力ファイル種別(ダウンロード: 1, アップロード: 2)
     */
    @IsOptional()
    @IsNumber()
    outputFileType: number;

    /**
     * アップロードファイル種別(利用者データ: 1, 個別データ: 2)
     */
    @IsOptional()
    @IsNumber()
    uploadFileType: number;

    /**
     * 個別データ通知ステータス（未通知:0, 通知済:1）
     */
    @IsOptional()
    @IsNumber()
    extDataRequested: number;

    /**
     * ファイル名
     */
    @IsOptional()
    @IsString()
    fileName: string;

    /**
     * 入力ファイル準備ステータス（未完了：0, 完了：1）
     */
    @IsOptional()
    @IsNumber()
    inputFileIsReady: number;

    /**
     * 出力ステータス（未作成：0, 作成済：1）
     */
    @IsOptional()
    @IsNumber()
    outputStatus: number;

    /**
     * データ削除指定（削除不可：0, 削除可：1）
     */
    @IsOptional()
    @IsNumber()
    isDeleteTarget: number;

    /**
     * 削除ステータス（削除なし:0, 削除準備中：1, 削除待ち:2, 削除済：3）
     */
    @IsOptional()
    @IsNumber()
    deleteStatus: number;

    /**
     * 処理中フラグ（処理中：1）
     */
    @IsOptional()
    @IsNumber()
    processing: number;
}
