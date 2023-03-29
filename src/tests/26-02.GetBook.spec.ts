/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Application } from '../resources/config/Application';
import supertest = require('supertest');
import Common, { Url } from './Common';
import { Session } from './Session';
import urljoin = require('url-join');
import Config from '../common/Config';
import { StubCatalogServerGetIndBook } from './StubCatalogServer';
import { StubOperatorServerType0 } from './StubOperatorServer';
const Message = Config.ReadConfig('./config/message.json');
/* eslint-enable */

// 対象アプリケーションを取得
const app = new Application();
const expressApp = app.express.app;
const common = new Common();
app.start();

// スタブサーバー（カタログサービス）
let _catalogServer: StubCatalogServerGetIndBook = null;
let _operatorServer: StubOperatorServerType0 = null;

/**
 * book-manage API のユニットテスト
 */
describe('book-manage API', () => {
    /**
     * 全テスト実行の前処理
     */
    beforeAll(async () => {
        // DB接続
        await common.connect();
    });

    /**
     * 各テスト実行の前処理
     */
    beforeEach(async () => {
        // DB接続
        await common.connect();
        // DB初期化
        await common.executeSqlFile('initialData.sql');
    });

    /**
     * 各テスト実行の後処理
     */
    afterEach(async () => {
        // スタブサーバー停止
        if (_catalogServer) {
            _catalogServer._server.close();
            _catalogServer = null;
        }
        if (_operatorServer) {
            _operatorServer._server.close();
            _operatorServer = null;
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
     * Book取得（個人）API
     */
    describe('Book取得（個人）', () => {
        test('正常：ステータス通常(status:0)', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerGetIndBook(3001, 1001008, 200);

            // 初期データの設定
            await common.executeSqlFile('initialDataIndBook.sql');

            // 送信データを作成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.getIndBook) });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(
                {
                    status: 0,
                    identification: [
                        {
                            test1: 'data1'
                        }
                    ],
                    cooperation: [
                        {
                            actor: {
                                _value: 1000004,
                                _ver: 1
                            },
                            app: {
                                _value: 1000107,
                                _ver: 1
                            },
                            userId: 'userid01',
                            status: 0
                        },
                        {
                            actor: {
                                _value: 1000004,
                                _ver: 1
                            },
                            region: {
                                _value: 1000006,
                                _ver: 1
                            },
                            userId: 'userid01',
                            status: 0
                        }
                    ],
                    termsOfUse: {
                        platform: {
                            _value: 1001007,
                            _ver: 2
                        },
                        region: [
                            {
                                actor: {
                                    _value: 1000432,
                                    _ver: 1
                                },
                                region: {
                                    _value: 1000451,
                                    _ver: 1
                                },
                                _code: {
                                    _value: 1001008,
                                    _ver: 2
                                }
                            }
                        ]
                    },
                    appendix: {
                        region: [{
                            _value: 1000003,
                            _ver: 1
                        }]
                    }
                }
            ));
        });

        test('正常：ステータス再同意待ち(status:1)', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerGetIndBook(3001, 1001008, 200);

            // 初期データの設定
            await common.executeSqlFile('initialDataIndBook.sql');
            await common.executeSqlString(`
                UPDATE pxr_book_manage.my_condition_book
                SET status = 1
                WHERE pxr_id = '58di2dfse2.test.org'
            `);

            // 送信データを作成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.getIndBook) });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.status).toBe(1);
        });

        test('正常：ステータス差し押さえ(status:2)', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerGetIndBook(3001, 1001008, 200);

            // 初期データの設定
            await common.executeSqlFile('initialDataIndBook.sql');
            await common.executeSqlString(`
                UPDATE pxr_book_manage.my_condition_book
                SET status = 2
                WHERE pxr_id = '58di2dfse2.test.org'
            `);

            // 送信データを作成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.getIndBook) });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.status).toBe(2);
        });

        test('正常：ステータス終了(status:3)', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerGetIndBook(3001, 1001008, 200);

            // 初期データの設定
            await common.executeSqlFile('initialDataIndBook.sql');
            await common.executeSqlString(`
                UPDATE pxr_book_manage.my_condition_book
                SET status = 3
                WHERE pxr_id = '58di2dfse2.test.org'
            `);

            // 送信データを作成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.getIndBook) });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(response.body.status).toBe(3);
        });

        test('正常：本人性確認書類レコードが空', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerGetIndBook(3001, 1001008, 200);

            // 初期データの設定
            await common.executeSqlFile('initialDataIndBook.sql');
            await common.executeSqlString(`
                DELETE FROM pxr_book_manage.identification
                WHERE book_id = 1
            `);

            // 送信データを作成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.getIndBook) });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(
                {
                    status: 0,
                    identification: [],
                    cooperation: [
                        {
                            actor: {
                                _value: 1000004,
                                _ver: 1
                            },
                            app: {
                                _value: 1000107,
                                _ver: 1
                            },
                            userId: 'userid01',
                            status: 0
                        },
                        {
                            actor: {
                                _value: 1000004,
                                _ver: 1
                            },
                            region: {
                                _value: 1000006,
                                _ver: 1
                            },
                            userId: 'userid01',
                            status: 0
                        }
                    ],
                    termsOfUse: {
                        platform: {
                            _value: 1001007,
                            _ver: 2
                        },
                        region: [
                            {
                                actor: {
                                    _value: 1000432,
                                    _ver: 1
                                },
                                region: {
                                    _value: 1000451,
                                    _ver: 1
                                },
                                _code: {
                                    _value: 1001008,
                                    _ver: 2
                                }
                            }
                        ]
                    },
                    appendix: {
                        region: [{
                            _value: 1000003,
                            _ver: 1
                        }]
                    }
                }
            ));
        });

        test('正常：利用者ID連携レコードが空', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerGetIndBook(3001, 1001008, 200);

            // 初期データの設定
            await common.executeSqlFile('initialDataIndBook.sql');
            await common.executeSqlString(`
                DELETE FROM pxr_book_manage.user_id_cooperate
                WHERE book_id = 1
            `);

            // 送信データを作成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.getIndBook) });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(
                {
                    status: 0,
                    identification: [
                        {
                            test1: 'data1'
                        }
                    ],
                    cooperation: [],
                    termsOfUse: {
                        platform: {
                            _value: 1001007,
                            _ver: 2
                        },
                        region: [
                            {
                                actor: {
                                    _value: 1000432,
                                    _ver: 1
                                },
                                region: {
                                    _value: 1000451,
                                    _ver: 1
                                },
                                _code: {
                                    _value: 1001008,
                                    _ver: 2
                                }
                            }
                        ]
                    },
                    appendix: {
                        region: [{
                            _value: 1000003,
                            _ver: 1
                        }]
                    }
                }
            ));
        });

        test('正常：利用者ID連携レコードがregionのみ存在する', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerGetIndBook(3001, 1001008, 200);

            // 初期データの設定
            await common.executeSqlFile('initialDataIndBook.sql');
            await common.executeSqlString(`
                DELETE FROM pxr_book_manage.user_id_cooperate
                WHERE wf_catalog_code IS NOT NULL
                OR app_catalog_code IS NOT NULL
            `);

            // 送信データを作成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.getIndBook) });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(
                {
                    status: 0,
                    identification: [
                        {
                            test1: 'data1'
                        }
                    ],
                    cooperation: [
                        {
                            actor: {
                                _value: 1000004,
                                _ver: 1
                            },
                            region: {
                                _value: 1000006,
                                _ver: 1
                            },
                            userId: 'userid01',
                            status: 0
                        }
                    ],
                    termsOfUse: {
                        platform: {
                            _value: 1001007,
                            _ver: 2
                        },
                        region: [
                            {
                                actor: {
                                    _value: 1000432,
                                    _ver: 1
                                },
                                region: {
                                    _value: 1000451,
                                    _ver: 1
                                },
                                _code: {
                                    _value: 1001008,
                                    _ver: 2
                                }
                            }
                        ]
                    },
                    appendix: {
                        region: [{
                            _value: 1000003,
                            _ver: 1
                        }]
                    }
                }
            ));
        });

        test('正常：利用者ID連携レコードがappのみ存在する', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerGetIndBook(3001, 1001008, 200);

            // 初期データの設定
            await common.executeSqlFile('initialDataIndBook.sql');
            await common.executeSqlString(`
                DELETE FROM pxr_book_manage.user_id_cooperate
                WHERE wf_catalog_code IS NOT NULL
                OR region_catalog_code IS NOT NULL
            `);

            // 送信データを作成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.getIndBook) });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(
                {
                    status: 0,
                    identification: [
                        {
                            test1: 'data1'
                        }
                    ],
                    cooperation: [
                        {
                            actor: {
                                _value: 1000004,
                                _ver: 1
                            },
                            app: {
                                _value: 1000107,
                                _ver: 1
                            },
                            userId: 'userid01',
                            status: 0
                        }
                    ],
                    termsOfUse: {
                        platform: {
                            _value: 1001007,
                            _ver: 2
                        },
                        region: [
                            {
                                actor: {
                                    _value: 1000432,
                                    _ver: 1
                                },
                                region: {
                                    _value: 1000451,
                                    _ver: 1
                                },
                                _code: {
                                    _value: 1001008,
                                    _ver: 2
                                }
                            }
                        ]
                    },
                    appendix: {
                        region: [{
                            _value: 1000003,
                            _ver: 1
                        }]
                    }
                }
            ));
        });

        test('正常：利用者ID連携レコードがwfのみ存在する', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerGetIndBook(3001, 1001008, 200);

            // 初期データの設定
            await common.executeSqlFile('initialDataIndBook.sql');
            await common.executeSqlString(`
                DELETE FROM pxr_book_manage.user_id_cooperate
                WHERE app_catalog_code IS NOT NULL
                OR region_catalog_code IS NOT NULL
            `);

            // 送信データを作成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.getIndBook) });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(
                {
                    status: 0,
                    identification: [
                        {
                            test1: 'data1'
                        }
                    ],
                    cooperation: [],
                    termsOfUse: {
                        platform: {
                            _value: 1001007,
                            _ver: 2
                        },
                        region: [
                            {
                                actor: {
                                    _value: 1000432,
                                    _ver: 1
                                },
                                region: {
                                    _value: 1000451,
                                    _ver: 1
                                },
                                _code: {
                                    _value: 1001008,
                                    _ver: 2
                                }
                            }
                        ]
                    },
                    appendix: {
                        region: [{
                            _value: 1000003,
                            _ver: 1
                        }]
                    }
                }
            ));
        });

        test('正常：利用規約同意レコードが空', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerGetIndBook(3001, 1001008, 200);

            // 初期データの設定
            await common.executeSqlFile('initialDataIndBook.sql');
            await common.executeSqlString(`
                DELETE FROM pxr_book_manage.tou_consent
                WHERE book_id = 1
            `);

            // 送信データを作成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.getIndBook) });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(
                {
                    status: 0,
                    identification: [
                        {
                            test1: 'data1'
                        }
                    ],
                    cooperation: [
                        {
                            actor: {
                                _value: 1000004,
                                _ver: 1
                            },
                            app: {
                                _value: 1000107,
                                _ver: 1
                            },
                            userId: 'userid01',
                            status: 0
                        },
                        {
                            actor: {
                                _value: 1000004,
                                _ver: 1
                            },
                            region: {
                                _value: 1000006,
                                _ver: 1
                            },
                            userId: 'userid01',
                            status: 0
                        }
                    ],
                    termsOfUse: {
                        platform: {},
                        region: []
                    },
                    appendix: {
                        region: [{
                            _value: 1000003,
                            _ver: 1
                        }]
                    }
                }
            ));
        });

        test('正常：利用規約同意レコードがプラットフォーム規約のみ存在する', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerGetIndBook(3001, 1001008, 200);

            // 初期データの設定
            await common.executeSqlFile('initialDataIndBook.sql');
            await common.executeSqlString(`
                DELETE FROM pxr_book_manage.tou_consent
                WHERE terms_type = 2
            `);

            // 送信データを作成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.getIndBook) });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(
                {
                    status: 0,
                    identification: [
                        {
                            test1: 'data1'
                        }
                    ],
                    cooperation: [
                        {
                            actor: {
                                _value: 1000004,
                                _ver: 1
                            },
                            app: {
                                _value: 1000107,
                                _ver: 1
                            },
                            userId: 'userid01',
                            status: 0
                        },
                        {
                            actor: {
                                _value: 1000004,
                                _ver: 1
                            },
                            region: {
                                _value: 1000006,
                                _ver: 1
                            },
                            userId: 'userid01',
                            status: 0
                        }
                    ],
                    termsOfUse: {
                        platform: {
                            _value: 1001007,
                            _ver: 2
                        },
                        region: []
                    },
                    appendix: {
                        region: [{
                            _value: 1000003,
                            _ver: 1
                        }]
                    }
                }
            ));
        });

        test('正常：利用規約同意レコードがリージョン規約のみ存在する', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerGetIndBook(3001, 1001008, 200);

            // 初期データの設定
            await common.executeSqlFile('initialDataIndBook.sql');
            await common.executeSqlString(`
                DELETE FROM pxr_book_manage.tou_consent
                WHERE terms_type = 1
            `);

            // 送信データを作成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.getIndBook) });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(
                {
                    status: 0,
                    identification: [
                        {
                            test1: 'data1'
                        }
                    ],
                    cooperation: [
                        {
                            actor: {
                                _value: 1000004,
                                _ver: 1
                            },
                            app: {
                                _value: 1000107,
                                _ver: 1
                            },
                            userId: 'userid01',
                            status: 0
                        },
                        {
                            actor: {
                                _value: 1000004,
                                _ver: 1
                            },
                            region: {
                                _value: 1000006,
                                _ver: 1
                            },
                            userId: 'userid01',
                            status: 0
                        }
                    ],
                    termsOfUse: {
                        platform: {},
                        region: [
                            {
                                actor: {
                                    _value: 1000432,
                                    _ver: 1
                                },
                                region: {
                                    _value: 1000451,
                                    _ver: 1
                                },
                                _code: {
                                    _value: 1001008,
                                    _ver: 2
                                }
                            }
                        ]
                    },
                    appendix: {
                        region: [{
                            _value: 1000003,
                            _ver: 1
                        }]
                    }
                }
            ));
        });

        test('正常：appendixが空', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerGetIndBook(3001, 1001008, 200);

            // 初期データの設定
            await common.executeSqlFile('initialDataIndBook.sql');
            await common.executeSqlString(`
                UPDATE pxr_book_manage.my_condition_book
                SET appendix = null
                WHERE pxr_id = '58di2dfse2.test.org'
            `);

            // 送信データを作成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.getIndBook) });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(
                {
                    status: 0,
                    identification: [
                        {
                            test1: 'data1'
                        }
                    ],
                    cooperation: [
                        {
                            actor: {
                                _value: 1000004,
                                _ver: 1
                            },
                            app: {
                                _value: 1000107,
                                _ver: 1
                            },
                            userId: 'userid01',
                            status: 0
                        },
                        {
                            actor: {
                                _value: 1000004,
                                _ver: 1
                            },
                            region: {
                                _value: 1000006,
                                _ver: 1
                            },
                            userId: 'userid01',
                            status: 0
                        }
                    ],
                    termsOfUse: {
                        platform: {
                            _value: 1001007,
                            _ver: 2
                        },
                        region: [
                            {
                                actor: {
                                    _value: 1000432,
                                    _ver: 1
                                },
                                region: {
                                    _value: 1000451,
                                    _ver: 1
                                },
                                _code: {
                                    _value: 1001008,
                                    _ver: 2
                                }
                            }
                        ]
                    },
                    appendix: null
                }
            ));
        });

        test('正常：appendixが存在する', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerGetIndBook(3001, 1001008, 200);

            // 初期データの設定
            await common.executeSqlFile('initialDataIndBook.sql');

            // 送信データを作成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: encodeURIComponent(Session.getIndBook) });

            // レスポンスチェック
            expect(response.status).toBe(200);
            expect(JSON.stringify(response.body)).toBe(JSON.stringify(
                {
                    status: 0,
                    identification: [
                        {
                            test1: 'data1'
                        }
                    ],
                    cooperation: [
                        {
                            actor: {
                                _value: 1000004,
                                _ver: 1
                            },
                            app: {
                                _value: 1000107,
                                _ver: 1
                            },
                            userId: 'userid01',
                            status: 0
                        },
                        {
                            actor: {
                                _value: 1000004,
                                _ver: 1
                            },
                            region: {
                                _value: 1000006,
                                _ver: 1
                            },
                            userId: 'userid01',
                            status: 0
                        }
                    ],
                    termsOfUse: {
                        platform: {
                            _value: 1001007,
                            _ver: 2
                        },
                        region: [
                            {
                                actor: {
                                    _value: 1000432,
                                    _ver: 1
                                },
                                region: {
                                    _value: 1000451,
                                    _ver: 1
                                },
                                _code: {
                                    _value: 1001008,
                                    _ver: 2
                                }
                            }
                        ]
                    },
                    appendix: {
                        region: [{
                            _value: 1000003,
                            _ver: 1
                        }]
                    }
                }
            ));
        });

        test('異常：セッション情報が取得できない', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerGetIndBook(3001, 1001008, 200);

            // 初期データの設定
            await common.executeSqlFile('initialDataIndBook.sql');

            // 送信データを作成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' });

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
        });

        test('異常：オペレーター個人以外', async () => {
            _operatorServer = new StubOperatorServerType0(200, 3);
            _catalogServer = new StubCatalogServerGetIndBook(3001, 1001008, 200);

            // 初期データの設定
            await common.executeSqlFile('initialDataIndBook.sql');

            // 送信データを作成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=sessionId']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
        });

        test('異常：カタログサービスに接続できない', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);

            // 初期データの設定
            await common.executeSqlFile('initialDataIndBook.sql');

            // 送信データを作成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=sessionId']);

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_CATALOG);
        });

        test('異常：カタログサービスからのレスポンスが400', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerGetIndBook(3001, 1001008, 400);

            // 初期データの設定
            await common.executeSqlFile('initialDataIndBook.sql');

            // 送信データを作成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=sessionId']);

            // レスポンスチェック
            expect(response.status).toBe(400);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });

        test('異常：カタログサービスからのレスポンスが500系', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerGetIndBook(3001, 1001008, 500);

            // 初期データの設定
            await common.executeSqlFile('initialDataIndBook.sql');

            // 送信データを作成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=sessionId']);

            // レスポンスチェック
            expect(response.status).toBe(503);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });

        test('異常：カタログサービスからのレスポンスが200以外', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerGetIndBook(3001, 1001008, 600);

            // 初期データの設定
            await common.executeSqlFile('initialDataIndBook.sql');

            // 送信データを作成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=sessionId']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.FAILED_CATALOG_GET);
        });

        test('異常：ブックステータスが取得できない', async () => {
            _operatorServer = new StubOperatorServerType0(200, 0);
            _catalogServer = new StubCatalogServerGetIndBook(3001, 1001008, 200);

            // 送信データを作成
            const url = Url.baseURI;

            // 対象APIに送信
            const response = await supertest(expressApp).get(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=sessionId']);

            // レスポンスチェック
            expect(response.status).toBe(401);
            expect(response.body.message).toBe(Message.NOT_EXIST_BOOK);
        });
    });
});
