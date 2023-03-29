/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import Operator from '../resources/dto/OperatorReqDto';
/* eslint-enable */

export default class IdService {
    /**
     * 3key登録
     * @param pxrId
     * @param body
     * @param operator
     */
    public async registerThreeKey (pxrId: string, body: any, operator: Operator): Promise<any> {
        // IDサービス連携
        // IDサービスログイン情報に利用者連携情報を紐づける
    }

    /**
     * 3key削除
     * @param pxrId
     * @param userId
     * @param actorCode
     * @param regionCode
     * @param appCode
     */
    public async deleteThreekey (pxrId: string, userId: string, actorCode: Number, regionCode: Number, appCode: Number): Promise<any> {
        // IDサービス連携解除
    }

    /**
     * SC個人ID発行
     * @param body
     * @param operator
     */
    public async issuePersonalID (body: any, operator: Operator): Promise<any> {
        // IDサービス連携実施
        // SC個人IDを発行する
        return '';
    }

    /**
     * アカウント削除
     * @param pxrId
     */
    public async deleteAccount (pxrId: string): Promise<any> {
        // PXR-ID を uid としてIDサービスのアカウントを削除する
    }
}
