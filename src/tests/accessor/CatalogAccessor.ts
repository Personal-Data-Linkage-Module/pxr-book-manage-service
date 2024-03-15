/* eslint-disable */
import { Catalog } from "domains/catalog/Catalogs";
import { CodeObject } from "resources/dto/PostBookOpenReqDto";
import { app01, app01_share01_1, app01_share01_2, app01_share01_3, app01_share01_4, app01_share01_5, app01_share01_6, app01_store01_1, app01_store01_2, app01_store01_3, app01_store01_4, app01_store01_5, app01_store01_6, appActor01 } from "./APPCatalogs1";
import { app02, app02_share01_1, app02_share01_2, app02_share01_3, app02_share01_4, app02_share01_5, app02_share01_6, app02_share02_1, app02_share02_2, app02_share02_3, app02_share02_4, app02_share02_5, app02_share02_6, app02_store01_1, app02_store01_2, app02_store01_3, app02_store01_4, app02_store01_5, app02_store01_6, app02_store02_1, app02_store02_2, app02_store02_3, app02_store02_4, app02_store02_5, app02_store02_6 } from "./APPCatalogs2";
import { app03, App03_share01_1, App03_share01_2, App03_share01_3, App03_share01_4, App03_share01_5, App03_share01_6, App03_store01_1, App03_store01_2, App03_store01_3, App03_store01_4, App03_store01_5, App03_store01_6, app05, appActor03 } from "./APPCatalogs3";
import { app04, App04_share01_1, App04_share01_2, App04_share01_3, App04_share01_4, App04_share01_5, App04_share01_6, App04_share02_1, App04_share02_2, App04_share02_3, App04_share02_4, App04_share02_5, App04_share02_6, App04_share03_6, App04_store01_1, App04_store01_2, App04_store01_3, App04_store01_4, App04_store01_5, App04_store01_6, App04_store02_1, App04_store02_2, App04_store02_3, App04_store02_4, App04_store02_5, App04_store02_6, App04_store03_6 } from "./APPCatalogs4";
import Operator from "resources/dto/OperatorReqDto";

// maxバージョン管理用変数
let maximumVersion: number = 6;

/**
 * maxバージョン変更関数
 * @param setVersion 設定するバージョン情報
 */
export const changeMaxCatalogVersion = (setVersion: number): void => {
    maximumVersion = setVersion;
}

// カタログ取得関数
export const getCatalog = 
    async (
        operator: Operator,
        code: number,
        history: boolean | null,
        minVersion: number | null,
        maxVersion: number | null
    ): Promise<Catalog[]> => {
        let res: Catalog[] = [];
        if (!history) {
            // アクターカタログ、アセットカタログの取得
            // 1件のみ取得
            switch (code) {
                case appActor03.catalogItem._code._value:
                    res.push(appActor03);
                    break;
                case app03.catalogItem._code._value:
                    res.push(app03);
                    break;
                case app04.catalogItem._code._value:
                    res.push(app04);
                    break;
                case app05.catalogItem._code._value:
                    res.push(app05);
                    break;
                case appActor01.catalogItem._code._value:
                    res.push(appActor01);
                    break;
                case app01.catalogItem._code._value:
                    res.push(app01);
                    break;
                case app02.catalogItem._code._value:
                    res.push(app02);
                    break;
                default:
                    break;
            }
        } else {
            // 蓄積定義カタログ、共有定義カタログの取得
            // minVersion以降のバージョンを複数取得
            switch (code) {
                case App03_store01_1.catalogItem._code._value:
                    // 全てのバージョンを配列に格納
                    const App03_store01 = [
                        App03_store01_1,
                        App03_store01_2,
                        App03_store01_3,
                        App03_store01_4,
                        App03_store01_5,
                        App03_store01_6
                    ];
                    // minVersionからmaxバージョン(6)までをレスポンスに追加
                    for (let i = minVersion - 1; i < maximumVersion; i++) {
                        res.push(App03_store01[i]);
                    }
                    break;
                case App03_share01_1.catalogItem._code._value:
                    const App03_share01 = [
                        App03_share01_1,
                        App03_share01_2,
                        App03_share01_3,
                        App03_share01_4,
                        App03_share01_5,
                        App03_share01_6
                    ];
                    for (let i = minVersion - 1; i < maximumVersion; i++) {
                        res.push(App03_share01[i]);
                    }
                    break;
                case App04_store01_1.catalogItem._code._value:
                    const App04_store01 = [
                        App04_store01_1,
                        App04_store01_2,
                        App04_store01_3,
                        App04_store01_4,
                        App04_store01_5,
                        App04_store01_6
                    ];
                    for (let i = minVersion - 1; i < maximumVersion; i++) {
                        res.push(App04_store01[i]);
                    }
                    break;
                case App04_store02_1.catalogItem._code._value:
                    const App04_store02 = [
                        App04_store02_1,
                        App04_store02_2,
                        App04_store02_3,
                        App04_store02_4,
                        App04_store02_5,
                        App04_store02_6
                    ];
                    for (let i = minVersion - 1; i < maximumVersion; i++) {
                        res.push(App04_store02[i]);
                    }
                    break;
                case App04_store03_6.catalogItem._code._value:
                    // 1000123はver6のみ準備
                    res.push(App04_store03_6);
                    break;
                case App04_share01_1.catalogItem._code._value:
                    const App04_share01 = [
                        App04_share01_1,
                        App04_share01_2,
                        App04_share01_3,
                        App04_share01_4,
                        App04_share01_5,
                        App04_share01_6
                    ];
                    for (let i = minVersion - 1; i < maximumVersion; i++) {
                        res.push(App04_share01[i]);
                    }
                    break;
                case App04_share02_1.catalogItem._code._value:
                    const App04_share02 = [
                        App04_share02_1,
                        App04_share02_2,
                        App04_share02_3,
                        App04_share02_4,
                        App04_share02_5,
                        App04_share02_6
                    ];
                    for (let i = minVersion - 1; i < maximumVersion; i++) {
                        res.push(App04_share02[i]);
                    }
                    break;
                case App04_share03_6.catalogItem._code._value:
                    // 1000133はver6のみ準備
                    res.push(App04_share03_6);
                    break;
                case app01_store01_1.catalogItem._code._value:
                    const app01_store01 = [
                        app01_store01_1,
                        app01_store01_2,
                        app01_store01_3,
                        app01_store01_4,
                        app01_store01_5,
                        app01_store01_6
                    ];
                    for (let i = minVersion - 1; i < maximumVersion; i++) {
                        res.push(app01_store01[i]);
                    }
                    break;
                case app01_share01_1.catalogItem._code._value:
                    const app01_share01 = [
                        app01_share01_1,
                        app01_share01_2,
                        app01_share01_3,
                        app01_share01_4,
                        app01_share01_5,
                        app01_share01_6
                    ];
                    for (let i = minVersion - 1; i < maximumVersion; i++) {
                        res.push(app01_share01[i]);
                    }
                    break;
                case app02_store01_1.catalogItem._code._value:
                    const app02_store01 = [
                        app02_store01_1,
                        app02_store01_2,
                        app02_store01_3,
                        app02_store01_4,
                        app02_store01_5,
                        app02_store01_6
                    ];
                    for (let i = minVersion - 1; i < maximumVersion; i++) {
                        res.push(app02_store01[i]);
                    }
                    break;
                case app02_store02_1.catalogItem._code._value:
                    const app02_store02 = [
                        app02_store02_1,
                        app02_store02_2,
                        app02_store02_3,
                        app02_store02_4,
                        app02_store02_5,
                        app02_store02_6
                    ];
                    for (let i = minVersion - 1; i < maximumVersion; i++) {
                        res.push(app02_store02[i]);
                    }
                    break;
                case app02_share01_1.catalogItem._code._value:
                    const app02_share01 = [
                        app02_share01_1,
                        app02_share01_2,
                        app02_share01_3,
                        app02_share01_4,
                        app02_share01_5,
                        app02_share01_6
                    ];
                    for (let i = minVersion - 1; i < maximumVersion; i++) {
                        res.push(app02_share01[i]);
                    }
                    break;
                case app02_share02_1.catalogItem._code._value:
                    const app02_share02 = [
                        app02_share02_1,
                        app02_share02_2,
                        app02_share02_3,
                        app02_share02_4,
                        app02_share02_5,
                        app02_share02_6
                    ];
                    for (let i = minVersion - 1; i < maximumVersion; i++) {
                        res.push(app02_share02[i]);
                    }
                    break;
                default:
                    break;
            }
        }
        return res;
    }

// カタログ取得関数（異常系、取得結果null）
export const getCatalogFailure =
async (
    operator: Operator,
    code: number,
    history: boolean | null,
    minVersion: number | null,
    maxVersion: number | null
): Promise<Catalog[]> => {
    let res: Catalog[] = null;
    return res;
}

// カタログ取得関数（異常系、取得結果0件）
export const getNoCatalog =
    async (
        operator: Operator,
        code: number,
        history: boolean | null,
        minVersion: number | null,
        maxVersion: number | null
    ): Promise<Catalog[]> => {
        let res: Catalog[] = [];
        return res;
    }

// カタログ取得関数（異常系、アクターカタログの取得結果が複数件）
export const getMultipleActorCatalogs =
    async (
        operator: Operator,
        code: number,
        history: boolean | null,
        minVersion: number | null,
        maxVersion: number | null
    ): Promise<Catalog[]> => {
        let res: Catalog[] = [];
        if (!history) {
            if (code === appActor03.catalogItem._code._value) {
                res.push(appActor03);
                res.push(appActor03);
            }
        }
        return res;
    }

// カタログ取得関数（正常系、蓄積、共有カタログ取得結果0件）
export const getNoDataOperationCatalog = 
    async (
        operator: Operator,
        code: number,
        history: boolean | null,
        minVersion: number | null,
        maxVersion: number | null
    ): Promise<Catalog[]> => {
        let res: Catalog[] = [];
        if (!history) {
            // アクターカタログ、アセットカタログの取得
            // 1件のみ取得
            switch (code) {
                case appActor03.catalogItem._code._value:
                    res.push(appActor03);
                    break;
                case app03.catalogItem._code._value:
                    res.push(app03);
                    break;
                case app04.catalogItem._code._value:
                    res.push(app04);
                    break;
                case app05.catalogItem._code._value:
                    res.push(app05);
                    break;
                case appActor01.catalogItem._code._value:
                    res.push(appActor01);
                    break;
                case app01.catalogItem._code._value:
                    res.push(app01);
                    break;
                case app02.catalogItem._code._value:
                    res.push(app02);
                    break;
                default:
                    break;
            }
        } else {
            return [];
        }
        return res;
    }