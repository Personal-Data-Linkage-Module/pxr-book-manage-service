/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import AppError from '../common/AppError';
import { Request } from 'express';
import { Body, Delete, Get, Header, JsonController, Param, Post, QueryParams, Req, UseBefore } from 'routing-controllers';
import OperatorService from '../services/OperatorService';
import EnableSimpleBackPressure from './backpressure/EnableSimpleBackPressure';
import SharedDefinitionIdValidator from './validator/SharedDefinitionIdValidator';
import PostIndSettingShareRequestValidator from './validator/PostIndSettingShareRequestValidator';
import GetSharedDefinition from './dto/GetSharedDefinition';
import GetSharedDefinitionValidator from './validator/GetSharedDefinitionValidator';
import PostDataShareReqDto from './dto/PostDataShareReqDto';
/* eslint-enable */
import Config from '../common/Config';
import { OperatorType } from '../common/Operator';
import SessionCheckDto from '../services/dto/SessionCheckDto';
import DataShareServiceDto from '../services/dto/DataShareServiceDto';
import SessionCheckService from '../services/SessionCheckService';
import DataShareService from '../services/DataShareService';
const message = Config.ReadConfig('./config/message.json');
const config = Config.ReadConfig('./config/config.json');

@JsonController('/book-manage')
export default class {
    /**
     * データ共有定義取得（非推奨）
     * @param req
     * @param dto
     * @returns
     * @deprecated 代わりに GET /setting/share を使用
     */
    @Get('/ind/setting/share')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(GetSharedDefinitionValidator)
    async getInd (@Req() req: Request, @QueryParams() dto: GetSharedDefinition) {
        // セッションチェックデータオブジェクトを生成
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(config['catalogUrl']);
        sessionCheckDto.setOperatorUrl(config['operatorUrl']);
        // 除外するオペレータタイプの指定
        sessionCheckDto.setIgnoreOperatorTypeList([OperatorType.TYPE_WF, OperatorType.TYPE_APP, OperatorType.TYPE_MANAGE_MEMBER]);
        // サービス層のセッションチェックを実行
        const operator = await new SessionCheckService().isSessionCheck(sessionCheckDto);

        // サービス層のデータ蓄積定義追加処理を実行
        const serviceDto = new DataShareServiceDto();
        serviceDto.operator = operator;
        serviceDto.request = dto;
        const ret = await new DataShareService().getDataShareInd(serviceDto);
        return ret;
    }

    // データ共有定義取得
    // /ind/setting/share 削除時に getSettingShare から呼び出すように修正
    // @Get('/setting/share')
    // @Header('X-Content-Type-Options', 'nosniff')
    // @Header('X-XSS-Protection', '1; mode=block')
    // @Header('X-Frame-Options', 'deny')
    // @EnableSimpleBackPressure()
    // @UseBefore(GetSharedDefinitionValidator)
    private async getActor (@Req() req: Request, @QueryParams() dto: GetSharedDefinition) {
        const operator = await OperatorService.authMe(req);

        if (!dto.id) {
            throw new AppError(message.REQUIRED_USER_ID, 400);
        }
        return new DataShareService().getForAny(operator, dto.id, dto.wf, dto.app, dto.actor);
    }

    /**
     * データ共有定義取得
     * @param req
     * @param dto
     * @returns
     */
    @Get('/setting/share')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(GetSharedDefinitionValidator)
    async getSettingShare (@Req() req: Request, @QueryParams() dto: GetSharedDefinition) {
        const operator = await OperatorService.authMe(req);
        let ret;
        if (operator.type === OperatorType.TYPE_IND) {
            // セッションチェックデータオブジェクトを生成
            const sessionCheckDto = new SessionCheckDto();
            sessionCheckDto.setRequest(req);
            sessionCheckDto.setCatalogUrl(config['catalogUrl']);
            sessionCheckDto.setOperatorUrl(config['operatorUrl']);
            // サービス層のセッションチェックを実行
            const operator = await new SessionCheckService().isSessionCheck(sessionCheckDto);

            // サービス層のデータ蓄積定義追加処理を実行
            const serviceDto = new DataShareServiceDto();
            serviceDto.operator = operator;
            serviceDto.request = dto;
            ret = await new DataShareService().getDataShareInd(serviceDto);
        } else {
            ret = this.getActor(req, dto);
        }
        return ret;
    }

    /**
     * データ共有定義追加（非推奨）
     * @param req
     * @param dto
     * @returns
     * @deprecated 代わりに POST /setting/share を使用
     */
    @Post('/ind/setting/share')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(PostIndSettingShareRequestValidator)
    async add (@Req() req: Request, @Body() dto: PostDataShareReqDto) {
        // セッションチェックデータオブジェクトを生成
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(config['catalogUrl']);
        sessionCheckDto.setOperatorUrl(config['operatorUrl']);
        // 除外するオペレータタイプの指定
        sessionCheckDto.setIgnoreOperatorTypeList([OperatorType.TYPE_WF, OperatorType.TYPE_APP, OperatorType.TYPE_MANAGE_MEMBER]);
        // サービス層のセッションチェックを実行
        const operator = await new SessionCheckService().isSessionCheck(sessionCheckDto);

        // サービス層のデータ蓄積定義追加処理を実行
        const serviceDto = new DataShareServiceDto();
        serviceDto.operator = operator;
        serviceDto.request = dto;
        const ret = await new DataShareService().postDataShare(serviceDto);
        return ret;
    }

    /**
     * データ共有定義追加
     * @param req
     * @param dto
     * @returns
     */
    @Post('/setting/share')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(PostIndSettingShareRequestValidator)
    async addSettingShare (@Req() req: Request, @Body() dto: PostDataShareReqDto) {
        // セッションチェックデータオブジェクトを生成
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(config['catalogUrl']);
        sessionCheckDto.setOperatorUrl(config['operatorUrl']);
        // 除外するオペレータタイプの指定
        sessionCheckDto.setIgnoreOperatorTypeList([OperatorType.TYPE_WF, OperatorType.TYPE_APP, OperatorType.TYPE_MANAGE_MEMBER]);
        // サービス層のセッションチェックを実行
        const operator = await new SessionCheckService().isSessionCheck(sessionCheckDto);

        // サービス層のデータ蓄積定義追加処理を実行
        const serviceDto = new DataShareServiceDto();
        serviceDto.operator = operator;
        serviceDto.request = dto;
        const ret = await new DataShareService().postDataShare(serviceDto);
        return ret;
    }

    /**
     * データ共有定義削除
     * @param shareId
     * @param req
     * @returns
     * @deprecated 代わりに DELETE /setting/share/:shareId を使用
     */
    @Delete('/ind/setting/share/:shareId')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(SharedDefinitionIdValidator)
    async delete (@Param('shareId') shareId: number, @Req() req: Request) {
        // セッションチェックデータオブジェクトを生成
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(config['catalogUrl']);
        sessionCheckDto.setOperatorUrl(config['operatorUrl']);
        // 除外するオペレータタイプの指定
        sessionCheckDto.setIgnoreOperatorTypeList([OperatorType.TYPE_WF, OperatorType.TYPE_APP, OperatorType.TYPE_MANAGE_MEMBER]);
        // サービス層のセッションチェックを実行
        const operator = await new SessionCheckService().isSessionCheck(sessionCheckDto);

        // サービス層のデータ蓄積定義削除処理を実行
        const serviceDto = new DataShareServiceDto();
        serviceDto.shareId = shareId;
        serviceDto.operator = operator;
        const ret = await new DataShareService().deleteDataShare(serviceDto);
        return ret;
    }

    /**
     * データ共有定義削除
     * @param shareId
     * @param req
     * @returns
     */
    @Delete('/setting/share/:shareId')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(SharedDefinitionIdValidator)
    async deleteSettingShare (@Param('shareId') shareId: number, @Req() req: Request) {
        // セッションチェックデータオブジェクトを生成
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(config['catalogUrl']);
        sessionCheckDto.setOperatorUrl(config['operatorUrl']);
        // 除外するオペレータタイプの指定
        sessionCheckDto.setIgnoreOperatorTypeList([OperatorType.TYPE_WF, OperatorType.TYPE_APP, OperatorType.TYPE_MANAGE_MEMBER]);
        // サービス層のセッションチェックを実行
        const operator = await new SessionCheckService().isSessionCheck(sessionCheckDto);

        // サービス層のデータ蓄積定義削除処理を実行
        const serviceDto = new DataShareServiceDto();
        serviceDto.shareId = shareId;
        serviceDto.operator = operator;
        const ret = await new DataShareService().deleteDataShare(serviceDto);
        return ret;
    }
}
