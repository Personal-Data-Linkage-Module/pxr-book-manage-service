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
import CTokenSearchServiceDto from './dto/CTokenSearchServiceDto';
import CTokenLedgerDto from './dto/CTokenLedgerDto';
import CTokenLedgerService from './CTokenLedgerService';
/* eslint-enable */
import PostCTokenSearchResDto from '../resources/dto/PostCTokenSearchResDto';

@Service()
export default class CTokenSearchService {
    /**
     * 本人性確認事項一覧取得
     * @param identitySearchDto
     */
    public async getCTokenSearch (cTokenSearchDto: CTokenSearchServiceDto): Promise<any> {
        const configure = cTokenSearchDto.getConfigure();
        const message = cTokenSearchDto.getMessage();
        const operator = cTokenSearchDto.getOperator();

        // CToken取得
        const cTokenLedgerDto = new CTokenLedgerDto();
        cTokenLedgerDto.setOperator(operator);
        cTokenLedgerDto.setUrl(configure['ctokenLedgerUrl']);
        cTokenLedgerDto.setStartAt(cTokenSearchDto.getStartAt());
        cTokenLedgerDto.setEndAt(cTokenSearchDto.getEndAt());
        cTokenLedgerDto.setConfigure(configure);
        cTokenLedgerDto.setMessage(message);
        const cTokenLedgerService: CTokenLedgerService = new CTokenLedgerService();
        const ctokens = await cTokenLedgerService.postCTokenSearch(cTokenLedgerDto);

        // レスポンスを生成
        const response = new PostCTokenSearchResDto();
        // 対象データが存在しない場合
        if (!ctokens || !Array.isArray(ctokens) || ctokens.length <= 0) {
            response.list = [];
        } else {
            response.list = ctokens;
        }

        // レスポンスを返す
        return response;
    }
}
