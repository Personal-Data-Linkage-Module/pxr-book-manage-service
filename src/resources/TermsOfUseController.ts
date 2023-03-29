/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Request } from 'express';
import {
    JsonController, Get, Post, Header, Req, QueryParam, Body, UseBefore
} from 'routing-controllers';
import TermsOfUseServiceDto from '../services/dto/TermsOfUseServiceDto';
import EnableSimpleBackPressure from './backpressure/EnableSimpleBackPressure';
import Config from '../common/Config';
import TermsOfUseService from '../services/TermsOfUseService';
import SessionCheckDto from '../services/dto/SessionCheckDto';
import { OperatorType } from '../common/Operator';
import SessionCheckService from '../services/SessionCheckService';
import OperatorService from '../services/OperatorService';
import PostTermsOfUseUpdateReqDto from './dto/PostTermsOfUseUpdateReqDto';
import PostTermsOfUseUpdateRequestValidator from './validator/PostTermsOfUseUpdateValidator';
import PostTermsOfUseNotificationCompleteReqDto from './dto/PostTermsOfUseNotificationCompleteReqDto';
import PostIndTermOfUseRequestValidator from './validator/PostIndTermOfUseRequestValidator';
import PostIndTermOfUsePlatformReqDto from './dto/PostIndTermOfUsePlatformReqDto';
import PostIndTermOfUseRegionReqDto from './dto/PostIndTermOfUseRegionReqDto';
import { transformAndValidate } from 'class-transformer-validator';
/* eslint-enable */

/**
 * 利用規約コントローラ
 */
@JsonController('/book-manage')
export default class {
    readonly PLATFORM_TYPE = 1;
    readonly REGION_TYPE = 2;

    /**
     * PF利用規約更新通知登録
     */
    @Post('/term_of_use/platform/update')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(PostTermsOfUseUpdateRequestValidator)
    async postPlatformTermsOfUseUpdate (@Req() req: Request, @Body() dto: PostTermsOfUseUpdateReqDto) {
        const configure = Config.ReadConfig('./config/config.json');

        // サービス層のセッションチェックを実行
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setIgnoreOperatorTypeList([OperatorType.TYPE_IND, OperatorType.TYPE_WF, OperatorType.TYPE_APP]);
        const operator = await new SessionCheckService().isSessionCheck(sessionCheckDto);

        const serviceDto = new TermsOfUseServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setTermsType(this.PLATFORM_TYPE);
        serviceDto.setCatalogCode(dto.code);
        serviceDto.setCatalogVersion(dto.version);

        // PF利用規約更新通知管理を登録する
        const ret = await new TermsOfUseService().postTermsOfUseTargetUpdate(serviceDto);
        return ret;
    }

    /**
     * PF利用規約再同意通知設定
     */
    @Post('/term_of_use/platform/target')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    async postPfTarget (@Req() req: Request) {
        const configure = Config.ReadConfig('./config/config.json');

        // サービス層のセッションチェックを実行
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setIgnoreOperatorTypeList([OperatorType.TYPE_IND, OperatorType.TYPE_WF, OperatorType.TYPE_APP]);
        const operator = await new SessionCheckService().isSessionCheck(sessionCheckDto);

        const serviceDto = new TermsOfUseServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setTermsType(this.PLATFORM_TYPE);

        // Region利用規約更新通知をループして処理を実行
        const ret = await new TermsOfUseService().getTermsOfUseTargetFind(serviceDto);
        return ret;
    }

    /**
     * PF利用規約再同意通知設定
     * @deprecated 代わりに POST /term_of_use/platform/target を使用
     */
    @Get('/term_of_use/platform/target/find')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    async getPfTargetFind (@Req() req: Request) {
        const configure = Config.ReadConfig('./config/config.json');

        // サービス層のセッションチェックを実行
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setIgnoreOperatorTypeList([OperatorType.TYPE_IND, OperatorType.TYPE_WF, OperatorType.TYPE_APP]);
        const operator = await new SessionCheckService().isSessionCheck(sessionCheckDto);

        const serviceDto = new TermsOfUseServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setTermsType(this.PLATFORM_TYPE);

        // Region利用規約更新通知をループして処理を実行
        const ret = await new TermsOfUseService().getTermsOfUseTargetFind(serviceDto);
        return ret;
    }

    /**
     * Platform利用規約更新通知個人取得
     */
    @Get('/term_of_use/platform/target')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    async getPlatformTarget (@QueryParam('offset') offset: number = 0, @QueryParam('limit') limit: number = 10, @Req() req: Request) {
        const configure = Config.ReadConfig('./config/config.json');
        const message = Config.ReadConfig('./config/message.json');

        // サービス層のセッションチェックを実行
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setIgnoreOperatorTypeList([OperatorType.TYPE_IND, OperatorType.TYPE_WF, OperatorType.TYPE_APP]);
        const operator = await new SessionCheckService().isSessionCheck(sessionCheckDto);

        // 利用規約申請サービス呼び出し
        const serviceDto = new TermsOfUseServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setOffset(offset);
        serviceDto.setLimit(limit);
        serviceDto.setTermsType(this.PLATFORM_TYPE);
        serviceDto.setRequest(req);
        serviceDto.setCatalogUrl(configure['catalogUrl']);
        serviceDto.setMessage(message);
        const ret = await new TermsOfUseService().getTermsOfUseTarget(serviceDto);
        return ret;
    }

    /**
     * Region利用規約更新通知最終送信日時登録
     */
    @Post('/term_of_use/platform/notification/complete')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    async postPlatformNotificationComplete (@Req() req: Request, @Body() dto: PostTermsOfUseNotificationCompleteReqDto) {
        const configure = Config.ReadConfig('./config/config.json');

        dto = await transformAndValidate(PostTermsOfUseNotificationCompleteReqDto, dto) as PostTermsOfUseNotificationCompleteReqDto;

        // サービス層のセッションチェックを実行
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setIgnoreOperatorTypeList([OperatorType.TYPE_IND, OperatorType.TYPE_WF, OperatorType.TYPE_APP]);
        const operator = await new SessionCheckService().isSessionCheck(sessionCheckDto);

        // データ蓄積定義取得データオブジェクトを生成
        const serviceDto = new TermsOfUseServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setPxrId(dto.pxrId);
        serviceDto.setTermsType(this.PLATFORM_TYPE);
        const ret = await new TermsOfUseService().postTermsOfUseNotificationComplete(serviceDto);
        return ret;
    }

    /**
     * Region利用規約更新通知登録
     */
    @Post('/term_of_use/region/update')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(PostTermsOfUseUpdateRequestValidator)
    async postRegionTargetUpdate (@Req() req: Request, @Body() dto: PostTermsOfUseUpdateReqDto) {
        const configure = Config.ReadConfig('./config/config.json');

        // サービス層のセッションチェックを実行
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setIgnoreOperatorTypeList([OperatorType.TYPE_IND, OperatorType.TYPE_WF, OperatorType.TYPE_APP]);
        const operator = await new SessionCheckService().isSessionCheck(sessionCheckDto);

        const serviceDto = new TermsOfUseServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setTermsType(this.REGION_TYPE);
        serviceDto.setCatalogCode(dto.code);
        serviceDto.setCatalogVersion(dto.version);

        // Region利用規約更新通知管理を登録する
        const ret = await new TermsOfUseService().postTermsOfUseTargetUpdate(serviceDto);
        return ret;
    }

    /**
     * Region利用規約再同意通知設定
     */
    @Post('/term_of_use/region/target')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    async postRegionTarget (@Req() req: Request) {
        const configure = Config.ReadConfig('./config/config.json');

        // サービス層のセッションチェックを実行
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setIgnoreOperatorTypeList([OperatorType.TYPE_IND, OperatorType.TYPE_WF, OperatorType.TYPE_APP]);
        const operator = await new SessionCheckService().isSessionCheck(sessionCheckDto);

        const serviceDto = new TermsOfUseServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setTermsType(this.REGION_TYPE);

        // Region利用規約更新通知をループして処理を実行
        const ret = await new TermsOfUseService().getTermsOfUseTargetFind(serviceDto);
        return ret;
    }

    /**
     * Region利用規約再同意通知設定
     * @deprecated 代わりに POST /term_of_use/region/target を使用
     */
    @Get('/term_of_use/region/target/find')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    async getRegionTargetFind (@Req() req: Request) {
        const configure = Config.ReadConfig('./config/config.json');

        // サービス層のセッションチェックを実行
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setIgnoreOperatorTypeList([OperatorType.TYPE_IND, OperatorType.TYPE_WF, OperatorType.TYPE_APP]);
        const operator = await new SessionCheckService().isSessionCheck(sessionCheckDto);

        const serviceDto = new TermsOfUseServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setTermsType(this.REGION_TYPE);

        // Region利用規約更新通知をループして処理を実行
        const ret = await new TermsOfUseService().getTermsOfUseTargetFind(serviceDto);
        return ret;
    }

    /**
     * Region利用規約更新通知個人取得
     */
    @Get('/term_of_use/region/target')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    async getRegionTarget (@QueryParam('offset') offset: number = 0, @QueryParam('limit') limit: number = 10, @Req() req: Request) {
        const configure = Config.ReadConfig('./config/config.json');
        const message = Config.ReadConfig('./config/message.json');

        // サービス層のセッションチェックを実行
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setIgnoreOperatorTypeList([OperatorType.TYPE_IND, OperatorType.TYPE_WF, OperatorType.TYPE_APP]);
        const operator = await new SessionCheckService().isSessionCheck(sessionCheckDto);

        // 利用規約申請サービス呼び出し
        const serviceDto = new TermsOfUseServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setOffset(offset);
        serviceDto.setLimit(limit);
        serviceDto.setTermsType(this.REGION_TYPE);
        serviceDto.setRequest(req);
        serviceDto.setCatalogUrl(configure['catalogUrl']);
        serviceDto.setMessage(message);
        const ret = await new TermsOfUseService().getTermsOfUseTarget(serviceDto);
        return ret;
    }

    /**
     * Region利用規約更新通知最終送信日時登録
     */
    @Post('/term_of_use/region/notification/complete')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    async postRegionNotificationComplete (@Req() req: Request, @Body() dto: PostTermsOfUseNotificationCompleteReqDto) {
        const configure = Config.ReadConfig('./config/config.json');

        dto = await transformAndValidate(PostTermsOfUseNotificationCompleteReqDto, dto) as PostTermsOfUseNotificationCompleteReqDto;

        // サービス層のセッションチェックを実行
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setIgnoreOperatorTypeList([OperatorType.TYPE_IND, OperatorType.TYPE_WF, OperatorType.TYPE_APP]);
        const operator = await new SessionCheckService().isSessionCheck(sessionCheckDto);

        // データ蓄積定義取得データオブジェクトを生成
        const serviceDto = new TermsOfUseServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setPxrId(dto.pxrId);
        serviceDto.setTermsType(this.REGION_TYPE);
        const ret = await new TermsOfUseService().postTermsOfUseNotificationComplete(serviceDto);
        return ret;
    }

    /**
     * 未同意規約取得（個人）（非推奨）
     * @param req
     * @deprecated 代わりに GET /term_of_use/request/list を使用
     */
    @Get('/ind/term_of_use/request/list')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    async getIndTermOfUse (@Req() req: Request) {
        // オペレーター情報の取得
        const operator = await OperatorService.authMe(req);

        const serviceDto = new TermsOfUseServiceDto();
        serviceDto.setOperatorDomain(operator);
        serviceDto.setPxrId(operator.pxrId);
        const response = await new TermsOfUseService().getNotAgreedTermsOfUse(serviceDto);
        return response;
    }

    /**
     * 未同意規約取得（個人）
     * @param req
     */
    @Get('/term_of_use/request/list')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    async getTermOfUse (@Req() req: Request) {
        // オペレーター情報の取得
        const operator = await OperatorService.authMe(req);

        const serviceDto = new TermsOfUseServiceDto();
        serviceDto.setOperatorDomain(operator);
        serviceDto.setPxrId(operator.pxrId);
        const response = await new TermsOfUseService().getNotAgreedTermsOfUse(serviceDto);
        return response;
    }

    /**
     * PF利用規約同意（非推奨）
     * @deprecated 代わりに POST /term_of_use/platform を使用
     */
    @Post('/ind/term_of_use/platform')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(PostIndTermOfUseRequestValidator)
    async postIndTermOfUsePlatform (@Req() req: Request, @Body() dto: PostIndTermOfUsePlatformReqDto) {
        // オペレーター情報の取得
        const operator = await OperatorService.authMe(req);

        const serviceDto = new TermsOfUseServiceDto();
        serviceDto.setOperatorDomain(operator);
        serviceDto.setTermsType(this.PLATFORM_TYPE);
        serviceDto.setCatalogCode(dto._code._value);
        serviceDto.setCatalogVersion(dto._code._ver);

        // 利用規約同意処理
        const response = await new TermsOfUseService().termOfUseAgreement(serviceDto);
        return response;
    }

    /**
     * PF利用規約同意
     */
    @Post('/term_of_use/platform')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(PostIndTermOfUseRequestValidator)
    async postTermOfUsePlatform (@Req() req: Request, @Body() dto: PostIndTermOfUsePlatformReqDto) {
        // オペレーター情報の取得
        const operator = await OperatorService.authMe(req);

        const serviceDto = new TermsOfUseServiceDto();
        serviceDto.setOperatorDomain(operator);
        serviceDto.setTermsType(this.PLATFORM_TYPE);
        serviceDto.setCatalogCode(dto._code._value);
        serviceDto.setCatalogVersion(dto._code._ver);

        // 利用規約同意処理
        const response = await new TermsOfUseService().termOfUseAgreement(serviceDto);
        return response;
    }

    /**
     * Region利用規約同意（非推奨）
     * @deprecated 代わりに POST /term_of_use/region を使用
     */
    @Post('/ind/term_of_use/region')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(PostIndTermOfUseRequestValidator)
    async postIndTermOfUseRegion (@Req() req: Request, @Body() dto: PostIndTermOfUseRegionReqDto) {
        // オペレーター情報の取得
        const operator = await OperatorService.authMe(req);

        const serviceDto = new TermsOfUseServiceDto();
        serviceDto.setOperatorDomain(operator);
        serviceDto.setTermsType(this.REGION_TYPE);
        serviceDto.setCatalogCode(dto._code._value);
        serviceDto.setCatalogVersion(dto._code._ver);

        // 利用規約同意処理
        const response = await new TermsOfUseService().termOfUseAgreement(serviceDto);
        return response;
    }

    /**
     * Region利用規約同意
     */
    @Post('/term_of_use/region')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(PostIndTermOfUseRequestValidator)
    async postTermOfUseRegion (@Req() req: Request, @Body() dto: PostIndTermOfUseRegionReqDto) {
        // オペレーター情報の取得
        const operator = await OperatorService.authMe(req);

        const serviceDto = new TermsOfUseServiceDto();
        serviceDto.setOperatorDomain(operator);
        serviceDto.setTermsType(this.REGION_TYPE);
        serviceDto.setCatalogCode(dto._code._value);
        serviceDto.setCatalogVersion(dto._code._ver);

        // 利用規約同意処理
        const response = await new TermsOfUseService().termOfUseAgreement(serviceDto);
        return response;
    }

    /**
     * PF利用規約未同意個人取得
     */
    @Get('/term_of_use/platform/deletion/target')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    async getPlatformDeletionTarget (@QueryParam('offset') offset: number, @QueryParam('limit') limit: number, @Req() req: Request) {
        const configure = Config.ReadConfig('./config/config.json');
        const message = Config.ReadConfig('./config/message.json');
        const platform = 1;

        // サービス層のセッションチェックを実行
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setIgnoreOperatorTypeList([OperatorType.TYPE_IND, OperatorType.TYPE_WF, OperatorType.TYPE_APP]);
        const operator = await new SessionCheckService().isSessionCheck(sessionCheckDto);

        // 利用規約未同意個人取得サービス呼び出し
        const serviceDto = new TermsOfUseServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setTermsType(platform);
        serviceDto.setOffset(offset);
        serviceDto.setLimit(limit);
        serviceDto.setRequest(req);
        serviceDto.setCatalogUrl(configure['catalogUrl']);
        serviceDto.setMessage(message);
        const ret = await new TermsOfUseService().getDeletionTargetPlatform(serviceDto);
        return ret;
    }

    /**
     * Region利用規約未同意個人取得
     */
    @Get('/term_of_use/region/deletion/target')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    async getRegionDeletionTarget (@QueryParam('offset') offset: number, @QueryParam('limit') limit: number, @Req() req: Request) {
        const configure = Config.ReadConfig('./config/config.json');
        const message = Config.ReadConfig('./config/message.json');
        const region = 2;

        // サービス層のセッションチェックを実行
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setIgnoreOperatorTypeList([OperatorType.TYPE_IND, OperatorType.TYPE_WF, OperatorType.TYPE_APP]);
        const operator = await new SessionCheckService().isSessionCheck(sessionCheckDto);

        // 利用規約未同意個人取得サービス呼び出し
        const serviceDto = new TermsOfUseServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setTermsType(region);
        serviceDto.setOffset(offset);
        serviceDto.setLimit(limit);
        serviceDto.setRequest(req);
        serviceDto.setCatalogUrl(configure['catalogUrl']);
        serviceDto.setMessage(message);
        const ret = await new TermsOfUseService().getDeletionTargetRegion(serviceDto);
        return ret;
    }
}
