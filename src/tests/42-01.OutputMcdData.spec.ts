/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Application } from '../resources/config/Application';
import supertest = require('supertest');
import Common, { Url } from './Common';
import urljoin = require('url-join');
import Config from '../common/Config';
import { StubOperatorServerType0 } from './StubOperatorServer';
import { StubCatalogServerOutputMcdData } from './StubCatalogServer';
/* eslint-enable */
const Message = Config.ReadConfig('./config/message.json');

const app = new Application();
const expressApp = app.express.app;
const common = new Common();
app.start();

let _operatorServer: any;
let _catalogServer: any;

const APP = 0;
const REGION = 2;

describe('book-mange API', () => {
    beforeAll(async () => {
        await common.connect();
        await common.executeSqlFile('initialData.sql');
        await common.executeSqlFile('initialDataBook.sql');
        await common.executeSqlFile('initialOutputConditionData.sql');
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
     * My-Condition-Data出力コード取得
     */
    describe('My-Condition-Data出力コード取得', () => {
        test('正常：bookId指定', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerOutputMcdData(200, APP);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        pxrId: null,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        app: {
                            _value: 1000004,
                            _ver: 1
                        },
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: 1,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toEqual([]);
        });
        test('正常：pxrId指定', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerOutputMcdData(200, APP);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: null,
                        pxrId: 'dummy.test.org',
                        app: {
                            _value: 1000004,
                            _ver: 1
                        }
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toEqual(
                [
                    {
                        id: 1,
                        bookId: 1,
                        pxrId: 'dummy.test.org',
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c7',
                        type: 0,
                        actor: { _value: 1000001, _ver: 1 },
                        app: { _value: 1000004, _ver: 1 },
                        bookCloseAvailable: false,
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        dlUrlExpirationDate: '2020-01-01T00:00:00.000+0900',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null,
                        processing: 0
                    },
                    {
                        id: 2,
                        bookId: 1,
                        pxrId: 'dummy.test.org',
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: { _value: 1000001, _ver: 1 },
                        region: { _value: 1000005, _ver: 1 },
                        app: { _value: 1000004, _ver: 1 },
                        bookCloseAvailable: false,
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: 1,
                        processing: 0
                    }
                ]
            );
        });
        test('正常：pxrId指定(指定Idのbookなし)', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerOutputMcdData(200, REGION);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: null,
                        pxrId: 'nothing.test.org'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toEqual(
                []
            );
        });
        test('正常：pxrId, bookId指定なし', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerOutputMcdData(200, REGION);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: null,
                        pxrId: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(
                [
                    {
                        id: 1,
                        bookId: 1,
                        pxrId: 'dummy.test.org',
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c7',
                        type: 0,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        app: {
                            _value: 1000004,
                            _ver: 1
                        },
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        dlUrlExpirationDate: '2020-01-01T00:00:00.000+0900',
                        status: 0,
                        bookCloseAvailable: false,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null,
                        processing: 0
                    },
                    {
                        id: 2,
                        bookId: 1,
                        pxrId: 'dummy.test.org',
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        status: 0,
                        bookCloseAvailable: false,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: 1,
                        processing: 0
                    },
                    {
                        id: 3,
                        bookId: 2,
                        pxrId: '58di2dfse2.test.org',
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c9',
                        type: 2,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        app: {
                            _value: 1000004,
                            _ver: 1
                        },
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        dlUrlExpirationDate: '2020-01-01T00:00:00.000+0900',
                        status: 0,
                        bookCloseAvailable: false,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null,
                        processing: 0
                    },
                    {
                        id: 4,
                        bookId: 2,
                        pxrId: '58di2dfse2.test.org',
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c10',
                        type: 3,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        app: {
                            _value: 1000004,
                            _ver: 1
                        },
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        status: 0,
                        bookCloseAvailable: false,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null,
                        processing: 0
                    }
                ]
            );
        });
        test('正常：processing指定あり', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerOutputMcdData(200, REGION);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: null,
                        pxrId: null,
                        processing: 1
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toEqual(
                [
                    {
                        id: 5,
                        bookId: 3,
                        pxrId: '58di2dfse2.test.org',
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c11',
                        type: 2,
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        status: 0,
                        bookCloseAvailable: false,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null,
                        processing: 1
                    }
                ]
            );
        });
        test('正常：取得したmcd出力コードのpxrIdに該当するbookが存在しない', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerOutputMcdData(200, REGION);

            // データ変更
            await common.executeSqlString(`
                UPDATE pxr_book_manage.my_condition_book
                SET is_disabled = true
                WHERE pxr_id = 'dummy.test.org'
            `);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 1
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toEqual(
                []
            );
        });
        test('パラメータ異常：リクエストが空', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {}
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_IS_EMPTY);
        });
        test('パラメータ異常：bookId、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 'dummy',
                        pxrId: null,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        wf: null,
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：pxrId、文字列以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: null,
                        pxrId: ['58di2dfse2.test.org'],
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        wf: null,
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isString);
        });
        test('パラメータ異常：code、文字列以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        pxrId: null,
                        code: ['4adb7ad5-a5e7-454c-rae1-34a564a155c8'],
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        wf: null,
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isString);
        });
        test('パラメータ異常：type、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        pxrId: null,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 'dummy',
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        wf: null,
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：actor._value', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        pxrId: null,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        wf: null,
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：actor._value、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        pxrId: null,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 'dummy',
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        wf: null,
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：actor._ver、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        pxrId: null,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 'dummy'
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        wf: null,
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：region._value', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        pxrId: null,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _ver: 1
                        },
                        wf: null,
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：region._value、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        pxrId: null,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 'dummy',
                            _ver: 1
                        },
                        wf: null,
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：region._ver、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        pxrId: null,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 'dummy'
                        },
                        wf: null,
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：app._value', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        pxrId: null,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        app: {
                            _ver: 1
                        },
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：app._value、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        pxrId: null,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        app: {
                            _value: 'dummy',
                            _ver: 1
                        },
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：app._ver、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        pxrId: null,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        app: {
                            _value: 1000004,
                            _ver: 'dummy'
                        },
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：wf._value', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        pxrId: null,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        wf: {
                            _ver: 1
                        },
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：wf._value、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        pxrId: null,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        wf: {
                            _value: 'dummy',
                            _ver: 1
                        },
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：wf._ver、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        pxrId: null,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        wf: {
                            _value: 1000004,
                            _ver: 'dummy'
                        },
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：s3Bucket、文字列以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        pxrId: null,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        wf: null,
                        s3Bucket: ['foos3stack-bars3bucket-6qlqstql4bog'],
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isString);
        });
        test('パラメータ異常：expirationDate、日付以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        pxrId: null,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        wf: null,
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020010100000000000900',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDate);
        });
        test('パラメータ異常：status、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        pxrId: null,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        wf: null,
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 'dummy',
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：cooperationCancelApproved、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        pxrId: null,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        wf: null,
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 'dummy',
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：cooperationCanceled、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        pxrId: null,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        wf: null,
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 'dummy',
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：cooperationServiceCanceled、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        pxrId: null,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        wf: null,
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: 'dummy'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：processing、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        pxrId: null,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        wf: null,
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null,
                        processing: 'dummy'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('異常：Cookie使用, 個人', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 0);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: null,
                        pxrId: 'dummy.test.org'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：Cookieが存在するが空', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + ''])
                .send(JSON.stringify(
                    {
                        bookId: null,
                        pxrId: 'dummy.test.org'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_SESSION);
        });
        test('異常：Cookie使用、オペレータサービス応答204', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(204, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: null,
                        pxrId: 'dummy.test.org'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.IS_NOT_AUTHORIZATION_SESSION);
        });
        test('異常：Cookie使用、オペレータサービス応答400系', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(400, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: null,
                        pxrId: 'dummy.test.org'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.IS_NOT_AUTHORIZATION_SESSION);
        });
        test('異常：Cookie使用、オペレータサービス応答500系', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(503, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: null,
                        pxrId: 'dummy.test.org'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：Cookie使用、オペレータサービス未起動', async () => {
            // スタブサーバー起動

            // 送信データを生成
            const url = urljoin(Url.outputURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: null,
                        pxrId: 'dummy.test.org'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常：アクターがAPP かつ リクエストにAPPが指定されていない', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerOutputMcdData(200, APP);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        pxrId: null,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.EMPTY_APP_CATALOG_CODE);
        });
        test('異常：リクエストのAPPとアクターに関係がない', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerOutputMcdData(200, APP);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '?offset=0', '&limit=0');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        pxrId: null,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        app: {
                            _value: 1000009
                        },
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_APPLICATION_IS_NOT_RELATION);
        });
    });
    /**
     * My-Condition-Data出力コード更新
     */
    describe('My-Condition-Data出力コード更新', () => {
        test('正常：bookId以外指定', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000011,
                            _ver: 1
                        },
                        region: {
                            _value: 1000015,
                            _ver: 1
                        },
                        app: {
                            _value: 1000024,
                            _ver: 1
                        },
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: 0,
                        processing: 1
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toEqual(
                { result: 'success' }
            );
        });
        test('正常：bookIdのみ指定', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toEqual(
                { result: 'success' }
            );
        });
        test('パラメータ異常：リクエストが空', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {}
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_IS_EMPTY);
        });
        test('パラメータ異常：bookId、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        id: 1,
                        bookId: 'dummy',
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        wf: null,
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：code、文字列以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        pxrId: null,
                        code: ['4adb7ad5-a5e7-454c-rae1-34a564a155c8'],
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        wf: null,
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isString);
        });
        test('パラメータ異常：type、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 'dummy',
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        wf: null,
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：actor._value', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        wf: null,
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：actor._value、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 'dummy',
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        wf: null,
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：actor._ver', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        wf: null,
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：actor._ver、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 'dummy'
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        wf: null,
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：region._value', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _ver: 1
                        },
                        wf: null,
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：region._value、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 'dummy',
                            _ver: 1
                        },
                        wf: null,
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：region._ver', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005
                        },
                        wf: null,
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：region._ver、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 'dummy'
                        },
                        wf: null,
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：app._value', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        app: {
                            _ver: 1
                        },
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：app._value、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        app: {
                            _value: 'dummy',
                            _ver: 1
                        },
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：app._ver', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        app: {
                            _value: 1000004
                        },
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：app._ver、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        app: {
                            _value: 1000004,
                            _ver: 'dummy'
                        },
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：wf._value', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        wf: {
                            _ver: 1
                        },
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：wf._value、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        wf: {
                            _value: 'dummy',
                            _ver: 1
                        },
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：wf._ver', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        wf: {
                            _value: 1000004
                        },
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：wf._ver、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        wf: {
                            _value: 1000004,
                            _ver: 'dummy'
                        },
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：s3Bucket、文字列以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        wf: null,
                        s3Bucket: ['foos3stack-bars3bucket-6qlqstql4bog'],
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isString);
        });
        test('パラメータ異常：expirationDate、日付以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        wf: null,
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020010100000000000900',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDate);
        });
        test('パラメータ異常：status、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        wf: null,
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 'dummy',
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：cooperationCancelApproved、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        wf: null,
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 'dummy',
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：cooperationCanceled、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        wf: null,
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 'dummy',
                        cooperationServiceCanceled: null
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：cooperationServiceCanceled、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        wf: null,
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: 'dummy'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：processing、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        type: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        region: {
                            _value: 1000005,
                            _ver: 1
                        },
                        wf: null,
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        expirationDate: '2020-01-01T00:00:00.000+09:00',
                        status: 0,
                        cooperationCancelApproved: 1,
                        cooperationCanceled: 1,
                        cooperationServiceCanceled: null,
                        processing: 'dummy'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('異常：Cookie使用, 個人', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 0);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：Cookie使用, アプリケーション', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 2);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type2_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：Cookieが存在するが空', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + ''])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_SESSION);
        });
        test('異常：Cookie使用、オペレータサービス応答204', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(204, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.IS_NOT_AUTHORIZATION_SESSION);
        });
        test('異常：Cookie使用、オペレータサービス応答400系', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(400, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.IS_NOT_AUTHORIZATION_SESSION);
        });
        test('異常：Cookie使用、オペレータサービス応答500系', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(503, 3);

            // 送信データを生成
            const url = urljoin(Url.outputURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：Cookie使用、オペレータサービス未起動', async () => {
            // スタブサーバー起動

            // 送信データを生成
            const url = urljoin(Url.outputURI, '2');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        bookId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
    });
});
