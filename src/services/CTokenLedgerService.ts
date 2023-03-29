/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import CTokenLedgerDto from './dto/CTokenLedgerDto';
/* eslint-enable */
import { doPostRequest } from '../common/DoRequest';
import AppError from '../common/AppError';
import { ResponseCode } from '../common/ResponseCode';
import moment = require('moment-timezone');
import urljoin = require('url-join');

export default class CTokenLedgerService {
    /**
     * CToken件数検索
     * @param cTokenLedgerDto
     */
    public async postCTokenSearch (cTokenLedgerDto: CTokenLedgerDto): Promise<any> {
        // URLを生成
        const url = urljoin(cTokenLedgerDto.getUrl(), '/count');
        const bodyStr = JSON.stringify({
            createAt: {
                start: cTokenLedgerDto.getStartAt() ? moment(cTokenLedgerDto.getStartAt()).tz('Asia/Tokyo').format('YYYY-MM-DDTHH:mm:ss.SSSZZ') : null,
                end: cTokenLedgerDto.getEndAt() ? moment(cTokenLedgerDto.getEndAt()).tz('Asia/Tokyo').format('YYYY-MM-DDTHH:mm:ss.SSSZZ') : null
            }
        });
        const options = {
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                session: cTokenLedgerDto.getOperator() ? encodeURIComponent(JSON.stringify(cTokenLedgerDto.getOperator())) : cTokenLedgerDto.getOperatorDomain().encoded
            },
            body: bodyStr
        };
        const message = cTokenLedgerDto.getMessage();

        try {
            // CToken台帳サービスからCToken件数を取得
            const result = await doPostRequest(url, options);

            // ステータスコードを判定
            const statusCode: string = result.response.statusCode.toString();
            if (result.response.statusCode === ResponseCode.BAD_REQUEST) {
                // 応答が400の場合、エラーを返す
                throw new AppError(message.FAILED_CTOKEN_COUNT_GET, ResponseCode.BAD_REQUEST);
            } else if (statusCode.match(/^5.+/)) {
                // 応答が500系の場合、エラーを返す
                throw new AppError(message.FAILED_CTOKEN_COUNT_GET, ResponseCode.SERVICE_UNAVAILABLE);
            } else if (result.response.statusCode !== ResponseCode.OK) {
                // 応答が200 OK以外の場合、エラーを返す
                throw new AppError(message.FAILED_CTOKEN_COUNT_GET, ResponseCode.UNAUTHORIZED);
            }
            // CToken件数を戻す
            return result.body;
        } catch (err) {
            if (err.name === AppError.NAME) {
                throw err;
            }
            // サービスへの接続に失敗した場合
            throw new AppError(message.FAILED_CONNECT_TO_CTOKEN_LEDGER, ResponseCode.SERVICE_UNAVAILABLE, err);
        }
    }

    /**
     * CToken取得
     * @param cTokenLedgerDto
     */
    public async postGetCToken (cTokenLedgerDto: CTokenLedgerDto): Promise<any> {
        // URLを生成
        const url = cTokenLedgerDto.getUrl();
        const body: any = {
            createAt: {
                start: cTokenLedgerDto.getStartAt() ? moment(cTokenLedgerDto.getStartAt()).tz('Asia/Tokyo').format('YYYY-MM-DDTHH:mm:ss.SSSZZ') : null,
                end: cTokenLedgerDto.getEndAt() ? moment(cTokenLedgerDto.getEndAt()).tz('Asia/Tokyo').format('YYYY-MM-DDTHH:mm:ss.SSSZZ') : null
            },
            offset: cTokenLedgerDto.getOffset(),
            limit: cTokenLedgerDto.getLimit()
        };
        if (cTokenLedgerDto.getData()) {
            // カタログ指定
            body[cTokenLedgerDto.getType()] = cTokenLedgerDto.getData();
        } else if (cTokenLedgerDto.getDataIdentifier()) {
            // 識別子指定
            body.identifier = {};
            body.identifier[cTokenLedgerDto.getType()] = cTokenLedgerDto.getDataIdentifier();
        }
        const options = {
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                session: cTokenLedgerDto.getOperator() ? encodeURIComponent(JSON.stringify(cTokenLedgerDto.getOperator())) : cTokenLedgerDto.getOperatorDomain().encoded
            },
            body: JSON.stringify(body)
        };
        const message = cTokenLedgerDto.getMessage();

        try {
            // CToken台帳サービスからCTokenを取得
            const result = await doPostRequest(url, options);

            // ステータスコードを判定
            const statusCode: string = result.response.statusCode.toString();
            if (result.response.statusCode === ResponseCode.BAD_REQUEST) {
                // 応答が400の場合、エラーを返す
                throw new AppError(message.FAILED_CTOKEN_GET, ResponseCode.BAD_REQUEST);
            } else if (statusCode.match(/^5.+/)) {
                // 応答が500系の場合、エラーを返す
                throw new AppError(message.FAILED_CTOKEN_GET, ResponseCode.SERVICE_UNAVAILABLE);
            } else if (result.response.statusCode !== ResponseCode.OK) {
                // 応答が200 OK以外の場合、エラーを返す
                throw new AppError(message.FAILED_CTOKEN_GET, ResponseCode.UNAUTHORIZED);
            }
            // CTokenを戻す
            return result.body;
        } catch (err) {
            if (err.name === AppError.NAME) {
                throw err;
            }
            // サービスへの接続に失敗した場合
            throw new AppError(message.FAILED_CONNECT_TO_CTOKEN_LEDGER, ResponseCode.SERVICE_UNAVAILABLE, err);
        }
    }
}
