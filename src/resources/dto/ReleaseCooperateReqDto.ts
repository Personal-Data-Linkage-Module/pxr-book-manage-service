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

import {
    IsString,
    IsDefined,
    IsNotEmpty
} from 'class-validator';
/**
 * POST: 利用者ID連携解除APIのリクエストDTO
 */
export default class ReleaseCooperateReqDto {
    /** userId */
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    identifyCode: string;
}
