/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { Session } from './Session';
import StubOperatorServer from './StubOperatorServer';
// import { StubCatalogServerSettingsTargetFind } from './StubCatalogServer';
import Config from '../common/Config';
const Message = Config.ReadConfig('./config/message.json');

// 対象アプリケーションを取得
const app = new Application();
const expressApp = app.express.app;
const common = new Common();

// サーバをlisten
app.start();

let _operatorServer: any;
// let _catalogServer: any;

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
        await common.executeSqlFile('initialSettingsTarget.sql');
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
        if (_operatorServer) {
            _operatorServer._server.close();
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
     * データ操作定義取得
     */
    describe('データ操作定義取得', () => {
        test('正常：運営メンバー', async () => {
            const response = await supertest(expressApp).get(Url.settingsTarget)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) });

            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([
                {
                    pxrId: '58di2dfse2.test.org',
                    dataOperations: [
                        {
                            _value: 1001106,
                            _ver: 1
                        },
                        {
                            _value: 1001106,
                            _ver: 1
                        },
                        {
                            _value: 1001107,
                            _ver: null
                        }
                    ]
                },
                {
                    pxrId: '58di2dfse2.test.org2',
                    dataOperations: [
                        {
                            _value: 1001106,
                            _ver: 1
                        }
                    ]
                },
                {
                    pxrId: '58di2dfse2.test.org3',
                    dataOperations: [
                        {
                            _value: 1001107,
                            _ver: null
                        }
                    ]
                }
            ]);
        });
        test('異常：Cookie使用, 個人メンバー', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(200, '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00');

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.settingsTarget)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：Cookie使用, APPメンバー', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(200, '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e02');

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.settingsTarget)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type2_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e02']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：Cookieが存在するが空', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(200, 'e89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296');

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.settingsTarget)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type1_session=' + '']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_SESSION);
        });
        test('異常：Cookie使用, オペレータサービス応答204', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(204, 'e89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296');

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.settingsTarget)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type2_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e02']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.IS_NOT_AUTHORIZATION_SESSION);
        });
        test('異常：Cookie使用, オペレータサービス応答400系', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(400, 'e89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296');

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.settingsTarget)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type2_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e02']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.IS_NOT_AUTHORIZATION_SESSION);
        });
        test('異常：Cookie使用, オペレータサービス応答500系', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(500, 'e89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296');

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.settingsTarget)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type2_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e02']);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：セッション(オペレータサービス未起動)', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.settingsTarget)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type2_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e02']);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常：セッションなし', async () => {
            // スタブサーバー起動

            // 対象APIに送信
            const response = await supertest(expressApp).get(Url.settingsTarget)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_SESSION);
        });
    });
});
