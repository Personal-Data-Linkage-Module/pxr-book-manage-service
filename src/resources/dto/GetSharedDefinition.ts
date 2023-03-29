/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { transformToNumber } from "../../common/Transform";

export default class {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsOptional()
    @IsNumber()
    @Transform(transformToNumber)
    wf: number;

    @IsOptional()
    @IsNumber()
    @Transform(transformToNumber)
    app: number;

    @IsOptional()
    @IsNumber()
    @Transform(transformToNumber)
    actor: number;
}
