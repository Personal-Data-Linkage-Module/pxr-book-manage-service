/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { Session } from './Session';
import { StubCatalogServer05, StubCatalogServerReleaseCooperate, StubCatalogServerReleaseCooperateError } from './StubCatalogServer';
import { StubOperatorServer06 } from './StubOperatorServer';
import { StubIdentityServerReleaseCooperate } from './StubIdentityServer';
import Config from '../common/Config';
import StubIdServiceReleaseServer from './StubIdServiceReleaseServer';
import { EntityManager } from 'typeorm';
import EntityOperation from '../repositories/EntityOperation';
const Message = Config.ReadConfig('./config/message.json');
/* eslint-enable */

// 対象アプリケーションを取得
const app = new Application();
const expressApp = app.express.app;
const common = new Common();

// サーバをlisten
app.start();

// スタブサーバー
let _catalogServer: any = null;
let _operatorServer: StubOperatorServer06 = null;
let _identityServer: StubIdentityServerReleaseCooperate = null;
let _idServiceServer: StubIdServiceReleaseServer = null;

// 送信先URL
const url = Url.cooperateReleaseURI;

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
        // スタブサーバー停止
        if (_catalogServer) {
            _catalogServer._server.close();
            _catalogServer = null;
        }
        if (_operatorServer) {
            _operatorServer._server.close();
            _operatorServer = null;
        }
        if (_identityServer) {
            _identityServer._server.close();
            _identityServer = null;
        }
        if (_idServiceServer) {
            _idServiceServer._server.close();
            _idServiceServer = null;
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
     * 利用者ID連携解除
     */
    describe('利用者ID連携解除', () => {
        test('異常：パラメータなし', async () => {
            _catalogServer = new StubCatalogServer05(200);
            _identityServer = new StubIdentityServerReleaseCooperate(200, 'wf', '58di2dfse2.test.org', 1000007, 1, 'userid01');

            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialCooperateData.sql');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrWf) })
                .send(JSON.stringify(
                    {
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_IS_EMPTY);
        });
        test('異常：パラメータが空', async () => {
            _catalogServer = new StubCatalogServer05(200);
            _identityServer = new StubIdentityServerReleaseCooperate(200, 'wf', '58di2dfse2.test.org', 1000007, 1, 'userid01');

            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialCooperateData.sql');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrWf) })
                .send(JSON.stringify(
                    {
                        identifyCode: ''
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
        });
        test('異常：オペレータタイプが個人0', async () => {
            _catalogServer = new StubCatalogServer05(200);
            _identityServer = new StubIdentityServerReleaseCooperate(200, 'wf', '58di2dfse2.test.org', 1000007, 1, 'userid01');

            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialCooperateData.sql');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot0) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：オペレータタイプがwf(1)', async () => {
            _catalogServer = new StubCatalogServer05(200);
            _identityServer = new StubIdentityServerReleaseCooperate(200, 'wf', '58di2dfse2.test.org', 1000007, 1, 'userid01');

            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialCooperateData.sql');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot1) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：オペレータタイプがapp(2)', async () => {
            _catalogServer = new StubCatalogServer05(200);
            _identityServer = new StubIdentityServerReleaseCooperate(200, 'wf', '58di2dfse2.test.org', 1000007, 1, 'userid01');

            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialCooperateData.sql');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot2) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：wf カタログが一致しない', async () => {
            _catalogServer = new StubCatalogServer05(200);
            _identityServer = new StubIdentityServerReleaseCooperate(200, 'wf', '58di2dfse2.test.org', 1000008, 1, 'userid01');

            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialCooperateData.sql');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrWf) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
        test('異常：app カタログが一致しない', async () => {
            _catalogServer = new StubCatalogServer05(200);
            _identityServer = new StubIdentityServerReleaseCooperate(200, 'app', '58di2dfse2.test.org', 1000108, 1, 'userid02');

            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialCooperateData.sql');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrApp) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.APP_CATALOG_CODE_NOT_EXIST);
        });
        test('異常：actor カタログが一致しない', async () => {
            _catalogServer = new StubCatalogServer05(200);
            _identityServer = new StubIdentityServerReleaseCooperate(200, 'app', '58di2dfse2.test.org', 1000007, 1, 'userid01');

            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialCooperateData.sql');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.ACTOR_CATALOG_INVALID);
        });
        test('異常：MyConditionBook対象データが存在しない', async () => {
            _catalogServer = new StubCatalogServer05(200);
            _identityServer = new StubIdentityServerReleaseCooperate(200, 'app', '58di2dfse2.test.org', 1000107, 1, 'userid01');

            // 事前データ準備
            await common.executeSqlFile('initialData.sql');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrApp) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(404);
            expect(response.body.message).toBe(Message.TARGET_NO_DATA);
        });
        test('異常：カタログサービスレスポンス異常400', async () => {
            _catalogServer = new StubCatalogServer05(400);
            _identityServer = new StubIdentityServerReleaseCooperate(200, 'app', '58di2dfse2.test.org', 1000007, 1, 'userid01');

            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialCooperateData.sql');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrWf) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常：カタログサービスレスポンス異常500系', async () => {
            _catalogServer = new StubCatalogServer05(500);
            _identityServer = new StubIdentityServerReleaseCooperate(200, 'app', '58di2dfse2.test.org', 1000007, 1, 'userid01');

            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialCooperateData.sql');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrWf) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常：カタログサービスレスポンス異常200以外', async () => {
            _catalogServer = new StubCatalogServer05(204);
            _identityServer = new StubIdentityServerReleaseCooperate(200, 'app', '58di2dfse2.test.org', 1000007, 1, 'userid01');

            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialCooperateData.sql');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrWf) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常：カタログサービス接続エラー', async () => {
            _identityServer = new StubIdentityServerReleaseCooperate(200, 'app', '58di2dfse2.test.org', 1000007, 1, 'userid01');

            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialCooperateData.sql');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrWf) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_CATALOG);
        });
        test('異常：本人性確認サービスレスポンス異常400', async () => {
            _catalogServer = new StubCatalogServer05(200);
            _identityServer = new StubIdentityServerReleaseCooperate(400, 'app', '58di2dfse2.test.org', 1000007, 1, 'userid01');

            // 事前データ準備
            await common.executeSqlFile('initialData.sql');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrWf) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.FAILED_IDENTITY_GET);
        });
        test('異常：本人性確認サービスレスポンス異常500系', async () => {
            _catalogServer = new StubCatalogServer05(200);
            _identityServer = new StubIdentityServerReleaseCooperate(500, 'app', '58di2dfse2.test.org', 1000007, 1, 'userid01');

            // 事前データ準備
            await common.executeSqlFile('initialData.sql');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrWf) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_IDENTITY_GET);
        });
        test('異常：本人性確認サービスレスポンス異常200以外', async () => {
            _catalogServer = new StubCatalogServer05(200);
            _identityServer = new StubIdentityServerReleaseCooperate(204, 'app', '58di2dfse2.test.org', 1000007, 1, 'userid01');

            // 事前データ準備
            await common.executeSqlFile('initialData.sql');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrWf) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.FAILED_IDENTITY_GET);
        });
        test('異常：本人性確認サービス接続エラー', async () => {
            _catalogServer = new StubCatalogServer05(200);

            // 事前データ準備
            await common.executeSqlFile('initialData.sql');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrWf) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_IDENTITY);
        });
        test('異常：カタログにcatalogItemがない', async () => {
            _catalogServer = new StubCatalogServerReleaseCooperateError(200, 0);
            _identityServer = new StubIdentityServerReleaseCooperate(200, 'app', '58di2dfse2.test.org', 1000007, 1, 'userid01');

            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialCooperateData.sql');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrWf) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.UNDEFINED_ERROR);
        });
        test('異常：カタログtemplateにworkflowがない', async () => {
            _catalogServer = new StubCatalogServerReleaseCooperateError(200, 1);
            _identityServer = new StubIdentityServerReleaseCooperate(200, 'app', '58di2dfse2.test.org', 1000007, 1, 'userid01');

            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialCooperateData.sql');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrWf) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
        test('異常：カタログtemplateにapplicationがない', async () => {
            _catalogServer = new StubCatalogServerReleaseCooperate(200, 2);
            _identityServer = new StubIdentityServerReleaseCooperate(200, 'app', '58di2dfse2.test.org', 1000907, 1, 'userid01');

            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialCooperateData.sql');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrApp) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.APP_CATALOG_CODE_NOT_EXIST);
        });
        test('正常:IDサービスを使用しない場合', async () => {
            _catalogServer = new StubCatalogServerReleaseCooperate(200, 2);
            _identityServer = new StubIdentityServerReleaseCooperate(200, 'app', '58di2dfse2.test.org', 1000007, 1, 'userid03');

            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialCooperateData.sql');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrApp) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
        });
        test('正常:data-trader', async () => {
            _catalogServer = new StubCatalogServerReleaseCooperate(200, 7, true);
            _identityServer = new StubIdentityServerReleaseCooperate(200, null, '58di2dfse2.test.org', 1000007, 1, 'userid01');
            _idServiceServer = new StubIdServiceReleaseServer(200);

            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialCooperateData.sql');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrWf) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
        test('正常:IDサービス使用 regionコードが存在する場合', async () => {
            _catalogServer = new StubCatalogServerReleaseCooperate(200, 3, true);
            _identityServer = new StubIdentityServerReleaseCooperate(200, 'region', '58di2dfse2.test.org', 1000007, 1, 'userid02');
            _idServiceServer = new StubIdServiceReleaseServer(200);

            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialCooperateData.sql');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrApp) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
        });
        test('正常:IDサービス使用 appコードが存在する場合', async () => {
            _catalogServer = new StubCatalogServerReleaseCooperate(200, 2, true);
            _identityServer = new StubIdentityServerReleaseCooperate(200, 'app', '58di2dfse2.test.org', 1000007, 1, 'userid03');
            _idServiceServer = new StubIdServiceReleaseServer(200);

            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialCooperateData.sql');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrApp) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
        });
        test('正常:IDサービス使用 wfコードが存在する場合', async () => {
            _catalogServer = new StubCatalogServerReleaseCooperate(200, 1, true);
            _identityServer = new StubIdentityServerReleaseCooperate(200, 'wf', '58di2dfse2.test.org', 1000007, 1, 'userid01');
            _idServiceServer = new StubIdServiceReleaseServer(200);

            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialCooperateData.sql');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrWf) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
        test('異常:アクターカタログ不正（wf）', async () => {
            _catalogServer = new StubCatalogServerReleaseCooperate(200, 4);
            _identityServer = new StubIdentityServerReleaseCooperate(200, 'app', '58di2dfse2.test.org', 1000007, 1, 'userid01');

            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialCooperateData.sql');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRegion) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
        test('異常:アクターカタログ不正（app）', async () => {
            _catalogServer = new StubCatalogServerReleaseCooperate(200, 5);
            _identityServer = new StubIdentityServerReleaseCooperate(200, 'app', '58di2dfse2.test.org', 1000007, 1, 'userid01');

            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialCooperateData.sql');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRegion) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.ACTOR_CATALOG_INVALID);
        });
        test('異常:アクターカタログ不正（region）', async () => {
            _catalogServer = new StubCatalogServerReleaseCooperate(200, 6);
            _identityServer = new StubIdentityServerReleaseCooperate(200, 'region', '58di2dfse2.test.org', 1000007, 1, 'userid01');

            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialCooperateData.sql');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRegion) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.ACTOR_CATALOG_INVALID);
        });
        test('異常:アクターカタログ内に該当コード無し（region）', async () => {
            _catalogServer = new StubCatalogServerReleaseCooperate(200, 3);
            _identityServer = new StubIdentityServerReleaseCooperate(200, 'region', '58di2dfse2.test.org', 9999999, 1, 'userid01');
            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialCooperateData.sql');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRegion) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.APP_CATALOG_CODE_NOT_EXIST);
        });
        test('異常:利用者連携ステータスが2：連携解除申請中以外', async () => {
            _catalogServer = new StubCatalogServerReleaseCooperate(200, 2);
            _identityServer = new StubIdentityServerReleaseCooperate(200, 'app', 'invalidCoopStatus', 1000007, 1, 'userid01');
            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialCooperateData.sql');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrApp) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_COOP_RELEASE_REQUEST);
        });
        test('異常:利用者連携情報削除件数が0件', async () => {
            _catalogServer = new StubCatalogServerReleaseCooperate(200, 2);
            _identityServer = new StubIdentityServerReleaseCooperate(200, 'app', '58di2dfse2.test.org', 1000007, 1, 'userid03');

            // EntityOperation Mock準備
            const spy = jest.spyOn(EntityOperation, 'deleteUserIdCooperateRecordActorWfApUser')
                .mockImplementation(async (em: EntityManager, bookId: number, actorCatalogCode: number, regionCatalogCode: number, wfCatalogCode: number, appCatalogCode: number, userId: string, register: string): Promise<any> => {
                    return {
                        raw: []
                    };
                });

            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialCooperateData.sql');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrApp) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(404);
            expect(response.body.message).toBe(Message.TARGET_NO_DATA);
            spy.mockRestore();
        });
        test('異常:利用者連携情報なし', async () => {
            _catalogServer = new StubCatalogServerReleaseCooperate(200, 2);
            _identityServer = new StubIdentityServerReleaseCooperate(200, 'app', '58di2dfse2.test.org', 1000007, 1, 'userid01');

            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialCooperateData.sql');

            const session = {
                sessionId: 'sessionId',
                operatorId: 1,
                type: 3,
                loginId: 'loginid',
                name: 'test-user',
                mobilePhone: '0311112222',
                auth: {
                    member: {
                        add: true,
                        update: true,
                        delete: true
                    }
                },
                lastLoginAt: '2020-01-01T00:00:00.000+0900',
                attributes: {},
                roles: [
                    {
                        _value: 1,
                        _ver: 1
                    }
                ],
                block: {
                    _value: 1000110,
                    _ver: 1
                },
                actor: {
                    _value: 9999999,
                    _ver: 1
                }
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(session) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(503);
        });
    });
});
