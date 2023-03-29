/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Server } from 'net';
/* eslint-enable */
import * as express from 'express';

/**
 * 本人性確認サービス
 */
export default class StubIdentityServer {
    _app: express.Express;
    _server: Server;

    constructor (status: number, appflg: boolean, pxrId: string) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status);
            if (pxrId === '1') {
                res.json({
                    pxrId: pxrId,
                    actor: {
                        _value: 1000003,
                        _ver: 1
                    },
                    app: {
                        _value: 1000004,
                        _ver: 1
                    }
                });
            } else if (pxrId === 'region') {
                res.json({
                    pxrId: pxrId,
                    actor: {
                        _value: 1000003,
                        _ver: 1
                    },
                    region: {
                        _value: 1000004,
                        _ver: 1
                    },
                    userId: '123456789'
                });
            } else if (pxrId === 'wf') {
                res.json({
                    pxrId: pxrId,
                    actor: {
                        _value: 1000003,
                        _ver: 1
                    },
                    wf: {
                        _value: 1000004,
                        _ver: 1
                    },
                    userId: '123456789'
                });
            } else if (pxrId === 'notOrgId') {
                res.json({
                    pxrId: pxrId,
                    actor: {
                        _value: 1000003,
                        _ver: 1
                    },
                    userId: '123456789'
                });
            } else {
                if (appflg) {
                    res.json({
                        pxrId: pxrId,
                        actor: {
                            _value: 1000003,
                            _ver: 1
                        },
                        app: {
                            _value: 1000004,
                            _ver: 1
                        },
                        userId: '123456789'
                    });
                } else {
                    res.json({
                        pxrId: pxrId,
                        actor: {
                            _value: 1000003,
                            _ver: 1
                        },
                        app: {
                            _value: 1000004,
                            _ver: 1
                        },
                        userId: '123456789'
                    });
                }
            }
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.post('/identity-verificate/collate', _listener);
        this._server = this._app.listen(3007);
    }
}

/**
 * 本人性確認サービス
 */
export class StubIdentityServer02 {
    _app: express.Express;
    _server: Server;

    constructor (status: number, appflg: boolean, pxrId: string) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status);
            if (pxrId === '1') {
                res.json({
                    pxrId: pxrId,
                    actor: {
                        _value: 1000003,
                        _ver: 1
                    },
                    wf: {
                        _value: 1000004,
                        _ver: 1
                    }
                });
            } else {
                if (appflg) {
                    res.json({
                        pxrId: pxrId,
                        actor: {
                            _value: 1000103,
                            _ver: 1
                        },
                        app: {
                            _value: 1000104,
                            _ver: 1
                        },
                        userId: '123456789'
                    });
                } else {
                    res.json({
                        pxrId: pxrId,
                        actor: {
                            _value: 1000003,
                            _ver: 1
                        },
                        wf: {
                            _value: 1000004,
                            _ver: 1
                        },
                        userId: '123456789'
                    });
                }
            }
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.post('/identity-verificate/collate', _listener);
        this._server = this._app.listen(3007);
    }
}

/**
 * 本人性確認サービス（個人）
 */
export class StubIdentityServer03 {
    _app: express.Express;
    _server: Server;

    constructor (status: number, appflg: boolean, pxrId: string) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status);
            if (pxrId === '1') {
                res.json({
                    pxrId: pxrId,
                    actor: {
                        _value: 1000003,
                        _ver: 1
                    },
                    wf: {
                        _value: 1000004,
                        _ver: 1
                    }
                });
            } else {
                if (appflg) {
                    res.json({
                        pxrId: pxrId,
                        actor: {
                            _value: 1000103,
                            _ver: 1
                        },
                        app: {
                            _value: 1000104,
                            _ver: 1
                        },
                        userId: '123456789'
                    });
                } else {
                    res.json({
                        pxrId: pxrId,
                        actor: {
                            _value: 1000003,
                            _ver: 1
                        },
                        wf: {
                            _value: 1000004,
                            _ver: 1
                        },
                        userId: '123456789'
                    });
                }
            }
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.post('/identity-verificate/collate', _listener);
        this._server = this._app.listen(3007);
    }
}

/**
 * 本人性確認サービス(利用者ID連携解除用)
 */
export class StubIdentityServerReleaseCooperate {
    _app: express.Express;
    _server: Server;

    constructor (status: number, type: string, pxrId: string, code: number, ver: number, userId: string) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status);
            if (type === 'app') {
                res.json({
                    pxrId: pxrId,
                    actor: {
                        _value: 1000003,
                        _ver: 1
                    },
                    app: {
                        _value: code,
                        _ver: ver
                    },
                    userId: userId
                });
            } else if (type === 'wf') {
                res.json({
                    pxrId: pxrId,
                    actor: {
                        _value: 1000003,
                        _ver: 1
                    },
                    wf: {
                        _value: code,
                        _ver: ver
                    },
                    userId: userId
                });
            } else if (type === 'region') {
                res.json({
                    pxrId: pxrId,
                    actor: {
                        _value: 1000003,
                        _ver: 1
                    },
                    region: {
                        _value: code,
                        _ver: ver
                    },
                    userId: userId
                });
            } else {
                res.json({
                    pxrId: pxrId,
                    actor: {
                        _value: 1000003,
                        _ver: 1
                    },
                    userId: userId
                });
            }
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.post('/identity-verificate/collate', _listener);
        this._server = this._app.listen(3007);
    }
}
