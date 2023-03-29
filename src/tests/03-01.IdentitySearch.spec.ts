/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { Session } from './Session';
import StubCatalogServer from './StubCatalogServer';
import * as crypto from 'crypto';
import StubOperatorServer from './StubOperatorServer';
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
        if (_operatorServer) {
            _operatorServer._server.close();
            _operatorServer = null;
        }
    });

    /**
     * 本人性確認事項取得
     */
    describe('本人性確認事項取得', () => {
        test('正常：流通制御、対象データなし', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);

            // 送信データを生成
            const json = {
                pxrId: '58di2dfse2.test.org'
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.identiryURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(204);
        });
        test('正常：データ取引、対象データなし', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServer(3001, 1000020, 200);

            // 送信データを生成
            const json = {
                pxrId: '58di2dfse2.test.org'
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.identiryURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataTrader) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(204);
        });
        test('正常：流通制御、対象データあり', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);

            // 事前データ準備
            const template = JSON.stringify({ test1: 'data1' });
            const hash = crypto.createHash('sha256').update(template).digest('hex');
            await common.executeSqlString(`
                INSERT INTO pxr_book_manage.my_condition_book
                (
                    pxr_id, attributes,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    'dummy.test.org', '${template}',
                    false, 'pxr_user', NOW(), 'pxr_user', NOW()
                );
                INSERT INTO pxr_book_manage.identification
                (
                    book_id, identification_code, identification_version, template, template_hash,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    1, 1, 1, '${template}', '${hash}',
                    false, 'pxr_user', NOW(), 'pxr_user', NOW()
                );
            `);

            // 送信データを生成
            const json = {
                pxrId: 'dummy.test.org'
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.identiryURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.pxrId).toBe('dummy.test.org');
            expect(Array.isArray(response.body.identification)).toBe(true);
            expect(response.body.identification.length).toBe(1);
            const list: any[] = response.body.identification;
            list.forEach(element => {
                expect(JSON.stringify(element)).toBe(JSON.stringify({ test1: 'data1' }));
            });
        });
        test('正常：Cookie使用, 個人', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServer(3001, 1000020, 200);
            _operatorServer = new StubOperatorServer(200, '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00');

            // 送信データを生成
            const json = {
                pxrId: '58di2dfse2.test.org'
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.identiryURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(401);
            // expect(response.body.pxrId).toBe('dummy.test.org');
            // expect(Array.isArray(response.body.identification)).toBe(true);
            // expect(response.body.identification.length).toBe(1);
            // const list: any[] = response.body.identification;
            // list.forEach(element => {
            //     expect(JSON.stringify(element.template)).toBe(JSON.stringify({ test1: 'data1' }));
            // });
        });
        test('異常：session使用, ワークフロー', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServer(3001, 1000020, 200);
            _operatorServer = new StubOperatorServer(200, '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e01');

            // 送信データを生成
            const json = {
                pxrId: '58di2dfse2.test.org'
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.identiryURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.bookCloseDelete1) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_OPERATOR);
        });
        test('異常：Cookie使用, アプリケーション', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServer(3001, 1000020, 200);
            _operatorServer = new StubOperatorServer(200, '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e02');

            // 送信データを生成
            const json = {
                pxrId: '58di2dfse2.test.org'
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.identiryURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type2_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e02'])
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(401);
            // expect(response.status).toBe(200);
            // expect(response.body.pxrId).toBe('58di2dfse2.test.org');
            // expect(Array.isArray(response.body.identification)).toBe(true);
            // expect(response.body.identification.length).toBe(1);
            // const list: any[] = response.body.identification;
            // list.forEach(element => {
            //     expect(JSON.stringify(element.template)).toBe(JSON.stringify({ test1: 'data1' }));
            // });
        });
        test('異常：Cookie使用, 運営メンバー', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServer(3001, 1000020, 200);
            _operatorServer = new StubOperatorServer(200, '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e03');

            // 送信データを生成
            const json = {
                pxrId: '58di2dfse2.test.org'
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.identiryURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e03'])
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(204);
            // expect(response.status).toBe(200);
            // expect(response.body.pxrId).toBe('58di2dfse2.test.org');
            // expect(Array.isArray(response.body.identification)).toBe(true);
            // expect(response.body.identification.length).toBe(1);
            // const list: any[] = response.body.identification;
            // list.forEach(element => {
            //     expect(JSON.stringify(element.template)).toBe(JSON.stringify({ test1: 'data1' }));
            // });
        });
        test('異常：Cookieが存在するが空', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServer(3001, 1000020, 200);
            _operatorServer = new StubOperatorServer(200);

            // 送信データを生成
            const json = {
                pxrId: '58di2dfse2.test.org'
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.identiryURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', null)
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_SESSION);
        });
        test('異常：Cookie使用、オペレータサービス応答204', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServer(3001, 1000020, 200);
            _operatorServer = new StubOperatorServer(204);

            // 送信データを生成
            const json = {
                pxrId: [
                    '58di2dfse2.test.org'
                ],
                createdAt: {
                    start: '2020-01-01T00:00:00.000+0900',
                    end: '2030-12-31T23:59:59.000+0900'
                }
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.identiryURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.IS_NOT_AUTHORIZATION_SESSION);
        });
        test('異常：Cookie使用、オペレータサービス応答400系', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServer(3001, 1000020, 200);
            _operatorServer = new StubOperatorServer(401);

            // 送信データを生成
            const json = {
                pxrId: [
                    '58di2dfse2.test.org'
                ],
                createdAt: {
                    start: '2020-01-01T00:00:00.000+0900',
                    end: '2030-12-31T23:59:59.000+0900'
                }
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.identiryURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：Cookie使用、オペレータサービス応答500系', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServer(3001, 1000020, 200);
            _operatorServer = new StubOperatorServer(500);

            // 送信データを生成
            const json = {
                pxrId: [
                    '58di2dfse2.test.org'
                ],
                createdAt: {
                    start: '2020-01-01T00:00:00.000+0900',
                    end: '2030-12-31T23:59:59.000+0900'
                }
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.identiryURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：セッション(セッションなし)', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);

            // 送信データを生成
            const json = {
                pxrId: 'dummy.test.org'
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.identiryURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_SESSION);
        });
        test('異常：セッション(オペレータサービス未起動)', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServer(3001, 2, 200);

            // 送信データを生成
            const json = {
                pxrId: 'dummy.test.org'
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.identiryURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
    });
});
