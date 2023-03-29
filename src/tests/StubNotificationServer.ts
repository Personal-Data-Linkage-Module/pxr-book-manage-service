/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Server } from 'net';
/* eslint-enable */
import * as express from 'express';

/**
 * 通知サービス
 */
export default class StubNotificationServer {
    _app: express.Express;
    _server: Server;

    constructor (status: number) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            if (status === 200) {
                res.status(status).json({
                    id: 1
                });
                return;
            }
            res.status(status).end();
        };
        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.post('/notification', _listener);
        this._server = this._app.listen(3004);
    }
}
