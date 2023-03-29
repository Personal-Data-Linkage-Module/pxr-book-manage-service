/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { Session } from './Session';
import StubOperatorServer, { StubOperatorServerBookSearchUser } from './StubOperatorServer';
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

// レスポンス用userIdCooperation
const userIdCooperationApp: any = [{
    actor: {
        _value: 1000104,
        _ver: 1
    },
    app: {
        _value: 1000009,
        _ver: 1
    },
    wf: null,
    userId: 'userid02',
    startAt: null,
    status: 0
}];
const userIdCooperationNotUserInfo: any = [
    {
        actor: {
            _value: 2000003,
            _ver: 1
        },
        app: null,
        wf: null,
        userId: 'not.userInfo',
        startAt: null,
        status: 0
    },
    {
        actor: {
            _value: 2000003,
            _ver: 1
        },
        app: {
            _value: 1000005,
            _ver: 1
        },
        wf: null,
        userId: 'not.userInfo',
        startAt: null,
        status: 0
    },
    {
        actor: {
            _value: 2000003,
            _ver: 1
        },
        app: null,
        wf: null,
        userId: 'not.userInfo',
        startAt: null,
        status: 0
    }];

// レスポンス用userInformation
const userInformation: any = {
    id: 1,
    type: 0,
    loginId: 'loginid',
    hpassword: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    pxrId: '58di2dfse2.test.org',
    userInformation: null,
    name: null,
    mobilePhone: '09011112222',
    mail: null,
    auth: '{"member":{"add":true,"update":true,"delete":true},"actor":{"application":true,"approval":true},"book":{"create":true},"catalog":{"create":true},"setting":{"update":true}}',
    lastLoginAt: null,
    passwordChangeFlg: false,
    loginProhibitedFlg: false,
    attributes: '{"initialPasswordExpire":"2020-03-01T12:00:00.000+9:00","smsAuth":false}',
    lockFlg: false,
    lockStartAt: null,
    passwordUpdateAt: '2020-07-08T14:08:10.068+0900',
    isDisabled: false,
    createdBy: 'loginId',
    createdAt: '2020-07-08T14:08:10.068+0900',
    updatedBy: 'loginId',
    updatedAt: '2020-07-08T14:08:10.068+0900'
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
                userId: 'not.user',
                actor: 9999999
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchUserURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(204);
        });
        test('異常：流通制御、wf指定', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(200);

            // 送信データを生成
            const json = {
                userId: 'userid01',
                wf: 1000007
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchUserURI)
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
                userId: 'userid02',
                app: 1000009
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchUserURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({
                pxrId: '58di2dfse2.test.org',
                attributes: null,
                cooperation: userIdCooperationApp,
                userInformation: userInformation,
                status: 0
            });
        });
        test('正常：アクター指定 対象データあり', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerBookSearchUser(200);

            // 送信データを生成
            const json = {
                userId: 'not.userInfo',
                actor: 2000003
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchUserURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({
                pxrId: 'not.userInfo',
                attributes: null,
                cooperation: userIdCooperationNotUserInfo,
                userInformation: null,
                status: 0
            });
        });
        test('正常：Cookie使用, 運営メンバー', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(200, '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e03');

            // 送信データを生成
            const json = {
                userId: 'userid02',
                actor: 1000104
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchUserURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e03'])
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({
                pxrId: '58di2dfse2.test.org',
                attributes: null,
                cooperation: userIdCooperationApp,
                userInformation: userInformation,
                status: 0
            });
        });
        test('異常：Cookieが存在するが空', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(200);

            // 送信データを生成
            const json = {
                userId: 'userid01',
                actor: 1000004
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchUserURI)
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
                userId: 'userid01',
                actor: 1000004
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchUserURI)
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
                userId: 'userid01',
                actor: 1000004
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchUserURI)
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
                userId: 'userid01',
                actor: 1000004
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchUserURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：利用者情報取得でオペレータサービス応答400', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(400);

            // 送信データを生成
            const json = {
                userId: 'userid02',
                actor: 1000104
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchUserURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.FAILED_GET_USER_INFORMATION);
        });
        test('異常：利用者情報取得でオペレータサービス応答500系', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(500);

            // 送信データを生成
            const json = {
                userId: 'userid02',
                actor: 1000104
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchUserURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_GET_USER_INFORMATION);
        });
        test('異常：利用者情報取得でオペレータサービス応答200以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(203);

            // 送信データを生成
            const json = {
                userId: 'userid02',
                actor: 1000104
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchUserURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.FAILED_GET_USER_INFORMATION);
        });
        test('異常：利用者情報取得でオペレータサービス接続失敗', async () => {
            // スタブサーバー起動

            // 送信データを生成
            const json = {
                userId: 'userid02',
                actor: 1000104
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchUserURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('正常：利用者情報取得でオペレータサービス応答204', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(204);

            // 送信データを生成
            const json = {
                userId: 'userid02',
                actor: 1000104
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchUserURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(503);
        });
        test('異常：セッション(セッションなし)', async () => {
            // 送信データを生成
            const json = {
                userId: 'userid01',
                actor: 1000004
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchUserURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_SESSION);
        });
        test('異常：セッション(オペレータサービス未起動)', async () => {
            // 送信データを生成
            const json = {
                userId: 'userid01',
                actor: 1000004
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchUserURI)
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
            const response = await supertest(expressApp).post(Url.searchUserURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_IS_EMPTY);
        });
    });
});
