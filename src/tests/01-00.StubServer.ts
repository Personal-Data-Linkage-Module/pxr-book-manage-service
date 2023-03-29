/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import express = require('express');
import { Server } from 'net';
import catalog1000359 = require('./catalog/1000359.json');
import catalog1000110 = require('./catalog/1000110.json');
import catalog1000117 = require('./catalog/1000117.json');
/* eslint-enable */

/**
 * カタログサービス
 */
export class CatalogService {
    app: express.Express;
    server: Server;

    constructor (status: number) {
        this.app = express();

        // イベントハンドラー
        const _listener3 = (req: express.Request, res: express.Response) => {
            res.status(status);
            res.json({
                ext_name: 'test-org'
            });
            res.end();
        };
        const _listener2 = (req: express.Request, res: express.Response) => {
            const ns = req.query['ns'];
            res.status(status);
            if (ns === 'catalog/ext/test-org/setting/actor/pxr-root/actor_1000001') {
                res.json(
                    [
                        {
                            catalogItem: {
                                ns: 'catalog/ext/test-org/setting/actor/pxr-root/actor_1000001',
                                name: '流通制御組織：アクター個別設定',
                                _code: {
                                    _value: 1000362,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 130,
                                    _ver: 1
                                },
                                description: '流通制御組織による流通制御組織のアクター個別設定の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 1000362,
                                    _ver: 1
                                },
                                auth: [
                                    {
                                        _value: 139,
                                        _ver: 1
                                    },
                                    {
                                        _value: 140,
                                        _ver: 1
                                    },
                                    {
                                        _value: 141,
                                        _ver: 1
                                    },
                                    {
                                        _value: 142,
                                        _ver: 1
                                    },
                                    {
                                        _value: 144,
                                        _ver: 1
                                    },
                                    {
                                        _value: 147,
                                        _ver: 1
                                    },
                                    {
                                        _value: 149,
                                        _ver: 1
                                    },
                                    {
                                        _value: 155,
                                        _ver: 1
                                    }
                                ],
                                'identification-checklist': [
                                    {
                                        _value: 30019,
                                        _ver: 1
                                    },
                                    {
                                        _value: 30020,
                                        _ver: 1
                                    },
                                    {
                                        _value: 30021,
                                        _ver: 1
                                    },
                                    {
                                        _value: 30022,
                                        _ver: 1
                                    },
                                    {
                                        _value: 30035,
                                        _ver: 1
                                    }
                                ],
                                'identification-document': [
                                    {
                                        document: {
                                            _value: 30001,
                                            _ver: 1
                                        },
                                        'satisfaction-rate': 100
                                    }
                                ],
                                'pxr-root-name': '流通制御サービスプロバイダー',
                                'store-distribution-ratio': null,
                                'supply-distribution-ratio': null
                            },
                            prop: [
                                {
                                    key: 'auth',
                                    type: {
                                        of: 'code[]',
                                        cmatrix: null,
                                        candidate: {
                                            ns: [
                                                'catalog/model/auth/*'
                                            ],
                                            _code: null,
                                            base: null
                                        }
                                    },
                                    description: '操作権の配列',
                                    isInherit: true
                                },
                                {
                                    key: 'identification-checklist',
                                    type: {
                                        of: 'code[]',
                                        cmatrix: null,
                                        candidate: {
                                            ns: [
                                                'catalog/model/person/item-type',
                                                'catalog/built_in/person/item-type',
                                                'catalog/ext/test-org/person/item-type'
                                            ],
                                            _code: null,
                                            base: null
                                        }
                                    },
                                    description: '採用した本人性確認事項',
                                    isInherit: true
                                },
                                {
                                    key: 'identification-document',
                                    type: {
                                        of: 'inner[]',
                                        inner: 'Identification-document',
                                        cmatrix: null,
                                        candidate: null
                                    },
                                    description: '採用した本人性確認書類',
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
                                    key: 'store-distribution-ratio',
                                    type: {
                                        of: 'inner[]',
                                        inner: 'DistributionRatio',
                                        cmatrix: null,
                                        candidate: null
                                    },
                                    description: '蓄積分配比率',
                                    isInherit: true
                                },
                                {
                                    key: 'supply-distribution-ratio',
                                    type: {
                                        of: 'inner[]',
                                        inner: 'DistributionRatio',
                                        cmatrix: null,
                                        candidate: null
                                    },
                                    description: '提供分配比率',
                                    isInherit: true
                                }
                            ],
                            attribute: null
                        }
                    ]
                );
            } else if ((ns === 'catalog/built_in/person/item-type') || (ns === 'catalog/ext/test-org/person/item-type')) {
                res.json(
                    [
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '姓',
                                _code: {
                                    _value: 30019,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（姓）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30019,
                                    _ver: 1
                                },
                                'input-pattern': '.+'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '.+'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '名',
                                _code: {
                                    _value: 30020,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（名）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30020,
                                    _ver: 1
                                },
                                'input-pattern': '.+'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '.+'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '性別',
                                _code: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（性別）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                'input-pattern': '^[男女]{1}$'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '^[男女]{1}$'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '生年月日（西暦）',
                                _code: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（生年月日（西暦））の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                'input-pattern': '[12][0-9]{3}[/\\-年](0?[1-9]|1[0-2])[/\\-月](0?[1-9]|[12][0-9]|3[01])日?$'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '[12][0-9]{3}[/\\-年](0?[1-9]|1[0-2])[/\\-月](0?[1-9]|[12][0-9]|3[01])日?$'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '住所',
                                _code: {
                                    _value: 30035,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（住所）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30035,
                                    _ver: 1
                                },
                                'input-pattern': null
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: null,
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '連絡先電話番号',
                                _code: {
                                    _value: 30036,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（連絡先電話番号）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30036,
                                    _ver: 1
                                },
                                'input-pattern': '^0[-0-9]{9,12}$'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '^0[-0-9]{9,12}$'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '姓名',
                                _code: {
                                    _value: 30037,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（姓名）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30037,
                                    _ver: 1
                                },
                                'input-pattern': '.+'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '.+'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '生年月日（和暦）',
                                _code: {
                                    _value: 30038,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（生年月日（和暦））の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30038,
                                    _ver: 1
                                },
                                'input-pattern': '^(明治|大正|昭和|平成|令和)[0-9]{1,2}年(0?[1-9]|1[0-2])月(0?[1-9]|[12][0-9]|3[01])日$'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '^(明治|大正|昭和|平成|令和)[0-9]{1,2}年(0?[1-9]|1[0-2])月(0?[1-9]|[12][0-9]|3[01])日$'
                                }
                            ],
                            attribute: null
                        }
                    ]
                );
            } else if (ns === 'catalog/ext/test-org/setting/global') {
                res.json(
                    [
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
                                        ns: 'catalog/ext/aaa-healthcare-consortium/attribute/category/data'
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
                    ]
                );
            } else if (ns === 'catalog/ext/aaa-healthcare-consortium/setting/actor/pxr-root/actor_1000431') {
                res.json(
                    [
                        {
                            catalogItem: {
                                ns: 'catalog/ext/aaa-healthcare-consortium/setting/actor/pxr-root/actor_1000431',
                                name: '流通制御組織：アクター個別設定',
                                _code: {
                                    _value: 1000362,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 130,
                                    _ver: 1
                                },
                                description: '流通制御組織による流通制御組織のアクター個別設定の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 1000362,
                                    _ver: 1
                                },
                                auth: [
                                    {
                                        _value: 139,
                                        _ver: 1
                                    },
                                    {
                                        _value: 140,
                                        _ver: 1
                                    },
                                    {
                                        _value: 141,
                                        _ver: 1
                                    },
                                    {
                                        _value: 142,
                                        _ver: 1
                                    },
                                    {
                                        _value: 144,
                                        _ver: 1
                                    },
                                    {
                                        _value: 147,
                                        _ver: 1
                                    },
                                    {
                                        _value: 149,
                                        _ver: 1
                                    },
                                    {
                                        _value: 155,
                                        _ver: 1
                                    }
                                ],
                                'identification-checklist': [
                                    {
                                        _value: 30019,
                                        _ver: 1
                                    },
                                    {
                                        _value: 30020,
                                        _ver: 1
                                    },
                                    {
                                        _value: 30021,
                                        _ver: 1
                                    },
                                    {
                                        _value: 30022,
                                        _ver: 1
                                    },
                                    {
                                        _value: 30035,
                                        _ver: 1
                                    }
                                ],
                                'identification-document': [
                                    {
                                        document: {
                                            _value: 30001,
                                            _ver: 1
                                        },
                                        'satisfaction-rate': 100
                                    }
                                ],
                                'pxr-root-name': '流通制御サービスプロバイダー',
                                'store-distribution-ratio': null,
                                'supply-distribution-ratio': null
                            },
                            prop: [
                                {
                                    key: 'auth',
                                    type: {
                                        of: 'code[]',
                                        cmatrix: null,
                                        candidate: {
                                            ns: [
                                                'catalog/model/auth/*'
                                            ],
                                            _code: null,
                                            base: null
                                        }
                                    },
                                    description: '操作権の配列',
                                    isInherit: true
                                },
                                {
                                    key: 'identification-checklist',
                                    type: {
                                        of: 'code[]',
                                        cmatrix: null,
                                        candidate: {
                                            ns: [
                                                'catalog/model/person/item-type',
                                                'catalog/built_in/person/item-type',
                                                'catalog/ext/test-org/person/item-type'
                                            ],
                                            _code: null,
                                            base: null
                                        }
                                    },
                                    description: '採用した本人性確認事項',
                                    isInherit: true
                                },
                                {
                                    key: 'identification-document',
                                    type: {
                                        of: 'inner[]',
                                        inner: 'Identification-document',
                                        cmatrix: null,
                                        candidate: null
                                    },
                                    description: '採用した本人性確認書類',
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
                                    key: 'store-distribution-ratio',
                                    type: {
                                        of: 'inner[]',
                                        inner: 'DistributionRatio',
                                        cmatrix: null,
                                        candidate: null
                                    },
                                    description: '蓄積分配比率',
                                    isInherit: true
                                },
                                {
                                    key: 'supply-distribution-ratio',
                                    type: {
                                        of: 'inner[]',
                                        inner: 'DistributionRatio',
                                        cmatrix: null,
                                        candidate: null
                                    },
                                    description: '提供分配比率',
                                    isInherit: true
                                }
                            ],
                            attribute: null
                        }
                    ]
                );
            } else if (ns === 'catalog/ext/aaa-healthcare-consortium/setting/global') {
                res.json(
                    [
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
                                        ns: 'catalog/ext/aaa-healthcare-consortium/attribute/category/data'
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
                    ]
                );
            }
            res.end();
        };
        const _listener = (req: express.Request, res: express.Response) => {
            const code = Number(req.params.code);
            res.status(status);
            // アクター確認
            if (code === 1) {
                res.json({
                    template: {
                        ns: '/pxr-root'
                    }
                });
            } else if (code === 1000001) {
                res.json({
                    catalogItem: {
                        ns: '/pxr-root'
                    }
                });
            } else if (code === 1000020) {
                res.json({
                    catalogItem: {
                        ns: '/data-trader'
                    },
                    template: {
                        'create-book': true
                    }
                });
            } else if (code === 1000021) {
                res.json({
                    catalogItem: {
                        ns: '/data-trader'
                    }
                });
            } else if (code === 1000022) {
                res.json({
                    template: {
                        name: '/data-trader'
                    }
                });
            } else if (code === 1000002) {
                res.json({
                    catalogItem: {
                        ns: '/region-root'
                    }
                });
            }
            // 本人性確認
            if (code === 30001) {
                res.json({
                    catalogItem: {
                        ns: 'catalog/built_in/person/identification'
                    },
                    template: {
                        'verification-ratio': 100
                    }
                });
            } else if (code === 30002) {
                res.json({
                    catalogItem: {
                        ns: 'catalog/built_in/person/identification'
                    },
                    template: {
                        'verification-ratio': 80
                    }
                });
            } else if (code === 30003) {
                res.json({
                    catalogItem: {
                        name: '本人性確認事項'
                    }
                });
            } else if (code === 30004) {
                res.json({
                    catalogItem: {
                        ns: 'catalog/built_in/person/identification'
                    },
                    template: {
                        'certify-consumer': true
                    }
                });
                res.json({
                    catalogItem: {
                        ns: 'catalog/built_in/person/'
                    },
                    template: {
                        'verification-ratio': 100
                    }
                });
            } else if (code === 30007) {
                res.json({
                    catalogItem: {
                        ns: 'catalog/built_in/person/identification'
                    },
                    template: {
                        'verification-ratio': 100
                    }
                });
            } else if (code === 30009) {
                res.json({
                    catalogItem: {
                        ns: 'catalog/built_in/person/identification'
                    },
                    template: {
                        'verification-ratio': 100
                    }
                });
            } else if (code === 1000071) {
                res.json({
                    catalogItem: {
                        ns: '/role'
                    }
                });
            } else if (code === 1000359) {
                res.status(status).json(catalog1000359);
            } else if (code === 1000110) {
                res.status(status).json(catalog1000110);
            } else if (code === 1000117) {
                res.status(status).json(catalog1000117);
            } else if (code === 1000099) {
                res.status(status).json({
                    catalogItem: {
                        ns: 'catalog/ext/test-org/terms-of-use/region/actor_1000431',
                        name: '健康増進イベント利用規約',
                        description: '健康増進イベントの利用規約です。',
                        _code: {
                            _value: 1000394,
                            _ver: 1
                        },
                        inherit: {
                            _value: 204,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: 'terms-of-use',
                                value: [
                                    {
                                        key: 'title',
                                        value: 'リージョン利用規約'
                                    },
                                    {
                                        key: 'section',
                                        value: [
                                            {
                                                key: 'title',
                                                value: '第1項'
                                            },
                                            {
                                                key: 'content',
                                                value: [
                                                    {
                                                        key: 'sentence',
                                                        value: '規約～～～。'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                key: 're-consent-flag',
                                value: true
                            },
                            {
                                key: 'period-of-re-consent',
                                value: null
                            },
                            {
                                key: 'deleting-data-flag',
                                value: true
                            },
                            {
                                key: 'returning-data-flag',
                                value: true
                            }
                        ]
                    },
                    inner: null,
                    attribute: null
                });
            } else if (code === 1000999) {
                // Platform利用規約取得エラー
                res.status(400);
            }

            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this.app.get('/catalog', _listener2);
        this.app.get('/catalog/name', _listener3);
        this.app.get('/catalog/:code/:version', _listener);
        this.app.get('/catalog/:code', _listener);
        this.server = this.app.listen(3001);
    }
}
// catalog/built_in/person/item-typeで項目が一部含まれていない, catalog/ext/*/person/item-typeで含まれている
export class CatalogService2 {
    app: express.Express;
    server: Server;

    constructor (status: number) {
        this.app = express();

        // イベントハンドラー
        const _listener3 = (req: express.Request, res: express.Response) => {
            res.status(status);
            res.json({
                ext_name: 'test-org'
            });
            res.end();
        };
        const _listener2 = (req: express.Request, res: express.Response) => {
            const ns = req.query['ns'];
            res.status(status);
            if (ns === 'catalog/ext/test-org/setting/actor/pxr-root/actor_1000001') {
                res.json(
                    [
                        {
                            catalogItem: {
                                ns: 'catalog/ext/test-org/setting/actor/pxr-root/actor_1000001',
                                name: '流通制御組織：アクター個別設定',
                                _code: {
                                    _value: 1000362,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 130,
                                    _ver: 1
                                },
                                description: '流通制御組織による流通制御組織のアクター個別設定の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 1000362,
                                    _ver: 1
                                },
                                auth: [
                                    {
                                        _value: 139,
                                        _ver: 1
                                    },
                                    {
                                        _value: 140,
                                        _ver: 1
                                    },
                                    {
                                        _value: 141,
                                        _ver: 1
                                    },
                                    {
                                        _value: 142,
                                        _ver: 1
                                    },
                                    {
                                        _value: 144,
                                        _ver: 1
                                    },
                                    {
                                        _value: 147,
                                        _ver: 1
                                    },
                                    {
                                        _value: 149,
                                        _ver: 1
                                    },
                                    {
                                        _value: 155,
                                        _ver: 1
                                    }
                                ],
                                'identification-checklist': [
                                    {
                                        _value: 30019,
                                        _ver: 1
                                    },
                                    {
                                        _value: 30020,
                                        _ver: 1
                                    },
                                    {
                                        _value: 30021,
                                        _ver: 1
                                    },
                                    {
                                        _value: 30022,
                                        _ver: 1
                                    },
                                    {
                                        _value: 30035,
                                        _ver: 1
                                    }
                                ],
                                'identification-document': [
                                    {
                                        document: {
                                            _value: 30001,
                                            _ver: 1
                                        },
                                        'satisfaction-rate': 100
                                    }
                                ],
                                'pxr-root-name': '流通制御サービスプロバイダー',
                                'store-distribution-ratio': null,
                                'supply-distribution-ratio': null
                            },
                            prop: [
                                {
                                    key: 'auth',
                                    type: {
                                        of: 'code[]',
                                        cmatrix: null,
                                        candidate: {
                                            ns: [
                                                'catalog/model/auth/*'
                                            ],
                                            _code: null,
                                            base: null
                                        }
                                    },
                                    description: '操作権の配列',
                                    isInherit: true
                                },
                                {
                                    key: 'identification-checklist',
                                    type: {
                                        of: 'code[]',
                                        cmatrix: null,
                                        candidate: {
                                            ns: [
                                                'catalog/model/person/item-type',
                                                'catalog/built_in/person/item-type',
                                                'catalog/ext/test-org/person/item-type'
                                            ],
                                            _code: null,
                                            base: null
                                        }
                                    },
                                    description: '採用した本人性確認事項',
                                    isInherit: true
                                },
                                {
                                    key: 'identification-document',
                                    type: {
                                        of: 'inner[]',
                                        inner: 'Identification-document',
                                        cmatrix: null,
                                        candidate: null
                                    },
                                    description: '採用した本人性確認書類',
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
                                    key: 'store-distribution-ratio',
                                    type: {
                                        of: 'inner[]',
                                        inner: 'DistributionRatio',
                                        cmatrix: null,
                                        candidate: null
                                    },
                                    description: '蓄積分配比率',
                                    isInherit: true
                                },
                                {
                                    key: 'supply-distribution-ratio',
                                    type: {
                                        of: 'inner[]',
                                        inner: 'DistributionRatio',
                                        cmatrix: null,
                                        candidate: null
                                    },
                                    description: '提供分配比率',
                                    isInherit: true
                                }
                            ],
                            attribute: null
                        }
                    ]
                );
            } else if (ns === 'catalog/built_in/person/item-type') {
                res.json(
                    [
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '姓',
                                _code: {
                                    _value: 30019,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（姓）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30019,
                                    _ver: 1
                                },
                                'input-pattern': '.+'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '.+'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '名',
                                _code: {
                                    _value: 30020,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（名）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30020,
                                    _ver: 1
                                },
                                'input-pattern': '.+'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '.+'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '性別',
                                _code: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（性別）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                'input-pattern': '^[男女]{1}$'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '^[男女]{1}$'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '生年月日（西暦）',
                                _code: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（生年月日（西暦））の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                'input-pattern': '[12][0-9]{3}[/\\-年](0?[1-9]|1[0-2])[/\\-月](0?[1-9]|[12][0-9]|3[01])日?$'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '[12][0-9]{3}[/\\-年](0?[1-9]|1[0-2])[/\\-月](0?[1-9]|[12][0-9]|3[01])日?$'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '住所',
                                _code: {
                                    _value: 30035,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（住所）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30035,
                                    _ver: 1
                                },
                                'input-pattern': null
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: null,
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '連絡先電話番号',
                                _code: {
                                    _value: 30036,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（連絡先電話番号）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30036,
                                    _ver: 1
                                },
                                'input-pattern': '^0[-0-9]{9,12}$'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '^0[-0-9]{9,12}$'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '姓名',
                                _code: {
                                    _value: 30037,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（姓名）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30037,
                                    _ver: 1
                                },
                                'input-pattern': '.+'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '.+'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '生年月日（和暦）',
                                _code: {
                                    _value: 30038,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（生年月日（和暦））の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30038,
                                    _ver: 1
                                },
                                'input-pattern': '^(明治|大正|昭和|平成|令和)[0-9]{1,2}年(0?[1-9]|1[0-2])月(0?[1-9]|[12][0-9]|3[01])日$'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '^(明治|大正|昭和|平成|令和)[0-9]{1,2}年(0?[1-9]|1[0-2])月(0?[1-9]|[12][0-9]|3[01])日$'
                                }
                            ],
                            attribute: null
                        }
                    ]
                );
            } else if (ns === 'catalog/ext/test-org/person/item-type') {
                res.json(
                    [
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '姓',
                                _code: {
                                    _value: 30019,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: null,
                                    _ver: null
                                },
                                description: '個人属性の項目種別（姓）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30019,
                                    _ver: 1
                                }
                            },
                            prop: null,
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '生年月日',
                                _code: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: null,
                                    _ver: null
                                },
                                description: '個人属性の項目種別（生年月日）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30022,
                                    _ver: 1
                                }
                            },
                            prop: null,
                            attribute: null
                        }
                    ]
                );
            } else if (ns === 'catalog/ext/aaa-healthcare-consortium/setting/actor/pxr-root/actor_1000431') {
                res.json(
                    [
                        {
                            catalogItem: {
                                ns: 'catalog/ext/aaa-healthcare-consortium/setting/actor/pxr-root/actor_1000431',
                                name: '流通制御組織：アクター個別設定',
                                _code: {
                                    _value: 1000362,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 130,
                                    _ver: 1
                                },
                                description: '流通制御組織による流通制御組織のアクター個別設定の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 1000362,
                                    _ver: 1
                                },
                                auth: [
                                    {
                                        _value: 139,
                                        _ver: 1
                                    },
                                    {
                                        _value: 140,
                                        _ver: 1
                                    },
                                    {
                                        _value: 141,
                                        _ver: 1
                                    },
                                    {
                                        _value: 142,
                                        _ver: 1
                                    },
                                    {
                                        _value: 144,
                                        _ver: 1
                                    },
                                    {
                                        _value: 147,
                                        _ver: 1
                                    },
                                    {
                                        _value: 149,
                                        _ver: 1
                                    },
                                    {
                                        _value: 155,
                                        _ver: 1
                                    }
                                ],
                                'identification-checklist': [
                                    {
                                        _value: 30019,
                                        _ver: 1
                                    },
                                    {
                                        _value: 30020,
                                        _ver: 1
                                    },
                                    {
                                        _value: 30021,
                                        _ver: 1
                                    },
                                    {
                                        _value: 30022,
                                        _ver: 1
                                    },
                                    {
                                        _value: 30035,
                                        _ver: 1
                                    }
                                ],
                                'identification-document': [
                                    {
                                        document: {
                                            _value: 30001,
                                            _ver: 1
                                        },
                                        'satisfaction-rate': 100
                                    }
                                ],
                                'pxr-root-name': '流通制御サービスプロバイダー',
                                'store-distribution-ratio': null,
                                'supply-distribution-ratio': null
                            },
                            prop: [
                                {
                                    key: 'auth',
                                    type: {
                                        of: 'code[]',
                                        cmatrix: null,
                                        candidate: {
                                            ns: [
                                                'catalog/model/auth/*'
                                            ],
                                            _code: null,
                                            base: null
                                        }
                                    },
                                    description: '操作権の配列',
                                    isInherit: true
                                },
                                {
                                    key: 'identification-checklist',
                                    type: {
                                        of: 'code[]',
                                        cmatrix: null,
                                        candidate: {
                                            ns: [
                                                'catalog/model/person/item-type',
                                                'catalog/built_in/person/item-type',
                                                'catalog/ext/test-org/person/item-type'
                                            ],
                                            _code: null,
                                            base: null
                                        }
                                    },
                                    description: '採用した本人性確認事項',
                                    isInherit: true
                                },
                                {
                                    key: 'identification-document',
                                    type: {
                                        of: 'inner[]',
                                        inner: 'Identification-document',
                                        cmatrix: null,
                                        candidate: null
                                    },
                                    description: '採用した本人性確認書類',
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
                                    key: 'store-distribution-ratio',
                                    type: {
                                        of: 'inner[]',
                                        inner: 'DistributionRatio',
                                        cmatrix: null,
                                        candidate: null
                                    },
                                    description: '蓄積分配比率',
                                    isInherit: true
                                },
                                {
                                    key: 'supply-distribution-ratio',
                                    type: {
                                        of: 'inner[]',
                                        inner: 'DistributionRatio',
                                        cmatrix: null,
                                        candidate: null
                                    },
                                    description: '提供分配比率',
                                    isInherit: true
                                }
                            ],
                            attribute: null
                        }
                    ]
                );
            } else if (ns === 'catalog/ext/aaa-healthcare-consortium/person/item-type') {
                res.json(
                    [
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '姓',
                                _code: {
                                    _value: 30019,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: null,
                                    _ver: null
                                },
                                description: '個人属性の項目種別（姓）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30019,
                                    _ver: 1
                                }
                            },
                            prop: null,
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '生年月日',
                                _code: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: null,
                                    _ver: null
                                },
                                description: '個人属性の項目種別（生年月日）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30022,
                                    _ver: 1
                                }
                            },
                            prop: null,
                            attribute: null
                        }
                    ]
                );
            }
            res.end();
        };
        const _listener = (req: express.Request, res: express.Response) => {
            const code = Number(req.params.code);
            res.status(status);
            // アクター確認
            if (code === 1000001) {
                res.json({
                    catalogItem: {
                        ns: '/data-trader'
                    }
                });
                // 本人性確認
            } else if (code === 30001) {
                res.json({
                    catalogItem: {
                        ns: 'catalog/built_in/person/identification'
                    },
                    template: {
                        'verification-ratio': 100
                    }
                });
            } else if (code === 30007) {
                res.json({
                    catalogItem: {
                        ns: 'catalog/built_in/person/identification'
                    },
                    template: {
                        'verification-ratio': 100
                    }
                });
            } else if (code === 30009) {
                res.json({
                    catalogItem: {
                        ns: 'catalog/built_in/person/identification'
                    },
                    template: {
                        'verification-ratio': 100
                    }
                });
            } else if (code === 1000359) {
                res.status(status).json(catalog1000359);
            } else if (code === 1000110) {
                res.status(status).json(catalog1000110);
            } else if (code === 1000117) {
                res.status(status).json(catalog1000117);
            } else if (code === 1000099) {
                res.status(status).json({
                    catalogItem: {
                        ns: 'catalog/ext/test-org/terms-of-use/region/actor_1000431',
                        name: '健康増進イベント利用規約',
                        description: '健康増進イベントの利用規約です。',
                        _code: {
                            _value: 1000394,
                            _ver: 1
                        },
                        inherit: {
                            _value: 204,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: 'terms-of-use',
                                value: [
                                    {
                                        key: 'title',
                                        value: 'リージョン利用規約'
                                    },
                                    {
                                        key: 'section',
                                        value: [
                                            {
                                                key: 'title',
                                                value: '第1項'
                                            },
                                            {
                                                key: 'content',
                                                value: [
                                                    {
                                                        key: 'sentence',
                                                        value: '規約～～～。'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                key: 're-consent-flag',
                                value: true
                            },
                            {
                                key: 'period-of-re-consent',
                                value: null
                            },
                            {
                                key: 'deleting-data-flag',
                                value: true
                            },
                            {
                                key: 'returning-data-flag',
                                value: true
                            }
                        ]
                    },
                    inner: null,
                    attribute: null
                });
            }
            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this.app.get('/catalog', _listener2);
        this.app.get('/catalog/name', _listener3);
        this.app.get('/catalog/:code/:version', _listener);
        this.app.get('/catalog/:code', _listener);
        this.server = this.app.listen(3001);
    }
}
// catalog/built_in/person/item-type, catalog/ext/*/person/item-typesどちらも項目が一部含まれていない
export class CatalogService3 {
    app: express.Express;
    server: Server;

    constructor (status: number) {
        this.app = express();

        // イベントハンドラー
        const _listener3 = (req: express.Request, res: express.Response) => {
            res.status(status);
            res.json({
                ext_name: 'test-org'
            });
            res.end();
        };
        const _listener2 = (req: express.Request, res: express.Response) => {
            const ns = req.query['ns'];
            res.status(status);
            if (ns === 'catalog/ext/test-org/setting/actor/pxr-root/actor_1000001') {
                res.json(
                    [
                        {
                            catalogItem: {
                                ns: 'catalog/ext/test-org/setting/actor/pxr-root/actor_1000001',
                                name: '流通制御組織：アクター個別設定',
                                _code: {
                                    _value: 1000362,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 130,
                                    _ver: 1
                                },
                                description: '流通制御組織による流通制御組織のアクター個別設定の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 1000362,
                                    _ver: 1
                                },
                                auth: [
                                    {
                                        _value: 139,
                                        _ver: 1
                                    },
                                    {
                                        _value: 140,
                                        _ver: 1
                                    },
                                    {
                                        _value: 141,
                                        _ver: 1
                                    },
                                    {
                                        _value: 142,
                                        _ver: 1
                                    },
                                    {
                                        _value: 144,
                                        _ver: 1
                                    },
                                    {
                                        _value: 147,
                                        _ver: 1
                                    },
                                    {
                                        _value: 149,
                                        _ver: 1
                                    },
                                    {
                                        _value: 155,
                                        _ver: 1
                                    }
                                ],
                                'identification-checklist': [
                                    {
                                        _value: 30019,
                                        _ver: 1
                                    },
                                    {
                                        _value: 30020,
                                        _ver: 1
                                    },
                                    {
                                        _value: 30021,
                                        _ver: 1
                                    },
                                    {
                                        _value: 30022,
                                        _ver: 1
                                    },
                                    {
                                        _value: 30035,
                                        _ver: 1
                                    }
                                ],
                                'identification-document': [
                                    {
                                        document: {
                                            _value: 30001,
                                            _ver: 1
                                        },
                                        'satisfaction-rate': 100
                                    }
                                ],
                                'pxr-root-name': '流通制御サービスプロバイダー',
                                'store-distribution-ratio': null,
                                'supply-distribution-ratio': null
                            },
                            prop: [
                                {
                                    key: 'auth',
                                    type: {
                                        of: 'code[]',
                                        cmatrix: null,
                                        candidate: {
                                            ns: [
                                                'catalog/model/auth/*'
                                            ],
                                            _code: null,
                                            base: null
                                        }
                                    },
                                    description: '操作権の配列',
                                    isInherit: true
                                },
                                {
                                    key: 'identification-checklist',
                                    type: {
                                        of: 'code[]',
                                        cmatrix: null,
                                        candidate: {
                                            ns: [
                                                'catalog/model/person/item-type',
                                                'catalog/built_in/person/item-type',
                                                'catalog/ext/test-org/person/item-type'
                                            ],
                                            _code: null,
                                            base: null
                                        }
                                    },
                                    description: '採用した本人性確認事項',
                                    isInherit: true
                                },
                                {
                                    key: 'identification-document',
                                    type: {
                                        of: 'inner[]',
                                        inner: 'Identification-document',
                                        cmatrix: null,
                                        candidate: null
                                    },
                                    description: '採用した本人性確認書類',
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
                                    key: 'store-distribution-ratio',
                                    type: {
                                        of: 'inner[]',
                                        inner: 'DistributionRatio',
                                        cmatrix: null,
                                        candidate: null
                                    },
                                    description: '蓄積分配比率',
                                    isInherit: true
                                },
                                {
                                    key: 'supply-distribution-ratio',
                                    type: {
                                        of: 'inner[]',
                                        inner: 'DistributionRatio',
                                        cmatrix: null,
                                        candidate: null
                                    },
                                    description: '提供分配比率',
                                    isInherit: true
                                }
                            ],
                            attribute: null
                        }
                    ]
                );
            } else if (ns === 'catalog/built_in/person/item-type') {
                res.json(
                    [
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '名',
                                _code: {
                                    _value: 30020,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（名）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30020,
                                    _ver: 1
                                },
                                'input-pattern': '.+'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '.+'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '性別',
                                _code: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（性別）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                'input-pattern': '^[男女]{1}$'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '^[男女]{1}$'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '生年月日（西暦）',
                                _code: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（生年月日（西暦））の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                'input-pattern': '[12][0-9]{3}[/\\-年](0?[1-9]|1[0-2])[/\\-月](0?[1-9]|[12][0-9]|3[01])日?$'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '[12][0-9]{3}[/\\-年](0?[1-9]|1[0-2])[/\\-月](0?[1-9]|[12][0-9]|3[01])日?$'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '住所',
                                _code: {
                                    _value: 30035,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（住所）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30035,
                                    _ver: 1
                                },
                                'input-pattern': null
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: null,
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '連絡先電話番号',
                                _code: {
                                    _value: 30036,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（連絡先電話番号）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30036,
                                    _ver: 1
                                },
                                'input-pattern': '^0[-0-9]{9,12}$'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '^0[-0-9]{9,12}$'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '姓名',
                                _code: {
                                    _value: 30037,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（姓名）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30037,
                                    _ver: 1
                                },
                                'input-pattern': '.+'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '.+'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '生年月日（和暦）',
                                _code: {
                                    _value: 30038,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（生年月日（和暦））の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30038,
                                    _ver: 1
                                },
                                'input-pattern': '^(明治|大正|昭和|平成|令和)[0-9]{1,2}年(0?[1-9]|1[0-2])月(0?[1-9]|[12][0-9]|3[01])日$'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '^(明治|大正|昭和|平成|令和)[0-9]{1,2}年(0?[1-9]|1[0-2])月(0?[1-9]|[12][0-9]|3[01])日$'
                                }
                            ],
                            attribute: null
                        }
                    ]
                );
            } else if (ns === 'catalog/ext/test-org/person/item-type') {
                res.json(
                    [
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '姓',
                                _code: {
                                    _value: 30019,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: null,
                                    _ver: null
                                },
                                description: '個人属性の項目種別（姓）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30019,
                                    _ver: 1
                                }
                            },
                            prop: null,
                            attribute: null
                        }
                    ]
                );
            } else if (ns === 'catalog/ext/aaa-healthcare-consortium/setting/actor/pxr-root/actor_1000431') {
                res.json(
                    [
                        {
                            catalogItem: {
                                ns: 'catalog/ext/aaa-healthcare-consortium/setting/actor/pxr-root/actor_1000431',
                                name: '流通制御組織：アクター個別設定',
                                _code: {
                                    _value: 1000362,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 130,
                                    _ver: 1
                                },
                                description: '流通制御組織による流通制御組織のアクター個別設定の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 1000362,
                                    _ver: 1
                                },
                                auth: [
                                    {
                                        _value: 139,
                                        _ver: 1
                                    },
                                    {
                                        _value: 140,
                                        _ver: 1
                                    },
                                    {
                                        _value: 141,
                                        _ver: 1
                                    },
                                    {
                                        _value: 142,
                                        _ver: 1
                                    },
                                    {
                                        _value: 144,
                                        _ver: 1
                                    },
                                    {
                                        _value: 147,
                                        _ver: 1
                                    },
                                    {
                                        _value: 149,
                                        _ver: 1
                                    },
                                    {
                                        _value: 155,
                                        _ver: 1
                                    }
                                ],
                                'identification-checklist': [
                                    {
                                        _value: 30019,
                                        _ver: 1
                                    },
                                    {
                                        _value: 30020,
                                        _ver: 1
                                    },
                                    {
                                        _value: 30021,
                                        _ver: 1
                                    },
                                    {
                                        _value: 30022,
                                        _ver: 1
                                    },
                                    {
                                        _value: 30035,
                                        _ver: 1
                                    }
                                ],
                                'identification-document': [
                                    {
                                        document: {
                                            _value: 30001,
                                            _ver: 1
                                        },
                                        'satisfaction-rate': 100
                                    }
                                ],
                                'pxr-root-name': '流通制御サービスプロバイダー',
                                'store-distribution-ratio': null,
                                'supply-distribution-ratio': null
                            },
                            prop: [
                                {
                                    key: 'auth',
                                    type: {
                                        of: 'code[]',
                                        cmatrix: null,
                                        candidate: {
                                            ns: [
                                                'catalog/model/auth/*'
                                            ],
                                            _code: null,
                                            base: null
                                        }
                                    },
                                    description: '操作権の配列',
                                    isInherit: true
                                },
                                {
                                    key: 'identification-checklist',
                                    type: {
                                        of: 'code[]',
                                        cmatrix: null,
                                        candidate: {
                                            ns: [
                                                'catalog/model/person/item-type',
                                                'catalog/built_in/person/item-type',
                                                'catalog/ext/test-org/person/item-type'
                                            ],
                                            _code: null,
                                            base: null
                                        }
                                    },
                                    description: '採用した本人性確認事項',
                                    isInherit: true
                                },
                                {
                                    key: 'identification-document',
                                    type: {
                                        of: 'inner[]',
                                        inner: 'Identification-document',
                                        cmatrix: null,
                                        candidate: null
                                    },
                                    description: '採用した本人性確認書類',
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
                                    key: 'store-distribution-ratio',
                                    type: {
                                        of: 'inner[]',
                                        inner: 'DistributionRatio',
                                        cmatrix: null,
                                        candidate: null
                                    },
                                    description: '蓄積分配比率',
                                    isInherit: true
                                },
                                {
                                    key: 'supply-distribution-ratio',
                                    type: {
                                        of: 'inner[]',
                                        inner: 'DistributionRatio',
                                        cmatrix: null,
                                        candidate: null
                                    },
                                    description: '提供分配比率',
                                    isInherit: true
                                }
                            ],
                            attribute: null
                        }
                    ]
                );
            }
            res.end();
        };
        const _listener = (req: express.Request, res: express.Response) => {
            const code = Number(req.params.code);
            // 本人性確認
            if (code === 30001) {
                res.status(status).json({
                    catalogItem: {
                        ns: 'catalog/built_in/person/identification'
                    },
                    template: {
                        'verification-ratio': 100
                    }
                });
            } else if (code === 30007) {
                res.json({
                    catalogItem: {
                        ns: 'catalog/built_in/person/identification'
                    },
                    template: {
                        'verification-ratio': 100
                    }
                });
            } else if (code === 30009) {
                res.json({
                    catalogItem: {
                        ns: 'catalog/built_in/person/identification'
                    },
                    template: {
                        'verification-ratio': 100
                    }
                });
            } else if (code === 1000359) {
                res.status(status).json(catalog1000359);
            } else if (code === 1000110) {
                res.status(status).json(catalog1000110);
            } else if (code === 1000117) {
                res.status(status).json(catalog1000117);
            } else if (code === 1000099) {
                res.status(status).json({
                    catalogItem: {
                        ns: 'catalog/ext/test-org/terms-of-use/region/actor_1000431',
                        name: '健康増進イベント利用規約',
                        description: '健康増進イベントの利用規約です。',
                        _code: {
                            _value: 1000394,
                            _ver: 1
                        },
                        inherit: {
                            _value: 204,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: 'terms-of-use',
                                value: [
                                    {
                                        key: 'title',
                                        value: 'リージョン利用規約'
                                    },
                                    {
                                        key: 'section',
                                        value: [
                                            {
                                                key: 'title',
                                                value: '第1項'
                                            },
                                            {
                                                key: 'content',
                                                value: [
                                                    {
                                                        key: 'sentence',
                                                        value: '規約～～～。'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                key: 're-consent-flag',
                                value: true
                            },
                            {
                                key: 'period-of-re-consent',
                                value: null
                            },
                            {
                                key: 'deleting-data-flag',
                                value: true
                            },
                            {
                                key: 'returning-data-flag',
                                value: true
                            }
                        ]
                    },
                    inner: null,
                    attribute: null
                });
            }
            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this.app.get('/catalog/name', _listener3);
        this.app.get('/catalog/:code/:version', _listener);
        this.app.get('/catalog/:code', _listener);
        this.app.get('/catalog', _listener2);
        this.server = this.app.listen(3001);
    }
}
// IDサービスを使用する設定
export class CatalogService4 {
    app: express.Express;
    server: Server;

    constructor (status: number) {
        this.app = express();

        // イベントハンドラー
        const _listener3 = (req: express.Request, res: express.Response) => {
            res.status(status);
            res.json({
                ext_name: 'test-org'
            });
            res.end();
        };
        const _listener2 = (req: express.Request, res: express.Response) => {
            const ns = req.query['ns'];
            res.status(status);
            if (ns === 'catalog/ext/test-org/setting/actor/pxr-root/actor_1000001') {
                res.json(
                    [
                        {
                            catalogItem: {
                                ns: 'catalog/ext/test-org/setting/actor/pxr-root/actor_1000001',
                                name: '流通制御組織：アクター個別設定',
                                _code: {
                                    _value: 1000362,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 130,
                                    _ver: 1
                                },
                                description: '流通制御組織による流通制御組織のアクター個別設定の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 1000362,
                                    _ver: 1
                                },
                                auth: [
                                    {
                                        _value: 139,
                                        _ver: 1
                                    },
                                    {
                                        _value: 140,
                                        _ver: 1
                                    },
                                    {
                                        _value: 141,
                                        _ver: 1
                                    },
                                    {
                                        _value: 142,
                                        _ver: 1
                                    },
                                    {
                                        _value: 144,
                                        _ver: 1
                                    },
                                    {
                                        _value: 147,
                                        _ver: 1
                                    },
                                    {
                                        _value: 149,
                                        _ver: 1
                                    },
                                    {
                                        _value: 155,
                                        _ver: 1
                                    }
                                ],
                                'identification-checklist': [
                                    {
                                        _value: 30019,
                                        _ver: 1
                                    },
                                    {
                                        _value: 30020,
                                        _ver: 1
                                    },
                                    {
                                        _value: 30021,
                                        _ver: 1
                                    },
                                    {
                                        _value: 30022,
                                        _ver: 1
                                    },
                                    {
                                        _value: 30035,
                                        _ver: 1
                                    }
                                ],
                                'identification-document': [
                                    {
                                        document: {
                                            _value: 30001,
                                            _ver: 1
                                        },
                                        'satisfaction-rate': 100
                                    },
                                    {
                                        document: {
                                            _value: 30007,
                                            _ver: 1
                                        },
                                        'satisfaction-rate': 100
                                    },
                                    {
                                        document: {
                                            _value: 30009,
                                            _ver: 1
                                        },
                                        'satisfaction-rate': 100
                                    }
                                ],
                                'pxr-root-name': '流通制御サービスプロバイダー',
                                'store-distribution-ratio': null,
                                'supply-distribution-ratio': null
                            },
                            prop: [
                                {
                                    key: 'auth',
                                    type: {
                                        of: 'code[]',
                                        cmatrix: null,
                                        candidate: {
                                            ns: [
                                                'catalog/model/auth/*'
                                            ],
                                            _code: null,
                                            base: null
                                        }
                                    },
                                    description: '操作権の配列',
                                    isInherit: true
                                },
                                {
                                    key: 'identification-checklist',
                                    type: {
                                        of: 'code[]',
                                        cmatrix: null,
                                        candidate: {
                                            ns: [
                                                'catalog/model/person/item-type',
                                                'catalog/built_in/person/item-type',
                                                'catalog/ext/test-org/person/item-type'
                                            ],
                                            _code: null,
                                            base: null
                                        }
                                    },
                                    description: '採用した本人性確認事項',
                                    isInherit: true
                                },
                                {
                                    key: 'identification-document',
                                    type: {
                                        of: 'inner[]',
                                        inner: 'Identification-document',
                                        cmatrix: null,
                                        candidate: null
                                    },
                                    description: '採用した本人性確認書類',
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
                                    key: 'store-distribution-ratio',
                                    type: {
                                        of: 'inner[]',
                                        inner: 'DistributionRatio',
                                        cmatrix: null,
                                        candidate: null
                                    },
                                    description: '蓄積分配比率',
                                    isInherit: true
                                },
                                {
                                    key: 'supply-distribution-ratio',
                                    type: {
                                        of: 'inner[]',
                                        inner: 'DistributionRatio',
                                        cmatrix: null,
                                        candidate: null
                                    },
                                    description: '提供分配比率',
                                    isInherit: true
                                }
                            ],
                            attribute: null
                        }
                    ]
                );
            } else if (ns === 'catalog/built_in/person/item-type') {
                res.json(
                    [
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '姓',
                                _code: {
                                    _value: 30019,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（姓）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30019,
                                    _ver: 1
                                },
                                'input-pattern': '.+'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '.+'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '名',
                                _code: {
                                    _value: 30020,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（名）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30020,
                                    _ver: 1
                                },
                                'input-pattern': '.+'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '.+'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '生年月日（西暦）',
                                _code: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（生年月日（西暦））の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                'input-pattern': '[12][0-9]{3}[/\\-年](0?[1-9]|1[0-2])[/\\-月](0?[1-9]|[12][0-9]|3[01])日?$'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '[12][0-9]{3}[/\\-年](0?[1-9]|1[0-2])[/\\-月](0?[1-9]|[12][0-9]|3[01])日?$'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '住所',
                                _code: {
                                    _value: 30035,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（住所）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30035,
                                    _ver: 1
                                },
                                'input-pattern': null
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: null,
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '連絡先電話番号',
                                _code: {
                                    _value: 30036,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（連絡先電話番号）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30036,
                                    _ver: 1
                                },
                                'input-pattern': '^0[-0-9]{9,12}$'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '^0[-0-9]{9,12}$'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '姓名',
                                _code: {
                                    _value: 30037,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（姓名）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30037,
                                    _ver: 1
                                },
                                'input-pattern': '.+'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '.+'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '生年月日（和暦）',
                                _code: {
                                    _value: 30038,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（生年月日（和暦））の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30038,
                                    _ver: 1
                                },
                                'input-pattern': '^(明治|大正|昭和|平成|令和)[0-9]{1,2}年(0?[1-9]|1[0-2])月(0?[1-9]|[12][0-9]|3[01])日$'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '^(明治|大正|昭和|平成|令和)[0-9]{1,2}年(0?[1-9]|1[0-2])月(0?[1-9]|[12][0-9]|3[01])日$'
                                }
                            ],
                            attribute: null
                        }
                    ]
                );
            } else if (ns === 'catalog/ext/test-org/person/item-type') {
                res.json(
                    [
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '姓',
                                _code: {
                                    _value: 30019,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（姓）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30019,
                                    _ver: 1
                                },
                                'input-pattern': '.+'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '.+'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '名',
                                _code: {
                                    _value: 30020,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（名）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30020,
                                    _ver: 1
                                },
                                'input-pattern': '.+'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '.+'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '性別',
                                _code: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（性別）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                'input-pattern': '^[男女]{1}$'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '^[男女]{1}$'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '生年月日（西暦）',
                                _code: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（生年月日（西暦））の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                'input-pattern': '[12][0-9]{3}[/\\-年](0?[1-9]|1[0-2])[/\\-月](0?[1-9]|[12][0-9]|3[01])日?$'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '[12][0-9]{3}[/\\-年](0?[1-9]|1[0-2])[/\\-月](0?[1-9]|[12][0-9]|3[01])日?$'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '住所',
                                _code: {
                                    _value: 30035,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（住所）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30035,
                                    _ver: 1
                                },
                                'input-pattern': null
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: null,
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '連絡先電話番号',
                                _code: {
                                    _value: 30036,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（連絡先電話番号）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30036,
                                    _ver: 1
                                },
                                'input-pattern': '^0[-0-9]{9,12}$'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '^0[-0-9]{9,12}$'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '姓名',
                                _code: {
                                    _value: 30037,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（姓名）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30037,
                                    _ver: 1
                                },
                                'input-pattern': '.+'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '.+'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '生年月日（和暦）',
                                _code: {
                                    _value: 30038,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（生年月日（和暦））の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30038,
                                    _ver: 1
                                },
                                'input-pattern': '^(明治|大正|昭和|平成|令和)[0-9]{1,2}年(0?[1-9]|1[0-2])月(0?[1-9]|[12][0-9]|3[01])日$'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '^(明治|大正|昭和|平成|令和)[0-9]{1,2}年(0?[1-9]|1[0-2])月(0?[1-9]|[12][0-9]|3[01])日$'
                                }
                            ],
                            attribute: null
                        }
                    ]
                );
            } else if (ns === 'catalog/ext/aaa-healthcare-consortium/person/item-type') {
                res.json(
                    [
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '姓',
                                _code: {
                                    _value: 30019,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（姓）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30019,
                                    _ver: 1
                                },
                                'input-pattern': '.+'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '.+'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '名',
                                _code: {
                                    _value: 30020,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（名）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30020,
                                    _ver: 1
                                },
                                'input-pattern': '.+'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '.+'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '性別',
                                _code: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（性別）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                'input-pattern': '^[男女]{1}$'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '^[男女]{1}$'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '生年月日（西暦）',
                                _code: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（生年月日（西暦））の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                'input-pattern': '[12][0-9]{3}[/\\-年](0?[1-9]|1[0-2])[/\\-月](0?[1-9]|[12][0-9]|3[01])日?$'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '[12][0-9]{3}[/\\-年](0?[1-9]|1[0-2])[/\\-月](0?[1-9]|[12][0-9]|3[01])日?$'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '住所',
                                _code: {
                                    _value: 30035,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（住所）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30035,
                                    _ver: 1
                                },
                                'input-pattern': null
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: null,
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '連絡先電話番号',
                                _code: {
                                    _value: 30036,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（連絡先電話番号）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30036,
                                    _ver: 1
                                },
                                'input-pattern': '^0[-0-9]{9,12}$'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '^0[-0-9]{9,12}$'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '姓名',
                                _code: {
                                    _value: 30037,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（姓名）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30037,
                                    _ver: 1
                                },
                                'input-pattern': '.+'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '.+'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '生年月日（和暦）',
                                _code: {
                                    _value: 30038,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（生年月日（和暦））の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30038,
                                    _ver: 1
                                },
                                'input-pattern': '^(明治|大正|昭和|平成|令和)[0-9]{1,2}年(0?[1-9]|1[0-2])月(0?[1-9]|[12][0-9]|3[01])日$'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '^(明治|大正|昭和|平成|令和)[0-9]{1,2}年(0?[1-9]|1[0-2])月(0?[1-9]|[12][0-9]|3[01])日$'
                                }
                            ],
                            attribute: null
                        }
                    ]
                );
            } else if (ns === 'catalog/ext/test-org/setting/global') {
                res.json(
                    [
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
                                        ns: 'catalog/ext/aaa-healthcare-consortium/attribute/category/data'
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
                                use_id_connect: true,
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
                    ]
                );
            } else if (ns === 'catalog/ext/aaa-healthcare-consortium/setting/actor/pxr-root/actor_1000431') {
                res.json(
                    [
                        {
                            catalogItem: {
                                ns: 'catalog/ext/aaa-healthcare-consortium/setting/actor/pxr-root/actor_1000431',
                                name: '流通制御組織：アクター個別設定',
                                _code: {
                                    _value: 1000362,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 130,
                                    _ver: 1
                                },
                                description: '流通制御組織による流通制御組織のアクター個別設定の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 1000362,
                                    _ver: 1
                                },
                                auth: [
                                    {
                                        _value: 139,
                                        _ver: 1
                                    },
                                    {
                                        _value: 140,
                                        _ver: 1
                                    },
                                    {
                                        _value: 141,
                                        _ver: 1
                                    },
                                    {
                                        _value: 142,
                                        _ver: 1
                                    },
                                    {
                                        _value: 144,
                                        _ver: 1
                                    },
                                    {
                                        _value: 147,
                                        _ver: 1
                                    },
                                    {
                                        _value: 149,
                                        _ver: 1
                                    },
                                    {
                                        _value: 155,
                                        _ver: 1
                                    }
                                ],
                                'identification-checklist': [
                                    {
                                        _value: 30019,
                                        _ver: 1
                                    },
                                    {
                                        _value: 30020,
                                        _ver: 1
                                    },
                                    {
                                        _value: 30021,
                                        _ver: 1
                                    },
                                    {
                                        _value: 30022,
                                        _ver: 1
                                    },
                                    {
                                        _value: 30035,
                                        _ver: 1
                                    }
                                ],
                                'identification-document': [
                                    {
                                        document: {
                                            _value: 30001,
                                            _ver: 1
                                        },
                                        'satisfaction-rate': 100
                                    },
                                    {
                                        document: {
                                            _value: 30007,
                                            _ver: 1
                                        },
                                        'satisfaction-rate': 100
                                    },
                                    {
                                        document: {
                                            _value: 30009,
                                            _ver: 1
                                        },
                                        'satisfaction-rate': 100
                                    },
                                    {
                                        document: {
                                            _value: 30010,
                                            _ver: 1
                                        },
                                        'satisfaction-rate': 100
                                    }
                                ],
                                'pxr-root-name': '流通制御サービスプロバイダー',
                                'store-distribution-ratio': null,
                                'supply-distribution-ratio': null
                            },
                            prop: [
                                {
                                    key: 'auth',
                                    type: {
                                        of: 'code[]',
                                        cmatrix: null,
                                        candidate: {
                                            ns: [
                                                'catalog/model/auth/*'
                                            ],
                                            _code: null,
                                            base: null
                                        }
                                    },
                                    description: '操作権の配列',
                                    isInherit: true
                                },
                                {
                                    key: 'identification-checklist',
                                    type: {
                                        of: 'code[]',
                                        cmatrix: null,
                                        candidate: {
                                            ns: [
                                                'catalog/model/person/item-type',
                                                'catalog/built_in/person/item-type',
                                                'catalog/ext/test-org/person/item-type'
                                            ],
                                            _code: null,
                                            base: null
                                        }
                                    },
                                    description: '採用した本人性確認事項',
                                    isInherit: true
                                },
                                {
                                    key: 'identification-document',
                                    type: {
                                        of: 'inner[]',
                                        inner: 'Identification-document',
                                        cmatrix: null,
                                        candidate: null
                                    },
                                    description: '採用した本人性確認書類',
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
                                    key: 'store-distribution-ratio',
                                    type: {
                                        of: 'inner[]',
                                        inner: 'DistributionRatio',
                                        cmatrix: null,
                                        candidate: null
                                    },
                                    description: '蓄積分配比率',
                                    isInherit: true
                                },
                                {
                                    key: 'supply-distribution-ratio',
                                    type: {
                                        of: 'inner[]',
                                        inner: 'DistributionRatio',
                                        cmatrix: null,
                                        candidate: null
                                    },
                                    description: '提供分配比率',
                                    isInherit: true
                                }
                            ],
                            attribute: null
                        }
                    ]
                );
            } else if (ns === 'catalog/ext/aaa-healthcare-consortium/setting/global') {
                res.json(
                    [
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
                                        ns: 'catalog/ext/aaa-healthcare-consortium/attribute/category/data'
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
                                use_id_connect: true,
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
                    ]
                );
            }
            res.end();
        };
        const _listener = (req: express.Request, res: express.Response) => {
            const code = Number(req.params.code);
            res.status(status);
            // アクター確認
            if (code === 1) {
                res.json({
                    template: {
                        ns: '/pxr-root'
                    }
                });
            } else if (code === 30007) {
                res.json({
                    catalogItem: {
                        ns: 'catalog/built_in/person/identification'
                    },
                    template: {
                        'verification-ratio': 100
                    }
                });
            } else if (code === 30009) {
                res.json({
                    catalogItem: {
                        ns: 'catalog/built_in/person/identification'
                    },
                    template: {
                        'verification-ratio': 100
                    }
                });
            } else if (code === 30010) {
                res.json({
                    catalogItem: {
                        ns: 'catalog/built_in/person/identification'
                    },
                    template: {
                        'verification-ratio': 100
                    }
                });
            } else if (code === 1000001) {
                res.json({
                    catalogItem: {
                        ns: '/pxr-root'
                    }
                });
            } else if (code === 1000020) {
                res.json({
                    catalogItem: {
                        ns: '/data-trader'
                    },
                    template: {
                        'create-book': true
                    }
                });
            } else if (code === 1000021) {
                res.json({
                    catalogItem: {
                        ns: '/data-trader'
                    }
                });
            } else if (code === 1000022) {
                res.json({
                    template: {
                        name: '/data-trader'
                    }
                });
            } else if (code === 1000002) {
                res.json({
                    catalogItem: {
                        ns: '/region-root'
                    }
                });
            }
            // 本人性確認
            if (code === 30001) {
                res.json({
                    catalogItem: {
                        ns: 'catalog/built_in/person/identification'
                    },
                    template: {
                        'verification-ratio': 100
                    }
                });
            } else if (code === 1000071) {
                res.json({
                    catalogItem: {
                        ns: '/role'
                    }
                });
            } else if (code === 1000359) {
                res.status(status).json(catalog1000359);
            } else if (code === 1000110) {
                res.status(status).json(catalog1000110);
            } else if (code === 1000117) {
                res.status(status).json(catalog1000117);
            } else if (code === 1000099) {
                res.status(status).json({
                    catalogItem: {
                        ns: 'catalog/ext/test-org/terms-of-use/region/actor_1000431',
                        name: '健康増進イベント利用規約',
                        description: '健康増進イベントの利用規約です。',
                        _code: {
                            _value: 1000394,
                            _ver: 1
                        },
                        inherit: {
                            _value: 204,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: 'terms-of-use',
                                value: [
                                    {
                                        key: 'title',
                                        value: 'リージョン利用規約'
                                    },
                                    {
                                        key: 'section',
                                        value: [
                                            {
                                                key: 'title',
                                                value: '第1項'
                                            },
                                            {
                                                key: 'content',
                                                value: [
                                                    {
                                                        key: 'sentence',
                                                        value: '規約～～～。'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                key: 're-consent-flag',
                                value: true
                            },
                            {
                                key: 'period-of-re-consent',
                                value: null
                            },
                            {
                                key: 'deleting-data-flag',
                                value: true
                            },
                            {
                                key: 'returning-data-flag',
                                value: true
                            }
                        ]
                    },
                    inner: null,
                    attribute: null
                });
            }

            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this.app.get('/catalog/name', _listener3);
        this.app.get('/catalog/:code/:version', _listener);
        this.app.get('/catalog/:code', _listener);
        this.app.get('/catalog', _listener2);
        this.server = this.app.listen(3001);
    }
}
// 設定異常（identification-document）
export class CatalogService5 {
    app: express.Express;
    server: Server;

    constructor (status: number) {
        this.app = express();

        // イベントハンドラー
        const _listener3 = (req: express.Request, res: express.Response) => {
            res.status(status);
            res.json({
                ext_name: 'test-org'
            });
            res.end();
        };
        const _listener2 = (req: express.Request, res: express.Response) => {
            const ns = req.query['ns'];
            res.status(status);
            if ((ns === 'catalog/built_in/person/item-type') || (ns === 'catalog/ext/test-org/person/item-type')) {
                res.json(
                    [
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '姓',
                                _code: {
                                    _value: 30019,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（姓）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30019,
                                    _ver: 1
                                },
                                'input-pattern': '.+'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '.+'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '名',
                                _code: {
                                    _value: 30020,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（名）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30020,
                                    _ver: 1
                                },
                                'input-pattern': '.+'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '.+'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '性別',
                                _code: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（性別）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                'input-pattern': '^[男女]{1}$'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '^[男女]{1}$'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '生年月日（西暦）',
                                _code: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（生年月日（西暦））の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                'input-pattern': '[12][0-9]{3}[/\\-年](0?[1-9]|1[0-2])[/\\-月](0?[1-9]|[12][0-9]|3[01])日?$'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '[12][0-9]{3}[/\\-年](0?[1-9]|1[0-2])[/\\-月](0?[1-9]|[12][0-9]|3[01])日?$'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '住所',
                                _code: {
                                    _value: 30035,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（住所）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30035,
                                    _ver: 1
                                },
                                'input-pattern': null
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: null,
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '連絡先電話番号',
                                _code: {
                                    _value: 30036,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（連絡先電話番号）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30036,
                                    _ver: 1
                                },
                                'input-pattern': '^0[-0-9]{9,12}$'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '^0[-0-9]{9,12}$'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '姓名',
                                _code: {
                                    _value: 30037,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（姓名）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30037,
                                    _ver: 1
                                },
                                'input-pattern': '.+'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '.+'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '生年月日（和暦）',
                                _code: {
                                    _value: 30038,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（生年月日（和暦））の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30038,
                                    _ver: 1
                                },
                                'input-pattern': '^(明治|大正|昭和|平成|令和)[0-9]{1,2}年(0?[1-9]|1[0-2])月(0?[1-9]|[12][0-9]|3[01])日$'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '^(明治|大正|昭和|平成|令和)[0-9]{1,2}年(0?[1-9]|1[0-2])月(0?[1-9]|[12][0-9]|3[01])日$'
                                }
                            ],
                            attribute: null
                        }
                    ]
                );
            } else if (ns === 'catalog/ext/test-org/setting/global') {
                res.json(
                    [
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
                                        ns: 'catalog/ext/aaa-healthcare-consortium/attribute/category/data'
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
                                use_id_connect: true,
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
                    ]
                );
            } else if (ns === 'catalog/ext/aaa-healthcare-consortium/setting/actor/pxr-root/actor_1000431') {
                res.json(
                    [
                        {
                            catalogItem: {
                                ns: 'catalog/ext/aaa-healthcare-consortium/setting/actor/pxr-root/actor_1000431',
                                name: '流通制御組織：アクター個別設定',
                                _code: {
                                    _value: 1000362,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 130,
                                    _ver: 1
                                },
                                description: '流通制御組織による流通制御組織のアクター個別設定の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 1000362,
                                    _ver: 1
                                },
                                auth: [
                                    {
                                        _value: 139,
                                        _ver: 1
                                    },
                                    {
                                        _value: 140,
                                        _ver: 1
                                    },
                                    {
                                        _value: 141,
                                        _ver: 1
                                    },
                                    {
                                        _value: 142,
                                        _ver: 1
                                    },
                                    {
                                        _value: 144,
                                        _ver: 1
                                    },
                                    {
                                        _value: 147,
                                        _ver: 1
                                    },
                                    {
                                        _value: 149,
                                        _ver: 1
                                    },
                                    {
                                        _value: 155,
                                        _ver: 1
                                    }
                                ],
                                'identification-checklist': [
                                    {
                                        _value: 30019,
                                        _ver: 1
                                    },
                                    {
                                        _value: 30020,
                                        _ver: 1
                                    },
                                    {
                                        _value: 30021,
                                        _ver: 1
                                    },
                                    {
                                        _value: 30022,
                                        _ver: 1
                                    },
                                    {
                                        _value: 30035,
                                        _ver: 1
                                    }
                                ],
                                'identification-document': null,
                                'pxr-root-name': '流通制御サービスプロバイダー',
                                'store-distribution-ratio': null,
                                'supply-distribution-ratio': null
                            },
                            prop: [
                                {
                                    key: 'auth',
                                    type: {
                                        of: 'code[]',
                                        cmatrix: null,
                                        candidate: {
                                            ns: [
                                                'catalog/model/auth/*'
                                            ],
                                            _code: null,
                                            base: null
                                        }
                                    },
                                    description: '操作権の配列',
                                    isInherit: true
                                },
                                {
                                    key: 'identification-checklist',
                                    type: {
                                        of: 'code[]',
                                        cmatrix: null,
                                        candidate: {
                                            ns: [
                                                'catalog/model/person/item-type',
                                                'catalog/built_in/person/item-type',
                                                'catalog/ext/test-org/person/item-type'
                                            ],
                                            _code: null,
                                            base: null
                                        }
                                    },
                                    description: '採用した本人性確認事項',
                                    isInherit: true
                                },
                                {
                                    key: 'identification-document',
                                    type: {
                                        of: 'inner[]',
                                        inner: 'Identification-document',
                                        cmatrix: null,
                                        candidate: null
                                    },
                                    description: '採用した本人性確認書類',
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
                                    key: 'store-distribution-ratio',
                                    type: {
                                        of: 'inner[]',
                                        inner: 'DistributionRatio',
                                        cmatrix: null,
                                        candidate: null
                                    },
                                    description: '蓄積分配比率',
                                    isInherit: true
                                },
                                {
                                    key: 'supply-distribution-ratio',
                                    type: {
                                        of: 'inner[]',
                                        inner: 'DistributionRatio',
                                        cmatrix: null,
                                        candidate: null
                                    },
                                    description: '提供分配比率',
                                    isInherit: true
                                }
                            ],
                            attribute: null
                        }
                    ]
                );
            } else if (ns === 'catalog/ext/aaa-healthcare-consortium/setting/global') {
                res.json(
                    [
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
                                        ns: 'catalog/ext/aaa-healthcare-consortium/attribute/category/data'
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
                                use_id_connect: true,
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
                    ]
                );
            }
            res.end();
        };
        const _listener = (req: express.Request, res: express.Response) => {
            const code = Number(req.params.code);
            res.status(status);
            // アクター確認
            if (code === 1) {
                res.json({
                    template: {
                        ns: '/pxr-root'
                    }
                });
            } else if (code === 30007) {
                res.json({
                    catalogItem: {
                        ns: 'catalog/built_in/person/identification'
                    },
                    template: {
                        'verification-ratio': 100
                    }
                });
            } else if (code === 30009) {
                res.json({
                    catalogItem: {
                        ns: 'catalog/built_in/person/identification'
                    },
                    template: {
                        'verification-ratio': 100
                    }
                });
            } else if (code === 1000001) {
                res.json({
                    catalogItem: {
                        ns: '/pxr-root'
                    }
                });
            } else if (code === 1000020) {
                res.json({
                    catalogItem: {
                        ns: '/data-trader'
                    },
                    template: {
                        'create-book': true
                    }
                });
            } else if (code === 1000021) {
                res.json({
                    catalogItem: {
                        ns: '/data-trader'
                    }
                });
            } else if (code === 1000022) {
                res.json({
                    template: {
                        name: '/data-trader'
                    }
                });
            } else if (code === 1000002) {
                res.json({
                    catalogItem: {
                        ns: '/region-root'
                    }
                });
            }
            // 本人性確認
            if (code === 30001) {
                res.json({
                    catalogItem: {
                        ns: 'catalog/built_in/person/identification'
                    },
                    template: {
                        'verification-ratio': 100
                    }
                });
            } else if (code === 1000071) {
                res.json({
                    catalogItem: {
                        ns: '/role'
                    }
                });
            } else if (code === 1000359) {
                res.status(status).json(catalog1000359);
            } else if (code === 1000110) {
                res.status(status).json(catalog1000110);
            } else if (code === 1000117) {
                res.status(status).json(catalog1000117);
            } else if (code === 1000099) {
                res.status(status).json({
                    catalogItem: {
                        ns: 'catalog/ext/test-org/terms-of-use/region/actor_1000431',
                        name: '健康増進イベント利用規約',
                        description: '健康増進イベントの利用規約です。',
                        _code: {
                            _value: 1000394,
                            _ver: 1
                        },
                        inherit: {
                            _value: 204,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: 'terms-of-use',
                                value: [
                                    {
                                        key: 'title',
                                        value: 'リージョン利用規約'
                                    },
                                    {
                                        key: 'section',
                                        value: [
                                            {
                                                key: 'title',
                                                value: '第1項'
                                            },
                                            {
                                                key: 'content',
                                                value: [
                                                    {
                                                        key: 'sentence',
                                                        value: '規約～～～。'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                key: 're-consent-flag',
                                value: true
                            },
                            {
                                key: 'period-of-re-consent',
                                value: null
                            },
                            {
                                key: 'deleting-data-flag',
                                value: true
                            },
                            {
                                key: 'returning-data-flag',
                                value: true
                            }
                        ]
                    },
                    inner: null,
                    attribute: null
                });
            }

            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this.app.get('/catalog/name', _listener3);
        this.app.get('/catalog/:code/:version', _listener);
        this.app.get('/catalog/:code', _listener);
        this.app.get('/catalog', _listener2);
        this.server = this.app.listen(3001);
    }
}
// 設定異常（identification-document）
export class CatalogService6 {
    app: express.Express;
    server: Server;

    constructor (status: number) {
        this.app = express();

        // イベントハンドラー
        const _listener3 = (req: express.Request, res: express.Response) => {
            res.status(status);
            res.json({
                ext_name: 'test-org'
            });
            res.end();
        };
        const _listener2 = (req: express.Request, res: express.Response) => {
            const ns = req.query['ns'];
            res.status(status);
            if ((ns === 'catalog/built_in/person/item-type') || (ns === 'catalog/ext/test-org/person/item-type')) {
                res.json(
                    [
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '姓',
                                _code: {
                                    _value: 30019,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（姓）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30019,
                                    _ver: 1
                                },
                                'input-pattern': '.+'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '.+'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '名',
                                _code: {
                                    _value: 30020,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（名）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30020,
                                    _ver: 1
                                },
                                'input-pattern': '.+'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '.+'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '性別',
                                _code: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（性別）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                'input-pattern': '^[男女]{1}$'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '^[男女]{1}$'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '生年月日（西暦）',
                                _code: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（生年月日（西暦））の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                'input-pattern': '[12][0-9]{3}[/\\-年](0?[1-9]|1[0-2])[/\\-月](0?[1-9]|[12][0-9]|3[01])日?$'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '[12][0-9]{3}[/\\-年](0?[1-9]|1[0-2])[/\\-月](0?[1-9]|[12][0-9]|3[01])日?$'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '住所',
                                _code: {
                                    _value: 30035,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（住所）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30035,
                                    _ver: 1
                                },
                                'input-pattern': null
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: null,
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '連絡先電話番号',
                                _code: {
                                    _value: 30036,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（連絡先電話番号）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30036,
                                    _ver: 1
                                },
                                'input-pattern': '^0[-0-9]{9,12}$'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '^0[-0-9]{9,12}$'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '姓名',
                                _code: {
                                    _value: 30037,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（姓名）の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30037,
                                    _ver: 1
                                },
                                'input-pattern': '.+'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '.+'
                                }
                            ],
                            attribute: null
                        },
                        {
                            catalogItem: {
                                ns: 'catalog/built_in/person/item-type',
                                name: '生年月日（和暦）',
                                _code: {
                                    _value: 30038,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 133,
                                    _ver: 1
                                },
                                description: '個人属性の項目種別（生年月日（和暦））の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 30038,
                                    _ver: 1
                                },
                                'input-pattern': '^(明治|大正|昭和|平成|令和)[0-9]{1,2}年(0?[1-9]|1[0-2])月(0?[1-9]|[12][0-9]|3[01])日$'
                            },
                            prop: [
                                {
                                    key: 'input-pattern',
                                    type: {
                                        of: 'string',
                                        cmatrix: null,
                                        format: null,
                                        unit: null,
                                        candidate: null
                                    },
                                    description: '入力パターン',
                                    isInherit: true
                                }
                            ],
                            value: [
                                {
                                    key: 'input-pattern',
                                    value: '^(明治|大正|昭和|平成|令和)[0-9]{1,2}年(0?[1-9]|1[0-2])月(0?[1-9]|[12][0-9]|3[01])日$'
                                }
                            ],
                            attribute: null
                        }
                    ]
                );
            } else if (ns === 'catalog/ext/test-org/setting/global') {
                res.json(
                    [
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
                                        ns: 'catalog/ext/aaa-healthcare-consortium/attribute/category/data'
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
                                use_id_connect: true,
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
                    ]
                );
            } else if (ns === 'catalog/ext/aaa-healthcare-consortium/setting/actor/pxr-root/actor_1000431') {
                res.json(
                    [
                        {
                            catalogItem: {
                                ns: 'catalog/ext/aaa-healthcare-consortium/setting/actor/pxr-root/actor_1000431',
                                name: '流通制御組織：アクター個別設定',
                                _code: {
                                    _value: 1000362,
                                    _ver: 1
                                },
                                inherit: {
                                    _value: 130,
                                    _ver: 1
                                },
                                description: '流通制御組織による流通制御組織のアクター個別設定の定義です。'
                            },
                            template: {
                                _code: {
                                    _value: 1000362,
                                    _ver: 1
                                },
                                auth: [
                                    {
                                        _value: 139,
                                        _ver: 1
                                    },
                                    {
                                        _value: 140,
                                        _ver: 1
                                    },
                                    {
                                        _value: 141,
                                        _ver: 1
                                    },
                                    {
                                        _value: 142,
                                        _ver: 1
                                    },
                                    {
                                        _value: 144,
                                        _ver: 1
                                    },
                                    {
                                        _value: 147,
                                        _ver: 1
                                    },
                                    {
                                        _value: 149,
                                        _ver: 1
                                    },
                                    {
                                        _value: 155,
                                        _ver: 1
                                    }
                                ],
                                'identification-checklist': [
                                    {
                                        _value: 30019,
                                        _ver: 1
                                    },
                                    {
                                        _value: 30020,
                                        _ver: 1
                                    },
                                    {
                                        _value: 30021,
                                        _ver: 1
                                    },
                                    {
                                        _value: 30022,
                                        _ver: 1
                                    },
                                    {
                                        _value: 30035,
                                        _ver: 1
                                    }
                                ],
                                'identification-document': [
                                    {
                                        document: {
                                            _value: 30001,
                                            _ver: 1
                                        }
                                    }
                                ],
                                'pxr-root-name': '流通制御サービスプロバイダー',
                                'store-distribution-ratio': null,
                                'supply-distribution-ratio': null
                            },
                            prop: [
                                {
                                    key: 'auth',
                                    type: {
                                        of: 'code[]',
                                        cmatrix: null,
                                        candidate: {
                                            ns: [
                                                'catalog/model/auth/*'
                                            ],
                                            _code: null,
                                            base: null
                                        }
                                    },
                                    description: '操作権の配列',
                                    isInherit: true
                                },
                                {
                                    key: 'identification-checklist',
                                    type: {
                                        of: 'code[]',
                                        cmatrix: null,
                                        candidate: {
                                            ns: [
                                                'catalog/model/person/item-type',
                                                'catalog/built_in/person/item-type',
                                                'catalog/ext/test-org/person/item-type'
                                            ],
                                            _code: null,
                                            base: null
                                        }
                                    },
                                    description: '採用した本人性確認事項',
                                    isInherit: true
                                },
                                {
                                    key: 'identification-document',
                                    type: {
                                        of: 'inner[]',
                                        inner: 'Identification-document',
                                        cmatrix: null,
                                        candidate: null
                                    },
                                    description: '採用した本人性確認書類',
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
                                    key: 'store-distribution-ratio',
                                    type: {
                                        of: 'inner[]',
                                        inner: 'DistributionRatio',
                                        cmatrix: null,
                                        candidate: null
                                    },
                                    description: '蓄積分配比率',
                                    isInherit: true
                                },
                                {
                                    key: 'supply-distribution-ratio',
                                    type: {
                                        of: 'inner[]',
                                        inner: 'DistributionRatio',
                                        cmatrix: null,
                                        candidate: null
                                    },
                                    description: '提供分配比率',
                                    isInherit: true
                                }
                            ],
                            attribute: null
                        }
                    ]
                );
            } else if (ns === 'catalog/ext/aaa-healthcare-consortium/setting/global') {
                res.json(
                    [
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
                                        ns: 'catalog/ext/aaa-healthcare-consortium/attribute/category/data'
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
                                use_id_connect: true,
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
                    ]
                );
            }
            res.end();
        };
        const _listener = (req: express.Request, res: express.Response) => {
            const code = Number(req.params.code);
            res.status(status);
            // アクター確認
            if (code === 1) {
                res.json({
                    template: {
                        ns: '/pxr-root'
                    }
                });
            } else if (code === 30007) {
                res.json({
                    catalogItem: {
                        ns: 'catalog/built_in/person/identification'
                    },
                    template: {
                        'verification-ratio': 100
                    }
                });
            } else if (code === 30009) {
                res.json({
                    catalogItem: {
                        ns: 'catalog/built_in/person/identification'
                    },
                    template: {
                        'verification-ratio': 100
                    }
                });
            } else if (code === 1000001) {
                res.json({
                    catalogItem: {
                        ns: '/pxr-root'
                    }
                });
            } else if (code === 1000020) {
                res.json({
                    catalogItem: {
                        ns: '/data-trader'
                    },
                    template: {
                        'create-book': true
                    }
                });
            } else if (code === 1000021) {
                res.json({
                    catalogItem: {
                        ns: '/data-trader'
                    }
                });
            } else if (code === 1000022) {
                res.json({
                    template: {
                        name: '/data-trader'
                    }
                });
            } else if (code === 1000002) {
                res.json({
                    catalogItem: {
                        ns: '/region-root'
                    }
                });
            }
            // 本人性確認
            if (code === 30001) {
                res.json({
                    catalogItem: {
                        ns: 'catalog/built_in/person/identification'
                    },
                    template: {
                        'verification-ratio': 100
                    }
                });
            } else if (code === 1000071) {
                res.json({
                    catalogItem: {
                        ns: '/role'
                    }
                });
            } else if (code === 1000359) {
                res.status(status).json(catalog1000359);
            } else if (code === 1000110) {
                res.status(status).json(catalog1000110);
            } else if (code === 1000117) {
                res.status(status).json(catalog1000117);
            } else if (code === 1000099) {
                res.status(status).json({
                    catalogItem: {
                        ns: 'catalog/ext/test-org/terms-of-use/region/actor_1000431',
                        name: '健康増進イベント利用規約',
                        description: '健康増進イベントの利用規約です。',
                        _code: {
                            _value: 1000394,
                            _ver: 1
                        },
                        inherit: {
                            _value: 204,
                            _ver: null
                        }
                    },
                    template: {
                        prop: null,
                        value: [
                            {
                                key: 'terms-of-use',
                                value: [
                                    {
                                        key: 'title',
                                        value: 'リージョン利用規約'
                                    },
                                    {
                                        key: 'section',
                                        value: [
                                            {
                                                key: 'title',
                                                value: '第1項'
                                            },
                                            {
                                                key: 'content',
                                                value: [
                                                    {
                                                        key: 'sentence',
                                                        value: '規約～～～。'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                key: 're-consent-flag',
                                value: true
                            },
                            {
                                key: 'period-of-re-consent',
                                value: null
                            },
                            {
                                key: 'deleting-data-flag',
                                value: true
                            },
                            {
                                key: 'returning-data-flag',
                                value: true
                            }
                        ]
                    },
                    inner: null,
                    attribute: null
                });
            }

            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this.app.get('/catalog/name', _listener3);
        this.app.get('/catalog/:code/:version', _listener);
        this.app.get('/catalog/:code', _listener);
        this.app.get('/catalog', _listener2);
        this.server = this.app.listen(3001);
    }
}

/**
 * オペレーターサービス
 */
export class OperatorService {
    app: express.Express;
    server: Server;

    constructor (status: number) {
        this.app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status);
            res.json({
                sessionId: '494a44bb97aa0ef964f6a666b9019b2d20bf05aa811919833f3e0c0ae2b09b38',
                operatorId: 1,
                type: 3,
                loginId: 'test-user',
                name: 'test-user',
                mobilePhone: '0311112222',
                auth: {
                    member: {
                        add: true,
                        update: true,
                        delete: true
                    }
                },
                lastLoginAt: '2020-01-01T00:00:00.000+0900',
                attributes: {},
                roles: [
                    {
                        _value: 1,
                        _ver: 1
                    }
                ],
                block: {
                    _value: 1000110,
                    _ver: 1
                },
                actor: {
                    _value: 1000001,
                    _ver: 1
                }
            });
            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this.app.post('/operator', _listener);
        this.app.post('/operator/session', _listener);
        this.app.post('/operator/user/info', _listener);
        this.app.delete('/operator', _listener);
        this.server = this.app.listen(3000);
    }
}

/**
 * オペレーターサービス（オペレーター追加時エラー）
 */
export class OperatorService2 {
    app: express.Express;
    server: Server;

    constructor (status: number, getStatus: number, deleteStatus: number) {
        this.app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status);
            res.json({
                sessionId: '494a44bb97aa0ef964f6a666b9019b2d20bf05aa811919833f3e0c0ae2b09b38',
                operatorId: 1,
                type: 3,
                loginId: 'test-user',
                name: 'test-user',
                mobilePhone: '0311112222',
                auth: {
                    member: {
                        add: true,
                        update: true,
                        delete: true
                    }
                },
                lastLoginAt: '2020-01-01T00:00:00.000+0900',
                attributes: {},
                roles: [
                    {
                        _value: 1,
                        _ver: 1
                    }
                ],
                block: {
                    _value: 1000110,
                    _ver: 1
                },
                actor: {
                    _value: 1000001,
                    _ver: 1
                }
            });
            res.end();
        };
        // イベントハンドラー
        const _listener2 = (req: express.Request, res: express.Response) => {
            res.status(400);
            res.end();
        };
        // イベントハンドラー
        const _listener3 = (req: express.Request, res: express.Response) => {
            if (getStatus) {
                res.status(getStatus);
                res.json({
                    sessionId: '494a44bb97aa0ef964f6a666b9019b2d20bf05aa811919833f3e0c0ae2b09b38',
                    operatorId: 1,
                    type: 3,
                    loginId: 'test-user',
                    name: 'test-user',
                    mobilePhone: '0311112222',
                    auth: {
                        member: {
                            add: true,
                            update: true,
                            delete: true
                        }
                    },
                    lastLoginAt: '2020-01-01T00:00:00.000+0900',
                    attributes: {},
                    roles: [
                        {
                            _value: 1,
                            _ver: 1
                        }
                    ],
                    block: {
                        _value: 1000110,
                        _ver: 1
                    },
                    actor: {
                        _value: 1000001,
                        _ver: 1
                    }
                });
            } else {
                throw Error('オペレーターサービスとの接続に失敗しました');
            }
            res.end();
        };
        // イベントハンドラー
        const _listener4 = (req: express.Request, res: express.Response) => {
            if (deleteStatus) {
                res.status(deleteStatus);
                res.json({
                    sessionId: '494a44bb97aa0ef964f6a666b9019b2d20bf05aa811919833f3e0c0ae2b09b38',
                    operatorId: 1,
                    type: 3,
                    loginId: 'test-user',
                    name: 'test-user',
                    mobilePhone: '0311112222',
                    auth: {
                        member: {
                            add: true,
                            update: true,
                            delete: true
                        }
                    },
                    lastLoginAt: '2020-01-01T00:00:00.000+0900',
                    attributes: {},
                    roles: [
                        {
                            _value: 1,
                            _ver: 1
                        }
                    ],
                    block: {
                        _value: 1000110,
                        _ver: 1
                    },
                    actor: {
                        _value: 1000001,
                        _ver: 1
                    }
                });
            } else {
                throw Error('オペレーターサービスとの接続に失敗しました');
            }
            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this.app.post('/operator', _listener);
        this.app.get('/operator', _listener3);
        this.app.post('/operator/user/info', _listener2);
        this.app.post('/operator/session', _listener);
        this.app.delete('/operator/:id', _listener4);
        this.server = this.app.listen(3000);
    }
}

/**
 * 本人性確認サービス
 */
export class IdentityService {
    app: express.Express;
    server: Server;

    constructor (status: number) {
        this.app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status);
            res.json({
                identifyCode: 'abcdefg',
                expireAt: '2021-01-01T00:00:00.000+0900'
            });
            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this.app.post('/identity-verificate/code/verified', _listener);
        this.server = this.app.listen(3007);
    }
}

/**
 * IDサービス
 */
export class IdService {
    app: express.Express;
    server: Server;

    constructor (status: number, message: boolean = false) {
        this.app = express();

        // イベントハンドラー
        const _listener = (req: express.Request, res: express.Response) => {
            res.status(status);
            if (message) {
                res.json([{ message: '対象のデータが存在しません。' }]);
            } else {
                res.json({
                    uid: ''
                });
            }
            res.end();
        };

        // ハンドラーのイベントリスナーを追加、アプリケーションの起動
        this.app.post('/users', _listener);
        this.server = this.app.listen(5001);
    }
}
