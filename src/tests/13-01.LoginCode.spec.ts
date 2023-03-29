/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { Session } from './Session';
import { StubOperatorServerLoginCode } from './StubOperatorServer';
import Config from '../common/Config';
const Message = Config.ReadConfig('./config/message.json');

// 対象アプリケーションを取得
const app = new Application();
const expressApp = app.express.app;
const common = new Common();

// サーバをlisten
app.start();

// スタブサーバー（オペレータサービス）
let _operatorServer: StubOperatorServerLoginCode = null;

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
     * 全テスト実行の後処理
     */
    afterAll(async () => {
        // サーバ停止
        app.stop();
    });
    /**
     * 各テスト実行の後処理
     */
    afterEach(async () => {
        // スタブサーバー停止
        if (_operatorServer) {
            _operatorServer._server.close();
            _operatorServer = null;
        }
    });

    /**
     * ログインコード再作成
     */
    describe('ログインコード再作成', () => {
        test('異常：パラメータ異常', async () => {
            // スタブを起動
            _operatorServer = new StubOperatorServerLoginCode(200, 200, 3, true);

            // 送信データを生成
            const json = {
                pxrId: ''
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.loginCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.loginCode) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isNotEmpty);
        });
        test('異常：パラメータ異常', async () => {
            // スタブを起動
            _operatorServer = new StubOperatorServerLoginCode(200, 200, 3, true);

            // 送信データを生成
            const json = {
                pxrId: 123
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.loginCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.loginCode) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.body.reasons[0].message).toBe(Message.validation.isString);
            expect(response.status).toBe(400);
        });
        test('異常：パラメータ不足', async () => {
            // スタブを起動
            _operatorServer = new StubOperatorServerLoginCode(200, 200, 3, true);

            // 送信データを生成
            const json = {
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.loginCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.loginCode) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(response.body.reasons[0].message).toBe(Message.validation.isDefined);
            expect(response.status).toBe(400);
        });
        test('異常：オペレータタイプが0', async () => {
            // スタブを起動
            _operatorServer = new StubOperatorServerLoginCode(200, 200, 0, true);

            // 送信データを生成
            const json = {
                pxrId: '58di2dfse2.test.org'
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.loginCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=d89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 401, message: '権限が不足しています'
            }));
            expect(response.status).toBe(401);
        });
        test('異常：オペレータタイプが1', async () => {
            // スタブを起動
            _operatorServer = new StubOperatorServerLoginCode(200, 200, 1, true);

            // 送信データを生成
            const json = {
                pxrId: '58di2dfse2.test.org'
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.loginCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=d89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 401, message: '権限が不足しています'
            }));
            expect(response.status).toBe(401);
        });
        test('異常：オペレータタイプが2', async () => {
            // スタブを起動
            _operatorServer = new StubOperatorServerLoginCode(200, 200, 2, true);

            // 送信データを生成
            const json = {
                pxrId: '58di2dfse2.test.org'
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.loginCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=d89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 401, message: '権限が不足しています'
            }));
            expect(response.status).toBe(401);
        });
        test('異常：BOOK開設権限がない', async () => {
            // スタブを起動
            _operatorServer = new StubOperatorServerLoginCode(200, 200, 3, false);

            // 送信データを生成
            const json = {
                pxrId: '58di2dfse2.test.org'
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.loginCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=d89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 401, message: '権限が不足しています'
            }));
            expect(response.status).toBe(401);
        });
        test('異常：電話番号がない', async () => {
            // スタブを起動
            _operatorServer = new StubOperatorServerLoginCode(200, 200, 0, true, null);

            // 送信データを生成
            const json = {
                pxrId: '58di2dfse2.test.org'
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.loginCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.loginCode) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            try {
                // レスポンスチェック
                expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                    status: 400, message: Message.OPERATOR_DONT_HAVE_MOBILE
                }));
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：オペレータ情報取得時レスポンスが400', async () => {
            // スタブを起動
            _operatorServer = new StubOperatorServerLoginCode(400, 200, 3, true);

            // 送信データを生成
            const json = {
                pxrId: '58di2dfse2.test.org'
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.loginCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.loginCode) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 400,
                message: 'PXR-IDのユーザーは存在しません'
            }));
            expect(response.status).toBe(400);
        });
        test('異常：オペレータ情報取得時レスポンスが500', async () => {
            // スタブを起動
            _operatorServer = new StubOperatorServerLoginCode(500, 200, 3, true);

            // 送信データを生成
            const json = {
                pxrId: '58di2dfse2.test.org'
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.loginCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.loginCode) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 503,
                message: 'PXR-IDのユーザーは存在しません'
            }));
            expect(response.status).toBe(503);
        });
        test('異常：オペレータ情報取得時レスポンスが200以外', async () => {
            // スタブを起動
            _operatorServer = new StubOperatorServerLoginCode(204, 200, 3, true);

            // 送信データを生成
            const json = {
                pxrId: '58di2dfse2.test.org'
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.loginCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.loginCode) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 401,
                message: 'PXR-IDのユーザーは存在しません'
            }));
            expect(response.status).toBe(401);
        });
        test('異常：オペレータサービス接続エラー', async () => {
            // 送信データを生成
            const json = {
                pxrId: '58di2dfse2.test.org'
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.loginCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.loginCode) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                status: 503,
                message: 'オペレーターサービスとの接続に失敗しました'
            }));
            expect(response.status).toBe(503);
        });
        test('正常：ログインコード再作成', async () => {
            // スタブを起動
            _operatorServer = new StubOperatorServerLoginCode(200, 200, 0, true);

            // 送信データを生成
            const json = {
                pxrId: '58di2dfse2.test.org'
            };

            // 対象APIに送信
            const response = await supertest(expressApp).post(Url.loginCodeURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.loginCode) })
                .send(JSON.stringify(json));

            // レスポンスチェック
            try {
                const password = response.body['resetPassword'];
                expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                    pxrId: '58di2dfse2.test.org',
                    resetPassword: password
                }));
                expect(response.status).toBe(200);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
    });
});
