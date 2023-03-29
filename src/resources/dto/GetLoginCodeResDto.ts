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

// SDE-IMPL-REQUIRED 本ファイルをコピーしコントローラーに定義した各 REST API のリクエスト・レスポンスごとにDTOを作成します。

export default class GetLoginCodeResDto {
    /**
     * 再作成PXRログインID
     */
    public pxrId: string = null;

    /**
     * リセット後パスワード
     */
    public resetPassword: string = null;

    /**
     * データ構造取得(JSON用連想配列)
     */
    public getAsJson (): {} {
        return {
            pxrId: this.pxrId,
            resetPassword: this.resetPassword
        };
    }
}
