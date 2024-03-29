/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Application } from '../resources/config/Application';
import supertest = require('supertest');
import Common, { Url } from './Common';
import { Session } from './Session';
import Config from '../common/Config';
import { StubCatalogServerStoreEvent, StubCatalogServerStoreEventNotificate, StubCatalogServerStoreEventNotificateInvalidActor } from './StubCatalogServer';
import { StubOperatorServerType0 } from './StubOperatorServer';
import StubProxyServer from './StubProxyServer';
const Message = Config.ReadConfig('./config/message.json');
/* eslint-enable */

// 対象アプリケーションを取得
const app = new Application();
const expressApp = app.express.app;
const common = new Common();
app.start();

// スタブサーバー（カタログサービス）
let _catalogServer: any = null;
let _operatorServer: StubOperatorServerType0 = null;
let _proxyServer: StubProxyServer = null;

/**
 * book-manage API のユニットテスト
 */
describe('book-manage API', () => {
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
        // スタブサーバー停止
        if (_catalogServer) {
            _catalogServer._server.close();
            _catalogServer = null;
        }
        if (_operatorServer) {
            _operatorServer._server.close();
            _operatorServer = null;
        }
        if (_proxyServer) {
            _proxyServer._server.close();
            _proxyServer = null;
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
     * 蓄積イベント通知 API
     */
    describe('蓄積イベント通知', () => {
        test('正常：app', async () => {
            _operatorServer = new StubOperatorServerType0(200, 2);
            _catalogServer = new StubCatalogServerStoreEventNotificate(3001, 200, 0, 0);
            _proxyServer = new StubProxyServer(200);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEventNotificate.sql');

            // 送信データを作成
            const url = Url.postStoreEventNotificate;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.postStoreEventNotificate) })
                .send(JSON.stringify(
                    {
                        add: [
                            {
                                '1_1': 'testuserapp',
                                document: [],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        update: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        delete: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({ result: 'success' }));
        });

        test('異常：wf（対象外のアクター）', async () => {
            _operatorServer = new StubOperatorServerType0(200, 2);
            _catalogServer = new StubCatalogServerStoreEventNotificate(3001, 200, 0, 0);
            _proxyServer = new StubProxyServer(200);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEventNotificate.sql');

            // 送信データを作成
            const url = Url.postStoreEventNotificate;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.postStoreEventNotificate) })
                .send(JSON.stringify(
                    {
                        add: [
                            {
                                '1_1': 'testuserwf',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000445,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': 1000601,
                                        '2_n_3_2_2': 1,
                                        '2_n_3_5_1': null,
                                        '2_n_3_5_2': null
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000445,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': 1000601,
                                    '3_5_2_2': 1,
                                    '3_5_5_1': null,
                                    '3_5_5_2': null
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000445,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': 1000601,
                                        '4_4_2_2': 1,
                                        '4_4_5_1': null,
                                        '4_4_5_2': null,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        update: [
                            {
                                '1_1': 'testuserwf',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000445,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': 1000601,
                                        '2_n_3_2_2': 1,
                                        '2_n_3_5_1': null,
                                        '2_n_3_5_2': null
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000445,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': 1000601,
                                    '3_5_2_2': 1,
                                    '3_5_5_1': null,
                                    '3_5_5_2': null
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000445,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': 1000601,
                                        '4_4_2_2': 1,
                                        '4_4_5_1': null,
                                        '4_4_5_2': null,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        delete: [
                            {
                                '1_1': 'testuserwf',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000445,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': 1000601,
                                        '2_n_3_2_2': 1,
                                        '2_n_3_5_1': null,
                                        '2_n_3_5_2': null
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000445,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': 1000601,
                                    '3_5_2_2': 1,
                                    '3_5_5_1': null,
                                    '3_5_5_2': null
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000445,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': 1000601,
                                        '4_4_2_2': 1,
                                        '4_4_5_1': null,
                                        '4_4_5_2': null,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('APPが設定されていません');
        });

        test('正常：add、update、deleteが空', async () => {
            _operatorServer = new StubOperatorServerType0(200, 2);
            _catalogServer = new StubCatalogServerStoreEventNotificate(3001, 200, 0, 0);
            _proxyServer = new StubProxyServer(200);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEventNotificate.sql');

            // 送信データを作成
            const url = Url.postStoreEventNotificate;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.postStoreEventNotificate) })
                .send(JSON.stringify(
                    {
                        add: [],
                        update: [],
                        delete: []
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({ result: 'success' }));
        });

        test('正常：共有制限カタログ取得（リージョン）', async () => {
            _operatorServer = new StubOperatorServerType0(200, 2);
            _catalogServer = new StubCatalogServerStoreEventNotificate(3001, 200, 1, 0);
            _proxyServer = new StubProxyServer(200);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEventNotificate.sql');

            // 送信データを作成
            const url = Url.postStoreEventNotificate;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.postStoreEventNotificate) })
                .send(JSON.stringify(
                    {
                        add: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        update: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        delete: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({ result: 'success' }));
        });

        test('正常：共有制限カタログ取得（サービス）', async () => {
            _operatorServer = new StubOperatorServerType0(200, 2);
            _catalogServer = new StubCatalogServerStoreEventNotificate(3001, 200, 1, 0);
            _proxyServer = new StubProxyServer(200);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEventNotificate.sql');

            // 送信データを作成
            const url = Url.postStoreEventNotificate;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.postStoreEventNotificate) })
                .send(JSON.stringify(
                    {
                        add: [
                            {
                                '1_1': 'testuserapp2',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000445,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000601,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000445,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000601,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000445,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000601,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        update: [
                            {
                                '1_1': 'testuserapp2',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000445,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000601,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000445,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000601,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000445,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000601,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        delete: [
                            {
                                '1_1': 'testuserapp2',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000445,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000601,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000445,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000601,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000445,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000601,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({ result: 'success' }));
        });

        test('異常：利用者情報なし', async () => {
            _operatorServer = new StubOperatorServerType0(200, 2);
            _catalogServer = new StubCatalogServerStoreEventNotificate(3001, 200, 0, 0);
            _proxyServer = new StubProxyServer(200);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEventNotificate.sql');

            // 送信データを作成
            const url = Url.postStoreEventNotificate;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.postStoreEventNotificate) })
                .send(JSON.stringify(
                    {
                        add: [
                            {
                                '1_1': 'notuseridcoope',
                                document: [],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        update: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        delete: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.COULD_NOT_SPECIFY_USER_BOOK);
        });

        test('異常：共有制限カタログ取得時 401応答', async () => {
            _operatorServer = new StubOperatorServerType0(200, 2);
            _catalogServer = new StubCatalogServerStoreEventNotificate(3001, 200, 1, 0, 401);
            _proxyServer = new StubProxyServer(200);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEventNotificate.sql');

            // 送信データを作成
            const url = Url.postStoreEventNotificate;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.postStoreEventNotificate) })
                .send(JSON.stringify(
                    {
                        add: [
                            {
                                '1_1': 'testuserapp',
                                document: [],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        update: [],
                        delete: []
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({ result: 'success' }));
        });

        test('異常：オペレータータイプがwf、app以外', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerStoreEventNotificate(3001, 200, 0, 0);
            _proxyServer = new StubProxyServer(200);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEventNotificate.sql');

            // 送信データを作成
            const url = Url.postStoreEventNotificate;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=sessionId'])
                .send(JSON.stringify(
                    {
                        add: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        update: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        delete: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });

        test('異常：カタログサービスから401以外のエラー', async () => {
            _operatorServer = new StubOperatorServerType0(200, 2);
            _catalogServer = new StubCatalogServerStoreEventNotificate(3001, 400, 0, 0);
            _proxyServer = new StubProxyServer(200);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEventNotificate.sql');

            // 送信データを作成
            const url = Url.postStoreEventNotificate;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=sessionId'])
                .send(JSON.stringify(
                    {
                        add: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        update: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        delete: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });

        test('異常：ドキュメント：appが設定されていない', async () => {
            _operatorServer = new StubOperatorServerType0(200, 2);
            _catalogServer = new StubCatalogServerStoreEventNotificate(3001, 200, 0, 0);
            _proxyServer = new StubProxyServer(200);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEventNotificate.sql');

            // 送信データを作成
            const url = Url.postStoreEventNotificate;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=sessionId'])
                .send(JSON.stringify(
                    {
                        add: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': null,
                                        '2_n_3_5_2': null
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        update: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        delete: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.EMPTY_WF_AND_APP);
        });

        test('異常：ドキュメント：共有制限カタログ取得時 400応答', async () => {
            _operatorServer = new StubOperatorServerType0(200, 2);
            _catalogServer = new StubCatalogServerStoreEventNotificate(3001, 200, 1, 0, 400);
            _proxyServer = new StubProxyServer(200);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEventNotificate.sql');

            // 送信データを作成
            const url = Url.postStoreEventNotificate;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.postStoreEventNotificate) })
                .send(JSON.stringify(
                    {
                        add: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        update: [],
                        delete: []
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });

        test('異常：ドキュメント：共有制限の禁止と許可どちらも値が設定されている', async () => {
            _operatorServer = new StubOperatorServerType0(200, 2);
            _catalogServer = new StubCatalogServerStoreEventNotificate(3001, 200, 1, 1);
            _proxyServer = new StubProxyServer(200);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEventNotificate.sql');

            // 送信データを作成
            const url = Url.postStoreEventNotificate;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=sessionId'])
                .send(JSON.stringify(
                    {
                        add: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        update: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        delete: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('共有制限許可リストと禁止リストの両方に値が設定されています');
        });

        test('異常：ドキュメント：共有制限の禁止と許可どちらも値が設定されていない', async () => {
            _operatorServer = new StubOperatorServerType0(200, 2);
            _catalogServer = new StubCatalogServerStoreEventNotificate(3001, 200, 2, 2, 200);
            _proxyServer = new StubProxyServer(200);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEventNotificate.sql');

            // 送信データを作成
            const url = Url.postStoreEventNotificate;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.postStoreEventNotificate) })
                .send(JSON.stringify(
                    {
                        add: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        update: [],
                        delete: []
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('共有制限許可リストに含まれていません');
        });

        test('異常：ドキュメント：共有制限許可リストに含まれていない', async () => {
            _operatorServer = new StubOperatorServerType0(200, 2);
            _catalogServer = new StubCatalogServerStoreEventNotificate(3001, 200, 2, 0);
            _proxyServer = new StubProxyServer(200);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEventNotificate.sql');

            // 送信データを作成
            const url = Url.postStoreEventNotificate;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=sessionId'])
                .send(JSON.stringify(
                    {
                        add: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        update: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        delete: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('共有制限許可リストに含まれていません');
        });

        test('異常：ドキュメント：共有制限禁止リストに含まれている', async () => {
            _operatorServer = new StubOperatorServerType0(200, 2);
            _catalogServer = new StubCatalogServerStoreEventNotificate(3001, 200, 0, 1);
            _proxyServer = new StubProxyServer(200);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEventNotificate.sql');

            // 送信データを作成
            const url = Url.postStoreEventNotificate;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=sessionId'])
                .send(JSON.stringify(
                    {
                        add: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        update: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        delete: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('共有制限禁止リストに含まれています');
        });

        test('異常：ドキュメント：アクターカタログ不正', async () => {
            _operatorServer = new StubOperatorServerType0(200, 2);
            _catalogServer = new StubCatalogServerStoreEventNotificateInvalidActor(3001, 200, 0, 1);
            _proxyServer = new StubProxyServer(200);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEventNotificate.sql');

            // 送信データを作成
            const url = Url.postStoreEventNotificate;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=sessionId'])
                .send(JSON.stringify(
                    {
                        add: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000000,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000471,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000000,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        update: [],
                        delete: []
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.NOT_EXIST_BLOCK_CODE);
        });

        test('異常：イベント：appが設定されていない', async () => {
            _operatorServer = new StubOperatorServerType0(200, 2);
            _catalogServer = new StubCatalogServerStoreEventNotificate(3001, 200, 0, 0);
            _proxyServer = new StubProxyServer(200);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEventNotificate.sql');

            // 送信データを作成
            const url = Url.postStoreEventNotificate;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=sessionId'])
                .send(JSON.stringify(
                    {
                        add: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': null,
                                    '3_5_5_2': null
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        update: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        delete: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.EMPTY_WF_AND_APP);
        });

        test('異常：イベント：共有制限カタログ取得時 400応答', async () => {
            _operatorServer = new StubOperatorServerType0(200, 2);
            _catalogServer = new StubCatalogServerStoreEventNotificate(3001, 200, 1, 0, 400);
            _proxyServer = new StubProxyServer(200);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEventNotificate.sql');

            // 送信データを作成
            const url = Url.postStoreEventNotificate;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.postStoreEventNotificate) })
                .send(JSON.stringify(
                    {
                        add: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        update: [],
                        delete: []
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });

        test('異常：イベント：共有制限の禁止と許可どちらも値が設定されている', async () => {
            _operatorServer = new StubOperatorServerType0(200, 2);
            _catalogServer = new StubCatalogServerStoreEventNotificate(3001, 200, 1, 1);
            _proxyServer = new StubProxyServer(200);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEventNotificate.sql');

            // 送信データを作成
            const url = Url.postStoreEventNotificate;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=sessionId'])
                .send(JSON.stringify(
                    {
                        add: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1000000,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000000,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        update: [],
                        delete: []
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('共有制限許可リストと禁止リストの両方に値が設定されています');
        });

        test('異常：イベント：共有制限の禁止と許可どちらも値が設定されていない', async () => {
            _operatorServer = new StubOperatorServerType0(200, 2);
            _catalogServer = new StubCatalogServerStoreEventNotificate(3001, 200, 2, 2);
            _proxyServer = new StubProxyServer(200);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEventNotificate.sql');

            // 送信データを作成
            const url = Url.postStoreEventNotificate;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=sessionId'])
                .send(JSON.stringify(
                    {
                        add: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1000000,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000000,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        update: [],
                        delete: []
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('共有制限許可リストに含まれていません');
        });

        test('異常：イベント：共有制限許可リストに含まれていない', async () => {
            _operatorServer = new StubOperatorServerType0(200, 2);
            _catalogServer = new StubCatalogServerStoreEventNotificate(3001, 200, 2, 0);
            _proxyServer = new StubProxyServer(200);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEventNotificate.sql');

            // 送信データを作成
            const url = Url.postStoreEventNotificate;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=sessionId'])
                .send(JSON.stringify(
                    {
                        add: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1000000,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000000,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        update: [],
                        delete: []
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('共有制限許可リストに含まれていません');
        });

        test('異常：イベント：共有制限禁止リストに含まれている', async () => {
            _operatorServer = new StubOperatorServerType0(200, 2);
            _catalogServer = new StubCatalogServerStoreEventNotificate(3001, 200, 0, 1);
            _proxyServer = new StubProxyServer(200);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEventNotificate.sql');

            // 送信データを作成
            const url = Url.postStoreEventNotificate;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=sessionId'])
                .send(JSON.stringify(
                    {
                        add: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1000000,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000000,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        update: [],
                        delete: []
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('共有制限禁止リストに含まれています');
        });

        test('異常：イベント：アクターカタログ不正', async () => {
            _operatorServer = new StubOperatorServerType0(200, 2);
            _catalogServer = new StubCatalogServerStoreEventNotificateInvalidActor(3001, 200, 0, 1);
            _proxyServer = new StubProxyServer(200);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEventNotificate.sql');

            // 送信データを作成
            const url = Url.postStoreEventNotificate;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=sessionId'])
                .send(JSON.stringify(
                    {
                        add: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1000000,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000000,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        update: [],
                        delete: []
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.NOT_EXIST_BLOCK_CODE);
        });

        test('異常：モノ：appが設定されていない', async () => {
            _operatorServer = new StubOperatorServerType0(200, 2);
            _catalogServer = new StubCatalogServerStoreEventNotificate(3001, 200, 0, 0);
            _proxyServer = new StubProxyServer(200);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEventNotificate.sql');

            // 送信データを作成
            const url = Url.postStoreEventNotificate;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=sessionId'])
                .send(JSON.stringify(
                    {
                        add: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': null,
                                        '4_4_5_2': null,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        update: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        delete: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.EMPTY_WF_AND_APP);
        });

        test('異常：モノ：共有制限カタログ取得時 400応答', async () => {
            _operatorServer = new StubOperatorServerType0(200, 2);
            _catalogServer = new StubCatalogServerStoreEventNotificate(3001, 200, 1, 0, 400);
            _proxyServer = new StubProxyServer(200);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEventNotificate.sql');

            // 送信データを作成
            const url = Url.postStoreEventNotificate;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.postStoreEventNotificate) })
                .send(JSON.stringify(
                    {
                        add: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        update: [],
                        delete: []
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });

        test('異常：モノ：共有制限の禁止と許可どちらも値が設定されている', async () => {
            _operatorServer = new StubOperatorServerType0(200, 2);
            _catalogServer = new StubCatalogServerStoreEventNotificate(3001, 200, 1, 1);
            _proxyServer = new StubProxyServer(200);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEventNotificate.sql');

            // 送信データを作成
            const url = Url.postStoreEventNotificate;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=sessionId'])
                .send(JSON.stringify(
                    {
                        add: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1000000,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000000,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000471,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        update: [],
                        delete: []
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('共有制限許可リストと禁止リストの両方に値が設定されています');
        });

        test('異常：モノ：共有制限の禁止と許可どちらも値が設定されていない', async () => {
            _operatorServer = new StubOperatorServerType0(200, 2);
            _catalogServer = new StubCatalogServerStoreEventNotificate(3001, 200, 2, 2);
            _proxyServer = new StubProxyServer(200);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEventNotificate.sql');

            // 送信データを作成
            const url = Url.postStoreEventNotificate;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=sessionId'])
                .send(JSON.stringify(
                    {
                        add: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1000000,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000000,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000471,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        update: [],
                        delete: []
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('共有制限許可リストに含まれていません');
        });

        test('異常：モノ：共有制限許可リストに含まれていない', async () => {
            _operatorServer = new StubOperatorServerType0(200, 2);
            _catalogServer = new StubCatalogServerStoreEventNotificate(3001, 200, 2, 0);
            _proxyServer = new StubProxyServer(200);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEventNotificate.sql');

            // 送信データを作成
            const url = Url.postStoreEventNotificate;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=sessionId'])
                .send(JSON.stringify(
                    {
                        add: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1000000,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000000,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000471,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        update: [],
                        delete: []
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('共有制限許可リストに含まれていません');
        });

        test('異常：モノ：共有制限禁止リストに含まれている', async () => {
            _operatorServer = new StubOperatorServerType0(200, 2);
            _catalogServer = new StubCatalogServerStoreEventNotificate(3001, 200, 0, 1);
            _proxyServer = new StubProxyServer(200);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEventNotificate.sql');

            // 送信データを作成
            const url = Url.postStoreEventNotificate;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=sessionId'])
                .send(JSON.stringify(
                    {
                        add: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1000000,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000000,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000471,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        update: [],
                        delete: []
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('共有制限禁止リストに含まれています');
        });

        test('異常：モノ：アクターカタログ不正', async () => {
            _operatorServer = new StubOperatorServerType0(200, 2);
            _catalogServer = new StubCatalogServerStoreEventNotificateInvalidActor(3001, 200, 0, 1);
            _proxyServer = new StubProxyServer(200);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEventNotificate.sql');

            // 送信データを作成
            const url = Url.postStoreEventNotificate;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=sessionId'])
                .send(JSON.stringify(
                    {
                        add: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1000000,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000000,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000471,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        update: [],
                        delete: []
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.NOT_EXIST_BLOCK_CODE);
        });

        test('異常：プロキシサービス 204応答', async () => {
            _operatorServer = new StubOperatorServerType0(200, 2);
            _catalogServer = new StubCatalogServerStoreEventNotificate(3001, 200, 0, 0);
            _proxyServer = new StubProxyServer(204);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEventNotificate.sql');

            // 送信データを作成
            const url = Url.postStoreEventNotificate;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.postStoreEventNotificate) })
                .send(JSON.stringify(
                    {
                        add: [
                            {
                                '1_1': 'testuserapp',
                                document: [],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        update: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        delete: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({ result: 'success' }));
        });

        test('異常：プロキシサービス 200以外応答', async () => {
            _operatorServer = new StubOperatorServerType0(200, 2);
            _catalogServer = new StubCatalogServerStoreEventNotificate(3001, 200, 0, 0);
            _proxyServer = new StubProxyServer(400);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEventNotificate.sql');

            // 送信データを作成
            const url = Url.postStoreEventNotificate;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.postStoreEventNotificate) })
                .send(JSON.stringify(
                    {
                        add: [
                            {
                                '1_1': 'testuserapp',
                                document: [],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        update: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        delete: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_LINKAGE);
        });

        test('異常：プロキシサービス 未起動', async () => {
            _operatorServer = new StubOperatorServerType0(200, 2);
            _catalogServer = new StubCatalogServerStoreEventNotificate(3001, 200, 0, 0);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEventNotificate.sql');

            // 送信データを作成
            const url = Url.postStoreEventNotificate;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.postStoreEventNotificate) })
                .send(JSON.stringify(
                    {
                        add: [
                            {
                                '1_1': 'testuserapp',
                                document: [],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        update: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ],
                        delete: [
                            {
                                '1_1': 'testuserapp',
                                document: [
                                    {
                                        serialNumber: 1,
                                        '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                        '2_n_1_2_1': 1099999,
                                        '2_n_1_2_2': 1,
                                        '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                        '2_n_3_1_1': 1000437,
                                        '2_n_3_1_2': 1,
                                        '2_n_3_2_1': null,
                                        '2_n_3_2_2': null,
                                        '2_n_3_5_1': 1000471,
                                        '2_n_3_5_2': 1
                                    }
                                ],
                                event: {
                                    '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                    '3_1_2_1': 1000008,
                                    '3_1_2_2': 1,
                                    '3_2_1': '2020-07-01T00:00:00.000+0900',
                                    '3_2_2': '2020-07-01T00:00:00.000+0900',
                                    '3_5_1_1': 1000437,
                                    '3_5_1_2': 1,
                                    '3_5_2_1': null,
                                    '3_5_2_2': null,
                                    '3_5_5_1': 1000471,
                                    '3_5_5_2': 1
                                },
                                thing: [
                                    {
                                        '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                        '4_1_2_1': 1000922,
                                        '4_1_2_2': 1,
                                        '4_4_1_1': 1000437,
                                        '4_4_1_2': 1,
                                        '4_4_2_1': null,
                                        '4_4_2_2': null,
                                        '4_4_5_1': 1000471,
                                        '4_4_5_2': 1,
                                        rowHash: 'rowHash...',
                                        rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                    }
                                ]
                            }
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_LINKAGE_SERVICE);
        });

        describe('利用者ID重複対応追加ケース', () => {
            // DoRequestメソッドのmock化
            const doRequet = require('../common/DoRequest');
            const mockDoPostRequest = jest.spyOn(doRequet, 'doPostRequest');
            afterAll(async () => {
                mockDoPostRequest.mockRestore();
            });
            beforeEach(async () => {
                await common.executeSqlFile('initialData.sql');
                await common.executeSqlFile('initialDataStoreEventNotificate.sql');
                mockDoPostRequest.mockClear();
            });
            describe('正常系', () => {
                test('利用者ID連携テーブルに 同じuserIdの利用者が存在しない', async () => {
                    _operatorServer = new StubOperatorServerType0(200, 2);
                    _catalogServer = new StubCatalogServerStoreEventNotificate(3001, 200, 0, 0);
                    _proxyServer = new StubProxyServer(200);

                    // 送信データを作成
                    const url = Url.postStoreEventNotificate;

                    // 対象APIに送信
                    const response = await supertest(expressApp).post(url)
                        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                        .set({ session: encodeURIComponent(Session.postStoreEventNotificate) })
                        .send(JSON.stringify(
                            {
                                add: [
                                    {
                                        '1_1': 'testuserapp',
                                        document: [
                                            {
                                                serialNumber: 1,
                                                '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                                '2_n_1_2_1': 1099999,
                                                '2_n_1_2_2': 1,
                                                '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                                '2_n_3_1_1': 1000437,
                                                '2_n_3_1_2': 1,
                                                '2_n_3_2_1': null,
                                                '2_n_3_2_2': null,
                                                '2_n_3_5_1': 1000471,
                                                '2_n_3_5_2': 1
                                            }
                                        ],
                                        event: {
                                            '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                            '3_1_2_1': 1000008,
                                            '3_1_2_2': 1,
                                            '3_2_1': '2020-07-01T00:00:00.000+0900',
                                            '3_2_2': '2020-07-01T00:00:00.000+0900',
                                            '3_5_1_1': 1000437,
                                            '3_5_1_2': 1,
                                            '3_5_2_1': null,
                                            '3_5_2_2': null,
                                            '3_5_5_1': 1000471,
                                            '3_5_5_2': 1
                                        },
                                        thing: [
                                            {
                                                '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                                '4_1_2_1': 1000922,
                                                '4_1_2_2': 1,
                                                '4_4_1_1': 1000437,
                                                '4_4_1_2': 1,
                                                '4_4_2_1': null,
                                                '4_4_2_2': null,
                                                '4_4_5_1': 1000471,
                                                '4_4_5_2': 1,
                                                rowHash: 'rowHash...',
                                                rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                            }
                                        ]
                                    }
                                ],
                                update: [],
                                delete: []
                            }
                        ));

                    // レスポンスチェック
                    expect(response.status).toBe(200);
                    expect(JSON.stringify(response.body)).toBe(JSON.stringify({ result: 'success' }));
                    // 蓄積イベント受信へのリクエストの確認
                    const storeEventRequestApiInfo = mockDoPostRequest.mock.calls.filter(elem => (elem[0] as string).startsWith('http://localhost:3003/pxr-block-proxy'));
                    expect(storeEventRequestApiInfo.length).toBe(3);
                    const requestBody1 = JSON.parse(storeEventRequestApiInfo[0][1]['body']);
                    expect(requestBody1['type']).toBe('share-trigger');
                    expect(requestBody1['operate']).toBe('add');
                    expect(requestBody1['userId']).toBe('testuserapp');
                    expect(requestBody1['identifier']).toBe('fedc51ce-2efd-4ade-9bbe-45dc445ae9c7');
                    expect(requestBody1['document']['_value']).toBe(1099999);
                    expect(requestBody1['document']['_ver']).toBe(1);
                    expect(requestBody1['sourceActor']['_value']).toBe(1000437);
                    expect(requestBody1['destinationActor']['_value']).toBe(1000437);
                    expect(requestBody1['sourceApp']['_value']).toBe(1000471);
                    expect(requestBody1['destinationApp']['_value']).toBe(1000471);
                    const requestBody2 = JSON.parse(storeEventRequestApiInfo[1][1]['body']);
                    expect(requestBody2['type']).toBe('share-trigger');
                    expect(requestBody2['operate']).toBe('add');
                    expect(requestBody2['userId']).toBe('testuserapp');
                    expect(requestBody2['identifier']).toBe('fedc51ce-2efd-4ade-9bbe-45dc445ae9c7');
                    expect(requestBody2['event']['_value']).toBe(1000008);
                    expect(requestBody2['event']['_ver']).toBe(1);
                    expect(requestBody2['sourceActor']['_value']).toBe(1000437);
                    expect(requestBody2['destinationActor']['_value']).toBe(1000437);
                    expect(requestBody2['sourceApp']['_value']).toBe(1000471);
                    expect(requestBody2['destinationApp']['_value']).toBe(1000471);
                    const requestBody3 = JSON.parse(storeEventRequestApiInfo[2][1]['body']);
                    expect(requestBody3['type']).toBe('share-trigger');
                    expect(requestBody3['operate']).toBe('add');
                    expect(requestBody3['userId']).toBe('testuserapp');
                    expect(requestBody3['identifier']).toBe('fedc51ce-2efd-4ade-9bbe-45dc445ae9c6');
                    expect(requestBody3['thing']['_value']).toBe(1000922);
                    expect(requestBody3['thing']['_ver']).toBe(1);
                    expect(requestBody3['sourceActor']['_value']).toBe(1000437);
                    expect(requestBody3['destinationActor']['_value']).toBe(1000437);
                    expect(requestBody3['sourceApp']['_value']).toBe(1000471);
                    expect(requestBody3['destinationApp']['_value']).toBe(1000471);
                    // 蓄積イベント通知履歴テーブルの確認
                    const history = await common.executeSqlString('select * from pxr_book_manage.store_event_notificate_history order by id;');
                    expect(history.length).toBe(3);
                    expect(history[0]['notificate_type']).toBe(requestBody1['type']);
                    expect(history[0]['process_type']).toBe(requestBody1['operate']);
                    expect(history[0]['user_id']).toBe(requestBody1['userId']);
                    expect(history[0]['data_id']).toBe(requestBody1['identifier']);
                    expect(parseInt(history[0]['document_catalog_code'])).toBe(requestBody1['document']['_value']);
                    expect(parseInt(history[0]['document_catalog_version'])).toBe(requestBody1['document']['_ver']);
                    expect(parseInt(history[0]['share_source_actor_catalog_code'])).toBe(requestBody1['sourceActor']['_value']);
                    expect(parseInt(history[0]['share_source_app_catalog_code'])).toBe(requestBody1['sourceApp']['_value']);
                    expect(parseInt(history[0]['share_target_actor_catalog_code'])).toBe(requestBody1['destinationActor']['_value']);
                    expect(parseInt(history[0]['share_target_app_catalog_code'])).toBe(requestBody1['destinationApp']['_value']);

                    expect(history[1]['notificate_type']).toBe(requestBody2['type']);
                    expect(history[1]['process_type']).toBe(requestBody2['operate']);
                    expect(history[1]['user_id']).toBe(requestBody2['userId']);
                    expect(history[1]['data_id']).toBe(requestBody2['identifier']);
                    expect(parseInt(history[1]['event_catalog_code'])).toBe(requestBody2['event']['_value']);
                    expect(parseInt(history[1]['event_catalog_version'])).toBe(requestBody2['event']['_ver']);
                    expect(parseInt(history[1]['share_source_actor_catalog_code'])).toBe(requestBody2['sourceActor']['_value']);
                    expect(parseInt(history[1]['share_source_app_catalog_code'])).toBe(requestBody2['sourceApp']['_value']);
                    expect(parseInt(history[1]['share_target_actor_catalog_code'])).toBe(requestBody2['destinationActor']['_value']);
                    expect(parseInt(history[1]['share_target_app_catalog_code'])).toBe(requestBody2['destinationApp']['_value']);

                    expect(history[2]['notificate_type']).toBe(requestBody3['type']);
                    expect(history[2]['process_type']).toBe(requestBody3['operate']);
                    expect(history[2]['user_id']).toBe(requestBody3['userId']);
                    expect(history[2]['data_id']).toBe(requestBody3['identifier']);
                    expect(parseInt(history[2]['thing_catalog_code'])).toBe(requestBody3['thing']['_value']);
                    expect(parseInt(history[2]['thing_catalog_version'])).toBe(requestBody3['thing']['_ver']);
                    expect(parseInt(history[2]['share_source_actor_catalog_code'])).toBe(requestBody3['sourceActor']['_value']);
                    expect(parseInt(history[2]['share_source_app_catalog_code'])).toBe(requestBody3['sourceApp']['_value']);
                    expect(parseInt(history[2]['share_target_actor_catalog_code'])).toBe(requestBody3['destinationActor']['_value']);
                    expect(parseInt(history[2]['share_target_app_catalog_code'])).toBe(requestBody3['destinationApp']['_value']);
                });
                test('利用者ID連携テーブルに 同じアクターの別APP/WFに 同じuserIdの利用者が存在する', async () => {
                    _operatorServer = new StubOperatorServerType0(200, 2);
                    _catalogServer = new StubCatalogServerStoreEventNotificate(3001, 200, 0, 0);
                    _proxyServer = new StubProxyServer(200);

                    await common.executeSqlString(`
                        INSERT INTO pxr_book_manage.user_id_cooperate
                        (
                            book_id,
                            actor_catalog_code, actor_catalog_version,
                            app_catalog_code, app_catalog_version,
                            wf_catalog_code, wf_catalog_version,
                            user_id,
                            status,
                            is_disabled,
                            created_by, created_at,
                            updated_by, updated_at
                        )
                        VALUES
                        (
                            1,
                            1000437,1,
                            1000801,1,
                            null,null,
                            'testuserapp',
                            1,
                            false,
                            'pxr_user', NOW(),
                            'pxr_user', NOW()
                        )
                    `);

                    // 送信データを作成
                    const url = Url.postStoreEventNotificate;

                    // 対象APIに送信
                    const response = await supertest(expressApp).post(url)
                        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                        .set({ session: encodeURIComponent(Session.postStoreEventNotificate) })
                        .send(JSON.stringify(
                            {
                                add: [
                                    {
                                        '1_1': 'testuserapp',
                                        document: [
                                            {
                                                serialNumber: 1,
                                                '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                                '2_n_1_2_1': 1099999,
                                                '2_n_1_2_2': 1,
                                                '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                                '2_n_3_1_1': 1000437,
                                                '2_n_3_1_2': 1,
                                                '2_n_3_2_1': null,
                                                '2_n_3_2_2': null,
                                                '2_n_3_5_1': 1000471,
                                                '2_n_3_5_2': 1
                                            }
                                        ],
                                        event: {
                                            '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                            '3_1_2_1': 1000008,
                                            '3_1_2_2': 1,
                                            '3_2_1': '2020-07-01T00:00:00.000+0900',
                                            '3_2_2': '2020-07-01T00:00:00.000+0900',
                                            '3_5_1_1': 1000437,
                                            '3_5_1_2': 1,
                                            '3_5_2_1': null,
                                            '3_5_2_2': null,
                                            '3_5_5_1': 1000471,
                                            '3_5_5_2': 1
                                        },
                                        thing: [
                                            {
                                                '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                                '4_1_2_1': 1000922,
                                                '4_1_2_2': 1,
                                                '4_4_1_1': 1000437,
                                                '4_4_1_2': 1,
                                                '4_4_2_1': null,
                                                '4_4_2_2': null,
                                                '4_4_5_1': 1000471,
                                                '4_4_5_2': 1,
                                                rowHash: 'rowHash...',
                                                rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                            }
                                        ]
                                    }
                                ],
                                update: [],
                                delete: []
                            }
                        ));

                    // レスポンスチェック
                    expect(response.status).toBe(200);
                    expect(JSON.stringify(response.body)).toBe(JSON.stringify({ result: 'success' }));
                    // 蓄積イベント受信へのリクエストの確認
                    const storeEventRequestApiInfo = mockDoPostRequest.mock.calls.filter(elem => (elem[0] as string).startsWith('http://localhost:3003/pxr-block-proxy'));
                    expect(storeEventRequestApiInfo.length).toBe(3);
                    const requestBody1 = JSON.parse(storeEventRequestApiInfo[0][1]['body']);
                    expect(requestBody1['type']).toBe('share-trigger');
                    expect(requestBody1['operate']).toBe('add');
                    expect(requestBody1['userId']).toBe('testuserapp');
                    expect(requestBody1['identifier']).toBe('fedc51ce-2efd-4ade-9bbe-45dc445ae9c7');
                    expect(requestBody1['document']['_value']).toBe(1099999);
                    expect(requestBody1['document']['_ver']).toBe(1);
                    expect(requestBody1['sourceActor']['_value']).toBe(1000437);
                    expect(requestBody1['destinationActor']['_value']).toBe(1000437);
                    expect(requestBody1['sourceApp']['_value']).toBe(1000471);
                    expect(requestBody1['destinationApp']['_value']).toBe(1000471);
                    const requestBody2 = JSON.parse(storeEventRequestApiInfo[1][1]['body']);
                    expect(requestBody2['type']).toBe('share-trigger');
                    expect(requestBody2['operate']).toBe('add');
                    expect(requestBody2['userId']).toBe('testuserapp');
                    expect(requestBody2['identifier']).toBe('fedc51ce-2efd-4ade-9bbe-45dc445ae9c7');
                    expect(requestBody2['event']['_value']).toBe(1000008);
                    expect(requestBody2['event']['_ver']).toBe(1);
                    expect(requestBody2['sourceActor']['_value']).toBe(1000437);
                    expect(requestBody2['destinationActor']['_value']).toBe(1000437);
                    expect(requestBody2['sourceApp']['_value']).toBe(1000471);
                    expect(requestBody2['destinationApp']['_value']).toBe(1000471);
                    const requestBody3 = JSON.parse(storeEventRequestApiInfo[2][1]['body']);
                    expect(requestBody3['type']).toBe('share-trigger');
                    expect(requestBody3['operate']).toBe('add');
                    expect(requestBody3['userId']).toBe('testuserapp');
                    expect(requestBody3['identifier']).toBe('fedc51ce-2efd-4ade-9bbe-45dc445ae9c6');
                    expect(requestBody3['thing']['_value']).toBe(1000922);
                    expect(requestBody3['thing']['_ver']).toBe(1);
                    expect(requestBody3['sourceActor']['_value']).toBe(1000437);
                    expect(requestBody3['destinationActor']['_value']).toBe(1000437);
                    expect(requestBody3['sourceApp']['_value']).toBe(1000471);
                    expect(requestBody3['destinationApp']['_value']).toBe(1000471);
                    // 蓄積イベント通知履歴テーブルの確認
                    const history = await common.executeSqlString('select * from pxr_book_manage.store_event_notificate_history order by id;');
                    expect(history.length).toBe(3);
                    expect(history[0]['notificate_type']).toBe(requestBody1['type']);
                    expect(history[0]['process_type']).toBe(requestBody1['operate']);
                    expect(history[0]['user_id']).toBe(requestBody1['userId']);
                    expect(history[0]['data_id']).toBe(requestBody1['identifier']);
                    expect(parseInt(history[0]['document_catalog_code'])).toBe(requestBody1['document']['_value']);
                    expect(parseInt(history[0]['document_catalog_version'])).toBe(requestBody1['document']['_ver']);
                    expect(parseInt(history[0]['share_source_actor_catalog_code'])).toBe(requestBody1['sourceActor']['_value']);
                    expect(parseInt(history[0]['share_source_app_catalog_code'])).toBe(requestBody1['sourceApp']['_value']);
                    expect(parseInt(history[0]['share_target_actor_catalog_code'])).toBe(requestBody1['destinationActor']['_value']);
                    expect(parseInt(history[0]['share_target_app_catalog_code'])).toBe(requestBody1['destinationApp']['_value']);

                    expect(history[1]['notificate_type']).toBe(requestBody2['type']);
                    expect(history[1]['process_type']).toBe(requestBody2['operate']);
                    expect(history[1]['user_id']).toBe(requestBody2['userId']);
                    expect(history[1]['data_id']).toBe(requestBody2['identifier']);
                    expect(parseInt(history[1]['event_catalog_code'])).toBe(requestBody2['event']['_value']);
                    expect(parseInt(history[1]['event_catalog_version'])).toBe(requestBody2['event']['_ver']);
                    expect(parseInt(history[1]['share_source_actor_catalog_code'])).toBe(requestBody2['sourceActor']['_value']);
                    expect(parseInt(history[1]['share_source_app_catalog_code'])).toBe(requestBody2['sourceApp']['_value']);
                    expect(parseInt(history[1]['share_target_actor_catalog_code'])).toBe(requestBody2['destinationActor']['_value']);
                    expect(parseInt(history[1]['share_target_app_catalog_code'])).toBe(requestBody2['destinationApp']['_value']);

                    expect(history[2]['notificate_type']).toBe(requestBody3['type']);
                    expect(history[2]['process_type']).toBe(requestBody3['operate']);
                    expect(history[2]['user_id']).toBe(requestBody3['userId']);
                    expect(history[2]['data_id']).toBe(requestBody3['identifier']);
                    expect(parseInt(history[2]['thing_catalog_code'])).toBe(requestBody3['thing']['_value']);
                    expect(parseInt(history[2]['thing_catalog_version'])).toBe(requestBody3['thing']['_ver']);
                    expect(parseInt(history[2]['share_source_actor_catalog_code'])).toBe(requestBody3['sourceActor']['_value']);
                    expect(parseInt(history[2]['share_source_app_catalog_code'])).toBe(requestBody3['sourceApp']['_value']);
                    expect(parseInt(history[2]['share_target_actor_catalog_code'])).toBe(requestBody3['destinationActor']['_value']);
                    expect(parseInt(history[2]['share_target_app_catalog_code'])).toBe(requestBody3['destinationApp']['_value']);
                });
                test('利用者ID連携テーブルに 別のアクターのAPPに 同じuserIdの利用者が存在する', async () => {
                    _operatorServer = new StubOperatorServerType0(200, 2);
                    _catalogServer = new StubCatalogServerStoreEventNotificate(3001, 200, 0, 0);
                    _proxyServer = new StubProxyServer(200);

                    await common.executeSqlString(`
                        INSERT INTO pxr_book_manage.user_id_cooperate
                        (
                            book_id,
                            actor_catalog_code, actor_catalog_version,
                            app_catalog_code, app_catalog_version,
                            wf_catalog_code, wf_catalog_version,
                            user_id,
                            status,
                            is_disabled,
                            created_by, created_at,
                            updated_by, updated_at
                        )
                        VALUES
                        (
                            1,
                            1000446,1,
                            1000901,1,
                            null,null,
                            'testuserapp',
                            1,
                            false,
                            'pxr_user', NOW(),
                            'pxr_user', NOW()
                        )
                    `);

                    // 送信データを作成
                    const url = Url.postStoreEventNotificate;

                    // 対象APIに送信
                    const response = await supertest(expressApp).post(url)
                        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                        .set({ session: encodeURIComponent(Session.postStoreEventNotificate) })
                        .send(JSON.stringify(
                            {
                                add: [
                                    {
                                        '1_1': 'testuserapp',
                                        document: [
                                            {
                                                serialNumber: 1,
                                                '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                                '2_n_1_2_1': 1099999,
                                                '2_n_1_2_2': 1,
                                                '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                                '2_n_3_1_1': 1000437,
                                                '2_n_3_1_2': 1,
                                                '2_n_3_2_1': null,
                                                '2_n_3_2_2': null,
                                                '2_n_3_5_1': 1000471,
                                                '2_n_3_5_2': 1
                                            }
                                        ],
                                        event: {
                                            '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                            '3_1_2_1': 1000008,
                                            '3_1_2_2': 1,
                                            '3_2_1': '2020-07-01T00:00:00.000+0900',
                                            '3_2_2': '2020-07-01T00:00:00.000+0900',
                                            '3_5_1_1': 1000437,
                                            '3_5_1_2': 1,
                                            '3_5_2_1': null,
                                            '3_5_2_2': null,
                                            '3_5_5_1': 1000471,
                                            '3_5_5_2': 1
                                        },
                                        thing: [
                                            {
                                                '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                                '4_1_2_1': 1000922,
                                                '4_1_2_2': 1,
                                                '4_4_1_1': 1000437,
                                                '4_4_1_2': 1,
                                                '4_4_2_1': null,
                                                '4_4_2_2': null,
                                                '4_4_5_1': 1000471,
                                                '4_4_5_2': 1,
                                                rowHash: 'rowHash...',
                                                rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                            }
                                        ]
                                    }
                                ],
                                update: [],
                                delete: []
                            }
                        ));

                    // レスポンスチェック
                    expect(response.status).toBe(200);
                    expect(JSON.stringify(response.body)).toBe(JSON.stringify({ result: 'success' }));
                    // 蓄積イベント受信へのリクエストの確認
                    const storeEventRequestApiInfo = mockDoPostRequest.mock.calls.filter(elem => (elem[0] as string).startsWith('http://localhost:3003/pxr-block-proxy'));
                    expect(storeEventRequestApiInfo.length).toBe(3);
                    const requestBody1 = JSON.parse(storeEventRequestApiInfo[0][1]['body']);
                    expect(requestBody1['type']).toBe('share-trigger');
                    expect(requestBody1['operate']).toBe('add');
                    expect(requestBody1['userId']).toBe('testuserapp');
                    expect(requestBody1['identifier']).toBe('fedc51ce-2efd-4ade-9bbe-45dc445ae9c7');
                    expect(requestBody1['document']['_value']).toBe(1099999);
                    expect(requestBody1['document']['_ver']).toBe(1);
                    expect(requestBody1['sourceActor']['_value']).toBe(1000437);
                    expect(requestBody1['destinationActor']['_value']).toBe(1000437);
                    expect(requestBody1['sourceApp']['_value']).toBe(1000471);
                    expect(requestBody1['destinationApp']['_value']).toBe(1000471);
                    const requestBody2 = JSON.parse(storeEventRequestApiInfo[1][1]['body']);
                    expect(requestBody2['type']).toBe('share-trigger');
                    expect(requestBody2['operate']).toBe('add');
                    expect(requestBody2['userId']).toBe('testuserapp');
                    expect(requestBody2['identifier']).toBe('fedc51ce-2efd-4ade-9bbe-45dc445ae9c7');
                    expect(requestBody2['event']['_value']).toBe(1000008);
                    expect(requestBody2['event']['_ver']).toBe(1);
                    expect(requestBody2['sourceActor']['_value']).toBe(1000437);
                    expect(requestBody2['destinationActor']['_value']).toBe(1000437);
                    expect(requestBody2['sourceApp']['_value']).toBe(1000471);
                    expect(requestBody2['destinationApp']['_value']).toBe(1000471);
                    const requestBody3 = JSON.parse(storeEventRequestApiInfo[2][1]['body']);
                    expect(requestBody3['type']).toBe('share-trigger');
                    expect(requestBody3['operate']).toBe('add');
                    expect(requestBody3['userId']).toBe('testuserapp');
                    expect(requestBody3['identifier']).toBe('fedc51ce-2efd-4ade-9bbe-45dc445ae9c6');
                    expect(requestBody3['thing']['_value']).toBe(1000922);
                    expect(requestBody3['thing']['_ver']).toBe(1);
                    expect(requestBody3['sourceActor']['_value']).toBe(1000437);
                    expect(requestBody3['destinationActor']['_value']).toBe(1000437);
                    expect(requestBody3['sourceApp']['_value']).toBe(1000471);
                    expect(requestBody3['destinationApp']['_value']).toBe(1000471);
                    // 蓄積イベント通知履歴テーブルの確認
                    const history = await common.executeSqlString('select * from pxr_book_manage.store_event_notificate_history order by id;');
                    expect(history.length).toBe(3);
                    expect(history[0]['notificate_type']).toBe(requestBody1['type']);
                    expect(history[0]['process_type']).toBe(requestBody1['operate']);
                    expect(history[0]['user_id']).toBe(requestBody1['userId']);
                    expect(history[0]['data_id']).toBe(requestBody1['identifier']);
                    expect(parseInt(history[0]['document_catalog_code'])).toBe(requestBody1['document']['_value']);
                    expect(parseInt(history[0]['document_catalog_version'])).toBe(requestBody1['document']['_ver']);
                    expect(parseInt(history[0]['share_source_actor_catalog_code'])).toBe(requestBody1['sourceActor']['_value']);
                    expect(parseInt(history[0]['share_source_app_catalog_code'])).toBe(requestBody1['sourceApp']['_value']);
                    expect(parseInt(history[0]['share_target_actor_catalog_code'])).toBe(requestBody1['destinationActor']['_value']);
                    expect(parseInt(history[0]['share_target_app_catalog_code'])).toBe(requestBody1['destinationApp']['_value']);

                    expect(history[1]['notificate_type']).toBe(requestBody2['type']);
                    expect(history[1]['process_type']).toBe(requestBody2['operate']);
                    expect(history[1]['user_id']).toBe(requestBody2['userId']);
                    expect(history[1]['data_id']).toBe(requestBody2['identifier']);
                    expect(parseInt(history[1]['event_catalog_code'])).toBe(requestBody2['event']['_value']);
                    expect(parseInt(history[1]['event_catalog_version'])).toBe(requestBody2['event']['_ver']);
                    expect(parseInt(history[1]['share_source_actor_catalog_code'])).toBe(requestBody2['sourceActor']['_value']);
                    expect(parseInt(history[1]['share_source_app_catalog_code'])).toBe(requestBody2['sourceApp']['_value']);
                    expect(parseInt(history[1]['share_target_actor_catalog_code'])).toBe(requestBody2['destinationActor']['_value']);
                    expect(parseInt(history[1]['share_target_app_catalog_code'])).toBe(requestBody2['destinationApp']['_value']);

                    expect(history[2]['notificate_type']).toBe(requestBody3['type']);
                    expect(history[2]['process_type']).toBe(requestBody3['operate']);
                    expect(history[2]['user_id']).toBe(requestBody3['userId']);
                    expect(history[2]['data_id']).toBe(requestBody3['identifier']);
                    expect(parseInt(history[2]['thing_catalog_code'])).toBe(requestBody3['thing']['_value']);
                    expect(parseInt(history[2]['thing_catalog_version'])).toBe(requestBody3['thing']['_ver']);
                    expect(parseInt(history[2]['share_source_actor_catalog_code'])).toBe(requestBody3['sourceActor']['_value']);
                    expect(parseInt(history[2]['share_source_app_catalog_code'])).toBe(requestBody3['sourceApp']['_value']);
                    expect(parseInt(history[2]['share_target_actor_catalog_code'])).toBe(requestBody3['destinationActor']['_value']);
                    expect(parseInt(history[2]['share_target_app_catalog_code'])).toBe(requestBody3['destinationApp']['_value']);
                });
                test('利用者ID連携テーブルに 別の個人の 同じアクターの別APPに 同じuserIdの利用者が存在する', async () => {
                    _operatorServer = new StubOperatorServerType0(200, 2);
                    _catalogServer = new StubCatalogServerStoreEventNotificate(3001, 200, 0, 0);
                    _proxyServer = new StubProxyServer(200);

                    await common.executeSqlString(`
                        INSERT INTO pxr_book_manage.user_id_cooperate
                        (
                            book_id,
                            actor_catalog_code, actor_catalog_version,
                            app_catalog_code, app_catalog_version,
                            wf_catalog_code, wf_catalog_version,
                            user_id,
                            status,
                            is_disabled,
                            created_by, created_at,
                            updated_by, updated_at
                        )
                        VALUES
                        (
                            2,
                            1000437,1,
                            1000801,1,
                            null,null,
                            'testuserapp',
                            1,
                            false,
                            'pxr_user', NOW(),
                            'pxr_user', NOW()
                        )
                    `);

                    // 送信データを作成
                    const url = Url.postStoreEventNotificate;

                    // 対象APIに送信
                    const response = await supertest(expressApp).post(url)
                        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                        .set({ session: encodeURIComponent(Session.postStoreEventNotificate) })
                        .send(JSON.stringify(
                            {
                                add: [
                                    {
                                        '1_1': 'testuserapp',
                                        document: [
                                            {
                                                serialNumber: 1,
                                                '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                                '2_n_1_2_1': 1099999,
                                                '2_n_1_2_2': 1,
                                                '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                                '2_n_3_1_1': 1000437,
                                                '2_n_3_1_2': 1,
                                                '2_n_3_2_1': null,
                                                '2_n_3_2_2': null,
                                                '2_n_3_5_1': 1000471,
                                                '2_n_3_5_2': 1
                                            }
                                        ],
                                        event: {
                                            '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                            '3_1_2_1': 1000008,
                                            '3_1_2_2': 1,
                                            '3_2_1': '2020-07-01T00:00:00.000+0900',
                                            '3_2_2': '2020-07-01T00:00:00.000+0900',
                                            '3_5_1_1': 1000437,
                                            '3_5_1_2': 1,
                                            '3_5_2_1': null,
                                            '3_5_2_2': null,
                                            '3_5_5_1': 1000471,
                                            '3_5_5_2': 1
                                        },
                                        thing: [
                                            {
                                                '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                                '4_1_2_1': 1000922,
                                                '4_1_2_2': 1,
                                                '4_4_1_1': 1000437,
                                                '4_4_1_2': 1,
                                                '4_4_2_1': null,
                                                '4_4_2_2': null,
                                                '4_4_5_1': 1000471,
                                                '4_4_5_2': 1,
                                                rowHash: 'rowHash...',
                                                rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                            }
                                        ]
                                    }
                                ],
                                update: [],
                                delete: []
                            }
                        ));

                    // レスポンスチェック
                    expect(response.status).toBe(200);
                    expect(JSON.stringify(response.body)).toBe(JSON.stringify({ result: 'success' }));
                    // 蓄積イベント受信へのリクエストの確認
                    const storeEventRequestApiInfo = mockDoPostRequest.mock.calls.filter(elem => (elem[0] as string).startsWith('http://localhost:3003/pxr-block-proxy'));
                    expect(storeEventRequestApiInfo.length).toBe(3);
                    const requestBody1 = JSON.parse(storeEventRequestApiInfo[0][1]['body']);
                    expect(requestBody1['type']).toBe('share-trigger');
                    expect(requestBody1['operate']).toBe('add');
                    expect(requestBody1['userId']).toBe('testuserapp');
                    expect(requestBody1['identifier']).toBe('fedc51ce-2efd-4ade-9bbe-45dc445ae9c7');
                    expect(requestBody1['document']['_value']).toBe(1099999);
                    expect(requestBody1['document']['_ver']).toBe(1);
                    expect(requestBody1['sourceActor']['_value']).toBe(1000437);
                    expect(requestBody1['destinationActor']['_value']).toBe(1000437);
                    expect(requestBody1['sourceApp']['_value']).toBe(1000471);
                    expect(requestBody1['destinationApp']['_value']).toBe(1000471);
                    const requestBody2 = JSON.parse(storeEventRequestApiInfo[1][1]['body']);
                    expect(requestBody2['type']).toBe('share-trigger');
                    expect(requestBody2['operate']).toBe('add');
                    expect(requestBody2['userId']).toBe('testuserapp');
                    expect(requestBody2['identifier']).toBe('fedc51ce-2efd-4ade-9bbe-45dc445ae9c7');
                    expect(requestBody2['event']['_value']).toBe(1000008);
                    expect(requestBody2['event']['_ver']).toBe(1);
                    expect(requestBody2['sourceActor']['_value']).toBe(1000437);
                    expect(requestBody2['destinationActor']['_value']).toBe(1000437);
                    expect(requestBody2['sourceApp']['_value']).toBe(1000471);
                    expect(requestBody2['destinationApp']['_value']).toBe(1000471);
                    const requestBody3 = JSON.parse(storeEventRequestApiInfo[2][1]['body']);
                    expect(requestBody3['type']).toBe('share-trigger');
                    expect(requestBody3['operate']).toBe('add');
                    expect(requestBody3['userId']).toBe('testuserapp');
                    expect(requestBody3['identifier']).toBe('fedc51ce-2efd-4ade-9bbe-45dc445ae9c6');
                    expect(requestBody3['thing']['_value']).toBe(1000922);
                    expect(requestBody3['thing']['_ver']).toBe(1);
                    expect(requestBody3['sourceActor']['_value']).toBe(1000437);
                    expect(requestBody3['destinationActor']['_value']).toBe(1000437);
                    expect(requestBody3['sourceApp']['_value']).toBe(1000471);
                    expect(requestBody3['destinationApp']['_value']).toBe(1000471);
                    // 蓄積イベント通知履歴テーブルの確認
                    const history = await common.executeSqlString('select * from pxr_book_manage.store_event_notificate_history order by id;');
                    expect(history.length).toBe(3);
                    expect(history[0]['notificate_type']).toBe(requestBody1['type']);
                    expect(history[0]['process_type']).toBe(requestBody1['operate']);
                    expect(history[0]['user_id']).toBe(requestBody1['userId']);
                    expect(history[0]['data_id']).toBe(requestBody1['identifier']);
                    expect(parseInt(history[0]['document_catalog_code'])).toBe(requestBody1['document']['_value']);
                    expect(parseInt(history[0]['document_catalog_version'])).toBe(requestBody1['document']['_ver']);
                    expect(parseInt(history[0]['share_source_actor_catalog_code'])).toBe(requestBody1['sourceActor']['_value']);
                    expect(parseInt(history[0]['share_source_app_catalog_code'])).toBe(requestBody1['sourceApp']['_value']);
                    expect(parseInt(history[0]['share_target_actor_catalog_code'])).toBe(requestBody1['destinationActor']['_value']);
                    expect(parseInt(history[0]['share_target_app_catalog_code'])).toBe(requestBody1['destinationApp']['_value']);

                    expect(history[1]['notificate_type']).toBe(requestBody2['type']);
                    expect(history[1]['process_type']).toBe(requestBody2['operate']);
                    expect(history[1]['user_id']).toBe(requestBody2['userId']);
                    expect(history[1]['data_id']).toBe(requestBody2['identifier']);
                    expect(parseInt(history[1]['event_catalog_code'])).toBe(requestBody2['event']['_value']);
                    expect(parseInt(history[1]['event_catalog_version'])).toBe(requestBody2['event']['_ver']);
                    expect(parseInt(history[1]['share_source_actor_catalog_code'])).toBe(requestBody2['sourceActor']['_value']);
                    expect(parseInt(history[1]['share_source_app_catalog_code'])).toBe(requestBody2['sourceApp']['_value']);
                    expect(parseInt(history[1]['share_target_actor_catalog_code'])).toBe(requestBody2['destinationActor']['_value']);
                    expect(parseInt(history[1]['share_target_app_catalog_code'])).toBe(requestBody2['destinationApp']['_value']);

                    expect(history[2]['notificate_type']).toBe(requestBody3['type']);
                    expect(history[2]['process_type']).toBe(requestBody3['operate']);
                    expect(history[2]['user_id']).toBe(requestBody3['userId']);
                    expect(history[2]['data_id']).toBe(requestBody3['identifier']);
                    expect(parseInt(history[2]['thing_catalog_code'])).toBe(requestBody3['thing']['_value']);
                    expect(parseInt(history[2]['thing_catalog_version'])).toBe(requestBody3['thing']['_ver']);
                    expect(parseInt(history[2]['share_source_actor_catalog_code'])).toBe(requestBody3['sourceActor']['_value']);
                    expect(parseInt(history[2]['share_source_app_catalog_code'])).toBe(requestBody3['sourceApp']['_value']);
                    expect(parseInt(history[2]['share_target_actor_catalog_code'])).toBe(requestBody3['destinationActor']['_value']);
                    expect(parseInt(history[2]['share_target_app_catalog_code'])).toBe(requestBody3['destinationApp']['_value']);
                });
                test('利用者ID連携テーブルに 別の個人の 別のアクターのAPPに 同じuserIdの利用者が存在する', async () => {
                    _operatorServer = new StubOperatorServerType0(200, 2);
                    _catalogServer = new StubCatalogServerStoreEventNotificate(3001, 200, 0, 0);
                    _proxyServer = new StubProxyServer(200);

                    await common.executeSqlString(`
                        INSERT INTO pxr_book_manage.user_id_cooperate
                        (
                            book_id,
                            actor_catalog_code, actor_catalog_version,
                            app_catalog_code, app_catalog_version,
                            wf_catalog_code, wf_catalog_version,
                            user_id,
                            status,
                            is_disabled,
                            created_by, created_at,
                            updated_by, updated_at
                        )
                        VALUES
                        (
                            2,
                            1000446,1,
                            1000901,1,
                            null,null,
                            'testuserapp',
                            1,
                            false,
                            'pxr_user', NOW(),
                            'pxr_user', NOW()
                        )
                    `);

                    // 送信データを作成
                    const url = Url.postStoreEventNotificate;

                    // 対象APIに送信
                    const response = await supertest(expressApp).post(url)
                        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                        .set({ session: encodeURIComponent(Session.postStoreEventNotificate) })
                        .send(JSON.stringify(
                            {
                                add: [
                                    {
                                        '1_1': 'testuserapp',
                                        document: [
                                            {
                                                serialNumber: 1,
                                                '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                                '2_n_1_2_1': 1099999,
                                                '2_n_1_2_2': 1,
                                                '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                                '2_n_3_1_1': 1000437,
                                                '2_n_3_1_2': 1,
                                                '2_n_3_2_1': null,
                                                '2_n_3_2_2': null,
                                                '2_n_3_5_1': 1000471,
                                                '2_n_3_5_2': 1
                                            }
                                        ],
                                        event: {
                                            '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                            '3_1_2_1': 1000008,
                                            '3_1_2_2': 1,
                                            '3_2_1': '2020-07-01T00:00:00.000+0900',
                                            '3_2_2': '2020-07-01T00:00:00.000+0900',
                                            '3_5_1_1': 1000437,
                                            '3_5_1_2': 1,
                                            '3_5_2_1': null,
                                            '3_5_2_2': null,
                                            '3_5_5_1': 1000471,
                                            '3_5_5_2': 1
                                        },
                                        thing: [
                                            {
                                                '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                                '4_1_2_1': 1000922,
                                                '4_1_2_2': 1,
                                                '4_4_1_1': 1000437,
                                                '4_4_1_2': 1,
                                                '4_4_2_1': null,
                                                '4_4_2_2': null,
                                                '4_4_5_1': 1000471,
                                                '4_4_5_2': 1,
                                                rowHash: 'rowHash...',
                                                rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                            }
                                        ]
                                    }
                                ],
                                update: [],
                                delete: []
                            }
                        ));

                    // レスポンスチェック
                    expect(response.status).toBe(200);
                    expect(JSON.stringify(response.body)).toBe(JSON.stringify({ result: 'success' }));
                    // 蓄積イベント受信へのリクエストの確認
                    const storeEventRequestApiInfo = mockDoPostRequest.mock.calls.filter(elem => (elem[0] as string).startsWith('http://localhost:3003/pxr-block-proxy'));
                    expect(storeEventRequestApiInfo.length).toBe(3);
                    const requestBody1 = JSON.parse(storeEventRequestApiInfo[0][1]['body']);
                    expect(requestBody1['type']).toBe('share-trigger');
                    expect(requestBody1['operate']).toBe('add');
                    expect(requestBody1['userId']).toBe('testuserapp');
                    expect(requestBody1['identifier']).toBe('fedc51ce-2efd-4ade-9bbe-45dc445ae9c7');
                    expect(requestBody1['document']['_value']).toBe(1099999);
                    expect(requestBody1['document']['_ver']).toBe(1);
                    expect(requestBody1['sourceActor']['_value']).toBe(1000437);
                    expect(requestBody1['destinationActor']['_value']).toBe(1000437);
                    expect(requestBody1['sourceApp']['_value']).toBe(1000471);
                    expect(requestBody1['destinationApp']['_value']).toBe(1000471);
                    const requestBody2 = JSON.parse(storeEventRequestApiInfo[1][1]['body']);
                    expect(requestBody2['type']).toBe('share-trigger');
                    expect(requestBody2['operate']).toBe('add');
                    expect(requestBody2['userId']).toBe('testuserapp');
                    expect(requestBody2['identifier']).toBe('fedc51ce-2efd-4ade-9bbe-45dc445ae9c7');
                    expect(requestBody2['event']['_value']).toBe(1000008);
                    expect(requestBody2['event']['_ver']).toBe(1);
                    expect(requestBody2['sourceActor']['_value']).toBe(1000437);
                    expect(requestBody2['destinationActor']['_value']).toBe(1000437);
                    expect(requestBody2['sourceApp']['_value']).toBe(1000471);
                    expect(requestBody2['destinationApp']['_value']).toBe(1000471);
                    const requestBody3 = JSON.parse(storeEventRequestApiInfo[2][1]['body']);
                    expect(requestBody3['type']).toBe('share-trigger');
                    expect(requestBody3['operate']).toBe('add');
                    expect(requestBody3['userId']).toBe('testuserapp');
                    expect(requestBody3['identifier']).toBe('fedc51ce-2efd-4ade-9bbe-45dc445ae9c6');
                    expect(requestBody3['thing']['_value']).toBe(1000922);
                    expect(requestBody3['thing']['_ver']).toBe(1);
                    expect(requestBody3['sourceActor']['_value']).toBe(1000437);
                    expect(requestBody3['destinationActor']['_value']).toBe(1000437);
                    expect(requestBody3['sourceApp']['_value']).toBe(1000471);
                    expect(requestBody3['destinationApp']['_value']).toBe(1000471);
                    // 蓄積イベント通知履歴テーブルの確認
                    const history = await common.executeSqlString('select * from pxr_book_manage.store_event_notificate_history order by id;');
                    expect(history.length).toBe(3);
                    expect(history[0]['notificate_type']).toBe(requestBody1['type']);
                    expect(history[0]['process_type']).toBe(requestBody1['operate']);
                    expect(history[0]['user_id']).toBe(requestBody1['userId']);
                    expect(history[0]['data_id']).toBe(requestBody1['identifier']);
                    expect(parseInt(history[0]['document_catalog_code'])).toBe(requestBody1['document']['_value']);
                    expect(parseInt(history[0]['document_catalog_version'])).toBe(requestBody1['document']['_ver']);
                    expect(parseInt(history[0]['share_source_actor_catalog_code'])).toBe(requestBody1['sourceActor']['_value']);
                    expect(parseInt(history[0]['share_source_app_catalog_code'])).toBe(requestBody1['sourceApp']['_value']);
                    expect(parseInt(history[0]['share_target_actor_catalog_code'])).toBe(requestBody1['destinationActor']['_value']);
                    expect(parseInt(history[0]['share_target_app_catalog_code'])).toBe(requestBody1['destinationApp']['_value']);

                    expect(history[1]['notificate_type']).toBe(requestBody2['type']);
                    expect(history[1]['process_type']).toBe(requestBody2['operate']);
                    expect(history[1]['user_id']).toBe(requestBody2['userId']);
                    expect(history[1]['data_id']).toBe(requestBody2['identifier']);
                    expect(parseInt(history[1]['event_catalog_code'])).toBe(requestBody2['event']['_value']);
                    expect(parseInt(history[1]['event_catalog_version'])).toBe(requestBody2['event']['_ver']);
                    expect(parseInt(history[1]['share_source_actor_catalog_code'])).toBe(requestBody2['sourceActor']['_value']);
                    expect(parseInt(history[1]['share_source_app_catalog_code'])).toBe(requestBody2['sourceApp']['_value']);
                    expect(parseInt(history[1]['share_target_actor_catalog_code'])).toBe(requestBody2['destinationActor']['_value']);
                    expect(parseInt(history[1]['share_target_app_catalog_code'])).toBe(requestBody2['destinationApp']['_value']);

                    expect(history[2]['notificate_type']).toBe(requestBody3['type']);
                    expect(history[2]['process_type']).toBe(requestBody3['operate']);
                    expect(history[2]['user_id']).toBe(requestBody3['userId']);
                    expect(history[2]['data_id']).toBe(requestBody3['identifier']);
                    expect(parseInt(history[2]['thing_catalog_code'])).toBe(requestBody3['thing']['_value']);
                    expect(parseInt(history[2]['thing_catalog_version'])).toBe(requestBody3['thing']['_ver']);
                    expect(parseInt(history[2]['share_source_actor_catalog_code'])).toBe(requestBody3['sourceActor']['_value']);
                    expect(parseInt(history[2]['share_source_app_catalog_code'])).toBe(requestBody3['sourceApp']['_value']);
                    expect(parseInt(history[2]['share_target_actor_catalog_code'])).toBe(requestBody3['destinationActor']['_value']);
                    expect(parseInt(history[2]['share_target_app_catalog_code'])).toBe(requestBody3['destinationApp']['_value']);
                });
            });
            describe('異常系', () => {
                test('リクエストにAPP/WFが設定されていない', async () => {
                    _operatorServer = new StubOperatorServerType0(200, 2);
                    _catalogServer = new StubCatalogServerStoreEventNotificate(3001, 200, 0, 0);
                    _proxyServer = new StubProxyServer(200);

                    // 送信データを作成
                    const url = Url.postStoreEventNotificate;

                    // 対象APIに送信
                    const response = await supertest(expressApp).post(url)
                        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                        .set({ session: encodeURIComponent(Session.postStoreEventNotificate) })
                        .send(JSON.stringify(
                            {
                                add: [
                                    {
                                        '1_1': 'testuserwf',
                                        document: [
                                            {
                                                serialNumber: 1,
                                                '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                                '2_n_1_2_1': 1099999,
                                                '2_n_1_2_2': 1,
                                                '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                                '2_n_3_1_1': 1000445,
                                                '2_n_3_1_2': 1,
                                                '2_n_3_2_1': 1000445,
                                                '2_n_3_2_2': 1,
                                                '2_n_3_5_1': null,
                                                '2_n_3_5_2': null
                                            }
                                        ],
                                        event: {
                                            '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                            '3_1_2_1': 1000008,
                                            '3_1_2_2': 1,
                                            '3_2_1': '2020-07-01T00:00:00.000+0900',
                                            '3_2_2': '2020-07-01T00:00:00.000+0900',
                                            '3_5_1_1': 1000445,
                                            '3_5_1_2': 1,
                                            '3_5_2_1': null,
                                            '3_5_2_2': null,
                                            '3_5_5_1': null,
                                            '3_5_5_2': null
                                        },
                                        thing: [
                                            {
                                                '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                                '4_1_2_1': 1000922,
                                                '4_1_2_2': 1,
                                                '4_4_1_1': 1000445,
                                                '4_4_1_2': 1,
                                                '4_4_2_1': 1000601,
                                                '4_4_2_2': 1,
                                                '4_4_5_1': null,
                                                '4_4_5_2': null,
                                                rowHash: 'rowHash...',
                                                rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                            }
                                        ]
                                    }
                                ],
                                update: [],
                                delete: []
                            }
                        ));

                    // レスポンスチェック
                    expect(response.status).toBe(400);
                    expect(response.body.message).toBe(Message.EMPTY_WF_AND_APP);
                });
                test('利用者ID連携テーブルの取得結果が2件', async () => {
                    _operatorServer = new StubOperatorServerType0(200, 2);
                    _catalogServer = new StubCatalogServerStoreEventNotificate(3001, 200, 0, 0);
                    _proxyServer = new StubProxyServer(200);

                    await common.executeSqlString(`
                        INSERT INTO pxr_book_manage.user_id_cooperate
                        (
                            book_id,
                            actor_catalog_code, actor_catalog_version,
                            app_catalog_code, app_catalog_version,
                            wf_catalog_code, wf_catalog_version,
                            user_id,
                            status,
                            is_disabled,
                            created_by, created_at,
                            updated_by, updated_at
                        )
                        VALUES
                        (
                            1,
                            1000437,1,
                            1000471,1,
                            null,null,
                            'testuserapp',
                            1,
                            false,
                            'pxr_user', NOW(),
                            'pxr_user', NOW()
                        )
                    `);

                    // 送信データを作成
                    const url = Url.postStoreEventNotificate;

                    // 対象APIに送信
                    const response = await supertest(expressApp).post(url)
                        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                        .set({ session: encodeURIComponent(Session.postStoreEventNotificate) })
                        .send(JSON.stringify(
                            {
                                add: [
                                    {
                                        '1_1': 'testuserapp',
                                        document: [
                                            {
                                                serialNumber: 1,
                                                '2_n_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                                '2_n_1_2_1': 1099999,
                                                '2_n_1_2_2': 1,
                                                '2_n_2_1': '2020-07-01T00:00:00.000+0900',
                                                '2_n_3_1_1': 1000437,
                                                '2_n_3_1_2': 1,
                                                '2_n_3_2_1': null,
                                                '2_n_3_2_2': null,
                                                '2_n_3_5_1': 1000471,
                                                '2_n_3_5_2': 1
                                            }
                                        ],
                                        event: {
                                            '3_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c7',
                                            '3_1_2_1': 1000008,
                                            '3_1_2_2': 1,
                                            '3_2_1': '2020-07-01T00:00:00.000+0900',
                                            '3_2_2': '2020-07-01T00:00:00.000+0900',
                                            '3_5_1_1': 1000437,
                                            '3_5_1_2': 1,
                                            '3_5_2_1': null,
                                            '3_5_2_2': null,
                                            '3_5_5_1': 1000471,
                                            '3_5_5_2': 1
                                        },
                                        thing: [
                                            {
                                                '4_1_1': 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                                                '4_1_2_1': 1000922,
                                                '4_1_2_2': 1,
                                                '4_4_1_1': 1000437,
                                                '4_4_1_2': 1,
                                                '4_4_2_1': null,
                                                '4_4_2_2': null,
                                                '4_4_5_1': 1000471,
                                                '4_4_5_2': 1,
                                                rowHash: 'rowHash...',
                                                rowHashCreateAt: '2020-07-01T00:00:00.000+0900'
                                            }
                                        ]
                                    }
                                ],
                                update: [],
                                delete: []
                            }
                        ));

                    // レスポンスチェック
                    expect(response.status).toBe(400);
                    expect(response.body.message).toBe(Message.COULD_NOT_SPECIFY_USER_BOOK);
                });
            });
        });
    });

    /**
     * 蓄積イベント通知定義更新 API
     */
    describe('蓄積イベント通知定義更新', () => {
        test('正常：共有定義にドキュメント/イベント/モノ', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEvent.sql');

            // 送信データを作成
            const url = Url.postStoreEvent;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.postStoreEvent) })
                .send(JSON.stringify(
                    {
                        type: 'share-trigger',
                        notificateCatalog: {
                            _value: 1001023,
                            _ver: 1
                        },
                        shareCode: {
                            _value: 1000500,
                            _ver: 1
                        },
                        shareUUID: [
                            'a344bbbb-31ec-73a4-de42-f7c2549134b1'
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({ result: 'success' }));
        });

        test('正常：共有定義にドキュメントのみ', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEvent.sql');

            // 送信データを作成
            const url = Url.postStoreEvent;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.postStoreEvent) })
                .send(JSON.stringify(
                    {
                        type: 'share-trigger',
                        notificateCatalog: {
                            _value: 1001023,
                            _ver: 1
                        },
                        shareCode: {
                            _value: 1000501,
                            _ver: 1
                        },
                        shareUUID: [
                            'a344bbbb-31ec-73a4-de42-f7c2549134b1'
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({ result: 'success' }));
        });

        test('正常：共有定義にイベントのみ', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEvent.sql');

            // 送信データを作成
            const url = Url.postStoreEvent;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.postStoreEvent) })
                .send(JSON.stringify(
                    {
                        type: 'share-trigger',
                        notificateCatalog: {
                            _value: 1001023,
                            _ver: 1
                        },
                        shareCode: {
                            _value: 1000502,
                            _ver: 1
                        },
                        shareUUID: [
                            'a344bbbb-31ec-73a4-de42-f7c2549134b1'
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({ result: 'success' }));
        });

        test('正常：共有定義にモノのみ', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEvent.sql');

            // 送信データを作成
            const url = Url.postStoreEvent;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.postStoreEvent) })
                .send(JSON.stringify(
                    {
                        type: 'share-trigger',
                        notificateCatalog: {
                            _value: 1001023,
                            _ver: 1
                        },
                        shareCode: {
                            _value: 1000503,
                            _ver: 1
                        },
                        shareUUID: [
                            'a344bbbb-31ec-73a4-de42-f7c2549134b1'
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({ result: 'success' }));
        });

        test('正常：共有定義にドキュメント/イベント/モノなし', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEvent.sql');

            // 送信データを作成
            const url = Url.postStoreEvent;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.postStoreEvent) })
                .send(JSON.stringify(
                    {
                        type: 'share-trigger',
                        notificateCatalog: {
                            _value: 1001023,
                            _ver: 1
                        },
                        shareCode: {
                            _value: 1000504,
                            _ver: 1
                        },
                        shareUUID: [
                            'a344bbbb-31ec-73a4-de42-f7c2549134b1'
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({ result: 'success' }));
        });

        test('異常：リクエストにtypeがない', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEvent.sql');

            // 送信データを作成
            const url = Url.postStoreEvent;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.postStoreEvent) })
                .send(JSON.stringify(
                    {
                        type: null,
                        notificateCatalog: {
                            _value: 1001023,
                            _ver: 1
                        },
                        shareCode: {
                            _value: 1000500,
                            _ver: 1
                        },
                        shareUUID: [
                            'a344bbbb-31ec-73a4-de42-f7c2549134b1'
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(JSON.stringify(response.body.reasons)).toBe(JSON.stringify([{ property: 'type', value: null, message: 'この値は必須値です' }]));
        });

        test('異常：リクエストにnotificateCatalogがない', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEvent.sql');

            // 送信データを作成
            const url = Url.postStoreEvent;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.postStoreEvent) })
                .send(JSON.stringify(
                    {
                        type: 'share-trigger',
                        notificateCatalog: null,
                        shareCode: {
                            _value: 1000500,
                            _ver: 1
                        },
                        shareUUID: [
                            'a344bbbb-31ec-73a4-de42-f7c2549134b1'
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(JSON.stringify(response.body.reasons)).toBe(JSON.stringify([
                {
                    property: 'notificateCatalog',
                    value: null,
                    message: 'この値は必須値です'
                }
            ]));
        });

        test('異常：リクエストにshareCodeがない', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEvent.sql');

            // 送信データを作成
            const url = Url.postStoreEvent;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.postStoreEvent) })
                .send(JSON.stringify(
                    {
                        type: 'share-trigger',
                        notificateCatalog: {
                            _value: 1001023,
                            _ver: 1
                        },
                        shareCode: null,
                        shareUUID: [
                            'a344bbbb-31ec-73a4-de42-f7c2549134b1'
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(JSON.stringify(response.body.reasons)).toBe(JSON.stringify([
                {
                    property: 'shareCode',
                    value: null,
                    message: 'この値は必須値です'
                }
            ]));
        });

        test('異常：リクエストにshareUuidがない', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEvent.sql');

            // 送信データを作成
            const url = Url.postStoreEvent;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.postStoreEvent) })
                .send(JSON.stringify(
                    {
                        type: 'share-trigger',
                        notificateCatalog: {
                            _value: 1001023,
                            _ver: 1
                        },
                        shareCode: {
                            _value: 1000500,
                            _ver: 1
                        },
                        shareUUID: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(JSON.stringify(response.body.reasons)).toBe(JSON.stringify([{ property: 'shareUuid', value: null, message: 'この値は必須値です' }]));
        });

        test('異常：リクエストのshareUuidが配列でない', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEvent.sql');

            // 送信データを作成
            const url = Url.postStoreEvent;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.postStoreEvent) })
                .send(JSON.stringify(
                    {
                        type: 'share-trigger',
                        notificateCatalog: {
                            _value: 1001023,
                            _ver: 1
                        },
                        shareCode: {
                            _value: 1000500,
                            _ver: 1
                        },
                        shareUUID: 'a344bbbb-31ec-73a4-de42-f7c2549134b1'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(JSON.stringify(response.body.reasons)).toBe(JSON.stringify([
                {
                    property: 'shareUuid',
                    value: 'a344bbbb-31ec-73a4-de42-f7c2549134b1',
                    message: '配列ではありません'
                }
            ]));
        });

        test('異常：オペレーターサービスに接続できない', async () => {
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEvent.sql');

            // 送信データを作成
            const url = Url.postStoreEvent;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=sessionId'])
                .send(JSON.stringify(
                    {
                        type: 'share-trigger',
                        notificateCatalog: {
                            _value: 1001023,
                            _ver: 1
                        },
                        shareCode: {
                            _value: 1000500,
                            _ver: 1
                        },
                        shareUUID: [
                            'a344bbbb-31ec-73a4-de42-f7c2549134b1'
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });

        test('異常：カタログサービスに接続できない', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEvent.sql');

            // 送信データを作成
            const url = Url.postStoreEvent;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=sessionId'])
                .send(JSON.stringify(
                    {
                        type: 'share-trigger',
                        notificateCatalog: {
                            _value: 1001023,
                            _ver: 1
                        },
                        shareCode: {
                            _value: 1000500,
                            _ver: 1
                        },
                        shareUUID: [
                            'a344bbbb-31ec-73a4-de42-f7c2549134b1'
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_CATALOG);
        });

        test('異常：カタログサービスから400エラー', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerStoreEvent(3001, 400);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEvent.sql');

            // 送信データを作成
            const url = Url.postStoreEvent;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=sessionId'])
                .send(JSON.stringify(
                    {
                        type: 'share-trigger',
                        notificateCatalog: {
                            _value: 1001023,
                            _ver: 1
                        },
                        shareCode: {
                            _value: 1000500,
                            _ver: 1
                        },
                        shareUUID: [
                            'a344bbbb-31ec-73a4-de42-f7c2549134b1'
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });

        test('異常：カタログサービスから500系エラー', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerStoreEvent(3001, 500);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEvent.sql');

            // 送信データを作成
            const url = Url.postStoreEvent;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=sessionId'])
                .send(JSON.stringify(
                    {
                        type: 'share-trigger',
                        notificateCatalog: {
                            _value: 1001023,
                            _ver: 1
                        },
                        shareCode: {
                            _value: 1000500,
                            _ver: 1
                        },
                        shareUUID: [
                            'a344bbbb-31ec-73a4-de42-f7c2549134b1'
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });

        test('異常：カタログサービスから200以外エラー', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerStoreEvent(3001, 401);

            // 初期データの設定
            await common.executeSqlFile('initialDataStoreEvent.sql');

            // 送信データを作成
            const url = Url.postStoreEvent;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=sessionId'])
                .send(JSON.stringify(
                    {
                        type: 'share-trigger',
                        notificateCatalog: {
                            _value: 1001023,
                            _ver: 1
                        },
                        shareCode: {
                            _value: 1000500,
                            _ver: 1
                        },
                        shareUUID: [
                            'a344bbbb-31ec-73a4-de42-f7c2549134b1'
                        ]
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
    });
});
