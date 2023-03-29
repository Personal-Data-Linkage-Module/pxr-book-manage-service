/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import Operator from '../../resources/dto/OperatorReqDto';
import OperatorDomain from '../../domains/OperatorDomain';
/* eslint-enable */

/**
 * カタログサービスデータ
 */
export default class CatalogDto {
    /**
     * 取得方法
     */
    private procNum: Number = 0;

    /**
     * オペレータ情報
     */
    private operator: Operator = null;

    /**
     * オペレータ情報
     */
    private operatorDomain: OperatorDomain = null;

    /**
     * カタログサービスURL
     */
    private url: string = null;

    /**
     * カタログネームスペース
     */
    private ns: string = null;

    /**
     * 拡張名称
     */
    private extName: string = null;

    /**
     * リクエストボディ
     */
    private request: any = null;

    /**
     * カタログコード
     */
    private code: number = null;

    /**
     * カタログバージョン
     */
    private version: number = null;

    /**
     * message
     */
    private message: any = null;

    /**
     * 取得方法取得
     */
    public getProcNum (): Number {
        return this.procNum;
    }

    /**
     * 取得方法設定
     */
    public setProcNum (procNum: Number): void {
        this.procNum = procNum;
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
     * オペレータ情報取得
     */
    public getOperatorDomain (): OperatorDomain {
        return this.operatorDomain;
    }

    /**
     * オペレータ情報設定
     * @param operator
     */
    public setOperatorDomain (operator: OperatorDomain) {
        this.operatorDomain = operator;
    }

    /**
     * カタログサービスURL取得
     */
    public getUrl (): string {
        return this.url;
    }

    /**
     * カタログサービスURL設定
     * @param url
     */
    public setUrl (url: string) {
        this.url = url;
    }

    /**
     * ネームスペース取得
     */
    public getNs (): string {
        return this.ns;
    }

    /**
     * ネームスペース設定
     * @param ns
     */
    public setNs (ns: string) {
        this.ns = ns;
    }

    /**
     * コード取得
     */
    public getRequest (): any {
        return this.request;
    }

    /**
     * コード設定
     * @param request
     */
    public setRequest (request: any) {
        this.request = request;
    }

    /**
     * コード取得
     */
    public getCode (): number {
        return this.code;
    }

    /**
     * コード設定
     * @param code
     */
    public setCode (code: number) {
        this.code = code;
    }

    /**
     * カタログバージョン取得
     */
    public getVersion (): number {
        return this.version;
    }

    /**
     * カタログバージョン設定
     * @param version
     */
    public setVersion (version: number) {
        this.version = version;
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
}
