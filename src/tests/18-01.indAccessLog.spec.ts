/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { Session } from './Session';
import { StubCatalogForAccessLog, StubCatalogForAccessLogGetCatalogInfosError } from './StubCatalogServer';
import StubProxyServer from './StubProxyServer';
import StubOperatorServer from './StubOperatorServer';
import Config from '../common/Config';
import { sprintf } from 'sprintf-js';
const Message = Config.ReadConfig('./config/message.json');

// 対象アプリケーションを取得
const app = new Application();
const expressApp = app.express.app;
const common = new Common();

// サーバをlisten
app.start();

// スタブサーバー（カタログサービス）
let _catalogServer: any = null;

// スタブサーバー（プロキシサービス）
let _proxyServer: StubProxyServer = null;

// スタブサーバー（オペレータサービス）
let _operatorServer: StubOperatorServer = null;

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
        // 初期データ投入
        await common.executeSqlString(`
            INSERT INTO pxr_book_manage.my_condition_book
            (
                pxr_id, attributes,
                is_disabled, created_by, created_at, updated_by, updated_at
            )
            VALUES
            (
                'dummy.test.org', NULL,
                false, 'pxr_user', NOW(), 'pxr_user', NOW()
            ),
            (
                'dummy2.test.org', NULL,
                false, 'pxr_user', NOW(), 'pxr_user', NOW()
            ),
            (
                'invalid.actor', NULL,
                false, 'pxr_user', NOW(), 'pxr_user', NOW()
            );
            INSERT INTO pxr_book_manage.USER_ID_COOPERATE
            (
                book_id,
                actor_catalog_code, actor_catalog_version,
                app_catalog_code, app_catalog_version,
                wf_catalog_code, wf_catalog_version,
                user_id, status, start_at,
                is_disabled, created_by, created_at, updated_by, updated_at
            )
            VALUES
            (
                1,
                1000117, 1, 1000120,1, null, null, 'userid01',
                1, '2020-07-07T00:00:00.000+0900',
                false, 'pxr_user', '2020-07-07T00:00:00.000+0900', 'pxr_user', NOW()
            ),
            (
                1,
                1000004, 1, 1000007,1, null, null, 'userid02',
                1, '2020-07-07T00:00:00.000+0900',
                false, 'pxr_user', '2020-07-07T00:00:00.000+0900', 'pxr_user', NOW()
            ),
            (
                1,
                1000070, 1, 1000073, 1, null, null, 'userid03',
                1, '2020-07-07T00:00:00.000+0900',
                false, 'pxr_user', '2020-07-07T00:00:00.000+0900', 'pxr_user', NOW()
            ),
            (
                1,
                1001117, 1, null, null, 1001120, 1, 'userid04',
                1, '2020-07-07T00:00:00.000+0900',
                false, 'pxr_user', '2020-07-07T00:00:00.000+0900', 'pxr_user', NOW()
            ),
            (
                2,
                1009999, 1, 1019999, 1, null, null, 'userid05',
                1, '2020-07-07T00:00:00.000+0900',
                false, 'pxr_user', '2020-07-07T00:00:00.000+0900', 'pxr_user', NOW()
            ),
            (
                1,
                1002117, 1, 1000120, 1, null, null, 'userid06',
                1, '2020-07-07T00:00:00.000+0900',
                false, 'pxr_user', '2020-07-07T00:00:00.000+0900', 'pxr_user', NOW()
            ),
            (
                1,
                1002117, 1, 1000120, 1, null, null, 'userid06',
                0, '2020-07-07T00:00:00.000+0900',
                false, 'pxr_user', '2020-07-07T00:00:00.000+0900', 'pxr_user', NOW()
            ),
            (
                1,
                1000117, 1, 1000121, 1, null, null, 'userid01',
                0, '2020-07-07T00:00:00.000+0900',
                false, 'pxr_user', '2020-07-07T00:00:00.000+0900', 'pxr_user', NOW()
            ),
            (
                1,
                1000117, 1, 1000122, 1, null, null, 'userid01_01',
                2, '2020-07-07T00:00:00.000+0900',
                false, 'pxr_user', '2020-07-07T00:00:00.000+0900', 'pxr_user', NOW()
            ),
            (
                1,
                1000117, 1, 1000123, 1, null, null, 'userid01_02',
                3, '2020-07-07T00:00:00.000+0900',
                false, 'pxr_user', '2020-07-07T00:00:00.000+0900', 'pxr_user', NOW()
            ),
            (
                3,
                0, 1, 1000999,0, null, null, 'userid01_02',
                3, '2020-07-07T00:00:00.000+0900',
                false, 'pxr_user', '2020-07-07T00:00:00.000+0900', 'pxr_user', NOW()
            );
        `);
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
        if (_catalogServer) {
            _catalogServer._server.close();
            _catalogServer = null;
        }
        if (_proxyServer) {
            _proxyServer._server.close();
            _proxyServer = null;
        }
        if (_operatorServer) {
            _operatorServer._server.close();
            _operatorServer = null;
        }
    });

    /**
     * 共有アクセス取得依頼（非推奨）
     */
    describe('共有アクセス取得依頼（非推奨）', () => {
        test('パラメータ異常：bodyがJSON不正', async () => {
            // 送信データを生成
            const json = JSON.stringify('a');

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe('リクエストボディが、JSON形式ではありません');
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：bodyが空', async () => {
            // 送信データを生成
            const json = JSON.stringify({});

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.REQUEST_IS_EMPTY);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：bodyが配列', async () => {
            // 送信データを生成
            const json = JSON.stringify([{
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1000001,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000002,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000003,
                                _ver: 1
                            }
                        ]
                    }
                ]
            }]);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.UNEXPECTED_ARRAY_REQUEST);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：accessAt.start（日付型以外）', async () => {
            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: 'a',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1000001,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000002,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000003,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(400);
                expect(response.body.reasons[0].property).toBe('start');
                expect(response.body.reasons[0].message).toBe(Message.validation.isDate);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：accessAt.end（日付型以外）', async () => {
            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: 'a'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1000001,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000002,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000003,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(400);
                expect(response.body.reasons[0].property).toBe('end');
                expect(response.body.reasons[0].message).toBe(Message.validation.isDate);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：condition（配列以外）', async () => {
            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: {
                    actor: {
                        _value: 1000117
                    },
                    app: null,
                    wf: {
                        _value: 1000120
                    },
                    document: [
                        {
                            _value: 1000001,
                            _ver: 1
                        }
                    ],
                    event: [
                        {
                            _value: 1000002,
                            _ver: 1
                        }
                    ],
                    thing: [
                        {
                            _value: 1000003,
                            _ver: 1
                        }
                    ]
                }
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(400);
                expect(response.body.reasons[0].property).toBe('condition');
                expect(response.body.reasons[0].message).toBe(Message.validation.isArray);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ不足：actor', async () => {
            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1000001,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000002,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000003,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(400);
                expect(response.body.reasons[0].property).toBe('actor');
                expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ不足：actor._value', async () => {
            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _ver: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1000001,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000002,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000003,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(400);
                expect(response.body.reasons[0].property).toBe('_value');
                expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：actor._value（数字以外）', async () => {
            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 'a'
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1000001,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000002,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000003,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(400);
                expect(response.body.reasons[0].property).toBe('_value');
                expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：app（オブジェクト以外）', async () => {
            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        app: 1,
                        wf: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1000001,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000002,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000003,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(400);
                expect(response.body.reasons[0].property).toBe('app');
                expect(response.body.reasons[0].message).toBe(Message.validation.nestedValidation);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ不足：app._value', async () => {
            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        app: {
                            _ver: 1000120
                        },
                        wf: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1000001,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000002,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000003,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(400);
                expect(response.body.reasons[0].property).toBe('_value');
                expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：app._value（数字以外）', async () => {
            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        app: {
                            _value: 'a'
                        },
                        wf: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1000001,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000002,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000003,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(400);
                expect(response.body.reasons[0].property).toBe('_value');
                expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：wf（オブジェクト以外）', async () => {
            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        app: null,
                        wf: 1,
                        document: [
                            {
                                _value: 1000001,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000002,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000003,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(400);
                expect(response.body.reasons[0].property).toBe('wf');
                expect(response.body.reasons[0].message).toBe(Message.validation.nestedValidation);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ不足：wf._value', async () => {
            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        app: null,
                        wf: {
                            _ver: 1000120
                        },
                        document: [
                            {
                                _value: 1000001,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000002,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000003,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(400);
                expect(response.body.reasons[0].property).toBe('_value');
                expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：wf._value（数字以外）', async () => {
            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        app: null,
                        wf: {
                            _value: 'a'
                        },
                        document: [
                            {
                                _value: 1000001,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000002,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000003,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(400);
                expect(response.body.reasons[0].property).toBe('_value');
                expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：document（配列以外）', async () => {
            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: {
                            _value: 1000001,
                            _ver: 1
                        },
                        event: [
                            {
                                _value: 1000002,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000003,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(400);
                expect(response.body.reasons[0].property).toBe('document');
                expect(response.body.reasons[0].message).toBe(Message.validation.isArray);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ不足：document._value', async () => {
            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000002,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000003,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(400);
                expect(response.body.reasons[0].property).toBe('_value');
                expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ不足：document._ver', async () => {
            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1000001
                            }
                        ],
                        event: [
                            {
                                _value: 1000002,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000003,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(400);
                expect(response.body.reasons[0].property).toBe('_ver');
                expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：document._value（数字以外）', async () => {
            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 'a',
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000002,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000003,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(400);
                expect(response.body.reasons[0].property).toBe('_value');
                expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：document._ver（数字以外）', async () => {
            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1000001,
                                _ver: 'a'
                            }
                        ],
                        event: [
                            {
                                _value: 1000002,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000003,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(400);
                expect(response.body.reasons[0].property).toBe('_ver');
                expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：event（配列以外）', async () => {
            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1000001,
                                _ver: 1
                            }
                        ],
                        event: {
                            _value: 1000002,
                            _ver: 1
                        },
                        thing: [
                            {
                                _value: 1000003,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(400);
                expect(response.body.reasons[0].property).toBe('event');
                expect(response.body.reasons[0].message).toBe(Message.validation.isArray);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ不足：event._value', async () => {
            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1000001,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000003,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(400);
                expect(response.body.reasons[0].property).toBe('_value');
                expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ不足：event._ver', async () => {
            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1000001,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000002
                            }
                        ],
                        thing: [
                            {
                                _value: 1000003,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(400);
                expect(response.body.reasons[0].property).toBe('_ver');
                expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：event._value（数字以外）', async () => {
            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1000001,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 'a',
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000003,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(400);
                expect(response.body.reasons[0].property).toBe('_value');
                expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：event._ver（数字以外）', async () => {
            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1000001,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000002,
                                _ver: 'a'
                            }
                        ],
                        thing: [
                            {
                                _value: 1000003,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(400);
                expect(response.body.reasons[0].property).toBe('_ver');
                expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：thing（配列以外）', async () => {
            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1000001,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000002,
                                _ver: 1
                            }
                        ],
                        thing: {
                            _value: 1000003,
                            _ver: 1
                        }
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(400);
                expect(response.body.reasons[0].property).toBe('thing');
                expect(response.body.reasons[0].message).toBe(Message.validation.isArray);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ不足：thing._value', async () => {
            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1000001,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000002,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(400);
                expect(response.body.reasons[0].property).toBe('_value');
                expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ不足：thing._ver', async () => {
            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1000001,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000002,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000003
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(400);
                expect(response.body.reasons[0].property).toBe('_ver');
                expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：thing._value（数字以外）', async () => {
            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1000001,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000002,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 'a',
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(400);
                expect(response.body.reasons[0].property).toBe('_value');
                expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：thing._ver（数字以外）', async () => {
            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1000001,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000002,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000003,
                                _ver: 'a'
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(400);
                expect(response.body.reasons[0].property).toBe('_ver');
                expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：appが設定されていない', async () => {
            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        app: null,
                        wf: null,
                        document: [
                            {
                                _value: 1000001,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000002,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000003,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.EMPTY_WF_AND_APP);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：wfが設定されている', async () => {
            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        app: {
                            _value: 1000120
                        },
                        wf: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1000001,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000002,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000003,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：startとendの範囲が正しくない', async () => {
            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-09-01T00:00:00.000+0900',
                    end: '2020-08-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1000001,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000002,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000003,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.DATE_SCOPE_INVALID);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常：APP指定', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogForAccessLog(200);
            _proxyServer = new StubProxyServer(200);

            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1002155,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000155,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000344,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(200);
                expect(response.body[0].type).toBe(1);
                expect(response.body[0].request.actor._value).toBe(1000222);
                expect(response.body[0].request.block._value).toBe(1000333);
                expect(response.body[0].document[0]._code._value).toBe(1002155);
                expect(response.body[0].document[0].count).toBe(1);
                expect(response.body[0].event[0]._code._value).toBe(1000155);
                expect(response.body[0].event[0].count).toBe(1);
                expect(response.body[0].thing[0]._code._value).toBe(1000344);
                expect(response.body[0].thing[0].count).toBe(1);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常：APP指定（Cookie）', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogForAccessLog(200);
            _proxyServer = new StubProxyServer(200);
            _operatorServer = new StubOperatorServer(200, '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00');

            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1002155,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000155,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000344,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(200);
                expect(response.body[0].type).toBe(1);
                expect(response.body[0].request.actor._value).toBe(1000222);
                expect(response.body[0].request.block._value).toBe(1000333);
                expect(response.body[0].document[0]._code._value).toBe(1002155);
                expect(response.body[0].document[0].count).toBe(1);
                expect(response.body[0].event[0]._code._value).toBe(1000155);
                expect(response.body[0].event[0].count).toBe(1);
                expect(response.body[0].thing[0]._code._value).toBe(1000344);
                expect(response.body[0].thing[0].count).toBe(1);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常：APP指定（共有定義カタログの取得）', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogForAccessLog(200);
            _proxyServer = new StubProxyServer(200);

            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1002117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1002155,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000155,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000344,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(200);
                expect(response.body[0].type).toBe(1);
                expect(response.body[0]);
                expect(response.body[0].request.actor._value).toBe(1000222);
                expect(response.body[0].request.block._value).toBe(1000333);
                expect(response.body[0].document[0]._code._value).toBe(1002155);
                expect(response.body[0].document[0].count).toBe(1);
                expect(response.body[0].event[0]._code._value).toBe(1000155);
                expect(response.body[0].event[0].count).toBe(1);
                expect(response.body[0].thing[0]._code._value).toBe(1000344);
                expect(response.body[0].thing[0].count).toBe(1);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常：APP指定（複数件指定）', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogForAccessLog(200);
            _proxyServer = new StubProxyServer(200);

            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1002155,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000155,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000344,
                                _ver: 1
                            }
                        ]
                    },
                    {
                        actor: {
                            _value: 1000004
                        },
                        wf: null,
                        app: {
                            _value: 1000007
                        },
                        document: [
                            {
                                _value: 1002074,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000074,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000095,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(200);
                expect(response.body.length).toBe(1);
                expect(response.body[0].type).toBe(1);
                expect(response.body[0].request.actor._value).toBe(1000222);
                expect(response.body[0].request.block._value).toBe(1000333);
                expect(response.body[0].document[0]._code._value).toBe(1002155);
                expect(response.body[0].document[0].count).toBe(1);
                expect(response.body[0].event[0]._code._value).toBe(1000155);
                expect(response.body[0].event[0].count).toBe(1);
                expect(response.body[0].thing[0]._code._value).toBe(1000344);
                expect(response.body[0].thing[0].count).toBe(1);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：WF指定', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogForAccessLog(200);
            _proxyServer = new StubProxyServer(200);

            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1001117
                        },
                        wf: {
                            _value: 1001120
                        },
                        app: null,
                        document: [
                            {
                                _value: 1003155,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1003155,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1003344,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常：対象データ無し', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogForAccessLog(200);
            _proxyServer = new StubProxyServer(200);

            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000070
                        },
                        wf: null,
                        app: {
                            _value: 1000073
                        },
                        document: [
                            {
                                _value: 1002155,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000155,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000344,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(204);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常：documentの指定なし', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogForAccessLog(200);
            _proxyServer = new StubProxyServer(200);

            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        event: [
                            {
                                _value: 1000155,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000344,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(200);
                expect(response.body[0].type).toBe(1);
                expect(response.body[0].request.actor._value).toBe(1000222);
                expect(response.body[0].request.block._value).toBe(1000333);
                expect(response.body[0].event[0]._code._value).toBe(1000155);
                expect(response.body[0].event[0].count).toBe(1);
                expect(response.body[0].thing[0]._code._value).toBe(1000344);
                expect(response.body[0].thing[0].count).toBe(1);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常：eventの指定なし', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogForAccessLog(200);
            _proxyServer = new StubProxyServer(200);

            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1002155,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000344,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(200);
                expect(response.body[0].type).toBe(1);
                expect(response.body[0].request.actor._value).toBe(1000222);
                expect(response.body[0].request.block._value).toBe(1000333);
                expect(response.body[0].document[0]._code._value).toBe(1002155);
                expect(response.body[0].document[0].count).toBe(1);
                expect(response.body[0].thing[0]._code._value).toBe(1000344);
                expect(response.body[0].thing[0].count).toBe(1);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常：thingの指定なし', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogForAccessLog(200);
            _proxyServer = new StubProxyServer(200);

            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1002155,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000155,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(200);
                expect(response.body[0].type).toBe(1);
                expect(response.body[0].request.actor._value).toBe(1000222);
                expect(response.body[0].request.block._value).toBe(1000333);
                expect(response.body[0].document[0]._code._value).toBe(1002155);
                expect(response.body[0].document[0].count).toBe(1);
                expect(response.body[0].event[0]._code._value).toBe(1000155);
                expect(response.body[0].event[0].count).toBe(1);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常：データ種の指定なし', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogForAccessLog(200);
            _proxyServer = new StubProxyServer(200);

            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        }
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(200);
                expect(response.body[0].type).toBe(1);
                expect(response.body[0].request.actor._value).toBe(1000222);
                expect(response.body[0].request.block._value).toBe(1000333);
                expect(response.body[0].document[0]._code._value).toBe(1002155);
                expect(response.body[0].document[0].count).toBe(1);
                expect(response.body[0].event[0]._code._value).toBe(1000155);
                expect(response.body[0].event[0].count).toBe(1);
                expect(response.body[0].thing[0]._code._value).toBe(1000344);
                expect(response.body[0].thing[0].count).toBe(1);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常：startの指定なし', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogForAccessLog(200);
            _proxyServer = new StubProxyServer(200);

            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1002155,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000155,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000344,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(200);
                expect(response.body[0].type).toBe(1);
                expect(response.body[0].request.actor._value).toBe(1000222);
                expect(response.body[0].request.block._value).toBe(1000333);
                expect(response.body[0].document[0]._code._value).toBe(1002155);
                expect(response.body[0].document[0].count).toBe(1);
                expect(response.body[0].event[0]._code._value).toBe(1000155);
                expect(response.body[0].event[0].count).toBe(1);
                expect(response.body[0].thing[0]._code._value).toBe(1000344);
                expect(response.body[0].thing[0].count).toBe(1);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常：endの指定なし', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogForAccessLog(200);
            _proxyServer = new StubProxyServer(200);

            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1002155,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000155,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000344,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(200);
                expect(response.body[0].type).toBe(1);
                expect(response.body[0].request.actor._value).toBe(1000222);
                expect(response.body[0].request.block._value).toBe(1000333);
                expect(response.body[0].document[0]._code._value).toBe(1002155);
                expect(response.body[0].document[0].count).toBe(1);
                expect(response.body[0].event[0]._code._value).toBe(1000155);
                expect(response.body[0].event[0].count).toBe(1);
                expect(response.body[0].thing[0]._code._value).toBe(1000344);
                expect(response.body[0].thing[0].count).toBe(1);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常：accessAtの指定なし', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogForAccessLog(200);
            _proxyServer = new StubProxyServer(200);

            // 送信データを生成
            const json = JSON.stringify({
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1002155,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000155,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000344,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(200);
                expect(response.body[0].type).toBe(1);
                expect(response.body[0].request.actor._value).toBe(1000222);
                expect(response.body[0].request.block._value).toBe(1000333);
                expect(response.body[0].document[0]._code._value).toBe(1002155);
                expect(response.body[0].document[0].count).toBe(1);
                expect(response.body[0].event[0]._code._value).toBe(1000155);
                expect(response.body[0].event[0].count).toBe(1);
                expect(response.body[0].thing[0]._code._value).toBe(1000344);
                expect(response.body[0].thing[0].count).toBe(1);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常：conditionの指定なし', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogForAccessLog(200);
            _proxyServer = new StubProxyServer(200);

            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                }
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(200);
                expect(response.body.length).toBe(2);
                expect(response.body[0].type).toBe(1);
                expect(response.body[0].request.actor._value).toBe(1000222);
                expect(response.body[0].request.block._value).toBe(1000333);
                expect(response.body[0].document[0]._code._value).toBe(1002155);
                expect(response.body[0].document[0].count).toBe(4);
                expect(response.body[0].event[0]._code._value).toBe(1000155);
                expect(response.body[0].event[0].count).toBe(4);
                expect(response.body[0].thing[0]._code._value).toBe(1000344);
                expect(response.body[0].thing[0].count).toBe(4);
                expect(response.body[1].type).toBe(1);
                expect(response.body[1].request.actor._value).toBe(1000222);
                expect(response.body[1].request.block._value).toBe(1000333);
                expect(response.body[1].logIdentifier).toBe('uuuuuuuu-uuuu-uuuu-uuuu-uuuuuuuuuuuu');
                expect(response.body[1].document).toBe(null);
                expect(response.body[1].event).toBe(null);
                expect(response.body[1].thing).toBe(null);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：カタログからblockコードが取得できない', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogForAccessLog(200);
            _proxyServer = new StubProxyServer(200);

            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1009999
                        },
                        wf: null,
                        app: {
                            _value: 1019999
                        },
                        document: [
                            {
                                _value: 1002155,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000155,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000344,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd2) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(500);
                expect(response.body.message).toBe(sprintf(Message.FAILED_CATALOG_SET, 'アクター'));
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：アクター値不正指定', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogForAccessLog(200);
            _proxyServer = new StubProxyServer(200);

            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 0
                        },
                        wf: null,
                        app: {
                            _value: 1000999
                        },
                        document: [
                            {
                                _value: 1002155,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000155,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000344,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            const session = {
                sessionId: 'sessionId',
                operatorId: 1,
                type: 0,
                loginId: 'invalid.actor',
                pxrId: 'invalid.actor',
                mobilePhone: '0311112222',
                lastLoginAt: '2020-01-01T00:00:00.000+0900',
                attributes: {},
                block: {
                    _value: 1000110,
                    _ver: 1
                },
                actor: {
                    _value: 1000001,
                    _ver: 1
                }
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(session) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(503);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：カタログからblockコードが取得できない（condition指定なし）', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogForAccessLog(200);
            _proxyServer = new StubProxyServer(200);

            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                }
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd2) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(500);
                expect(response.body.message).toBe(sprintf(Message.FAILED_CATALOG_SET, 'アクター'));
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：利用者ID連携が存在しない', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogForAccessLog(200);
            _proxyServer = new StubProxyServer(200);

            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000000
                        },
                        document: [
                            {
                                _value: 1002155,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000155,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000344,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(204);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：利用者ID連携のステータスが1,2,3以外 (0: 申請中)', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogForAccessLog(200);
            _proxyServer = new StubProxyServer(200);

            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000121
                        },
                        document: [
                            {
                                _value: 1002155,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000155,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000344,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(204);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常：利用者ID連携のステータスが2:連携解除申請中', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogForAccessLog(200);
            _proxyServer = new StubProxyServer(200);

            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000122
                        },
                        document: [
                            {
                                _value: 1002155,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000155,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000344,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(200);
                expect(response.body[0].type).toBe(1);
                expect(response.body[0].request.actor._value).toBe(1000222);
                expect(response.body[0].request.block._value).toBe(1000333);
                expect(response.body[0].document[0]._code._value).toBe(1002155);
                expect(response.body[0].document[0].count).toBe(1);
                expect(response.body[0].event[0]._code._value).toBe(1000155);
                expect(response.body[0].event[0].count).toBe(1);
                expect(response.body[0].thing[0]._code._value).toBe(1000344);
                expect(response.body[0].thing[0].count).toBe(1);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常：利用者ID連携のステータスが3:無効', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogForAccessLog(200);
            _proxyServer = new StubProxyServer(200);

            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000123
                        },
                        document: [
                            {
                                _value: 1002155,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000155,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000344,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(200);
                expect(response.body[0].type).toBe(1);
                expect(response.body[0].request.actor._value).toBe(1000222);
                expect(response.body[0].request.block._value).toBe(1000333);
                expect(response.body[0].document[0]._code._value).toBe(1002155);
                expect(response.body[0].document[0].count).toBe(1);
                expect(response.body[0].event[0]._code._value).toBe(1000155);
                expect(response.body[0].event[0].count).toBe(1);
                expect(response.body[0].thing[0]._code._value).toBe(1000344);
                expect(response.body[0].thing[0].count).toBe(1);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：WF職員でログイン', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogForAccessLog(200);
            _proxyServer = new StubProxyServer(200);
            _operatorServer = new StubOperatorServer(200, '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e01');

            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1002155,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000155,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000344,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.bookCloseDelete1) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(401);
                expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：APPでログイン', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogForAccessLog(200);
            _proxyServer = new StubProxyServer(200);
            _operatorServer = new StubOperatorServer(200, '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e02');

            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1002155,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000155,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000344,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type2_session=437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e02'])
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(401);
                expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：運営メンバーでログイン', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogForAccessLog(200);
            _proxyServer = new StubProxyServer(200);
            _operatorServer = new StubOperatorServer(200, '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e03');

            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1002155,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000155,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000344,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e03'])
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(401);
                expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：オペレーターサービスからの応答が204', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogForAccessLog(200);
            _proxyServer = new StubProxyServer(200);
            _operatorServer = new StubOperatorServer(204, '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00');

            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1002155,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000155,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000344,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(401);
                expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：オペレーターサービスからの応答が400', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogForAccessLog(200);
            _proxyServer = new StubProxyServer(200);
            _operatorServer = new StubOperatorServer(400, '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00');

            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1002155,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000155,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000344,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(401);
                expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：オペレーターサービスからの応答が500', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogForAccessLog(200);
            _proxyServer = new StubProxyServer(200);
            _operatorServer = new StubOperatorServer(500, '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00');

            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1002155,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000155,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000344,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(500);
                expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：オペレーターサービスとの接続に失敗', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogForAccessLog(200);
            _proxyServer = new StubProxyServer(200);

            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1002155,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000155,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000344,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(500);
                expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：未ログイン', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogForAccessLog(200);
            _proxyServer = new StubProxyServer(200);

            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1002155,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000155,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000344,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(401);
                expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：カタログサービスからの応答が400', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogForAccessLog(400);
            _proxyServer = new StubProxyServer(200);

            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1002155,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000155,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000344,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：カタログサービスからの応答が500', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogForAccessLog(500);
            _proxyServer = new StubProxyServer(200);

            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1002155,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000155,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000344,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(503);
                expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：カタログサービスからの応答が204', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogForAccessLog(204);
            _proxyServer = new StubProxyServer(200);

            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1002155,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000155,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000344,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(401);
                expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：カタログサービスとの接続に失敗', async () => {
            // スタブサーバー起動
            _proxyServer = new StubProxyServer(200);

            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1002155,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000155,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000344,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(503);
                expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_CATALOG);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：カタログサービス 複数取得時応答が400', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogForAccessLogGetCatalogInfosError(400);
            _proxyServer = new StubProxyServer(200);

            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1002155,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000155,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000344,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：カタログサービス 複数取得時応答が500', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogForAccessLogGetCatalogInfosError(500);
            _proxyServer = new StubProxyServer(200);

            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1002155,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000155,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000344,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(503);
                expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：カタログサービス 複数取得時応答が204', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogForAccessLogGetCatalogInfosError(204);
            _proxyServer = new StubProxyServer(200);

            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1002155,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000155,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000344,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(401);
                expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：カタログサービス 複数取得時続に失敗', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogForAccessLogGetCatalogInfosError(null);
            _proxyServer = new StubProxyServer(200);

            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1002155,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000155,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000344,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(503);
                expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_CATALOG);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：プロキスサービスからの応答が400', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogForAccessLog(200);
            _proxyServer = new StubProxyServer(400);

            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1002155,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000155,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000344,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(500);
                expect(response.body.message).toBe(Message.FAILED_LINKAGE);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：プロキスサービスからの応答が500', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogForAccessLog(200);
            _proxyServer = new StubProxyServer(500);

            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1002155,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000155,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000344,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(500);
                expect(response.body.message).toBe(Message.FAILED_LINKAGE);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：プロキスサービスからの応答が401', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogForAccessLog(200);
            _proxyServer = new StubProxyServer(401);

            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1002155,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000155,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000344,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(500);
                expect(response.body.message).toBe(Message.FAILED_LINKAGE);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：プロキスサービスとの接続に失敗', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogForAccessLog(200);

            // 送信データを生成
            const json = JSON.stringify({
                accessAt: {
                    start: '2020-08-01T00:00:00.000+0900',
                    end: '2020-09-01T00:00:00.000+0900'
                },
                condition: [
                    {
                        actor: {
                            _value: 1000117
                        },
                        wf: null,
                        app: {
                            _value: 1000120
                        },
                        document: [
                            {
                                _value: 1002155,
                                _ver: 1
                            }
                        ],
                        event: [
                            {
                                _value: 1000155,
                                _ver: 1
                            }
                        ],
                        thing: [
                            {
                                _value: 1000344,
                                _ver: 1
                            }
                        ]
                    }
                ]
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.indAccessLogURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(json);

            // レスポンスチェック
            try {
                expect(response.status).toBe(500);
                expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_LINKAGE_SERVICE);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
    });
});
