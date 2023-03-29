/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import OperatorDomain from '../../domains/OperatorDomain';
import Operator from '../../resources/dto/OperatorReqDto';
/* eslint-enable */

export class CodeObject {
    /**
     * カタログコード
     */
    _value: number;

    /**
     * カタログバージョン
     */
    _ver: number;
}

/**
 * CToken台帳サービスデータ
 */
export default class CTokenLedgerDto {
    /**
     * オペレータ情報
     */
    private operator: Operator = null;

    /**
     * OperatorDomain
     */
    private operatorDomain: OperatorDomain = null;

    /**
     * startAt
     */
    private startAt: Date = null;

    /**
     * endAt
     */
    private endAt: Date = null;

    /**
     * CToken台帳サービスURL
     */
    private url: string = null;

    /**
     * configure
     */
    private configure: any = null;

    /**
     * message
     */
    private message: any = null;

    /**
     * 開始位置
     */
    private offset: number = 0;

    /**
     * 取得件数
     */
    private limit: number = 10;

    /**
     * データ種別
     */
    private type: string;

    /**
     * 検索対象のデータ
     */
    private data: CodeObject[] = null;

    /**
     * 検索対象のデータ識別子
     */
    private dataIdentifier: string[] = null;

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
     * OperatorDomain取得
     */
    public getOperatorDomain (): OperatorDomain {
        return this.operatorDomain;
    }

    /**
     * OperatorDomain設定
     * @param operatorDomain
     */
    public setOperatorDomain (operatorDomain: OperatorDomain) {
        this.operatorDomain = operatorDomain;
    }

    /**
     * 検索対象開始時刻取得
     */
    public getStartAt (): Date {
        return this.startAt;
    }

    /**
     * 検索対象開始時刻設定
     * @param startAt
     */
    public setStartAt (startAt: Date) {
        this.startAt = startAt;
    }

    /**
     * 検索対象終了時刻取得
     */
    public getEndAt (): Date {
        return this.endAt;
    }

    /**
     * 検索対象終了時刻設定
     * @param endAt
     */
    public setEndAt (endAt: Date) {
        this.endAt = endAt;
    }

    /**
     * CToken台帳サービスURL取得
     */
    public getUrl (): string {
        return this.url;
    }

    /**
     * CToken台帳サービスURL設定
     * @param url
     */
    public setUrl (url: string) {
        this.url = url;
    }

    /**
     * configure
     */
    public getConfigure (): any {
        return this.configure;
    }

    /**
     * configure
     * @param configure
     */
    public setConfigure (configure: any) {
        this.configure = configure;
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
     * 開始位置
     */
    public getOffset (): number {
        return this.offset;
    }

    /**
     * 開始位置
     * @param offset
     */
    public setOffset (offset: number) {
        this.offset = offset;
    }

    /**
     * 取得件数
     */
    public getLimit (): number {
        return this.limit;
    }

    /**
     * 取得件数
     * @param limit
     */
    public setLimit (limit: number) {
        this.limit = limit;
    }

    /**
     * データ種別
     */
    public getType (): string {
        return this.type;
    }

    /**
     * データ種別
     * @param type
     */
    public setType (type: string) {
        this.type = type;
    }

    /**
     * 検索対象のデータ
     */
    public getData (): CodeObject[] {
        return this.data;
    }

    /**
     * 検索対象のデータ
     * @param data
     */
    public setData (data: CodeObject[]) {
        this.data = data;
    }

    /**
     * 検索対象のデータ識別子
     */
    public getDataIdentifier (): string[] {
        return this.dataIdentifier;
    }

    /**
     * 検索対象のデータ識別子
     * @param dataIdentifier
     */
    public setDataIdentifier (dataIdentifier: string[]) {
        this.dataIdentifier = dataIdentifier;
    }
}
