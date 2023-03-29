/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { applicationLogger } from '../common/logging';
import Operator from '../resources/dto/OperatorReqDto';
import OperatorDomain from '../domains/OperatorDomain';
import ProxyRequestDomain from '../domains/ProxyRequestDomain';
import ProxyService from './ProxyService';
/* eslint-enable */

/**
 * Book運用サービス
 */
export default class BookOperateService {
    /**
     * Block間でBook参照を連携する
     * @param actorCode
     * @param body
     * @param operator
     */
    static async doLinkingGetBook (blockCode: number, body: {}, operator: OperatorDomain): Promise<any> {
        // 送信データを生成
        const data = JSON.stringify(body);

        // リクエストを生成
        const detail: ProxyRequestDomain = {
            fromBlock: operator.blockCode,
            fromPath: '/book-manage',
            toBlock: blockCode,
            toPath: '/book-operate/book/search',
            options: {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(data)
                },
                body: data
            }
        };
        // Proxy経由でBook運用のBook参照にアクセス
        const result = await ProxyService.call(detail, operator);
        return result;
    }

    /**
     * Block間でアクセスログ取得を連携する
     * @param actorCode
     * @param body
     * @param operator
     */
    static async doLinkingGetAccessLog (blockCode: number, body: {}, operator: OperatorDomain): Promise<any> {
        // 送信データを生成
        const data = JSON.stringify(body);

        // リクエストを生成
        const detail: ProxyRequestDomain = {
            fromBlock: operator.blockCode,
            fromPath: '/book-manage',
            toBlock: blockCode,
            toPath: '/book-operate/accesslog',
            options: {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(data)
                },
                body: data
            }
        };
        // Proxy経由でBook運用の共有アクセスログ取得にアクセス
        const result = await ProxyService.call(detail, operator);
        return result;
    }

    /**
     * Block間で蓄積イベント受信APIを呼び出す
     * @param actorCode
     * @param body
     * @param operator
     */
    static async doLinkingPostStoreEventRequest (blockCode: number, body: {}, operator: Operator): Promise<any> {
        // 送信データを生成
        const data = JSON.stringify(body);

        // リクエストを生成
        const detail: ProxyRequestDomain = {
            fromBlock: operator.getBlockCode(),
            fromPath: '/book-manage',
            toBlock: blockCode,
            toPath: '/book-operate/store-event/receive',
            options: {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    session: operator.getEncodeData(),
                    'Content-Length': Buffer.byteLength(data)
                },
                body: data
            }
        };
        // Proxy経由でBook運用のデータ収集にアクセス
        const result = await ProxyService.callAPI(detail, operator);
        try {
            applicationLogger.info('store-event/receive result : ' + JSON.stringify(result));
        } catch (e) { }
        return result;
    }
}
