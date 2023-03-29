/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Application } from '../resources/config/Application';
import supertest = require('supertest');
import Common, { Url } from './Common';
import { Session } from './Session';
import Config from '../common/Config';
import { StubProxyBookServer } from './StubProxyServer';
import { StubCatalogServerGetBook } from './StubCatalogServer';
import StubOperatorServer from './StubOperatorServer';
import { values } from 'lodash';
/* eslint-enable */
const Message = Config.ReadConfig('./config/message.json');

const app = new Application();
const expressApp = app.express.app;
const common = new Common();
app.start();

let operatorService: StubOperatorServer = null;
let catalogService: StubCatalogServerGetBook = null;
let proxyService: StubProxyBookServer = null;

/**
 * book-mange API のユニットテスト
 */
describe('book-mange API', () => {
    beforeAll(async () => {
        await common.connect();
        await common.executeSqlFile('initialData.sql');
        await common.executeSqlFile('initialDataBook.sql');
    });
    afterAll(async () => {
        app.stop();
    });
    /**
     * 各テスト実行の後処理
     */
    afterEach(async () => {
        // スタブサーバー停止
        if (proxyService) {
            proxyService._server.close();
            proxyService = null;
        }
        if (operatorService) {
            operatorService._server.close();
            operatorService = null;
        }
        if (catalogService) {
            catalogService._server.close();
            catalogService = null;
        }
    });

    /**
     * Book参照依頼API
     */
    describe('Book参照依頼API', () => {
        test('異常：リクエストが空', async () => {
            operatorService = new StubOperatorServer(200);
            catalogService = new StubCatalogServerGetBook(200);
            const response = await supertest(expressApp)
                .post(Url.bookURI)
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
        test('パラメータ異常：type, identifierがどちらもnull', async () => {
            operatorService = new StubOperatorServer(200);
            catalogService = new StubCatalogServerGetBook(200);
            const response = await supertest(expressApp)
                .post(Url.bookURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    type: null,
                    identifier: null,
                    updatedAt: {
                        start: '2020-01-01T00:00:00.000+0900',
                        end: '2021-03-01T00:00:00.000+0900'
                    },
                    condition: [
                        {
                            actor: {
                                _value: 1000004
                            },
                            _code: [
                                {
                                    _value: 1000008,
                                    _ver: 1
                                }
                            ],
                            app: {
                                _value: 1000007
                            },
                            wf: null
                        }
                    ]
                });

            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.IS_DEFINED_TYPE_IDENTIFIER);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：typeがnullかつidentifierが空配列', async () => {
            operatorService = new StubOperatorServer(200);
            catalogService = new StubCatalogServerGetBook(200);
            const response = await supertest(expressApp)
                .post(Url.bookURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    type: null,
                    identifier: [],
                    updatedAt: {
                        start: '2020-01-01T00:00:00.000+0900',
                        end: '2021-03-01T00:00:00.000+0900'
                    },
                    condition: [
                        {
                            actor: {
                                _value: 1000004
                            },
                            _code: [
                                {
                                    _value: 1000008,
                                    _ver: 1
                                }
                            ],
                            app: {
                                _value: 1000007
                            },
                            wf: null
                        }
                    ]
                });

            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.IS_DEFINED_TYPE_IDENTIFIER);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：typeが空', async () => {
            operatorService = new StubOperatorServer(200);
            catalogService = new StubCatalogServerGetBook(200);
            proxyService = new StubProxyBookServer(200);
            const response = await supertest(expressApp)
                .post(Url.bookURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    type: '',
                    identifier: [
                        'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6'
                    ],
                    updatedAt: {
                        start: '2020-01-01T00:00:00.000+0900',
                        end: '2021-03-01T00:00:00.000+0900'
                    },
                    condition: [
                        {
                            actor: {
                                _value: 1000004
                            },
                            _code: [
                                {
                                    _value: 1000008,
                                    _ver: 1
                                }
                            ],
                            app: {
                                _value: 1000007
                            },
                            wf: null
                        },
                        {
                            actor: {
                                _value: 1000004
                            },
                            _code: [
                                {
                                    _value: 1000008,
                                    _ver: 1
                                }
                            ],
                            app: {
                                _value: 1000007
                            },
                            wf: null
                        }
                    ]
                });
            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.isNotEmpty);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：typeがdocument, event, thing以外', async () => {
            operatorService = new StubOperatorServer(200);
            catalogService = new StubCatalogServerGetBook(200);
            proxyService = new StubProxyBookServer(200);
            const response = await supertest(expressApp)
                .post(Url.bookURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    type: 'dummy',
                    identifier: [
                        'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6'
                    ],
                    updatedAt: {
                        start: '2020-01-01T00:00:00.000+0900',
                        end: '2021-03-01T00:00:00.000+0900'
                    },
                    condition: [
                        {
                            actor: {
                                _value: 1000004
                            },
                            _code: [
                                {
                                    _value: 1000008,
                                    _ver: 1
                                }
                            ],
                            app: {
                                _value: 1000007
                            },
                            wf: null
                        },
                        {
                            actor: {
                                _value: 1000004
                            },
                            _code: [
                                {
                                    _value: 1000008,
                                    _ver: 1
                                }
                            ],
                            app: {
                                _value: 1000007
                            },
                            wf: null
                        }
                    ]
                });
            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.matches);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：typeが文字列以外', async () => {
            operatorService = new StubOperatorServer(200);
            catalogService = new StubCatalogServerGetBook(200);
            proxyService = new StubProxyBookServer(200);
            const response = await supertest(expressApp)
                .post(Url.bookURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    type: 1,
                    identifier: [
                        'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6'
                    ],
                    updatedAt: {
                        start: '2020-01-01T00:00:00.000+0900',
                        end: '2021-03-01T00:00:00.000+0900'
                    },
                    condition: [
                        {
                            actor: {
                                _value: 1000004
                            },
                            _code: [
                                {
                                    _value: 1000008,
                                    _ver: 1
                                }
                            ],
                            app: {
                                _value: 1000007
                            },
                            wf: null
                        },
                        {
                            actor: {
                                _value: 1000004
                            },
                            _code: [
                                {
                                    _value: 1000008,
                                    _ver: 1
                                }
                            ],
                            app: {
                                _value: 1000007
                            },
                            wf: null
                        }
                    ]
                });
            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.isString);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：identifierが配列ではない', async () => {
            operatorService = new StubOperatorServer(200);
            catalogService = new StubCatalogServerGetBook(200);
            proxyService = new StubProxyBookServer(200);
            const response = await supertest(expressApp)
                .post(Url.bookURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    type: 'event',
                    identifier: 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6',
                    updatedAt: {
                        start: '2020-01-01T00:00:00.000+0900',
                        end: '2021-03-01T00:00:00.000+0900'
                    },
                    condition: [
                        {
                            actor: {
                                _value: 1000004
                            },
                            _code: [
                                {
                                    _value: 1000008,
                                    _ver: 1
                                }
                            ],
                            app: {
                                _value: 1000007
                            },
                            wf: null
                        },
                        {
                            actor: {
                                _value: 1000004
                            },
                            _code: [
                                {
                                    _value: 1000008,
                                    _ver: 1
                                }
                            ],
                            app: {
                                _value: 1000007
                            },
                            wf: null
                        }
                    ]
                });
            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.isArray);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：identifierが文字列以外の配列', async () => {
            operatorService = new StubOperatorServer(200);
            catalogService = new StubCatalogServerGetBook(200);
            proxyService = new StubProxyBookServer(200);
            const response = await supertest(expressApp)
                .post(Url.bookURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    type: 'event',
                    identifier: [
                        { key: 'key', value: '_value' }
                    ],
                    updatedAt: {
                        start: '2020-01-01T00:00:00.000+0900',
                        end: '2021-03-01T00:00:00.000+0900'
                    },
                    condition: [
                        {
                            actor: {
                                _value: 1000004
                            },
                            _code: [
                                {
                                    _value: 1000008,
                                    _ver: 1
                                }
                            ],
                            app: {
                                _value: 1000007
                            },
                            wf: null
                        },
                        {
                            actor: {
                                _value: 1000004
                            },
                            _code: [
                                {
                                    _value: 1000008,
                                    _ver: 1
                                }
                            ],
                            app: {
                                _value: 1000007
                            },
                            wf: null
                        }
                    ]
                });
            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.isString);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：updatedAt.startがない', async () => {
            operatorService = new StubOperatorServer(200);
            catalogService = new StubCatalogServerGetBook(200);
            proxyService = new StubProxyBookServer(200);
            const response = await supertest(expressApp)
                .post(Url.bookURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    type: 'event',
                    identifier: [
                        'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6'
                    ],
                    updatedAt: {
                        end: '2021-03-01T00:00:00.000+0900'
                    },
                    condition: [
                        {
                            actor: {
                                _value: 1000004
                            },
                            _code: [
                                {
                                    _value: 1000008,
                                    _ver: 1
                                }
                            ],
                            app: {
                                _value: 1000007
                            },
                            wf: null
                        },
                        {
                            actor: {
                                _value: 1000004
                            },
                            _code: [
                                {
                                    _value: 1000008,
                                    _ver: 1
                                }
                            ],
                            app: {
                                _value: 1000007
                            },
                            wf: null
                        }
                    ]
                });
            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.isDefined);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：updatedAt.endがない', async () => {
            operatorService = new StubOperatorServer(200);
            catalogService = new StubCatalogServerGetBook(200);
            proxyService = new StubProxyBookServer(200);
            const response = await supertest(expressApp)
                .post(Url.bookURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    type: 'event',
                    identifier: [
                        'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6'
                    ],
                    updatedAt: {
                        start: '2020-01-01T00:00:00.000+0900'
                    },
                    condition: [
                        {
                            actor: {
                                _value: 1000004
                            },
                            _code: [
                                {
                                    _value: 1000008,
                                    _ver: 1
                                }
                            ],
                            app: {
                                _value: 1000007
                            },
                            wf: null
                        },
                        {
                            actor: {
                                _value: 1000004
                            },
                            _code: [
                                {
                                    _value: 1000008,
                                    _ver: 1
                                }
                            ],
                            app: {
                                _value: 1000007
                            },
                            wf: null
                        }
                    ]
                });
            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.isDefined);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：updatedAt.startが日付以外', async () => {
            operatorService = new StubOperatorServer(200);
            catalogService = new StubCatalogServerGetBook(200);
            proxyService = new StubProxyBookServer(200);
            const response = await supertest(expressApp)
                .post(Url.bookURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    type: 'event',
                    identifier: [
                        'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6'
                    ],
                    updatedAt: {
                        start: '2020010T0000000000900',
                        end: '2021-03-01T00:00:00.000+0900'
                    },
                    condition: [
                        {
                            actor: {
                                _value: 1000004
                            },
                            _code: [
                                {
                                    _value: 1000008,
                                    _ver: 1
                                }
                            ],
                            app: {
                                _value: 1000007
                            },
                            wf: null
                        },
                        {
                            actor: {
                                _value: 1000004
                            },
                            _code: [
                                {
                                    _value: 1000008,
                                    _ver: 1
                                }
                            ],
                            app: {
                                _value: 1000007
                            },
                            wf: null
                        }
                    ]
                });
            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.IsDate);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：updatedAt.endが日付以外', async () => {
            operatorService = new StubOperatorServer(200);
            catalogService = new StubCatalogServerGetBook(200);
            proxyService = new StubProxyBookServer(200);
            const response = await supertest(expressApp)
                .post(Url.bookURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    type: 'event',
                    identifier: [
                        'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6'
                    ],
                    updatedAt: {
                        start: '2020-01-01T00:00:00.000+0900',
                        end: '202103010000000000900'
                    },
                    condition: [
                        {
                            actor: {
                                _value: 1000004
                            },
                            _code: [
                                {
                                    _value: 1000008,
                                    _ver: 1
                                }
                            ],
                            app: {
                                _value: 1000007
                            },
                            wf: null
                        },
                        {
                            actor: {
                                _value: 1000004
                            },
                            _code: [
                                {
                                    _value: 1000008,
                                    _ver: 1
                                }
                            ],
                            app: {
                                _value: 1000007
                            },
                            wf: null
                        }
                    ]
                });
            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.IsDate);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：conditionが配列以外', async () => {
            operatorService = new StubOperatorServer(200);
            catalogService = new StubCatalogServerGetBook(200);
            proxyService = new StubProxyBookServer(200);
            const response = await supertest(expressApp)
                .post(Url.bookURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    type: 'event',
                    identifier: [
                        'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6'
                    ],
                    updatedAt: {
                        start: '2020-01-01T00:00:00.000+0900',
                        end: '2021-03-01T00:00:00.000+0900'
                    },
                    condition: {
                        actor: {
                            _value: 1000004
                        },
                        _code: [
                            {
                                _value: 1000008,
                                _ver: 1
                            }
                        ],
                        app: {
                            _value: 1000007
                        },
                        wf: null
                    }
                });
            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.isArray);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：condition[n].actorが無い', async () => {
            operatorService = new StubOperatorServer(200);
            catalogService = new StubCatalogServerGetBook(200);
            proxyService = new StubProxyBookServer(200);
            const response = await supertest(expressApp)
                .post(Url.bookURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    type: 'event',
                    identifier: [
                        'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6'
                    ],
                    updatedAt: {
                        start: '2020-01-01T00:00:00.000+0900',
                        end: '2021-03-01T00:00:00.000+0900'
                    },
                    condition: [
                        {
                            _code: [
                                {
                                    _value: 1000008,
                                    _ver: 1
                                }
                            ],
                            app: {
                                _value: 1000007
                            },
                            wf: null
                        },
                        {
                            actor: {
                                _value: 1000004
                            },
                            _code: [
                                {
                                    _value: 1000008,
                                    _ver: 1
                                }
                            ],
                            app: {
                                _value: 1000007
                            },
                            wf: null
                        }
                    ]
                });
            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.isDefined);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：condition[n].actor._valueが無い', async () => {
            operatorService = new StubOperatorServer(200);
            catalogService = new StubCatalogServerGetBook(200);
            proxyService = new StubProxyBookServer(200);
            const response = await supertest(expressApp)
                .post(Url.bookURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    type: 'event',
                    identifier: [
                        'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6'
                    ],
                    updatedAt: {
                        start: '2020-01-01T00:00:00.000+0900',
                        end: '2021-03-01T00:00:00.000+0900'
                    },
                    condition: [
                        {
                            actor: {
                                _value: null
                            },
                            _code: [
                                {
                                    _value: 1000008,
                                    _ver: 1
                                }
                            ],
                            app: {
                                _value: 1000007
                            },
                            wf: null
                        },
                        {
                            actor: {
                                _value: 1000004
                            },
                            _code: [
                                {
                                    _value: 1000008,
                                    _ver: 1
                                }
                            ],
                            app: {
                                _value: 1000007
                            },
                            wf: null
                        }
                    ]
                });
            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.isString);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：condition[n].actor._valueが数値以外', async () => {
            operatorService = new StubOperatorServer(200);
            catalogService = new StubCatalogServerGetBook(200);
            proxyService = new StubProxyBookServer(200);
            const response = await supertest(expressApp)
                .post(Url.bookURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    type: 'event',
                    identifier: [
                        'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6'
                    ],
                    updatedAt: {
                        start: '2020-01-01T00:00:00.000+0900',
                        end: '2021-03-01T00:00:00.000+0900'
                    },
                    condition: [
                        {
                            actor: {
                                _value: 'dummy'
                            },
                            _code: [
                                {
                                    _value: 1000008,
                                    _ver: 1
                                }
                            ],
                            app: {
                                _value: 1000007
                            },
                            wf: null
                        },
                        {
                            actor: {
                                _value: 1000004
                            },
                            _code: [
                                {
                                    _value: 1000008,
                                    _ver: 1
                                }
                            ],
                            app: {
                                _value: 1000007
                            },
                            wf: null
                        }
                    ]
                });
            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.isNumber);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：condition[n]._codeが配列以外', async () => {
            operatorService = new StubOperatorServer(200);
            catalogService = new StubCatalogServerGetBook(200);
            proxyService = new StubProxyBookServer(200);
            const response = await supertest(expressApp)
                .post(Url.bookURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    type: 'event',
                    identifier: [
                        'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6'
                    ],
                    updatedAt: {
                        start: '2020-01-01T00:00:00.000+0900',
                        end: '2021-03-01T00:00:00.000+0900'
                    },
                    condition: [
                        {
                            actor: {
                                _value: 1000004
                            },
                            _code: {
                                _value: 1000008,
                                _ver: 1
                            },
                            app: {
                                _value: 1000007
                            },
                            wf: null
                        },
                        {
                            actor: {
                                _value: 1000004
                            },
                            _code: [
                                {
                                    _value: 1000008,
                                    _ver: 1
                                }
                            ],
                            app: {
                                _value: 1000007
                            },
                            wf: null
                        }
                    ]
                });
            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.isArray);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：condition[n]._code[n]._valueがない', async () => {
            operatorService = new StubOperatorServer(200);
            catalogService = new StubCatalogServerGetBook(200);
            proxyService = new StubProxyBookServer(200);
            const response = await supertest(expressApp)
                .post(Url.bookURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    type: 'event',
                    identifier: [
                        'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6'
                    ],
                    updatedAt: {
                        start: '2020-01-01T00:00:00.000+0900',
                        end: '2021-03-01T00:00:00.000+0900'
                    },
                    condition: [
                        {
                            actor: {
                                _value: 1000004
                            },
                            _code: [
                                {
                                    _ver: 1
                                }
                            ],
                            app: {
                                _value: 1000007
                            },
                            wf: null
                        },
                        {
                            actor: {
                                _value: 1000004
                            },
                            _code: [
                                {
                                    _value: 1000008,
                                    _ver: 1
                                }
                            ],
                            app: {
                                _value: 1000007
                            },
                            wf: null
                        }
                    ]
                });
            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.isDefined);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：condition[n]._code[n]._valueが数値以外', async () => {
            operatorService = new StubOperatorServer(200);
            catalogService = new StubCatalogServerGetBook(200);
            proxyService = new StubProxyBookServer(200);
            const response = await supertest(expressApp)
                .post(Url.bookURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    type: 'event',
                    identifier: [
                        'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6'
                    ],
                    updatedAt: {
                        start: '2020-01-01T00:00:00.000+0900',
                        end: '2021-03-01T00:00:00.000+0900'
                    },
                    condition: [
                        {
                            actor: {
                                _value: 1000004
                            },
                            _code: [
                                {
                                    _value: 'dummy',
                                    _ver: 1
                                }
                            ],
                            app: {
                                _value: 1000007
                            },
                            wf: null
                        },
                        {
                            actor: {
                                _value: 1000004
                            },
                            _code: [
                                {
                                    _value: 1000008,
                                    _ver: 1
                                }
                            ],
                            app: {
                                _value: 1000007
                            },
                            wf: null
                        }
                    ]
                });
            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.isNumber);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：condition[n]._code[n]._verがない', async () => {
            operatorService = new StubOperatorServer(200);
            catalogService = new StubCatalogServerGetBook(200);
            proxyService = new StubProxyBookServer(200);
            const response = await supertest(expressApp)
                .post(Url.bookURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    type: 'event',
                    identifier: [
                        'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6'
                    ],
                    updatedAt: {
                        start: '2020-01-01T00:00:00.000+0900',
                        end: '2021-03-01T00:00:00.000+0900'
                    },
                    condition: [
                        {
                            actor: {
                                _value: 1000004
                            },
                            _code: [
                                {
                                    _value: 1000008
                                }
                            ],
                            app: {
                                _value: 1000007
                            },
                            wf: null
                        },
                        {
                            actor: {
                                _value: 1000004
                            },
                            _code: [
                                {
                                    _value: 1000008,
                                    _ver: 1
                                }
                            ],
                            app: {
                                _value: 1000007
                            },
                            wf: null
                        }
                    ]
                });
            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.isDefined);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：condition[n]._code[n]._verが数値以外', async () => {
            operatorService = new StubOperatorServer(200);
            catalogService = new StubCatalogServerGetBook(200);
            proxyService = new StubProxyBookServer(200);
            const response = await supertest(expressApp)
                .post(Url.bookURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    type: 'event',
                    identifier: [
                        'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6'
                    ],
                    updatedAt: {
                        start: '2020-01-01T00:00:00.000+0900',
                        end: '2021-03-01T00:00:00.000+0900'
                    },
                    condition: [
                        {
                            actor: {
                                _value: 1000004
                            },
                            _code: [
                                {
                                    _value: 1000008,
                                    _ver: 'dummy'
                                }
                            ],
                            app: {
                                _value: 1000007
                            },
                            wf: null
                        },
                        {
                            actor: {
                                _value: 1000004
                            },
                            _code: [
                                {
                                    _value: 1000008,
                                    _ver: 1
                                }
                            ],
                            app: {
                                _value: 1000007
                            },
                            wf: null
                        }
                    ]
                });
            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.isNumber);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：condition[n].app._valueが無い', async () => {
            operatorService = new StubOperatorServer(200);
            catalogService = new StubCatalogServerGetBook(200);
            proxyService = new StubProxyBookServer(200);
            const response = await supertest(expressApp)
                .post(Url.bookURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    type: 'event',
                    identifier: [
                        'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6'
                    ],
                    updatedAt: {
                        start: '2020-01-01T00:00:00.000+0900',
                        end: '2021-03-01T00:00:00.000+0900'
                    },
                    condition: [
                        {
                            actor: {
                                _value: 1000004
                            },
                            _code: [
                                {
                                    _value: 1000008,
                                    _ver: 1
                                }
                            ],
                            app: {
                                _value: 1000007
                            },
                            wf: null
                        },
                        {
                            actor: {
                                _value: 1000004
                            },
                            _code: [
                                {
                                    _value: 1000008,
                                    _ver: 1
                                }
                            ],
                            app: {
                                _value: null
                            },
                            wf: null
                        }
                    ]
                });
            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.isDefined);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：condition[n].app._valueが数値以外', async () => {
            operatorService = new StubOperatorServer(200);
            catalogService = new StubCatalogServerGetBook(200);
            proxyService = new StubProxyBookServer(200);
            const response = await supertest(expressApp)
                .post(Url.bookURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    type: 'event',
                    identifier: [
                        'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6'
                    ],
                    updatedAt: {
                        start: '2020-01-01T00:00:00.000+0900',
                        end: '2021-03-01T00:00:00.000+0900'
                    },
                    condition: [
                        {
                            actor: {
                                _value: 1000004
                            },
                            _code: [
                                {
                                    _value: 1000008,
                                    _ver: 1
                                }
                            ],
                            app: {
                                _value: 1000007
                            },
                            wf: null
                        },
                        {
                            actor: {
                                _value: 1000004
                            },
                            _code: [
                                {
                                    _value: 1000008,
                                    _ver: 1
                                }
                            ],
                            app: {
                                _value: 'dummy'
                            },
                            wf: null
                        }
                    ]
                });
            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.isNumber);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：condition.wfが設定されている', async () => {
            operatorService = new StubOperatorServer(200);
            catalogService = new StubCatalogServerGetBook(200);
            const response = await supertest(expressApp)
                .post(Url.bookURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    type: 'event',
                    identifier: [
                        'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6'
                    ],
                    updatedAt: {
                        start: '2020-01-01T00:00:00.000+0900',
                        end: '2021-03-01T00:00:00.000+0900'
                    },
                    condition: [
                        {
                            actor: {
                                _value: 1000004
                            },
                            _code: [
                                {
                                    _value: 1000008,
                                    _ver: 1
                                }
                            ],
                            wf: {
                                _value: 1000007
                            },
                            app: null
                        }
                    ]
                });

            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.UNSUPPORTED_ACTOR);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('パラメータ異常：condition.appが設定されていない', async () => {
            operatorService = new StubOperatorServer(200);
            catalogService = new StubCatalogServerGetBook(200);
            const response = await supertest(expressApp)
                .post(Url.bookURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    type: 'event',
                    identifier: [
                        'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6'
                    ],
                    updatedAt: {
                        start: '2020-01-01T00:00:00.000+0900',
                        end: '2021-03-01T00:00:00.000+0900'
                    },
                    condition: [
                        {
                            actor: {
                                _value: 1000004
                            },
                            _code: [
                                {
                                    _value: 1000008,
                                    _ver: 1
                                }
                            ],
                            app: null,
                            wf: null
                        }
                    ]
                });

            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.REQUIRE_APP_OR_WF_CODE);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常：条件あり', async () => {
            // データ準備
            await common.executeSqlString(`
                INSERT INTO pxr_book_manage.user_id_cooperate
                (
                    book_id,
                    actor_catalog_code, actor_catalog_version,
                    app_catalog_code, app_catalog_version,
                    wf_catalog_code, wf_catalog_version,
                    user_id,
                    is_disabled,
                    created_by,
                    created_at,
                    updated_by,
                    updated_at
                )
                VALUES
                (
                    1,
                    1000004,1,
                    1000007,1,
                    null,null,
                    'userid01',
                    false,
                    'pxr_user',
                    NOW(),
                    'pxr_user',
                    NOW()
                )
            `);
            operatorService = new StubOperatorServer(200);
            catalogService = new StubCatalogServerGetBook(200);
            proxyService = new StubProxyBookServer(200);
            const response = await supertest(expressApp)
                .post(Url.bookURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    type: 'event',
                    identifier: [
                        'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6'
                    ],
                    updatedAt: {
                        start: '2020-01-01T00:00:00.000+0900',
                        end: '2021-03-01T00:00:00.000+0900'
                    },
                    condition: [
                        {
                            actor: {
                                _value: 1000004
                            },
                            _code: [
                                {
                                    _value: 1000008,
                                    _ver: 1
                                }
                            ],
                            app: {
                                _value: 1000007
                            },
                            wf: null
                        }
                    ]
                });
            try {
                expect(response.status).toBe(200);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常：条件なし', async () => {
            operatorService = new StubOperatorServer(200, '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00');
            catalogService = new StubCatalogServerGetBook(200);
            proxyService = new StubProxyBookServer(200);
            const response = await supertest(expressApp)
                .post(Url.bookURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send({
                    type: 'event',
                    identifier: null,
                    updatedAt: null,
                    condition: null
                });
            try {
                expect(response.status).toBe(200);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：条件あり 利用者連携情報なし', async () => {
            operatorService = new StubOperatorServer(200);
            catalogService = new StubCatalogServerGetBook(200);
            proxyService = new StubProxyBookServer(200);
            const response = await supertest(expressApp)
                .post(Url.bookURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    type: 'event',
                    identifier: [
                        'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6'
                    ],
                    updatedAt: {
                        start: '2020-01-01T00:00:00.000+0900',
                        end: '2021-03-01T00:00:00.000+0900'
                    },
                    condition: [
                        {
                            actor: {
                                _value: 1000004
                            },
                            _code: [
                                {
                                    _value: 1000008,
                                    _ver: 1
                                }
                            ],
                            app: {
                                _value: 1000097
                            },
                            wf: null
                        }
                    ]
                });
            try {
                expect(response.status).toBe(204);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：条件あり アクターカタログ不正', async () => {
            operatorService = new StubOperatorServer(200);
            catalogService = new StubCatalogServerGetBook(200);
            proxyService = new StubProxyBookServer(200);
            const response = await supertest(expressApp)
                .post(Url.bookURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.bookCloseInvalidActor) })
                .send({
                    type: 'event',
                    identifier: [
                        'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6'
                    ],
                    updatedAt: {
                        start: '2020-01-01T00:00:00.000+0900',
                        end: '2021-03-01T00:00:00.000+0900'
                    },
                    condition: [
                        {
                            actor: {
                                _value: 2000002
                            },
                            _code: [
                                {
                                    _value: 1000008,
                                    _ver: 1
                                }
                            ],
                            wf: null,
                            app: {
                                _value: 1000005
                            }
                        }
                    ]
                });
            try {
                expect(response.status).toBe(500);
                expect(response.body.message).toBe(Message.FAILED_LINKAGE);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：条件なし アクターカタログ不正', async () => {
            operatorService = new StubOperatorServer(200);
            catalogService = new StubCatalogServerGetBook(200);
            proxyService = new StubProxyBookServer(200);
            const response = await supertest(expressApp)
                .post(Url.bookURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.bookCloseInvalidActor) })
                .send({
                    type: 'event',
                    identifier: null,
                    updatedAt: null,
                    condition: null
                });
            try {
                expect(response.status).toBe(500);
                expect(response.body.message).toBe(Message.FAILED_LINKAGE);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：Cookieが存在するが空', async () => {
            // スタブサーバー起動
            operatorService = new StubOperatorServer(200);

            // 送信データを生成
            const url = Url.bookURI;

            // 対象APIに送信
            const response = await supertest(expressApp).post(url)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + ''])
                .send({
                    type: 'event',
                    identifier: null,
                    updatedAt: null,
                    condition: null
                });
            try {
                expect(response.status).toBe(401);
                expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：Cookie使用、オペレータサービス応答204', async () => {
            operatorService = new StubOperatorServer(204, '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00');
            const response = await supertest(expressApp)
                .post(Url.bookURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send({
                    type: 'event',
                    identifier: null,
                    updatedAt: null,
                    condition: null
                });
            try {
                expect(response.status).toBe(401);
                expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：Cookie使用、オペレータサービス応答400系', async () => {
            operatorService = new StubOperatorServer(400, '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00');
            const response = await supertest(expressApp)
                .post(Url.bookURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send({
                    type: 'event',
                    identifier: null,
                    updatedAt: null,
                    condition: null
                });
            try {
                expect(response.status).toBe(401);
                expect(response.body.message).toBe(Message.NOT_AUTHORIZED);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：Cookie使用、オペレータサービス応答500系', async () => {
            operatorService = new StubOperatorServer(500, '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00');
            const response = await supertest(expressApp)
                .post(Url.bookURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send({
                    type: 'event',
                    identifier: null,
                    updatedAt: null,
                    condition: null
                });
            try {
                expect(response.status).toBe(500);
                expect(response.body.message).toBe(Message.FAILED_TAKE_SESSION);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：Cookie使用、オペレータサービス未起動', async () => {
            const response = await supertest(expressApp)
                .post(Url.bookURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type0_session=' + '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00'])
                .send({
                    type: 'event',
                    identifier: null,
                    updatedAt: null,
                    condition: null
                });
            try {
                expect(response.status).toBe(500);
                expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
    });
});
