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
import IdentificationEntity from '../repositories/postgres/Identification';
import IdentitySearchServiceDto from '../services/dto/IdentitySearchServiceDto';
/* eslint-enable */
import EntityOperation from '../repositories/EntityOperation';
import PostIdentitySearchResDto from '../resources/dto/PostIdentitySearchResDto';
import AppError from '../common/AppError';
import { ResponseCode } from '../common/ResponseCode';

@Service()
export default class IdentitySearchService {
    /**
     * 本人性確認事項一覧取得
     * @param identitySearchDto
     */
    public async getMyConditionBook (identitySearchDto: IdentitySearchServiceDto): Promise<any> {
        const message = identitySearchDto.getMessage();
        // 本人性確認事項を取得
        const identityInfo = await EntityOperation.getIdentityRecord(identitySearchDto.getPxrId());
        // 対象データが存在しない場合
        if (!identityInfo || identityInfo.length <= 0) {
            throw new AppError(message.TARGET_NO_DATA, ResponseCode.NO_CONTENT);
        }
        // レスポンスを生成
        const response = new PostIdentitySearchResDto();
        response.pxrId = identitySearchDto.getPxrId();
        response.setFromJson(identityInfo);

        // レスポンスを返す
        return response;
    }
}
