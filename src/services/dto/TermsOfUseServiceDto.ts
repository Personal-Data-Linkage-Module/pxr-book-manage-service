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
import Operator from 'resources/dto/OperatorReqDto';
import OperatorDomain from '../../domains/OperatorDomain';
/* eslint-enable */

export default class BookOpenServiceDto {
    /**
     * operator
     */
    private operator: Operator;

    /**
     * operator domain
     */
    private operatorDomain: OperatorDomain;

    /**
     * リクエスト
     */
    private request: any = null;

    /**
     * 規約タイプ（platform：1, region：2）
     */
    private termsType: number = 0;

    /**
     * 利用規約カタログコード
     */
    private catalogCode: number = 0;

    /**
     * 利用規約カタログバージョン
     */
    private catalogVersion: number = 0;

    /**
     * PXR-ID
     */
    private pxrId: string = null;

    /**
     * offset
     */
    private offset: number = 0;

    /**
     * limit
     */
    private limit: number = 10;

    /**
     * カタログサービスURL
     */
    private catalogUrl: string = null;

    /**
     * message
     */
    private message: any = null;

    /**
     * operator取得
     */
    public getOperator () {
        return this.operator;
    }

    /**
     * operator domain取得
     */
    public getOperatorDomain () {
        return this.operatorDomain;
    }

    /**
     * リクエスト取得
     */
    public getRequest () {
        return this.request;
    }

    /**
     * 規約タイプ取得
     */
    public getTermsType () {
        return this.termsType;
    }

    /**
     * 利用規約カタログコード取得
     */
    public getCatalogCode () {
        return this.catalogCode;
    }

    /**
     * 利用規約カタログバージョン取得
     */
    public getCatalogVersion () {
        return this.catalogVersion;
    }

    /**
     * PXR-ID取得
     */
    public getPxrId (): string {
        return this.pxrId;
    }

    /**
     * offset取得
     */
    public getOffset () {
        return this.offset;
    }

    /**
     * limit取得
     */
    public getLimit () {
        return this.limit;
    }

    /**
     * カタログサービスURL取得
     */
    public getCatalogUrl () {
        return this.catalogUrl;
    }

    /**
     * message取得
     */
    public getMessage () {
        return this.message;
    }

    /**
     * operator設定
     * @param operator
     */
    public setOperator (operator: Operator) {
        this.operator = operator;
    }

    /**
     * operator domain設定
     * @param operatorDomain
     */
    public setOperatorDomain (operatorDomain: OperatorDomain) {
        this.operatorDomain = operatorDomain;
    }

    /**
     * リクエスト設定
     * @param request
     */
    public setRequest (request: any) {
        this.request = request;
    }

    /**
     * 規約タイプ設定
     * @param termsType
     */
    public setTermsType (termsType: any) {
        this.termsType = termsType;
    }

    /**
     * 利用規約カタログコード設定
     * @param catalogCode
     */
    public setCatalogCode (catalogCode: any) {
        this.catalogCode = catalogCode;
    }

    /**
     * 利用規約カタログバージョン設定
     * @param catalogVersion
     */
    public setCatalogVersion (catalogVersion: any) {
        this.catalogVersion = catalogVersion;
    }

    /**
     * PXR-ID設定
     * @param pxrId
     */
    public setPxrId (pxrId: string) {
        this.pxrId = pxrId;
    }

    /**
     * offset設定
     * @param offset
     */
    public setOffset (offset: number) {
        this.offset = offset;
    }

    /**
     * limit設定
     * @param limit
     */
    public setLimit (limit: number) {
        this.limit = limit;
    }

    /**
     * カタログサービスURL設定
     */
    public setCatalogUrl (catalogUrl: string) {
        this.catalogUrl = catalogUrl;
    }

    /**
     * message設定
     */
    public setMessage (message: any) {
        this.message = message;
    }
}
