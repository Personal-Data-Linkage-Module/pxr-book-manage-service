/* eslint-disable */
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { Session } from './Session';
import Config from '../common/Config';
import { getCatalog, getNoDataOperationCatalog } from './accessor/CatalogAccessor';
import CatalogService from '../services/CatalogService';
import PostDataSharePermissionReqDto from 'resources/dto/PostDataSharePermissionReqDto';
import StubCTokenLedgerServer from './StubCTokenLedgerServer';
import { getShareRestrictionCatalogs } from './accessor/ShareRestrictionAccessor';
const Message = Config.ReadConfig('./config/message.json');

// 対象アプリケーションを取得
const app = new Application();
const expressApp = app.express.app;
const common = new Common();

// サーバをlisten
app.start();

let cTokenServer: StubCTokenLedgerServer = null;

/**
 * book-mange API のユニットテスト
 */
describe('book-mange API', () => {
    /**
     * 全テスト実行の前処理
     */
    beforeAll(async () => {
        // DB接続
        await common.connect();
        // DB初期化
        await common.executeSqlFile('initialData.sql');

        // 事前データ準備
        await common.executeSqlFile('initialDataSharePermission.sql');
    });
    /**
     * 各テスト実行の前処理
     */
    beforeEach(async () => {
        // DB接続
        await common.connect();
    });

    afterEach(async () => {
        // スタブサーバー停止
        if (cTokenServer) {
            cTokenServer._server.close();
            cTokenServer = null;
        }
    })

    /**
     * 全テスト実行の後処理
     */
    afterAll(async () => {
        // サーバ停止
        app.stop();
    });

    jest.mock('../services/CatalogService', () => ({
        ...jest.requireActual('../services/CatalogService') as any,
        catalogAccessor: jest.fn()
    }));

    /**
     * データ共有可否判定
     * 必要なのはカタログのスタブとDB状態
     * agreementAccessorの動きを確認するために実際にanalyzerを回す必要がある
     * catalogAccessorの方は別途カタログサービスのUTで要確認
     */
    describe('データ共有可否判定', () => {
        // catalogAccessorメソッドのmock化
        jest.spyOn(CatalogService.prototype, 'catalogAccessor').mockImplementation(getCatalog);
        jest.spyOn(CatalogService.prototype, 'shareRestrictionAccessor').mockImplementation(getShareRestrictionCatalogs);
        describe('アプリケーションによるリクエスト', () => {
            test('正常：document 可判定', async () => {
                // スタブ起動
                cTokenServer = new StubCTokenLedgerServer(3008, 2, 200);
                // 送信データを生成
                const json: PostDataSharePermissionReqDto = {
                    userId: 'appUser01',
                    appCode: 1000110,
                    wfCode: null,
                    actorCode: 1000101,
                    sourceActorCode: null,
                    sourceAssetCode: null,
                    isTriggerRequest: null,
                    document: [
                        {
                            _value: 1000501,
                            _ver: 1
                        }
                    ],
                    event: null,
                    thing: null
                };
    
                // 対象APIに送信
                const response = await supertest(expressApp).post(Url.dataSharePermissionURI)
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.dataStoreGetApp) })
                    .send(json);
    
                // レスポンスチェック
                expect(response.status).toBe(200);
                expect(response.body.checkResult).toBe(true);
                expect(response.body.permission).toEqual([
                    {
                        sourceActorCode: 1000101,
                        document: [
                            {
                                _value: 1000501,
                                _ver: 1
                            }
                        ],
                        event: [],
                        thing: []
                    },
                    {
                        sourceActorCode: 1000201,
                        document: [
                            {
                                _value: 1000501,
                                _ver: 1
                            }
                        ],
                        event: [],
                        thing: []
                    }
                ]);
            });
            test('正常：event 可判定', async () => {
                // スタブ起動
                cTokenServer = new StubCTokenLedgerServer(3008, 2, 200);
                // 送信データを生成
                const json: PostDataSharePermissionReqDto = {
                    userId: 'appUser01',
                    appCode: 1000110,
                    wfCode: null,
                    actorCode: 1000101,
                    sourceActorCode: null,
                    sourceAssetCode: null,
                    isTriggerRequest: null,
                    document: [],
                    event: [
                        {
                            _value: 1000511,
                            _ver: 1
                        }
                    ],
                    thing: null
                };
    
                // 対象APIに送信
                const response = await supertest(expressApp).post(Url.dataSharePermissionURI)
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.dataStoreGetApp) })
                    .send(json);
    
                // レスポンスチェック
                expect(response.status).toBe(200);
                expect(response.body.checkResult).toBe(true);
                expect(response.body.permission).toEqual([
                    {
                        sourceActorCode: 1000101,
                        document: [],
                        event: [
                            {
                                _value: 1000511,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000521,
                                _ver: 1
                            }
                        ]
                    },
                    {
                        sourceActorCode: 1000201,
                        document: [],
                        event: [
                            {
                                _value: 1000511,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000521,
                                _ver: 1
                            }
                        ]
                    }
                ]);
            });
            test('正常：thing(event配下のthing) 可判定', async () => {
                // スタブ起動
                cTokenServer = new StubCTokenLedgerServer(3008, 2, 200);
                // 送信データを生成
                const json: PostDataSharePermissionReqDto = {
                    userId: 'appUser01',
                    appCode: 1000110,
                    wfCode: null,
                    actorCode: 1000101,
                    sourceActorCode: null,
                    sourceAssetCode: null,
                    isTriggerRequest: null,
                    document: [],
                    event: [],
                    thing: [
                        {
                            _value: 1000521,
                            _ver: 1
                        }
                    ]
                };
    
                // 対象APIに送信
                const response = await supertest(expressApp).post(Url.dataSharePermissionURI)
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.dataStoreGetApp) })
                    .send(json);
    
                // レスポンスチェック
                expect(response.status).toBe(200);
                expect(response.body.checkResult).toBe(true);
                expect(response.body.permission).toEqual([
                    {
                        sourceActorCode: 1000101,
                        document: [],
                        event: [],
                        thing: [
                            {
                                _value: 1000521,
                                _ver: 1
                            }
                        ]
                    },
                    {
                        sourceActorCode: 1000201,
                        document: [],
                        event: [],
                        thing: [
                            {
                                _value: 1000521,
                                _ver: 1
                            }
                        ]
                    }
                ]);
            });
            test('正常：thing(event配下でないthing) 可判定', async () => {
                // スタブ起動
                cTokenServer = new StubCTokenLedgerServer(3008, 2, 200);
                // 送信データを生成
                const json: PostDataSharePermissionReqDto = {
                    userId: 'appUser01',
                    appCode: 1000110,
                    wfCode: null,
                    actorCode: 1000101,
                    sourceActorCode: null,
                    sourceAssetCode: null,
                    isTriggerRequest: null,
                    document: [],
                    event: [],
                    thing: [
                        {
                            _value: 1000524,
                            _ver: 1
                        }
                    ]
                };
    
                // 対象APIに送信
                const response = await supertest(expressApp).post(Url.dataSharePermissionURI)
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.dataStoreGetApp) })
                    .send(json);
    
                // レスポンスチェック
                expect(response.status).toBe(200);
                expect(response.body.checkResult).toBe(true);
                expect(response.body.permission).toEqual([
                    {
                        sourceActorCode: 1000101,
                        document: [],
                        event: [],
                        thing: [
                            {
                                _value: 1000524,
                                _ver: 1
                            }
                        ]
                    },
                    {
                        sourceActorCode: 1000201,
                        document: [],
                        event: [],
                        thing: [
                            {
                                _value: 1000524,
                                _ver: 1
                            }
                        ]
                    }
                ]);
            });
            test('正常：共有定義に共有元指定有 可判定', async () => {
                // スタブ起動
                cTokenServer = new StubCTokenLedgerServer(3008, 2, 200);
                // 送信データを生成
                const json: PostDataSharePermissionReqDto = {
                    userId: 'appUser02',
                    appCode: null,
                    wfCode: 1000111,
                    actorCode: 1000101,
                    sourceActorCode: null,
                    sourceAssetCode: null,
                    isTriggerRequest: null,
                    document: [
                        {
                            _value: 1000503,
                            _ver: 1
                        }
                    ],
                    event: null,
                    thing: null
                };
    
                // 対象APIに送信
                const response = await supertest(expressApp).post(Url.dataSharePermissionURI)
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.dataStoreGetApp) })
                    .send(json);
    
                // レスポンスチェック
                expect(response.status).toBe(200);
                expect(response.body.checkResult).toBe(true);
                expect(response.body.permission).toEqual([
                    {
                        sourceActorCode: 1000201,
                        document: [
                            {
                                _value: 1000503,
                                _ver: 1
                            }
                        ],
                        event: [],
                        thing: []
                    }
                ]);
            });
            test('正常：共有制限定義で除外されるアクターあり 可判定', async () => {
                // スタブ起動
                cTokenServer = new StubCTokenLedgerServer(3008, 2, 200);
                // 送信データを生成
                const json: PostDataSharePermissionReqDto = {
                    userId: 'appUser02',
                    appCode: null,
                    wfCode: 1000111,
                    actorCode: 1000101,
                    sourceActorCode: null,
                    sourceAssetCode: null,
                    isTriggerRequest: null,
                    document: null,
                    event: null,
                    thing: [
                        {
                            _value: 1000522,
                            _ver: 1
                        }
                    ]
                };
    
                // 対象APIに送信
                const response = await supertest(expressApp).post(Url.dataSharePermissionURI)
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.dataStoreGetApp) })
                    .send(json);
    
                // レスポンスチェック
                expect(response.status).toBe(200);
                expect(response.body.checkResult).toBe(true);
                expect(response.body.permission).toEqual([
                    {
                        sourceActorCode: 1000201,
                        document: [],
                        event: [],
                        thing: [
                            {
                                _value: 1000522,
                                _ver: 1
                            }
                        ]
                    }
                ]);
            });
            test('正常：リクエストの共有元指定有 可判定', async () => {
                // スタブ起動
                cTokenServer = new StubCTokenLedgerServer(3008, 2, 200);
                // 送信データを生成
                const json: PostDataSharePermissionReqDto = {
                    userId: 'appUser01',
                    appCode: 1000110,
                    wfCode: null,
                    actorCode: 1000101,
                    sourceActorCode: 1000101,
                    sourceAssetCode: 1000110,
                    isTriggerRequest: null,
                    document: [
                        {
                            _value: 1000501,
                            _ver: 1
                        }
                    ],
                    event: null,
                    thing: null
                };
    
                // 対象APIに送信
                const response = await supertest(expressApp).post(Url.dataSharePermissionURI)
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.dataStoreGetApp) })
                    .send(json);
    
                // レスポンスチェック
                expect(response.status).toBe(200);
                expect(response.body.checkResult).toBe(true);
                expect(response.body.permission).toEqual([
                    {
                        sourceActorCode: 1000101,
                        document: [
                            {
                                _value: 1000501,
                                _ver: 1
                            }
                        ],
                        event: [],
                        thing: []
                    }
                ]);
            });
            test('正常：共有制限定義で全てのアクターが除外される 不可判定', async () => {
                // スタブ起動
                cTokenServer = new StubCTokenLedgerServer(3008, 2, 200);
                // 送信データを生成
                const json: PostDataSharePermissionReqDto = {
                    userId: 'appUser02',
                    appCode: null,
                    wfCode: 1000111,
                    actorCode: 1000101,
                    sourceActorCode: null,
                    sourceAssetCode: null,
                    isTriggerRequest: null,
                    document: [
                        {
                            _value: 1000501,
                            _ver: 1
                        }
                    ],
                    event: null,
                    thing: null
                };
    
                // 対象APIに送信
                const response = await supertest(expressApp).post(Url.dataSharePermissionURI)
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.dataStoreGetApp) })
                    .send(json);
    
                // レスポンスチェック
                expect(response.status).toBe(200);
                expect(response.body.checkResult).toBe(false);
                expect(response.body.permission).toEqual(null);
            });
            test('正常：リクエストの共有元指定によって全てのアクターが除外される 不可判定', async () => {
                // スタブ起動
                cTokenServer = new StubCTokenLedgerServer(3008, 2, 200);
                // 送信データを生成
                const json: PostDataSharePermissionReqDto = {
                    userId: 'appUser02',
                    appCode: null,
                    wfCode: 1000111,
                    actorCode: 1000101,
                    sourceActorCode: 1000101,
                    sourceAssetCode: 1000110,
                    isTriggerRequest: null,
                    document: [
                        {
                            _value: 1000503,
                            _ver: 1
                        }
                    ],
                    event: null,
                    thing: null
                };
    
                // 対象APIに送信
                const response = await supertest(expressApp).post(Url.dataSharePermissionURI)
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.dataStoreGetApp) })
                    .send(json);
    
                // レスポンスチェック
                expect(response.status).toBe(200);
                expect(response.body.checkResult).toBe(false);
                expect(response.body.permission).toEqual(null);
            });
            test('正常：cToken取得で共有元候補アクターが0件 不可判定', async () => {
                // スタブ起動
                cTokenServer = new StubCTokenLedgerServer(3008, 2, 204);
                // 送信データを生成
                const json: PostDataSharePermissionReqDto = {
                    userId: 'appUser01',
                    appCode: 1000110,
                    wfCode: null,
                    actorCode: 1000101,
                    sourceActorCode: null,
                    sourceAssetCode: null,
                    isTriggerRequest: null,
                    document: [
                        {
                            _value: 1000501,
                            _ver: 1
                        }
                    ],
                    event: null,
                    thing: null
                };
    
                // 対象APIに送信
                const response = await supertest(expressApp).post(Url.dataSharePermissionURI)
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.dataStoreGetApp) })
                    .send(json);
    
                // レスポンスチェック
                expect(response.status).toBe(200);
                expect(response.body.checkResult).toBe(false);
                expect(response.body.permission).toEqual(null);
            });
            test('正常：複数データ種 全て可判定', async () => {
                // スタブ起動
                cTokenServer = new StubCTokenLedgerServer(3008, 2, 200);
                // 送信データを生成
                const json: PostDataSharePermissionReqDto = {
                    userId: 'appUser01',
                    appCode: 1000110,
                    wfCode: null,
                    actorCode: 1000101,
                    sourceActorCode: null,
                    sourceAssetCode: null,
                    isTriggerRequest: null,
                    document: [
                        {
                            _value: 1000501,
                            _ver: 1
                        }
                    ],
                    event: [
                        {
                            _value: 1000511,
                            _ver: 1
                        }
                    ],
                    thing: [
                        {
                            _value: 1000521,
                            _ver: 1
                        }
                    ]
                };
    
                // 対象APIに送信
                const response = await supertest(expressApp).post(Url.dataSharePermissionURI)
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.dataStoreGetApp) })
                    .send(json);
    
                // レスポンスチェック
                expect(response.status).toBe(200);
                expect(response.body.checkResult).toBe(true);
                expect(response.body.permission).toEqual([
                    {
                        sourceActorCode: 1000101,
                        document: [
                            {
                                _value: 1000501,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000511,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000521,
                                _ver: 1
                            }
                        ]
                    },
                    {
                        sourceActorCode: 1000201,
                        document: [
                            {
                                _value: 1000501,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000511,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000521,
                                _ver: 1
                            }
                        ]
                    }
                ]);
            });
            test('正常：共有定義上で、別々のevent配下に同じthingがある 可判定', async () => {
                // スタブ起動
                cTokenServer = new StubCTokenLedgerServer(3008, 2, 200);
                // 送信データを生成
                const json: PostDataSharePermissionReqDto = {
                    userId: 'appUser01',
                    appCode: 1000110,
                    wfCode: null,
                    actorCode: 1000101,
                    sourceActorCode: null,
                    sourceAssetCode: null,
                    isTriggerRequest: null,
                    document: [],
                    event: [
                        {
                            _value: 1000512,
                            _ver: 1
                        },
                        {
                            _value: 1000513,
                            _ver: 1
                        }
                    ],
                    thing: [
                        {
                            _value: 1000523,
                            _ver: 1
                        }
                    ]
                };
    
                // 対象APIに送信
                const response = await supertest(expressApp).post(Url.dataSharePermissionURI)
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.dataStoreGetApp) })
                    .send(json);
    
                // レスポンスチェック
                expect(response.status).toBe(200);
                expect(response.body.checkResult).toBe(true);
                expect(response.body.permission).toEqual([
                    {
                        sourceActorCode: 1000101,
                        document: [],
                        event: [
                            {
                                _value: 1000512,
                                _ver: 1
                            },
                            {
                                _value: 1000513,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000523,
                                _ver: 1
                            }
                        ]
                    },
                    {
                        sourceActorCode: 1000201,
                        document: [],
                        event: [
                            {
                                _value: 1000512,
                                _ver: 1
                            },
                            {
                                _value: 1000513,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000523,
                                _ver: 1
                            }
                        ]
                    }
                ]);
            });
            test('正常：蓄積同意のないデータ種、不可判定', async () => {
                // スタブ起動
                cTokenServer = new StubCTokenLedgerServer(3008, 2, 200);
                // 送信データを生成
                const json: PostDataSharePermissionReqDto = {
                    userId: 'appUser01',
                    appCode: 1000110,
                    wfCode: null,
                    actorCode: 1000101,
                    sourceActorCode: null,
                    sourceAssetCode: null,
                    isTriggerRequest: null,
                    document: [
                        {
                            _value: 1000502,
                            _ver: 1
                        }
                    ],
                    event: null,
                    thing: null
                };
    
                // 対象APIに送信
                const response = await supertest(expressApp).post(Url.dataSharePermissionURI)
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.dataStoreGetApp) })
                    .send(json);
    
                // レスポンスチェック
                expect(response.status).toBe(200);
                expect(response.body.checkResult).toBe(false);
                expect(response.body.permission).toEqual(null);
            });
            test('正常：複数データ種 一部データ種が不可判定、可判定', async () => {
                // スタブ起動
                cTokenServer = new StubCTokenLedgerServer(3008, 2, 200);
                // 送信データを生成
                const json: PostDataSharePermissionReqDto = {
                    userId: 'appUser01',
                    appCode: 1000110,
                    wfCode: null,
                    actorCode: 1000101,
                    sourceActorCode: null,
                    sourceAssetCode: null,
                    isTriggerRequest: null,
                    document: [
                        {
                            _value: 1000501,
                            _ver: 1
                        }
                    ],
                    event: [
                        {
                            _value: 1000511,
                            _ver: 1
                        },
                        {
                            _value: 1000515,
                            _ver: 1
                        }
                    ],
                    thing: [
                        {
                            _value: 1000521,
                            _ver: 1
                        }
                    ]
                };
    
                // 対象APIに送信
                const response = await supertest(expressApp).post(Url.dataSharePermissionURI)
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.dataStoreGetApp) })
                    .send(json);
    
                // レスポンスチェック
                expect(response.status).toBe(200);
                expect(response.body.checkResult).toBe(true);
                expect(response.body.permission).toEqual([
                    {
                        sourceActorCode: 1000101,
                        document: [
                            {
                                _value: 1000501,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000511,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000521,
                                _ver: 1
                            }
                        ]
                    },
                    {
                        sourceActorCode: 1000201,
                        document: [
                            {
                                _value: 1000501,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000511,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000521,
                                _ver: 1
                            }
                        ]
                    }
                ]);
            });
            test('正常：複数データ種 共有定義上でイベント配下に存在しないthingが同時にリクエストされている、可判定', async () => {
                // スタブ起動
                cTokenServer = new StubCTokenLedgerServer(3008, 2, 200);
                // 送信データを生成
                const json: PostDataSharePermissionReqDto = {
                    userId: 'appUser02',
                    appCode: null,
                    wfCode: 1000111,
                    actorCode: 1000101,
                    sourceActorCode: null,
                    sourceAssetCode: null,
                    isTriggerRequest: null,
                    document: [
                        {
                            _value: 1000502,
                            _ver: 1
                        }
                    ],
                    event: [
                        {
                            _value: 1000511,
                            _ver: 1
                        }
                    ],
                    thing: [
                        {
                            _value: 1000522,
                            _ver: 1
                        }
                    ]
                };
    
                // 対象APIに送信
                const response = await supertest(expressApp).post(Url.dataSharePermissionURI)
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.dataStoreGetApp) })
                    .send(json);
    
                // レスポンスチェック
                expect(response.status).toBe(200);
                expect(response.body.checkResult).toBe(true);
                expect(response.body.permission).toEqual([
                    {
                        sourceActorCode: 1000101,
                        document: [
                            {
                                _value: 1000502,
                                _ver: 1
                            }
                        ],
                        event: [],
                        thing: []
                    },
                    {
                        sourceActorCode: 1000201,
                        document: [
                            {
                                _value: 1000502,
                                _ver: 1
                            }
                        ],
                        event: [],
                        thing: [
                            {
                                _value: 1000522,
                                _ver: 1
                            }
                        ]
                    }
                ]);
            });
            test('正常：複数データ種 全てのデータ種が不可判定、不可判定', async () => {
                // スタブ起動
                cTokenServer = new StubCTokenLedgerServer(3008, 2, 200);
                // 送信データを生成
                const json: PostDataSharePermissionReqDto = {
                    userId: 'appUser01',
                    appCode: 1000110,
                    wfCode: null,
                    actorCode: 1000101,
                    sourceActorCode: null,
                    sourceAssetCode: null,
                    isTriggerRequest: null,
                    document: [
                        {
                            _value: 1000501,
                            _ver: 7
                        }
                    ],
                    event: [
                        {
                            _value: 1000511,
                            _ver: 7
                        },
                        {
                            _value: 1000515,
                            _ver: 7
                        }
                    ],
                    thing: [
                        {
                            _value: 1000521,
                            _ver: 7
                        }
                    ]
                };
    
                // 対象APIに送信
                const response = await supertest(expressApp).post(Url.dataSharePermissionURI)
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.dataStoreGetApp) })
                    .send(json);
    
                // レスポンスチェック
                expect(response.status).toBe(200);
                expect(response.body.checkResult).toBe(false);
                expect(response.body.permission).toEqual(null);
            });
            test('正常：shareToAsset.validShareが0件 不可判定', async () => {
                // モック先変更
                await jest.spyOn(CatalogService.prototype, 'catalogAccessor').mockImplementation(getNoDataOperationCatalog);
                // スタブ起動
                cTokenServer = new StubCTokenLedgerServer(3008, 2, 200);
                // 送信データを生成
                const json: PostDataSharePermissionReqDto = {
                    userId: 'appUser01',
                    appCode: 1000110,
                    wfCode: null,
                    actorCode: 1000101,
                    sourceActorCode: null,
                    sourceAssetCode: null,
                    isTriggerRequest: null,
                    document: null,
                    event: [
                        {
                            _value: 1000511,
                            _ver: 1
                        }
                    ],
                    thing: null
                };
    
                // 対象APIに送信
                const response = await supertest(expressApp).post(Url.dataSharePermissionURI)
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.dataStoreGetApp) })
                    .send(json);

                // レスポンスチェック
                expect(response.status).toBe(200);
                expect(response.body.checkResult).toBe(false);
                expect(response.body.permission).toEqual(null);
            });
            test('正常：event配下のthingで不可判定、可判定', async () => {
                // モック先変更戻し
                jest.spyOn(CatalogService.prototype, 'catalogAccessor').mockImplementation(getCatalog);
                // スタブ起動
                cTokenServer = new StubCTokenLedgerServer(3008, 4, 200);
                // 送信データを生成
                const json: PostDataSharePermissionReqDto = {
                    userId: 'appUser01',
                    appCode: 1000110,
                    wfCode: null,
                    actorCode: 1000101,
                    sourceActorCode: null,
                    sourceAssetCode: null,
                    isTriggerRequest: null,
                    document: [],
                    event: [
                        {
                            _value: 1000511,
                            _ver: 1
                        }
                    ],
                    thing: [
                        {
                            _value: 1000521,
                            _ver: 1
                        }
                    ],
                };
    
                // 対象APIに送信
                const response = await supertest(expressApp).post(Url.dataSharePermissionURI)
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.dataStoreGetApp) })
                    .send(json);
    
                // レスポンスチェック
                expect(response.status).toBe(200);
                expect(response.body.checkResult).toBe(true);
                expect(response.body.permission).toEqual([
                    {
                        sourceActorCode: 1000101,
                        document: [],
                        event: [
                            {
                                _value: 1000511,
                                _ver: 1
                            }
                        ],
                        thing: []
                    }
                ]);
            });
            test('正常：thing 不可判定', async () => {
                // スタブ起動
                cTokenServer = new StubCTokenLedgerServer(3008, 2, 200);
                // 送信データを生成
                const json: PostDataSharePermissionReqDto = {
                    userId: 'appUser01',
                    appCode: 1000110,
                    wfCode: null,
                    actorCode: 1000101,
                    sourceActorCode: null,
                    sourceAssetCode: null,
                    isTriggerRequest: null,
                    document: [],
                    event: [],
                    thing: [
                        {
                            _value: 1000526,
                            _ver: 1
                        }
                    ]
                };
    
                // 対象APIに送信
                const response = await supertest(expressApp).post(Url.dataSharePermissionURI)
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.dataStoreGetApp) })
                    .send(json);
    
                // レスポンスチェック
                expect(response.status).toBe(200);
                expect(response.body.checkResult).toBe(false);
                expect(response.body.permission).toEqual(null);
            });
        });
        describe('アプリケーションによるリクエスト', () => {
            test('正常：複数データ種 全て可判定', async () => {
                // スタブ起動
                cTokenServer = new StubCTokenLedgerServer(3008, 2, 200);
                // 送信データを生成
                const json: PostDataSharePermissionReqDto = {
                    userId: 'appUser01',
                    appCode: 1000210,
                    wfCode: null,
                    actorCode: 1000201,
                    sourceActorCode: null,
                    sourceAssetCode: null,
                    isTriggerRequest: null,
                    document: [
                        {
                            _value: 1000801,
                            _ver: 1
                        }
                    ],
                    event: [
                        {
                            _value: 1000811,
                            _ver: 1
                        }
                    ],
                    thing: [
                        {
                            _value: 1000821,
                            _ver: 1
                        }
                    ]
                };
    
                // 対象APIに送信
                const response = await supertest(expressApp).post(Url.dataSharePermissionURI)
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.dataStoreGetApp) })
                    .send(json);
    
                // レスポンスチェック
                expect(response.status).toBe(200);
                expect(response.body.checkResult).toBe(true);
                expect(response.body.permission).toEqual([
                    {
                        sourceActorCode: 1000101,
                        document: [
                            {
                                _value: 1000801,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000811,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000821,
                                _ver: 1
                            }
                        ]
                    },
                    {
                        sourceActorCode: 1000201,
                        document: [
                            {
                                _value: 1000801,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000811,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000821,
                                _ver: 1
                            }
                        ]
                    }
                ]);
            });
        });
        describe('異常系', () => {
            test('異常：リクエストのuserIdに対する連携が存在しない', async () => {
                // スタブ起動
                cTokenServer = new StubCTokenLedgerServer(3008, 2, 200);
                // 送信データを生成
                const json: PostDataSharePermissionReqDto = {
                    userId: 'user01',
                    appCode: null,
                    wfCode: 1000110,
                    actorCode: 1000101,
                    sourceActorCode: null,
                    sourceAssetCode: null,
                    isTriggerRequest: null,
                    document: [
                        {
                            _value: 1000501,
                            _ver: 1
                        }
                    ],
                    event: null,
                    thing: null
                };
    
                // 対象APIに送信
                const response = await supertest(expressApp).post(Url.dataSharePermissionURI)
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.dataStoreGetApp) })
                    .send(json);
    
                // レスポンスチェック
                expect(response.body.status).toBe(400);
                expect(response.body.message).toBe(Message.CAN_NOT_FIND_BOOK);
            });
            test('異常：cToken-ledgerサービスエラー400', async () => {
                // スタブ起動
                cTokenServer = new StubCTokenLedgerServer(3008, 2, 400);
                // 送信データを生成
                const json: PostDataSharePermissionReqDto = {
                    userId: 'appUser01',
                    appCode: 1000110,
                    wfCode: null,
                    actorCode: 1000101,
                    sourceActorCode: null,
                    sourceAssetCode: null,
                    isTriggerRequest: null,
                    document: [
                        {
                            _value: 1000501,
                            _ver: 1
                        }
                    ],
                    event: null,
                    thing: null
                };
    
                // 対象APIに送信
                const response = await supertest(expressApp).post(Url.dataSharePermissionURI)
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.dataStoreGetApp) })
                    .send(json);
    
                // レスポンスチェック
                expect(response.body.status).toBe(400);
                expect(response.body.message).toBe(Message.FAILED_CTOKEN_COUNT_GET);
            });
            test('異常：cToken-ledgerサービスエラー500系', async () => {
                // スタブ起動
                cTokenServer = new StubCTokenLedgerServer(3008, 2, 500);
                // 送信データを生成
                const json: PostDataSharePermissionReqDto = {
                    userId: 'appUser01',
                    appCode: 1000110,
                    wfCode: null,
                    actorCode: 1000101,
                    sourceActorCode: null,
                    sourceAssetCode: null,
                    isTriggerRequest: null,
                    document: [
                        {
                            _value: 1000501,
                            _ver: 1
                        }
                    ],
                    event: null,
                    thing: null
                };
    
                // 対象APIに送信
                const response = await supertest(expressApp).post(Url.dataSharePermissionURI)
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.dataStoreGetApp) })
                    .send(json);
    
                // レスポンスチェック
                expect(response.body.status).toBe(503);
                expect(response.body.message).toBe(Message.FAILED_CTOKEN_COUNT_GET);
            });
            test('異常：cToken-ledgerサービスエラー 400, 500系, 204, 200以外', async () => {
                // スタブ起動
                cTokenServer = new StubCTokenLedgerServer(3008, 2, 401);
                // 送信データを生成
                const json: PostDataSharePermissionReqDto = {
                    userId: 'appUser01',
                    appCode: 1000110,
                    wfCode: null,
                    actorCode: 1000101,
                    sourceActorCode: null,
                    sourceAssetCode: null,
                    isTriggerRequest: null,
                    document: [
                        {
                            _value: 1000501,
                            _ver: 1
                        }
                    ],
                    event: null,
                    thing: null
                };
    
                // 対象APIに送信
                const response = await supertest(expressApp).post(Url.dataSharePermissionURI)
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.dataStoreGetApp) })
                    .send(json);
    
                // レスポンスチェック
                expect(response.body.status).toBe(401);
                expect(response.body.message).toBe(Message.FAILED_CTOKEN_COUNT_GET);
            });
            test('異常：cToken-ledgerサービス未起動', async () => {
                // スタブ起動しない
                // 送信データを生成
                const json: PostDataSharePermissionReqDto = {
                    userId: 'appUser01',
                    appCode: 1000110,
                    wfCode: null,
                    actorCode: 1000101,
                    sourceActorCode: null,
                    sourceAssetCode: null,
                    isTriggerRequest: null,
                    document: [
                        {
                            _value: 1000501,
                            _ver: 1
                        }
                    ],
                    event: null,
                    thing: null
                };
    
                // 対象APIに送信
                const response = await supertest(expressApp).post(Url.dataSharePermissionURI)
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.dataStoreGetApp) })
                    .send(json);
    
                // レスポンスチェック
                expect(response.body.status).toBe(503);
                expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_CTOKEN_LEDGER);
            });
            test('異常：非サポートのオペレータからのリクエスト', async () => {
                // スタブ起動
                cTokenServer = new StubCTokenLedgerServer(3008, 2, 200);
                // 送信データを生成
                const json: PostDataSharePermissionReqDto = {
                    userId: 'wfUser01',
                    appCode: null,
                    wfCode: 1000110,
                    actorCode: 1000101,
                    sourceActorCode: null,
                    sourceAssetCode: null,
                    isTriggerRequest: null,
                    document: [
                        {
                            _value: 1000501,
                            _ver: 1
                        }
                    ],
                    event: null,
                    thing: null
                };
    
                // 対象APIに送信
                const response = await supertest(expressApp).post(Url.dataSharePermissionURI)
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.dataStoreGetWf) })
                    .send(json);
    
                // レスポンスチェック
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.UNSUPPORTED_OPERATOR);
            });
        });
    });
});
