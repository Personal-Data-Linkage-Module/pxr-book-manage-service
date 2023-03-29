/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { sprintf } from 'sprintf-js';
import { Session } from './Session';
import { StubOperatorServerType0 } from './StubOperatorServer';
import Config from '../common/Config';
const Message = Config.ReadConfig('./config/message.json');

// 対象アプリケーションを取得
const app = new Application();
const expressApp = app.express.app;
const common = new Common();

// サーバをlisten
app.start();

let operator: any;

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
     * データ蓄積定義削除
     */
    describe('データ蓄積定義削除', () => {
        test('正常：app（header session）', async () => {
            // 事前データ準備
            await common.executeSqlFile('initialDataStoreData.sql');

            // 送信データを生成
            const url = Url.dataStoreURI + '/1';

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.result).toBe('success');
        });
        test('正常：app（cookie）', async () => {
            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialDataStoreData.sql');

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);

            // 送信データを生成
            const url = Url.dataStoreURI + '/1';

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=d89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.result).toBe('success');
        });
        test('異常：パラメータ不備(storeIdなし)', async () => {
            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) });

            // レスポンスチェック
            expect(response.status).toBe(404);
        });
        test('異常：パラメータ不備(storeIdが文字)', async () => {
            // 事前データ準備
            await common.executeSqlFile('initialDataStoreData.sql');

            // 送信データを生成
            const url = Url.dataStoreURI + '/a';

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) });

            // レスポンスチェック
            expect(response.status).toBe(404);
            expect(response.body.message).toBe(sprintf(Message.NUMBER_INVALID, 'storeId'));
        });
        test('異常：オペレータタイプが個人以外(運用メンバー)', async () => {
            // 送信データを生成
            const url = Url.dataStoreURI + '/1';

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.errorDataStoreDelete3) });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：オペレータタイプが個人以外(app)', async () => {
            // 送信データを生成
            const url = Url.dataStoreURI + '/1';

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.errorDataStoreDelete2) });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：オペレータタイプが個人以外(wf)', async () => {
            // 送信データを生成
            const url = Url.dataStoreURI + '/1';

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.errorDataStoreDelete1) });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：該当Bookなし', async () => {
            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlString(`
                INSERT INTO pxr_book_manage.my_condition_book
                (
                    pxr_id, attributes,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    'aaa', NULL,
                    false, 'test_user', NOW(), 'test_user', NOW()
                );
            `);
            // 送信データを生成
            const url = Url.dataStoreURI + '/1';

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.CAN_NOT_FIND_BOOK);
        });
        test('異常：該当Dataoperationデータなし', async () => {
            // 事前データ準備
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
                INSERT INTO pxr_book_manage.DATA_OPERATION
                (
                    book_id, type,
                    actor_catalog_code, actor_catalog_version,
                    app_catalog_code, app_catalog_version,
                    wf_catalog_code, wf_catalog_version,
                    attributes,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    1, 'store',
                    1000004,1,
                    null,null,
                    1000007,1,
                    null,
                    false, 'pxr_user', NOW(), 'pxr_user', NOW()
                );
            `);
            // 送信データを生成
            const url = Url.dataStoreURI + '/0';

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) });

            // レスポンスチェック
            expect(response.status).toBe(404);
            expect(response.body.message).toBe(Message.NOT_FOUND_DATA_STORE_SETTING);
        });
        test('異常：DataoperationDataTypesが存在しない', async () => {
            // 事前データ準備
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
                INSERT INTO pxr_book_manage.DATA_OPERATION
                (
                    book_id, type,
                    actor_catalog_code, actor_catalog_version,
                    app_catalog_code, app_catalog_version,
                    wf_catalog_code, wf_catalog_version,
                    attributes,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    1, 'store',
                    1000004,1,
                    null,null,
                    1000007,1,
                    null,
                    false, 'pxr_user', NOW(), 'pxr_user', NOW()
                );
            `);
            // 送信データを生成
            const url = Url.dataStoreURI + '/1';

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) });

            // レスポンスチェック
            expect(response.status).toBe(404);
            expect(response.body.message).toBe(Message.NOT_FOUND_DATA_TYPE);
        });
    });
});
