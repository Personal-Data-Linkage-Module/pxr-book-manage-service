/* eslint-disable */
import { CodeObject } from '../resources/dto/PostBookOpenReqDto';
import { DATA_OPERATION_TYPE, IDataOperationAsset, IDataOperationRequestDataType } from './DataOperationRequest';
import { CONSENT_TYPE } from './PermissionAnalyzer';

/**
 * 通知種別の定義
 * - store-event: 蓄積イベント通知
 * - share-trigger: 共有トリガー
 */
export type NOTIFICATION_TYPE = 'store-event' | 'share-trigger';

/**
 * データ操作実行許可レスポンス
 */
export interface IAllDataOperationRequestResponse {
    /**
     * 操作種別
     */
    operationType: DATA_OPERATION_TYPE | null;
    /**
     * 通知種別
     */
    notificationType: NOTIFICATION_TYPE | null;
    /**
     * 対象ドキュメント
     */
    document: CodeObject | null;
    /**
     * 対象イベント
     */
    event: CodeObject | null;
    /**
     * 対象モノ
     */
    thing: CodeObject | null;
    /**
     * 蓄積アセット（アプリケーションまたはワークフロー）
     */
    storedBy: IDataOperationAsset | null;
    /**
     * 共有アセット（アプリケーションまたはワークフロー）
     */
    shareTo: IDataOperationAsset | null;
    /**
     * 蓄積イベント通知定義カタログコードオブジェクト
     */
    storeEventNotificationCode: CodeObject | null;
}

/**
 * 共有可能データ種
 */
export interface IShareResponseDataType {
    /**
     * 対象ドキュメント
     */
    document: CodeObject[] | null;
    /**
     * 対象イベント
     */
    event: CodeObject[] | null;
    /**
     * 対象モノ
     */
    thing: CodeObject[] | null;
}

/**
 * 可否判定レスポンス
 * isPermitted() の返却値
 */
export interface IPermissionResponse {
    /**
     * 判定結果
     */
    checkResult: boolean;
    /**
     * 蓄積アクター情報
     * 空配列の場合はデータを持つ全アクターから共有可能
     */
    sourceActor: number[] | null;
    /**
     * 禁止アクター情報
     * 共有制限定義で共有を禁止している蓄積アクター
     */
    prohibitedSourceActor: number[] | null;
}

/**
 * 個人同意の判定結果
 * isStorePermitted(), isSharePermitted() の返却値
 */
export interface IConsentPermissionResponse {
    /**
     * 判定結果
     */
    checkResult: CONSENT_TYPE;
    /**
     * 個人同意のあったデータ操作定義コード
     */
    targetOperationCatalogCodes: number[];
} 

/**
 * データ操作定義カタログの判定結果
 * isStorePermitted(), isSharePermitted() の返却値
 */
export interface IOperationPermissionResponse {
    /**
     * 判定結果
     */
    checkResult: boolean;
    /**
     *  可判定のデータ操作定義コード
     */
    operationCatalogCodes: number[];
}
