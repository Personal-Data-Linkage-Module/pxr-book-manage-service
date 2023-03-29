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

export default class ReleaseCooperateResDto {
    /**
     * actorCode
     */
    public actorCode: number = null;

    /**
     * actorVersion
     */
    public actorVersion: number = null;

    /**
     * regionCode
     */
    public regionCode: number = null;

    /**
     * regionVersion
     */
    public regionVersion: number = null;

    /**
     * appCode
     */
    public appCode: number = null;

    /**
     * appVersion
     */
    public appVersion: number = null;

    /**
     * wfCode
     */
    public wfCode: number = null;

    /**
     * wfVersion
     */
    public wfVersion: number = null;

    /**
     * 利用者ID
     */
    public userId: string = null;

    /**
     * データ構造取得App(JSON用連想配列)
     */
    public getAsJson (): {} {
        const res:any = {};
        res.actor = {};
        res.actor._value = this.actorCode;
        res.actor._ver = this.actorVersion;
        if (this.regionCode) {
            res.region = {};
            res.region._value = this.regionCode;
            res.region._ver = this.regionVersion;
        }
        if (this.appCode) {
            res.app = {};
            res.app._value = this.appCode;
            res.app._ver = this.appVersion;
        }
        if (this.wfCode) {
            res.wf = {};
            res.wf._value = this.wfCode;
            res.wf._ver = this.wfVersion;
        }
        res.userId = this.userId;
        return res;
    }

    /**
     * データ構造設定(JSON用連想配列)
     * @param obj
     */
    public setFromJson (list: any): void {
        this.actorCode = list['actorCatalogCode'];
        this.actorVersion = list['actorCatalogVersion'];
        this.regionCode = list['regionCatalogCode'];
        this.regionVersion = list['regionCatalogVersion'];
        this.appCode = list['appCatalogCode'];
        this.appVersion = list['appCatalogVersion'];
        this.wfCode = list['wfCatalogCode'];
        this.wfVersion = list['wfCatalogVersion'];
        this.userId = list['userId'];
    }
}
