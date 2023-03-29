/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { Session } from './01-00.Session';
import { OperatorService } from './01-00.StubServer';
import Config from '../common/Config';
const Message = Config.ReadConfig('./config/message.json');

// 対象アプリケーションを取得
const app = new Application();
const expressApp = app.express.app;
const common = new Common();

// サーバをlisten
app.start();

let operator: any;

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
     * 各テスト実行の後処理
     */
    afterEach(async () => {
        // スタブを停止
        if (operator) {
            operator.server.close();
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
     * PXR-ID重複チェック
     */
    describe('PXR-ID重複チェック', () => {
        test('パラメータ不足：pxrId', async () => {
            // 送信データを生成
            const url = Url.checkPxrIdURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(JSON.stringify({}));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_IS_EMPTY);
        });
        test('パラメータ異常：pxrId（空文字）', async () => {
            // 送信データを生成
            const url = Url.checkPxrIdURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(JSON.stringify({
                    pxrId: ''
                }));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
        });
        test('パラメータ異常：pxrId（null）', async () => {
            // 送信データを生成
            const url = Url.checkPxrIdURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(JSON.stringify({
                    pxrId: null
                }));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
        });
        test('パラメータ異常：全体が空', async () => {
            // リクエストデータを読み込み
            const json = {};

            // 送信データを生成
            const url = Url.checkPxrIdURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_IS_EMPTY);
        });
        test('パラメータ異常：形式が配列', async () => {
            // 送信データを生成
            const url = Url.checkPxrIdURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(JSON.stringify([{
                    pxrId: 'ABCDEFG'
                }]));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNEXPECTED_ARRAY_REQUEST);
        });
        test('正常：重複なし', async () => {
            // スタブを起動
            operator = new OperatorService(200);

            // 送信データを生成
            const url = Url.checkPxrIdURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(JSON.stringify({
                    pxrId: 'ABCD'
                }));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.status).toBe('ok');
        });
        test('正常：重複あり（PXR-IDが既に存在する）', async () => {
            await common.executeSqlString(`
                INSERT INTO pxr_book_manage.my_condition_book
                (
                    pxr_id,
                    attributes,
                    is_disabled,
                    created_by,
                    created_at,
                    updated_by,
                    updated_at
                )
                VALUES
                (
                    'ABCD',
                    'aaa',
                    false,
                    'pxr_user',
                    NOW(),
                    'pxr_user',
                    NOW()
                );
            `);
            // スタブを起動
            operator = new OperatorService(200);

            // 送信データを生成
            const url = Url.checkPxrIdURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(JSON.stringify({
                    pxrId: 'ABCD'
                }));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.status).toBe('ng');
        });
        test('正常：重複あり（PXR-IDが論理削除状態で存在する）', async () => {
            await common.executeSqlString(`
                INSERT INTO pxr_book_manage.my_condition_book
                (
                    pxr_id,
                    attributes,
                    is_disabled,
                    created_by,
                    created_at,
                    updated_by,
                    updated_at
                )
                VALUES
                (
                    'EFGH',
                    'aaa',
                    true,
                    'pxr_user',
                    NOW(),
                    'pxr_user',
                    NOW()
                );
            `);
            // スタブを起動
            operator = new OperatorService(200);

            // 送信データを生成
            const url = Url.checkPxrIdURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(JSON.stringify({
                    pxrId: 'EFGH'
                }));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.status).toBe('ng');
        });
        test('正常：CookieからセッションIDを取得', async () => {
            // スタブを起動
            operator = new OperatorService(200);

            // 送信データを生成
            const url = Url.checkPxrIdURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '494a44bb97aa0ef964f6a666b9019b2d20bf05aa811919833f3e0c0ae2b09b38'])
                .send(JSON.stringify({
                    pxrId: 'AAAA'
                }));

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.status).toBe('ok');
        });
        test('異常：オペレーターサービスへの接続に失敗（セッション確認時）', async () => {
            // 送信データを生成
            const url = Url.checkPxrIdURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '494a44bb97aa0ef964f6a666b9019b2d20bf05aa811919833f3e0c0ae2b09b38'])
                .send(JSON.stringify({
                    pxrId: 'AAAA'
                }));

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常：セッション（オペレーター種別が運営メンバー以外）', async () => {
            // スタブを起動
            operator = new OperatorService(200);

            // 送信データを生成
            const url = Url.checkPxrIdURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.NOT_OPE_TYPE3) })
                .send(JSON.stringify({
                    pxrId: 'AAAA'
                }));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：セッション（オペレーター追加の権限がない）', async () => {
            // スタブを起動
            operator = new OperatorService(200);

            // 送信データを生成
            const url = Url.checkPxrIdURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.NOT_ADD_AUTH) })
                .send(JSON.stringify({
                    pxrId: 'AAAA'
                }));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：Cookieおよびセッション情報がない', async () => {
            // スタブを起動
            operator = new OperatorService(200);

            // 送信データを生成
            const url = Url.checkPxrIdURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(JSON.stringify({
                    pxrId: 'AAAA'
                }));

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_SESSION);
        });
    });
});
