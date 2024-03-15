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
    ValidateNested,
    IsBoolean
} from 'class-validator';
import { CodeObject } from './PostBookOpenReqDto';
import { Type } from 'class-transformer';

export default class PostDataSharePermissionReqDto {
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

    /** sourceActorCode */
    @Max(Number.MAX_SAFE_INTEGER)
    @IsOptional()
    @IsNumber()
        sourceActorCode: number;

    /** sourceAssetCode */
    @Max(Number.MAX_SAFE_INTEGER)
    @IsOptional()
    @IsNumber()
        sourceAssetCode: number;

    /** isTriggerRequest */
    @IsOptional()
    @IsBoolean()
        isTriggerRequest: boolean = false;

    /** document */
    @IsOptional()
    @Type(type => CodeObject)
    @ValidateNested({ each: true })
    @IsArray()
        document: CodeObject[];

    /** event */
    @IsOptional()
    @Type(type => CodeObject)
    @ValidateNested({ each: true })
    @IsArray()
        event: CodeObject[];

    /** thing */
    @IsOptional()
    @Type(type => CodeObject)
    @ValidateNested({ each: true })
    @IsArray()
        thing: CodeObject[];
}
