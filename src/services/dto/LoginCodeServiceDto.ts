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
 * ログインコード再作成サービスデータ
 */
export default class LoginCodeServiceDto {
    /**
     * PXR-ID
     */
    private pxrId: string = null;

    /**
     * config
     */
    private config: any = null;

    /**
     * message
     */
    private message: any = null;

    /**
     * operator
     */
    private operator: any = null;

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
     * config取得
     */
    public getConfig (): any {
        return this.config;
    }

    /**
     * config設定
     * @param config
     */
    public setConfig (config: any) {
        this.config = config;
    }

    /**
     * message取得
     */
    public getMessage (): any {
        return this.message;
    }

    /**
     * message設定
     * @param message
     */
    public setMessage (message: any) {
        this.message = message;
    }

    /**
     * operator取得
     */
    public getOperator (): any {
        return this.operator;
    }

    /**
     * operator設定
     * @param operator
     */
    public setOperator (operator: any) {
        this.operator = operator;
    }
}
