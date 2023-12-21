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
import { IsDefined, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { transformToNumber } from '../../common/Transform';

export default class GetSettingsTargetReqDto {
    @IsDefined()
    @IsNumber()
    @Transform(({ value }) => { return transformToNumber(value); })
        offset: number = 0;

    @IsDefined()
    @IsNumber()
    @Transform(({ value }) => { return transformToNumber(value); })
        limit: number = 10;
}
