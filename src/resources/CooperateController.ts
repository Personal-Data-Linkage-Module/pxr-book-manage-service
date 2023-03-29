/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import {
    JsonController, Get, Post, Body, Header, Req, UseBefore
} from 'routing-controllers';
import { Request } from 'express';
import PostCooperateReqDto from './dto/PostCooperateReqDto';
import PostCooperateRequestReqDto from './dto/PostCooperateRequestReqDto';
import PostCooperateUserReqDto from './dto/PostCooperateUserReqDto';
import ReleaseCooperateReqDto from './dto/ReleaseCooperateReqDto';
import ReleaseCooperateResDto from './dto/ReleaseCooperateResDto';
import SessionCheckDto from '../services/dto/SessionCheckDto';
import SessionCheckService from '../services/SessionCheckService';
import CooperateServiceDto from '../services/dto/CooperateServiceDto';
import CooperateService from '../services/CooperateService';
import EnableSimpleBackPressure from './backpressure/EnableSimpleBackPressure';
import PostCooperateRequestValidator from './validator/PostCooperateRequestValidator';
import ReleaseCooperateRequestValidator from './validator/ReleaseCooperateRequestValidator';
import PostCooperateRequestRequestValidator from './validator/PostCooperateRequestRequestValidator';
import PostCooperateUserRequestValidator from './validator/PostCooperateUserRequestValidator';
import GetCooperateRequestValidator from './validator/GetCooperateRequestValidator';
import { OperatorType } from '../common/Operator';
import Config from '../common/Config';
import { transformAndValidate } from 'class-transformer-validator';
import OperatorService from 'services/OperatorService';
/* eslint-enable */

/**
 * 利用者ID連携コントローラ
 */
@JsonController('/book-manage')
export default class CooperateController {
    /**
     * 利用者ID連携（非推奨
     * @deprecated 代わりに POST /cooperate を使用）
     */
    @Post('/ind/cooperate')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(PostCooperateRequestValidator)
    async postIndCooperate (@Req() req: Request, @Body() dto: PostCooperateReqDto) {
        const configure = Config.ReadConfig('./config/config.json');
        const message = Config.ReadConfig('./config/message.json');

        // 除外するオペレータタイプを指定しセッションチェックを実行
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setMessage(message);
        const ignoreOperators: number[] = [OperatorType.TYPE_WF, OperatorType.TYPE_APP, OperatorType.TYPE_MANAGE_MEMBER];
        sessionCheckDto.setIgnoreOperatorTypeList(ignoreOperators);
        const sessionCheckService: SessionCheckService = new SessionCheckService();
        const operator = await sessionCheckService.isSessionCheck(sessionCheckDto);

        // 利用者ID連携サービスを実行
        const serviceDto = new CooperateServiceDto();
        serviceDto.setIdentifyCode(dto.getIdentifyCode());
        serviceDto.setOperator(operator);
        serviceDto.setConfigure(configure);
        serviceDto.setMessage(message);
        const cooperateService: CooperateService = new CooperateService();
        const response = await cooperateService.setIdentityData(serviceDto);

        return response;
    }

    /**
     * 利用者ID連携
     */
    @Post('/cooperate')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(PostCooperateRequestValidator)
    async postCooperate (@Req() req: Request, @Body() dto: PostCooperateReqDto) {
        const configure = Config.ReadConfig('./config/config.json');
        const message = Config.ReadConfig('./config/message.json');

        // 除外するオペレータタイプを指定しセッションチェックを実行
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setMessage(message);
        const ignoreOperators: number[] = [OperatorType.TYPE_WF];
        sessionCheckDto.setIgnoreOperatorTypeList(ignoreOperators);
        const sessionCheckService: SessionCheckService = new SessionCheckService();
        const operator = await sessionCheckService.isSessionCheck(sessionCheckDto);

        // 利用者ID連携サービスを実行
        const serviceDto = new CooperateServiceDto();
        serviceDto.setIdentifyCode(dto.getIdentifyCode());
        serviceDto.setOperator(operator);
        serviceDto.setConfigure(configure);
        serviceDto.setMessage(message);
        const cooperateService: CooperateService = new CooperateService();
        const response = await cooperateService.setIdentityData(serviceDto);

        return response;
    }

    /**
     * 利用者ID連携解除
     */
    @Post('/cooperate/release')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(ReleaseCooperateRequestValidator)
    async deleteCooperate (@Req() req: Request, @Body() dto: ReleaseCooperateReqDto) {
        const configure = Config.ReadConfig('./config/config.json');
        const message = Config.ReadConfig('./config/message.json');

        // 除外するオペレータタイプを指定しセッションチェックを実行
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setMessage(message);
        const ignoreOperators: number[] = [OperatorType.TYPE_IND, OperatorType.TYPE_WF, OperatorType.TYPE_APP];
        sessionCheckDto.setIgnoreOperatorTypeList(ignoreOperators);
        const sessionCheckService: SessionCheckService = new SessionCheckService();
        const operator = await sessionCheckService.isSessionCheck(sessionCheckDto);

        // 利用者ID連携解除サービスを実行
        const serviceDto = new CooperateServiceDto();
        serviceDto.setIdentifyCode(dto.identifyCode);
        serviceDto.setOperator(operator);
        serviceDto.setConfigure(configure);
        serviceDto.setMessage(message);
        const cooperateService: CooperateService = new CooperateService();
        const certificateRes = await cooperateService.releaseIdentityData(serviceDto);

        // レスポンスの生成
        const retDto = new ReleaseCooperateResDto();
        retDto.setFromJson(certificateRes);
        const resData: any = retDto.getAsJson();
        return resData;
    }

    /**
     * 利用者ID連携取得
     */
    @Get('/cooperate')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(GetCooperateRequestValidator)
    async getCooperate (@Req() req: Request) {
        const configure = Config.ReadConfig('./config/config.json');
        const message = Config.ReadConfig('./config/message.json');

        // 除外するオペレータタイプを指定しセッションチェックを実行
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setMessage(message);
        const ignoreOperators: number[] = [OperatorType.TYPE_WF, OperatorType.TYPE_APP, OperatorType.TYPE_MANAGE_MEMBER];
        sessionCheckDto.setIgnoreOperatorTypeList(ignoreOperators);
        const sessionCheckService: SessionCheckService = new SessionCheckService();
        const operator = await sessionCheckService.isSessionCheck(sessionCheckDto);

        // 利用者ID連携サービスを実行
        const serviceDto = new CooperateServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setConfigure(configure);
        serviceDto.setMessage(message);
        const cooperateService: CooperateService = new CooperateService();
        const cooperateRes = await cooperateService.getCooperate(serviceDto);
        return cooperateRes;
    }

    /**
     * 利用者ID連携申請
     */
    @Post('/cooperate/request')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(PostCooperateRequestRequestValidator)
    async postCooperateRequest (@Req() req: Request, @Body() dto: PostCooperateRequestReqDto) {
        const configure = Config.ReadConfig('./config/config.json');
        const message = Config.ReadConfig('./config/message.json');

        // 除外するオペレータタイプを指定しセッションチェックを実行
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setMessage(message);
        const ignoreOperators: number[] = [OperatorType.TYPE_WF, OperatorType.TYPE_APP];
        sessionCheckDto.setIgnoreOperatorTypeList(ignoreOperators);
        const sessionCheckService: SessionCheckService = new SessionCheckService();
        const operator = await sessionCheckService.isSessionCheck(sessionCheckDto);

        // 利用者ID連携申請サービスを実行
        const serviceDto = new CooperateServiceDto();
        serviceDto.setPxrId(dto.pxrId ? dto.pxrId : null);
        serviceDto.setActorCode(dto.actor._value);
        serviceDto.setActorVersion(dto.actor._ver);
        if (dto.region) {
            serviceDto.setRegionCode(dto.region._value);
            serviceDto.setRegionVersion(dto.region._ver);
        }
        if (dto.app) {
            serviceDto.setAppCode(dto.app._value);
            serviceDto.setAppVersion(dto.app._ver);
        }
        serviceDto.setUserId(dto.userId ? dto.userId : null);
        serviceDto.setOperator(operator);
        serviceDto.setMessage(message);
        const cooperateService: CooperateService = new CooperateService();
        const response = await cooperateService.saveCooperateRequest(serviceDto);

        return response;
    }

    /**
     * 利用者ID連携解除申請
     */
    @Post('/cooperate/request/release')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(PostCooperateRequestRequestValidator)
    async postCooperateReleaseRequest (@Req() req: Request) {
        const configure = Config.ReadConfig('./config/config.json');
        const message = Config.ReadConfig('./config/message.json');
        const dto = await transformAndValidate(
            PostCooperateRequestReqDto, req.body
        ) as PostCooperateRequestReqDto;

        // 除外するオペレータタイプを指定しセッションチェックを実行
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setMessage(message);
        const ignoreOperators: number[] = [OperatorType.TYPE_WF, OperatorType.TYPE_APP];
        sessionCheckDto.setIgnoreOperatorTypeList(ignoreOperators);
        const sessionCheckService: SessionCheckService = new SessionCheckService();
        const operator = await sessionCheckService.isSessionCheck(sessionCheckDto);

        // 利用者ID連携申請サービスを実行
        const serviceDto = new CooperateServiceDto();
        serviceDto.setPxrId(dto.pxrId ? dto.pxrId : null);
        serviceDto.setActorCode(dto.actor._value);
        serviceDto.setActorVersion(dto.actor._ver);
        if (dto.region) {
            serviceDto.setRegionCode(dto.region._value);
            serviceDto.setRegionVersion(dto.region._ver);
        }
        if (dto.app) {
            serviceDto.setAppCode(dto.app._value);
            serviceDto.setAppVersion(dto.app._ver);
        }
        serviceDto.setUserId(dto.userId ? dto.userId : null);
        serviceDto.setOperator(operator);
        serviceDto.setMessage(message);
        const cooperateService: CooperateService = new CooperateService();
        const response = await cooperateService.saveCooperateRequestRelease(serviceDto);

        return response;
    }

    /**
     * 利用者ID設定
     */
    @Post('/cooperate/user')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(PostCooperateUserRequestValidator)
    async postCooperateUser (@Req() req: Request, @Body() dto: PostCooperateUserReqDto) {
        const configure = Config.ReadConfig('./config/config.json');
        const message = Config.ReadConfig('./config/message.json');

        // 除外するオペレータタイプを指定しセッションチェックを実行
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setMessage(message);
        const ignoreOperators: number[] = [OperatorType.TYPE_WF];
        sessionCheckDto.setIgnoreOperatorTypeList(ignoreOperators);
        const sessionCheckService: SessionCheckService = new SessionCheckService();
        const operator = await sessionCheckService.isSessionCheck(sessionCheckDto);

        // 利用者ID連携申請サービスを実行
        const serviceDto = new CooperateServiceDto();
        serviceDto.setActorCode(dto.actor._value);
        serviceDto.setActorVersion(dto.actor._ver);
        if (dto.region) {
            serviceDto.setRegionCode(dto.region._value);
            serviceDto.setRegionVersion(dto.region._ver);
        }
        if (dto.app) {
            serviceDto.setAppCode(dto.app._value);
            serviceDto.setAppVersion(dto.app._ver);
        }
        serviceDto.setUserId(dto.userId);
        serviceDto.setPxrId(dto.pxrId);
        serviceDto.setOperator(operator);
        serviceDto.setMessage(message);
        const cooperateService: CooperateService = new CooperateService();
        const response = await cooperateService.setUserId(serviceDto);

        return response;
    }
}
