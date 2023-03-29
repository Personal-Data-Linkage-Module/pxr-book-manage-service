/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import OperatorDomain from '../../domains/OperatorDomain';
import Operator from '../../resources/dto/OperatorReqDto';
/* eslint-enable */

/**
 * オペレーター追加サービスデータ
 */
export default class UserInfoDto {
    /**
     * PXR-ID
     */
    private pxrId: string = null;

    /**
     * 利用者情報
     */
    private userInformation: object = null;

    operatorDomain: OperatorDomain;

    /**
     * URL
     */
    private url: string = null;

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
     * PXR-ID取得
     */
    public getPxrId (): string {
        return this.pxrId;
    }

    /**
     * PXR-ID設定
     * @param pxrId
     */
    public setPxrId (pxrId: string) {
        this.pxrId = pxrId;
    }

    /**
     * URL取得
     */
    public getUrl (): string {
        return this.url;
    }

    /**
     * URL設定
     * @param url
     */
    public setUrl (url: string) {
        this.url = url;
    }

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
