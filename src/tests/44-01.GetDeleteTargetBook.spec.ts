/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Application } from '../resources/config/Application';
import supertest = require('supertest');
import Common, { Url } from './Common';
import urljoin = require('url-join');
import Config from '../common/Config';
import { Session } from './Session';
import { StubOperatorServerType0 } from './StubOperatorServer';
import { StubCatalogServerDelete } from './StubCatalogServer';
/* eslint-enable */
const Message = Config.ReadConfig('./config/message.json');

const app = new Application();
const expressApp = app.express.app;
const common = new Common();
app.start();

let _operatorServer: any;
let _catalogServer: any;

describe('book-mange API', () => {
    beforeAll(async () => {
        await common.connect();
        await common.executeSqlFile('initialData.sql');
        await common.executeSqlFile('initialDataBook.sql');
        await common.executeSqlFile('initialDataBookDelete.sql');
    });
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
     * 削除可能Book取得
     */
    describe('削除可能Book取得', () => {
        test('正常：', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerDelete(200, 0, 0);

            // 送信データを生成
            const url = urljoin(Url.getDeleteTargetBookURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toEqual(
                [
                    { pxrId: '58di2dfse2.test.org' }
                ]);
        });
        test('正常：Book削除保留期間時間指定', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerDelete(200, 0, 0, 'hour');

            // 送信データを生成
            const url = urljoin(Url.getDeleteTargetBookURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toEqual(
                [
                    { pxrId: '58di2dfse2.test.org' },
                    { pxrId: '58di2dfse2.test.org' }
                ]);
        });
        test('異常：アクターがpxr-rootではない', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerDelete(200, 0, 1);

            // 送信データを生成
            const url = urljoin(Url.getDeleteTargetBookURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_PXR_ROOT_CATALOG);
        });
        test('異常：Cookie使用, 個人', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerDelete(200, 0, 0);

            // 送信データを生成
            const url = urljoin(Url.getDeleteTargetBookURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：Cookie使用, ワークフロー', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 1);
            _catalogServer = new StubCatalogServerDelete(200, 0, 0);

            // 送信データを生成
            const url = urljoin(Url.getDeleteTargetBookURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.bookCloseDelete1) });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：Cookie使用, アプリケーション', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 2);
            _catalogServer = new StubCatalogServerDelete(200, 0, 0);

            // 送信データを生成
            const url = urljoin(Url.getDeleteTargetBookURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type2_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：Cookieが存在するが空', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerDelete(200, 0, 0);

            // 送信データを生成
            const url = urljoin(Url.getDeleteTargetBookURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常：Cookie使用、オペレータサービス応答204', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(204, 3);
            _catalogServer = new StubCatalogServerDelete(200, 0, 0);

            // 送信データを生成
            const url = urljoin(Url.getDeleteTargetBookURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常：Cookie使用、オペレータサービス応答400系', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(400, 3);
            _catalogServer = new StubCatalogServerDelete(200, 0, 0);

            // 送信データを生成
            const url = urljoin(Url.getDeleteTargetBookURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });
        test('異常：Cookie使用、オペレータサービス応答500系', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(503, 3);
            _catalogServer = new StubCatalogServerDelete(200, 0, 0);

            // 送信データを生成
            const url = urljoin(Url.getDeleteTargetBookURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：Cookie使用、オペレータサービス未起動', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerDelete(200, 0, 0);

            // 送信データを生成
            const url = urljoin(Url.getDeleteTargetBookURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常：セッション(カタログサービスエラー応答204)', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerDelete(204, 0, 0);

            // 送信データを生成
            const url = urljoin(Url.getDeleteTargetBookURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常：セッション(カタログサービスエラー応答400系)', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerDelete(400, 0, 0);

            // 送信データを生成
            const url = urljoin(Url.getDeleteTargetBookURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常：セッション(カタログサービスエラー応答500系)', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerDelete(500, 0, 0);

            // 送信データを生成
            const url = urljoin(Url.getDeleteTargetBookURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常：セッション(カタログサービス未起動)', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.getDeleteTargetBookURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_CATALOG);
        });
        describe('削除可能Book取得', () => {
            test('正常(該当PXR_IDに論理削除済のデータが入っている)：', async () => {
                // スタブサーバー起動
                _operatorServer = new StubOperatorServerType0(200, 3);
                _catalogServer = new StubCatalogServerDelete(200, 0, 0);

                // 事前データ準備
                await common.executeSqlString(`
                    INSERT INTO pxr_book_manage.my_condition_book
                    (
                        pxr_id, attributes, book_close_available, book_close_available_at,
                        is_disabled, created_by, created_at, updated_by, updated_at
                    )
                    VALUES
                    (
                        '58di2dfse2.test.org2', NULL, true, now() + cast( '-1 months' as INTERVAL ),
                        true, 'test_user', NOW(), 'test_user', NOW()
                    );
                `);

                // 送信データを生成
                const url = urljoin(Url.getDeleteTargetBookURI, '?offset=0', '&limit=0');

                // 対象APIに送信
                const response = await supertest(expressApp).get(url)
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

                // レスポンスチェック
                expect(response.status).toBe(200);
                expect(response.body).toEqual(
                    [
                        { pxrId: '58di2dfse2.test.org' }
                    ]);

                // テスト実行の後処理
                await common.executeSqlString(`
                    DELETE FROM pxr_book_manage.my_condition_book WHERE pxr_id = '58di2dfse2.test.org2';
                `);
            });
        });
    });
});
