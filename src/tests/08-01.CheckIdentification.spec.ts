/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common, { Url } from './Common';
import { sprintf } from 'sprintf-js';
import { Session } from './01-00.Session';
import { TestRequest } from './01-00.TestRequest';
import { OperatorService, CatalogService } from './01-00.StubServer';
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
        if (catalog) {
            catalog.server.close();
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
     * 本人性確認書類重複チェック
     */
    describe('本人性確認書類重複チェック', () => {
        test('正常：本人性確認事項によるBook照合で一致なし', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.SUCCESS81;

            // スタブを起動
            operator = new OperatorService(200);
            catalog = new CatalogService(200);

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body.identification)).toBe('[]');
        });
        test('正常：本人性確認事項によるBook照合で一致データあり', async () => {
            // 事前データ準備
            await common.executeSqlString(`
                INSERT INTO pxr_book_manage.my_condition_book
                (
                    pxr_id, attributes,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    '58di2dfse3.test.org', '${JSON.stringify({ test1: 'data1' })}',
                    false, 'pxr_user', NOW(), 'pxr_user', NOW()
                ),
                (
                    '58di2dfse4.test.org', '${JSON.stringify({ test1: 'data1' })}',
                    false, 'pxr_user', NOW(), 'pxr_user', NOW()
                );
                INSERT INTO pxr_book_manage.identification
                (
                    book_id, identification_code, identification_version, template,
                    template_hash, is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    1,10,1,'{"_code":{"_value":30001,"_ver":1},"item-group":[{"title":"氏名","item":[{"title":"姓","type":{"_value":30019,"_ver":1},"content":"サンプル"},{"title":"名","type":{"_value":30020,"_ver":1},"content":"太郎"}]},{"title":"性別","item":[{"title":"性別","type":{"_value":30021,"_ver":1},"content":"男"}]},{"title":"生年月日","item":[{"title":"生年月日","type":{"_value":30022,"_ver":1},"content":"2000-01-01"}]}]}',
                    '56d9f176e090caa5a1af5472f4d3785d901914f7f05ad4505accc24f160d0753', false, 'pxr_user', NOW(), 'pxr_user', NOW()
                ),
                (
                    2,11,2,'{"_code":{"_value":30001,"_ver":1},"item-group":[{"title":"氏名","item":[{"title":"姓","type":{"_value":30019,"_ver":1},"content":"サンプル"},{"title":"名","type":{"_value":30020,"_ver":1},"content":"太郎"}]},{"title":"性別","item":[{"title":"性別","type":{"_value":30021,"_ver":1},"content":"男"}]},{"title":"生年月日","item":[{"title":"生年月日","type":{"_value":30022,"_ver":1},"content":"2000-01-01"}]}]}',
                    '56d9f176e090caa5a1af5472f4d3785d901914f7f05ad4505accc24f160d0753', false, 'pxr_user', NOW(), 'pxr_user', NOW()
                );
            `);

            // リクエストデータを読み込み
            const json = TestRequest.SUCCESS81;

            // スタブを起動
            operator = new OperatorService(200);
            catalog = new CatalogService(200);

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.identification).toMatchObject([
                {
                    duplicationPxrId: [
                        '58di2dfse3.test.org',
                        '58di2dfse4.test.org'
                    ],
                    identification: {
                        _code: {
                            _value: 30001,
                            _ver: 1
                        },
                        'item-group': [
                            {
                                title: '氏名',
                                item: [
                                    {
                                        title: '姓',
                                        type: {
                                            _value: 30019,
                                            _ver: 1
                                        },
                                        content: 'サンプル'
                                    },
                                    {
                                        title: '名',
                                        type: {
                                            _value: 30020,
                                            _ver: 1
                                        },
                                        content: '太郎'
                                    }
                                ]
                            },
                            {
                                title: '性別',
                                item: [
                                    {
                                        title: '性別',
                                        type: {
                                            _value: 30021,
                                            _ver: 1
                                        },
                                        content: '男'
                                    }
                                ]
                            },
                            {
                                title: '生年月日',
                                item: [
                                    {
                                        title: '生年月日',
                                        type: {
                                            _value: 30022,
                                            _ver: 1
                                        },
                                        content: '2000-01-01'
                                    }
                                ]
                            }
                        ]
                    }
                }
            ]);
        });
        test('正常：identificationはあるが一致しない', async () => {
            // 事前データ準備
            await common.executeSqlString(`
                INSERT INTO pxr_book_manage.my_condition_book
                (
                    pxr_id, attributes,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    '58di2dfse3.test.org', '${JSON.stringify({ test1: 'data1' })}',
                    false, 'pxr_user', NOW(), 'pxr_user', NOW()
                ),
                (
                    '58di2dfse4.test.org', '${JSON.stringify({ test1: 'data1' })}',
                    false, 'pxr_user', NOW(), 'pxr_user', NOW()
                );
                INSERT INTO pxr_book_manage.identification
                (
                    book_id, identification_code, identification_version, template,
                    template_hash, is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    3,10,1,'aa',
                    '56d9f176e090caa5a1af5472f4d3785d901914f7f05ad4505accc24f160d0751', false, 'pxr_user', NOW(), 'pxr_user', NOW()
                ),
                (
                    4,11,2,'bb',
                    '56d9f176e090caa5a1af5472f4d3785d901914f7f05ad4505accc24f160d0752', false, 'pxr_user', NOW(), 'pxr_user', NOW()
                );
            `);

            // リクエストデータを読み込み
            const json = TestRequest.SUCCESS82;

            // スタブを起動
            operator = new OperatorService(200);
            catalog = new CatalogService(200);

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body.identification)).toBe('[]');
        });
        test('正常：本人性確認事項によるBook照合で一致データあり（Contentが、数字、真偽値、空文字、null、未設定）', async () => {
            // 事前データ準備
            await common.executeSqlString(`
                INSERT INTO pxr_book_manage.my_condition_book
                (
                    pxr_id, attributes,
                    is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    '58di2dfse3.test.org', '${JSON.stringify({ test1: 'data1' })}',
                    false, 'pxr_user', NOW(), 'pxr_user', NOW()
                ),
                (
                    '58di2dfse4.test.org', '${JSON.stringify({ test1: 'data1' })}',
                    false, 'pxr_user', NOW(), 'pxr_user', NOW()
                );
                INSERT INTO pxr_book_manage.identification
                (
                    book_id, identification_code, identification_version, template,
                    template_hash, is_disabled, created_by, created_at, updated_by, updated_at
                )
                VALUES
                (
                    5,10,1,'{"_code":{"_value":30001,"_ver":1},"item-group":[{"title":"氏名","item":[{"title":"姓","type":{"_value":30019,"_ver":1},"content":1},{"title":"名","type":{"_value":30020,"_ver":1},"content":true},{"title":"名2","type":{"_value":30020,"_ver":1},"content":""}]},{"title":"性別","item":[{"title":"性別","type":{"_value":30021,"_ver":1},"content":null}]},{"title":"生年月日","item":[{"title":"生年月日","type":{"_value":30022,"_ver":1}}]}]}',
                    '1d5cc678b237f8a4ea337b92c0f119bd3693bbfae4be3dd17d3160ec7928ff83', false, 'pxr_user', NOW(), 'pxr_user', NOW()
                ),
                (
                    6,11,2,'{"_code":{"_value":30001,"_ver":1},"item-group":[{"title":"氏名","item":[{"title":"姓","type":{"_value":30019,"_ver":1},"content":1},{"title":"名","type":{"_value":30020,"_ver":1},"content":true},{"title":"名2","type":{"_value":30020,"_ver":1},"content":""}]},{"title":"性別","item":[{"title":"性別","type":{"_value":30021,"_ver":1},"content":null}]},{"title":"生年月日","item":[{"title":"生年月日","type":{"_value":30022,"_ver":1}}]}]}',
                    '1d5cc678b237f8a4ea337b92c0f119bd3693bbfae4be3dd17d3160ec7928ff83', false, 'pxr_user', NOW(), 'pxr_user', NOW()
                );
            `);

            // リクエストデータを読み込み
            const json = TestRequest.SUCCESS83;

            // スタブを起動
            operator = new OperatorService(200);
            catalog = new CatalogService(200);

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.identification).toMatchObject([
                {
                    duplicationPxrId: [
                        '58di2dfse3.test.org',
                        '58di2dfse4.test.org'
                    ],
                    identification: {
                        _code: {
                            _value: 30001,
                            _ver: 1
                        },
                        'item-group': [
                            {
                                title: '氏名',
                                item: [
                                    {
                                        title: '姓',
                                        type: {
                                            _value: 30019,
                                            _ver: 1
                                        },
                                        content: 1
                                    },
                                    {
                                        title: '名',
                                        type: {
                                            _value: 30020,
                                            _ver: 1
                                        },
                                        content: true
                                    },
                                    {
                                        title: '名2',
                                        type: {
                                            _value: 30020,
                                            _ver: 1
                                        },
                                        content: ''
                                    }
                                ]
                            },
                            {
                                title: '性別',
                                item: [
                                    {
                                        title: '性別',
                                        type: {
                                            _value: 30021,
                                            _ver: 1
                                        },
                                        content: null
                                    }
                                ]
                            },
                            {
                                title: '生年月日',
                                item: [
                                    {
                                        title: '生年月日',
                                        type: {
                                            _value: 30022,
                                            _ver: 1
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                }
            ]);
        });
        test('パラメータ異常：全体が空', async () => {
            // リクエストデータを読み込み
            const json = {};

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.PXR_ROOT) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.REQUEST_IS_EMPTY);
        });

        test('パラメータ不足：identificationがnull', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NULL_IDENT_ALL;

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
        });
        test('パラメータ異常：identification（空文字）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.EMPTY_IDENT_ONLY;

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.EMPTY_PARAM, 'identification'));
        });
        test('パラメータ異常：identification（Array以外）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NOT_ARRAY_IDENT_ONLY;

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.reasons[0].message).toBe(Message.validation.isArray);
        });
        test('パラメータ不足：identification._code', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.MISSING_TEMP_CODE_ONLY;

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.NO_PARAM, '_code'));
        });
        test('パラメータ異常：identification._code（空文字）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.EMPTY_TEMP_CODE_ONLY;

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.EMPTY_PARAM, '_code'));
        });
        test('パラメータ不足：identification._code._value', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.MISSING_TEMP_VALUE_ONLY;

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.NO_PARAM, '_code._value'));
        });
        test('パラメータ異常：identification._code._value（空文字）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.EMPTY_TEMP_VALUE_ONLY;

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.EMPTY_PARAM, '_code._value'));
        });
        test('パラメータ異常：identification._code._value（数字以外）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NOT_NUMBER_TEMP_VALUE_ONLY;

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.NUMBER_INVALID, '_code._value'));
        });
        test('パラメータ異常：identification._code._value（false）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.FALSE_NUMBER_TEMP_VALUE_ONLY;

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.NUMBER_INVALID, '_code._value'));
        });
        test('パラメータ不足：identification._code._ver', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.MISSING_TEMP_VER_ONLY;

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.NO_PARAM, '_code._ver'));
        });
        test('パラメータ不足：identification._code._ver', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NULL_TEMP_VER_ONLY;

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.EMPTY_PARAM, '_code._ver'));
        });
        test('パラメータ異常：identification._code._ver（空文字）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.EMPTY_TEMP_VER_ONLY;

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.EMPTY_PARAM, '_code._ver'));
        });
        test('パラメータ異常：identification._code._ver（数字以外）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NOT_NUMBER_TEMP_VER_ONLY;

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.NUMBER_INVALID, '_code._ver'));
        });
        test('パラメータ不足：identification.item-group', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.MISSING_TEMP_ITEM_GROUP_ONLY;

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.NO_PARAM, 'item-group'));
        });
        test('パラメータ異常：identification.item-group（空）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.EMPTY_TEMP_ITEM_GROUP_ONLY;

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.EMPTY_PARAM, 'item-group'));
        });
        test('パラメータ異常：identification.item-group（null）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NULL_TEMP_ITEM_GROUP_ONLY;

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.EMPTY_PARAM, 'item-group'));
        });
        test('パラメータ異常：identification.item-group（Array以外）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NOT_ARRAY_TEMP_ITEM_GROUP_ONLY;

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.NO_ARRAY_PARAM, 'item-group'));
        });
        test('パラメータ不足：identification.item-group.title', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.MISSING_ITEM_GROUP_TITLE_ONLY;

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.NO_PARAM, 'item-group.title'));
        });
        test('パラメータ異常：identification.item-group.title（空文字）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.EMPTY_ITEM_GROUP_TITLE_ONLY;

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.EMPTY_PARAM, 'item-group.title'));
        });
        test('パラメータ不足：identification.item-group.item', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.MISSING_ITEM_GROUP_ITEM_ONLY;

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.NO_PARAM, 'item-group.item'));
        });
        test('パラメータ異常：identification.item-group.item（空）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.EMPTY_ITEM_GROUP_ITEM_ONLY;

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.EMPTY_PARAM, 'item-group.item'));
        });
        test('パラメータ異常：identification.item-group.item（null）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NULL_ITEM_GROUP_ITEM_ONLY;

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.EMPTY_PARAM, 'item-group.item'));
        });
        test('パラメータ異常：identification.item-group.item（Array以外）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NOT_ARRAY_ITEM_GROUP_ITEM_ONLY;

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.NO_ARRAY_PARAM, 'item-group.item'));
        });
        test('パラメータ不足：identification.item-group.item.title', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.MISSING_ITEM_TITLE_ONLY;

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.NO_PARAM, 'item-group.item.title'));
        });
        test('パラメータ異常：identification.item-group.item.title（空文字）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.EMPTY_ITEM_TITLE_ONLY;

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.EMPTY_PARAM, 'item-group.item.title'));
        });
        test('パラメータ不足：identification.item-group.item.type', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.MISSING_ITEM_TYPE_ONLY;

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.NO_PARAM, 'item-group.item.type'));
        });
        test('パラメータ異常：identification.item-group.item.type（null）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NULL_ITEM_TYPE_ONLY;

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.EMPTY_PARAM, 'item-group.item.type'));
        });
        test('パラメータ異常：identification.item-group.item.type（空文字）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.EMPTY_ITEM_TYPE_ONLY;

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.EMPTY_PARAM, 'item-group.item.type'));
        });
        test('パラメータ不足：identification.item-group.item.type._value', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.MISSING_ITEM_TYPE_VALUE_ONLY;

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.NO_PARAM, 'item-group.item.type._value'));
        });
        test('パラメータ異常：identification.item-group.item.type._value（null）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NULL_ITEM_TYPE_VALUE_ONLY;

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.EMPTY_PARAM, 'item-group.item.type._value'));
        });
        test('パラメータ異常：identification.item-group.item.type._value（空文字）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.EMPTY_ITEM_TYPE_VALUE_ONLY;

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.EMPTY_PARAM, 'item-group.item.type._value'));
        });
        test('パラメータ異常：identification.item-group.item.type._value（数字以外）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NOT_NUMBER_ITEM_TYPE_VALUE_ONLY;

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.NUMBER_INVALID, 'item-group.item.type._value'));
        });
        test('パラメータ不足：identification.item-group.item.type._ver', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.MISSING_ITEM_TYPE_VER_ONLY;

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.NO_PARAM, 'item-group.item.type._ver'));
        });
        test('パラメータ異常：identification.item-group.item.type._ver（null）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NULL_ITEM_TYPE_VER_ONLY;

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.EMPTY_PARAM, 'item-group.item.type._ver'));
        });
        test('パラメータ異常：identification.item-group.item.type._ver（空文字）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.EMPTY_ITEM_TYPE_VER_ONLY;

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.EMPTY_PARAM, 'item-group.item.type._ver'));
        });
        test('パラメータ異常：identification.item-group.item.type._ver（数字以外）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.NOT_NUMBER_ITEM_TYPE_VER_ONLY;

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(sprintf(Message.NUMBER_INVALID, 'item-group.item.type._ver'));
        });

        test('異常：オペレーターサービスへの接続に失敗（セッション確認時）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.SUCCESS81;
            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + '494a44bb97aa0ef964f6a666b9019b2d20bf05aa811919833f3e0c0ae2b09b38'])
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(500);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
        });
        test('異常：セッション（オペレーター種別が運営メンバー以外）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.SUCCESS81;
            // スタブを起動
            operator = new OperatorService(200);

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.NOT_OPE_TYPE3) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：セッション（オペレーター追加の権限がない）', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.SUCCESS81;
            // スタブを起動
            operator = new OperatorService(200);

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.NOT_ADD_AUTH) })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });
        test('異常：Cookieおよびセッション情報がない', async () => {
            // リクエストデータを読み込み
            const json = TestRequest.SUCCESS81;
            // スタブを起動
            operator = new OperatorService(200);

            // 送信データを生成
            const url = Url.checkIdentificationURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .send(json);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NO_SESSION);
        });
    });
});
