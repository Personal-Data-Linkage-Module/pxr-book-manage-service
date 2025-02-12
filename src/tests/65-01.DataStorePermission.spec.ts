/* eslint-disable */
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { sprintf } from 'sprintf-js';
import { Session } from './Session';
import Config from '../common/Config';
import PostDataStorePermissionReqDto from '../resources/dto/PostDataStorePermissionReqDto';
import { getCatalog } from './accessor/CatalogAccessor';
import CatalogService from '../services/CatalogService';
const Message = Config.ReadConfig('./config/message.json');

// 対象アプリケーションを取得
const app = new Application();
const expressApp = app.express.app;
const common = new Common();

// サーバをlisten
app.start();

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
        await common.executeSqlFile('initialDataStorePermission.sql');
    });
    /**
     * 各テスト実行の前処理
     */
    beforeEach(async () => {
        // DB接続
        await common.connect();
    });

    afterEach(async () => {
    });

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
     * データ蓄積可否判定
     * 必要なのはカタログのスタブとDB状態
     * agreementAccessorの動きを確認するために実際にanalyzerを回す必要がある
     * catalogAccessorの方は別途カタログサービスのUTで要確認
     */
    describe('データ蓄積可否判定', () => {
        // catalogAccessorメソッドのmock化
        jest.spyOn(CatalogService.prototype, 'catalogAccessor').mockImplementation(getCatalog);
        describe('アプリケーションによるリクエスト', () => {
            test('正常：document 可判定', async () => {   
                // 送信データを生成
                const json: PostDataStorePermissionReqDto = {
                    userId: 'appUser01',
                    appCode: 1000110,
                    wfCode: null,
                    actorCode: 1000101,
                    datatype: [
                        {
                            _value: 1000501,
                            _ver: 1
                        }
                    ]
                };
    
                // 対象APIに送信
                const response = await supertest(expressApp).post(Url.dataStorePermissionURI)
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.dataStoreGetApp) })
                    .send(json);
    
                // レスポンスチェック
                expect(response.status).toBe(200);
                expect(response.body.checkResult).toBe(true);
                expect(response.body.datatype).toEqual([
                    {
                        _value: 1000501,
                        _ver: 1
                    }
                ]);
            });
            test('正常：event 可判定', async () => {
                // 送信データを生成
                const json: PostDataStorePermissionReqDto = {
                    userId: 'appUser01',
                    appCode: 1000110,
                    wfCode: null,
                    actorCode: 1000101,
                    datatype: [
                        {
                            _value: 1000511,
                            _ver: 1
                        }
                    ]
                };
    
                // 対象APIに送信
                const response = await supertest(expressApp).post(Url.dataStorePermissionURI)
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.dataStoreGetApp) })
                    .send(json);
    
                // レスポンスチェック
                expect(response.status).toBe(200);
                expect(response.body.checkResult).toBe(true);
                expect(response.body.datatype).toEqual([
                    {
                        _value: 1000511,
                        _ver: 1
                    }
                ]);
            });
            test('正常：thing(event配下のthing) 可判定', async () => {
                // 送信データを生成
                const json: PostDataStorePermissionReqDto = {
                    userId: 'appUser01',
                    appCode: 1000110,
                    wfCode: null,
                    actorCode: 1000101,
                    datatype: [
                        {
                            _value: 1000521,
                            _ver: 1
                        }
                    ]
                };
    
                // 対象APIに送信
                const response = await supertest(expressApp).post(Url.dataStorePermissionURI)
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.dataStoreGetApp) })
                    .send(json);
    
                // レスポンスチェック
                expect(response.status).toBe(200);
                expect(response.body.checkResult).toBe(true);
                expect(response.body.datatype).toEqual([
                    {
                        _value: 1000521,
                        _ver: 1
                    }
                ]);
            });
            test('正常：複数データ種 全て可判定', async () => {
                // 送信データを生成
                const json: PostDataStorePermissionReqDto = {
                    userId: 'appUser01',
                    appCode: 1000110,
                    wfCode: null,
                    actorCode: 1000101,
                    datatype: [
                        {
                            _value: 1000501,
                            _ver: 1
                        },
                        {
                            _value: 1000511,
                            _ver: 1
                        },
                        {
                            _value: 1000521,
                            _ver: 1
                        }
                    ]
                };
    
                // 対象APIに送信
                const response = await supertest(expressApp).post(Url.dataStorePermissionURI)
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.dataStoreGetApp) })
                    .send(json);
    
                // レスポンスチェック
                expect(response.status).toBe(200);
                expect(response.body.checkResult).toBe(true);
                expect(response.body.datatype).toEqual([
                    {
                        _value: 1000501,
                        _ver: 1
                    },
                    {
                        _value: 1000511,
                        _ver: 1
                    },
                    {
                        _value: 1000521,
                        _ver: 1
                    }
                ]);
            });
            test('正常：蓄積同意のないデータ種、不可判定', async () => {
                // 送信データを生成
                const json: PostDataStorePermissionReqDto = {
                    userId: 'appUser01',
                    appCode: 1000110,
                    wfCode: null,
                    actorCode: 1000101,
                    datatype: [
                        {
                            _value: 2000501,
                            _ver: 1
                        }
                    ]
                };
    
                // 対象APIに送信
                const response = await supertest(expressApp).post(Url.dataStorePermissionURI)
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.dataStoreGetApp) })
                    .send(json);
    
                // レスポンスチェック
                expect(response.status).toBe(200);
                expect(response.body.checkResult).toBe(false);
                expect(response.body.datatype).toBe(null);
            });
            test('正常：複数データ種 一部不可判定', async () => {
                // 送信データを生成
                const json: PostDataStorePermissionReqDto = {
                    userId: 'appUser01',
                    appCode: 1000110,
                    wfCode: null,
                    actorCode: 1000101,
                    datatype: [
                        {
                            _value: 1000501,
                            _ver: 1
                        },
                        {
                            _value: 1000511,
                            _ver: 1
                        },
                        {
                            _value: 1000521,
                            _ver: 1
                        },
                        {
                            _value: 2000521,
                            _ver: 1
                        }
                    ]
                };
    
                // 対象APIに送信
                const response = await supertest(expressApp).post(Url.dataStorePermissionURI)
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.dataStoreGetApp) })
                    .send(json);
    
                // レスポンスチェック
                expect(response.status).toBe(200);
                expect(response.body.checkResult).toBe(false);
                expect(response.body.datatype).toBe(null);
            });
        });
        test('正常：複数データ種 一部不可判定 一部蓄積可フラグTRUE', async () => {
            // 送信データを生成
            const json: PostDataStorePermissionReqDto = {
                userId: 'appUser01',
                appCode: 1000110,
                wfCode: null,
                actorCode: 1000101,
                datatype: [
                    {
                        _value: 1000501,
                        _ver: 1
                    },
                    {
                        _value: 1000511,
                        _ver: 1
                    },
                    {
                        _value: 1000521,
                        _ver: 1
                    },
                    {
                        _value: 2000521,
                        _ver: 1
                    }
                ]
            };

            // 対象APIに送信
            const url = Url.dataStorePermissionURI + '?allowPartialStore=true'
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStoreGetApp) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.checkResult).toBe(true);
            expect(response.body.datatype).toEqual([
                {
                    _value: 1000501,
                    _ver: 1
                },
                {
                    _value: 1000511,
                    _ver: 1
                },
                {
                    _value: 1000521,
                    _ver: 1
                }
            ]);
        });
        describe('アプリケーションによるリクエスト', () => {
            test('正常：document 可判定', async () => {   
                // 送信データを生成
                const json: PostDataStorePermissionReqDto = {
                    userId: 'appUser01',
                    appCode: 1000210,
                    wfCode: null,
                    actorCode: 1000201,
                    datatype: [
                        {
                            _value: 1000801,
                            _ver: 1
                        }
                    ]
                };
    
                // 対象APIに送信
                const response = await supertest(expressApp).post(Url.dataStorePermissionURI)
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.dataStoreGetApp) })
                    .send(json);
    
                // レスポンスチェック
                expect(response.status).toBe(200);
                expect(response.body.checkResult).toBe(true);
                expect(response.body.datatype).toEqual([
                    {
                        _value: 1000801,
                        _ver: 1
                    }
                ]);
            });
            test('正常：event 可判定', async () => {
                // 送信データを生成
                const json: PostDataStorePermissionReqDto = {
                    userId: 'appUser01',
                    appCode: 1000210,
                    wfCode: null,
                    actorCode: 1000201,
                    datatype: [
                        {
                            _value: 1000811,
                            _ver: 1
                        }
                    ]
                };
    
                // 対象APIに送信
                const response = await supertest(expressApp).post(Url.dataStorePermissionURI)
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.dataStoreGetApp) })
                    .send(json);
    
                // レスポンスチェック
                expect(response.status).toBe(200);
                expect(response.body.checkResult).toBe(true);
                expect(response.body.datatype).toEqual([
                    {
                        _value: 1000811,
                        _ver: 1
                    }
                ]);
            });
            test('正常：thing(event配下のthing) 可判定', async () => {
                // 送信データを生成
                const json: PostDataStorePermissionReqDto = {
                    userId: 'appUser01',
                    appCode: 1000210,
                    wfCode: null,
                    actorCode: 1000201,
                    datatype: [
                        {
                            _value: 1000821,
                            _ver: 1
                        }
                    ]
                };
    
                // 対象APIに送信
                const response = await supertest(expressApp).post(Url.dataStorePermissionURI)
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.dataStoreGetApp) })
                    .send(json);
    
                // レスポンスチェック
                expect(response.status).toBe(200);
                expect(response.body.checkResult).toBe(true);
                expect(response.body.datatype).toEqual([
                    {
                        _value: 1000821,
                        _ver: 1
                    }
                ]);
            });
            test('正常：複数データ種 全て可判定', async () => {
                // 送信データを生成
                const json: PostDataStorePermissionReqDto = {
                    userId: 'appUser01',
                    appCode: 1000210,
                    wfCode: null,
                    actorCode: 1000201,
                    datatype: [
                        {
                            _value: 1000801,
                            _ver: 1
                        },
                        {
                            _value: 1000811,
                            _ver: 1
                        },
                        {
                            _value: 1000821,
                            _ver: 1
                        }
                    ]
                };
    
                // 対象APIに送信
                const response = await supertest(expressApp).post(Url.dataStorePermissionURI)
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.dataStoreGetApp) })
                    .send(json);
    
                // レスポンスチェック
                expect(response.status).toBe(200);
                expect(response.body.checkResult).toBe(true);
                expect(response.body.datatype).toEqual([
                    {
                        _value: 1000801,
                        _ver: 1
                    },
                    {
                        _value: 1000811,
                        _ver: 1
                    },
                    {
                        _value: 1000821,
                        _ver: 1
                    }
                ]);
            });
            test('正常：蓄積同意のないデータ種、不可判定', async () => {
                // 送信データを生成
                const json: PostDataStorePermissionReqDto = {
                    userId: 'appUser01',
                    appCode: 1000210,
                    wfCode: null,
                    actorCode: 1000201,
                    datatype: [
                        {
                            _value: 2000801,
                            _ver: 1
                        }
                    ]
                };
    
                // 対象APIに送信
                const response = await supertest(expressApp).post(Url.dataStorePermissionURI)
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.dataStoreGetApp) })
                    .send(json);
    
                // レスポンスチェック
                expect(response.status).toBe(200);
                expect(response.body.checkResult).toBe(false);
                expect(response.body.datatype).toBe(null);
            });
            test('正常：複数データ種 一部不可判定', async () => {
                // 送信データを生成
                const json: PostDataStorePermissionReqDto = {
                    userId: 'appUser01',
                    appCode: 1000210,
                    wfCode: null,
                    actorCode: 1000201,
                    datatype: [
                        {
                            _value: 1000801,
                            _ver: 1
                        },
                        {
                            _value: 1000811,
                            _ver: 1
                        },
                        {
                            _value: 1000821,
                            _ver: 1
                        },
                        {
                            _value: 2000821,
                            _ver: 1
                        }
                    ]
                };
    
                // 対象APIに送信
                const response = await supertest(expressApp).post(Url.dataStorePermissionURI)
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.dataStoreGetApp) })
                    .send(json);
    
                // レスポンスチェック
                expect(response.status).toBe(200);
                expect(response.body.checkResult).toBe(false);
                expect(response.body.datatype).toBe(null);
            });
        });
        describe('異常系', () => {
            test('異常：リクエストのuserIdに対する連携が存在しない', async () => {   
                // 送信データを生成
                const json: PostDataStorePermissionReqDto = {
                    userId: 'user01',
                    appCode: null,
                    wfCode: 1000110,
                    actorCode: 1000101,
                    datatype: [
                        {
                            _value: 1000501,
                            _ver: 1
                        }
                    ]
                };
    
                // 対象APIに送信
                const response = await supertest(expressApp).post(Url.dataStorePermissionURI)
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.dataStoreGetApp) })
                    .send(json);
    
                // レスポンスチェック
                expect(response.body.status).toBe(400);
                expect(response.body.message).toBe(Message.CAN_NOT_FIND_BOOK);
            });
            test('異常：非サポートのオペレータからのリクエスト', async () => {   
                // 送信データを生成
                const json: PostDataStorePermissionReqDto = {
                    userId: 'wfUser01',
                    appCode: null,
                    wfCode: 1000110,
                    actorCode: 1000101,
                    datatype: [
                        {
                            _value: 1000501,
                            _ver: 1
                        }
                    ]
                };
    
                // 対象APIに送信
                const response = await supertest(expressApp).post(Url.dataStorePermissionURI)
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
