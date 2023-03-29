/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Application } from '../resources/config/Application';
import supertest = require('supertest');
import Common, { Url } from './Common';
import Config from '../common/Config';
import StubOperatorServer from './StubOperatorServer';
/* eslint-enable */
const Message = Config.ReadConfig('./config/message.json');

const app = new Application();
const expressApp = app.express.app;
const common = new Common();
app.start();

let _operatorServer: StubOperatorServer;

describe('book-mange API', () => {
    /**
     * 全テスト実行の前処理
     */
    beforeAll(async () => {
        await common.connect();
        await common.executeSqlFile('initialData.sql');
        await common.executeSqlFile('initialIndAppendix.sql');
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
    });

    /**
     * appendix更新（個人）
     */
    describe('appendix更新（個人）', () => {
        test('正常：個人', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(200, '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00');

            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.appendixURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'sessionId'])
                .send(JSON.stringify(
                    {
                        appendix: {
                            test: 'test'
                        }
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
        });
        test('異常：運営', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(200, '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e03');

            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.appendixURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'sessionId'])
                .send(JSON.stringify(
                    {
                        appendix: {
                            test: 'test'
                        }
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.EMPTY_PXR_ID);
        });
        test('パラメーター異常：リクエストが空', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServer(200, '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e03');

            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.appendixURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'sessionId'])
                .send(JSON.stringify(
                    {
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_IS_EMPTY);
        });
    });
});
