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
 * My-Condition-Book一覧取得サービスデータ
 */
export default class SearchServiceDto {
    /**
     * PXR-IDリスト
     */
    private pxrIdList: Array<string> = null;

    /**
     * 開始日時
     */
    private start: Date = null;

    /**
     * 終了日時
     */
    private end: Date = null;

    /**
     * 検索開始位置
     */
    private offset: number = null;

    /**
     * 検索件数
     */
    private limit: number = null;

    /**
     * includeDeleteCoop
     */
    private includeDeleteCoop: boolean = null;

    /**
     * オペレータ情報
     */
    private operator: Operator = null;

    /**
     * message
     */
    private message: any = null;

    /**
     * 削除フラグ
     */
    private disableFlg: boolean;

    /**
     * PXR-IDリスト取得
     */
    public getPxrIdList (): Array<string> {
        return this.pxrIdList;
    }

    /**
     * PXR-IDリスト設定
     * @param pxrIdList
     */
    public setPxrIdList (pxrIdList: Array<string>) {
        this.pxrIdList = pxrIdList;
    }

    /**
     * 開始日時
     */
    public getStart (): Date {
        return this.start;
    }

    /**
     * 開始日時
     * @param start
     */
    public setStart (start: Date) {
        this.start = start;
    }

    /**
     * 終了日時
     */
    public getEnd (): Date {
        return this.end;
    }

    /**
     * 終了日時
     * @param end
     */
    public setEnd (end: Date) {
        this.end = end;
    }

    /**
     * 検索開始位置
     */
    public getOffset (): number {
        return this.offset;
    }

    /**
     * 検索開始位置
     * @param offset
     */
    public setOffset (offset: number) {
        this.offset = offset;
    }

    /**
     * 検索件数
     */
    public getLimit (): number {
        return this.limit;
    }

    /**
     * 検索件数
     * @param limit
     */
    public setLimit (limit: number) {
        this.limit = limit;
    }

    /**
     * includeDeleteCoop
     */
    public getIncludeDeleteCoop (): boolean {
        return this.includeDeleteCoop;
    }

    /**
     * includeDeleteCoop
     * @param limit
     */
    public setIncludeDeleteCoop (includeDeleteCoop: boolean) {
        this.includeDeleteCoop = includeDeleteCoop;
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
     * 削除フラグ
     */
    public getDisableFlg (): boolean {
        return this.disableFlg;
    }

    /**
     * 削除フラグ
     * @param disableFlg
     */
    public setDisableFlg (disableFlg: boolean) {
        this.disableFlg = disableFlg;
    }
}
