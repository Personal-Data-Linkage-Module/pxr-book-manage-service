/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 *
 *
 *
 * $Date$
 * $Revision$
 * $Author$
 *
 * TEMPLATE VERSION :  76463
 */

// SDE-IMPL-REQUIRED 本ファイルをコピーしてサービスレイヤーの処理を実装します。
/* eslint-disable */
import { Service } from 'typedi';
import IdentityDto from './dto/IdentityServiceDto';
import { CoreOptions } from 'request';
/* eslint-enable */
import { doPostRequest } from '../common/DoRequest';
import AppError from '../common/AppError';
import { ResponseCode } from '../common/ResponseCode';

@Service()
export default class IdentityService {
    /**
     * 本人性確認サービスのAPIを呼び出す
     * @param identityDto
     */
    public async postIdentity (identityDto: IdentityDto): Promise<any> {
        const message = identityDto.getMessage();

        // URLを生成
        const url = identityDto.getUrl();

        // body
        const body = identityDto.getBody();

        // operator
        const operator = identityDto.getOperator();

        // 接続のためのオプションを生成
        const options: CoreOptions = {
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(body),
                session: operator.getEncodeData()
            },
            body: body
        };

        try {
            // 本人性確認サービスから本人性確認情報を取得
            const result = await doPostRequest(url, options);

            // レスポンスコードが200以外の場合
            // ステータスコードを判定
            const statusCode: string = result.response.statusCode.toString();
            if (result.response.statusCode === ResponseCode.BAD_REQUEST) {
                // 応答が400の場合、エラーを返す
                throw new AppError(message.FAILED_IDENTITY_GET, ResponseCode.BAD_REQUEST);
            } else if (statusCode.match(/^5.+/)) {
                // 応答が500系の場合、エラーを返す
                throw new AppError(message.FAILED_IDENTITY_GET, ResponseCode.SERVICE_UNAVAILABLE);
            } else if (result.response.statusCode !== ResponseCode.OK) {
                // 応答が200以外の場合、エラーを返す
                throw new AppError(message.FAILED_IDENTITY_GET, ResponseCode.UNAUTHORIZED);
            }
            // 本人性確認情報を戻す
            return result.body;
        } catch (err) {
            if (err.name === AppError.NAME) {
                throw err;
            }
            // サービスへの接続に失敗した場合
            throw new AppError(message.FAILED_CONNECT_TO_IDENTITY, ResponseCode.SERVICE_UNAVAILABLE, err);
        }
    }
}
