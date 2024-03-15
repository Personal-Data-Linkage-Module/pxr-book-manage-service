/* eslint-disable */
import { IsNotEmptyObject, ValidateNested, IsString, IsDefined, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { CodeObject } from '../../resources/dto/PostBookOpenReqDto';
/* eslint-enable */

/**
 * 蓄積/共有可否判定で扱う各種カタログの定義
 */
export interface Catalog {
    /**
     * ネームスペース、コードバージョン情報
     */
    catalogItem: CatalogItem;

    /**
     * カタログテンプレート情報
     */
    template: Template;
}

export interface CatalogItem {
    /**
     * ネームスペース
     */
    ns: string;

    /**
     * カタログコード・バージョン
     */
    _code: CodeObject;
}

export interface Template {
    /**
     * カタログ項目コード
     */
    _code: CodeObject | null;
}

/**
 * 共有制限アセット、リージョン
 */
export interface IRestrictionAssets {
    /**
     * 許可/禁止対象リージョン
     * region, serviceはいずれか片方のみ定義
     */
    region: CodeObject[] | null;

    /**
     * 許可/禁止対象アセット
     * region, serviceはいずれか片方のみ定義
     */
    service: CodeObject[] | null;
}

/**
 * 共有制限データ種
 */
export interface IRestrictionDatatype {
    /**
     * データのカタログ項目コード
     */
    code: CodeObject | null;
    /**
     * 共有先として許可されたアセット（アプリケーション、ワークフロー、リージョン）のカタログ項目コードのリスト
     * permission, prohibitionはいずれか片方のみ定義
     */
    permission: IRestrictionAssets[] | null;
    /**
     * 共有先として禁止されたアセット（アプリケーション、ワークフロー、リージョン）のカタログ項目コードのリスト
     * permission, prohibitionはいずれか片方のみ定義
     */
    prohibition: IRestrictionAssets[] | null;
}

/**
 * 共有制限定義
 */
export interface IRestrictionTemplate extends Template {
    /**
     * 各ドキュメントの共有制限定義
     */
    document: IRestrictionDatatype[];

    /**
     * 各イベントの共有制限定義
     */
    event: IRestrictionDatatype[];

    /**
     * 各モノの共有制限定義
     */
    thing: IRestrictionDatatype[];
}

/**
 * 蓄積対象データ種
 */
export interface IStoringDatatype {
    /**
     * データのカタログ項目
     */
    code: CodeObject | null;
    /**
     * 再同意の要否
     */
    requireConsent: boolean | null;
    /**
     * モノ（イベントの場合のみ付随）
     */
    thing: IStoringDatatype[] | ISharingDatatype[] | undefined;
}

/**
 * 共有対象データ種
 */
export interface ISharingDatatype extends IStoringDatatype {
    /**
     * 共有元アクターのカタログ項目コード
     */
    sourceActor: CodeObject[] | null;
}

/**
 * データ操作定義
 */
export interface IOperationTarget {
    /**
     * ID（UUID）
     */
    id: string | null;
    /**
     * ロール情報
     */
    role: CodeObject[] | null;
    /**
     * 対象データのカタログ項目コードのリスト
     */
    document: IStoringDatatype[] | ISharingDatatype[] | null;

    event: IStoringDatatype[] | ISharingDatatype[] | null;

    thing: IStoringDatatype[] | ISharingDatatype[] | null;
}

/**
 * 蓄積定義リスト
 */
export interface IDataStoreTemplate extends Template {
    store: IOperationTarget[] | null;
}

/**
 * 共有定義リスト
 */
export interface IDataShareTemplate extends Template {
    share: IOperationTarget[] | null;
}

/**
 * アセット定義
 * ワークフロー/アプリケーション定義
 */
export interface IAssetTemplate extends Template {
    /**
     * 提携リージョンリスト
     */
    'region-alliance': CodeObject[] | null;
    /**
     * 蓄積定義のカタログ項目コードリスト（１アセットにつき複数のアクティブな蓄積定義を設定可能）
     */
    store: CodeObject[] | null;
    /**
     * 共有定義のカタログ項目コードリスト（１アセットにつき複数のアクティブな共有定義を設定可能）
     */
    share: CodeObject[] | null;
}

/**
 * アクター定義
 */
export interface IActorTemplate extends Template {
    /**
     * サービスアセット（アプリケーションまたはワークフロー）のカタログ項目コードリスト
     * application, workflowのいずれか片方のみ定義
     */
    application: CodeObject[] | null;

    workflow: CodeObject[] | null;
}

/**
 * 共有トリガー定義
 */
export interface Period {
    /**
     * 判定条件ドキュメントリスト
     */
    specification: string | null
}

/**
 * 開始・終了条件
 */
export interface Condition {
    /**
     * ドキュメントリスト
     */
    document: CodeObject[];

    /**
     * イベントリスト
     */
    event: CodeObject[];

    /**
     * モノリスト
     */
    thing: CodeObject[];

    /**
     * 判定対象期間
     */
    period: {
        specification: string | null;
    }

    /**
     * 共有トリガー判定API定義カタログコード
     */
    decisionAPI: CodeObject | null;
}

/**
 * 終了条件
 */
export interface EndCondition extends Condition {
    /**
     * 共有終了方法
     */
    exitMethod: {
        specification: string | null;
    }
}

/**
 * 共有トリガー定義
 */
export interface IShareTriggerTemplate extends Template {
    /**
     * 共有定義UUID配列
     */
    id: string[] | null;

    /**
     * 共有定義カタログコードバージョン
     */
    share: CodeObject | null;

    /**
     * 開始条件
     */
    startCondition: Condition | null;

    /**
     * 終了条件
     */
    endCondition: Condition | null;
}

/**
 * 共有制限定義カタログ
 */
export interface ISharingRestrictionCatalog extends Catalog {
    template: IRestrictionTemplate;
}

/**
 * 蓄積定義カタログ
 */
export interface IDataStoreCatalog extends Catalog {
    template: IDataStoreTemplate | null;
}

/**
 * 共有定義カタログ
 */
export interface IDataShareCatalog extends Catalog {
    template: IDataShareTemplate | null;
}

/**
 * アセットカタログ
 * ワークフロー/アプリケーションカタログ
 */
export interface IAssetCatalog extends Catalog {
    template: IAssetTemplate | null;
}

/**
 * アクターカタログ
 */
export interface IActorCatalog extends Catalog {
    template: IActorTemplate | null;
}

/**
 * 共有トリガー定義カタログ
 */
export interface IShareTriggerCatalog extends Catalog {
    template: IShareTriggerTemplate | null;
}
