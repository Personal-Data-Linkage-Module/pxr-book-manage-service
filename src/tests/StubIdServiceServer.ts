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
 * ID Service サーバー
 */
export default class StubIdServiceServer {
    _app: express.Express;
    _server: Server;

    constructor (status: number, isExist = true) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status);
            res.json({});
            res.end();
        };
        const _listener2 = (req: express.Request, res: express.Response) => {
            res.status(status).end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.use(bodyParser.json());
        this._app.post('/users/:pxrId/threekey', _listener);
        this._app.delete('/users/:uid', _listener2);
        this._server = this._app.listen(5001);
    }
}
