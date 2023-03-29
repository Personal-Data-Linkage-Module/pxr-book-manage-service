/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import * as supertest from 'supertest';
import { Application } from '../resources/config/Application';
import Common from './Common';

// 対象アプリケーションを取得
const app = new Application();
const expressApp = app.express.app;
const common = new Common();

// サーバをlisten
app.start();

describe('book-manage API', () => {
    beforeAll(async () => {
        await common.connect();
        await common.executeSqlFile('initialData.sql');
    });
    afterAll(async () => {
        app.stop();
    });

    /**
     * 本人性確認事項取得
     */
    describe('本人性確認書類の取得', () => {
        test('Bookがない', async () => {
            const response = await supertest(expressApp).get('/book-manage/identification')
                .set({
                    accept: 'application/json',
                    'content-type': 'application/json',
                    session: encodeURIComponent(JSON.stringify({
                        sessionId: 'sessionId',
                        operatorId: 1,
                        type: 3,
                        loginId: 'loginid',
                        pxrId: '58di2dfse2.test.org',
                        name: 'test-user',
                        mobilePhone: '0311112222',
                        lastLoginAt: '2020-01-01T00:00:00.000+0900',
                        roles: [
                            {
                                _value: 1,
                                _ver: 1
                            }
                        ],
                        auth: {
                            book: {
                                create: true
                            }
                        },
                        block: {
                            _value: 1000112,
                            _ver: 1
                        },
                        actor: {
                            _value: 1000004,
                            _ver: 1
                        }
                    }))
                });

            expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 400, message: 'PXR-IDからブックが取得できませんでした' }));
            expect(response.status).toBe(400);
        });
        test('正常', async () => {
            await common.executeSqlString(`
            INSERT INTO pxr_book_manage.my_condition_book (
                id,
                pxr_id,
                status,
                book_close_available,
                book_close_available_at,
                attributes,
                appendix,
                force_deletion_flag,
                is_disabled,
                created_by,
                created_at,
                updated_by,
                updated_at
            ) VALUES (
                1,
                '58di2dfse2.test.org',
                0,
                false,
                null,
                '{}',
                null,
                false,
                false,
                'system',
                now(),
                'system',
                now()
            );
            INSERT INTO pxr_book_manage.identification (
                id,
                book_id,
                identification_code,
                identification_version,
                template,
                template_hash,
                is_disabled,
                created_by,
                created_at,
                updated_by,
                updated_at
            ) VALUES (
                1,
                1,
                300001,
                1,
                '{"a": "aaaaaaa"}',
                'a',
                false,
                'system',
                now(),
                'system',
                now()
            ),(
                2,
                1,
                300001,
                1,
                '{"b": "bbbbbbbbb"}',
                'a',
                false,
                'system',
                now(),
                'system',
                now()
            );`);
            const response = await supertest(expressApp)
                .get('/book-manage/identification')
                .set({
                    accept: 'application/json',
                    'content-type': 'application/json',
                    session: encodeURIComponent(JSON.stringify({
                        sessionId: 'sessionId',
                        operatorId: 1,
                        type: 3,
                        loginId: 'loginid',
                        pxrId: '58di2dfse2.test.org',
                        name: 'test-user',
                        mobilePhone: '0311112222',
                        lastLoginAt: '2020-01-01T00:00:00.000+0900',
                        roles: [
                            {
                                _value: 1,
                                _ver: 1
                            }
                        ],
                        auth: {
                            book: {
                                create: true
                            }
                        },
                        block: {
                            _value: 1000112,
                            _ver: 1
                        },
                        actor: {
                            _value: 1000004,
                            _ver: 1
                        }
                    }))
                });

            expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                pxrId: '58di2dfse2.test.org',
                identifications: [{ a: 'aaaaaaa' }, { b: 'bbbbbbbbb' }]
            }));
            expect(response.status).toBe(200);
        });
    });
});
