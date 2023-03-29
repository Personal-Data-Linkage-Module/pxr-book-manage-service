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

export default class PostIdentitySearchResDto {
    /**
     * PXR-ID
     */
    public pxrId: string = null;

    /**
     * 本人性確認事項リスト
     */
    public list: Array<IdentitySearch> = null;

    /**
     * データ構造取得(JSON用連想配列)
     */
    public getAsJson (): {} {
        const list: {}[] = [];
        this.list.forEach((element: IdentitySearch) => {
            list.push(element.getAsJson());
        });
        const ret = {
            pxrId: this.pxrId,
            identification: list
        };
        return ret;
    }

    /**
     * データ構造設定(JSON用連想配列)
     * @param obj
     */
    public setFromJson (obj: {}[]): void {
        this.list = [];
        obj.forEach((element: {}) => {
            const info: IdentitySearch = new IdentitySearch();
            info.template = JSON.parse(element['template']);
            this.list.push(info);
        });
    }
}

/**
 * 本人性確認事項レコード
 */
export class IdentitySearch {
    /**
     * テンプレート
     */
    public template: {} = null;

    /**
     * データ構造取得(JSON用連想配列)
     */
    public getAsJson (): {} {
        return this.template;
    }
}
