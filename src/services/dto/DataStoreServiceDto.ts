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
import { CodeObject } from './CTokenLedgerDto';
/* eslint-enable */
/**
 * データ蓄積定義追加サービスデータ
 */
export default class DataStoreServiceDto {
    /**
     * PXR-ID
     */
    private pxrId: string = null;

    /**
     * アクターカタログコードオブジェクト
     */
    private actor: object = null;

    /**
     * アプリケーションカタログコードオブジェクト
     */
    private app: object = null;

    /**
     * ワークフローカタログコードオブジェクト
     */
    private wf: object = null;

    /**
     * アクターカタログコード
     */
    private actorCatalogCode: number = null;

    /**
     * アプリケーションカタログコード
     */
    private appCatalogCode: number = null;

    /**
     * ワークフローカタログコード
     */
    private wfCatalogCode: number = null;

    /**
     * イベントカタログコードオブジェクト
     */
    private event: object = null;

    /**
     * モノカタログコードオブジェクト
     */
    private thing: any[] = null;

    /**
     * データ種カタログコードオブジェクト
     */
    private datatype: CodeObject[] = null;

    /**
     * 登録者（ログインID）
     */
    private register: string = null;

    /**
     * オペレータ情報
     */
    operator: Operator = null;

    /**
     * userId
     */
    private userId: string = null;

    /**
     * message
     */
    private message: any = null;

    /**
     * message
     */
    request: any = null;

    /**
     * configure
     */
    // private configure: any = null;

    /**
     * storeId
     */
    private storeId: number = null;

    /**
     * 一部蓄積可フラグ
     */
    private allowPartialStore: boolean = null;

    /**
     * PXR-ID取得
     */
    public getPxrId (): string {
        return this.pxrId;
    }

    /**
     * 登録者取得
     */
    public getRegister (): string {
        return this.register;
    }

    /**
     * PXR-ID設定
     * @param pxrId
     */
    public setPxrId (pxrId: string) {
        this.pxrId = pxrId;
    }

    /**
     * 登録者設定
     * @param register
     */
    public setRegister (register: string) {
        this.register = register;
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
     * アクターカタログコード取得
     */
    public getActor (): object {
        return this.actor;
    }

    /**
     * アクターカタログコード設定
     * @param actor
     */
    public setActor (actor: object) {
        this.actor = actor;
    }

    /**
     * アプリケーションカタログコード取得
     */
    public getApp (): object {
        return this.app;
    }

    /**
     * アプリケーションカタログコード設定
     * @param app
     */
    public setApp (app: object) {
        this.app = app;
    }

    /**
     * ワークフローカタログコード取得
     */
    public getWf (): object {
        return this.wf;
    }

    /**
     * ワークフローカタログコード設定
     * @param wf
     */
    public setWf (wf: object) {
        this.wf = wf;
    }

    /**
     * イベントカタログコード取得
     */
    public getEvent (): object {
        return this.event;
    }

    /**
     * イベントカタログコード設定
     * @param event
     */
    public setEvent (event: object) {
        this.event = event;
    }

    /**
     * モノカタログコード配列取得
     */
    public getThing (): any[] {
        return this.thing;
    }

    /**
     * モノカタログコード配列設定
     * @param thing
     */
    public setThing (thing: any[]) {
        this.thing = thing;
    }

    /**
     * データ種カタログコード配列取得
     */
    public getDatatype (): CodeObject[] {
        return this.datatype;
    }

    /**
     * データ種カタログコード配列設定
     * @param datatype
     */
    public setDatatype (datatype: CodeObject[]) {
        this.datatype = datatype;
    }

    /**
     * userId設定
     * @param userId
     */
    public setUserId (userId: string) {
        this.userId = userId;
    }

    /**
     * userId取得
     */
    public getUserId (): string {
        return this.userId;
    }

    /**
     * アプリケーションカタログコード取得
     */
    public getAppCatalogCode (): number {
        return this.appCatalogCode;
    }

    /**
     * アプリケーションカタログコード設定
     * @param appCatalogCode
     */
    public setAppCatalogCode (appCatalogCode: number) {
        this.appCatalogCode = appCatalogCode;
    }

    /**
     * ワークフローカタログコード取得
     */
    public getWfCatalogCode (): number {
        return this.wfCatalogCode;
    }

    /**
     * ワークフローカタログコード設定
     * @param wfCatalogCode
     */
    public setWfCatalogCode (wfCatalogCode: number) {
        this.wfCatalogCode = wfCatalogCode;
    }

    /**
     * アクターカタログコード取得
     */
    public getActorCatalogCode (): number {
        return this.actorCatalogCode;
    }

    /**
     * アクターカタログコード設定
     * @param actorCatalogCode
     */
    public setActorCatalogCode (actorCatalogCode: number) {
        this.actorCatalogCode = actorCatalogCode;
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

    // /**
    //  * configure
    //  */
    // public getConfigure (): any {
    //     return this.configure;
    // }

    // /**
    //  * configure
    //  * @param configure
    //  */
    // public setConfigure (configure: any) {
    //     this.configure = configure;
    // }

    /**
     * storeId
     */
    public getStoreId (): number {
        return this.storeId;
    }

    /**
     * storeId
     * @param storeId
     */
    public setStoreId (storeId: number) {
        this.storeId = storeId;
    }

    /**
     * allowPartialStore
     * @returns
     */
    public getAllowPartialStore (): boolean {
        return this.allowPartialStore;
    }

    /**
     * allowPartialStore
     * @param allowPartialStore
     */
    public setAllowPartialStore (allowPartialStore: boolean) {
        this.allowPartialStore = allowPartialStore;
    }
}
