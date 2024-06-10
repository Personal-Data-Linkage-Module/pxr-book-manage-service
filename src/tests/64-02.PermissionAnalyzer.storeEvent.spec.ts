/* eslint-disable */
import { Application } from '../resources/config/Application';
import Config from '../common/Config';
import { IDataOperationRequest } from '../common/DataOperationRequest';
import PermissionAnalyzer from '../common/PermissionAnalyzer';
import { changeAgreement, changeAgreementVersion, changeConsentFlg, getAgreement, shareDatatype1000132_1, shareDatatype1000132_4, shareDatatype1000132_5, storeDatatype1000122_1, storeDatatype1000122_4, storeDatatype1000122_5, storeDatatype1000220_1 } from './accessor/AgreementAccessor';
import { changeMaxCatalogVersion, getCatalog } from './accessor/CatalogAccessor';
import AppError from 'common/AppError';
import { getShareRestrictionCatalogs } from './accessor/ShareRestrictionAccessor';
import { IAllDataOperationRequestResponse} from 'common/DataOperationResponse';
import { getStoreEventNotifications } from './accessor/StoreEventNotificationAccessor';
import Operator from '../resources/dto/OperatorReqDto';
import { Session } from './Session';

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
     * 蓄積イベント通知可否判定
     */
    describe('蓄積イベント通知可否判定', () => {
        describe('蓄積イベント通知(通常、App03)', () => {
            describe('共有定義の最新バージョン: v1 (同意要)、非同意', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'share', 1000130, false);
                    changeAgreement(1000111, 'share', 1000131, false);
                    changeAgreement(1000111, 'share', 1000132, false);

                    changeAgreement(1000210, 'share', 1000230, false);
                    changeAgreement(1000211, 'share', 1000231, false);
                    changeAgreement(1000211, 'share', 1000232, false);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(1);
                });
                // リクエスト雛形
                const shareReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE_EVENT',
                    storedBy: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    shareTo: null,
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
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Av1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000511;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Av1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000521;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Av2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000511;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Av2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000521;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Av2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000501;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000502;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000512;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000522;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000512;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000522;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000503;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000513;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000523;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Dv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000524;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000503;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000513;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000523;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Dv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000524;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
            });
            describe('共有定義の最新バージョン: v1 (同意要)、v1同意', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'share', 1000130, true);
                    changeAgreement(1000111, 'share', 1000131, true);
                    changeAgreement(1000111, 'share', 1000132, true);

                    changeAgreement(1000210, 'share', 1000230, true);
                    changeAgreement(1000211, 'share', 1000231, true);
                    changeAgreement(1000211, 'share', 1000232, true);
                    // 同意バージョン変更
                    changeAgreementVersion(1);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(1);
                });
                // リクエスト雛形
                const shareReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE_EVENT',
                    storedBy: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    shareTo: null,
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
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }
                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000501,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 1
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: {
                                _value: 1000501,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 1
                            }
                        }
                    ]);
                });
                test('正常：データ種Av1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000511;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    const asset = analyzer.getAsset();

                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 1
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 1
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 1
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 1
                            }
                        }
                    ]);
                });
                test('正常：データ種Av1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000521;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 1
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 1
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 1
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 1
                            }
                        }
                    ]);
                });
                test('正常：データ種Av2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000511;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Av2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000521;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Av2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000501;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000502;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000512;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000522;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000512;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000522;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000503;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000513;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000523;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Dv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000524;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000503;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000513;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000523;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Dv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000524;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
            });
            describe('共有定義の最新バージョン: v2 (同意不要)、v1同意', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'share', 1000130, true);
                    changeAgreement(1000111, 'share', 1000131, true);
                    changeAgreement(1000111, 'share', 1000132, true);

                    changeAgreement(1000210, 'share', 1000230, true);
                    changeAgreement(1000211, 'share', 1000231, true);
                    changeAgreement(1000211, 'share', 1000232, true);
                    // 同意バージョン変更
                    changeAgreementVersion(1);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(2);
                });
                // リクエスト雛形
                const shareReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE_EVENT',
                    storedBy: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    shareTo: null,
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
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000501,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 2
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: {
                                _value: 1000501,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 2
                            }
                        }
                    ]);
                });
                test('正常：データ種Av1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000511;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 2
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 2
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 2
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 2
                            }
                        },                    ]);
                });
                test('正常：データ種Av1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000521;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 2
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 2
                            }
                        },                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 2
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 2
                            }
                        },                    ]);
                });
                test('正常：データ種Av2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000511;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 2
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 2
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 2
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 2
                            }
                        },                    ]);
                });
                test('正常：データ種Av2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000521;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 2
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 2
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 2
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 2
                            }
                        },                    ]);
                });
                test('正常：データ種Av2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000501;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000502;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000512;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000522;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000512;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000522;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000503;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000513;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000523;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種D1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000524;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000503;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000513;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000523;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Dv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000524;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
            });
            describe('共有定義の最新バージョン: v3 (同意不要)、v1同意', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'share', 1000130, true);
                    changeAgreement(1000111, 'share', 1000131, true);
                    changeAgreement(1000111, 'share', 1000132, true);

                    changeAgreement(1000210, 'share', 1000230, true);
                    changeAgreement(1000211, 'share', 1000231, true);
                    changeAgreement(1000211, 'share', 1000232, true);
                    // 同意バージョン変更
                    changeAgreementVersion(1);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(3);
                });
                // リクエスト雛形
                const shareReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE_EVENT',
                    storedBy: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    shareTo: null,
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
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000501,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: {
                                _value: 1000501,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 3
                            }
                        }
                    ]);
                });
                test('正常：データ種Av1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000511;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 3
                            }
                        },                    ]);
                });
                test('正常：データ種Av1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000521;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 3
                            }
                        }
                    ]);
                });
                test('正常：データ種Av2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000511;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 3
                            }
                        }
                    ]);
                });
                test('正常：データ種Av2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000521;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 3
                            }
                        }
                    ]);
                });
                test('正常：データ種Av2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000501;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000501,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: {
                                _value: 1000501,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000501,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: {
                                _value: 1000501,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 3
                            }
                        }
                    ]);
                });
                test('正常：データ種Bv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000502;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000512;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000522;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000512;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000522;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000503;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000513;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000523;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Dv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000524;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000503;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000513;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000523;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Dv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000524;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
            });
            describe('共有定義の最新バージョン: v4 (同意要)、v1同意', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'share', 1000130, true);
                    changeAgreement(1000111, 'share', 1000131, true);
                    changeAgreement(1000111, 'share', 1000132, true);

                    changeAgreement(1000210, 'share', 1000230, true);
                    changeAgreement(1000211, 'share', 1000231, true);
                    changeAgreement(1000211, 'share', 1000232, true);
                    // 同意バージョン変更
                    changeAgreementVersion(1);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(4);
                });
                // リクエスト雛形
                const shareReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE_EVENT',
                    storedBy: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    shareTo: null,
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
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000501,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: {
                                _value: 1000501,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 3
                            }
                        }
                    ]);
                });
                test('正常：データ種Av1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000511;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 3
                            }
                        }
                    ]);
                });
                test('正常：データ種Av1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000521;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 3
                            }
                        }
                    ]);
                });
                test('正常：データ種Av2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000511;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 3
                            }
                        }
                    ]);
                });
                test('正常：データ種Av2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000521;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 3
                            }
                        }
                    ]);
                });
                test('正常：データ種Av2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000501;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000501,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: {
                                _value: 1000501,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000501,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: {
                                _value: 1000501,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 3
                            }
                        }
                    ]);
                });
                test('正常：データ種Bv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000502;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000512;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000522;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000512;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000522;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000503;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000513;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000523;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Dv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000524;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000503;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000513;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000523;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Dv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000524;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
            });
            describe('共有定義の最新バージョン: v4 (同意要)、v4同意', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'share', 1000130, true);
                    changeAgreement(1000111, 'share', 1000131, true);
                    changeAgreement(1000111, 'share', 1000132, true);

                    changeAgreement(1000210, 'share', 1000230, true);
                    changeAgreement(1000211, 'share', 1000231, true);
                    changeAgreement(1000211, 'share', 1000232, true);
                    // 同意バージョン変更
                    changeAgreementVersion(4);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(4);
                });
                // リクエスト雛形
                const shareReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE_EVENT',
                    storedBy: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    shareTo: null,
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
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000501,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: {
                                _value: 1000501,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 4
                            }
                        }
                    ]);
                });
                test('正常：データ種Av1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000511;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000111
                            },
                            storeEventNotificationCode: {
                                _value: 1000151,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000211
                            },
                            storeEventNotificationCode: {
                                _value: 1000251,
                                _ver: 4
                            }
                        }
                    ]);
                });
                test('正常：データ種Av1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000521;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000111
                            },
                            storeEventNotificationCode: {
                                _value: 1000151,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000211
                            },
                            storeEventNotificationCode: {
                                _value: 1000251,
                                _ver: 4
                            }
                        }
                    ]);
                });
                test('正常：データ種Av2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000511;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000111
                            },
                            storeEventNotificationCode: {
                                _value: 1000151,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000211
                            },
                            storeEventNotificationCode: {
                                _value: 1000251,
                                _ver: 4
                            }
                        }
                    ]);
                });
                test('正常：データ種Av2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000521;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000111
                            },
                            storeEventNotificationCode: {
                                _value: 1000151,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000211
                            },
                            storeEventNotificationCode: {
                                _value: 1000251,
                                _ver: 4
                            }
                        }
                    ]);
                });
                test('正常：データ種Av2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000501;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000501,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: {
                                _value: 1000501,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000501,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000111
                            },
                            storeEventNotificationCode: {
                                _value: 1000151,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000501,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: {
                                _value: 1000501,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000501,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000211
                            },
                            storeEventNotificationCode: {
                                _value: 1000251,
                                _ver: 4
                            }
                        }
                    ]);
                });
                test('正常：データ種Bv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000502;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000502,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: {
                                _value: 1000502,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000502,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000111
                            },
                            storeEventNotificationCode: {
                                _value: 1000151,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000502,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: {
                                _value: 1000502,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000502,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000211
                            },
                            storeEventNotificationCode: {
                                _value: 1000251,
                                _ver: 4
                            }
                        }
                    ]);
                });
                test('正常：データ種Bv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000512;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000512,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000512,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000512,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000512,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 4
                            }
                        }
                    ]);
                });
                test('正常：データ種Bv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000522;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000522,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000522,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000522,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000211
                            },
                            storeEventNotificationCode: {
                                _value: 1000251,
                                _ver: 4
                            }
                        }
                    ]);
                });
                test('正常：データ種Bv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000512;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000522;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000503;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000513;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000523;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Dv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000524;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000503;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000513;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000523;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Dv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000524;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
            });
            describe('共有定義の最新バージョン: v5 (同意要)、非同意', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'share', 1000130, false);
                    changeAgreement(1000111, 'share', 1000131, false);
                    changeAgreement(1000111, 'share', 1000132, false);

                    changeAgreement(1000210, 'share', 1000230, false);
                    changeAgreement(1000211, 'share', 1000231, false);
                    changeAgreement(1000211, 'share', 1000232, false);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(5);
                });
                // リクエスト雛形
                const shareReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE_EVENT',
                    storedBy: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    shareTo: null,
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
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Av1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000511;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Av1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000521;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Av2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000511;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Av2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000521;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Av2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000501;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000502;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000512;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000522;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000512;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000522;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000503;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000513;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000523;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Dv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000524;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000503;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000513;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000523;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Dv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000524;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
            });
            describe('共有定義の最新バージョン: v5 (同意要)、v1同意', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'share', 1000130, true);
                    changeAgreement(1000111, 'share', 1000131, true);
                    changeAgreement(1000111, 'share', 1000132, true);

                    changeAgreement(1000210, 'share', 1000230, true);
                    changeAgreement(1000211, 'share', 1000231, true);
                    changeAgreement(1000211, 'share', 1000232, true);
                    // 同意バージョン変更
                    changeAgreementVersion(1);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(5);
                });
                // リクエスト雛形
                const shareReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE_EVENT',
                    storedBy: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    shareTo: null,
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
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000501,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: {
                                _value: 1000501,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 3
                            }
                        }
                    ]);
                });
                test('正常：データ種Av1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000511;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 3
                            }
                        },                    ]);
                });
                test('正常：データ種Av1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000521;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 3
                            }
                        }
                    ]);
                });
                test('正常：データ種Av2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000511;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 3
                            }
                        }
                    ]);
                });
                test('正常：データ種Av2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000521;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 3
                            }
                        }
                    ]);
                });
                test('正常：データ種Av2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000501;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000501,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: {
                                _value: 1000501,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000501,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: {
                                _value: 1000501,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 3
                            }
                        }
                    ]);
                });
                test('正常：データ種Bv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000502;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000512;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000522;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000512;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000522;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000503;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000513;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000523;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Dv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000524;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000503;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000513;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000523;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Dv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000524;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
            });
            describe('共有定義の最新バージョン: v5 (同意要)、v4同意', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'share', 1000130, true);
                    changeAgreement(1000111, 'share', 1000131, true);
                    changeAgreement(1000111, 'share', 1000132, true);

                    changeAgreement(1000210, 'share', 1000230, true);
                    changeAgreement(1000211, 'share', 1000231, true);
                    changeAgreement(1000211, 'share', 1000232, true);
                    // 同意バージョン変更
                    changeAgreementVersion(4);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(5);
                });
                // リクエスト雛形
                const shareReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE_EVENT',
                    storedBy: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    shareTo: null,
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
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000501,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: {
                                _value: 1000501,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 4
                            }
                        }
                    ]);
                });
                test('正常：データ種Av1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000511;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000111
                            },
                            storeEventNotificationCode: {
                                _value: 1000151,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000211
                            },
                            storeEventNotificationCode: {
                                _value: 1000251,
                                _ver: 4
                            }
                        }
                    ]);
                });
                test('正常：データ種Av1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000521;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000111
                            },
                            storeEventNotificationCode: {
                                _value: 1000151,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000211
                            },
                            storeEventNotificationCode: {
                                _value: 1000251,
                                _ver: 4
                            }
                        }
                    ]);
                });
                test('正常：データ種Av2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000511;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000111
                            },
                            storeEventNotificationCode: {
                                _value: 1000151,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000211
                            },
                            storeEventNotificationCode: {
                                _value: 1000251,
                                _ver: 4
                            }
                        }
                    ]);
                });
                test('正常：データ種Av2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000521;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000111
                            },
                            storeEventNotificationCode: {
                                _value: 1000151,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000211
                            },
                            storeEventNotificationCode: {
                                _value: 1000251,
                                _ver: 4
                            }
                        }
                    ]);
                });
                test('正常：データ種Av2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000501;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000501,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: {
                                _value: 1000501,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000501,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000111
                            },
                            storeEventNotificationCode: {
                                _value: 1000151,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000501,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: {
                                _value: 1000501,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000501,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000211
                            },
                            storeEventNotificationCode: {
                                _value: 1000251,
                                _ver: 4
                            }
                        }
                    ]);
                });
                test('正常：データ種Bv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000502;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000502,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: {
                                _value: 1000502,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000502,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000111
                            },
                            storeEventNotificationCode: {
                                _value: 1000151,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000502,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: {
                                _value: 1000502,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000502,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000211
                            },
                            storeEventNotificationCode: {
                                _value: 1000251,
                                _ver: 4
                            }
                        }
                    ]);
                });
                test('正常：データ種Bv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000512;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000512,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000512,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000512,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000512,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 4
                            }
                        }
                    ]);
                });
                test('正常：データ種Bv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000522;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000522,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000522,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 4
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000522,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000211
                            },
                            storeEventNotificationCode: {
                                _value: 1000251,
                                _ver: 4
                            }
                        }
                    ]);
                });
                test('正常：データ種Bv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000512;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000522;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000503;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000513;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000523;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Dv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000524;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000503;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000513;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000523;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Dv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000524;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
            });
            describe('共有定義の最新バージョン: v5 (同意要)、v5同意', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'share', 1000130, true);
                    changeAgreement(1000111, 'share', 1000131, true);
                    changeAgreement(1000111, 'share', 1000132, true);

                    changeAgreement(1000210, 'share', 1000230, true);
                    changeAgreement(1000211, 'share', 1000231, true);
                    changeAgreement(1000211, 'share', 1000232, true);
                    // 同意バージョン変更
                    changeAgreementVersion(5);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(5);
                });
                // リクエスト雛形
                const shareReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE_EVENT',
                    storedBy: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    shareTo: null,
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
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000501,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: {
                                _value: 1000501,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 5
                            }
                        }
                    ]);
                });
                test('正常：データ種Av1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000511;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000111
                            },
                            storeEventNotificationCode: {
                                _value: 1000151,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000211
                            },
                            storeEventNotificationCode: {
                                _value: 1000251,
                                _ver: 5
                            }
                        }
                    ]);
                });
                test('正常：データ種Av1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000521;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000111
                            },
                            storeEventNotificationCode: {
                                _value: 1000151,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000211
                            },
                            storeEventNotificationCode: {
                                _value: 1000251,
                                _ver: 5
                            }
                        }
                    ]);
                });
                test('正常：データ種Av2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000511;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000111
                            },
                            storeEventNotificationCode: {
                                _value: 1000151,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000211
                            },
                            storeEventNotificationCode: {
                                _value: 1000251,
                                _ver: 5
                            }
                        }
                    ]);
                });
                test('正常：データ種Av2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000521;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000111
                            },
                            storeEventNotificationCode: {
                                _value: 1000151,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000211
                            },
                            storeEventNotificationCode: {
                                _value: 1000251,
                                _ver: 5
                            }
                        }
                    ]);
                });
                test('正常：データ種Av2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000501;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000501,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: {
                                _value: 1000501,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000501,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000111
                            },
                            storeEventNotificationCode: {
                                _value: 1000151,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000501,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: {
                                _value: 1000501,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000501,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000211
                            },
                            storeEventNotificationCode: {
                                _value: 1000251,
                                _ver: 5
                            }
                        }
                    ]);
                });
                test('正常：データ種Bv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000502;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000502,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: {
                                _value: 1000502,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000502,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000111
                            },
                            storeEventNotificationCode: {
                                _value: 1000151,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000502,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: {
                                _value: 1000502,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000502,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000211
                            },
                            storeEventNotificationCode: {
                                _value: 1000251,
                                _ver: 5
                            }
                        }
                    ]);
                });
                test('正常：データ種Bv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000512;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000512,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000512,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000512,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000512,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 5
                            }
                        }
                    ]);
                });
                test('正常：データ種Bv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000522;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000522,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000522,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000522,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000211
                            },
                            storeEventNotificationCode: {
                                _value: 1000251,
                                _ver: 5
                            }
                        }
                    ]);
                });
                test('正常：データ種Bv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000512;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000512,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000512,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000512,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000111
                            },
                            storeEventNotificationCode: {
                                _value: 1000151,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000512,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000512,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000512,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000211
                            },
                            storeEventNotificationCode: {
                                _value: 1000251,
                                _ver: 5
                            }
                        }
                    ]);
                });
                test('正常：データ種Bv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000522;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000522,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000522,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000522,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000111
                            },
                            storeEventNotificationCode: {
                                _value: 1000151,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000522,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000522,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000522,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000211
                            },
                            storeEventNotificationCode: {
                                _value: 1000251,
                                _ver: 5
                            }
                        }
                    ]);
                });
                test('正常：データ種Cv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000503;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000503,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: {
                                _value: 1000503,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000503,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: {
                                _value: 1000503,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000503,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000211
                            },
                            storeEventNotificationCode: {
                                _value: 1000251,
                                _ver: 5
                            }
                        }
                    ]);
                });
                test('正常：データ種Cv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000513;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000513,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000513,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000513,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000513,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 5
                            }
                        }
                    ]);
                });
                test('正常：データ種Cv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000523;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000523,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000523,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000523,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000523,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 5
                            }
                        }
                    ]);
                });
                test('正常：データ種Dv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000524;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000524,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000524,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000524,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000524,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 5
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000524,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000211
                            },
                            storeEventNotificationCode: {
                                _value: 1000251,
                                _ver: 5
                            }
                        }
                    ]);
                });
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000503;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000513;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000523;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Dv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000524;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
            });
            describe('共有定義の最新バージョン: v6 (同意不要)、v1同意', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'share', 1000130, true);
                    changeAgreement(1000111, 'share', 1000131, true);
                    changeAgreement(1000111, 'share', 1000132, true);

                    changeAgreement(1000210, 'share', 1000230, true);
                    changeAgreement(1000211, 'share', 1000231, true);
                    changeAgreement(1000211, 'share', 1000232, true);
                    // 同意バージョン変更
                    changeAgreementVersion(1);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(6);
                });
                // リクエスト雛形
                const shareReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE_EVENT',
                    storedBy: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    shareTo: null,
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
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000501,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: {
                                _value: 1000501,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 3
                            }
                        }
                    ]);
                });
                test('正常：データ種Av1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000511;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 3
                            }
                        },                    ]);
                });
                test('正常：データ種Av1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000521;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 3
                            }
                        }
                    ]);
                });
                test('正常：データ種Av2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000511;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 3
                            }
                        }
                    ]);
                });
                test('正常：データ種Av2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000521;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 3
                            }
                        }
                    ]);
                });
                test('正常：データ種Av2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000501;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000501,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: {
                                _value: 1000501,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000501,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 3
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: {
                                _value: 1000501,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 3
                            }
                        }
                    ]);
                });
                test('正常：データ種Bv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000502;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000512;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000522;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000512;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000522;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000503;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000513;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000523;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Dv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000524;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000503;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000513;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000523;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Dv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000524;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
            });
            describe('共有定義の最新バージョン: v6 (同意不要)、v5同意', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'share', 1000130, true);
                    changeAgreement(1000111, 'share', 1000131, true);
                    changeAgreement(1000111, 'share', 1000132, true);

                    changeAgreement(1000210, 'share', 1000230, true);
                    changeAgreement(1000211, 'share', 1000231, true);
                    changeAgreement(1000211, 'share', 1000232, true);
                    // 同意バージョン変更
                    changeAgreementVersion(5);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(6);
                });
                // リクエスト雛形
                const shareReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE_EVENT',
                    storedBy: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    shareTo: null,
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
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000501,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: {
                                _value: 1000501,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 6
                            }
                        }
                    ]);
                });
                test('正常：データ種Av1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000511;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000111
                            },
                            storeEventNotificationCode: {
                                _value: 1000151,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000211
                            },
                            storeEventNotificationCode: {
                                _value: 1000251,
                                _ver: 6
                            }
                        }
                    ]);
                });
                test('正常：データ種Av1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000521;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000111
                            },
                            storeEventNotificationCode: {
                                _value: 1000151,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000211
                            },
                            storeEventNotificationCode: {
                                _value: 1000251,
                                _ver: 6
                            }
                        }
                    ]);
                });
                test('正常：データ種Av2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000511;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000111
                            },
                            storeEventNotificationCode: {
                                _value: 1000151,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000511,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000211
                            },
                            storeEventNotificationCode: {
                                _value: 1000251,
                                _ver: 6
                            }
                        }
                    ]);
                });
                test('正常：データ種Av2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000521;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000111
                            },
                            storeEventNotificationCode: {
                                _value: 1000151,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000521,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000211
                            },
                            storeEventNotificationCode: {
                                _value: 1000251,
                                _ver: 6
                            }
                        }
                    ]);
                });
                test('正常：データ種Av2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000501;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000501,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: {
                                _value: 1000501,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000501,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000111
                            },
                            storeEventNotificationCode: {
                                _value: 1000151,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000501,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: {
                                _value: 1000501,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000501,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000211
                            },
                            storeEventNotificationCode: {
                                _value: 1000251,
                                _ver: 6
                            }
                        }
                    ]);
                });
                test('正常：データ種Bv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000502;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000502,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: {
                                _value: 1000502,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000502,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000111
                            },
                            storeEventNotificationCode: {
                                _value: 1000151,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000502,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: {
                                _value: 1000502,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000502,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000211
                            },
                            storeEventNotificationCode: {
                                _value: 1000251,
                                _ver: 6
                            }
                        }
                    ]);
                });
                test('正常：データ種Bv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000512;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000512,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000512,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000512,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000512,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 6
                            }
                        }
                    ]);
                });
                test('正常：データ種Bv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000522;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000522,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000522,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000522,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000211
                            },
                            storeEventNotificationCode: {
                                _value: 1000251,
                                _ver: 6
                            }
                        }
                    ]);
                });
                test('正常：データ種Bv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000512;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000512,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000512,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000512,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000111
                            },
                            storeEventNotificationCode: {
                                _value: 1000151,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000512,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000512,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000512,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000211
                            },
                            storeEventNotificationCode: {
                                _value: 1000251,
                                _ver: 6
                            }
                        }
                    ]);
                });
                test('正常：データ種Bv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000522;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000522,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000522,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000522,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000111
                            },
                            storeEventNotificationCode: {
                                _value: 1000151,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000522,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000522,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000522,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000211
                            },
                            storeEventNotificationCode: {
                                _value: 1000251,
                                _ver: 6
                            }
                        }
                    ]);
                });
                test('正常：データ種Cv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000503;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000503,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: {
                                _value: 1000503,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000503,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: {
                                _value: 1000503,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000503,
                                _ver: 1
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000211
                            },
                            storeEventNotificationCode: {
                                _value: 1000251,
                                _ver: 6
                            }
                        }
                    ]);
                });
                test('正常：データ種Cv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000513;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000513,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000513,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000513,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000513,
                                _ver: 1
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 6
                            }
                        }
                    ]);
                });
                test('正常：データ種Cv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000523;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000523,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000523,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000523,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000523,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 6
                            }
                        }
                    ]);
                });
                test('正常：データ種Dv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000524;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000524,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000524,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000524,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000524,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000524,
                                _ver: 1
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000211
                            },
                            storeEventNotificationCode: {
                                _value: 1000251,
                                _ver: 6
                            }
                        }
                    ]);
                });
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000503;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000503,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: {
                                _value: 1000503,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000503,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000111
                            },
                            storeEventNotificationCode: {
                                _value: 1000151,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000503,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: {
                                _value: 1000503,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000503,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000211
                            },
                            storeEventNotificationCode: {
                                _value: 1000251,
                                _ver: 6
                            }
                        }
                    ]);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000513;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000513,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000513,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000513,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: {
                                _value: 1000513,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 6
                            }
                        }
                    ]);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000523;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000523,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000523,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000523,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000523,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 6
                            }
                        }
                    ]);
                });
                test('正常：データ種Dv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000524;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000524,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000150,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000524,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            storeEventNotificationCode: {
                                _value: 1000160,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000524,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000250,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'share-trigger',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000524,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000210
                            },
                            storeEventNotificationCode: {
                                _value: 1000260,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000524,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000110
                            },
                            shareTo: {
                                actor: 1000201,
                                asset: 1000211
                            },
                            storeEventNotificationCode: {
                                _value: 1000251,
                                _ver: 6
                            }
                        }
                    ]);
                });
            });
            describe('共有定義の最新バージョン: v5 (同意要)、非同意', () => {
                beforeAll(async () => {
                    // 同意状態変更
                    changeAgreement(1000110, 'share', 1000130, false);
                    changeAgreement(1000111, 'share', 1000131, false);
                    changeAgreement(1000111, 'share', 1000132, false);

                    changeAgreement(1000210, 'share', 1000230, false);
                    changeAgreement(1000211, 'share', 1000231, false);
                    changeAgreement(1000211, 'share', 1000232, false);
                    // 同意カタログ最大バージョン変更
                    changeMaxCatalogVersion(6);
                });
                // リクエスト雛形
                const shareReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE_EVENT',
                    storedBy: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    shareTo: null,
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
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Av1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000511;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Av1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000521;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Av2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000511;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Av2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000521;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Av2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000501;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000502;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000512;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000522;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000512;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Bv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000522;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv1 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000503;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv1 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000513;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000523;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Dv1 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000524;
                    shareReqApp03.dataType.code._ver = 1;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv2 document', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'document';
                    shareReqApp03.dataType.code._value = 1000503;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv2 event', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'event';
                    shareReqApp03.dataType.code._value = 1000513;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Cv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000523;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
                test('正常：データ種Dv2 thing', async () => {
                    // 判定対象のリクエスト生成
                    shareReqApp03.dataType.type = 'thing';
                    shareReqApp03.dataType.code._value = 1000524;
                    shareReqApp03.dataType.code._ver = 2;
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }

                    // レスポンスチェック
                    expect(result).toEqual([]);
                });
            });
        });
        describe('共有定義が分散, App04', () => {
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
                // リクエスト雛形
                const shareReqApp03: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE_EVENT',
                    storedBy: {
                        actor: 1000101,
                        asset: 1000111
                    },
                    shareTo: null,
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
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }
                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000703,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000111
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000111
                            },
                            storeEventNotificationCode: {
                                _value: 1000152,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: {
                                _value: 1000703,
                                _ver: 2
                            },
                            event: null,
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000111
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000111
                            },
                            storeEventNotificationCode: {
                                _value: 1000153,
                                _ver: 6
                            }
                        }
                    ]);
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
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }
                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000713,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000111
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000111
                            },
                            storeEventNotificationCode: {
                                _value: 1000152,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: {
                                _value: 1000713,
                                _ver: 2
                            },
                            thing: null,
                            storedBy: {
                                actor: 1000101,
                                asset: 1000111
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000111
                            },
                            storeEventNotificationCode: {
                                _value: 1000153,
                                _ver: 6
                            }
                        }
                    ]);
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
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    // 判定
                    let result: IAllDataOperationRequestResponse[];
                    let error: AppError;
                    try {
                        result = await analyzer.getAllPermitted(shareReqApp03);
                    } catch (err) {
                        error = err;
                    }
                    // レスポンスチェック
                    expect(result).toEqual([
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000723,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000111
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000111
                            },
                            storeEventNotificationCode: {
                                _value: 1000152,
                                _ver: 6
                            }
                        },
                        {
                            operationType: 'STORE_EVENT',
                            notificationType: 'store-event',
                            document: null,
                            event: null,
                            thing: {
                                _value: 1000723,
                                _ver: 2
                            },
                            storedBy: {
                                actor: 1000101,
                                asset: 1000111
                            },
                            shareTo: {
                                actor: 1000101,
                                asset: 1000111
                            },
                            storeEventNotificationCode: {
                                _value: 1000153,
                                _ver: 6
                            }
                        }
                    ]);
                });
            });
        });
    });
});
