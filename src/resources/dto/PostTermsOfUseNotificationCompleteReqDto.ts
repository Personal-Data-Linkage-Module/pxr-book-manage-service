/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import {
    IsString,
    IsDefined
} from 'class-validator';

export default class PostTermsOfUseNotificationCompleteReqDto {
    @IsDefined()
    @IsString()
    pxrId: string;
}
