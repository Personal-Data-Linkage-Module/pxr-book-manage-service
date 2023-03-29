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
import { Transform, Type } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { transformToNumber } from '../../common/Transform';
/* eslint-enable */

export class CodeObject {
    @Transform(transformToNumber)
    @IsNumber()
    @IsNotEmpty()
    @IsDefined()
    _value: number;

    @Transform(transformToNumber)
    @IsNumber()
    @IsNotEmpty()
    @IsDefined()
    _ver: number;
}

/**
 * POST: 出力データ管理作成APIのリクエストDTO
 */
export default class PostCreateMcdOutputCodeDataFileReqDto {
    @IsOptional()
    @IsNumber()
    mcdOutputCodeActorId: number;

    @IsDefined()
    @IsString()
    code: string;

    @IsOptional()
    @Type(() => CodeObject)
    @ValidateNested()
    actor: CodeObject;

    @IsOptional()
    @IsNumber()
    outputApproved: number;

    @IsOptional()
    @IsNumber()
    outputFileType: number;

    @IsOptional()
    @IsNumber()
    uploadFileType: number;

    @IsOptional()
    @IsNumber()
    extDataRequested: number;

    @IsOptional()
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
