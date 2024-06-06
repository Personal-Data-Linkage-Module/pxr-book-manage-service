/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { applicationLogger } from './logging';
import { Service } from 'typedi';
import Config from './Config';
import AppError from './AppError';
import { ResponseCode } from './ResponseCode';
import { CodeObject } from '../resources/dto/PostBookOpenReqDto';
import { Catalog, IActorCatalog, IAssetCatalog, IDataShareCatalog, IDataStoreCatalog as IDataStoreCatalog, IOperationTarget, IRestrictionDatatype as IRestrictionDataType, ISharingDatatype, ISharingRestrictionCatalog, IStoringDatatype } from '../domains/catalog/Catalogs';
import { IDataOperationRequest, DATA_OPERATION_TYPE, IDataOperationRequestDataType, IDataOperationAsset } from './DataOperationRequest';
import { IAllDataOperationRequestResponse, IPermissionResponse, IOperationPermissionResponse, NOTIFICATION_TYPE, IConsentPermissionResponse } from './DataOperationResponse';
import Operator from '../resources/dto/OperatorReqDto';
import { OperatorType } from './Operator';
/* eslint-enable */

const message = Config.ReadConfig('./config/message.json');

/**
 * 同意種別定義
 * - STORE：蓄積同意
 * - SHARE_CONTINUOUS：継続的共有同意
 */
export type AGREEMENT_TYPE = 'STORE' | 'SHARE_CONTINUOUS';

/**
 * 個人同意の判定結果
 * - PERMIT: 明確に許可
 * - PROHIBIT: 明確に禁止
 * - POSSIBILITY: 同意不要の定義で暗黙的に許可される可能性がある
 */
export type CONSENT_TYPE = 'PERMIT' | 'PROHIBIT' | 'POSSIBILITY'

/**
 * データ種に対する同意
 */
export interface IAgreementForDataType {
    /**
     * データ操作定義UUID
     */
    uuid: string | null;
    /**
     * データ種別
     */
    type: 'document' | 'event' | 'thing' | null;
    /**
     * 同意対象データのカタログ項目コード
     */
    code: CodeObject | null;
    /**
     * 同意の有無
     */
    consentFlag: boolean | null;
}

/**
 * アセットに対する同意（蓄積同意、継続的共有同意）
 */
export interface IAgreementForAssetDetail {
    /**
     * 同意対象カタログ定義（蓄積定義または共有定義）のカタログ項目コード
     */
    target: CodeObject | null;
    /**
     * 同意対象のdata_operationレコードID
     */
    id: number | null;
    /**
     * データ種単位の同意状態
     */
    dataType: IAgreementForDataType[] | null;
}

/**
 * 共有元指定データ種
 */
export interface shareSourceDataType {
    /**
     * データ種コード・バージョン
     */
    code: CodeObject | null;
    /**
     * 共有元アクター配列
     */
    shareSourceSource: CodeObject[] | null;
}

/**
 * 蓄積イベント通知定義
 */
export interface IStoreEventNotificate {
    /**
     * 送信種別
     */
    type: NOTIFICATION_TYPE | null;
    /**
     * 蓄積イベント通知定義カタログコード・バージョン
     */
    notificationCatalogCode: CodeObject | null;
    /**
     * 共有定義UUID
     */
    uuid: string | null;
    /**
     * 共有元指定データ種配列
     */
    shareSourceDatatype: shareSourceDataType[];

}

/**
 * 共有定義オブジェクト（蓄積イベント通知を内包する）
 */
export interface IDataShareObject {
    /**
     * 共有定義カタログ
     */
    shareCatalog: IDataShareCatalog | null;
    /**
     * 蓄積イベント通知
     * キー：蓄積イベント通知定義カタログコード
     * 値：蓄積イベント通知テーブル情報マップ（キー：UUID）
     */
    storeEventNotificate: Map<number, Map<string, IStoreEventNotificate>> | null;
}

/**
 * アセット定義（カタログはコード指定により疎結合されているので、処理を容易にするためにオブジェクトツリーに変更する）
 */
export interface IAsset {
    /**
     * アクターカタログ
     */
    actor: IActorCatalog | null;
    /**
     * アセットカタログ
     */
    asset: IAssetCatalog | null;
    /**
     * 蓄積定義マップ
     * - キー：蓄積定義のカタログ項目コード値
     * - 値：蓄積定義リスト（バージョンの昇順でソート）
     */
    store: Map<number, IDataStoreCatalog[]> | null;
    /**
     * 共有定義マップ
     * - キー：共有定義のカタログ項目コード値
     * - 値：共有定義リスト（バージョンの昇順でソート）
     */
    share: Map<number, IDataShareObject[]> | null;
    /**
     * 有効な蓄積定義マップ（specifyTargetメソッドの呼び出しにより生成）
     * - キー：蓄積定義のカタログ項目コード値
     * - 値：有効な蓄積定義
     */
    validStore: Map<number, IDataStoreCatalog> | null;
    /**
     * 有効な共有定義マップ（specifyTargetメソッドの呼び出しにより生成）
     * - キー：共有定義のカタログ項目コード値
     * - 値：有効な共有定義
     * - ※可否判定に使用する共有定義。operationTypeに応じて判定条件が変化する
     */
    validShare: Map<number, IDataShareObject> | null;
    /**
     * 共有先制限カタログリスト
     */
    shareRestriction: ISharingRestrictionCatalog[] | null;
}

/**
 * アセットに対する個人同意
 */
export interface IAgreementForAsset {
    /**
     * PxR-ID
     */
    pxrId: string | null;
    /**
     * 同意対象のアクター
     */
    actor: CodeObject | null;
    /**
     * 同意対象のアセット
     */
    asset: CodeObject | null;
    /**
     * 蓄積同意のリスト
     */
    store: IAgreementForAssetDetail[] | null;
    /**
     * 共有同意のリスト
     */
    share: IAgreementForAssetDetail[] | null;
}

/**
 * 蓄積/共有可否判定サービス
 */
@Service()
export default class PermissionAnalyzer {
    /** データ操作種別 */
    private _operationType: DATA_OPERATION_TYPE | null = null;

    /** 対象のPxR-ID（setAgreementの引数を保存） */
    private _pxrId: string | null = null;

    /** 対象のデータ操作リクエスト種別（setAgreementの引数を保存） */
    private _typeFilter: AGREEMENT_TYPE | null = null;

    /**
     * 対象のアセットリスト（getAgreementの引数を保存）
     * - アクターカタログコード, アセットカタログコードで構成されるオブジェクト配列
    */
    private _assetFilter: IDataOperationAsset[] | null = null;

    /**
     * 取得した同意データの管理
     * - キー：アセットカタログコード値
     * - 値：アセット単位の同意データ
     * */
    private _agreement: Map<number, IAgreementForAsset> | null = null;

    /**
     * 取得したカタログデータの管理
     * - キー：アセットカタログコード値
     * - 値：アセットカタログ
     * */
    private _asset: Map<number, IAsset> | null = null;

    /**
     * アクティブな同意対象特定の完了フラグ
     */
    private _isSpecified: boolean | null = null;

    /**
     * コンストラクタ
     * ※createメソッドでオブジェクトを生成させるためにprivate化
     */
    private constructor (
        private _operator: Operator,
        private _agreementAccessor: (
            pxrId: string,
            type: AGREEMENT_TYPE | null,
            assets: IDataOperationAsset[] | null
        ) => Promise<IAgreementForAsset[]> | null,
        private _catalogAccessor: (
            operator: Operator,
            code: number,
            history: boolean | null,
            minVersion: number | null,
            maxVersion: number | null
        ) => Promise<Catalog[]> | null,
        private _shareRestrictionAccessor?: (
            operator: Operator,
            actorCode: number
        ) => Promise<ISharingRestrictionCatalog[]> | null,
        private _storeEventNotificationAccessor?: (
            shareCatalogCode: number,
            shareCatalogVersion: number
        ) => Promise<Map<number, Map<string, IStoreEventNotificate>>> | null
    ) { }

    /**
     * PermissionAnalyzerオブジェクトを生成します
     * @param _operator セッションのオペレータ情報
     * @param _agreementAccessor 同意取得関数
     * - pxrId：取得対象のPXR-ID
     * - type：取得対象の同意種別（nullの場合は、全ての種別が取得対象）
     * - assets：取得対象のアセット（nullの場合は、全てのアセットが取得対象）
     *  - 要素1：アクターのカタログ項目コード
     *  - 要素2：アセットのカタログ項目コード
     * @param _catalogAccessor カタログ取得関数
     * - code: 取得対象のカタログ項目コード
     * - history: 履歴取得フラグ（true：履歴取得する false：履歴取得しない null：履歴取得しない）
     * - minVersion: 取得対象の最小バージョン（指定されたバージョンを含む。履歴取得しない場合はこのバージョンを取得）
     * - maxVersion: 取得対象の最大バージョン（指定されたバージョンを含む。nullの場合は最大バージョン以下が取得対象）
     * @param _shareRestrictionAccessor 共有制限定義取得関数
     * - データ操作要求種別が共有、蓄積イベント通知の場合に必要
     * - 任意パラメータのためnullで初期化
     * @param _storeEventNotificationAccessor 蓄積イベント通知定義取得関数
     * - データ操作要求種別が蓄積イベント通知の場合に必要
     * - 任意パラメータのためnullで初期化
     * @returns PermissionAnalyzerオブジェクト
     */
    static create (
        operator: Operator,
        agreementAccessor: (
            pxrId: string,
            type: AGREEMENT_TYPE | null,
            assets: IDataOperationAsset[] | null
        ) => Promise<IAgreementForAsset[]> | null,
        catalogAccessor: (
            operator: Operator,
            code: number,
            history: boolean | null,
            minVersion: number,
            maxVersion: number | null
        ) => Promise<Catalog[]> | null,
        shareRestrictionAccessor: (
            operator: Operator,
            actorCode: number
        ) => Promise<ISharingRestrictionCatalog[]> | null = null,
        storeEventNotificationAccessor: (
            shareCatalogCode: number,
            shareCatalogVersion: number
        ) => Promise<Map<number, Map<string, IStoreEventNotificate>>> | null = null
    ): PermissionAnalyzer {
        // 引数チェック
        if (!operator) {
            throw new AppError(message.NOT_SET_OPERATOR, ResponseCode.BAD_REQUEST);
        }
        if (!agreementAccessor || !catalogAccessor) {
            throw new AppError(message.NOT_SET_AGREEMENT_ACCESSOR_OR_CATALOG_ACCESSOR, ResponseCode.BAD_REQUEST);
        }
        const analyzer = new PermissionAnalyzer(operator, agreementAccessor, catalogAccessor, shareRestrictionAccessor, storeEventNotificationAccessor);
        return analyzer;
    }

    /**
     * データ操作要求種別を設定する
     * @param type
     */
    setDataOperationType (type: DATA_OPERATION_TYPE): PermissionAnalyzer {
        // 引数チェック
        if (!type) {
            throw new AppError(message.NOT_SET_DATA_OPERATION_TYPE, ResponseCode.BAD_REQUEST);
        }
        // 前提条件チェック
        if (type === 'SHARE_CONTINUOUS' && !this._shareRestrictionAccessor) {
            throw new AppError(message.NOT_SET_SHARE_RESTRICTION_ACCESSOR, ResponseCode.BAD_REQUEST);
        }
        if (type === 'STORE_EVENT') {
            if (!this._shareRestrictionAccessor) {
                throw new AppError(message.NOT_SET_SHARE_RESTRICTION_ACCESSOR, ResponseCode.BAD_REQUEST);
            } else if (
                !this._storeEventNotificationAccessor) {
                throw new AppError(message.NOT_SET_STORE_EVENT_NOTIFICATE_ACCESSOR, ResponseCode.BAD_REQUEST);
            }
        }
        // データ操作要求種別をクラス変数に保存
        this._operationType = type;
        return this;
    }

    /**
     * 指定された個人同意を取得する
     * @param pxrId 取得対象のPXR-ID
     * @param type 取得対象の同意種別（"STORE"の場合は蓄積同意のみ、"SHARE-CONTINUOUS"の場合は蓄積同意と共有同意の両方を取得）
     * @param assets 同意取得対象のアセット配列（nullの場合は、全てのアセットが取得対象）※可否判定においては、STOREの場合のみ指定
     *  - 要素１：アクターのカタログ項目コード（version指定は不要）
     *  - 要素２：アセットのカタログ項目コード（version指定は不要）
     * @returns PermissionAnalyzerオブジェクト
     */
    async setAgreement (
        pxrId: string,
        type: AGREEMENT_TYPE,
        assets: IDataOperationAsset[] | null
    ): Promise<PermissionAnalyzer> {
        // 引数チェック
        if (!pxrId) {
            throw new AppError(message.REQUIRED_PXR_ID, ResponseCode.BAD_REQUEST);
        }
        if (!type) {
            throw new AppError(message.REQUIRED_AGREEMENT_TYPE, ResponseCode.BAD_REQUEST);
        }
        // 前提条件チェック
        if (!this._operationType) {
            throw new AppError(message.NOT_SET_DATA_OPERATION_TYPE, ResponseCode.BAD_REQUEST);
        }
        // 条件をクラス変数に保存
        this._pxrId = pxrId;
        this._typeFilter = type;
        this._assetFilter = assets;

        // 条件指定された個人の同意を取得する
        const agreements = await this._agreementAccessor(pxrId, type, assets);

        // Map型に整形（キー：アセットカタログコード、値：アセットに対する個人同意）してクラス変数に保存
        const agreementMap = new Map();
        for (const agreement of agreements) {
            agreementMap.set(agreement.asset._value, agreement);
        }
        this._agreement = agreementMap;
        return this;
    }

    /**
     * 必要なカタログを取得する
     * @returns PermissionAnalyzerオブジェクト
     */
    async setAssetCatalog (): Promise<PermissionAnalyzer> {
        // 前提条件チェック
        if (!this._agreement) {
            throw new AppError(message.INCOMPLETE_SET_AGREEMENT, ResponseCode.BAD_REQUEST);
        }
        // this._agreement を起点に必要なカタログを取得し、アセットカタログコードをキーとするMapに整形する
        const assetMap: Map<number, IAsset> = new Map();
        // アクターカタログコードごとに共有制限定義の取得結果を保存しておく
        const shareRestrictionMap: Map<number, ISharingRestrictionCatalog[]> = new Map();

        for (const [agreementKey, agreementValue] of this._agreement) {
            // アクターカタログ、アセットカタログ取得
            const actorCatalog = await this.getActorOrAssetCatalog(agreementValue.actor._value);
            const assetCatalog = await this.getActorOrAssetCatalog(agreementValue.asset._value);

            // store, shareカタログは個人同意のバージョンから最新までの履歴を取得する
            const storeCatalogMap: Map<number, IDataStoreCatalog[]> = await this.getStoreCatalogs(agreementValue.store);
            const shareCatalogMap: Map<number, IDataShareObject[]> = await this.getShareCatalogs(agreementValue.share);

            // 操作種別が継続的共有、蓄積イベント通知の場合は、共有制限定義カタログを取得する
            let shareRestriction: ISharingRestrictionCatalog[] = null;
            if (this._operationType === 'SHARE_CONTINUOUS' || this._operationType === 'STORE_EVENT') {
                shareRestriction = await this.setShareRestriction(shareRestrictionMap, agreementValue.actor._value);
            }

            const assetObject: IAsset = {
                actor: actorCatalog as IActorCatalog,
                asset: assetCatalog as IAssetCatalog,
                store: storeCatalogMap,
                share: shareCatalogMap,
                validStore: null,
                validShare: null,
                shareRestriction: shareRestriction
            };
            assetMap.set(agreementKey, assetObject);
        }
        this._asset = assetMap;
        return this;
    }

    /**
     * アクターカタログ、アセットカタログを取得する
     * @param catalogCode アクターカタログコード || アセットカタログコード
     * @returns 単一のカタログオブジェクト
     */
    private async getActorOrAssetCatalog (catalogCode: number): Promise<Catalog> {
        // コード指定で取得するため、期待値は要素数1の配列
        const gotCatalog = await this._catalogAccessor(
            this._operator,
            catalogCode,
            false,
            null,
            null
        );
        if (!gotCatalog || gotCatalog.length < 1) {
            // カタログ取得に失敗した場合エラー
            throw new AppError(message.FAILED_CATALOG_GET, ResponseCode.INTERNAL_SERVER_ERROR);
        } else if (gotCatalog.length > 1) {
            // カタログ取得結果が2件以上ある場合エラー
            throw new AppError(message.INVALID_CATALOG_NUMBER, ResponseCode.INTERNAL_SERVER_ERROR);
        }
        return gotCatalog[0];
    }

    /**
     * 蓄積定義カタログを取得する
     * @param stores アセットの蓄積同意リスト
     * @returns 蓄積定義カタログマップ
     */
    private async getStoreCatalogs (stores: IAgreementForAssetDetail[]): Promise<Map<number, IDataStoreCatalog[]>> {
        const storeCatalogMap: Map<number, IDataStoreCatalog[]> = new Map();
        for (const store of stores) {
            const storeCatalogs = await this._catalogAccessor(
                this._operator,
                store.target._value,
                true,
                store.target._ver,
                null
            ) as IDataStoreCatalog[];
            if (storeCatalogs.length > 0) {
                storeCatalogMap.set(store.target._value, storeCatalogs);
            }
        }
        return storeCatalogMap;
    }

    /**
     * 共有定義カタログを取得する
     * @param agreementShare アセットの共有同意リスト
     * @returns 共有定義カタログ＋蓄積イベント通知定義で構成されるオブジェクトのマップ
     */
    private async getShareCatalogs (agreementShare: IAgreementForAssetDetail[]): Promise<Map<number, IDataShareObject[]>> {
        const shareCatalogMap: Map<number, IDataShareObject[]> = new Map();
        for (const share of agreementShare) {
            const dataShareObject: IDataShareObject[] = [];
            const shareCatalogs = await this._catalogAccessor(
                this._operator,
                share.target._value,
                true,
                share.target._ver,
                null
            ) as IDataShareCatalog[];
            if (shareCatalogs.length > 0) {
                for (const shareCatalog of shareCatalogs) {
                    let storeEventNotificateObjectMap: Map<number, Map<string, IStoreEventNotificate>> = null;
                    // 操作種別が蓄積イベント通知の場合は、共有定義に紐づく蓄積イベント通知定義テーブルの情報を取得する
                    if (this._operationType === 'STORE_EVENT') {
                        storeEventNotificateObjectMap = await this.setStoreEventNotification(shareCatalog.catalogItem._code._value, shareCatalog.catalogItem._code._ver);
                    }
                    dataShareObject.push({
                        shareCatalog: shareCatalog,
                        storeEventNotificate: storeEventNotificateObjectMap
                    });
                }
                shareCatalogMap.set(share.target._value, dataShareObject);
            }
        }
        return shareCatalogMap;
    }

    /**
     * 必要な蓄積イベント通知定義を取得する
     * @param shareCatalogCode
     * @param shareCatalogVersion
     * @returns 蓄積イベント通知定義オブジェクト配列
     */
    private async setStoreEventNotification (shareCatalogCode: number, shareCatalogVersion: number): Promise<Map<number, Map<string, IStoreEventNotificate>>> {
        // 引数の共有定義コード・バージョンについて、蓄積イベント通知を取得する
        const storeEventNotificateObjects = await this._storeEventNotificationAccessor(shareCatalogCode, shareCatalogVersion);
        return storeEventNotificateObjects;
    }

    /**
     * 必要な共有制限定義を取得する
     * @param actorCode
     * @returns 共有制限定義カタログ配列
     */
    private async setShareRestriction (shareRestrictionMap: Map<number, ISharingRestrictionCatalog[]>, actorCode: number): Promise<ISharingRestrictionCatalog[]> {
        // Mapに登録済のactorの場合はMapから共有制限定義を取得する
        if (shareRestrictionMap.has(actorCode)) {
            return shareRestrictionMap.get(actorCode);
        } else {
            // Mapに未登録のactorの場合は、共有制限定義を取得してMapに追加する
            const shareRestrictionCatalog = await this._shareRestrictionAccessor(this._operator, actorCode);

            // 共有制限定義カタログのバリデーションチェック
            for (const shareRestriction of shareRestrictionCatalog) {
                Promise.all([
                    validateShareRestriction(shareRestriction.template.document),
                    validateShareRestriction(shareRestriction.template.event),
                    validateShareRestriction(shareRestriction.template.thing)
                ]);
            }

            shareRestrictionMap.set(actorCode, shareRestrictionCatalog);
            return shareRestrictionCatalog;
        }

        /**
         * 共有制限定義カタログのバリデーションチェック（各データ種オブジェクトに許可リストと禁止リストが両方定義されていないかをチェックする）
         * @param shareRestrictionDataType
         */
        function validateShareRestriction (shareRestrictionDataType: IRestrictionDataType[]) {
            if (shareRestrictionDataType && shareRestrictionDataType.length > 0) {
                for (const dataType of shareRestrictionDataType) {
                    if (dataType.permission && dataType.permission.length > 0 &&
                        dataType.prohibition && dataType.prohibition.length > 0) {
                        throw new AppError(message.SET_PERMISSION_AND_PROHIBITION, ResponseCode.BAD_REQUEST);
                    }
                }
            }
        }
    }

    /**
     * アクティブな同意対象を特定する
     * @returns PermissionAnalyzerオブジェクト
     */
    async specifyTarget (): Promise<PermissionAnalyzer> {
        // 前提条件チェック
        if (!this._asset) {
            throw new AppError(message.INCOMPLETE_SET_ASSET_CATALOG, ResponseCode.BAD_REQUEST);
        }

        // アセットカタログコードごとに処理
        for (const [assetCode, asset] of this._asset) {
            // 有効な蓄積定義カタログの取得（操作種別に関わらず共通）
            const validStoreMap = new Map<number, IDataStoreCatalog>();
            for (const [storeCode, storeCatalogs] of asset.store) {
                // 個人が同意しているバージョンが取得できない場合、その定義は判定で使用しない
                const agreement = this._agreement.get(assetCode);
                const storeAgree = agreement.store.find((ele) => ele.target._value === storeCode);
                if (!storeCatalogs.some((ele) => ele.catalogItem._code._ver === storeAgree.target._ver)) {
                    applicationLogger.warn('蓄積定義カタログ: ', storeCode, ' について、個人が同意したバージョンのカタログが削除されているため、同意が無効になります');
                    continue;
                }

                const validStoreCatalog = this.getValidStoreCatalog(storeCatalogs);
                validStoreMap.set(storeCode, validStoreCatalog);
            }
            asset.validStore = validStoreMap;

            // 有効な共有定義カタログの取得（操作種別が継続的共有、蓄積イベント通知の場合）
            if (this._operationType === 'SHARE_CONTINUOUS' || this._operationType === 'STORE_EVENT') {
                const validShareMap = new Map<number, IDataShareObject>();
                for (const [shareCode, shareObjects] of asset.share) {
                    // 個人が同意しているバージョンが取得できない場合、その定義は判定で使用しない
                    const agreement = this._agreement.get(assetCode);
                    const shareAgree = agreement.share.find((ele) => ele.target._value === shareCode);
                    if (!shareObjects.some((ele) => ele.shareCatalog.catalogItem._code._ver === shareAgree.target._ver)) {
                        applicationLogger.warn('共有定義カタログ: ', shareCode, ' について、個人が同意したバージョンのカタログが削除されているため、同意が無効になります');
                        continue;
                    }

                    const validShareCatalog = this.getValidShareObject(shareObjects);
                    // getValidShareObject() は null を返却するケースがあるため存在チェック
                    if (validShareCatalog) {
                        validShareMap.set(shareCode, validShareCatalog);
                    }
                }
                asset.validShare = validShareMap;
            }
        }
        // ログ出力
        this.outputLog();

        this._isSpecified = true;
        return this;
    }

    /**
     * 蓄積定義カタログの履歴から、有効な蓄積定義バージョンを特定する
     * @param storeCatalogs 蓄積定義カタログの履歴
     * @returns 有効なバージョンの蓄積定義カタログ
     */
    private getValidStoreCatalog (storeCatalogs: IDataStoreCatalog[]): IDataStoreCatalog {
        let currentStoreCatalog: IDataStoreCatalog = null;
        for (const storeCatalog of storeCatalogs) {
            if (!currentStoreCatalog) {
                // 1番目の要素が最小バージョン = 個人が同意しているバージョン
                currentStoreCatalog = storeCatalog;
            } else {
                // 新しいバージョンで追加された蓄積定義を取得
                const addedStoreDefinitions: IOperationTarget[] = [];
                for (const store of storeCatalog.template.store) {
                    if (!currentStoreCatalog.template.store.some((elem: IOperationTarget) => elem.id === store.id)) {
                        addedStoreDefinitions.push(store);
                    }
                }
                // 追加された蓄積定義の再同意要否チェック
                const isRequireConsent = this.checkRequireConsents(addedStoreDefinitions);
                // 再同意不要バージョンの場合、有効な蓄積定義として扱う
                if (!isRequireConsent) {
                    currentStoreCatalog = storeCatalog;
                } else {
                    // 再同意要バージョンが出現した場合、以降の処理をスキップする
                    break;
                }
            }
        }
        return currentStoreCatalog;
    }

    /**
     * 共有定義カタログオブジェクトの履歴から、有効な共有定義カタログオブジェクトバージョンを特定する
     * @param shareMap 共有定義カタログオブジェクトの履歴
     * @returns 有効なバージョンの共有定義カタログオブジェクト
     */
    private getValidShareObject (shareObjects: IDataShareObject[]): IDataShareObject | null {
        // 有効な共有定義を取得
        let currentShareObject: IDataShareObject = null;
        for (const shareObject of shareObjects) {
            if (!currentShareObject) {
                // 1番目の要素が最小バージョン = 個人が同意しているバージョン
                currentShareObject = shareObject;
            } else {
                // 新しいバージョンで追加された共有定義を取得
                const addedShareDefinitions: IOperationTarget[] = [];
                for (const share of shareObject.shareCatalog.template.share) {
                    if (!currentShareObject.shareCatalog.template.share.some((elem: IOperationTarget) => elem.id === share.id)) {
                        addedShareDefinitions.push(share);
                    }
                }
                // 追加された共有定義の再同意要否チェック
                const isRequireConsent = this.checkRequireConsents(addedShareDefinitions);

                let isValidShare = false;
                // 再同意不要バージョンの場合、有効な共有定義として扱う
                if (!isRequireConsent) {
                    isValidShare = true;
                } else {
                    // 再同意要バージョンが出現した場合、以降バージョンの判定処理をスキップする
                    break;
                }
                // 操作種別が蓄積イベント通知の場合は、判定条件を追加
                if (this._operationType === 'STORE_EVENT') {
                    // 蓄積イベント通知定義が紐づいていない共有定義オブジェクトは、有効な共有定義として扱わない
                    const isNotificationDefined = (shareObject.storeEventNotificate && shareObject.storeEventNotificate.size > 0);
                    if (!isNotificationDefined) {
                        isValidShare = false;
                    }
                }
                if (isValidShare) {
                    currentShareObject = shareObject;
                }
            }
        }
        // 操作種別が蓄積イベント通知かつ、個人が同意したバージョン含めいずれの有効なバージョンにも蓄積イベント通知定義が紐づいていない場合はnullを返却する
        if (this._operationType === 'STORE_EVENT' && !(currentShareObject.storeEventNotificate && currentShareObject.storeEventNotificate.size > 0)) {
            return null;
        }
        return currentShareObject;
    }

    /**
     * データ操作定義配列について、再同意要否を判断する
     * いずれかの要素が再同意要の場合は、全体として再同意要
     * @param dataOperationDefinitions
     * @returns データ操作定義配列の再同意要否
     */
    private checkRequireConsents (dataOperationDefinitions: IOperationTarget[]): boolean {
        for (const dataOperationDefinition of dataOperationDefinitions) {
            const isDocumentRequireConsent = checkRequireConsent(dataOperationDefinition.document);
            const isEventRequireConsent = checkRequireConsent(dataOperationDefinition.event);
            const isThingRequireConsent = checkRequireConsent(dataOperationDefinition.thing);
            // いずれかのデータ種に再同意要のものがある場合は再同意要とする
            if (isDocumentRequireConsent || isEventRequireConsent || isThingRequireConsent) {
                return true;
            }
        }
        // 与えられた全てのデータ種が再同意不要の場合は再同意不要
        return false;

        /**
         * データ種配列に含まれる各データ種について、再同意要フラグをチェックする
         * @param dataTypes
         * @returns データ種配列の再同意要否
         */
        function checkRequireConsent (dataTypes: IStoringDatatype[] | ISharingDatatype[]): boolean {
            if (!dataTypes || dataTypes.length === 0) {
                // データ種配列が定義されていない場合はチェック不要のためfalseを返却
                return false;
            }
            for (const dataType of dataTypes) {
                if (dataType.requireConsent) {
                    return true;
                }
            }
            return false;
        }
    }

    /**
     * 有効な同意対象ログ特定まで完了した時点で、収集した判定材料をログに書き出す
     * - 出力レベルは trace に設定し、デフォルトのログ設定では出力されないようにする
     */
    private outputLog () {
        applicationLogger.trace('specifyTarget >>', '有効な同意対象カタログを特定しました。');
        // MapはそのままJSON.stringify()できないので、第二引数のreplacer関数でMapをオブジェクト配列に変換する
        applicationLogger.trace(JSON.stringify({
            operationType: this.getOperationDataType(),
            pxrId: this.getPxrId(),
            typeFilter: this.getTypeFilter(),
            assetFilter: this.getAssetFilter(),
            agreement: this.getAgreement(),
            assets: this.getAsset()
        }, (k, v) => {
            if (v instanceof Map) {
                return {
                    dataType: 'Map',
                    value: [...v]
                };
            }
            return v;
        }));
    }

    /**
     * データ操作リクエストの可否を判定する
     * - 操作種別によって蓄積可否判定、共有可否判定のいずれかを行う
     * @returns データ操作可否（true：可 false:不可）
     */
    async isPermitted (request: IDataOperationRequest): Promise<IPermissionResponse> {
        // 前提条件チェック
        if (!this._isSpecified) {
            throw new AppError(message.INCOMPLETE_SPECIFY_TARGET, ResponseCode.BAD_REQUEST);
        }
        // 引数チェック
        if (!request) {
            throw new AppError(message.REQUEST_IS_EMPTY, ResponseCode.BAD_REQUEST);
        }
        if (this._pxrId !== request.pxrId) {
            throw new AppError(message.MISMATCH_PXR_ID, ResponseCode.BAD_REQUEST);
        }
        if (this._operationType !== request.operationType) {
            throw new AppError(message.MISMATCH_OPERATION_TYPE, ResponseCode.BAD_REQUEST);
        }
        if (!request.dataType || !request.dataType.code || !request.dataType.code._value || !request.dataType.code._ver) {
            throw new AppError(message.REQUIRED_DATA_TYPE, ResponseCode.BAD_REQUEST);
        }
        if (request.operationType === 'STORE' || request.operationType === 'STORE_EVENT') {
            // 要求種別が蓄積、蓄積イベント通知の場合
            if (!request.storedBy || !request.storedBy.actor || !request.storedBy.asset) {
                throw new AppError(message.REQUIRED_STORED_BY_ASSET, ResponseCode.BAD_REQUEST);
            }
        }
        if (request.operationType === 'SHARE_CONTINUOUS' || request.operationType === 'STORE_EVENT') {
            // 要求種別が継続的共有、蓄積イベント通知の場合
            if (!request.shareTo || !request.shareTo.actor || !request.shareTo.asset) {
                throw new AppError(message.REQUIRED_SHARE_TO_ASSET, ResponseCode.BAD_REQUEST);
            }
            if (!request.dataType.type) {
                // 共有可否判定において、データ種別指定なしの場合エラー
                throw new AppError(message.REQUIRED_DATA_TYPE, ResponseCode.BAD_REQUEST);
            }
        }
        // コア処理は内部メソッドを用いる
        const isPermitted = await this.isPermittedCore(request, null);
        return isPermitted;
    }

    /**
     * isPermittedのコア処理
     * @param request
     * @param shareCatalogCode
     * @returns
     */
    private async isPermittedCore (request: IDataOperationRequest, shareCatalogCode: number | null): Promise<IPermissionResponse> {
        // 引数 shareCatalogCode を外部から設定するユースケースは無いため、isPermittedのコア処理を内部メソッド化
        // shareCatalogCodeによる絞り込みが必要な内部処理はこちらを直接呼ぶ
        const consent = await this.isOperationPermitted(request, this._operationType, shareCatalogCode);
        if (consent.checkResult === false) {
            return {
                checkResult: false,
                sourceActor: null,
                prohibitedSourceActor: null
            };
        } else if (consent.checkResult === true && this._operationType === 'STORE') {
            // 蓄積可否判定の場合
            return {
                checkResult: true,
                sourceActor: [request.storedBy.actor],
                prohibitedSourceActor: null
            };
        } else {
            // 共有可否判定の場合（操作種別：'SHARE_CONTINUOUS', 'STORE_EVENT'）
            // 共有定義で指定している共有元アクターリストを取得
            // ※共有定義コード指定の場合（getAllStoreEventRequest() からの内部呼出時）も、isSharePermitted の処理で絞り込み済のためこちらでは絞り込み不要
            const assignedShareSourceActor = await this.getAssignedShareSourceActor(request, consent.operationCatalogCodes);
            // 共有制限定義で共有を禁止している共有元アクターリストを取得
            const prohibitedShareSourceActor = await this.getProhibitedShareSourceActor(request.shareTo.asset, request.dataType);
            const response: IPermissionResponse = {
                checkResult: true,
                sourceActor: assignedShareSourceActor,
                prohibitedSourceActor: prohibitedShareSourceActor
            };

            // リクエストに共有元指定がある場合、許可されるか確認する
            if (request.storedBy && request.storedBy.actor) {
                if (assignedShareSourceActor.length > 0 && !assignedShareSourceActor.some((ele) => ele === request.storedBy.actor)) {
                    // 共有定義側の共有元指定アクターと、リクエストで指定された共有元アクターが一致しない場合は不可判定
                    response.checkResult = false;
                }
                if (prohibitedShareSourceActor.length > 0 && prohibitedShareSourceActor.some((ele) => ele === request.storedBy.actor)) {
                    // リクエストで指定された共有元アクターが共有制限している場合は不可判定
                    response.checkResult = false;
                }
                // 許可される共有元アクターの場合、共有元指定アクター情報を上書きする
                response.sourceActor = [request.storedBy.actor];
            }
            return response;
        }
    }

    /**
     * 個人同意と有効な定義カタログによる可否判定
     * @param request
     * @returns
     */
    private async isOperationPermitted (request: IDataOperationRequest, operationType: DATA_OPERATION_TYPE, reqShareCatalogCode: number | null): Promise<IOperationPermissionResponse> {
        // 個人同意による可否判定
        let consents: IAgreementForAssetDetail[];
        if (operationType === 'STORE') {
            const agreement = this._agreement.get(request.storedBy.asset);
            consents = agreement ? agreement.store : [];
        } else {
            const agreement = this._agreement.get(request.shareTo.asset);
            consents = agreement ? agreement.share : [];
        }
        const checkConsentsResult = this.checkConsents(consents, request.dataType);

        if (checkConsentsResult.checkResult === 'PROHIBIT') {
            // 個人同意で禁止している、あるいは対象データ種コードが個人同意に無い場合は不可判定を返す
            return {
                checkResult: false,
                operationCatalogCodes: null
            };
        } else if ((checkConsentsResult.checkResult === 'PERMIT' || checkConsentsResult.checkResult === 'POSSIBILITY') &&
            checkConsentsResult.targetOperationCatalogCodes.length > 0) {
            // 個人同意で許可されている場合も、セッションのroleで許可されてるかの確認
            // 同意不要の定義がある可能性がある場合に、有効な定義カタログを確認
            if (operationType === 'STORE') {
                const validStore = this._asset.get(request.storedBy.asset).validStore;
                if (!validStore || validStore.size === 0) {
                    return {
                        checkResult: false,
                        operationCatalogCodes: null
                    };
                }
                return this.isStorePermitted(checkConsentsResult.targetOperationCatalogCodes, validStore, request.dataType);
            } else {
                const validShare = this._asset.get(request.shareTo.asset).validShare;
                if (!validShare || validShare.size === 0) {
                    return {
                        checkResult: false,
                        operationCatalogCodes: null
                    };
                }
                return this.isSharePermitted(checkConsentsResult.targetOperationCatalogCodes, validShare, request.dataType, reqShareCatalogCode);
            }
        }
    }

    /**
     * 蓄積カタログ可否判定
     * @param request
     * @returns
     */
    private async isStorePermitted (storeCatalogCodes: number[], validStore: Map<number, IDataStoreCatalog>, dataType: IDataOperationRequestDataType): Promise<IOperationPermissionResponse> {
        // 定義カタログに対象データが存在するかどうかの判定
        const permittedStoreCatalogCodes: number[] = [];
        for (const storeCatalogCode of storeCatalogCodes) {
            const storeCatalog = validStore.get(storeCatalogCode);
            if (!storeCatalog) {
                // 個人同意のある蓄積定義カタログがvalidShareにない場合はスキップ（同意後に蓄積定義カタログが削除された場合に発生）
                continue;
            }
            if (this.checkStoreCatalog(storeCatalog, dataType)) {
                // 対象データが存在した定義カタログコードのみ返す
                permittedStoreCatalogCodes.push(storeCatalogCode);
            }
        }
        if (permittedStoreCatalogCodes.length > 0) {
            return {
                checkResult: true,
                operationCatalogCodes: permittedStoreCatalogCodes
            };
        } else {
            return {
                checkResult: false,
                operationCatalogCodes: null
            };
        }
    }
    // elseパターンなし

    /**
     * ある有効な蓄積定義カタログについて、対象データ種の蓄積可否判定
     * @param validStoreCatalog
     * @param request
     * @param isStoreDefPermitted
     * @returns
     */
    private checkStoreCatalog (validStoreCatalog: IDataStoreCatalog, dataType: IDataOperationRequestDataType): boolean {
        // カタログ内の各定義について、いずれかの定義に対象データ種コード・バージョンの要素が見つかれば可判定を返す
        for (const storeDefinition of validStoreCatalog.template.store) {
            const isDocumentExist = storeDefinition.document && storeDefinition.document.length > 0
                ? storeDefinition.document.some((elem: IStoringDatatype) => elem.code._value === dataType.code._value &&
                elem.code._ver === dataType.code._ver)
                : false;
            const isEventExist = storeDefinition.event && storeDefinition.event.length > 0
                ? storeDefinition.event.some((elem: IStoringDatatype) => elem.code._value === dataType.code._value &&
                elem.code._ver === dataType.code._ver)
                : false;
            const isThingExist = storeDefinition.thing && storeDefinition.thing.length > 0
                ? storeDefinition.thing.some((elem: IStoringDatatype) => elem.code._value === dataType.code._value &&
                elem.code._ver === dataType.code._ver)
                : false;

            let isEventThingExist = false;
            if (storeDefinition.event && storeDefinition.event.length > 0) {
                for (const event of storeDefinition.event) {
                    if (event.thing && event.thing.length > 0) {
                        isEventThingExist = event.thing.some((elem: IStoringDatatype) => elem.code._value === dataType.code._value &&
                            elem.code._ver === dataType.code._ver);
                    }
                    if (isEventThingExist) {
                        break;
                    }
                }
            }
            if (isDocumentExist || isEventExist || isThingExist || isEventThingExist) {
                return true;
            }
        }
        return false;
    }

    /**
     * 個人同意による可否判定
     * @param dataType 判定対象データ種
     * @returns
     */
    private checkConsents (dataOperationConsents: IAgreementForAssetDetail[], dataType: IDataOperationRequestDataType): IConsentPermissionResponse {
        // 複数の定義に同一データ種が存在するケースを考慮し、targetOperationCatalogCodesは配列型
        const result: IConsentPermissionResponse = {
            checkResult: null,
            targetOperationCatalogCodes: []
        };

        // 処理を明瞭にするために、バージョン一致の同意を見つけるループと、コードのみ一致のものを見つけるループを分ける
        for (const dataOperationConsent of dataOperationConsents) {
            // IAgreementForDataType配列に同コード・バージョンの要素が存在するため、filterで複数取得する
            // 1つのイベント配下に複数モノが定義されている、複数のイベント配下に共通のモノが定義されているケースの考慮
            const targetConsents = dataOperationConsent.dataType.filter((elem: IAgreementForDataType) => elem.code._value === dataType.code._value &&
                elem.code._ver === dataType.code._ver);
            // 対象データ種バージョンの個人同意がある場合
            if (targetConsents && targetConsents.length > 0) {
                let consentResult: 'PERMIT' | 'PROHIBIT' = null;
                if (targetConsents[0].type === 'thing') {
                    // モノの判定では、1つでも同意除外されている場合は不可判定
                    if (targetConsents.some((ele) => ele.consentFlag === false)) {
                        consentResult = 'PROHIBIT';
                    } else {
                        consentResult = 'PERMIT';
                    }
                } else {
                    // イベント、ドキュメントの判定では、いずれかが同意除外されていなければ可判定
                    if (targetConsents.some((ele) => ele.consentFlag === true)) {
                        consentResult = 'PERMIT';
                    } else {
                        consentResult = 'PROHIBIT';
                    }
                }
                if (consentResult === 'PROHIBIT') {
                    // 個人同意フラグがfalseの場合（= 同意時にそのデータ種が除外指定されている場合）、そのデータ種に関しては明示的に非同意のため判定結果false
                    // もし他の定義で対象データ種の蓄積/共有に同意している場合でも、この判定結果を最優先するためループ離脱
                    result.checkResult = 'PROHIBIT';
                    break;
                } else if (consentResult === 'PERMIT') {
                    // 同意除外していなければ判定結果をtrueに上書きし、ループ継続
                    // データ操作定義カタログによる可否判定で使用するため、定義カタログコードをレスポンスに追加する
                    result.checkResult = 'PERMIT';
                    result.targetOperationCatalogCodes.push(dataOperationConsent.target._value);
                    continue;
                }
            }
        }

        // 対象データ種のバージョン一致の個人同意が見つからなかった場合、コードのみ一致する個人同意を探す
        if (!result.checkResult) {
            for (const dataOperationConsent of dataOperationConsents) {
                const targetDataConsents = dataOperationConsent.dataType.filter((elem: IAgreementForDataType) => elem.code._value === dataType.code._value);
                if (targetDataConsents && targetDataConsents.length > 0) {
                    // 個人同意時点での対象データ種の最新バージョンの同意を取得する
                    const versions: number[] = [];
                    targetDataConsents.forEach(e => versions.push(e.code._ver));
                    const latestVersion = Math.max.apply(null, versions);
                    const targetDataNewestConsents = targetDataConsents.filter((elem: IAgreementForDataType) => elem.code._ver === latestVersion);

                    // 対象データ種バージョンの個人同意がある場合
                    let newestConsentResult: 'POSSIBILITY' | 'PROHIBIT' = null;
                    if (targetDataNewestConsents[0].type === 'thing') {
                        // モノの判定では、1つでも同意除外されている場合は不可判定
                        if (targetDataNewestConsents.some((ele) => ele.consentFlag === false)) {
                            newestConsentResult = 'PROHIBIT';
                        } else {
                            newestConsentResult = 'POSSIBILITY';
                        }
                    } else {
                        // イベント、ドキュメントの判定では、いずれかが同意除外されていなければ可判定
                        if (targetDataNewestConsents.some((ele) => ele.consentFlag === true)) {
                            newestConsentResult = 'POSSIBILITY';
                        } else {
                            newestConsentResult = 'PROHIBIT';
                        }
                    }
                    if (newestConsentResult === 'PROHIBIT') {
                        // それが除外指定されている場合は有効な定義カタログによる判定の対象外
                        result.checkResult = 'PROHIBIT';
                        break;
                    } else if (newestConsentResult === 'POSSIBILITY') {
                        // 除外指定されていなければ、定義カタログによる可否判定の対象として定義カタログコードをレスポンスに追加する
                        result.checkResult = 'POSSIBILITY';
                        result.targetOperationCatalogCodes.push(dataOperationConsent.target._value);
                    }
                }
            }
            // コードのみ一致する個人同意も無かった場合、否判定を設定する
            if (!result.checkResult) {
                result.checkResult = 'PROHIBIT';
            }
        }
        // 重複除去
        if (result.targetOperationCatalogCodes.length > 0) {
            const filteredTargetOperationCatalogCodes = Array.from(new Set(result.targetOperationCatalogCodes));
            result.targetOperationCatalogCodes = filteredTargetOperationCatalogCodes;
        }
        return result;
    }

    /**
     * 共有可否判定
     * @param request
     * @param reqShareCatalogCode
     * @returns
     */
    private async isSharePermitted (shareCatalogCodes: number[], validShare: Map<number, IDataShareObject>, dataType: IDataOperationRequestDataType, reqShareCatalogCode: number | null): Promise<IOperationPermissionResponse> {
        // 共有定義コード指定の場合（getAllStoreEventRequest() からの内部呼出時）、validShareを共有定義コードで絞り込む
        if (reqShareCatalogCode) {
            validShare = new Map<number, IDataShareObject>().set(reqShareCatalogCode, validShare.get(reqShareCatalogCode));
        }
        const permittedShareCatalogCodes: number[] = [];
        for (const shareCatalogCode of shareCatalogCodes) {
            const shareCatalogObject = validShare.get(shareCatalogCode);
            if (!shareCatalogObject || !shareCatalogObject.shareCatalog) {
                // 個人同意のある共有定義カタログがvalidShareにない場合はスキップ（蓄積イベント通知の判定で発生）
                continue;
            }
            if (this.checkShareCatalog(shareCatalogObject.shareCatalog, dataType)) {
                // 対象データが存在した定義カタログコードのみ返す
                permittedShareCatalogCodes.push(shareCatalogCode);
            }
        }
        if (permittedShareCatalogCodes.length > 0) {
            return {
                checkResult: true,
                operationCatalogCodes: permittedShareCatalogCodes
            };
        } else {
            return {
                checkResult: false,
                operationCatalogCodes: null
            };
        }
    }

    /**
     * 判定対象データ種を共有可能な共有元アクターの指定を取得
     * @param request 共有可否判定リクエスト
     * @param reqShareCatalogCode リクエストのデータ種が定義されていることを確認済の共有定義カタログコード
     * @returns 共有元指定アクターリスト（空配列の場合は全てのアクターからの共有を許容）
     */
    private async getAssignedShareSourceActor (request: IDataOperationRequest, shareCatalogCodes: number[]): Promise<number[]> {
        const validShare = this._asset.get(request.shareTo.asset).validShare;

        const shareSourceActorMap: Map<number, number[]> = new Map();
        // リクエストのデータ種を持つ各共有定義コードに関して処理
        for (const shareCatalogCode of shareCatalogCodes) {
            const shareCatalogObject = validShare.get(shareCatalogCode);
            const shareSourceActor = this.getShareSourceActor(shareCatalogObject.shareCatalog, request.dataType);
            shareSourceActorMap.set(shareCatalogCode, shareSourceActor);
        }
        // 各共有定義のsourceActorの要素を統合して返却
        return this.mergeShareResponseActor(shareSourceActorMap);
    }

    /**
     * 共有制限定義によって共有を許可しない共有元アクターの取得
     */
    private async getProhibitedShareSourceActor (shareToAssetCode: number, dataType: IDataOperationRequestDataType): Promise<number[]> {
        const allStoreActors: number[] = [];
        // 蓄積同意のある全てのアクターに関して共有制限定義のチェックを行う
        for (const [, agreement] of this._agreement) {
            if (agreement.store && agreement.store.length > 0) {
                allStoreActors.push(agreement.actor._value);
            }
        }

        const prohibitedSourceActors: number[] = [];
        if (allStoreActors.length > 0) {
            // 重複除去
            const filteredAllStoreActors = Array.from(new Set(allStoreActors));
            // 共有先アセットの提携regionコードを取得しておく
            const shareToAsset = this._asset.get(shareToAssetCode);
            const regionCodes: number[] = [];
            for (const region of shareToAsset.asset.template['region-alliance']) {
                regionCodes.push(region['_value']);
            }

            for (const actorCode of filteredAllStoreActors) {
                // アクターコードが一致するアセット定義から対象アクターの共有制限定義を取得する
                let shareRestrictionCatalogs: ISharingRestrictionCatalog[];
                for (const [, asset] of this._asset) {
                    if (asset.actor.catalogItem._code._value === actorCode) {
                        shareRestrictionCatalogs = asset.shareRestriction;
                    }
                }
                if (!shareRestrictionCatalogs || shareRestrictionCatalogs.length === 0) {
                    // 共有制限定義カタログがない場合は判定不要で共有可
                    continue;
                }

                const isRestricted = this.checkRestriction(shareRestrictionCatalogs, dataType, regionCodes, shareToAssetCode);
                if (isRestricted) {
                    // 共有元アクターが共有対象データを共有制限している場合、配列に追加する
                    prohibitedSourceActors.push(actorCode);
                }
            }
        }
        return prohibitedSourceActors;
    }

    /**
     * 各共有定義の共有元アクター指定を統合する
     * @param shareSourceActorMap 共有定義カタログコードをキー、共有定義の共有元アクター指定を値とするMap
     * @returns 指定された共有元アクター配列（空配列の場合、全てのアクターから共有可能）
     */
    private mergeShareResponseActor (shareSourceActorMap: Map<number, number[]>): number[] {
        const mergedSourceActors: number[] = [];
        for (const [, sourceActors] of shareSourceActorMap) {
            if (sourceActors.length > 0) {
                // 共有定義で指定されている共有元アクターを共有元として追加
                mergedSourceActors.push(...sourceActors);
            }
        }
        // 重複除去
        const filteredSourceActors = Array.from(new Set(mergedSourceActors));
        return filteredSourceActors;
    }

    /**
     * 対象データ種の共有定義から、共有元アクター指定を取得
     * @param validShareCatalog 有効な共有定義カタログ
     * @param dataType 判定対象データ種
     * @returns 共有元指定アクターリスト（空配列の場合は全てのアクターからの共有を許容）
     */
    private getShareSourceActor (validShareCatalog: IDataShareCatalog, dataType: IDataOperationRequestDataType): number[] {
        const sourceActors: number[] = [];
        for (const shareDefinition of validShareCatalog.template.share) {
            // 判定対象データ種別がdocument, event の場合
            if (dataType.type === 'document' || dataType.type === 'event') {
                if (shareDefinition[dataType.type] && shareDefinition[dataType.type].length > 0) {
                    const gotSourceActorList = this.getSourceActorList(shareDefinition, dataType);
                    if (gotSourceActorList.length > 0) {
                        sourceActors.push(...gotSourceActorList);
                    }
                }
            } else if (dataType.type === 'thing') {
                // 判定対象データ種別がthingの場合
                let resThing: number[];
                if (shareDefinition.thing && shareDefinition.thing.length > 0) {
                    resThing = this.getSourceActorList(shareDefinition, dataType);
                }
                // event配下のthingに判定対象データ種があるか確認
                let resEveThing: number[];
                if (shareDefinition.event && shareDefinition.event.length > 0) {
                    resEveThing = this.getSourceActorListForEveThing(shareDefinition, dataType);
                }
                // 判定結果を統合して返却
                const res: number[] = [];
                if (resThing && resThing.length > 0) {
                    res.push(...resThing);
                }
                if (resEveThing && resEveThing.length > 0) {
                    res.push(...resEveThing);
                }
                // 共有元アクター指定の重複除去
                if (res.length > 0) {
                    const filteredSourceActorCodes = Array.from(new Set(res));
                    sourceActors.push(...filteredSourceActorCodes);
                }
            }
        }
        // 重複除去
        const filteredSourceActors = Array.from(new Set(sourceActors));
        return filteredSourceActors;
    }

    /**
     * 共有定義のデータ種配列から、判定対象データ種の共有元アクター指定を取得
     * @param shareDefinition 共有定義カタログ内の共有定義リスト
     * @param dataType 判定対象データ種情報
     * @returns 共有元指定アクターリスト（空配列の場合は全てのアクターからの共有を許容）
     */
    private getSourceActorList (shareDefinition: IOperationTarget, dataType: IDataOperationRequestDataType): number[] {
        const sourceActorList: number[] = [];
        const targetDatatype = shareDefinition[dataType.type].find((elem: ISharingDatatype) => elem.code._value === dataType.code._value &&
            elem.code._ver === dataType.code._ver) as ISharingDatatype;
        if (targetDatatype) {
            if (targetDatatype.sourceActor && targetDatatype.sourceActor.length > 0) {
                targetDatatype.sourceActor.forEach((ele) => sourceActorList.push(ele._value));
            }
        }
        // checkShareCatalog でtargetDataTypeの存在はチェック済のため、elseはeventに紐づくthingのケースのみ
        // targetDatatype.sourceActor の設定が無い場合は空配列を返却する
        return sourceActorList;
    }

    /**
     * 共有定義のイベント配下のモノから共有元アクター指定を取得
     * @param shareDefinition 共有定義カタログ内の共有定義リスト
     * @param dataType 判定対象データ種情報
     * @returns 共有元指定アクターリスト（空配列の場合は全てのアクターからの共有を許容）
     */
    private getSourceActorListForEveThing (shareDefinition: IOperationTarget, dataType: IDataOperationRequestDataType): number[] {
        const sourceActorList: number[] = [];
        for (const event of shareDefinition.event as ISharingDatatype[]) {
            if (event.thing && event.thing.length > 0) {
                const targetEveThing = event.thing.find((elem: ISharingDatatype) => elem.code._value === dataType.code._value &&
                    elem.code._ver === dataType.code._ver) as ISharingDatatype;
                if (targetEveThing) {
                    // 共有元アクター指定はイベント側に設定する仕様のため、そちらを参照する
                    if (event.sourceActor) {
                        event.sourceActor.forEach((ele) => sourceActorList.push(ele._value));
                    }
                }
                // checkShareCatalog でtargetDataTypeの存在はチェック済のため、elseはthing単体で定義されているケース
                // targetDatatype.sourceActor の設定が無い場合は空配列を返却する
            }
        }
        return sourceActorList;
    }

    /**
     * ある有効な共有定義カタログについて、対象データ種の共有可否判定
     * @param validShareCatalog 有効な共有定義カタログ
     * @param dataType 判定対象データ種
     * @returns
     */
    private checkShareCatalog (validShareCatalog: IDataShareCatalog, dataType: IDataOperationRequestDataType): boolean {
        for (const shareDefinition of validShareCatalog.template.share) {
            let isDatatypeExist = false;

            // 判定対象データ種別がdocument, event の場合
            if (dataType.type === 'document' || dataType.type === 'event') {
                if (!shareDefinition[dataType.type] || shareDefinition[dataType.type].length === 0) {
                    // 共有定義に該当データ種が無い場合はスキップ
                    continue;
                }
                isDatatypeExist = this.checkShareDataType(shareDefinition, dataType);
            } else if (dataType.type === 'thing') {
                // 判定対象データ種別がthingの場合
                let isThingExist = false;
                if (!shareDefinition.thing || shareDefinition.thing.length === 0) {
                    // 共有定義に該当データ種が無い場合はスキップ
                    isThingExist = false;
                } else {
                    isThingExist = this.checkShareDataType(shareDefinition, dataType);
                }
                // event配下のthingに判定対象データ種があるか確認
                let isEventThingExist = false;
                if (!shareDefinition.event || shareDefinition.event.length === 0) {
                    // 共有定義に該当データ種が無い場合はスキップ
                    isEventThingExist = false;
                } else {
                    isEventThingExist = this.checkShareEveThing(shareDefinition, dataType);
                }
                isDatatypeExist = (isEventThingExist || isThingExist);
            }
            if (isDatatypeExist) {
                return true;
            }
        }
        return false;
    }

    /**
     * 共有定義の各データ種配列に判定対象データ種が含まれるかの判定
     * @param shareDefinition 共有定義カタログ内の共有定義リスト
     * @param dataType 判定対象データ種情報
     * @returns
     */
    private checkShareDataType (shareDefinition: IOperationTarget, dataType: IDataOperationRequestDataType): boolean {
        const targetDatatype = shareDefinition[dataType.type].find((elem: ISharingDatatype) => elem.code._value === dataType.code._value &&
            elem.code._ver === dataType.code._ver) as ISharingDatatype;
        if (targetDatatype) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 共有定義のイベント配下のモノに判定対象データ種が含まれるかの判定
     * @param shareDefinition 共有定義カタログ内の共有定義リスト
     * @param dataType 判定対象データ種情報
     * @param storedByActor 共有元アクターコード
     * @returns
     */
    private checkShareEveThing (shareDefinition: IOperationTarget, dataType: IDataOperationRequestDataType): boolean {
        for (const event of shareDefinition.event) {
            if (event.thing && event.thing.length > 0) {
                const targetEveThing = event.thing.find((elem: ISharingDatatype) => elem.code._value === dataType.code._value &&
                    elem.code._ver === dataType.code._ver) as ISharingDatatype;
                if (targetEveThing) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * 共有制限定義による制限判定
     * @param restrictionCatalogs 共有元アクターの共有制限定義
     * @param dataType 判定対象データ種
     * @param regionCodes 共有先アセットが属する全てのリージョンコード
     * @param assetCode 共有先アセットコード
     * @returns 制限フラグ: ONの場合共有不可
    */
    private checkRestriction (restrictionCatalogs: ISharingRestrictionCatalog[], dataType: IDataOperationRequestDataType, regionCodes: number[], assetCode: number): boolean {
        for (const restrictionCatalog of restrictionCatalogs) {
            if (!restrictionCatalog.template[dataType.type] || restrictionCatalog.template[dataType.type].length < 1) {
                // 共有制限定義の対象データ種配列がnull、空配列の場合は処理スキップ
                continue;
            }
            const restriction = restrictionCatalog.template[dataType.type].find((elem: IRestrictionDataType) => elem.code._value === dataType.code._value &&
                elem.code._ver === dataType.code._ver);
            const permissionList = restriction && restriction.permission ? restriction.permission : null;
            const prohibitionList = restriction && restriction.prohibition ? restriction.prohibition : null;
            if (permissionList && permissionList.length > 0) {
                for (const service of permissionList) {
                    if (service.region && service.region.length > 0) {
                        for (const regionCode of regionCodes) {
                            if (!service.region.some(elem => elem._value === regionCode)) {
                                // 許可リストに無ければ制限フラグON
                                return true;
                            }
                        }
                    } else if (service.service && service.service.length > 0) {
                        if (!service.service.some(elem => elem._value === assetCode)) {
                            return true;
                        }
                    } else {
                        // regionもserviceも定義されていない場合はスキップ
                        continue;
                    }
                }
            } else if (prohibitionList && prohibitionList.length > 0) {
                for (const service of prohibitionList) {
                    if (service.region && service.region.length > 0) {
                        for (const regionCode of regionCodes) {
                            if (service.region.some(elem => elem._value === regionCode)) {
                                // 禁止リストにあれば制限フラグON
                                return true;
                            }
                        }
                    } else if (service.service) {
                        if (service.service.some(elem => elem._value === assetCode)) {
                            return true;
                        }
                    } else {
                        // regionもserviceも定義されていない場合はスキップ
                        continue;
                    }
                }
            } else {
                // 対象データ種の共有制限定義がない、あるいは許可リスト・禁止リストが共に空の場合はスキップ
                continue;
            }
        }
        return false;
    }

    /**
     * 許可されるデータ操作リクエストを全て返却します。
     * @param request データ操作リクエスト
     * - pxrId および operationType および dataType の設定は必須です（つまり、未設定のアセットをみつける）
     * @returns 許可されるデータ操作リクエストのリスト
     */
    async getAllPermitted (request: IDataOperationRequest): Promise<IAllDataOperationRequestResponse[]> {
        let response: IAllDataOperationRequestResponse[] = [];
        // 前提条件チェック
        if (!this._isSpecified) {
            throw new AppError(message.INCOMPLETE_SPECIFY_TARGET, ResponseCode.BAD_REQUEST);
        }
        if (this._pxrId !== request.pxrId) {
            throw new AppError(message.MISMATCH_PXR_ID, ResponseCode.BAD_REQUEST);
        }
        if (this._operationType !== request.operationType) {
            throw new AppError(message.MISMATCH_OPERATION_TYPE, ResponseCode.BAD_REQUEST);
        }
        if (!request.dataType || !request.dataType.code || !request.dataType.code._value || !request.dataType.code._ver) {
            throw new AppError(message.REQUIRED_DATA_TYPE, ResponseCode.BAD_REQUEST);
        }
        // 蓄積アセットと共有先アセットの両方を指定する運用は想定しないため、禁止しておく
        if (request.storedBy && request.shareTo) {
            throw new AppError(message.STORED_BY_OR_SHARE_TO_NOT_NEED, ResponseCode.BAD_REQUEST);
        }
        if (request.operationType === 'STORE') {
            // 未サポートのため例外を送出する
            throw new AppError(message.NOT_SUPPORTED_OPERATION, ResponseCode.METHOD_NOT_ALLOWED);
        } else if (request.operationType === 'SHARE_CONTINUOUS') {
            // 未サポートのため例外を送出する
            throw new AppError(message.NOT_SUPPORTED_OPERATION, ResponseCode.METHOD_NOT_ALLOWED);
        } else if (request.operationType === 'STORE_EVENT') {
            if (!request.storedBy || !request.storedBy.actor || !request.storedBy.asset) {
                throw new AppError(message.REQUIRED_STORED_BY_ASSET, ResponseCode.BAD_REQUEST);
            }
            if (!request.dataType.type) {
                // データ種別指定なしの場合
                throw new AppError(message.REQUIRED_DATA_TYPE, ResponseCode.BAD_REQUEST);
            }
            response = await this.getAllStoreEventRequest(request);
        }
        return response;
    }

    /**
     * 全ての STORE-EVENT リクエストを生成する
     * @param request
     * @returns
     */
    private async getAllStoreEventRequest (request: IDataOperationRequest): Promise<IAllDataOperationRequestResponse[]> {
        const resList: IAllDataOperationRequestResponse[] = [];
        for (const [, asset] of this._asset) {
            if (!asset.validShare || asset.validShare.size < 1) {
                continue;
            }

            for (const [shareCatalogCode, shareObject] of asset.validShare) {
                // 単一の共有定義について共有可否判定
                const isPermittedRequest = {
                    pxrId: request.pxrId,
                    operationType: request.operationType,
                    storedBy: request.storedBy,
                    shareTo: {
                        actor: asset.actor.catalogItem._code._value,
                        asset: asset.asset.catalogItem._code._value
                    },
                    dataType: request.dataType,
                    shareCatalogCode: shareCatalogCode
                };

                const permissionResponse = await this.isPermittedCore(isPermittedRequest, shareCatalogCode);
                if (permissionResponse.checkResult === true) {
                    // 共有定義に紐づく各蓄積イベント通知定義について、共有元指定の判定処理
                    // 蓄積イベント通知ごとにどうやってまとめているのかコメントで記載しないと分からない

                    for (const [, storeEventNotificationMap] of shareObject.storeEventNotificate) {
                        // 同一蓄積イベント通知定義カタログコードの蓄積イベント通知定義について処理
                        let isNotificationAvailable = true;
                        let notificationType: NOTIFICATION_TYPE = null;
                        let storeEventNotificationCodeObject: CodeObject = null;
                        for (const [, storeEventNotification] of storeEventNotificationMap) {
                            // 共有定義UUID別で作成された蓄積イベント通知を回って、通知対象データ種の共有元指定が設定されているかチェックする
                            const shareSourceDataType = storeEventNotification.shareSourceDatatype && storeEventNotification.shareSourceDatatype.length > 0
                                ? storeEventNotification.shareSourceDatatype.find((elem: shareSourceDataType) => elem.code._value === request.dataType.code._value && elem.code._ver === request.dataType.code._ver)
                                : null;
                            if (!shareSourceDataType) {
                                // リクエストのデータ種について共有元指定が存在しない場合は通知可
                                notificationType = storeEventNotification.type;
                                storeEventNotificationCodeObject = storeEventNotification.notificationCatalogCode;
                            } else if (shareSourceDataType.shareSourceSource.some((elem: CodeObject) => elem._value === request.storedBy.actor)) {
                                // 共有元指定があり、かつ共有元指定共有元に蓄積元アクターが含まれる場合は通知可
                                notificationType = storeEventNotification.type;
                                storeEventNotificationCodeObject = storeEventNotification.notificationCatalogCode;
                            } else {
                                // 共有元指定があり、かつ共有元指定共有元に蓄積元アクターが含まれない場合は通知不可
                                // 通知不可の場合、ループを抜ける
                                isNotificationAvailable = false;
                                break;
                            }
                        }
                        if (isNotificationAvailable) {
                            resList.push({
                                operationType: 'STORE_EVENT',
                                notificationType: notificationType,
                                document: request.dataType.type === 'document' ? request.dataType.code : null,
                                event: request.dataType.type === 'event' ? request.dataType.code : null,
                                thing: request.dataType.type === 'thing' ? request.dataType.code : null,
                                storedBy: request.storedBy,
                                shareTo: {
                                    actor: asset.actor.catalogItem._code._value,
                                    asset: asset.asset.catalogItem._code._value
                                },
                                storeEventNotificationCode: storeEventNotificationCodeObject
                            });
                        }
                    }
                }
            }
        }
        return resList;
    }

    /**
     * クラス変数に保存したデータ操作種別を取得する
     * @returns
     */
    getOperationDataType () {
        return this._operationType;
    }

    /**
     * クラス変数に保存した対象個人PXR-IDを取得する
     * @returns
     */
    getPxrId () {
        return this._pxrId;
    }

    /**
     * クラス変数に保存した同意取得種別を取得する
     * @returns
     */
    getTypeFilter () {
        return this._typeFilter;
    }

    /**
     * クラス変数に保存した対象アセットリストを取得
     * @returns
     */
    getAssetFilter () {
        return this._assetFilter;
    }

    /**
     * 収集した個人同意データを取得する
     * @returns Map<アセットカタログコード, 個人同意>
     */
    getAgreement () {
        return this._agreement;
    }

    /**
     * 収集したカタログデータを取得する
     * @returns Map<アセットカタログコード, アセット定義オブジェクト>
     * アセット定義オブジェクトにはアクター、アセット、蓄積定義、共有定義、蓄積イベント通知定義、共有制限定義のカタログ情報か含まれる
     */
    getAsset () {
        return this._asset;
    }

    /**
     * アクティブなデータ操作定義特定完了フラグを取得する
     * @returns
     */
    getIsSpecified () {
        return this._isSpecified;
    }
}
