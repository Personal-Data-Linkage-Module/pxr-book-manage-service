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
import { Identification } from '../../resources/dto/PostBookOpenReqDto';
import Operator from '../../resources/dto/OperatorReqDto';
/* eslint-enable */

export default class BookOpenServiceDto {
    /**
     * PXR-ID
     */
    private pxrId: string = null;

    /**
     * ログインID
     */
    private loginId: string = null;

    /**
     * ユーザID
     */
    private userId: string = null;

    /**
     * IDサービスアカウント発行済フラグ
     */
    private idServiceFlg: boolean = false;

    /**
     * 属性
     */
    private attributes: object = null;

    /**
     * 付録
     */
    private appendix: object = null;

    /**
     * 本人性確認事項
     */
    private identification: any[] = null;

    /**
     * userInformation
     */
    private userInformation: Identification = null;

    /**
     * プラットフォーム利用規約
     */
    private platformTermsOfUse: any = null;

    /**
     * 登録者（ログインID）
     */
    private register: string = null;

    /**
     * セッションID
     */
    private sessionId: string = null;

    /**
     * オペレータ情報
     */
    private operator: Operator = null;

    /**
     * カタログサービスURL
     */
    private catalogUrl: string = null;

    /**
     * オペレータサービスURL
     */
    private operatorUrl: string = null;

    /**
     * 本人性確認サービスURL
     */
    private identityUrl: string = null;

    /**
     * 初回パスワード有効期限
     */
    private initialPasswordExpire: number = null;

    /**
     * 拡張名称
     */
    private extName: string = null;

    /**
     * message
     */
    private message: any = null;

    /**
     * configure
     */
    private configure: any = null;

    /**
     * 物理削除フラグ
     */
    private physicalDelete: boolean = false;

    /**
     * PXR-ID取得
     */
    public getPxrId (): string {
        return this.pxrId;
    }

    /**
     * ログインID取得
     */
    public getLoginId (): string {
        return this.loginId;
    }

    /**
     * ユーザID取得
     */
    public getUserId (): string {
        return this.userId;
    }

    /**
     * IDサービスアカウント発行済フラグ取得
     */
    public getIdServiceFlg (): boolean {
        return this.idServiceFlg;
    }

    /**
     * 属性取得
     */
    public getAttributes (): object {
        return this.attributes;
    }

    /**
     * 付録取得
     */
    public getAppendix (): object {
        return this.appendix;
    }

    /**
     * 本人性確認事項取得
     */
    public getIdentification (): any[] {
        return this.identification;
    }

    /**
     * userInformation取得
     */
    public getUserInformation () {
        return this.userInformation;
    }

    /**
     * プラットフォーム利用規約取得
     */
    public getPlatformTermsOfUse () {
        return this.platformTermsOfUse;
    }

    /**
     * 登録者取得
     */
    public getRegister (): string {
        return this.register;
    }

    /**
     * 物理削除フラグ取得
     */
    public getPhysicalDelete (): boolean {
        return this.physicalDelete;
    }

    /**
     * セッションID取得
     */
    public getSessionId (): string {
        return this.sessionId;
    }

    /**
     * PXR-ID設定
     * @param pxrId
     */
    public setPxrId (pxrId: string) {
        this.pxrId = pxrId;
    }

    /**
     * ログインID設定
     * @param pxrId
     */
    public setLoginId (loginId: string) {
        this.loginId = loginId;
    }

    /**
     * ユーザID設定
     * @param userId
     */
    public setUserId (userId: string) {
        this.userId = userId;
    }

    /**
     * IDサービスアカウント発行済フラグ
     * @param idServiceFlg
     */
    public setIdServiceFlg (idServiceFlg: boolean) {
        this.idServiceFlg = idServiceFlg;
    }

    /**
     * 属性設定
     * @param attributes
     */
    public setAttributes (attributes: object) {
        this.attributes = attributes;
    }

    /**
     * 付録設定
     * @param appendix
     */
    public setAppendix (appendix: object) {
        this.appendix = appendix;
    }

    /**
     * 本人性確認事項設定
     * @param identification
     */
    public setIdentification (identification: any[]) {
        this.identification = identification;
    }

    /**
     * userInformation設定
     * @param userInformation
     */
    public setUserInformation (userInformation: Identification) {
        this.userInformation = userInformation;
    }

    /**
     * プラットフォーム利用規約設定
     */
    public setPlatformTermsOfUse (platformTermsOfUse: any) {
        this.platformTermsOfUse = platformTermsOfUse;
    }

    /**
     * 登録者設定
     * @param register
     */
    public setRegister (register: string) {
        this.register = register;
    }

    /**
     * セッションID設定
     * @param sessionId
     */
    public setSessionId (sessionId: string) {
        this.sessionId = sessionId;
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
     * カタログサービスURL取得
     */
    public getCatalogUrl (): string {
        return this.catalogUrl;
    }

    /**
     * カタログサービスURL設定
     * @param catalogUrl
     */
    public setCatalogUrl (catalogUrl: string) {
        this.catalogUrl = catalogUrl;
    }

    /**
     * オペレータサービスURL取得
     */
    public getOperatorUrl (): string {
        return this.operatorUrl;
    }

    /**
     * オペレータサービスURL設定
     * @param operatorUrl
     */
    public setOperatorUrl (operatorUrl: string) {
        this.operatorUrl = operatorUrl;
    }

    /**
     * 本人性確認サービスURL取得
     */
    public getIdentityUrl (): string {
        return this.identityUrl;
    }

    /**
     * 本人性確認サービスURL設定
     * @param identityUrl
     */
    public setIdentityUrl (identityUrl: string) {
        this.identityUrl = identityUrl;
    }

    /**
     * 初回パスワード有効期限取得
     */
    public getInitialPasswordExpire (): number {
        return this.initialPasswordExpire;
    }

    /**
     * 初回パスワード有効期限設定
     * @param initialPasswordExpire
     */
    public setInitialPasswordExpire (initialPasswordExpire: number) {
        this.initialPasswordExpire = initialPasswordExpire;
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
     * 拡張名称取得
     */
    public getExtName (): string {
        return this.extName;
    }

    /**
     * 拡張名称設定
     * @param extName
     */
    public setExtName (extName: string) {
        this.extName = extName;
    }

    /**
     * 物理削除フラグ設定
     */
    public setPhysicalDelete (physicalDelete: boolean) {
        this.physicalDelete = physicalDelete;
    }
}
