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
import moment = require('moment-timezone');

// SDE-IMPL-REQUIRED 本ファイルをコピーしコントローラーに定義した各 REST API のリクエスト・レスポンスごとにDTOを作成します。

export default class PostSearchUserResDto {
    /**
     * データ保持用リスト
     */
    public book: BookSearch = null;

    /**
     * データ構造取得(JSON用連想配列)
     */
    public getAsJson (): {} {
        return this.book;
    }

    /**
     * データ構造設定(JSON用連想配列)
     * @param list
     */
    public setFromJson (element: any): void {
        this.book = new BookSearch();
        this.book.pxrId = element['pxrId'];
        this.book.status = element['status'];
        this.book.bookStatus = element['bookStatus'];
        this.book.attributes = JSON.parse(element['attribute']);
        const cooperation: Cooperation[] = [];
        if (element['cooperation']) {
            for (const coop of element['cooperation']) {
                const targetCoop = new Cooperation();
                targetCoop.setFromJson(coop);
                cooperation.push(targetCoop);
            }
        }
        this.book.cooperation = cooperation.length > 0 ? cooperation : null;
        this.book.userInformation = element['userInformation'];
    }
}

/**
 * My-Condition-Book一覧レコード
 */
export class CodeObject {
    /**
     * _value
     */
    public _value: number;

    /**
     * _ver
     */
    public _ver: number;

    constructor (obj: {}) {
        this._value = obj['_value'];
        this._ver = obj['_ver'];
    }
}

/**
 * My-Condition-Book一覧レコード
 */
export class Cooperation {
    /**
     * actor
     */
    actor: CodeObject;

    /**
     * app
     */
    app: CodeObject;

    /**
     * wf
     */
    wf: CodeObject;

    /**
     * userId
     */
    userId: string;

    /**
     * startAt
     */
    startAt: string;

    /**
     * status
     */
    status: number;

    /**
     * データ構造設定(JSON用連想配列)
     * @param list
     */
    public setFromJson (obj: {}): void {
        this.actor = new CodeObject(obj['actor']);
        this.app = obj['app'] ? new CodeObject(obj['app']) : null;
        this.wf = null;
        this.userId = obj['userId'];
        this.startAt = obj['startAt'] ? moment(obj['startAt']).tz('Asia/Tokyo').format('YYYY-MM-DDTHH:mm:ss.SSSZZ') : null;
        this.status = obj['status'];
    }
}

/**
 * My-Condition-Book一覧レコード
 */
export class BookSearch {
    /**
     * PXR-ID
     */
    public pxrId: string = '';

    /**
     * status
     */
    public status: number;

    /**
     * bookStatus
     */
    public bookStatus: number;

    /**
     * 属性
     */
    public attributes: {} = null;

    /**
     * 提携
     */
    public cooperation: Cooperation[] = null;

    /**
     * 利用者情報
     */
    public userInformation: any[] = null;

    /**
     * データ構造取得(JSON用連想配列)
     */
    public getAsJson (): {} {
        return {
            pxrId: this.pxrId,
            status: this.status,
            bookStatus: this.bookStatus,
            attributes: this.attributes,
            cooperation: this.cooperation,
            userInformation: this.userInformation
        };
    }
}
