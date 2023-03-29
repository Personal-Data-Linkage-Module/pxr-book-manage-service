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

export default class PostBookOpenResDto {
    /**
     * pxrId
     */
    public pxrId: string = null;

    /**
     * pxrId
     */
    public loginId: string = null;

    /**
     * initialPassword
     */
    public initialPassword: string = null;

    /**
     * attributes
     */
    public attributes: any = null;

    /**
     * attributes
     */
    public appendix: any = null;

    /**
     * identifyCode
     */
    public identifyCode: string = null;

    /**
     * データ構造取得App(JSON用連想配列)
     */
    public getAsJson (): {} {
        const res = {
            pxrId: this.pxrId,
            loginId: this.loginId,
            initialPassword: this.initialPassword,
            attributes: this.attributes,
            appendix: this.appendix,
            identifyCode: this.identifyCode
        };
        return res;
    }

    /**
     * データ構造設定(JSON用連想配列)
     * @param obj
     */
    public setFromJson (list: any): void {
        this.pxrId = list['pxrId'];
        this.loginId = list['loginId'];
        this.initialPassword = list['initialPassword'];
        this.attributes = list['attributes'];
        this.appendix = list['appendix'];
        this.identifyCode = list['identifyCode'];
    }
}
