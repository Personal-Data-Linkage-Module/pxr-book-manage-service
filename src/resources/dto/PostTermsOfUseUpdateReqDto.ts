/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import {
    IsNumber,
    IsDefined
} from 'class-validator';

export default class PostTermsOfUseUpdateReqDto {
    @IsDefined()
    @IsNumber()
    code: number;

    @IsDefined()
    @IsNumber()
    version: number;
}
