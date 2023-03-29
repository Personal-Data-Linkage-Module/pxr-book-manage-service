/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Application } from '../resources/config/Application';
import supertest = require('supertest');
import { CatalogService, OperatorService } from './16-00.StubServer';
import Common, { Url } from './Common';
import { Session } from './Session';
import urljoin = require('url-join');
import Config from '../common/Config';
import { StubOperatorServiceUserInfoService } from './StubOperatorServer';
import Operator from 'resources/dto/OperatorReqDto';
/* eslint-enable */
const Message = Config.ReadConfig('./config/message.json');

const app = new Application();
const expressApp = app.express.app;
const common = new Common();
app.start();

let operatorService: any = null;
const catalogService = new CatalogService();

/**
 * book-mange API のユニットテスト
 */
describe('book-mange API', () => {
    beforeAll(async () => {
        await common.connect();
        await common.executeSqlFile('initialData.sql');
        await common.executeSqlFile('initialDataUserInfo.sql');
        await catalogService.start();
    });
    afterAll(async () => {
        app.stop();
        await catalogService.stop();
    });
    afterEach(async () => {
        if (operatorService) {
            operatorService._server.close();
            operatorService = null;
        }
    });

    /**
     * 利用者管理情報による個人の特定API
     */
    describe('利用者管理情報による個人の特定API', () => {
        test('異常：リクエストが空', async () => {
            operatorService = new StubOperatorServiceUserInfoService(200, 0);
            const response = await supertest(expressApp)
                .post(Url.userInfoSearchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.getUserInfo) });

            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.REQUEST_IS_EMPTY);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：該当データなし', async () => {
            operatorService = new StubOperatorServiceUserInfoService(200, 0);
            const response = await supertest(expressApp)
                .post(Url.userInfoSearchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.getUserInfo) })
                .send({
                    condition: [
                        {
                            type: {
                                _value: 1,
                                _ver: 1
                            },
                            target: {
                                _value: 1,
                                _ver: 1
                            },
                            min: 1,
                            max: 10
                        }
                    ],
                    min: 1,
                    max: 10
                });

            try {
                expect(response.status).toBe(200);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常：データあり', async () => {
            operatorService = new StubOperatorServiceUserInfoService(200, 0);
            const response = await supertest(expressApp)
                .post(Url.userInfoSearchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.getUserInfo) })
                .send({
                    condition: [
                        {
                            type: {
                                _value: 1,
                                _ver: 1
                            },
                            target: {
                                _value: 1,
                                _ver: 1
                            },
                            min: 1,
                            max: 10
                        }
                    ],
                    min: 1,
                    max: 10
                });
            try {
                expect(response.status).toBe(200);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：PXR-ID取得時400応答', async () => {
            operatorService = new StubOperatorServiceUserInfoService(400, 0);
            const response = await supertest(expressApp)
                .post(Url.userInfoSearchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.getUserInfo) })
                .send([{
                    condition: [
                        {
                            type: {
                                _value: 1,
                                _ver: 1
                            },
                            target: {
                                _value: 1,
                                _ver: 1
                            },
                            min: 1,
                            max: 10
                        }
                    ],
                    min: 1,
                    max: 10
                }]);
            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.FAILED_GET_USER_INFORMATION);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：PXR-ID取得時500応答', async () => {
            operatorService = new StubOperatorServiceUserInfoService(500, 0);
            const response = await supertest(expressApp)
                .post(Url.userInfoSearchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.getUserInfo) })
                .send([{
                    condition: [
                        {
                            type: {
                                _value: 1,
                                _ver: 1
                            },
                            target: {
                                _value: 1,
                                _ver: 1
                            },
                            min: 1,
                            max: 10
                        }
                    ],
                    min: 1,
                    max: 10
                }]);
            try {
                expect(response.status).toBe(503);
                expect(response.body.message).toBe(Message.FAILED_GET_USER_INFORMATION);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：PXR-ID取得時200以外応答', async () => {
            operatorService = new StubOperatorServiceUserInfoService(401, 0);
            const response = await supertest(expressApp)
                .post(Url.userInfoSearchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.getUserInfo) })
                .send([{
                    condition: [
                        {
                            type: {
                                _value: 1,
                                _ver: 1
                            },
                            target: {
                                _value: 1,
                                _ver: 1
                            },
                            min: 1,
                            max: 10
                        }
                    ],
                    min: 1,
                    max: 10
                }]);
            try {
                expect(response.status).toBe(401);
                expect(response.body.message).toBe(Message.FAILED_GET_USER_INFORMATION);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常：PXR-ID取得時204応答', async () => {
            operatorService = new StubOperatorServiceUserInfoService(204, 0);
            const response = await supertest(expressApp)
                .post(Url.userInfoSearchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.getUserInfo) })
                .send([{
                    condition: [
                        {
                            type: {
                                _value: 1,
                                _ver: 1
                            },
                            target: {
                                _value: 1,
                                _ver: 1
                            },
                            min: 1,
                            max: 10
                        }
                    ],
                    min: 1,
                    max: 10
                }]);
            try {
                expect(response.status).toBe(503);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：PXR-ID取得時サービス未起動', async () => {
            const response = await supertest(expressApp)
                .post(Url.userInfoSearchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.getUserInfo) })
                .send([{
                    condition: [
                        {
                            type: {
                                _value: 1,
                                _ver: 1
                            },
                            target: {
                                _value: 1,
                                _ver: 1
                            },
                            min: 1,
                            max: 10
                        }
                    ],
                    min: 1,
                    max: 10
                }]);
            try {
                expect(response.status).toBe(503);
                expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：ログインオペレーターアクター不正', async () => {
            operatorService = new StubOperatorServiceUserInfoService(200, 0, 1000431, null);
            const response = await supertest(expressApp)
                .post(Url.userInfoSearchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send([{
                    condition: [
                        {
                            type: {
                                _value: 1,
                                _ver: 1
                            },
                            target: {
                                _value: 1,
                                _ver: 1
                            },
                            min: 1,
                            max: 10
                        }
                    ],
                    min: 1,
                    max: 10
                }]);
            try {
                expect(response.status).toBe(401);
                expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：ログインオペレーターアクターカタログ不正', async () => {
            operatorService = new StubOperatorServiceUserInfoService(200, 0, 1000003, 1);
            const response = await supertest(expressApp)
                .post(Url.userInfoSearchURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set('Cookie', ['operator_type3_session=' + 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296'])
                .send([{
                    condition: [
                        {
                            type: {
                                _value: 1,
                                _ver: 1
                            },
                            target: {
                                _value: 1,
                                _ver: 1
                            },
                            min: 1,
                            max: 10
                        }
                    ],
                    min: 1,
                    max: 10
                }]);
            try {
                expect(response.status).toBe(401);
                expect(response.body.message).toBe(Message.REQUEST_UNAUTORIZED);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
    });

    /**
     * 利用者管理情報の更新API
     */
    describe('利用者管理情報の更新API', () => {
        test('異常：リクエストが空', async () => {
            operatorService = new StubOperatorServiceUserInfoService(200, 0);
            const response = await supertest(expressApp)
                .post(Url.userInfoURI)
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
        test('正常：更新', async () => {
            operatorService = new StubOperatorServiceUserInfoService(200, 0);
            const response = await supertest(expressApp)
                .post(Url.userInfoURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    pxrId: 'dummy.test.org',
                    userInfo: {
                        _code: {
                            _value: 1000373,
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
                                title: '生年（西暦）',
                                item: [
                                    {
                                        title: '生年（西暦）',
                                        type: {
                                            _value: 1000372,
                                            _ver: 1
                                        },
                                        content: 2000
                                    }
                                ]
                            },
                            {
                                title: '住所（行政区）',
                                item: [
                                    {
                                        title: '住所（行政区）',
                                        type: {
                                            _value: 1000371,
                                            _ver: 1
                                        },
                                        content: '東京都港区'
                                    }
                                ]
                            },
                            {
                                title: '連絡先電話番号',
                                item: [
                                    {
                                        title: '連絡先電話番号',
                                        type: {
                                            _value: 30036,
                                            _ver: 1
                                        },
                                        content: '080-0000-0000',
                                        'changable-flag': true
                                    }
                                ]
                            }
                        ]
                    }
                });

            try {
                expect(response.status).toBe(200);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：更新対象Bookなし', async () => {
            operatorService = new StubOperatorServiceUserInfoService(200, 0);
            const response = await supertest(expressApp)
                .post(Url.userInfoURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    pxrId: 'not.found.book',
                    userInfo: {
                        _code: {
                            _value: 1000373,
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
                                title: '生年（西暦）',
                                item: [
                                    {
                                        title: '生年（西暦）',
                                        type: {
                                            _value: 1000372,
                                            _ver: 1
                                        },
                                        content: 2000
                                    }
                                ]
                            },
                            {
                                title: '住所（行政区）',
                                item: [
                                    {
                                        title: '住所（行政区）',
                                        type: {
                                            _value: 1000371,
                                            _ver: 1
                                        },
                                        content: '東京都港区'
                                    }
                                ]
                            },
                            {
                                title: '連絡先電話番号',
                                item: [
                                    {
                                        title: '連絡先電話番号',
                                        type: {
                                            _value: 30036,
                                            _ver: 1
                                        },
                                        content: '080-0000-0000',
                                        'changable-flag': true
                                    }
                                ]
                            }
                        ]
                    }
                });

            try {
                expect(response.status).toBe(404);
                expect(response.body.message).toBe(Message.TARGET_NO_DATA);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：利用者情報登録時400応答', async () => {
            operatorService = new StubOperatorServiceUserInfoService(400, 0);
            const response = await supertest(expressApp)
                .post(Url.userInfoURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    pxrId: 'dummy.test.org',
                    userInfo: {
                        _code: {
                            _value: 1000373,
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
                                title: '生年（西暦）',
                                item: [
                                    {
                                        title: '生年（西暦）',
                                        type: {
                                            _value: 1000372,
                                            _ver: 1
                                        },
                                        content: 2000
                                    }
                                ]
                            },
                            {
                                title: '住所（行政区）',
                                item: [
                                    {
                                        title: '住所（行政区）',
                                        type: {
                                            _value: 1000371,
                                            _ver: 1
                                        },
                                        content: '東京都港区'
                                    }
                                ]
                            },
                            {
                                title: '連絡先電話番号',
                                item: [
                                    {
                                        title: '連絡先電話番号',
                                        type: {
                                            _value: 30036,
                                            _ver: 1
                                        },
                                        content: '080-0000-0000',
                                        'changable-flag': true
                                    }
                                ]
                            }
                        ]
                    }
                });

            try {
                expect(response.status).toBe(400);
                expect(response.body.message).toBe(Message.FAILED_GET_USER_INFORMATION);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：利用者情報登録時500応答', async () => {
            operatorService = new StubOperatorServiceUserInfoService(500, 0);
            const response = await supertest(expressApp)
                .post(Url.userInfoURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    pxrId: 'dummy.test.org',
                    userInfo: {
                        _code: {
                            _value: 1000373,
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
                                title: '生年（西暦）',
                                item: [
                                    {
                                        title: '生年（西暦）',
                                        type: {
                                            _value: 1000372,
                                            _ver: 1
                                        },
                                        content: 2000
                                    }
                                ]
                            },
                            {
                                title: '住所（行政区）',
                                item: [
                                    {
                                        title: '住所（行政区）',
                                        type: {
                                            _value: 1000371,
                                            _ver: 1
                                        },
                                        content: '東京都港区'
                                    }
                                ]
                            },
                            {
                                title: '連絡先電話番号',
                                item: [
                                    {
                                        title: '連絡先電話番号',
                                        type: {
                                            _value: 30036,
                                            _ver: 1
                                        },
                                        content: '080-0000-0000',
                                        'changable-flag': true
                                    }
                                ]
                            }
                        ]
                    }
                });

            try {
                expect(response.status).toBe(503);
                expect(response.body.message).toBe(Message.FAILED_GET_USER_INFORMATION);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('正常：利用者情報登録時204応答', async () => {
            operatorService = new StubOperatorServiceUserInfoService(204, 0);
            const response = await supertest(expressApp)
                .post(Url.userInfoURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    pxrId: 'dummy.test.org',
                    userInfo: {
                        _code: {
                            _value: 1000373,
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
                                title: '生年（西暦）',
                                item: [
                                    {
                                        title: '生年（西暦）',
                                        type: {
                                            _value: 1000372,
                                            _ver: 1
                                        },
                                        content: 2000
                                    }
                                ]
                            },
                            {
                                title: '住所（行政区）',
                                item: [
                                    {
                                        title: '住所（行政区）',
                                        type: {
                                            _value: 1000371,
                                            _ver: 1
                                        },
                                        content: '東京都港区'
                                    }
                                ]
                            },
                            {
                                title: '連絡先電話番号',
                                item: [
                                    {
                                        title: '連絡先電話番号',
                                        type: {
                                            _value: 30036,
                                            _ver: 1
                                        },
                                        content: '080-0000-0000',
                                        'changable-flag': true
                                    }
                                ]
                            }
                        ]
                    }
                });

            try {
                expect(response.status).toBe(200);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：利用者情報登録時200以外応答', async () => {
            operatorService = new StubOperatorServiceUserInfoService(401, 0);
            const response = await supertest(expressApp)
                .post(Url.userInfoURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    pxrId: 'dummy.test.org',
                    userInfo: {
                        _code: {
                            _value: 1000373,
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
                                title: '生年（西暦）',
                                item: [
                                    {
                                        title: '生年（西暦）',
                                        type: {
                                            _value: 1000372,
                                            _ver: 1
                                        },
                                        content: 2000
                                    }
                                ]
                            },
                            {
                                title: '住所（行政区）',
                                item: [
                                    {
                                        title: '住所（行政区）',
                                        type: {
                                            _value: 1000371,
                                            _ver: 1
                                        },
                                        content: '東京都港区'
                                    }
                                ]
                            },
                            {
                                title: '連絡先電話番号',
                                item: [
                                    {
                                        title: '連絡先電話番号',
                                        type: {
                                            _value: 30036,
                                            _ver: 1
                                        },
                                        content: '080-0000-0000',
                                        'changable-flag': true
                                    }
                                ]
                            }
                        ]
                    }
                });

            try {
                expect(response.status).toBe(401);
                expect(response.body.message).toBe(Message.FAILED_GET_USER_INFORMATION);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
        test('異常：利用者情報登録時サービス未起動', async () => {
            const response = await supertest(expressApp)
                .post(Url.userInfoURI)
                .set({ accept: 'application/json', 'Content-Type': 'application/json' })
                .set({ session: JSON.stringify(Session.pxrRootInd) })
                .send({
                    pxrId: 'dummy.test.org',
                    userInfo: {
                        _code: {
                            _value: 1000373,
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
                                title: '生年（西暦）',
                                item: [
                                    {
                                        title: '生年（西暦）',
                                        type: {
                                            _value: 1000372,
                                            _ver: 1
                                        },
                                        content: 2000
                                    }
                                ]
                            },
                            {
                                title: '住所（行政区）',
                                item: [
                                    {
                                        title: '住所（行政区）',
                                        type: {
                                            _value: 1000371,
                                            _ver: 1
                                        },
                                        content: '東京都港区'
                                    }
                                ]
                            },
                            {
                                title: '連絡先電話番号',
                                item: [
                                    {
                                        title: '連絡先電話番号',
                                        type: {
                                            _value: 30036,
                                            _ver: 1
                                        },
                                        content: '080-0000-0000',
                                        'changable-flag': true
                                    }
                                ]
                            }
                        ]
                    }
                });

            try {
                expect(response.status).toBe(503);
                expect(response.body.message).toBe(Message.FAILED_CONNECT_TO_OPERATOR);
            } catch (err) {
                console.log(response.body);
                throw err;
            }
        });
    });
});
