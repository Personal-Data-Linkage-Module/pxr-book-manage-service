/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Server } from 'net';
/* eslint-enable */
import * as express from 'express';
import { ResponseCode } from '../common/ResponseCode';
import bodyParser = require('body-parser');

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
                } else if (type === 2) {
                    // 65-02 で使用
                    res.status(ResponseCode.OK).json(
                        [
                            {
                                actor: {
                                    _value: 1000101
                                },
                                app: null,
                                wf: {
                                    _value: 1000110
                                },
                                document: [
                                    {
                                        _code: {
                                            _value: 1000501,
                                            _ver: 1
                                        },
                                        count: 1
                                    }
                                ],
                                event: [
                                    {
                                        _code: {
                                            _value: 1000511,
                                            _ver: 1
                                        },
                                        count: 1
                                    }
                                ],
                                thing: [
                                    {
                                        _code: {
                                            _value: 1000521,
                                            _ver: 1
                                        },
                                        count: 2
                                    }
                                ]
                            },
                            {
                                actor: {
                                    _value: 1000101
                                },
                                app: null,
                                wf: {
                                    _value: 1000111
                                },
                                document: [
                                    {
                                        _code: {
                                            _value: 1000701,
                                            _ver: 1
                                        },
                                        count: 1
                                    }
                                ],
                                event: [
                                    {
                                        _code: {
                                            _value: 1000711,
                                            _ver: 1
                                        },
                                        count: 1
                                    }
                                ],
                                thing: [
                                    {
                                        _code: {
                                            _value: 1000721,
                                            _ver: 1
                                        },
                                        count: 2
                                    }
                                ]
                            },
                            {
                                actor: {
                                    _value: 1000201
                                },
                                app: null,
                                wf: {
                                    _value: 1000210
                                },
                                document: [
                                    {
                                        _code: {
                                            _value: 1000801,
                                            _ver: 1
                                        },
                                        count: 1
                                    }
                                ],
                                event: [
                                    {
                                        _code: {
                                            _value: 1000811,
                                            _ver: 1
                                        },
                                        count: 1
                                    }
                                ],
                                thing: [
                                    {
                                        _code: {
                                            _value: 1000821,
                                            _ver: 1
                                        },
                                        count: 2
                                    }
                                ]
                            }
                        ]);
                } else if (type === 3) {
                    res.status(ResponseCode.OK).json([]);
                } else if (type === 4) {
                    // 65-02 で使用、thing未蓄積
                    const body = JSON.parse(JSON.stringify(req.body));
                    const document = body.document;
                    const event = body.event;
                    const thing = body.thing;
                    if ((document && document.length > 0) || (event && event.length > 0)) {
                        res.status(ResponseCode.OK).json(
                            [
                                {
                                    actor: {
                                        _value: 1000101
                                    },
                                    app: null,
                                    wf: {
                                        _value: 1000110
                                    },
                                    document: [
                                        {
                                            _code: {
                                                _value: 1000501,
                                                _ver: 1
                                            },
                                            count: 1
                                        }
                                    ],
                                    event: [
                                        {
                                            _code: {
                                                _value: 1000511,
                                                _ver: 1
                                            },
                                            count: 1
                                        }
                                    ],
                                    thing: []
                                }
                            ]);
                    } else if (thing && thing.length > 0) {
                        res.status(ResponseCode.OK).json([]);
                    }
                } else if (type === 5) {
                    // 31-01で使用
                    res.status(ResponseCode.OK).json(
                        [
                            {
                                actor: {
                                    _value: 1000445
                                },
                                app: null,
                                wf: {
                                    _value: 1000601
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
                                        count: 1
                                    }
                                ],
                                thing: [
                                    {
                                        _code: {
                                            _value: 1000922,
                                            _ver: 1
                                        },
                                        count: 2
                                    }
                                ]
                            }
                        ]
                    );
                } else {
                    res.json([]);
                }
                return;
            }
            res.status(status).end();
        };
        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app = express();
        this._app.use(bodyParser.json());
        this._app.post('/ctoken-ledger/count', _listener);
        this._server = this._app.listen(port);
    }
}
