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
/* eslint-enable */
const Message = Config.ReadConfig('./config/message.json');

const app = new Application();
const expressApp = app.express.app;
const common = new Common();
app.start();

let _operatorServer: any;

describe('book-mange API', () => {
    beforeAll(async () => {
        await common.connect();
        await common.executeSqlFile('initialData.sql');
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
    });

    /**
     * 出力データ管理取得
     */
    describe('出力データ管理取得', () => {
        test('正常：単一取得(mcdOutputCodeActorId指定)', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = Url.outputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        outputTypes: [1, 2],
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        app: {
                            _value: 1000004,
                            _ver: 1
                        },
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        inputFileIsReady: 1,
                        outputStatus: 1,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toEqual(
                [
                    {
                        id: '2',
                        pxrId: '58di2dfse2.test.org',
                        mcdOutputCodeId: 2,
                        mcdOutputCodeActorId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        outputType: '1',
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        region: { _value: '1000005', _ver: '1' },
                        actor: { _value: 1000001, _ver: 2 },
                        app: { _value: '1000004', _ver: '2' },
                        request: '個別リクエスト',
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file2',
                        inputFileIsReady: 1,
                        outputStatus: 1,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
                    }
                ]
            );
        });
        test('正常：複数取得', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.outputConditionDataURI, '?limit=5', '&offset=1', '&approved=0');

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        outputTypes: [1, 2],
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        inputFileIsReady: 1,
                        outputStatus: 1,
                        isDeleteTarget: 0,
                        deleteStatus: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toEqual(
                [
                    {
                        id: '3',
                        pxrId: '58di2dfse2.test.org',
                        mcdOutputCodeId: 2,
                        mcdOutputCodeActorId: 3,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        outputType: '1',
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        region: { _value: '1000005', _ver: '1' },
                        actor: { _value: 1000001, _ver: 1 },
                        request: '個別リクエスト',
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file2',
                        inputFileIsReady: 1,
                        outputStatus: 1,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 1
                    },
                    {
                        id: '4',
                        pxrId: '58di2dfse2.test.org',
                        mcdOutputCodeId: 3,
                        mcdOutputCodeActorId: 4,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c9',
                        outputType: '2',
                        expirationDate: '2020-01-01T00:00:00.000+0900',
                        s3Bucket: 'foos3stack-bars3bucket-6qlqstql4bog',
                        actor: { _value: 1000001, _ver: 1 },
                        app: { _value: '1000004', _ver: '1' },
                        request: '個別リクエスト',
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file3',
                        inputFileIsReady: 1,
                        outputStatus: 1,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
                    }
                ]
            );
        });
        test('正常：対象データなし', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = Url.outputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 111,
                        code: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toEqual(
                []
            );
        });
        test('異常：リクエストが空', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = Url.outputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify({}));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_IS_EMPTY);
        });
        test('パラメータ異常：mcdOutputCodeActorId、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = Url.outputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 'dummy',
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        outputTypes: [1, 2],
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        wf: null,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        inputFileIsReady: 1,
                        outputStatus: 1,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
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
            const url = Url.outputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 2,
                        code: ['4adb7ad5-a5e7-454c-rae1-34a564a155c8'],
                        outputTypes: [1, 2],
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        wf: null,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        inputFileIsReady: 1,
                        outputStatus: 1,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isString);
        });
        test('パラメータ異常：outputTypes、配列以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = Url.outputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        outputTypes: 1,
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        wf: null,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        inputFileIsReady: 1,
                        outputStatus: 1,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isArray);
        });
        test('パラメータ異常：outputTypes[n]、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = Url.outputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        outputTypes: ['dummy', 'dummy'],
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        wf: null,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        inputFileIsReady: 1,
                        outputStatus: 1,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
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
            const url = Url.outputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        outputTypes: [1, 2],
                        actor: {
                            _ver: 1
                        },
                        wf: null,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        inputFileIsReady: 1,
                        outputStatus: 1,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
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
            const url = Url.outputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        outputTypes: [1, 2],
                        actor: {
                            _value: 'dummy',
                            _ver: 1
                        },
                        wf: null,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        inputFileIsReady: 1,
                        outputStatus: 1,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
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
            const url = Url.outputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        outputTypes: [1, 2],
                        actor: {
                            _value: 1000001
                        },
                        wf: null,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        inputFileIsReady: 1,
                        outputStatus: 1,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
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
            const url = Url.outputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        outputTypes: [1, 2],
                        actor: {
                            _value: 1000001,
                            _ver: 'dummy'
                        },
                        wf: null,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        inputFileIsReady: 1,
                        outputStatus: 1,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
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
            const url = Url.outputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        outputTypes: [1, 2],
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        app: {
                            _ver: 1
                        },
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        inputFileIsReady: 1,
                        outputStatus: 1,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
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
            const url = Url.outputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        outputTypes: [1, 2],
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        app: {
                            _value: 'dummy',
                            _ver: 1
                        },
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        inputFileIsReady: 1,
                        outputStatus: 1,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
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
            const url = Url.outputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        outputTypes: [1, 2],
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        app: {
                            _value: 1000004
                        },
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        inputFileIsReady: 1,
                        outputStatus: 1,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
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
            const url = Url.outputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        outputTypes: [1, 2],
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        app: {
                            _value: 1000004,
                            _ver: 'dummy'
                        },
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        inputFileIsReady: 1,
                        outputStatus: 1,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
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
            const url = Url.outputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        outputTypes: [1, 2],
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        wf: {
                            _ver: 1
                        },
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        inputFileIsReady: 1,
                        outputStatus: 1,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
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
            const url = Url.outputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        outputTypes: [1, 2],
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        wf: {
                            _value: 'dummy',
                            _ver: 1
                        },
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        inputFileIsReady: 1,
                        outputStatus: 1,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
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
            const url = Url.outputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        outputTypes: [1, 2],
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        wf: {
                            _value: 1000004
                        },
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        inputFileIsReady: 1,
                        outputStatus: 1,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
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
            const url = Url.outputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        outputTypes: [1, 2],
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        wf: {
                            _value: 1000004,
                            _ver: 'dummy'
                        },
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        inputFileIsReady: 1,
                        outputStatus: 1,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：outputFileType、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = Url.outputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        outputTypes: [1, 2],
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        wf: null,
                        outputFileType: 'dummy',
                        uploadFileType: 1,
                        extDataRequested: 1,
                        inputFileIsReady: 1,
                        outputStatus: 1,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：uploadFileType、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = Url.outputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        outputTypes: [1, 2],
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        wf: null,
                        outputFileType: 1,
                        uploadFileType: 'dummy',
                        extDataRequested: 1,
                        inputFileIsReady: 1,
                        outputStatus: 1,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：extDataRequested、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = Url.outputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        outputTypes: [1, 2],
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        wf: null,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 'dummy',
                        inputFileIsReady: 1,
                        outputStatus: 1,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：inputFileIsReady、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = Url.outputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        outputTypes: [1, 2],
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        wf: null,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        inputFileIsReady: '1',
                        outputStatus: 1,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：outputStatus、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = Url.outputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        outputTypes: [1, 2],
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        wf: null,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        inputFileIsReady: 1,
                        outputStatus: 'dummy',
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：isDeleteTarget、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = Url.outputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        outputTypes: [1, 2],
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        wf: null,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        inputFileIsReady: 1,
                        outputStatus: 1,
                        isDeleteTarget: 'dummy',
                        deleteStatus: 0,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：deleteStatus、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = Url.outputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        outputTypes: [1, 2],
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        wf: null,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        inputFileIsReady: 1,
                        outputStatus: 1,
                        isDeleteTarget: 0,
                        deleteStatus: '0',
                        processing: 0
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
            const url = Url.outputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 2,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        outputTypes: [1, 2],
                        actor: {
                            _value: 1000001,
                            _ver: 1
                        },
                        wf: null,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        inputFileIsReady: 1,
                        outputStatus: 1,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
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
            const url = Url.outputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 2
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
            const url = Url.outputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type2_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 2
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
            const url = Url.outputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + ''])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 2
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
            const url = Url.outputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 2
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
            const url = Url.outputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 2
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
            const url = Url.outputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 2
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：Cookie使用、オペレータサービス未起動', async () => {
            // スタブサーバー起動

            // 送信データを生成
            const url = Url.outputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 2
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
    });

    /**
     * 出力データ管理更新
     */
    describe('出力データ管理更新', () => {
        test('正常：', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.updateOutputConditionDataURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 1000011,
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file11',
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toEqual(
                {
                    mcdOutputCodeActorId: 1,
                    code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                    actor: { _value: 1000011, _ver: 1 },
                    outputApproved: 1,
                    outputFileType: 1,
                    uploadFileType: 1,
                    extDataRequested: 1,
                    fileName: 'file11',
                    inputFileIsReady: 1,
                    outputStatus: 0,
                    isDeleteTarget: 0,
                    deleteStatus: 0,
                    processing: 0
                }
            );
        });
        test('正常：mcdOuputCodeActorId, code指定なし', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.updateOutputConditionDataURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        actor: {
                            _value: 1000011,
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file11',
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 1
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toEqual(
                {
                    mcdOutputCodeActorId: '1',
                    code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                    actor: { _value: 1000011, _ver: 1 },
                    outputApproved: 1,
                    outputFileType: 1,
                    uploadFileType: 1,
                    extDataRequested: 1,
                    fileName: 'file11',
                    inputFileIsReady: 1,
                    outputStatus: 0,
                    isDeleteTarget: 0,
                    deleteStatus: 0,
                    processing: 1
                }
            );
        });
        test('異常：リクエストが空', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.updateOutputConditionDataURI, '1');

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
        test('パラメータ異常：mcdOutputCodeActorId、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.updateOutputConditionDataURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 'dummy',
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 1000011,
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file11',
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
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
            const url = urljoin(Url.updateOutputConditionDataURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: ['4adb7ad5-a5e7-454c-rae1-34a564a155c8'],
                        actor: {
                            _value: 1000011,
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file11',
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isString);
        });
        test('パラメータ不足：actor._value', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.updateOutputConditionDataURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file11',
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
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
            const url = urljoin(Url.updateOutputConditionDataURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 'dummy',
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file11',
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
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
            const url = urljoin(Url.updateOutputConditionDataURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 1000011
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file11',
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
                    }
                ));

            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：actor._ver、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.updateOutputConditionDataURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 1000011,
                            _ver: 'dummy'
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file11',
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：outputApproved、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.updateOutputConditionDataURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 1000011,
                            _ver: 1
                        },
                        outputApproved: 'dummy',
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file11',
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：outputFileType、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.updateOutputConditionDataURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 1000011,
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 'dummy',
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file11',
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：uploadFileType、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.updateOutputConditionDataURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 1000011,
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 'dummy',
                        extDataRequested: 1,
                        fileName: 'file11',
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：extDataRequested、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.updateOutputConditionDataURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 1000011,
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 'dummy',
                        fileName: 'file11',
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：fileName、文字列以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.updateOutputConditionDataURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 1000011,
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: ['file11'],
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isString);
        });
        test('パラメータ異常：inputFileIsReady、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.updateOutputConditionDataURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 1000011,
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file11',
                        inputFileIsReady: 'dummy',
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：outputStatus、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.updateOutputConditionDataURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 1000011,
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file11',
                        inputFileIsReady: 1,
                        outputStatus: 'dummy',
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：isDeleteTarget、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.updateOutputConditionDataURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 1000011,
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file11',
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 'dummy',
                        deleteStatus: 0,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：deleteStatus、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.updateOutputConditionDataURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 1000011,
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file11',
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 'dummy',
                        processing: 0
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
            const url = urljoin(Url.updateOutputConditionDataURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 1000011,
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file11',
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 'dummy'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('異常：存在しないmcd_output_codeを指定(DBエラー)', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = urljoin(Url.updateOutputConditionDataURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-xxxxxxxxxxxx'
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_SAVE_ENTITY);
        });
        test('異常：Cookie使用, 個人', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 0);

            // 送信データを生成
            const url = urljoin(Url.updateOutputConditionDataURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 2
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
            const url = urljoin(Url.updateOutputConditionDataURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type2_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 2
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
            const url = urljoin(Url.updateOutputConditionDataURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + ''])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 2
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
            const url = urljoin(Url.updateOutputConditionDataURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 2
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
            const url = urljoin(Url.updateOutputConditionDataURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 2
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
            const url = urljoin(Url.updateOutputConditionDataURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 2
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：Cookie使用、オペレータサービス未起動', async () => {
            // スタブサーバー起動

            // 送信データを生成
            const url = urljoin(Url.updateOutputConditionDataURI, '1');

            // 対象APIに送信
            const response = await supertest(expressApp).put(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 2
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
    });

    /**
     * 出力データ管理作成
     */
    describe('出力データ管理作成', () => {
        test('正常：', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = Url.updateOutputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 1000021,
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file21',
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toEqual(
                {
                    id: '5',
                    mcdOutputCodeActorId: 1,
                    code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                    actor: { _value: 1000021, _ver: 1 },
                    outputApproved: 1,
                    outputFileType: 1,
                    uploadFileType: 1,
                    extDataRequested: 1,
                    fileName: 'file21',
                    inputFileIsReady: 1,
                    outputStatus: 0,
                    isDeleteTarget: 0,
                    deleteStatus: 0,
                    processing: 0
                }
            );
        });
        test('正常：actor指定なし、processingが1', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = Url.updateOutputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file21',
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 1
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body).toEqual(
                {
                    id: '6',
                    mcdOutputCodeActorId: 1,
                    code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                    actor: {},
                    outputApproved: 1,
                    outputFileType: 1,
                    uploadFileType: 1,
                    extDataRequested: 1,
                    fileName: 'file21',
                    inputFileIsReady: 1,
                    outputStatus: 0,
                    isDeleteTarget: 0,
                    deleteStatus: 0,
                    processing: 1
                }
            );
        });
        test('異常：リクエストが空', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = Url.updateOutputConditionDataURI;

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
        test('パラメータ異常：mcdOutputCodeActorId、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = Url.updateOutputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 'dummy',
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 1000011,
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file11',
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：code', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = Url.updateOutputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        actor: {
                            _value: 1000011,
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file11',
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：code、文字列以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = Url.updateOutputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: ['4adb7ad5-a5e7-454c-rae1-34a564a155c8'],
                        actor: {
                            _value: 1000011,
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file11',
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isString);
        });
        test('パラメータ不足：actor._value', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = Url.updateOutputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file11',
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
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
            const url = Url.updateOutputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 'dummy',
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file11',
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
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
            const url = Url.updateOutputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 1000011
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file11',
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
                    }
                ));

            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：actor._ver、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = Url.updateOutputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 1000011,
                            _ver: 'dummy'
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file11',
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：outputApproved、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = Url.updateOutputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 1000011,
                            _ver: 1
                        },
                        outputApproved: 'dummy',
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file11',
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：outputFileType、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = Url.updateOutputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 1000011,
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 'dummy',
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file11',
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：uploadFileType、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = Url.updateOutputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 1000011,
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 'dummy',
                        extDataRequested: 1,
                        fileName: 'file11',
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：extDataRequested、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = Url.updateOutputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 1000011,
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 'dummy',
                        fileName: 'file11',
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：fileName、文字列以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = Url.updateOutputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 1000011,
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: ['file11'],
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isString);
        });
        test('パラメータ不足：inputFileIsReady', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = Url.updateOutputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 1000011,
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file11',
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：inputFileIsReady、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = Url.updateOutputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 1000011,
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file11',
                        inputFileIsReady: 'dummy',
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：outputStatus', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = Url.updateOutputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 1000011,
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file11',
                        inputFileIsReady: 1,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：outputStatus、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = Url.updateOutputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 1000011,
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file11',
                        inputFileIsReady: 1,
                        outputStatus: 'dummy',
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：isDeleteTarget', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = Url.updateOutputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 1000011,
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file11',
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        deleteStatus: 0,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：isDeleteTarget、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = Url.updateOutputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 1000011,
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file11',
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 'dummy',
                        deleteStatus: 0,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：deleteStatus', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = Url.updateOutputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 1000011,
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file11',
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：deleteStatus、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = Url.updateOutputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 1000011,
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file11',
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 'dummy',
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：processing', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = Url.updateOutputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 1000011,
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file11',
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：processing、数値以外', async () => {
            // スタブサーバー起動
            _operatorServer = new StubOperatorServerType0(200, 3);

            // 送信データを生成
            const url = Url.updateOutputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 1000011,
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file11',
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
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
            const url = Url.updateOutputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 1000021,
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file21',
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
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
            const url = Url.updateOutputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type2_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 1000021,
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file21',
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
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
            const url = Url.updateOutputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + ''])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 1000021,
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file21',
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
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
            const url = Url.updateOutputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 1000021,
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file21',
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
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
            const url = Url.updateOutputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 1000021,
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file21',
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
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
            const url = Url.updateOutputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 1000021,
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file21',
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：Cookie使用、オペレータサービス未起動', async () => {
            // スタブサーバー起動

            // 送信データを生成
            const url = Url.updateOutputConditionDataURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(
                    {
                        mcdOutputCodeActorId: 1,
                        code: '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
                        actor: {
                            _value: 1000021,
                            _ver: 1
                        },
                        outputApproved: 1,
                        outputFileType: 1,
                        uploadFileType: 1,
                        extDataRequested: 1,
                        fileName: 'file21',
                        inputFileIsReady: 1,
                        outputStatus: 0,
                        isDeleteTarget: 0,
                        deleteStatus: 0,
                        processing: 0
                    }
                ));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
    });
});
