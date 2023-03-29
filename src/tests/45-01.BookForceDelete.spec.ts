/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { StubOperatorServerBookForceDelete } from './StubOperatorServer';
import { StubCatalogServerBookForceDelete } from './StubCatalogServer';
import StubIdServiceServer from './StubIdServiceServer';
import EntityOperation from '../repositories/EntityOperation';
import { Session } from './Session';
import Config from '../common/Config';
import urljoin = require('url-join');
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

jest.mock('../common/Config', () => ({
    ...jest.requireActual('../common/Config') as any,
    default: {
        ReadConfig: jest.fn((path: string) => {
            const fs = require('fs');
            if (path === './config/config.json') {
                return {
                    operatorUrl: 'http://localhost:3000/operator',
                    catalogUrl: 'http://localhost:3001/catalog',
                    identityUrl: 'http://localhost:3007/identity-verificate',
                    notificationUrl: 'http://localhost:3004/notification',
                    ctokenLedgerUrl: 'http://localhost:3008/ctoken-ledger',
                    bookOperateUrl: 'http://localhost:3006/book-operate',
                    initialPasswordExpire: 7,
                    extName: 'test-org',
                    pxrRootGrobalSettingNs: 'catalog/ext/test-org/setting/actor/pxr-root/actor_1000001',
                    pxrRootNs: 'catalog/ext/{extName}/actor/pxr-root',
                    globalCatalogCode: 1000374,
                    urlMappingCreateHtmlNs: 'catalog/ext/{ext_name}/url-mapping/actor_{actorCode}/create-html-function',
                    builtInUrlMappingCreateHtmlNs: 'catalog/built_in/url-mapping/create-html-function',
                    pxrRootActorSettingNs: 'catalog/ext/{ext_name}/setting/actor/pxr-root/actor_{actorCode}',
                    sharingRestrictionCatalogNs: 'catalog/ext/{ext_name}/actor/{app_or_wf}/actor_{actor_code}/sharing-restriction',
                    password: {
                        initLength: 12,
                        hashSalt: 'PT4h6YUq',
                        hashStrechCount: 5000
                    },
                    proxyService: {
                        proxy: 'http://localhost:3003/pxr-block-proxy'
                    },
                    timezone: 'Asia/Tokyo'
                };
            } else {
                return JSON.parse(fs.readFileSync(path, 'UTF-8'));
            }
        })
    }
}));

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
        await common.executeSqlFile('initialBookCloseData.sql');
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
     * Book強制削除
     */
    describe('Book強制削除', () => {
        test('異常：オペレータタイプが運営メンバーでない(wf)', async () => {
            // 送信データを生成
            const url = urljoin(Url.bookForceDeleteURI, '58di2dfse2.test.org', '?physicalDelete=false');

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.bookCloseDelete1) });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：オペレータタイプが運営メンバーでない(app)', async () => {
            // 送信データを生成
            const url = urljoin(Url.bookForceDeleteURI, '58di2dfse2.test.org', '?physicalDelete=false');

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.bookCloseDelete2) });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：オペレータタイプが運営メンバーでない(個人)', async () => {
            // 送信データを生成
            const url = urljoin(Url.bookForceDeleteURI, '58di2dfse2.test.org', '?physicalDelete=false');

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.bookCloseDelete) });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('正常：論理削除', async () => {
            // 送信データを生成
            const url = urljoin(Url.bookForceDeleteURI, '58di2dfse2.test.org', '?physicalDelete=false');

            // スタブを起動
            operator = new StubOperatorServerBookForceDelete(200, 200, 200, 1, 3, 1000001);
            catalog = new StubCatalogServerBookForceDelete(200, true);
            idService = new StubIdServiceServer(200);

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({ result: 'success' }));
        });
        test('正常：物理削除', async () => {
            // 送信データを生成
            const url = urljoin(Url.bookForceDeleteURI, '58di2dfse3.test.org', '?physicalDelete=true');

            // スタブを起動
            operator = new StubOperatorServerBookForceDelete(200, 200, 200, 1, 3, 1000001);
            catalog = new StubCatalogServerBookForceDelete(200, false);

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url + '?physicalDelete=true')
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify({ result: 'success' }));
        });
        test('異常：指定したPXR-IDに一致するBookが存在しない', async () => {
            // 送信データを生成
            const url = urljoin(Url.bookForceDeleteURI, '58di2dfse0.test.org', '?physicalDelete=false');

            // スタブを起動
            operator = new StubOperatorServerBookForceDelete(200, 200, 200, 1, 3, 1000001);

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.PXR_ID_NOT_EXISTS);
        });
        test('異常：オペレーター削除エラー', async () => {
            // 送信データを生成
            const url = urljoin(Url.bookForceDeleteURI, '58di2dfse4.test.org', '?physicalDelete=false');

            // スタブを起動
            operator = new StubOperatorServerBookForceDelete(200, 503, 200, 1, 3, 1000001);

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_OPERATOR_DEL);

            // ロールバック処理の確認
            const book: any = await EntityOperation.getBookRecordById(3);
            expect(book.isDisabled).toBe(false);
        });
        test('異常：Cookie使用, 個人', async () => {
            // 送信データを生成
            const url = urljoin(Url.bookForceDeleteURI, '58di2dfse4.test.org', '?physicalDelete=false');

            // スタブを起動
            operator = new StubOperatorServerBookForceDelete(200, 200, 200, 1, 0, 1000001);

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：Cookie使用, ワークフロー', async () => {
            // 送信データを生成
            const url = urljoin(Url.bookForceDeleteURI, '58di2dfse4.test.org', '?physicalDelete=false');

            // スタブを起動
            operator = new StubOperatorServerBookForceDelete(200, 200, 200, 1, 1, 1000001);

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.bookCloseDelete1) });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：Cookie使用, アプリケーション', async () => {
            // 送信データを生成
            const url = urljoin(Url.bookForceDeleteURI, '58di2dfse4.test.org', '?physicalDelete=false');

            // スタブを起動
            operator = new StubOperatorServerBookForceDelete(200, 200, 200, 1, 2, 1000001);

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type2_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：Cookieが存在するが空', async () => {
            // 送信データを生成
            const url = urljoin(Url.bookForceDeleteURI, '58di2dfse4.test.org', '?physicalDelete=false');

            // スタブを起動
            operator = new StubOperatorServerBookForceDelete(200, 200, 200, 1, 3, 1000001);

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_SESSION);
        });
        test('異常：Cookie使用、オペレータサービス応答204', async () => {
            // 送信データを生成
            const url = urljoin(Url.bookForceDeleteURI, '58di2dfse4.test.org', '?physicalDelete=false');

            // スタブを起動
            operator = new StubOperatorServerBookForceDelete(204, 200, 200, 1, 3, 1000001);

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.IS_NOT_AUTHORIZATION_SESSION);
        });
        test('異常：Cookie使用、オペレータサービス応答400系', async () => {
            // 送信データを生成
            const url = urljoin(Url.bookForceDeleteURI, '58di2dfse4.test.org', '?physicalDelete=false');

            // スタブを起動
            operator = new StubOperatorServerBookForceDelete(400, 200, 200, 1, 3, 1000001);

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.IS_NOT_AUTHORIZATION_SESSION);
        });
        test('異常：Cookie使用、オペレータサービス応答500系', async () => {
            // 送信データを生成
            const url = urljoin(Url.bookForceDeleteURI, '58di2dfse4.test.org', '?physicalDelete=false');

            // スタブを起動
            operator = new StubOperatorServerBookForceDelete(503, 200, 200, 1, 3, 1000001);

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：Cookie使用、オペレータサービス未起動', async () => {
            // 送信データを生成
            const url = urljoin(Url.bookForceDeleteURI, '58di2dfse4.test.org', '?physicalDelete=false');

            // スタブを起動

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常：Cookie使用、オペレーター削除巻き戻し応答204', async () => {
            // 送信データを生成
            const url = urljoin(Url.bookForceDeleteURI, '58di2dfse4.test.org', '?physicalDelete=false');

            // スタブを起動
            operator = new StubOperatorServerBookForceDelete(200, 200, 204, 1, 3, 1000001);

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.FAILED_UPDATE_OPERATOR);
        });
        test('異常：Cookie使用、オペレーター削除巻き戻し応答400系', async () => {
            // 送信データを生成
            const url = urljoin(Url.bookForceDeleteURI, '58di2dfse4.test.org', '?physicalDelete=false');

            // スタブを起動
            operator = new StubOperatorServerBookForceDelete(200, 200, 400, 1, 3, 1000001);

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.FAILED_UPDATE_OPERATOR);
        });
        test('異常：Cookie使用、オペレーター削除巻き戻し応答500系', async () => {
            // 送信データを生成
            const url = urljoin(Url.bookForceDeleteURI, '58di2dfse4.test.org', '?physicalDelete=false');

            // スタブを起動
            operator = new StubOperatorServerBookForceDelete(200, 200, 503, 1, 3, 1000001);

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_UPDATE_OPERATOR);
        });
        test('異常：Cookie使用、オペレーター削除巻き戻し時にサービス未起動', async () => {
            // 送信データを生成
            const url = urljoin(Url.bookForceDeleteURI, '58di2dfse4.test.org', '?physicalDelete=false');

            // スタブを起動
            operator = new StubOperatorServerBookForceDelete(200, 200, null, 1, 3, 1000001);

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            // expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常：Cookie使用、カタログサービス応答204', async () => {
            // 送信データを生成
            const url = urljoin(Url.bookForceDeleteURI, '58di2dfse4.test.org', '?physicalDelete=false');

            // スタブを起動
            operator = new StubOperatorServerBookForceDelete(200, 200, 200, 1, 3, 1000001);
            catalog = new StubCatalogServerBookForceDelete(204, false);

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常：Cookie使用、カタログサービス応答400系', async () => {
            // 送信データを生成
            const url = urljoin(Url.bookForceDeleteURI, '58di2dfse4.test.org', '?physicalDelete=false');

            // スタブを起動
            operator = new StubOperatorServerBookForceDelete(200, 200, 200, 1, 3, 1000001);
            catalog = new StubCatalogServerBookForceDelete(400, false);

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常：Cookie使用、カタログサービス応答500系', async () => {
            // 送信データを生成
            const url = urljoin(Url.bookForceDeleteURI, '58di2dfse4.test.org', '?physicalDelete=false');

            // スタブを起動
            operator = new StubOperatorServerBookForceDelete(200, 200, 200, 1, 3, 1000001);
            catalog = new StubCatalogServerBookForceDelete(500, false);

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常：Cookie使用、カタログサービスエラー応答', async () => {
            // 送信データを生成
            const url = urljoin(Url.bookForceDeleteURI, '58di2dfse4.test.org', '?physicalDelete=false');

            // スタブを起動
            operator = new StubOperatorServerBookForceDelete(200, 200, 200, 1, 3, 1000001);
            catalog = new StubCatalogServerBookForceDelete(503, false);

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常：Cookie使用、カタログサービス未起動', async () => {
            // 送信データを生成
            const url = urljoin(Url.bookForceDeleteURI, '58di2dfse4.test.org', '?physicalDelete=false');

            // スタブを起動
            operator = new StubOperatorServerBookForceDelete(200, 200, 200, 1, 3, 1000001);

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_CATALOG);
        });

        test('正常：Cookie使用、idServiceサービス応答404', async () => {
            // 送信データを生成
            const url = urljoin(Url.bookForceDeleteURI, '58di2dfse4.test.org', '?physicalDelete=false');

            // スタブを起動
            operator = new StubOperatorServerBookForceDelete(200, 200, 200, 1, 3, 1000001);
            catalog = new StubCatalogServerBookForceDelete(200, true);
            idService = new StubIdServiceServer(404, false);

            // 対象APIに送信
            const response = await supertest(expressApp).delete(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(200);
        });
    });
});
