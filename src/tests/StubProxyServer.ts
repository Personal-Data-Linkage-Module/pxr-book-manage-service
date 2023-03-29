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

export default class StubProxyServer {
    _app: express.Express;
    _server: Server;

    constructor (status: number) {
        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            const block = Number(req.query.block);
            const type = req.body.type;
            if (status === ResponseCode.OK) {
                if (block === 1000115) {
                    res.status(ResponseCode.OK).json([
                        {
                            type: 1,
                            request: {
                                actor: {
                                    _value: 1000222,
                                    _ver: 1
                                },
                                block: {
                                    _value: 1000333,
                                    _ver: 1
                                }
                            },
                            document: [
                                {
                                    _code: {
                                        _value: 1002155,
                                        _ver: 1
                                    },
                                    count: 1
                                }
                            ],
                            event: [
                                {
                                    _code: {
                                        _value: 1000155,
                                        _ver: 1
                                    },
                                    count: 1
                                }
                            ],
                            thing: [
                                {
                                    _code: {
                                        _value: 1000344,
                                        _ver: 1
                                    },
                                    count: 1
                                }
                            ]
                        }
                    ]);
                    return;
                } else if (block === 1000112) {
                    if (req.query.path === '/book-operate/share/trigger') {
                        res.status(ResponseCode.OK).json([
                            {
                                id: 1,
                                share: {
                                    _value: 1000510,
                                    _ver: 1
                                },
                                shareId: [
                                    'uuuuuuuu-uuuu-uuuu-uuuu-uuuuuuuuuuu1',
                                    'uuuuuuuu-uuuu-uuuu-uuuu-uuuuuuuuuuu2'
                                ],
                                endMethod: 1,
                                startDatetime: '2020-01-01T00:00:00.000+0900',
                                status: 1,
                                trigger: {
                                    code: {
                                        _value: 1000501,
                                        _ver: 1
                                    },
                                    startCondition: {
                                        document: [
                                            {
                                                code: {
                                                    _value: 1000046,
                                                    _ver: 1
                                                },
                                                event: [
                                                    {
                                                        code: {
                                                            _value: 1000014,
                                                            _ver: 1
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    endCondition: {
                                        document: [
                                            {
                                                code: {
                                                    _value: 1000046,
                                                    _ver: 1
                                                },
                                                event: [
                                                    {
                                                        code: {
                                                            _value: 1000014,
                                                            _ver: 1
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        ]);
                    } else {
                        res.status(ResponseCode.OK).json([
                            {
                                type: 1,
                                request: {
                                    actor: {
                                        _value: 1000222,
                                        _ver: 1
                                    },
                                    block: {
                                        _value: 1000333,
                                        _ver: 1
                                    }
                                },
                                document: [
                                    {
                                        _code: {
                                            _value: 1002074,
                                            _ver: 1
                                        },
                                        count: 1
                                    }
                                ],
                                event: [
                                    {
                                        _code: {
                                            _value: 1000074,
                                            _ver: 1
                                        },
                                        count: 1
                                    }
                                ],
                                thing: [
                                    {
                                        _code: {
                                            _value: 1000095,
                                            _ver: 1
                                        },
                                        count: 1
                                    }
                                ]
                            }
                        ]);
                    }
                    return;
                } else if (block === 1000113) {
                    res.status(204).end();
                } else if (block === 1001113) {
                    res.status(ResponseCode.OK).json([
                        {
                            type: 1,
                            request: {
                                actor: {
                                    _value: 1000222,
                                    _ver: 1
                                },
                                block: {
                                    _value: 1000333,
                                    _ver: 1
                                }
                            },
                            document: [
                                {
                                    _code: {
                                        _value: 1003155,
                                        _ver: 1
                                    },
                                    count: 1
                                }
                            ],
                            event: [
                                {
                                    _code: {
                                        _value: 1003155,
                                        _ver: 1
                                    },
                                    count: 1
                                }
                            ],
                            thing: [
                                {
                                    _code: {
                                        _value: 1003344,
                                        _ver: 1
                                    },
                                    count: 1
                                }
                            ]
                        }
                    ]);
                    return;
                } else if (block === 1000116) {
                    // app：正常
                    if (type === 'document') {
                        res.status(ResponseCode.OK).json(
                            [
                                {
                                    id: {
                                        index: '2_1_1',
                                        value: 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6'
                                    },
                                    code: {
                                        index: '2_1_2',
                                        value: {
                                            _value: 1000008,
                                            _ver: 1
                                        }
                                    },
                                    createdAt: {
                                        index: '2_2_1',
                                        value: '2020-02-20T00:00:00.000+0900'
                                    },
                                    sourceId: '202108-1',
                                    app: {
                                        code: {
                                            index: '2_3_1',
                                            value: {
                                                _value: 1000117,
                                                _ver: 1
                                            }
                                        },
                                        app: {
                                            index: '2_3_5',
                                            value: {
                                                _value: 1000007,
                                                _ver: 1
                                            }
                                        }
                                    },
                                    wf: null,
                                    chapter: [
                                        {
                                            title: 'イベント識別子',
                                            event: [
                                                '4f75161a-449a-4839-be6a-4cc577b8a8d0'
                                            ],
                                            sourceId: [
                                                '202108-1'
                                            ]
                                        }
                                    ]
                                }
                            ]
                        );
                    } else if (type === 'event') {
                        res.status(ResponseCode.OK).json(
                            [
                                {
                                    id: {
                                        index: '3_1_1',
                                        value: '4f75161a-449a-4839-be6a-4cc577b8a8d0'
                                    },
                                    code: {
                                        index: '3_1_2',
                                        value: {
                                            _value: 1000200,
                                            _ver: 1
                                        }
                                    },
                                    start: {
                                        index: '3_2_1',
                                        value: '2020-02-20T00:00:00.000+0900'
                                    },
                                    end: {
                                        index: '3_2_2',
                                        value: '2020-02-21T00:00:00.000+0900'
                                    },
                                    location: {
                                        index: '3_3_1',
                                        value: null
                                    },
                                    sourceId: '20200221-1',
                                    env: null,
                                    app: {
                                        code: {
                                            index: '3_5_1',
                                            value: {
                                                _value: 1000117,
                                                _ver: 1
                                            }
                                        },
                                        app: {
                                            index: '3_5_5',
                                            value: {
                                                _value: 1000007,
                                                _ver: 1
                                            }
                                        }
                                    },
                                    wf: null,
                                    thing: [
                                        {
                                            acquired_time: {
                                                index: '4_2_2_4',
                                                value: null
                                            },
                                            code: {
                                                index: '4_1_2',
                                                value: {
                                                    _value: 1000300,
                                                    _ver: 1
                                                }
                                            },
                                            env: null,
                                            sourceId: null,
                                            id: {
                                                index: '4_1_1',
                                                value: null
                                            },
                                            'x-axis': {
                                                index: '4_2_2_1',
                                                value: null
                                            },
                                            'y-axis': {
                                                index: '4_2_2_2',
                                                value: null
                                            },
                                            'z-axis': {
                                                index: '4_2_2_3',
                                                value: null
                                            }
                                        }
                                    ]
                                },
                                {
                                    id: {
                                        index: '3_1_1',
                                        value: 'ad7699e7-9955-2c06-5d8a-cf2d581398af'
                                    },
                                    code: {
                                        index: '3_1_2',
                                        value: {
                                            _value: 1000201,
                                            _ver: 1
                                        }
                                    },
                                    start: {
                                        index: '3_2_1',
                                        value: '2020-02-20T00:00:00.000+0900'
                                    },
                                    end: {
                                        index: '3_2_2',
                                        value: '2020-02-21T00:00:00.000+0900'
                                    },
                                    location: {
                                        index: '3_3_1',
                                        value: null
                                    },
                                    sourceId: '202108-1',
                                    env: null,
                                    app: {
                                        code: {
                                            index: '3_5_1',
                                            value: {
                                                _value: 1000117,
                                                _ver: 1
                                            }
                                        },
                                        app: {
                                            index: '3_5_5',
                                            value: {
                                                _value: 1000007,
                                                _ver: 1
                                            }
                                        }
                                    },
                                    wf: null,
                                    thing: [
                                        {
                                            acquired_time: {
                                                index: '4_2_2_4',
                                                value: null
                                            },
                                            code: {
                                                index: '4_1_2',
                                                value: {
                                                    _value: 1000301,
                                                    _ver: 1
                                                }
                                            },
                                            env: null,
                                            sourceId: null,
                                            id: {
                                                index: '4_1_1',
                                                value: null
                                            },
                                            'x-axis': {
                                                index: '4_2_2_1',
                                                value: null
                                            },
                                            'y-axis': {
                                                index: '4_2_2_2',
                                                value: null
                                            },
                                            'z-axis': {
                                                index: '4_2_2_3',
                                                value: null
                                            }
                                        }
                                    ]
                                }
                            ]
                        );
                    }
                } else if (block === 1000117) {
                    // wf：正常
                    if (type === 'document') {
                        res.status(ResponseCode.OK).json(
                            [
                                {
                                    id: {
                                        index: '2_1_1',
                                        value: 'c2107e2d-bfda-f8bb-55af-885ef0a793a1'
                                    },
                                    code: {
                                        index: '2_1_2',
                                        value: {
                                            _value: 1000009,
                                            _ver: 1
                                        }
                                    },
                                    createdAt: {
                                        index: '2_2_1',
                                        value: '2020-02-20T00:00:00.000+0900'
                                    },
                                    sourceId: '202108-1',
                                    wf: {
                                        code: {
                                            index: '2_3_1',
                                            value: {
                                                _value: 1000117,
                                                _ver: 1
                                            }
                                        },
                                        wf: {
                                            index: '2_3_2',
                                            value: {
                                                _value: 1000007,
                                                _ver: 1
                                            }
                                        },
                                        role: {
                                            index: '2_3_3',
                                            value: {
                                                _value: 1000005,
                                                _ver: 1
                                            }
                                        },
                                        staffId: {
                                            index: '2_3_4',
                                            value: 'wf01'
                                        }
                                    },
                                    app: null,
                                    chapter: [
                                        {
                                            title: 'イベント識別子',
                                            event: [
                                                'd09dd62e-15c4-07f9-9b47-6a0ebda9f039'
                                            ],
                                            sourceId: [
                                                '202107-1-1'
                                            ]
                                        }
                                    ]
                                }
                            ]);
                    } else if (type === 'event') {
                        res.status(ResponseCode.OK).json(
                            [
                                {
                                    id: {
                                        index: '3_1_1',
                                        value: 'd09dd62e-15c4-07f9-9b47-6a0ebda9f039'
                                    },
                                    code: {
                                        index: '3_1_2',
                                        value: {
                                            _value: 1000202,
                                            _ver: 1
                                        }
                                    },
                                    start: {
                                        index: '3_2_1',
                                        value: '2020-02-20T00:00:00.000+0900'
                                    },
                                    end: {
                                        index: '3_2_2',
                                        value: '2020-02-21T00:00:00.000+0900'
                                    },
                                    location: {
                                        index: '3_3_1',
                                        value: null
                                    },
                                    sourceId: '20200221-1',
                                    env: null,
                                    wf: {
                                        code: {
                                            index: '3_5_1',
                                            value: {
                                                _value: 1000117,
                                                _ver: 1
                                            }
                                        },
                                        wf: {
                                            index: '3_5_2',
                                            value: {
                                                _value: 1000007,
                                                _ver: 1
                                            }
                                        },
                                        role: {
                                            index: '3_5_3',
                                            value: {
                                                _value: 1000005,
                                                _ver: 1
                                            }
                                        },
                                        staffId: {
                                            index: '3_5_4',
                                            value: 'wf01'
                                        }
                                    },
                                    app: null,
                                    thing: [
                                        {
                                            acquired_time: {
                                                index: '4_2_2_4',
                                                value: null
                                            },
                                            code: {
                                                index: '4_1_2',
                                                value: {
                                                    _value: 1000302,
                                                    _ver: 1
                                                }
                                            },
                                            env: null,
                                            sourceId: null,
                                            id: {
                                                index: '4_1_1',
                                                value: null
                                            },
                                            'x-axis': {
                                                index: '4_2_2_1',
                                                value: null
                                            },
                                            'y-axis': {
                                                index: '4_2_2_2',
                                                value: null
                                            },
                                            'z-axis': {
                                                index: '4_2_2_3',
                                                value: null
                                            }
                                        }
                                    ]
                                },
                                {
                                    id: {
                                        index: '3_1_1',
                                        value: 'ad7699e7-9955-2c06-5d8a-cf2d581398af'
                                    },
                                    code: {
                                        index: '3_1_2',
                                        value: {
                                            _value: 1000203,
                                            _ver: 1
                                        }
                                    },
                                    start: {
                                        index: '3_2_1',
                                        value: '2020-02-20T00:00:00.000+0900'
                                    },
                                    end: {
                                        index: '3_2_2',
                                        value: '2020-02-21T00:00:00.000+0900'
                                    },
                                    location: {
                                        index: '3_3_1',
                                        value: null
                                    },
                                    sourceId: '202107-1',
                                    env: null,
                                    wf: {
                                        code: {
                                            index: '3_5_1',
                                            value: {
                                                _value: 1000117,
                                                _ver: 1
                                            }
                                        },
                                        wf: {
                                            index: '3_5_2',
                                            value: {
                                                _value: 1000007,
                                                _ver: 1
                                            }
                                        },
                                        role: {
                                            index: '3_5_3',
                                            value: {
                                                _value: 1000005,
                                                _ver: 1
                                            }
                                        },
                                        staffId: {
                                            index: '3_5_4',
                                            value: 'wf01'
                                        }
                                    },
                                    app: null,
                                    thing: [
                                        {
                                            acquired_time: {
                                                index: '4_2_2_4',
                                                value: null
                                            },
                                            code: {
                                                index: '4_1_2',
                                                value: {
                                                    _value: 1000303,
                                                    _ver: 1
                                                }
                                            },
                                            env: null,
                                            sourceId: null,
                                            id: {
                                                index: '4_1_1',
                                                value: null
                                            },
                                            'x-axis': {
                                                index: '4_2_2_1',
                                                value: null
                                            },
                                            'y-axis': {
                                                index: '4_2_2_2',
                                                value: null
                                            },
                                            'z-axis': {
                                                index: '4_2_2_3',
                                                value: null
                                            }
                                        }
                                    ]
                                }
                            ]
                        );
                    }
                } else if (block === 1000118) {
                    // app:ドキュメント取得異常
                    res.status(ResponseCode.OK).json([]);
                } else if (block === 1000119) {
                    // app：HTML生成URLが取得できない
                    if (type === 'document') {
                        res.status(ResponseCode.OK).json(
                            [
                                {
                                    id: {
                                        index: '2_1_1',
                                        value: 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6'
                                    },
                                    code: {
                                        index: '2_1_2',
                                        value: {
                                            _value: 1000018,
                                            _ver: 1
                                        }
                                    },
                                    createdAt: {
                                        index: '2_2_1',
                                        value: '2020-02-20T00:00:00.000+0900'
                                    },
                                    sourceId: '202108-1',
                                    wf: null,
                                    app: {
                                        code: {
                                            index: '2_3_1',
                                            value: {
                                                _value: 1000117,
                                                _ver: 1
                                            }
                                        },
                                        app: {
                                            index: '2_3_5',
                                            value: {
                                                _value: 1000007,
                                                _ver: 1
                                            }
                                        }
                                    },
                                    chapter: [
                                        {
                                            title: 'イベント識別子',
                                            event: [
                                                '4f75161a-449a-4839-be6a-4cc577b8a8d0'
                                            ],
                                            sourceId: [
                                                '202108-1'
                                            ]
                                        }
                                    ]
                                }
                            ]
                        );
                    } else if (type === 'event') {
                        res.status(ResponseCode.OK).json(
                            [
                                {
                                    id: {
                                        index: '3_1_1',
                                        value: '4f75161a-449a-4839-be6a-4cc577b8a8d0'
                                    },
                                    code: {
                                        index: '3_1_2',
                                        value: {
                                            _value: 1000200,
                                            _ver: 1
                                        }
                                    },
                                    start: {
                                        index: '3_2_1',
                                        value: '2020-02-20T00:00:00.000+0900'
                                    },
                                    end: {
                                        index: '3_2_2',
                                        value: '2020-02-21T00:00:00.000+0900'
                                    },
                                    location: {
                                        index: '3_3_1',
                                        value: null
                                    },
                                    sourceId: '20200221-1',
                                    env: null,
                                    app: null,
                                    wf: {
                                        code: {
                                            index: '3_5_1',
                                            value: {
                                                _value: 1000004,
                                                _ver: 1
                                            }
                                        },
                                        wf: {
                                            index: '3_5_2',
                                            value: {
                                                _value: 1000007,
                                                _ver: 1
                                            }
                                        },
                                        role: {
                                            index: '3_5_3',
                                            value: {
                                                _value: 1000005,
                                                _ver: 1
                                            }
                                        }
                                    },
                                    thing: [
                                        {
                                            acquired_time: {
                                                index: '4_2_2_4',
                                                value: null
                                            },
                                            code: {
                                                index: '4_1_2',
                                                value: {
                                                    _value: 1000300,
                                                    _ver: 1
                                                }
                                            },
                                            env: null,
                                            sourceId: null,
                                            id: {
                                                index: '4_1_1',
                                                value: null
                                            },
                                            'x-axis': {
                                                index: '4_2_2_1',
                                                value: null
                                            },
                                            'y-axis': {
                                                index: '4_2_2_2',
                                                value: null
                                            },
                                            'z-axis': {
                                                index: '4_2_2_3',
                                                value: null
                                            }
                                        }
                                    ]
                                },
                                {
                                    id: {
                                        index: '3_1_1',
                                        value: 'ad7699e7-9955-2c06-5d8a-cf2d581398af'
                                    },
                                    code: {
                                        index: '3_1_2',
                                        value: {
                                            _value: 1000201,
                                            _ver: 1
                                        }
                                    },
                                    start: {
                                        index: '3_2_1',
                                        value: '2020-02-20T00:00:00.000+0900'
                                    },
                                    end: {
                                        index: '3_2_2',
                                        value: '2020-02-21T00:00:00.000+0900'
                                    },
                                    location: {
                                        index: '3_3_1',
                                        value: null
                                    },
                                    sourceId: '202108-1',
                                    env: null,
                                    app: null,
                                    wf: {
                                        code: {
                                            index: '3_5_1',
                                            value: {
                                                _value: 1000004,
                                                _ver: 1
                                            }
                                        },
                                        wf: {
                                            index: '3_5_2',
                                            value: {
                                                _value: 1000007,
                                                _ver: 1
                                            }
                                        },
                                        role: {
                                            index: '3_5_3',
                                            value: {
                                                _value: 1000005,
                                                _ver: 1
                                            }
                                        }
                                    },
                                    thing: [
                                        {
                                            acquired_time: {
                                                index: '4_2_2_4',
                                                value: null
                                            },
                                            code: {
                                                index: '4_1_2',
                                                value: {
                                                    _value: 1000301,
                                                    _ver: 1
                                                }
                                            },
                                            env: null,
                                            sourceId: null,
                                            id: {
                                                index: '4_1_1',
                                                value: null
                                            },
                                            'x-axis': {
                                                index: '4_2_2_1',
                                                value: null
                                            },
                                            'y-axis': {
                                                index: '4_2_2_2',
                                                value: null
                                            },
                                            'z-axis': {
                                                index: '4_2_2_3',
                                                value: null
                                            }
                                        }
                                    ]
                                }
                            ]
                        );
                    }
                } else if (block === 1000120) {
                    // app：HTML生成URLが取得できない
                    if (type === 'document') {
                        res.status(ResponseCode.OK).json(
                            [
                                {
                                    id: {
                                        index: '2_1_1',
                                        value: 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6'
                                    },
                                    code: {
                                        index: '2_1_2',
                                        value: {
                                            _value: 1000018,
                                            _ver: 1
                                        }
                                    },
                                    createdAt: {
                                        index: '2_2_1',
                                        value: '2020-02-20T00:00:00.000+0900'
                                    },
                                    sourceId: '202108-1',
                                    wf: null,
                                    app: {
                                        code: {
                                            index: '2_3_1',
                                            value: {
                                                _value: 1000117,
                                                _ver: 1
                                            }
                                        },
                                        app: {
                                            index: '2_3_5',
                                            value: {
                                                _value: 1000007,
                                                _ver: 1
                                            }
                                        }
                                    },
                                    chapter: [
                                        {
                                            title: 'イベント識別子'
                                        }
                                    ]
                                }
                            ]
                        );
                    } else if (type === 'event') {
                        res.status(ResponseCode.OK).json(
                            [
                                {
                                    id: {
                                        index: '3_1_1',
                                        value: '4f75161a-449a-4839-be6a-4cc577b8a8d0'
                                    },
                                    code: {
                                        index: '3_1_2',
                                        value: {
                                            _value: 1000200,
                                            _ver: 1
                                        }
                                    },
                                    start: {
                                        index: '3_2_1',
                                        value: '2020-02-20T00:00:00.000+0900'
                                    },
                                    end: {
                                        index: '3_2_2',
                                        value: '2020-02-21T00:00:00.000+0900'
                                    },
                                    location: {
                                        index: '3_3_1',
                                        value: null
                                    },
                                    sourceId: '20200221-1',
                                    env: null,
                                    app: null,
                                    wf: {
                                        code: {
                                            index: '3_5_1',
                                            value: {
                                                _value: 1000004,
                                                _ver: 1
                                            }
                                        },
                                        wf: {
                                            index: '3_5_2',
                                            value: {
                                                _value: 1000007,
                                                _ver: 1
                                            }
                                        },
                                        role: {
                                            index: '3_5_3',
                                            value: {
                                                _value: 1000005,
                                                _ver: 1
                                            }
                                        }
                                    },
                                    thing: [
                                        {
                                            acquired_time: {
                                                index: '4_2_2_4',
                                                value: null
                                            },
                                            code: {
                                                index: '4_1_2',
                                                value: {
                                                    _value: 1000300,
                                                    _ver: 1
                                                }
                                            },
                                            env: null,
                                            sourceId: null,
                                            id: {
                                                index: '4_1_1',
                                                value: null
                                            },
                                            'x-axis': {
                                                index: '4_2_2_1',
                                                value: null
                                            },
                                            'y-axis': {
                                                index: '4_2_2_2',
                                                value: null
                                            },
                                            'z-axis': {
                                                index: '4_2_2_3',
                                                value: null
                                            }
                                        }
                                    ]
                                },
                                {
                                    id: {
                                        index: '3_1_1',
                                        value: 'ad7699e7-9955-2c06-5d8a-cf2d581398af'
                                    },
                                    code: {
                                        index: '3_1_2',
                                        value: {
                                            _value: 1000201,
                                            _ver: 1
                                        }
                                    },
                                    start: {
                                        index: '3_2_1',
                                        value: '2020-02-20T00:00:00.000+0900'
                                    },
                                    end: {
                                        index: '3_2_2',
                                        value: '2020-02-21T00:00:00.000+0900'
                                    },
                                    location: {
                                        index: '3_3_1',
                                        value: null
                                    },
                                    sourceId: '202108-1',
                                    env: null,
                                    app: null,
                                    wf: {
                                        code: {
                                            index: '3_5_1',
                                            value: {
                                                _value: 1000004,
                                                _ver: 1
                                            }
                                        },
                                        wf: {
                                            index: '3_5_2',
                                            value: {
                                                _value: 1000007,
                                                _ver: 1
                                            }
                                        },
                                        role: {
                                            index: '3_5_3',
                                            value: {
                                                _value: 1000005,
                                                _ver: 1
                                            }
                                        }
                                    },
                                    thing: [
                                        {
                                            acquired_time: {
                                                index: '4_2_2_4',
                                                value: null
                                            },
                                            code: {
                                                index: '4_1_2',
                                                value: {
                                                    _value: 1000301,
                                                    _ver: 1
                                                }
                                            },
                                            env: null,
                                            sourceId: null,
                                            id: {
                                                index: '4_1_1',
                                                value: null
                                            },
                                            'x-axis': {
                                                index: '4_2_2_1',
                                                value: null
                                            },
                                            'y-axis': {
                                                index: '4_2_2_2',
                                                value: null
                                            },
                                            'z-axis': {
                                                index: '4_2_2_3',
                                                value: null
                                            }
                                        }
                                    ]
                                }
                            ]
                        );
                    }
                } else if (block === 1000400) {
                    res.status(ResponseCode.OK).json([
                        {
                            type: 1,
                            accessAt: '2000-08-01T00:00:00.000+0900',
                            shareCatalogCode: 1000200,
                            request: {
                                actor: {
                                    _value: 1000222,
                                    _ver: 1
                                },
                                block: {
                                    _value: 1000333,
                                    _ver: 1
                                }
                            },
                            document: [
                                {
                                    _code: {
                                        _value: 1002155,
                                        _ver: 1
                                    },
                                    count: 1
                                }
                            ],
                            event: [
                                {
                                    _code: {
                                        _value: 1000155,
                                        _ver: 1
                                    },
                                    count: 1
                                }
                            ],
                            thing: [
                                {
                                    _code: {
                                        _value: 1000344,
                                        _ver: 1
                                    },
                                    count: 1
                                }
                            ]
                        },
                        {
                            type: 1,
                            accessAt: '2000-01-01T00:00:00.000+0900',
                            shareCatalogCode: 1000201,
                            request: {
                                actor: {
                                    _value: 1000222,
                                    _ver: 1
                                },
                                block: {
                                    _value: 1000333,
                                    _ver: 1
                                }
                            },
                            document: null,
                            event: null,
                            thing: null
                        },
                        {
                            type: 1,
                            accessAt: '2000-01-01T00:00:00.000+0900',
                            logIdentifier: 'uuuuuuuu-uuuu-uuuu-uuuu-uuuuuuuuuuuu',
                            shareCatalogCode: 1000201,
                            request: {
                                actor: {
                                    _value: 1000222,
                                    _ver: 1
                                },
                                block: {
                                    _value: 1000333,
                                    _ver: 1
                                }
                            },
                            document: null,
                            event: null,
                            thing: null
                        }
                    ]);
                    return;
                }
                res.status(status).end();
            }
            res.status(status).end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app = express();
        this._app.use(bodyParser.json());
        this._app.post('/pxr-block-proxy', _listener);
        this._server = this._app.listen(3003);
    }
}

export class StubProxyBookServer {
    _app: express.Express;
    _server: Server;

    constructor (status: number) {
        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            const block = Number(req.query.block);
            const type = req.body.type;
            if (status === ResponseCode.OK) {
                if (block === 1000115) {
                    res.status(ResponseCode.OK).json([
                        {
                            type: 1,
                            request: {
                                actor: {
                                    _value: 1000222,
                                    _ver: 1
                                },
                                block: {
                                    _value: 1000333,
                                    _ver: 1
                                }
                            },
                            document: [
                                {
                                    _code: {
                                        _value: 1002155,
                                        _ver: 1
                                    },
                                    count: 1
                                }
                            ],
                            event: [
                                {
                                    _code: {
                                        _value: 1000155,
                                        _ver: 1
                                    },
                                    count: 1
                                }
                            ],
                            thing: [
                                {
                                    _code: {
                                        _value: 1000344,
                                        _ver: 1
                                    },
                                    count: 1
                                }
                            ]
                        }
                    ]);
                    return;
                } else if (block === 1000112) {
                    if (req.query.path === '/book-operate/share/trigger') {
                        res.status(ResponseCode.OK).json([
                            {
                                id: 1,
                                share: {
                                    _value: 1000510,
                                    _ver: 1
                                },
                                shareId: [
                                    'uuuuuuuu-uuuu-uuuu-uuuu-uuuuuuuuuuu1',
                                    'uuuuuuuu-uuuu-uuuu-uuuu-uuuuuuuuuuu2'
                                ],
                                endMethod: 1,
                                startDatetime: '2020-01-01T00:00:00.000+0900',
                                status: 1,
                                trigger: {
                                    code: {
                                        _value: 1000501,
                                        _ver: 1
                                    },
                                    startCondition: {
                                        document: [
                                            {
                                                code: {
                                                    _value: 1000046,
                                                    _ver: 1
                                                },
                                                event: [
                                                    {
                                                        code: {
                                                            _value: 1000014,
                                                            _ver: 1
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    endCondition: {
                                        document: [
                                            {
                                                code: {
                                                    _value: 1000046,
                                                    _ver: 1
                                                },
                                                event: [
                                                    {
                                                        code: {
                                                            _value: 1000014,
                                                            _ver: 1
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        ]);
                    } else {
                        res.status(ResponseCode.OK).json([
                            {
                                type: 1,
                                request: {
                                    actor: {
                                        _value: 1000222,
                                        _ver: 1
                                    },
                                    block: {
                                        _value: 1000333,
                                        _ver: 1
                                    }
                                },
                                document: [
                                    {
                                        _code: {
                                            _value: 1002074,
                                            _ver: 1
                                        },
                                        count: 1
                                    }
                                ],
                                event: [
                                    {
                                        _code: {
                                            _value: 1000074,
                                            _ver: 1
                                        },
                                        count: 1
                                    }
                                ],
                                thing: [
                                    {
                                        _code: {
                                            _value: 1000095,
                                            _ver: 1
                                        },
                                        count: 1
                                    }
                                ]
                            }
                        ]);
                    }
                    return;
                } else if (block === 1000113) {
                    res.status(204).end();
                } else if (block === 1001113) {
                    res.status(ResponseCode.OK).json([
                        {
                            type: 1,
                            request: {
                                actor: {
                                    _value: 1000222,
                                    _ver: 1
                                },
                                block: {
                                    _value: 1000333,
                                    _ver: 1
                                }
                            },
                            document: [
                                {
                                    _code: {
                                        _value: 1003155,
                                        _ver: 1
                                    },
                                    count: 1
                                }
                            ],
                            event: [
                                {
                                    _code: {
                                        _value: 1003155,
                                        _ver: 1
                                    },
                                    count: 1
                                }
                            ],
                            thing: [
                                {
                                    _code: {
                                        _value: 1003344,
                                        _ver: 1
                                    },
                                    count: 1
                                }
                            ]
                        }
                    ]);
                    return;
                } else if (block === 1000116) {
                    // app：正常
                    if (type === 'document') {
                        res.status(ResponseCode.OK).json(
                            [
                                {
                                    id: {
                                        index: '2_1_1',
                                        value: 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6'
                                    },
                                    code: {
                                        index: '2_1_2',
                                        value: {
                                            _value: 1000008,
                                            _ver: 1
                                        }
                                    },
                                    createdAt: {
                                        index: '2_2_1',
                                        value: '2020-02-20T00:00:00.000+0900'
                                    },
                                    sourceId: '202108-1',
                                    app: {
                                        code: {
                                            index: '2_3_1',
                                            value: {
                                                _value: 1000117,
                                                _ver: 1
                                            }
                                        },
                                        app: {
                                            index: '2_3_5',
                                            value: {
                                                _value: 1000007,
                                                _ver: 1
                                            }
                                        }
                                    },
                                    wf: null,
                                    chapter: [
                                        {
                                            title: 'イベント識別子',
                                            event: [
                                                '4f75161a-449a-4839-be6a-4cc577b8a8d0'
                                            ],
                                            sourceId: [
                                                '202108-1'
                                            ]
                                        }
                                    ]
                                }
                            ]
                        );
                    } else if (type === 'event') {
                        res.status(ResponseCode.OK).json(
                            [
                                {
                                    id: {
                                        index: '3_1_1',
                                        value: '4f75161a-449a-4839-be6a-4cc577b8a8d0'
                                    },
                                    code: {
                                        index: '3_1_2',
                                        value: {
                                            _value: 1000200,
                                            _ver: 1
                                        }
                                    },
                                    start: {
                                        index: '3_2_1',
                                        value: '2020-02-20T00:00:00.000+0900'
                                    },
                                    end: {
                                        index: '3_2_2',
                                        value: '2020-02-21T00:00:00.000+0900'
                                    },
                                    location: {
                                        index: '3_3_1',
                                        value: null
                                    },
                                    sourceId: '20200221-1',
                                    env: null,
                                    app: {
                                        code: {
                                            index: '3_5_1',
                                            value: {
                                                _value: 1000117,
                                                _ver: 1
                                            }
                                        },
                                        app: {
                                            index: '3_5_5',
                                            value: {
                                                _value: 1000007,
                                                _ver: 1
                                            }
                                        }
                                    },
                                    wf: null,
                                    thing: [
                                        {
                                            acquired_time: {
                                                index: '4_2_2_4',
                                                value: null
                                            },
                                            code: {
                                                index: '4_1_2',
                                                value: {
                                                    _value: 1000300,
                                                    _ver: 1
                                                }
                                            },
                                            env: null,
                                            sourceId: null,
                                            id: {
                                                index: '4_1_1',
                                                value: null
                                            },
                                            'x-axis': {
                                                index: '4_2_2_1',
                                                value: null
                                            },
                                            'y-axis': {
                                                index: '4_2_2_2',
                                                value: null
                                            },
                                            'z-axis': {
                                                index: '4_2_2_3',
                                                value: null
                                            }
                                        }
                                    ]
                                },
                                {
                                    id: {
                                        index: '3_1_1',
                                        value: 'ad7699e7-9955-2c06-5d8a-cf2d581398af'
                                    },
                                    code: {
                                        index: '3_1_2',
                                        value: {
                                            _value: 1000201,
                                            _ver: 1
                                        }
                                    },
                                    start: {
                                        index: '3_2_1',
                                        value: '2020-02-20T00:00:00.000+0900'
                                    },
                                    end: {
                                        index: '3_2_2',
                                        value: '2020-02-21T00:00:00.000+0900'
                                    },
                                    location: {
                                        index: '3_3_1',
                                        value: null
                                    },
                                    sourceId: '202108-1',
                                    env: null,
                                    app: {
                                        code: {
                                            index: '3_5_1',
                                            value: {
                                                _value: 1000117,
                                                _ver: 1
                                            }
                                        },
                                        app: {
                                            index: '3_5_5',
                                            value: {
                                                _value: 1000007,
                                                _ver: 1
                                            }
                                        }
                                    },
                                    wf: null,
                                    thing: [
                                        {
                                            acquired_time: {
                                                index: '4_2_2_4',
                                                value: null
                                            },
                                            code: {
                                                index: '4_1_2',
                                                value: {
                                                    _value: 1000301,
                                                    _ver: 1
                                                }
                                            },
                                            env: null,
                                            sourceId: null,
                                            id: {
                                                index: '4_1_1',
                                                value: null
                                            },
                                            'x-axis': {
                                                index: '4_2_2_1',
                                                value: null
                                            },
                                            'y-axis': {
                                                index: '4_2_2_2',
                                                value: null
                                            },
                                            'z-axis': {
                                                index: '4_2_2_3',
                                                value: null
                                            }
                                        }
                                    ]
                                }
                            ]
                        );
                    }
                } else if (block === 1000117) {
                    // wf：正常
                    if (type === 'document') {
                        res.status(ResponseCode.OK).json(
                            [
                                {
                                    id: {
                                        index: '2_1_1',
                                        value: 'c2107e2d-bfda-f8bb-55af-885ef0a793a1'
                                    },
                                    code: {
                                        index: '2_1_2',
                                        value: {
                                            _value: 1000009,
                                            _ver: 1
                                        }
                                    },
                                    createdAt: {
                                        index: '2_2_1',
                                        value: '2020-02-20T00:00:00.000+0900'
                                    },
                                    sourceId: '202108-1',
                                    wf: {
                                        code: {
                                            index: '2_3_1',
                                            value: {
                                                _value: 1000117,
                                                _ver: 1
                                            }
                                        },
                                        wf: {
                                            index: '2_3_2',
                                            value: {
                                                _value: 1000007,
                                                _ver: 1
                                            }
                                        },
                                        role: {
                                            index: '2_3_3',
                                            value: {
                                                _value: 1000005,
                                                _ver: 1
                                            }
                                        },
                                        staffId: {
                                            index: '2_3_4',
                                            value: 'wf01'
                                        }
                                    },
                                    app: null,
                                    chapter: [
                                        {
                                            title: 'イベント識別子',
                                            event: [
                                                'd09dd62e-15c4-07f9-9b47-6a0ebda9f039'
                                            ],
                                            sourceId: [
                                                '202107-1-1'
                                            ]
                                        }
                                    ]
                                }
                            ]);
                    } else if (type === 'event') {
                        res.status(ResponseCode.OK).json(
                            [
                                {
                                    id: {
                                        index: '3_1_1',
                                        value: 'd09dd62e-15c4-07f9-9b47-6a0ebda9f039'
                                    },
                                    code: {
                                        index: '3_1_2',
                                        value: {
                                            _value: 1000202,
                                            _ver: 1
                                        }
                                    },
                                    start: {
                                        index: '3_2_1',
                                        value: '2020-02-20T00:00:00.000+0900'
                                    },
                                    end: {
                                        index: '3_2_2',
                                        value: '2020-02-21T00:00:00.000+0900'
                                    },
                                    location: {
                                        index: '3_3_1',
                                        value: null
                                    },
                                    sourceId: '20200221-1',
                                    env: null,
                                    wf: {
                                        code: {
                                            index: '3_5_1',
                                            value: {
                                                _value: 1000117,
                                                _ver: 1
                                            }
                                        },
                                        wf: {
                                            index: '3_5_2',
                                            value: {
                                                _value: 1000007,
                                                _ver: 1
                                            }
                                        },
                                        role: {
                                            index: '3_5_3',
                                            value: {
                                                _value: 1000005,
                                                _ver: 1
                                            }
                                        },
                                        staffId: {
                                            index: '3_5_4',
                                            value: 'wf01'
                                        }
                                    },
                                    app: null,
                                    thing: [
                                        {
                                            acquired_time: {
                                                index: '4_2_2_4',
                                                value: null
                                            },
                                            code: {
                                                index: '4_1_2',
                                                value: {
                                                    _value: 1000302,
                                                    _ver: 1
                                                }
                                            },
                                            env: null,
                                            sourceId: null,
                                            id: {
                                                index: '4_1_1',
                                                value: null
                                            },
                                            'x-axis': {
                                                index: '4_2_2_1',
                                                value: null
                                            },
                                            'y-axis': {
                                                index: '4_2_2_2',
                                                value: null
                                            },
                                            'z-axis': {
                                                index: '4_2_2_3',
                                                value: null
                                            }
                                        }
                                    ]
                                },
                                {
                                    id: {
                                        index: '3_1_1',
                                        value: 'ad7699e7-9955-2c06-5d8a-cf2d581398af'
                                    },
                                    code: {
                                        index: '3_1_2',
                                        value: {
                                            _value: 1000203,
                                            _ver: 1
                                        }
                                    },
                                    start: {
                                        index: '3_2_1',
                                        value: '2020-02-20T00:00:00.000+0900'
                                    },
                                    end: {
                                        index: '3_2_2',
                                        value: '2020-02-21T00:00:00.000+0900'
                                    },
                                    location: {
                                        index: '3_3_1',
                                        value: null
                                    },
                                    sourceId: '202107-1',
                                    env: null,
                                    wf: {
                                        code: {
                                            index: '3_5_1',
                                            value: {
                                                _value: 1000117,
                                                _ver: 1
                                            }
                                        },
                                        wf: {
                                            index: '3_5_2',
                                            value: {
                                                _value: 1000007,
                                                _ver: 1
                                            }
                                        },
                                        role: {
                                            index: '3_5_3',
                                            value: {
                                                _value: 1000005,
                                                _ver: 1
                                            }
                                        },
                                        staffId: {
                                            index: '3_5_4',
                                            value: 'wf01'
                                        }
                                    },
                                    app: null,
                                    thing: [
                                        {
                                            acquired_time: {
                                                index: '4_2_2_4',
                                                value: null
                                            },
                                            code: {
                                                index: '4_1_2',
                                                value: {
                                                    _value: 1000303,
                                                    _ver: 1
                                                }
                                            },
                                            env: null,
                                            sourceId: null,
                                            id: {
                                                index: '4_1_1',
                                                value: null
                                            },
                                            'x-axis': {
                                                index: '4_2_2_1',
                                                value: null
                                            },
                                            'y-axis': {
                                                index: '4_2_2_2',
                                                value: null
                                            },
                                            'z-axis': {
                                                index: '4_2_2_3',
                                                value: null
                                            }
                                        }
                                    ]
                                }
                            ]
                        );
                    }
                } else if (block === 1000118) {
                    // app:ドキュメント取得異常
                    res.status(ResponseCode.OK).json([]);
                } else if (block === 1000119) {
                    // app：HTML生成URLが取得できない
                    if (type === 'document') {
                        res.status(ResponseCode.OK).json(
                            [
                                {
                                    id: {
                                        index: '2_1_1',
                                        value: 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6'
                                    },
                                    code: {
                                        index: '2_1_2',
                                        value: {
                                            _value: 1000018,
                                            _ver: 1
                                        }
                                    },
                                    createdAt: {
                                        index: '2_2_1',
                                        value: '2020-02-20T00:00:00.000+0900'
                                    },
                                    sourceId: '202108-1',
                                    wf: null,
                                    app: {
                                        code: {
                                            index: '2_3_1',
                                            value: {
                                                _value: 1000117,
                                                _ver: 1
                                            }
                                        },
                                        app: {
                                            index: '2_3_5',
                                            value: {
                                                _value: 1000007,
                                                _ver: 1
                                            }
                                        }
                                    },
                                    chapter: [
                                        {
                                            title: 'イベント識別子',
                                            event: [
                                                '4f75161a-449a-4839-be6a-4cc577b8a8d0'
                                            ],
                                            sourceId: [
                                                '202108-1'
                                            ]
                                        }
                                    ]
                                }
                            ]
                        );
                    } else if (type === 'event') {
                        res.status(ResponseCode.OK).json(
                            [
                                {
                                    id: {
                                        index: '3_1_1',
                                        value: '4f75161a-449a-4839-be6a-4cc577b8a8d0'
                                    },
                                    code: {
                                        index: '3_1_2',
                                        value: {
                                            _value: 1000200,
                                            _ver: 1
                                        }
                                    },
                                    start: {
                                        index: '3_2_1',
                                        value: '2020-02-20T00:00:00.000+0900'
                                    },
                                    end: {
                                        index: '3_2_2',
                                        value: '2020-02-21T00:00:00.000+0900'
                                    },
                                    location: {
                                        index: '3_3_1',
                                        value: null
                                    },
                                    sourceId: '20200221-1',
                                    env: null,
                                    app: null,
                                    wf: {
                                        code: {
                                            index: '3_5_1',
                                            value: {
                                                _value: 1000004,
                                                _ver: 1
                                            }
                                        },
                                        wf: {
                                            index: '3_5_2',
                                            value: {
                                                _value: 1000007,
                                                _ver: 1
                                            }
                                        },
                                        role: {
                                            index: '3_5_3',
                                            value: {
                                                _value: 1000005,
                                                _ver: 1
                                            }
                                        }
                                    },
                                    thing: [
                                        {
                                            acquired_time: {
                                                index: '4_2_2_4',
                                                value: null
                                            },
                                            code: {
                                                index: '4_1_2',
                                                value: {
                                                    _value: 1000300,
                                                    _ver: 1
                                                }
                                            },
                                            env: null,
                                            sourceId: null,
                                            id: {
                                                index: '4_1_1',
                                                value: null
                                            },
                                            'x-axis': {
                                                index: '4_2_2_1',
                                                value: null
                                            },
                                            'y-axis': {
                                                index: '4_2_2_2',
                                                value: null
                                            },
                                            'z-axis': {
                                                index: '4_2_2_3',
                                                value: null
                                            }
                                        }
                                    ]
                                },
                                {
                                    id: {
                                        index: '3_1_1',
                                        value: 'ad7699e7-9955-2c06-5d8a-cf2d581398af'
                                    },
                                    code: {
                                        index: '3_1_2',
                                        value: {
                                            _value: 1000201,
                                            _ver: 1
                                        }
                                    },
                                    start: {
                                        index: '3_2_1',
                                        value: '2020-02-20T00:00:00.000+0900'
                                    },
                                    end: {
                                        index: '3_2_2',
                                        value: '2020-02-21T00:00:00.000+0900'
                                    },
                                    location: {
                                        index: '3_3_1',
                                        value: null
                                    },
                                    sourceId: '202108-1',
                                    env: null,
                                    app: null,
                                    wf: {
                                        code: {
                                            index: '3_5_1',
                                            value: {
                                                _value: 1000004,
                                                _ver: 1
                                            }
                                        },
                                        wf: {
                                            index: '3_5_2',
                                            value: {
                                                _value: 1000007,
                                                _ver: 1
                                            }
                                        },
                                        role: {
                                            index: '3_5_3',
                                            value: {
                                                _value: 1000005,
                                                _ver: 1
                                            }
                                        }
                                    },
                                    thing: [
                                        {
                                            acquired_time: {
                                                index: '4_2_2_4',
                                                value: null
                                            },
                                            code: {
                                                index: '4_1_2',
                                                value: {
                                                    _value: 1000301,
                                                    _ver: 1
                                                }
                                            },
                                            env: null,
                                            sourceId: null,
                                            id: {
                                                index: '4_1_1',
                                                value: null
                                            },
                                            'x-axis': {
                                                index: '4_2_2_1',
                                                value: null
                                            },
                                            'y-axis': {
                                                index: '4_2_2_2',
                                                value: null
                                            },
                                            'z-axis': {
                                                index: '4_2_2_3',
                                                value: null
                                            }
                                        }
                                    ]
                                }
                            ]
                        );
                    }
                } else if (block === 1000120) {
                    // app：HTML生成URLが取得できない
                    if (type === 'document') {
                        res.status(ResponseCode.OK).json(
                            [
                                {
                                    id: {
                                        index: '2_1_1',
                                        value: 'fedc51ce-2efd-4ade-9bbe-45dc445ae9c6'
                                    },
                                    code: {
                                        index: '2_1_2',
                                        value: {
                                            _value: 1000018,
                                            _ver: 1
                                        }
                                    },
                                    createdAt: {
                                        index: '2_2_1',
                                        value: '2020-02-20T00:00:00.000+0900'
                                    },
                                    sourceId: '202108-1',
                                    wf: null,
                                    app: {
                                        code: {
                                            index: '2_3_1',
                                            value: {
                                                _value: 1000117,
                                                _ver: 1
                                            }
                                        },
                                        app: {
                                            index: '2_3_5',
                                            value: {
                                                _value: 1000007,
                                                _ver: 1
                                            }
                                        }
                                    },
                                    chapter: [
                                        {
                                            title: 'イベント識別子'
                                        }
                                    ]
                                }
                            ]
                        );
                    } else if (type === 'event') {
                        res.status(ResponseCode.OK).json(
                            [
                                {
                                    id: {
                                        index: '3_1_1',
                                        value: '4f75161a-449a-4839-be6a-4cc577b8a8d0'
                                    },
                                    code: {
                                        index: '3_1_2',
                                        value: {
                                            _value: 1000200,
                                            _ver: 1
                                        }
                                    },
                                    start: {
                                        index: '3_2_1',
                                        value: '2020-02-20T00:00:00.000+0900'
                                    },
                                    end: {
                                        index: '3_2_2',
                                        value: '2020-02-21T00:00:00.000+0900'
                                    },
                                    location: {
                                        index: '3_3_1',
                                        value: null
                                    },
                                    sourceId: '20200221-1',
                                    env: null,
                                    app: null,
                                    wf: {
                                        code: {
                                            index: '3_5_1',
                                            value: {
                                                _value: 1000004,
                                                _ver: 1
                                            }
                                        },
                                        wf: {
                                            index: '3_5_2',
                                            value: {
                                                _value: 1000007,
                                                _ver: 1
                                            }
                                        },
                                        role: {
                                            index: '3_5_3',
                                            value: {
                                                _value: 1000005,
                                                _ver: 1
                                            }
                                        }
                                    },
                                    thing: [
                                        {
                                            acquired_time: {
                                                index: '4_2_2_4',
                                                value: null
                                            },
                                            code: {
                                                index: '4_1_2',
                                                value: {
                                                    _value: 1000300,
                                                    _ver: 1
                                                }
                                            },
                                            env: null,
                                            sourceId: null,
                                            id: {
                                                index: '4_1_1',
                                                value: null
                                            },
                                            'x-axis': {
                                                index: '4_2_2_1',
                                                value: null
                                            },
                                            'y-axis': {
                                                index: '4_2_2_2',
                                                value: null
                                            },
                                            'z-axis': {
                                                index: '4_2_2_3',
                                                value: null
                                            }
                                        }
                                    ]
                                },
                                {
                                    id: {
                                        index: '3_1_1',
                                        value: 'ad7699e7-9955-2c06-5d8a-cf2d581398af'
                                    },
                                    code: {
                                        index: '3_1_2',
                                        value: {
                                            _value: 1000201,
                                            _ver: 1
                                        }
                                    },
                                    start: {
                                        index: '3_2_1',
                                        value: '2020-02-20T00:00:00.000+0900'
                                    },
                                    end: {
                                        index: '3_2_2',
                                        value: '2020-02-21T00:00:00.000+0900'
                                    },
                                    location: {
                                        index: '3_3_1',
                                        value: null
                                    },
                                    sourceId: '202108-1',
                                    env: null,
                                    app: null,
                                    wf: {
                                        code: {
                                            index: '3_5_1',
                                            value: {
                                                _value: 1000004,
                                                _ver: 1
                                            }
                                        },
                                        wf: {
                                            index: '3_5_2',
                                            value: {
                                                _value: 1000007,
                                                _ver: 1
                                            }
                                        },
                                        role: {
                                            index: '3_5_3',
                                            value: {
                                                _value: 1000005,
                                                _ver: 1
                                            }
                                        }
                                    },
                                    thing: [
                                        {
                                            acquired_time: {
                                                index: '4_2_2_4',
                                                value: null
                                            },
                                            code: {
                                                index: '4_1_2',
                                                value: {
                                                    _value: 1000301,
                                                    _ver: 1
                                                }
                                            },
                                            env: null,
                                            sourceId: null,
                                            id: {
                                                index: '4_1_1',
                                                value: null
                                            },
                                            'x-axis': {
                                                index: '4_2_2_1',
                                                value: null
                                            },
                                            'y-axis': {
                                                index: '4_2_2_2',
                                                value: null
                                            },
                                            'z-axis': {
                                                index: '4_2_2_3',
                                                value: null
                                            }
                                        }
                                    ]
                                }
                            ]
                        );
                    }
                } else if (block === 1000400) {
                    res.status(ResponseCode.OK).json([
                        {
                            type: 1,
                            accessAt: '2000-08-01T00:00:00.000+0900',
                            shareCatalogCode: 1000200,
                            request: {
                                actor: {
                                    _value: 1000222,
                                    _ver: 1
                                },
                                block: {
                                    _value: 1000333,
                                    _ver: 1
                                }
                            },
                            document: [
                                {
                                    _code: {
                                        _value: 1002155,
                                        _ver: 1
                                    },
                                    count: 1
                                }
                            ],
                            event: [
                                {
                                    _code: {
                                        _value: 1000155,
                                        _ver: 1
                                    },
                                    count: 1
                                }
                            ],
                            thing: [
                                {
                                    _code: {
                                        _value: 1000344,
                                        _ver: 1
                                    },
                                    count: 1
                                }
                            ]
                        },
                        {
                            type: 1,
                            accessAt: '2000-01-01T00:00:00.000+0900',
                            shareCatalogCode: 1000201,
                            request: {
                                actor: {
                                    _value: 1000222,
                                    _ver: 1
                                },
                                block: {
                                    _value: 1000333,
                                    _ver: 1
                                }
                            },
                            document: null,
                            event: null,
                            thing: null
                        },
                        {
                            type: 1,
                            accessAt: '2000-01-01T00:00:00.000+0900',
                            logIdentifier: 'uuuuuuuu-uuuu-uuuu-uuuu-uuuuuuuuuuuu',
                            shareCatalogCode: 1000201,
                            request: {
                                actor: {
                                    _value: 1000222,
                                    _ver: 1
                                },
                                block: {
                                    _value: 1000333,
                                    _ver: 1
                                }
                            },
                            document: null,
                            event: null,
                            thing: null
                        }
                    ]);
                    return;
                } else {
                    throw Error('連携に失敗しました');
                }
                res.status(status).end();
            }
            res.status(status).end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app = express();
        this._app.use(bodyParser.json());
        this._app.post('/pxr-block-proxy', _listener);
        this._server = this._app.listen(3003);
    }
}
