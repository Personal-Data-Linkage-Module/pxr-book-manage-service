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
export default class DataShareServiceDto {
    /**
     * オペレータ情報
     */
    operator: Operator = null;

    /**
     * userId
     */
    userId: string = null;

    /**
     * message
     */
    request: any = null;

    /**
     * storeId
     */
    shareId: number = null;

    /**
     * PXR-ID
     */
    pxrId: string = null;

    /**
     * アプリケーションカタログコード
     */
    appCode: number = null;

    /**
     * ワークフローカタログコード
     */
    wfCode: number = null;

    /**
     * アクターコード
     */
    actorCode: number = null;

    /**
     * 共有元アクターコード
     */
    sourceActorCode: number = null;

    /**
     * 共有元アセット（wf/app）コード
     */
    sourceAssetCode: number = null;

    /**
     * 共有トリガーによる共有可否判定フラグ
     */
    isTriggerRequest: boolean = null;

    /**
     * 判定対象ドキュメント
     */
    document: CodeObject[] = [];

    /**
     * 判定対象イベント
     */
    event: CodeObject[] = [];

    /**
     * 判定対象モノ
     */
    thing: CodeObject[] = [];
}
