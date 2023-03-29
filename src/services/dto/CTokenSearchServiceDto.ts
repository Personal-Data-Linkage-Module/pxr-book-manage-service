/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import Operator from '../../resources/dto/OperatorReqDto';
/* eslint-enable */

/**
 * 本人性確認事項取得サービスデータ
 */
export default class CTokenSearchServiceDto {
    /**
     * オペレータ情報
     */
    private operator: Operator = null;

    /**
     * startAt
     */
    private startAt: Date = null;

    /**
     * endAt
     */
    private endAt: Date = null;

    /**
     * configure
     */
    private configure: any = null;

    /**
     * message
     */
    private message: any = null;

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
}
