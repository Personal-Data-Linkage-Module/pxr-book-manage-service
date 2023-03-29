/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Server } from 'net';
/* eslint-enable */
import AppError from '../common/AppError';
import * as express from 'express';
import { ResponseCode } from '../common/ResponseCode';
import bodyParser = require('body-parser');

export default class StubCTokenServer {
    _app: express.Express;
    _server: Server;
    constructor (status: number) {
        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            if (status === ResponseCode.OK) {
                res.status(ResponseCode.OK);
                try {
                    // コード指定
                    if (req.body.document && req.body.document.length !== 0) {
                        const codes: {}[] = [];
                        for (const _document of req.body.document) {
                            if (_document._value === 1000006) {
                                codes.push({
                                    actor: { _value: 2000002, _ver: 1 },
                                    app: { _value: 1000005, _ver: 1 },
                                    wf: null
                                });
                            } else if (_document._value === 1000016) {
                                codes.push({
                                    actor: { _value: 2000002, _ver: 1 },
                                    app: { _value: 1000005, _ver: 1 },
                                    wf: null
                                });
                            } else if (_document._value === 1000066) {
                                codes.push({
                                    actor: { _value: 2000001, _ver: 1 },
                                    app: null,
                                    wf: { _value: 1000064, _ver: 1 }
                                });
                            } else if (_document._value === 1000026) {
                                // 異常系：ドキュメントとしては共有指定できないカタログコード（コード未一致）
                                codes.push({
                                    actor: { _value: 2000002, _ver: 1 },
                                    app: { _value: 1000005, _ver: 1 },
                                    wf: null
                                });
                            } else if (_document._value === 1000036) {
                                // 異常系：WFもAPPも存在しない
                                codes.push({
                                    actor: null,
                                    app: null,
                                    wf: null
                                });
                            } else if (_document._value === 1000046) {
                                codes.push({
                                    actor: { _value: 2000002, _ver: 1 },
                                    wf: null,
                                    app: { _value: 1000035, _ver: 1 }
                                });
                            } else if (_document._value === 1000056) {
                                codes.push({
                                    actor: { _value: 2000002, _ver: 1 },
                                    wf: null,
                                    app: { _value: 1000035, _ver: 1 }
                                });
                            } else if (_document._value === 1000099) {
                                codes.push({
                                    actor: { _value: 2000001, _ver: 1 },
                                    wf: null,
                                    app: { _value: 2000001, _ver: 1 }
                                });
                            }
                        }
                        res.json({ document: codes });
                    } else if (req.body.event && req.body.event.length !== 0) {
                        const codes: {}[] = [];
                        for (const _event of req.body.event) {
                            if (_event._value === 1000008) {
                                codes.push({
                                    actor: { _value: 2000002, _ver: 1 },
                                    app: { _value: 1000035, _ver: 1 },
                                    wf: null
                                });
                            } else if (_event._value === 1000018) {
                                codes.push({
                                    actor: { _value: 2000001, _ver: 1 },
                                    app: { _value: 1000004, _ver: 1 },
                                    wf: null
                                });
                            } else if (_event._value === 1000028) {
                                // 異常系：アクターとの関係がなく共有不可（対ワークフロー）
                                codes.push({
                                    actor: { _value: 2000001, _ver: 1 },
                                    app: null,
                                    wf: { _value: 1000024, _ver: 1 }
                                });
                            } else if (_event._value === 1000038) {
                                // 異常系：アクターとの関係がなく共有不可（対アプリケーション）
                                codes.push({
                                    actor: { _value: 2000002, _ver: 1 },
                                    app: { _value: 1000025, _ver: 1 },
                                    wf: null
                                });
                            } else if (_event._value === 1000048) {
                                // 異常系： イベントとしては共有指定できないカタログコード（コード未一致）
                                codes.push({
                                    actor: { _value: 2000002, _ver: 1 },
                                    app: { _value: 1000005, _ver: 1 },
                                    wf: null
                                });
                            } else if (_event._value === 1000068) {
                                // 異常系： イベントとしては共有指定できないカタログコード（コード未一致）
                                codes.push({
                                    actor: { _value: 2000001, _ver: 1 },
                                    app: null,
                                    wf: { _value: 1000064, _ver: 1 }
                                });
                            }
                        }
                        res.json({ event: codes });
                    } else if (req.body.thing && req.body.thing.length !== 0) {
                        const codes: {}[] = [];
                        for (const _thing of req.body.thing) {
                            if (_thing._value === 1000011) {
                                codes.push({
                                    actor: { _value: 2000002, _ver: 1 },
                                    app: { _value: 1000035, _ver: 1 },
                                    wf: null
                                });
                            } else if (_thing._value === 1000021) {
                                codes.push({
                                    actor: { _value: 2000011, _ver: 1 },
                                    app: null,
                                    wf: { _value: 1000004, _ver: 1 }
                                });
                            } else if (_thing._value === 1000031) {
                                // 異常系：モノとしては共有指定できないカタログコード（コード未一致）
                                codes.push({
                                    actor: { _value: 2000002, _ver: 1 },
                                    app: { _value: 1000054, _ver: 1 },
                                    wf: null
                                });
                            } else if (_thing._value === 1000061) {
                                // 異常系：モノとしては共有指定できないカタログコード（コード未一致）
                                codes.push({
                                    actor: { _value: 2000001, _ver: 1 },
                                    app: null,
                                    wf: { _value: 1000064, _ver: 1 }
                                });
                            }
                        }
                        res.json({ thing: codes });
                        // Identifier指定
                    } else if (req.body.identifier.document && req.body.identifier.document.length !== 0) {
                        const codes: {}[] = [];
                        for (const _documentId of req.body.identifier.document) {
                            if (_documentId === 'fedc51ce-2efd-4ade-9bbe-45dc445ae9d0') {
                                codes.push({
                                    actor: { _value: 2000002, _ver: 1 },
                                    app: { _value: 1000015, _ver: 1 },
                                    wf: null
                                });
                            } else if (_documentId === 'fedc51ce-2efd-4ade-9bbe-45dc445ae9d1') {
                                codes.push({
                                    actor: { _value: 2000001, _ver: 1 },
                                    app: null,
                                    wf: { _value: 1000014, _ver: 1 }
                                });
                            } else if (_documentId === 'fedc51ce-2efd-4ade-9bbe-45dc445ae9d2') {
                                codes.push({
                                    actor: { _value: 2000002, _ver: 1 },
                                    app: { _value: 1000005, _ver: 1 },
                                    wf: null
                                });
                            } else if (_documentId === 'doc01-89bb-f8f2-74a0-dc517da60653') {
                                codes.push({
                                    actor: { _value: 2000003, _ver: 1 },
                                    app: null,
                                    wf: { _value: 2000004, _ver: 1 }
                                });
                            } else if (_documentId === 'doc02-ceb1-fd2b-d9ac-e405f5159fe2') {
                                codes.push({
                                    actor: { _value: 2000003, _ver: 1 },
                                    app: null,
                                    wf: { _value: 2000014, _ver: 1 }
                                });
                            } else if (_documentId === 'doc03-baa1-8808-dbeb-63b6-f09a1cf8e1fb') {
                                codes.push({
                                    actor: { _value: 2000003, _ver: 1 },
                                    app: null,
                                    wf: { _value: 2000024, _ver: 1 }
                                });
                            }
                        }
                        res.json({ document: codes });
                    } else if (req.body.identifier.event && req.body.identifier.event.length !== 0) {
                        const codes: {}[] = [];
                        for (const _eventId of req.body.identifier.event) {
                            if (_eventId === 'fedc51ce-2efd-4ade-9bbe-45dc445ae9e0') {
                                codes.push({
                                    actor: { _value: 2000001, _ver: 1 },
                                    app: { _value: 1000005, _ver: 1 },
                                    wf: null
                                });
                            } else if (_eventId === 'fedc51ce-2efd-4ade-9bbe-45dc445ae9e1') {
                                codes.push({
                                    actor: { _value: 2000002, _ver: 1 },
                                    app: { _value: 1000015, _ver: 1 },
                                    wf: null
                                });
                            } else if (_eventId === 'fedc51ce-2efd-4ade-9bbe-45dc445ae9e2') {
                                codes.push({
                                    actor: { _value: 2000001, _ver: 1 },
                                    app: null,
                                    wf: { _value: 1000014, _ver: 1 }
                                });
                            } else if (_eventId === 'doc01-eve01-8eb5-9b57-ac1980208f21') {
                                codes.push({
                                    actor: { _value: 2000003, _ver: 1 },
                                    app: null,
                                    wf: { _value: 2000034, _ver: 1 }
                                });
                            } else if (_eventId === 'doc01-eve02-e230-930c-c43d5050b9d3') {
                                codes.push({
                                    actor: { _value: 2000003, _ver: 1 },
                                    app: null,
                                    wf: { _value: 2000044, _ver: 1 }
                                });
                            } else if (_eventId === 'eve02-b098-8327-feb5-0927-91afeba51114') {
                                codes.push({
                                    actor: { _value: 2000003, _ver: 1 },
                                    app: null,
                                    wf: { _value: 2000054, _ver: 1 }
                                });
                            } else if (_eventId === 'eve01-c31-459a-479e-794b-6302046a04c5') {
                                codes.push({
                                    actor: { _value: 2000003, _ver: 1 },
                                    app: null,
                                    wf: { _value: 2000064, _ver: 1 }
                                });
                            }
                        }
                        res.json({ event: codes });
                    } else if (req.body.identifier.thing && req.body.identifier.thing.length !== 0) {
                        const codes: {}[] = [];
                        for (const _thingId of req.body.identifier.thing) {
                            if (_thingId === 'fedc51ce-2efd-4ade-9bbe-45dc445ae9t0') {
                                codes.push({
                                    actor: { _value: 2000002, _ver: 1 },
                                    app: { _value: 1000005, _ver: 1 },
                                    wf: null
                                });
                            } else if (_thingId === 'fedc51ce-2efd-4ade-9bbe-45dc445ae9t1') {
                                codes.push({
                                    actor: { _value: 2000011, _ver: 1 },
                                    app: null,
                                    wf: { _value: 1000004, _ver: 1 }
                                });
                            } else if (_thingId === 'fedc51ce-2efd-4ade-9bbe-45dc445ae9t2') {
                                codes.push({
                                    actor: { _value: 2000002, _ver: 1 },
                                    app: { _value: 1000035, _ver: 1 },
                                    wf: null
                                });
                            } else if (_thingId === 'fedc51ce-2efd-4ade-9bbe-45dc445ae9t3') {
                                codes.push({
                                    actor: { _value: 2000002, _ver: 1 },
                                    app: { _value: 1000035, _ver: 1 },
                                    wf: null
                                });
                            } else if (_thingId === 'doc01-eve01-thi01-c4e0-130b2788dcf4') {
                                codes.push({
                                    actor: { _value: 2000003, _ver: 1 },
                                    app: null,
                                    wf: { _value: 2000074, _ver: 1 }
                                });
                            } else if (_thingId === 'doc02-eve01-thi01-3f9d-58151c94fdad') {
                                codes.push({
                                    actor: { _value: 2000003, _ver: 1 },
                                    app: null,
                                    wf: { _value: 2000084, _ver: 1 }
                                });
                            } else if (_thingId === 'doc02-eve02-thi01-fece-a0a7-889462ef21d2') {
                                codes.push({
                                    actor: { _value: 2000003, _ver: 1 },
                                    app: null,
                                    wf: { _value: 2000094, _ver: 1 }
                                });
                            } else if (_thingId === 'eve01-thi02-1441-31d7-5725-f22548ac0cb9') {
                                codes.push({
                                    actor: { _value: 2000003, _ver: 1 },
                                    app: null,
                                    wf: { _value: 2000104, _ver: 1 }
                                });
                            } else if (_thingId === 'eve01-thi01-ec81-35af-e85f-b6fe2d3dcd4f') {
                                codes.push({
                                    actor: { _value: 2000003, _ver: 1 },
                                    app: null,
                                    wf: { _value: 2000114, _ver: 1 }
                                });
                            } else if (_thingId === 'thi02-9-1056-c4ed-edd4-9bcd2eb96902') {
                                codes.push({
                                    actor: { _value: 2000003, _ver: 1 },
                                    app: null,
                                    wf: { _value: 2000124, _ver: 1 }
                                });
                            } else if (_thingId === 'thi01-84c6-06f5-d1c8-64f5-dd1b70e55058') {
                                codes.push({
                                    actor: { _value: 2000003, _ver: 1 },
                                    app: null,
                                    wf: { _value: 2000134, _ver: 1 }
                                });
                            } else if (_thingId === 'thi01-84c6-06f5-d1c8-64f5-dd1b70e55071') {
                                codes.push({
                                    actor: { _value: 2000002, _ver: 1 },
                                    app: { _value: 1000015, _ver: 1 },
                                    wf: null
                                });
                            }
                        }
                        res.json({ thing: codes });
                    }
                } catch (e) {
                    console.log(e);
                    throw new AppError(e, 401);
                }
                res.status(400).end();
            } else {
                res.status(status).end();
            }
        };
        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app = express();
        this._app.use(bodyParser.json());
        this._app.post('/ctoken-ledger', _listener);
        this._server = this._app.listen(3008);
    }
}
