/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { Session } from './Session';
import { StubOperatorServerBookClose } from './StubOperatorServer';
import { StubCatalogServerBookClose } from './StubCatalogServer';
import StubIdServiceServer from './StubIdServiceServer';
import Config from '../common/Config';
const Message = Config.ReadConfig('./config/message.json');

// 対象アプリケーションを取得
const app = new Application();
const expressApp = app.express.app;
const common = new Common();

// サーバをlisten
app.start();

let operator: any;
let catalog: any;
let idService: any;

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

    afterEach(async () => {
        // スタブを停止
        if (operator) {
            operator._server.close();
            operator = null;
        }
        if (catalog) {
            catalog._server.close();
            catalog = null;
        }
        if (idService) {
            idService._server.close();
            idService = null;
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
     * 閉鎖
     */
    describe('閉鎖', () => {
        test('異常：オペレータタイプが個人でない(wf)', async () => {
            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.bookCloseDelete1) });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：オペレータタイプが個人でない(app)', async () => {
            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.bookCloseDelete2) });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：オペレータタイプが個人でない(運営メンバー)', async () => {
            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.bookCloseDelete3) });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：ログインしているオペレータのMyConditionBookデータがない', async () => {
            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialBookCloseData.sql');

            // スタブを起動
            operator = new StubOperatorServerBookClose(200, 200, 1, 0, 1000001);
            catalog = new StubCatalogServerBookClose(200, 1000000);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.bookCloseDeleteError) });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.PXR_ID_NOT_EXISTS);
        });
        /*
        test('異常：extカタログにactorコードが存在する(情報口座未閉鎖)', async () => {
            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialBookCloseData.sql');

            // スタブを起動
            operator = new StubOperatorServerBookClose(200, 200, 1, 0, 1000001);
            catalog = new StubCatalogServerBookClose(200, 1000001);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.bookCloseDelete) });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_INFO_ACCOUNT_CLOSE);
        });
        */
        test('異常：ログインしているオペレータ情報取得エラー(400)', async () => {
            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialBookCloseData.sql');

            // スタブを起動
            operator = new StubOperatorServerBookClose(400, 200, 1, 0, 1000001);
            catalog = new StubCatalogServerBookClose(200, 1000000);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.bookCloseDelete) });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.FAILED_OPERATOR_GET);
        });
        test('異常：ログインしているオペレータ情報取得エラー(500系)', async () => {
            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialBookCloseData.sql');

            // スタブを起動
            operator = new StubOperatorServerBookClose(500, 200, 1, 0, 1000001);
            catalog = new StubCatalogServerBookClose(200, 1000000);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.bookCloseDelete) });

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_OPERATOR_GET);
        });
        test('異常：ログインしているオペレータ情報取得エラー(200以外)', async () => {
            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialBookCloseData.sql');

            // スタブを起動
            operator = new StubOperatorServerBookClose(204, 200, 1, 0, 1000001);
            catalog = new StubCatalogServerBookClose(200, 1000000);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.bookCloseDelete) });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.FAILED_OPERATOR_GET);
        });
        test('異常：オペレータサービス接続エラー', async () => {
            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialBookCloseData.sql');

            // スタブを起動
            catalog = new StubCatalogServerBookClose(200, 1000000);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.bookCloseDelete) });

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常：カタログ取得エラー(500系)', async () => {
            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialBookCloseData.sql');

            // スタブを起動
            catalog = new StubCatalogServerBookClose(500, 1000000);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.bookCloseDelete) });

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常：カタログ取得エラー(200以外)', async () => {
            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialBookCloseData.sql');

            // スタブを起動
            catalog = new StubCatalogServerBookClose(204, 1000000);

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.bookCloseDelete) });

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常：カタログサービス接続エラー', async () => {
            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialBookCloseData.sql');

            // 送信データを生成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.bookCloseDelete) });

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('正常：ブック閉鎖、IDサービス使用', async () => {
            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialBookCloseData.sql');

            // 送信データを生成
            const url = Url.baseURI;

            // スタブを起動
            operator = new StubOperatorServerBookClose(200, 200, 1, 0, 1000001);
            catalog = new StubCatalogServerBookClose(200, 1000000);
            idService = new StubIdServiceServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.bookCloseDelete) });

            // レスポンスチェック
            try {
                expect(response.status).toBe(200);
            } catch (err) {
                console.log(err);
                throw err;
            }
        });
        test('正常：ブック閉鎖、IDサービス未使用', async () => {
            // 事前データ準備
            await common.executeSqlFile('initialData.sql');
            await common.executeSqlFile('initialBookCloseData.sql');

            // 送信データを生成
            const url = Url.baseURI;

            // スタブを起動
            operator = new StubOperatorServerBookClose(200, 200, 1, 0, 1000001);
            catalog = new StubCatalogServerBookClose(200, 1000000, false);

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.bookCloseDelete) });

            // レスポンスチェック
            try {
                expect(response.status).toBe(200);
            } catch (err) {
                console.log(err);
                throw err;
            }
        });
    });
});
