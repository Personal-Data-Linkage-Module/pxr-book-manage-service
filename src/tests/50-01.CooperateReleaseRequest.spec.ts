/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { Session } from './Session';
import { sprintf } from 'sprintf-js';
import { StubOperatorService } from './StubOperatorServer';
import Config from '../common/Config';
const Message = Config.ReadConfig('./config/message.json');

// 対象アプリケーションを取得
const app = new Application();
const expressApp = app.express.app;
const common = new Common();

// サーバをlisten
app.start();

// スタブサーバー
let _operatorServer: StubOperatorService = null;

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
    });
    /**
     * 各テスト実行の前処理
     */
    beforeEach(async () => {
        // DB接続
        await common.connect();
        // DB初期化
        await common.executeSqlFile('initialData.sql');
        // 事前データ準備
        await common.executeSqlFile('initialCooperateReleaseRequesty.sql');
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
     * 全テスト実行の後処理
     */
    afterAll(async () => {
        // サーバ停止
        app.stop();
    });

    /**
     * 利用者ID連携解除申請
     */
    describe('利用者ID連携解除申請', () => {
        test('パラメータ不足：リクエストが空', async () => {
            const json = JSON.stringify({});

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestReleaseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_IS_EMPTY);
        });
        test('パラメータ不足：リクエストが配列', async () => {
            const json = JSON.stringify([{
                pxrId: '58di2dfse2.test.org',
                actor: {
                    _value: 1000004,
                    _ver: 1
                },
                app: null,
                wf: {
                    _value: 1000007,
                    _ver: 1
                },
                userId: 'userid01'
            }]);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestReleaseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNEXPECTED_ARRAY_REQUEST);
        });
        test('パラメータ不足：actor._value', async () => {
            const json = JSON.stringify({
                pxrId: '58di2dfse2.test.org',
                actor: {
                    _ver: 1
                },
                app: null,
                wf: {
                    _value: 1000007,
                    _ver: 1
                },
                userId: 'wf-demo001'
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestReleaseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ不足：actor._ver', async () => {
            const json = JSON.stringify({
                pxrId: '58di2dfse2.test.org',
                actor: {
                    _value: 1000004
                },
                app: null,
                wf: {
                    _value: 1000007,
                    _ver: 1
                },
                userId: 'wf-demo001'
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestReleaseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：actor._value(数字以外)', async () => {
            const json = JSON.stringify({
                pxrId: '58di2dfse2.test.org',
                actor: {
                    _value: 'a',
                    _ver: 1
                },
                app: null,
                wf: {
                    _value: 1000007,
                    _ver: 1
                },
                userId: 'wf-demo001'
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestReleaseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：actor._ver(数字以外)', async () => {
            const json = JSON.stringify({
                pxrId: '58di2dfse2.test.org',
                actor: {
                    _value: 1000004,
                    _ver: 'a'
                },
                app: null,
                wf: {
                    _value: 1000007,
                    _ver: 1
                },
                userId: 'wf-demo001'
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestReleaseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：app._value(数字以外)', async () => {
            const json = JSON.stringify({
                pxrId: '58di2dfse2.test.org',
                actor: {
                    _value: 1000004,
                    _ver: 1
                },
                app: {
                    _value: 'a',
                    _ver: 1
                },
                wf: null,
                userId: 'wf-demo001'
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestReleaseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：app._ver(数字以外)', async () => {
            const json = JSON.stringify({
                pxrId: '58di2dfse2.test.org',
                actor: {
                    _value: 1000004,
                    _ver: 1
                },
                app: {
                    _value: 1000007,
                    _ver: 'a'
                },
                wf: null,
                userId: 'wf-demo001'
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestReleaseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：wf._value(数字以外)', async () => {
            const json = JSON.stringify({
                pxrId: '58di2dfse2.test.org',
                actor: {
                    _value: 1000004,
                    _ver: 1
                },
                app: null,
                wf: {
                    _value: 'a',
                    _ver: 1
                },
                userId: 'wf-demo001'
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestReleaseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：wf._ver(数字以外)', async () => {
            const json = JSON.stringify({
                pxrId: '58di2dfse2.test.org',
                actor: {
                    _value: 1000004,
                    _ver: 1
                },
                app: null,
                wf: {
                    _value: 1000007,
                    _ver: 'a'
                },
                userId: 'wf-demo001'
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestReleaseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：region._value(数字以外)', async () => {
            const json = JSON.stringify({
                pxrId: '58di2dfse2.test.org',
                actor: {
                    _value: 1000004,
                    _ver: 1
                },
                app: null,
                wf: null,
                region: {
                    _value: 'a',
                    _ver: 1
                },
                userId: 'userid01'
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestReleaseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：region._ver(数字以外)', async () => {
            const json = JSON.stringify({
                pxrId: '58di2dfse2.test.org',
                actor: {
                    _value: 1000004,
                    _ver: 1
                },
                app: null,
                wf: null,
                region: {
                    _value: 1000007,
                    _ver: 'a'
                },
                userId: 'userid01'
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestReleaseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：pxrId(文字列以外)', async () => {
            const json = JSON.stringify({
                pxrId: 123456789,
                actor: {
                    _value: 1000004,
                    _ver: 1
                },
                app: null,
                wf: {
                    _value: 1000007,
                    _ver: 1
                },
                userId: 'wf-demo001'
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestReleaseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isString);
        });
        test('パラメータ異常：userId(文字列以外)', async () => {
            const json = JSON.stringify({
                pxrId: '58di2dfse2.test.org',
                actor: {
                    _value: 1000004,
                    _ver: 1
                },
                app: null,
                wf: {
                    _value: 1000007,
                    _ver: 1
                },
                userId: 123456789
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestReleaseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isString);
        });
        test('パラメータ異常：wfが設定されている', async () => {
            const json = JSON.stringify({
                pxrId: '58di2dfse2.test.org',
                actor: {
                    _value: 1000004,
                    _ver: 1
                },
                app: null,
                wf: {
                    _value: 1000007,
                    _ver: 1
                },
                userId: 'wf-demo001'
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestReleaseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
        test('パラメータ異常：app, regionが共に設定されている', async () => {
            const json = JSON.stringify({
                pxrId: '58di2dfse2.test.org',
                actor: {
                    _value: 1000004,
                    _ver: 1
                },
                app: {
                    _value: 1000005,
                    _ver: 1
                },
                region: {
                    _value: 1000007,
                    _ver: 1
                },
                userId: 'wf-demo001'
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestReleaseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.SET_WF_AND_APP);
        });
        test('パラメータ異常：運営メンバーの場合にpxrIdが無い', async () => {
            const json = JSON.stringify({
                actor: {
                    _value: 1000004,
                    _ver: 1
                },
                wf: null,
                app: {
                    _value: 1000007,
                    _ver: 1
                },
                userId: 'wf-demo001'
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestReleaseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.NO_PARAM, 'pxrId'));
        });
        test('パラメータ異常：個人の場合にpxrIdがある', async () => {
            const json = JSON.stringify({
                pxrId: '58di2dfse2.test.org',
                actor: {
                    _value: 1000004,
                    _ver: 1
                },
                wf: null,
                app: {
                    _value: 1000007,
                    _ver: 1
                },
                userId: 'wf-demo001'
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestReleaseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.noPxrId) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.validation.isEmpty + ': pxrId');
        });
        test('異常：Bookが取得できない', async () => {
            const json = JSON.stringify({
                pxrId: 'test03.test.org',
                actor: {
                    _value: 1000004,
                    _ver: 1
                },
                wf: null,
                app: {
                    _value: 1000007,
                    _ver: 1
                },
                userId: 'wf-demo001'
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestReleaseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(404);
            expect(response.body.message).toBe(Message.TARGET_NO_DATA);
        });
        test('異常：利用者連携が取得できない', async () => {
            const json = JSON.stringify({
                pxrId: '58di2dfse2.test.org',
                actor: {
                    _value: 9999999,
                    _ver: 1
                },
                wf: null,
                app: {
                    _value: 1000007,
                    _ver: 1
                },
                userId: 'nocoope'
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestReleaseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.BOOK_COOPERATE_NOT_EXISTS);
        });
        test('正常：個人で実行 app連携', async () => {
            const json = JSON.stringify({
                actor: {
                    _value: 1000104,
                    _ver: 1
                },
                app: {
                    _value: 1000007,
                    _ver: 1
                },
                wf: null,
                userId: 'userid03'
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestReleaseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.cooperateReleaseRequestInd) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.pxrId).toBe('58di2dfse2.test.org');
            expect(response.body.userId).toBe('userid03');
            expect(response.body.actor._value).toBe(1000104);
            expect(response.body.actor._ver).toBe(1);
            expect(response.body.app._value).toBe(1000007);
            expect(response.body.app._ver).toBe(1);
            expect(response.body.wf).toBe(undefined);
            expect(response.body.status).toBe(1);
        });
        test('正常：個人で実行 region連携', async () => {
            const json = JSON.stringify({
                actor: {
                    _value: 1000104,
                    _ver: 1
                },
                region: {
                    _value: 1000007,
                    _ver: 1
                },
                app: null,
                wf: null,
                userId: 'userid02'
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestReleaseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.cooperateReleaseRequestInd) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.pxrId).toBe('58di2dfse2.test.org');
            expect(response.body.userId).toBe('userid02');
            expect(response.body.actor._value).toBe(1000104);
            expect(response.body.actor._ver).toBe(1);
            expect(response.body.region._value).toBe(1000007);
            expect(response.body.region._ver).toBe(1);
            expect(response.body.app).toBe(undefined);
            expect(response.body.wf).toBe(undefined);
            expect(response.body.status).toBe(1);
        });
        test('正常：userId無しで実行', async () => {
            _operatorServer = new StubOperatorService(200, 0, 1000110, 1000001);

            const json = JSON.stringify({
                actor: {
                    _value: 1000104,
                    _ver: 1
                },
                app: {
                    _value: 1000007,
                    _ver: 1
                },
                wf: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestReleaseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.cooperateReleaseRequestInd) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.pxrId).toBe('58di2dfse2.test.org');
            expect(response.body.actor._value).toBe(1000104);
            expect(response.body.actor._ver).toBe(1);
            expect(response.body.app._value).toBe(1000007);
            expect(response.body.app._ver).toBe(1);
            expect(response.body.wf).toBe(undefined);
            expect(response.body.status).toBe(1);
        });
        test('正常：app、wf両方無しで実行(Data-Trader)', async () => {
            _operatorServer = new StubOperatorService(200, 3, 1000109, 1000020);

            const json = JSON.stringify({
                pxrId: '58di2dfse2.test.org',
                actor: {
                    _value: 1000104,
                    _ver: 1
                },
                app: null,
                wf: null,
                userId: 'userid02'
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestReleaseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.pxrId).toBe('58di2dfse2.test.org');
            expect(response.body.userId).toBe('userid02');
            expect(response.body.actor._value).toBe(1000104);
            expect(response.body.actor._ver).toBe(1);
            expect(response.body.app).toBe(undefined);
            expect(response.body.wf).toBe(undefined);
            expect(response.body.region._value).toBe(1000007);
            expect(response.body.region._ver).toBe(1);
            expect(response.body.status).toBe(1);
        });
        test('異常：APPで実行', async () => {
            _operatorServer = new StubOperatorService(200, 2, 1000110, 1000001);
            const json = JSON.stringify({
                pxrId: '58di2dfse2.test.org',
                actor: {
                    _value: 1000104,
                    _ver: 1
                },
                region: {
                    _value: 1000007,
                    _ver: 1
                },
                app: null,
                wf: null,
                userId: 'userid01'
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestReleaseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type2_session=437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：WF職員で実行', async () => {
            _operatorServer = new StubOperatorService(200, 1, 1000110, 1000001);
            const json = JSON.stringify({
                pxrId: '58di2dfse2.test.org',
                actor: {
                    _value: 1000104,
                    _ver: 1
                },
                region: {
                    _value: 1000007,
                    _ver: 1
                },
                app: null,
                wf: null,
                userId: 'userid01'
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestReleaseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.bookCloseDelete1) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：オペレーターサービスからのレスポンスが204', async () => {
            _operatorServer = new StubOperatorService(204, 0, 1000110, 1000001);

            const json = JSON.stringify({
                pxrId: '58di2dfse2.test.org',
                actor: {
                    _value: 1010004,
                    _ver: 1
                },
                app: {
                    _value: 1010007,
                    _ver: 1
                },
                wf: null,
                userId: 'userid01'
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestReleaseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.IS_NOT_AUTHORIZATION_SESSION);
        });
        test('異常：オペレーターサービスからのレスポンスが400', async () => {
            _operatorServer = new StubOperatorService(400, 0, 1000110, 1000001);

            const json = JSON.stringify({
                pxrId: '58di2dfse2.test.org',
                actor: {
                    _value: 1010004,
                    _ver: 1
                },
                app: {
                    _value: 1010007,
                    _ver: 1
                },
                wf: null,
                userId: 'userid01'
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestReleaseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.IS_NOT_AUTHORIZATION_SESSION);
        });
        test('異常：オペレーターサービスからのレスポンスが500', async () => {
            _operatorServer = new StubOperatorService(500, 0, 1000110, 1000001);

            const json = JSON.stringify({
                pxrId: '58di2dfse2.test.org',
                actor: {
                    _value: 1010004,
                    _ver: 1
                },
                app: {
                    _value: 1010007,
                    _ver: 1
                },
                wf: null,
                userId: 'userid01'
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestReleaseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：オペレーターサービスへの接続に失敗', async () => {
            const json = JSON.stringify({
                pxrId: '58di2dfse2.test.org',
                actor: {
                    _value: 1010004,
                    _ver: 1
                },
                app: {
                    _value: 1010007,
                    _ver: 1
                },
                wf: null,
                userId: 'userid01'
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestReleaseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常：セッション情報がない', async () => {
            const json = JSON.stringify({
                pxrId: '58di2dfse2.test.org',
                actor: {
                    _value: 1010004,
                    _ver: 1
                },
                app: {
                    _value: 1010007,
                    _ver: 1
                },
                wf: null,
                userId: 'userid01'
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestReleaseURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_SESSION);
        });
    });
});
