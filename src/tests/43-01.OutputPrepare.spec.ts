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
import { StubCatalogServerPrepare } from './StubCatalogServer';
/* eslint-enable */
const Message = Config.ReadConfig('./config/message.json');

const app = new Application();
const expressApp = app.express.app;
const common = new Common();
app.start();

let _operatorServer: any;
let _catalogServer: any;

describe('book-mange API', () => {
    beforeAll(async () => {
        await common.connect();
        await common.executeSqlFile('initialData.sql');
        await common.executeSqlFile('initialPrepareData.sql');
    });
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
        }
    });

    /**
     * データ出力準備
     */
    describe('データ出力準備', () => {
        test('正常：運営メンバー、出力タイプ不正', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerPrepare(200, 0, 0);

            // 送信データを生成
            const url = Url.outputConditionPrepare;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        type: 1,
                        pxrId: 'not.user.id.cooperate',
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000012,
                            _ver: 1
                        },
                        returnable: true,
                        cooperationRelease: true
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.INVALID_TYPE);
        });
        test('正常：運営メンバー、出力タイプ不正', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerPrepare(200, 0, 0);

            // 送信データを生成
            const url = Url.outputConditionPrepare;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        type: 6,
                        pxrId: 'not.user.id.cooperate',
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000012,
                            _ver: 1
                        },
                        returnable: true,
                        cooperationRelease: true
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.INVALID_TYPE);
        });
        test('正常：運営メンバー、出力タイプ：2 (Region利用終了) 利用者連携データなし', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerPrepare(200, 0, 0);

            // 送信データを生成
            const url = Url.outputConditionPrepare;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        type: 2,
                        pxrId: 'not.user.id.cooperate',
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000012,
                            _ver: 1
                        },
                        returnable: true,
                        cooperationRelease: true
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toEqual(
                {
                    type: 2,
                    pxrId: 'not.user.id.cooperate',
                    actor: { _value: 1000001, _ver: 1 },
                    region: { _value: 1000012, _ver: 1 },
                    returnable: true,
                    cooperationRelease: true,
                    code: response.body.code
                }
            );
        });
        test('正常：運営メンバー、出力タイプ：2 (Region利用終了)', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerPrepare(200, 0, 0);

            // 送信データを生成
            const url = Url.outputConditionPrepare;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        type: 2,
                        pxrId: '58di2dfse2.test.org',
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000012,
                            _ver: 1
                        },
                        returnable: true,
                        cooperationRelease: true
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toEqual(
                {
                    type: 2,
                    pxrId: '58di2dfse2.test.org',
                    actor: { _value: 1000001, _ver: 1 },
                    region: { _value: 1000012, _ver: 1 },
                    returnable: true,
                    cooperationRelease: true,
                    code: response.body.code
                }
            );
        });
        test('正常：運営メンバー、出力タイプ：3 (Region利用自動終了)', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerPrepare(200, 0, 0);

            // 送信データを生成
            const url = Url.outputConditionPrepare;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        type: 3,
                        pxrId: '58di2dfse2.test.org',
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000002,
                            _ver: 1
                        },
                        returnable: true,
                        cooperationRelease: true
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toEqual(
                {
                    type: 3,
                    pxrId: '58di2dfse2.test.org',
                    actor: { _value: 1000001, _ver: 1 },
                    region: { _value: 1000002, _ver: 1 },
                    returnable: true,
                    cooperationRelease: true,
                    code: response.body.code
                }
            );
        });
        test('正常：運営メンバー、出力タイプ：4 (Book閉鎖)', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerPrepare(200, 0, 0, 0, 0);

            // 送信データを生成
            const url = Url.outputConditionPrepare;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        type: 4,
                        pxrId: '58di2dfse2.test.org',
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        returnable: false,
                        cooperationRelease: false
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toEqual(
                {
                    type: 4,
                    pxrId: '58di2dfse2.test.org',
                    actor: { _value: 1000001, _ver: 1 },
                    returnable: false,
                    cooperationRelease: false,
                    code: response.body.code
                }
            );
        });
        test('正常：運営メンバー、出力タイプ：5 (Book強制閉鎖)', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerPrepare(200, 0, 0);

            // 送信データを生成
            const url = Url.outputConditionPrepare;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        type: 5,
                        pxrId: 'not.user.id.cooperate',
                        returnable: false,
                        cooperationRelease: false
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toEqual(
                {
                    type: 5,
                    pxrId: 'not.user.id.cooperate',
                    returnable: false,
                    cooperationRelease: false,
                    code: response.body.code
                }
            );
        });
        test('リクエストが空', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerPrepare(200, 0, 0);

            // 送信データを生成
            const url = Url.outputConditionPrepare;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify({}));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_IS_EMPTY);
        });
        test('リクエストが配列', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerPrepare(200, 0, 0);

            // 送信データを生成
            const url = Url.outputConditionPrepare;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify([
                    {
                        type: 3,
                        pxrId: '58di2dfse2.test.org',
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000002,
                            _ver: 1
                        },
                        returnable: true,
                        cooperationRelease: true
                    }
                ]));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_IS_ARRAY);
        });
        test('パラメータ不足：type', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerPrepare(200, 0, 0);

            // 送信データを生成
            const url = Url.outputConditionPrepare;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        pxrId: '58di2dfse2.test.org',
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000002,
                            _ver: 1
                        },
                        returnable: true,
                        cooperationRelease: true
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：type、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerPrepare(200, 0, 0);

            // 送信データを生成
            const url = Url.outputConditionPrepare;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        type: 'dummy',
                        pxrId: '58di2dfse2.test.org',
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000002,
                            _ver: 1
                        },
                        returnable: true,
                        cooperationRelease: true
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：pxrId、文字列以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerPrepare(200, 0, 0);

            // 送信データを生成
            const url = Url.outputConditionPrepare;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        type: 3,
                        pxrId: 1235461,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000002,
                            _ver: 1
                        },
                        returnable: true,
                        cooperationRelease: true
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isString);
        });
        test('パラメータ不足：pxrId (運営メンバーによるリクエスト)', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerPrepare(200, 0, 0);

            // 送信データを生成
            const url = Url.outputConditionPrepare;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        type: 3,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000002,
                            _ver: 1
                        },
                        returnable: true,
                        cooperationRelease: true
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('パラメータ過剰：pxrId (個人によるリクエスト)', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerPrepare(200, 0, 0);

            // 送信データを生成
            const url = Url.outputConditionPrepare;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        type: 2,
                        pxrId: '58di2dfse2.test.org',
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000002,
                            _ver: 1
                        },
                        returnable: true,
                        cooperationRelease: true
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('パラメータ不足：actor (typeが1, 2, 3のとき)', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerPrepare(200, 0, 0);

            // 送信データを生成
            const url = Url.outputConditionPrepare;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        type: 3,
                        pxrId: '58di2dfse2.test.org',
                        region: {
                            _value: 1000002,
                            _ver: 1
                        },
                        returnable: true,
                        cooperationRelease: true
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUIRED_ACTOR_FOR_OUTPUT);
        });
        test('パラメータ不足：actor._value', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerPrepare(200, 0, 0);

            // 送信データを生成
            const url = Url.outputConditionPrepare;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        type: 3,
                        pxrId: '58di2dfse2.test.org',
                        actor: {
                            _ver: 1
                        },
                        region: {
                            _value: 1000002,
                            _ver: 1
                        },
                        returnable: true,
                        cooperationRelease: true
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：actor._value、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerPrepare(200, 0, 0);

            // 送信データを生成
            const url = Url.outputConditionPrepare;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        type: 3,
                        pxrId: '58di2dfse2.test.org',
                        actor: {
                            _value: 'dummy',
                            _ver: 1
                        },
                        region: {
                            _value: 1000002,
                            _ver: 1
                        },
                        returnable: true,
                        cooperationRelease: true
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：actor._ver', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerPrepare(200, 0, 0);

            // 送信データを生成
            const url = Url.outputConditionPrepare;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        type: 3,
                        pxrId: '58di2dfse2.test.org',
                        actor: {
                            _value: 1000001
                        },
                        region: {
                            _value: 1000002,
                            _ver: 1
                        },
                        returnable: true,
                        cooperationRelease: true
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：actor._ver、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerPrepare(200, 0, 0);

            // 送信データを生成
            const url = Url.outputConditionPrepare;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        type: 3,
                        pxrId: '58di2dfse2.test.org',
                        actor: {
                            _value: 1000001,
                            _ver: 'dummy'
                        },
                        region: {
                            _value: 1000002,
                            _ver: 1
                        },
                        returnable: true,
                        cooperationRelease: true
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：region (typeが2, 3のとき)', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerPrepare(200, 0, 0);

            // 送信データを生成
            const url = Url.outputConditionPrepare;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        type: 3,
                        pxrId: '58di2dfse2.test.org',
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        returnable: true,
                        cooperationRelease: true
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUIRED_REGION_FOR_REGION_END);
        });
        test('パラメータ不足：region._value', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerPrepare(200, 0, 0);

            // 送信データを生成
            const url = Url.outputConditionPrepare;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        type: 3,
                        pxrId: '58di2dfse2.test.org',
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _ver: 1
                        },
                        returnable: true,
                        cooperationRelease: true
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：region._value、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerPrepare(200, 0, 0);

            // 送信データを生成
            const url = Url.outputConditionPrepare;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        type: 3,
                        pxrId: '58di2dfse2.test.org',
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 'dummy',
                            _ver: 1
                        },
                        returnable: true,
                        cooperationRelease: true
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：region._ver', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerPrepare(200, 0, 0);

            // 送信データを生成
            const url = Url.outputConditionPrepare;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        type: 3,
                        pxrId: '58di2dfse2.test.org',
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000002
                        },
                        returnable: true,
                        cooperationRelease: true
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：region._ver、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerPrepare(200, 0, 0);

            // 送信データを生成
            const url = Url.outputConditionPrepare;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        type: 3,
                        pxrId: '58di2dfse2.test.org',
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000002,
                            _ver: 'dummy'
                        },
                        returnable: true,
                        cooperationRelease: true
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：cooperationRelease (regionが存在するとき)', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerPrepare(200, 0, 0);

            // 送信データを生成
            const url = Url.outputConditionPrepare;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        type: 3,
                        pxrId: '58di2dfse2.test.org',
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000002,
                            _ver: 1
                        },
                        returnable: true
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUIRED_COOPERATION_RELEASE);
        });
        test('パラメータ異常：cooperationRelease、真偽値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerPrepare(200, 0, 0);

            // 送信データを生成
            const url = Url.outputConditionPrepare;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        type: 3,
                        pxrId: '58di2dfse2.test.org',
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000002,
                            _ver: 1
                        },
                        returnable: true,
                        cooperationRelease: 1
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isBoolean);
        });
        test('異常：regionのカタログにwf-allianceが設定されている', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerPrepare(200, 0, 0);

            // 送信データを生成
            const url = Url.outputConditionPrepare;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        type: 2,
                        pxrId: '58di2dfse2.test.org',
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        returnable: true,
                        cooperationRelease: true
                    }
                ));
            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
        test('異常：個人によるRegion利用終了リクエスト(出力タイプ: 2)', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerPrepare(200, 0, 0);

            // 送信データを生成
            const url = Url.outputConditionPrepare;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        type: 2,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000002,
                            _ver: 1
                        },
                        returnable: true,
                        cooperationRelease: true
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：個人によるBook強制閉鎖リクエスト (出力タイプ: 5)', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerPrepare(200, 0, 0);

            // 送信データを生成
            const url = Url.outputConditionPrepare;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        type: 5,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000002,
                            _ver: 1
                        },
                        returnable: true,
                        cooperationRelease: true
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：指定したpxr-idに該当するbookが存在しない', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerPrepare(200, 0, 0);

            // 送信データを生成
            const url = Url.outputConditionPrepare;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        type: 3,
                        pxrId: 'noexist.test.org',
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000002,
                            _ver: 1
                        },
                        returnable: true,
                        cooperationRelease: true
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.FAILED_OPERATOR_GET_PXR_ID);
        });
        test('異常：Cookie使用, アプリケーション', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 2);
            _catalogServer = new StubCatalogServerPrepare(200, 0, 0);

            // 送信データを生成
            const url = Url.outputConditionPrepare;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type2_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        type: 3,
                        pxrId: '58di2dfse2.test.org',
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000002,
                            _ver: 1
                        },
                        returnable: true,
                        cooperationRelease: true
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：Cookieが存在するが空', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerPrepare(200, 0, 0);

            // 送信データを生成
            const url = Url.outputConditionPrepare;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + ''])
                .send(JSON.stringify(
                    {
                        type: 3,
                        pxrId: '58di2dfse2.test.org',
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000002,
                            _ver: 1
                        },
                        returnable: true,
                        cooperationRelease: true
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_SESSION);
        });
        test('異常：Cookie使用、オペレータサービス応答204', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(204, 3);
            _catalogServer = new StubCatalogServerPrepare(200, 0, 0);

            // 送信データを生成
            const url = Url.outputConditionPrepare;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        type: 3,
                        pxrId: '58di2dfse2.test.org',
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000002,
                            _ver: 1
                        },
                        returnable: true,
                        cooperationRelease: true
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.IS_NOT_AUTHORIZATION_SESSION);
        });
        test('異常：Cookie使用、オペレータサービス応答400系', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(400, 3);
            _catalogServer = new StubCatalogServerPrepare(200, 0, 0);

            // 送信データを生成
            const url = Url.outputConditionPrepare;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        type: 3,
                        pxrId: '58di2dfse2.test.org',
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000002,
                            _ver: 1
                        },
                        returnable: true,
                        cooperationRelease: true
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.IS_NOT_AUTHORIZATION_SESSION);
        });
        test('異常：Cookie使用、オペレータサービス応答500系', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(503, 3);
            _catalogServer = new StubCatalogServerPrepare(200, 0, 0);

            // 送信データを生成
            const url = Url.outputConditionPrepare;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        type: 3,
                        pxrId: '58di2dfse2.test.org',
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000002,
                            _ver: 1
                        },
                        returnable: true,
                        cooperationRelease: true
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：Cookie使用、オペレータサービス未起動', async () => {
            // スタブサーバー起動
            _catalogServer = new StubCatalogServerPrepare(200, 0, 0);

            // 送信データを生成
            const url = Url.outputConditionPrepare;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        type: 3,
                        pxrId: '58di2dfse2.test.org',
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000002,
                            _ver: 1
                        },
                        returnable: true,
                        cooperationRelease: true
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常：セッション(カタログサービスエラー応答204)', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerPrepare(204, 0, 0);

            // 送信データを生成
            const url = Url.outputConditionPrepare;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        type: 3,
                        pxrId: '58di2dfse2.test.org',
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000002,
                            _ver: 1
                        },
                        returnable: true,
                        cooperationRelease: true
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常：セッション(カタログサービスエラー応答400系)', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerPrepare(400, 0, 0);

            // 送信データを生成
            const url = Url.outputConditionPrepare;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        type: 3,
                        pxrId: '58di2dfse2.test.org',
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000002,
                            _ver: 1
                        },
                        returnable: true,
                        cooperationRelease: true
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常：セッション(カタログサービスエラー応答500系)', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerPrepare(503, 0, 0);

            // 送信データを生成
            const url = Url.outputConditionPrepare;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        type: 3,
                        pxrId: '58di2dfse2.test.org',
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000002,
                            _ver: 1
                        },
                        returnable: true,
                        cooperationRelease: true
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常：セッション(カタログサービス未起動)', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = Url.outputConditionPrepare;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        type: 3,
                        pxrId: '58di2dfse2.test.org',
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000002,
                            _ver: 1
                        },
                        returnable: true,
                        cooperationRelease: true
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_CATALOG);
        });
    });
});
