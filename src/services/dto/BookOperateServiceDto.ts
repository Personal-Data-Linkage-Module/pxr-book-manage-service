/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import OperatorDomain from '../../domains/OperatorDomain';
import { DateStartEndObject, CodeVersionObject, CodeObject } from '../../resources/dto/PostGetBookReqDto';
import Config from '../../common/Config';
/* eslint-enable */
import moment = require('moment-timezone');
const configure = Config.ReadConfig('./config/config.json');

/**
 * BOOKデータ
 */
export default class BookOperateServiceDto {
    /**
     * オペレータ情報
     */
    private operator: OperatorDomain = null;

    /**
     * ユーザID
     */
    private userId: string = null;

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
     * コードオブジェクト
     */
    private _code: CodeVersionObject[] = null;

    /**
     * ワークフローオブジェクト
     */
    private wf: CodeObject = null;

    /**
     * アプリケーションオブジェクト
     */
    private app: CodeObject = null;

    /**
     * データ構造取得(JSON用連想配列)
     */
    public getAsJson (): {} {
        const codeList: {}[] = [];
        if (this._code) {
            for (let index = 0; index < this._code.length; index++) {
                codeList.push({
                    _value: this._code[index]._value ? this._code[index]._value : null,
                    _ver: this._code[index]._ver ? this._code[index]._ver : null
                });
            }
        }
        return {
            userId: this.userId,
            type: this.type,
            identifier: this.identifier && this.identifier.length > 0 ? this.identifier : null,
            updatedAt: this.updatedAt ? {
                start: this.updatedAt.start ? moment(this.updatedAt.start).tz(configure['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ') : null,
                end: this.updatedAt.end ? moment(this.updatedAt.end).tz(configure['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ') : null
            } : null,
            _code: codeList.length > 0 ? codeList : null,
            app: this.app ? {
                _value: this.app._value
            } : null,
            wf: this.wf ? {
                _value: this.wf._value
            } : null
        };
    }

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
     * ユーザID取得
     */
    public getUserId (): string {
        return this.userId;
    }

    /**
     * ユーザID設定
     * @param userId
     */
    public setUserId (userId: string) {
        this.userId = userId;
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
     * コードオブジェクト取得
     */
    public getCode (): CodeVersionObject[] {
        return this._code;
    }

    /**
     * コードオブジェクト設定
     * @param _code
     */
    public setCode (_code: CodeVersionObject[]) {
        this._code = _code;
    }

    /**
     * ワークフローオブジェクト取得
     */
    public getWf (): CodeObject {
        return this.wf;
    }

    /**
     * ワークフローオブジェクト設定
     * @param wf
     */
    public setWf (wf: CodeObject) {
        this.wf = wf;
    }

    /**
     * アプリケーションオブジェクト取得
     */
    public getApp (): CodeObject {
        return this.app;
    }

    /**
     * アプリケーションオブジェクト設定
     * @param app
     */
    public setApp (app: CodeObject) {
        this.app = app;
    }
}
