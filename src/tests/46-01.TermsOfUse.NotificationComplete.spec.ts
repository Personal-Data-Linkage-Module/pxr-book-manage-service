/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Application } from '../resources/config/Application';
import supertest = require('supertest');
import Common, { Url } from './Common';
import Config from '../common/Config';
import { StubOperatorServerType0 } from './StubOperatorServer';
import { Session } from './Session';
/* eslint-enable */
const Message = Config.ReadConfig('./config/message.json');

const app = new Application();
const expressApp = app.express.app;
const common = new Common();
app.start();

let _operatorServer: StubOperatorServerType0;

describe('book-mange API', () => {
    /**
     * 全テスト実行の前処理
     */
    beforeAll(async () => {
        await common.connect();
        await common.executeSqlFile('initialData.sql');
        await common.executeSqlFile('initialDataBook.sql');
        await common.executeSqlString(`
            INSERT INTO pxr_book_manage.terms_of_use_notification
            (
                terms_type, _value, _ver, status,
                is_disabled, created_by, created_at, updated_by, updated_at
            )
            VALUES
            (
                1, 1000009, 1, 0,
                false, 'pxr_user', NOW(), 'pxr_user', NOW()
            ),
            (
                1, 1000010, null, 1,
                false, 'pxr_user', NOW(), 'pxr_user', NOW()
            ),
            (
                2, 1000109, 1, 0,
                false, 'pxr_user', NOW(), 'pxr_user', NOW()
            );
            INSERT INTO pxr_book_manage.terms_of_use_notification_ind
            (
                terms_of_use_notification_id, book_id, status, last_sent_at,
                is_disabled, created_by, created_at, updated_by, updated_at
            )
            VALUES
            (
                1, 1, 0, null,
                false, 'pxr_user', NOW(), 'pxr_user', NOW()
            ),
            (
                2, 1, 1, null,
                false, 'pxr_user', NOW(), 'pxr_user', NOW()
            ),
            (
                3, 1, 0, null,
                false, 'pxr_user', NOW(), 'pxr_user', NOW()
            );
        `);
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
     * Region利用規約更新通知最終送信日時登録
     */

    describe('Region利用規約更新通知最終送信日時登録', () => {
        test('正常：Cookie使用、運営', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.termsOfUseRegion + '/notification/complete')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        pxrId: 'dummy.test.org'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
        });
        test('正常：（セッション）運営', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.termsOfUseRegion + '/notification/complete')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(
                    {
                        pxrId: 'dummy.test.org'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
        });
        test('パラメータ不足：pxrId', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.termsOfUseRegion + '/notification/complete')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify({}));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('pxrId');
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('異常：Cookie使用、個人', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 0);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.termsOfUseRegion + '/notification/complete')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        pxrId: 'dummy.test.org'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：Cookie使用、ワークフロー', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 1);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.termsOfUseRegion + '/notification/complete')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type1_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        pxrId: 'dummy.test.org'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_SESSION);
        });
        test('異常：Cookie使用、アプリケーション', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 2);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.termsOfUseRegion + '/notification/complete')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type2_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        pxrId: 'dummy.test.org'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：セッション(個人)', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.termsOfUseRegion + '/notification/complete')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(JSON.stringify(
                    {
                        pxrId: 'dummy.test.org'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：セッション(ワークフロー)', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.termsOfUseRegion + '/notification/complete')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot1) })
                .send(JSON.stringify(
                    {
                        pxrId: 'dummy.test.org'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：セッション(アプリケーション)', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.termsOfUseRegion + '/notification/complete')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot2) })
                .send(JSON.stringify(
                    {
                        pxrId: 'dummy.test.org'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：Cookieが存在するが空', async () => {
            // スタブサーバーを起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.termsOfUseRegion + '/notification/complete')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + ''])
                .send(JSON.stringify(
                    {
                        pxrId: 'dummy.test.org'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_SESSION);
        });
        test('異常：Cookie使用、オペレータサービス応答204', async () => {
            // スタブサーバーを起動
            _operatorServer = new StubOperatorServerType0(204, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.termsOfUseRegion + '/notification/complete')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        pxrId: 'dummy.test.org'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.IS_NOT_AUTHORIZATION_SESSION);
        });
        test('異常：Cookie使用、オペレータサービス応答400系', async () => {
            // スタブサーバーを起動
            _operatorServer = new StubOperatorServerType0(400, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.termsOfUseRegion + '/notification/complete')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        pxrId: 'dummy.test.org'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.IS_NOT_AUTHORIZATION_SESSION);
        });
        test('異常：Cookie使用、オペレータサービス応答500系', async () => {
            // スタブサーバーを起動
            _operatorServer = new StubOperatorServerType0(500, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.termsOfUseRegion + '/notification/complete')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        pxrId: 'dummy.test.org'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：セッション(オペレータサービス未起動)', async () => {
            // スタブサーバーを起動しない

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.termsOfUseRegion + '/notification/complete')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        pxrId: 'dummy.test.org'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常：セッションなし', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.termsOfUseRegion + '/notification/complete')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(JSON.stringify(
                    {
                        pxrId: 'dummy.test.org'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_SESSION);
        });
    });

    /**
     * PF利用規約更新通知最終送信日時登録
     */
    describe('PF利用規約更新通知最終送信日時登録', () => {
        test('正常：Cookie使用、運営', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.termsOfUsePlatform + '/notification/complete')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        pxrId: 'dummy.test.org'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
        });
        test('正常：（セッション）運営', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.termsOfUsePlatform + '/notification/complete')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(
                    {
                        pxrId: 'dummy.test.org'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
        });
        test('パラメータ不足：pxrId', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.termsOfUsePlatform + '/notification/complete')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify({}));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].property).toBe('pxrId');
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('異常：Cookie使用、個人', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 0);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.termsOfUsePlatform + '/notification/complete')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        pxrId: 'dummy.test.org'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：Cookie使用、ワークフロー', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 1);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.termsOfUsePlatform + '/notification/complete')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type1_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        pxrId: 'dummy.test.org'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_SESSION);
        });
        test('異常：Cookie使用、アプリケーション', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 2);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.termsOfUsePlatform + '/notification/complete')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type2_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        pxrId: 'dummy.test.org'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：セッション(個人)', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.termsOfUsePlatform + '/notification/complete')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send(JSON.stringify(
                    {
                        pxrId: 'dummy.test.org'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：セッション(ワークフロー)', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.termsOfUsePlatform + '/notification/complete')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot1) })
                .send(JSON.stringify(
                    {
                        pxrId: 'dummy.test.org'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：セッション(アプリケーション)', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.termsOfUsePlatform + '/notification/complete')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot2) })
                .send(JSON.stringify(
                    {
                        pxrId: 'dummy.test.org'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：Cookieが存在するが空', async () => {
            // スタブサーバーを起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.termsOfUsePlatform + '/notification/complete')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + ''])
                .send(JSON.stringify(
                    {
                        pxrId: 'dummy.test.org'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_SESSION);
        });
        test('異常：Cookie使用、オペレータサービス応答204', async () => {
            // スタブサーバーを起動
            _operatorServer = new StubOperatorServerType0(204, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.termsOfUsePlatform + '/notification/complete')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        pxrId: 'dummy.test.org'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.IS_NOT_AUTHORIZATION_SESSION);
        });
        test('異常：Cookie使用、オペレータサービス応答400系', async () => {
            // スタブサーバーを起動
            _operatorServer = new StubOperatorServerType0(400, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.termsOfUsePlatform + '/notification/complete')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        pxrId: 'dummy.test.org'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.IS_NOT_AUTHORIZATION_SESSION);
        });
        test('異常：Cookie使用、オペレータサービス応答500系', async () => {
            // スタブサーバーを起動
            _operatorServer = new StubOperatorServerType0(500, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.termsOfUsePlatform + '/notification/complete')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        pxrId: 'dummy.test.org'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：セッション(オペレータサービス未起動)', async () => {
            // スタブサーバーを起動しない

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.termsOfUsePlatform + '/notification/complete')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        pxrId: 'dummy.test.org'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常：セッションなし', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.termsOfUsePlatform + '/notification/complete')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(JSON.stringify(
                    {
                        pxrId: 'dummy.test.org'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_SESSION);
        });
    });
});
