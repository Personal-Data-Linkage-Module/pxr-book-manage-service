/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { Session } from './01-00.Session';
import { TestRequest } from './01-00.TestRequest';
import { OperatorService, CatalogService, CatalogService2, CatalogService3, CatalogService4, CatalogService5, IdentityService, IdService, CatalogService6, OperatorService2 } from './01-00.StubServer';
import Config from '../common/Config';
const Message = Config.ReadConfig('./config/message.json');

// 対象アプリケーションを取得
const app = new Application();
const expressApp = app.express.app;
const common = new Common();

// サーバをlisten
app.start();

let operator: any;
let catalog: any;
let identity: any;
let idService: any;

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
    });

    /**
     * 各テスト実行の前処理
     */
    beforeEach(async () => {
        // DB接続
        await common.connect();
    });

    /**
     * 各テスト実行の後処理
     */
    afterEach(async () => {
        // スタブを停止
        if (operator) {
            operator.server.close();
        }
        if (catalog) {
            catalog.server.close();
        }
        if (identity) {
            identity.server.close();
        }
        if (idService) {
            idService.server.close();
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
     * 開設
     */
    describe('開設', () => {
        test('パラメータ異常：全体が空', async () => {
            // リクエストデータを読み込み
            const json = {};

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [
                    { property: 'identification', value: null, message: 'この値は必須値です' },
                    { property: 'userInformation', value: null, message: 'この値は必須値です' },
                    { property: 'platform_terms_of_use', value: null, message: 'この値は必須値です' }
                ]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ不足：identificationがnull', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NULL_IDENT;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [
                    {
                        property: 'identification',
                        value: null,
                        message: 'オブジェクトもしくは配列である必要があります'
                    }
                ]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ不足：identificationがない', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.MISSING_IDENT;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: 'identification', value: null, message: 'この値は必須値です' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：identification（空文字）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.EMPTY_IDENT;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: 'identification', value: [], message: '空の配列です' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：identification（Array以外）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NOT_ARRAY_IDENT;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [
                    {
                        property: 'identification',
                        value: {
                            _code: {
                                _value: 30001,
                                _ver: 1
                            },
                            'item-group': [
                                {
                                    title: '氏名',
                                    item: [
                                        {
                                            title: '姓',
                                            type: {
                                                _value: 30019,
                                                _ver: 1
                                            },
                                            content: 'サンプル'
                                        },
                                        {
                                            title: '名',
                                            type: {
                                                _value: 30020,
                                                _ver: 1
                                            },
                                            content: '太郎'
                                        }
                                    ]
                                },
                                {
                                    title: '性別',
                                    item: [
                                        {
                                            title: '性別',
                                            type: {
                                                _value: 30021,
                                                _ver: 1
                                            },
                                            content: '男'
                                        }
                                    ]
                                },
                                {
                                    title: '生年月日',
                                    item: [
                                        {
                                            title: '生年月日',
                                            type: {
                                                _value: 30022,
                                                _ver: 1
                                            },
                                            content: '2000-01-01'
                                        }
                                    ]
                                }
                            ]
                        },
                        message: '空の配列です'
                    },
                    {
                        property: 'identification',
                        value: {
                            _code: {
                                _value: 30001,
                                _ver: 1
                            },
                            'item-group': [
                                {
                                    title: '氏名',
                                    item: [
                                        {
                                            title: '姓',
                                            type: {
                                                _value: 30019,
                                                _ver: 1
                                            },
                                            content: 'サンプル'
                                        },
                                        {
                                            title: '名',
                                            type: {
                                                _value: 30020,
                                                _ver: 1
                                            },
                                            content: '太郎'
                                        }
                                    ]
                                },
                                {
                                    title: '性別',
                                    item: [
                                        {
                                            title: '性別',
                                            type: {
                                                _value: 30021,
                                                _ver: 1
                                            },
                                            content: '男'
                                        }
                                    ]
                                },
                                {
                                    title: '生年月日',
                                    item: [
                                        {
                                            title: '生年月日',
                                            type: {
                                                _value: 30022,
                                                _ver: 1
                                            },
                                            content: '2000-01-01'
                                        }
                                    ]
                                }
                            ]
                        },
                        message: '配列ではありません'
                    }
                ]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ不足：identification._code', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.MISSING_IDENT_CODE;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_code', value: null, message: 'この値は必須値です' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：identification._code（空文字）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.EMPTY_IDENT_CODE;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [
                    {
                        property: '_code',
                        value: null,
                        message: 'オブジェクトもしくは配列である必要があります'
                    }
                ]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ不足：identification._code._value', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.MISSING_IDENT_VALUE;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_value', value: null, message: 'この値は必須値です' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：identification._code._value（空文字）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.EMPTY_IDENT_VALUE;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_value', value: null, message: '数値ではありません' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：identification._code._value（数字以外）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NOT_NUMBER_IDENT_VALUE;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_value', value: 'a', message: '数値ではありません' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：identification._code._value（false）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.FALSE_NUMBER_IDENT_VALUE;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_value', value: null, message: '数値ではありません' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ不足：identification._code._ver', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.MISSING_IDENT_VER;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_ver', value: null, message: 'この値は必須値です' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ不足：identification._code._ver', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NULL_IDENT_VER;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_ver', value: null, message: 'この値は必須値です' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：identification._code._ver（空文字）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.EMPTY_IDENT_VER;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_ver', value: null, message: '数値ではありません' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：identification._code._ver（数字以外）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NOT_NUMBER_IDENT_VER;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_ver', value: 'a', message: '数値ではありません' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ不足：identification.item-group', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.MISSING_IDENT_ITEM_GROUP;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: 'item-group', value: null, message: 'この値は必須値です' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：identification.item-group（空）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.EMPTY_IDENT_ITEM_GROUP;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: 'item-group', value: [], message: '空の配列です' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：identification.item-group（null）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NULL_IDENT_ITEM_GROUP;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [
                    {
                        property: 'item-group',
                        value: null,
                        message: 'オブジェクトもしくは配列である必要があります'
                    }
                ]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：identification.item-group（Array以外）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NOT_ARRAY_IDENT_ITEM_GROUP;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [
                    {
                        property: 'item-group',
                        value: {
                            title: '氏名',
                            item: [
                                {
                                    title: '姓',
                                    type: {
                                        _value: 30019,
                                        _ver: 1
                                    },
                                    content: 'サンプル'
                                },
                                {
                                    title: '名',
                                    type: {
                                        _value: 30020,
                                        _ver: 1
                                    },
                                    content: '太郎'
                                }
                            ]
                        },
                        message: '空の配列です'
                    },
                    {
                        property: 'item-group',
                        value: {
                            title: '氏名',
                            item: [
                                {
                                    title: '姓',
                                    type: {
                                        _value: 30019,
                                        _ver: 1
                                    },
                                    content: 'サンプル'
                                },
                                {
                                    title: '名',
                                    type: {
                                        _value: 30020,
                                        _ver: 1
                                    },
                                    content: '太郎'
                                }
                            ]
                        },
                        message: '配列ではありません'
                    }
                ]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ不足：identification.item-group.title', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.MISSING_IDENT_ITEM_GROUP_TITLE;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [
                    { property: 'title', value: null, message: '文字列ではありません' },
                    { property: 'title', value: null, message: 'この値は空を期待しません' }
                ]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：identification.item-group.title（空文字）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.EMPTY_IDENT_ITEM_GROUP_TITLE;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: 'title', value: null, message: 'この値は空を期待しません' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ不足：identification.item-group.item', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.MISSING_IDENT_ITEM_GROUP_ITEM;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: 'item', value: null, message: 'この値は必須値です' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：identification.item-group.item（空）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.EMPTY_IDENT_ITEM_GROUP_ITEM;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: 'item', value: [], message: '空の配列です' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：identification.item-group.item（null）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NULL_IDENT_ITEM_GROUP_ITEM;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [
                    {
                        property: 'item',
                        value: null,
                        message: 'オブジェクトもしくは配列である必要があります'
                    }
                ]
            }));
            expect(response.status).toBe(400);
            // expect(response.body.message).toBe(sprintf(Message.EMPTY_PARAM, 'item-group.item'));
        });
        test('パラメータ異常：identification.item-group.item（Array以外）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NOT_ARRAY_IDENT_ITEM_GROUP_ITEM;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [
                    {
                        property: 'item',
                        value: {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        },
                        message: '空の配列です'
                    },
                    {
                        property: 'item',
                        value: {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        },
                        message: '配列ではありません'
                    }
                ]
            }));
            expect(response.status).toBe(400);
            // expect(response.body.message).toBe(sprintf(Message.NO_ARRAY_PARAM, 'item-group.item'));
        });
        test('パラメータ不足：identification.item-group.item.title', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.MISSING_IDENT_ITEM_TITLE;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [
                    { property: 'title', value: null, message: '文字列ではありません' },
                    { property: 'title', value: null, message: 'この値は空を期待しません' }
                ]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：identification.item-group.item.title（空文字）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.EMPTY_IDENT_ITEM_TITLE;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: 'title', value: null, message: 'この値は空を期待しません' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ不足：identification.item-group.item.type', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.MISSING_IDENT_ITEM_TYPE;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: 'type', value: null, message: 'この値は必須値です' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：identification.item-group.item.type（null）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NULL_IDENT_ITEM_TYPE;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: 'type', value: null, message: 'オブジェクトもしくは配列である必要があります' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：identification.item-group.item.type（空文字）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.EMPTY_IDENT_ITEM_TYPE;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: 'type', value: null, message: 'オブジェクトもしくは配列である必要があります' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ不足：identification.item-group.item.type._value', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.MISSING_IDENT_ITEM_TYPE_VALUE;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_value', value: null, message: 'この値は必須値です' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：identification.item-group.item.type._value（null）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NULL_IDENT_ITEM_TYPE_VALUE;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_value', value: null, message: 'この値は必須値です' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：identification.item-group.item.type._value（空文字）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.EMPTY_IDENT_ITEM_TYPE_VALUE;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_value', value: null, message: '数値ではありません' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：identification.item-group.item.type._value（数字以外）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NOT_NUMBER_IDENT_ITEM_TYPE_VALUE;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_value', value: 'a', message: '数値ではありません' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ不足：identification.item-group.item.type._ver', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.MISSING_IDENT_ITEM_TYPE_VER;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_ver', value: null, message: 'この値は必須値です' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：identification.item-group.item.type._ver（null）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NULL_IDENT_ITEM_TYPE_VER;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_ver', value: null, message: 'この値は必須値です' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：identification.item-group.item.type._ver（空文字）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.EMPTY_IDENT_ITEM_TYPE_VER;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_ver', value: null, message: '数値ではありません' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：identification.item-group.item.type._ver（数字以外）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NOT_NUMBER_IDENT_ITEM_TYPE_VER;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_ver', value: 'a', message: '数値ではありません' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ不足：userInformationがnull', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NULL_USER_INFO;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [
                    {
                        property: 'userInformation',
                        value: null,
                        message: 'オブジェクトもしくは配列である必要があります'
                    }
                ]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ不足：userInformationがない', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.MISSING_USER_INFO;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: 'userInformation', value: null, message: 'この値は必須値です' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：userInformation（空文字）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.EMPTY_USER_INFO;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: 'userInformation', value: null, message: 'オブジェクトもしくは配列である必要があります' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ不足：userInformation._code', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.MISSING_USER_INFO_CODE;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_code', value: null, message: 'この値は必須値です' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：userInformation._code（空文字）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.EMPTY_USER_INFO_CODE;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [
                    {
                        property: '_code',
                        value: null,
                        message: 'オブジェクトもしくは配列である必要があります'
                    }
                ]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ不足：userInformation._code._value', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.MISSING_USER_INFO_VALUE;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_value', value: null, message: 'この値は必須値です' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：userInformation._code._value（空文字）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.EMPTY_USER_INFO_VALUE;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_value', value: null, message: '数値ではありません' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：userInformation._code._value（数字以外）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NOT_NUMBER_USER_INFO_VALUE;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_value', value: 'a', message: '数値ではありません' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：userInformation._code._value（false）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.FALSE_NUMBER_USER_INFO_VALUE;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_value', value: null, message: '数値ではありません' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ不足：userInformation._code._ver', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.MISSING_USER_INFO_VER;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_ver', value: null, message: 'この値は必須値です' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ不足：userInformation._code._ver', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NULL_USER_INFO_VER;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_ver', value: null, message: 'この値は必須値です' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：userInformation._code._ver（空文字）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.EMPTY_USER_INFO_VER;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_ver', value: null, message: '数値ではありません' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：userInformation._code._ver（数字以外）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NOT_NUMBER_USER_INFO_VER;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_ver', value: 'a', message: '数値ではありません' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ不足：userInformation.item-group', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.MISSING_USER_INFO_ITEM_GROUP;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: 'item-group', value: null, message: 'この値は必須値です' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：userInformation.item-group（空）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.EMPTY_USER_INFO_ITEM_GROUP;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: 'item-group', value: [], message: '空の配列です' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：userInformation.item-group（null）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NULL_USER_INFO_ITEM_GROUP;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [
                    {
                        property: 'item-group',
                        value: null,
                        message: 'オブジェクトもしくは配列である必要があります'
                    }
                ]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：userInformation.item-group（Array以外）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NOT_ARRAY_USER_INFO_ITEM_GROUP;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [
                    {
                        property: 'item-group',
                        value: {
                            title: '氏名',
                            item: [
                                {
                                    title: '姓',
                                    type: {
                                        _value: 30019,
                                        _ver: 1
                                    },
                                    content: 'サンプル'
                                },
                                {
                                    title: '名',
                                    type: {
                                        _value: 30020,
                                        _ver: 1
                                    },
                                    content: '太郎'
                                }
                            ]
                        },
                        message: '空の配列です'
                    },
                    {
                        property: 'item-group',
                        value: {
                            title: '氏名',
                            item: [
                                {
                                    title: '姓',
                                    type: {
                                        _value: 30019,
                                        _ver: 1
                                    },
                                    content: 'サンプル'
                                },
                                {
                                    title: '名',
                                    type: {
                                        _value: 30020,
                                        _ver: 1
                                    },
                                    content: '太郎'
                                }
                            ]
                        },
                        message: '配列ではありません'
                    }
                ]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ不足：userInformation.item-group.title', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.MISSING_USER_INFO_ITEM_GROUP_TITLE;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [
                    { property: 'title', value: null, message: '文字列ではありません' },
                    { property: 'title', value: null, message: 'この値は空を期待しません' }
                ]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：userInformation.item-group.title（空文字）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.EMPTY_USER_INFO_ITEM_GROUP_TITLE;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: 'title', value: null, message: 'この値は空を期待しません' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ不足：userInformation.item-group.item', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.MISSING_USER_INFO_ITEM_GROUP_ITEM;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: 'item', value: null, message: 'この値は必須値です' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：userInformation.item-group.item（空）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.EMPTY_USER_INFO_ITEM_GROUP_ITEM;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: 'item', value: [], message: '空の配列です' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：userInformation.item-group.item（null）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NULL_USER_INFO_ITEM_GROUP_ITEM;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [
                    {
                        property: 'item',
                        value: null,
                        message: 'オブジェクトもしくは配列である必要があります'
                    }
                ]
            }));
            expect(response.status).toBe(400);
            // expect(response.body.message).toBe(sprintf(Message.EMPTY_PARAM, 'item-group.item'));
        });
        test('パラメータ異常：userInformation.item-group.item（Array以外）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NOT_ARRAY_USER_INFO_ITEM_GROUP_ITEM;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [
                    {
                        property: 'item',
                        value: {
                            title: '姓',
                            type: {
                                _value: 30019,
                                _ver: 1
                            },
                            content: 'サンプル'
                        },
                        message: '空の配列です'
                    },
                    {
                        property: 'item',
                        value: {
                            title: '姓',
                            type: {
                                _value: 30019,
                                _ver: 1
                            },
                            content: 'サンプル'
                        },
                        message: '配列ではありません'
                    }
                ]
            }));
            expect(response.status).toBe(400);
            // expect(response.body.message).toBe(sprintf(Message.NO_ARRAY_PARAM, 'item-group.item'));
        });
        test('パラメータ不足：userInformation.item-group.item.title', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.MISSING_USER_INFO_ITEM_TITLE;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [
                    { property: 'title', value: null, message: '文字列ではありません' },
                    { property: 'title', value: null, message: 'この値は空を期待しません' }
                ]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：userInformation.item-group.item.title（空文字）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.EMPTY_USER_INFO_ITEM_TITLE;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: 'title', value: null, message: 'この値は空を期待しません' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ不足：userInformation.item-group.item.type', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.MISSING_USER_INFO_ITEM_TYPE;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: 'type', value: null, message: 'この値は必須値です' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：userInformation.item-group.item.type（null）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NULL_USER_INFO_ITEM_TYPE;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: 'type', value: null, message: 'オブジェクトもしくは配列である必要があります' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：userInformation.item-group.item.type（空文字）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.EMPTY_USER_INFO_ITEM_TYPE;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: 'type', value: null, message: 'オブジェクトもしくは配列である必要があります' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ不足：userInformation.item-group.item.type._value', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.MISSING_USER_INFO_ITEM_TYPE_VALUE;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_value', value: null, message: 'この値は必須値です' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：userInformation.item-group.item.type._value（null）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NULL_USER_INFO_ITEM_TYPE_VALUE;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_value', value: null, message: 'この値は必須値です' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：userInformation.item-group.item.type._value（空文字）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.EMPTY_USER_INFO_ITEM_TYPE_VALUE;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_value', value: null, message: '数値ではありません' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：userInformation.item-group.item.type._value（数字以外）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NOT_NUMBER_USER_INFO_ITEM_TYPE_VALUE;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_value', value: 'a', message: '数値ではありません' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ不足：userInformation.item-group.item.type._ver', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.MISSING_USER_INFO_ITEM_TYPE_VER;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_ver', value: null, message: 'この値は必須値です' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：userInformation.item-group.item.type._ver（null）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NULL_USER_INFO_ITEM_TYPE_VER;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_ver', value: null, message: 'この値は必須値です' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：userInformation.item-group.item.type._ver（空文字）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.EMPTY_USER_INFO_ITEM_TYPE_VER;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_ver', value: null, message: '数値ではありません' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：userInformation.item-group.item.type._ver（数字以外）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NOT_NUMBER_USER_INFO_ITEM_TYPE_VER;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_ver', value: 'a', message: '数値ではありません' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ不足：platform_terms_of_use', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.MISSING_PLATFORM;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: 'platform_terms_of_use', value: null, message: 'この値は必須値です' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：platform_terms_of_use（null）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NULL_PLATFORM;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: 'platform_terms_of_use', value: null, message: 'オブジェクトもしくは配列である必要があります' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：platform_terms_of_use（空文字）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.EMPTY_PLATFORM;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: 'platform_terms_of_use', value: null, message: 'オブジェクトもしくは配列である必要があります' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ不足：platform_terms_of_use._value', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.MISSING_PLATFORM_VALUE;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_value', value: null, message: 'この値は必須値です' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：platform_terms_of_use._value（null）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NULL_PLATFORM_VALUE;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_value', value: null, message: 'この値は必須値です' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：platform_terms_of_use._value（空文字）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.EMPTY_PLATFORM_VALUE;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_value', value: null, message: '数値ではありません' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：platform_terms_of_use._value（数字以外）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NOT_NUMBER_PLATFORM_VALUE;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_value', value: 'a', message: '数値ではありません' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ不足：platform_terms_of_use._ver', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.MISSING_PLATFORM_VER;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_ver', value: null, message: 'この値は必須値です' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：platform_terms_of_use._ver（null）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NULL_PLATFORM_VER;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_ver', value: null, message: 'この値は必須値です' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：platform_terms_of_use._ver（空文字）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.EMPTY_PLATFORM_VER;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_ver', value: null, message: '数値ではありません' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：platform_terms_of_use._ver（数字以外）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NOT_NUMBER_PLATFORM_VER;

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: '_ver', value: 'a', message: '数値ではありません' }]
            }));
            expect(response.status).toBe(400);
        });
        test('正常：流通制御による開設', async () => {
            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            // リクエストデータを読み込み
            const json = TestRequest.SUCCESS01;

            // スタブを起動
            operator = new OperatorService(200);
            catalog = new CatalogService4(200);
            idService = new IdService(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                pxrId: '58di2dfse2.test.org',
                initialPassword: response.body.initialPassword,
                attributes: {},
                appendix: null,
                identifyCode: null
            }));
            expect(response.status).toBe(200);
        });
        test('正常：本人正確認書類がマイナンバーカード', async () => {
            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            // リクエストデータを読み込み
            const json = TestRequest.SUCCESS05;

            // スタブを起動
            operator = new OperatorService(200);
            catalog = new CatalogService4(200);
            idService = new IdService(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                pxrId: '',
                loginId: '555i2dfse2.test.org',
                initialPassword: response.body.initialPassword,
                attributes: {},
                appendix: null,
                identifyCode: null
            }));
            expect(response.status).toBe(200);
        });
        test('正常：本人正確認書類が在留カード', async () => {
            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            // リクエストデータを読み込み
            const json = TestRequest.SUCCESS06;

            // スタブを起動
            operator = new OperatorService(200);
            catalog = new CatalogService4(200);
            idService = new IdService(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                pxrId: '',
                loginId: '666i2dfse2.test.org',
                initialPassword: response.body.initialPassword,
                attributes: {},
                appendix: null,
                identifyCode: null
            }));
            expect(response.status).toBe(200);
        });
        test('正常：本人正確認書類の種別不正', async () => {
            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            // リクエストデータを読み込み
            const json = TestRequest.SUCCESS07;

            // スタブを起動
            operator = new OperatorService(200);
            catalog = new CatalogService4(200);
            idService = new IdService(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                pxrId: '',
                loginId: '666i2dfse2.test.org',
                initialPassword: response.body.initialPassword,
                attributes: {},
                appendix: null,
                identifyCode: null
            }));
            expect(response.status).toBe(200);
        });
        test('正常：catalog/ext/*/person/item-typeで項目が一致', async () => {
            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            // リクエストデータを読み込み
            const json = TestRequest.SUCCESS01;

            // スタブを起動
            operator = new OperatorService(200);
            catalog = new CatalogService2(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                pxrId: '58di2dfse2.test.org',
                initialPassword: response.body.initialPassword,
                attributes: {},
                appendix: null,
                identifyCode: null
            }));
            expect(response.status).toBe(200);
        });
        test('正常：開設済み（PXR-IDが既に存在する）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.SUCCESS01;

            // スタブを起動
            operator = new OperatorService(200);
            catalog = new CatalogService(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.PXR_ID_EXISTS);
        });
        test('異常：開設済み（同PXR-IDが論理削除状態で存在する）', async () => {
            // テストデータ作成
            await common.executeSqlString(`
                UPDATE pxr_book_manage.my_condition_book
                SET is_disabled = true
                WHERE pxr_id = '58di2dfse2.test.org'
                ;
            `);

            // リクエストデータを読み込み
            const json = TestRequest.SUCCESS01;

            // スタブを起動
            operator = new OperatorService(200);
            catalog = new CatalogService(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.PXR_ID_EXISTS);
        });
        test('異常：アクターで取得したカタログがdata-trader', async () => {
            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            // リクエストデータを読み込み
            const json = TestRequest.DataTraderReq;

            // スタブを起動
            operator = new OperatorService(200);
            catalog = new CatalogService(200);
            identity = new IdentityService(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.DATA_TRADER) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
        test('正常：アクターで取得したカタログにcatalogItemが存在しない', async () => {
            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            // リクエストデータを読み込み
            const json = TestRequest.DataTraderReq;

            // スタブを起動
            operator = new OperatorService(200);
            catalog = new CatalogService(200);
            identity = new IdentityService(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.DATA_TRADER1) })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                pxrId: '58di2dfse2.test.org',
                initialPassword: response.body.initialPassword,
                attributes: {},
                appendix: null,
                identifyCode: null
            }));
            expect(response.status).toBe(200);
        });
        test('正常：CookieからセッションIDを取得して開設', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.SUCCESS04;

            // スタブを起動
            operator = new OperatorService(200);
            catalog = new CatalogService(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '494a44bb97aa0ef964f6a666b9019b2d20bf05aa811919833f3e0c0ae2b09b38'])
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                pxrId: '444i2dfse2.test.org',
                initialPassword: response.body.initialPassword,
                attributes: {},
                appendix: null,
                identifyCode: null
            }));
            expect(response.status).toBe(200);
        });
        test('正常：IDサービスを使用（idServiceFlg：true）', async () => {
            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            // リクエストデータを読み込み
            const json = TestRequest.IDSERVICE_FLG_TRUE;

            // スタブを起動
            operator = new OperatorService(200);
            catalog = new CatalogService4(200);
            idService = new IdService(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                pxrId: '58di2dfse2.test.org',
                initialPassword: response.body.initialPassword,
                attributes: {},
                appendix: null,
                identifyCode: null
            }));
            expect(response.status).toBe(200);
        });
        test('正常：IDサービスを使用（idServiceFlg：false）', async () => {
            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            // リクエストデータを読み込み
            const json = TestRequest.IDSERVICE_FLG_FALSE;

            // スタブを起動
            operator = new OperatorService(200);
            catalog = new CatalogService4(200);
            idService = new IdService(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                pxrId: '',
                loginId: '58di2dfse2.test.org',
                initialPassword: response.body.initialPassword,
                attributes: {},
                appendix: null,
                identifyCode: null
            }));
            expect(response.status).toBe(200);
        });
        test('パラメータ不足：pxrId（グローバル設定のIDサービス連携がONで、idServiceFlgがtrue）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.MISSING_PXR_ID;

            // 送信データを生成
            const url = Url.baseURI;

            // スタブを起動
            operator = new OperatorService(200);
            catalog = new CatalogService4(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400, message: 'リクエストの値が不正です'
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：pxrId（空文字）（グローバル設定のIDサービス連携がONで、idServiceFlgがtrue）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.EMPTY_PXR_ID;

            // 送信データを生成
            const url = Url.baseURI;

            // スタブを起動
            operator = new OperatorService(200);
            catalog = new CatalogService4(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: 'pxrId', value: null, message: 'この値は空を期待しません' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ不足：pxrId（グローバル設定のIDサービス連携がOFF）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.MISSING_PXR_ID;

            // 送信データを生成
            const url = Url.baseURI;

            // スタブを起動
            operator = new OperatorService(200);
            catalog = new CatalogService(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400, message: 'リクエストの値が不正です'
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：pxrId（空文字）（グローバル設定のIDサービス連携がOFF）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.EMPTY_PXR_ID;

            // 送信データを生成
            const url = Url.baseURI;

            // スタブを起動
            operator = new OperatorService(200);
            catalog = new CatalogService(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: 'pxrId', value: null, message: 'この値は空を期待しません' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ不足：loginId（グローバル設定のIDサービス連携がONで、idServiceFlgがfalse）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.MISSING_PXR_ID;

            // 送信データを生成
            const url = Url.baseURI;

            // スタブを起動
            operator = new OperatorService(200);
            catalog = new CatalogService4(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400, message: 'リクエストの値が不正です'
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：loginId（空文字）（グローバル設定のIDサービス連携がONで、idServiceFlgがfalse）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.EMPTY_LOGIN_ID;

            // 送信データを生成
            const url = Url.baseURI;

            // スタブを起動
            operator = new OperatorService(200);
            catalog = new CatalogService4(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: 'loginId', value: null, message: 'この値は空を期待しません' }]
            }));
            expect(response.status).toBe(400);
        });
        test('異常：利用者情報の電話番号がない', async () => {
            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            // リクエストデータを読み込み
            const json = TestRequest.MISSING_PHONE_NUMBER;

            // スタブを起動
            operator = new OperatorService(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUIRED_PHONE_NUMBER);
        });
        test('異常：利用者情報の電話番号がnull', async () => {
            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            // リクエストデータを読み込み
            const json = TestRequest.MISSING_PHONE_NUMBER;

            // スタブを起動
            operator = new OperatorService(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUIRED_PHONE_NUMBER);
        });
        test('異常：利用者情報の電話番号が文字列以外', async () => {
            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            // リクエストデータを読み込み
            const json = TestRequest.NOT_STRING_PHONE_NUMBER;

            // スタブを起動
            operator = new OperatorService(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.PHONE_NUMBER_FIELD_IS_NOT_STRING);
        });
        test('異常：catalog/built_in/person/item-type,catalog/ext/*/person/item-typeで項目が一致しない', async () => {
            // 事前データ準備
            await common.executeSqlString(`
                DELETE FROM pxr_book_manage.user_id_cooperate;
                DELETE FROM pxr_book_manage.identification;
                DELETE FROM pxr_book_manage.data_operation_data_type;
                DELETE FROM pxr_book_manage.data_operation;
                DELETE FROM pxr_book_manage.region_use;
                DELETE FROM pxr_book_manage.tou_consent;
                DELETE FROM pxr_book_manage.my_condition_book;
                SELECT SETVAL('pxr_book_manage.my_condition_book_id_seq', 1, false);
                SELECT SETVAL('pxr_book_manage.user_id_cooperate_id_seq', 1, false);
                SELECT SETVAL('pxr_book_manage.identification_id_seq', 1, false);
                SELECT SETVAL('pxr_book_manage.data_operation_id_seq', 1, false);
                SELECT SETVAL('pxr_book_manage.data_operation_data_type_id_seq', 1, false);
                SELECT SETVAL('pxr_book_manage.region_use_id_seq', 1, false);
                SELECT SETVAL('pxr_book_manage.tou_consent_id_seq', 1, false);
            `);
            // リクエストデータを読み込み
            const json = TestRequest.SUCCESS01;

            // スタブを起動
            operator = new OperatorService(200);
            catalog = new CatalogService3(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_IDENTIFICATION_ITEM);
        });
        test('異常：オペレーターサービスへの接続に失敗（セッション確認時）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.SUCCESS03;

            // スタブを起動
            catalog = new CatalogService(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '494a44bb97aa0ef964f6a666b9019b2d20bf05aa811919833f3e0c0ae2b09b38'])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常：セッション（オペレーター種別が運営メンバー以外）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.SUCCESS01;

            // スタブを起動
            operator = new OperatorService(200);
            catalog = new CatalogService(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.NOT_OPE_TYPE3) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：セッション（オペレーター追加の権限がない）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.SUCCESS01;

            // スタブを起動
            operator = new OperatorService(200);
            catalog = new CatalogService(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.NOT_ADD_AUTH) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：本人性確認以外のカタログコードが指定されている', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.CODE_NOT_IDENT;

            // スタブを起動
            operator = new OperatorService(200);
            catalog = new CatalogService(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_IDENTIFICATION_CATALOG_CODE);
        });
        test('異常：本人性検証率が100にならない', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.CODE_NOT_RATIO_100;

            // スタブを起動
            operator = new OperatorService(200);
            catalog = new CatalogService(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.VERIFICATION_RATIO_NOT_ENOUGH);
        });
        test('異常：カタログのレスポンスにverification-ratioが存在しない', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.CODE_MISSING_RATIO;

            // スタブを起動
            operator = new OperatorService(200);
            catalog = new CatalogService(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.VERIFICATION_RATIO_NOT_ENOUGH);
        });
        test('異常：オペレーター追加のレスポンスが400', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.SUCCESS03;

            // スタブを起動
            operator = new OperatorService(400);
            catalog = new CatalogService(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.FAILED_OPERATOR_ADD);
        });
        test('異常：オペレーター追加のレスポンスが401', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.SUCCESS03;

            // スタブを起動
            operator = new OperatorService(401);
            catalog = new CatalogService(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.FAILED_OPERATOR_ADD);
        });
        test('異常：オペレーター追加のレスポンスが503', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.SUCCESS03;

            // スタブを起動
            operator = new OperatorService(500);
            catalog = new CatalogService(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_OPERATOR_ADD);
        });
        test('異常：オペレーターサービスへの接続に失敗（オペレーター追加時）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.SUCCESS03;

            // スタブを起動
            catalog = new CatalogService(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常：Cookieおよびセッション情報がない', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.SUCCESS03;

            // スタブを起動
            operator = new OperatorService(200);
            catalog = new CatalogService(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_SESSION);
        });
        test('異常：カタログ取得のレスポンスが400', async () => {
            // 事前データ準備
            await common.executeSqlString(`
                DELETE FROM pxr_book_manage.user_id_cooperate;
                DELETE FROM pxr_book_manage.identification;
                DELETE FROM pxr_book_manage.data_operation_data_type;
                DELETE FROM pxr_book_manage.data_operation;
                DELETE FROM pxr_book_manage.region_use;
                DELETE FROM pxr_book_manage.tou_consent;
                DELETE FROM pxr_book_manage.my_condition_book;
                SELECT SETVAL('pxr_book_manage.my_condition_book_id_seq', 1, false);
                SELECT SETVAL('pxr_book_manage.user_id_cooperate_id_seq', 1, false);
                SELECT SETVAL('pxr_book_manage.identification_id_seq', 1, false);
                SELECT SETVAL('pxr_book_manage.data_operation_id_seq', 1, false);
                SELECT SETVAL('pxr_book_manage.data_operation_data_type_id_seq', 1, false);
                SELECT SETVAL('pxr_book_manage.region_use_id_seq', 1, false);
                SELECT SETVAL('pxr_book_manage.tou_consent_id_seq', 1, false);
            `);

            // リクエストデータを読み込み
            const json = TestRequest.SUCCESS03;

            // スタブを起動
            operator = new OperatorService(200);
            catalog = new CatalogService(400);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常：カタログ取得のレスポンスが503', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.SUCCESS03;

            // スタブを起動
            operator = new OperatorService(200);
            catalog = new CatalogService(503);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常：カタログ取得のレスポンスが204', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.SUCCESS03;

            // スタブを起動
            operator = new OperatorService(200);
            catalog = new CatalogService(204);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常：カタログサービスへの接続に失敗', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.SUCCESS03;

            // スタブを起動
            operator = new OperatorService(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_CATALOG);
        });
        test('異常：グローバル設定のidentification-documentが取得できない', async () => {
            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            // リクエストデータを読み込み
            const json = TestRequest.SUCCESS01;

            // スタブを起動
            operator = new OperatorService(200);
            catalog = new CatalogService5(200);
            idService = new IdService(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.VERIFICATION_RATIO_NOT_ENOUGH);
        });
        test('異常：グローバル設定のidentification-document.document.satisfaction-rateが取得できない', async () => {
            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            // リクエストデータを読み込み
            const json = TestRequest.SUCCESS01;

            // スタブを起動
            operator = new OperatorService(200);
            catalog = new CatalogService6(200);
            idService = new IdService(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.VERIFICATION_RATIO_NOT_ENOUGH);
        });
        test('異常：Platform利用規約カタログ取得時エラー', async () => {
            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            // リクエストデータを読み込み
            const json = TestRequest.FAILED_GET_PLATFORM_TOU;

            // スタブを起動
            operator = new OperatorService(200);
            catalog = new CatalogService(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_EXIST_PLATFORM_TOU);
        });
        test('異常：Platform利用規約カタログが取得できない', async () => {
            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            // リクエストデータを読み込み
            const json = TestRequest.NOT_EXIST_PLATFORM_TOU;

            // スタブを起動
            operator = new OperatorService(200);
            catalog = new CatalogService(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_EXIST_PLATFORM_TOU);
        });
        test('異常：Platform利用規約カタログの内容不正', async () => {
            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            // リクエストデータを読み込み
            const json = TestRequest.NOT_AGREEMENT_PLATFORM_TOU;

            // スタブを起動
            operator = new OperatorService(200);
            catalog = new CatalogService(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_EXIST_PLATFORM_TOU);
        });
        test('異常：オペレーター情報取得のレスポンスが400', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.SUCCESS03;

            // スタブを起動
            operator = new OperatorService(400);
            catalog = new CatalogService(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.FAILED_OPERATOR_ADD);
        });
        test('異常：オペレーター追加のレスポンスが401', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.SUCCESS03;

            // スタブを起動
            operator = new OperatorService(401);
            catalog = new CatalogService(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.FAILED_OPERATOR_ADD);
        });
        test('異常：オペレーター追加のレスポンスが503', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.SUCCESS03;

            // スタブを起動
            operator = new OperatorService(500);
            catalog = new CatalogService(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_OPERATOR_ADD);
        });
        test('異常：オペレーターサービスへの接続に失敗（オペレーター追加時）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.SUCCESS03;

            // スタブを起動
            catalog = new CatalogService(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常：オペレーター情報取得のレスポンスが400', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.SUCCESS03;

            // スタブを起動
            operator = new OperatorService2(200, 400, 200);
            catalog = new CatalogService(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.FAILED_OPERATOR_USER_INFO);
        });
        test('異常：オペレーター情報取得のレスポンスが401', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.SUCCESS03;

            // スタブを起動
            operator = new OperatorService2(200, 401, 200);
            catalog = new CatalogService(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.FAILED_OPERATOR_USER_INFO);
        });
        test('異常：オペレーター情報取得のレスポンスが503', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.SUCCESS03;

            // スタブを起動
            operator = new OperatorService2(200, 503, 200);
            catalog = new CatalogService(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.FAILED_OPERATOR_USER_INFO);
        });
        test('異常：オペレーターサービスへの接続に失敗（オペレーター情報取得時）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.SUCCESS03;

            // スタブを起動
            operator = new OperatorService2(200, null, 200);
            catalog = new CatalogService(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.FAILED_OPERATOR_USER_INFO);
        });
        test('正常：オペレーター追加時エラーによるオペレーター削除', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.SUCCESS03;

            // スタブを起動
            operator = new OperatorService2(200, 200, 200);
            catalog = new CatalogService(200);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.FAILED_OPERATOR_USER_INFO);
        });
    });
});
