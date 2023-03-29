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
import { IsString, IsDefined, IsNotEmpty, ValidateNested, IsOptional, IsDate, IsNumber, IsBoolean } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { transformToNumber, transformToDateTime } from '../../common/Transform';

/**
 * PUT: My-Condition-Data出力コード更新APIのリクエストDTO
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

export default class PutUpdateOutputCodeReqDto {

    /**
     *  My-Condition-Data出力コードID
     */
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    id: string;

    /**
     * ブックID
     */
    @IsOptional()
    @IsNumber()
    bookId: number;

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
    @IsNumber()
    type: number;

    /**
     * アクターオブジェクト
     */
    @IsOptional()
    @Type(() => CodeVersionObject)
    @ValidateNested()
    @IsDefined()
    actor?: CodeVersionObject;

    /**
     * リージョンオブジェクト
     */
    @IsOptional()
    @Type(() => CodeVersionObject)
    @ValidateNested()
    region?: CodeVersionObject;

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
     * S3バケット名
     */
    @IsOptional()
    @IsString()
    s3Bucket: string;

    /**
     * 署名付きURL出力有効期限
     */
    @Transform(transformToDateTime)
    @IsOptional()
    @IsDate()
    expirationDate: Date;

    /**
     * 署名付きURL出力ステータス（0: 未出力, 1: 出力済）
     */
    @IsOptional()
    @IsNumber()
    status: number;

    /**
     * 利用者連携解除承認ステータス（0: 承認不要, 1: 承認, 2: 否認）
     */
    @IsOptional()
    @IsNumber()
    cooperationCancelApproved: number;

    /**
     * Region利用者連携解除ステータス（0: 未処理, 1: 処理済）
     */
    @IsOptional()
    @IsNumber()
    cooperationCanceled: number;

    /**
     * Service利用者連携解除ステータス（0: 未処理, 1: 処理済）
     */
    @IsOptional()
    @IsNumber()
    cooperationServiceCanceled: number;

    /**
     * 処理中フラグ
     */
    @IsOptional()
    @IsNumber()
    processing: number;
}
