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
import { Type } from 'class-transformer';
import { IsDefined, IsNumber, IsString, ValidateNested } from 'class-validator';
/* eslint-enable */

export class CodeObject {
    @IsDefined()
    @IsNumber()
    _value: number;

    @IsDefined()
    @IsNumber()
    _ver: number;
}

/**
 * POST: 出力データ管理作成APIのリクエストDTO
 */
export default class PostOutputCondtionDataMngReqDto {
    @IsDefined()
    @IsNumber()
    mcdOutputCodeActorId: number;

    @IsDefined()
    @IsString()
    code: string;

    @IsDefined()
    @Type(() => CodeObject)
    @ValidateNested()
    actor: CodeObject;

    @IsDefined()
    @IsNumber()
    outputApproved: number;

    @IsDefined()
    @IsNumber()
    outputFileType: number;

    @IsDefined()
    @IsNumber()
    uploadFileType: number;

    @IsDefined()
    @IsNumber()
    extDataRequested: number;

    @IsDefined()
    @IsString()
    fileName: string;

    @IsDefined()
    @IsNumber()
    inputFileIsReady: number;

    @IsDefined()
    @IsNumber()
    outputStatus: number;

    @IsDefined()
    @IsNumber()
    isDeleteTarget: number;

    @IsDefined()
    @IsNumber()
    deleteStatus: number;

    @IsDefined()
    @IsNumber()
    processing: number;
}
