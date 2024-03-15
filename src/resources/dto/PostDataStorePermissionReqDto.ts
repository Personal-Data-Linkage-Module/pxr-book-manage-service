/**
 * THIS PROGRAM IS GENERATED UNDER LICENSE FROM NEC CORPORATION.
 *
 * THE OWNERSHIP OF PROGRAM WRITTEN IN OWN-CODING REGION
 * IS HOLDED BY WRITER.
 *
 *
 * $Date$
 * $Revision$
 * $Author$
 *
 * TEMPLATE VERSION :  76463
 */

// SDE-IMPL-REQUIRED 本ファイルをコピーしコントローラーに定義した各 REST API のリクエスト・レスポンスごとにDTOを作成します。

import {
    IsDefined,
    IsNumber,
    IsArray,
    IsOptional,
    IsString,
    Max,
    ValidateNested
} from 'class-validator';
import { CodeObject } from './PostBookOpenReqDto';
import { Type } from 'class-transformer';
import { IsNotEmptyArray } from '../../common/Transform';

export default class PostDataStorePermissionReqDto {
    /** userId */
    @IsDefined()
    @IsString()
        userId: string;

    /** appCode */
    @Max(Number.MAX_SAFE_INTEGER)
    @IsOptional()
    @IsNumber()
        appCode: number;

    /** wfCode */
    @Max(Number.MAX_SAFE_INTEGER)
    @IsOptional()
    @IsNumber()
        wfCode: number;

    /** actorCode */
    @Max(Number.MAX_SAFE_INTEGER)
    @IsDefined()
    @IsNumber()
        actorCode: number;

    /** datatype */
    @IsDefined()
    @Type(type => CodeObject)
    @ValidateNested({ each: true })
    @IsNotEmptyArray()
    @IsArray()
        datatype: CodeObject[];
}
