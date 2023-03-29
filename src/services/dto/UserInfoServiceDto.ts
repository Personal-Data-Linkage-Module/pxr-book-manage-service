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
/* eslint-disable */
import Operator from '../../resources/dto/OperatorReqDto';
/* eslint-enable */

/**
 * 利用者管理情報による個人の特定サービスデータ
 */
export default class UserInfoServiceDto {
    /**
     * オペレータ情報
     */
    private operator: Operator = null;

    /**
     * message
     */
    private message: any = null;

    /**
     * リクエスト情報
     */
    private request: any = null;

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

    /**
     * リクエスト情報取得
     */
    public getRequest<T> (): T {
        return this.request;
    }

    /**
     * リクエスト情報設定
     * @param request
     */
    public setRequest<T> (request: T) {
        this.request = request;
    }
}
