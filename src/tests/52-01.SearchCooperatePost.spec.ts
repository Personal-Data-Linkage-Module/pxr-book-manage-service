/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { Session } from './Session';
import StubOperatorServer from './StubOperatorServer';
import Config from '../common/Config';
const Message = Config.ReadConfig('./config/message.json');

// 対象アプリケーションを取得
const app = new Application();
const expressApp = app.express.app;
const common = new Common();

// サーバをlisten
app.start();

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
        await common.executeSqlFile('initialDataSearchBook.sql');
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
        if (_operatorServer) {
            _operatorServer._server.close();
            _operatorServer = null;
        }
    });

    /**
     * My-Condition-Book一覧取得
     */
    describe('My-Condition-Book一覧取得', () => {
        test('正常：流通制御、対象データなし', async () => {
            // 送信データを生成
            const json = {
                actor: 9999999
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchCooperateURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({
                actor: 9999999,
                app: null,
                wf: null,
                users: []
            });
        });
        test('異常：流通制御、wf指定', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(200);

            // 送信データを生成
            const json = {
                actor: 1000004,
                wf: 1000007
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchCooperateURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
        test('正常：流通制御、app対象データあり、1件', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(200);

            // 送信データを生成
            const json = {
                actor: 1000104,
                app: 1000009
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchCooperateURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({
                actor: 1000104,
                app: 1000009,
                wf: null,
                users: [
                    {
                        userId: 'userid02',
                        pxrId: '58di2dfse2.test.org'
                    }
                ]
            });
        });
        test('正常：アクター指定 対象データあり', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(200);

            // 送信データを生成
            const json = {
                actor: 1000104
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchCooperateURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({
                actor: 1000104,
                app: null,
                wf: null,
                users: [
                    {
                        userId: 'userid02',
                        pxrId: '58di2dfse2.test.org'
                    }
                ]
            });
        });
        test('異常：Cookieが存在するが空', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(200);

            // 送信データを生成
            const json = {
                actor: 1000004
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchCooperateURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', null)
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_SESSION);
        });
        test('異常：Cookie使用、オペレータサービス応答204', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(204);

            // 送信データを生成
            const json = {
                actor: 1000004
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchCooperateURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.IS_NOT_AUTHORIZATION_SESSION);
        });
        test('異常：Cookie使用、オペレータサービス応答400系', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(401);

            // 送信データを生成
            const json = {
                actor: 1000004
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchCooperateURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：Cookie使用、オペレータサービス応答500系', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(500);

            // 送信データを生成
            const json = {
                actor: 1000004
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchCooperateURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：セッション(セッションなし)', async () => {
            // スタブサーバー起動

            // 送信データを生成
            const json = {
                actor: 1000004
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchCooperateURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_SESSION);
        });
        test('異常：セッション(オペレータサービス未起動)', async () => {
            // スタブサーバー起動

            // 送信データを生成
            const json = {
                actor: 1000004
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchCooperateURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('パラメータ不足：全て', async () => {
            // 送信データを生成
            const json = {};

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchCooperateURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_IS_EMPTY);
        });
    });
});
