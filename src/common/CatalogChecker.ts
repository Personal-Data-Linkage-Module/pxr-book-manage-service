/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import { transformAndValidate } from 'class-transformer-validator';
import BaseCatalogType from '../domains/catalog/Base';
import AppError from './AppError';
import ShareCodes from '../domains/catalog/ShareCodes';
import Actor from '../domains/catalog/Actor';

/**
 * カタログであるかを判別する
 * @param data
 * @param code
 */
export async function checkCatalog (data: any, arg: number | string) {
    try {
        const domain = await transformAndValidate(BaseCatalogType, data);
        if (Array.isArray(domain) !== Array.isArray(data)) {
            throw new AppError('配列データのパース結果が、配列ではありません', 500);
        }
        return domain;
    } catch (err) {
        if (err instanceof AppError) {
            throw err;
        }
        throw new AppError(`カタログの取得に成功しましたが、対象が期待するカタログの種別ではありません(${typeof arg === 'string' ? 'ネームスペース: ' + arg : 'コード値: ' + arg}, 型: カタログ)`, 400, err);
    }
}

/**
 * 一時的データ共有のカタログをパースして返す
 * @param data
 * @param arg
 */
export async function checkShareCatalog (data: any, arg: number | string) {
    try {
        const domain = await transformAndValidate(ShareCodes, data);
        if (Array.isArray(domain) !== Array.isArray(data)) {
            throw new AppError('配列データのパース結果が、配列ではありません', 500);
        }
        return domain;
    } catch (err) {
        if (err instanceof AppError) {
            throw err;
        }
        throw new AppError(`カタログの取得に成功しましたが、対象が期待するカタログの種別ではありません(${typeof arg === 'string' ? 'ネームスペース: ' + arg : 'コード値: ' + arg}, 型: 一時的データ共有定義カタログ)`, 400, err);
    }
}

/**
 * アクターのカタログであるかを確認する
 * @param data
 * @param arg
 */
export async function checkActorCatalog (data: any, arg: number | string) {
    try {
        const domain = await transformAndValidate(Actor, data);
        if (Array.isArray(domain) !== Array.isArray(data)) {
            throw new AppError('配列データのパース結果が、配列ではありません', 500);
        }
        if (!Array.isArray(domain)) {
            if (!/^catalog\/ext\/[-._a-zA-Z0-9]+\/actor\//.test(domain.catalogItem.ns)) {
                throw new AppError(`アクターのネームスペースではありません（ネームスペース: ${domain.catalogItem.ns}, コード: ${arg}`, 400);
            }
        }
        return domain;
    } catch (err) {
        if (err instanceof AppError) {
            throw err;
        }
        throw new AppError(`カタログの取得に成功しましたが、対象が期待するカタログの種別ではありません(${typeof arg === 'string' ? 'ネームスペース: ' + arg : 'コード値: ' + arg}, 型: アクター)`, 400, err);
    }
}
