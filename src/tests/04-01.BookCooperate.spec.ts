/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { Session } from './Session';
import StubCatalogServer, { StubCatalogServerNoIdService } from './StubCatalogServer';
import StubIdentityServer, { StubIdentityServer03 } from './StubIdentityServer';
import StubIdServiceServer from './StubIdServiceServer';
import { StubOperatorServerType0 } from './StubOperatorServer';
import Config from '../common/Config';
const Message = Config.ReadConfig('./config/message.json');

// 対象アプリケーションを取得
const app = new Application();
const expressApp = app.express.app;
const common = new Common();

// サーバをlisten
app.start();

// スタブサーバー（カタログサービス）
let _catalogServer: StubCatalogServer = null;
let _identityServer: StubIdentityServer = null;
let _identityServerInd: StubIdentityServer03 = null;
let _operatorServer: StubOperatorServerType0 = null;
let _idServiceServer: StubIdServiceServer = null;

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
        if (_identityServer) {
            _identityServer._server.close();
            _identityServer = null;
        }
        if (_identityServerInd) {
            _identityServerInd._server.close();
            _identityServerInd = null;
        }
        if (_operatorServer) {
            _operatorServer._server.close();
            _operatorServer = null;
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
     * 利用者ID連携
     */
    describe('利用者ID連携', () => {
        test('正常：MyConditionBookデータあり', async () => {
            _catalogServer = new StubCatalogServer(3001, 1000374, 200);
            _identityServer = new StubIdentityServer(200, false, '123');
            _idServiceServer = new StubIdServiceServer(200);

            // 事前データ準備
            await common.executeSqlString(`
            DELETE FROM pxr_book_manage.user_id_cooperate;
            DELETE FROM pxr_book_manage.my_condition_book;
            SELECT SETVAL('pxr_book_manage.my_condition_book_id_seq', 1, false);
            SELECT SETVAL('pxr_book_manage.user_id_cooperate_id_seq', 1, false);
            
            INSERT INTO pxr_book_manage.my_condition_book
            (
                pxr_id,
                attributes,
                is_disabled,
                created_by,
                created_at,
                updated_by,
                updated_at
            )
            VALUES
            (
                '123',
                'aaa',
                false,
                'pxr_user',
                NOW(),
                'pxr_user',
                NOW()
            );
            INSERT INTO pxr_book_manage.user_id_cooperate
            (
                book_id,
                actor_catalog_code,
                actor_catalog_version,
                app_catalog_code,
                app_catalog_version,
                wf_catalog_code,
                wf_catalog_version,
                user_id,
                status,
                start_at,
                is_disabled,
                created_by,
                created_at,
                updated_by,
                updated_at
            )
            VALUES
            (
                1,
                1000003,
                1,
                1000004,
                1,
                null,
                null,
                '123456789',
                0,
                null,
                false,
                'pxr_user',
                NOW(),
                'pxr_user',
                NOW()
            );
            `);

            // 送信データを生成
            const url = Url.cooperateURI;

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
            expect(response.status).toBe(200);
            expect(response.body.actor._value).toBe(1000003);
            expect(response.body.actor._ver).toBe(1);
            expect(response.body.app._value).toBe(1000004);
            expect(response.body.app._ver).toBe(1);
            expect(response.body.userId).toBe('123456789');
        });
        test('正常：セッション情報がある（Appプロバイダー）', async () => {
            _catalogServer = new StubCatalogServer(3001, 1000374, 200);
            _identityServer = new StubIdentityServer(200, true, '123');
            _operatorServer = new StubOperatorServerType0(200, 3);
            _idServiceServer = new StubIdServiceServer(200);

            // 事前データ準備
            await common.executeSqlString(`
            DELETE FROM pxr_book_manage.user_id_cooperate;
            DELETE FROM pxr_book_manage.my_condition_book;
            SELECT SETVAL('pxr_book_manage.my_condition_book_id_seq', 1, false);
            SELECT SETVAL('pxr_book_manage.user_id_cooperate_id_seq', 1, false);
            INSERT INTO pxr_book_manage.my_condition_book
            (
                pxr_id,
                attributes,
                is_disabled,
                created_by,
                created_at,
                updated_by,
                updated_at
            )
            VALUES
            (
                '123',
                'aaa',
                false,
                'pxr_user',
                NOW(),
                'pxr_user',
                NOW()
            );
            INSERT INTO pxr_book_manage.user_id_cooperate
            (
                book_id,
                actor_catalog_code,
                actor_catalog_version,
                app_catalog_code,
                app_catalog_version,
                wf_catalog_code,
                wf_catalog_version,
                user_id,
                status,
                start_at,
                is_disabled,
                created_by,
                created_at,
                updated_by,
                updated_at
            )
            VALUES
            (
                1,
                1000003,
                1,
                1000004,
                1,
                null,
                null,
                '123456789',
                0,
                null,
                false,
                'pxr_user',
                NOW(),
                'pxr_user',
                NOW()
            );
            `);

            // 送信データを生成
            const url = Url.cooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type2_session=sessionId'])
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo22'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.actor._value).toBe(1000003);
            expect(response.body.actor._ver).toBe(1);
            expect(response.body.app._value).toBe(1000004);
            expect(response.body.app._ver).toBe(1);
            expect(response.body.userId).toBe('123456789');
        });
        test('正常：セッション情報がある（運営メンバー）', async () => {
            _catalogServer = new StubCatalogServer(3001, 1000374, 200);
            _identityServer = new StubIdentityServer(200, true, 'region');
            _operatorServer = new StubOperatorServerType0(200, 3);
            _idServiceServer = new StubIdServiceServer(200);

            // 事前データ準備
            await common.executeSqlString(`
            DELETE FROM pxr_book_manage.user_id_cooperate;
            DELETE FROM pxr_book_manage.my_condition_book;
            SELECT SETVAL('pxr_book_manage.my_condition_book_id_seq', 1, false);
            SELECT SETVAL('pxr_book_manage.user_id_cooperate_id_seq', 1, false);
            INSERT INTO pxr_book_manage.my_condition_book
            (
                pxr_id,
                attributes,
                is_disabled,
                created_by,
                created_at,
                updated_by,
                updated_at
            )
            VALUES
            (
                'region',
                'aaa',
                false,
                'pxr_user',
                NOW(),
                'pxr_user',
                NOW()
            );
            INSERT INTO pxr_book_manage.user_id_cooperate
            (
                book_id,
                actor_catalog_code,
                actor_catalog_version,
                app_catalog_code,
                app_catalog_version,
                wf_catalog_code,
                wf_catalog_version,
                region_catalog_code,
                region_catalog_version,
                user_id,
                status,
                start_at,
                is_disabled,
                created_by,
                created_at,
                updated_by,
                updated_at
            )
            VALUES
            (
                1,
                1000003,
                1,
                null,
                null,
                null,
                null,
                1000004,
                1,
                '123456789',
                0,
                null,
                false,
                'pxr_user',
                NOW(),
                'pxr_user',
                NOW()
            );
            `);

            // 送信データを生成
            const url = Url.cooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=sessionId'])
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo23'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.actor._value).toBe(1000003);
            expect(response.body.actor._ver).toBe(1);
            expect(response.body.region._value).toBe(1000004);
            expect(response.body.region._ver).toBe(1);
            expect(response.body.userId).toBe('123456789');
        });
        test('正常：セッション情報がある（個人）', async () => {
            _catalogServer = new StubCatalogServer(3001, 1000374, 200);
            _identityServerInd = new StubIdentityServer03(200, true, '123');
            _idServiceServer = new StubIdServiceServer(200);

            // 事前データ準備
            await common.executeSqlString(`
            DELETE FROM pxr_book_manage.user_id_cooperate;
            DELETE FROM pxr_book_manage.my_condition_book;
            SELECT SETVAL('pxr_book_manage.my_condition_book_id_seq', 1, false);
            SELECT SETVAL('pxr_book_manage.user_id_cooperate_id_seq', 1, false);
            
            INSERT INTO pxr_book_manage.my_condition_book
            (
                pxr_id,
                attributes,
                is_disabled,
                created_by,
                created_at,
                updated_by,
                updated_at
            )
            VALUES
            (
                '123',
                'aaa',
                false,
                'pxr_user',
                NOW(),
                'pxr_user',
                NOW()
            );
            INSERT INTO pxr_book_manage.user_id_cooperate
            (
                book_id,
                actor_catalog_code,
                actor_catalog_version,
                app_catalog_code,
                app_catalog_version,
                wf_catalog_code,
                wf_catalog_version,
                user_id,
                status,
                start_at,
                is_disabled,
                created_by,
                created_at,
                updated_by,
                updated_at
            )
            VALUES
            (
                1,
                1000103,
                1,
                1000104,
                1,
                null,
                null,
                '123456789',
                0,
                null,
                false,
                'pxr_user',
                NOW(),
                'pxr_user',
                NOW()
            );
            `);

            // 送信データを生成
            const url = Url.cooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot0) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo25'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.actor._value).toBe(1000103);
            expect(response.body.actor._ver).toBe(1);
            expect(response.body.userId).toBe('123456789');
        });
        test('異常：利用者連携データ不正', async () => {
            _catalogServer = new StubCatalogServer(3001, 1000374, 200);
            _identityServer = new StubIdentityServer(200, true, 'notOrgId');
            _operatorServer = new StubOperatorServerType0(200, 3);
            _idServiceServer = new StubIdServiceServer(200);

            // 事前データ準備
            await common.executeSqlString(`
            DELETE FROM pxr_book_manage.user_id_cooperate;
            DELETE FROM pxr_book_manage.my_condition_book;
            SELECT SETVAL('pxr_book_manage.my_condition_book_id_seq', 1, false);
            SELECT SETVAL('pxr_book_manage.user_id_cooperate_id_seq', 1, false);
            INSERT INTO pxr_book_manage.my_condition_book
            (
                pxr_id,
                attributes,
                is_disabled,
                created_by,
                created_at,
                updated_by,
                updated_at
            )
            VALUES
            (
                'notOrgId',
                'aaa',
                false,
                'pxr_user',
                NOW(),
                'pxr_user',
                NOW()
            );
            INSERT INTO pxr_book_manage.user_id_cooperate
            (
                book_id,
                actor_catalog_code,
                actor_catalog_version,
                app_catalog_code,
                app_catalog_version,
                wf_catalog_code,
                wf_catalog_version,
                region_catalog_code,
                region_catalog_version,
                user_id,
                status,
                start_at,
                is_disabled,
                created_by,
                created_at,
                updated_by,
                updated_at
            )
            VALUES
            (
                1,
                1000003,
                1,
                null,
                null,
                null,
                null,
                null,
                null,
                '123456789',
                0,
                null,
                false,
                'pxr_user',
                NOW(),
                'pxr_user',
                NOW()
            );
            `);

            // 送信データを生成
            const url = Url.cooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=sessionId'])
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo23'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.EMPTY_REGION_AND_APP);
        });
        test('異常：本人性確認データにwfのコードが含まれる', async () => {
            _catalogServer = new StubCatalogServer(3001, 1000374, 200);
            _identityServer = new StubIdentityServer(200, true, 'wf');
            _operatorServer = new StubOperatorServerType0(200, 3);
            _idServiceServer = new StubIdServiceServer(200);

            // 事前データ準備
            await common.executeSqlString(`
            DELETE FROM pxr_book_manage.user_id_cooperate;
            DELETE FROM pxr_book_manage.my_condition_book;
            SELECT SETVAL('pxr_book_manage.my_condition_book_id_seq', 1, false);
            SELECT SETVAL('pxr_book_manage.user_id_cooperate_id_seq', 1, false);
            INSERT INTO pxr_book_manage.my_condition_book
            (
                pxr_id,
                attributes,
                is_disabled,
                created_by,
                created_at,
                updated_by,
                updated_at
            )
            VALUES
            (
                'wf',
                'aaa',
                false,
                'pxr_user',
                NOW(),
                'pxr_user',
                NOW()
            );
            INSERT INTO pxr_book_manage.user_id_cooperate
            (
                book_id,
                actor_catalog_code,
                actor_catalog_version,
                app_catalog_code,
                app_catalog_version,
                wf_catalog_code,
                wf_catalog_version,
                region_catalog_code,
                region_catalog_version,
                user_id,
                status,
                start_at,
                is_disabled,
                created_by,
                created_at,
                updated_by,
                updated_at
            )
            VALUES
            (
                1,
                1000003,
                1,
                null,
                null,
                1000004,
                1,
                null,
                null,
                '123456789',
                0,
                null,
                false,
                'pxr_user',
                NOW(),
                'pxr_user',
                NOW()
            );
            `);

            // 送信データを生成
            const url = Url.cooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=sessionId'])
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo23'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
        test('正常：IDサービスを使用しない', async () => {
            _catalogServer = new StubCatalogServerNoIdService(3001, 1000374, 200);
            _identityServer = new StubIdentityServer(200, false, '123');

            // 事前データ準備
            await common.executeSqlString(`
            DELETE FROM pxr_book_manage.user_id_cooperate;
            DELETE FROM pxr_book_manage.my_condition_book;
            SELECT SETVAL('pxr_book_manage.my_condition_book_id_seq', 1, false);
            SELECT SETVAL('pxr_book_manage.user_id_cooperate_id_seq', 1, false);
            
            INSERT INTO pxr_book_manage.my_condition_book
            (
                pxr_id,
                attributes,
                is_disabled,
                created_by,
                created_at,
                updated_by,
                updated_at
            )
            VALUES
            (
                '123',
                'aaa',
                false,
                'pxr_user',
                NOW(),
                'pxr_user',
                NOW()
            );
            INSERT INTO pxr_book_manage.user_id_cooperate
            (
                book_id,
                actor_catalog_code,
                actor_catalog_version,
                app_catalog_code,
                app_catalog_version,
                wf_catalog_code,
                wf_catalog_version,
                user_id,
                status,
                start_at,
                is_disabled,
                created_by,
                created_at,
                updated_by,
                updated_at
            )
            VALUES
            (
                1,
                1000003,
                1,
                1000004,
                1,
                null,
                null,
                '123456789',
                0,
                null,
                false,
                'pxr_user',
                NOW(),
                'pxr_user',
                NOW()
            );
            `);

            // 送信データを生成
            const url = Url.cooperateURI;

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
            expect(response.status).toBe(200);
            expect(response.body.actor._value).toBe(1000003);
            expect(response.body.actor._ver).toBe(1);
            expect(response.body.app._value).toBe(1000004);
            expect(response.body.app._ver).toBe(1);
            expect(response.body.userId).toBe('123456789');
        });
        test('パラメータ不足：全体が空', async () => {
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);

            // 送信データを生成
            const url = Url.cooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(
                    {
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_IS_EMPTY);
        });
        test('パラメータ異常：全体が配列', async () => {
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);

            // 送信データを生成
            const url = Url.cooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(
                    [{
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo23'
                    }]
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNEXPECTED_ARRAY_REQUEST);
        });
        test('パラメータ異常：identifyCode（空文字）', async () => {
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);

            // 送信データを生成
            const url = Url.cooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(
                    {
                        identifyCode: '',
                        userId: '123456789'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
        });
        test('異常：セッション情報なし', async () => {
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);
            _identityServer = new StubIdentityServer(200, true, '123');

            // 送信データを生成
            const url = Url.cooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo2',
                        userId: '123456789'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_SESSION);
        });
        test('異常：セッションチェックエラーコード（204）', async () => {
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);
            _identityServer = new StubIdentityServer(200, true, '123');
            _operatorServer = new StubOperatorServerType0(204, 3);

            // 送信データを生成
            const url = Url.cooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=sessionId'])
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo23',
                        userId: '123456789'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.IS_NOT_AUTHORIZATION_SESSION);
        });
        test('異常：セッションチェックエラーコード（401）', async () => {
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);
            _identityServer = new StubIdentityServer(200, true, '123');
            _operatorServer = new StubOperatorServerType0(401, 3);

            // 送信データを生成
            const url = Url.cooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=sessionId'])
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo23',
                        userId: '123456789'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：セッションチェックエラーコード（500）', async () => {
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);
            _identityServer = new StubIdentityServer(200, true, '123');
            _operatorServer = new StubOperatorServerType0(500, 3);

            // 送信データを生成
            const url = Url.cooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=sessionId'])
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo23',
                        userId: '123456789'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：オペレータサーバー接続エラー', async () => {
            _catalogServer = new StubCatalogServer(3001, 1, 200);
            _identityServer = new StubIdentityServer(200, true, '123');

            // 送信データを生成
            const url = Url.cooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=sessionId'])
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo25',
                        userId: '123456789'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常：オペレータタイプWf', async () => {
            _catalogServer = new StubCatalogServer(3001, 1, 200);
            _identityServer = new StubIdentityServer(200, true, '123');
            _operatorServer = new StubOperatorServerType0(200, 1);

            // 送信データを生成
            const url = Url.cooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot1) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo25',
                        userId: '123456789'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：本人性確認サービスからエラーコード400', async () => {
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);
            _identityServer = new StubIdentityServer(400, false, '123');

            // 事前データ準備
            await common.executeSqlString(`
            DELETE FROM pxr_book_manage.user_id_cooperate;
            DELETE FROM pxr_book_manage.my_condition_book;
            SELECT SETVAL('pxr_book_manage.my_condition_book_id_seq', 1, false);
            SELECT SETVAL('pxr_book_manage.user_id_cooperate_id_seq', 1, false);
            INSERT INTO pxr_book_manage.my_condition_book
            (
                pxr_id,
                attributes,
                is_disabled,
                created_by,
                created_at,
                updated_by,
                updated_at
            )
            VALUES
            (
                '123',
                'aaa',
                false,
                'pxr_user',
                NOW(),
                'pxr_user',
                NOW()
            )
            `);

            // 送信データを生成
            const url = Url.cooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo',
                        userId: '123456789'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.FAILED_IDENTITY_GET);
        });
        test('異常：本人性確認サービスからエラーコード500', async () => {
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);
            _identityServer = new StubIdentityServer(500, false, '123');

            // 事前データ準備
            await common.executeSqlString(`
            DELETE FROM pxr_book_manage.user_id_cooperate;
            DELETE FROM pxr_book_manage.my_condition_book;
            SELECT SETVAL('pxr_book_manage.my_condition_book_id_seq', 1, false);
            SELECT SETVAL('pxr_book_manage.user_id_cooperate_id_seq', 1, false);
            INSERT INTO pxr_book_manage.my_condition_book
            (
                pxr_id,
                attributes,
                is_disabled,
                created_by,
                created_at,
                updated_by,
                updated_at
            )
            VALUES
            (
                '123',
                'aaa',
                false,
                'pxr_user',
                NOW(),
                'pxr_user',
                NOW()
            )
            `);

            // 送信データを生成
            const url = Url.cooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo',
                        userId: '123456789'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_IDENTITY_GET);
        });
        test('異常：本人性確認サービスからエラーコード200以外', async () => {
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);
            _identityServer = new StubIdentityServer(401, false, '123');

            // 事前データ準備
            await common.executeSqlString(`
            DELETE FROM pxr_book_manage.user_id_cooperate;
            DELETE FROM pxr_book_manage.my_condition_book;
            SELECT SETVAL('pxr_book_manage.my_condition_book_id_seq', 1, false);
            SELECT SETVAL('pxr_book_manage.user_id_cooperate_id_seq', 1, false);
            INSERT INTO pxr_book_manage.my_condition_book
            (
                pxr_id,
                attributes,
                is_disabled,
                created_by,
                created_at,
                updated_by,
                updated_at
            )
            VALUES
            (
                '123',
                'aaa',
                false,
                'pxr_user',
                NOW(),
                'pxr_user',
                NOW()
            )
            `);

            // 送信データを生成
            const url = Url.cooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo',
                        userId: '123456789'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.FAILED_IDENTITY_GET);
        });
        test('異常：MyConditionBookデータなし', async () => {
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);
            _identityServer = new StubIdentityServer(200, false, '123');

            // 事前データ準備
            await common.executeSqlString(`
            DELETE FROM pxr_book_manage.user_id_cooperate;
            DELETE FROM pxr_book_manage.my_condition_book;
            SELECT SETVAL('pxr_book_manage.my_condition_book_id_seq', 1, false);
            SELECT SETVAL('pxr_book_manage.user_id_cooperate_id_seq', 1, false);
            INSERT INTO pxr_book_manage.my_condition_book
            (
                pxr_id,
                attributes,
                is_disabled,
                created_by,
                created_at,
                updated_by,
                updated_at
            )
            VALUES
            (
                '12',
                'aaa',
                false,
                'pxr_user',
                NOW(),
                'pxr_user',
                NOW()
            )
            `);

            // 送信データを生成
            const url = Url.cooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo3',
                        userId: '123456789'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(404);
            expect(response.body.message).toBe(Message.TARGET_NO_DATA);
        });
        test('異常：本人性確認サービス接続エラー', async () => {
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);

            // 送信データを生成
            const url = Url.cooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo',
                        userId: '123456789'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_IDENTITY);
        });
        test('異常：利用者ID連携データなし', async () => {
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);
            _identityServer = new StubIdentityServer(200, true, '123');
            _operatorServer = new StubOperatorServerType0(200, 3);
            _idServiceServer = new StubIdServiceServer(200);

            // 事前データ準備
            await common.executeSqlString(`
            DELETE FROM pxr_book_manage.user_id_cooperate;
            DELETE FROM pxr_book_manage.my_condition_book;
            SELECT SETVAL('pxr_book_manage.my_condition_book_id_seq', 1, false);
            SELECT SETVAL('pxr_book_manage.user_id_cooperate_id_seq', 1, false);
            INSERT INTO pxr_book_manage.my_condition_book
            (
                pxr_id,
                attributes,
                is_disabled,
                created_by,
                created_at,
                updated_by,
                updated_at
            )
            VALUES
            (
                '123',
                'aaa',
                false,
                'pxr_user',
                NOW(),
                'pxr_user',
                NOW()
            );
            `);

            // 送信データを生成
            const url = Url.cooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=sessionId'])
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo23'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.PENDING_COOPERATE_NOT_FOUND);
        });
        test('異常：利用者ID連携申請中以外', async () => {
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);
            _identityServer = new StubIdentityServer(200, false, '123');
            _operatorServer = new StubOperatorServerType0(200, 3);
            _idServiceServer = new StubIdServiceServer(200);

            // 事前データ準備
            await common.executeSqlString(`
            DELETE FROM pxr_book_manage.user_id_cooperate;
            DELETE FROM pxr_book_manage.my_condition_book;
            SELECT SETVAL('pxr_book_manage.my_condition_book_id_seq', 1, false);
            SELECT SETVAL('pxr_book_manage.user_id_cooperate_id_seq', 1, false);
            INSERT INTO pxr_book_manage.my_condition_book
            (
                pxr_id,
                attributes,
                is_disabled,
                created_by,
                created_at,
                updated_by,
                updated_at
            )
            VALUES
            (
                '123',
                'aaa',
                false,
                'pxr_user',
                NOW(),
                'pxr_user',
                NOW()
            );
            INSERT INTO pxr_book_manage.user_id_cooperate
                (
                    book_id,
                    actor_catalog_code,
                    actor_catalog_version,
                    app_catalog_code,
                    app_catalog_version,
                    wf_catalog_code,
                    wf_catalog_version,
                    user_id,
                    status,
                    start_at,
                    is_disabled,
                    created_by,
                    created_at,
                    updated_by,
                    updated_at
                )
                VALUES
                (
                    1,
                    1000003,
                    1,
                    1000004,
                    1,
                    null,
                    null,
                    '123456789',
                    1,
                    null,
                    false,
                    'pxr_user',
                    NOW(),
                    'pxr_user',
                    NOW()
                );
            `);

            // 送信データを生成
            const url = Url.cooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=sessionId'])
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo23'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_COOP_REQUEST);
        });
    });

    /**
     * 個人による利用者ID連携（非推奨）
     */
    describe('個人による利用者ID連携（非推奨）', () => {
        test('正常：MyConditionBookデータあり', async () => {
            _catalogServer = new StubCatalogServer(3001, 1000374, 200);
            _identityServerInd = new StubIdentityServer03(200, true, '123');
            _idServiceServer = new StubIdServiceServer(200);

            // 事前データ準備
            await common.executeSqlString(`
            DELETE FROM pxr_book_manage.user_id_cooperate;
            DELETE FROM pxr_book_manage.my_condition_book;
            SELECT SETVAL('pxr_book_manage.my_condition_book_id_seq', 1, false);
            SELECT SETVAL('pxr_book_manage.user_id_cooperate_id_seq', 1, false);
            
            INSERT INTO pxr_book_manage.my_condition_book
            (
                pxr_id,
                attributes,
                is_disabled,
                created_by,
                created_at,
                updated_by,
                updated_at
            )
            VALUES
            (
                '123',
                'aaa',
                false,
                'pxr_user',
                NOW(),
                'pxr_user',
                NOW()
            );
            INSERT INTO pxr_book_manage.user_id_cooperate
            (
                book_id,
                actor_catalog_code,
                actor_catalog_version,
                app_catalog_code,
                app_catalog_version,
                wf_catalog_code,
                wf_catalog_version,
                user_id,
                status,
                start_at,
                is_disabled,
                created_by,
                created_at,
                updated_by,
                updated_at
            )
            VALUES
            (
                1,
                1000103,
                1,
                1000104,
                1,
                null,
                null,
                '123456789',
                0,
                null,
                false,
                'pxr_user',
                NOW(),
                'pxr_user',
                NOW()
            );
            `);

            // 送信データを生成
            const url = Url.indCooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot0) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo25'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.actor._value).toBe(1000103);
            expect(response.body.actor._ver).toBe(1);
            expect(response.body.userId).toBe('123456789');
        });
        test('正常：セッション情報がある（個人）', async () => {
            _catalogServer = new StubCatalogServer(3001, 1000374, 200);
            _identityServerInd = new StubIdentityServer03(200, true, '123');
            _operatorServer = new StubOperatorServerType0(200, 0);
            _idServiceServer = new StubIdServiceServer(200);

            // 事前データ準備
            await common.executeSqlString(`
            DELETE FROM pxr_book_manage.user_id_cooperate;
            DELETE FROM pxr_book_manage.my_condition_book;
            SELECT SETVAL('pxr_book_manage.my_condition_book_id_seq', 1, false);
            SELECT SETVAL('pxr_book_manage.user_id_cooperate_id_seq', 1, false);
            INSERT INTO pxr_book_manage.my_condition_book
            (
                pxr_id,
                attributes,
                is_disabled,
                created_by,
                created_at,
                updated_by,
                updated_at
            )
            VALUES
            (
                '123',
                'aaa',
                false,
                'pxr_user',
                NOW(),
                'pxr_user',
                NOW()
            );
            INSERT INTO pxr_book_manage.user_id_cooperate
            (
                book_id,
                actor_catalog_code,
                actor_catalog_version,
                app_catalog_code,
                app_catalog_version,
                wf_catalog_code,
                wf_catalog_version,
                user_id,
                status,
                start_at,
                is_disabled,
                created_by,
                created_at,
                updated_by,
                updated_at
            )
            VALUES
            (
                1,
                1000103,
                1,
                1000104,
                1,
                null,
                null,
                '123456789',
                0,
                null,
                false,
                'pxr_user',
                NOW(),
                'pxr_user',
                NOW()
            );
            `);

            // 送信データを生成
            const url = Url.indCooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=sessionId'])
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo25'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.actor._value).toBe(1000103);
            expect(response.body.app._ver).toBe(1);
            expect(response.body.userId).toBe('123456789');
        });
        test('正常：IDサービスを使用しない', async () => {
            _catalogServer = new StubCatalogServerNoIdService(3001, 1000374, 200);
            _identityServerInd = new StubIdentityServer03(200, true, '123');

            // 事前データ準備
            await common.executeSqlString(`
            DELETE FROM pxr_book_manage.user_id_cooperate;
            DELETE FROM pxr_book_manage.my_condition_book;
            SELECT SETVAL('pxr_book_manage.my_condition_book_id_seq', 1, false);
            SELECT SETVAL('pxr_book_manage.user_id_cooperate_id_seq', 1, false);
            
            INSERT INTO pxr_book_manage.my_condition_book
            (
                pxr_id,
                attributes,
                is_disabled,
                created_by,
                created_at,
                updated_by,
                updated_at
            )
            VALUES
            (
                '123',
                'aaa',
                false,
                'pxr_user',
                NOW(),
                'pxr_user',
                NOW()
            );
            INSERT INTO pxr_book_manage.user_id_cooperate
            (
                book_id,
                actor_catalog_code,
                actor_catalog_version,
                app_catalog_code,
                app_catalog_version,
                wf_catalog_code,
                wf_catalog_version,
                user_id,
                status,
                start_at,
                is_disabled,
                created_by,
                created_at,
                updated_by,
                updated_at
            )
            VALUES
            (
                1,
                1000103,
                1,
                1000104,
                1,
                null,
                null,
                '123456789',
                0,
                null,
                false,
                'pxr_user',
                NOW(),
                'pxr_user',
                NOW()
            );
            `);

            // 送信データを生成
            const url = Url.indCooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot0) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo25'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.actor._value).toBe(1000103);
            expect(response.body.actor._ver).toBe(1);
            expect(response.body.userId).toBe('123456789');
        });
        test('パラメータ不足：全体が空', async () => {
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);

            // 送信データを生成
            const url = Url.indCooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(
                    {
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_IS_EMPTY);
        });
        test('パラメータ異常：全体が配列', async () => {
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);

            // 送信データを生成
            const url = Url.indCooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(
                    [{
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo23'
                    }]
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNEXPECTED_ARRAY_REQUEST);
        });
        test('パラメータ異常：identifyCode（空文字）', async () => {
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);

            // 送信データを生成
            const url = Url.indCooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(
                    {
                        identifyCode: '',
                        userId: '123456789'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
        });
        test('異常：セッション情報なし', async () => {
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);
            _identityServer = new StubIdentityServer03(200, true, '123');

            // 送信データを生成
            const url = Url.indCooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo2',
                        userId: '123456789'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_SESSION);
        });
        test('異常：セッションチェックエラーコード（204）', async () => {
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);
            _identityServer = new StubIdentityServer03(200, true, '123');
            _operatorServer = new StubOperatorServerType0(204, 3);

            // 送信データを生成
            const url = Url.indCooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=sessionId'])
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo23',
                        userId: '123456789'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.IS_NOT_AUTHORIZATION_SESSION);
        });
        test('異常：セッションチェックエラーコード（401）', async () => {
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);
            _identityServer = new StubIdentityServer03(200, true, '123');
            _operatorServer = new StubOperatorServerType0(401, 3);

            // 送信データを生成
            const url = Url.indCooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=sessionId'])
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo23',
                        userId: '123456789'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：セッションチェックエラーコード（500）', async () => {
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);
            _identityServer = new StubIdentityServer03(200, true, '123');
            _operatorServer = new StubOperatorServerType0(500, 3);

            // 送信データを生成
            const url = Url.indCooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=sessionId'])
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo23',
                        userId: '123456789'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：オペレータサーバー接続エラー', async () => {
            _catalogServer = new StubCatalogServer(3001, 1, 200);
            _identityServer = new StubIdentityServer03(200, true, '123');

            // 送信データを生成
            const url = Url.indCooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=sessionId'])
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo25',
                        userId: '123456789'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常：オペレータタイプAPP', async () => {
            _catalogServer = new StubCatalogServer(3001, 1, 200);
            _identityServer = new StubIdentityServer03(200, true, '123');
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = Url.indCooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type2_session=sessionId'])
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo22',
                        userId: '123456789'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：オペレータタイプWf', async () => {
            _catalogServer = new StubCatalogServer(3001, 1, 200);
            _identityServer = new StubIdentityServer03(200, false, '123');
            _operatorServer = new StubOperatorServerType0(200, 1);

            // 送信データを生成
            const url = Url.indCooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot1) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo25',
                        userId: '123456789'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：オペレータタイプ運営メンバー', async () => {
            _catalogServer = new StubCatalogServer(3001, 1, 200);
            _identityServer = new StubIdentityServer03(200, true, '123');
            _operatorServer = new StubOperatorServerType0(200, 1);

            // 送信データを生成
            const url = Url.indCooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=sessionId'])
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo25',
                        userId: '123456789'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：本人性確認サービスからエラーコード400', async () => {
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);
            _identityServer = new StubIdentityServer03(400, false, '123');

            // 事前データ準備
            await common.executeSqlString(`
            DELETE FROM pxr_book_manage.user_id_cooperate;
            DELETE FROM pxr_book_manage.my_condition_book;
            SELECT SETVAL('pxr_book_manage.my_condition_book_id_seq', 1, false);
            SELECT SETVAL('pxr_book_manage.user_id_cooperate_id_seq', 1, false);
            INSERT INTO pxr_book_manage.my_condition_book
            (
                pxr_id,
                attributes,
                is_disabled,
                created_by,
                created_at,
                updated_by,
                updated_at
            )
            VALUES
            (
                '123',
                'aaa',
                false,
                'pxr_user',
                NOW(),
                'pxr_user',
                NOW()
            )
            `);

            // 送信データを生成
            const url = Url.indCooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot0) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo25'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.FAILED_IDENTITY_GET);
        });
        test('異常：本人性確認サービスからエラーコード500', async () => {
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);
            _identityServer = new StubIdentityServer03(500, false, '123');

            // 事前データ準備
            await common.executeSqlString(`
            DELETE FROM pxr_book_manage.user_id_cooperate;
            DELETE FROM pxr_book_manage.my_condition_book;
            SELECT SETVAL('pxr_book_manage.my_condition_book_id_seq', 1, false);
            SELECT SETVAL('pxr_book_manage.user_id_cooperate_id_seq', 1, false);
            INSERT INTO pxr_book_manage.my_condition_book
            (
                pxr_id,
                attributes,
                is_disabled,
                created_by,
                created_at,
                updated_by,
                updated_at
            )
            VALUES
            (
                '123',
                'aaa',
                false,
                'pxr_user',
                NOW(),
                'pxr_user',
                NOW()
            )
            `);

            // 送信データを生成
            const url = Url.indCooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot0) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo25'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_IDENTITY_GET);
        });
        test('異常：本人性確認サービスからエラーコード200以外', async () => {
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);
            _identityServer = new StubIdentityServer03(401, false, '123');

            // 事前データ準備
            await common.executeSqlString(`
            DELETE FROM pxr_book_manage.user_id_cooperate;
            DELETE FROM pxr_book_manage.my_condition_book;
            SELECT SETVAL('pxr_book_manage.my_condition_book_id_seq', 1, false);
            SELECT SETVAL('pxr_book_manage.user_id_cooperate_id_seq', 1, false);
            INSERT INTO pxr_book_manage.my_condition_book
            (
                pxr_id,
                attributes,
                is_disabled,
                created_by,
                created_at,
                updated_by,
                updated_at
            )
            VALUES
            (
                '123',
                'aaa',
                false,
                'pxr_user',
                NOW(),
                'pxr_user',
                NOW()
            )
            `);

            // 送信データを生成
            const url = Url.indCooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot0) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo25'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.FAILED_IDENTITY_GET);
        });
        test('異常：MyConditionBookデータなし', async () => {
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);
            _identityServer = new StubIdentityServer03(200, false, '123');

            // 事前データ準備
            await common.executeSqlString(`
            DELETE FROM pxr_book_manage.user_id_cooperate;
            DELETE FROM pxr_book_manage.my_condition_book;
            SELECT SETVAL('pxr_book_manage.my_condition_book_id_seq', 1, false);
            SELECT SETVAL('pxr_book_manage.user_id_cooperate_id_seq', 1, false);
            INSERT INTO pxr_book_manage.my_condition_book
            (
                pxr_id,
                attributes,
                is_disabled,
                created_by,
                created_at,
                updated_by,
                updated_at
            )
            VALUES
            (
                '12',
                'aaa',
                false,
                'pxr_user',
                NOW(),
                'pxr_user',
                NOW()
            )
            `);

            // 送信データを生成
            const url = Url.indCooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot0) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo25'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(404);
            expect(response.body.message).toBe(Message.TARGET_NO_DATA);
        });
        test('異常：本人性確認サービス接続エラー', async () => {
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);

            // 送信データを生成
            const url = Url.indCooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot0) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo25'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_IDENTITY);
        });

        test('異常：利用者ID連携データなし', async () => {
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);
            _identityServer = new StubIdentityServer03(200, true, '123');
            _operatorServer = new StubOperatorServerType0(200, 3);
            _idServiceServer = new StubIdServiceServer(200);

            // 事前データ準備
            await common.executeSqlString(`
            DELETE FROM pxr_book_manage.user_id_cooperate;
            DELETE FROM pxr_book_manage.my_condition_book;
            SELECT SETVAL('pxr_book_manage.my_condition_book_id_seq', 1, false);
            SELECT SETVAL('pxr_book_manage.user_id_cooperate_id_seq', 1, false);
            INSERT INTO pxr_book_manage.my_condition_book
            (
                pxr_id,
                attributes,
                is_disabled,
                created_by,
                created_at,
                updated_by,
                updated_at
            )
            VALUES
            (
                '123',
                'aaa',
                false,
                'pxr_user',
                NOW(),
                'pxr_user',
                NOW()
            );
            `);

            // 送信データを生成
            const url = Url.indCooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot0) })
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo25'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.PENDING_COOPERATE_NOT_FOUND);
        });

        test('異常：利用者ID連携申請中以外', async () => {
            _catalogServer = new StubCatalogServer(3001, 1000374, 200);
            _identityServerInd = new StubIdentityServer03(200, true, '123');
            _operatorServer = new StubOperatorServerType0(200, 0);
            _idServiceServer = new StubIdServiceServer(200);

            // 事前データ準備
            await common.executeSqlString(`
            DELETE FROM pxr_book_manage.user_id_cooperate;
            DELETE FROM pxr_book_manage.my_condition_book;
            SELECT SETVAL('pxr_book_manage.my_condition_book_id_seq', 1, false);
            SELECT SETVAL('pxr_book_manage.user_id_cooperate_id_seq', 1, false);
            INSERT INTO pxr_book_manage.my_condition_book
            (
                pxr_id,
                attributes,
                is_disabled,
                created_by,
                created_at,
                updated_by,
                updated_at
            )
            VALUES
            (
                '123',
                'aaa',
                false,
                'pxr_user',
                NOW(),
                'pxr_user',
                NOW()
            );
            INSERT INTO pxr_book_manage.user_id_cooperate
            (
                book_id,
                actor_catalog_code,
                actor_catalog_version,
                app_catalog_code,
                app_catalog_version,
                wf_catalog_code,
                wf_catalog_version,
                user_id,
                status,
                start_at,
                is_disabled,
                created_by,
                created_at,
                updated_by,
                updated_at
            )
            VALUES
            (
                1,
                1000103,
                1,
                1000104,
                1,
                null,
                null,
                '123456789',
                1,
                null,
                false,
                'pxr_user',
                NOW(),
                'pxr_user',
                NOW()
            );
            `);

            // 送信データを生成
            const url = Url.indCooperateURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=sessionId'])
                .send(JSON.stringify(
                    {
                        identifyCode: 'ukO8z+Xf8vv7yxXQj2Hpo25'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_COOP_REQUEST);
        });
    });
});
