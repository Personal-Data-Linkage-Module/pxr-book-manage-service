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
import { StubCatalogServerRegionClose } from './StubCatalogServer';
import { Session } from './Session';
import moment = require('moment-timezone');
import { sprintf } from 'sprintf-js';
/* eslint-enable */
const Message = Config.ReadConfig('./config/message.json');
const config = Config.ReadConfig('./config/config.json');

const app = new Application();
const expressApp = app.express.app;
const common = new Common();
app.start();

let _operatorServer: StubOperatorServerType0;
let _catalogServer: StubCatalogServerRegionClose = null;

describe('book-mange API', () => {
    /**
     * 全テスト実行の前処理
     */
    beforeAll(async () => {
        await common.connect();
        await common.executeSqlFile('initialData.sql');
        await common.executeSqlFile('initialResionCloseData.sql');
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
        if (_catalogServer) {
            _catalogServer._server.close();
            _catalogServer = null;
        }
    });

    /**
     * Region終了対象追加
     */
    describe('Region終了対象追加', () => {
        test('正常：運営', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'sessionId'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000007,
                            _ver: 1
                        },
                        endDate: moment().tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ')
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
        });
        test('パラメータ異常：リクエストが空', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify({
                }));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_IS_EMPTY);
        });
        test('パラメータ異常：リクエストが配列', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify([{
                    actor: {
                        _value: 1000003,
                        _ver: 1
                    },
                    region: {
                        _value: 2000004,
                        _ver: 1
                    },
                    endDate: moment().tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ')
                }]));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNEXPECTED_ARRAY_REQUEST);
        });
        test('パラメータ不足：actor._value', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify({
                    actor: {
                        _ver: 1
                    },
                    region: {
                        _value: 2000004,
                        _ver: 1
                    },
                    endDate: moment().tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ')
                }));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：actor._value、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify({
                    actor: {
                        _value: 'dummy',
                        _ver: 1
                    },
                    region: {
                        _value: 2000004,
                        _ver: 1
                    },
                    endDate: moment().tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ')
                }));

            // レスポンスチェック
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：actor._ver', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify({
                    actor: {
                        _value: 1000003
                    },
                    region: {
                        _value: 2000004,
                        _ver: 1
                    },
                    endDate: moment().tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ')
                }));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：actor._ver、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify({
                    actor: {
                        _value: 1000003,
                        _ver: 'dummy'
                    },
                    region: {
                        _value: 2000004,
                        _ver: 1
                    },
                    endDate: moment().tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ')
                }));

            // レスポンスチェック
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：region._value', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify({
                    actor: {
                        _value: 1000003,
                        _ver: 1
                    },
                    region: {
                        _ver: 1
                    },
                    endDate: moment().tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ')
                }));

            // レスポンスチェック
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：region._value、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify({
                    actor: {
                        _value: 1000003,
                        _ver: 1
                    },
                    region: {
                        _value: 'dummy',
                        _ver: 1
                    },
                    endDate: moment().tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ')
                }));

            // レスポンスチェック
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：region._ver', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify({
                    actor: {
                        _value: 1000003,
                        _ver: 1
                    },
                    region: {
                        _value: 2000004
                    },
                    endDate: moment().tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ')
                }));

            // レスポンスチェック
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：region._ver、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify({
                    actor: {
                        _value: 1000003,
                        _ver: 1
                    },
                    region: {
                        _value: 2000004,
                        _ver: 'dummy'
                    },
                    endDate: moment().tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ')
                }));

            // レスポンスチェック
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：endDate', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify({
                    actor: {
                        _value: 1000003,
                        _ver: 1
                    },
                    region: {
                        _value: 2000004,
                        _ver: 1
                    }
                }));

            // レスポンスチェック
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：endDate、文字列以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify({
                    actor: {
                        _value: 1000003,
                        _ver: 1
                    },
                    region: {
                        _value: 2000004,
                        _ver: 1
                    },
                    endDate: 202112010000000000900
                }));

            // レスポンスチェック
            expect(response.body.reasons[0].message).toBe(Message.validation.isString);
        });
        test('パラメータ異常：endDate、ISO8601に合わない文字列', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send(JSON.stringify({
                    actor: {
                        _value: 1000003,
                        _ver: 1
                    },
                    region: {
                        _value: 2000004,
                        _ver: 1
                    },
                    endDate: 'dummy'
                }));

            // レスポンスチェック
            expect(response.body.message).toBe(sprintf(Message.DATE_INVALID, 'endDate'));
        });
        test('異常：個人', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 0);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000003,
                            _ver: 1
                        },
                        region: {
                            _value: 2000004,
                            _ver: 1
                        },
                        endDate: moment().tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ')
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：ワークフロー', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 1);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.bookCloseDelete1) })
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000003,
                            _ver: 1
                        },
                        region: {
                            _value: 2000004,
                            _ver: 1
                        },
                        endDate: moment().tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ')
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：アプリケーション', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 2);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type2_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000003,
                            _ver: 1
                        },
                        region: {
                            _value: 2000004,
                            _ver: 1
                        },
                        endDate: moment().tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ')
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
            const response = await supertest(expressApp).post(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + ''])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000003,
                            _ver: 1
                        },
                        region: {
                            _value: 2000004,
                            _ver: 1
                        },
                        endDate: moment().tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ')
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_SESSION);
        });
        test('異常：オペレータサービス応答204', async () => {
            // スタブサーバーを起動
            _operatorServer = new StubOperatorServerType0(204, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000003,
                            _ver: 1
                        },
                        region: {
                            _value: 2000004,
                            _ver: 1
                        },
                        endDate: moment().tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ')
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.IS_NOT_AUTHORIZATION_SESSION);
        });
        test('異常：オペレータサービス応答400系', async () => {
            // スタブサーバーを起動
            _operatorServer = new StubOperatorServerType0(400, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000003,
                            _ver: 1
                        },
                        region: {
                            _value: 2000004,
                            _ver: 1
                        },
                        endDate: moment().tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ')
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.IS_NOT_AUTHORIZATION_SESSION);
        });
        test('異常：オペレータサービス応答500系', async () => {
            // スタブサーバーを起動
            _operatorServer = new StubOperatorServerType0(500, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000003,
                            _ver: 1
                        },
                        region: {
                            _value: 2000004,
                            _ver: 1
                        },
                        endDate: moment().tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ')
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：オペレータサービス未起動', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerRegionClose(1000001, 200);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000003,
                            _ver: 1
                        },
                        region: {
                            _value: 2000004,
                            _ver: 1
                        },
                        endDate: moment().tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ')
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常：セッションなし', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000003,
                            _ver: 1
                        },
                        region: {
                            _value: 2000004,
                            _ver: 1
                        },
                        endDate: moment().tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ')
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_SESSION);
        });
    });

    /**
     * Region終了時利用者ID連携解除対象個人取得
     */
    describe('Region終了時利用者ID連携解除対象個人取得', () => {
        test('正常：運営、offset=1,limit=2', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // クエリパラメーター設定
            const offset = 1;
            const limit = 2;
            const url = Url.regionClose + '/target?offset=' + offset + '&limit=' + limit;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'sessionId']);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(
                {
                    offset: 1,
                    targets: [
                        {
                            bookId: '2',
                            pxrId: 'test02.test.org',
                            actor: { _value: '1000001', _ver: '1' },
                            region: { _value: '1000027', _ver: '1' }
                        },
                        {
                            bookId: '3',
                            pxrId: 'test03.test.org',
                            actor: { _value: '1000001', _ver: '1' },
                            region: { _value: '1000037', _ver: '1' }
                        }
                    ]
                }
            );
        });
        test('正常：運営、limit=6', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // クエリパラメーター設定
            const offset = 0;
            const limit = 6;
            const url = Url.regionClose + '/target?offset=' + offset + '&limit=' + limit;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'sessionId']);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body['offset']).toBe(0);
            expect(response.body['targets'].length).toBe(6);
        });
        test('異常：個人', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 0);
            // クエリパラメーター設定
            const offset = 0;
            const limit = 6;
            const url = Url.regionClose + '/target?offset=' + offset + '&limit=' + limit;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：ワークフロー', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 1);
            // クエリパラメーター設定
            const offset = 0;
            const limit = 6;
            const url = Url.regionClose + '/target?offset=' + offset + '&limit=' + limit;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.bookCloseDelete1) });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：アプリケーション', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 2);
            // クエリパラメーター設定
            const offset = 0;
            const limit = 6;
            const url = Url.regionClose + '/target?offset=' + offset + '&limit=' + limit;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type2_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：Cookieが存在するが空', async () => {
            // スタブサーバーを起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            // クエリパラメーター設定
            const offset = 0;
            const limit = 6;
            const url = Url.regionClose + '/target?offset=' + offset + '&limit=' + limit;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_SESSION);
        });
        test('異常：オペレータサービス応答204', async () => {
            // スタブサーバーを起動
            _operatorServer = new StubOperatorServerType0(204, 3);
            // クエリパラメーター設定
            const offset = 0;
            const limit = 6;
            const url = Url.regionClose + '/target?offset=' + offset + '&limit=' + limit;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.IS_NOT_AUTHORIZATION_SESSION);
        });
        test('異常：オペレータサービス応答400系', async () => {
            // スタブサーバーを起動
            _operatorServer = new StubOperatorServerType0(400, 3);
            // クエリパラメーター設定
            const offset = 0;
            const limit = 6;
            const url = Url.regionClose + '/target?offset=' + offset + '&limit=' + limit;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.IS_NOT_AUTHORIZATION_SESSION);
        });
        test('異常：オペレータサービス応答500系', async () => {
            // スタブサーバーを起動
            _operatorServer = new StubOperatorServerType0(500, 3);
            // クエリパラメーター設定
            const offset = 0;
            const limit = 6;
            const url = Url.regionClose + '/target?offset=' + offset + '&limit=' + limit;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：オペレータサービス未起動', async () => {
            // クエリパラメーター設定
            const offset = 0;
            const limit = 6;
            const url = Url.regionClose + '/target?offset=' + offset + '&limit=' + limit;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
    });

    /**
     * Region終了対象取得
     */
    describe('Region終了対象取得', () => {
        test('正常：運営、offset=1,limit=1', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // クエリパラメーター設定
            const offset = 1;
            const limit = 1;
            const url = Url.regionClose + '?offset=' + offset + '&limit=' + limit;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'sessionId']);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toEqual(
                {
                    offset: 1,
                    targets: [
                        {
                            actor: { _value: '1000001', _ver: '1' },
                            region: { _value: '1000017', _ver: '1' }
                        }
                    ]
                }
            );
        });
        test('正常：運営、limit=6', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // クエリパラメーター設定
            const offset = 0;
            const limit = 6;
            const url = Url.regionClose + '?offset=' + offset + '&limit=' + limit;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'sessionId']);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body['offset']).toBe(0);
            expect(response.body['targets'].length).toBe(3);
        });
        test('異常：個人', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 0);
            // クエリパラメーター設定
            const offset = 0;
            const limit = 6;
            const url = Url.regionClose + '?offset=' + offset + '&limit=' + limit;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：ワークフロー', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 1);
            // クエリパラメーター設定
            const offset = 0;
            const limit = 6;
            const url = Url.regionClose + '?offset=' + offset + '&limit=' + limit;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.bookCloseDelete1) });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：アプリケーション', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 2);
            // クエリパラメーター設定
            const offset = 0;
            const limit = 6;
            const url = Url.regionClose + '?offset=' + offset + '&limit=' + limit;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type2_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：Cookieが存在するが空', async () => {
            // スタブサーバーを起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            // クエリパラメーター設定
            const offset = 0;
            const limit = 6;
            const url = Url.regionClose + '?offset=' + offset + '&limit=' + limit;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_SESSION);
        });
        test('異常：オペレータサービス応答204', async () => {
            // スタブサーバーを起動
            _operatorServer = new StubOperatorServerType0(204, 3);
            // クエリパラメーター設定
            const offset = 0;
            const limit = 6;
            const url = Url.regionClose + '?offset=' + offset + '&limit=' + limit;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.IS_NOT_AUTHORIZATION_SESSION);
        });
        test('異常：オペレータサービス応答400系', async () => {
            // スタブサーバーを起動
            _operatorServer = new StubOperatorServerType0(400, 3);
            // クエリパラメーター設定
            const offset = 0;
            const limit = 6;
            const url = Url.regionClose + '?offset=' + offset + '&limit=' + limit;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.IS_NOT_AUTHORIZATION_SESSION);
        });
        test('異常：オペレータサービス応答500系', async () => {
            // スタブサーバーを起動
            _operatorServer = new StubOperatorServerType0(500, 3);
            // クエリパラメーター設定
            const offset = 0;
            const limit = 6;
            const url = Url.regionClose + '?offset=' + offset + '&limit=' + limit;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：オペレータサービス未起動', async () => {
            // クエリパラメーター設定
            const offset = 0;
            const limit = 6;
            const url = Url.regionClose + '?offset=' + offset + '&limit=' + limit;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
    });

    /**
     * 終了済Region更新
     */
    describe('終了済Region更新', () => {
        test('正常：Cookie使用,運営', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'sessionId'])
                .send({
                    actor: {
                        _value: 1000001
                    },
                    region: {
                        _value: 1000017
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(200);
        });
        test('正常：Session使用,運営', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRoot) })
                .send({
                    actor: {
                        _value: 1000001
                    },
                    region: {
                        _value: 1000027
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(200);
        });
        test('以上：Cookie使用,個人', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 0);

            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send({
                    actor: {
                        _value: 1000001
                    },
                    region: {
                        _value: 1000017
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('以上：session使用,ワークフロー', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 1);

            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.bookCloseDelete1) })
                .send({
                    actor: {
                        _value: 1000001
                    },
                    region: {
                        _value: 1000017
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('以上：Cookie使用,アプリケーション', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 2);

            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type2_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send({
                    actor: {
                        _value: 1000001
                    },
                    region: {
                        _value: 1000017
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：Cookieが存在するが空', async () => {
            // スタブサーバーを起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + ''])
                .send({
                    actor: {
                        _value: 1000001
                    },
                    region: {
                        _value: 1000017
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_SESSION);
        });
        test('異常：オペレータサービス応答204', async () => {
            // スタブサーバーを起動
            _operatorServer = new StubOperatorServerType0(204, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send({
                    actor: {
                        _value: 1000001
                    },
                    region: {
                        _value: 1000017
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.IS_NOT_AUTHORIZATION_SESSION);
        });
        test('異常：オペレータサービス応答400系', async () => {
            // スタブサーバーを起動
            _operatorServer = new StubOperatorServerType0(400, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send({
                    actor: {
                        _value: 1000001
                    },
                    region: {
                        _value: 1000017
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.IS_NOT_AUTHORIZATION_SESSION);
        });
        test('異常：オペレータサービス応答500系', async () => {
            // スタブサーバーを起動
            _operatorServer = new StubOperatorServerType0(500, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send({
                    actor: {
                        _value: 1000001
                    },
                    region: {
                        _value: 1000017
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：オペレータサービス未起動', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send({
                    actor: {
                        _value: 1000001
                    },
                    region: {
                        _value: 1000017
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('パラメータ異常：body JSON不正', async () => {
            // スタブサーバーを起動
            _operatorServer = new StubOperatorServerType0(500, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send('{ XXXX: }');

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('リクエストボディが、JSON形式ではありません');
        });
        test('パラメータ異常：body 空', async () => {
            // スタブサーバーを起動
            _operatorServer = new StubOperatorServerType0(500, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send('');

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_IS_EMPTY);
        });
        test('パラメータ異常：body 配列', async () => {
            // スタブサーバーを起動
            _operatorServer = new StubOperatorServerType0(500, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send([
                    {
                        actor: {
                            _value: 1000001
                        },
                        region: {
                            _value: 1000017
                        }
                    }
                ]);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_IS_ARRAY);
        });
        test('パラメータ不足：actor', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'sessionId'])
                .send({
                    region: {
                        _value: 1000017
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
            expect(response.body.reasons[0].property).toBe('actor');
        });
        test('パラメータ異常：actor null', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'sessionId'])
                .send({
                    actor: null,
                    region: {
                        _value: 1000017
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.nestedValidation);
            expect(response.body.reasons[0].property).toBe('actor');
        });
        test('パラメータ異常：actor オブジェクト以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'sessionId'])
                .send({
                    actor: 1000001,
                    region: {
                        _value: 1000017
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.nestedValidation);
            expect(response.body.reasons[0].property).toBe('actor');
        });
        test('パラメータ不足：actor._value', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'sessionId'])
                .send({
                    actor: {},
                    region: {
                        _value: 1000017
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
            expect(response.body.reasons[0].property).toBe('_value');
        });
        test('パラメータ異常：actor._value null', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'sessionId'])
                .send({
                    actor: {
                        _value: null
                    },
                    region: {
                        _value: 1000017
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
            expect(response.body.reasons[0].property).toBe('_value');
        });
        test('パラメータ異常：actor._value 数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'sessionId'])
                .send({
                    actor: {
                        _value: 'a'
                    },
                    region: {
                        _value: 1000017
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
            expect(response.body.reasons[0].property).toBe('_value');
        });
        test('パラメータ不足：region', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'sessionId'])
                .send({
                    actor: {
                        _value: 1000001
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
            expect(response.body.reasons[0].property).toBe('region');
        });
        test('パラメータ異常：region null', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'sessionId'])
                .send({
                    actor: {
                        _value: 1000001
                    },
                    region: null
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.nestedValidation);
            expect(response.body.reasons[0].property).toBe('region');
        });
        test('パラメータ異常：region オブジェクト以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'sessionId'])
                .send({
                    actor: {
                        _value: 1000001
                    },
                    region: 1000017
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.nestedValidation);
            expect(response.body.reasons[0].property).toBe('region');
        });
        test('パラメータ不足：region._value', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'sessionId'])
                .send({
                    actor: {
                        _value: 1000001
                    },
                    region: {}
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
            expect(response.body.reasons[0].property).toBe('_value');
        });
        test('パラメータ異常：region._value null', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'sessionId'])
                .send({
                    actor: {
                        _value: 1000001
                    },
                    region: {
                        _value: null
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
            expect(response.body.reasons[0].property).toBe('_value');
        });
        test('パラメータ異常：region._value 数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 対象APIに送信
            const response = await supertest(expressApp).put(Url.regionClose)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'sessionId'])
                .send({
                    actor: {
                        _value: 1000001
                    },
                    region: {
                        _value: 'a'
                    }
                });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
            expect(response.body.reasons[0].property).toBe('_value');
        });
    });
});
