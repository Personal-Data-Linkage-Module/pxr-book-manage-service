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
 * 本人性確認事項取得サービスデータ
 */
export default class SearchServiceDto {
    /**
     * PXR-ID
     */
    private pxrId: string = null;

    /**
     * message
     */
    private message: any = null;

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
