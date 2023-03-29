/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Request } from 'express';
import {
    JsonController, Get, Post, Delete, Body, Param, Header, QueryParam, Res, Req, UseBefore
} from 'routing-controllers';
import PostDataStoreReqDto from './dto/PostDataStoreReqDto';
import SessionCheckDto from '../services/dto/SessionCheckDto';
import SessionCheckService from '../services/SessionCheckService';
import DataStoreServiceDto from '../services/dto/DataStoreServiceDto';
import DataStoreService from '../services/DataStoreService';
import PostDataStoreRequestValidator from './validator/PostDataStoreRequestValidator';
import GetDataStoreRequestValidator from './validator/GetDataStoreRequestValidator';
import DeleteDataStoreRequestValidator from './validator/DeleteDataStoreRequestValidator';
import EnableSimpleBackPressure from './backpressure/EnableSimpleBackPressure';
import { OperatorType } from '../common/Operator';
import Config from '../common/Config';
/* eslint-enable */
const config = Config.ReadConfig('./config/config.json');

/**
 * データ蓄積定義コントローラ
 */
@JsonController('/book-manage')
export default class DataStoreController {
    /**
     * データ蓄積定義追加
     */
    @Post('/settings/store')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    // SDE-MSA-PRIN 過負荷を回避する （MSA-PRIN-ID-02）
    @EnableSimpleBackPressure()
    @UseBefore(PostDataStoreRequestValidator)
    async postDataStore (@Req() req: Request, @Body() dto: PostDataStoreReqDto) {
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
        const serviceDto = new DataStoreServiceDto();
        serviceDto.operator = operator;
        serviceDto.request = dto;
        const ret = await new DataStoreService().postDataStore(serviceDto);
        return ret;
    }

    /**
     * データ蓄積定義取得
     */
    @Get('/settings/store/:id')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    // SDE-MSA-PRIN 過負荷を回避する （MSA-PRIN-ID-02）
    @EnableSimpleBackPressure()
    @UseBefore(GetDataStoreRequestValidator)
    async getDataStoreById (@Param('id') userId: string, @QueryParam('wf') wf: number, @QueryParam('app') app: number, @QueryParam('actorCode') actorCode: number, @Req() req: Request) {
        // セッションチェックデータオブジェクトを生成
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(config['catalogUrl']);
        sessionCheckDto.setOperatorUrl(config['operatorUrl']);
        // サービス層のセッションチェックを実行
        const operator = await new SessionCheckService().isSessionCheck(sessionCheckDto);

        // データ蓄積定義取得データオブジェクトを生成
        const serviceDto = new DataStoreServiceDto();
        serviceDto.setUserId(userId);
        serviceDto.setAppCatalogCode(app);
        serviceDto.setWfCatalogCode(wf);
        if (actorCode) {
            serviceDto.setActor({
                _value: actorCode,
                _ver: null
            });
        } else {
            serviceDto.setActor({
                _value: operator['actorCode'],
                _ver: operator['actorVersion']
            });
        }
        serviceDto.setOperator(operator);
        // サービス層のデータ蓄積定義取得処理を実行
        const ret = await new DataStoreService().getDataStore(serviceDto);
        return ret;
    }

    /**
     * データ蓄積定義削除
     */
    @Delete('/settings/store/:storeId')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    // SDE-MSA-PRIN 過負荷を回避する （MSA-PRIN-ID-02）
    @EnableSimpleBackPressure()
    @UseBefore(DeleteDataStoreRequestValidator)
    async deleteDataStore (@Param('storeId') storeId: number, @Req() req: Request) {
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
        const serviceDto = new DataStoreServiceDto();
        serviceDto.setStoreId(storeId);
        serviceDto.setOperator(operator);
        const ret = await new DataStoreService().deleteDataStore(serviceDto);
        return ret;
    }
}
