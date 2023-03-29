/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Request } from 'express';
import PostBookOpenReqDto from './dto/PostBookOpenReqDto';
import PostCheckPxrIdReqDto from './dto/PostCheckPxrIdReqDto';
import PostCheckIdentificationReqDto from './dto/PostCheckIdentificationReqDto';
import {
    JsonController, Post, Delete, Body, Header, Param, Req, UseBefore, QueryParam
} from 'routing-controllers';
import SessionCheckDto from '../services/dto/SessionCheckDto';
import SessionCheckService from '../services/SessionCheckService';
import PostBookOpenResDto from './dto/PostBookOpenResDto';
import PostCheckPxrIdResDto from './dto/PostCheckPxrIdResDto';
import PostCheckIdentificationResDto from './dto/PostCheckIdentificationResDto';
import BookOpenServiceDto from '../services/dto/BookOpenServiceDto';
import BookOpenService from '../services/BookOpenService';
import EnableSimpleBackPressure from './backpressure/EnableSimpleBackPressure';
import PostBookOpenRequestValidator from './validator/PostBookOpenRequestValidator';
import PostCheckPxrIdRequestValidator from './validator/PostCheckPxrIdRequestValidator';
import PostCheckIdentificationRequestValidator from './validator/PostCheckIdentificationRequestValidator';
import DeleteBookCloseRequestValidator from './validator/DeleteBookCloseRequestValidator';
import AppError from '../common/AppError';
import { OperatorType } from '../common/Operator';
import { ResponseCode } from '../common/ResponseCode';
import Config from '../common/Config';
/* eslint-enable */

/**
 * Book開設コントローラ
 */
@JsonController('/book-manage')
export default class BookOpenController {
    /**
     * Book開設
     */
    @Post()
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(PostBookOpenRequestValidator)
    async postBookOpen (@Req() req: Request, @Body() dto: PostBookOpenReqDto) {
        const configure = Config.ReadConfig('./config/config.json');
        const message = Config.ReadConfig('./config/message.json');
        // セッションチェックデータオブジェクトを生成
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setMessage(message);

        // 除外するオペレータタイプの指定
        const ignoreOperators: number[] = [OperatorType.TYPE_IND, OperatorType.TYPE_WF, OperatorType.TYPE_APP];
        sessionCheckDto.setIgnoreOperatorTypeList(ignoreOperators);

        // サービス層のセッションチェックを実行
        const sessionCheckService: SessionCheckService = new SessionCheckService();
        const operator = await sessionCheckService.isSessionCheck(sessionCheckDto);

        // オペレーター追加の権限が無い場合
        const auth = operator.getAuth();
        if (!auth || !auth['member'] || !auth['member']['add'] || auth['member']['add'] === false) {
            // エラーを返す
            throw new AppError(message.REQUEST_UNAUTORIZED, ResponseCode.UNAUTHORIZED);
        }

        // BOOK開設データオブジェクトを生成
        const serviceDto = new BookOpenServiceDto();
        serviceDto.setPxrId(dto.pxrId);
        serviceDto.setLoginId(dto.loginId);
        serviceDto.setUserId(dto.userId);
        serviceDto.setIdServiceFlg(dto.idServiceFlg);
        serviceDto.setAttributes(dto.attributes);
        serviceDto.setAppendix(dto.appendix);
        serviceDto.setIdentification(dto.identification);
        serviceDto.setUserInformation(dto.userInformation);
        serviceDto.setPlatformTermsOfUse(dto.platform_terms_of_use);
        serviceDto.setRegister(operator.getLoginId());
        serviceDto.setSessionId(operator.getSessionId());
        serviceDto.setOperator(operator);
        serviceDto.setCatalogUrl(configure['catalogUrl']);
        serviceDto.setOperatorUrl(configure['operatorUrl']);
        serviceDto.setIdentityUrl(configure['identityUrl']);
        serviceDto.setInitialPasswordExpire(configure['initialPasswordExpire']);
        serviceDto.setExtName(configure['extName']);
        serviceDto.setMessage(message);

        // サービス層の開設処理を実行
        const service: BookOpenService = new BookOpenService();
        const ret = await service.bookOpen(serviceDto);

        const retDto = new PostBookOpenResDto();
        retDto.setFromJson(ret);
        return retDto.getAsJson();
    }

    /**
     * PXR-ID重複チェック
     */
    @Post('/check/pxr-id')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(PostCheckPxrIdRequestValidator)
    async postCheckPxrId (@Req() req: Request, @Body() dto: PostCheckPxrIdReqDto) {
        const configure = Config.ReadConfig('./config/config.json');
        const message = Config.ReadConfig('./config/message.json');
        // セッションチェックデータオブジェクトを生成
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setMessage(message);

        // 除外するオペレータタイプの指定
        const ignoreOperators: number[] = [OperatorType.TYPE_IND, OperatorType.TYPE_WF, OperatorType.TYPE_APP];
        sessionCheckDto.setIgnoreOperatorTypeList(ignoreOperators);

        // サービス層のセッションチェックを実行
        const sessionCheckService: SessionCheckService = new SessionCheckService();
        const operator = await sessionCheckService.isSessionCheck(sessionCheckDto);

        // オペレーター追加の権限が無い場合
        const auth = operator.getAuth();
        if (!auth || !auth['member'] || !auth['member']['add'] || auth['member']['add'] === false) {
            // エラーを返す
            throw new AppError(message.REQUEST_UNAUTORIZED, ResponseCode.UNAUTHORIZED);
        }

        // BOOK開設データオブジェクトを生成
        const serviceDto = new BookOpenServiceDto();
        serviceDto.setPxrId(dto.pxrId);

        // サービス層のPXR-IDチェック処理を実行
        const service: BookOpenService = new BookOpenService();
        const ret = await service.checkPxrId(serviceDto);

        const retDto = new PostCheckPxrIdResDto();
        retDto.setFromJson(ret);
        return retDto.getAsJson();
    }

    /**
     * 本人性確認書類重複チェック
     */
    @Post('/check/identification')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(PostCheckIdentificationRequestValidator)
    async postCheckIdentification (@Req() req: Request, @Body() dto: PostCheckIdentificationReqDto) {
        const configure = Config.ReadConfig('./config/config.json');
        const message = Config.ReadConfig('./config/message.json');
        // セッションチェックデータオブジェクトを生成
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setMessage(message);

        // 除外するオペレータタイプの指定
        const ignoreOperators: number[] = [OperatorType.TYPE_IND, OperatorType.TYPE_WF, OperatorType.TYPE_APP];
        sessionCheckDto.setIgnoreOperatorTypeList(ignoreOperators);

        // サービス層のセッションチェックを実行
        const sessionCheckService: SessionCheckService = new SessionCheckService();
        const operator = await sessionCheckService.isSessionCheck(sessionCheckDto);

        // オペレーター追加の権限が無い場合
        const auth = operator.getAuth();
        if (!auth || !auth['member'] || !auth['member']['add'] || auth['member']['add'] === false) {
            // エラーを返す
            throw new AppError(message.REQUEST_UNAUTORIZED, ResponseCode.UNAUTHORIZED);
        }

        // BOOK開設データオブジェクトを生成
        const serviceDto = new BookOpenServiceDto();
        serviceDto.setIdentification(dto.identification);

        // サービス層の本人性確認書類重複チェック処理を実行
        const service: BookOpenService = new BookOpenService();
        const ret = await service.checkIdentification(serviceDto);

        const retDto = new PostCheckIdentificationResDto();
        retDto.setFromJson(ret);
        return retDto.getAsJson();
    }

    /**
     * Book閉鎖
     */
    @Delete()
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(DeleteBookCloseRequestValidator)
    async deleteBookClode (@Req() req: Request) {
        const configure = Config.ReadConfig('./config/config.json');
        const message = Config.ReadConfig('./config/message.json');
        // セッションチェックデータオブジェクトを生成
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setMessage(message);

        // 除外するオペレータタイプの指定
        const ignoreOperators: number[] = [OperatorType.TYPE_WF, OperatorType.TYPE_APP, OperatorType.TYPE_MANAGE_MEMBER];
        sessionCheckDto.setIgnoreOperatorTypeList(ignoreOperators);

        // サービス層のセッションチェックを実行
        const sessionCheckService: SessionCheckService = new SessionCheckService();
        const operator = await sessionCheckService.isSessionCheck(sessionCheckDto);

        // オペレーター削除の権限が無い場合
        // const auth = operator.getAuth();
        // if (!auth || !auth['member'] || !auth['member']['delete'] || auth['member']['delete'] === false) {
        //     // エラーを返す
        //     throw new AppError(message.REQUEST_UNAUTORIZED, ResponseCode.UNAUTHORIZED);
        // }

        // サービスデータオブジェクトを生成
        const serviceDto = new BookOpenServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setConfigure(configure);
        serviceDto.setMessage(message);
        // サービス層の閉鎖処理を実行
        const service: BookOpenService = new BookOpenService();
        const ret = await service.bookClose(serviceDto);
        return ret;
    }

    /**
     * Book強制削除
     */
    @Delete('/force/:pxrId')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    async deleteBookForce (@Param('pxrId') pxrId: string, @QueryParam('physicalDelete') physicalDelete: boolean, @Req() req: Request) {
        const configure = Config.ReadConfig('./config/config.json');
        const message = Config.ReadConfig('./config/message.json');
        // セッションチェックデータオブジェクトを生成
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setMessage(message);

        // 除外するオペレータタイプの指定
        const ignoreOperators: number[] = [OperatorType.TYPE_IND, OperatorType.TYPE_WF, OperatorType.TYPE_APP];
        sessionCheckDto.setIgnoreOperatorTypeList(ignoreOperators);

        // サービス層のセッションチェックを実行
        const sessionCheckService: SessionCheckService = new SessionCheckService();
        const operator = await sessionCheckService.isSessionCheck(sessionCheckDto);

        // サービスデータオブジェクトを生成
        const serviceDto = new BookOpenServiceDto();
        serviceDto.setOperator(operator);
        serviceDto.setConfigure(configure);
        serviceDto.setMessage(message);
        serviceDto.setPxrId(pxrId);
        serviceDto.setPhysicalDelete(physicalDelete);
        // サービス層の閉鎖処理を実行
        const service: BookOpenService = new BookOpenService();
        const ret = await service.bookForceDelete(serviceDto);
        return ret;
    }
}
