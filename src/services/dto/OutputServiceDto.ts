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
import OperatorDomain from '../../domains/OperatorDomain';
/* eslint-enable */

export class CodeObject {
    /**
     * _value
     */
    _value: number;

    /**
     * _ver
     */
    _ver: number;
}

/**
 * データ出力サービス用DTO
 */
export default class OutputServiceDto {
    /**
     * オペレータ情報
     */
    private operator: Operator = null;

    /**
     * オペレータ情報
     */
    private operatorDomain: OperatorDomain = null;

    /**
     * PXR-ID
     */
    private pxrId: string = null;

    /**
     * My-Condition-Data出力コード
     */
    private myConditionDateOutCode: string = null;

    /**
     * 出力データ収集アクター
     */
    private outputActorId: number = 0;

    /**
     * リクエスト
     */
    private requestBody: {} = null;

    /**
     * offset
     */
    private offset: number = null;

    /**
     * limit
     */
    private limit: number = null;

    /**
     * isServiceCanceled
     */
    private isServiceCanceled: boolean = null;

    /**
     * 承認ステータス
     */
    private approved: number = null;

    /**
     * 更新対象ID
     */
    private id: number = null;

    mcdOutputCodeId: number = null;

    /**
     * オペレータ情報取得
     */
    public getOperatorDomain (): OperatorDomain {
        return this.operatorDomain;
    }

    /**
     * オペレータ情報設定
     * @param operator
     */
    public setOperatorDomain (operatorDomain: OperatorDomain) {
        this.operatorDomain = operatorDomain;
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
     * My-Condition-Data出力コード取得
     */
    public getMyConditionDateOutCode (): string {
        return this.myConditionDateOutCode;
    }

    /**
     * My-Condition-Data出力コード設定
     * @param myConditionDateOutCode
     */
    public setMyConditionDateOutCode (myConditionDateOutCode: string) {
        this.myConditionDateOutCode = myConditionDateOutCode;
    }

    /**
     * 出力データ収集アクター.id取得
     */
    public getOutputActorIdCode (): number {
        return this.outputActorId;
    }

    /**
     * 出力データ収集アクター.id設定
     * @param outputActorId
     */
    public setOutputActorIdCode (outputActorId: number) {
        this.outputActorId = outputActorId;
    }

    /**
     * リクエスト取得
     */
    public getRequestBody (): any {
        return this.requestBody;
    }

    /**
     * リクエスト設定
     */
    public setRequest (requestBody: any) {
        this.requestBody = requestBody;
    }

    /**
     * offset取得
     */
    public getOffset (): number {
        return this.offset;
    }

    /**
     * offset設定
     */
    public setOffset (offset: number) {
        this.offset = offset;
    }

    /**
     * limit取得
     */
    public getLimit (): number {
        return this.limit;
    }

    /**
     * limit設定
     */
    public setLimit (limit: number) {
        this.limit = limit;
    }

    /**
     * isServiceCanceled取得
     */
    public getIsServiceCanceled (): boolean {
        return this.isServiceCanceled;
    }

    /**
     * isServiceCanceled設定
     */
    public setIsServiceCanceled (isServiceCanceled: boolean) {
        this.isServiceCanceled = isServiceCanceled;
    }

    /**
     * 承認ステータス取得
     */
    public getApproved (): number {
        return this.approved;
    }

    /**
     * 承認ステータス設定
     */
    public setApproved (approved: number) {
        this.approved = approved;
    }

    /**
     * 更新対象ID取得
     */
    public getId (): number {
        return this.id;
    }

    /**
     * 更新対象ID設定
     */
    public setId (id: number) {
        this.id = id;
    }
}
