/* eslint-disable */
import { CodeObject } from '../resources/dto/PostBookOpenReqDto';

/**
 * データ操作要求の種別定義
 * - STORE：蓄積の実行要求
 * - SHARE_CONTINUOUS：継続的共有の実行要求
 * - STORE_EVENT：蓄積イベント通知の実行要求
 */
export type DATA_OPERATION_TYPE = 'STORE' | 'SHARE_CONTINUOUS' | 'STORE_EVENT';

/**
 * 蓄積元、共有先アクター・アセットコード
 * ※必ず両方の値が設定されていること
 */
export interface IDataOperationAsset {
    /**
     * アセットを保有するアクターのカタログ項目コード
     */
    actor: number;
    /**
     * アセットのカタログ項目コード
     */
    asset: number;
}

/**
 * データ操作実行要求データ種
 */
export interface IDataOperationRequestDataType {
    /**
     * データ種別
     */
    type: 'document' | 'event' | 'thing' | null;
    /**
     * 操作対象データのカタログ項目コード
     */
    code: CodeObject | null;
}

/**
 * データ操作実行要求
 */
export interface IDataOperationRequest {
    /**
     * 操作対象PXR-ID
     */
    pxrId: string | null;
    /**
     * 要求種別
     */
    operationType: DATA_OPERATION_TYPE | null;
    /**
     * 蓄積アセット（アプリケーションまたはワークフロー）
     */
    storedBy: IDataOperationAsset | null;
    /**
     * 共有アセット（アプリケーションまたはワークフロー）
     */
    shareTo: IDataOperationAsset | null;
    /**
     * 操作対象データのカタログ項目コード
     */
    dataType: IDataOperationRequestDataType | null;
}
