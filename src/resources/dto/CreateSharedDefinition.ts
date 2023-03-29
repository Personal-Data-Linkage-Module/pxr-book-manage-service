/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Type } from "class-transformer";
import { IsDefined, IsNotEmptyObject, IsObject, IsOptional, ValidateNested } from "class-validator";
import { CodeOnlyObject } from "./IssuanceTemporarilySharedCode";
import { CodeObject } from "./PostBookOpenReqDto";

export default class {
    @IsDefined()
    @Type(type => CodeOnlyObject)
    @ValidateNested()
    @IsObject()
    @IsNotEmptyObject()
    actor: CodeOnlyObject;

    @IsOptional()
    @Type(type => CodeOnlyObject)
    @ValidateNested()
    @IsObject()
    wf: CodeOnlyObject;

    @IsOptional()
    @Type(type => CodeOnlyObject)
    @ValidateNested()
    @IsObject()
    app: CodeOnlyObject;

    @IsDefined()
    @Type(type => CodeObject)
    @ValidateNested()
    @IsObject()
    @IsNotEmptyObject()
    share: CodeObject;
}
