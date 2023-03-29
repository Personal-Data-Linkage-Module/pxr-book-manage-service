/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { JsonController, Put, Header, Req, Body, UseBefore } from 'routing-controllers';
import EnableSimpleBackPressure from './backpressure/EnableSimpleBackPressure';
import PostCheckPxrIdReqDto from './dto/PostCheckPxrIdReqDto';
import PostCheckPxrIdRequestValidator from './validator/PostCheckPxrIdRequestValidator';
import express = require('express');
import OperatorService from '../services/OperatorService';
import EntityOperation from '../repositories/EntityOperation';
import { connectDatabase } from '../common/Connection';
/* eslint-enable */

@JsonController('/book-manage')
export default class {
    @Put('/force-deletion')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(PostCheckPxrIdRequestValidator)
    async delete (@Req() req: express.Request, @Body() dto: PostCheckPxrIdReqDto) {
        await connectDatabase();

        const operator = await OperatorService.authMe(req);

        const entity = await EntityOperation.findBookWithPxrIdAndChecksDeletionFlag(dto.pxrId, true);

        const operatorId = await OperatorService.getOperatorIdWithPxrId(dto.pxrId, operator);

        await OperatorService.changeProhibitedFlag(operatorId, true, operator);

        await EntityOperation.updateForceDeletionFlag(entity, true, operator);

        return { status: 'success' };
    }

    @Put('/force-enable')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(PostCheckPxrIdRequestValidator)
    async enable (@Req() req: express.Request, @Body() dto: PostCheckPxrIdReqDto) {
        await connectDatabase();

        const operator = await OperatorService.authMe(req);

        const entity = await EntityOperation.findBookWithPxrIdAndChecksDeletionFlag(dto.pxrId, false);

        // OperatorIdをPXR-IDから取得するためにオペレーターサービスへ接続する
        const operatorId = await OperatorService.getOperatorIdWithPxrId(dto.pxrId, operator);

        await OperatorService.changeProhibitedFlag(operatorId, false, operator);

        await EntityOperation.updateForceDeletionFlag(entity, false, operator);

        return { status: 'success' };
    }
}
