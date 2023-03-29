/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Server } from 'net';
/* eslint-enable */
import * as express from 'express';
import { ResponseCode } from '../common/ResponseCode';

export default class StubCTokenLedgerServer {
    _app: express.Express;
    _server: Server;
    constructor (port: number, type: number, status: number) {
        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            if (status === ResponseCode.OK) {
                if (type === 0) {
                    res.status(ResponseCode.OK).json(
                        [
                            {
                                actor: {
                                    _value: 1000004
                                },
                                app: null,
                                wf: null,
                                document: [
                                    {
                                        _code: {
                                            _value: 1099999,
                                            _ver: 1
                                        },
                                        count: 1
                                    }
                                ],
                                event: [
                                    {
                                        _code: {
                                            _value: 1000008,
                                            _ver: 1
                                        },
                                        count: 5
                                    }
                                ],
                                thing: [
                                    {
                                        _code: {
                                            _value: 1000011,
                                            _ver: 1
                                        },
                                        count: 20
                                    }
                                ]
                            }
                        ]);
                } else if (type === 1) {
                    res.status(ResponseCode.OK).json(
                        [
                            {
                                actor: {
                                    _value: 1000004
                                },
                                app: null,
                                wf: {
                                    _value: 1000007
                                },
                                document: [
                                    {
                                        _code: {
                                            _value: 1099999,
                                            _ver: 1
                                        },
                                        count: 1
                                    }
                                ],
                                event: [
                                    {
                                        _code: {
                                            _value: 1000008,
                                            _ver: 1
                                        },
                                        count: 5
                                    }
                                ],
                                thing: [
                                    {
                                        _code: {
                                            _value: 1000011,
                                            _ver: 1
                                        },
                                        count: 20
                                    }
                                ]
                            }
                        ]);
                } else {
                    res.json([]);
                }
                return;
            }
            res.status(status).end();
        };
        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app = express();
        this._app.post('/ctoken-ledger/count', _listener);
        this._server = this._app.listen(port);
    }
}
