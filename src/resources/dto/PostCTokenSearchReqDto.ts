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
/* eslint-disable */

// SDE-IMPL-REQUIRED 本ファイルをコピーしコントローラーに定義した各 REST API のリクエスト・レスポンスごとにDTOを作成します。

import { Transform } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';
import { transformToDateTime } from '../../common/Transform';


export class startEnd {
    @Transform(({ value }) => { return transformToDateTime(value); })
    @IsDate()
    @IsOptional()
    start: Date;

    @Transform(({ value }) => { return transformToDateTime(value); })
    @IsDate()
    @IsOptional()
    end: Date;
}
/* eslint-enable */

export default class PostCTokenSearchReqDto {
    @IsOptional()
        createAt: startEnd;
}
