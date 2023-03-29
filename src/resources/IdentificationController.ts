/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Request } from 'express';
import { JsonController, Get, Req, Header } from 'routing-controllers';
import EnableSimpleBackPressure from './backpressure/EnableSimpleBackPressure';
import SessionCheckService from '../services/SessionCheckService';
import Config from '../common/Config';
import EntityOperation from '../repositories/EntityOperation';
/* eslint-enable */

@JsonController('/book-manage')
export default class {
    /**
     * 本人性確認事項取得（非推奨）
     * @param req
     * @returns
     * @deprecated 代わりに GET /identification を使用
     */
    @Get('/ind/identification')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    async getIdentification (@Req() req: Request) {
        const message = Config.ReadConfig('./config/message.json');
        const operator = await new SessionCheckService().authMe(
            req,
            Config.ReadConfig('./config/config.json')['operatorUrl']
        );
        const entities = await EntityOperation.getIdentifications(operator, message);
        const identifications = [];
        for (const entity of entities) {
            identifications.push(JSON.parse(entity.template));
        }
        return {
            pxrId: operator.getPxrId(),
            identifications: identifications
        };
    }

    /**
     * 本人性確認事項取得
     * @param req
     * @returns
     */
    @Get('/identification')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    async getPersonIdentification (@Req() req: Request) {
        const message = Config.ReadConfig('./config/message.json');
        const operator = await new SessionCheckService().authMe(
            req,
            Config.ReadConfig('./config/config.json')['operatorUrl']
        );
        const entities = await EntityOperation.getIdentifications(operator, message);
        const identifications = [];
        for (const entity of entities) {
            identifications.push(JSON.parse(entity.template));
        }
        return {
            pxrId: operator.getPxrId(),
            identifications: identifications
        };
    }
}
