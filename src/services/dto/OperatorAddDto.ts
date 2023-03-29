/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import Operator from '../../resources/dto/OperatorReqDto';
/* eslint-enable */

/**
 * オペレーター追加サービスデータ
 */
export default class OperatorAddDto {
    /**
     * ログインID
     */
    private loginId: string = null;

    /**
     * パスワード（ハッシュ化済）
     */
    private hpassword: string = null;

    /**
     * PXR-ID
     */
    private pxrId: string = null;

    /**
     * 属性
     */
    private attributes: object = null;

    /**
     * 利用者情報
     */
    private userInformation: object = null;

    /**
     * セッションID
     */
    private sessionId: string = null;

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
     * procMode
     */
    private procMode: number = 0;

    /**
     * ログインID取得
     */
    public getLoginId (): string {
        return this.loginId;
    }

    /**
     * パスワード取得
     */
    public getHpassword (): string {
        return this.hpassword;
    }

    /**
     * PXR-ID取得
     */
    public getPxrId (): string {
        return this.pxrId;
    }

    /**
     * 属性取得
     */
    public getAttributes (): object {
        return this.attributes;
    }

    /**
     * 利用者情報取得
     */
    public getUserInformation (): object {
        return this.userInformation;
    }

    /**
     * セッションID取得
     */
    // public getSessionId (): string {
    //     return this.sessionId;
    // }

    /**
     * URL取得
     */
    public getUrl (): string {
        return this.url;
    }

    /**
     * ログインID設定
     * @param loginId
     */
    public setLoginId (loginId: string) {
        this.loginId = loginId;
    }

    /**
     * パスワード設定
     * @param hpassword
     */
    public setHpassword (hpassword: string) {
        this.hpassword = hpassword;
    }

    /**
     * PXR-ID設定
     * @param pxrId
     */
    public setPxrId (pxrId: string) {
        this.pxrId = pxrId;
    }

    /**
     * 属性設定
     * @param attribute
     */
    public setAttributes (attributes: object) {
        this.attributes = attributes;
    }

    /**
     * 利用者情設定
     * @param userInformation
     */
    public setUserInformation (userInformation: object) {
        this.userInformation = userInformation;
    }

    /**
     * セッションID設定
     * @param sessionId
     */
    public setSessionId (sessionId: string) {
        this.sessionId = sessionId;
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
     * procMode
     */
    public getProcMode (): number {
        return this.procMode;
    }

    /**
     * procMode
     */
    public setProcMode (procMode: number): void {
        this.procMode = procMode;
    }
}
