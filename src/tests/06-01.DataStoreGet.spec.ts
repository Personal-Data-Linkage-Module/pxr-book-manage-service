/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { sprintf } from 'sprintf-js';
import { Session } from './Session';
import { StubOperatorServer06 } from './StubOperatorServer';
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
        await common.executeSqlFile('initialGetDataStore.sql');
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
     * データ蓄積定義取得
     */
    describe('データ蓄積定義取得', () => {
        test('正常：個人（wf、appの指定無し・session）', async () => {
            // スタブを起動
            operator = new StubOperatorServer06(200, 0, 1000001);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI + '/userid01';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body[0].id).toBe(2);
            expect(response.body[0].actor._value).toBe(1000104);
            expect(response.body[0].actor._ver).toBe(1);
            expect(response.body[0].store._value).toBe(1001107);
            expect(response.body[0].store._ver).toBe(1);
            expect(response.body[0].storeCatalogId).toBe('b87b27c1-5da8-37dd-6ee6-2c7831cf6a09');
            expect(response.body[0].wf).toBe(null);
            expect(response.body[0].app._value).toBe(1000107);
            expect(response.body[0].app._ver).toBe(1);
            expect(response.body[0].document.length).toBe(0);
            expect(response.body[0].event[0]._code._value).toBe(1000009);
            expect(response.body[0].event[0]._code._ver).toBe(1);
            expect(response.body[0].event[0].thing[0]._code._value).toBe(1000014);
            expect(response.body[0].event[0].thing[0]._code._ver).toBe(1);
            expect(response.body[0].event[0].thing[1]._code._value).toBe(1000015);
            expect(response.body[0].event[0].thing[1]._code._ver).toBe(1);
            expect(response.body[0].event[1]._code._value).toBe(1000010);
            expect(response.body[0].event[1]._code._ver).toBe(1);
            expect(response.body[0].event[1].thing[0]._code._value).toBe(1000017);
            expect(response.body[0].event[1].thing[0]._code._ver).toBe(1);
            expect(response.body[0].thing).toBe(null);
            expect(response.body[1].id).toBe(2);
            expect(response.body[1].actor._value).toBe(1000104);
            expect(response.body[1].actor._ver).toBe(1);
            expect(response.body[1].store._value).toBe(1001107);
            expect(response.body[1].store._ver).toBe(1);
            expect(response.body[1].storeCatalogId).toBe('ccc0c076-f73f-7ce1-7c5f-fdc1634aa5c1');
            expect(response.body[1].wf).toBe(null);
            expect(response.body[1].app._value).toBe(1000107);
            expect(response.body[1].app._ver).toBe(1);
            expect(response.body[1].document.length).toBe(0);
            expect(response.body[1].event[0]._code._value).toBe(1000011);
            expect(response.body[1].event[0]._code._ver).toBe(1);
            expect(response.body[1].event[0].thing[0]._code._value).toBe(1000018);
            expect(response.body[1].event[0].thing[0]._code._ver).toBe(1);
            expect(response.body[1].thing).toBe(null);
            expect(response.body[2].id).toBe(2);
            expect(response.body[2].actor._value).toBe(1000104);
            expect(response.body[2].actor._ver).toBe(1);
            expect(response.body[2].store._value).toBe(1001107);
            expect(response.body[2].store._ver).toBe(1);
            expect(response.body[2].storeCatalogId).toBe('69db43f2-6643-19e9-117c-4bdece4bddd7');
            expect(response.body[2].wf).toBe(null);
            expect(response.body[2].app._ver).toBe(1);
            expect(response.body[2].document[0]._code._value).toBe(1001010);
            expect(response.body[2].document[0]._code._ver).toBe(1);
            expect(response.body[2].event.length).toBe(0);
            expect(response.body[2].thing).toBe(null);
        });
        test('異常：個人（wf指定・session）', async () => {
            // スタブを起動
            operator = new StubOperatorServer06(200, 0, 1000001);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI + '/userid01?wf=1000007';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
        test('正常：個人（app指定・session）', async () => {
            // スタブを起動
            operator = new StubOperatorServer06(200, 0, 1000001);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI + '/userid01?app=1000107';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body[0].id).toBe(2);
            expect(response.body[0].actor._value).toBe(1000104);
            expect(response.body[0].actor._ver).toBe(1);
            expect(response.body[0].store._value).toBe(1001107);
            expect(response.body[0].store._ver).toBe(1);
            expect(response.body[0].storeCatalogId).toBe('b87b27c1-5da8-37dd-6ee6-2c7831cf6a09');
            expect(response.body[0].app._value).toBe(1000107);
            expect(response.body[0].app._ver).toBe(1);
            expect(response.body[0].wf).toBe(null);
            expect(response.body[0].document.length).toBe(0);
            expect(response.body[0].event[0]._code._value).toBe(1000009);
            expect(response.body[0].event[0]._code._ver).toBe(1);
            expect(response.body[0].event[0].thing[0]._code._value).toBe(1000014);
            expect(response.body[0].event[0].thing[0]._code._ver).toBe(1);
            expect(response.body[0].event[0].thing[1]._code._value).toBe(1000015);
            expect(response.body[0].event[0].thing[1]._code._ver).toBe(1);
            expect(response.body[0].event[1]._code._value).toBe(1000010);
            expect(response.body[0].event[1]._code._ver).toBe(1);
            expect(response.body[0].event[1].thing[0]._code._value).toBe(1000017);
            expect(response.body[0].event[1].thing[0]._code._ver).toBe(1);
            expect(response.body[0].thing).toBe(null);
            expect(response.body[1].id).toBe(2);
            expect(response.body[1].actor._value).toBe(1000104);
            expect(response.body[1].actor._ver).toBe(1);
            expect(response.body[1].store._value).toBe(1001107);
            expect(response.body[1].store._ver).toBe(1);
            expect(response.body[1].storeCatalogId).toBe('ccc0c076-f73f-7ce1-7c5f-fdc1634aa5c1');
            expect(response.body[0].app._value).toBe(1000107);
            expect(response.body[0].app._ver).toBe(1);
            expect(response.body[0].wf).toBe(null);
            expect(response.body[1].document.length).toBe(0);
            expect(response.body[1].event[0]._code._value).toBe(1000011);
            expect(response.body[1].event[0]._code._ver).toBe(1);
            expect(response.body[1].event[0].thing[0]._code._value).toBe(1000018);
            expect(response.body[1].event[0].thing[0]._code._ver).toBe(1);
            expect(response.body[1].thing).toBe(null);
            expect(response.body[2].id).toBe(2);
            expect(response.body[2].actor._value).toBe(1000104);
            expect(response.body[2].actor._ver).toBe(1);
            expect(response.body[2].store._value).toBe(1001107);
            expect(response.body[2].store._ver).toBe(1);
            expect(response.body[2].storeCatalogId).toBe('69db43f2-6643-19e9-117c-4bdece4bddd7');
            expect(response.body[0].app._value).toBe(1000107);
            expect(response.body[0].app._ver).toBe(1);
            expect(response.body[0].wf).toBe(null);
            expect(response.body[2].document[0]._code._value).toBe(1001010);
            expect(response.body[2].document[0]._code._ver).toBe(1);
            expect(response.body[2].event.length).toBe(0);
            expect(response.body[2].thing).toBe(null);
        });
        test('異常：WF（session）', async () => {
            // スタブを起動
            operator = new StubOperatorServer06(200, 1, 1000004);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI + '/userid01?wf=1000007';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.dataStoreGetWf) });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
        test('正常：app（session）', async () => {
            // スタブを起動
            operator = new StubOperatorServer06(200, 2, 1000104);
            catalog = new StubCatalogServerDataStore(200, 1);

            // 送信データを生成
            const url = Url.dataStoreURI + '/userid05?app=1000107';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.dataStoreGetApp) });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(6);
            expect(response.body.actor._value).toBe(1000104);
            expect(response.body.actor._ver).toBe(1);
            expect(response.body.store).toBe(null);
            expect(response.body.storeCatalogId).toBe(null);
            expect(response.body.wf).toBe(null);
            expect(response.body.app._value).toBe(1000107);
            expect(response.body.app._ver).toBe(1);
            expect(response.body.document[0]._value).toBe(1001010);
            expect(response.body.document[0]._ver).toBe(1);
            expect(response.body.document[1]._value).toBe(1001011);
            expect(response.body.document[1]._ver).toBe(1);
            expect(response.body.document[2]._value).toBe(1001012);
            expect(response.body.document[2]._ver).toBe(1);
            expect(response.body.event[0]._value).toBe(1000009);
            expect(response.body.event[0]._ver).toBe(1);
            expect(response.body.event[1]._value).toBe(1000010);
            expect(response.body.event[1]._ver).toBe(1);
            expect(response.body.event[2]._value).toBe(1000011);
            expect(response.body.event[2]._ver).toBe(1);
            expect(response.body.event[3]._value).toBe(1000012);
            expect(response.body.event[3]._ver).toBe(1);
            expect(response.body.thing[0]._value).toBe(1000014);
            expect(response.body.thing[0]._ver).toBe(1);
            expect(response.body.thing[1]._value).toBe(1000819);
            expect(response.body.thing[1]._ver).toBe(1);
            expect(response.body.thing[2]._value).toBe(1000820);
            expect(response.body.thing[2]._ver).toBe(1);
            expect(response.body.thing[3]._value).toBe(1000821);
            expect(response.body.thing[3]._ver).toBe(1);
            expect(response.body.thing[4]._value).toBe(1000822);
            expect(response.body.thing[4]._ver).toBe(1);
        });
        test('正常：APP（session）', async () => {
            // スタブを起動
            operator = new StubOperatorServer06(200, 2, 1000104);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI + '/userid01?app=1000107';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.dataStoreGetApp) });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(2);
            expect(response.body.actor._value).toBe(1000104);
            expect(response.body.actor._ver).toBe(1);
            expect(response.body.store).toBe(null);
            expect(response.body.storeCatalogId).toBe(null);
            expect(response.body.app._value).toBe(1000107);
            expect(response.body.app._ver).toBe(1);
            expect(response.body.wf).toBe(null);
            expect(response.body.document[0]._value).toBe(1001010);
            expect(response.body.document[0]._ver).toBe(1);
            expect(response.body.event[0]._value).toBe(1000009);
            expect(response.body.event[0]._ver).toBe(1);
            expect(response.body.event[1]._value).toBe(1000010);
            expect(response.body.event[1]._ver).toBe(1);
            expect(response.body.event[2]._value).toBe(1000011);
            expect(response.body.event[2]._ver).toBe(1);
            expect(response.body.event[3]._value).toBe(9999999);
            expect(response.body.event[3]._ver).toBe(1);
            expect(response.body.thing[0]._value).toBe(1000014);
            expect(response.body.thing[0]._ver).toBe(1);
            expect(response.body.thing[1]._value).toBe(1000015);
            expect(response.body.thing[1]._ver).toBe(1);
            expect(response.body.thing[2]._value).toBe(1000016);
            expect(response.body.thing[2]._ver).toBe(1);
            expect(response.body.thing[3]._value).toBe(1000017);
            expect(response.body.thing[3]._ver).toBe(1);
            expect(response.body.thing[4]._value).toBe(1000018);
            expect(response.body.thing[4]._ver).toBe(1);
            expect(response.body.thing[5]._value).toBe(9999999);
            expect(response.body.thing[5]._ver).toBe(1);
            expect(response.body.thing[6]._value).toBe(9999999);
            expect(response.body.thing[6]._ver).toBe(1);
        });
        test('正常：個人（cookie）', async () => {
            // スタブを起動
            operator = new StubOperatorServer06(200, 0, 1000001);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI + '/userid01';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body[0].id).toBe(2);
            expect(response.body[0].actor._value).toBe(1000104);
            expect(response.body[0].actor._ver).toBe(1);
            expect(response.body[0].store._value).toBe(1001107);
            expect(response.body[0].store._ver).toBe(1);
            expect(response.body[0].storeCatalogId).toBe('b87b27c1-5da8-37dd-6ee6-2c7831cf6a09');
            expect(response.body[0].wf).toBe(null);
            expect(response.body[0].app._value).toBe(1000107);
            expect(response.body[0].app._ver).toBe(1);
            expect(response.body[0].document.length).toBe(0);
            expect(response.body[0].event[0]._code._value).toBe(1000009);
            expect(response.body[0].event[0]._code._ver).toBe(1);
            expect(response.body[0].event[0].thing[0]._code._value).toBe(1000014);
            expect(response.body[0].event[0].thing[0]._code._ver).toBe(1);
            expect(response.body[0].event[0].thing[1]._code._value).toBe(1000015);
            expect(response.body[0].event[0].thing[1]._code._ver).toBe(1);
            expect(response.body[0].event[1]._code._value).toBe(1000010);
            expect(response.body[0].event[1]._code._ver).toBe(1);
            expect(response.body[0].event[1].thing[0]._code._value).toBe(1000017);
            expect(response.body[0].event[1].thing[0]._code._ver).toBe(1);
            expect(response.body[0].thing).toBe(null);
            expect(response.body[1].id).toBe(2);
            expect(response.body[1].actor._value).toBe(1000104);
            expect(response.body[1].actor._ver).toBe(1);
            expect(response.body[1].store._value).toBe(1001107);
            expect(response.body[1].store._ver).toBe(1);
            expect(response.body[1].storeCatalogId).toBe('ccc0c076-f73f-7ce1-7c5f-fdc1634aa5c1');
            expect(response.body[1].wf).toBe(null);
            expect(response.body[1].app._value).toBe(1000107);
            expect(response.body[1].app._ver).toBe(1);
            expect(response.body[1].document.length).toBe(0);
            expect(response.body[1].event[0]._code._value).toBe(1000011);
            expect(response.body[1].event[0]._code._ver).toBe(1);
            expect(response.body[1].event[0].thing[0]._code._value).toBe(1000018);
            expect(response.body[1].event[0].thing[0]._code._ver).toBe(1);
            expect(response.body[1].thing).toBe(null);
            expect(response.body[2].id).toBe(2);
            expect(response.body[2].actor._value).toBe(1000104);
            expect(response.body[2].actor._ver).toBe(1);
            expect(response.body[2].store._value).toBe(1001107);
            expect(response.body[2].store._ver).toBe(1);
            expect(response.body[2].storeCatalogId).toBe('69db43f2-6643-19e9-117c-4bdece4bddd7');
            expect(response.body[2].wf).toBe(null);
            expect(response.body[2].app._ver).toBe(1);
            expect(response.body[2].document[0]._code._value).toBe(1001010);
            expect(response.body[2].document[0]._code._ver).toBe(1);
            expect(response.body[2].event.length).toBe(0);
            expect(response.body[2].thing).toBe(null);
        });
        test('異常：WF（cookie）', async () => {
            // スタブを起動
            operator = new StubOperatorServer06(200, 1, 1000004);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI + '/userid01?wf=1000007';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set('Cookie', ['operator_type1_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
        test('正常：APP（session）', async () => {
            // スタブを起動
            operator = new StubOperatorServer06(200, 2, 1000104);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI + '/userid01?app=1000107';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set('Cookie', ['operator_type2_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(2);
            expect(response.body.actor._value).toBe(1000104);
            expect(response.body.actor._ver).toBe(1);
            expect(response.body.store).toBe(null);
            expect(response.body.storeCatalogId).toBe(null);
            expect(response.body.app._value).toBe(1000107);
            expect(response.body.app._ver).toBe(1);
            expect(response.body.wf).toBe(null);
            expect(response.body.document[0]._value).toBe(1001010);
            expect(response.body.document[0]._ver).toBe(1);
            expect(response.body.event[0]._value).toBe(1000009);
            expect(response.body.event[0]._ver).toBe(1);
            expect(response.body.event[1]._value).toBe(1000010);
            expect(response.body.event[1]._ver).toBe(1);
            expect(response.body.event[2]._value).toBe(1000011);
            expect(response.body.event[2]._ver).toBe(1);
            expect(response.body.event[3]._value).toBe(9999999);
            expect(response.body.event[3]._ver).toBe(1);
            expect(response.body.thing[0]._value).toBe(1000014);
            expect(response.body.thing[0]._ver).toBe(1);
            expect(response.body.thing[1]._value).toBe(1000015);
            expect(response.body.thing[1]._ver).toBe(1);
            expect(response.body.thing[2]._value).toBe(1000016);
            expect(response.body.thing[2]._ver).toBe(1);
            expect(response.body.thing[3]._value).toBe(1000017);
            expect(response.body.thing[3]._ver).toBe(1);
            expect(response.body.thing[4]._value).toBe(1000018);
            expect(response.body.thing[4]._ver).toBe(1);
            expect(response.body.thing[5]._value).toBe(9999999);
            expect(response.body.thing[5]._ver).toBe(1);
            expect(response.body.thing[6]._value).toBe(9999999);
            expect(response.body.thing[6]._ver).toBe(1);
        });
        test('正常：領域運営（actorCode指定actor・session）', async () => {
            // スタブを起動
            operator = new StubOperatorServer06(200, 0, 1000001);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI + '/userid01?app=1000107' + '&actorCode=1000104';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRegion) });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(2);
            expect(response.body.actor._value).toBe(1000104);
            expect(response.body.actor._ver).toBe(1);
            expect(response.body.store).toBe(null);
            expect(response.body.storeCatalogId).toBe(null);
            expect(response.body.wf).toBe(null);
            expect(response.body.app._value).toBe(1000107);
            expect(response.body.app._ver).toBe(1);
            expect(response.body.document[0]._value).toBe(1001010);
            expect(response.body.document[0]._ver).toBe(1);
            expect(response.body.event[0]._value).toBe(1000009);
            expect(response.body.event[0]._ver).toBe(1);
            expect(response.body.event[1]._value).toBe(1000010);
            expect(response.body.event[1]._ver).toBe(1);
            expect(response.body.event[2]._value).toBe(1000011);
            expect(response.body.event[2]._ver).toBe(1);
            expect(response.body.event[3]._value).toBe(9999999);
            expect(response.body.event[3]._ver).toBe(1);
            expect(response.body.thing[0]._value).toBe(1000014);
            expect(response.body.thing[0]._ver).toBe(1);
            expect(response.body.thing[1]._value).toBe(1000015);
            expect(response.body.thing[1]._ver).toBe(1);
            expect(response.body.thing[2]._value).toBe(1000016);
            expect(response.body.thing[2]._ver).toBe(1);
            expect(response.body.thing[3]._value).toBe(1000017);
            expect(response.body.thing[3]._ver).toBe(1);
            expect(response.body.thing[4]._value).toBe(1000018);
            expect(response.body.thing[4]._ver).toBe(1);
            expect(response.body.thing[5]._value).toBe(9999999);
            expect(response.body.thing[5]._ver).toBe(1);
            expect(response.body.thing[6]._value).toBe(9999999);
            expect(response.body.thing[6]._ver).toBe(1);
        });
        test('異常：WF（数値以外）', async () => {
            // スタブを起動
            operator = new StubOperatorServer06(200, 1, 1000004);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI + '/userid01?wf=a';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set('Cookie', ['operator_type1_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
        test('異常：APP（数値以外）', async () => {
            // スタブを起動
            operator = new StubOperatorServer06(200, 1, 1000004);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI + '/userid01?app=a';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set('Cookie', ['operator_type1_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.NUMBER_INVALID, 'app'));
        });
        test('異常：セッション情報、Cookieの両方が無い', async () => {
            // スタブを起動
            operator = new StubOperatorServer06(200, 0, 1000001);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI + '/userid01';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_SESSION);
        });
        test('異常：セッション確認のレスポンスが400', async () => {
            // スタブを起動
            operator = new StubOperatorServer06(400, 0, 1000001);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI + '/userid01';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.IS_NOT_AUTHORIZATION_SESSION);
        });
        test('異常：セッション確認のレスポンスが500', async () => {
            // スタブを起動
            operator = new StubOperatorServer06(500, 0, 1000001);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI + '/userid01';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
        });
        test('異常：オペレーターサービスへの接続に失敗', async () => {
            // スタブを起動
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI + '/userid01';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set('Cookie', ['operator_type0_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('パラメータ異常：WFなのにクエリにappが指定されている', async () => {
            // スタブを起動
            operator = new StubOperatorServer06(200, 1, 1000004);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI + '/userid01?app=1000107';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.dataStoreGetWf) });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_OPERATOR);
        });
        test('パラメータ異常：WFなのにクエリにwfが指定されていない', async () => {
            // スタブを起動
            operator = new StubOperatorServer06(200, 1, 1000004);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI + '/userid01';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.dataStoreGetWf) });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_OPERATOR);
        });
        test('パラメータ異常：APPなのにクエリにwfが指定されている', async () => {
            // スタブを起動
            operator = new StubOperatorServer06(200, 2, 1000104);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI + '/userid01?wf=1000007';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.dataStoreGetApp) });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
        test('パラメータ異常：APPなのにクエリにappが指定されていない', async () => {
            // スタブを起動
            operator = new StubOperatorServer06(200, 2, 1000104);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI + '/userid01';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.dataStoreGetApp) });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.EMPTY_APP_CATALOG_CODE);
        });
        test('異常：個人（PXR-IDがセッション情報から取得できない）', async () => {
            // スタブを起動
            operator = new StubOperatorServer06(200, 0, 1000001);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI + '/userid01';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePostErrNotPxrId) });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.EMPTY_PXR_ID);
        });
        test('異常：個人（PXR-IDからブックが取得できない）', async () => {
            // スタブを起動
            operator = new StubOperatorServer06(200, 0, 1000001);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI + '/userid01';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePostErrBookNotExists) });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_EXIST_BOOK);
        });
        test('正常：個人（データ蓄積定義が1件も取得できない・クエリ未指定）', async () => {
            // スタブを起動
            operator = new StubOperatorServer06(200, 0, 1000001);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI + '/userid01';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.dataStoreNotExistSetting) });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(0);
        });
        test('正常：個人（データ蓄積定義が1件も取得できない・クエリ指定）', async () => {
            // スタブを起動
            operator = new StubOperatorServer06(200, 0, 1000001);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI + '/userid01?app=1000107';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.dataStoreNotExistSetting) });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(0);
        });
        test('異常：データ操作定義カタログが取得できない', async () => {
            // スタブを起動
            operator = new StubOperatorServer06(200, 0, 1000001);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI + '/userid01';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.operatorCatalogNotExistDataType) });

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常：アクターカタログがWF', async () => {
            // スタブを起動
            operator = new StubOperatorServer06(200, 0, 1000001);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI + '/userid01?actorCode=1000004';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRegion) });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
        test('異常：アクターカタログコード/バージョンが取得できない', async () => {
            // スタブを起動
            operator = new StubOperatorServer06(200, 1, 1000004);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI + '/userid01?app=1000107';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.dataStoreGetWfNotActor) });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：アクターがWFまたはAPP以外', async () => {
            // スタブを起動
            operator = new StubOperatorServer06(200, 1, 1000004);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI + '/userid01?app=1000107';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.dataStoreGetErrActor) });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.ACTOR_CATALOG_INVALID);
        });
        test('異常：利用者IDからブックIDが取得できない（未登録の利用者ID）', async () => {
            // スタブを起動
            operator = new StubOperatorServer06(200, 1, 1000004);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI + '/userid02?app=1000107';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.dataStoreGetApp) });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_FOUND_BOOK_ID);
        });
        test('異常：利用者IDからブックIDが取得できない（条件に合うレコードが無い）', async () => {
            // スタブを起動
            operator = new StubOperatorServer06(200, 1, 1000004);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI + '/userid01?app=1000017';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.dataStoreGetNotFoundBookId) });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.NOT_FOUND_BOOK_ID);
        });
        test('異常：アクターカタログからnsが取得できない', async () => {
            // スタブを起動
            operator = new StubOperatorServer06(200, 1, 1000004);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI + '/userid01?app=1000107';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.dataStoreGetNotNs) });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.ACTOR_CATALOG_INVALID);
        });
        test('異常：アクターカタログからapplicationが取得できない', async () => {
            // スタブを起動
            operator = new StubOperatorServer06(200, 1, 1000004);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI + '/userid01?app=1000107';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.dataStoreGetNotApplication) });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.ACTOR_CATALOG_INVALID);
        });
        test('異常：applicationに指定したカタログコードが無い', async () => {
            // スタブを起動
            operator = new StubOperatorServer06(200, 2, 1000104);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI + '/userid01?app=1999107';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set('Cookie', ['operator_type2_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296']);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.APP_CATALOG_CODE_NOT_EXIST);
        });
        test('異常：カタログ取得のレスポンスが400', async () => {
            // スタブを起動
            operator = new StubOperatorServer06(200, 1, 1000004);
            catalog = new StubCatalogServerDataStore(400);

            // 送信データを生成
            const url = Url.dataStoreURI + '/userid01?app=1000107';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.dataStoreGetApp) });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常：カタログ取得のレスポンスが500', async () => {
            // スタブを起動
            operator = new StubOperatorServer06(200, 1, 1000004);
            catalog = new StubCatalogServerDataStore(500);

            // 送信データを生成
            const url = Url.dataStoreURI + '/userid01?app=1000107';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.dataStoreGetApp) });

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常：カタログ取得のレスポンスが401', async () => {
            // スタブを起動
            operator = new StubOperatorServer06(200, 1, 1000004);
            catalog = new StubCatalogServerDataStore(401);

            // 送信データを生成
            const url = Url.dataStoreURI + '/userid01?app=1000107';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.dataStoreGetApp) });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });
        test('異常：カタログサービスへの接続に失敗', async () => {
            // スタブを起動
            operator = new StubOperatorServer06(200, 1, 1000004);

            // 送信データを生成
            const url = Url.dataStoreURI + '/userid01?app=1000107';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.dataStoreGetApp) });

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_CATALOG);
        });
        test('異常：データ蓄積定義が1件も取得できない', async () => {
            // スタブを起動
            operator = new StubOperatorServer06(200, 0, 1000004);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI + '/userid03?app=1000107';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.dataStoreGetApp) });

            // レスポンスチェック
            expect(response.status).toBe(404);
            expect(response.body.message).toBe(Message.NOT_FOUND_DATA_STORE_SETTING);
        });
        test('異常：データ種が1件も取得できない', async () => {
            // スタブを起動
            operator = new StubOperatorServer06(200, 0, 1000104);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI + '/userid04?app=1000107';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.dataStoreNotExistDataType2) });

            // レスポンスチェック
            expect(response.status).toBe(404);
            expect(response.body.message).toBe(Message.NOT_FOUND_DATA_TYPE);
        });
        test('パラメータ不足：id', async () => {
            // スタブを起動
            operator = new StubOperatorServer06(200, 0, 1000001);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI + '/';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) });

            // レスポンスチェック
            expect(response.status).toBe(404);
        });
        test('パラメータ異常：wfとappの両方が指定されている', async () => {
            // スタブを起動
            operator = new StubOperatorServer06(200, 0, 1000001);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI + '/testuser?wf=1000007&app=1000008';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
        test('異常：個人（データ不正）', async () => {
            // データ準備
            await common.executeSqlString(`
                INSERT INTO pxr_book_manage.data_operation
                (
                    id, book_id, type,
                    actor_catalog_code, actor_catalog_version,
                    app_catalog_code, app_catalog_version,
                    wf_catalog_code, wf_catalog_version,
                    operation_catalog_code, operation_catalog_version,
                    attributes, is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    7, 1, 'store',
                    1000104, 1,
                    null, null,
                    null, null,
                    1001108, 1,
                    null, false, 'test_user', NOW(), 'test_user', NOW()
                );
                INSERT INTO pxr_book_manage.data_operation_data_type
                (
                    data_operation_id, catalog_uuid,
                    document_catalog_code, document_catalog_version,
                    event_catalog_code, event_catalog_version,
                    thing_catalog_code, thing_catalog_version,
                    consent_flg, attributes, is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    7, 'a87b27c1-5da8-37dd-6ee6-2c7831cf6a10',
                    null, null,
                    1000009, 1,
                    1000014, 1,
                    true, null, false, 'test_user', NOW(), 'test_user', NOW()
                );
            `);
            // スタブを起動
            operator = new StubOperatorServer06(200, 0, 1000001);
            catalog = new StubCatalogServerDataStore(200);

            // 送信データを生成
            const url = Url.dataStoreURI + '/userid01';

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json' })
                .set({ session: JSON.stringify(Session.dataStorePost) });

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
        });
    });
});
