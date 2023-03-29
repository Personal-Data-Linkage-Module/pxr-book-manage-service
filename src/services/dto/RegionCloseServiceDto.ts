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
export default class RegionCloseServiceDto {
    /**
     * オペレータ情報
     */
    private operator: Operator = null;

    /**
     * オペレータ情報
     */
    private operatorDomain: OperatorDomain = null;

    /**
     * アクターカタログコード
     */
    private actorCode: CodeObject = null;

    /**
     * リージョンカタログコード
     */
    private regionCode: CodeObject = null;

    /**
     * 終了日時
     */
    private closeDate: Date = null;

    /**
     * offset
     */
    private offset: number;

    /**
     * limit
     */
    private limit: number;

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
     * アクターカタログコード取得
     */
    public getActorCode (): CodeObject {
        return this.actorCode;
    }

    /**
     * アクターカタログコード設定
     * @param actorCode
     */
    public setActorCode (actorCode: CodeObject) {
        this.actorCode = actorCode;
    }

    /**
     * リージョンカタログコード取得
     */
    public getRegionCode (): CodeObject {
        return this.regionCode;
    }

    /**
     * リージョンカタログコード設定
     * @param regionCode
     */
    public setRegionCode (regionCode: CodeObject) {
        this.regionCode = regionCode;
    }

    /**
     * 終了日時取得
     */
    public getCloseDate (): Date {
        return this.closeDate;
    }

    /**
     * 終了日時設定
     * @param closeDate
     */
    public setCloseDate (closeDate: Date) {
        this.closeDate = closeDate;
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
    public setOffset (offset: number): void {
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
    public setLimit (limit: number): void {
        this.limit = limit;
    }
}
