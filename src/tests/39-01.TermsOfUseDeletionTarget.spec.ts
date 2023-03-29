/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Application } from '../resources/config/Application';
import supertest = require('supertest');
import Common, { Url } from './Common';
import Config from '../common/Config';
import { StubOperatorServerType0 } from './StubOperatorServer';
import { StubTermsOfUseCatalogServer } from './StubCatalogServer';
import { Session } from './Session';
/* eslint-enable */
const Message = Config.ReadConfig('./config/message.json');

const app = new Application();
const expressApp = app.express.app;
const common = new Common();
app.start();

let _operatorServer: StubOperatorServerType0;
let _catalogServer: StubTermsOfUseCatalogServer;

describe('book-mange API', () => {
    /**
     * 全テスト実行の前処理
     */
    beforeAll(async () => {
        await common.connect();
        await common.executeSqlFile('initialData.sql');
        await common.executeSqlFile('initialTermsOfUseDeletionTarget.sql');
    });
    /**
     * 全テスト実行の後処理
     */
    afterAll(async () => {
        app.stop();
    });
    /**
     * 各テスト実行の後処理
     */
    afterEach(async () => {
        // スタブサーバー停止
        if (_operatorServer) {
            _operatorServer._server.close();
        }
        if (_catalogServer) {
            _catalogServer._server.close();
        }
    });

    /**
     * Region利用規約未同意個人取得
     */
    describe('Region利用規約未同意個人取得', () => {
        test('正常：Cookie使用、運営', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubTermsOfUseCatalogServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.termsOfUseRegion + '/deletion/target?offset=0&limit=10')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({
                offset: 9,
                targets: [
                    {
                        bookId: 1,
                        pxrId: 'dummy.test.org',
                        cooperation_release: true,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000210,
                            _ver: 1
                        },
                        app: []
                    }
                ]
            });
        });
        test('正常：（セッション）運営, limit=1', async () => {
            _catalogServer = new StubTermsOfUseCatalogServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.termsOfUseRegion + '/deletion/target?offset=0&limit=1')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({
                offset: 1,
                targets: [
                    {
                        bookId: 1,
                        pxrId: 'dummy.test.org',
                        cooperation_release: true,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000210,
                            _ver: 1
                        },
                        app: []
                    }
                ]
            });
        });
        test('正常：対象なし', async () => {
            _catalogServer = new StubTermsOfUseCatalogServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.termsOfUseRegion + '/deletion/target')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.targets).toBe(null);
        });
        test('異常：Cookie使用、個人', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 0);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.termsOfUseRegion + '/deletion/target?offset=0&limit=10')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：Cookie使用、ワークフロー', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 1);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.termsOfUseRegion + '/deletion/target?offset=0&limit=10')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type1_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_SESSION);
        });
        test('異常：Cookie使用、アプリケーション', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 2);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.termsOfUseRegion + '/deletion/target?offset=0&limit=10')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type2_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：セッション(個人)', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.termsOfUseRegion + '/deletion/target?offset=0&limit=10')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：セッション(ワークフロー)', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.termsOfUseRegion + '/deletion/target?offset=0&limit=10')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot1) });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：セッション(アプリケーション)', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.termsOfUseRegion + '/deletion/target?offset=0&limit=10')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot2) });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：Cookieが存在するが空', async () => {
            // スタブサーバーを起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.termsOfUseRegion + '/deletion/target?offset=0&limit=10')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_SESSION);
        });
        test('異常：Cookie使用、オペレータサービス応答204', async () => {
            // スタブサーバーを起動
            _operatorServer = new StubOperatorServerType0(204, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.termsOfUseRegion + '/deletion/target?offset=0&limit=10')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.IS_NOT_AUTHORIZATION_SESSION);
        });
        test('異常：Cookie使用、オペレータサービス応答400系', async () => {
            // スタブサーバーを起動
            _operatorServer = new StubOperatorServerType0(400, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.termsOfUseRegion + '/deletion/target?offset=0&limit=10')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.IS_NOT_AUTHORIZATION_SESSION);
        });
        test('異常：Cookie使用、オペレータサービス応答500系', async () => {
            // スタブサーバーを起動
            _operatorServer = new StubOperatorServerType0(500, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.termsOfUseRegion + '/deletion/target?offset=0&limit=10')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：セッション(オペレータサービス未起動)', async () => {
            // スタブサーバーを起動しない

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.termsOfUseRegion + '/deletion/target?offset=0&limit=10')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常：セッションなし', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.termsOfUseRegion + '/deletion/target?offset=0&limit=10')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_SESSION);
        });
        test('異常：セッション(カタログサービスエラー応答400系)', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubTermsOfUseCatalogServer(400);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.termsOfUseRegion + '/deletion/target?offset=0&limit=10')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常：セッション(カタログサービスエラー応答500系)', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubTermsOfUseCatalogServer(500);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.termsOfUseRegion + '/deletion/target?offset=0&limit=10')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) });

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常：セッション(カタログサービスエラー応答204)', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubTermsOfUseCatalogServer(204);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.termsOfUseRegion + '/deletion/target?offset=0&limit=10')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常：セッション(カタログサービス未起動)', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.termsOfUseRegion + '/deletion/target?offset=0&limit=10')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) });

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_CATALOG);
        });
        test('正常：Cookie使用、運営', async () => {
            // データ準備
            await common.executeSqlString(`
                INSERT INTO pxr_book_manage.user_id_cooperate
                (
                    book_id, actor_catalog_code, actor_catalog_version, app_catalog_code, app_catalog_version, wf_catalog_code, wf_catalog_version, region_catalog_code, region_catalog_version,
                    user_id, status, is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    3, 1000002, 1, null, null, null, null, 1000209, 1,
                    'userid01', 1, false, 'pxr_user', NOW(), 'pxr_user', NOW()
                );
                INSERT INTO pxr_book_manage.terms_of_use_notification
                (
                    terms_type, _value, _ver, status,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    2, 1001017, 1, 0,
                    false, 'pxr_user', NOW(), 'pxr_user', NOW()
                );
                INSERT INTO pxr_book_manage.terms_of_use_notification_ind
                (
                    terms_of_use_notification_id, book_id, status, last_sent_at,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    9, 3, 0, '2020-01-01T00:00:00.000+0900',
                    false, 'pxr_user', NOW(), 'pxr_user', NOW()
                );
            `);

            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubTermsOfUseCatalogServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.termsOfUseRegion + '/deletion/target?offset=0&limit=10')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
    });

    /**
     * PF利用規約未同意個人取得
     */
    describe('PF利用規約未同意個人取得', () => {
        test('正常：Cookie使用、運営', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubTermsOfUseCatalogServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.termsOfUsePlatform + '/deletion/target?offset=0&limit=10')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({
                offset: 2,
                targets: [
                    {
                        bookId: 1,
                        pxrId: 'dummy.test.org'
                    }
                ]
            });
        });
        test('正常：（セッション）運営', async () => {
            _catalogServer = new StubTermsOfUseCatalogServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.termsOfUsePlatform + '/deletion/target?offset=0&limit=1')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({
                offset: 1,
                targets: [
                    {
                        bookId: 1,
                        pxrId: 'dummy.test.org'
                    }
                ]
            });
        });
        test('正常：対象なし', async () => {
            _catalogServer = new StubTermsOfUseCatalogServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.termsOfUsePlatform + '/deletion/target')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.targets).toBe(null);
        });
        test('異常：Cookie使用、個人', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 0);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.termsOfUsePlatform + '/deletion/target?offset=0&limit=10')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：Cookie使用、ワークフロー', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 1);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.termsOfUsePlatform + '/deletion/target?offset=0&limit=10')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type1_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_SESSION);
        });
        test('異常：Cookie使用、アプリケーション', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 2);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.termsOfUsePlatform + '/deletion/target?offset=0&limit=10')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type2_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：セッション(個人)', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.termsOfUsePlatform + '/deletion/target?offset=0&limit=10')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：セッション(ワークフロー)', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.termsOfUsePlatform + '/deletion/target?offset=0&limit=10')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot1) });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：セッション(アプリケーション)', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.termsOfUsePlatform + '/deletion/target?offset=0&limit=10')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot2) });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：Cookieが存在するが空', async () => {
            // スタブサーバーを起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.termsOfUsePlatform + '/deletion/target?offset=0&limit=10')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_SESSION);
        });
        test('異常：Cookie使用、オペレータサービス応答204', async () => {
            // スタブサーバーを起動
            _operatorServer = new StubOperatorServerType0(204, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.termsOfUsePlatform + '/deletion/target?offset=0&limit=10')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.IS_NOT_AUTHORIZATION_SESSION);
        });
        test('異常：Cookie使用、オペレータサービス応答400系', async () => {
            // スタブサーバーを起動
            _operatorServer = new StubOperatorServerType0(400, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.termsOfUsePlatform + '/deletion/target?offset=0&limit=10')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.IS_NOT_AUTHORIZATION_SESSION);
        });
        test('異常：Cookie使用、オペレータサービス応答500系', async () => {
            // スタブサーバーを起動
            _operatorServer = new StubOperatorServerType0(500, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.termsOfUsePlatform + '/deletion/target?offset=0&limit=10')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：セッション(オペレータサービス未起動)', async () => {
            // スタブサーバーを起動しない

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.termsOfUsePlatform + '/deletion/target?offset=0&limit=10')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常：セッションなし', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.termsOfUsePlatform + '/deletion/target?offset=0&limit=10')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_SESSION);
        });
        test('異常：セッション(カタログサービスエラー応答400系)', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubTermsOfUseCatalogServer(400);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.termsOfUsePlatform + '/deletion/target?offset=0&limit=10')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常：セッション(カタログサービスエラー応答500系)', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubTermsOfUseCatalogServer(500);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.termsOfUsePlatform + '/deletion/target?offset=0&limit=10')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) });

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常：セッション(カタログサービスエラー応答204)', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubTermsOfUseCatalogServer(204);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.termsOfUsePlatform + '/deletion/target?offset=0&limit=10')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常：セッション(カタログサービス未起動)', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.termsOfUsePlatform + '/deletion/target?offset=0&limit=10')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) });

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_CATALOG);
        });
    });
});
