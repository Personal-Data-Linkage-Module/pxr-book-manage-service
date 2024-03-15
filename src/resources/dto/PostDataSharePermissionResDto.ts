/**
 * THIS PROGRAM IS GENERATED UNDER LICENSE FROM NEC CORPORATION.
 *
 * THE OWNERSHIP OF PROGRAM WRITTEN IN OWN-CODING REGION
 * IS HOLDED BY WRITER.
 *
 *
 * $Date$
 * $Revision$
 * $Author$
 *
 * TEMPLATE VERSION :  76463
 */

/* eslint-disable */
import { IsDataURI, IsDefined, IsNumber } from 'class-validator';
import { CodeObject } from './PostBookOpenReqDto';

/**
 * 共有元アクターごとの共有可データ種
 */
export class Permission {
    /**
     * 共有元アクターコード
     */
    sourceActorCode: number;

    /**
     * 共有可document
     */
    document: CodeObject[];

    /**
     * 共有可event
     */
    event: CodeObject[];

    /**
     * 共有可thing
     */
    thing: CodeObject[];
}

/**
 * データ共有可否判定レスポンスモデル
 */
export default class PostDataSharePermissionResDto {
    /**
     * checkResult
     */
    checkResult: boolean = null;

    /**
     * permission
     */
    permission: Permission[] = null;

    /**
     * 判定結果設定
     * @param checkResult
     */
    public setCheckResult (checkResult: boolean) {
        this.checkResult = checkResult;
    }

    /**
     * データ種カタログコード配列設定
     * @param Permission
     */
    public setPermission (permission: Permission[]) {
        this.permission = permission;
    }

    /**
     * データ構造取得(JSON用連想配列)
     */
    public getAsJson (): {} {
        const obj: {} = {
            checkResult: this.checkResult,
            datatype: this.permission
        };
        return obj;
    }
}
