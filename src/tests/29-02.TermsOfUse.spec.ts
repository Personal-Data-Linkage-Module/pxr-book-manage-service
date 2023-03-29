/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import Config from '../common/Config';
import StubOperatorServer from './StubOperatorServer';
import { StubCatalogServerIndTermsOfUse } from './StubCatalogServer';
import supertest = require('supertest');
const Message = Config.ReadConfig('./config/message.json');

// 対象アプリケーションを取得
const app = new Application();
const expressApp = app.express.app;
const common = new Common();

// サーバをlisten
app.start();

let _operatorServer: any;
let _catalogServer: any;
const sessionId = '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00';
const catalogErrSession = {
    sessionId: sessionId,
    operatorId: 1,
    type: 0,
    loginId: 'wf.success.pxrid',
    pxrId: 'wf.success.pxrid',
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
        await common.executeSqlFile('initialIndTermsOfUse.sql');
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
        if (_operatorServer) {
            _operatorServer._server.close();
        }
        if (_catalogServer) {
            _catalogServer._server.close();
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
     * 未同意規約取得（個人）
     */
    describe('未同意規約取得（個人）', () => {
        test('異常：正常（wf）', async () => {
            _operatorServer = new StubOperatorServer(200);
            _catalogServer = new StubCatalogServerIndTermsOfUse(200);

            // 送信データを生成
            const url = Url.termsOfUseRequestList;

            const session = {
                sessionId: sessionId,
                operatorId: 1,
                type: 0,
                loginId: 'wf.success.pxrid',
                pxrId: 'wf.success.pxrid',
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
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(session) });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
        test('正常：正常（app）', async () => {
            _operatorServer = new StubOperatorServer(200);
            _catalogServer = new StubCatalogServerIndTermsOfUse(200);

            // 送信データを生成
            const url = Url.termsOfUseRequestList;

            const session = {
                sessionId: sessionId,
                operatorId: 1,
                type: 0,
                loginId: 'app.success.pxrid',
                pxrId: 'app.success.pxrid',
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
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(session) });

            expect(response.status).toBe(200);
            expect(response.body.termsOfUse.platform._code._value).toBe(1000005);
            expect(response.body.termsOfUse.platform.expireAt).toBe('20200101T000000.000+0900');
            expect(response.body.termsOfUse.region).toBe(null);
            expect(response.body.store[0].actor._value).toBe(1000105);
            expect(response.body.store[0].app._value).toBe(9999999);
            expect(response.body.store[0]._code._value).toBe(1000307);
            expect(response.body.share[0].actor._value).toBe(1000105);
            expect(response.body.share[0].app._value).toBe(9999999);
            expect(response.body.share[0]._code._value).toBe(1000305);
        });
        test('異常：蓄積、共有カタログなし（wf）', async () => {
            _operatorServer = new StubOperatorServer(200);
            _catalogServer = new StubCatalogServerIndTermsOfUse(200);

            // 送信データを生成
            const url = Url.termsOfUseRequestList;

            const session = {
                sessionId: sessionId,
                operatorId: 1,
                type: 0,
                loginId: 'wf.success.not.share.store',
                pxrId: 'wf.success.not.share.store',
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
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(session) });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
        test('正常：蓄積、共有カタログなし（app）', async () => {
            _operatorServer = new StubOperatorServer(200);
            _catalogServer = new StubCatalogServerIndTermsOfUse(200);

            // 送信データを生成
            const url = Url.termsOfUseRequestList;

            const session = {
                sessionId: sessionId,
                operatorId: 1,
                type: 0,
                loginId: 'app.success.not.share.store',
                pxrId: 'app.success.not.share.store',
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
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(session) });

            expect(response.status).toBe(200);
            expect(response.body.termsOfUse.platform).toBe(null);
            expect(response.body.termsOfUse.region[0].actor._value).toBe(1000111);
            expect(response.body.termsOfUse.region[0].region._value).toBe(9999999);
            expect(response.body.termsOfUse.region[0]._code._value).toBe(1000011);
            expect(response.body.termsOfUse.region[0].expireAt).toBe('20200101T000000.000+0900');
            expect(response.body.store).toBe(null);
            expect(response.body.share).toBe(null);
        });
        test('正常：対象Book無し', async () => {
            _operatorServer = new StubOperatorServer(200);
            _catalogServer = new StubCatalogServerIndTermsOfUse(200);

            // 送信データを生成
            const url = Url.termsOfUseRequestList;

            const session = {
                sessionId: sessionId,
                operatorId: 1,
                type: 0,
                loginId: 'dummy.test.org',
                pxrId: 'dummy.test.org',
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
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(session) });

            expect(response.status).toBe(200);
            expect(response.body.termsOfUse.platform).toBe(null);
            expect(response.body.termsOfUse.region).toBe(null);
            expect(response.body.store).toBe(null);
            expect(response.body.share).toBe(null);
        });
        test('異常：対象利用規約カタログレコード、蓄積、共有カタログなし（wf）', async () => {
            _operatorServer = new StubOperatorServer(200);
            _catalogServer = new StubCatalogServerIndTermsOfUse(200);

            // 送信データを生成
            const url = Url.termsOfUseRequestList;

            const session = {
                sessionId: sessionId,
                operatorId: 1,
                type: 0,
                loginId: 'wf.not.store.share',
                pxrId: 'wf.not.store.share',
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
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(session) });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
        test('正常：対象利用規約カタログレコード、蓄積、共有カタログなし（app）', async () => {
            _operatorServer = new StubOperatorServer(200);
            _catalogServer = new StubCatalogServerIndTermsOfUse(200);

            // 送信データを生成
            const url = Url.termsOfUseRequestList;

            const session = {
                sessionId: sessionId,
                operatorId: 1,
                type: 0,
                loginId: 'app.not.store.share',
                pxrId: 'app.not.store.share',
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
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(session) });

            expect(response.status).toBe(200);
            expect(response.body.termsOfUse.platform).toBe(null);
            expect(response.body.termsOfUse.region).toBe(null);
            expect(response.body.store).toBe(null);
            expect(response.body.share).toBe(null);
        });
        test('異常：Cookieが存在するが空', async () => {
            _operatorServer = new StubOperatorServer(200);

            // 送信データを生成
            const url = Url.termsOfUseRequestList;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + '']);

            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常：Cookie使用、オペレータサービス応答204', async () => {
            _operatorServer = new StubOperatorServer(204);

            // 送信データを生成
            const url = Url.termsOfUseRequestList;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + sessionId]);

            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常：Cookie使用、オペレータサービス応答400', async () => {
            _operatorServer = new StubOperatorServer(400);

            // 送信データを生成
            const url = Url.termsOfUseRequestList;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + sessionId]);

            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常：Cookie使用、オペレータサービス応答500', async () => {
            _operatorServer = new StubOperatorServer(500);

            // 送信データを生成
            const url = Url.termsOfUseRequestList;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + sessionId]);

            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：セッション(オペレータサービス未起動)', async () => {
            // 送信データを生成
            const url = Url.termsOfUseRequestList;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + sessionId]);

            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常：セッションなし', async () => {
            _operatorServer = new StubOperatorServer(200);
            // 送信データを生成
            const url = Url.termsOfUseRequestList;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' });

            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常：セッション(カタログサービスエラー応答400系)', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerIndTermsOfUse(400);

            // 送信データを生成
            const url = Url.termsOfUseRequestList;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(catalogErrSession) });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常：セッション(カタログサービスエラー応答500系)', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerIndTermsOfUse(503);

            // 送信データを生成
            const url = Url.termsOfUseRequestList;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(catalogErrSession) });

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常：セッション(カタログサービスエラー応答204)', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerIndTermsOfUse(204);

            // 送信データを生成
            const url = Url.termsOfUseRequestList;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(catalogErrSession) });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常：セッション(カタログサービス未起動)', async () => {
            // 送信データを生成
            const url = Url.termsOfUseRequestList;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(catalogErrSession) });

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_CATALOG);
        });
        test('異常：データ操作定義通知管理カタログns不正(wf)', async () => {
            _operatorServer = new StubOperatorServer(200);
            _catalogServer = new StubCatalogServerIndTermsOfUse(200);

            // 送信データを生成
            const url = Url.termsOfUseRequestList;

            const session = {
                sessionId: sessionId,
                operatorId: 1,
                type: 0,
                loginId: 'wf.invalid.dataoperate.catalog.ns',
                pxrId: 'wf.invalid.dataoperate.catalog.ns',
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
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(session) });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
        test('異常：データ操作定義通知管理カタログns不正(app)', async () => {
            _operatorServer = new StubOperatorServer(200);
            _catalogServer = new StubCatalogServerIndTermsOfUse(200);

            // 送信データを生成
            const url = Url.termsOfUseRequestList;

            const session = {
                sessionId: sessionId,
                operatorId: 1,
                type: 0,
                loginId: 'app.invalid.dataoperate.catalog.ns',
                pxrId: 'app.invalid.dataoperate.catalog.ns',
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
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(session) });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
    });
});
