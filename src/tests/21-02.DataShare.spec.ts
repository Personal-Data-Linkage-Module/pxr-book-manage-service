/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Application } from '../resources/config/Application';
import supertest = require('supertest');
import { CatalogService, OperatorService } from './16-00.StubServer';
import Common, { Url } from './Common';
import { Session } from './Session';
import urljoin = require('url-join');
import Config from '../common/Config';
import StubProxyServer from './StubProxyServer';
/* eslint-enable */
const Message = Config.ReadConfig('./config/message.json');

const app = new Application();
const expressApp = app.express.app;
const common = new Common();
app.start();

const operatorService = new OperatorService();
const catalogService = new CatalogService();
let proxyService: StubProxyServer = null;

/**
 * book-mange API のユニットテスト
 */
describe('book-mange API', () => {
    beforeAll(async () => {
        await common.connect();
        await common.executeSqlFile('initialData.sql');
        await common.executeSqlFile('initialDataShareData.sql');
        await operatorService.start();
        await catalogService.start();
    });
    afterAll(async () => {
        app.stop();
        await operatorService.stop();
        await catalogService.stop();
        if (proxyService) {
            proxyService._server.close();
            proxyService = null;
        }
    });

    /**
     * データ共有定義追加（個人）API
     */
    describe('データ共有定義追加（個人）API', () => {
        test('異常：運営メンバー', async () => {
            const response = await supertest(expressApp)
                .post(Url.shareURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    actor: {
                        _value: 1000004
                    },
                    wf: null,
                    app: {
                        _value: 1000009
                    },
                    share: {
                        _value: 1000021,
                        _ver: 1
                    }
                });
            try {
                expect(response.status).toBe(401);
                expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：該当ブックなし', async () => {
            const response = await supertest(expressApp)
                .post(Url.shareURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd2) })
                .send({
                    actor: {
                        _value: 1000004
                    },
                    wf: null,
                    app: {
                        _value: 1000009
                    },
                    share: {
                        _value: 1000021,
                        _ver: 1
                    }
                });
            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.CAN_NOT_FIND_BOOK);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：wf, appなし', async () => {
            const response = await supertest(expressApp)
                .post(Url.shareURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    actor: {
                        _value: 1000004
                    },
                    app: null,
                    wf: null,
                    share: {
                        _value: 1000021,
                        _ver: 1
                    }
                });
            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.REQUIRE_APP_OR_WF_CODE);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：個人(ワークフロー)', async () => {
            const response = await supertest(expressApp)
                .post(Url.shareURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    actor: {
                        _value: 1000004,
                        _ver: 1
                    },
                    app: null,
                    wf: {
                        _value: 1000007
                    },
                    share: {
                        _value: 1000022,
                        _ver: 1
                    },
                    excludeEvent: [
                        {
                            code: {
                                _value: 9999999,
                                _ver: 1
                            },
                            excludeThing: [
                                {
                                    code: {
                                        _value: 1000814,
                                        _ver: 1
                                    }
                                },
                                {
                                    code: {
                                        _value: 1000803,
                                        _ver: 1
                                    }
                                }
                            ]
                        }
                    ]
                });
            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常：個人(アプリケーション)', async () => {
            const response = await supertest(expressApp)
                .post(Url.shareURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    actor: {
                        _value: 1000005,
                        _ver: 1
                    },
                    app: {
                        _value: 1000009
                    },
                    wf: null,
                    share: {
                        _value: 1000023,
                        _ver: 1
                    }
                });
            try {
                expect(response.status).toBe(200);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常：個人(アプリケーション)、更新', async () => {
            const response = await supertest(expressApp)
                .post(Url.shareURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    actor: {
                        _value: 1000005,
                        _ver: 1
                    },
                    app: {
                        _value: 1000009
                    },
                    wf: null,
                    share: {
                        _value: 1000023,
                        _ver: 1
                    }
                });
            try {
                expect(response.status).toBe(200);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：個人(アプリケーションアクターカタログ不正)', async () => {
            const response = await supertest(expressApp)
                .post(Url.shareURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    actor: {
                        _value: 1000015,
                        _ver: 1
                    },
                    app: {
                        _value: 1000009
                    },
                    wf: null,
                    share: {
                        _value: 1000022,
                        _ver: 1
                    }
                });
            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.ACTOR_CATALOG_INVALID);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：個人(アプリケーションコード不正)', async () => {
            const response = await supertest(expressApp)
                .post(Url.shareURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    actor: {
                        _value: 1000005,
                        _ver: 1
                    },
                    app: {
                        _value: 1000019
                    },
                    wf: null,
                    share: {
                        _value: 1000022,
                        _ver: 1
                    }
                });
            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.APP_CATALOG_CODE_NOT_EXIST);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：個人(アクターカタログ不正)', async () => {
            const response = await supertest(expressApp)
                .post(Url.shareURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    actor: {
                        _value: 1,
                        _ver: 1
                    },
                    wf: null,
                    app: {
                        _value: 1000009
                    },
                    share: {
                        _value: 1000022,
                        _ver: 1
                    }
                });
            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.ACTOR_CATALOG_INVALID);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：個人(アプリケーションカタログ不正)', async () => {
            const response = await supertest(expressApp)
                .post(Url.shareURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    actor: {
                        _value: 1000025,
                        _ver: 1
                    },
                    app: {
                        _value: 1000018
                    },
                    wf: null,
                    share: {
                        _value: 1000022,
                        _ver: 1
                    }
                });
            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.NOT_SHARE_CATALOG_CODE);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：個人(共有コード不正)', async () => {
            const response = await supertest(expressApp)
                .post(Url.shareURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    actor: {
                        _value: 1000005,
                        _ver: 1
                    },
                    wf: null,
                    app: {
                        _value: 1000009
                    },
                    share: {
                        _value: 1000004,
                        _ver: 1
                    }
                });
            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.NOT_SHARE_CATALOG_CODE);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常：個人(蓄積データ更新)', async () => {
            const response = await supertest(expressApp)
                .post(Url.shareURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    actor: {
                        _value: 1000005,
                        _ver: 1
                    },
                    wf: null,
                    app: {
                        _value: 1000009
                    },
                    share: {
                        _value: 1000022,
                        _ver: 1
                    },
                    excludeDocument: [
                        {
                            code: {
                                _value: 1001010,
                                _ver: 1
                            }
                        }
                    ],
                    excludeEvent: [
                        {
                            code: {
                                _value: 1000802,
                                _ver: 1
                            },
                            excludeThing: [
                                {
                                    code: {
                                        _value: 1000814,
                                        _ver: 1
                                    }
                                },
                                {
                                    code: {
                                        _value: 1000803,
                                        _ver: 1
                                    }
                                }
                            ]
                        }
                    ],
                    excludeThing: [
                        {
                            code: {
                                _value: 1000502,
                                _ver: 1
                            }
                        }
                    ]
                });
            try {
                expect(response.status).toBe(200);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
    });

    /**
     * データ共有定義取得API
     */
    describe('データ共有定義取得API', () => {
        test('異常：該当ブックなし', async () => {
            const response = await supertest(expressApp)
                .get(urljoin(Url.shareURI, '?app=1000009'))
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd2) })
                .send();

            try {
                expect(response.status).toBe(401);
                expect(response.body.message).toBe(Message.NOT_EXIST_BOOK);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：該当操作定義カタログなし', async () => {
            const response = await supertest(expressApp)
                .get(urljoin(Url.shareURI, '?app=1000009'))
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.notFoundShareCatalog) })
                .send();

            try {
                expect(response.status).toBe(500);
                expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
                // console.log(response.body);
                // console.log(response.body[1].event);
                // console.log(response.body[1].event[0].thing);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：ワークフロー', async () => {
            const response = await supertest(expressApp)
                .get(urljoin(Url.shareURI, '?wf=1000007'))
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send();

            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常：アプリケーション', async () => {
            const response = await supertest(expressApp)
                .get(urljoin(Url.shareURI, '?app=1000009'))
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send();

            try {
                expect(response.status).toBe(200);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常：指定したデータ共有定義が存在しない', async () => {
            const response = await supertest(expressApp)
                .get(urljoin(Url.shareURI, '?app=2000001'))
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send();

            try {
                expect(response.status).toBe(200);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：id', async () => {
            const response = await supertest(expressApp)
                .get(urljoin(Url.shareURI, '?app=1000009'))
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.REQUIRED_USER_ID);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：ワークフロー', async () => {
            let response;
            proxyService = new StubProxyServer(200);
            try {
                response = await supertest(expressApp)
                    .get(urljoin(Url.shareURI, '?id=userid01&wf=1000007'))
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.pxrApp) })
                    .send();

                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常：アプリケーション', async () => {
            const response = await supertest(expressApp)
                .get(urljoin(Url.shareURI, '?id=userid02&app=1000009&actor=1000104'))
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrApp) })
                .send();

            try {
                expect(response.status).toBe(200);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：idあり、appなし', async () => {
            const response = await supertest(expressApp)
                .get(urljoin(Url.shareURI, '?id=userid02&actor=1000104'))
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrApp) })
                .send();

            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.REQUIRED_APP_OR_WF_WITH_ID);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：利用者連携情報が取得できない', async () => {
            let response;
            try {
                response = await supertest(expressApp)
                    .get(urljoin(Url.shareURI, '?id=invalidUser&app=1000009'))
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.pxrApp) })
                    .send();

                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.CAN_NOT_FIND_COOPERATE);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：MyConditionBookが取得できない', async () => {
            let response;
            try {
                response = await supertest(expressApp)
                    .get(urljoin(Url.shareURI, '?id=invalidBookUser&app=1000008'))
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.pxrApp) })
                    .send();

                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.CAN_NOT_FIND_BOOK);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：データ共有定義が取得できない', async () => {
            let response;
            try {
                response = await supertest(expressApp)
                    .get(urljoin(Url.shareURI, '?id=notFoundDataOperate&app=1000009'))
                    .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                    .set({ session: JSON.stringify(Session.pxrApp) })
                    .send();

                expect(response.status).toBe(204);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
    });

    /**
     * データ共有定義削除（個人）API
     */
    describe('データ共有定義削除（個人）API', () => {
        test('異常：運営メンバー', async () => {
            const response = await supertest(expressApp)
                .delete(urljoin(Url.shareURI, '1'))
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send();

            try {
                expect(response.status).toBe(401);
                expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：該当ブックなし', async () => {
            const response = await supertest(expressApp)
                .delete(urljoin(Url.shareURI, '1'))
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd2) })
                .send();

            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.CAN_NOT_FIND_BOOK);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：該当共有定義なし', async () => {
            const response = await supertest(expressApp)
                .delete(urljoin(Url.shareURI, '9999'))
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send();

            try {
                expect(response.status).toBe(404);
                expect(response.body.message).toBe(Message.NOT_FOUND_DATA_SHARE_SETTING);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：該当共有定義データ種なし', async () => {
            await common.executeSqlString(`
            INSERT INTO pxr_book_manage.data_operation
            (
                id, book_id, type,
                operation_catalog_code, operation_catalog_version,
                actor_catalog_code, actor_catalog_version,
                app_catalog_code, app_catalog_version,
                wf_catalog_code, wf_catalog_version,
                attributes,
                is_disabled, created_by, created_at, updated_by, updated_at
            )
            VALUES
            (
                99, 1, 'share',
                1000503,1,
                1000004,1,
                1000007,1,
                null,null,
                null,
                false, 'pxr_user', NOW(), 'pxr_user', NOW()
            )
            `);
            const response = await supertest(expressApp)
                .delete(urljoin(Url.shareURI, '99'))
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send();

            try {
                expect(response.status).toBe(404);
                expect(response.body.message).toBe(Message.NOT_FOUND_DATA_TYPE);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常：アプリケーション', async () => {
            const response = await supertest(expressApp)
                .delete(urljoin(Url.shareURI, '1'))
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send();

            try {
                expect(response.status).toBe(200);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
    });
});
