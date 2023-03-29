/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Server } from 'net';
/* eslint-enable */
import * as express from 'express';
import { ResponseCode } from '../common/ResponseCode';

/**
 * HTML作成 サーバー
 */
export default class StubCreateHtmlFunctionServer {
    _app: express.Express;
    _server: Server;

    constructor (status: number) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            if (status === ResponseCode.OK) {
                const id = req.params.id;
                res.json({
                    html: '<html> id = ' + id + ' </html>'
                });
                return;
            }
            res.status(status).end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.post('/create-html-function/:id', _listener);
        this._server = this._app.listen(6001);
    }
}
