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

export default class PostSearchResDto {
    /**
     * データ保持用リスト
     */
    public list: Array<BookSearch> = null;

    /**
     * データ構造取得(JSON用連想配列)
     */
    public getAsJson (): {} {
        const ret: {}[] = [];
        this.list.forEach((element: BookSearch) => {
            const info: BookSearch = new BookSearch();
            info.pxrId = element.pxrId;
            info.status = element.status;
            info.attributes = element.attributes;
            info.cooperation = element.cooperation;
            info.userInformation = element.userInformation;
            ret.push(info.getAsJson());
        });
        return ret;
    }

    /**
     * データ構造設定(JSON用連想配列)
     * @param list
     */
    public setFromJson (list: any[]): void {
        this.list = [];
        list.forEach((element: {}) => {
            const info: BookSearch = new BookSearch();
            info.pxrId = element['pxrId'];
            info.status = element['status'];
            info.attributes = JSON.parse(element['attribute']);
            const cooperation: Cooperation[] = [];
            if (element['cooperation']) {
                for (const coop of element['cooperation']) {
                    const targetCoop = new Cooperation();
                    targetCoop.setFromJson(coop);
                    cooperation.push(targetCoop);
                }
            }
            info.cooperation = cooperation.length > 0 ? cooperation : null;
            info.userInformation = element['userInformation'];
            this.list.push(info);
        });
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
     * region
     */
    region: CodeObject;

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
        this.region = obj['region'] ? new CodeObject(obj['region']) : null;
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
     * BookStatus
     */
    public status: number;

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
            attributes: this.attributes,
            cooperation: this.cooperation,
            userInformation: this.userInformation
        };
    }
}
