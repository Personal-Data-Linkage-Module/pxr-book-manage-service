/* eslint-disable */
import { Application } from '../resources/config/Application';
import Config from '../common/Config';
import AppError from '../common/AppError';
import { Session } from './Session';
import Operator from '../resources/dto/OperatorReqDto';
import { StubCatalogServerDataStore, StubCatalogServerShare } from './StubCatalogServer';
import CatalogService from '../services/CatalogService';
import { Catalog } from '../domains/catalog/Catalogs';
import { ResponseCode } from '../common/ResponseCode';
const Message = Config.ReadConfig('./config/message.json');

// 対象アプリケーションを取得
const app = new Application();

// サーバをlisten
app.start();


let catalog: any;

/**
 * book-manage API のユニットテスト
 */
describe('book-manage API', () => {
    /**
     * 各テスト実行の前処理
     */
    afterEach(async () => {
        // スタブを停止
        if (catalog) {
            catalog._server.close();
        }
    });

    /**
     * 全テスト実行の後処理
     */
    afterAll(async () => {
        // サーバ停止
        app.stop();
    });

    /**
     * カタログサービス.カタログ取得関数
     */
    describe('カタログ取得関数', () => {
        describe('正常系', () => {
            test('正常：カタログ取得', async () => {
                // スタブを起動
                catalog = new StubCatalogServerDataStore(200);
                // 判定対象のリクエスト生成
                const code: number = 1000101;
                const history: boolean = false;
                const minVersion: number = null;
                const maxVersion: number = null;

                // catalogServiceインスタンス生成
                const operator = new Operator();
                operator.setFromJson(Session.dataStoreGetApp);
                
                const catalogService = new CatalogService();

                // 判定
                let result: Catalog[];
                let error: AppError;

                try {
                    result = await catalogService.catalogAccessor(operator, code, history, minVersion, maxVersion);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result).toEqual([{
                    catalogItem: {
                        ns: 'app/actor/1000101',
                        _code: {
                            _value: 1000101,
                            _ver: 1
                        }
                    },
                    template: {
                        _code: {
                            _value: 1000101,
                            _ver: 1
                        },
                        workflow: [
                            {
                                _value: 1000110,
                                _ver: 1
                            },
                            {
                                _value: 1000111,
                                _ver: 1
                            },
                            {
                                _value: 1000112,
                                _ver: 1
                            }
                        ],
                        application: null
                    }
                }]);
            });
            test('正常：カタログ履歴取得　取得結果0件(200)', async () => {
                // スタブを起動
                catalog = new StubCatalogServerDataStore(200);
                // 判定対象のリクエスト生成
                const code: number = 1000121;
                const history: boolean = false;
                const minVersion: number = null;
                const maxVersion: number = null;

                // catalogServiceインスタンス生成
                const operator = new Operator();
                operator.setFromJson(Session.dataStoreGetApp);
                
                const catalogService = new CatalogService();

                // 判定
                let result: Catalog[];
                let error: AppError;

                try {
                    result = await catalogService.catalogAccessor(operator, code, history, minVersion, maxVersion);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result).toEqual([]);
            });
            test('正常：カタログ履歴取得　最小バージョン: 1', async () => {
                // スタブを起動
                catalog = new StubCatalogServerDataStore(200);
                // 判定対象のリクエスト生成
                const code: number = 1000120;
                const history: boolean = true;
                const minVersion: number = 1;
                const maxVersion: number = null;

                // catalogServiceインスタンス生成
                const operator = new Operator();
                operator.setFromJson(Session.dataStoreGetApp);
                
                const catalogService = new CatalogService();

                // 判定
                let result: Catalog[];
                let error: AppError;

                try {
                    result = await catalogService.catalogAccessor(operator, code, history, minVersion, maxVersion);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                // ver4は削除済想定で取得対象外
                expect(result).toEqual([
                    {
                        catalogItem: {
                            ns: 'app/store/actor_1000101',
                            _code: {
                                _value: 1000120,
                                _ver: 1
                            }
                        },
                        template: {
                            _code: {
                                _value: 1000120,
                                _ver: 1
                            },
                            store: [
                                {
                                    id: 'storeUuidCommon-v1',
                                    role: [
                                        {
                                            _value: 1001101,
                                            _ver: 1
                                        }
                                    ],
                                    document: [
                                        {
                                            code: {
                                                _value: 1000501,
                                                _ver: 1
                                            },
                                            requireConsent: true
                                        }
                                    ],
                                    event: [
                                        {
                                            code: {
                                                _value: 1000511,
                                                _ver: 1
                                            },
                                            requireConsent: true,
                                            thing: [
                                                {
                                                    code: {
                                                        _value: 1000521,
                                                        _ver: 1
                                                    },
                                                    requireConsent: true
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    },
                    {
                        catalogItem: {
                            ns: 'app/store/actor_1000101',
                            _code: {
                                _value: 1000120,
                                _ver: 2
                            }
                        },
                        template: {
                            _code: {
                                _value: 1000120,
                                _ver: 2
                            },
                            store: [
                                {
                                    id: 'storeUuidCommon-v1',
                                    role: [
                                        {
                                            _value: 1001101,
                                            _ver: 1
                                        }
                                    ],
                                    document: [
                                        {
                                            code: {
                                                _value: 1000501,
                                                _ver: 1
                                            },
                                            requireConsent: true
                                        }
                                    ],
                                    event: [
                                        {
                                            code: {
                                                _value: 1000511,
                                                _ver: 1
                                            },
                                            requireConsent: true,
                                            thing: [
                                                {
                                                    code: {
                                                        _value: 1000521,
                                                        _ver: 1
                                                    },
                                                    requireConsent: true
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    id: 'storeUuidCommon-v2',
                                    role: [
                                        {
                                            _value: 1001101,
                                            _ver: 1
                                        }
                                    ],
                                    event: [
                                        {
                                            code: {
                                                _value: 1000511,
                                                _ver: 2
                                            },
                                            requireConsent: false,
                                            thing: [
                                                {
                                                    code: {
                                                        _value: 1000521,
                                                        _ver: 2
                                                    },
                                                    requireConsent: false
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    },
                    {
                        catalogItem: {
                            ns: 'app/store/actor_1000101',
                            _code: {
                                _value: 1000120,
                                _ver: 3
                            }
                        },
                        template: {
                            _code: {
                                _value: 1000120,
                                _ver: 3
                            },
                            store: [
                                {
                                    id: 'storeUuidCommon-v1',
                                    role: [
                                        {
                                            _value: 1001101,
                                            _ver: 1
                                        }
                                    ],
                                    document: [
                                        {
                                            code: {
                                                _value: 1000501,
                                                _ver: 1
                                            },
                                            requireConsent: true
                                        }
                                    ],
                                    event: [
                                        {
                                            code: {
                                                _value: 1000511,
                                                _ver: 1
                                            },
                                            requireConsent: true,
                                            thing: [
                                                {
                                                    code: {
                                                        _value: 1000521,
                                                        _ver: 1
                                                    },
                                                    requireConsent: true
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    id: 'storeUuidCommon-v3',
                                    role: [
                                        {
                                            _value: 1001101,
                                            _ver: 1
                                        }
                                    ],
                                    document: [
                                        {
                                            code: {
                                                _value: 1000501,
                                                _ver: 2
                                            },
                                            requireConsent: false
                                        }
                                    ]
                                }
                            ]
                        }
                    },
                    {
                        catalogItem: {
                            ns: 'app/store/actor_1000101',
                            _code: {
                                _value: 1000120,
                                _ver: 5
                            }
                        },
                        template: {
                            _code: {
                                _value: 1000120,
                                _ver: 5
                            },
                            store: [
                                {
                                    id: 'storeUuidCommon-v1',
                                    role: [
                                        {
                                            _value: 1001101,
                                            _ver: 1
                                        }
                                    ],
                                    document: [
                                        {
                                            code: {
                                                _value: 1000501,
                                                _ver: 1
                                            },
                                            requireConsent: true
                                        }
                                    ],
                                    event: [
                                        {
                                            code: {
                                                _value: 1000511,
                                                _ver: 1
                                            },
                                            requireConsent: true,
                                            thing: [
                                                {
                                                    code: {
                                                        _value: 1000521,
                                                        _ver: 1
                                                    },
                                                    requireConsent: true
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    id: 'storeUuidCommon-v3',
                                    role: [
                                        {
                                            _value: 1001101,
                                            _ver: 1
                                        }
                                    ],
                                    document: [
                                        {
                                            code: {
                                                _value: 1000501,
                                                _ver: 2
                                            },
                                            requireConsent: false
                                        }
                                    ]
                                },
                                {
                                    id: 'storeUuidCommon-v4',
                                    role: [
                                        {
                                            _value: 1001101,
                                            _ver: 1
                                        }
                                    ],
                                    document: [
                                        {
                                            code: {
                                                _value: 1000502,
                                                _ver: 1
                                            },
                                            requireConsent: true
                                        }
                                    ],
                                    event: [
                                        {
                                            code: {
                                                _value: 1000512,
                                                _ver: 1
                                            },
                                            requireConsent: true,
                                            thing: [
                                                {
                                                    code: {
                                                        _value: 1000522,
                                                        _ver: 1
                                                    },
                                                    requireConsent: true
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    id: 'storeUuidCommon-v5',
                                    role: [
                                        {
                                            _value: 1001101,
                                            _ver: 1
                                        }
                                    ],
                                    document: [
                                        {
                                            code: {
                                                _value: 1000503,
                                                _ver: 1
                                            },
                                            requireConsent: true
                                        }
                                    ],
                                    event: [
                                        {
                                            code: {
                                                _value: 1000512,
                                                _ver: 2
                                            },
                                            requireConsent: false,
                                            thing: [
                                                {
                                                    code: {
                                                        _value: 1000522,
                                                        _ver: 2
                                                    },
                                                    requireConsent: false
                                                },
                                                {
                                                    code: {
                                                        _value: 1000524,
                                                        _ver: 1
                                                    },
                                                    requireConsent: false
                                                }
                                            ]
                                        },
                                        {
                                            code: {
                                                _value: 1000513,
                                                _ver: 1
                                            },
                                            requireConsent: true,
                                            thing: [
                                                {
                                                    code: {
                                                        _value: 1000523,
                                                        _ver: 1
                                                    }
                                                },
                                                {
                                                    code: {
                                                        _value: 1000524,
                                                        _ver: 1
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                ]);
            });
            test('正常：カタログ履歴取得　最小バージョン: 3', async () => {
                // スタブを起動
                catalog = new StubCatalogServerDataStore(200);
                // 判定対象のリクエスト生成
                const code: number = 1000120;
                const history: boolean = true;
                const minVersion: number = 3;
                const maxVersion: number = null;

                // catalogServiceインスタンス生成
                const operator = new Operator();
                operator.setFromJson(Session.dataStoreGetApp);
                
                const catalogService = new CatalogService();

                // 判定
                let result: Catalog[];
                let error: AppError;

                try {
                    result = await catalogService.catalogAccessor(operator, code, history, minVersion, maxVersion);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                // ver4は削除済想定で取得対象外
                expect(result).toEqual([
                    {
                        catalogItem: {
                            ns: 'app/store/actor_1000101',
                            _code: {
                                _value: 1000120,
                                _ver: 3
                            }
                        },
                        template: {
                            _code: {
                                _value: 1000120,
                                _ver: 3
                            },
                            store: [
                                {
                                    id: 'storeUuidCommon-v1',
                                    role: [
                                        {
                                            _value: 1001101,
                                            _ver: 1
                                        }
                                    ],
                                    document: [
                                        {
                                            code: {
                                                _value: 1000501,
                                                _ver: 1
                                            },
                                            requireConsent: true
                                        }
                                    ],
                                    event: [
                                        {
                                            code: {
                                                _value: 1000511,
                                                _ver: 1
                                            },
                                            requireConsent: true,
                                            thing: [
                                                {
                                                    code: {
                                                        _value: 1000521,
                                                        _ver: 1
                                                    },
                                                    requireConsent: true
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    id: 'storeUuidCommon-v3',
                                    role: [
                                        {
                                            _value: 1001101,
                                            _ver: 1
                                        }
                                    ],
                                    document: [
                                        {
                                            code: {
                                                _value: 1000501,
                                                _ver: 2
                                            },
                                            requireConsent: false
                                        }
                                    ]
                                }
                            ]
                        }
                    },
                    {
                        catalogItem: {
                            ns: 'app/store/actor_1000101',
                            _code: {
                                _value: 1000120,
                                _ver: 5
                            }
                        },
                        template: {
                            _code: {
                                _value: 1000120,
                                _ver: 5
                            },
                            store: [
                                {
                                    id: 'storeUuidCommon-v1',
                                    role: [
                                        {
                                            _value: 1001101,
                                            _ver: 1
                                        }
                                    ],
                                    document: [
                                        {
                                            code: {
                                                _value: 1000501,
                                                _ver: 1
                                            },
                                            requireConsent: true
                                        }
                                    ],
                                    event: [
                                        {
                                            code: {
                                                _value: 1000511,
                                                _ver: 1
                                            },
                                            requireConsent: true,
                                            thing: [
                                                {
                                                    code: {
                                                        _value: 1000521,
                                                        _ver: 1
                                                    },
                                                    requireConsent: true
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    id: 'storeUuidCommon-v3',
                                    role: [
                                        {
                                            _value: 1001101,
                                            _ver: 1
                                        }
                                    ],
                                    document: [
                                        {
                                            code: {
                                                _value: 1000501,
                                                _ver: 2
                                            },
                                            requireConsent: false
                                        }
                                    ]
                                },
                                {
                                    id: 'storeUuidCommon-v4',
                                    role: [
                                        {
                                            _value: 1001101,
                                            _ver: 1
                                        }
                                    ],
                                    document: [
                                        {
                                            code: {
                                                _value: 1000502,
                                                _ver: 1
                                            },
                                            requireConsent: true
                                        }
                                    ],
                                    event: [
                                        {
                                            code: {
                                                _value: 1000512,
                                                _ver: 1
                                            },
                                            requireConsent: true,
                                            thing: [
                                                {
                                                    code: {
                                                        _value: 1000522,
                                                        _ver: 1
                                                    },
                                                    requireConsent: true
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    id: 'storeUuidCommon-v5',
                                    role: [
                                        {
                                            _value: 1001101,
                                            _ver: 1
                                        }
                                    ],
                                    document: [
                                        {
                                            code: {
                                                _value: 1000503,
                                                _ver: 1
                                            },
                                            requireConsent: true
                                        }
                                    ],
                                    event: [
                                        {
                                            code: {
                                                _value: 1000512,
                                                _ver: 2
                                            },
                                            requireConsent: false,
                                            thing: [
                                                {
                                                    code: {
                                                        _value: 1000522,
                                                        _ver: 2
                                                    },
                                                    requireConsent: false
                                                },
                                                {
                                                    code: {
                                                        _value: 1000524,
                                                        _ver: 1
                                                    },
                                                    requireConsent: false
                                                }
                                            ]
                                        },
                                        {
                                            code: {
                                                _value: 1000513,
                                                _ver: 1
                                            },
                                            requireConsent: true,
                                            thing: [
                                                {
                                                    code: {
                                                        _value: 1000523,
                                                        _ver: 1
                                                    }
                                                },
                                                {
                                                    code: {
                                                        _value: 1000524,
                                                        _ver: 1
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                ]);
            });
            test('正常：カタログ履歴取得　最小バージョン: 1 最大バージョン: 3', async () => {
                // スタブを起動
                catalog = new StubCatalogServerDataStore(200);
                // 判定対象のリクエスト生成
                const code: number = 1000120;
                const history: boolean = true;
                const minVersion: number = 1;
                const maxVersion: number = 3;

                // catalogServiceインスタンス生成
                const operator = new Operator();
                operator.setFromJson(Session.dataStoreGetApp);
                
                const catalogService = new CatalogService();

                // 判定
                let result: Catalog[];
                let error: AppError;

                try {
                    result = await catalogService.catalogAccessor(operator, code, history, minVersion, maxVersion);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                // ver4は削除済想定で取得対象外
                expect(result).toEqual([
                    {
                        catalogItem: {
                            ns: 'app/store/actor_1000101',
                            _code: {
                                _value: 1000120,
                                _ver: 1
                            }
                        },
                        template: {
                            _code: {
                                _value: 1000120,
                                _ver: 1
                            },
                            store: [
                                {
                                    id: 'storeUuidCommon-v1',
                                    role: [
                                        {
                                            _value: 1001101,
                                            _ver: 1
                                        }
                                    ],
                                    document: [
                                        {
                                            code: {
                                                _value: 1000501,
                                                _ver: 1
                                            },
                                            requireConsent: true
                                        }
                                    ],
                                    event: [
                                        {
                                            code: {
                                                _value: 1000511,
                                                _ver: 1
                                            },
                                            requireConsent: true,
                                            thing: [
                                                {
                                                    code: {
                                                        _value: 1000521,
                                                        _ver: 1
                                                    },
                                                    requireConsent: true
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    },
                    {
                        catalogItem: {
                            ns: 'app/store/actor_1000101',
                            _code: {
                                _value: 1000120,
                                _ver: 2
                            }
                        },
                        template: {
                            _code: {
                                _value: 1000120,
                                _ver: 2
                            },
                            store: [
                                {
                                    id: 'storeUuidCommon-v1',
                                    role: [
                                        {
                                            _value: 1001101,
                                            _ver: 1
                                        }
                                    ],
                                    document: [
                                        {
                                            code: {
                                                _value: 1000501,
                                                _ver: 1
                                            },
                                            requireConsent: true
                                        }
                                    ],
                                    event: [
                                        {
                                            code: {
                                                _value: 1000511,
                                                _ver: 1
                                            },
                                            requireConsent: true,
                                            thing: [
                                                {
                                                    code: {
                                                        _value: 1000521,
                                                        _ver: 1
                                                    },
                                                    requireConsent: true
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    id: 'storeUuidCommon-v2',
                                    role: [
                                        {
                                            _value: 1001101,
                                            _ver: 1
                                        }
                                    ],
                                    event: [
                                        {
                                            code: {
                                                _value: 1000511,
                                                _ver: 2
                                            },
                                            requireConsent: false,
                                            thing: [
                                                {
                                                    code: {
                                                        _value: 1000521,
                                                        _ver: 2
                                                    },
                                                    requireConsent: false
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    },
                    {
                        catalogItem: {
                            ns: 'app/store/actor_1000101',
                            _code: {
                                _value: 1000120,
                                _ver: 3
                            }
                        },
                        template: {
                            _code: {
                                _value: 1000120,
                                _ver: 3
                            },
                            store: [
                                {
                                    id: 'storeUuidCommon-v1',
                                    role: [
                                        {
                                            _value: 1001101,
                                            _ver: 1
                                        }
                                    ],
                                    document: [
                                        {
                                            code: {
                                                _value: 1000501,
                                                _ver: 1
                                            },
                                            requireConsent: true
                                        }
                                    ],
                                    event: [
                                        {
                                            code: {
                                                _value: 1000511,
                                                _ver: 1
                                            },
                                            requireConsent: true,
                                            thing: [
                                                {
                                                    code: {
                                                        _value: 1000521,
                                                        _ver: 1
                                                    },
                                                    requireConsent: true
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    id: 'storeUuidCommon-v3',
                                    role: [
                                        {
                                            _value: 1001101,
                                            _ver: 1
                                        }
                                    ],
                                    document: [
                                        {
                                            code: {
                                                _value: 1000501,
                                                _ver: 2
                                            },
                                            requireConsent: false
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                ]);
            });
            test('正常：カタログ履歴取得　最小バージョン: 4', async () => {
                // スタブを起動
                catalog = new StubCatalogServerDataStore(200);
                // 判定対象のリクエスト生成
                const code: number = 1000120;
                const history: boolean = true;
                const minVersion: number = 4;
                const maxVersion: number = null;

                // catalogServiceインスタンス生成
                const operator = new Operator();
                operator.setFromJson(Session.dataStoreGetApp);
                
                const catalogService = new CatalogService();

                // 判定
                let result: Catalog[];
                let error: AppError;

                try {
                    result = await catalogService.catalogAccessor(operator, code, history, minVersion, maxVersion);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                // ver4は削除済想定
                expect(result).toEqual([
                    {
                        catalogItem: {
                            ns: 'app/store/actor_1000101',
                            _code: {
                                _value: 1000120,
                                _ver: 5
                            }
                        },
                        template: {
                            _code: {
                                _value: 1000120,
                                _ver: 5
                            },
                            store: [
                                {
                                    id: 'storeUuidCommon-v1',
                                    role: [
                                        {
                                            _value: 1001101,
                                            _ver: 1
                                        }
                                    ],
                                    document: [
                                        {
                                            code: {
                                                _value: 1000501,
                                                _ver: 1
                                            },
                                            requireConsent: true
                                        }
                                    ],
                                    event: [
                                        {
                                            code: {
                                                _value: 1000511,
                                                _ver: 1
                                            },
                                            requireConsent: true,
                                            thing: [
                                                {
                                                    code: {
                                                        _value: 1000521,
                                                        _ver: 1
                                                    },
                                                    requireConsent: true
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    id: 'storeUuidCommon-v3',
                                    role: [
                                        {
                                            _value: 1001101,
                                            _ver: 1
                                        }
                                    ],
                                    document: [
                                        {
                                            code: {
                                                _value: 1000501,
                                                _ver: 2
                                            },
                                            requireConsent: false
                                        }
                                    ]
                                },
                                {
                                    id: 'storeUuidCommon-v4',
                                    role: [
                                        {
                                            _value: 1001101,
                                            _ver: 1
                                        }
                                    ],
                                    document: [
                                        {
                                            code: {
                                                _value: 1000502,
                                                _ver: 1
                                            },
                                            requireConsent: true
                                        }
                                    ],
                                    event: [
                                        {
                                            code: {
                                                _value: 1000512,
                                                _ver: 1
                                            },
                                            requireConsent: true,
                                            thing: [
                                                {
                                                    code: {
                                                        _value: 1000522,
                                                        _ver: 1
                                                    },
                                                    requireConsent: true
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    id: 'storeUuidCommon-v5',
                                    role: [
                                        {
                                            _value: 1001101,
                                            _ver: 1
                                        }
                                    ],
                                    document: [
                                        {
                                            code: {
                                                _value: 1000503,
                                                _ver: 1
                                            },
                                            requireConsent: true
                                        }
                                    ],
                                    event: [
                                        {
                                            code: {
                                                _value: 1000512,
                                                _ver: 2
                                            },
                                            requireConsent: false,
                                            thing: [
                                                {
                                                    code: {
                                                        _value: 1000522,
                                                        _ver: 2
                                                    },
                                                    requireConsent: false
                                                },
                                                {
                                                    code: {
                                                        _value: 1000524,
                                                        _ver: 1
                                                    },
                                                    requireConsent: false
                                                }
                                            ]
                                        },
                                        {
                                            code: {
                                                _value: 1000513,
                                                _ver: 1
                                            },
                                            requireConsent: true,
                                            thing: [
                                                {
                                                    code: {
                                                        _value: 1000523,
                                                        _ver: 1
                                                    }
                                                },
                                                {
                                                    code: {
                                                        _value: 1000524,
                                                        _ver: 1
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                ]);
            });
            test('正常：カタログ履歴取得　取得結果0件(200)', async () => {
                // スタブを起動
                catalog = new StubCatalogServerDataStore(200);
                // 判定対象のリクエスト生成
                const code: number = 1000121;
                const history: boolean = true;
                const minVersion: number = 1;
                const maxVersion: number = null;

                // catalogServiceインスタンス生成
                const operator = new Operator();
                operator.setFromJson(Session.dataStoreGetApp);
                
                const catalogService = new CatalogService();

                // 判定
                let result: Catalog[];
                let error: AppError;

                try {
                    result = await catalogService.catalogAccessor(operator, code, history, minVersion, maxVersion);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result).toEqual([]);
            });
            test('正常：カタログ履歴取得　取得結果0件(404)', async () => {
                // スタブを起動
                catalog = new StubCatalogServerDataStore(404);
                // 判定対象のリクエスト生成
                const code: number = 1000120;
                const history: boolean = true;
                const minVersion: number = 1;
                const maxVersion: number = null;

                // catalogServiceインスタンス生成
                const operator = new Operator();
                operator.setFromJson(Session.dataStoreGetApp);
                
                const catalogService = new CatalogService();

                // 判定
                let result: Catalog[];
                let error: AppError;

                try {
                    result = await catalogService.catalogAccessor(operator, code, history, minVersion, maxVersion);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result).toEqual([]);
            });
        });
        describe('異常系', () => {
            test('異常：オペレータ不足', async () => {
                // スタブを起動
                catalog = new StubCatalogServerDataStore(200);
                // 判定対象のリクエスト生成
                const code: number = 1000101;
                const history: boolean = false;
                const minVersion: number = null;
                const maxVersion: number = null;

                // catalogServiceインスタンス生成
                
                const catalogService = new CatalogService();

                // 判定
                let result: Catalog[];
                let error: AppError;

                try {
                    result = await catalogService.catalogAccessor(null, code, history, minVersion, maxVersion);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(ResponseCode.BAD_REQUEST);
                expect(error.message).toBe(Message.NOT_SET_OPERATOR);
            });
            test('異常：コード未指定', async () => {
                // スタブを起動
                catalog = new StubCatalogServerDataStore(200);
                // 判定対象のリクエスト生成
                const code: number = null;
                const history: boolean = false;
                const minVersion: number = null;
                const maxVersion: number = null;

                // catalogServiceインスタンス生成
                const operator = new Operator();
                operator.setFromJson(Session.dataStoreGetApp);
                
                const catalogService = new CatalogService();

                // 判定
                let result: Catalog[];
                let error: AppError;

                try {
                    result = await catalogService.catalogAccessor(operator, code, history, minVersion, maxVersion);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(ResponseCode.BAD_REQUEST);
                expect(error.message).toBe(Message.validation.isNotEmpty);
            });
            test('異常：履歴取得、起点バージョン未指定', async () => {
                // スタブを起動
                catalog = new StubCatalogServerDataStore(200);
                // 判定対象のリクエスト生成
                const code: number = 1000101;
                const history: boolean = true;
                const minVersion: number = null;
                const maxVersion: number = null;

                // catalogServiceインスタンス生成
                const operator = new Operator();
                operator.setFromJson(Session.dataStoreGetApp);
                
                const catalogService = new CatalogService();

                // 判定
                let result: Catalog[];
                let error: AppError;

                try {
                    result = await catalogService.catalogAccessor(operator, code, history, minVersion, maxVersion);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(ResponseCode.BAD_REQUEST);
                expect(error.message).toBe(Message.CATALOG_HISTORY_REQUIRE_MIN_VERSION);
            });
            test('異常：履歴取得、起点バージョンが終点バージョンより大きい', async () => {
                // スタブを起動
                catalog = new StubCatalogServerDataStore(200);
                // 判定対象のリクエスト生成
                const code: number = 1000101;
                const history: boolean = false;
                const minVersion: number = 5;
                const maxVersion: number = 3;

                // catalogServiceインスタンス生成
                const operator = new Operator();
                operator.setFromJson(Session.dataStoreGetApp);
                
                const catalogService = new CatalogService();

                // 判定
                let result: Catalog[];
                let error: AppError;

                try {
                    result = await catalogService.catalogAccessor(operator, code, history, minVersion, maxVersion);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(ResponseCode.BAD_REQUEST);
                expect(error.message).toBe(Message.INVALID_MIN_AND_MAX_VERSION);
            });
            test('異常：カタログ取得　取得結果0件(404)', async () => {
                // スタブを起動
                catalog = new StubCatalogServerDataStore(404);
                // 判定対象のリクエスト生成
                const code: number = 1000110;
                const history: boolean = false;
                const minVersion: number = null;
                const maxVersion: number = null;

                // catalogServiceインスタンス生成
                const operator = new Operator();
                operator.setFromJson(Session.dataStoreGetApp);
                
                const catalogService = new CatalogService();

                // 判定
                let result: Catalog[];
                let error: AppError;

                try {
                    result = await catalogService.catalogAccessor(operator, code, history, minVersion, maxVersion);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(ResponseCode.NOT_FOUND);
                expect(error.message).toBe(Message.FAILED_CATALOG_GET);
            });
            test('異常：カタログサービスからのレスポンスが400', async () => {
                // スタブを起動
                catalog = new StubCatalogServerDataStore(400);
                // 判定対象のリクエスト生成
                const code: number = 1000101;
                const history: boolean = false;
                const minVersion: number = null;
                const maxVersion: number = null;

                // catalogServiceインスタンス生成
                const operator = new Operator();
                operator.setFromJson(Session.dataStoreGetApp);
                
                const catalogService = new CatalogService();

                // 判定
                let result: Catalog[];
                let error: AppError;

                try {
                    result = await catalogService.catalogAccessor(operator, code, history, minVersion, maxVersion);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(ResponseCode.BAD_REQUEST);
                expect(error.message).toBe(Message.FAILED_CATALOG_GET);
            });
            test('異常：カタログサービスからのレスポンスが500系', async () => {
                // スタブを起動
                catalog = new StubCatalogServerDataStore(500);
                // 判定対象のリクエスト生成
                const code: number = 1000101;
                const history: boolean = false;
                const minVersion: number = null;
                const maxVersion: number = null;

                // catalogServiceインスタンス生成
                const operator = new Operator();
                operator.setFromJson(Session.dataStoreGetApp);
                
                const catalogService = new CatalogService();

                // 判定
                let result: Catalog[];
                let error: AppError;

                try {
                    result = await catalogService.catalogAccessor(operator, code, history, minVersion, maxVersion);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(ResponseCode.SERVICE_UNAVAILABLE);
                expect(error.message).toBe(Message.FAILED_CATALOG_GET);
            });
            test('異常：カタログサービスからのレスポンスが200, 404, 400, 500系以外', async () => {
                // スタブを起動
                catalog = new StubCatalogServerDataStore(204);
                // 判定対象のリクエスト生成
                const code: number = 1000101;
                const history: boolean = false;
                const minVersion: number = null;
                const maxVersion: number = null;

                // catalogServiceインスタンス生成
                const operator = new Operator();
                operator.setFromJson(Session.dataStoreGetApp);
                
                const catalogService = new CatalogService();

                // 判定
                let result: Catalog[];
                let error: AppError;

                try {
                    result = await catalogService.catalogAccessor(operator, code, history, minVersion, maxVersion);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(ResponseCode.UNAUTHORIZED);
                expect(error.message).toBe(Message.FAILED_CATALOG_GET);
            });
            test('異常：カタログサービス未起動', async () => {
                // スタブを起動しない
                // 判定対象のリクエスト生成
                const code: number = 1000101;
                const history: boolean = false;
                const minVersion: number = null;
                const maxVersion: number = null;

                // catalogServiceインスタンス生成
                const operator = new Operator();
                operator.setFromJson(Session.dataStoreGetApp);
                
                const catalogService = new CatalogService();

                // 判定
                let result: Catalog[];
                let error: AppError;

                try {
                    result = await catalogService.catalogAccessor(operator, code, history, minVersion, maxVersion);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(ResponseCode.SERVICE_UNAVAILABLE);
                expect(error.message).toBe(Message.FAILED_CONNECT_TO_CATALOG);
            });
            test('異常：カタログ履歴取得、カタログサービスからのレスポンスが400', async () => {
                // スタブを起動
                catalog = new StubCatalogServerDataStore(400);
                // 判定対象のリクエスト生成
                const code: number = 1000121;
                const history: boolean = true;
                const minVersion: number = 1;
                const maxVersion: number = null;

                // catalogServiceインスタンス生成
                const operator = new Operator();
                operator.setFromJson(Session.dataStoreGetApp);
                
                const catalogService = new CatalogService();

                // 判定
                let result: Catalog[];
                let error: AppError;

                try {
                    result = await catalogService.catalogAccessor(operator, code, history, minVersion, maxVersion);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(ResponseCode.BAD_REQUEST);
                expect(error.message).toBe(Message.FAILED_CATALOG_GET);
            });
            test('異常：カタログ履歴取得、カタログサービスからのレスポンスが500系', async () => {
                // スタブを起動
                catalog = new StubCatalogServerDataStore(500);
                // 判定対象のリクエスト生成
                const code: number = 1000121;
                const history: boolean = true;
                const minVersion: number = 1;
                const maxVersion: number = null;

                // catalogServiceインスタンス生成
                const operator = new Operator();
                operator.setFromJson(Session.dataStoreGetApp);
                
                const catalogService = new CatalogService();

                // 判定
                let result: Catalog[];
                let error: AppError;

                try {
                    result = await catalogService.catalogAccessor(operator, code, history, minVersion, maxVersion);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(ResponseCode.SERVICE_UNAVAILABLE);
                expect(error.message).toBe(Message.FAILED_CATALOG_GET);
            });
            test('異常：カタログ履歴取得、カタログサービスからのレスポンスが200, 204, 404, 400, 500系以外', async () => {
                // スタブを起動
                catalog = new StubCatalogServerDataStore(405);
                // 判定対象のリクエスト生成
                const code: number = 1000121;
                const history: boolean = true;
                const minVersion: number = 1;
                const maxVersion: number = null;

                // catalogServiceインスタンス生成
                const operator = new Operator();
                operator.setFromJson(Session.dataStoreGetApp);
                
                const catalogService = new CatalogService();

                // 判定
                let result: Catalog[];
                let error: AppError;

                try {
                    result = await catalogService.catalogAccessor(operator, code, history, minVersion, maxVersion);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(ResponseCode.UNAUTHORIZED);
                expect(error.message).toBe(Message.FAILED_CATALOG_GET);
            });
            test('異常：カタログ履歴取得、カタログサービス未起動', async () => {
                // スタブを起動しない
                // 判定対象のリクエスト生成
                const code: number = 1000121;
                const history: boolean = true;
                const minVersion: number = 1;
                const maxVersion: number = null;

                // catalogServiceインスタンス生成
                const operator = new Operator();
                operator.setFromJson(Session.dataStoreGetApp);
                
                const catalogService = new CatalogService();

                // 判定
                let result: Catalog[];
                let error: AppError;

                try {
                    result = await catalogService.catalogAccessor(operator, code, history, minVersion, maxVersion);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(ResponseCode.SERVICE_UNAVAILABLE);
                expect(error.message).toBe(Message.FAILED_CONNECT_TO_CATALOG);
            });
        });
    });
    describe('共有制限定義カタログ取得関数', () => {
        describe('正常系', () => {
            test('正常：appアクターの共有制限定義カタログ', async () => {
                // スタブを起動
                catalog = new StubCatalogServerDataStore(200);
                // 判定対象のリクエスト生成
                const actorCode: number = 1000101;

                // catalogServiceインスタンス生成
                const operator = new Operator();
                operator.setFromJson(Session.dataStoreGetApp);
                
                const catalogService = new CatalogService();

                // 判定
                let result: Catalog[];
                let error: AppError;

                try {
                    result = await catalogService.shareRestrictionAccessor(operator, actorCode);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result).toEqual([{
                    catalogItem: {
                        ns: 'catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000101/sharing-restriction',
                        _code: {
                            _value: 1000140,
                            _ver: 1
                        }
                    },
                    template: {
                        _code: {
                            _value: 1000140,
                            _ver: 1
                        },
                        document: [
                            {
                                code: {
                                    _value: 1000501,
                                    _ver: 1
                                },
                                permission: [
                                    {
                                        region: null,
                                        service: [
                                            {
                                                _value: 1000110,
                                                _ver: 1
                                            }
                                        ]
                                    }
                                ],
                                prohibition: null
                            },
                            {
                                code: {
                                    _value: 1000502,
                                    _ver: 1
                                },
                                permission: [
                                    {
                                        region: null,
                                        service: null
                                    }
                                ],
                                prohibition: []
                            },
                            {
                                code: {
                                    _value: 1000503,
                                    _ver: 1
                                },
                                permission: null,
                                prohibition: [
                                    {
                                        region: null,
                                        service: null
                                    }
                                ]
                            }
                        ],
                        event: [
                            {
                                code: {
                                    _value: 1000512,
                                    _ver: 1
                                },
                                permission: [
                                    {
                                        region: [
                                            {
                                                _value: 1000310,
                                                _ver: 1
                                            }
                                        ],
                                        service: null
                                    }
                                ],
                                prohibition: null
                            }
                        ],
                        thing: [
                            {
                                code: {
                                    _value: 1000522,
                                    _ver: 1
                                },
                                permission: null,
                                prohibition: [
                                    {
                                        region: null,
                                        service: [
                                            {
                                                _value: 1000111,
                                                _ver: 1
                                            },
                                            {
                                                _value: 1000210,
                                                _ver: 1
                                            }
                                        ]
                                    },
                                    {
                                        region: null,
                                        service: [
                                            {
                                                _value: 1000212,
                                                _ver: 1
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                code: {
                                    _value: 1000523,
                                    _ver: 2
                                },
                                permission: null,
                                prohibition: [
                                    {
                                        region: [
                                            {
                                                _value: 1000311,
                                                _ver: 1
                                            }
                                        ],
                                        service: null
                                    }
                                ]
                            }
                        ]
                    }
                }]);
            });
            test('正常：APPアクターの共有制限定義カタログ', async () => {
                // スタブを起動
                catalog = new StubCatalogServerDataStore(200);
                // 判定対象のリクエスト生成
                const actorCode: number = 1000201;

                // catalogServiceインスタンス生成
                const operator = new Operator();
                operator.setFromJson(Session.dataStoreGetApp);
                
                const catalogService = new CatalogService();

                // 判定
                let result: Catalog[];
                let error: AppError;

                try {
                    result = await catalogService.shareRestrictionAccessor(operator, actorCode);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result).toEqual([{
                    catalogItem: {
                        ns: 'catalog/ext/aaa-healthcare-consortium/actor/app/actor_1000201/sharing-restriction',
                        _code: {
                            _value: 1000240,
                            _ver: 1
                        }
                    },
                    template: {
                        _code: {
                            _value: 1000240,
                            _ver: 1
                        },
                        document: [
                            {
                                code: {
                                    _value: 1000501,
                                    _ver: 1
                                },
                                permission: [
                                    {
                                        region: null,
                                        service: [
                                            {
                                                _value: 1000110,
                                                _ver: 1
                                            }
                                        ]
                                    }
                                ],
                                prohibition: null
                            }
                        ],
                        event: [
                            {
                                code: {
                                    _value: 1000512,
                                    _ver: 1
                                },
                                permission: [
                                    {
                                        region: [
                                            {
                                                _value: 1000310,
                                                _ver: 1
                                            }
                                        ],
                                        service: null
                                    }
                                ],
                                prohibition: null
                            },
                            {
                                code: {
                                    _value: 1000511,
                                    _ver: 1
                                },
                                permission: [
                                    {
                                        region: null,
                                        service: [
                                            {
                                                _value: 1000110,
                                                _ver: 1
                                            }
                                        ]
                                    }
                                ],
                                prohibition: null
                            }
                        ],
                        thing: [
                            {
                                code: {
                                    _value: 1000523,
                                    _ver: 1
                                },
                                permission: null,
                                prohibition: [
                                    {
                                        region: null,
                                        service: [
                                            {
                                                _value: 1000210,
                                                _ver: 1
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                code: {
                                    _value: 1000521,
                                    _ver: 1
                                },
                                permission: [
                                    {
                                        region: null,
                                        service: [
                                            {
                                                _value: 1000110,
                                                _ver: 1
                                            }
                                        ]
                                    }
                                ],
                                prohibition: null
                            }
                        ]
                    }
                }]);
            });
            test('正常：共有制限定義カタログの取得結果が空（カタログサービスからのレスポンス：404）', async () => {
                // スタブを起動
                catalog = new StubCatalogServerDataStore(404);
                // 判定対象のリクエスト生成
                const actorCode: number = 1000101;

                // catalogServiceインスタンス生成
                const operator = new Operator();
                operator.setFromJson(Session.dataStoreGetApp);
                
                const catalogService = new CatalogService();

                // 判定
                let result: Catalog[];
                let error: AppError;

                try {
                    result = await catalogService.shareRestrictionAccessor(operator, actorCode);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(result).toEqual([]);
            });
        });
        describe('異常系', () => {
            test('異常：カタログサービスからのレスポンスが400', async () => {
                // スタブを起動
                catalog = new StubCatalogServerDataStore(400);
                // 判定対象のリクエスト生成
                const actorCode: number = 1000101;

                // catalogServiceインスタンス生成
                const operator = new Operator();
                operator.setFromJson(Session.dataStoreGetApp);
                
                const catalogService = new CatalogService();

                // 判定
                let result: Catalog[];
                let error: AppError;

                try {
                    result = await catalogService.shareRestrictionAccessor(operator, actorCode);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(ResponseCode.BAD_REQUEST);
                expect(error.message).toBe(Message.FAILED_CATALOG_GET);
            });
            test('異常：カタログサービスからのレスポンスが500系', async () => {
                // スタブを起動
                catalog = new StubCatalogServerDataStore(500);
                // 判定対象のリクエスト生成
                const actorCode: number = 1000101;

                // catalogServiceインスタンス生成
                const operator = new Operator();
                operator.setFromJson(Session.dataStoreGetApp);
                
                const catalogService = new CatalogService();

                // 判定
                let result: Catalog[];
                let error: AppError;

                try {
                    result = await catalogService.shareRestrictionAccessor(operator, actorCode);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(ResponseCode.SERVICE_UNAVAILABLE);
                expect(error.message).toBe(Message.FAILED_CATALOG_GET);
            });
            test('異常：カタログサービスからのレスポンスが200, 400, 404, 500系以外', async () => {
                // スタブを起動
                catalog = new StubCatalogServerDataStore(204);
                // 判定対象のリクエスト生成
                const actorCode: number = 1000101;

                // catalogServiceインスタンス生成
                const operator = new Operator();
                operator.setFromJson(Session.dataStoreGetApp);
                
                const catalogService = new CatalogService();

                // 判定
                let result: Catalog[];
                let error: AppError;

                try {
                    result = await catalogService.shareRestrictionAccessor(operator, actorCode);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(ResponseCode.UNAUTHORIZED);
                expect(error.message).toBe(Message.FAILED_CATALOG_GET);
            });
            test('異常：カタログサービス未起動', async () => {
                // スタブを起動しない
                // 判定対象のリクエスト生成
                const actorCode: number = 1000101;

                // catalogServiceインスタンス生成
                const operator = new Operator();
                operator.setFromJson(Session.dataStoreGetApp);
                
                const catalogService = new CatalogService();

                // 判定
                let result: Catalog[];
                let error: AppError;

                try {
                    result = await catalogService.shareRestrictionAccessor(operator, actorCode);
                } catch (err) {
                    error = err;
                }

                // レスポンスチェック
                expect(error.statusCode).toBe(ResponseCode.SERVICE_UNAVAILABLE);
                expect(error.message).toBe(Message.FAILED_CONNECT_TO_CATALOG);
            });
        });
    });
});
