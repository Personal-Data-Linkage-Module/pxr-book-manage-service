/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { Session } from './Session';
import Config from '../common/Config';
import { sprintf } from 'sprintf-js';
import { StubCatalogServerShare, StubCatalogServerShareGetNsError } from './StubCatalogServer';
import { StubOperatorServerType0 } from './StubOperatorServer';
import StubCTokenServer from './StubCTokenServer';
const Message = Config.ReadConfig('./config/message.json');

// 対象アプリケーションを取得
const app = new Application();
const expressApp = app.express.app;
const common = new Common();

// サーバをlisten
app.start();

// スタブサーバー
let _operatorServer: StubOperatorServerType0 = null;
let _catalogServer: StubCatalogServerShare = null;
let _ctokenServer: StubCTokenServer = null;

/**
 * book-operate API のユニットテスト
 */
describe('book-operate API', () => {
    /**
     * 全テスト実行の前処理
     */
    beforeAll(async () => {
        // DB接続
        await common.connect();
        // DB初期化
        await common.executeSqlFile('initialData.sql');
        await common.executeSqlFile('initialDataBook.sql');
    });
    /**
     * 各テスト実行の前処理
     */
    beforeEach(async () => {
        // DB接続
        await common.connect();
    });

    /**
     * 全テスト実行の後処理
     */
    afterAll(async () => {
        // サーバ停止
        app.stop();
    });
    /**
     * 各テスト実行の後処理
     */
    afterEach(async () => {
        // スタブサーバー停止
        if (_operatorServer) {
            _operatorServer._server.close();
            _operatorServer = null;
        }
        if (_catalogServer) {
            _catalogServer._server.close();
            _catalogServer = null;
        }
        if (_ctokenServer) {
            _ctokenServer._server.close();
            _ctokenServer = null;
        }
    });

    /**
     * 一時的データ共有コード生成（非推奨）
     */
    describe('一時的データ共有コード生成（非推奨）', () => {
        test('異常系：新規としての処理（WF, コード指定,データ操作定義のレコードが未だ、紐づけされていない', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000001
                        },
                        app: null,
                        wf: {
                            _value: 1000004
                        },
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
        test('異常系：更新としての処理（WF, コード指定,既にデータ操作定義を紐づけられている）', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000001
                        },
                        app: null,
                        wf: {
                            _value: 1000004
                        },
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
        test('正常系：新規としての処理（APP, コード指定,データ操作定義のレコードが未だ、紐づけされていない）', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000002
                        },
                        app: {
                            _value: 1000035
                        },
                        wf: null,
                        document: [
                            {
                                _value: 1000046,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                actor: { _value: 2000002 },
                app: { _value: 1000035 },
                wf: null,
                document: [{ _value: 1000046, _ver: 1 }],
                event: [{ _value: 1000008, _ver: 1 }],
                thing: [{ _value: 1000011, _ver: 1 }],
                tempShareCode: response.body.tempShareCode,
                expireAt: response.body.expireAt
            }));
        });
        test('正常系：更新としての処理（APP, コード指定,既にデータ操作定義を紐づけられている）', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000002
                        },
                        app: {
                            _value: 1000035
                        },
                        wf: null,
                        document: [
                            {
                                _value: 1000046,
                                _ver: 1
                            },
                            {
                                _value: 1000056,
                                _ver: 1
                            }
                        ],
                        event: [],
                        thing: []
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                actor: { _value: 2000002 },
                app: { _value: 1000035 },
                wf: null,
                document: [{ _value: 1000046, _ver: 1 }, { _value: 1000056, _ver: 1 }],
                event: null,
                thing: null,
                tempShareCode: response.body.tempShareCode,
                expireAt: response.body.expireAt
            }));
        });
        test('異常系：新規としての処理（WF, 識別子指定,データ操作定義のレコードが未だ、紐づけされていない', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000001
                        },
                        app: null,
                        wf: {
                            _value: 1000014
                        },
                        identifier: [
                            {
                                document: 'fedc51ce-2efd-4ade-9bbe-45dc445ae9d0',
                                event: []
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
        test('異常系：新規としての処理（WF, 識別子指定, 既にデータ操作定義を紐づけられている）', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000001
                        },
                        app: {
                            _value: 1000014
                        },
                        wf: null,
                        identifier: [
                            {
                                document: 'fedc51ce-2efd-4ade-9bbe-45dc445ae9d0',
                                event: [
                                    'fedc51ce-2efd-4ade-9bbe-45dc445ae9e2'
                                ]
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
        test('正常系：新規としての処理（APP, 識別子指定,データ操作定義のレコードが未だ、紐づけされていない', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000002
                        },
                        app: {
                            _value: 1000015
                        },
                        wf: null,
                        identifier: [
                            {
                                event: 'fedc51ce-2efd-4ade-9bbe-45dc445ae9e1',
                                thing: [
                                    'thi01-84c6-06f5-d1c8-64f5-dd1b70e55071'
                                ]
                            },
                            {
                                document: 'fedc51ce-2efd-4ade-9bbe-45dc445ae9d0',
                                event: [
                                    'fedc51ce-2efd-4ade-9bbe-45dc445ae9e1'
                                ],
                                thing: [
                                    'thi01-84c6-06f5-d1c8-64f5-dd1b70e55071'
                                ]
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                actor: { _value: 2000002 },
                app: { _value: 1000015 },
                wf: null,
                identifier: [{
                    event: 'fedc51ce-2efd-4ade-9bbe-45dc445ae9e1',
                    thing: [
                        'thi01-84c6-06f5-d1c8-64f5-dd1b70e55071'
                    ]
                },
                {
                    document: 'fedc51ce-2efd-4ade-9bbe-45dc445ae9d0',
                    event: [
                        'fedc51ce-2efd-4ade-9bbe-45dc445ae9e1'
                    ],
                    thing: [
                        'thi01-84c6-06f5-d1c8-64f5-dd1b70e55071'
                    ]
                }],
                tempShareCode: response.body.tempShareCode,
                expireAt: response.body.expireAt
            }));
        });
        test('正常系：新規としての処理（APP, 識別子指定, 既にデータ操作定義を紐づけられている）', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000002
                        },
                        app: {
                            _value: 1000005
                        },
                        wf: null,
                        identifier: [
                            {
                                event: [],
                                thing: [
                                    'fedc51ce-2efd-4ade-9bbe-45dc445ae9t0'
                                ]
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                actor: { _value: 2000002 },
                app: { _value: 1000005 },
                wf: null,
                identifier: [{
                    event: [],
                    thing: [
                        'fedc51ce-2efd-4ade-9bbe-45dc445ae9t0'
                    ]
                }],
                tempShareCode: response.body.tempShareCode,
                expireAt: response.body.expireAt
            }));
        });
        test('パラメータ異常：全体が空', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify({}));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUIRE_APP_OR_WF_CODE);
        });
        test('異常系：配列型リクエスト', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify([
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ]));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_IS_ARRAY);
        });
        test('パラメータ不足：actor._value', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：actor._value、数値以外', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 'dummy'
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：appとwf', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUIRE_APP_OR_WF_CODE);
        });
        test('異常系：APPもWFも設定されている', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: {
                            _value: 1000006
                        },
                        wf: {
                            _value: 1000007
                        },
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
        test('パラメータ不足：app._value', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: {
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：app._value、数値以外', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: {
                            _value: 'dummy'
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：wf._value', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                        },
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：wf._value、数値以外', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 'dummy'
                        },
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：document、配列以外', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        document: {
                            _value: 1000006,
                            _ver: 1
                        },
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isArray);
        });
        test('パラメータ不足：document[]._value', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        document: [{
                            _ver: 1
                        }],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：document[]._value、数値以外', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        document: [{
                            _value: 'dummy',
                            _ver: 1
                        }],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：document[]._ver', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        document: [{
                            _value: 1000006
                        }],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：document[]._ver、数値以外', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        document: [{
                            _value: 1000006,
                            _ver: 'dummy'
                        }],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：event、配列以外', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        document: [],
                        event: {
                            _value: 1000006,
                            _ver: 1
                        },
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isArray);
        });
        test('パラメータ不足：event[]._value', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        document: [],
                        event: [
                            {
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：event[]._value、数値以外', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        document: [],
                        event: [
                            {
                                _value: 'dummy',
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：event[]._ver', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        document: [],
                        event: [
                            {
                                _value: 1000006
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：event[]._ver、数値以外', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        document: [],
                        event: [
                            {
                                _value: 1000006,
                                _ver: 'dummy'
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：thing、配列以外', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        document: [],
                        event: [
                            {
                                _value: 1000006,
                                _ver: 1
                            }
                        ],
                        thing: {
                            _value: 1000011,
                            _ver: 1
                        }
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isArray);
        });
        test('パラメータ不足：event[]._value', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：thing[]._value、数値以外', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 'dummy',
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：thing[]._ver', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：thing[]._ver、数値以外', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 'dummy'
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：identifier、配列以外', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        identifier: {
                            document: 'fedc51ce-2efd-4ade-9bbe-45dc445ae9d0'
                        }
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isArray);
        });
        test('パラメータ異常：identifier.document、文字列以外', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        identifier: [
                            {
                                document: ['fedc51ce-2efd-4ade-9bbe-45dc445ae9d0']
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isString);
        });
        test('パラメータ異常：identifier.event、文字列、配列以外', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        identifier: [
                            {
                                event: { id: 'fedc51ce-2efd-4ade-9bbe-45dc445ae9e0' }
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isString);
        });
        test('パラメータ異常：identifier.thing、配列以外', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        identifier: [
                            {
                                thing: 'fedc51ce-2efd-4ade-9bbe-45dc445ae9t0'
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isArray);
        });
        test('異常系：Cookieが存在するが空', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + ''])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: {
                            _value: 1000006
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常系：Cookie使用、オペレータサービス応答204', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(204, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: {
                            _value: 1000006
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常系：Cookie使用、オペレータサービス応答400系', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(400, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: {
                            _value: 1000006
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常系：Cookie使用、オペレータサービス応答500系', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(503, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: {
                            _value: 1000006
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常系：セッション(オペレータサービス未起動)', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: {
                            _value: 1000006
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常系：セッションなし', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: {
                            _value: 1000006
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常系：CTokenに存在しないIdentifierを指定', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: {
                            _value: 1000006
                        },
                        wf: null,
                        identifier: [
                            {
                                document: 'fedc51ce-2efd-4ade-9bbe-45dc445ae9n0'
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_FOUND_CTOKEN);
        });
        test('異常系：Bookが存在しないPXRユーザーのリクエスト', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStoreNotExistDataType) })
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: {
                            _value: 1000006
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.CAN_NOT_FIND_BOOK);
        });
        test('異常系：セッション(カタログサービスエラー応答400系)', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(400, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: {
                            _value: 1000006
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.CAN_NOT_FOUND_APP_AND_WF);
        });
        test('異常系：セッション(カタログサービスエラー応答500系)', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(503, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: {
                            _value: 1000006
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.CAN_NOT_FOUND_APP_AND_WF);
        });
        test('異常系：セッション(カタログサービスエラー応答204)', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(204, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: {
                            _value: 1000006
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.CAN_NOT_FOUND_APP_AND_WF);
        });
        test('異常系：セッション(カタログサービス未起動)', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: {
                            _value: 1000006
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.CAN_NOT_FOUND_APP_AND_WF);
        });
        test('異常系：セッション(カタログサービス ns取得時エラー応答400系)', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShareGetNsError(400, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000002
                        },
                        app: {
                            _value: 1000035
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常系：セッション(カタログサービス ns取得時エラー応答404)', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShareGetNsError(404, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000002
                        },
                        app: {
                            _value: 1000035
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.THING_CODE_IS_NOT_ALLOWED_FOR_SHARE, 1000011));
        });
        test('異常系：セッション(カタログサービス ns取得時エラー応答500系)', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShareGetNsError(500, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000002
                        },
                        app: {
                            _value: 1000035
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常系：セッション(カタログサービス ns取得時エラー応答204)', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShareGetNsError(204, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000002
                        },
                        app: {
                            _value: 1000035
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常系：セッション(カタログサービス ns取得時未起動)', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);
            _catalogServer = new StubCatalogServerShareGetNsError(null, 0);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000002
                        },
                        app: {
                            _value: 1000035
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_CATALOG);
        });
        test('異常系：セッション(CTokenサービスエラー応答400系)', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(400);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000002
                        },
                        app: {
                            _value: 1000035
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.FAILED_CTOKEN_GET);
        });
        test('異常系：セッション(CTokenサービスエラー応答500系)', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(503);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000002
                        },
                        app: {
                            _value: 1000035
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CTOKEN_GET);
        });
        test('異常系：セッション(CTokenサービスエラー応答204)', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(204);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000002
                        },
                        app: {
                            _value: 1000035
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.FAILED_CTOKEN_GET);
        });
        test('異常系：セッション(CTokenサービス未起動)', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000002
                        },
                        app: {
                            _value: 1000035
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_CTOKEN_LEDGER);
        });
        test('異常系：WFもAPPもどちらもカタログとして存在しない', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000002
                        },
                        app: {
                            _value: 1000035
                        },
                        wf: null,
                        document: [
                            {
                                _value: 1000036,
                                _ver: 1
                            }
                        ],
                        event: [],
                        thing: []
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.CAN_NOT_FOUND_APP_AND_WF);
        });
        test('異常系：アクターとの関係がなく共有不可（対アプリケーション', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000002
                        },
                        app: {
                            _value: 1000025
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000038,
                                _ver: 1
                            }
                        ],
                        thing: []
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_APPLICATION_IS_NOT_RELATION);
        });
        test('異常系：ドキュメントとしては共有指定できないカタログコード（コード未一致）', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000002
                        },
                        app: {
                            _value: 1000035
                        },
                        wf: null,
                        document: [{
                            _value: 1000026,
                            _ver: 1
                        }],
                        event: [],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.DOCUMENT_CODE_IS_NOT_ALLOWED_FOR_SHARE, '1000026'));
        });
        test('異常系：イベントとしては共有指定できないカタログコード（コード未一致）', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000002
                        },
                        app: {
                            _value: 1000005
                        },
                        wf: null,
                        document: [],
                        event: [{
                            _value: 1000048,
                            _ver: 1
                        }],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.EVENT_CODE_IS_NOT_ALLOWED_FOR_SHARE, '1000048'));
        });
        test('異常系：モノとしては共有指定できないカタログコード（コード未一致）', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000002
                        },
                        app: {
                            _value: 1000035
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000031,
                                _ver: 1
                            }
                        ]
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.THING_CODE_IS_NOT_ALLOWED_FOR_SHARE, '1000031'));
        });
        test('異常系：ドキュメントとしては共有指定できないカタログコード（バージョン未一致）', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000002
                        },
                        app: {
                            _value: 1000035
                        },
                        wf: null,
                        document: [{
                            _value: 1000026,
                            _ver: 2
                        }],
                        event: [],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.DOCUMENT_CODE_IS_NOT_ALLOWED_FOR_SHARE, '1000026'));
        });
        test('異常系：イベントとしては共有指定できないカタログコード（バージョン未一致）', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000002
                        },
                        app: {
                            _value: 1000035
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 2
                            }
                        ],
                        thing: []
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.EVENT_CODE_IS_NOT_ALLOWED_FOR_SHARE, '1000008'));
        });
        test('異常系：モノとしては共有指定できないカタログコード（バージョン未一致）', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000002
                        },
                        app: {
                            _value: 1000035
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 2
                            }
                        ]
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.THING_CODE_IS_NOT_ALLOWED_FOR_SHARE, '1000011'));
        });
        test('異常系：pxrIdを持たないユーザー', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.noPxrId) })
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000002
                        },
                        app: {
                            _value: 1000035
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.PXR_USER_ONLY);
        });
        test('異常系：アクターカタログにtemplate.workflowが存在する）', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateIndTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000001
                        },
                        app: {
                            _value: 2000001
                        },
                        wf: null,
                        document: [
                            {
                                _value: 1000099,
                                _ver: 1
                            }
                        ],
                        event: [],
                        thing: []
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
    });
    /**
     * 一時的データ共有コード生成
     */
    describe('一時的データ共有コード生成', () => {
        beforeAll(async () => {
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialDataBook.sql');
        });
        test('異常系：新規としての処理（WF, コード指定,データ操作定義のレコードが未だ、紐づけされていない', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000001
                        },
                        app: null,
                        wf: {
                            _value: 1000004
                        },
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
        test('異常系：更新としての処理（WF, コード指定,既にデータ操作定義を紐づけられている）', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000001
                        },
                        app: null,
                        wf: {
                            _value: 1000004
                        },
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
        test('正常系：新規としての処理（APP, コード指定,データ操作定義のレコードが未だ、紐づけされていない）', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000002
                        },
                        app: {
                            _value: 1000035
                        },
                        wf: null,
                        document: [
                            {
                                _value: 1000046,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                actor: { _value: 2000002 },
                app: { _value: 1000035 },
                wf: null,
                document: [{ _value: 1000046, _ver: 1 }],
                event: [{ _value: 1000008, _ver: 1 }],
                thing: [{ _value: 1000011, _ver: 1 }],
                tempShareCode: response.body.tempShareCode,
                expireAt: response.body.expireAt
            }));
        });
        test('正常系：更新としての処理（APP, コード指定,既にデータ操作定義を紐づけられている）', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000002
                        },
                        app: {
                            _value: 1000035
                        },
                        wf: null,
                        document: [
                            {
                                _value: 1000046,
                                _ver: 1
                            },
                            {
                                _value: 1000056,
                                _ver: 1
                            }
                        ],
                        event: [],
                        thing: []
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                actor: { _value: 2000002 },
                app: { _value: 1000035 },
                wf: null,
                document: [{ _value: 1000046, _ver: 1 }, { _value: 1000056, _ver: 1 }],
                event: null,
                thing: null,
                tempShareCode: response.body.tempShareCode,
                expireAt: response.body.expireAt
            }));
        });
        test('異常系：新規としての処理（WF, 識別子指定,データ操作定義のレコードが未だ、紐づけされていない', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000001
                        },
                        app: null,
                        wf: {
                            _value: 1000014
                        },
                        identifier: [
                            {
                                document: 'fedc51ce-2efd-4ade-9bbe-45dc445ae9d0',
                                event: []
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
        test('異常系：新規としての処理（WF, 識別子指定, 既にデータ操作定義を紐づけられている）', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000001
                        },
                        app: {
                            _value: 1000014
                        },
                        wf: null,
                        identifier: [
                            {
                                document: 'fedc51ce-2efd-4ade-9bbe-45dc445ae9d0',
                                event: [
                                    'fedc51ce-2efd-4ade-9bbe-45dc445ae9e2'
                                ]
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
        test('正常系：新規としての処理（APP, 識別子指定,データ操作定義のレコードが未だ、紐づけされていない', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000002
                        },
                        app: {
                            _value: 1000015
                        },
                        wf: null,
                        identifier: [
                            {
                                event: 'fedc51ce-2efd-4ade-9bbe-45dc445ae9e1',
                                thing: [
                                    'thi01-84c6-06f5-d1c8-64f5-dd1b70e55071'
                                ]
                            },
                            {
                                document: 'fedc51ce-2efd-4ade-9bbe-45dc445ae9d0',
                                event: [
                                    'fedc51ce-2efd-4ade-9bbe-45dc445ae9e1'
                                ],
                                thing: [
                                    'thi01-84c6-06f5-d1c8-64f5-dd1b70e55071'
                                ]
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                actor: { _value: 2000002 },
                app: { _value: 1000015 },
                wf: null,
                identifier: [{
                    event: 'fedc51ce-2efd-4ade-9bbe-45dc445ae9e1',
                    thing: [
                        'thi01-84c6-06f5-d1c8-64f5-dd1b70e55071'
                    ]
                },
                {
                    document: 'fedc51ce-2efd-4ade-9bbe-45dc445ae9d0',
                    event: [
                        'fedc51ce-2efd-4ade-9bbe-45dc445ae9e1'
                    ],
                    thing: [
                        'thi01-84c6-06f5-d1c8-64f5-dd1b70e55071'
                    ]
                }],
                tempShareCode: response.body.tempShareCode,
                expireAt: response.body.expireAt
            }));
        });
        test('正常系：新規としての処理（APP, 識別子指定, 既にデータ操作定義を紐づけられている）', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000002
                        },
                        app: {
                            _value: 1000005
                        },
                        wf: null,
                        identifier: [
                            {
                                event: [],
                                thing: [
                                    'fedc51ce-2efd-4ade-9bbe-45dc445ae9t0'
                                ]
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                actor: { _value: 2000002 },
                app: { _value: 1000005 },
                wf: null,
                identifier: [{
                    event: [],
                    thing: [
                        'fedc51ce-2efd-4ade-9bbe-45dc445ae9t0'
                    ]
                }],
                tempShareCode: response.body.tempShareCode,
                expireAt: response.body.expireAt
            }));
        });
        test('パラメータ異常：全体が空', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify({}));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUIRE_APP_OR_WF_CODE);
        });
        test('異常系：配列型リクエスト', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify([
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ]));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_IS_ARRAY);
        });
        test('パラメータ不足：actor._value', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：actor._value、数値以外', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 'dummy'
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：appとwf', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUIRE_APP_OR_WF_CODE);
        });
        test('異常系：APPもWFも設定されている', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: {
                            _value: 1000006
                        },
                        wf: {
                            _value: 1000007
                        },
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
        test('パラメータ不足：app._value', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: {
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：app._value、数値以外', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: {
                            _value: 'dummy'
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：wf._value', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                        },
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：wf._value、数値以外', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 'dummy'
                        },
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：document、配列以外', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        document: {
                            _value: 1000006,
                            _ver: 1
                        },
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isArray);
        });
        test('パラメータ不足：document[]._value', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        document: [{
                            _ver: 1
                        }],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：document[]._value、数値以外', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        document: [{
                            _value: 'dummy',
                            _ver: 1
                        }],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：document[]._ver', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        document: [{
                            _value: 1000006
                        }],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：document[]._ver、数値以外', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        document: [{
                            _value: 1000006,
                            _ver: 'dummy'
                        }],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：event、配列以外', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        document: [],
                        event: {
                            _value: 1000006,
                            _ver: 1
                        },
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isArray);
        });
        test('パラメータ不足：event[]._value', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        document: [],
                        event: [
                            {
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：event[]._value、数値以外', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        document: [],
                        event: [
                            {
                                _value: 'dummy',
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：event[]._ver', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        document: [],
                        event: [
                            {
                                _value: 1000006
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：event[]._ver、数値以外', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        document: [],
                        event: [
                            {
                                _value: 1000006,
                                _ver: 'dummy'
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：thing、配列以外', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        document: [],
                        event: [
                            {
                                _value: 1000006,
                                _ver: 1
                            }
                        ],
                        thing: {
                            _value: 1000011,
                            _ver: 1
                        }
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isArray);
        });
        test('パラメータ不足：event[]._value', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：thing[]._value、数値以外', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 'dummy',
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：thing[]._ver', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：thing[]._ver、数値以外', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 'dummy'
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：identifier、配列以外', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        identifier: {
                            document: 'fedc51ce-2efd-4ade-9bbe-45dc445ae9d0'
                        }
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isArray);
        });
        test('パラメータ異常：identifier.document、文字列以外', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        identifier: [
                            {
                                document: ['fedc51ce-2efd-4ade-9bbe-45dc445ae9d0']
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isString);
        });
        test('パラメータ異常：identifier.event、文字列、配列以外', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        identifier: [
                            {
                                event: { id: 'fedc51ce-2efd-4ade-9bbe-45dc445ae9e0' }
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isString);
        });
        test('パラメータ異常：identifier.thing、配列以外', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: null,
                        wf: {
                            _value: 1000007
                        },
                        identifier: [
                            {
                                thing: 'fedc51ce-2efd-4ade-9bbe-45dc445ae9t0'
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isArray);
        });
        test('異常系：Cookieが存在するが空', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + ''])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: {
                            _value: 1000006
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常系：Cookie使用、オペレータサービス応答204', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(204, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: {
                            _value: 1000006
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常系：Cookie使用、オペレータサービス応答400系', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(400, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: {
                            _value: 1000006
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常系：Cookie使用、オペレータサービス応答500系', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(503, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: {
                            _value: 1000006
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常系：セッション(オペレータサービス未起動)', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: {
                            _value: 1000006
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常系：セッションなし', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: {
                            _value: 1000006
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常系：CTokenに存在しないIdentifierを指定', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: {
                            _value: 1000006
                        },
                        wf: null,
                        identifier: [
                            {
                                document: 'fedc51ce-2efd-4ade-9bbe-45dc445ae9n0'
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_FOUND_CTOKEN);
        });
        test('異常系：Bookが存在しないPXRユーザーのリクエスト', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStoreNotExistDataType) })
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: {
                            _value: 1000006
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.CAN_NOT_FIND_BOOK);
        });
        test('異常系：セッション(カタログサービスエラー応答400系)', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(400, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: {
                            _value: 1000006
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.CAN_NOT_FOUND_APP_AND_WF);
        });
        test('異常系：セッション(カタログサービスエラー応答500系)', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(503, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: {
                            _value: 1000006
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.CAN_NOT_FOUND_APP_AND_WF);
        });
        test('異常系：セッション(カタログサービスエラー応答204)', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(204, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: {
                            _value: 1000006
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.CAN_NOT_FOUND_APP_AND_WF);
        });
        test('異常系：セッション(カタログサービス未起動)', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000004
                        },
                        app: {
                            _value: 1000006
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.CAN_NOT_FOUND_APP_AND_WF);
        });
        test('異常系：セッション(カタログサービス ns取得時エラー応答400系)', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShareGetNsError(400, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000002
                        },
                        app: {
                            _value: 1000035
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常系：セッション(カタログサービス ns取得時エラー応答404)', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShareGetNsError(404, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000002
                        },
                        app: {
                            _value: 1000035
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.THING_CODE_IS_NOT_ALLOWED_FOR_SHARE, 1000011));
        });
        test('異常系：セッション(カタログサービス ns取得時エラー応答500系)', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShareGetNsError(500, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000002
                        },
                        app: {
                            _value: 1000035
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常系：セッション(カタログサービス ns取得時エラー応答204)', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShareGetNsError(204, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000002
                        },
                        app: {
                            _value: 1000035
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常系：セッション(カタログサービス ns取得時未起動)', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);
            _catalogServer = new StubCatalogServerShareGetNsError(null, 0);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000002
                        },
                        app: {
                            _value: 1000035
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_CATALOG);
        });
        test('異常系：セッション(CTokenサービスエラー応答400系)', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(400);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000001
                        },
                        app: {
                            _value: 1000006
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.FAILED_CTOKEN_GET);
        });
        test('異常系：セッション(CTokenサービスエラー応答500系)', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(503);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000001
                        },
                        app: {
                            _value: 1000006
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CTOKEN_GET);
        });
        test('異常系：セッション(CTokenサービスエラー応答204)', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(204);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000001
                        },
                        app: {
                            _value: 1000006
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.FAILED_CTOKEN_GET);
        });
        test('異常系：セッション(CTokenサービス未起動)', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000001
                        },
                        app: {
                            _value: 1000006
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_CTOKEN_LEDGER);
        });
        test('異常系：WFもAPPもどちらもカタログとして存在しない', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000001
                        },
                        app: {
                            _value: 1000006
                        },
                        wf: null,
                        document: [
                            {
                                _value: 1000036,
                                _ver: 1
                            }
                        ],
                        event: [],
                        thing: []
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.CAN_NOT_FOUND_APP_AND_WF);
        });
        test('異常系：アクターとの関係がなく共有不可（対アプリケーション', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000002
                        },
                        app: {
                            _value: 1000025
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000038,
                                _ver: 1
                            }
                        ],
                        thing: []
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_APPLICATION_IS_NOT_RELATION);
        });
        test('異常系：ドキュメントとしては共有指定できないカタログコード（コード未一致）', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000002
                        },
                        app: {
                            _value: 1000035
                        },
                        wf: null,
                        document: [{
                            _value: 1000026,
                            _ver: 1
                        }],
                        event: [],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.DOCUMENT_CODE_IS_NOT_ALLOWED_FOR_SHARE, '1000026'));
        });
        test('異常系：イベントとしては共有指定できないカタログコード（コード未一致）', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000002
                        },
                        app: {
                            _value: 1000005
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000048,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.EVENT_CODE_IS_NOT_ALLOWED_FOR_SHARE, '1000048'));
        });
        test('異常系：モノとしては共有指定できないカタログコード（コード未一致）', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000002
                        },
                        app: {
                            _value: 1000035
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000031,
                                _ver: 1
                            }
                        ]
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.THING_CODE_IS_NOT_ALLOWED_FOR_SHARE, '1000031'));
        });
        test('異常系：ドキュメントとしては共有指定できないカタログコード（バージョン未一致）', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000002
                        },
                        app: {
                            _value: 1000035
                        },
                        wf: null,
                        document: [{
                            _value: 1000026,
                            _ver: 2
                        }],
                        event: [],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.DOCUMENT_CODE_IS_NOT_ALLOWED_FOR_SHARE, '1000026'));
        });
        test('異常系：イベントとしては共有指定できないカタログコード（バージョン未一致）', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000002
                        },
                        app: {
                            _value: 1000035
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 2
                            }
                        ],
                        thing: []
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.EVENT_CODE_IS_NOT_ALLOWED_FOR_SHARE, '1000008'));
        });
        test('異常系：モノとしては共有指定できないカタログコード（バージョン未一致）', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000002
                        },
                        app: {
                            _value: 1000035
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 2
                            }
                        ]
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.THING_CODE_IS_NOT_ALLOWED_FOR_SHARE, '1000011'));
        });
        test('異常系：pxrIdを持たないユーザー', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.noPxrId) })
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000002
                        },
                        app: {
                            _value: 1000035
                        },
                        wf: null,
                        document: [],
                        event: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000011,
                                _ver: 1
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.PXR_USER_ONLY);
        });
        test('異常系：アクターカタログにtemplate.workflowが存在する）', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.generateTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 2000001
                        },
                        app: {
                            _value: 2000001
                        },
                        wf: null,
                        document: [
                            {
                                _value: 1000099,
                                _ver: 1
                            }
                        ],
                        event: [],
                        thing: []
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
    });
    /**
     * 一時的データ共有コード取得（非推奨）
     */
    describe('一時的データ共有コード取得（非推奨）', () => {
        beforeAll(async () => {
            // データを設定
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialDataBook.sql');
            await common.executeSqlString(`
                INSERT INTO pxr_book_manage.data_operation VALUES
                (1, 2, null, 'temp', null, null, 2000002, 1, 1000005, 1, null, null, null, false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW()),
                (2, 2, null, 'temp', null, null, 2000002, 1, 1000005, 1, null, null, null, false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW()),
                (3, 2, null, 'temp', null, null, 2000002, 1, 1000005, 1, null, null, null, false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW());
                INSERT INTO pxr_book_manage.temporarily_shared_code VALUES
                ('1fb404d9-cecf-4c18-a1c2-f0bd006be720', 1, '2999-12-31 00:00:00', false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW()),
                ('1fb404d9-cecf-4c18-a1c2-f0bd006be721', 2, '1999-12-31 00:00:00', false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW());
                INSERT INTO pxr_book_manage.data_operation_data_type VALUES
                (1, 1, null, 1000006, 1, null, null, null, null, true, null, false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW()),
                (2, 1, null, null, null, 1000007, 1, null, null, true, null, false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW()),
                (3, 1, null, null, null, null, null, 1000008, 1, true, null, false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW());
                INSERT INTO pxr_book_manage.data_operation_data VALUES
                (1, 1, null, 1, 'fedc51ce-2efd-4ade-9bbe-45dc445ae9d0', null, false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW()),
                (2, 1, null, 2, 'fedc51ce-2efd-4ade-9bbe-45dc445ae9e0', null, false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW()),
                (3, 1, null, 3, 'fedc51ce-2efd-4ade-9bbe-45dc445ae9t0', null, false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW()),
                (4, 1, 'fedc51ce-2efd-4ade-9bbe-45dc445ae9d0', 2, 'fedc51ce-2efd-4ade-9bbe-45dc445ae9e1', null, false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW()),
                (5, 1, 'fedc51ce-2efd-4ade-9bbe-45dc445ae9d0', 3, 'fedc51ce-2efd-4ade-9bbe-45dc445ae9t1', null, false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW());
            `);
        });
        test('正常系：正常系（有効期限切れを含まず）', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // queryparamを設定
            const url = Url.generateIndTempShareCodeURI;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect((response.body.length)).toBe(1);
            expect(JSON.stringify(response.body[0].id)).toBe('1');
            expect(JSON.stringify(response.body[0].actor._value)).toBe('2000002');
            expect(JSON.stringify(response.body[0].app._value)).toBe('1000005');
            expect(JSON.stringify(response.body[0].identifier[0].thing[0])).toBe('"fedc51ce-2efd-4ade-9bbe-45dc445ae9t1"');
        });
        test('正常系：正常系（有効期限切れを含む）', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // queryparamを設定
            const url = Url.generateIndTempShareCodeURI + '?expiration=true';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect((response.body.length)).toBe(2);
        });
        test('異常系：データ操作定義にワークフローカタログコードが入っている', async () => {
            await common.executeSqlString(`
                INSERT INTO pxr_book_manage.data_operation VALUES
                (4, 2, null, 'temp', null, null, 2000001, 1, null, null, 1000004, 1, null, false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW());
                INSERT INTO pxr_book_manage.temporarily_shared_code VALUES
                ('1fb404d9-cecf-4c18-a1c2-f0bd006be722', 4, '2999-12-31 00:00:00', false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW());
            `);
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // queryparamを設定
            const url = Url.generateIndTempShareCodeURI + '?expiration=true';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
        test('異常系：expiration、boolean以外', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // queryparamを設定
            const url = Url.generateIndTempShareCodeURI + '?expiration=0';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.EXPIRATION_IS_NOT_BOOLEAN);
        });
        test('異常系：Cookieが存在するが空', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // queryparamを設定
            const url = Url.generateIndTempShareCodeURI + '?expiration=true';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + '']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常系：Cookie使用、オペレータサービス応答204', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(204, 0);
            _ctokenServer = new StubCTokenServer(200);

            // queryparamを設定
            const url = Url.generateIndTempShareCodeURI + '?expiration=true';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常系：Cookie使用、オペレータサービス応答400系', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(400, 0);
            _ctokenServer = new StubCTokenServer(200);

            // queryparamを設定
            const url = Url.generateIndTempShareCodeURI + '?expiration=true';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常系：Cookie使用、オペレータサービス応答500系', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(503, 0);
            _ctokenServer = new StubCTokenServer(200);

            // queryparamを設定
            const url = Url.generateIndTempShareCodeURI + '?expiration=true';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常系：セッション(オペレータサービス未起動)', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // queryparamを設定
            const url = Url.generateIndTempShareCodeURI + '?expiration=true';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常系：セッションなし', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // queryparamを設定
            const url = Url.generateIndTempShareCodeURI + '?expiration=true';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常系：Bookが存在しない', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // queryparamを設定
            const url = Url.generateIndTempShareCodeURI + '?expiration=true';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStoreNotExistDataType) });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.CAN_NOT_FIND_BOOK);
        });
        test('異常系：pxrIdを持たないユーザー', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // queryparamを設定
            const url = Url.generateIndTempShareCodeURI + '?expiration=true';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.noPxrId) });
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.PXR_USER_ONLY);
        });
    });
    /**
     * 一時的データ共有コード取得
     */
    describe('一時的データ共有コード取得', () => {
        beforeAll(async () => {
            // データを設定
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialDataBook.sql');
            await common.executeSqlString(`
                INSERT INTO pxr_book_manage.data_operation VALUES
                (1, 2, null, 'temp', null, null, 2000002, 1, 1000005, 1, null, null, null, false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW()),
                (2, 2, null, 'temp', null, null, 2000002, 1, 1000005, 1, null, null, null, false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW()),
                (3, 2, null, 'temp', null, null, 2000002, 1, 1000005, 1, null, null, null, false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW());
                INSERT INTO pxr_book_manage.temporarily_shared_code VALUES
                ('1fb404d9-cecf-4c18-a1c2-f0bd006be720', 1, '2999-12-31 00:00:00', false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW()),
                ('1fb404d9-cecf-4c18-a1c2-f0bd006be721', 2, '1999-12-31 00:00:00', false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW());
                INSERT INTO pxr_book_manage.data_operation_data_type VALUES
                (1, 1, null, 1000006, 1, null, null, null, null, true, null, false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW()),
                (2, 1, null, null, null, 1000007, 1, null, null, true, null, false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW()),
                (3, 1, null, null, null, null, null, 1000008, 1, true, null, false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW());
                INSERT INTO pxr_book_manage.data_operation_data VALUES
                (1, 1, null, 1, 'fedc51ce-2efd-4ade-9bbe-45dc445ae9d0', null, false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW()),
                (2, 1, null, 2, 'fedc51ce-2efd-4ade-9bbe-45dc445ae9e0', null, false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW()),
                (3, 1, null, 3, 'fedc51ce-2efd-4ade-9bbe-45dc445ae9t0', null, false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW()),
                (4, 1, 'fedc51ce-2efd-4ade-9bbe-45dc445ae9d0', 2, 'fedc51ce-2efd-4ade-9bbe-45dc445ae9e1', null, false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW()),
                (5, 1, 'fedc51ce-2efd-4ade-9bbe-45dc445ae9d0', 3, 'fedc51ce-2efd-4ade-9bbe-45dc445ae9t1', null, false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW());
            `);
        });
        test('正常系：正常系（有効期限切れを含まず）', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // queryparamを設定
            const url = Url.generateTempShareCodeURI;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect((response.body.length)).toBe(1);
            expect(JSON.stringify(response.body[0].id)).toBe('1');
            expect(JSON.stringify(response.body[0].actor._value)).toBe('2000002');
            expect(JSON.stringify(response.body[0].app._value)).toBe('1000005');
            expect(JSON.stringify(response.body[0].identifier[0].thing[0])).toBe('"fedc51ce-2efd-4ade-9bbe-45dc445ae9t1"');
        });
        test('正常系：正常系（有効期限切れを含む）', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // queryparamを設定
            const url = Url.generateTempShareCodeURI + '?expiration=true';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect((response.body.length)).toBe(2);
        });
        test('異常系：データ操作定義にワークフローカタログコードが入っている', async () => {
            await common.executeSqlString(`
                INSERT INTO pxr_book_manage.data_operation VALUES
                (4, 2, null, 'temp', null, null, 2000001, 1, null, null, 100004, 1, null, false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW());
                INSERT INTO pxr_book_manage.temporarily_shared_code VALUES
                ('1fb404d9-cecf-4c18-a1c2-f0bd006be722', 4, '2999-12-31 00:00:00', false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW());
            `);
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // queryparamを設定
            const url = Url.generateTempShareCodeURI + '?expiration=true';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
        test('異常系：expiration、boolean以外', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // queryparamを設定
            const url = Url.generateTempShareCodeURI + '?expiration=0';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.EXPIRATION_IS_NOT_BOOLEAN);
        });
        test('異常系：Cookieが存在するが空', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // queryparamを設定
            const url = Url.generateTempShareCodeURI + '?expiration=true';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + '']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常系：Cookie使用、オペレータサービス応答204', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(204, 0);
            _ctokenServer = new StubCTokenServer(200);

            // queryparamを設定
            const url = Url.generateTempShareCodeURI + '?expiration=true';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常系：Cookie使用、オペレータサービス応答400系', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(400, 0);
            _ctokenServer = new StubCTokenServer(200);

            // queryparamを設定
            const url = Url.generateTempShareCodeURI + '?expiration=true';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常系：Cookie使用、オペレータサービス応答500系', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(503, 0);
            _ctokenServer = new StubCTokenServer(200);

            // queryparamを設定
            const url = Url.generateTempShareCodeURI + '?expiration=true';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常系：セッション(オペレータサービス未起動)', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // queryparamを設定
            const url = Url.generateTempShareCodeURI + '?expiration=true';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常系：セッションなし', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // queryparamを設定
            const url = Url.generateTempShareCodeURI + '?expiration=true';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常系：Bookが存在しない', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // queryparamを設定
            const url = Url.generateTempShareCodeURI + '?expiration=true';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStoreNotExistDataType) });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.CAN_NOT_FIND_BOOK);
        });
        test('異常系：pxrIdを持たないユーザー', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // queryparamを設定
            const url = Url.generateTempShareCodeURI + '?expiration=true';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.noPxrId) });
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.PXR_USER_ONLY);
        });
    });
    /**
     * 一時的データ共有コード照合
     */
    describe('一時的データ共有コード照合', () => {
        beforeAll(async () => {
            // データを設定
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialDataBook.sql');
            await common.executeSqlString(`
                INSERT INTO pxr_book_manage.data_operation VALUES
                (1, 2, null, 'temp', null, null, 2000002, 1, 1000005, 1, null, null, null, false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW()),
                (2, 2, null, 'temp', null, null, 2000002, 1, 1000005, 1, null, null, null, false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW()),
                (3, 2, null, 'temp', null, null, 2000002, 1, 1000005, 1, null, null, null, false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW()),
                (4, 2, null, 'temp', null, null, 2000001, 1, null, null, 1000004, 1, null, false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW());
                INSERT INTO pxr_book_manage.temporarily_shared_code VALUES
                ('1fb404d9-cecf-4c18-a1c2-f0bd006be720', 1, '2999-12-31 00:00:00', false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW()),
                ('1fb404d9-cecf-4c18-a1c2-f0bd006be721', 2, '1999-12-31 00:00:00', false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW()),
                ('1fb404d9-cecf-4c18-a1c2-f0bd006be722', 4, '2999-12-31 00:00:00', false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW());
                INSERT INTO pxr_book_manage.data_operation_data_type VALUES
                (1, 1, null, 1000006, 1, null, null, null, null, true, null, false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW()),
                (2, 1, null, null, null, 1000007, 1, null, null, true, null, false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW()),
                (3, 1, null, null, null, null, null, 1000008, 1, true, null, false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW());
                INSERT INTO pxr_book_manage.data_operation_data VALUES
                (1, 1, null, 1, 'fedc51ce-2efd-4ade-9bbe-45dc445ae9d0', null, false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW()),
                (2, 1, null, 2, 'fedc51ce-2efd-4ade-9bbe-45dc445ae9e0', null, false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW()),
                (3, 1, null, 3, 'fedc51ce-2efd-4ade-9bbe-45dc445ae9t0', null, false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW()),
                (4, 1, 'fedc51ce-2efd-4ade-9bbe-45dc445ae9d0', 2, 'fedc51ce-2efd-4ade-9bbe-45dc445ae9e1', null, false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW()),
                (5, 1, 'fedc51ce-2efd-4ade-9bbe-45dc445ae9d0', 3, 'fedc51ce-2efd-4ade-9bbe-45dc445ae9t1', null, false, '58di2dfse2.test.org', NOW(), '58di2dfse2.test.org', NOW());
            `);
        });
        test('正常系：APP', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.compairTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify({
                    tempShareCode: '1fb404d9-cecf-4c18-a1c2-f0bd006be720'
                }));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body.id)).toBe('1');
            expect(JSON.stringify(response.body.pxrId)).toBe('"58di2dfse2.test.org"');
            expect(JSON.stringify(response.body.actor._value)).toBe('2000002');
            expect(JSON.stringify(response.body.app._value)).toBe('1000005');
            expect(JSON.stringify(response.body.identifier[0].event)).toBe('["fedc51ce-2efd-4ade-9bbe-45dc445ae9e1"]');
        });
        test('異常系：データ操作定義にワークフローカタログコードが入っている', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.compairTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify({
                    tempShareCode: '1fb404d9-cecf-4c18-a1c2-f0bd006be722'
                }));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
        test('異常系：配列型のリクエスト', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.compairTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    [{ tempShareCode: '1fb404d9-cecf-4c18-a1c2-f0bd006be720' }]
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_IS_ARRAY);
        });
        test('パラメータ不足：tempShareCode', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.compairTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify({
                }));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
        });
        test('パラメータ異常：tempShareCode、null', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.compairTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify({
                    tempShareCode: null
                }));
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
        });
        test('パラメータ異常：tempShareCode、uuid以外', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.compairTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify({
                    tempShareCode: 'b9601dabf43e416495d54ad14312cb55'
                }));
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isUuid);
        });
        test('異常系：Cookieが存在するが空', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.compairTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + ''])
                .send(JSON.stringify({
                    tempShareCode: '1fb404d9-cecf-4c18-a1c2-f0bd006be720'
                }));
            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常系：Cookie使用、オペレータサービス応答204', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(204, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.compairTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify({
                    tempShareCode: '1fb404d9-cecf-4c18-a1c2-f0bd006be720'
                }));
            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常系：Cookie使用、オペレータサービス応答400系', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(400, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.compairTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify({
                    tempShareCode: '1fb404d9-cecf-4c18-a1c2-f0bd006be720'
                }));
            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常系：Cookie使用、オペレータサービス応答500系', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(503, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.compairTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify({
                    tempShareCode: '1fb404d9-cecf-4c18-a1c2-f0bd006be720'
                }));
            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常系：セッション(オペレータサービス未起動)', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.compairTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify({
                    tempShareCode: '1fb404d9-cecf-4c18-a1c2-f0bd006be720'
                }));
            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常系：セッションなし', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.compairTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(JSON.stringify({
                    tempShareCode: '1fb404d9-cecf-4c18-a1c2-f0bd006be720'
                }));
            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常系：存在しない共有コード', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.compairTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify({
                    tempShareCode: '00000000-0000-0000-0000-000000000000'
                }));
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_FOUND_REQUESTED_SHARED_CODE);
        });
        test('異常系：コードが有効期限切れ', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerShare(200, 0);
            _operatorServer = new StubOperatorServerType0(200, 0);
            _ctokenServer = new StubCTokenServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.compairTempShareCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify({
                    tempShareCode: '1fb404d9-cecf-4c18-a1c2-f0bd006be721'
                }));
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.EXPIRE_SHARE_CODE);
        });
    });
});
