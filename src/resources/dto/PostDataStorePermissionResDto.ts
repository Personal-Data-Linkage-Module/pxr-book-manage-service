/**
 * THIS PROGRAM IS GENERATED UNDER LICENSE FROM NEC CORPORATION.
 *
 * THE OWNERSHIP OF PROGRAM WRITTEN IN OWN-CODING REGION
 * IS HOLDED BY WRITER.
 *
 *
 * $Date$
 * $Revision$
 * $Author$
 *
 * TEMPLATE VERSION :  76463
 */

/* eslint-disable */
import { CodeObject } from './PostBookOpenReqDto';

/**
 * データ蓄積可否判定レスポンスモデル
 */
export default class PostDataStorePermissionResDto {
    /**
     * checkResult
     */
    checkResult: boolean = null;

    /**
     * datatype
     */
    datatype: CodeObject[] = null;

    /**
     * 判定結果設定
     * @param checkResult
     */
    public setCheckResult (checkResult: boolean) {
        this.checkResult = checkResult;
    }

    /**
     * データ種カタログコード配列設定
     * @param datatype
     */
    public setDatatype (datatype: CodeObject[]) {
        this.datatype = datatype;
    }

    /**
     * データ構造取得(JSON用連想配列)
     */
    public getAsJson (): {} {
        const obj: {} = {
            checkResult: this.checkResult,
            datatype: this.datatype
        };
        return obj;
    }
}
