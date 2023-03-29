/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { Session } from './Session';
import { RequestJson } from './RequestJson';
import { StubOperatorServerType0 } from './StubOperatorServer';
import { StubCatalogServerDataStore } from './StubCatalogServer';
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
        // 事前データ準備
        await common.executeSqlString(`
            INSERT INTO pxr_book_manage.my_condition_book
            (
                pxr_id, attributes,
                is_disabled, created_by, created_at, updated_by, updated_at
            )
            VALUES
            (
                '58di2dfse2.test.org', NULL,
                false, 'test_user', NOW(), 'test_user', NOW()
            );
        `);
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
        }
        if (catalog) {
            catalog._server.close();
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
     * データ蓄積定義追加
     */
    describe('データ蓄積定義追加', () => {
        test('異常：workflow（session）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_WF;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
        test('正常：application（session）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_APP;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(200);
        });
        test('異常：workflow（Cookie）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_WF;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
        test('正常：application（Cookie）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_APP;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(200);
        });
        test('正常：application（request.excludeDocumentが設定されている）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_APP4;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(200);
        });
        test('異常：Cookieが運営メンバー', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_APP;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 3);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '189171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：CookieがWF職員', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_APP;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 1);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type1_session=' + '189171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_SESSION);
        });
        test('異常：Cookieがアプリケーション', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_APP;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 2);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type2_session=' + '189171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：セッション確認のレスポンスが400', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_APP;

            // スタブを起動
            operator = new StubOperatorServerType0(400, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type2_session=' + '189171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.IS_NOT_AUTHORIZATION_SESSION);
        });
        test('異常：セッション確認のレスポンスが500', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_APP;

            // スタブを起動
            operator = new StubOperatorServerType0(500, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type2_session=' + '189171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：オペレーターサービスへの接続に失敗', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_APP;

            // スタブを起動
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type2_session=' + '189171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常：セッション情報、Cookieの両方が無い', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_APP;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_SESSION);
        });
        test('異常：セッション情報のオペレーター種別が個人以外', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_APP;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePostErrType) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：セッション情報からPXR-IDが取得できない', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_APP;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePostErrNotPxrId) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.EMPTY_PXR_ID);
        });
        test('異常：カタログ取得のレスポンスが400', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_APP;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(400);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常：カタログ取得のレスポンスが500', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_APP;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(500);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常：カタログ取得のレスポンスが401', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_APP;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(401);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常：カタログサービスへの接続に失敗', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_APP;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_CATALOG);
        });
        test('異常：アクターがWFまたはAPP以外', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_DT;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.ACTOR_CATALOG_INVALID);
        });
        test('異常：アクターカタログにcatalogItemが無い', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_INVALID_ACTOR;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.ACTOR_CATALOG_INVALID);
        });
        test('異常：アクターカタログにapplicationが無い', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_APP_MISSING_TEMPLATE;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.ACTOR_CATALOG_INVALID);
        });
        test('異常：application内にリクエスト.appのカタログコードが無い', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_MISSING_REQ_APP;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.APP_CATALOG_CODE_NOT_EXIST);
        });
        test('異常：applicationカタログ内のstoreが空', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_APP_EMPTY_TMP_STORE;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_STORE_CATALOG_CODE);
        });
        test('異常：蓄積定義カタログ内のtemplate.storeが空', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_STORE_MISSING_TEMPLATE;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_STORE_CATALOG_CODE);
        });
        test('異常：蓄積定義カタログのtemplate.storeが配列ではない', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_STORE_NOT_ARRAY_TEMPLATE;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_STORE_CATALOG_CODE);
        });
        test('異常：PXR-IDからBookが取得できない', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_APP;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePostErrBookNotExists) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_EXIST_BOOK);
        });
        test('パラメータ不足：actor', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_MISSING_ACTOR;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：actor（空）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_EMPTY_ACTOR;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.nestedValidation);
        });
        test('パラメータ不足：actor._value', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_MISSING_ACTOR_CODE;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：actor._value（空）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_EMPTY_ACTOR_CODE;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：actor._value（数字以外）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_ISNUM_ACTOR_CODE;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：actor._ver', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_MISSING_ACTOR_VER;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：actor._ver（空）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_EMPTY_ACTOR_VER;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：actor._ver（数字以外）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_ISNUM_ACTOR_VER;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：store', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_MISSING_STORE;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：store（空）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_EMPTY_STORE;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.nestedValidation);
        });
        test('パラメータ不足：store._value', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_MISSING_STORE_CODE;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：store._value（空）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_EMPTY_STORE_CODE;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：store._value（数字以外）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_ISNUM_STORE_CODE;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：store._ver', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_MISSING_STORE_VER;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：store._ver（空）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_EMPTY_STORE_VER;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：store._ver（数字以外）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_ISNUM_STORE_VER;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：storeCatalogId', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_MISSING_STORE_CATALOG_ID;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：storeCatalogId（空）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_EMPTY_STORE_CATALOG_ID;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：storeCatalogId（文字列以外）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_ISSTRING_STORE_CATALOG_ID;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isString);
        });
        test('パラメータ異常：wf & app（両方ともobject）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_SETTING_WF_APP;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
        test('パラメータ不足：wf._value', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_MISSING_WF_CODE;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：wf._value（空）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_EMPTY_WF_CODE;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：wf._value（数字以外）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_ISNUM_WF_CODE;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：wf._ver', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_MISSING_WF_VER;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：wf._ver（空）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_EMPTY_WF_VER;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：wf._ver（数字以外）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_ISNUM_WF_VER;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：app._value', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_MISSING_APP_CODE;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：app._value（空）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_EMPTY_APP_CODE;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：app._value（数字以外）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_ISNUM_APP_CODE;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：app._ver', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_MISSING_APP_VER;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：app._ver（空）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_EMPTY_APP_VER;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：app._ver（数字以外）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_ISNUM_APP_VER;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：excludeDocument（Array以外）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_NO_ARRAY_DOCUMENT;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isArray);
        });
        test('パラメータ不足：excludeDocument.code', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_MISSING_DOCUMENT_CODE;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：excludeDocument.code（空）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_EMPTY_DOCUMENT_CODE;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.nestedValidation);
        });
        test('パラメータ不足：excludeDocument.code._value', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_MISSING_DOCUMENT_CODE;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：excludeDocument.code._value（空）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_EMPTY_DOCUMENT_VALUE;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：excludeDocument.code._value（数字以外）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_ISNUM_DOCUMENT_VALUE;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：excludeDocument.code._ver', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_MISSING_DOCUMENT_VER;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：excludeDocument.code._ver（空）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_EMPTY_DOCUMENT_VER;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：excludeDocument.code._ver（数字以外）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_ISNUM_DOCUMENT_VER;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：excludeEvent（Array以外）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_NO_ARRAY_EVENT;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isArray);
        });
        test('パラメータ不足：excludeEvent.code', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_MISSING_EVENT_CODE;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：excludeEvent.code（空）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_EMPTY_EVENT_CODE;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ不足：excludeEvent.code._value', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_MISSING_EVENT_VALUE;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：excludeEvent.code._value（空）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_EMPTY_EVENT_VALUE;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：excludeEvent.code._value（数字以外）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_ISNUM_EVENT_VALUE;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：excludeEvent.code._ver', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_MISSING_EVENT_VER;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：excludeEvent.code._ver（空）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_EMPTY_EVENT_VER;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：excludeEvent.code._ver（数字以外）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_ISNUM_EVENT_VER;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：excludeEvent.excludeThing', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_MISSING_THING;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：excludeEvent.excludeThing（空）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_EMPTY_THING;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.nestedValidation);
        });
        test('パラメータ異常：excludeEvent.excludeThing（Array以外）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_ISARRAY_THING;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isArray);
        });
        test('パラメータ不足：excludeEvent.excludeThing.code', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_MISSING_THING_CODE;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：excludeThing.code（空）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_EMPTY_THING_CODE;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.nestedValidation);
        });
        test('パラメータ不足：excludeEvent.excludeThing.code._value', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_MISSING_THING_VALUE;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：excludeEvent.excludeThing.code._value（空）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_EMPTY_THING_VALUE;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：excludeEvent.excludeThing.code._value（数字以外）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_ISNUM_THING_VALUE;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：excludeEvent.excludeThing.code._ver', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_MISSING_THING_VER;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：excludeEvent.excludeThing.code._ver（空）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_EMPTY_THING_VER;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：excludeEvent.excludeThing.code._ver（数字以外）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_ISNUM_THING_VER;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：excludeEvent.excludeThing.code._value（数値以外）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_NOT_NUMBER_THING_VALUE;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：excludeEvent.excludeThing.code（複数要素）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_MISSING_THING_CODE2;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ不足：excludeEvent.excludeThing.code._value（複数要素）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_MISSING_THING_VALUE2;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：excludeEvent.excludeThing.code._value（空、複数要素）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_EMPTY_THING_VALUE2;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：excludeEvent.excludeThing.code._value（数字以外、複数要素）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_ISNUM_THING_VALUE2;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ不足：excludeEvent.excludeThing.code._ver（複数要素）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_MISSING_THING_VER2;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：excludeEvent.excludeThing.code._ver（空、複数要素）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_EMPTY_THING_VER2;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：excludeEvent.excludeThing.code._ver（数字以外、複数要素）', async () => {
            // リクエストデータを読み込み
            const json = RequestJson.STORE_POST_ISNUM_THING_VER2;

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNumber);
        });
        test('パラメータ異常：全部が空', async () => {
            // リクエストデータを読み込み
            const json = {};

            // スタブを起動
            operator = new StubOperatorServerType0(200, 0);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_IS_EMPTY);
        });
    });
});
