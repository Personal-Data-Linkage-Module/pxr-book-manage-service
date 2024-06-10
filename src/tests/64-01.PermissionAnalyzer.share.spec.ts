/* eslint-disable */
import { Application } from '../resources/config/Application';
import { IDataOperationRequest } from '../common/DataOperationRequest';
import PermissionAnalyzer from '../common/PermissionAnalyzer';
import { changeAgreement, changeAgreementVersion, changeConsentFlg, getAgreement, shareDatatype1000132_1, shareDatatype1000132_4, shareDatatype1000132_5, shareDatatype1000132_6, shareDatatype1000133_6, storeDatatype1000122_1, storeDatatype1000122_4, storeDatatype1000122_5, storeDatatype1000220_1 } from './accessor/AgreementAccessor';
import { changeMaxCatalogVersion, getCatalog, getNoDataOperationCatalog } from './accessor/CatalogAccessor';
import AppError from 'common/AppError';
import { getNoDataTypeShareRestrictionCatalogs, getNoShareRestrictionCatalogs, getShareRestrictionCatalogs } from './accessor/ShareRestrictionAccessor';
import Operator from '../resources/dto/OperatorReqDto';
import { Session } from './Session';
import { IPermissionResponse } from 'common/DataOperationResponse';

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
     * データ共有可否判定
     */
    describe('データ共有可否判定', () => {
        describe('共有(通常、App03)', () => {
            describe('共有定義の最新バージョン: v1 (同意要)、v1未同意(=非同意)', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'share', 1000130, false);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(1);
                });
                // リクエスト雛形
                const shareReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'SHARE_CONTINUOUS',
                    storedBy: null,
                    shareTo: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    dataType: {
                        type: 'document',
                        code: {
                            _value: 1000601,
                            _ver: 1
                        }
                    }
                };
                test('正常：データ種Av1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000601;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Av1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000611;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Av1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000621;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Av2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000611;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Av2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000621;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Av2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000601;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Bv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000602;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Bv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000612;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Bv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000622;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Bv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000612;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Bv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000622;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000603;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000613;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000623;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Dv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000624;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000603;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000613;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000623;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Dv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000624;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
            });
            describe('共有定義の最新バージョン: v1 (同意要)、v1同意', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'share', 1000130, true);
                    // 同意バージョン変更
                    changeAgreementVersion(1);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(1);
                });
                // リクエスト雛形
                const shareReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'SHARE_CONTINUOUS',
                    storedBy: null,
                    shareTo: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    dataType: {
                        type: 'document',
                        code: {
                            _value: 1000601,
                            _ver: 1
                        }
                    }
                };
                test('正常：データ種Av1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000601;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000611;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000621;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000611;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Av2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000621;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Av2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000601;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Bv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000602;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Bv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000612;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Bv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000622;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Bv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000612;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Bv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000622;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000603;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000613;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000623;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Dv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000624;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000603;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000613;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000623;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Dv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000624;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
            });
            describe('共有定義の最新バージョン: v2 (同意不要)、v1同意', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'share', 1000130, true);
                    // 同意バージョン変更
                    changeAgreementVersion(1);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(2);
                });
                // リクエスト雛形
                const shareReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'SHARE_CONTINUOUS',
                    storedBy: null,
                    shareTo: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    dataType: {
                        type: 'document',
                        code: {
                            _value: 1000601,
                            _ver: 1
                        }
                    }
                };
                test('正常：データ種Av1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000601;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000611;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000621;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000611;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000621;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000601;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Bv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000602;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Bv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000612;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Bv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000622;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Bv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000612;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Bv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000622;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000603;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000613;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000623;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Dv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000624;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000603;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000613;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000623;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Dv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000624;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
            });
            describe('共有定義の最新バージョン: v3 (同意不要)、v1同意', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'share', 1000130, true);
                    // 同意バージョン変更
                    changeAgreementVersion(1);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(3);
                });
                // リクエスト雛形
                const shareReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'SHARE_CONTINUOUS',
                    storedBy: null,
                    shareTo: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    dataType: {
                        type: 'document',
                        code: {
                            _value: 1000601,
                            _ver: 1
                        }
                    }
                };
                test('正常：データ種Av1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000601;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000611;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000621;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000611;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000621;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000601;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Bv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000602;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Bv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000612;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Bv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000622;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Bv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000612;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Bv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000622;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000603;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000613;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000623;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Dv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000624;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000603;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000613;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000623;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Dv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000624;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
            });
            describe('共有定義の最新バージョン: v4 (同意要)、v1同意', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'share', 1000130, true);
                    // 同意バージョン変更
                    changeAgreementVersion(1);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(4);
                });
                // リクエスト雛形
                const shareReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'SHARE_CONTINUOUS',
                    storedBy: null,
                    shareTo: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    dataType: {
                        type: 'document',
                        code: {
                            _value: 1000601,
                            _ver: 1
                        }
                    }
                };
                test('正常：データ種Av1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000601;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000611;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000621;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000611;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000621;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000601;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Bv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000602;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Bv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000612;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Bv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000622;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Bv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000612;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Bv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000622;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000603;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000613;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000623;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Dv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000624;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000603;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000613;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000623;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Dv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000624;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
            });
            describe('共有定義の最新バージョン: v4 (同意要)、v4同意', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'share', 1000130, true);
                    // 同意バージョン変更
                    changeAgreementVersion(4);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(4);
                });
                // リクエスト雛形
                const shareReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'SHARE_CONTINUOUS',
                    storedBy: null,
                    shareTo: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    dataType: {
                        type: 'document',
                        code: {
                            _value: 1000601,
                            _ver: 1
                        }
                    }
                };
                test('正常：データ種Av1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000601;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000611;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000621;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000611;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000621;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000601;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Bv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000602;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Bv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000612;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Bv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000622;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Bv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000612;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Bv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000622;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000603;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000613;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000623;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Dv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000624;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000603;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000613;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000623;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Dv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000624;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
            });
            describe('共有定義の最新バージョン: v5 (同意要)、非同意', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'share', 1000130, false);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(5);
                });
                // リクエスト雛形
                const shareReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'SHARE_CONTINUOUS',
                    storedBy: null,
                    shareTo: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    dataType: {
                        type: 'document',
                        code: {
                            _value: 1000601,
                            _ver: 1
                        }
                    }
                };
                test('正常：データ種Av1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000601;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Av1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000611;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Av1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000621;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Av2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000611;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Av2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000621;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Av2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000601;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Bv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000602;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Bv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000612;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Bv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000622;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Bv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000612;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Bv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000622;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000603;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000613;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000623;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Dv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000624;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000603;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000613;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000623;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Dv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000624;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
            });
            describe('共有定義の最新バージョン: v5 (同意要)、v4同意', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'share', 1000130, true);
                    // 同意バージョン変更
                    changeAgreementVersion(4);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(5);
                });
                // リクエスト雛形
                const shareReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'SHARE_CONTINUOUS',
                    storedBy: null,
                    shareTo: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    dataType: {
                        type: 'document',
                        code: {
                            _value: 1000601,
                            _ver: 1
                        }
                    }
                };
                test('正常：データ種Av1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000601;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000611;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000621;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000611;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000621;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000601;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Bv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000602;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Bv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000612;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Bv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000622;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Bv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000612;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Bv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000622;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000603;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000613;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000623;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Dv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000624;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000603;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000613;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000623;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Dv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000624;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
            });
            describe('共有定義の最新バージョン: v5 (同意要)、v5同意', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'share', 1000130, true);
                    // 同意バージョン変更
                    changeAgreementVersion(5);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(5);
                });
                // リクエスト雛形
                const shareReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'SHARE_CONTINUOUS',
                    storedBy: null,
                    shareTo: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    dataType: {
                        type: 'document',
                        code: {
                            _value: 1000601,
                            _ver: 1
                        }
                    }
                };
                test('正常：データ種Av1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000601;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000611;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000621;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000611;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000621;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000601;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Bv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000602;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Bv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000612;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Bv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000622;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Bv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000612;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Bv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000622;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Cv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000603;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Cv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000613;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Cv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000623;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Dv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000624;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000603;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000613;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000623;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Dv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000624;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
            });
            describe('共有定義の最新バージョン: v6 (同意不要)、v1同意', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'share', 1000130, true);
                    // 同意バージョン変更
                    changeAgreementVersion(1);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(6);
                });
                // リクエスト雛形
                const shareReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'SHARE_CONTINUOUS',
                    storedBy: null,
                    shareTo: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    dataType: {
                        type: 'document',
                        code: {
                            _value: 1000601,
                            _ver: 1
                        }
                    }
                };
                test('正常：データ種Av1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000601;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000611;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000621;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000611;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000621;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000601;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Bv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000602;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Bv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000612;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Bv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000622;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Bv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000612;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Bv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000622;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000603;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000613;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000623;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Dv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000624;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000603;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000613;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000623;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Dv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000624;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
            });
            describe('共有定義の最新バージョン: v6 (同意不要)、v5同意', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'share', 1000130, true);
                    // 同意バージョン変更
                    changeAgreementVersion(5);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(6);
                });
                // リクエスト雛形
                const shareReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'SHARE_CONTINUOUS',
                    storedBy: null,
                    shareTo: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    dataType: {
                        type: 'document',
                        code: {
                            _value: 1000601,
                            _ver: 1
                        }
                    }
                };
                test('正常：データ種Av1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000601;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000611;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000621;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000611;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000621;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000601;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Bv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000602;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Bv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000612;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Bv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000622;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Bv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000612;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Bv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000622;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Cv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000603;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Cv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000613;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Cv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000623;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Dv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000624;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000603;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000613;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000623;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Dv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000624;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
            });
            describe('共有定義の最新バージョン: v6 (同意不要)、非同意', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'share', 1000130, false);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(6);
                });
                // リクエスト雛形
                const shareReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'SHARE_CONTINUOUS',
                    storedBy: null,
                    shareTo: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    dataType: {
                        type: 'document',
                        code: {
                            _value: 1000601,
                            _ver: 1
                        }
                    }
                };
                test('正常：データ種Av1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000601;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Av1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000611;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Av1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000621;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Av2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000611;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Av2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000621;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Av2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000601;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Bv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000602;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Bv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000612;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Bv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000622;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Bv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000612;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Bv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000622;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000603;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000613;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000623;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Dv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000624;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000603;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000613;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000623;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Dv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000624;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
            });
        });
        describe('共有定義が分散, App04', () => {
            describe('共有定義の最新バージョン: v1 (同意要)、v1同意', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000111, 'share', 1000131, true);
                    changeAgreement(1000111, 'share', 1000132, true);
                    // 同意バージョン変更
                    changeAgreementVersion(1);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(1);
                });
                // リクエスト雛形
                const shareReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'SHARE_CONTINUOUS',
                    storedBy: null,
                    shareTo: {
                        actor: 1000101,
                        asset: 1000111
                    },
                    dataType: {
                        type: 'document',
                        code: {
                            _value: 1000501,
                            _ver: 1
                        }
                    }
                };
                test('正常：データ種Av1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000501;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([1000101, 1000201]);
                });
                test('正常：データ種Av1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000611;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000721;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
            });
            describe('共有定義ver: v6、v6同意、複数の共有定義に同一データ種あり、双方同意', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000111, 'share', 1000131, true);
                    changeAgreement(1000111, 'share', 1000132, true);
                    changeAgreement(1000111, 'share', 1000133, true);
                    // 同意バージョン変更
                    changeAgreementVersion(6);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(6);
                });
                afterAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000111, 'share', 1000133, false);
                });
                // リクエスト雛形
                const shareReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'SHARE_CONTINUOUS',
                    storedBy: null,
                    shareTo: {
                        actor: 1000101,
                        asset: 1000111
                    },
                    dataType: {
                        type: 'document',
                        code: {
                            _value: 1000703,
                            _ver: 2
                        }
                    }
                };
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000703;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000713;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000723;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
            });
            describe('共有定義ver: v6、v6同意、複数の共有定義に同一データ種あり、片方同意', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000111, 'share', 1000131, true);
                    changeAgreement(1000111, 'share', 1000132, false);
                    changeAgreement(1000111, 'share', 1000133, true);
                    // 同意バージョン変更
                    changeAgreementVersion(6);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(6);
                });
                afterAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000111, 'share', 1000133, false);
                });
                // リクエスト雛形
                const shareReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'SHARE_CONTINUOUS',
                    storedBy: null,
                    shareTo: {
                        actor: 1000101,
                        asset: 1000111
                    },
                    dataType: {
                        type: 'document',
                        code: {
                            _value: 1000703,
                            _ver: 2
                        }
                    }
                };
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000703;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000713;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000723;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
            });
            describe('共有定義ver: v6、v6同意、複数の共有定義に同一データ種あり、片方に個人同意時にデータ種除外', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000111, 'share', 1000131, true);
                    changeAgreement(1000111, 'share', 1000132, true);
                    changeAgreement(1000111, 'share', 1000133, true);
                    // 同意バージョン変更
                    changeAgreementVersion(6);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(6);
                    // 個人同意フラグ変更（1000122の方のみ個人同意フラグ変更）
                    changeConsentFlg(shareDatatype1000132_6, { _value: 1000703, _ver: 2 }, false);
                    changeConsentFlg(shareDatatype1000132_6, { _value: 1000713, _ver: 2 }, false);
                    changeConsentFlg(shareDatatype1000132_6, { _value: 1000723, _ver: 2 }, false);
                });
                afterAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000111, 'share', 1000133, false);
                    // 個人同意フラグ変更
                    changeConsentFlg(shareDatatype1000132_6, { _value: 1000703, _ver: 2 }, true);
                    changeConsentFlg(shareDatatype1000132_6, { _value: 1000713, _ver: 2 }, true);
                    changeConsentFlg(shareDatatype1000132_6, { _value: 1000723, _ver: 2 }, true);
                });
                // リクエスト雛形
                const shareReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'SHARE_CONTINUOUS',
                    storedBy: null,
                    shareTo: {
                        actor: 1000101,
                        asset: 1000111
                    },
                    dataType: {
                        type: 'document',
                        code: {
                            _value: 1000703,
                            _ver: 2
                        }
                    }
                };
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000703;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000713;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000723;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
            });
        });
        describe('個人同意時に除外, App04', () => {
            describe('共有定義の最新バージョン: v6 (同意不要)、v5同意', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000111, 'share', 1000131, true);
                    changeAgreement(1000111, 'share', 1000132, true);
                    // 同意バージョン変更
                    changeAgreementVersion(5);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(6);
                    // 個人同意フラグ変更
                    changeConsentFlg(shareDatatype1000132_1, { _value: 1000701, _ver: 1 }, false);
                    changeConsentFlg(shareDatatype1000132_4, { _value: 1000712, _ver: 1 }, false);
                    changeConsentFlg(shareDatatype1000132_5, { _value: 1000723, _ver: 1 }, false);
                });
                afterAll(async () => {
                    // 個人同意フラグ変更
                    changeConsentFlg(shareDatatype1000132_1, { _value: 1000701, _ver: 1 }, true);
                    changeConsentFlg(shareDatatype1000132_4, { _value: 1000712, _ver: 1 }, true);
                    changeConsentFlg(shareDatatype1000132_5, { _value: 1000723, _ver: 1 }, true);
                });
                // リクエスト雛形
                const shareReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'SHARE_CONTINUOUS',
                    storedBy: null,
                    shareTo: {
                        actor: 1000101,
                        asset: 1000111
                    },
                    dataType: {
                        type: 'document',
                        code: {
                            _value: 1000701,
                            _ver: 1
                        }
                    }
                };
                test('正常：データ種Av1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000701;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Av1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000711;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000621;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000711;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000721;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Av2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000701;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Bv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000702;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Bv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000712;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Bv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000722;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Bv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000712;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Bv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000722;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Cv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000703;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Cv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000713;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Cv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000723;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Dv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000724;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000703;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000713;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000723;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(false);
                expect(result.sourceActor).toBe(null);
                expect(result.prohibitedSourceActor).toBe(null);
                });
                test('正常：データ種Dv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000724;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
                describe('複数event、複数thingで別々に個人同意除外が指定されるケース', () => {
                    test('正常：複数thingが紐づくデータ種Ev1 event、一方のみ個人同意除外　可判定', async () => {
                        // 判定対象のリクエスト生成
                        shareReqApp03.dataType.type = 'event';
                        shareReqApp03.dataType.code._value = 1000714;
                        shareReqApp03.dataType.code._ver = 1;
                        // analyzerインスタンス生成
                        const operator = new Operator();
                        operator.setFromJson(Session.dataStoreGetApp);
                        const analyzer = PermissionAnalyzer
                            .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                            .setDataOperationType('SHARE_CONTINUOUS');
                        await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                        await analyzer.setAssetCatalog();
                        await analyzer.specifyTarget();

                        // 判定
                        let result: IPermissionResponse;
                        let error: AppError;
                        try {
                            result = await analyzer.isPermitted(shareReqApp03);
                        } catch (err) {
                            error = err;
                        }

                        // レスポンスチェック
                        expect(result.checkResult).toBe(true);
                        expect(result.sourceActor).toEqual([]);
                        expect(result.prohibitedSourceActor).toEqual([]);
                    });
                    test('正常：複数event配下にあるデータ種Fv1 thing 、一方のイベントでのみ個人同意除外　不可判定', async () => {
                        // 判定対象のリクエスト生成
                        shareReqApp03.dataType.type = 'thing';
                        shareReqApp03.dataType.code._value = 1000727;
                        shareReqApp03.dataType.code._ver = 1;
                        // analyzerインスタンス生成
                        const operator = new Operator();
                        operator.setFromJson(Session.dataStoreGetApp);
                        const analyzer = PermissionAnalyzer
                            .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                            .setDataOperationType('SHARE_CONTINUOUS');
                        await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                        await analyzer.setAssetCatalog();
                        await analyzer.specifyTarget();

                        // 判定
                        let result: IPermissionResponse;
                        let error: AppError;
                        try {
                            result = await analyzer.isPermitted(shareReqApp03);
                        } catch (err) {
                            error = err;
                        }

                        // レスポンスチェック
                        expect(result.checkResult).toBe(false);
                        expect(result.sourceActor).toBe(null);
                        expect(result.prohibitedSourceActor).toBe(null);
                    });
                });
            });
        });
        describe('共有元指定または共有制限定義によって共有元が制限されるケース', () => {
            beforeAll(async () => {
                // 同意状態変更
                changeAgreement(1000111, 'share', 1000131, true);
                changeAgreement(1000111, 'share', 1000132, true);
                // 同意バージョン変更
                changeAgreementVersion(5);
                // 同意カタログ最大バージョン変更
                changeMaxCatalogVersion(6);
            });
            // リクエスト雛形
            const shareReqApp03: IDataOperationRequest = {
                pxrId: 'pxrId01',
                operationType: 'SHARE_CONTINUOUS',
                storedBy: null,
                shareTo: {
                    actor: 1000101,
                    asset: 1000111
                },
                dataType: {
                    type: 'document',
                    code: {
                        _value: 1000501,
                        _ver: 1
                    }
                }
            };
            test('正常：共有元指定あり、document', async () => {
                // 判定対象のリクエスト生成
                shareReqApp03.dataType.type = 'document';
                shareReqApp03.dataType.code._value = 1000503;
                shareReqApp03.dataType.code._ver = 1;
                // analyzerインスタンス生成
                const operator = new Operator();
                operator.setFromJson(Session.dataStoreGetApp);
                const analyzer = PermissionAnalyzer
                    .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                    .setDataOperationType('SHARE_CONTINUOUS');
                await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                await analyzer.setAssetCatalog();
                await analyzer.specifyTarget();

                // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([1000201]);
                expect(result.prohibitedSourceActor).toEqual([]);
            });
            test('正常：共有元指定あり、event', async () => {
                // 判定対象のリクエスト生成
                shareReqApp03.dataType.type = 'event';
                shareReqApp03.dataType.code._value = 1000513;
                shareReqApp03.dataType.code._ver = 1;
                // analyzerインスタンス生成
                const operator = new Operator();
                operator.setFromJson(Session.dataStoreGetApp);
                const analyzer = PermissionAnalyzer
                    .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                    .setDataOperationType('SHARE_CONTINUOUS');
                await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                await analyzer.setAssetCatalog();
                await analyzer.specifyTarget();

                // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([1000201]);
                expect(result.prohibitedSourceActor).toEqual([]);
            });
            test('正常：共有元指定あり、event配下のthing', async () => {
                // 判定対象のリクエスト生成
                shareReqApp03.dataType.type = 'thing';
                shareReqApp03.dataType.code._value = 1000523;
                shareReqApp03.dataType.code._ver = 1;
                // analyzerインスタンス生成
                const operator = new Operator();
                operator.setFromJson(Session.dataStoreGetApp);
                const analyzer = PermissionAnalyzer
                    .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                    .setDataOperationType('SHARE_CONTINUOUS');
                await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                await analyzer.setAssetCatalog();
                await analyzer.specifyTarget();

                // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([1000201]);
                expect(result.prohibitedSourceActor).toEqual([]);
            });
            test('正常：共有元指定あり、独立して定義されているthing', async () => {
                // 判定対象のリクエスト生成
                shareReqApp03.dataType.type = 'thing';
                shareReqApp03.dataType.code._value = 1000524;
                shareReqApp03.dataType.code._ver = 1;
                // analyzerインスタンス生成
                const operator = new Operator();
                operator.setFromJson(Session.dataStoreGetApp);
                const analyzer = PermissionAnalyzer
                    .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                    .setDataOperationType('SHARE_CONTINUOUS');
                await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                await analyzer.setAssetCatalog();
                await analyzer.specifyTarget();

                // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([1000201]);
                expect(result.prohibitedSourceActor).toEqual([]);
            });
            test('正常：共有先制限あり、document、共有先アセットが許可リストにない', async () => {
                // 判定対象のリクエスト生成
                shareReqApp03.dataType.type = 'document';
                shareReqApp03.dataType.code._value = 1000501;
                shareReqApp03.dataType.code._ver = 1;
                // analyzerインスタンス生成
                const operator = new Operator();
                operator.setFromJson(Session.dataStoreGetApp);
                const analyzer = PermissionAnalyzer
                    .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                    .setDataOperationType('SHARE_CONTINUOUS');
                await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                await analyzer.setAssetCatalog();
                await analyzer.specifyTarget();

                // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([1000101, 1000201]);
            });
            test('正常：共有先制限あり、event、共有先アセットの所属リージョンが許可リストにない', async () => {
                // 判定対象のリクエスト生成
                shareReqApp03.dataType.type = 'event';
                shareReqApp03.dataType.code._value = 1000512;
                shareReqApp03.dataType.code._ver = 1;
                // analyzerインスタンス生成
                const operator = new Operator();
                operator.setFromJson(Session.dataStoreGetApp);
                const analyzer = PermissionAnalyzer
                    .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                    .setDataOperationType('SHARE_CONTINUOUS');
                await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                await analyzer.setAssetCatalog();
                await analyzer.specifyTarget();

                // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([1000101, 1000201]);
            });
            test('正常：共有先制限あり、thing、共有先アセットが禁止リストにある', async () => {
                // 判定対象のリクエスト生成
                shareReqApp03.dataType.type = 'thing';
                shareReqApp03.dataType.code._value = 1000522;
                shareReqApp03.dataType.code._ver = 1;
                // analyzerインスタンス生成
                const operator = new Operator();
                operator.setFromJson(Session.dataStoreGetApp);
                const analyzer = PermissionAnalyzer
                    .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                    .setDataOperationType('SHARE_CONTINUOUS');
                await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                await analyzer.setAssetCatalog();
                await analyzer.specifyTarget();

                // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([1000101]);
            });
        })
        describe('その他の条件指定', () => {
            beforeAll(async () => {
                // 同意状態変更
                changeAgreement(1000110, 'share', 1000130, true);
                // 同意バージョン変更
                changeAgreementVersion(1);
                // 同意カタログ最大バージョン変更
                changeMaxCatalogVersion(1);
            });
            // リクエスト雛形
            const shareReqApp03: IDataOperationRequest = {
                pxrId: 'pxrId01',
                operationType: 'SHARE_CONTINUOUS',
                storedBy: null,
                shareTo: {
                    actor: 1000101,
                    asset: 1000110
                },
                dataType: {
                    type: 'document',
                    code: {
                        _value: 1000501,
                        _ver: 1
                    }
                }
            };
            test('正常：共有同意あり、共有定義カタログ取得結果0件　不可判定', async () => {
                // 判定対象のリクエスト生成
                shareReqApp03.dataType.type = 'document';
                shareReqApp03.dataType.code._value = 1000501;
                shareReqApp03.dataType.code._ver = 1;
                // analyzerインスタンス生成
                const operator = new Operator();
                operator.setFromJson(Session.dataStoreGetApp);
                const analyzer = PermissionAnalyzer
                    .create(operator, getAgreement, getNoDataOperationCatalog, getShareRestrictionCatalogs)
                    .setDataOperationType('SHARE_CONTINUOUS');
                await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                await analyzer.setAssetCatalog();
                await analyzer.specifyTarget();

                // 判定
                let result: boolean;
                let error: AppError;
                try {
                    result = (await analyzer.isPermitted(shareReqApp03)).checkResult;
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result).toBe(false);
            });
            test('正常：共有制限定義カタログがない　可判定', async () => {
                // 判定対象のリクエスト生成
                shareReqApp03.dataType.type = 'document';
                shareReqApp03.dataType.code._value = 1000501;
                shareReqApp03.dataType.code._ver = 1;
                // analyzerインスタンス生成
                const operator = new Operator();
                operator.setFromJson(Session.dataStoreGetApp);
                const analyzer = PermissionAnalyzer
                    .create(operator, getAgreement, getCatalog, getNoShareRestrictionCatalogs)
                    .setDataOperationType('SHARE_CONTINUOUS');
                await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                await analyzer.setAssetCatalog();
                await analyzer.specifyTarget();

                // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                    result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
            });
            test('正常：共有制限定義カタログは存在するが各データ種の定義がnull　可判定', async () => {
                // 判定対象のリクエスト生成
                shareReqApp03.dataType.type = 'document';
                shareReqApp03.dataType.code._value = 1000501;
                shareReqApp03.dataType.code._ver = 1;
                // analyzerインスタンス生成
                const operator = new Operator();
                operator.setFromJson(Session.dataStoreGetApp);
                const analyzer = PermissionAnalyzer
                    .create(operator, getAgreement, getCatalog, getNoDataTypeShareRestrictionCatalogs)
                    .setDataOperationType('SHARE_CONTINUOUS');
                await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                await analyzer.setAssetCatalog();
                await analyzer.specifyTarget();

                // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                    result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
            });
            test('正常：オペレータ種別がアプリケーション　可判定', async () => {
                // 判定対象のリクエスト生成
                shareReqApp03.dataType.type = 'thing';
                shareReqApp03.dataType.code._value = 1000521;
                shareReqApp03.dataType.code._ver = 1;
                // analyzerインスタンス生成
                const operator = new Operator();
                operator.setFromJson(Session.dataStoreGetApp);
                const analyzer = PermissionAnalyzer
                    .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                    .setDataOperationType('SHARE_CONTINUOUS');
                await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                await analyzer.setAssetCatalog();
                await analyzer.specifyTarget();

                // 判定
                let result: boolean;
                let error: AppError;
                try {
                    result = (await analyzer.isPermitted(shareReqApp03)).checkResult;
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result).toBe(true);
            });
            describe('蓄積同意が0件', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'store', 1000120, false);
                    changeAgreement(1000111, 'store', 1000121, false);
                    changeAgreement(1000111, 'store', 1000122, false);
                    changeAgreement(1000111, 'store', 1000123, false);
                    changeAgreement(1000210, 'store', 1000220, false);
                    changeAgreement(1000211, 'store', 1000221, false);
                    changeAgreement(1000211, 'store', 1000222, false);
                    // 同意バージョン変更
                    changeAgreementVersion(5);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(6);
                });
                afterAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'store', 1000120, true);
                    changeAgreement(1000111, 'store', 1000121, true);
                    changeAgreement(1000111, 'store', 1000122, true);
                    changeAgreement(1000111, 'store', 1000123, true);
                    changeAgreement(1000210, 'store', 1000220, true);
                    changeAgreement(1000211, 'store', 1000221, true);
                    changeAgreement(1000211, 'store', 1000222, true);
                });
                // リクエスト雛形
                const shareReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'SHARE_CONTINUOUS',
                    storedBy: null,
                    shareTo: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    dataType: {
                        type: 'document',
                        code: {
                            _value: 1000703,
                            _ver: 2
                        }
                    }
                };
                test('正常：蓄積同意が0件', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000503;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                let result: IPermissionResponse;
                let error: AppError;
                try {
                   result = await analyzer.isPermitted(shareReqApp03);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result.checkResult).toBe(true);
                expect(result.sourceActor).toEqual([]);
                expect(result.prohibitedSourceActor).toEqual([]);
                });
            });
        });
    });
});
