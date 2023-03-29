/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { Session } from './Session';
import StubCatalogServer from './StubCatalogServer';
import StubOperatorServer, { StubOperatorServerBookSearch } from './StubOperatorServer';
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

// レスポンス用userIdCooperation
const userIdCooperationApp: any = [{
    actor: {
        _value: 1000004,
        _ver: 1
    },
    region: null,
    app: {
        _value: 1000007,
        _ver: 1
    },
    wf: null,
    userId: 'userid01',
    startAt: '2020-07-07T00:00:00.000+0900',
    status: 1
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
     * My-Condition-Book一覧取得
     */
    describe('My-Condition-Book一覧取得', () => {
        test('正常：流通制御、対象データなし', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);

            // 送信データを生成
            const json = {
                pxrId: [
                    'dummy.test.org'
                ],
                createdAt: {
                    start: '2020-01-01T00:00:00.000+0900',
                    end: '2030-12-31T23:59:59.000+0900'
                },
                includeDeleteCoop: true,
                offset: 1,
                limit: 10
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(204);
        });
        test('正常：条件なし', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);

            // 送信データを生成
            const json = {
                offset: 1,
                limit: 10
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchURI + '?disableFlg=1')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(204);
        });
        test('正常：pxrIdがnull、対象データなし', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);

            // 送信データを生成
            const json = {
                createdAt: {
                    start: '2020-01-01T00:00:00.000+0900',
                    end: '2030-12-31T23:59:59.000+0900'
                }
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(204);
        });
        test('正常：流通制御、wf対象データなし、オペレータ情報でuserInfoなし', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);
            _operatorServer = new StubOperatorServer(200);

            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlString(`
                INSERT INTO pxr_book_manage.my_condition_book
                (
                    id, pxr_id, attributes,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    2, '58di2dfse2.test.org2', '${JSON.stringify({ test1: 'data1' })}',
                    false, 'pxr_user', NOW(), 'pxr_user', NOW()
                );
            `);

            // 送信データを生成
            const json = {
                pxrId: [
                    '58di2dfse2.test.org2'
                ],
                createdAt: {
                    start: '2020-01-01T00:00:00.000+0900',
                    end: '2030-12-31T23:59:59.000+0900'
                }
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(1);
            const list: any[] = response.body;
            list.forEach(element => {
                expect(JSON.stringify(element)).toBe(JSON.stringify({
                    pxrId: '58di2dfse2.test.org2',
                    status: 0,
                    attributes: { test1: 'data1' },
                    cooperation: null,
                    userInformation: null
                }));
            });
        });
        test('正常：流通制御、app対象データあり、1件', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);
            _operatorServer = new StubOperatorServer(200);

            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlString(`
                INSERT INTO pxr_book_manage.my_condition_book
                (
                    id, pxr_id, attributes,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    3, '58di2dfse2.test.org', '${JSON.stringify({ test1: 'data1' })}',
                    false, 'pxr_user', NOW(), 'pxr_user', NOW()
                );
                INSERT INTO pxr_book_manage.USER_ID_COOPERATE
                (
                    book_id,
                    actor_catalog_code, actor_catalog_version,
                    app_catalog_code, app_catalog_version,
                    wf_catalog_code, wf_catalog_version,
                    user_id, status, start_at,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    3,
                    1000004,1, 1000007,1, null,null, 'userid01', 1, '2020-07-07T00:00:00.000+0900',
                    false, 'pxr_user', '2020-07-07T00:00:00.000+0900', 'pxr_user', NOW()
                );
            `);

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
            const response = await supertest(expressApp).post(Url.searchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(1);
            const list: any[] = response.body;
            list.forEach(element => {
                expect(JSON.stringify(element)).toBe(JSON.stringify({
                    pxrId: '58di2dfse2.test.org',
                    status: 0,
                    attributes: { test1: 'data1' },
                    cooperation: userIdCooperationApp,
                    userInformation: userInformation
                }));
            });
        });
        test('正常：流通制御、対象データあり、1件', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);
            _operatorServer = new StubOperatorServer(200);

            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlString(`
                INSERT INTO pxr_book_manage.my_condition_book
                (
                    id, pxr_id, attributes,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    4, '58di2dfse2.test.org', '${JSON.stringify({ test1: 'data1' })}',
                    false, 'pxr_user', NOW(), 'pxr_user', NOW()
                );
            `);

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
            const response = await supertest(expressApp).post(Url.searchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(1);
            const list: any[] = response.body;
            list.forEach(element => {
                expect(JSON.stringify(element)).toBe(JSON.stringify({
                    pxrId: '58di2dfse2.test.org',
                    status: 0,
                    attributes: { test1: 'data1' },
                    cooperation: null,
                    userInformation: userInformation
                }));
            });
        });
        test('正常：pxrIdがnull、対象データあり、1件', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);
            _operatorServer = new StubOperatorServer(200);

            // 送信データを生成
            const json = {
                createdAt: {
                    start: '2020-01-01T00:00:00.000+0900',
                    end: '2030-12-31T23:59:59.000+0900'
                }
            };
            json['pxrId'] = null;

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(1);
            const list: any[] = response.body;
            list.forEach(element => {
                expect(JSON.stringify(element)).toBe(JSON.stringify({
                    pxrId: '58di2dfse2.test.org',
                    status: 0,
                    attributes: { test1: 'data1' },
                    cooperation: null,
                    userInformation: userInformation
                }));
            });
        });
        test('正常：流通制御、対象データあり、複数件', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);
            _operatorServer = new StubOperatorServer(200);

            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlString(`
                INSERT INTO pxr_book_manage.my_condition_book
                (
                    id, pxr_id, attributes,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    5, '58di2dfse2.test.org', '${JSON.stringify({ test1: 'data1' })}',
                    false, 'pxr_user', NOW(), 'pxr_user', NOW()
                ),
                (
                    6, '12ec2dfdv1.test.org', '${JSON.stringify({ test2: 'data2' })}',
                    false, 'pxr_user', NOW(), 'pxr_user', NOW()
                );
            `);

            // 送信データを生成
            const json = {
                pxrId: [
                    '58di2dfse2.test.org',
                    '12ec2dfdv1.test.org'
                ],
                createdAt: {
                    start: '2020-01-01T00:00:00.000+0900',
                    end: '2030-12-31T23:59:59.000+0900'
                }
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(2);
            const list: any[] = response.body;
            list.forEach((element, index) => {
                if (index === 0) {
                    expect(JSON.stringify(element)).toBe(JSON.stringify({
                        pxrId: '58di2dfse2.test.org',
                        status: 0,
                        attributes: { test1: 'data1' },
                        cooperation: null,
                        userInformation: userInformation
                    }));
                } else if (index === 1) {
                    expect(JSON.stringify(element)).toBe(JSON.stringify({
                        pxrId: '12ec2dfdv1.test.org',
                        status: 0,
                        attributes: { test2: 'data2' },
                        cooperation: null,
                        userInformation: userInformation
                    }));
                }
            });
        });
        test('正常：pxrIdがnull、対象データあり、複数件', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);
            _operatorServer = new StubOperatorServer(200);

            // 送信データを生成
            const json = {
                createdAt: {
                    start: '2020-01-01T00:00:00.000+0900',
                    end: '2030-12-31T23:59:59.000+0900'
                }
            };
            json['pxrId'] = null;

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchURI + '?delitionFlag=1')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(2);
            const list: any[] = response.body;
            list.forEach((element, index) => {
                if (index === 0) {
                    expect(JSON.stringify(element)).toBe(JSON.stringify({
                        pxrId: '58di2dfse2.test.org',
                        status: 0,
                        attributes: { test1: 'data1' },
                        cooperation: null,
                        userInformation: userInformation
                    }));
                } else if (index === 1) {
                    expect(JSON.stringify(element)).toBe(JSON.stringify({
                        pxrId: '12ec2dfdv1.test.org',
                        status: 0,
                        attributes: { test2: 'data2' },
                        cooperation: null,
                        userInformation: userInformation
                    }));
                }
            });
        });
        test('正常：pxrId指定、対象データあり', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);
            _operatorServer = new StubOperatorServerBookSearch(200);

            await common.executeSqlString(`
                INSERT INTO pxr_book_manage.my_condition_book
                (
                    id, pxr_id, attributes,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    7, 'pxrid.multiple', '${JSON.stringify({ test1: 'data1' })}',
                    true, 'pxr_user', NOW(), 'pxr_user', NOW()
                );
                INSERT INTO pxr_book_manage.USER_ID_COOPERATE
                (
                    book_id,
                    actor_catalog_code, actor_catalog_version,
                    region_catalog_code, region_catalog_version,
                    app_catalog_code, app_catalog_version,
                    wf_catalog_code, wf_catalog_version,
                    user_id, status, start_at,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    7,
                    1000007, 1, null,null, null,null, 1000007,1, 'userid02',
                    1, '2020-07-07T00:00:00.000+0900',
                    false, 'pxr_user', '2020-07-07T00:00:00.000+0900', 'pxr_user', NOW()
                ),
                (
                    7,
                    1000007, 1, null,null, 1000004,1, null,null, 'userid03',
                    1, '2020-07-07T00:00:00.000+0900',
                    false, 'pxr_user', '2020-07-07T00:00:00.000+0900', 'pxr_user', NOW()
                ),
                (
                    7,
                    1000007, 1, 1000004,1, null,null, null,null, 'userid03',
                    1, '2020-07-07T00:00:00.000+0900',
                    false, 'pxr_user', '2020-07-07T00:00:00.000+0900', 'pxr_user', NOW()
                );
            `);
            // 送信データを生成
            const json = {
                pxrId: ['pxrid.multiple']
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchURI + '?disableFlg=1')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(1);
            const list: any[] = response.body;
            list.forEach((element, index) => {
                expect(JSON.stringify(element)).toBe(JSON.stringify({
                    pxrId: 'pxrid.multiple',
                    status: 0,
                    attributes: { test1: 'data1' },
                    cooperation: [
                        {
                            actor: {
                                _value: 1000007,
                                _ver: 1
                            },
                            region: null,
                            app: {
                                _value: 1000004,
                                _ver: 1
                            },
                            wf: null,
                            userId: 'userid03',
                            startAt: '2020-07-07T00:00:00.000+0900',
                            status: 1
                        },
                        {
                            actor: {
                                _value: 1000007,
                                _ver: 1
                            },
                            region: {
                                _value: 1000004,
                                _ver: 1
                            },
                            app: null,
                            wf: null,
                            userId: 'userid03',
                            startAt: '2020-07-07T00:00:00.000+0900',
                            status: 1
                        }
                    ],
                    userInformation: null
                }));
            });
        });
        test('正常：Cookie使用, 運営メンバー', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServer(3001, 1000020, 200);
            _operatorServer = new StubOperatorServer(200, '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e03');

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
            const response = await supertest(expressApp).post(Url.searchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e03'])
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(1);
            const list: any[] = response.body;
            list.forEach((element) => {
                expect(JSON.stringify(element)).toBe(JSON.stringify({
                    pxrId: '58di2dfse2.test.org',
                    status: 0,
                    attributes: { test1: 'data1' },
                    cooperation: null,
                    userInformation: userInformation
                }));
            });
        });
        test('異常：Cookieが存在するが空', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServer(3001, 1000020, 200);
            _operatorServer = new StubOperatorServer(200);

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
            const response = await supertest(expressApp).post(Url.searchURI)
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
            const response = await supertest(expressApp).post(Url.searchURI)
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
            const response = await supertest(expressApp).post(Url.searchURI)
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
            const response = await supertest(expressApp).post(Url.searchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：利用者情報取得でオペレータサービス応答400', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServer(3001, 1000020, 200);
            _operatorServer = new StubOperatorServer(400);

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
            const response = await supertest(expressApp).post(Url.searchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.FAILED_GET_USER_INFORMATION);
        });
        test('異常：利用者情報取得でオペレータサービス応答500系', async () => {
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
            const response = await supertest(expressApp).post(Url.searchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_GET_USER_INFORMATION);
        });
        test('異常：利用者情報取得でオペレータサービス応答200以外', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServer(3001, 1000020, 200);
            _operatorServer = new StubOperatorServer(203);

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
            const response = await supertest(expressApp).post(Url.searchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.FAILED_GET_USER_INFORMATION);
        });
        test('異常：利用者情報取得でオペレータサービス接続失敗', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServer(3001, 1000020, 200);

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
            const response = await supertest(expressApp).post(Url.searchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('正常：利用者情報取得でオペレータサービス応答204', async () => {
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
            const response = await supertest(expressApp).post(Url.searchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(503);
        });
        test('正常：createdAtがnull', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);
            _operatorServer = new StubOperatorServer(200);

            // 送信データを生成
            const json = {
                pxrId: [
                    '58di2dfse2.test.org'
                ]
            };
            json['createdAt'] = null;

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(200);
        });
        test('正常：createdAt.startが空', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);
            _operatorServer = new StubOperatorServer(200);

            // 送信データを生成
            const json = {
                pxrId: [
                    '58di2dfse2.test.org'
                ],
                createdAt: {
                    end: '2030-12-31T23:59:59.000+0900'
                }
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(200);
        });
        test('正常：createdAt.startがnull', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);
            _operatorServer = new StubOperatorServer(200);

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
            json['createdAt']['start'] = null;

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(200);
        });
        test('正常：createdAt.endが空', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);
            _operatorServer = new StubOperatorServer(200);

            // 送信データを生成
            const json = {
                pxrId: [
                    '58di2dfse2.test.org'
                ],
                createdAt: {
                    start: '2020-01-01T00:00:00.000+0900'
                }
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(200);
        });
        test('正常：createdAt.endがnull', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);
            _operatorServer = new StubOperatorServer(200);

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
            json['createdAt']['end'] = null;

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(200);
        });
        test('正常：createdAt.start、endが空', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);
            _operatorServer = new StubOperatorServer(200);

            // 送信データを生成
            const json = {
                pxrId: [
                    '58di2dfse2.test.org'
                ]
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(200);
        });
        test('正常：createdAt.start、endがnull', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);
            _operatorServer = new StubOperatorServer(200);

            // 送信データを生成
            const json = {
                pxrId: [
                    '58di2dfse2.test.org'
                ],
                createdAt: {
                    start: '',
                    end: ''
                }
            };
            json['createdAt']['start'] = null;
            json['createdAt']['end'] = null;

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(200);
        });
        test('異常：セッション(セッションなし)', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServer(3001, 1000001, 200);

            // 送信データを生成
            const json = {
                pxrId: [
                    'dummy.test.org'
                ],
                createdAt: {
                    start: '2020-01-01T00:00:00.000+0900',
                    end: '2030-12-31T23:59:59.000+0900'
                }
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchURI)
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
                pxrId: [
                    'dummy.test.org'
                ],
                createdAt: {
                    start: '2020-01-01T00:00:00.000+0900',
                    end: '2030-12-31T23:59:59.000+0900'
                }
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('パラメータ異常：PXR-ID、配列以外', async () => {
            // 送信データを生成
            const json = {
                pxrId: 'dummy.test.org',
                createdAt: {
                    start: '2020-01-01T00:00:00.000+0900',
                    end: '2030-12-31T23:59:59.000+0900'
                }
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [
                    { property: 'pxrId', value: 'dummy.test.org', message: '配列の中に、空文字が含まれています' },
                    {
                        property: 'pxrId',
                        value: 'dummy.test.org',
                        message: '空の配列です'
                    },
                    {
                        property: 'pxrId',
                        value: 'dummy.test.org',
                        message: '配列ではありません'
                    }
                ]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：PXR-ID、空', async () => {
            // 送信データを生成
            const json = {
                pxrId: [
                    ''
                ],
                createdAt: {
                    start: '2020-01-01T00:00:00.000+0900',
                    end: '2030-12-31T23:59:59.000+0900'
                }
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [
                    { property: 'pxrId', value: [''], message: '配列の中に、空文字が含まれています' }
                ]
            }));
            expect(response.status).toBe(400);
            // expect(response.body.message).toBe(sprintf(Message.EMPTY_PARAM, 'pxrId'));
        });
        test('パラメータ異常：createdAt.start、日付以外', async () => {
            // 送信データを生成
            const json = {
                pxrId: [
                    'dummy.test.org'
                ],
                createdAt: {
                    start: 'XXXXX',
                    end: '2030-12-31T23:59:59.000+0900'
                }
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: 'start', value: 'XXXXX', message: '日付型ではありません' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：createdAt.end、日付以外', async () => {
            // 送信データを生成
            const json = {
                pxrId: [
                    'dummy.test.org'
                ],
                createdAt: {
                    start: '2020-01-01T00:00:00.000+0900',
                    end: 'XXXXX'
                }
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: 'end', value: 'XXXXX', message: '日付型ではありません' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：createdAt.start、end、日付以外', async () => {
            // 送信データを生成
            const json = {
                pxrId: [
                    'dummy.test.org'
                ],
                createdAt: {
                    start: 'XXXXX',
                    end: 'XXXXX'
                }
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [
                    { property: 'start', value: 'XXXXX', message: '日付型ではありません' },
                    { property: 'end', value: 'XXXXX', message: '日付型ではありません' }
                ]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：createdAt.start、日付形式エラー', async () => {
            // 送信データを生成
            const json = {
                pxrId: [
                    'dummy.test.org'
                ],
                createdAt: {
                    start: '2020-01-01',
                    end: '2020-01-01T00:00:00.000+0900'
                }
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                reasons: [{ property: 'start', value: '2020-01-01', message: '日付型ではありません' }]
            }));
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：createdAt.start、end、逆', async () => {
            // 送信データを生成
            const json = {
                pxrId: [
                    'dummy.test.org'
                ],
                createdAt: {
                    start: '2030-12-31T23:59:59.000+0900',
                    end: '2020-01-01T00:00:00.000+0900'
                }
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 400, message: '日付指定の範囲に誤りがあります' }));
            expect(response.status).toBe(400);
        });
        test('パラメータ不足：全て', async () => {
            // 送信データを生成
            const json = {};

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.searchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_IS_EMPTY);
        });
    });
});
