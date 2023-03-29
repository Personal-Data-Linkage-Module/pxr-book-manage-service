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

export default class GetDataShareResDto {
    /**
     * データ操作定義ID
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
     * ストアカタログコード
     */
    share: object = null;

    /**
     * ストアIDカタログコード
     */
    shareCatalogId: string = null;

    /**
     * ドキュメントカタログコード
     */
    document: any[] = null;

    /**
     * イベントカタログコード
     */
    event: {
        _code: {
            _value: number,
            _ver: number
        },
        thing: {
            _code: {
                _value: number,
                _ver: number
            }
        }[]
    }[] = null;

    /**
     * モノカタログコード
     */
    thing: {
        _code: {
            _value: number,
            _ver: number
        }
    }[] = null;

    /**
     * データ操作定義ID設定
     * @param id
     */
    public setId (id: number) {
        this.id = id;
    }

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
     * イベントカタログコード設定
     * @param event
     */
    public setEvent (event: any[]) {
        this.event = event;
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
            share: this.share,
            shareCatalogId: this.shareCatalogId,
            document: this.document,
            event: this.event,
            thing: this.thing
        };
        return obj;
    }
}
