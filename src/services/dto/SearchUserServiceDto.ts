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
export default class SearchUserServiceDto {
    /**
     * actor
     */
    private actor: number = null;

    /**
     * app
     */
    private app: number = null;

    /**
     * wf
     */
    private wf: number = null;

    /**
     * userId
     */
    private userId: string = null;

    /**
     * オペレータ情報
     */
    private operator: Operator = null;

    /**
     * message
     */
    private message: any = null;

    /**
     * 検索開始位置
     */
    public getActor (): number {
        return this.actor;
    }

    /**
     * 検索開始位置
     * @param actor
     */
    public setActor (actor: number) {
        this.actor = actor;
    }

    /**
     * 検索件数
     */
    public getApp (): number {
        return this.app;
    }

    /**
     * 検索件数
     * @param app
     */
    public setApp (app: number) {
        this.app = app;
    }

    /**
     * 検索開始位置
     */
    public getWf (): number {
        return this.wf;
    }

    /**
     * 検索開始位置
     * @param wf
     */
    public setWf (wf: number) {
        this.wf = wf;
    }

    /**
     * 検索件数
     */
    public getUserId (): string {
        return this.userId;
    }

    /**
     * 検索件数
     * @param userId
     */
    public setUserId (userId: string) {
        this.userId = userId;
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
}
