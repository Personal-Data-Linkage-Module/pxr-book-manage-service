/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import supertest = require('supertest');
import { Application } from '../resources/config/Application';
import Common from './Common';
import { CatalogService, OperatorServiceFailedGet } from './16-00.StubServer';
import { TestRequest } from './01-00.TestRequest';
/* eslint-enable */

const app = new Application();
const expressApp = app.express.app;
const common = new Common();
app.start();

const operatorService = new OperatorServiceFailedGet();
const catalogService = new CatalogService();

jest.mock('../common/Config', () => ({
    ...jest.requireActual('../common/Config') as any,
    default: {
        ReadConfig: jest.fn((path: string) => {
            const fs = require('fs');
            if (path === './config/config.json') {
                return {
                    operatorUrl: 'http://localhost:3000/operator',
                    catalogUrl: 'http://localhost:3001/catalog',
                    identityUrl: 'http://localhost:3007/identity-verificate',
                    notificationUrl: 'http://localhost:3004/notification',
                    ctokenLedgerUrl: 'http://localhost:3008/ctoken-ledger',
                    bookOperateUrl: 'http://localhost:3006/book-operate',
                    initialPasswordExpire: 7,
                    extName: 'test-org',
                    pxrRootGrobalSettingNs: 'catalog/ext/test-org/setting/actor/pxr-root/actor_1000001',
                    pxrRootNs: 'catalog/ext/{extName}/actor/pxr-root',
                    globalCatalogCode: 1000374,
                    urlMappingCreateHtmlNs: 'catalog/ext/{ext_name}/url-mapping/actor_{actorCode}/create-html-function',
                    builtInUrlMappingCreateHtmlNs: 'catalog/built_in/url-mapping/create-html-function',
                    pxrRootActorSettingNs: 'catalog/ext/{ext_name}/setting/actor/pxr-root/actor_{actorCode}',
                    sharingRestrictionCatalogNs: 'catalog/ext/{ext_name}/actor/{app_or_wf}/actor_{actor_code}/sharing-restriction',
                    password: {
                        initLength: 12,
                        hashSalt: 'PT4h6YUq',
                        hashStrechCount: 5000
                    },
                    proxyService: {
                        proxy: 'http://localhost:3003/pxr-block-proxy'
                    },
                    timezone: 'Asia/Tokyo'
                };
            } else {
                return JSON.parse(fs.readFileSync(path, 'UTF-8'));
            }
        })
    }
}));

describe('Book Manage Service.Book Deletion API Controller', () => {
    beforeAll(async () => {
        await common.connect();
        await common.executeSqlFile('initialData.sql');
        await operatorService.start();
        await catalogService.start();
    });
    afterAll(async () => {
        app.stop();
        await operatorService.stop();
        await catalogService.stop();
    });

    test('正常系：Book開設', async () => {
        const response = await supertest(expressApp)
            .post('/book-manage')
            .set({
                'Content-Type': 'application/json',
                accept: 'application/json'
            })
            .set('Cookie', ['operator_type3_session=ac0a665d2e55d9c73116c6326cb9e064e35938789aacf478b0c386c98bcffc94'])
            .send(TestRequest.SUCCESS01);

        expect(JSON.stringify(response.body)).toBe(JSON.stringify({
            pxrId: '58di2dfse2.test.org',
            initialPassword: response.body.initialPassword,
            attributes: {},
            appendix: null,
            identifyCode: null
        }));
        expect(response.status).toBe(200);
    });
    test('異常系：オペレーターサービスでのオペレーター検索に失敗', async () => {
        const response = await supertest(expressApp)
            .put('/book-manage/force-deletion')
            .set({
                'Content-Type': 'application/json',
                accept: 'application/json'
            })
            .set('Cookie', ['operator_type3_session=ac0a665d2e55d9c73116c6326cb9e064e35938789aacf478b0c386c98bcffc94'])
            .send({
                pxrId: '58di2dfse2.test.org'
            });

        expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 503, message: 'オペレーター情報の取得に失敗しました' }));
        expect(response.status).toBe(503);
    });
});
