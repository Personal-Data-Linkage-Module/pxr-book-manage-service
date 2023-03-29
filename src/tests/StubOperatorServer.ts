/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Server } from 'net';
/* eslint-enable */
import * as express from 'express';
import bodyParser = require('body-parser');

/**
 * オペレーターサービス
 */
export default class StubOperatorServer {
    _app: express.Express;
    _server: Server;

    constructor (status: number, sessionId?: string) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status);
            if (sessionId === '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00') {
                res.json({
                    sessionId: 'sessionId',
                    operatorId: 1,
                    type: 0,
                    loginId: 'loginid',
                    name: 'test-user',
                    pxrId: 'dummy.test.org',
                    mobilePhone: '0311112222',
                    auth: {
                        member: {
                            add: true,
                            update: true,
                            delete: true
                        }
                    },
                    lastLoginAt: '2020-01-01T00:00:00.000+0900',
                    attributes: {},
                    roles: [
                        {
                            _value: 1,
                            _ver: 1
                        }
                    ],
                    block: {
                        _value: 1000110,
                        _ver: 1
                    },
                    actor: {
                        _value: 1000001,
                        _ver: 1
                    }
                });
            }
            if (sessionId === '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e01') {
                res.json({
                    sessionId: 'sessionId',
                    operatorId: 1,
                    type: 1,
                    loginId: 'loginid',
                    name: 'test-user',
                    mobilePhone: '0311112222',
                    auth: {
                        member: {
                            add: true,
                            update: true,
                            delete: true
                        }
                    },
                    lastLoginAt: '2020-01-01T00:00:00.000+0900',
                    attributes: {},
                    roles: [
                        {
                            _value: 1,
                            _ver: 1
                        }
                    ],
                    block: {
                        _value: 1000110,
                        _ver: 1
                    },
                    actor: {
                        _value: 1000001,
                        _ver: 1
                    }
                });
            }
            if (sessionId === '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e02') {
                res.json({
                    sessionId: 'sessionId',
                    operatorId: 1,
                    type: 2,
                    loginId: 'loginid',
                    name: 'test-user',
                    mobilePhone: '0311112222',
                    auth: {
                        member: {
                            add: true,
                            update: true,
                            delete: true
                        }
                    },
                    lastLoginAt: '2020-01-01T00:00:00.000+0900',
                    attributes: {},
                    roles: [
                        {
                            _value: 1,
                            _ver: 1
                        }
                    ],
                    block: {
                        _value: 1000110,
                        _ver: 1
                    },
                    actor: {
                        _value: 1000001,
                        _ver: 1
                    }
                });
            }
            if (sessionId === '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e03') {
                res.json({
                    sessionId: 'sessionId',
                    operatorId: 1,
                    type: 3,
                    loginId: 'loginid',
                    name: 'test-user',
                    mobilePhone: '0311112222',
                    auth: {
                        member: {
                            add: true,
                            update: true,
                            delete: true
                        }
                    },
                    lastLoginAt: '2020-01-01T00:00:00.000+0900',
                    attributes: {},
                    roles: [
                        {
                            _value: 1,
                            _ver: 1
                        }
                    ],
                    block: {
                        _value: 1000110,
                        _ver: 1
                    },
                    actor: {
                        _value: 1000001,
                        _ver: 1
                    }
                });
            }
            if (sessionId === 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296') {
                // 正常：開示請求承認結果登録
                res.json({
                    sessionId: 'sessionId',
                    operatorId: 1,
                    type: 3,
                    loginId: 'loginid',
                    mobilePhone: '09011112222',
                    lastLoginAt: '2020-01-01T00:00:00.000+0900',
                    attributes: {},
                    block: {
                        _value: 1000110,
                        _ver: 1
                    },
                    actor: {
                        _value: 1002700,
                        _ver: 1
                    }
                });
            }
            if (sessionId === 'f89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296') {
                // 異常：開示請求承認結果登録、個人
                res.json({
                    sessionId: 'sessionId',
                    operatorId: 1,
                    type: 0,
                    loginId: 'loginid',
                    mobilePhone: '09011112222',
                    lastLoginAt: '2020-01-01T00:00:00.000+0900',
                    attributes: {},
                    block: {
                        _value: 1000110,
                        _ver: 1
                    },
                    actor: {
                        _value: 1002700,
                        _ver: 1
                    }
                });
            }
            if (sessionId === 'g89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296') {
                // 異常：開示請求承認結果登録、ワークフロー
                res.json({
                    sessionId: 'sessionId',
                    operatorId: 1,
                    type: 1,
                    loginId: 'loginid',
                    mobilePhone: '09011112222',
                    lastLoginAt: '2020-01-01T00:00:00.000+0900',
                    attributes: {},
                    block: {
                        _value: 1000110,
                        _ver: 1
                    },
                    actor: {
                        _value: 1002700,
                        _ver: 1
                    }
                });
            }
            if (sessionId === 'h89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296') {
                // 異常：開示請求承認結果登録、アプリケーション
                res.json({
                    sessionId: 'sessionId',
                    operatorId: 1,
                    type: 2,
                    loginId: 'loginid',
                    mobilePhone: '09011112222',
                    lastLoginAt: '2020-01-01T00:00:00.000+0900',
                    attributes: {},
                    block: {
                        _value: 1000110,
                        _ver: 1
                    },
                    actor: {
                        _value: 1002700,
                        _ver: 1
                    }
                });
            }
            if (sessionId === 'e89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296') {
                // 正常：変更請求承認結果登録
                res.json({
                    sessionId: 'sessionId',
                    operatorId: 1,
                    type: 0,
                    loginId: 'loginid',
                    name: 'test-user',
                    pxrId: '58di2dfse2.test.org',
                    mobilePhone: '09011112222',
                    lastLoginAt: '2020-01-01T00:00:00.000+0900',
                    attributes: {},
                    block: {
                        _value: 1000110,
                        _ver: 1
                    },
                    actor: {
                        _value: 1002700,
                        _ver: 1
                    }
                });
            }
            if (sessionId === 'e89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b291') {
                // 異常：ワークフロー
                res.json({
                    sessionId: 'sessionId',
                    operatorId: 1,
                    type: 1,
                    loginId: 'loginid',
                    name: 'test-user',
                    pxrId: '58di2dfse2.test.org',
                    mobilePhone: '09011112222',
                    lastLoginAt: '2020-01-01T00:00:00.000+0900',
                    attributes: {},
                    block: {
                        _value: 1000110,
                        _ver: 1
                    },
                    actor: {
                        _value: 1002700,
                        _ver: 1
                    }
                });
            }
            if (sessionId === 'e89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b292') {
                // 異常：アプリケーション
                res.json({
                    sessionId: 'sessionId',
                    operatorId: 1,
                    type: 2,
                    loginId: 'loginid',
                    name: 'test-user',
                    pxrId: '58di2dfse2.test.org',
                    mobilePhone: '09011112222',
                    lastLoginAt: '2020-01-01T00:00:00.000+0900',
                    attributes: {},
                    block: {
                        _value: 1000110,
                        _ver: 1
                    },
                    actor: {
                        _value: 1002700,
                        _ver: 1
                    }
                });
            }
            if (sessionId === 'e89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b293') {
                // 異常：運営メンバー
                res.json({
                    sessionId: 'sessionId',
                    operatorId: 1,
                    type: 3,
                    loginId: '58di2dfse2.test.org',
                    name: 'test-user',
                    pxrId: '58di2dfse2.test.org',
                    mobilePhone: '09011112222',
                    lastLoginAt: '2020-01-01T00:00:00.000+0900',
                    attributes: {},
                    block: {
                        _value: 1000110,
                        _ver: 1
                    },
                    actor: {
                        _value: 1002700,
                        _ver: 1
                    }
                });
            }

            res.end();
        };

        // イベントハンドラー
        const _listener2 = (req: express.Request, res: express.Response) => {
            const pxrId = req.query['pxrId'];
            res.status(status);
            if ((pxrId === '58di2dfse2.test.org') || (pxrId === '12ec2dfdv1.test.org')) {
                res.json({
                    pxrId: pxrId,
                    userInfo: {
                        id: 1,
                        type: 0,
                        loginId: 'loginid',
                        hpassword: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
                        pxrId: '58di2dfse2.test.org',
                        userInformation: null,
                        name: null,
                        mobilePhone: '09011112222',
                        mail: null,
                        auth: '{"member":{"add":true,"update":true,"delete":true},"actor":{"application":true,"approval":true},"book":{"create":true},"catalog":{"create":true},"setting":{"update":true}}',
                        lastLoginAt: null,
                        passwordChangeFlg: false,
                        loginProhibitedFlg: false,
                        attributes: '{"initialPasswordExpire":"2020-03-01T12:00:00.000+9:00","smsAuth":false}',
                        lockFlg: false,
                        lockStartAt: null,
                        passwordUpdateAt: '2020-07-08T14:08:10.068+0900',
                        isDisabled: false,
                        createdBy: 'loginId',
                        createdAt: '2020-07-08T14:08:10.068+0900',
                        updatedBy: 'loginId',
                        updatedAt: '2020-07-08T14:08:10.068+0900'
                    }
                });
            } else if (pxrId === '58di2dfse2.test.org2') {
                res.json({
                    pxrId: pxrId,
                    userInfo: null
                });
            }
            res.end();
        };

        // イベントハンドラー
        const _listener3 = (req: express.Request, res: express.Response) => {
            const pxrIdList = req.body['pxrId'] || null;
            res.status(status);
            const response: any[] = [];
            for (const pxrId of pxrIdList) {
                if ((pxrId === '58di2dfse2.test.org') || (pxrId === '12ec2dfdv1.test.org')) {
                    response.push({
                        pxrId: pxrId,
                        userInfo: {
                            id: 1,
                            type: 0,
                            loginId: 'loginid',
                            hpassword: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
                            pxrId: '58di2dfse2.test.org',
                            userInformation: null,
                            name: null,
                            mobilePhone: '09011112222',
                            mail: null,
                            auth: '{"member":{"add":true,"update":true,"delete":true},"actor":{"application":true,"approval":true},"book":{"create":true},"catalog":{"create":true},"setting":{"update":true}}',
                            lastLoginAt: null,
                            passwordChangeFlg: false,
                            loginProhibitedFlg: false,
                            attributes: '{"initialPasswordExpire":"2020-03-01T12:00:00.000+9:00","smsAuth":false}',
                            lockFlg: false,
                            lockStartAt: null,
                            passwordUpdateAt: '2020-07-08T14:08:10.068+0900',
                            isDisabled: false,
                            createdBy: 'loginId',
                            createdAt: '2020-07-08T14:08:10.068+0900',
                            updatedBy: 'loginId',
                            updatedAt: '2020-07-08T14:08:10.068+0900'
                        }
                    });
                } else if (pxrId === '58di2dfse2.test.org2') {
                    response.push({
                        pxrId: pxrId,
                        userInfo: null
                    });
                }
            }
            res.json(response);
            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.use(bodyParser.json());
        this._app.post('/operator/session', _listener);
        this._app.get('/operator/user/info', _listener2);
        this._app.post('/operator/user/info/list', _listener3);
        this._server = this._app.listen(3000);
    }
}

/**
 * オペレーターサービス
 */
export class StubOperatorServerType0 {
    _app: express.Express;
    _server: Server;

    constructor (status: number, type: number) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status);
            res.json({
                sessionId: 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296',
                operatorId: 2,
                type: type,
                loginId: '58di2dfse2.test.org',
                pxrId: '58di2dfse2.test.org',
                mobilePhone: '09011112222',
                lastLoginAt: '2020-01-01T00:00:00.000+0900',
                attributes: {},
                block: {
                    _value: 1000110,
                    _ver: 1
                },
                actor: {
                    _value: 1000001,
                    _ver: 1
                }
            });
            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.post('/operator/session', _listener);
        this._server = this._app.listen(3000);
    }
}

/**
 * オペレーターサービス
 */
export class StubOperatorServer06 {
    _app: express.Express;
    _server: Server;

    constructor (status: number, type: number, actor: number) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status);
            res.json({
                sessionId: 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296',
                operatorId: 2,
                type: type,
                loginId: '58di2dfse2.test.org',
                pxrId: '58di2dfse2.test.org',
                mobilePhone: '09011112222',
                lastLoginAt: '2020-01-01T00:00:00.000+0900',
                attributes: {},
                block: {
                    _value: 1000110,
                    _ver: 1
                },
                actor: {
                    _value: actor,
                    _ver: 1
                }
            });
            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.post('/operator/session', _listener);
        this._server = this._app.listen(3000);
    }
}

/**
 * オペレーターサービス
 */
export class StubOperatorServerBookClose {
    _app: express.Express;
    _server: Server;

    constructor (status: number, deleteStatus: number, operatorId: number, type: number, actor: number) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status);
            res.json({
                sessionId: 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296',
                operatorId: operatorId,
                type: type,
                loginId: '58di2dfse2.test.org',
                pxrId: '58di2dfse2.test.org',
                mobilePhone: '09011112222',
                lastLoginAt: '2020-01-01T00:00:00.000+0900',
                attributes: {},
                block: {
                    _value: 1000110,
                    _ver: 1
                },
                actor: {
                    _value: actor,
                    _ver: 1
                }
            });
            res.end();
        };

        const _listener2 = (req: express.Request, res: express.Response) => {
            res.status(status);
            res.json({
                sessionId: 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296',
                operatorId: operatorId,
                type: type,
                loginId: '58di2dfse2.test.org',
                pxrId: '58di2dfse2.test.org',
                mobilePhone: '09011112222',
                lastLoginAt: '2020-01-01T00:00:00.000+0900',
                attributes: {},
                block: {
                    _value: 1000110,
                    _ver: 1
                },
                actor: {
                    _value: actor,
                    _ver: 1
                }
            });
            res.end();
        };

        const _listener3 = (req: express.Request, res: express.Response) => {
            const operatorId2 = Number(req.params.operatorId);
            if (deleteStatus === 503) {
                throw new Error('オペレーターサービスへの接続に失敗しました');
            }
            res.status(deleteStatus);
            res.json({
                operatorId: operatorId2
            });
            res.end();
        };

        const _listener4 = (req: express.Request, res: express.Response) => {
            const operatorId = Number(req.params.operatorId);
            res.status(deleteStatus);
            if (deleteStatus === 200) {
                res.json({
                    operatorId: operatorId
                });
            }
            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.get('/operator', _listener);
        this._app.post('/operator/session', _listener2);
        this._app.delete('/operator/:operatorId', _listener3);
        this._app.put('/operator/cancelDelete/:operatorId', _listener4);
        this._server = this._app.listen(3000);
    }
}

/**
 * オペレーターサービス(ログインコード再作成)
 */
export class StubOperatorServerLoginCode {
    _app: express.Express;
    _server: Server;

    constructor (status: number, status2: number, type: number, create: boolean, mobilePhone: string = '09011112222') {
        this._app = express();
        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status);
            /*
            res.json({
                sessionId: 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296',
                operatorId: type
            });
            */
            res.json({
                sessionId: 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296',
                operatorId: type,
                type: 3,
                auth: {
                    book: {
                        create: false
                    }
                },
                loginId: '58di2dfse2.test.org',
                pxrId: '58di2dfse2.test.org',
                mobilePhone: mobilePhone,
                lastLoginAt: '2020-01-01T00:00:00.000+0900',
                attributes: {},
                block: {
                    _value: 1000110,
                    _ver: 1
                },
                actor: {
                    _value: 1000001,
                    _ver: 1
                }
            });
            res.end();
        };

        const _listener2 = (req: express.Request, res: express.Response) => {
            res.status(status);
            res.json({
                sessionId: 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296',
                operatorId: 1,
                type: type,
                auth: {
                    book: {
                        create: create
                    }
                },
                loginId: '58di2dfse2.test.org',
                pxrId: '58di2dfse2.test.org',
                mobilePhone: '09011112222',
                lastLoginAt: '2020-01-01T00:00:00.000+0900',
                attributes: {},
                block: {
                    _value: 1000110,
                    _ver: 1
                },
                actor: {
                    _value: 1000001,
                    _ver: 1
                }
            });
            res.end();
        };

        const _listener3 = (req: express.Request, res: express.Response) => {
            res.status(status2);
            res.json({
                result: 'ok'
            });
            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.get('/operator', _listener);
        this._app.post('/operator/session', _listener2);
        this._app.put('/operator/password/:operatorId', _listener3);
        this._server = this._app.listen(3000);
    }
}

/**
 * オペレーターサービス
 */
export class StubOperatorService {
    _app: express.Express;
    _server: Server;

    constructor (status: number, type: number, block: number, actor: number) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status);
            res.json({
                sessionId: 'sessionId',
                operatorId: 1,
                type: type,
                loginId: 'test_loginId',
                name: 'test-user',
                pxrId: 'test01.test.org',
                mobilePhone: '0311112222',
                auth: {
                    member: {
                        add: true,
                        update: true,
                        delete: true
                    }
                },
                lastLoginAt: '2020-01-01T00:00:00.000+0900',
                attributes: {},
                roles: [
                    {
                        _value: 1,
                        _ver: 1
                    }
                ],
                block: {
                    _value: block,
                    _ver: 1
                },
                actor: {
                    _value: actor,
                    _ver: 1
                }
            });

            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.post('/operator/session', _listener);
        this._server = this._app.listen(3000);
    }
}

/**
 * オペレーターサービス
 */
export class StubOperatorServerBookForceDelete {
    _app: express.Express;
    _server: Server;

    constructor (status: number, deleteStatus: number, updateStatus: number, operatorId: number, type: number, actor: number) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status);
            res.json({
                sessionId: 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296',
                operatorId: operatorId,
                type: type,
                loginId: '58di2dfse2.test.org',
                pxrId: '58di2dfse2.test.org',
                mobilePhone: '09011112222',
                lastLoginAt: '2020-01-01T00:00:00.000+0900',
                attributes: {},
                block: {
                    _value: 1000110,
                    _ver: 1
                },
                actor: {
                    _value: actor,
                    _ver: 1
                }
            });
            res.end();
        };

        const _listener2 = (req: express.Request, res: express.Response) => {
            res.status(status);
            res.json({
                sessionId: 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296',
                operatorId: operatorId,
                type: type,
                loginId: '58di2dfse2.test.org',
                pxrId: '58di2dfse2.test.org',
                mobilePhone: '09011112222',
                lastLoginAt: '2020-01-01T00:00:00.000+0900',
                attributes: {},
                block: {
                    _value: 1000110,
                    _ver: 1
                },
                actor: {
                    _value: actor,
                    _ver: 1
                }
            });
            res.end();
        };

        const _listener3 = (req: express.Request, res: express.Response) => {
            const operatorId2 = Number(req.params.operatorId);
            if (deleteStatus === 503) {
                throw new Error('オペレーターサービスへの接続に失敗しました');
            }
            res.status(deleteStatus);
            res.json({
                operatorId: operatorId2
            });
            res.end();
            if (!updateStatus) {
                this._server.close();
            }
        };

        const _listener4 = (req: express.Request, res: express.Response) => {
            const operatorId = Number(req.params.operatorId);
            res.status(updateStatus);
            if (updateStatus === 200) {
                res.json({
                    operatorId: operatorId
                });
            }
            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.get('/operator', _listener);
        this._app.post('/operator/session', _listener2);
        this._app.delete('/operator/:operatorId', _listener3);
        this._app.put('/operator/cancelDelete/:operatorId', _listener4);
        this._server = this._app.listen(3000);
    }
}

/**
 * オペレーターサービス
 */
export class StubOperatorServerBookSearch {
    _app: express.Express;
    _server: Server;

    constructor (status: number, sessionId?: string) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status);
            if (sessionId === '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00') {
                res.json({
                    sessionId: 'sessionId',
                    operatorId: 1,
                    type: 0,
                    loginId: 'loginid',
                    name: 'test-user',
                    pxrId: 'dummy.test.org',
                    mobilePhone: '0311112222',
                    auth: {
                        member: {
                            add: true,
                            update: true,
                            delete: true
                        }
                    },
                    lastLoginAt: '2020-01-01T00:00:00.000+0900',
                    attributes: {},
                    roles: [
                        {
                            _value: 1,
                            _ver: 1
                        }
                    ],
                    block: {
                        _value: 1000110,
                        _ver: 1
                    },
                    actor: {
                        _value: 1000001,
                        _ver: 1
                    }
                });
            }
            if (sessionId === '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e01') {
                res.json({
                    sessionId: 'sessionId',
                    operatorId: 1,
                    type: 1,
                    loginId: 'loginid',
                    name: 'test-user',
                    mobilePhone: '0311112222',
                    auth: {
                        member: {
                            add: true,
                            update: true,
                            delete: true
                        }
                    },
                    lastLoginAt: '2020-01-01T00:00:00.000+0900',
                    attributes: {},
                    roles: [
                        {
                            _value: 1,
                            _ver: 1
                        }
                    ],
                    block: {
                        _value: 1000110,
                        _ver: 1
                    },
                    actor: {
                        _value: 1000001,
                        _ver: 1
                    }
                });
            }
            if (sessionId === '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e02') {
                res.json({
                    sessionId: 'sessionId',
                    operatorId: 1,
                    type: 2,
                    loginId: 'loginid',
                    name: 'test-user',
                    mobilePhone: '0311112222',
                    auth: {
                        member: {
                            add: true,
                            update: true,
                            delete: true
                        }
                    },
                    lastLoginAt: '2020-01-01T00:00:00.000+0900',
                    attributes: {},
                    roles: [
                        {
                            _value: 1,
                            _ver: 1
                        }
                    ],
                    block: {
                        _value: 1000110,
                        _ver: 1
                    },
                    actor: {
                        _value: 1000001,
                        _ver: 1
                    }
                });
            }
            if (sessionId === '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e03') {
                res.json({
                    sessionId: 'sessionId',
                    operatorId: 1,
                    type: 3,
                    loginId: 'loginid',
                    name: 'test-user',
                    mobilePhone: '0311112222',
                    auth: {
                        member: {
                            add: true,
                            update: true,
                            delete: true
                        }
                    },
                    lastLoginAt: '2020-01-01T00:00:00.000+0900',
                    attributes: {},
                    roles: [
                        {
                            _value: 1,
                            _ver: 1
                        }
                    ],
                    block: {
                        _value: 1000110,
                        _ver: 1
                    },
                    actor: {
                        _value: 1000001,
                        _ver: 1
                    }
                });
            }
            if (sessionId === 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296') {
                // 正常：開示請求承認結果登録
                res.json({
                    sessionId: 'sessionId',
                    operatorId: 1,
                    type: 3,
                    loginId: 'loginid',
                    mobilePhone: '09011112222',
                    lastLoginAt: '2020-01-01T00:00:00.000+0900',
                    attributes: {},
                    block: {
                        _value: 1000110,
                        _ver: 1
                    },
                    actor: {
                        _value: 1002700,
                        _ver: 1
                    }
                });
            }
            if (sessionId === 'f89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296') {
                // 異常：開示請求承認結果登録、個人
                res.json({
                    sessionId: 'sessionId',
                    operatorId: 1,
                    type: 0,
                    loginId: 'loginid',
                    mobilePhone: '09011112222',
                    lastLoginAt: '2020-01-01T00:00:00.000+0900',
                    attributes: {},
                    block: {
                        _value: 1000110,
                        _ver: 1
                    },
                    actor: {
                        _value: 1002700,
                        _ver: 1
                    }
                });
            }
            if (sessionId === 'g89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296') {
                // 異常：開示請求承認結果登録、ワークフロー
                res.json({
                    sessionId: 'sessionId',
                    operatorId: 1,
                    type: 1,
                    loginId: 'loginid',
                    mobilePhone: '09011112222',
                    lastLoginAt: '2020-01-01T00:00:00.000+0900',
                    attributes: {},
                    block: {
                        _value: 1000110,
                        _ver: 1
                    },
                    actor: {
                        _value: 1002700,
                        _ver: 1
                    }
                });
            }
            if (sessionId === 'h89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296') {
                // 異常：開示請求承認結果登録、アプリケーション
                res.json({
                    sessionId: 'sessionId',
                    operatorId: 1,
                    type: 2,
                    loginId: 'loginid',
                    mobilePhone: '09011112222',
                    lastLoginAt: '2020-01-01T00:00:00.000+0900',
                    attributes: {},
                    block: {
                        _value: 1000110,
                        _ver: 1
                    },
                    actor: {
                        _value: 1002700,
                        _ver: 1
                    }
                });
            }
            if (sessionId === 'e89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296') {
                // 正常：変更請求承認結果登録
                res.json({
                    sessionId: 'sessionId',
                    operatorId: 1,
                    type: 0,
                    loginId: 'loginid',
                    name: 'test-user',
                    pxrId: '58di2dfse2.test.org',
                    mobilePhone: '09011112222',
                    lastLoginAt: '2020-01-01T00:00:00.000+0900',
                    attributes: {},
                    block: {
                        _value: 1000110,
                        _ver: 1
                    },
                    actor: {
                        _value: 1002700,
                        _ver: 1
                    }
                });
            }
            if (sessionId === 'e89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b291') {
                // 異常：ワークフロー
                res.json({
                    sessionId: 'sessionId',
                    operatorId: 1,
                    type: 1,
                    loginId: 'loginid',
                    name: 'test-user',
                    pxrId: '58di2dfse2.test.org',
                    mobilePhone: '09011112222',
                    lastLoginAt: '2020-01-01T00:00:00.000+0900',
                    attributes: {},
                    block: {
                        _value: 1000110,
                        _ver: 1
                    },
                    actor: {
                        _value: 1002700,
                        _ver: 1
                    }
                });
            }
            if (sessionId === 'e89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b292') {
                // 異常：アプリケーション
                res.json({
                    sessionId: 'sessionId',
                    operatorId: 1,
                    type: 2,
                    loginId: 'loginid',
                    name: 'test-user',
                    pxrId: '58di2dfse2.test.org',
                    mobilePhone: '09011112222',
                    lastLoginAt: '2020-01-01T00:00:00.000+0900',
                    attributes: {},
                    block: {
                        _value: 1000110,
                        _ver: 1
                    },
                    actor: {
                        _value: 1002700,
                        _ver: 1
                    }
                });
            }
            if (sessionId === 'e89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b293') {
                // 異常：運営メンバー
                res.json({
                    sessionId: 'sessionId',
                    operatorId: 1,
                    type: 3,
                    loginId: '58di2dfse2.test.org',
                    name: 'test-user',
                    pxrId: '58di2dfse2.test.org',
                    mobilePhone: '09011112222',
                    lastLoginAt: '2020-01-01T00:00:00.000+0900',
                    attributes: {},
                    block: {
                        _value: 1000110,
                        _ver: 1
                    },
                    actor: {
                        _value: 1002700,
                        _ver: 1
                    }
                });
            }

            res.end();
        };

        // イベントハンドラー
        const _listener2 = (req: express.Request, res: express.Response) => {
            const pxrId = req.query['pxrId'];
            res.status(status);
            if ((pxrId === 'pxrid.multiple')) {
                res.json({
                    pxrId: pxrId,
                    userInfo: {
                        id: 1,
                        type: 0,
                        loginId: 'loginid',
                        hpassword: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
                        pxrId: 'pxrid.multiple',
                        userInformation: null,
                        name: null,
                        mobilePhone: '09011112222',
                        mail: null,
                        auth: '{"member":{"add":true,"update":true,"delete":true},"actor":{"application":true,"approval":true},"book":{"create":true},"catalog":{"create":true},"setting":{"update":true}}',
                        lastLoginAt: null,
                        passwordChangeFlg: false,
                        loginProhibitedFlg: false,
                        attributes: '{"initialPasswordExpire":"2020-03-01T12:00:00.000+9:00","smsAuth":false}',
                        lockFlg: false,
                        lockStartAt: null,
                        passwordUpdateAt: '2020-07-08T14:08:10.068+0900',
                        isDisabled: false,
                        createdBy: 'loginId',
                        createdAt: '2020-07-08T14:08:10.068+0900',
                        updatedBy: 'loginId',
                        updatedAt: '2020-07-08T14:08:10.068+0900'
                    }
                });
            }
            res.end();
        };

        // イベントハンドラー
        const _listener3 = (req: express.Request, res: express.Response) => {
            const pxrIdList = req.body['pxrId'] || null;
            res.status(status);
            const response: any[] = [];
            for (const pxrId of pxrIdList) {
                if ((pxrId === 'pxrid.multiple')) {
                    response.push({
                        pxrId: pxrId,
                        userInfo: null
                    });
                }
            }
            res.json(response);
            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.use(bodyParser.json());
        this._app.post('/operator/session', _listener);
        this._app.get('/operator/user/info', _listener2);
        this._app.post('/operator/user/info/list', _listener3);
        this._server = this._app.listen(3000);
    }
}

/**
 * オペレーターサービス
 */
export class StubOperatorServerBookSearchUser {
    _app: express.Express;
    _server: Server;

    constructor (status: number, sessionId?: string) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status);
            if (sessionId === '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e00') {
                res.json({
                    sessionId: 'sessionId',
                    operatorId: 1,
                    type: 0,
                    loginId: 'loginid',
                    name: 'test-user',
                    pxrId: 'dummy.test.org',
                    mobilePhone: '0311112222',
                    auth: {
                        member: {
                            add: true,
                            update: true,
                            delete: true
                        }
                    },
                    lastLoginAt: '2020-01-01T00:00:00.000+0900',
                    attributes: {},
                    roles: [
                        {
                            _value: 1,
                            _ver: 1
                        }
                    ],
                    block: {
                        _value: 1000110,
                        _ver: 1
                    },
                    actor: {
                        _value: 1000001,
                        _ver: 1
                    }
                });
            }
            if (sessionId === '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e01') {
                res.json({
                    sessionId: 'sessionId',
                    operatorId: 1,
                    type: 1,
                    loginId: 'loginid',
                    name: 'test-user',
                    mobilePhone: '0311112222',
                    auth: {
                        member: {
                            add: true,
                            update: true,
                            delete: true
                        }
                    },
                    lastLoginAt: '2020-01-01T00:00:00.000+0900',
                    attributes: {},
                    roles: [
                        {
                            _value: 1,
                            _ver: 1
                        }
                    ],
                    block: {
                        _value: 1000110,
                        _ver: 1
                    },
                    actor: {
                        _value: 1000001,
                        _ver: 1
                    }
                });
            }
            if (sessionId === '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e02') {
                res.json({
                    sessionId: 'sessionId',
                    operatorId: 1,
                    type: 2,
                    loginId: 'loginid',
                    name: 'test-user',
                    mobilePhone: '0311112222',
                    auth: {
                        member: {
                            add: true,
                            update: true,
                            delete: true
                        }
                    },
                    lastLoginAt: '2020-01-01T00:00:00.000+0900',
                    attributes: {},
                    roles: [
                        {
                            _value: 1,
                            _ver: 1
                        }
                    ],
                    block: {
                        _value: 1000110,
                        _ver: 1
                    },
                    actor: {
                        _value: 1000001,
                        _ver: 1
                    }
                });
            }
            if (sessionId === '437a5cbc10da802a887f5e057c88fdc64a927332871ad2a987dfcb7d224e7e03') {
                res.json({
                    sessionId: 'sessionId',
                    operatorId: 1,
                    type: 3,
                    loginId: 'loginid',
                    name: 'test-user',
                    mobilePhone: '0311112222',
                    auth: {
                        member: {
                            add: true,
                            update: true,
                            delete: true
                        }
                    },
                    lastLoginAt: '2020-01-01T00:00:00.000+0900',
                    attributes: {},
                    roles: [
                        {
                            _value: 1,
                            _ver: 1
                        }
                    ],
                    block: {
                        _value: 1000110,
                        _ver: 1
                    },
                    actor: {
                        _value: 1000001,
                        _ver: 1
                    }
                });
            }
            if (sessionId === 'd89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296') {
                // 正常：開示請求承認結果登録
                res.json({
                    sessionId: 'sessionId',
                    operatorId: 1,
                    type: 3,
                    loginId: 'loginid',
                    mobilePhone: '09011112222',
                    lastLoginAt: '2020-01-01T00:00:00.000+0900',
                    attributes: {},
                    block: {
                        _value: 1000110,
                        _ver: 1
                    },
                    actor: {
                        _value: 1002700,
                        _ver: 1
                    }
                });
            }
            if (sessionId === 'f89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296') {
                // 異常：開示請求承認結果登録、個人
                res.json({
                    sessionId: 'sessionId',
                    operatorId: 1,
                    type: 0,
                    loginId: 'loginid',
                    mobilePhone: '09011112222',
                    lastLoginAt: '2020-01-01T00:00:00.000+0900',
                    attributes: {},
                    block: {
                        _value: 1000110,
                        _ver: 1
                    },
                    actor: {
                        _value: 1002700,
                        _ver: 1
                    }
                });
            }
            if (sessionId === 'g89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296') {
                // 異常：開示請求承認結果登録、ワークフロー
                res.json({
                    sessionId: 'sessionId',
                    operatorId: 1,
                    type: 1,
                    loginId: 'loginid',
                    mobilePhone: '09011112222',
                    lastLoginAt: '2020-01-01T00:00:00.000+0900',
                    attributes: {},
                    block: {
                        _value: 1000110,
                        _ver: 1
                    },
                    actor: {
                        _value: 1002700,
                        _ver: 1
                    }
                });
            }
            if (sessionId === 'h89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296') {
                // 異常：開示請求承認結果登録、アプリケーション
                res.json({
                    sessionId: 'sessionId',
                    operatorId: 1,
                    type: 2,
                    loginId: 'loginid',
                    mobilePhone: '09011112222',
                    lastLoginAt: '2020-01-01T00:00:00.000+0900',
                    attributes: {},
                    block: {
                        _value: 1000110,
                        _ver: 1
                    },
                    actor: {
                        _value: 1002700,
                        _ver: 1
                    }
                });
            }
            if (sessionId === 'e89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b296') {
                // 正常：変更請求承認結果登録
                res.json({
                    sessionId: 'sessionId',
                    operatorId: 1,
                    type: 0,
                    loginId: 'loginid',
                    name: 'test-user',
                    pxrId: '58di2dfse2.test.org',
                    mobilePhone: '09011112222',
                    lastLoginAt: '2020-01-01T00:00:00.000+0900',
                    attributes: {},
                    block: {
                        _value: 1000110,
                        _ver: 1
                    },
                    actor: {
                        _value: 1002700,
                        _ver: 1
                    }
                });
            }
            if (sessionId === 'e89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b291') {
                // 異常：ワークフロー
                res.json({
                    sessionId: 'sessionId',
                    operatorId: 1,
                    type: 1,
                    loginId: 'loginid',
                    name: 'test-user',
                    pxrId: '58di2dfse2.test.org',
                    mobilePhone: '09011112222',
                    lastLoginAt: '2020-01-01T00:00:00.000+0900',
                    attributes: {},
                    block: {
                        _value: 1000110,
                        _ver: 1
                    },
                    actor: {
                        _value: 1002700,
                        _ver: 1
                    }
                });
            }
            if (sessionId === 'e89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b292') {
                // 異常：アプリケーション
                res.json({
                    sessionId: 'sessionId',
                    operatorId: 1,
                    type: 2,
                    loginId: 'loginid',
                    name: 'test-user',
                    pxrId: '58di2dfse2.test.org',
                    mobilePhone: '09011112222',
                    lastLoginAt: '2020-01-01T00:00:00.000+0900',
                    attributes: {},
                    block: {
                        _value: 1000110,
                        _ver: 1
                    },
                    actor: {
                        _value: 1002700,
                        _ver: 1
                    }
                });
            }
            if (sessionId === 'e89171efae04aa55357bdd2ebf8338725c8fd17ffdfbe61be66ca96c7590b293') {
                // 異常：運営メンバー
                res.json({
                    sessionId: 'sessionId',
                    operatorId: 1,
                    type: 3,
                    loginId: '58di2dfse2.test.org',
                    name: 'test-user',
                    pxrId: '58di2dfse2.test.org',
                    mobilePhone: '09011112222',
                    lastLoginAt: '2020-01-01T00:00:00.000+0900',
                    attributes: {},
                    block: {
                        _value: 1000110,
                        _ver: 1
                    },
                    actor: {
                        _value: 1002700,
                        _ver: 1
                    }
                });
            }

            res.end();
        };

        // イベントハンドラー
        const _listener2 = (req: express.Request, res: express.Response) => {
            const pxrId = req.query['pxrId'];
            res.status(status);
            if ((pxrId === 'pxrid.multiple')) {
                res.json({
                    pxrId: pxrId,
                    userInfo: {
                        id: 1,
                        type: 0,
                        loginId: 'loginid',
                        hpassword: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
                        pxrId: 'pxrid.multiple',
                        userInformation: null,
                        name: null,
                        mobilePhone: '09011112222',
                        mail: null,
                        auth: '{"member":{"add":true,"update":true,"delete":true},"actor":{"application":true,"approval":true},"book":{"create":true},"catalog":{"create":true},"setting":{"update":true}}',
                        lastLoginAt: null,
                        passwordChangeFlg: false,
                        loginProhibitedFlg: false,
                        attributes: '{"initialPasswordExpire":"2020-03-01T12:00:00.000+9:00","smsAuth":false}',
                        lockFlg: false,
                        lockStartAt: null,
                        passwordUpdateAt: '2020-07-08T14:08:10.068+0900',
                        isDisabled: false,
                        createdBy: 'loginId',
                        createdAt: '2020-07-08T14:08:10.068+0900',
                        updatedBy: 'loginId',
                        updatedAt: '2020-07-08T14:08:10.068+0900'
                    }
                });
            }
            res.end();
        };

        // イベントハンドラー
        const _listener3 = (req: express.Request, res: express.Response) => {
            const pxrIdList = req.body['pxrId'] || null;
            res.status(status);
            const response: any[] = [];
            for (const pxrId of pxrIdList) {
                if ((pxrId === 'not.userInfo')) {
                    response.push({
                        pxrId: pxrId,
                        userInfo: null
                    });
                }
            }
            res.json(response);
            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.use(bodyParser.json());
        this._app.post('/operator/session', _listener);
        this._app.get('/operator/user/info', _listener2);
        this._app.post('/operator/user/info/list', _listener3);
        this._server = this._app.listen(3000);
    }
}

/**
 * オペレーターサービス
 */
export class StubOperatorServerSmSError {
    _app: express.Express;
    _server: Server;

    constructor (status: number, type: number) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status);
            res.json({
                sessionId: 'sessionId',
                operatorId: 1,
                type: type,
                loginId: 'test_loginId',
                name: 'test-user',
                pxrId: 'test01.test.org',
                mobilePhone: '0311112222',
                auth: {
                    member: {
                        add: true,
                        update: true,
                        delete: true
                    }
                },
                lastLoginAt: '2020-01-01T00:00:00.000+0900',
                attributes: {},
                roles: [
                    {
                        _value: 1,
                        _ver: 1
                    }
                ],
                block: {
                    _value: 1000401,
                    _ver: 1
                },
                actor: {
                    _value: 1000431,
                    _ver: 1
                }
            });

            res.end();
            this._server.close();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.post('/operator/session', _listener);
        this._server = this._app.listen(3000);
    }
}

/**
 * オペレーターサービス
 */
export class StubOperatorServiceUserInfoService {
    _app: express.Express;
    _server: Server;

    constructor (status: number, type: number, actorCode: number = 1000431, actorVer: number = 0) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(200);
            res.json({
                sessionId: 'sessionId',
                operatorId: 1,
                type: type,
                loginId: 'test_loginId',
                name: 'test-user',
                pxrId: 'test01.test.org',
                mobilePhone: '0311112222',
                auth: {
                    member: {
                        add: true,
                        update: true,
                        delete: true
                    }
                },
                lastLoginAt: '2020-01-01T00:00:00.000+0900',
                attributes: {},
                roles: [
                    {
                        _value: 1,
                        _ver: 1
                    }
                ],
                block: {
                    _value: 1000401,
                    _ver: 1
                },
                actor: {
                    _value: actorCode,
                    _ver: actorVer
                }
            });
            res.end();
        };

        // イベントハンドラー
        const _listener2 = (req: express.Request, res: express.Response) => {
            res.status(status).json().end();
        };

        // イベントハンドラー
        const _listener3 = (req: express.Request, res: express.Response) => {
            res.status(status).json().end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.post('/operator/session', _listener);
        this._app.post('/operator/user/info/search', _listener2);
        this._app.post('/operator/user/info', _listener3);
        this._server = this._app.listen(3000);
    }
}
