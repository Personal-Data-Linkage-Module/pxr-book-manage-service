/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { IsDefined, IsNumber } from 'class-validator';
/* eslint-enable */

export default class PostSettingNotificationReqDto {
    @IsDefined()
    @IsNumber()
    id: number;
}
