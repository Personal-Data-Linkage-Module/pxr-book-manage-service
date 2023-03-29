/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Request } from 'express';
import {
    JsonController, Body, Param, Header, QueryParam, Req, UseBefore, Get, Post
} from 'routing-controllers';
import EnableSimpleBackPressure from './backpressure/EnableSimpleBackPressure';
import PostSettingsUpdateReqDto from './dto/PostSettingsUpdateReqDto';
import PostSettingNotificationCompleteReqDto from './dto/PostSettingNotificationCompleteReqDto';
import PostSettingsUpdateRequestValidator from './validator/PostSettingsUpdateRequestValidator';
import PostSettingNotificationValidator from './validator/PostSettingNotificationValidator';
import GetSettingsTargetRequestValidator from './validator/GetSettingsTargetRequestValidator';
/* eslint-enable */
import Config from '../common/Config';
import { OperatorType } from '../common/Operator';
import SessionCheckDto from '../services/dto/SessionCheckDto';
import SessionCheckService from '../services/SessionCheckService';
import SettingsNotificationServiceDto from '../services/dto/SettingsNotificationServiceDto';
import SettingsNotificationService from '../services/SettingsNotificationService';
const config = Config.ReadConfig('./config/config.json');

/**
 * データ蓄積定義コントローラ
 */
@JsonController('/book-manage')
export default class SettingsNotificationController {
    /**
     * データ蓄積定義追加
     */
    @Post('/settings/update')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    // SDE-MSA-PRIN 過負荷を回避する （MSA-PRIN-ID-02）
    @EnableSimpleBackPressure()
    @UseBefore(PostSettingsUpdateRequestValidator)
    async postSettingsUpdate (@Req() req: Request, @Body() dto: PostSettingsUpdateReqDto) {
        // サービス層のセッションチェックを実行
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(config['catalogUrl']);
        sessionCheckDto.setOperatorUrl(config['operatorUrl']);
        sessionCheckDto.setIgnoreOperatorTypeList([OperatorType.TYPE_IND, OperatorType.TYPE_WF, OperatorType.TYPE_APP]);
        const operator = await new SessionCheckService().isSessionCheck(sessionCheckDto);

        // サービス層のデータ蓄積定義追加処理を実行
        const serviceDto = new SettingsNotificationServiceDto();
        serviceDto.operator = operator;
        serviceDto.codes = dto.codes;
        const ret = await new SettingsNotificationService().postSettingsUpdate(serviceDto);
        return ret;
    }

    /**
     * データ操作通知対象発見
     */
    @Get('/settings/target/find')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    // SDE-MSA-PRIN 過負荷を回避する （MSA-PRIN-ID-02）
    @EnableSimpleBackPressure()
    async getSettingTargetFind (@Req() req: Request) {
        // サービス層のセッションチェックを実行
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(config['catalogUrl']);
        sessionCheckDto.setOperatorUrl(config['operatorUrl']);
        sessionCheckDto.setIgnoreOperatorTypeList([OperatorType.TYPE_IND, OperatorType.TYPE_WF, OperatorType.TYPE_APP]);
        const operator = await new SessionCheckService().isSessionCheck(sessionCheckDto);

        // データ蓄積定義取得データオブジェクトを生成
        const serviceDto = new SettingsNotificationServiceDto();
        serviceDto.operator = operator;
        const ret = await new SettingsNotificationService().getSettingTargetFind(serviceDto);
        return ret;
    }

    /**
     * データ操作通知対象取得
     */
    @Get('/settings/target')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    // SDE-MSA-PRIN 過負荷を回避する （MSA-PRIN-ID-02）
    @EnableSimpleBackPressure()
    @UseBefore(GetSettingsTargetRequestValidator)
    async getSettingsTarget (@QueryParam('offset') offset: number, @QueryParam('limit') limit: number, @Req() req: Request) {
        // サービス層のセッションチェックを実行
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(config['catalogUrl']);
        sessionCheckDto.setOperatorUrl(config['operatorUrl']);
        sessionCheckDto.setIgnoreOperatorTypeList([OperatorType.TYPE_IND, OperatorType.TYPE_WF, OperatorType.TYPE_APP]);
        const operator = await new SessionCheckService().isSessionCheck(sessionCheckDto);

        // データ蓄積定義取得データオブジェクトを生成
        const serviceDto = new SettingsNotificationServiceDto();
        serviceDto.operator = operator;
        serviceDto.offset = offset;
        serviceDto.limit = limit;
        const ret = await new SettingsNotificationService().getSettingsTarget(serviceDto);
        return ret;
    }

    /**
     * データ操作通知完了
     */
    @Post('/settings/notification/complete')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    // SDE-MSA-PRIN 過負荷を回避する （MSA-PRIN-ID-02）
    @EnableSimpleBackPressure()
    @UseBefore(PostSettingNotificationValidator)
    async postSettingNotificationComplete (@Req() req: Request, @Body() dto: PostSettingNotificationCompleteReqDto) {
        // サービス層のセッションチェックを実行
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(config['catalogUrl']);
        sessionCheckDto.setOperatorUrl(config['operatorUrl']);
        sessionCheckDto.setIgnoreOperatorTypeList([OperatorType.TYPE_IND, OperatorType.TYPE_WF, OperatorType.TYPE_APP]);
        const operator = await new SessionCheckService().isSessionCheck(sessionCheckDto);

        // データ蓄積定義取得データオブジェクトを生成
        const serviceDto = new SettingsNotificationServiceDto();
        serviceDto.operator = operator;
        serviceDto.pxrId = dto.pxrId;
        const ret = await new SettingsNotificationService().postSettingNotificationComplete(serviceDto);
        return ret;
    }
}
