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
import { IsString, IsDefined, IsNotEmpty, ValidateNested, IsOptional, IsNumber, IsArray, IsInt } from 'class-validator';
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

export default class PostGetMcdOutputCodeDataFileReqDto {

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
     * タイプ（1: 開示請求, 2: Region利用終了, 3: Region利用自動終了, 4: Book閉鎖, 5: Book強制閉鎖）
     */
    @IsOptional()
    @IsNumber({},{each:true})
    @IsArray()
    outputTypes: number[];

    /**
     * アクターオブジェクト
     */
    @IsOptional()
    @Type(() => CodeVersionObject)
    @ValidateNested()
    @IsDefined()
    actor?: CodeVersionObject;

    /**
     * アプリケーションオブジェクト
     */
    @IsOptional()
    @Type(() => CodeVersionObject)
    @ValidateNested()
    app?: CodeVersionObject;

    /**
     * ワークフローオブジェクト
     */
    @IsOptional()
    @Type(() => CodeVersionObject)
    @ValidateNested()
    wf?: CodeVersionObject;

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
