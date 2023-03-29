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

// SDE-IMPL-REQUIRED 本ファイルをコピーしてサービスレイヤーのDTOを実装します。
/* eslint-disable */
import Operator from '../../resources/dto/OperatorReqDto';
/* eslint-enable */

export default class IdentityServiceDto {
    /**
     * オペレータ情報
     */
    private operator: Operator = null;

    /**
     * オペレータ情報取得
     */
    public getOperator (): Operator {
        return this.operator;
    }

    /**
     * オペレータ情報設定
     * @param operator
     */
    public setOperator (operator: Operator) {
        this.operator = operator;
    }

    /**
     * 本人性確認サービスURL
     */
    private url: string = null;

    /**
     * 本人性確認サービスURL取得
     */
    public getUrl (): string {
        return this.url;
    }

    /**
     * 本人性確認サービスURL設定
     * @param url
     */
    public setUrl (url: string) {
        this.url = url;
    }

    /**
     * 本人性確認サービスbody
     */
    private body: any = null;

    /**
     * 本人性確認サービスbody取得
     */
    public getBody (): any {
        return this.body;
    }

    /**
     * 本人性確認サービスbody設定
     * @param body
     */
    public setBody (body: any) {
        this.body = body;
    }

    /**
     * message
     */
    private message: any = null;

    /**
     * message
     */
    public getMessage (): any {
        return this.message;
    }

    /**
     * message
     * @param message
     */
    public setMessage (message: any) {
        this.message = message;
    }
}
