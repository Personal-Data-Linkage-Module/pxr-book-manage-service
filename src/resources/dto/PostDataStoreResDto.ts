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

/**
 * データ蓄積定義追加レスポンスモデル
 */
export default class PostDataStoreResDto {
    /**
     * id
     */
    id: number = null;

    /**
     * アクターカタログコード
     */
    actor: object = null;

    /**
     * アプリケーションカタログコード
     */
    app: object = null;

    /**
     * ワークフローカタログコード
     */
    wf: object = null;

    /**
     * イベントカタログコード
     */
    store: object = null;

    /**
     * イベントカタログコード
     */
    storeCatalogId: string = null;

    /**
     * モノカタログコード
     */
    document: any[] = null;

    /**
     * モノカタログコード
     */
    event: any[] = null;

    /**
     * アクターカタログコード設定
     * @param actor
     */
    public setActor (actor: object) {
        this.actor = actor;
    }

    /**
     * アプリケーションカタログコード設定
     * @param app
     */
    public setApp (app: object) {
        this.app = app;
    }

    /**
     * ワークフローカタログコード設定
     * @param wf
     */
    public setWf (wf: object) {
        this.wf = wf;
    }

    /**
     * データ構造取得(JSON用連想配列)
     */
    public getAsJson (): {} {
        const obj: {} = {
            id: this.id,
            actor: this.actor,
            app: this.app,
            wf: this.wf,
            store: this.store,
            storeCatalogId: this.storeCatalogId,
            document: this.document,
            event: this.event
        };
        return obj;
    }
}
