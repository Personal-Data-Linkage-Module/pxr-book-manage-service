/* eslint-disable */
import { Application } from '../resources/config/Application';
import Config from '../common/Config';
import { IDataOperationRequest } from '../common/DataOperationRequest';
import PermissionAnalyzer from '../common/PermissionAnalyzer';
import { changeAgreement, changeAgreementVersion, changeConsentFlg, getAgreement, storeDatatype1000122_1, storeDatatype1000122_4, storeDatatype1000122_5, storeDatatype1000220_1 } from './accessor/AgreementAccessor';
import { changeMaxCatalogVersion, getCatalog, getCatalogFailure, getMultipleActorCatalogs, getNoCatalog } from './accessor/CatalogAccessor';
import AppError from 'common/AppError';
import { getStoreEventNotifications } from './accessor/StoreEventNotificationAccessor';
import { getInvalidShareRestrictionCatalogs, getShareRestrictionCatalogs } from './accessor/ShareRestrictionAccessor';
import { IAllDataOperationRequestResponse} from 'common/DataOperationResponse';
import Operator from '../resources/dto/OperatorReqDto';
import { Session } from './Session';
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
     * 異常系
     */
    describe('異常系', () => {
        beforeAll(async () => {
            // 同意状態変更
            changeAgreement(1000110, 'store', 1000120, true);
            changeAgreement(1000110, 'share', 1000130, true);
            // 同意バージョン変更
            changeAgreementVersion(5);
            // 同意カタログ最大バージョン変更
            changeMaxCatalogVersion(6);
        });
        describe('インスタンス生成時の前提不足', () => {
            test('create() の引数オペレータ情報が不足', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
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

                // 判定
                let result: boolean;
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(null, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = (await analyzer.isPermitted(req)).checkResult;
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.NOT_SET_OPERATOR);
            });
            test('create() の引数にagreementAccessorが不足', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
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

                // 判定
                let result: boolean;
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, null, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = (await analyzer.isPermitted(req)).checkResult;
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.NOT_SET_AGREEMENT_ACCESSOR_OR_CATALOG_ACCESSOR);
            });
            test('create() の引数にcatalogAccessorが不足', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
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

                // 判定
                let result: boolean;
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, null)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = (await analyzer.isPermitted(req)).checkResult;
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.NOT_SET_AGREEMENT_ACCESSOR_OR_CATALOG_ACCESSOR);
            });
            test('操作種別が継続的共有時、create() の引数にshareRestrictionAccessorが不足', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'SHARE_CONTINUOUS',
                    storedBy: null,
                    shareTo: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    dataType: {
                        type: null,
                        code: {
                            _value: 1000601,
                            _ver: 1
                        }
                    }
                };

                // 判定
                let result: boolean;
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = (await analyzer.isPermitted(req)).checkResult;
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.NOT_SET_SHARE_RESTRICTION_ACCESSOR);
            });
            test('操作種別が蓄積イベント通知時、create() の引数にshareRestrictionAccessorが不足', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE_EVENT',
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

                // 判定
                let result: boolean;
                let error: AppError;
                try {
                // analyzerインスタンス生成
                const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, null, getStoreEventNotifications)
                    .setDataOperationType('STORE_EVENT');
                await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                await analyzer.setAssetCatalog();
                await analyzer.specifyTarget();

                result = (await analyzer.isPermitted(req)).checkResult;
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.NOT_SET_SHARE_RESTRICTION_ACCESSOR);
            });
            test('操作種別が蓄積イベント通知時、create() の引数にstoreEventNotificationAccessorが不足', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE_EVENT',
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

                // 判定
                let result: boolean;
                let error: AppError;
                try {
                // analyzerインスタンス生成
                const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, null)
                    .setDataOperationType('STORE_EVENT');
                await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                await analyzer.setAssetCatalog();
                await analyzer.specifyTarget();

                    result = (await analyzer.isPermitted(req)).checkResult;
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.NOT_SET_STORE_EVENT_NOTIFICATE_ACCESSOR);
            });
            test('setDataOperationType() 未実施', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
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

                // 判定
                let result: boolean;
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = (await analyzer.isPermitted(req)).checkResult;
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.NOT_SET_DATA_OPERATION_TYPE);
            });
            test('setDataOperationType() の引数がnull', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
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

                // 判定
                let result: boolean;
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType(null);
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = (await analyzer.isPermitted(req)).checkResult;
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.NOT_SET_DATA_OPERATION_TYPE);
            });
            test('setAgreement() の引数にpxrId不足', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
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

                // 判定
                let result: boolean;
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement(null, 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = (await analyzer.isPermitted(req)).checkResult;
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.REQUIRED_PXR_ID);
            });
            test('setAgreement() の引数にtype不足', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
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

                // 判定
                let result: boolean;
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', null, null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = (await analyzer.isPermitted(req)).checkResult;
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.REQUIRED_AGREEMENT_TYPE);
            });
            test('setAgreement() 未実施', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
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

                // 判定
                let result: boolean;
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = (await analyzer.isPermitted(req)).checkResult;
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.INCOMPLETE_SET_AGREEMENT);
            });
            test('setAssetCatalog() 未実施', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
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

                // 判定
                let result: boolean;
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.specifyTarget();

                    result = (await analyzer.isPermitted(req)).checkResult;
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.INCOMPLETE_SET_ASSET_CATALOG);
            });
            test('カタログ取得失敗(null)', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
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

                // 判定
                let result: boolean;
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalogFailure, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = (await analyzer.isPermitted(req)).checkResult;
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(500);
                expect(error.message).toBe(Message.FAILED_CATALOG_GET);
            });
            test('カタログ取得失敗(空配列)', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
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

                // 判定
                let result: boolean;
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getNoCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = (await analyzer.isPermitted(req)).checkResult;
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(500);
                expect(error.message).toBe(Message.FAILED_CATALOG_GET);
            });
            test('不正なカタログ取得結果(アクターカタログ複数件)', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
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

                // 判定
                let result: boolean;
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getMultipleActorCatalogs, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = (await analyzer.isPermitted(req)).checkResult;
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(500);
                expect(error.message).toBe(Message.INVALID_CATALOG_NUMBER);
            });
            test('不正な共有制限定義カタログ（1つのデータ種に許可リストと禁止リストの両方が定義されている）が存在する', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
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

                // 判定
                let result: boolean;
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getInvalidShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = (await analyzer.isPermitted(req)).checkResult;
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.SET_PERMISSION_AND_PROHIBITION);
            });
            test('specifyTarget() 未実施、isPermitted()', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
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

                // 判定
                let result: boolean;
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();

                    result = (await analyzer.isPermitted(req)).checkResult;
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.INCOMPLETE_SPECIFY_TARGET);
            });
            test('specifyTarget() 未実施、getAllPermitted()', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
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

                // 判定
                let result: IAllDataOperationRequestResponse[];
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();

                    result = await analyzer.getAllPermitted(req);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.INCOMPLETE_SPECIFY_TARGET);
            });
        });
        describe('isPermitted() の引数不正', () => {
            test('リクエストなし', async () => {
                // 判定対象のリクエスト生成
                // 判定
                let result: boolean;
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = (await analyzer.isPermitted(null)).checkResult;
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.REQUEST_IS_EMPTY);
            });
            test('pxrId不一致', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
                    pxrId: 'pxrId02',
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

                // 判定
                let result: boolean;
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = (await analyzer.isPermitted(req)).checkResult;
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.MISMATCH_PXR_ID);
            });
            test('operationType不一致', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'SHARE_CONTINUOUS',
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

                // 判定
                let result: boolean;
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = (await analyzer.isPermitted(req)).checkResult;
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.MISMATCH_OPERATION_TYPE);
            });
            test('蓄積時、storedByの指定なし', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE',
                    storedBy: null,
                    shareTo: null,
                    dataType: {
                        type: null,
                        code: {
                            _value: 1000601,
                            _ver: 1
                        }
                    }
                };

                // 判定
                let result: boolean;
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = (await analyzer.isPermitted(req)).checkResult;
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.REQUIRED_STORED_BY_ASSET);
            });
            test('蓄積時、storedBy.actorの指定なし', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE',
                    storedBy: {
                        actor: null,
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

                // 判定
                let result: boolean;
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = (await analyzer.isPermitted(req)).checkResult;
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.REQUIRED_STORED_BY_ASSET);
            });
            test('蓄積時、storedBy.assetの指定なし', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE',
                    storedBy: {
                        actor: 1000101,
                        asset: null
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

                // 判定
                let result: boolean;
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = (await analyzer.isPermitted(req)).checkResult;
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.REQUIRED_STORED_BY_ASSET);
            });
            test('継続的共有時、shareToの指定なし', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'SHARE_CONTINUOUS',
                    storedBy: null,
                    shareTo: null,
                    dataType: {
                        type: null,
                        code: {
                            _value: 1000601,
                            _ver: 1
                        }
                    }
                };

                // 判定
                let result: boolean;
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = (await analyzer.isPermitted(req)).checkResult;
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.REQUIRED_SHARE_TO_ASSET);
            });
            test('継続的共有時、shareTo.actorの指定なし', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'SHARE_CONTINUOUS',
                    storedBy: null,
                    shareTo: {
                        actor: null,
                        asset: 1000110
                    },
                    dataType: {
                        type: null,
                        code: {
                            _value: 1000601,
                            _ver: 1
                        }
                    }
                };

                // 判定
                let result: boolean;
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = (await analyzer.isPermitted(req)).checkResult;
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.REQUIRED_SHARE_TO_ASSET);
            });
            test('継続的共有時、shareTo.assetの指定なし', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'SHARE_CONTINUOUS',
                    storedBy: null,
                    shareTo: {
                        actor: 1000101,
                        asset: null
                    },
                    dataType: {
                        type: null,
                        code: {
                            _value: 1000601,
                            _ver: 1
                        }
                    }
                };

                // 判定
                let result: boolean;
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = (await analyzer.isPermitted(req)).checkResult;
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.REQUIRED_SHARE_TO_ASSET);
            });
            test('蓄積イベント通知時、storedByの指定なし', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE_EVENT',
                    storedBy: null,
                    shareTo: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    dataType: {
                        type: null,
                        code: {
                            _value: 1000601,
                            _ver: 1
                        }
                    }
                };

                // 判定
                let result: boolean;
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = (await analyzer.isPermitted(req)).checkResult;
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.REQUIRED_STORED_BY_ASSET);
            });
            test('蓄積イベント通知時、storedBy.actorの指定なし', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE_EVENT',
                    storedBy: {
                        actor: null,
                        asset: 1000110
                    },
                    shareTo: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    dataType: {
                        type: null,
                        code: {
                            _value: 1000601,
                            _ver: 1
                        }
                    }
                };

                // 判定
                let result: boolean;
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = (await analyzer.isPermitted(req)).checkResult;
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.REQUIRED_STORED_BY_ASSET);
            });
            test('蓄積イベント通知時、storedBy.assetの指定なし', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE_EVENT',
                    storedBy: {
                        actor: 1000101,
                        asset: null
                    },
                    shareTo: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    dataType: {
                        type: null,
                        code: {
                            _value: 1000601,
                            _ver: 1
                        }
                    }
                };

                // 判定
                let result: boolean;
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = (await analyzer.isPermitted(req)).checkResult;
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.REQUIRED_STORED_BY_ASSET);
            });
            test('蓄積イベント通知時、shareToの指定なし', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE_EVENT',
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

                // 判定
                let result: boolean;
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = (await analyzer.isPermitted(req)).checkResult;
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.REQUIRED_SHARE_TO_ASSET);
            });
            test('蓄積イベント通知時、shareTo.actorの指定なし', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE_EVENT',
                    storedBy: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    shareTo: {
                        actor: null,
                        asset: 1000110
                    },
                    dataType: {
                        type: null,
                        code: {
                            _value: 1000601,
                            _ver: 1
                        }
                    }
                };

                // 判定
                let result: boolean;
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = (await analyzer.isPermitted(req)).checkResult;
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.REQUIRED_SHARE_TO_ASSET);
            });
            test('蓄積イベント通知時、shareTo.assetの指定なし', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE_EVENT',
                    storedBy: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    shareTo: {
                        actor: 1000101,
                        asset: null
                    },
                    dataType: {
                        type: null,
                        code: {
                            _value: 1000601,
                            _ver: 1
                        }
                    }
                };

                // 判定
                let result: boolean;
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = (await analyzer.isPermitted(req)).checkResult;
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.REQUIRED_SHARE_TO_ASSET);
            });
            test('データ種指定なし', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE',
                    storedBy: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    shareTo: null,
                    dataType: null
                };

                // 判定
                let result: boolean;
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = (await analyzer.isPermitted(req)).checkResult;
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.REQUIRED_DATA_TYPE);
            });
            test('データ種コード指定なし', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
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
                            _value: null,
                            _ver: 1
                        }
                    }
                };

                // 判定
                let result: boolean;
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = (await analyzer.isPermitted(req)).checkResult;
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.REQUIRED_DATA_TYPE);
            });
            test('データ種バージョン指定なし', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
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
                            _ver: null
                        }
                    }
                };

                // 判定
                let result: boolean;
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = (await analyzer.isPermitted(req)).checkResult;
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.REQUIRED_DATA_TYPE);
            });
            test('継続的共有時、データ種別指定なし', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'SHARE_CONTINUOUS',
                    storedBy: null,
                    shareTo: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    dataType: {
                        type: null,
                        code: {
                            _value: 1000601,
                            _ver: 1
                        }
                    }
                };

                // 判定
                let result: boolean;
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = (await analyzer.isPermitted(req)).checkResult;
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.REQUIRED_DATA_TYPE);
            });
            test('蓄積イベント通知時、データ種別指定なし', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE_EVENT',
                    storedBy: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    shareTo: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    dataType: {
                        type: null,
                        code: {
                            _value: 1000601,
                            _ver: 1
                        }
                    }
                };

                // 判定
                let result: boolean;
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                    .setDataOperationType('STORE_EVENT');
                await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                await analyzer.setAssetCatalog();
                await analyzer.specifyTarget();

                    result = (await analyzer.isPermitted(req)).checkResult;
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.REQUIRED_DATA_TYPE);
            });
    
        });
        describe('getAllPermitted() の引数不正', () => {
            test('pxrId不一致', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
                    pxrId: 'pxrId02',
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

                // 判定
                let result: IAllDataOperationRequestResponse[];
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = await analyzer.getAllPermitted(req);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.MISMATCH_PXR_ID);
            });
            test('operationType不一致', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE_EVENT',
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

                // 判定
                let result: IAllDataOperationRequestResponse[];
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = await analyzer.getAllPermitted(req);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.MISMATCH_OPERATION_TYPE);
            });
            test('storeBy, shareToともに指定', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE_EVENT',
                    storedBy: {
                        actor: 1000101,
                        asset: 1000110
                    },
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

                // 判定
                let result: IAllDataOperationRequestResponse[];
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = await analyzer.getAllPermitted(req);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.STORED_BY_OR_SHARE_TO_NOT_NEED);
            });
            test('蓄積イベント通知時、storedBy指定なし', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE_EVENT',
                    storedBy: null,
                    shareTo: null,
                    dataType: {
                        type: 'document',
                        code: {
                            _value: 1000501,
                            _ver: 1
                        }
                    }
                };

                // 判定
                let result: IAllDataOperationRequestResponse[];
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = await analyzer.getAllPermitted(req);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.REQUIRED_STORED_BY_ASSET);
            });
            test('蓄積イベント通知時、storedBy.actor指定なし', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE_EVENT',
                    storedBy: {
                        actor: null,
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

                // 判定
                let result: IAllDataOperationRequestResponse[];
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = await analyzer.getAllPermitted(req);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.REQUIRED_STORED_BY_ASSET);
            });
            test('蓄積イベント通知時、storedBy.asset指定なし', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE_EVENT',
                    storedBy: {
                        actor: 1000101,
                        asset: null
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

                // 判定
                let result: IAllDataOperationRequestResponse[];
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = await analyzer.getAllPermitted(req);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.REQUIRED_STORED_BY_ASSET);
            });
            test('データ種指定なし', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE_EVENT',
                    storedBy: {
                        actor: 1000101,
                        asset: 1000110
                    },
                    shareTo: null,
                    dataType: null
                };

                // 判定
                let result: IAllDataOperationRequestResponse[];
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = await analyzer.getAllPermitted(req);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.REQUIRED_DATA_TYPE);
            });
            test('データ種コード指定なし', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
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
                            _value: null,
                            _ver: 1
                        }
                    }
                };

                // 判定
                let result: IAllDataOperationRequestResponse[];
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = await analyzer.getAllPermitted(req);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.REQUIRED_DATA_TYPE);
            });
            test('データ種バージョン指定なし', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
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
                            _ver: null
                        }
                    }
                };

                // 判定
                let result: IAllDataOperationRequestResponse[];
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = await analyzer.getAllPermitted(req);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.REQUIRED_DATA_TYPE);
            });
            test('蓄積イベント通知時、データ種別指定なし', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE_EVENT',
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

                // 判定
                let result: IAllDataOperationRequestResponse[];
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs, getStoreEventNotifications)
                        .setDataOperationType('STORE_EVENT');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = await analyzer.getAllPermitted(req);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(400);
                expect(error.message).toBe(Message.REQUIRED_DATA_TYPE);
            });
            test('未サポートの操作種別（蓄積）', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
                    pxrId: 'pxrId01',
                    operationType: 'STORE',
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

                // 判定
                let result: IAllDataOperationRequestResponse[];
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog)
                        .setDataOperationType('STORE');
                    await analyzer.setAgreement('pxrId01', 'STORE', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = await analyzer.getAllPermitted(req);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(405);
                expect(error.message).toBe(Message.NOT_SUPPORTED_OPERATION);
            });
            test('未サポートの操作種別（継続的共有）', async () => {
                // 判定対象のリクエスト生成
                const req: IDataOperationRequest = {
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

                // 判定
                let result: IAllDataOperationRequestResponse[];
                let error: AppError;
                try {
                    // analyzerインスタンス生成
                    const operator = new Operator();
                    operator.setFromJson(Session.dataStoreGetApp);
                    const analyzer = PermissionAnalyzer
                        .create(operator, getAgreement, getCatalog, getShareRestrictionCatalogs)
                        .setDataOperationType('SHARE_CONTINUOUS');
                    await analyzer.setAgreement('pxrId01', 'SHARE_CONTINUOUS', null);
                    await analyzer.setAssetCatalog();
                    await analyzer.specifyTarget();

                    result = await analyzer.getAllPermitted(req);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(405);
                expect(error.message).toBe(Message.NOT_SUPPORTED_OPERATION);
            });
        });
    });
});