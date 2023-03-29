/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-enable */
import { Transform, Type } from 'class-transformer';
import { IsDefined, IsNumber, ValidateNested } from 'class-validator';
import { transformToNumber } from '../../common/Transform';

export class Code {
    @IsNumber()
    @IsDefined()
    @Transform(transformToNumber)
    _value: number;
}

export default class PutRegionCloseReqDto {
    /**
     * actor
     */
    @IsDefined()
    @Type(() => Code)
    @ValidateNested()
    actor: Code;

    /**
     * region
     */
    @IsDefined()
    @Type(() => Code)
    @ValidateNested()
    region: Code;
}
