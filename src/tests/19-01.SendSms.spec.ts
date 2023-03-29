/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Application } from '../resources/config/Application';
import supertest = require('supertest');
import { CatalogService, OperatorService } from './16-00.StubServer';
import { StubCatalogServerNotify } from './StubCatalogServer';
import Common from './Common';
import Config from '../common/Config';
import { StubOperatorServerSmSError } from './StubOperatorServer';
const Message = Config.ReadConfig('./config/message.json');
/* eslint-enable */

const app = new Application();
const expressApp = app.express.app;
const common = new Common();
app.start();

const operatorService = new OperatorService();
const catalogService = new CatalogService();
let _catalogServer: any;
let _operatorService: any;

describe('Book Manage Service.Send SMS API Controller', () => {
    beforeAll(async () => {
        await common.connect();
        await common.executeSqlFile('initialData.sql');
        await operatorService.start();
        await catalogService.start();
    });
    afterAll(async () => {
        app.stop();
        await operatorService.stop();
        await catalogService.stop();
    });
    afterEach(async () => {
        // スタブを停止
        if (_operatorService) {
            _operatorService._server.close();
        }
        if (_catalogServer) {
            _catalogServer._server.close();
        }
    });
    test('正常系：初期パスワードの案内を送信する', async () => {
        const response = await supertest(expressApp)
            .post('/book-manage/sms/open')
            .set({
                'Content-Type': 'application/json',
                accept: 'application/json'
            })
            .set('Cookie', ['operator_type3_session=ac0a665d2e55d9c73116c6326cb9e064e35938789aacf478b0c386c98bcffc94'])
            .send({
                pxrId: '58di2dfse2.test.org',
                initialPassword: 'initial_password'
            });

        expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 'success' }));
        expect(response.status).toBe(200);
    });
    test('パラメータ不足：pxrId', async () => {
        const response = await supertest(expressApp)
            .post('/book-manage/sms/open')
            .set({
                'Content-Type': 'application/json',
                accept: 'application/json'
            })
            .set('Cookie', ['operator_type0_session=bc0a665d2e55d9c73116c6326cb9e064e35938789aacf478b0c386c98bcffc94'])
            .send({
                initialPassword: 'initial_password'
            });

        expect(response.status).toBe(400);
        expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
    });
    test('パラメータ異常：pxrId、空', async () => {
        const response = await supertest(expressApp)
            .post('/book-manage/sms/open')
            .set({
                'Content-Type': 'application/json',
                accept: 'application/json'
            })
            .set('Cookie', ['operator_type3_session=ac0a665d2e55d9c73116c6326cb9e064e35938789aacf478b0c386c98bcffc94'])
            .send({
                pxrId: '',
                initialPassword: 'initial_password'
            });

        expect(response.status).toBe(400);
        expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
    });
    test('パラメータ異常：pxrId、null', async () => {
        const response = await supertest(expressApp)
            .post('/book-manage/sms/open')
            .set({
                'Content-Type': 'application/json',
                accept: 'application/json'
            })
            .set('Cookie', ['operator_type3_session=ac0a665d2e55d9c73116c6326cb9e064e35938789aacf478b0c386c98bcffc94'])
            .send({
                pxrId: 'null',
                initialPassword: 'initial_password'
            });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe(Message.FAILED_GET_USER_INFORMATION);
    });
    test('パラメータ不足：initialPassword', async () => {
        const response = await supertest(expressApp)
            .post('/book-manage/sms/open')
            .set({
                'Content-Type': 'application/json',
                accept: 'application/json'
            })
            .set('Cookie', ['operator_type3_session=ac0a665d2e55d9c73116c6326cb9e064e35938789aacf478b0c386c98bcffc94'])
            .send({
                pxrId: '58di2dfse2.test.org'
            });

        expect(response.status).toBe(400);
        expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
    });
    test('パラメータ異常：initialPassword、空', async () => {
        const response = await supertest(expressApp)
            .post('/book-manage/sms/open')
            .set({
                'Content-Type': 'application/json',
                accept: 'application/json'
            })
            .set('Cookie', ['operator_type3_session=ac0a665d2e55d9c73116c6326cb9e064e35938789aacf478b0c386c98bcffc94'])
            .send({
                pxrId: '58di2dfse2.test.org',
                initialPassword: ''
            });

        expect(response.status).toBe(400);
        expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
    });
    test('パラメータ異常：initialPassword、null', async () => {
        const response = await supertest(expressApp)
            .post('/book-manage/sms/open')
            .set({
                'Content-Type': 'application/json',
                accept: 'application/json'
            })
            .set('Cookie', ['operator_type3_session=ac0a665d2e55d9c73116c6326cb9e064e35938789aacf478b0c386c98bcffc94'])
            .send({
                pxrId: '58di2dfse2.test.org',
                initialPassword: null
            });

        expect(response.status).toBe(400);
        expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
    });
    test('異常系：リクエストが配列', async () => {
        const response = await supertest(expressApp)
            .post('/book-manage/sms/open')
            .set({
                'Content-Type': 'application/json',
                accept: 'application/json'
            })
            .set('Cookie', ['operator_type3_session=ac0a665d2e55d9c73116c6326cb9e064e35938789aacf478b0c386c98bcffc94'])
            .send([{
                pxrId: '58di2dfse2.test.org',
                initialPassword: 'initial_password'
            }]);

        expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 400, message: 'リクエストが配列です' }));
        expect(response.status).toBe(400);
    });
    test('異常系：利用可能な電話番号ではない', async () => {
        const response = await supertest(expressApp)
            .post('/book-manage/sms/open')
            .set({
                'Content-Type': 'application/json',
                accept: 'application/json'
            })
            .set('Cookie', ['operator_type3_session=ac0a665d2e55d9c73116c6326cb9e064e35938789aacf478b0c386c98bcffc94'])
            .send({
                pxrId: 'test.non',
                initialPassword: 'initial_password'
            });

        expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 400, message: '現在、登録されている利用者情報では、電話番号として利用可能な値が存在しません' }));
        expect(response.status).toBe(400);
    });
    test('異常系：利用者情報が取得できない', async () => {
        const response = await supertest(expressApp)
            .post('/book-manage/sms/open')
            .set({
                'Content-Type': 'application/json',
                accept: 'application/json'
            })
            .set('Cookie', ['operator_type3_session=ac0a665d2e55d9c73116c6326cb9e064e35938789aacf478b0c386c98bcffc94'])
            .send({
                pxrId: 'dummy.test.org',
                initialPassword: 'initial_password'
            });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe(Message.FAILED_GET_USER_INFORMATION);
    });
    test('異常系：利用者情報のitem-groupが配列ではない', async () => {
        const response = await supertest(expressApp)
            .post('/book-manage/sms/open')
            .set({
                'Content-Type': 'application/json',
                accept: 'application/json'
            })
            .set('Cookie', ['operator_type3_session=ac0a665d2e55d9c73116c6326cb9e064e35938789aacf478b0c386c98bcffc94'])
            .send({
                pxrId: '68di2dfse2.test.org',
                initialPassword: 'initial_password'
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe(Message.NOT_AVAILABLE_PHONE_NUMBER);
    });
    test('異常系：Cookieが存在するが空', async () => {
        const response = await supertest(expressApp)
            .post('/book-manage/sms/open')
            .set({
                'Content-Type': 'application/json',
                accept: 'application/json'
            })
            .set('Cookie', ['operator_type3_session='])
            .send({
                pxrId: '58di2dfse2.test.org',
                initialPassword: 'initial_password'
            });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
    });
    test('異常系：Cookie使用、オペレータサービス応答204', async () => {
        const response = await supertest(expressApp)
            .post('/book-manage/sms/open')
            .set({
                'Content-Type': 'application/json',
                accept: 'application/json'
            })
            .set('Cookie', ['operator_type3_session=ac0a665d2e55d9c73116c6326cb9e064e35938789aacf478b0c386c98bcffc94'])
            .send({
                pxrId: 'opetratorServiceError.204',
                initialPassword: 'initial_password'
            });

        expect(response.status).toBe(503);
        expect(response.body.message).toBe(Message.UNDEFINED_ERROR);
    });
    test('異常系：Cookie使用、オペレータサービス応答400系', async () => {
        const response = await supertest(expressApp)
            .post('/book-manage/sms/open')
            .set({
                'Content-Type': 'application/json',
                accept: 'application/json'
            })
            .set('Cookie', ['operator_type3_session=ac0a665d2e55d9c73116c6326cb9e064e35938789aacf478b0c386c98bcffc94'])
            .send({
                pxrId: 'opetratorServiceError.400',
                initialPassword: 'initial_password'
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe(Message.FAILED_GET_USER_INFORMATION);
    });
    test('異常系：Cookie使用、オペレータサービス応答500系', async () => {
        const response = await supertest(expressApp)
            .post('/book-manage/sms/open')
            .set({
                'Content-Type': 'application/json',
                accept: 'application/json'
            })
            .set('Cookie', ['operator_type3_session=ac0a665d2e55d9c73116c6326cb9e064e35938789aacf478b0c386c98bcffc94'])
            .send({
                pxrId: 'opetratorServiceError.503',
                initialPassword: 'initial_password'
            });

        expect(response.status).toBe(503);
        expect(response.body.message).toBe(Message.FAILED_GET_USER_INFORMATION);
    });
    test('異常系：セッション(オペレータサービス未起動)', async () => {
        // オペレーターサービス停止
        await operatorService.stop();

        const response = await supertest(expressApp)
            .post('/book-manage/sms/open')
            .set({
                'Content-Type': 'application/json',
                accept: 'application/json'
            })
            .set('Cookie', ['operator_type3_session=ac0a665d2e55d9c73116c6326cb9e064e35938789aacf478b0c386c98bcffc94'])
            .send({
                pxrId: '58di2dfse2.test.org',
                initialPassword: 'initial_password'
            });

        expect(response.status).toBe(500);
        expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
    });
    test('異常系：セッション(利用者情報取得時 オペレータサービス未起動)', async () => {
        // オペレーターサービス停止
        _operatorService = new StubOperatorServerSmSError(200, 0);

        const response = await supertest(expressApp)
            .post('/book-manage/sms/open')
            .set({
                'Content-Type': 'application/json',
                accept: 'application/json'
            })
            .set('Cookie', ['operator_type3_session=ac0a665d2e55d9c73116c6326cb9e064e35938789aacf478b0c386c98bcffc94'])
            .send({
                pxrId: '58di2dfse2.test.org',
                initialPassword: 'initial_password'
            });

        expect(response.status).toBe(503);
        expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
    });
    test('異常系：セッションなし', async () => {
        // オペレーターサービス開始
        await operatorService.start();

        const response = await supertest(expressApp)
            .post('/book-manage/sms/open')
            .set({
                'Content-Type': 'application/json',
                accept: 'application/json'
            })
            .send({
                pxrId: '58di2dfse2.test.org',
                initialPassword: 'initial_password'
            });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
    });
});
