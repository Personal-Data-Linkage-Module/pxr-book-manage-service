/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Server } from 'net';
/* eslint-enable */
import * as express from 'express';

/**
 * ID Service サーバー
 */
export default class StubIdServiceReleaseServer {
    _app: express.Express;
    _server: Server;

    constructor (status: number, message: boolean = false) {
        this._app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status);
            if (message) {
                res.json([{ message: '対象のデータが存在しません。' }]);
            }
            res.json({

            });
            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this._app.delete('/users/:pxrId/threekey/:regionCode_or_applicationActorCode_appCode_or_wfCode/:userId', _listener);
        this._server = this._app.listen(5001);
    }
}
