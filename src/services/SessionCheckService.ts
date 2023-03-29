/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import * as express from 'express';
import * as request from 'request';
import SessionCheckDto from './dto/SessionCheckDto';
/* eslint-enable */
import AppError from '../common/AppError';
import { ResponseCode } from '../common/ResponseCode';
import { OperatorType, CookieType } from '../common/Operator';
import Operator from '../resources/dto/OperatorReqDto';
import CatalogDto from './dto/CatalogDto';
import CatalogService from './CatalogService';
import { doPostRequest } from '../common/DoRequest';
import Config from '../common/Config';
import urljoin = require('url-join');
const message = Config.ReadConfig('./config/message.json');

export default class SessionCheckService {
    /**
     * セッションチェック
     * @param sessioncheckDto
     */
    public async isSessionCheck (sessionCheckDto: SessionCheckDto): Promise<Operator> {
        // セッション情報(ヘッダー)からオペレータ情報を取得
        const operator = await this.authMe(sessionCheckDto.getRequest(), sessionCheckDto.getOperatorUrl());

        // 除外メンバーが存在する場合
        const list = sessionCheckDto.getIgnoreOperatorTypeList();
        if (list && list.includes(operator.getType())) {
            // エラーを返す
            throw new AppError(message.REQUEST_UNAUTORIZED, ResponseCode.UNAUTHORIZED);
        }

        // 非サポートのオペレーターの場合
        if (operator.getType() === OperatorType.TYPE_WF) {
            throw new AppError(message.UNSUPPORTED_OPERATOR, ResponseCode.BAD_REQUEST);
        }

        // オペレータ情報を返す
        return operator;
    }

    /**
     * セッションアクターチェック
     * @param sessionCheckDto
     * @param operator
     */
    public async isActorSessionCheck (sessionCheckDto: SessionCheckDto, operator: Operator): Promise<any> {
        // アクターコード、バージョンが存在する場合
        if (operator.getActorCode() && operator.getActorVersion()) {
            // カタログ取得データオブジェクトを生成
            const catalogDto = new CatalogDto();
            catalogDto.setOperator(operator);
            catalogDto.setUrl(sessionCheckDto.getCatalogUrl());
            catalogDto.setCode(operator.getActorCode());
            catalogDto.setVersion(operator.getActorVersion());
            catalogDto.setMessage(message);

            // カタログサービスから対象カタログを取得
            const catalogService: CatalogService = new CatalogService();
            const catalogInfo = await catalogService.getCatalogInfo(catalogDto);

            // 以下以外の場合
            const ns: string = catalogInfo['catalogItem'] ? catalogInfo['catalogItem']['ns'] : null;
            if (!ns ||
                (ns.indexOf('/pxr-root') < 0 &&
                    ns.indexOf('/app') < 0)) {
                // エラーを返す
                throw new AppError(message.REQUEST_UNAUTORIZED, ResponseCode.UNAUTHORIZED);
            }
        } else {
            // エラーを返す
            throw new AppError(message.REQUEST_UNAUTORIZED, ResponseCode.UNAUTHORIZED);
        }
        // オペレータ情報を返す
        return operator;
    }

    /**
     * オペレータ情報取得(クッキー、ヘッダ)
     * @param req
     * リファクタ履歴
     *  seprate : postRequest（Postリクエスト送信処理）
     */
    public async authMe (req: express.Request, operatorUrl: string): Promise<Operator> {
        const operator = new Operator();

        // Cookieにセッションキーが含まれているか、確認する
        const { cookies } = req;
        const sessionId = cookies[CookieType.TYPE_PERSONAL_COOKIE] ||
            cookies[CookieType.TYPE_APPLICATION_COOKIE] ||
            cookies[CookieType.TYPE_MANAGER_COOKIE] ||
            '';
        if (typeof sessionId === 'string' && sessionId.length > 0) {
            operator.setSessionId(sessionId);
            operator.setSessionKey(cookies[CookieType.TYPE_PERSONAL_COOKIE]
                ? CookieType.TYPE_PERSONAL_COOKIE
                : cookies[CookieType.TYPE_APPLICATION_COOKIE]
                    ? CookieType.TYPE_APPLICATION_COOKIE
                    : CookieType.TYPE_MANAGER_COOKIE);
            // リクエストデータ生成
            const data = JSON.stringify({ sessionId: sessionId });
            // 接続のためのオプションを生成
            const options: request.CoreOptions = {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(data)
                },
                body: data
            };
            // URLの生成
            const url = urljoin(operatorUrl + '/session');
            await this.postRequest(url, options, operator);

            // セッションキーが無ければ、ヘッダーからセッション情報を取得できるか
        } else if (req.headers.session) {
            operator.setEncodeData(req.headers.session + '');
            // JSON化
            let data: any = decodeURIComponent(req.headers.session + '');
            while (typeof data === 'string') {
                data = JSON.parse(data);
            }
            // 必要な値は、データから取り出してメンバーへ追加
            operator.setFromJson(data);
            // ヘッダーのセッション情報も存在していない場合はエラーである
        } else {
            throw new AppError(message.NO_SESSION, ResponseCode.UNAUTHORIZED);
        }
        return operator;
    }

    /**
     * doPostRequest
     * @param url
     * @param options
     * @param operator
     */
    private async postRequest (url: string, options: request.CoreOptions, operator: Operator) {
        try {
            const result = await doPostRequest(url, options);
            const { statusCode } = result.response;
            if (statusCode === ResponseCode.NO_CONTENT ||
                statusCode === ResponseCode.BAD_REQUEST) {
                const ex = new AppError(
                    message.IS_NOT_AUTHORIZATION_SESSION,
                    ResponseCode.UNAUTHORIZED);
                throw ex;
            } else if (statusCode !== ResponseCode.OK) {
                const ex = new AppError(
                    message.FAILED_TAKE_SESSION, ResponseCode.INTERNAL_SERVER_ERROR);
                throw ex;
            }
            operator.setEncodeData(encodeURIComponent(JSON.stringify(result.body)));
            // 必要な値は、データから取り出してメンバーへ追加
            operator.setFromJson(result.body);
        } catch (err) {
            if (err.name === AppError.NAME) {
                throw err;
            }
            const ex = new AppError(
                message.FAILED_CONNECT_TO_OPERATOR,
                ResponseCode.INTERNAL_SERVER_ERROR, err);
            throw ex;
        }
    }
}
