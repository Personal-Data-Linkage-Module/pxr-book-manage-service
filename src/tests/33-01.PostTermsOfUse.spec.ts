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
import { StubOperatorServerType0 } from './StubOperatorServer';
import { StubCatalogServerTermsOfUse } from './StubCatalogServer';
/* eslint-enable */
// const Message = Config.ReadConfig('./config/message.json');

const app = new Application();
const expressApp = app.express.app;
const common = new Common();
app.start();

let operator: any;
let catalog: any;

/**
 * book-mange API のユニットテスト
 */
describe('book-mange API', () => {
    beforeAll(async () => {

    });
    afterAll(async () => {
        app.stop();
    });
    /**
     * 各テスト実行の後処理
     */
    afterEach(async () => {
        // スタブサーバー停止
        if (operator) {
            operator._server.close();
            operator = null;
        }
        if (catalog) {
            catalog._server.close();
            catalog = null;
        }
    });

    /**
     * Region利用規約同意API（非推奨）
     */
    describe('Region利用規約同意API（非推奨）', () => {
        describe('バリデーション', () => {

        });

        describe('正常系', () => {
            test('更新対象なし', async () => {
                await common.connect();
                await common.executeSqlFile('initialData.sql');
                await common.executeSqlFile('initialTermsOfUse.sql');
                // スタブを起動
                operator = new StubOperatorServerType0(200, 0);
                catalog = new StubCatalogServerTermsOfUse(200, 0);

                try {
                    // 対象APIに送信
                    const response = await supertest(expressApp).post('/book-manage/ind/term_of_use/region')
                        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                        .set('Cookie', ['operator_type0_session=ee59bbc7fa4d13d853f65c412fe57a3c79af64ee710f3719b5485039d227bd8a'])
                        .send(JSON.stringify({
                            actor: {
                                _value: 1000002,
                                _ver: 1
                            },
                            region: {
                                _value: 1000003,
                                _ver: 1
                            },
                            _code: {
                                _value: 1001008,
                                _ver: 4
                            }
                        }));
                    expect(response.status).toBe(200);
                } catch (err) {
                    console.log(err);
                    throw err;
                }
            });
            test('指定バージョン以前の利用規約更新通知がある', async () => {
                await common.connect();
                await common.executeSqlFile('initialData.sql');
                await common.executeSqlFile('initialTermsOfUse.sql');
                // スタブを起動
                operator = new StubOperatorServerType0(200, 0);
                catalog = new StubCatalogServerTermsOfUse(200, 0);

                try {
                    // 対象APIに送信
                    const response = await supertest(expressApp).post('/book-manage/ind/term_of_use/region')
                        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                        .set('Cookie', ['operator_type0_session=ee59bbc7fa4d13d853f65c412fe57a3c79af64ee710f3719b5485039d227bd8a'])
                        .send(JSON.stringify({
                            actor: {
                                _value: 1000002,
                                _ver: 1
                            },
                            region: {
                                _value: 1000003,
                                _ver: 1
                            },
                            _code: {
                                _value: 1001008,
                                _ver: 3
                            }
                        }));
                    expect(response.status).toBe(200);
                } catch (err) {
                    console.log(err);
                    throw err;
                }
            });
            test('指定バージョン以前の利用規約更新通知がない', async () => {
                await common.connect();
                await common.executeSqlFile('initialData.sql');
                await common.executeSqlFile('initialTermsOfUse.sql');
                // スタブを起動
                operator = new StubOperatorServerType0(200, 0);
                catalog = new StubCatalogServerTermsOfUse(200, 0);

                try {
                    // 対象APIに送信
                    const response = await supertest(expressApp).post('/book-manage/ind/term_of_use/region')
                        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                        .set('Cookie', ['operator_type0_session=ee59bbc7fa4d13d853f65c412fe57a3c79af64ee710f3719b5485039d227bd8a'])
                        .send(JSON.stringify({
                            _code: {
                                _value: 1001008,
                                _ver: 1
                            }
                        }));
                    expect(response.status).toBe(200);
                } catch (err) {
                    console.log(err);
                    throw err;
                }
            });
        });

        describe('異常系', () => {
            test('更新対象がなく、利用者ID連携がされていない', async () => {
                await common.connect();
                await common.executeSqlFile('initialData.sql');
                await common.executeSqlFile('initialTermsOfUseNoData.sql');
                // スタブを起動
                operator = new StubOperatorServerType0(200, 0);
                catalog = new StubCatalogServerTermsOfUse(200, 1);

                try {
                    // 対象APIに送信
                    const response = await supertest(expressApp).post('/book-manage/ind/term_of_use/region')
                        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                        .set('Cookie', ['operator_type0_session=5e59bbc7fa4d13d853f65c412fe57a3c79af64ee710f3719b5485039d227bd8a'])
                        .send(JSON.stringify({
                            _code: {
                                _value: 1001008,
                                _ver: 3
                            }
                        }));
                    expect(response.status).toBe(400);
                } catch (err) {
                    console.log(err);
                    throw err;
                }
            });
            test('更新対象あり、再同意期限超過', async () => {
                await common.connect();
                await common.executeSqlFile('initialData.sql');
                await common.executeSqlFile('initialTermsOfUse.sql');
                // スタブを起動
                operator = new StubOperatorServerType0(200, 0);
                catalog = new StubCatalogServerTermsOfUse(200, 1);

                try {
                    // 対象APIに送信
                    const response = await supertest(expressApp).post('/book-manage/ind/term_of_use/region')
                        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                        .set('Cookie', ['operator_type0_session=ee59bbc7fa4d13d853f65c412fe57a3c79af64ee710f3719b5485039d227bd8a'])
                        .send(JSON.stringify({
                            _code: {
                                _value: 1001008,
                                _ver: 3
                            }
                        }));
                    expect(response.status).toBe(400);
                } catch (err) {
                    console.log(err);
                    throw err;
                }
            });
        });
    });

    /**
     * Platform利用規約同意API（非推奨）
     */
    describe('Platform利用規約同意API（非推奨）', () => {
        describe('バリデーション', () => {

        });

        describe('正常系', () => {
            test('指定バージョン以前の利用規約更新通知がある', async () => {
                await common.connect();
                await common.executeSqlFile('initialData.sql');
                await common.executeSqlFile('initialTermsOfUse.sql');
                // スタブを起動
                operator = new StubOperatorServerType0(200, 0);
                catalog = new StubCatalogServerTermsOfUse(200, 0);

                try {
                    // 対象APIに送信
                    const response = await supertest(expressApp).post('/book-manage/ind/term_of_use/platform')
                        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                        .set('Cookie', ['operator_type0_session=ee59bbc7fa4d13d853f65c412fe57a3c79af64ee710f3719b5485039d227bd8a'])
                        .send(JSON.stringify({
                            _code: {
                                _value: 1001007,
                                _ver: 3
                            }
                        }));
                    expect(response.status).toBe(200);
                } catch (err) {
                    console.log(err);
                    throw err;
                }
            });
            test('指定バージョン以前の利用規約更新通知がない', async () => {
                await common.connect();
                await common.executeSqlFile('initialData.sql');
                await common.executeSqlFile('initialTermsOfUse.sql');
                // スタブを起動
                operator = new StubOperatorServerType0(200, 0);
                catalog = new StubCatalogServerTermsOfUse(200, 0);

                try {
                    // 対象APIに送信
                    const response = await supertest(expressApp).post('/book-manage/ind/term_of_use/platform')
                        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                        .set('Cookie', ['operator_type0_session=ee59bbc7fa4d13d853f65c412fe57a3c79af64ee710f3719b5485039d227bd8a'])
                        .send(JSON.stringify({
                            _code: {
                                _value: 1001007,
                                _ver: 1
                            }
                        }));
                    expect(response.status).toBe(200);
                } catch (err) {
                    console.log(err);
                    throw err;
                }
            });
            test('指定バージョン以降の利用規約更新通知がある', async () => {
                await common.connect();
                await common.executeSqlFile('initialData.sql');
                await common.executeSqlFile('initialTermsOfUse.sql');
                // スタブを起動
                operator = new StubOperatorServerType0(200, 0);
                catalog = new StubCatalogServerTermsOfUse(200, 0);

                try {
                    // 対象APIに送信
                    const response = await supertest(expressApp).post('/book-manage/ind/term_of_use/platform')
                        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                        .set('Cookie', ['operator_type0_session=ee59bbc7fa4d13d853f65c412fe57a3c79af64ee710f3719b5485039d227bd8a'])
                        .send(JSON.stringify({
                            _code: {
                                _value: 1001007,
                                _ver: 1
                            }
                        }));
                    expect(response.status).toBe(200);
                } catch (err) {
                    console.log(err);
                    throw err;
                }
            });
            test('指定バージョン以降の利用規約更新通知がない', async () => {
                await common.connect();
                await common.executeSqlFile('initialData.sql');
                await common.executeSqlFile('initialTermsOfUse.sql');
                // スタブを起動
                operator = new StubOperatorServerType0(200, 0);
                catalog = new StubCatalogServerTermsOfUse(200, 0);

                try {
                    // 対象APIに送信
                    const response = await supertest(expressApp).post('/book-manage/ind/term_of_use/platform')
                        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                        .set('Cookie', ['operator_type0_session=ee59bbc7fa4d13d853f65c412fe57a3c79af64ee710f3719b5485039d227bd8a'])
                        .send(JSON.stringify({
                            _code: {
                                _value: 1001007,
                                _ver: 3
                            }
                        }));
                    expect(response.status).toBe(200);
                } catch (err) {
                    console.log(err);
                    throw err;
                }
            });
        });

        describe('異常系', () => {
            test('利用規約更新通知個人管理に更新対象がない', async () => {
                await common.connect();
                await common.executeSqlFile('initialData.sql');
                await common.executeSqlFile('initialTermsOfUseNoData.sql');
                // スタブを起動
                operator = new StubOperatorServerType0(200, 0);
                catalog = new StubCatalogServerTermsOfUse(200, 1);

                try {
                    // 対象APIに送信
                    const response = await supertest(expressApp).post('/book-manage/ind/term_of_use/platform')
                        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                        .set('Cookie', ['operator_type0_session=5e59bbc7fa4d13d853f65c412fe57a3c79af64ee710f3719b5485039d227bd8a'])
                        .send(JSON.stringify({
                            _code: {
                                _value: 1001007,
                                _ver: 3
                            }
                        }));
                    expect(response.status).toBe(400);
                } catch (err) {
                    console.log(err);
                    throw err;
                }
            });
            test('更新対象あり、再同意期限超過', async () => {
                await common.connect();
                await common.executeSqlFile('initialData.sql');
                await common.executeSqlFile('initialTermsOfUse.sql');
                // スタブを起動
                operator = new StubOperatorServerType0(200, 0);
                catalog = new StubCatalogServerTermsOfUse(200, 1);

                try {
                    // 対象APIに送信
                    const response = await supertest(expressApp).post('/book-manage/ind/term_of_use/platform')
                        .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                        .set('Cookie', ['operator_type0_session=ee59bbc7fa4d13d853f65c412fe57a3c79af64ee710f3719b5485039d227bd8a'])
                        .send(JSON.stringify({
                            _code: {
                                _value: 1001007,
                                _ver: 3
                            }
                        }));
                    expect(response.status).toBe(400);
                } catch (err) {
                    console.log(err);
                    throw err;
                }
            });
        });
    });
});
