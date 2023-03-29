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

/**
 * POST: 利用者管理情報による個人の特定APIのレスポンスDto
 */
export class PxrObject {
    /**
     * PXR-ID配列
     */
    pxrId: string[] = [];

    /**
     * レスポンス用のオブジェクトに変換する
     */
    public getAsJson (): {} {
        return {
            pxrId: this.pxrId.length > 0 ? this.pxrId : null
        };
    }

    /**
     * データ構造設定(JSON用連想配列)
     * @param obj
     */
    public setFromJson (obj: {}): void {
        this.pxrId = obj['pxrId'] ? obj['pxrId'] : [];
    }
}

export default class PostUserInfoSearchResDto {
    /**
     * リスト
     */
    list: PxrObject[] = [];

    /**
     * レスポンス用のオブジェクトに変換する
     */
    public getAsJson (): {} {
        const list: {}[] = [];
        for (let index = 0; index < this.list.length; index++) {
            list.push(this.list[index].getAsJson());
        }
        return list;
    }

    /**
     * データ構造設定(JSON用連想配列)
     * @param list
     */
    public setFromJson (list: {}[]): void {
        const pxrIdList: PxrObject[] = [];
        for (let index = 0; index < list.length; index++) {
            const info = new PxrObject();
            info.setFromJson(list[index]);
            pxrIdList.push(info);
        }
        this.list = pxrIdList;
    }
}
