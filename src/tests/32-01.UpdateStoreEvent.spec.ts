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
import { StubCatalogServerStoreEvent } from './StubCatalogServer';
import { StubOperatorServerType0 } from './StubOperatorServer';
const Message = Config.ReadConfig('./config/message.json');
/* eslint-enable */

// 対象アプリケーションを取得
const app = new Application();
const expressApp = app.express.app;
const common = new Common();
app.start();

// スタブサーバー（カタログサービス）
let _catalogServer: StubCatalogServerStoreEvent = null;
let _operatorServer: StubOperatorServerType0 = null;

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
    });
    /**
     * 各テスト実行の前処理
     */
    beforeEach(async () => {
        // DB接続
        await common.connect();
        // DB初期化
        await common.executeSqlFile('initialData.sql');
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
    });

    /**
     * 全テスト実行の後処理
     */
    afterAll(async () => {
        // サーバ停止
        app.stop();
    });

    /**
     * 蓄積イベント通知定義更新 API
     */
    describe('蓄積イベント通知定義更新', () => {
        test('正常', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.postStoreEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(JSON.stringify({
                    type: 'store-event',
                    notificateCatalog: {
                        _value: 100211,
                        _ver: 1
                    },
                    shareCode: {
                        _value: 1000465,
                        _ver: 1
                    },
                    shareUUID: [
                        'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09',
                        '507bff6c-4842-c3d2-a288-df88698d446e',
                        '69db43f2-6643-19e9-117c-4bdece4bddd7'
                    ]
                }));

            expect(response.status).toBe(200);
        });
        test('パラメータ不足：type', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.postStoreEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(JSON.stringify({
                    notificateCatalog: {
                        _value: 100211,
                        _ver: 1
                    },
                    shareCode: {
                        _value: 1000465,
                        _ver: 1
                    },
                    shareUUID: [
                        'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09'
                    ]
                }));

            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('type');
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：type、空', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.postStoreEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(JSON.stringify({
                    type: '',
                    notificateCatalog: {
                        _value: 100211,
                        _ver: 1
                    },
                    shareCode: {
                        _value: 1000465,
                        _ver: 1
                    },
                    shareUUID: [
                        'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09'
                    ]
                }));

            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('type');
            expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
        });
        test('パラメータ異常：type、null', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.postStoreEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(JSON.stringify({
                    type: '',
                    notificateCatalog: {
                        _value: 100211,
                        _ver: 1
                    },
                    shareCode: {
                        _value: 1000465,
                        _ver: 1
                    },
                    shareUUID: [
                        'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09'
                    ]
                }));

            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('type');
            expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
        });
        test('パラメータ異常：type、文字列以外', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.postStoreEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(JSON.stringify({
                    type: true,
                    notificateCatalog: {
                        _value: 100211,
                        _ver: 1
                    },
                    shareCode: {
                        _value: 1000465,
                        _ver: 1
                    },
                    shareUUID: [
                        'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09'
                    ]
                }));

            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('type');
            expect(response.body.reasons[0].message).toBe(Message.validation.isString);
        });
        test('パラメータ不足：notificateCatalog', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.postStoreEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(JSON.stringify({
                    type: 'store-event',
                    shareCode: {
                        _value: 1000465,
                        _ver: 1
                    },
                    shareUUID: [
                        'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09'
                    ]
                }));

            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('notificateCatalog');
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：notificateCatalog、空', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.postStoreEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(JSON.stringify({
                    type: 'store-event',
                    notificateCatalog: '',
                    shareCode: {
                        _value: 1000465,
                        _ver: 1
                    },
                    shareUUID: [
                        'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09'
                    ]
                }));

            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('notificateCatalog');
            expect(response.body.reasons[0].message).toBe(Message.validation.nestedValidation);
        });
        test('パラメータ不足：notificateCatalog._value', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.postStoreEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(JSON.stringify({
                    type: 'store-event',
                    notificateCatalog: {
                        _ver: 1
                    },
                    shareCode: {
                        _value: 1000465,
                        _ver: 1
                    },
                    shareUUID: [
                        'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09'
                    ]
                }));

            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('_value');
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：notificateCatalog._value、null', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.postStoreEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(JSON.stringify({
                    type: 'store-event',
                    notificateCatalog: {
                        _value: null,
                        _ver: 1
                    },
                    shareCode: {
                        _value: 1000465,
                        _ver: 1
                    },
                    shareUUID: [
                        'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09'
                    ]
                }));

            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('_value');
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：notificateCatalog._value、数値以外', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.postStoreEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(JSON.stringify({
                    type: 'store-event',
                    notificateCatalog: {
                        _value: 'a',
                        _ver: 1
                    },
                    shareCode: {
                        _value: 1000465,
                        _ver: 1
                    },
                    shareUUID: [
                        'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09'
                    ]
                }));

            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('_value');
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：notificateCatalog._ver', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.postStoreEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(JSON.stringify({
                    type: 'store-event',
                    notificateCatalog: {
                        _value: 100211
                    },
                    shareCode: {
                        _value: 1000465,
                        _ver: 1
                    },
                    shareUUID: [
                        'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09'
                    ]
                }));

            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('_ver');
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：notificateCatalog._ver、null', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.postStoreEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(JSON.stringify({
                    type: 'store-event',
                    notificateCatalog: {
                        _value: 100211,
                        _ver: null
                    },
                    shareCode: {
                        _value: 1000465,
                        _ver: 1
                    },
                    shareUUID: [
                        'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09'
                    ]
                }));

            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('_ver');
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：notificateCatalog._ver、数値以外', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.postStoreEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(JSON.stringify({
                    type: 'store-event',
                    notificateCatalog: {
                        _value: 100211,
                        _ver: 'a'
                    },
                    shareCode: {
                        _value: 1000465,
                        _ver: 1
                    },
                    shareUUID: [
                        'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09'
                    ]
                }));

            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('_ver');
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：shareCode', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.postStoreEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(JSON.stringify({
                    type: 'store-event',
                    notificateCatalog: {
                        _value: 100211,
                        _ver: 1
                    },
                    shareUUID: [
                        'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09'
                    ]
                }));

            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('shareCode');
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：shareCode、空', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.postStoreEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(JSON.stringify({
                    type: 'store-event',
                    notificateCatalog: {
                        _value: 100211,
                        _ver: 1
                    },
                    shareCode: '',
                    shareUUID: [
                        'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09'
                    ]
                }));

            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('shareCode');
            expect(response.body.reasons[0].message).toBe(Message.validation.nestedValidation);
        });
        test('パラメータ不足：shareCode._value', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.postStoreEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(JSON.stringify({
                    type: 'store-event',
                    notificateCatalog: {
                        _value: 100211,
                        _ver: 1
                    },
                    shareCode: {
                        _ver: 1
                    },
                    shareUUID: [
                        'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09'
                    ]
                }));

            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('_value');
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：shareCode._value、null', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.postStoreEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(JSON.stringify({
                    type: 'store-event',
                    notificateCatalog: {
                        _value: 100211,
                        _ver: 1
                    },
                    shareCode: {
                        _value: null,
                        _ver: 1
                    },
                    shareUUID: [
                        'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09'
                    ]
                }));

            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('_value');
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：shareCode._value、数値以外', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.postStoreEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(JSON.stringify({
                    type: 'store-event',
                    notificateCatalog: {
                        _value: 100211,
                        _ver: 1
                    },
                    shareCode: {
                        _value: 'a',
                        _ver: 1
                    },
                    shareUUID: [
                        'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09'
                    ]
                }));

            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('_value');
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：shareCode._ver', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.postStoreEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(JSON.stringify({
                    type: 'store-event',
                    notificateCatalog: {
                        _value: 100211,
                        _ver: 1
                    },
                    shareCode: {
                        _value: 1000465
                    },
                    shareUUID: [
                        'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09'
                    ]
                }));

            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('_ver');
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：shareCode._ver、null', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.postStoreEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(JSON.stringify({
                    type: 'store-event',
                    notificateCatalog: {
                        _value: 100211,
                        _ver: 1
                    },
                    shareCode: {
                        _value: 1000465,
                        _ver: null
                    },
                    shareUUID: [
                        'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09'
                    ]
                }));

            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('_ver');
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：shareCode._ver、数値以外', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.postStoreEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(JSON.stringify({
                    type: 'store-event',
                    notificateCatalog: {
                        _value: 100211,
                        _ver: 1
                    },
                    shareCode: {
                        _value: 1000465,
                        _ver: 'a'
                    },
                    shareUUID: [
                        'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09'
                    ]
                }));

            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('_ver');
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：shareUUID', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.postStoreEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(JSON.stringify({
                    type: 'store-event',
                    notificateCatalog: {
                        _value: 100211,
                        _ver: 1
                    },
                    shareCode: {
                        _value: 1000465,
                        _ver: 1
                    }
                }));

            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('shareUuid');
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：shareUUID、空', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.postStoreEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(JSON.stringify({
                    type: 'store-event',
                    notificateCatalog: {
                        _value: 100211,
                        _ver: 1
                    },
                    shareCode: {
                        _value: 1000465,
                        _ver: 1
                    },
                    shareUUID: ''
                }));

            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('shareUuid');
            expect(response.body.reasons[0].message).toBe(Message.validation.isUuid);
        });
        test('パラメータ異常：shareUUID、配列以外', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.postStoreEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(JSON.stringify({
                    type: 'store-event',
                    notificateCatalog: {
                        _value: 100211,
                        _ver: 1
                    },
                    shareCode: {
                        _value: 1000465,
                        _ver: 1
                    },
                    shareUUID: 'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09'
                }));

            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('shareUuid');
            expect(response.body.reasons[0].message).toBe(Message.validation.isArray);
        });
        test('パラメータ異常：shareUUID、要素がUUID以外', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.postStoreEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(JSON.stringify({
                    type: 'store-event',
                    notificateCatalog: {
                        _value: 100211,
                        _ver: 1
                    },
                    shareCode: {
                        _value: 1000465,
                        _ver: 1
                    },
                    shareUUID: [
                        'dummy'
                    ]
                }));

            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('shareUuid');
            expect(response.body.reasons[0].message).toBe(Message.validation.isUuid);
        });
        test('パラメータ異常：shareUUID、要素がUUID以外（複数要素）', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.postStoreEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(JSON.stringify({
                    type: 'store-event',
                    notificateCatalog: {
                        _value: 100211,
                        _ver: 1
                    },
                    shareCode: {
                        _value: 1000465,
                        _ver: 1
                    },
                    shareUUID: [
                        'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09',
                        'dummy'
                    ]
                }));

            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('shareUuid');
            expect(response.body.reasons[0].message).toBe(Message.validation.isUuid);
        });
        test('異常：Cookieが存在するが空', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);
            _operatorServer = new StubOperatorServerType0(200, 0);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.postStoreEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type1_session=' + ''])
                .send(JSON.stringify({
                    type: 'store-event',
                    notificateCatalog: {
                        _value: 100211,
                        _ver: 1
                    },
                    shareCode: {
                        _value: 1000465,
                        _ver: 1
                    },
                    shareUUID: [
                        'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09',
                        '507bff6c-4842-c3d2-a288-df88698d446e',
                        '69db43f2-6643-19e9-117c-4bdece4bddd7'
                    ]
                }));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_SESSION);
        });
        test('異常：Cookie使用, オペレータサービス応答400', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);
            _operatorServer = new StubOperatorServerType0(400, 0);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.postStoreEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type2_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(JSON.stringify({
                    type: 'store-event',
                    notificateCatalog: {
                        _value: 100211,
                        _ver: 1
                    },
                    shareCode: {
                        _value: 1000465,
                        _ver: 1
                    },
                    shareUUID: [
                        'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09',
                        '507bff6c-4842-c3d2-a288-df88698d446e',
                        '69db43f2-6643-19e9-117c-4bdece4bddd7'
                    ]
                }));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.IS_NOT_AUTHORIZATION_SESSION);
        });
        test('異常：Cookie使用, オペレータサービス応答204', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);
            _operatorServer = new StubOperatorServerType0(204, 0);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.postStoreEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type2_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(JSON.stringify({
                    type: 'store-event',
                    notificateCatalog: {
                        _value: 100211,
                        _ver: 1
                    },
                    shareCode: {
                        _value: 1000465,
                        _ver: 1
                    },
                    shareUUID: [
                        'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09',
                        '507bff6c-4842-c3d2-a288-df88698d446e',
                        '69db43f2-6643-19e9-117c-4bdece4bddd7'
                    ]
                }));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.IS_NOT_AUTHORIZATION_SESSION);
        });
        test('異常：Cookie使用, オペレータサービス応答500', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);
            _operatorServer = new StubOperatorServerType0(500, 0);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.postStoreEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type2_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(JSON.stringify({
                    type: 'store-event',
                    notificateCatalog: {
                        _value: 100211,
                        _ver: 1
                    },
                    shareCode: {
                        _value: 1000465,
                        _ver: 1
                    },
                    shareUUID: [
                        'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09',
                        '507bff6c-4842-c3d2-a288-df88698d446e',
                        '69db43f2-6643-19e9-117c-4bdece4bddd7'
                    ]
                }));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：セッション(オペレータサービス未起動)', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.postStoreEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type2_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(JSON.stringify({
                    type: 'store-event',
                    notificateCatalog: {
                        _value: 100211,
                        _ver: 1
                    },
                    shareCode: {
                        _value: 1000465,
                        _ver: 1
                    },
                    shareUUID: [
                        'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09',
                        '507bff6c-4842-c3d2-a288-df88698d446e',
                        '69db43f2-6643-19e9-117c-4bdece4bddd7'
                    ]
                }));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常：セッションなし', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerStoreEvent(3001, 200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.postStoreEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(JSON.stringify({
                    type: 'store-event',
                    notificateCatalog: {
                        _value: 100211,
                        _ver: 1
                    },
                    shareCode: {
                        _value: 1000465,
                        _ver: 1
                    },
                    shareUUID: [
                        'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09',
                        '507bff6c-4842-c3d2-a288-df88698d446e',
                        '69db43f2-6643-19e9-117c-4bdece4bddd7'
                    ]
                }));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_SESSION);
        });
        test('異常：セッション(カタログサービスエラー応答400系)', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerStoreEvent(3001, 400);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.postStoreEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.getIndBook) })
                .send(JSON.stringify({
                    type: 'store-event',
                    notificateCatalog: {
                        _value: 100211,
                        _ver: 1
                    },
                    shareCode: {
                        _value: 1000465,
                        _ver: 1
                    },
                    shareUUID: [
                        'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09',
                        '507bff6c-4842-c3d2-a288-df88698d446e',
                        '69db43f2-6643-19e9-117c-4bdece4bddd7'
                    ]
                }));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常：セッション(カタログサービスエラー応答500系)', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerStoreEvent(3001, 503);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.postStoreEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.getIndBook) })
                .send(JSON.stringify({
                    type: 'store-event',
                    notificateCatalog: {
                        _value: 100211,
                        _ver: 1
                    },
                    shareCode: {
                        _value: 1000465,
                        _ver: 1
                    },
                    shareUUID: [
                        'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09',
                        '507bff6c-4842-c3d2-a288-df88698d446e',
                        '69db43f2-6643-19e9-117c-4bdece4bddd7'
                    ]
                }));

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常：セッション(カタログサービスエラー応答204)', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerStoreEvent(3001, 204);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.postStoreEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.getIndBook) })
                .send(JSON.stringify({
                    type: 'store-event',
                    notificateCatalog: {
                        _value: 100211,
                        _ver: 1
                    },
                    shareCode: {
                        _value: 1000465,
                        _ver: 1
                    },
                    shareUUID: [
                        'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09',
                        '507bff6c-4842-c3d2-a288-df88698d446e',
                        '69db43f2-6643-19e9-117c-4bdece4bddd7'
                    ]
                }));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常：セッション(カタログサービス未起動)', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.postStoreEvent)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.getIndBook) })
                .send(JSON.stringify({
                    type: 'store-event',
                    notificateCatalog: {
                        _value: 100211,
                        _ver: 1
                    },
                    shareCode: {
                        _value: 1000465,
                        _ver: 1
                    },
                    shareUUID: [
                        'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09',
                        '507bff6c-4842-c3d2-a288-df88698d446e',
                        '69db43f2-6643-19e9-117c-4bdece4bddd7'
                    ]
                }));

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_CATALOG);
        });
    });
});
