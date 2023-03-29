/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 * リクエストデータ
 */
export namespace TestRequest {
    /**
     * 異常（pxrIdがない）
     */
    export const MISSING_PXR_ID = JSON.stringify({
        idServiceFlg: true,
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（pxrIdが空文字）
     */
    export const EMPTY_PXR_ID = JSON.stringify({
        pxrId: '',
        idServiceFlg: true,
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（loginIdがない）
     */
    export const MISSING_LOGIN_ID = JSON.stringify({
        idServiceFlg: false,
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（loginIdが空文字）
     */
    export const EMPTY_LOGIN_ID = JSON.stringify({
        loginId: '',
        idServiceFlg: false,
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identificationがない）
     */
    export const MISSING_IDENT = JSON.stringify({
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identificationが空文字）
     */
    export const EMPTY_IDENT = JSON.stringify({
        identification: [],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identificationのみで空文字）
     */
    export const EMPTY_IDENT_ONLY = JSON.stringify({
        identification: []
    });
    /**
     * 異常（identificationがnull）
     */
    export const NULL_IDENT = JSON.stringify({
        identification: null,
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identificationのみでnull）
     */
    export const NULL_IDENT_ALL = JSON.stringify({
        identification: null
    });
    /**
     * 異常（identificationがArray型じゃない）
     */
    export const NOT_ARRAY_IDENT = JSON.stringify({
        identification: {
            _code: {
                _value: 30001,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年月日',
                    item: [
                        {
                            title: '生年月日',
                            type: {
                                _value: 30022,
                                _ver: 1
                            },
                            content: '2000-01-01'
                        }
                    ]
                }
            ]
        },
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identificationのみでArray型じゃない）
     */
    export const NOT_ARRAY_IDENT_ONLY = JSON.stringify({
        identification: {
            _code: {
                _value: 30001,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年月日',
                    item: [
                        {
                            title: '生年月日',
                            type: {
                                _value: 30022,
                                _ver: 1
                            },
                            content: '2000-01-01'
                        }
                    ]
                }
            ]
        }
    });
    /**
     * 異常（identification、_codeがない）
     */
    export const MISSING_IDENT_CODE = JSON.stringify({
        identification: [
            {
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identificationのみ、_codeがない）
     */
    export const MISSING_TEMP_CODE_ONLY = JSON.stringify({
        identification: [
            {
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ]
    });
    /**
     * 異常（identification、_codeが空文字）
     */
    export const EMPTY_IDENT_CODE = JSON.stringify({
        identification: [
            {
                _code: '',
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identificationのみ、_codeが空文字）
     */
    export const EMPTY_TEMP_CODE_ONLY = JSON.stringify({
        identification: [
            {
                _code: '',
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ]
    });
    /**
     * 異常（identification、_code._valueがない）
     */
    export const MISSING_IDENT_VALUE = JSON.stringify({
        identification: [
            {
                _code: {
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identificationのみ、_code._valueがない）
     */
    export const MISSING_TEMP_VALUE_ONLY = JSON.stringify({
        identification: [
            {
                _code: {
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ]
    });
    /**
     * 異常（identification、_code._valueが空）
     */
    export const EMPTY_IDENT_VALUE = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: '',
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identificationのみ、_code._valueが空）
     */
    export const EMPTY_TEMP_VALUE_ONLY = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: '',
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ]
    });
    /**
     * 異常（identification、_code._valueがnull）
     */
    export const NULL_IDENT_VALUE = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: null,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identification、_code._valueが数字以外）
     */
    export const NOT_NUMBER_IDENT_VALUE = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 'a',
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identificationのみ、_code._valueが数字以外）
     */
    export const NOT_NUMBER_TEMP_VALUE_ONLY = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 'a',
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ]
    });
    /**
     * 異常（identification、_code._valueが数字以外）
     */
    export const FALSE_NUMBER_IDENT_VALUE = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: false,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identificationのみ、_code._valueが数字以外）
     */
    export const FALSE_NUMBER_TEMP_VALUE_ONLY = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: false,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ]
    });
    /**
     * 異常（identification、_code._verがない）
     */
    export const MISSING_IDENT_VER = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identificationのみ、_code._verがない）
     */
    export const MISSING_TEMP_VER_ONLY = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ]
    });
    /**
     * 異常（identification、_code._verが空）
     */
    export const EMPTY_IDENT_VER = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: ''
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identificationのみ、_code._verが空）
     */
    export const EMPTY_TEMP_VER_ONLY = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: ''
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ]
    });
    /**
     * 異常（identification、_code._verがnull）
     */
    export const NULL_IDENT_VER = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: null
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identificationのみ、_code._verがnull）
     */
    export const NULL_TEMP_VER_ONLY = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: null
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ]
    });
    /**
     * 異常（identification、_code._verが数字以外）
     */
    export const NOT_NUMBER_IDENT_VER = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 'a'
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identificationのみ、_code._verが数字以外）
     */
    export const NOT_NUMBER_TEMP_VER_ONLY = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 'a'
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ]
    });
    /**
     * 異常（identification、item-groupがない）
     */
    export const MISSING_IDENT_ITEM_GROUP = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 1
                }
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identificationのみ、item-groupがない）
     */
    export const MISSING_TEMP_ITEM_GROUP_ONLY = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 1
                }
            }
        ]
    });
    /**
     * 異常（identification、item-groupがnull）
     */
    export const NULL_IDENT_ITEM_GROUP = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 1
                },
                'item-group': null
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identificationのみ、item-groupがnull）
     */
    export const NULL_TEMP_ITEM_GROUP_ONLY = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 1
                },
                'item-group': null
            }
        ]
    });
    /**
     * 異常（identification、item-groupが空）
     */
    export const EMPTY_IDENT_ITEM_GROUP = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 1
                },
                'item-group': []
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identificationのみ、item-groupが空）
     */
    export const EMPTY_TEMP_ITEM_GROUP_ONLY = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 1
                },
                'item-group': []
            }
        ]
    });
    /**
     * 異常（identification、item-groupがArray型じゃない）
     */
    export const NOT_ARRAY_IDENT_ITEM_GROUP = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 1
                },
                'item-group': {
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
                }
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identificationのみ、item-groupがArray型じゃない）
     */
    export const NOT_ARRAY_TEMP_ITEM_GROUP_ONLY = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 1
                },
                'item-group': {
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
                }
            }
        ]
    });
    /**
     * 異常（identification、item-group.titleがない）
     */
    export const MISSING_IDENT_ITEM_GROUP_TITLE = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 1
                },
                'item-group': [
                    {
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identificationのみ、item-group.titleがない）
     */
    export const MISSING_ITEM_GROUP_TITLE_ONLY = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 1
                },
                'item-group': [
                    {
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ]
    });
    /**
     * 異常（identification、item-group.titleが空文字）
     */
    export const EMPTY_IDENT_ITEM_GROUP_TITLE = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 1
                },
                'item-group': [
                    {
                        title: '',
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identificationのみ、item-group.titleが空文字）
     */
    export const EMPTY_ITEM_GROUP_TITLE_ONLY = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 1
                },
                'item-group': [
                    {
                        title: '',
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ]
    });
    /**
     * 異常（identification、item-group.itemがない）
     */
    export const MISSING_IDENT_ITEM_GROUP_ITEM = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 1
                },
                'item-group': [
                    {
                        title: '氏名'
                    },
                    {
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identificationのみ、item-group.itemがない）
     */
    export const MISSING_ITEM_GROUP_ITEM_ONLY = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 1
                },
                'item-group': [
                    {
                        title: '氏名'
                    },
                    {
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ]
    });
    /**
     * 異常（identification、item-group.itemがnull）
     */
    export const NULL_IDENT_ITEM_GROUP_ITEM = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 1
                },
                'item-group': [
                    {
                        title: '氏名',
                        item: null
                    },
                    {
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identificationのみ、item-group.itemがnull）
     */
    export const NULL_ITEM_GROUP_ITEM_ONLY = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 1
                },
                'item-group': [
                    {
                        title: '氏名',
                        item: null
                    },
                    {
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ]
    });
    /**
     * 異常（identification、item-group.itemが空）
     */
    export const EMPTY_IDENT_ITEM_GROUP_ITEM = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 1
                },
                'item-group': [
                    {
                        title: '氏名',
                        item: []
                    },
                    {
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identificationのみ、item-group.itemが空）
     */
    export const EMPTY_ITEM_GROUP_ITEM_ONLY = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 1
                },
                'item-group': [
                    {
                        title: '氏名',
                        item: []
                    },
                    {
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ]
    });
    /**
     * 異常（identification、item-group.itemが配列以外）
     */
    export const NOT_ARRAY_IDENT_ITEM_GROUP_ITEM = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 1
                },
                'item-group': [
                    {
                        title: '氏名',
                        item: {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    },
                    {
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identificationのみ、item-group.itemが配列以外）
     */
    export const NOT_ARRAY_ITEM_GROUP_ITEM_ONLY = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 1
                },
                'item-group': [
                    {
                        title: '氏名',
                        item: {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    },
                    {
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ]
    });
    /**
     * 異常（identification、item-group.item.titleがない）
     */
    export const MISSING_IDENT_ITEM_TITLE = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 1
                },
                'item-group': [
                    {
                        title: '氏名',
                        item: [
                            {
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identificationのみ、item-group.item.titleがない）
     */
    export const MISSING_ITEM_TITLE_ONLY = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 1
                },
                'item-group': [
                    {
                        title: '氏名',
                        item: [
                            {
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ]
    });
    /**
     * 異常（identification、item-group.item.titleが空文字）
     */
    export const EMPTY_IDENT_ITEM_TITLE = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 1
                },
                'item-group': [
                    {
                        title: '氏名',
                        item: [
                            {
                                title: '',
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identificationのみ、item-group.item.titleが空文字）
     */
    export const EMPTY_ITEM_TITLE_ONLY = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 1
                },
                'item-group': [
                    {
                        title: '氏名',
                        item: [
                            {
                                title: '',
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ]
    });
    /**
     * 異常（identification、item-group.item.typeがない）
     */
    export const MISSING_IDENT_ITEM_TYPE = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 1
                },
                'item-group': [
                    {
                        title: '氏名',
                        item: [
                            {
                                title: '姓',
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identificationのみ、item-group.item.typeがない）
     */
    export const MISSING_ITEM_TYPE_ONLY = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 1
                },
                'item-group': [
                    {
                        title: '氏名',
                        item: [
                            {
                                title: '姓',
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ]
    });
    /**
     * 異常（identification、item-group.item.typeがnull）
     */
    export const NULL_IDENT_ITEM_TYPE = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 1
                },
                'item-group': [
                    {
                        title: '氏名',
                        item: [
                            {
                                title: '姓',
                                type: null,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identificationのみ、item-group.item.typeがnull）
     */
    export const NULL_ITEM_TYPE_ONLY = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 1
                },
                'item-group': [
                    {
                        title: '氏名',
                        item: [
                            {
                                title: '姓',
                                type: null,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ]
    });
    /**
     * 異常（identification、item-group.item.typeが空文字）
     */
    export const EMPTY_IDENT_ITEM_TYPE = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 1
                },
                'item-group': [
                    {
                        title: '氏名',
                        item: [
                            {
                                title: '姓',
                                type: '',
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identificationのみ、item-group.item.typeが空文字）
     */
    export const EMPTY_ITEM_TYPE_ONLY = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 1
                },
                'item-group': [
                    {
                        title: '氏名',
                        item: [
                            {
                                title: '姓',
                                type: '',
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ]
    });
    /**
     * 異常（identification、item-group.item.type._valueがない）
     */
    export const MISSING_IDENT_ITEM_TYPE_VALUE = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 1
                },
                'item-group': [
                    {
                        title: '氏名',
                        item: [
                            {
                                title: '姓',
                                type: {
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identificationのみ、item-group.item.type._valueがない）
     */
    export const MISSING_ITEM_TYPE_VALUE_ONLY = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 1
                },
                'item-group': [
                    {
                        title: '氏名',
                        item: [
                            {
                                title: '姓',
                                type: {
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ]
    });
    /**
     * 異常（identification、item-group.item.type._valueがnull）
     */
    export const NULL_IDENT_ITEM_TYPE_VALUE = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 1
                },
                'item-group': [
                    {
                        title: '氏名',
                        item: [
                            {
                                title: '姓',
                                type: {
                                    _value: null,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identificationのみ、item-group.item.type._valueがnull）
     */
    export const NULL_ITEM_TYPE_VALUE_ONLY = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 1
                },
                'item-group': [
                    {
                        title: '氏名',
                        item: [
                            {
                                title: '姓',
                                type: {
                                    _value: null,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ]
    });
    /**
     * 異常（identification、item-group.item.type._valueが空文字）
     */
    export const EMPTY_IDENT_ITEM_TYPE_VALUE = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 1
                },
                'item-group': [
                    {
                        title: '氏名',
                        item: [
                            {
                                title: '姓',
                                type: {
                                    _value: '',
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identificationのみ、item-group.item.type._valueが空文字）
     */
    export const EMPTY_ITEM_TYPE_VALUE_ONLY = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 1
                },
                'item-group': [
                    {
                        title: '氏名',
                        item: [
                            {
                                title: '姓',
                                type: {
                                    _value: '',
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ]
    });
    /**
     * 異常（identification、item-group.item.type._valueが数値以外）
     */
    export const NOT_NUMBER_IDENT_ITEM_TYPE_VALUE = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 1
                },
                'item-group': [
                    {
                        title: '氏名',
                        item: [
                            {
                                title: '姓',
                                type: {
                                    _value: 'a',
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identificationのみ、item-group.item.type._valueが数値以外）
     */
    export const NOT_NUMBER_ITEM_TYPE_VALUE_ONLY = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 1
                },
                'item-group': [
                    {
                        title: '氏名',
                        item: [
                            {
                                title: '姓',
                                type: {
                                    _value: 'a',
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ]
    });
    /**
     * 異常（identification、item-group.item.type._verがない）
     */
    export const MISSING_IDENT_ITEM_TYPE_VER = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 1
                },
                'item-group': [
                    {
                        title: '氏名',
                        item: [
                            {
                                title: '姓',
                                type: {
                                    _value: 30019
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identificationのみ、item-group.item.type._verがない）
     */
    export const MISSING_ITEM_TYPE_VER_ONLY = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
                    _ver: 1
                },
                'item-group': [
                    {
                        title: '氏名',
                        item: [
                            {
                                title: '姓',
                                type: {
                                    _value: 30019
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ]
    });
    /**
     * 異常（identification、item-group.item.type._verがnull）
     */
    export const NULL_IDENT_ITEM_TYPE_VER = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                                    _ver: null
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identificationのみ、item-group.item.type._verがnull）
     */
    export const NULL_ITEM_TYPE_VER_ONLY = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                                    _ver: null
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ]
    });
    /**
     * 異常（identification、item-group.item.type._verが空文字）
     */
    export const EMPTY_IDENT_ITEM_TYPE_VER = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                                    _ver: ''
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identificationのみ、item-group.item.type._verが空文字）
     */
    export const EMPTY_ITEM_TYPE_VER_ONLY = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                                    _ver: ''
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ]
    });
    /**
     * 異常（identification、item-group.item.type._verが数値以外）
     */
    export const NOT_NUMBER_IDENT_ITEM_TYPE_VER = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                                    _ver: 'a'
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identificationのみ、item-group.item.type._verが数値以外）
     */
    export const NOT_NUMBER_ITEM_TYPE_VER_ONLY = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                                    _ver: 'a'
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ]
    });
    /**
     * 異常（identification、item-group.item.contentがない）
     */
    export const MISSING_ITEM_CONTENT = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                                }
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identificationのみ、item-group.item.contentがない）
     */
    export const MISSING_ITEM_CONTENT_ONLY = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                                }
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ]
    });
    /**
     * 異常（identification、item-group.item.contentが空文字）
     */
    export const EMPTY_ITEM_CONTENT = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                                content: ''
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identificationのみ、item-group.item.contentが空文字）
     */
    export const EMPTY_ITEM_CONTENT_ONLY = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                                content: ''
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ]
    });
    /**
     * 異常（userInformationがない）
     */
    export const MISSING_USER_INFO = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（userInformationが空文字）
     */
    export const EMPTY_USER_INFO = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: '',
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（userInformationがnull）
     */
    export const NULL_USER_INFO = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: null,
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（userInformation、_codeがない）
     */
    export const MISSING_USER_INFO_CODE = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（userInformation、_codeが空文字）
     */
    export const EMPTY_USER_INFO_CODE = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: '',
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（userInformation、_code._valueがない）
     */
    export const MISSING_USER_INFO_VALUE = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（userInformation、_code._valueが空）
     */
    export const EMPTY_USER_INFO_VALUE = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: '',
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（userInformation、_code._valueがnull）
     */
    export const NULL_USER_INFO_VALUE = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: null,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（userInformation、_code._valueが数字以外）
     */
    export const NOT_NUMBER_USER_INFO_VALUE = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 'a',
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（userInformation、_code._valueが数字以外）
     */
    export const FALSE_NUMBER_USER_INFO_VALUE = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: false,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（userInformation、_code._verがない）
     */
    export const MISSING_USER_INFO_VER = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（userInformation、_code._verが空）
     */
    export const EMPTY_USER_INFO_VER = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
                _ver: ''
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（userInformation、_code._verがnull）
     */
    export const NULL_USER_INFO_VER = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
                _ver: null
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（userInformation、_code._verが数字以外）
     */
    export const NOT_NUMBER_USER_INFO_VER = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
                _ver: 'a'
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（userInformation、item-groupがない）
     */
    export const MISSING_USER_INFO_ITEM_GROUP = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
                _ver: 1
            }
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（userInformation、item-groupがnull）
     */
    export const NULL_USER_INFO_ITEM_GROUP = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
                _ver: 1
            },
            'item-group': null
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（userInformation、item-groupが空）
     */
    export const EMPTY_USER_INFO_ITEM_GROUP = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
                _ver: 1
            },
            'item-group': []
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（userInformation、item-groupがArray型じゃない）
     */
    export const NOT_ARRAY_USER_INFO_ITEM_GROUP = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
                _ver: 1
            },
            'item-group': {
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
            }
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（userInformation、item-group.titleがない）
     */
    export const MISSING_USER_INFO_ITEM_GROUP_TITLE = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
                _ver: 1
            },
            'item-group': [
                {
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（userInformation、item-group.titleが空文字）
     */
    export const EMPTY_USER_INFO_ITEM_GROUP_TITLE = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
                _ver: 1
            },
            'item-group': [
                {
                    title: '',
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（userInformation、item-group.itemがない）
     */
    export const MISSING_USER_INFO_ITEM_GROUP_ITEM = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
                _ver: 1
            },
            'item-group': [
                {
                    title: '氏名'
                },
                {
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（userInformation、item-group.itemが空）
     */
    export const NULL_USER_INFO_ITEM_GROUP_ITEM = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
                _ver: 1
            },
            'item-group': [
                {
                    title: '氏名',
                    item: null
                },
                {
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（userInformation、item-group.itemが空）
     */
    export const EMPTY_USER_INFO_ITEM_GROUP_ITEM = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
                _ver: 1
            },
            'item-group': [
                {
                    title: '氏名',
                    item: []
                },
                {
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（userInformation、item-group.itemが空）
     */
    export const NOT_ARRAY_USER_INFO_ITEM_GROUP_ITEM = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
                _ver: 1
            },
            'item-group': [
                {
                    title: '氏名',
                    item: {
                        title: '姓',
                        type: {
                            _value: 30019,
                            _ver: 1
                        },
                        content: 'サンプル'
                    }
                },
                {
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（userInformation、item-group.item.titleがない）
     */
    export const MISSING_USER_INFO_ITEM_TITLE = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
                _ver: 1
            },
            'item-group': [
                {
                    title: '氏名',
                    item: [
                        {
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（userInformation、item-group.item.titleが空文字）
     */
    export const EMPTY_USER_INFO_ITEM_TITLE = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
                _ver: 1
            },
            'item-group': [
                {
                    title: '氏名',
                    item: [
                        {
                            title: '',
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（identification、item-group.item.typeがない）
     */
    export const MISSING_USER_INFO_ITEM_TYPE = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
                _ver: 1
            },
            'item-group': [
                {
                    title: '氏名',
                    item: [
                        {
                            title: '姓',
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（userInformation、item-group.item.typeがnull）
     */
    export const NULL_USER_INFO_ITEM_TYPE = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
                _ver: 1
            },
            'item-group': [
                {
                    title: '氏名',
                    item: [
                        {
                            title: '姓',
                            type: null,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（userInformation、item-group.item.typeが空文字）
     */
    export const EMPTY_USER_INFO_ITEM_TYPE = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
                _ver: 1
            },
            'item-group': [
                {
                    title: '氏名',
                    item: [
                        {
                            title: '姓',
                            type: '',
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（userInformation、item-group.item.type._valueがない）
     */
    export const MISSING_USER_INFO_ITEM_TYPE_VALUE = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
                _ver: 1
            },
            'item-group': [
                {
                    title: '氏名',
                    item: [
                        {
                            title: '姓',
                            type: {
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（userInformation、item-group.item.type._valueがnull）
     */
    export const NULL_USER_INFO_ITEM_TYPE_VALUE = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
                _ver: 1
            },
            'item-group': [
                {
                    title: '氏名',
                    item: [
                        {
                            title: '姓',
                            type: {
                                _value: null,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（userInformation、item-group.item.type._valueが空文字）
     */
    export const EMPTY_USER_INFO_ITEM_TYPE_VALUE = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
                _ver: 1
            },
            'item-group': [
                {
                    title: '氏名',
                    item: [
                        {
                            title: '姓',
                            type: {
                                _value: '',
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（userInformation、item-group.item.type._valueが数字以外）
     */
    export const NOT_NUMBER_USER_INFO_ITEM_TYPE_VALUE = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
                _ver: 1
            },
            'item-group': [
                {
                    title: '氏名',
                    item: [
                        {
                            title: '姓',
                            type: {
                                _value: 'a',
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（userInformation、item-group.item.type._verがない）
     */
    export const MISSING_USER_INFO_ITEM_TYPE_VER = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
                _ver: 1
            },
            'item-group': [
                {
                    title: '氏名',
                    item: [
                        {
                            title: '姓',
                            type: {
                                _value: 30019
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（userInformation、item-group.item.type._verがnull）
     */
    export const NULL_USER_INFO_ITEM_TYPE_VER = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                                _ver: null
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（userInformation、item-group.item.type._verが空文字）
     */
    export const EMPTY_USER_INFO_ITEM_TYPE_VER = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                                _ver: ''
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（userInformation、item-group.item.type._verが数値以外）
     */
    export const NOT_NUMBER_USER_INFO_ITEM_TYPE_VER = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                                _ver: 'a'
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（userInformation、item-group.item.contentがない）
     */
    export const MISSING_USER_INFO_ITEM_CONTENT = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                            }
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（userInformation、item-group.item.contentが空文字）
     */
    export const EMPTY_USER_INFO_ITEM_CONTENT = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                            content: ''
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（platform_terms_of_useがない）
     */
    export const MISSING_PLATFORM = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        }
    });
    /**
     * 異常（platform_terms_of_useが空）
     */
    export const EMPTY_PLATFORM = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: ''
    });
    /**
     * 異常（platform_terms_of_useがnull）
     */
    export const NULL_PLATFORM = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: null
    });
    /**
     * 異常（platform_terms_of_use._valueがない）
     */
    export const MISSING_PLATFORM_VALUE = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _ver: 1
        }
    });
    /**
     * 異常（platform_terms_of_use._valueが空）
     */
    export const EMPTY_PLATFORM_VALUE = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: '',
            _ver: 1
        }
    });
    /**
     * 異常（platform_terms_of_use._valueがnull）
     */
    export const NULL_PLATFORM_VALUE = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: null,
            _ver: 1
        }
    });
    /**
     * 異常（platform_terms_of_use._valueが数値以外）
     */
    export const NOT_NUMBER_PLATFORM_VALUE = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 'a',
            _ver: 1
        }
    });
    /**
     * 異常（platform_terms_of_use._verがない）
     */
    export const MISSING_PLATFORM_VER = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 9999999
        }
    });
    /**
     * 異常（platform_terms_of_use._verが空）
     */
    export const EMPTY_PLATFORM_VER = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 9999999,
            _ver: ''
        }
    });
    /**
     * 異常（platform_terms_of_use._verがnull）
     */
    export const NULL_PLATFORM_VER = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 9999999,
            _ver: null
        }
    });
    /**
     * 異常（platform_terms_of_use._verが数値以外）
     */
    export const NOT_NUMBER_PLATFORM_VER = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                    title: '性別',
                    item: [
                        {
                            title: '性別',
                            type: {
                                _value: 30021,
                                _ver: 1
                            },
                            content: '男'
                        }
                    ]
                },
                {
                    title: '生年（西暦）',
                    item: [
                        {
                            title: '生年（西暦）',
                            type: {
                                _value: 1000372,
                                _ver: 1
                            },
                            content: 2000
                        }
                    ]
                },
                {
                    title: '住所（行政区）',
                    item: [
                        {
                            title: '住所（行政区）',
                            type: {
                                _value: 1000371,
                                _ver: 1
                            },
                            content: '東京都港区'
                        }
                    ]
                },
                {
                    title: '連絡先電話番号',
                    item: [
                        {
                            title: '連絡先電話番号',
                            type: {
                                _value: 30036,
                                _ver: 1
                            },
                            content: '080-0000-0000',
                            'changable-flag': true
                        }
                    ]
                }
            ]
        },
        platform_terms_of_use: {
            _value: 9999999,
            _ver: 'a'
        }
    });

    /**
     * 正常（PXR-ID:58di2dfse2.test.org）
     */
    export const SUCCESS01 = JSON.stringify({
        pxrId: '58di2dfse2.test.org',
        idServiceFlg: true,
        attributes: {},
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '氏名',
                        item: [
                            {
                                title: '姓名',
                                type: {
                                    _value: 30037,
                                    _ver: 1
                                },
                                content: 'サンプル太郎'
                            }
                        ]
                    },
                    {
                        title: '生年月日（和暦）',
                        item: [
                            {
                                title: '生年月日（和暦）',
                                type: {
                                    _value: 30038,
                                    _ver: 1
                                },
                                content: '2000年1月1日'
                            }
                        ]
                    },
                    {
                        title: '住所',
                        item: [
                            {
                                title: '住所',
                                type: {
                                    _value: 30035,
                                    _ver: 1
                                },
                                content: '東京都XXXX市'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 正常（PXR-ID:11di2dfse2.test.org）
     */
    export const SUCCESS02 = JSON.stringify({
        pxrId: '11di2dfse2.test.org',
        attributes: {
        },
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '氏名',
                        item: [
                            {
                                title: '姓名',
                                type: {
                                    _value: 30037,
                                    _ver: 1
                                },
                                content: 'サンプル太郎'
                            }
                        ]
                    },
                    {
                        title: '生年月日（和暦）',
                        item: [
                            {
                                title: '生年月日（和暦）',
                                type: {
                                    _value: 30038,
                                    _ver: 1
                                },
                                content: '2000年1月1日'
                            }
                        ]
                    },
                    {
                        title: '住所',
                        item: [
                            {
                                title: '住所',
                                type: {
                                    _value: 30035,
                                    _ver: 1
                                },
                                content: '東京都XXXX市'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 正常（PXR-ID:333i2dfse2.test.org）
     */
    export const SUCCESS03 = JSON.stringify({
        pxrId: '333i2dfse2.test.org',
        idServiceFlg: true,
        attributes: {
        },
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '氏名',
                        item: [
                            {
                                title: '姓名',
                                type: {
                                    _value: 30037,
                                    _ver: 1
                                },
                                content: 'サンプル太郎'
                            }
                        ]
                    },
                    {
                        title: '生年月日（和暦）',
                        item: [
                            {
                                title: '生年月日（和暦）',
                                type: {
                                    _value: 30038,
                                    _ver: 1
                                },
                                content: '2000年1月1日'
                            }
                        ]
                    },
                    {
                        title: '住所',
                        item: [
                            {
                                title: '住所',
                                type: {
                                    _value: 30035,
                                    _ver: 1
                                },
                                content: '東京都XXXX市'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 正常（PXR-ID:444i2dfse2.test.org）
     */
    export const SUCCESS04 = JSON.stringify({
        pxrId: '444i2dfse2.test.org',
        idServiceFlg: true,
        attributes: {
        },
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '氏名',
                        item: [
                            {
                                title: '姓名',
                                type: {
                                    _value: 30037,
                                    _ver: 1
                                },
                                content: 'サンプル太郎'
                            }
                        ]
                    },
                    {
                        title: '生年月日（和暦）',
                        item: [
                            {
                                title: '生年月日（和暦）',
                                type: {
                                    _value: 30038,
                                    _ver: 1
                                },
                                content: '2000年1月1日'
                            }
                        ]
                    },
                    {
                        title: '住所',
                        item: [
                            {
                                title: '住所',
                                type: {
                                    _value: 30035,
                                    _ver: 1
                                },
                                content: '東京都XXXX市'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 正常（LoginId:555i2dfse2.test.org）
     */
    export const SUCCESS05 = JSON.stringify({
        loginId: '555i2dfse2.test.org',
        idServiceFlg: false,
        attributes: {
        },
        identification: [
            {
                _code: {
                    _value: 30007,
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
                        title: '氏名',
                        item: [
                            {
                                title: '姓名',
                                type: {
                                    _value: 30037,
                                    _ver: 1
                                },
                                content: 'サンプル太郎'
                            }
                        ]
                    },
                    {
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日（和暦）',
                        item: [
                            {
                                title: '生年月日（和暦）',
                                type: {
                                    _value: 30038,
                                    _ver: 1
                                },
                                content: '2000年1月1日'
                            }
                        ]
                    },
                    {
                        title: '住所',
                        item: [
                            {
                                title: '住所',
                                type: {
                                    _value: 30035,
                                    _ver: 1
                                },
                                content: '東京都XXXX市'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 正常（LoginId:666i2dfse2.test.org）
     */
    export const SUCCESS06 = JSON.stringify({
        loginId: '666i2dfse2.test.org',
        idServiceFlg: false,
        attributes: {
        },
        identification: [
            {
                _code: {
                    _value: 30009,
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
                        title: '氏名',
                        item: [
                            {
                                title: '姓名',
                                type: {
                                    _value: 30037,
                                    _ver: 1
                                },
                                content: 'サンプル太郎'
                            }
                        ]
                    },
                    {
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日（西暦）',
                        item: [
                            {
                                title: '生年月日（西暦）',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000年1月1日'
                            }
                        ]
                    },
                    {
                        title: '住所',
                        item: [
                            {
                                title: '住所',
                                type: {
                                    _value: 30035,
                                    _ver: 1
                                },
                                content: '東京都XXXXX'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（本人性確認書類の種別不正）
     */
    export const SUCCESS07 = JSON.stringify({
        loginId: '666i2dfse2.test.org',
        idServiceFlg: false,
        attributes: {
        },
        identification: [
            {
                _code: {
                    _value: 30010,
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
                        title: '氏名',
                        item: [
                            {
                                title: '姓名',
                                type: {
                                    _value: 30037,
                                    _ver: 1
                                },
                                content: 'サンプル太郎'
                            }
                        ]
                    },
                    {
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日（西暦）',
                        item: [
                            {
                                title: '生年月日（西暦）',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000年1月1日'
                            }
                        ]
                    },
                    {
                        title: '住所',
                        item: [
                            {
                                title: '住所',
                                type: {
                                    _value: 30035,
                                    _ver: 1
                                },
                                content: '東京都XXXXX'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 正常（本人性確認書類重複チェック）
     */
    export const SUCCESS81 = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ]
    });
    /**
     * 正常（本人性確認書類重複チェック）
     */
    export const SUCCESS82 = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                                content: '花子'
                            }
                        ]
                    },
                    {
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '女'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ]
    });
    /**
     * 正常（本人性確認書類重複チェック）
     */
    export const SUCCESS83 = JSON.stringify({
        identification: [
            {
                _code: {
                    _value: 30001,
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
                                content: 1
                            },
                            {
                                title: '名',
                                type: {
                                    _value: 30020,
                                    _ver: 1
                                },
                                content: true
                            },
                            {
                                title: '名2',
                                type: {
                                    _value: 30020,
                                    _ver: 1
                                },
                                content: ''
                            }
                        ]
                    },
                    {
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: null
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    });
    /**
     * 異常（利用者情報の電話番号がない）
     */
    export const MISSING_PHONE_NUMBER = JSON.stringify({
        pxrId: '58di2dfse2.test.org',
        idServiceFlg: true,
        attributes: {},
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（利用者情報の電話番号がnull）
     */
    export const NULL_PHONE_NUMBER = JSON.stringify({
        pxrId: '58di2dfse2.test.org',
        idServiceFlg: true,
        attributes: {},
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                            content: null
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
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（利用者情報の電話番号が文字列以外）
     */
    export const NOT_STRING_PHONE_NUMBER = JSON.stringify({
        pxrId: '58di2dfse2.test.org',
        idServiceFlg: true,
        attributes: {},
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
                            content: 12345678900
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
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（本人性確認のカタログコードじゃない）
     */
    export const CODE_NOT_IDENT = JSON.stringify({
        pxrId: '22di2dfse2.test.org',
        attributes: {
        },
        identification: [
            {
                _code: {
                    _value: 1000071,
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
                                content: '山田'
                            },
                            {
                                title: '名',
                                type: {
                                    _value: 30020,
                                    _ver: 1
                                },
                                content: '次郎'
                            }
                        ]
                    },
                    {
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '女'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（本人性確認のカタログにcatalogItemがない）
     */
    export const CODE_MISSING_CATALOG_ITEM = JSON.stringify({
        pxrId: '22di2dfse2.test.org',
        attributes: {
            key: 'value'
        },
        identification: [
            {
                _code: {
                    _value: 30003,
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
                                content: '山田'
                            },
                            {
                                title: '名',
                                type: {
                                    _value: 30020,
                                    _ver: 1
                                },
                                content: '次郎'
                            }
                        ]
                    },
                    {
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '女'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ]
    });
    /**
     * 異常（本人性検証率が100以下）
     */
    export const CODE_NOT_RATIO_100 = JSON.stringify({
        pxrId: '22di2dfse2.test.org',
        idServiceFlg: true,
        attributes: {},
        identification: [
            {
                _code: {
                    _value: 30002,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（本人性確認のカタログにverification-ratioが存在しない）
     */
    export const CODE_MISSING_RATIO = JSON.stringify({
        pxrId: '22di2dfse2.test.org',
        idServiceFlg: true,
        attributes: {},
        identification: [
            {
                _code: {
                    _value: 30004,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（既に本人性確認事項が存在する）
     */
    export const IDENT_EXISTS = JSON.stringify({
        pxrId: '22di2dfse2.test.org',
        attributes: {
            key: 'value'
        },
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ]
    });

    /**
     * 正常（acterカタログがdata-trader）
     */
    export const DataTraderReq = JSON.stringify({
        pxrId: '58di2dfse2.test.org',
        attributes: {},
        userId: '123456789',
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });

    /**
     * 正常（IDサービスを使用（idServiceFlg：true））
     */
    export const IDSERVICE_FLG_TRUE = JSON.stringify({
        pxrId: '58di2dfse2.test.org',
        idServiceFlg: true,
        attributes: {},
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '性別',
                        item: [
                            {
                                title: '性別',
                                type: {
                                    _value: 30021,
                                    _ver: 1
                                },
                                content: '男'
                            }
                        ]
                    },
                    {
                        title: '生年月日',
                        item: [
                            {
                                title: '生年月日',
                                type: {
                                    _value: 30022,
                                    _ver: 1
                                },
                                content: '2000-01-01'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });

    /**
     * 正常（IDサービスを使用（idServiceFlg：false））
     */
    export const IDSERVICE_FLG_FALSE = JSON.stringify({
        loginId: '58di2dfse2.test.org',
        idServiceFlg: false,
        attributes: {},
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '氏名',
                        item: [
                            {
                                title: '姓名',
                                type: {
                                    _value: 30037,
                                    _ver: 1
                                },
                                content: 'サンプル太郎'
                            }
                        ]
                    },
                    {
                        title: '生年月日（和暦）',
                        item: [
                            {
                                title: '生年月日（和暦）',
                                type: {
                                    _value: 30038,
                                    _ver: 1
                                },
                                content: '2000年1月1日'
                            }
                        ]
                    },
                    {
                        title: '住所',
                        item: [
                            {
                                title: '住所',
                                type: {
                                    _value: 30035,
                                    _ver: 1
                                },
                                content: '東京都XXXX市'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 1
        }
    });
    /**
     * 異常（PF利用規約カタログなし）
     */
    export const NOT_EXIST_PLATFORM_TOU = JSON.stringify({
        pxrId: '58di2dfse2.test.org',
        idServiceFlg: true,
        attributes: {},
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '氏名',
                        item: [
                            {
                                title: '姓名',
                                type: {
                                    _value: 30037,
                                    _ver: 1
                                },
                                content: 'サンプル太郎'
                            }
                        ]
                    },
                    {
                        title: '生年月日（和暦）',
                        item: [
                            {
                                title: '生年月日（和暦）',
                                type: {
                                    _value: 30038,
                                    _ver: 1
                                },
                                content: '2000年1月1日'
                            }
                        ]
                    },
                    {
                        title: '住所',
                        item: [
                            {
                                title: '住所',
                                type: {
                                    _value: 30035,
                                    _ver: 1
                                },
                                content: '東京都XXXX市'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
        },
        platform_terms_of_use: {
            _value: 1000999,
            _ver: 1
        }
    });
    /**
     * 異常（最新のPF利用規約に同意していない）
     */
    export const NOT_AGREEMENT_PLATFORM_TOU = JSON.stringify({
        pxrId: '58di2dfse2.test.org',
        idServiceFlg: true,
        attributes: {},
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '氏名',
                        item: [
                            {
                                title: '姓名',
                                type: {
                                    _value: 30037,
                                    _ver: 1
                                },
                                content: 'サンプル太郎'
                            }
                        ]
                    },
                    {
                        title: '生年月日（和暦）',
                        item: [
                            {
                                title: '生年月日（和暦）',
                                type: {
                                    _value: 30038,
                                    _ver: 1
                                },
                                content: '2000年1月1日'
                            }
                        ]
                    },
                    {
                        title: '住所',
                        item: [
                            {
                                title: '住所',
                                type: {
                                    _value: 30035,
                                    _ver: 1
                                },
                                content: '東京都XXXX市'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
        },
        platform_terms_of_use: {
            _value: 1000099,
            _ver: 0
        }
    });
    /**
     * 異常（PF利用規約取得時エラー）
     */
    export const FAILED_GET_PLATFORM_TOU = JSON.stringify({
        pxrId: '58di2dfse2.test.org',
        idServiceFlg: true,
        attributes: {},
        identification: [
            {
                _code: {
                    _value: 30001,
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
                        title: '氏名',
                        item: [
                            {
                                title: '姓名',
                                type: {
                                    _value: 30037,
                                    _ver: 1
                                },
                                content: 'サンプル太郎'
                            }
                        ]
                    },
                    {
                        title: '生年月日（和暦）',
                        item: [
                            {
                                title: '生年月日（和暦）',
                                type: {
                                    _value: 30038,
                                    _ver: 1
                                },
                                content: '2000年1月1日'
                            }
                        ]
                    },
                    {
                        title: '住所',
                        item: [
                            {
                                title: '住所',
                                type: {
                                    _value: 30035,
                                    _ver: 1
                                },
                                content: '東京都XXXX市'
                            }
                        ]
                    }
                ]
            }
        ],
        userInformation: {
            _code: {
                _value: 1000373,
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
        },
        platform_terms_of_use: {
            _value: 1000999,
            _ver: 0
        }
    });
}
