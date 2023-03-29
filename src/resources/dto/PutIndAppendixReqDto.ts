/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-enable */
import { IsDefined, IsObject } from 'class-validator';

export default class PutIndAppendixReqDto {
    /**
     * 結果
     */
    @IsDefined()
    @IsObject()
    appendix: object;
}
