/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import express = require('express');
import { Server } from 'net';
import bodyParser = require('body-parser');
import PxrRoot = require('./catalog/pxr-root.json');
import ItemType = require('./catalog/item-type.json');
import Document = require('./catalog/document.json');
import Event_ = require('./catalog/event.json');
import Thing = require('./catalog/thing.json');
import Share = require('./catalog/share.json');
import Trigger = require('./catalog/trigger.json');
import Catalog1 = require('./catalog/1.json');
import Catalog30001 = require('./catalog/30001.json');
import Catalog1000110 = require('./catalog/1000110.json');
import Catalog1000020 = require('./catalog/1000020.json');
import Catalog1000021 = require('./catalog/1000021.json');
import Catalog1000022 = require('./catalog/1000022.json');
import Catalog1000023 = require('./catalog/1000023.json');
import Catalog1000359 = require('./catalog/1000359.json');
import Catalog1000007 = require('./catalog/1000007.json');
import Catalog1000008 = require('./catalog/1000008.json');
import Catalog1000001 = require('./catalog/1000001.json');
import Catalog1000002 = require('./catalog/1000002.json');
import Catalog1000003 = require('./catalog/1000003.json');
import Catalog1000004 = require('./catalog/1000004.json');
import Catalog1000005 = require('./catalog/1000005.json');
import Catalog1000009 = require('./catalog/1000009.json');
import Catalog1000010 = require('./catalog/1000010.json');
import Catalog1000014 = require('./catalog/1000014.json');
import Catalog1000015 = require('./catalog/1000015.json');
import Catalog1000017 = require('./catalog/1000017.json');
import Catalog1000024 = require('./catalog/1000024.json');
import Catalog1000018 = require('./catalog/1000018.json');
import Catalog1000025 = require('./catalog/1000025.json');
// import Catalog1000104 = require('./catalog/1000104.json');
import Catalog1000117 = require('./catalog/1000117.json');
import Catalog1000501 = require('./catalog/1000501.json');
import Catalog1000511 = require('./catalog/1000511.json');
import Catalog1000512 = require('./catalog/1000512.json');
import Catalog1000502 = require('./catalog/1000502.json');
import Catalog1000099 = require('./catalog/1000099.json');
import Operator58di2dfse2_test_org = require('./operator/58di2dfse2.test.org.json');
import Operatorac0a665d2e55d9c73116c6326cb9e064e35938789aacf478b0c386c98bcffc94 = require('./operator/ac0a665d2e55d9c73116c6326cb9e064e35938789aacf478b0c386c98bcffc94.json');
import Operatoree59bbc7fa4d13d853f65c412fe57a3c79af64ee710f3719b5485039d227bd8a = require('./operator/ee59bbc7fa4d13d853f65c412fe57a3c79af64ee710f3719b5485039d227bd8a.json');
import Operator5e59bbc7fa4d13d853f65c412fe57a3c79af64ee710f3719b5485039d227bd8a = require('./operator/5e59bbc7fa4d13d853f65c412fe57a3c79af64ee710f3719b5485039d227bd8a.json');
import Operatoreee9bbc7fa4d13d853f65c412fe57a3c79af64ee710f3719b5485039d227bd8a = require('./operator/eee9bbc7fa4d13d853f65c412fe57a3c79af64ee710f3719b5485039d227bd8a.json');
import Operator1234bbc7fa4d13d853f65c412fe57a3c79af64ee710f3719b5485039d227bd8a = require('./operator/1234bbc7fa4d13d853f65c412fe57a3c79af64ee710f3719b5485039d227bd8a.json');
/* eslint-enable */

export class BaseStubServer {
    server: Server;

    constructor (
        private port: number,
        public app = express()
    ) { }

    async start () {
        return new Promise<void>((resolve, reject) => {
            this.server = this.app.listen(this.port, () => { resolve(); });
        });
    }

    async stop () {
        return new Promise<void>((resolve, reject) => {
            this.server.close(err => {
                if (err) { reject(err); }
                resolve();
            });
        });
    }
}

export class OperatorService extends BaseStubServer {
    constructor (flag: boolean = true) {
        super(3000);
        if (flag) {
            this.base();
            this.app.put('/operator/:id', async (req, res) => {
                res.status(200).json({}).end();
            });
            this.app.get('/operator', async (req, res) => {
                const pxrId = req.query.pxrId;
                if (pxrId === '58di2dfse2.test.org') {
                    res.status(200).json(Operator58di2dfse2_test_org).end();
                } else {
                    console.log(`Missing Operator Service Pxr ID Handler: ${pxrId}`);
                    res.status(204).end();
                }
            });
            this.app.get('/operator/user/info', async (req, res) => {
                const pxrId = req.query.pxrId;
                if (pxrId === '58di2dfse2.test.org') {
                    res.status(200).json({
                        userInfo: {
                            _code: {
                                _value: 99999,
                                _ver: 1
                            },
                            'item-group': [
                                {
                                    title: '氏名',
                                    item: [
                                        {
                                            title: '姓',
                                            type: {
                                                _value: 30019,
                                                _ver: 1
                                            },
                                            content: 'サンプル'
                                        },
                                        {
                                            title: '名',
                                            type: {
                                                _value: 30020,
                                                _ver: 1
                                            },
                                            content: '太郎'
                                        }
                                    ]
                                },
                                {
                                    title: '氏名(ローマ字)',
                                    item: [
                                        {
                                            title: '姓(ローマ字)',
                                            type: {
                                                _value: 30119,
                                                _ver: 1
                                            },
                                            content: 'sample'
                                        },
                                        {
                                            title: '名(ローマ字)',
                                            type: {
                                                _value: 30120,
                                                _ver: 1
                                            },
                                            content: 'taro'
                                        }
                                    ]
                                },
                                {
                                    title: '連絡先',
                                    item: [
                                        {
                                            title: '電話番号',
                                            type: {
                                                _value: 30036,
                                                _ver: 1
                                            },
                                            content: '080-0000-0000'
                                        },
                                        {
                                            title: '郵便番号',
                                            type: {
                                                _value: 30122,
                                                _ver: 1
                                            },
                                            content: '000-0000'
                                        },
                                        {
                                            title: '住所',
                                            type: {
                                                _value: 30123,
                                                _ver: 1
                                            },
                                            content: '東京都港区'
                                        }
                                    ]
                                }
                            ]
                        }
                    }).end();
                } else if (pxrId === '68di2dfse2.test.org') {
                    // 異常：利用者情報のitem-groupが配列ではない
                    res.status(200).json({
                        userInfo: {
                            _code: {
                                _value: 99999,
                                _ver: 1
                            },
                            'item-group': {
                                title: '連絡先',
                                item: [
                                    {
                                        title: '電話番号',
                                        type: {
                                            _value: 30036,
                                            _ver: 1
                                        },
                                        content: '080-0000-0000'
                                    },
                                    {
                                        title: '郵便番号',
                                        type: {
                                            _value: 30122,
                                            _ver: 1
                                        },
                                        content: '000-0000'
                                    },
                                    {
                                        title: '住所',
                                        type: {
                                            _value: 30123,
                                            _ver: 1
                                        },
                                        content: '東京都港区'
                                    }
                                ]
                            }
                        }
                    }).end();
                } else if (pxrId === 'test.non') {
                    res.status(200).json({}).end();
                } else if (pxrId === 'opetratorServiceError.204') {
                    res.status(204).json({}).end();
                } else if (pxrId === 'opetratorServiceError.400') {
                    res.status(400).json({}).end();
                } else if (pxrId === 'opetratorServiceError.503') {
                    res.status(503).json({}).end();
                } else {
                    res.status(404).end();
                }
            });
        }
    }

    base () {
        this.app.use(bodyParser.json());
        this.app.post('/operator/session', async (req, res) => {
            const sessionId = req.body.sessionId;
            if (sessionId === 'ac0a665d2e55d9c73116c6326cb9e064e35938789aacf478b0c386c98bcffc94') {
                res.status(200).json(Operatorac0a665d2e55d9c73116c6326cb9e064e35938789aacf478b0c386c98bcffc94).end();
            } else if (sessionId === 'ee59bbc7fa4d13d853f65c412fe57a3c79af64ee710f3719b5485039d227bd8a') {
                res.status(200).json(Operatoree59bbc7fa4d13d853f65c412fe57a3c79af64ee710f3719b5485039d227bd8a).end();
            } else if (sessionId === '5e59bbc7fa4d13d853f65c412fe57a3c79af64ee710f3719b5485039d227bd8a') {
                res.status(200).json(Operator5e59bbc7fa4d13d853f65c412fe57a3c79af64ee710f3719b5485039d227bd8a).end();
            } else if (sessionId === 'eee9bbc7fa4d13d853f65c412fe57a3c79af64ee710f3719b5485039d227bd8a') {
                res.status(200).json(Operatoreee9bbc7fa4d13d853f65c412fe57a3c79af64ee710f3719b5485039d227bd8a).end();
            } else if (sessionId === '1234bbc7fa4d13d853f65c412fe57a3c79af64ee710f3719b5485039d227bd8a') {
                res.status(200).json(Operator1234bbc7fa4d13d853f65c412fe57a3c79af64ee710f3719b5485039d227bd8a).end();
            } else {
                res.status(400).end();
            }
        });
        this.app.post('/operator', (req, res) => {
            res.status(200).json().end();
        });
        this.app.post('/operator/user/info', (req, res) => {
            res.status(200).json().end();
        });
        this.app.post('/operator/user/info/search', (req, res) => {
            res.status(200).json().end();
        });
    }
}

export class OperatorServiceFailedUpdate extends OperatorService {
    constructor () {
        super(false);
        this.base();
        this.app.get('/operator', async (req, res) => {
            const pxrId = req.query.pxrId;
            if (pxrId === '58di2dfse2.test.org') {
                res.status(200).json(Operator58di2dfse2_test_org).end();
            } else {
                console.log(`Missing Operator Service Pxr ID Handler: ${pxrId}`);
                res.status(204).end();
            }
        });
        this.app.put('/operator/:id', async (req, res) => {
            res.status(400).json({}).end();
        });
    }
}

export class OperatorServiceFailedGet extends OperatorService {
    constructor () {
        super(false);
        this.base();
        this.app.get('/operator', (req, res) => {
            res.status(500).end();
        });
    }
}

export class OperatorServiceNotFound extends OperatorService {
    constructor () {
        super(false);
        this.base();
        this.app.get('/operator', (req, res) => {
            res.status(404).end();
        });
    }
}

export class CatalogService extends BaseStubServer {
    nsError: boolean = false;
    constructor () {
        super(3001);
        const handler = async (req: express.Request, res: express.Response) => {
            const code = parseInt(req.params.id);
            if (code === 1) {
                res.status(200).json(Catalog1).end();
            } else if (code === 30001) {
                res.status(200).json(Catalog30001).end();
            } else if (code === 1000020) {
                res.status(200).json(Catalog1000020).end();
            } else if (code === 1000021) {
                res.status(200).json(Catalog1000021).end();
            } else if (code === 1000022) {
                res.status(200).json(Catalog1000022).end();
            } else if (code === 1000023) {
                res.status(200).json(Catalog1000023).end();
            } else if (code === 1000110) {
                res.status(200).json(Catalog1000110).end();
            } else if (code === 1000359) {
                res.status(200).json(Catalog1000359).end();
            } else if (code === 1000007) {
                res.status(200).json(Catalog1000007).end();
            } else if (code === 1000008) {
                res.status(200).json(Catalog1000008).end();
            } else if (code === 1000001) {
                res.status(200).json(Catalog1000001).end();
            } else if (code === 1000002) {
                res.status(200).json(Catalog1000002).end();
            } else if (code === 1000003) {
                res.status(200).json(Catalog1000003).end();
            } else if (code === 1000004) {
                res.status(200).json(Catalog1000004).end();
            } else if (code === 1000009) {
                res.status(200).json(Catalog1000009).end();
            } else if (code === 1000010) {
                res.status(200).json(Catalog1000010).end();
            } else if (code === 1000014) {
                // wfアクターカタログ不正(template.workflowがnull)
                res.status(200).json(Catalog1000014).end();
            } else if (code === 1000015) {
                // wfアクターカタログ不正(template.applicationがnull)
                res.status(200).json(Catalog1000015).end();
            } else if (code === 1000017) {
                // wfカタログ不正(template.share配列が空)
                res.status(200).json(Catalog1000017).end();
            } else if (code === 1000024) {
                // wfアクターカタログ不正(template.share配列が空)
                res.status(200).json(Catalog1000024).end();
            } else if (code === 1000117) {
                res.status(200).json(Catalog1000117).end();
            } else if (code === 1000018) {
                // appカタログ不正(template.share配列が空)
                res.status(200).json(Catalog1000018).end();
            } else if (code === 1000025) {
                // appアクターカタログ不正(template.share配列が空)
                res.status(200).json(Catalog1000025).end();
            } else if (code === 1000104) {
                res.status(200).json(Catalog1000005).end();
            } else if (code === 1000005) {
                res.status(200).json(Catalog1000005).end();
            } else if (code === 1000099) {
                res.status(200).json(Catalog1000099).end();
            } else {
                console.log(`Missing Catalog Service Code Handler: ${code}`);
                res.status(400).end();
            }
        };
        this.app.use(bodyParser.json());
        this.app.get('/catalog/name', async (req, res) => {
            res.status(200).json({ ext_name: 'test-org' }).end();
        });

        this.app.get('/catalog', async (req, res) => {
            if (this.nsError) {
                res.status(400).end();
                return;
            }
            const ns = req.query.ns;
            if (ns === 'catalog/ext/test-org/setting/actor/pxr-root/actor_1000001') {
                res.status(200).json(PxrRoot).end();
            } else if (ns === 'catalog/built_in/person/item-type') {
                res.status(200).json(ItemType).end();
            } else if (ns === 'catalog/ext/test-org/document/actor_1000004') {
                res.status(200).json(Document).end();
            } else if (ns === 'catalog/ext/test-org/event/actor_1000004') {
                res.status(200).json(Event_).end();
            } else if (ns === 'catalog/ext/test-org/thing/actor_1000004') {
                res.status(200).json(Thing).end();
            } else if (ns === 'catalog/ext/test-org/actor/wf/actor_1000004/share') {
                res.status(200).json(Share).end();
            } else if (ns === 'catalog/ext/test-org/setting/global') {
                res.status(200).json([
                    {
                        catalogItem: {
                            ns: 'catalog/ext/test-org/setting/global',
                            name: 'PXR：グローバル設定',
                            _code: {
                                _value: 1000374,
                                _ver: 1
                            },
                            inherit: {
                                _value: 160,
                                _ver: 1
                            },
                            description: 'PXR全体のグローバル設定の定義です。'
                        },
                        template: {
                            _code: {
                                _value: 1000374,
                                _ver: 1
                            },
                            'account-lock-count': 6,
                            'account-lock-release-time': {
                                type: 'minute',
                                value: 30
                            },
                            'app-p-name': 'アプリケーションプロバイダー',
                            'book-name': 'ヘルスケアNOTE',
                            'book-open-code-expiration': {
                                type: 'minute',
                                value: 10
                            },
                            'book-open-notification-interval': {
                                type: 'day',
                                value: 1
                            },
                            book_create_sms_message: '%s?ID=%s パスワード: %s',
                            'catalog-name': 'PXRカタログ',
                            'coin-name': 'PXRコイン',
                            'data-consumer-name': 'データコンシューマー',
                            'data-trader-name': 'データ取引サービスプロバイダー',
                            help_contact: {
                                title: 'ヘルプ・問い合わせ',
                                section: [
                                    {
                                        title: 'ヘルプ・問い合わせ',
                                        content: [
                                            {
                                                sentence: 'ヘルプ・問い合わせです。'
                                            }
                                        ]
                                    }
                                ]
                            },
                            'identity-verification-expiration': {
                                type: 'day',
                                value: 7
                            },
                            login_sms_message: 'PXRポータルのワンタイムログインコードは %s です。',
                            management_id_format: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$',
                            management_id_format_errormessage: '8桁以上かつアルファベットと数字混在で入力して下さい。',
                            management_initial_login_description: {
                                title: '初回ログインURL通知文書説明',
                                section: [
                                    {
                                        title: '初回ログインURL通知文書説明',
                                        content: [
                                            {
                                                sentence: '初回ログインURL通知文書説明'
                                            }
                                        ]
                                    }
                                ]
                            },
                            management_password_format: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{12,}$',
                            management_password_format_errormessage: '12桁以上かつアルファベットと数字混在で入力して下さい。',
                            management_password_similarity_check: true,
                            'min_period_for_platform-tou_re-consent': {
                                type: 'day',
                                value: 7
                            },
                            'min_period_for_region-tou_re-consent': {
                                type: 'day',
                                value: 7
                            },
                            onboarding_start: {
                                title: 'Onboarding',
                                section: [
                                    {
                                        title: 'PXRエコシステムとは',
                                        content: [
                                            {
                                                sentence: 'PXRエコシステム説明'
                                            }
                                        ]
                                    }
                                ]
                            },
                            onboarding_store: {
                                title: 'データ蓄積設定',
                                section: [
                                    {
                                        title: 'データ蓄積設定',
                                        content: [
                                            {
                                                sentence: 'データ蓄積設定説明'
                                            }
                                        ]
                                    }
                                ]
                            },
                            'one-time-login-code-expiration': null,
                            open_book_automatically: true,
                            'password-expiration': {
                                type: 'day',
                                value: 90
                            },
                            'password-generations-number': 4,
                            personal_account_delete: false,
                            personal_account_delete_ng_message: 'アカウント削除をご希望の場合はお問合せ下さい。',
                            personal_disassociation: true,
                            personal_initial_login_description: {
                                title: 'Book開設時のQRコード通知文書説明',
                                section: [
                                    {
                                        title: 'Book開設時のQRコード通知文書説明',
                                        content: [
                                            {
                                                sentence: 'Book開設時のQRコード通知文書説明'
                                            }
                                        ]
                                    }
                                ]
                            },
                            personal_share_basic_policy: false,
                            'personal_two-step_verification': true,
                            'platform-name': 'aaaデジタルヘルスプラットフォーム',
                            'portal-name': 'My PXR',
                            'pxr-root-name': '流通制御サービスプロバイダー',
                            pxr_id_format: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$',
                            pxr_id_format_errormessage: '8桁以上かつアルファベットと数字混在で入力して下さい。',
                            pxr_id_password_format: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{12,}$',
                            pxr_id_password_format_errormessage: '12桁以上かつアルファベットと数字混在で入力して下さい。',
                            pxr_id_password_similarity_check: true,
                            pxr_id_prefix: '',
                            pxr_id_suffix: '',
                            'region-root-name': '領域運営サービスプロバイダー',
                            search_target_ns: [
                                {
                                    name: 'データカテゴリ',
                                    ns: 'catalog/ext/test-org/attribute/category/data'
                                }
                            ],
                            'service-name': 'サービス',
                            service_category_for_data_category: [
                                {
                                    service: {
                                        _value: 1000065,
                                        _ver: 1
                                    },
                                    dataCategory: [
                                        {
                                            _value: 1000137,
                                            _ver: 1
                                        }
                                    ]
                                }
                            ],
                            service_category_for_workflow: [
                                {
                                    service: {
                                        _value: 1000065,
                                        _ver: 1
                                    },
                                    workflow_p: {
                                        _value: 1000438,
                                        _ver: 1
                                    },
                                    workflow: {
                                        _value: 1000481,
                                        _ver: 1
                                    }
                                }
                            ],
                            'session-expiration': {
                                type: 'hour',
                                value: 3
                            },
                            terms_of_service: {
                                title: '利用規約',
                                section: [
                                    {
                                        title: '利用規約',
                                        content: [
                                            {
                                                sentence: '利用規約です。'
                                            }
                                        ]
                                    }
                                ]
                            },
                            'use_app-p': true,
                            use_id_connect: false,
                            use_region_service_operation: true,
                            use_share: true,
                            use_supply: true,
                            'use_wf-p': true,
                            'wf-p-name': 'ワークフロープロバイダー',
                            'workflow-name': 'ワークフロー'
                        },
                        prop: [
                            {
                                key: 'account-lock-count',
                                type: {
                                    of: 'number',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'アカウントロックまでの試行上限回数',
                                isInherit: true
                            },
                            {
                                key: 'account-lock-release-time',
                                type: {
                                    of: 'inner',
                                    inner: 'Expiration',
                                    cmatrix: null,
                                    candidate: null
                                },
                                description: 'アカウントロック解除までの時間',
                                isInherit: true
                            },
                            {
                                key: 'app-p-name',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'アプリケーションプロバイダーの呼称',
                                isInherit: true
                            },
                            {
                                key: 'book-name',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'My-Condition-Book呼称',
                                isInherit: true
                            },
                            {
                                key: 'book-open-code-expiration',
                                type: {
                                    of: 'inner',
                                    inner: 'Expiration',
                                    cmatrix: null,
                                    candidate: null
                                },
                                description: 'Book開設申請コード有効期限',
                                isInherit: true
                            },
                            {
                                key: 'book-open-notification-interval',
                                type: {
                                    of: 'inner',
                                    inner: 'Expiration',
                                    cmatrix: null,
                                    candidate: null
                                },
                                description: 'Book開設申請通知間隔',
                                isInherit: true
                            },
                            {
                                key: 'book_create_sms_message',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'Book作成時SMSメッセージ内容',
                                isInherit: true
                            },
                            {
                                key: 'catalog-name',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'My-Condition-Dataカタログ呼称',
                                isInherit: true
                            },
                            {
                                key: 'coin-name',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'PXRコイン呼称',
                                isInherit: true
                            },
                            {
                                key: 'data-consumer-name',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'データコンシューマーの呼称',
                                isInherit: true
                            },
                            {
                                key: 'data-trader-name',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'データ取引サービスプロバイダーの呼称',
                                isInherit: true
                            },
                            {
                                key: 'help_contact',
                                type: {
                                    of: 'item',
                                    _code: null,
                                    cmatrix: null,
                                    candidate: {
                                        ns: null,
                                        _code: [
                                            {
                                                _value: 61,
                                                _ver: 1
                                            }
                                        ],
                                        base: null
                                    }
                                },
                                description: 'ヘルプ・問い合わせ',
                                isInherit: true
                            },
                            {
                                key: 'identity-verification-expiration',
                                type: {
                                    of: 'inner',
                                    inner: 'Expiration',
                                    cmatrix: null,
                                    candidate: null
                                },
                                description: '本人性確認コード有効期限',
                                isInherit: true
                            },
                            {
                                key: 'login_sms_message',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: '個人ポータルログイン時SMSメッセージ内容',
                                isInherit: true
                            },
                            {
                                key: 'management_id_format',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: '運営ポータル群のIDフォーマット',
                                isInherit: true
                            },
                            {
                                key: 'management_id_format_errormessage',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: '運営ポータル群のIDフォーマットエラーメッセージ',
                                isInherit: true
                            },
                            {
                                key: 'management_initial_login_description',
                                type: {
                                    of: 'item',
                                    _code: null,
                                    cmatrix: null,
                                    candidate: {
                                        ns: null,
                                        _code: [
                                            {
                                                _value: 61,
                                                _ver: 1
                                            }
                                        ],
                                        base: null
                                    }
                                },
                                description: '運営ポータル：初回ログインURL通知文書説明文',
                                isInherit: true
                            },
                            {
                                key: 'management_password_format',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: '運営ポータル群のパスワードフォーマット',
                                isInherit: true
                            },
                            {
                                key: 'management_password_format_errormessage',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: '運営ポータル群のパスワードフォーマットエラーメッセージ',
                                isInherit: true
                            },
                            {
                                key: 'management_password_similarity_check',
                                type: {
                                    of: 'boolean',
                                    cmatrix: null
                                },
                                description: '運営ポータル群のパスワード類似性チェックを行う',
                                isInherit: true
                            },
                            {
                                key: 'min_period_for_platform-tou_re-consent',
                                type: {
                                    of: 'inner',
                                    inner: 'Expiration',
                                    cmatrix: null,
                                    candidate: null
                                },
                                description: 'プラットフォーム利用規約の再同意期限の最低期間',
                                isInherit: true
                            },
                            {
                                key: 'min_period_for_region-tou_re-consent',
                                type: {
                                    of: 'inner',
                                    inner: 'Expiration',
                                    cmatrix: null,
                                    candidate: null
                                },
                                description: 'リージョン利用規約の再同意期限の最低期間',
                                isInherit: true
                            },
                            {
                                key: 'onboarding_start',
                                type: {
                                    of: 'item',
                                    _code: null,
                                    cmatrix: null,
                                    candidate: {
                                        ns: null,
                                        _code: [
                                            {
                                                _value: 61,
                                                _ver: 1
                                            }
                                        ],
                                        base: null
                                    }
                                },
                                description: '個人ポータル開始時のオンボーディング記載内容',
                                isInherit: true
                            },
                            {
                                key: 'onboarding_store',
                                type: {
                                    of: 'item',
                                    _code: null,
                                    cmatrix: null,
                                    candidate: {
                                        ns: null,
                                        _code: [
                                            {
                                                _value: 61,
                                                _ver: 1
                                            }
                                        ],
                                        base: null
                                    }
                                },
                                description: '個人ポータル蓄積設定時のオンボーディング記載内容',
                                isInherit: true
                            },
                            {
                                key: 'one-time-login-code-expiration',
                                type: {
                                    of: 'inner',
                                    inner: 'Expiration',
                                    cmatrix: null,
                                    candidate: null
                                },
                                description: 'ワンタイムログインコード有効期限',
                                isInherit: true
                            },
                            {
                                key: 'open_book_automatically',
                                type: {
                                    of: 'boolean',
                                    cmatrix: null
                                },
                                description: '自動Book開設フラグ',
                                isInherit: true
                            },
                            {
                                key: 'password-expiration',
                                type: {
                                    of: 'inner',
                                    inner: 'Expiration',
                                    cmatrix: null,
                                    candidate: null
                                },
                                description: 'パスワード有効期限',
                                isInherit: true
                            },
                            {
                                key: 'password-generations-number',
                                type: {
                                    of: 'number',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'パスワード世代管理数',
                                isInherit: true
                            },
                            {
                                key: 'personal_account_delete',
                                type: {
                                    of: 'boolean',
                                    cmatrix: null
                                },
                                description: '個人ポータル：アカウント削除の可否設定',
                                isInherit: true
                            },
                            {
                                key: 'personal_account_delete_ng_message',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: '個人ポータル：アカウント削除できない設定時の表示メッセージ内容',
                                isInherit: true
                            },
                            {
                                key: 'personal_disassociation',
                                type: {
                                    of: 'boolean',
                                    cmatrix: null
                                },
                                description: '個人ポータル：連携解除可否設定',
                                isInherit: true
                            },
                            {
                                key: 'personal_initial_login_description',
                                type: {
                                    of: 'item',
                                    _code: null,
                                    cmatrix: null,
                                    candidate: {
                                        ns: null,
                                        _code: [
                                            {
                                                _value: 61,
                                                _ver: 1
                                            }
                                        ],
                                        base: null
                                    }
                                },
                                description: 'Book開設時のQRコード通知文書説明文',
                                isInherit: true
                            },
                            {
                                key: 'personal_share_basic_policy',
                                type: {
                                    of: 'boolean',
                                    cmatrix: null
                                },
                                description: '個人ポータル：共有の基本方針可否設定',
                                isInherit: true
                            },
                            {
                                key: 'personal_two-step_verification',
                                type: {
                                    of: 'boolean',
                                    cmatrix: null
                                },
                                description: '個人ポータル：2段階認証解除可否設定',
                                isInherit: true
                            },
                            {
                                key: 'platform-name',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'PXRエコシステム基盤呼称',
                                isInherit: true
                            },
                            {
                                key: 'portal-name',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: '個人ポータル呼称',
                                isInherit: true
                            },
                            {
                                key: 'pxr-root-name',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: '流通制御サービスプロバイダーの呼称',
                                isInherit: true
                            },
                            {
                                key: 'pxr_id_format',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'PXR-IDフォーマット',
                                isInherit: true
                            },
                            {
                                key: 'pxr_id_format_errormessage',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'PXR-IDフォーマットエラーメッセージ',
                                isInherit: true
                            },
                            {
                                key: 'pxr_id_password_format',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'PXR-IDのパスワードフォーマット',
                                isInherit: true
                            },
                            {
                                key: 'pxr_id_password_format_errormessage',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'PXR-IDのパスワードフォーマットエラーメッセージ',
                                isInherit: true
                            },
                            {
                                key: 'pxr_id_password_similarity_check',
                                type: {
                                    of: 'boolean',
                                    cmatrix: null
                                },
                                description: 'PXR-IDのパスワード類似性チェックを行う',
                                isInherit: true
                            },
                            {
                                key: 'pxr_id_prefix',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'PXR-IDのprefix',
                                isInherit: true
                            },
                            {
                                key: 'pxr_id_suffix',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'PXR-IDのsuffix',
                                isInherit: true
                            },
                            {
                                key: 'region-root-name',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: '領域運営サービスプロバイダーの名称',
                                isInherit: true
                            },
                            {
                                key: 'search_target_ns',
                                type: {
                                    of: 'inner[]',
                                    inner: 'SearchTargetNs',
                                    cmatrix: null,
                                    candidate: null
                                },
                                description: '検索対象ネームスペース',
                                isInherit: true
                            },
                            {
                                key: 'service-name',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'サービス名',
                                isInherit: true
                            },
                            {
                                key: 'service_category_for_data_category',
                                type: {
                                    of: 'inner[]',
                                    inner: 'ServiceCategoryForDataCategory',
                                    cmatrix: null,
                                    candidate: null
                                },
                                description: 'データカテゴリ用サービスカテゴリ',
                                isInherit: true
                            },
                            {
                                key: 'service_category_for_workflow',
                                type: {
                                    of: 'inner[]',
                                    inner: 'ServiceCategoryForWorkflow',
                                    cmatrix: null,
                                    candidate: null
                                },
                                description: 'ワークフロー用サービスカテゴリ',
                                isInherit: true
                            },
                            {
                                key: 'session-expiration',
                                type: {
                                    of: 'inner',
                                    inner: 'Expiration',
                                    cmatrix: null,
                                    candidate: null
                                },
                                description: 'セッション有効期限',
                                isInherit: true
                            },
                            {
                                key: 'terms_of_service',
                                type: {
                                    of: 'item',
                                    _code: null,
                                    cmatrix: null,
                                    candidate: {
                                        ns: null,
                                        _code: [
                                            {
                                                _value: 61,
                                                _ver: 1
                                            }
                                        ],
                                        base: null
                                    }
                                },
                                description: '利用規約',
                                isInherit: true
                            },
                            {
                                key: 'use_app-p',
                                type: {
                                    of: 'boolean',
                                    cmatrix: null
                                },
                                description: 'アプリケーションプロバイダーの使用設定',
                                isInherit: true
                            },
                            {
                                key: 'use_id_connect',
                                type: {
                                    of: 'boolean',
                                    cmatrix: null
                                },
                                description: 'IDサービスの使用設定',
                                isInherit: true
                            },
                            {
                                key: 'use_region_service_operation',
                                type: {
                                    of: 'boolean',
                                    cmatrix: null
                                },
                                description: 'リージョンサービス運用の設定',
                                isInherit: true
                            },
                            {
                                key: 'use_share',
                                type: {
                                    of: 'boolean',
                                    cmatrix: null
                                },
                                description: '共有の使用設定',
                                isInherit: true
                            },
                            {
                                key: 'use_supply',
                                type: {
                                    of: 'boolean',
                                    cmatrix: null
                                },
                                description: '提供の使用設定',
                                isInherit: true
                            },
                            {
                                key: 'use_wf-p',
                                type: {
                                    of: 'boolean',
                                    cmatrix: null
                                },
                                description: 'ワークフロープロバイダーの使用設定',
                                isInherit: true
                            },
                            {
                                key: 'wf-p-name',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'ワークフロープロバイダーの呼称',
                                isInherit: true
                            },
                            {
                                key: 'workflow-name',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'ワークフローの呼称',
                                isInherit: true
                            }
                        ],
                        attribute: null
                    }
                ]).end();
            } else if (ns === 'catalog/ext/aaa-healthcare-consortium/setting/global') {
                res.status(200).json([
                    {
                        catalogItem: {
                            ns: 'catalog/ext/aaa-healthcare-consortium/setting/global',
                            name: 'PXR：グローバル設定',
                            _code: {
                                _value: 1000374,
                                _ver: 1
                            },
                            inherit: {
                                _value: 160,
                                _ver: 1
                            },
                            description: 'PXR全体のグローバル設定の定義です。'
                        },
                        template: {
                            _code: {
                                _value: 1000374,
                                _ver: 1
                            },
                            'account-lock-count': 6,
                            'account-lock-release-time': {
                                type: 'minute',
                                value: 30
                            },
                            'app-p-name': 'アプリケーションプロバイダー',
                            'book-name': 'ヘルスケアNOTE',
                            'book-open-code-expiration': {
                                type: 'minute',
                                value: 10
                            },
                            'book-open-notification-interval': {
                                type: 'day',
                                value: 1
                            },
                            book_create_sms_message: '%s?ID=%s パスワード: %s',
                            'catalog-name': 'PXRカタログ',
                            'coin-name': 'PXRコイン',
                            'data-consumer-name': 'データコンシューマー',
                            'data-trader-name': 'データ取引サービスプロバイダー',
                            help_contact: {
                                title: 'ヘルプ・問い合わせ',
                                section: [
                                    {
                                        title: 'ヘルプ・問い合わせ',
                                        content: [
                                            {
                                                sentence: 'ヘルプ・問い合わせです。'
                                            }
                                        ]
                                    }
                                ]
                            },
                            'identity-verification-expiration': {
                                type: 'day',
                                value: 7
                            },
                            login_sms_message: 'PXRポータルのワンタイムログインコードは %s です。',
                            management_id_format: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$',
                            management_id_format_errormessage: '8桁以上かつアルファベットと数字混在で入力して下さい。',
                            management_initial_login_description: {
                                title: '初回ログインURL通知文書説明',
                                section: [
                                    {
                                        title: '初回ログインURL通知文書説明',
                                        content: [
                                            {
                                                sentence: '初回ログインURL通知文書説明'
                                            }
                                        ]
                                    }
                                ]
                            },
                            management_password_format: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{12,}$',
                            management_password_format_errormessage: '12桁以上かつアルファベットと数字混在で入力して下さい。',
                            management_password_similarity_check: true,
                            'min_period_for_platform-tou_re-consent': {
                                type: 'day',
                                value: 7
                            },
                            'min_period_for_region-tou_re-consent': {
                                type: 'day',
                                value: 7
                            },
                            onboarding_start: {
                                title: 'Onboarding',
                                section: [
                                    {
                                        title: 'PXRエコシステムとは',
                                        content: [
                                            {
                                                sentence: 'PXRエコシステム説明'
                                            }
                                        ]
                                    }
                                ]
                            },
                            onboarding_store: {
                                title: 'データ蓄積設定',
                                section: [
                                    {
                                        title: 'データ蓄積設定',
                                        content: [
                                            {
                                                sentence: 'データ蓄積設定説明'
                                            }
                                        ]
                                    }
                                ]
                            },
                            'one-time-login-code-expiration': null,
                            open_book_automatically: true,
                            'password-expiration': {
                                type: 'day',
                                value: 90
                            },
                            'password-generations-number': 4,
                            personal_account_delete: false,
                            personal_account_delete_ng_message: 'アカウント削除をご希望の場合はお問合せ下さい。',
                            personal_disassociation: true,
                            personal_initial_login_description: {
                                title: 'Book開設時のQRコード通知文書説明',
                                section: [
                                    {
                                        title: 'Book開設時のQRコード通知文書説明',
                                        content: [
                                            {
                                                sentence: 'Book開設時のQRコード通知文書説明'
                                            }
                                        ]
                                    }
                                ]
                            },
                            personal_share_basic_policy: false,
                            'personal_two-step_verification': true,
                            'platform-name': 'aaaデジタルヘルスプラットフォーム',
                            'portal-name': 'My PXR',
                            'pxr-root-name': '流通制御サービスプロバイダー',
                            pxr_id_format: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$',
                            pxr_id_format_errormessage: '8桁以上かつアルファベットと数字混在で入力して下さい。',
                            pxr_id_password_format: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{12,}$',
                            pxr_id_password_format_errormessage: '12桁以上かつアルファベットと数字混在で入力して下さい。',
                            pxr_id_password_similarity_check: true,
                            pxr_id_prefix: '',
                            pxr_id_suffix: '',
                            'region-root-name': '領域運営サービスプロバイダー',
                            search_target_ns: [
                                {
                                    name: 'データカテゴリ',
                                    ns: 'catalog/ext/test-org/attribute/category/data'
                                }
                            ],
                            'service-name': 'サービス',
                            service_category_for_data_category: [
                                {
                                    service: {
                                        _value: 1000065,
                                        _ver: 1
                                    },
                                    dataCategory: [
                                        {
                                            _value: 1000137,
                                            _ver: 1
                                        }
                                    ]
                                }
                            ],
                            service_category_for_workflow: [
                                {
                                    service: {
                                        _value: 1000065,
                                        _ver: 1
                                    },
                                    workflow_p: {
                                        _value: 1000438,
                                        _ver: 1
                                    },
                                    workflow: {
                                        _value: 1000481,
                                        _ver: 1
                                    }
                                }
                            ],
                            'session-expiration': {
                                type: 'hour',
                                value: 3
                            },
                            terms_of_service: {
                                title: '利用規約',
                                section: [
                                    {
                                        title: '利用規約',
                                        content: [
                                            {
                                                sentence: '利用規約です。'
                                            }
                                        ]
                                    }
                                ]
                            },
                            'use_app-p': true,
                            use_id_connect: false,
                            use_region_service_operation: true,
                            use_share: true,
                            use_supply: true,
                            'use_wf-p': true,
                            'wf-p-name': 'ワークフロープロバイダー',
                            'workflow-name': 'ワークフロー'
                        },
                        prop: [
                            {
                                key: 'account-lock-count',
                                type: {
                                    of: 'number',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'アカウントロックまでの試行上限回数',
                                isInherit: true
                            },
                            {
                                key: 'account-lock-release-time',
                                type: {
                                    of: 'inner',
                                    inner: 'Expiration',
                                    cmatrix: null,
                                    candidate: null
                                },
                                description: 'アカウントロック解除までの時間',
                                isInherit: true
                            },
                            {
                                key: 'app-p-name',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'アプリケーションプロバイダーの呼称',
                                isInherit: true
                            },
                            {
                                key: 'book-name',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'My-Condition-Book呼称',
                                isInherit: true
                            },
                            {
                                key: 'book-open-code-expiration',
                                type: {
                                    of: 'inner',
                                    inner: 'Expiration',
                                    cmatrix: null,
                                    candidate: null
                                },
                                description: 'Book開設申請コード有効期限',
                                isInherit: true
                            },
                            {
                                key: 'book-open-notification-interval',
                                type: {
                                    of: 'inner',
                                    inner: 'Expiration',
                                    cmatrix: null,
                                    candidate: null
                                },
                                description: 'Book開設申請通知間隔',
                                isInherit: true
                            },
                            {
                                key: 'book_create_sms_message',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'Book作成時SMSメッセージ内容',
                                isInherit: true
                            },
                            {
                                key: 'catalog-name',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'My-Condition-Dataカタログ呼称',
                                isInherit: true
                            },
                            {
                                key: 'coin-name',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'PXRコイン呼称',
                                isInherit: true
                            },
                            {
                                key: 'data-consumer-name',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'データコンシューマーの呼称',
                                isInherit: true
                            },
                            {
                                key: 'data-trader-name',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'データ取引サービスプロバイダーの呼称',
                                isInherit: true
                            },
                            {
                                key: 'help_contact',
                                type: {
                                    of: 'item',
                                    _code: null,
                                    cmatrix: null,
                                    candidate: {
                                        ns: null,
                                        _code: [
                                            {
                                                _value: 61,
                                                _ver: 1
                                            }
                                        ],
                                        base: null
                                    }
                                },
                                description: 'ヘルプ・問い合わせ',
                                isInherit: true
                            },
                            {
                                key: 'identity-verification-expiration',
                                type: {
                                    of: 'inner',
                                    inner: 'Expiration',
                                    cmatrix: null,
                                    candidate: null
                                },
                                description: '本人性確認コード有効期限',
                                isInherit: true
                            },
                            {
                                key: 'login_sms_message',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: '個人ポータルログイン時SMSメッセージ内容',
                                isInherit: true
                            },
                            {
                                key: 'management_id_format',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: '運営ポータル群のIDフォーマット',
                                isInherit: true
                            },
                            {
                                key: 'management_id_format_errormessage',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: '運営ポータル群のIDフォーマットエラーメッセージ',
                                isInherit: true
                            },
                            {
                                key: 'management_initial_login_description',
                                type: {
                                    of: 'item',
                                    _code: null,
                                    cmatrix: null,
                                    candidate: {
                                        ns: null,
                                        _code: [
                                            {
                                                _value: 61,
                                                _ver: 1
                                            }
                                        ],
                                        base: null
                                    }
                                },
                                description: '運営ポータル：初回ログインURL通知文書説明文',
                                isInherit: true
                            },
                            {
                                key: 'management_password_format',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: '運営ポータル群のパスワードフォーマット',
                                isInherit: true
                            },
                            {
                                key: 'management_password_format_errormessage',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: '運営ポータル群のパスワードフォーマットエラーメッセージ',
                                isInherit: true
                            },
                            {
                                key: 'management_password_similarity_check',
                                type: {
                                    of: 'boolean',
                                    cmatrix: null
                                },
                                description: '運営ポータル群のパスワード類似性チェックを行う',
                                isInherit: true
                            },
                            {
                                key: 'min_period_for_platform-tou_re-consent',
                                type: {
                                    of: 'inner',
                                    inner: 'Expiration',
                                    cmatrix: null,
                                    candidate: null
                                },
                                description: 'プラットフォーム利用規約の再同意期限の最低期間',
                                isInherit: true
                            },
                            {
                                key: 'min_period_for_region-tou_re-consent',
                                type: {
                                    of: 'inner',
                                    inner: 'Expiration',
                                    cmatrix: null,
                                    candidate: null
                                },
                                description: 'リージョン利用規約の再同意期限の最低期間',
                                isInherit: true
                            },
                            {
                                key: 'onboarding_start',
                                type: {
                                    of: 'item',
                                    _code: null,
                                    cmatrix: null,
                                    candidate: {
                                        ns: null,
                                        _code: [
                                            {
                                                _value: 61,
                                                _ver: 1
                                            }
                                        ],
                                        base: null
                                    }
                                },
                                description: '個人ポータル開始時のオンボーディング記載内容',
                                isInherit: true
                            },
                            {
                                key: 'onboarding_store',
                                type: {
                                    of: 'item',
                                    _code: null,
                                    cmatrix: null,
                                    candidate: {
                                        ns: null,
                                        _code: [
                                            {
                                                _value: 61,
                                                _ver: 1
                                            }
                                        ],
                                        base: null
                                    }
                                },
                                description: '個人ポータル蓄積設定時のオンボーディング記載内容',
                                isInherit: true
                            },
                            {
                                key: 'one-time-login-code-expiration',
                                type: {
                                    of: 'inner',
                                    inner: 'Expiration',
                                    cmatrix: null,
                                    candidate: null
                                },
                                description: 'ワンタイムログインコード有効期限',
                                isInherit: true
                            },
                            {
                                key: 'open_book_automatically',
                                type: {
                                    of: 'boolean',
                                    cmatrix: null
                                },
                                description: '自動Book開設フラグ',
                                isInherit: true
                            },
                            {
                                key: 'password-expiration',
                                type: {
                                    of: 'inner',
                                    inner: 'Expiration',
                                    cmatrix: null,
                                    candidate: null
                                },
                                description: 'パスワード有効期限',
                                isInherit: true
                            },
                            {
                                key: 'password-generations-number',
                                type: {
                                    of: 'number',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'パスワード世代管理数',
                                isInherit: true
                            },
                            {
                                key: 'personal_account_delete',
                                type: {
                                    of: 'boolean',
                                    cmatrix: null
                                },
                                description: '個人ポータル：アカウント削除の可否設定',
                                isInherit: true
                            },
                            {
                                key: 'personal_account_delete_ng_message',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: '個人ポータル：アカウント削除できない設定時の表示メッセージ内容',
                                isInherit: true
                            },
                            {
                                key: 'personal_disassociation',
                                type: {
                                    of: 'boolean',
                                    cmatrix: null
                                },
                                description: '個人ポータル：連携解除可否設定',
                                isInherit: true
                            },
                            {
                                key: 'personal_initial_login_description',
                                type: {
                                    of: 'item',
                                    _code: null,
                                    cmatrix: null,
                                    candidate: {
                                        ns: null,
                                        _code: [
                                            {
                                                _value: 61,
                                                _ver: 1
                                            }
                                        ],
                                        base: null
                                    }
                                },
                                description: 'Book開設時のQRコード通知文書説明文',
                                isInherit: true
                            },
                            {
                                key: 'personal_share_basic_policy',
                                type: {
                                    of: 'boolean',
                                    cmatrix: null
                                },
                                description: '個人ポータル：共有の基本方針可否設定',
                                isInherit: true
                            },
                            {
                                key: 'personal_two-step_verification',
                                type: {
                                    of: 'boolean',
                                    cmatrix: null
                                },
                                description: '個人ポータル：2段階認証解除可否設定',
                                isInherit: true
                            },
                            {
                                key: 'platform-name',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'PXRエコシステム基盤呼称',
                                isInherit: true
                            },
                            {
                                key: 'portal-name',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: '個人ポータル呼称',
                                isInherit: true
                            },
                            {
                                key: 'pxr-root-name',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: '流通制御サービスプロバイダーの呼称',
                                isInherit: true
                            },
                            {
                                key: 'pxr_id_format',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'PXR-IDフォーマット',
                                isInherit: true
                            },
                            {
                                key: 'pxr_id_format_errormessage',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'PXR-IDフォーマットエラーメッセージ',
                                isInherit: true
                            },
                            {
                                key: 'pxr_id_password_format',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'PXR-IDのパスワードフォーマット',
                                isInherit: true
                            },
                            {
                                key: 'pxr_id_password_format_errormessage',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'PXR-IDのパスワードフォーマットエラーメッセージ',
                                isInherit: true
                            },
                            {
                                key: 'pxr_id_password_similarity_check',
                                type: {
                                    of: 'boolean',
                                    cmatrix: null
                                },
                                description: 'PXR-IDのパスワード類似性チェックを行う',
                                isInherit: true
                            },
                            {
                                key: 'pxr_id_prefix',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'PXR-IDのprefix',
                                isInherit: true
                            },
                            {
                                key: 'pxr_id_suffix',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'PXR-IDのsuffix',
                                isInherit: true
                            },
                            {
                                key: 'region-root-name',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: '領域運営サービスプロバイダーの名称',
                                isInherit: true
                            },
                            {
                                key: 'search_target_ns',
                                type: {
                                    of: 'inner[]',
                                    inner: 'SearchTargetNs',
                                    cmatrix: null,
                                    candidate: null
                                },
                                description: '検索対象ネームスペース',
                                isInherit: true
                            },
                            {
                                key: 'service-name',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'サービス名',
                                isInherit: true
                            },
                            {
                                key: 'service_category_for_data_category',
                                type: {
                                    of: 'inner[]',
                                    inner: 'ServiceCategoryForDataCategory',
                                    cmatrix: null,
                                    candidate: null
                                },
                                description: 'データカテゴリ用サービスカテゴリ',
                                isInherit: true
                            },
                            {
                                key: 'service_category_for_workflow',
                                type: {
                                    of: 'inner[]',
                                    inner: 'ServiceCategoryForWorkflow',
                                    cmatrix: null,
                                    candidate: null
                                },
                                description: 'ワークフロー用サービスカテゴリ',
                                isInherit: true
                            },
                            {
                                key: 'session-expiration',
                                type: {
                                    of: 'inner',
                                    inner: 'Expiration',
                                    cmatrix: null,
                                    candidate: null
                                },
                                description: 'セッション有効期限',
                                isInherit: true
                            },
                            {
                                key: 'terms_of_service',
                                type: {
                                    of: 'item',
                                    _code: null,
                                    cmatrix: null,
                                    candidate: {
                                        ns: null,
                                        _code: [
                                            {
                                                _value: 61,
                                                _ver: 1
                                            }
                                        ],
                                        base: null
                                    }
                                },
                                description: '利用規約',
                                isInherit: true
                            },
                            {
                                key: 'use_app-p',
                                type: {
                                    of: 'boolean',
                                    cmatrix: null
                                },
                                description: 'アプリケーションプロバイダーの使用設定',
                                isInherit: true
                            },
                            {
                                key: 'use_id_connect',
                                type: {
                                    of: 'boolean',
                                    cmatrix: null
                                },
                                description: 'IDサービスの使用設定',
                                isInherit: true
                            },
                            {
                                key: 'use_region_service_operation',
                                type: {
                                    of: 'boolean',
                                    cmatrix: null
                                },
                                description: 'リージョンサービス運用の設定',
                                isInherit: true
                            },
                            {
                                key: 'use_share',
                                type: {
                                    of: 'boolean',
                                    cmatrix: null
                                },
                                description: '共有の使用設定',
                                isInherit: true
                            },
                            {
                                key: 'use_supply',
                                type: {
                                    of: 'boolean',
                                    cmatrix: null
                                },
                                description: '提供の使用設定',
                                isInherit: true
                            },
                            {
                                key: 'use_wf-p',
                                type: {
                                    of: 'boolean',
                                    cmatrix: null
                                },
                                description: 'ワークフロープロバイダーの使用設定',
                                isInherit: true
                            },
                            {
                                key: 'wf-p-name',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'ワークフロープロバイダーの呼称',
                                isInherit: true
                            },
                            {
                                key: 'workflow-name',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'ワークフローの呼称',
                                isInherit: true
                            }
                        ],
                        attribute: null
                    }
                ]).end();
            } else if (ns === 'catalog/ext/test-org/block/pxr-root') {
                res.status(200).json([
                    {
                        catalogItem: {
                            ns: 'catalog/ext/test-org/block/pxr-root',
                            name: 'PXR-Root-Block',
                            _code: {
                                _value: 1000110,
                                _ver: 1
                            },
                            inherit: {
                                _value: 33,
                                _ver: 1
                            },
                            description: '流通制御サービスプロバイダー用PXR-Blockの定義です。'
                        },
                        template: {
                            _code: {
                                _value: 1000110,
                                _ver: 1
                            },
                            'actor-type': 'pxr-root',
                            'assigned-organization': '流通制御組織',
                            'assignment-status': 'assigned',
                            'base-url': 'test-org-root.org',
                            'first-login-url': 'https://www.test.org/login',
                            id: 'PXR-Root-01',
                            'pxr-portal-first-login-url': 'https://root.test.org/personal-portal/',
                            'service-name': 'test-org-root-service'
                        },
                        prop: [
                            {
                                key: 'actor-type',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: {
                                        value: [
                                            'pxr-root',
                                            'region-root',
                                            'app',
                                            'wf',
                                            'data-trader',
                                            'consumer'
                                        ]
                                    }
                                },
                                description: 'このPXR-Blockを保有する組織の種別'
                            },
                            {
                                key: 'assigned-organization',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: '割当アクター名'
                            },
                            {
                                key: 'assignment-status',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: {
                                        value: [
                                            'assigned',
                                            'unassigned'
                                        ]
                                    }
                                },
                                description: '割当状態'
                            },
                            {
                                key: 'base-url',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'PXR-BlockのベースURL'
                            },
                            {
                                key: 'first-login-url',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: '初回ログインURL'
                            },
                            {
                                key: 'id',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'PXR-Block識別子'
                            },
                            {
                                key: 'pxr-portal-first-login-url',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: '個人向けポータル初回ログインURL'
                            },
                            {
                                key: 'service-name',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'PXR-Blockのサービス名'
                            }
                        ],
                        attribute: null
                    }]).end();
            } else if (ns === 'catalog/ext/aaa-healthcare-consortium/block/pxr-root') {
                res.status(200).json([
                    {
                        catalogItem: {
                            ns: 'catalog/ext/aaa-healthcare-consortium/block/pxr-root',
                            name: 'PXR-Root-Block',
                            _code: {
                                _value: 1000110,
                                _ver: 1
                            },
                            inherit: {
                                _value: 33,
                                _ver: 1
                            },
                            description: '流通制御サービスプロバイダー用PXR-Blockの定義です。'
                        },
                        template: {
                            _code: {
                                _value: 1000110,
                                _ver: 1
                            },
                            'actor-type': 'pxr-root',
                            'assigned-organization': '流通制御組織',
                            'assignment-status': 'assigned',
                            'base-url': 'test-org-root.org',
                            'first-login-url': 'https://www.test.org/login',
                            id: 'PXR-Root-01',
                            'pxr-portal-first-login-url': 'https://root.test.org/personal-portal/',
                            'service-name': 'test-org-root-service'
                        },
                        prop: [
                            {
                                key: 'actor-type',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: {
                                        value: [
                                            'pxr-root',
                                            'region-root',
                                            'app',
                                            'wf',
                                            'data-trader',
                                            'consumer'
                                        ]
                                    }
                                },
                                description: 'このPXR-Blockを保有する組織の種別'
                            },
                            {
                                key: 'assigned-organization',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: '割当アクター名'
                            },
                            {
                                key: 'assignment-status',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: {
                                        value: [
                                            'assigned',
                                            'unassigned'
                                        ]
                                    }
                                },
                                description: '割当状態'
                            },
                            {
                                key: 'base-url',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'PXR-BlockのベースURL'
                            },
                            {
                                key: 'first-login-url',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: '初回ログインURL'
                            },
                            {
                                key: 'id',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'PXR-Block識別子'
                            },
                            {
                                key: 'pxr-portal-first-login-url',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: '個人向けポータル初回ログインURL'
                            },
                            {
                                key: 'service-name',
                                type: {
                                    of: 'string',
                                    cmatrix: null,
                                    format: null,
                                    unit: null,
                                    candidate: null
                                },
                                description: 'PXR-Blockのサービス名'
                            }
                        ],
                        attribute: null
                    }]).end();
            } else if (ns === 'catalog/ext/test-org/actor/wf/actor_1000004/share') {
                res.status(200).json(Share).end();
            } else if (ns === 'catalog/ext/test-org/actor/wf/actor_1000004/share/trigger') {
                res.status(200).json(Trigger).end();
            } else if (ns === 'catalog/ext/test-org/actor/app/actor_1000104/share/trigger') {
                res.status(404).json([]).end();
            } else {
                console.log(`Missing Catalog Service NS Handler: ${ns}`);
                res.status(204).end();
            }
        });
        this.app.get('/catalog/:id', handler);
        this.app.get('/catalog/:id/:ver', handler);
        this.app.post('/catalog', async (req, res) => {
            const body = req.body;
            let response: any = [];
            for (const _code of body) {
                const code = Number(_code['_code']['_value']);
                if (code === 1000022) {
                    response.push(Catalog1000022);
                } else if (code === 1000501) {
                    response.push(Catalog1000501);
                } else if (code === 1000502) {
                    response.push(Catalog1000502);
                } else if (code === 1000511) {
                    response.push(Catalog1000511);
                } else if (code === 1000512) {
                    response.push(Catalog1000512);
                }
            }
            if (response.length === 0) {
                response = {};
            }
            res.status(200).json(response).end();
        });
    }

    public setNsError (error: boolean) {
        this.nsError = error;
    }
}
