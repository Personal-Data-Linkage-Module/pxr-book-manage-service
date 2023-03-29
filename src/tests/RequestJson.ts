/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
export namespace RequestJson {
    /**
     * データ蓄積定義追加_正常（workflow）
     */
    export const STORE_POST_WF = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeDocument: [
            {
                code: {
                    _value: 1001010,
                    _ver: 1
                }
            }
        ]
    });

    /**
     * データ蓄積定義追加_正常（application）
     */
    export const STORE_POST_APP = JSON.stringify({
        actor: {
            _value: 1000104,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: {
            _value: 1000107,
            _ver: 1
        },
        wf: null,
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });

    /**
     * データ蓄積定義追加_正常（application）
     */
    export const STORE_POST_APP2 = JSON.stringify({
        actor: {
            _value: 1000104,
            _ver: 1
        },
        store: {
            _value: 1001107,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: {
            _value: 1000107,
            _ver: 1
        },
        wf: null,
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });

    /**
     * データ蓄積定義追加_正常（application）
     */
    export const STORE_POST_APP3 = JSON.stringify({
        actor: {
            _value: 1000104,
            _ver: 1
        },
        store: {
            _value: 1001108,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: {
            _value: 1000107,
            _ver: 1
        },
        wf: null,
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });

    /**
     * データ蓄積定義追加_正常（application）
     */
    export const STORE_POST_APP4 = JSON.stringify({
        actor: {
            _value: 1000104,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: {
            _value: 1000107,
            _ver: 1
        },
        wf: null,
        excludeDocument: [
            {
                code: {
                    _value: 1001010,
                    _ver: 1
                }
            }
        ]
    });

    /**
     * データ蓄積定義追加_異常（actorがwfまたはapp以外）
     */
    export const STORE_POST_DT = JSON.stringify({
        actor: {
            _value: 1000204,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: {
            _value: 1000107,
            _ver: 1
        },
        wf: null,
        excludeEvent: [{
            code: {
                _value: 1000109,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000114,
                        _ver: 1
                    }
                },
                {
                    code: {
                        _value: 1000115,
                        _ver: 1
                    }
                }
            ]
        }]
    });

    /**
     * データ蓄積定義追加_異常（アクターカタログにcatalogItemがない）
     */
    export const STORE_POST_INVALID_ACTOR = JSON.stringify({
        actor: {
            _value: 1000304,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: {
            _value: 1000107,
            _ver: 1
        },
        wf: null,
        excludeEvent: [{
            code: {
                _value: 1000109,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000114,
                        _ver: 1
                    }
                },
                {
                    code: {
                        _value: 1000115,
                        _ver: 1
                    }
                }
            ]
        }]
    });

    /**
     * データ蓄積定義追加_異常（アクターカタログにworkflowが無い）
     */
    export const STORE_POST_WF_MISSING_TEMPLATE = JSON.stringify({
        actor: {
            _value: 1000404,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeEvent: [{
            code: {
                _value: 1000109,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000114,
                        _ver: 1
                    }
                },
                {
                    code: {
                        _value: 1000115,
                        _ver: 1
                    }
                }
            ]
        }]
    });

    /**
     * データ蓄積定義追加_異常（workflowにリクエスト.wfが無い）
     */
    export const STORE_POST_MISSING_REQ_WF = JSON.stringify({
        actor: {
            _value: 1000504,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeEvent: [{
            code: {
                _value: 1000109,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000114,
                        _ver: 1
                    }
                },
                {
                    code: {
                        _value: 1000115,
                        _ver: 1
                    }
                }
            ]
        }]
    });

    /**
     * データ蓄積定義追加_異常（アクターカタログにapplicationが無い）
     */
    export const STORE_POST_APP_MISSING_TEMPLATE = JSON.stringify({
        actor: {
            _value: 1000604,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: {
            _value: 1000107,
            _ver: 1
        },
        wf: null,
        excludeEvent: [{
            code: {
                _value: 1000109,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000114,
                        _ver: 1
                    }
                },
                {
                    code: {
                        _value: 1000115,
                        _ver: 1
                    }
                }
            ]
        }]
    });

    /**
     * データ蓄積定義追加_異常（applicationにリクエスト.appが無い）
     */
    export const STORE_POST_MISSING_REQ_APP = JSON.stringify({
        actor: {
            _value: 1000704,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: {
            _value: 1000107,
            _ver: 1
        },
        wf: null,
        excludeEvent: [{
            code: {
                _value: 1000109,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000114,
                        _ver: 1
                    }
                },
                {
                    code: {
                        _value: 1000115,
                        _ver: 1
                    }
                }
            ]
        }]
    });

    /**
     * データ蓄積定義追加_異常（workflowカタログ内のstoreが空)）
     */
    export const STORE_POST_WF_EMPTY_TMP_STORE = JSON.stringify({
        actor: {
            _value: 1000014,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000017,
            _ver: 1
        },
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });

    /**
     * データ蓄積定義追加_異常（applicationカタログ内のstoreが空)）
     */
    export const STORE_POST_APP_EMPTY_TMP_STORE = JSON.stringify({
        actor: {
            _value: 1000114,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: {
            _value: 1000117,
            _ver: 1
        },
        wf: null,
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（蓄積定義カタログにtemplate.storeがない）
     */
    export const STORE_POST_STORE_MISSING_TEMPLATE = JSON.stringify({
        actor: {
            _value: 1000104,
            _ver: 1
        },
        store: {
            _value: 1010006,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: {
            _value: 1000107,
            _ver: 1
        },
        wf: null,
        excludeDocument: [
            {
                code: {
                    _value: 1001010,
                    _ver: 1
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（蓄積定義カタログのtemplate.storeが配列じゃない）
     */
    export const STORE_POST_STORE_NOT_ARRAY_TEMPLATE = JSON.stringify({
        actor: {
            _value: 1000104,
            _ver: 1
        },
        store: {
            _value: 1100006,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: {
            _value: 1000107,
            _ver: 1
        },
        wf: null,
        excludeDocument: [
            {
                code: {
                    _value: 1001010,
                    _ver: 1
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（actorがない）
     */
    export const STORE_POST_MISSING_ACTOR = JSON.stringify({
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeDocument: [
            {
                code: {
                    _value: 9999999,
                    _ver: 1
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（actorがnull）
     */
    export const STORE_POST_EMPTY_ACTOR = JSON.stringify({
        actor: null,
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeDocument: [
            {
                code: {
                    _value: 9999999,
                    _ver: 1
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（actor._valueがない）
     */
    export const STORE_POST_MISSING_ACTOR_CODE = JSON.stringify({
        actor: {
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeDocument: [
            {
                code: {
                    _value: 9999999,
                    _ver: 1
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（actor._valueが空）
     */
    export const STORE_POST_EMPTY_ACTOR_CODE = JSON.stringify({
        actor: {
            _value: null,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeDocument: [
            {
                code: {
                    _value: 9999999,
                    _ver: 1
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（actor._valueが数字以外）
     */
    export const STORE_POST_ISNUM_ACTOR_CODE = JSON.stringify({
        actor: {
            _value: 'a',
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeDocument: [
            {
                code: {
                    _value: 9999999,
                    _ver: 1
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（actor._verがない）
     */
    export const STORE_POST_MISSING_ACTOR_VER = JSON.stringify({
        actor: {
            _value: 1000004
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeDocument: [
            {
                code: {
                    _value: 9999999,
                    _ver: 1
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（actor._verが空）
     */
    export const STORE_POST_EMPTY_ACTOR_VER = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: null
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeDocument: [
            {
                code: {
                    _value: 9999999,
                    _ver: 1
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（actor._verが数字以外）
     */
    export const STORE_POST_ISNUM_ACTOR_VER = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 'a'
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeDocument: [
            {
                code: {
                    _value: 9999999,
                    _ver: 1
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（storeがない）
     */
    export const STORE_POST_MISSING_STORE = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeDocument: [
            {
                code: {
                    _value: 9999999,
                    _ver: 1
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（storeがnull）
     */
    export const STORE_POST_EMPTY_STORE = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: null,
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeDocument: [
            {
                code: {
                    _value: 9999999,
                    _ver: 1
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（store._valueがない）
     */
    export const STORE_POST_MISSING_STORE_CODE = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeDocument: [
            {
                code: {
                    _value: 9999999,
                    _ver: 1
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（store._valueが空）
     */
    export const STORE_POST_EMPTY_STORE_CODE = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: null,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeDocument: [
            {
                code: {
                    _value: 9999999,
                    _ver: 1
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（store._valueが数字以外）
     */
    export const STORE_POST_ISNUM_STORE_CODE = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 'a',
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeDocument: [
            {
                code: {
                    _value: 9999999,
                    _ver: 1
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（store._verがない）
     */
    export const STORE_POST_MISSING_STORE_VER = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeDocument: [
            {
                code: {
                    _value: 9999999,
                    _ver: 1
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（store._verが空）
     */
    export const STORE_POST_EMPTY_STORE_VER = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: null
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeDocument: [
            {
                code: {
                    _value: 9999999,
                    _ver: 1
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（store._verが数字以外）
     */
    export const STORE_POST_ISNUM_STORE_VER = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 'a'
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeDocument: [
            {
                code: {
                    _value: 9999999,
                    _ver: 1
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });

    /**
     * データ蓄積定義追加_異常（storeCatalogIdがない）
     */
    export const STORE_POST_MISSING_STORE_CATALOG_ID = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        app: {
            _value: 1000007,
            _ver: 1
        },
        wf: null,
        excludeDocument: [
            {
                code: {
                    _value: 9999999,
                    _ver: 1
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });

    /**
     * データ蓄積定義追加_異常（storeCatalogIdが空）
     */
    export const STORE_POST_EMPTY_STORE_CATALOG_ID = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: null,
        app: {
            _value: 1000007,
            _ver: 1
        },
        wf: null,
        excludeDocument: [
            {
                code: {
                    _value: 9999999,
                    _ver: 1
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });

    /**
     * データ蓄積定義追加_異常（storeCatalogIdが文字列以外）
     */
    export const STORE_POST_ISSTRING_STORE_CATALOG_ID = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: true,
        app: {
            _value: 1000007,
            _ver: 1
        },
        wf: null,
        excludeDocument: [
            {
                code: {
                    _value: 9999999,
                    _ver: 1
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });

    /**
     * データ蓄積定義追加_異常（wfとappが両方ない）
     */
    export const STORE_POST_MISSING_WF_APP = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        excludeDocument: [
            {
                code: {
                    _value: 9999999,
                    _ver: 1
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });

    /**
     * データ蓄積定義追加_異常（wfとappが両方とも空）
     */
    export const STORE_POST_EMPTY_WF_APP = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: null,
        excludeDocument: [
            {
                code: {
                    _value: 9999999,
                    _ver: 1
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });

    /**
     * データ蓄積定義追加_異常（wfとappが両方ともobject）
     */
    export const STORE_POST_SETTING_WF_APP = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: {
            _value: 1000007,
            _ver: 1
        },
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeDocument: [
            {
                code: {
                    _value: 9999999,
                    _ver: 1
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });

    /**
     * データ蓄積定義追加_異常（wf._valueがない）
     */
    export const STORE_POST_MISSING_WF_CODE = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _ver: 1
        },
        excludeDocument: [
            {
                code: {
                    _value: 9999999,
                    _ver: 1
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（wf._valueが空）
     */
    export const STORE_POST_EMPTY_WF_CODE = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: null,
            _ver: 1
        },
        excludeDocument: [
            {
                code: {
                    _value: 9999999,
                    _ver: 1
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（wf._valueが数字以外）
     */
    export const STORE_POST_ISNUM_WF_CODE = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 'a',
            _ver: 1
        },
        excludeDocument: [
            {
                code: {
                    _value: 9999999,
                    _ver: 1
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（wf._verがない）
     */
    export const STORE_POST_MISSING_WF_VER = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007
        },
        excludeDocument: [
            {
                code: {
                    _value: 9999999,
                    _ver: 1
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（wf._verが空）
     */
    export const STORE_POST_EMPTY_WF_VER = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: null
        },
        excludeDocument: [
            {
                code: {
                    _value: 9999999,
                    _ver: 1
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（wf._verが数字以外）
     */
    export const STORE_POST_ISNUM_WF_VER = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 'a'
        },
        excludeDocument: [
            {
                code: {
                    _value: 9999999,
                    _ver: 1
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（app._valueがない）
     */
    export const STORE_POST_MISSING_APP_CODE = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: {
            _ver: 1
        },
        wf: null,
        excludeDocument: [
            {
                code: {
                    _value: 9999999,
                    _ver: 1
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（app._valueが空）
     */
    export const STORE_POST_EMPTY_APP_CODE = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: {
            _value: null,
            _ver: 1
        },
        wf: null,
        excludeDocument: [
            {
                code: {
                    _value: 9999999,
                    _ver: 1
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（app._valueが数字以外）
     */
    export const STORE_POST_ISNUM_APP_CODE = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: {
            _value: 'a',
            _ver: 1
        },
        wf: null,
        excludeDocument: [
            {
                code: {
                    _value: 9999999,
                    _ver: 1
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（app._verがない）
     */
    export const STORE_POST_MISSING_APP_VER = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: {
            _value: 1000007
        },
        wf: null,
        excludeDocument: [
            {
                code: {
                    _value: 9999999,
                    _ver: 1
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（app._verが空）
     */
    export const STORE_POST_EMPTY_APP_VER = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: {
            _value: 1000007,
            _ver: null
        },
        wf: null,
        excludeDocument: [
            {
                code: {
                    _value: 9999999,
                    _ver: 1
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（app._verが数字以外）
     */
    export const STORE_POST_ISNUM_APP_VER = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: {
            _value: 1000007,
            _ver: 'a'
        },
        wf: null,
        excludeDocument: [
            {
                code: {
                    _value: 9999999,
                    _ver: 1
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（excludeDocumenがArray以外）
     */
    export const STORE_POST_NO_ARRAY_DOCUMENT = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: {
            _value: 1000007,
            _ver: 1
        },
        wf: null,
        excludeDocument:
        {
            code: {
                _value: 9999999,
                _ver: 1
            }
        },
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（excludeDocumen.codeがない）
     */
    export const STORE_POST_MISSING_DOCUMENT_CODE = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: {
            _value: 1000007,
            _ver: 1
        },
        wf: null,
        excludeDocument: [
            {
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（excludeDocumen.codeが空）
     */
    export const STORE_POST_EMPTY_DOCUMENT_CODE = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: {
            _value: 1000007,
            _ver: 1
        },
        wf: null,
        excludeDocument: [
            {
                code: null
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（excludeDocumen.code._valueがない）
     */
    export const STORE_POST_MISSING_DOCUMENT_VALUE = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: {
            _value: 1000007,
            _ver: 1
        },
        wf: null,
        excludeDocument: [
            {
                code: {
                    _ver: 1
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（excludeDocumen.code._valueが空）
     */
    export const STORE_POST_EMPTY_DOCUMENT_VALUE = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: {
            _value: 1000007,
            _ver: 1
        },
        wf: null,
        excludeDocument: [
            {
                code: {
                    _value: null,
                    _ver: 1
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（excludeDocumen.code._valueが数値以外）
     */
    export const STORE_POST_ISNUM_DOCUMENT_VALUE = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: {
            _value: 1000007,
            _ver: 1
        },
        wf: null,
        excludeDocument: [
            {
                code: {
                    _value: 'a',
                    _ver: 1
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（excludeDocumen.code._verがない）
     */
    export const STORE_POST_MISSING_DOCUMENT_VER = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: {
            _value: 1000007,
            _ver: 1
        },
        wf: null,
        excludeDocument: [
            {
                code: {
                    _value: 9999999
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（excludeDocumen.code._verが空）
     */
    export const STORE_POST_EMPTY_DOCUMENT_VER = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: {
            _value: 1000007,
            _ver: 1
        },
        wf: null,
        excludeDocument: [
            {
                code: {
                    _value: 9999999,
                    _ver: null
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（excludeDocumen.code._verが数値以外）
     */
    export const STORE_POST_ISNUM_DOCUMENT_VER = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: {
            _value: 1000007,
            _ver: 1
        },
        wf: null,
        excludeDocument: [
            {
                code: {
                    _value: 9999999,
                    _ver: 'a'
                }
            }
        ],
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（excludeEventが配列でない）
     */
    export const STORE_POST_NO_ARRAY_EVENT = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeEvent: {
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }
    });
    /**
     * データ蓄積定義追加_異常（excludeEvent.codeがない）
     */
    export const STORE_POST_MISSING_EVENT_CODE = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeEvent: [{
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（excludeEvent.codeがnull）
     */
    export const STORE_POST_EMPTY_EVENT_CODE = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeEvent: [{
            excludeThing: [
                {
                    code: null
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（excludeEvent.code._valueがない）
     */
    export const STORE_POST_MISSING_EVENT_VALUE = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeEvent: [{
            code: {
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（excludeEvent.code._valueが空）
     */
    export const STORE_POST_EMPTY_EVENT_VALUE = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeEvent: [{
            code: {
                _value: null,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（excludeEvent.code._valueが数字以外）
     */
    export const STORE_POST_ISNUM_EVENT_VALUE = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeEvent: [{
            code: {
                _value: 'a',
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（excludeEvent.code._verがない）
     */
    export const STORE_POST_MISSING_EVENT_VER = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeEvent: [{
            code: {
                _value: 1000009
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（excludeEvent.code._verが空）
     */
    export const STORE_POST_EMPTY_EVENT_VER = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: null
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（excludeEvent.code._verが空）
     */
    export const STORE_POST_ISNUM_EVENT_VER = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 'a'
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（excludeEvent.excludeThingがない）
     */
    export const STORE_POST_MISSING_THING = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            }
        }]
    });
    /**
     * データ蓄積定義追加_異常（excludeEvent.excludeThingが空）
     */
    export const STORE_POST_EMPTY_THING = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: null
        }]
    });
    /**
     * データ蓄積定義追加_異常（excludeEvent.excludeThingがArray以外）
     */
    export const STORE_POST_ISARRAY_THING = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: {
                code: {
                    _value: 10000014,
                    _ver: 1
                }
            }
        }]
    });
    /**
     * データ蓄積定義追加_異常（excludeEvent.excludeThing.codeがない）
     */
    export const STORE_POST_MISSING_THING_CODE = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {}
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（excludeEvent.excludeThing.codeがない）
     */
    export const STORE_POST_EMPTY_THING_CODE = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: null
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（excludeEvent.excludeThing.code._valueがない）
     */
    export const STORE_POST_MISSING_THING_VALUE = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        code: {
                            ver: 1
                        }
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（excludeEvent.excludeThing.code._valueが空）
     */
    export const STORE_POST_EMPTY_THING_VALUE = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: null,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（excludeEvent.excludeThing.code._valueが数字以外）
     */
    export const STORE_POST_ISNUM_THING_VALUE = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 'a',
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（excludeEvent.excludeThing.code._verがない）
     */
    export const STORE_POST_MISSING_THING_VER = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        code: {
                            _value: 1000014
                        }
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（excludeEvent.excludeThing.code._verが空）
     */
    export const STORE_POST_EMPTY_THING_VER = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: null
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（excludeEvent.excludeThing.code._verが数字以外）
     */
    export const STORE_POST_ISNUM_THING_VER = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 'a'
                    }
                }
            ]
        }]
    });
    /**
    * データ蓄積定義追加_異常（excludeEvent.excludeThing.codeがない）
    */
    export const STORE_POST_MISSING_THING_CODE2 = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                },
                {
                }
            ]
        }]
    });
    /**
    * データ蓄積定義追加_異常（excludeEvent.excludeThing.code._valueがない）
    */
    export const STORE_POST_MISSING_THING_VALUE2 = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                },
                {
                    code: {
                        ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（excludeEvent.excludeThing.code._valueが空）
     */
    export const STORE_POST_EMPTY_THING_VALUE2 = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                },
                {
                    code: {
                        _value: null,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（excludeEvent.excludeThing.code._valueが数字以外）
     */
    export const STORE_POST_ISNUM_THING_VALUE2 = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                },
                {
                    code: {
                        _value: 'a',
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（excludeEvent.excludeThing.code._valueが数字以外）
     */
    export const STORE_POST_NOT_NUMBER_THING_VALUE = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: false,
                        _ver: 1
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（excludeEvent.excludeThing.code._verがない）
     */
    export const STORE_POST_MISSING_THING_VER2 = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                },
                {
                    code: {
                        _value: 1000015
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（excludeEvent.excludeThing.code._verが空）
     */
    export const STORE_POST_EMPTY_THING_VER2 = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                },
                {
                    code: {
                        _value: 1000015,
                        _ver: null
                    }
                }
            ]
        }]
    });
    /**
     * データ蓄積定義追加_異常（excludeEvent.excludeThing.code._verが数字以外）
     */
    export const STORE_POST_ISNUM_THING_VER2 = JSON.stringify({
        actor: {
            _value: 1000004,
            _ver: 1
        },
        store: {
            _value: 1001106,
            _ver: 1
        },
        storeCatalogId: '32f46729-3e9a-c766-7f5f-d09d75d1cc08',
        app: null,
        wf: {
            _value: 1000007,
            _ver: 1
        },
        excludeEvent: [{
            code: {
                _value: 1000009,
                _ver: 1
            },
            excludeThing: [
                {
                    code: {
                        _value: 1000014,
                        _ver: 1
                    }
                },
                {
                    code: {
                        _value: 1000015,
                        _ver: 'a'
                    }
                }
            ]
        }]
    });
}
