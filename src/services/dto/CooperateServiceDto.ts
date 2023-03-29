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

// SDE-IMPL-REQUIRED 本ファイルをコピーしてサービスレイヤーのDTOを実装します。
/* eslint-disable */
import Operator from '../../resources/dto/OperatorReqDto';
/* eslint-enable */

export default class CooperateServiceDto {
    /**
     * url
     */
    private url: string = null;

    /**
     * identifyCode
     */
    private identifyCode: string = null;

    /**
     * pxrId
     */
    private pxrId: string = null;

    /**
     * actorCode
     */
    private actorCode: number = null;

    /**
     * actorVersion
     */
    private actorVersion: number = null;

    /**
     * regionCode
     */
    private regionCode: number = null;

    /**
     * regionVersion
     */
    private regionVersion: number = null;

    /**
     * appCode
     */
    private appCode: number = null;

    /**
     * appVersion
     */
    private appVersion: number = null;

    /**
     * wfCode
     */
    private wfCode: number = null;

    /**
     * wfVersion
     */
    private wfVersion: number = null;

    /**
     * userId
     */
    private userId: string = null;

    /**
     * register
     */
    private register: string = null;

    /**
     * オペレータ情報
     */
    private operator: Operator = null;

    /**
     * configure
     */
    private configure: any = null;

    /**
     * message
     */
    private message: any = null;

    /**
     * IdentifyCode取得
     */
    public getIdentifyCode (): string {
        return this.identifyCode;
    }

    /**
     * IdentifyCode設定
     * @param identifyCode
     */
    public setIdentifyCode (identifyCode: string) {
        this.identifyCode = identifyCode;
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
     * actorCode
     */
    public getActorCode (): number {
        return this.actorCode;
    }

    /**
     * actorCode
     * @param actorCode
     */
    public setActorCode (actorCode: number) {
        this.actorCode = actorCode;
    }

    /**
     * actorVersion
     */
    public getActorVersion (): number {
        return this.actorVersion;
    }

    /**
     * actorVersion
     * @param actorVersion
     */
    public setActorVersion (actorVersion: number) {
        this.actorVersion = actorVersion;
    }

    /**
     * regionCode
     */
    public getRegionCode (): number {
        return this.regionCode;
    }

    /**
     * regionCode
     * @param regionCode
     */
    public setRegionCode (regionCode: number) {
        this.regionCode = regionCode;
    }

    /**
     * regionVersion
     */
    public getRegionVersion (): number {
        return this.regionVersion;
    }

    /**
     * regionVersion
     * @param regionVersion
     */
    public setRegionVersion (regionVersion: number) {
        this.regionVersion = regionVersion;
    }

    /**
     * appCode
     */
    public getAppCode (): number {
        return this.appCode;
    }

    /**
     * appCode
     * @param appCode
     */
    public setAppCode (appCode: number) {
        this.appCode = appCode;
    }

    /**
     * appVersion
     */
    public getAppVersion (): number {
        return this.appVersion;
    }

    /**
     * appVersion
     * @param appVersion
     */
    public setAppVersion (appVersion: number) {
        this.appVersion = appVersion;
    }

    /**
     * wfCode
     */
    public getWfCode (): number {
        return this.wfCode;
    }

    /**
     * wfCode
     * @param wfCode
     */
    public setWfCode (wfCode: number) {
        this.wfCode = wfCode;
    }

    /**
     * wfVersion
     */
    public getWfVersion (): number {
        return this.wfVersion;
    }

    /**
     * wfVersion
     * @param wfVersion
     */
    public setWfVersion (wfVersion: number) {
        this.wfVersion = wfVersion;
    }

    /**
     * userId
     */
    public getUserId (): string {
        return this.userId;
    }

    /**
     * userId
     * @param userId
     */
    public setUserId (userId: string) {
        this.userId = userId;
    }

    /**
     * pxrId
     */
    public getPxrId (): string {
        return this.pxrId;
    }

    /**
     * pxrId
     * @param pxrId
     */
    public setPxrId (pxrId: string) {
        this.pxrId = pxrId;
    }
}
