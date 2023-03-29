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
import StubCTokenLedgerServer from './StubCTokenLedgerServer';
/* eslint-enable */
const Message = Config.ReadConfig('./config/message.json');

const app = new Application();
const expressApp = app.express.app;
const common = new Common();
app.start();

const operatorService = new OperatorService();
const catalogService = new CatalogService();
let ctokenServer: StubCTokenLedgerServer = null;

/**
 * book-mange API のユニットテスト
 */
describe('book-mange API', () => {
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
    /**
     * 各テスト実行の後処理
     */
    afterEach(async () => {
        // スタブサーバー停止
        if (ctokenServer) {
            ctokenServer._server.close();
            ctokenServer = null;
        }
    });

    /**
     * CToken件数取得API
     */
    describe('CToken件数取得API', () => {
        test('異常：リクエストが空', async () => {
            const response = await supertest(expressApp)
                .post(Url.ctokenSearchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) });

            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.REQUEST_IS_EMPTY);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常：条件あり', async () => {
            ctokenServer = new StubCTokenLedgerServer(3008, 0, 200);
            const response = await supertest(expressApp)
                .post(Url.ctokenSearchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    createAt: {
                        start: '2020-01-01T00:00:00.000+0900',
                        end: '2021-02-01T00:00:00.000+0900'
                    }
                });
            try {
                expect(response.status).toBe(200);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常：条件なし', async () => {
            ctokenServer = new StubCTokenLedgerServer(3008, 0, 200);
            const response = await supertest(expressApp)
                .post(Url.ctokenSearchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    createAt: null
                });
            try {
                expect(response.status).toBe(200);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常：start, endなし', async () => {
            ctokenServer = new StubCTokenLedgerServer(3008, 0, 200);
            const response = await supertest(expressApp)
                .post(Url.ctokenSearchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    createAt: {
                        start: null,
                        end: null
                    }
                });
            try {
                expect(response.status).toBe(200);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常：CToken0件', async () => {
            ctokenServer = new StubCTokenLedgerServer(3008, 3, 200);
            const response = await supertest(expressApp)
                .post(Url.ctokenSearchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    createAt: null
                });
            try {
                expect(response.status).toBe(200);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常系：セッション(CTokenサービスエラー応答400系)', async () => {
            // スタブサーバー起動
            ctokenServer = new StubCTokenLedgerServer(3008, 0, 400);

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(Url.ctokenSearchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    createAt: null
                });
            try {
                // レスポンスチェック
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.FAILED_CTOKEN_COUNT_GET);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常系：セッション(CTokenサービスエラー応答500系)', async () => {
            // スタブサーバー起動
            ctokenServer = new StubCTokenLedgerServer(3008, 0, 503);

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(Url.ctokenSearchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    createAt: null
                });
            try {
                // レスポンスチェック
                expect(response.status).toBe(503);
                expect(response.body.message).toBe(Message.FAILED_CTOKEN_COUNT_GET);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常系：セッション(CTokenサービスエラー応答204)', async () => {
            // スタブサーバー起動
            ctokenServer = new StubCTokenLedgerServer(3008, 0, 204);

            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(Url.ctokenSearchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    createAt: null
                });
            try {
                // レスポンスチェック
                expect(response.status).toBe(401);
                expect(response.body.message).toBe(Message.FAILED_CTOKEN_COUNT_GET);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常系：セッション(CTokenサービス未起動)', async () => {
            // 対象APIに送信
            const response = await supertest(expressApp)
                .post(Url.ctokenSearchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    createAt: null
                });
            try {
                // レスポンスチェック
                expect(response.status).toBe(503);
                expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_CTOKEN_LEDGER);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
    });
});
