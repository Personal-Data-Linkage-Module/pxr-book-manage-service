/* eslint-disable */
import { Application } from '../resources/config/Application';
import Config from '../common/Config';
import { IDataOperationRequest } from '../common/DataOperationRequest';
import PermissionAnalyzer from '../common/PermissionAnalyzer';
import { changeAgreement, changeAgreementVersion, changeConsentFlg, getAgreement, storeDatatype1000122_1, storeDatatype1000122_4, storeDatatype1000122_5, storeDatatype1000122_6, storeDatatype1000123_6, storeDatatype1000220_1 } from './accessor/AgreementAccessor';
import { changeMaxCatalogVersion, getCatalog, getNoDataOperationCatalog } from './accessor/CatalogAccessor';
import AppError from 'common/AppError';
import { Session } from './Session';
import Operator from '../resources/dto/OperatorReqDto';
const Message = Config.ReadConfig('./config/message.json');

/* application.logの出力を確認する際のみコメントアウトを解除する
// 対象アプリケーションを取得
const app = new Application();

// サーバをlisten
app.start();
*/

/**
 * book-mange API のユニットテスト
 */
describe('book-mange API', () => {
    /**
     * データ蓄積可否判定
     */
    describe('データ蓄積可否判定', () => {
        describe('蓄積(通常、App03)', () => {
            describe('蓄積定義の最新バージョン: v1 (同意要)、v1未同意(=非同意)', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'store', 1000120, false);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(1);
                });
                // リクエスト雛形
                const storeReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE',
                    storedBy: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    shareTo: null,
                    dataType: {
                        type: null,
                        code: {
                            _value: 1000601,
                            _ver: 1
                        }
                    }
                };
                test('正常：データ種Av1 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000601;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Av1 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000611;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Av1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000621;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Av2 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000611;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Av2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000621;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Av2 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000601;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Bv1 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000602;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Bv1 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000612;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Bv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000622;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Bv2 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000612;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Bv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000622;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv1 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000603;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv1 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000613;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000623;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Dv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000624;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000603;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000613;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000623;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Dv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000624;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
            });
            describe('蓄積定義の最新バージョン: v1 (同意要)、v1同意', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'store', 1000120, true);
                    // 同意バージョン変更
                    changeAgreementVersion(1);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(1);
                });
                // リクエスト雛形
                const storeReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE',
                    storedBy: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    shareTo: null,
                    dataType: {
                        type: null,
                        code: {
                            _value: 1000601,
                            _ver: 1
                        }
                    }
                };
                test('正常：データ種Av1 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000601;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av1 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000611;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000621;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av2 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000611;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Av2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000621;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Av2 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000601;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Bv1 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000602;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Bv1 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000612;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Bv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000622;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Bv2 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000612;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Bv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000622;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv1 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000603;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv1 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000613;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000623;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Dv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000624;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000603;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000613;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000623;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Dv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000624;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
            });
            describe('蓄積定義の最新バージョン: v2 (同意不要)、v1同意', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'store', 1000120, true);
                    // 同意バージョン変更
                    changeAgreementVersion(1);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(2);
                });
                // リクエスト雛形
                const storeReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE',
                    storedBy: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    shareTo: null,
                    dataType: {
                        type: null,
                        code: {
                            _value: 1000601,
                            _ver: 1
                        }
                    }
                };
                test('正常：データ種Av1 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000601;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av1 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000611;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000621;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av2 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000611;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000621;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av2 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000601;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Bv1 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000602;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Bv1 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000612;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Bv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000622;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Bv2 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000612;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Bv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000622;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv1 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000603;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv1 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000613;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000623;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Dv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000624;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000603;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000613;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000623;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Dv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000624;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
            });
            describe('蓄積定義の最新バージョン: v3 (同意不要)、v1同意', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'store', 1000120, true);
                    // 同意バージョン変更
                    changeAgreementVersion(1);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(3);
                });
                // リクエスト雛形
                const storeReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE',
                    storedBy: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    shareTo: null,
                    dataType: {
                        type: null,
                        code: {
                            _value: 1000601,
                            _ver: 1
                        }
                    }
                };
                test('正常：データ種Av1 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000601;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av1 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000611;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000621;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av2 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000611;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000621;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av2 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000601;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Bv1 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000602;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Bv1 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000612;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Bv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000622;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Bv2 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000612;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Bv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000622;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv1 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000603;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv1 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000613;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000623;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Dv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000624;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000603;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000613;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000623;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000624;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
            });
            describe('蓄積定義の最新バージョン: v4 (同意要)、v1同意', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'store', 1000120, true);
                    // 同意バージョン変更
                    changeAgreementVersion(1);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(4);
                });
                // リクエスト雛形
                const storeReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE',
                    storedBy: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    shareTo: null,
                    dataType: {
                        type: null,
                        code: {
                            _value: 1000601,
                            _ver: 1
                        }
                    }
                };
                test('正常：データ種Av1 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000601;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av1 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000611;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000621;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av2 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000611;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000621;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av2 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000601;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Bv1 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000602;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Bv1 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000612;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Bv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000622;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Bv2 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000612;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Bv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000622;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv1 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000603;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv1 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000613;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000623;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Dv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000624;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000603;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000613;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000623;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Dv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000624;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
            });
            describe('蓄積定義の最新バージョン: v4 (同意要)、v4同意', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'store', 1000120, true);
                    // 同意バージョン変更
                    changeAgreementVersion(4);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(4);
                });
                // リクエスト雛形
                const storeReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE',
                    storedBy: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    shareTo: null,
                    dataType: {
                        type: null,
                        code: {
                            _value: 1000601,
                            _ver: 1
                        }
                    }
                };
                test('正常：データ種Av1 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000601;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av1 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000611;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000621;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av2 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000611;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000621;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av2 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000601;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Bv1 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000602;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Bv1 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000612;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Bv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000622;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Bv2 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000612;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Bv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000622;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv1 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000603;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv1 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000613;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000623;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Dv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000624;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000603;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000613;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000623;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Dv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000624;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
            });
            describe('蓄積定義の最新バージョン: v5 (同意要)、非同意', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'store', 1000120, false);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(5);
                });
                // リクエスト雛形
                const storeReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE',
                    storedBy: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    shareTo: null,
                    dataType: {
                        type: null,
                        code: {
                            _value: 1000601,
                            _ver: 1
                        }
                    }
                };
                test('正常：データ種Av1 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000601;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Av1 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000611;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Av1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000621;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Av2 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000611;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Av2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000621;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Av2 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000601;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Bv1 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000602;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Bv1 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000612;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Bv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000622;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Bv2 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000612;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Bv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000622;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv1 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000603;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv1 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000613;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000623;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Dv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000624;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000603;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000613;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000623;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Dv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000624;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
            });
            describe('蓄積定義の最新バージョン: v5 (同意要)、v4同意', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'store', 1000120, true);
                    // 同意バージョン変更
                    changeAgreementVersion(4);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(5);
                });
                // リクエスト雛形
                const storeReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE',
                    storedBy: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    shareTo: null,
                    dataType: {
                        type: null,
                        code: {
                            _value: 1000601,
                            _ver: 1
                        }
                    }
                };
                test('正常：データ種Av1 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000601;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av1 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000611;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000621;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av2 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000611;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000621;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av2 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000601;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Bv1 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000602;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Bv1 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000612;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Bv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000622;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Bv2 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000612;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Bv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000622;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv1 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000603;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv1 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000613;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000623;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Dv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000624;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000603;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000613;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000623;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Dv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000624;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
            });
            describe('蓄積定義の最新バージョン: v5 (同意要)、v5同意', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'store', 1000120, true);
                    // 同意バージョン変更
                    changeAgreementVersion(5);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(5);
                });
                // リクエスト雛形
                const storeReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE',
                    storedBy: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    shareTo: null,
                    dataType: {
                        type: null,
                        code: {
                            _value: 1000601,
                            _ver: 1
                        }
                    }
                };
                test('正常：データ種Av1 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000601;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av1 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000611;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000621;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av2 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000611;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000621;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av2 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000601;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Bv1 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000602;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Bv1 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000612;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Bv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000622;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Bv2 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000612;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Bv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000622;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Cv1 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000603;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Cv1 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000613;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Cv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000623;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Dv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000624;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000603;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000613;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000623;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Dv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000624;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
            });
            describe('蓄積定義の最新バージョン: v6 (同意不要)、v1同意', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'store', 1000120, true);
                    // 同意バージョン変更
                    changeAgreementVersion(1);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(6);
                });
                // リクエスト雛形
                const storeReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE',
                    storedBy: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    shareTo: null,
                    dataType: {
                        type: null,
                        code: {
                            _value: 1000601,
                            _ver: 1
                        }
                    }
                };
                test('正常：データ種Av1 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000601;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av1 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000611;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000621;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av2 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000611;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000621;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av2 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000601;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Bv1 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000602;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Bv1 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000612;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Bv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000622;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Bv2 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000612;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Bv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000622;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv1 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000603;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv1 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000613;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000623;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Dv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000624;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000603;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000613;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000623;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Dv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000624;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
            });
            describe('蓄積定義の最新バージョン: v6 (同意不要)、v5同意', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'store', 1000120, true);
                    // 同意バージョン変更
                    changeAgreementVersion(5);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(6);
                });
                // リクエスト雛形
                const storeReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE',
                    storedBy: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    shareTo: null,
                    dataType: {
                        type: null,
                        code: {
                            _value: 1000601,
                            _ver: 1
                        }
                    }
                };
                test('正常：データ種Av1 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000601;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av1 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000611;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000621;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av2 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000611;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000621;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av2 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000601;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Bv1 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000602;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Bv1 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000612;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Bv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000622;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Bv2 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000612;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Bv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000622;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Cv1 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000603;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Cv1 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000613;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Cv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000623;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Dv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000624;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000603;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000613;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000623;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Dv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000524;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
            });
            describe('蓄積定義の最新バージョン: v6 (同意不要)、非同意', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'store', 1000120, false);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(6);
                });
                // リクエスト雛形
                const storeReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE',
                    storedBy: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    shareTo: null,
                    dataType: {
                        type: null,
                        code: {
                            _value: 1000601,
                            _ver: 1
                        }
                    }
                };
                test('正常：データ種Av1 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000601;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Av1 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000611;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Av1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000621;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Av2 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000611;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Av2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000621;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Av2 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000601;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Bv1 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000602;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Bv1 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000612;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Bv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000622;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Bv2 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000612;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Bv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000622;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv1 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000603;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv1 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000613;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000623;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Dv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000624;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000603;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000613;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000623;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Dv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000624;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
            });
        });
        describe('蓄積(分散した蓄積定義、App04)', () => {
            describe('蓄積定義の最新バージョン: v1 (同意要)、v1同意', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'store', 1000121, true);
                    changeAgreement(1000110, 'store', 1000122, true);
                    // 同意バージョン変更
                    changeAgreementVersion(1);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(1);
                });
                // リクエスト雛形
                const storeReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE',
                    storedBy: {
                        actor: 1000101,
                        asset: 1000111
                    },
                    shareTo: null,
                    dataType: {
                        type: null,
                        code: {
                            _value: 1000501,
                            _ver: 1
                        }
                    }
                };
                test('正常：データ種Av1 document1', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000501;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av1 event1', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000511;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av1 thing1', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000521;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av1 document2', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000701;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av1 event2', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000711;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av1 thing2', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000721;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
            });
            describe('蓄積定義ver: v6、v6同意、複数の蓄積定義に同一データ種あり', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'store', 1000121, true);
                    changeAgreement(1000110, 'store', 1000122, true);
                    changeAgreement(1000110, 'store', 1000123, true);
                    // 同意バージョン変更
                    changeAgreementVersion(6);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(6);
                });
                afterAll(async () => {
                    // 同意状態変
                    changeAgreement(1000110, 'store', 1000123, false);
                });
                // リクエスト雛形
                const storeReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE',
                    storedBy: {
                        actor: 1000101,
                        asset: 1000111
                    },
                    shareTo: null,
                    dataType: {
                        type: null,
                        code: {
                            _value: 1000723,
                            _ver: 2
                        }
                    }
                };
                test('正常：データ種Cv2, 双方に同意', async () => {

                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Cv2, 片方に同意', async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'store', 1000121, true);
                    changeAgreement(1000110, 'store', 1000122, false);
                    changeAgreement(1000110, 'store', 1000123, true);

                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Cv2, 双方に同意、片方に個人同意時にデータ種除外', async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'store', 1000121, true);
                    changeAgreement(1000110, 'store', 1000122, true);
                    changeAgreement(1000110, 'store', 1000123, true);
                    // 同意バージョン変更
                    changeAgreementVersion(6);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(6);
                    // 個人同意フラグ変更（1000122の方のみ個人同意フラグ変更）
                    changeConsentFlg(storeDatatype1000122_6, { _value: 1000723, _ver: 2 }, false);
                    
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    } finally {
                        // 個人同意フラグ変更
                        changeConsentFlg(storeDatatype1000122_6, { _value: 1000723, _ver: 2 }, true);
                        changeConsentFlg(storeDatatype1000123_6, { _value: 1000723, _ver: 2 }, true);
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
            });
        });
        describe('蓄積(個人同意時に一部データ種を除外、App04)', () => {
            describe('蓄積定義の最新バージョン: v6 (同意不要)、v5同意', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'store', 1000122, true);
                    // 同意バージョン変更
                    changeAgreementVersion(5);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(6);
                    // 個人同意フラグ変更
                    changeConsentFlg(storeDatatype1000122_1, { _value: 1000701, _ver: 1 }, false);
                    changeConsentFlg(storeDatatype1000122_4, { _value: 1000712, _ver: 1 }, false);
                    changeConsentFlg(storeDatatype1000122_5, { _value: 1000713, _ver: 1 }, false);
                    changeConsentFlg(storeDatatype1000122_5, { _value: 1000723, _ver: 1 }, false);
                });
                afterAll(async () => {
                    // 個人同意フラグ変更
                    changeConsentFlg(storeDatatype1000122_1, { _value: 1000701, _ver: 1 }, true);
                    changeConsentFlg(storeDatatype1000122_4, { _value: 1000712, _ver: 1 }, true);
                    changeConsentFlg(storeDatatype1000122_5, { _value: 1000713, _ver: 1 }, true);
                    changeConsentFlg(storeDatatype1000122_5, { _value: 1000723, _ver: 1 }, true);
                });
                // リクエスト雛形
                const storeReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE',
                    storedBy: {
                        actor: 1000101,
                        asset: 1000111
                    },
                    shareTo: null,
                    dataType: {
                        type: null,
                        code: {
                            _value: 1000701,
                            _ver: 1
                        }
                    }
                };
                test('正常：データ種Av1 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000701;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Av1 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000711;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000721;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av2 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000711;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000721;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Av2 Document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000701;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Bv1 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000702;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Bv1 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000712;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Bv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000722;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Bv2 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000712;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Bv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000722;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Cv1 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000703;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Cv1 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000713;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000723;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Dv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000724;
                    storeReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000703;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000713;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000723;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(false);
                });
                test('正常：データ種Dv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    storeReqApp03.dataType.code._value = 1000724;
                    storeReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: boolean;
                    let error: AppError;
                    try {
                        result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toBe(true);
                });
                describe('複数event、複数thingで別々に個人同意除外が指定されるケース', () => {
                        test('正常：複数thingが紐づくデータ種Ev1 event、一方のみ個人同意除外　可判定', async () => {
                        // 判定対象のリクエスト生成
                        storeReqApp03.dataType.code._value = 1000714;
                        storeReqApp03.dataType.code._ver = 1;
                        // analyzerインスタンス生成
                        const operator = new Operator();
                        operator.setFromJson(Session.dataStoreGetApp);
                        const analyzer = PermissionAnalyzer
                            .create(operator, getAgreement, getCatalog)
                            .setDataOperationType('STORE');
                        await analyzer.setAgreement('pxrId01', 'STORE', null);
                        await analyzer.setAssetCatalog();
                        await analyzer.specifyTarget();

                        // 判定
                        let result: boolean;
                        let error: AppError;
                        try {
                            result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                        } catch (err) {
                            error = err;
                        }

                        // レスポンスチェック
                        expect(result).toBe(true);
                    });
                    test('正常：複数event配下にあるデータ種Fv1 thing 、一方のイベントでのみ個人同意除外　不可判定', async () => {
                        // 判定対象のリクエスト生成
                        storeReqApp03.dataType.code._value = 1000727;
                        storeReqApp03.dataType.code._ver = 1;
                        // analyzerインスタンス生成
                        const operator = new Operator();
                        operator.setFromJson(Session.dataStoreGetApp);
                        const analyzer = PermissionAnalyzer
                            .create(operator, getAgreement, getCatalog)
                            .setDataOperationType('STORE');
                        await analyzer.setAgreement('pxrId01', 'STORE', null);
                        await analyzer.setAssetCatalog();
                        await analyzer.specifyTarget();

                        // 判定
                        let result: boolean;
                        let error: AppError;
                        try {
                            result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                        } catch (err) {
                            error = err;
                        }

                        // レスポンスチェック
                        expect(result).toBe(false);
                    });
                });
            });
        });
        describe('その他の条件指定', () => {
            beforeAll(async () => {
                // 同意状態変更
                changeAgreement(1000110, 'store', 1000120, true);
                // 同意バージョン変更
                changeAgreementVersion(1);
                // 同意カタログ最大バージョン変更
                changeMaxCatalogVersion(1);
            });
            // リクエスト雛形
            const storeReqApp03: IDataOperationRequest = {
                pxrId: 'pxrId01',
                operationType: 'STORE',
                storedBy: {
                    actor: 1000101,
                    asset: 1000110
                },
                shareTo: null,
                dataType: {
                    type: null,
                    code: {
                        _value: 1000501,
                        _ver: 1
                    }
                }
            };
            test('正常：蓄積同意あり、蓄積定義カタログ取得結果0件　不可判定', async () => {
                // 判定対象のリクエスト生成
                storeReqApp03.dataType.code._value = 1000501;
                storeReqApp03.dataType.code._ver = 1;
                // analyzerインスタンス生成
                const operator = new Operator();
                operator.setFromJson(Session.dataStoreGetApp);
                const analyzer = PermissionAnalyzer
                    .create(operator, getAgreement, getNoDataOperationCatalog)
                    .setDataOperationType('STORE');
                await analyzer.setAgreement('pxrId01', 'STORE', null);
                await analyzer.setAssetCatalog();
                await analyzer.specifyTarget();

                // 判定
                let result: boolean;
                let error: AppError;
                try {
                    result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result).toBe(false);
            });
            test('正常：オペレータ種別がアプリケーション　可判定', async () => {
                // 判定対象のリクエスト生成
                storeReqApp03.dataType.code._value = 1000521;
                storeReqApp03.dataType.code._ver = 1;
                // analyzerインスタンス生成
                const operator = new Operator();
                operator.setFromJson(Session.dataStoreGetApp);
                const analyzer = PermissionAnalyzer
                    .create(operator, getAgreement, getCatalog)
                    .setDataOperationType('STORE');
                await analyzer.setAgreement('pxrId01', 'STORE', null);
                await analyzer.setAssetCatalog();
                await analyzer.specifyTarget();

                // 判定
                let result: boolean;
                let error: AppError;
                try {
                    result = (await analyzer.isPermitted(storeReqApp03)).checkResult;
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result).toBe(true);
            });
        });
    });
});
