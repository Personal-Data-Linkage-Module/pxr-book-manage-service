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
     * 利用者ID連携
     */
    describe('利用者ID連携申請', () => {
        beforeAll(async () => {
            // DB接続
            await common.connect();
            // 事前データ準備
            await common.executeSqlString(`
                insert into pxr_book_manage.my_condition_book (pxr_id, attributes, is_disabled, created_by, created_at, updated_by, updated_at)
                values('test01.test.org', null, false, 'pxr_root_member01', '2020-04-22 00:00:00.001', 'pxr_root_member01', '2020-04-22 00:00:00.001');
                insert into pxr_book_manage.identification (book_id, identification_code, identification_version, template, template_hash, is_disabled, created_by, created_at, updated_by, updated_at)
                values(1, 30001, 1, '{"_code":{"_value":30001,"_ver":1},"item-group":[{"title":"氏名","item":[{"title":"姓","type":{"_value":30019,"_ver":1},"content":"アップローダ"},{"title":"名","type":{"_value":30020,"_ver":1},"content":"太郎"}]},{"title":"性別","item":[{"title":"性別","type":{"_value":30021,"_ver":1},"content":"男"}]},{"title":"生年月日","item":[{"title":"生年月日","type":{"_value":30022,"_ver":1},"content":"2000-04-01"}]}]}', '9f8a075f4195864b2265c8d899aa9874cdb3b8b1608f5f7f75d487be4fd905cd', false, 'pxr_root_member01', '2020-04-22 00:00:00.001', 'pxr_root_member01', '2020-04-22 00:00:00.001');
                insert into pxr_book_manage.user_id_cooperate (book_id, actor_catalog_code, actor_catalog_version, app_catalog_code, app_catalog_version, user_id, status, start_at, is_disabled, created_by, created_at, updated_by, updated_at)
                values (1, 1000005, 1, 1000008, 1, 'wf-demo002', 2, '2020-04-22 00:00:00.001', true, 'pxr_root_member01', '2020-04-22 00:00:00.001', 'pxr_root_member01', '2020-04-22 00:00:00.001');
                insert into pxr_book_manage.my_condition_book (pxr_id, attributes, is_disabled, created_by, created_at, updated_by, updated_at)
                values('test02.test.org', null, false, 'pxr_root_member01', '2020-04-22 00:00:00.001', 'pxr_root_member01', '2020-04-22 00:00:00.001');
                insert into pxr_book_manage.identification (book_id, identification_code, identification_version, template, template_hash, is_disabled, created_by, created_at, updated_by, updated_at)
                values(2, 30001, 1, '{"_code":{"_value":30001,"_ver":1},"item-group":[{"title":"氏名","item":[{"title":"姓","type":{"_value":30019,"_ver":1},"content":"アップローダ"},{"title":"名","type":{"_value":30020,"_ver":1},"content":"太郎"}]},{"title":"性別","item":[{"title":"性別","type":{"_value":30021,"_ver":1},"content":"男"}]},{"title":"生年月日","item":[{"title":"生年月日","type":{"_value":30022,"_ver":1},"content":"2000-04-01"}]}]}', '9f8a075f4195864b2265c8d899aa9874cdb3b8b1608f5f7f75d487be4fd905cd', false, 'pxr_root_member01', '2020-04-22 00:00:00.001', 'pxr_root_member01', '2020-04-22 00:00:00.001');
            `);
        });
        test('パラメータ不足：リクエストが空', async () => {
            const json = JSON.stringify({});

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_IS_EMPTY);
        });
        test('パラメータ不足：actor', async () => {
            const json = JSON.stringify({
                pxrId: 'test01.test.org',
                app: null,
                wf: {
                    _value: 1000007,
                    _ver: 1
                },
                userId: 'wf-demo001'
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ不足：actor._value', async () => {
            const json = JSON.stringify({
                pxrId: 'test01.test.org',
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
            const response = await supertest(expressApp).post(Url.cooperateRequestURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ不足：actor._ver', async () => {
            const json = JSON.stringify({
                pxrId: 'test01.test.org',
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
            const response = await supertest(expressApp).post(Url.cooperateRequestURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：actor._value(数字以外)', async () => {
            const json = JSON.stringify({
                pxrId: 'test01.test.org',
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
            const response = await supertest(expressApp).post(Url.cooperateRequestURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：actor._ver(数字以外)', async () => {
            const json = JSON.stringify({
                pxrId: 'test01.test.org',
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
            const response = await supertest(expressApp).post(Url.cooperateRequestURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：app._value(数字以外)', async () => {
            const json = JSON.stringify({
                pxrId: 'test01.test.org',
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
            const response = await supertest(expressApp).post(Url.cooperateRequestURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：app._ver(数字以外)', async () => {
            const json = JSON.stringify({
                pxrId: 'test01.test.org',
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
            const response = await supertest(expressApp).post(Url.cooperateRequestURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：wf._value(数字以外)', async () => {
            const json = JSON.stringify({
                pxrId: 'test01.test.org',
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
            const response = await supertest(expressApp).post(Url.cooperateRequestURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：wf._ver(数字以外)', async () => {
            const json = JSON.stringify({
                pxrId: 'test01.test.org',
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
            const response = await supertest(expressApp).post(Url.cooperateRequestURI)
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
            const response = await supertest(expressApp).post(Url.cooperateRequestURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isString);
        });
        test('パラメータ異常：userId(文字列以外)', async () => {
            const json = JSON.stringify({
                pxrId: 'test01.test.org',
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
            const response = await supertest(expressApp).post(Url.cooperateRequestURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isString);
        });
        test('パラメータ異常：リクエストが配列', async () => {
            const json = JSON.stringify([{
                pxrId: 'test01.test.org',
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
            }]);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNEXPECTED_ARRAY_REQUEST);
        });
        test('パラメータ異常：wfが設定されている', async () => {
            const json = JSON.stringify({
                pxrId: 'test01.test.org',
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
            const response = await supertest(expressApp).post(Url.cooperateRequestURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
        test('パラメータ異常：appとregionが共に設定されている', async () => {
            const json = JSON.stringify({
                pxrId: 'test01.test.org',
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
            const response = await supertest(expressApp).post(Url.cooperateRequestURI)
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
                app: {
                    _value: 1000005,
                    _ver: 1
                },
                wf: null,
                userId: 'wf-demo001'
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.NO_PARAM, 'pxrId'));
        });
        test('パラメータ異常：個人の場合にpxrIdがある', async () => {
            const json = JSON.stringify({
                pxrId: 'test01.test.org',
                actor: {
                    _value: 1000117,
                    _ver: 1
                },
                wf: null,
                app: {
                    _value: 1000120,
                    _ver: 1
                },
                userId: 'wf-demo001'
            });

            const session = {
                sessionId: 'sessionId',
                operatorId: 1,
                type: 0,
                loginId: 'test01.test.org',
                pxrId: 'test01.test.org',
                mobilePhone: '0311112222',
                lastLoginAt: '2020-01-01T00:00:00.000+0900',
                attributes: {},
                block: {
                    _value: 1000110,
                    _ver: 1
                },
                actor: {
                    _value: 1000001,
                    _ver: 1
                }
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(session) })
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
            const response = await supertest(expressApp).post(Url.cooperateRequestURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(404);
            expect(response.body.message).toBe(Message.TARGET_NO_DATA);
        });
        test('正常：運営メンバーで実行', async () => {
            const json = JSON.stringify({
                pxrId: 'test01.test.org',
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
            const response = await supertest(expressApp).post(Url.cooperateRequestURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.pxrId).toBe('test01.test.org');
            expect(response.body.userId).toBe('wf-demo001');
            expect(response.body.actor._value).toBe(1000004);
            expect(response.body.actor._ver).toBe(1);
            expect(response.body.wf).toBe(undefined);
            expect(response.body.app._value).toBe(1000007);
            expect(response.body.app._ver).toBe(1);
            expect(response.body.status).toBe(0);
        });
        test('正常：個人で実行', async () => {
            const json = JSON.stringify({
                actor: {
                    _value: 1000117,
                    _ver: 1
                },
                wf: null,
                app: {
                    _value: 1000120,
                    _ver: 1
                },
                userId: 'wf-demo001'
            });

            const session = {
                sessionId: 'sessionId',
                operatorId: 1,
                type: 0,
                loginId: 'test01.test.org',
                pxrId: 'test01.test.org',
                mobilePhone: '0311112222',
                lastLoginAt: '2020-01-01T00:00:00.000+0900',
                attributes: {},
                block: {
                    _value: 1000110,
                    _ver: 1
                },
                actor: {
                    _value: 1000001,
                    _ver: 1
                }
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(session) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.pxrId).toBe('test01.test.org');
            expect(response.body.userId).toBe('wf-demo001');
            expect(response.body.actor._value).toBe(1000117);
            expect(response.body.actor._ver).toBe(1);
            expect(response.body.wf).toBe(undefined);
            expect(response.body.app._value).toBe(1000120);
            expect(response.body.app._ver).toBe(1);
            expect(response.body.status).toBe(0);
        });
        test('正常：個人で実行 region連携', async () => {
            const json = JSON.stringify({
                actor: {
                    _value: 1000117,
                    _ver: 1
                },
                app: null,
                wf: null,
                region: {
                    _value: 1000120,
                    _ver: 1
                },
                userId: 'region-demo001'
            });

            const session = {
                sessionId: 'sessionId',
                operatorId: 1,
                type: 0,
                loginId: 'test01.test.org',
                pxrId: 'test01.test.org',
                mobilePhone: '0311112222',
                lastLoginAt: '2020-01-01T00:00:00.000+0900',
                attributes: {},
                block: {
                    _value: 1000110,
                    _ver: 1
                },
                actor: {
                    _value: 1000001,
                    _ver: 1
                }
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(session) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.pxrId).toBe('test01.test.org');
            expect(response.body.userId).toBe('region-demo001');
            expect(response.body.actor._value).toBe(1000117);
            expect(response.body.actor._ver).toBe(1);
            expect(response.body.app).toBe(undefined);
            expect(response.body.wf).toBe(undefined);
            expect(response.body.region._value).toBe(1000120);
            expect(response.body.region._ver).toBe(1);
            expect(response.body.status).toBe(0);
        });
        test('異常：連携が既に存在する', async () => {
            const json = JSON.stringify({
                pxrId: 'test01.test.org',
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
            const response = await supertest(expressApp).post(Url.cooperateRequestURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.BOOK_COOPERATE_EXISTS);
        });
        test('異常：既に使用されている利用者ID', async () => {
            const json = JSON.stringify({
                pxrId: 'test02.test.org',
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
            const response = await supertest(expressApp).post(Url.cooperateRequestURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.USER_ID_ALREADY_USERD);
        });
        test('異常：既に使用されている利用者ID(削除済み利用者ID)', async () => {
            const json = JSON.stringify({
                pxrId: 'test02.test.org',
                actor: {
                    _value: 1000005,
                    _ver: 1
                },
                wf: null,
                app: {
                    _value: 1000008,
                    _ver: 1
                },
                userId: 'wf-demo002'
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.USER_ID_ALREADY_USERD);
        });
        test('正常：userId無しで実行', async () => {
            _operatorServer = new StubOperatorService(200, 0, 1000110, 1000001);

            const json = JSON.stringify({
                actor: {
                    _value: 1010004,
                    _ver: 1
                },
                app: {
                    _value: 1010007,
                    _ver: 1
                },
                wf: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.pxrId).toBe('test01.test.org');
            expect(response.body.actor._value).toBe(1010004);
            expect(response.body.actor._ver).toBe(1);
            expect(response.body.app._value).toBe(1010007);
            expect(response.body.app._ver).toBe(1);
            expect(response.body.wf).toBe(undefined);
            expect(response.body.status).toBe(0);
        });
        test('正常：app、wf両方無しで実行(Data-Trader)', async () => {
            _operatorServer = new StubOperatorService(200, 3, 1000109, 1000020);

            const json = JSON.stringify({
                pxrId: 'test01.test.org',
                actor: {
                    _value: 1000020,
                    _ver: 1
                },
                app: null,
                wf: null,
                userId: 'trader-demo001'
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.pxrId).toBe('test01.test.org');
            expect(response.body.userId).toBe('trader-demo001');
            expect(response.body.actor._value).toBe(1000020);
            expect(response.body.actor._ver).toBe(1);
            expect(response.body.app).toBe(undefined);
            expect(response.body.wf).toBe(undefined);
            expect(response.body.status).toBe(0);
        });
        test('異常：オペレーターサービスからのレスポンスが204', async () => {
            _operatorServer = new StubOperatorService(204, 0, 1000110, 1000001);

            const json = JSON.stringify({
                actor: {
                    _value: 1010004,
                    _ver: 1
                },
                app: {
                    _value: 1010007,
                    _ver: 1
                },
                wf: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestURI)
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
                actor: {
                    _value: 1010004,
                    _ver: 1
                },
                app: {
                    _value: 1010007,
                    _ver: 1
                },
                wf: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestURI)
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
                actor: {
                    _value: 1010004,
                    _ver: 1
                },
                app: {
                    _value: 1010007,
                    _ver: 1
                },
                wf: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：オペレーターサービスへの接続に失敗', async () => {
            const json = JSON.stringify({
                actor: {
                    _value: 1010004,
                    _ver: 1
                },
                app: {
                    _value: 1010007,
                    _ver: 1
                },
                wf: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常：セッション情報がない', async () => {
            const json = JSON.stringify({
                actor: {
                    _value: 1010004,
                    _ver: 1
                },
                app: {
                    _value: 1010007,
                    _ver: 1
                },
                wf: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_SESSION);
        });
        test('異常：WF職員で実行', async () => {
            _operatorServer = new StubOperatorService(200, 1, 1000112, 1000004);

            const json = JSON.stringify({
                actor: {
                    _value: 1000004,
                    _ver: 1
                },
                wf: null,
                app: {
                    _value: 1000007,
                    _ver: 1
                }
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.bookCloseDelete1) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：アプリケーションで実行', async () => {
            _operatorServer = new StubOperatorService(200, 2, 1010112, 1010004);

            const json = JSON.stringify({
                actor: {
                    _value: 1010004,
                    _ver: 1
                },
                app: {
                    _value: 1010007,
                    _ver: 1
                },
                wf: null
            });

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.cooperateRequestURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type2_session=437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
    });
});
