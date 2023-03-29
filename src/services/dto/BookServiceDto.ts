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
import OperatorDomain from '../../domains/OperatorDomain';
import { DateStartEndObject, CodeVersionObject, CodeObject, Condition } from '../../resources/dto/PostGetBookReqDto';
/* eslint-enable */

export default class BookServiceDto {
    /**
     * オペレータ情報
     */
    private operator: OperatorDomain = null;

    /**
     * BookId
     */
    private bookId: number;

    /**
     * PXR ID
     */
    private pxrId: string = null;

    /**
     * タイプ
     */
    private type: string = null;

    /**
     * 識別子
     */
    private identifier: string[] = null;

    /**
     * 更新日時オブジェクト
     */
    private updatedAt: DateStartEndObject = null;

    /**
     * 検索条件リスト
     */
    private condition: Condition[] = null;

    /**
     * 付録
     */
    private appendix: object = null;

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
    public getOperator (): OperatorDomain {
        return this.operator;
    }

    /**
     * オペレータ情報設定
     * @param operator
     */
    public setOperator (operator: OperatorDomain) {
        this.operator = operator;
    }

    /**
     * BookID取得
     */
    public getBookId (): number {
        return this.bookId;
    }

    /**
     * BookID設定
     * @param bookId
     */
    public setBookId (bookId: number) {
        this.bookId = bookId;
    }

    /**
     * PXR ID取得
     */
    public getPxrId (): string {
        return this.pxrId;
    }

    /**
     * PXR ID設定
     * @param pxrId
     */
    public setPxrId (pxrId: string) {
        this.pxrId = pxrId;
    }

    /**
     * タイプ取得
     */
    public getType (): string {
        return this.type;
    }

    /**
     * タイプ設定
     * @param type
     */
    public setType (type: string) {
        this.type = type;
    }

    /**
     * 識別子取得
     */
    public getIdentifier (): string[] {
        return this.identifier;
    }

    /**
     * 識別子設定
     * @param identifier
     */
    public setIdentifier (identifier: string[]) {
        this.identifier = identifier;
    }

    /**
     * 更新日時オブジェクト取得
     */
    public getUpdatedAt (): DateStartEndObject {
        return this.updatedAt;
    }

    /**
     * 更新日時オブジェクト設定
     * @param updatedAt
     */
    public setUpdatedAt (updatedAt: DateStartEndObject) {
        this.updatedAt = updatedAt;
    }

    /**
     * 検索条件リスト取得
     */
    public getCondition (): Condition[] {
        return this.condition;
    }

    /**
     * 検索条件リスト設定
     * @param condition
     */
    public setCondition (condition: Condition[]) {
        this.condition = condition;
    }

    /**
     * オペレータ情報取得
     */
    public getAppendix (): object {
        return this.appendix;
    }

    /**
     * オペレータ情報設定
     * @param appendix
     */
    public setAppendix (appendix: object) {
        this.appendix = appendix;
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
