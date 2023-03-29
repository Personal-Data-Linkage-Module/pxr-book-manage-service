/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { Session } from './Session';
import { StubOperatorServerType0 } from './StubOperatorServer';
import { StubCatalogServerGetCooperate } from './StubCatalogServer';
import { sprintf } from 'sprintf-js';
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

const url = Url.cooperateURI;

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

    afterEach(async () => {
        // スタブを停止
        if (operator) {
            operator._server.close();
            operator = null;
        }
        if (catalog) {
            catalog._server.close();
            catalog = null;
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
     * 利用者ID連携取得
     */
    describe('利用者ID連携取得', () => {
        test('正常：header session', async () => {
            // テストデータ設定
            await common.executeSqlFile('initialGetCooperateData.sql');

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerGetCooperate(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.getCooperate) });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(3);
            expect(response.body[0].actor._value).toBe(1000004);
            expect(response.body[0].actor._ver).toBe(2);
            expect(response.body[0].wf).toBe(undefined);
            expect(response.body[0].app._value).toBe(1000007);
            expect(response.body[0].app._ver).toBe(3);
            expect(response.body[0].userId).toBe('userid01');
            expect(response.body[1].actor._value).toBe(1000004);
            expect(response.body[1].actor._ver).toBe(2);
            expect(response.body[1].wf).toBe(undefined);
            expect(response.body[1].app._value).toBe(1000107);
            expect(response.body[1].app._ver).toBe(4);
            expect(response.body[1].userId).toBe('userid02');
        });
        test('正常：cookie0', async () => {
            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerGetCooperate(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=d89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(3);
            expect(response.body[0].actor._value).toBe(1000004);
            expect(response.body[0].actor._ver).toBe(2);
            expect(response.body[0].wf).toBe(undefined);
            expect(response.body[0].app._value).toBe(1000007);
            expect(response.body[0].app._ver).toBe(3);
            expect(response.body[0].userId).toBe('userid01');
            expect(response.body[1].actor._value).toBe(1000004);
            expect(response.body[1].actor._ver).toBe(2);
            expect(response.body[1].wf).toBe(undefined);
            expect(response.body[1].app._value).toBe(1000107);
            expect(response.body[1].app._ver).toBe(4);
            expect(response.body[1].userId).toBe('userid02');
        });
        test('異常：session type1(wf)', async () => {
            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerGetCooperate(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.bookCloseDelete1) });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('正常：cookie2', async () => {
            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerGetCooperate(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type2_session=d89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(3);
            expect(response.body[0].actor._value).toBe(1000004);
            expect(response.body[0].actor._ver).toBe(2);
            expect(response.body[0].wf).toBe(undefined);
            expect(response.body[0].app._value).toBe(1000007);
            expect(response.body[0].app._ver).toBe(3);
            expect(response.body[0].userId).toBe('userid01');
            expect(response.body[1].actor._value).toBe(1000004);
            expect(response.body[1].actor._ver).toBe(2);
            expect(response.body[1].wf).toBe(undefined);
            expect(response.body[1].app._value).toBe(1000107);
            expect(response.body[1].app._ver).toBe(4);
            expect(response.body[1].userId).toBe('userid02');
        });
        test('正常：cookie3', async () => {
            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerGetCooperate(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=d89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(3);
            expect(response.body[0].actor._value).toBe(1000004);
            expect(response.body[0].actor._ver).toBe(2);
            expect(response.body[0].wf).toBe(undefined);
            expect(response.body[0].app._value).toBe(1000007);
            expect(response.body[0].app._ver).toBe(3);
            expect(response.body[0].userId).toBe('userid01');
            expect(response.body[1].actor._value).toBe(1000004);
            expect(response.body[1].actor._ver).toBe(2);
            expect(response.body[1].wf).toBe(undefined);
            expect(response.body[1].app._value).toBe(1000107);
            expect(response.body[1].app._ver).toBe(4);
            expect(response.body[1].userId).toBe('userid02');
        });
        test('正常：DBが1件', async () => {
            // テストデータ設定
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlString(`
                INSERT INTO pxr_book_manage.my_condition_book
                (
                    pxr_id, attributes,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    '58di2dfse2.test.org', NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                ),
                (
                    '58di2dfse2.test.org2', NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
                INSERT INTO pxr_book_manage.USER_ID_COOPERATE
                (
                    book_id,
                    actor_catalog_code, actor_catalog_version,
                    app_catalog_code, app_catalog_version,
                    wf_catalog_code, wf_catalog_version,
                    user_id,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    1,
                    1000004,0, 1000007,0, null,null, 'userid01',
                    false, 'pxr_user', NOW(), 'pxr_user', NOW()
                ),
                (
                    2,
                    1000004,0, 1000107,0, null,null, 'userid02',
                    false, 'pxr_user', NOW(), 'pxr_user', NOW()
                );
            `);

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerGetCooperate(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.getCooperate) });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(1);
            expect(response.body[0].actor._value).toBe(1000004);
            expect(response.body[0].actor._ver).toBe(2);
            expect(response.body[0].wf).toBe(undefined);
            expect(response.body[0].app._value).toBe(1000007);
            expect(response.body[0].app._ver).toBe(3);
            expect(response.body[0].userId).toBe('userid01');
        });

        test('異常：MyConditionDataに該当データなし', async () => {
            // テストデータ設定
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlString(`
                INSERT INTO pxr_book_manage.my_condition_book
                (
                    pxr_id, attributes,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    '58di2dfse2.test.org1', NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                ),
                (
                    '58di2dfse2.test.org2', NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
                INSERT INTO pxr_book_manage.USER_ID_COOPERATE
                (
                    book_id,
                    actor_catalog_code, actor_catalog_version,
                    app_catalog_code, app_catalog_version,
                    wf_catalog_code, wf_catalog_version,
                    user_id,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    1,
                    1000004,0, 1000007,0, null,null, 'userid01',
                    false, 'pxr_user', NOW(), 'pxr_user', NOW()
                ),
                (
                    2,
                    1000004,0, 1000107,0, null,null, 'userid02',
                    false, 'pxr_user', NOW(), 'pxr_user', NOW()
                );
            `);

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerGetCooperate(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.getCooperate) });

            // レスポンスチェック
            expect(response.status).toBe(404);
            expect(response.body.message).toBe(Message.TARGET_NO_DATA);
        });
        test('異常：UserIdCooperateに該当データなし', async () => {
            // テストデータ設定
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlString(`
                INSERT INTO pxr_book_manage.my_condition_book
                (
                    pxr_id, attributes,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    '58di2dfse2.test.org', NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                ),
                (
                    '58di2dfse2.test.org2', NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
                INSERT INTO pxr_book_manage.USER_ID_COOPERATE
                (
                    book_id,
                    actor_catalog_code, actor_catalog_version,
                    app_catalog_code, app_catalog_version,
                    wf_catalog_code, wf_catalog_version,
                    user_id,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    2,
                    1000004,0, 1000107,0, null,null, 'userid02',
                    false, 'pxr_user', NOW(), 'pxr_user', NOW()
                );
            `);

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerGetCooperate(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.getCooperate) });

            // レスポンスチェック
            expect(response.status).toBe(404);
            expect(response.body.message).toBe(Message.BOOK_COOPERATE_NOT_EXISTS);
        });
        test('異常：オペレータタイプが個人でない(wf)', async () => {
            // テストデータ設定
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialGetCooperateData.sql');

            // スタブを起動
            operator = new StubOperatorServerType0(200, 1);
            catalog = new StubCatalogServerGetCooperate(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=d89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：オペレータタイプが個人でない(app)', async () => {
            // テストデータ設定
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialGetCooperateData.sql');

            // スタブを起動
            operator = new StubOperatorServerType0(200, 2);
            catalog = new StubCatalogServerGetCooperate(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=d89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：オペレータタイプが個人でない(運営メンバー)', async () => {
            // テストデータ設定
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialGetCooperateData.sql');

            // スタブを起動
            operator = new StubOperatorServerType0(200, 3);
            catalog = new StubCatalogServerGetCooperate(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=d89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：アクターカタログに該当なし', async () => {
            // テストデータ設定
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlString(`
                INSERT INTO pxr_book_manage.my_condition_book
                (
                    pxr_id, attributes,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    '58di2dfse2.test.org', NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
                INSERT INTO pxr_book_manage.USER_ID_COOPERATE
                (
                    book_id,
                    actor_catalog_code, actor_catalog_version,
                    app_catalog_code, app_catalog_version,
                    wf_catalog_code, wf_catalog_version,
                    user_id,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    1,
                    1000000,0, null,null, 1000007,0, 'userid02',
                    false, 'pxr_user', NOW(), 'pxr_user', NOW()
                );
            `);

            // スタブを起動
            operator = new StubOperatorServerType0(200, 3);
            catalog = new StubCatalogServerGetCooperate(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.getCooperate) });

            // レスポンスチェック
            expect(response.status).toBe(404);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常：wfカタログに該当なし', async () => {
            // テストデータ設定
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlString(`
                INSERT INTO pxr_book_manage.my_condition_book
                (
                    pxr_id, attributes,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    '58di2dfse2.test.org', NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
                INSERT INTO pxr_book_manage.USER_ID_COOPERATE
                (
                    book_id,
                    actor_catalog_code, actor_catalog_version,
                    app_catalog_code, app_catalog_version,
                    wf_catalog_code, wf_catalog_version,
                    user_id,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    1,
                    1000001,0, null,null, 1000000,0, 'userid02',
                    false, 'pxr_user', NOW(), 'pxr_user', NOW()
                );
            `);

            // スタブを起動
            operator = new StubOperatorServerType0(200, 3);
            catalog = new StubCatalogServerGetCooperate(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.getCooperate) });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
        test('異常：actorカタログ形式異常', async () => {
            // テストデータ設定
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlString(`
                INSERT INTO pxr_book_manage.my_condition_book
                (
                    pxr_id, attributes,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    '58di2dfse2.test.org', NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
                INSERT INTO pxr_book_manage.USER_ID_COOPERATE
                (
                    book_id,
                    actor_catalog_code, actor_catalog_version,
                    app_catalog_code, app_catalog_version,
                    wf_catalog_code, wf_catalog_version,
                    user_id,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    1,
                    1000011,0, null,null, 1000000,0, 'userid02',
                    false, 'pxr_user', NOW(), 'pxr_user', NOW()
                );
            `);

            // スタブを起動
            operator = new StubOperatorServerType0(200, 3);
            catalog = new StubCatalogServerGetCooperate(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.getCooperate) });

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(sprintf(Message.FAILED_CATALOG_SET, 'アクター'));
        });
        test('異常：wfカタログ形式異常', async () => {
            // テストデータ設定
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlString(`
                INSERT INTO pxr_book_manage.my_condition_book
                (
                    pxr_id, attributes,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    '58di2dfse2.test.org', NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
                INSERT INTO pxr_book_manage.USER_ID_COOPERATE
                (
                    book_id,
                    actor_catalog_code, actor_catalog_version,
                    app_catalog_code, app_catalog_version,
                    wf_catalog_code, wf_catalog_version,
                    user_id,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    1,
                    1000001,0, null,null, 1000017,0, 'userid02',
                    false, 'pxr_user', NOW(), 'pxr_user', NOW()
                );
            `);

            // スタブを起動
            operator = new StubOperatorServerType0(200, 3);
            catalog = new StubCatalogServerGetCooperate(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.getCooperate) });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
        test('異常：appカタログ形式異常', async () => {
            // テストデータ設定
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlString(`
                INSERT INTO pxr_book_manage.my_condition_book
                (
                    pxr_id, attributes,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    '58di2dfse2.test.org', NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
                INSERT INTO pxr_book_manage.USER_ID_COOPERATE
                (
                    book_id,
                    actor_catalog_code, actor_catalog_version,
                    app_catalog_code, app_catalog_version,
                    wf_catalog_code, wf_catalog_version,
                    user_id,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    1,
                    1000001,0, 1000017,0, null,null, 'userid02',
                    false, 'pxr_user', NOW(), 'pxr_user', NOW()
                );
            `);

            // スタブを起動
            operator = new StubOperatorServerType0(200, 3);
            catalog = new StubCatalogServerGetCooperate(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.getCooperate) });

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(sprintf(Message.FAILED_CATALOG_SET, 'app'));
        });
        test('異常：regionカタログ形式異常', async () => {
            // テストデータ設定
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlString(`
                INSERT INTO pxr_book_manage.my_condition_book
                (
                    pxr_id, attributes,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    '58di2dfse2.test.org', NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
                INSERT INTO pxr_book_manage.USER_ID_COOPERATE
                (
                    book_id,
                    actor_catalog_code, actor_catalog_version,
                    region_catalog_code, region_catalog_version,
                    app_catalog_code, app_catalog_version,
                    wf_catalog_code, wf_catalog_version,
                    user_id,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    1,
                    1000001,0, 1000217,0, null,null, null,null, 'userid02',
                    false, 'pxr_user', NOW(), 'pxr_user', NOW()
                );
            `);

            // スタブを起動
            operator = new StubOperatorServerType0(200, 3);
            catalog = new StubCatalogServerGetCooperate(200);

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.getCooperate) });

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(sprintf(Message.FAILED_CATALOG_SET, 'region'));
        });
        test('異常：カタログサービスから応答異常(400)', async () => {
            // テストデータ設定
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialGetCooperateData.sql');

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerGetCooperate(400);

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.getCooperate) });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常：カタログサービスから応答異常(500系)', async () => {
            // テストデータ設定
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialGetCooperateData.sql');

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerGetCooperate(503);

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.getCooperate) });

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常：カタログサービスから応答異常(200以外)', async () => {
            // テストデータ設定
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialGetCooperateData.sql');

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerGetCooperate(204);

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.getCooperate) });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
    });
});
