/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { IsNotEmpty, IsString } from 'class-validator';
/* eslint-enable */

export default class {
    @IsString()
    @IsNotEmpty()
    pxrId: string;

    @IsString()
    @IsNotEmpty()
    initialPassword: string;
}
