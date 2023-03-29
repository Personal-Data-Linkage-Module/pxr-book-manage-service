/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import express = require('express');
import { JsonController, Get, Header, Post, QueryParam, Req, UseBefore, Body, Put } from 'routing-controllers';
import EnableSimpleBackPressure from './backpressure/EnableSimpleBackPressure';
import { transformAndValidate } from 'class-transformer-validator';
import RegionCloseService from '../services/RegionCloseService';
import RegionCloseServiceDto, {CodeObject} from '../services/dto/RegionCloseServiceDto';
import SessionCheckDto from '../services/dto/SessionCheckDto';
import SessionCheckService from '../services/SessionCheckService';
import { OperatorType } from '../common/Operator';
import PostResionCloseRequestValidator from './validator/PostResionCloseRequestValidator';
import PutRegionCloseRequestValidator from './validator/PutRegionCloseRequestValidator';
import PostRegionCloseReqDto from './dto/PostRegionCloseReqDto';
import PutRegionCloseReqDto from './dto/PutRegionCloseReqDto';
import moment = require('moment-timezone');
import Config from '../common/Config';
/* eslint-enable */

@JsonController('/book-manage/region/close')
export default class {
    /**
     * Region終了対象追加
     */
    @Post('')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(PostResionCloseRequestValidator)
    async postRegionClose (@Req() req: express.Request) {
        const configure = Config.ReadConfig('./config/config.json');

        // サービス層のセッションチェックを実行
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setIgnoreOperatorTypeList([OperatorType.TYPE_IND, OperatorType.TYPE_WF, OperatorType.TYPE_APP]);
        const operator = await new SessionCheckService().isSessionCheck(sessionCheckDto);

        // パラメータを取得
        let dto = await transformAndValidate(PostRegionCloseReqDto, req.body);
        dto = <PostRegionCloseReqDto>dto;

        // データ追加オブジェクトを生成
        const regionCloseServiceDto = new RegionCloseServiceDto();
        regionCloseServiceDto.setOperator(operator);
        regionCloseServiceDto.setActorCode(dto.actor);
        regionCloseServiceDto.setRegionCode(dto.region);
        regionCloseServiceDto.setCloseDate(moment(dto.endDate).toDate());

        // サービス層のデータ追加を実行
        const ret = await new RegionCloseService().postRegionClose(regionCloseServiceDto);

        return ret;
    }

    /**
     * Region終了時利用者ID連携解除対象個人取得
     */
    @Get('/target')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    async postGetMcdOutputCodeDataFile (@Req() req: express.Request, @QueryParam('offset') offset: number, @QueryParam('limit') limit: number) {
        const configure = Config.ReadConfig('./config/config.json');

        // サービス層のセッションチェックを実行
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setIgnoreOperatorTypeList([OperatorType.TYPE_IND, OperatorType.TYPE_WF, OperatorType.TYPE_APP]);
        const operator = await new SessionCheckService().isSessionCheck(sessionCheckDto);

        // データ取得オブジェクトを生成
        const regionCloseServiceDto = new RegionCloseServiceDto();
        regionCloseServiceDto.setOperator(operator);
        regionCloseServiceDto.setOffset(offset);
        regionCloseServiceDto.setLimit(limit);
        // サービス層のデータ取得を実行
        const ret = await new RegionCloseService().getRegionCloseTarget(regionCloseServiceDto);

        return ret;
    }

    /**
     * Region終了対象取得
     */
    @Get('')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    async getRegionClose (@Req() req: express.Request, @QueryParam('offset') offset: number, @QueryParam('limit') limit: number) {
        const configure = Config.ReadConfig('./config/config.json');

        // サービス層のセッションチェックを実行
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setIgnoreOperatorTypeList([OperatorType.TYPE_IND, OperatorType.TYPE_WF, OperatorType.TYPE_APP]);
        await new SessionCheckService().isSessionCheck(sessionCheckDto);

        // データ取得オブジェクトを生成
        const regionCloseServiceDto = new RegionCloseServiceDto();
        regionCloseServiceDto.setOffset(offset);
        regionCloseServiceDto.setLimit(limit);
        // サービス層のデータ取得を実行
        const ret = await new RegionCloseService().getRegionClose(regionCloseServiceDto);

        return ret;
    }

    /**
     * 終了済Region更新
     */
    @Put('')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(PutRegionCloseRequestValidator)
    async putRegionClose (@Req() req: express.Request) {
        const configure = Config.ReadConfig('./config/config.json');

        // サービス層のセッションチェックを実行
        const sessionCheckDto = new SessionCheckDto();
        sessionCheckDto.setRequest(req);
        sessionCheckDto.setCatalogUrl(configure['catalogUrl']);
        sessionCheckDto.setOperatorUrl(configure['operatorUrl']);
        sessionCheckDto.setIgnoreOperatorTypeList([OperatorType.TYPE_IND, OperatorType.TYPE_WF, OperatorType.TYPE_APP]);
        const operator = await new SessionCheckService().isSessionCheck(sessionCheckDto);

        let dto = await transformAndValidate(PutRegionCloseReqDto, req.body);
        dto = <PutRegionCloseReqDto>dto;

        // データ取得オブジェクトを生成
        const regionCloseServiceDto = new RegionCloseServiceDto();
        const actorCode = new CodeObject();
        const regionCode = new CodeObject();
        actorCode._value = dto.actor._value;
        regionCode._value = dto.region._value;
        regionCloseServiceDto.setOperator(operator);
        regionCloseServiceDto.setActorCode(actorCode);
        regionCloseServiceDto.setRegionCode(regionCode);

        // サービス層のデータ取得を実行
        const ret = await new RegionCloseService().updateRegionClose(regionCloseServiceDto);

        return ret;
    }
}
