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

export default class PostSearchCooperateResDto {
    /**
     * actor
     */
    actor: number;

    /**
     * app
     */
    app: number;

    /**
     * wf
     */
    wf: number;

    /**
     * user
     */
    users: User[];

    /**
     * データ構造取得(JSON用連想配列)
     */
    public getAsJson (): {} {
        return {
            actor: this.actor,
            app: this.app,
            wf: this.wf,
            users: this.users
        };
    }

    /**
     * データ構造設定(JSON用連想配列)
     * @param list
     */
    constructor (obj: {}) {
        this.actor = obj['actor'];
        this.app = obj['app'];
        this.wf = null;
        const users: User[] = [];
        for (const elementUser of obj['users']) {
            const user = new User(elementUser);
            users.push(user);
        }
        this.users = users;
    }
}

/**
 * User
 */
export class User {
    /**
     * userId
     */
    public userId: string;

    /**
     * pxrId
     */
    public pxrId: string;

    constructor (obj: {}) {
        this.userId = obj['userId'];
        this.pxrId = obj['pxrId'];
    }
}
