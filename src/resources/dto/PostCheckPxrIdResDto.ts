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

export default class PostCheckPxrIdResDto {
    /**
     * status
     */
    public status: string = null;

    /**
     * データ構造取得App(JSON用連想配列)
     */
    public getAsJson (): {} {
        const res = {
            status: this.status
        };
        return res;
    }

    /**
     * データ構造設定(JSON用連想配列)
     * @param obj
     */
    public setFromJson (list: any): void {
        this.status = list['status'];
    }
}
