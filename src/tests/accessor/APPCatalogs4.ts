/* eslint-disable */

import { IStoreEventNotificate } from "common/PermissionAnalyzer";
import { IActorCatalog, IAssetCatalog, IDataShareCatalog, IDataStoreCatalog, IOperationTarget, ISharingDatatype, ISharingRestrictionCatalog, IStoringDatatype } from "domains/catalog/Catalogs";


/**
 * 備忘：コード規則
 * 1000101 App03アクターカタログ
 * 1000111 App04アセットカタログ
 * 1000121 App04蓄積定義カタログ1
 * 1000122 App04蓄積定義カタログ2
 * 1000131 App04共有定義カタログ1
 * 1000132 App04共有定義カタログ2
 * 1000311 region02カタログ
 * 
 * 100070n App04のドキュメント
 * 100071n App04のイベント
 * 100072n App04のモノ
 */

/**
 * 蓄積定義カタログの各verで追加する蓄積定義のMap
 * 全アセット共通で蓄積可能なデータ種（10005xx）
 */
const storeMapCommon: Map<string, IOperationTarget> = new Map()
.set('storeUuidCommon-v1', {
    id: 'storeUuidCommon-v1',
    role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
    document: [
        {
            code: {
                _value: 1000501,
                _ver: 1
            },
            requireConsent: true
        }
    ] as IStoringDatatype[],
    event: [
        {
            code: {
                _value: 1000511,
                _ver: 1
            },
            requireConsent: true,
            thing: [
                {
                    code: {
                        _value: 1000521,
                        _ver: 1
                    },
                    requireConsent: true
                }
            ] as IStoringDatatype[]
        }
    ] as IStoringDatatype[]
})
.set('storeUuidCommon-v2', {
    id: 'storeUuidCommon-v2',
    role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
    event: [
        {
            code: {
                _value: 1000511,
                _ver: 2
            },
            requireConsent: false,
            thing: [
                {
                    code: {
                        _value: 1000521,
                        _ver: 2
                    },
                    requireConsent: false
                }
            ] as IStoringDatatype[]
        }
    ] as IStoringDatatype[]
})
.set('storeUuidCommon-v3', {
    id: 'storeUuidCommon-v3',
    role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
    document: [
        {
            code: {
                _value: 1000501,
                _ver: 2
            },
            requireConsent: false
        }
    ] as IStoringDatatype[]
})
.set('storeUuidCommon-v4', {
    id: 'storeUuidCommon-v4',
    role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
    document: [
        {
            code: {
                _value: 1000502,
                _ver: 1
            },
            requireConsent: true
        }
    ] as IStoringDatatype[],
    event: [
        {
            code: {
                _value: 1000512,
                _ver: 1
            },
            requireConsent: true,
            thing: [
                {
                    code: {
                        _value: 1000522,
                        _ver: 1
                    },
                    requireConsent: true
                }
            ] as IStoringDatatype[]
        }
    ] as IStoringDatatype[]
})
.set('storeUuidCommon-v5', {
    id: 'storeUuidCommon-v5',
    role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
    document: [
        {
            code: {
                _value: 1000503,
                _ver: 1
            },
            requireConsent: true
        }
    ] as IStoringDatatype[],
    event: [
        {
            code: {
                _value: 1000512,
                _ver: 2
            },
            requireConsent: false,
            thing: [
                {
                    code: {
                        _value: 1000522,
                        _ver: 2
                    },
                    requireConsent: false
                },
                {
                    code: {
                        _value: 1000524,
                        _ver: 1
                    },
                    requireConsent: false
                }
            ] as IStoringDatatype[]
        },
        {
            code: {
                _value: 1000513,
                _ver: 1
            },
            requireConsent: true,
            thing: [
                {
                    code: {
                        _value: 1000523,
                        _ver: 1
                    }
                },
                {
                    code: {
                        _value: 1000524,
                        _ver: 1
                    }
                }
            ] as IStoringDatatype[]
        },
    ] as IStoringDatatype[]
})
.set('storeUuidCommon-v6', {
    id: 'storeUuidCommon-v6',
    role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
    document: [
        {
            code: {
                _value: 1000503,
                _ver: 2
            },
            requireConsent: false
        }
    ] as IStoringDatatype[],
    event: [
        {
            code: {
                _value: 1000513,
                _ver: 2
            },
            requireConsent: false,
            thing: [
                {
                    code: {
                        _value: 1000523,
                        _ver: 2
                    }
                },
                {
                    code: {
                        _value: 1000524,
                        _ver: 2
                    }
                }
            ] as IStoringDatatype[]
        }
    ] as IStoringDatatype[]
});

/**
 * 蓄積定義カタログの各verで追加する蓄積定義のMap
 * App04で蓄積可能なデータ種（10007xx）
 */
const storeMapApp04: Map<string, IOperationTarget> = new Map()
    .set('storeUuidApp04-v1', {
        id: 'storeUuidApp04-v1',
        role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
        document: [
            {
                code: {
                    _value: 1000701,
                    _ver: 1
                },
                requireConsent: true
            }
        ] as IStoringDatatype[],
        event: [
            {
                code: {
                    _value: 1000711,
                    _ver: 1
                },
                requireConsent: true,
                thing: [
                    {
                        code: {
                            _value: 1000721,
                            _ver: 1
                        },
                        requireConsent: true
                    }
                ] as IStoringDatatype[]
            }
        ] as IStoringDatatype[]
    })
    .set('storeUuidApp04-v2', {
        id: 'storeUuidApp04-v2',
        role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
        document: [] as IStoringDatatype[],
        event: [
            {
                code: {
                    _value: 1000711,
                    _ver: 2
                },
                requireConsent: false,
                thing: [
                    {
                        code: {
                            _value: 1000721,
                            _ver: 2
                        },
                        requireConsent: false
                    }
                ] as IStoringDatatype[]
            }
        ] as IStoringDatatype[]
    })
    .set('storeUuidApp04-v3', {
        id: 'storeUuidApp04-v3',
        role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
    document: [
        {
            code: {
                _value: 1000701,
                _ver: 2
            },
            requireConsent: false
        }
    ] as IStoringDatatype[]
    })
    .set('storeUuidApp04-v4', {
        id: 'storeUuidApp04-v4',
        role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
        document: [
            {
                code: {
                    _value: 1000702,
                    _ver: 1
                },
                requireConsent: true
            }
        ] as IStoringDatatype[],
        event: [
            {
                code: {
                    _value: 1000712,
                    _ver: 1
                },
                requireConsent: true,
                thing: [
                    {
                        code: {
                            _value: 1000722,
                            _ver: 1
                        },
                        requireConsent: true
                    }
                ] as IStoringDatatype[]
            }
        ] as IStoringDatatype[]
    })
    .set('storeUuidApp04-v5', {
        id: 'storeUuidApp04-v5',
        role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
        document: [
            {
                code: {
                    _value: 1000703,
                    _ver: 1
                },
                requireConsent: true
            }
        ] as IStoringDatatype[],
        event: [
            {
                code: {
                    _value: 1000712,
                    _ver: 2
                },
                requireConsent: false,
                thing: [
                    {
                        code: {
                            _value: 1000722,
                            _ver: 2
                        },
                        requireConsent: false
                    },
                    {
                        code: {
                            _value: 1000724,
                            _ver: 1
                        },
                        requireConsent: false
                    }
                ] as IStoringDatatype[]
            },
            {
                code: {
                    _value: 1000713,
                    _ver: 1
                },
                requireConsent: true,
                thing: [
                    {
                        code: {
                            _value: 1000723,
                            _ver: 1
                        }
                    },
                    {
                        code: {
                            _value: 1000724,
                            _ver: 1
                        }
                    }
                ] as IStoringDatatype[]
            },
            {
                code: {
                    _value: 1000714,
                    _ver: 1
                },
                requireConsent: true,
                thing: [
                    {
                        code: {
                            _value: 1000725,
                            _ver: 1
                        }
                    },
                    {
                        code: {
                            _value: 1000726,
                            _ver: 1
                        }
                    }
                ] as IStoringDatatype[]
            },
            {
                code: {
                    _value: 1000715,
                    _ver: 1
                },
                requireConsent: true,
                thing: [
                    {
                        code: {
                            _value: 1000727,
                            _ver: 1
                        }
                    }
                ] as IStoringDatatype[]
            },
            {
                code: {
                    _value: 1000716,
                    _ver: 1
                },
                requireConsent: true,
                thing: [
                    {
                        code: {
                            _value: 1000727,
                            _ver: 1
                        }
                    }
                ] as IStoringDatatype[]
            },
        ] as IStoringDatatype[]
    })
    .set('storeUuidApp04-v6', {
        id: 'storeUuidApp04-v6',
        role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
        document: [
            {
                code: {
                    _value: 1000703,
                    _ver: 2
                },
                requireConsent: false
            }
        ] as IStoringDatatype[],
        event: [
            {
                code: {
                    _value: 1000713,
                    _ver: 2
                },
                requireConsent: false,
                thing: [
                    {
                        code: {
                            _value: 1000723,
                            _ver: 2
                        }
                    },
                    {
                        code: {
                            _value: 1000724,
                            _ver: 2
                        }
                    }
                ] as IStoringDatatype[]
            }
        ] as IStoringDatatype[]
    });

/**
 * 共有定義カタログの各verで追加する共有定義のMap
 * 全アセットから共有可能なデータ種（10005xx）
 */
const shareMapByAllToApp04: Map<string, IOperationTarget> = new Map()
.set('shareUuidCommon-v1', {
    id: 'shareUuidCommon-v1',
    role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
    document: [
        {
            code: {
                _value: 1000501,
                _ver: 1
            },
            requireConsent: true,
            sourceActor: null
        }
    ] as ISharingDatatype[],
    event: [
        {
            code: {
                _value: 1000511,
                _ver: 1
            },
            requireConsent: true,
            sourceActor: null,
            thing: [
                {
                    code: {
                        _value: 1000521,
                        _ver: 1
                    },
                    requireConsent: true,
                    sourceActor: null
                }
            ] as ISharingDatatype[]
        }
    ] as ISharingDatatype[]
})
.set('shareUuidCommon-v2', {
    id: 'shareUuidCommon-v2',
    role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
    event: [
        {
            code: {
                _value: 1000511,
                _ver: 2
            },
            requireConsent: false,
            sourceActor: null,
            thing: [
                {
                    code: {
                        _value: 1000521,
                        _ver: 2
                    },
                    requireConsent: false,
                    sourceActor: null
                }
            ] as ISharingDatatype[]
        }
    ] as ISharingDatatype[]
})
.set('shareUuidCommon-v3', {
    id: 'shareUuidCommon-v3',
    role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
    document: [
        {
            code: {
                _value: 1000501,
                _ver: 2
            },
            requireConsent: false,
            sourceActor: null
        }
    ] as ISharingDatatype[]
})
.set('shareUuidCommon-v4', {
    id: 'shareUuidCommon-v4',
    role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
    document: [
        {
            code: {
                _value: 1000502,
                _ver: 1
            },
            requireConsent: true,
            sourceActor: null
        }
    ] as ISharingDatatype[],
    event: [
        {
            code: {
                _value: 1000512,
                _ver: 1
            },
            requireConsent: true,
            sourceActor: null,
            thing: [
                {
                    code: {
                        _value: 1000522,
                        _ver: 1
                    },
                    requireConsent: true,
                    sourceActor: null
                }
            ] as ISharingDatatype[]
        }
    ] as ISharingDatatype[]
})
.set('shareUuidCommon-v5', {
    id: 'shareUuidCommon-v5',
    role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
    document: [
        {
            code: {
                _value: 1000503,
                _ver: 1
            },
            requireConsent: true,
            sourceActor: [
                {
                    _value: 1000201,
                    _ver: 1
                }
            ]
        }
    ] as ISharingDatatype[],
    event: [
        {
            code: {
                _value: 1000512,
                _ver: 2
            },
            requireConsent: false,
            sourceActor: null,
            thing: [
                {
                    code: {
                        _value: 1000522,
                        _ver: 2
                    }
                }
            ] as ISharingDatatype[]
        },
        {
            code: {
                _value: 1000513,
                _ver: 1
            },
            requireConsent: true,
            sourceActor: [
                {
                    _value: 1000201,
                    _ver: 1
                }
            ],
            thing: [
                {
                    code: {
                        _value: 1000523,
                        _ver: 1
                    }
                }
            ] as ISharingDatatype[]
        }
    ] as ISharingDatatype[],
    thing: [
        {
            code: {
                _value: 1000524,
                _ver: 1
            },
            requireConsent: true,
            sourceActor: [
                {
                    _value: 1000201,
                    _ver: 1
                }
            ]
        }
    ] as ISharingDatatype[]
})
.set('shareUuidCommon-v6', {
    id: 'shareUuidCommon-v6',
    role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
    document: [
        {
            code: {
                _value: 1000503,
                _ver: 2
            },
            requireConsent: false,
            sourceActor: []
        }
    ] as ISharingDatatype[],
    event: [
        {
            code: {
                _value: 1000513,
                _ver: 2
            },
            requireConsent: false,
            sourceActor: [],
            thing: [
                {
                    code: {
                        _value: 1000523,
                        _ver: 2
                    },
                    requireConsent: false,
                    sourceActor: []
                }
            ] as ISharingDatatype[]
        }
    ] as ISharingDatatype[]
})
.set('shareUuidCommon-v6-2', {
    id: 'shareUuidCommon-v6-2',
    role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
    thing: [
        {
            code: {
                _value: 1000524,
                _ver: 2
            },
            requireConsent: false,
            sourceActor: [
                {
                    _value: 1000201,
                    _ver: 1
                }
            ]
        }
    ] as ISharingDatatype[]
});


/**
 * 共有定義カタログの各verで追加する共有定義のMap
 * App04から共有可能なデータ種（10007xx）
 */
const shareMapByApp04ToApp04: Map<string, IOperationTarget> = new Map()
    .set('shareUuidApp04ToApp04-v1', {
        id: 'shareUuidApp04ToApp04-v1',
        role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
        document: [
            {
                code: {
                    _value: 1000701,
                    _ver: 1
                },
                requireConsent: true,
                sourceActor: null
            }
        ] as ISharingDatatype[],
        event: [
            {
                code: {
                    _value: 1000711,
                    _ver: 1
                },
                requireConsent: true,
                sourceActor: null,
                thing: [
                    {
                        code: {
                            _value: 1000721,
                            _ver: 1
                        },
                        requireConsent: true,
                        sourceActor: null
                    }
                ] as ISharingDatatype[]
            }
        ] as ISharingDatatype[]
    })
    .set('shareUuidApp04ToApp04-v2', {
        id: 'shareUuidApp04ToApp04-v2',
        role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
        document: [] as ISharingDatatype[],
        event: [
            {
                code: {
                    _value: 1000711,
                    _ver: 2
                },
                requireConsent: false,
                sourceActor: null,
                thing: [
                    {
                        code: {
                            _value: 1000721,
                            _ver: 2
                        },
                        requireConsent: false,
                        sourceActor: null
                    }
                ] as ISharingDatatype[]
            }
        ] as ISharingDatatype[]
    })
    .set('shareUuidApp04ToApp04-v3', {
        id: 'shareUuidApp04ToApp04-v3',
        role: [
            {
                _value: 1001101,
                _ver: 1
            }
        ],
        document: [
            {
                code: {
                    _value: 1000701,
                    _ver: 2
                },
                requireConsent: false,
                sourceActor: null
            }
        ] as ISharingDatatype[]
    })
    .set('shareUuidApp04ToApp04-v4', {
        id: 'shareUuidApp04ToApp04-v4',
        role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
        document: [
            {
                code: {
                    _value: 1000702,
                    _ver: 1
                },
                requireConsent: true,
                sourceActor: null
            }
        ] as ISharingDatatype[],
        event: [
            {
                code: {
                    _value: 1000712,
                    _ver: 1
                },
                requireConsent: true,
                sourceActor: null,
                thing: [
                    {
                        code: {
                            _value: 1000722,
                            _ver: 1
                        },
                        requireConsent: true,
                        sourceActor: null
                    }
                ] as ISharingDatatype[]
            }
        ] as ISharingDatatype[]
    })
    .set('shareUuidApp04ToApp04-v5', {
        id: 'shareUuidApp04ToApp04-v5',
        role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
        document: [
            {
                code: {
                    _value: 1000703,
                    _ver: 1
                },
                requireConsent: true,
                sourceActor: null
            }
        ] as ISharingDatatype[],
        event: [
            {
                code: {
                    _value: 1000712,
                    _ver: 2
                },
                requireConsent: false,
                sourceActor: null,
                thing: [
                    {
                        code: {
                            _value: 1000722,
                            _ver: 2
                        }
                    }
                ] as ISharingDatatype[]
            },
            {
                code: {
                    _value: 1000713,
                    _ver: 1
                },
                requireConsent: true,
                sourceActor: null,
                thing: [
                    {
                        code: {
                            _value: 1000723,
                            _ver: 1
                        }
                    }
                ] as ISharingDatatype[]
            },
            {
                code: {
                    _value: 1000714,
                    _ver: 1
                },
                requireConsent: true,
                sourceActor: null,
                thing: [
                    {
                        code: {
                            _value: 1000725,
                            _ver: 1
                        }
                    },
                    {
                        code: {
                            _value: 1000726,
                            _ver: 1
                        }
                    }
                ] as IStoringDatatype[]
            },
            {
                code: {
                    _value: 1000715,
                    _ver: 1
                },
                requireConsent: true,
                sourceActor: null,
                thing: [
                    {
                        code: {
                            _value: 1000727,
                            _ver: 1
                        }
                    }
                ] as IStoringDatatype[]
            },
            {
                code: {
                    _value: 1000716,
                    _ver: 1
                },
                requireConsent: true,
                sourceActor: null,
                thing: [
                    {
                        code: {
                            _value: 1000727,
                            _ver: 1
                        }
                    }
                ] as IStoringDatatype[]
            }
        ] as ISharingDatatype[],
        thing: [
            {
                code: {
                    _value: 1000724,
                    _ver: 1
                },
                requireConsent: true,
                sourceActor: null
            }
        ] as ISharingDatatype[]
    })
    .set('shareUuidApp04ToApp04-v6', {
        id: 'shareUuidApp04ToApp04-v6',
        role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
        document: [
            {
                code: {
                    _value: 1000703,
                    _ver: 2
                },
                requireConsent: false,
                sourceActor: null
            }
        ] as ISharingDatatype[],
        event: [
            {
                code: {
                    _value: 1000713,
                    _ver: 2
                },
                requireConsent: false,
                sourceActor: null,
                thing: [
                    {
                        code: {
                            _value: 1000723,
                            _ver: 2
                        }
                    }
                ] as ISharingDatatype[]
            }
        ] as ISharingDatatype[]
    })
    .set('shareUuidApp04ToApp04-v6-2', {
        id: 'shareUuidApp04ToApp04-v6-2',
        role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
        thing: [
            {
                code: {
                    _value: 1000724,
                    _ver: 2
                },
                requireConsent: false,
                sourceActor: null
            }
        ] as ISharingDatatype[]
    });

/**
 * 共有定義カタログの各verで追加する共有定義のMap
 * App03から共有可能なデータ種（10006xx）
 */
const shareMapByApp03ToApp04: Map<string, IOperationTarget> = new Map()
    .set('shareUuidApp03ToApp04-v1', {
        id: 'shareUuidApp03ToApp04-v1',
        role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
        document: [
            {
                code: {
                    _value: 1000601,
                    _ver: 1
                },
                requireConsent: true,
                sourceActor: null
            }
        ] as ISharingDatatype[],
        event: [
            {
                code: {
                    _value: 1000611,
                    _ver: 1
                },
                requireConsent: true,
                sourceActor: null,
                thing: [
                    {
                        code: {
                            _value: 1000621,
                            _ver: 1
                        },
                        requireConsent: true,
                        sourceActor: null
                    }
                ] as ISharingDatatype[]
            }
        ] as ISharingDatatype[]
    })
    .set('shareUuidApp03ToApp04-v2', {
        id: 'shareUuidApp03ToApp04-v2',
        role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
        document: [] as ISharingDatatype[],
        event: [
            {
                code: {
                    _value: 1000611,
                    _ver: 2
                },
                requireConsent: false,
                sourceActor: null,
                thing: [
                    {
                        code: {
                            _value: 1000621,
                            _ver: 2
                        },
                        requireConsent: false,
                        sourceActor: null
                    }
                ] as ISharingDatatype[]
            }
        ] as ISharingDatatype[]
    })
    .set('shareUuidApp03ToApp04-v3', {
        id: 'shareUuidApp03ToApp04-v3',
        role: [
            {
                _value: 1001101,
                _ver: 1
            }
        ],
        document: [
            {
                code: {
                    _value: 1000601,
                    _ver: 1
                },
                requireConsent: false,
                sourceActor: null
            }
        ] as ISharingDatatype[]
    })
    .set('shareUuidApp03ToApp04-v4', {
        id: 'shareUuidApp03ToApp04-v4',
        role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
        document: [
            {
                code: {
                    _value: 1000602,
                    _ver: 1
                },
                requireConsent: true,
                sourceActor: null
            }
        ] as ISharingDatatype[],
        event: [
            {
                code: {
                    _value: 1000612,
                    _ver: 1
                },
                requireConsent: true,
                sourceActor: null,
                thing: [
                    {
                        code: {
                            _value: 1000622,
                            _ver: 1
                        },
                        requireConsent: true,
                        sourceActor: null
                    }
                ] as ISharingDatatype[]
            }
        ] as ISharingDatatype[]
    })
    .set('shareUuidApp03ToApp04-v5', {
        id: 'shareUuidApp03ToApp04-v5',
        role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
        document: [
            {
                code: {
                    _value: 1000603,
                    _ver: 1
                },
                requireConsent: true,
                sourceActor: null
            }
        ] as ISharingDatatype[],
        event: [
            {
                code: {
                    _value: 1000612,
                    _ver: 2
                },
                requireConsent: false,
                sourceActor: null,
                thing: [
                    {
                        code: {
                            _value: 1000622,
                            _ver: 2
                        }
                    }
                ] as ISharingDatatype[]
            },
            {
                code: {
                    _value: 1000613,
                    _ver: 1
                },
                requireConsent: true,
                sourceActor: null,
                thing: [
                    {
                        code: {
                            _value: 1000623,
                            _ver: 1
                        }
                    }
                ] as ISharingDatatype[]
            }
        ] as ISharingDatatype[],
        thing: [
            {
                code: {
                    _value: 1000624,
                    _ver: 1
                },
                requireConsent: true,
                sourceActor: null
            }
        ] as ISharingDatatype[]
    })
    .set('shareUuidApp03ToApp04-v6', {
        id: 'shareUuidApp03ToApp04-v6',
        role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
        document: [
            {
                code: {
                    _value: 1000603,
                    _ver: 2
                },
                requireConsent: false,
                sourceActor: null
            }
        ] as ISharingDatatype[],
        event: [
            {
                code: {
                    _value: 1000613,
                    _ver: 2
                },
                requireConsent: false,
                sourceActor: null,
                thing: [
                    {
                        code: {
                            _value: 1000623,
                            _ver: 2
                        },
                        requireConsent: false,
                        sourceActor: null
                    }
                ] as ISharingDatatype[]
            }
        ] as ISharingDatatype[]
    })
    .set('shareUuidApp03ToApp04-v6-2', {
        id: 'shareUuidApp03ToApp04-v6-2',
        role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
        thing: [
            {
                code: {
                    _value: 1000624,
                    _ver: 2
                },
                requireConsent: false,
                sourceActor: null
            }
        ] as ISharingDatatype[]
        
    });


/**
 * アプリケーションアクター02に属するApp04
 */
export const app04: IAssetCatalog = {
    catalogItem: {
        ns: 'app/app/1000111',
        _code: {
            _value: 1000111,
            _ver: 1
        }
    },
    template: {
        _code: {
            _value: 1000111,
            _ver: 1
        },
        'region-alliance': [
            {
                _value: 1000311,
                _ver: 1
            }
        ],
        store: [
            {
                _value: 1000121,
                _ver: 1
            },
            {
                _value: 1000122,
                _ver: 1
            },
            {
                _value: 1000123,
                _ver: 1
            }
        ],
        share: [
            {
                _value: 1000131,
                _ver: 1
            },
            {
                _value: 1000132,
                _ver: 1
            },
            {
                _value: 1000133,
                _ver: 1
            }
        ]
    }
}


/**
 * App04の蓄積定義1
 * ver1
 * 再同意要
 */
export const App04_store01_1: IDataStoreCatalog = {
    catalogItem: {
        ns: 'app/store/actor_1000101',
        _code: {
            _value: 1000121,
            _ver: 1
        }
    },
    template: {
        _code: {
            _value: 1000121,
            _ver: 1
        },
        store: [
            storeMapCommon.get('storeUuidCommon-v1')
        ]
    }
}

/**
 * App04の蓄積定義1
 * ver2
 * 再同意不要
 */
export const App04_store01_2: IDataStoreCatalog = {
    catalogItem: {
        ns: 'app/store/actor_1000101',
        _code: {
            _value: 1000121,
            _ver: 2
        }
    },
    template: {
        _code: {
            _value: 1000121,
            _ver: 2
        },
        store: [
            storeMapCommon.get('storeUuidCommon-v1'),
            storeMapCommon.get('storeUuidCommon-v2')
        ]
    }
}

/**
 * App04の蓄積定義1
 * ver3
 * 再同意不要
 */
export const App04_store01_3: IDataStoreCatalog = {
    catalogItem: {
        ns: 'app/store/actor_1000101',
        _code: {
            _value: 1000121,
            _ver: 3
        }
    },
    template: {
        _code: {
            _value: 1000121,
            _ver: 3
        },
        store: [
            storeMapCommon.get('storeUuidCommon-v1'),
            storeMapCommon.get('storeUuidCommon-v2'),
            storeMapCommon.get('storeUuidCommon-v3')
        ]
    }
}

/**
 * App04の蓄積定義1
 * ver4
 * 再同意要
 */
export const App04_store01_4: IDataStoreCatalog = {
    catalogItem: {
        ns: 'app/store/actor_1000101',
        _code: {
            _value: 1000121,
            _ver: 4
        }
    },
    template: {
        _code: {
            _value: 1000121,
            _ver: 4
        },
        store: [
            storeMapCommon.get('storeUuidCommon-v1'),
            storeMapCommon.get('storeUuidCommon-v2'),
            storeMapCommon.get('storeUuidCommon-v3'),
            storeMapCommon.get('storeUuidCommon-v4')
        ]
    }
}

/**
 * App04の蓄積定義1
 * ver5
 * 再同意要
 */
export const App04_store01_5: IDataStoreCatalog = {
    catalogItem: {
        ns: 'app/store/actor_1000101',
        _code: {
            _value: 1000121,
            _ver: 5
        }
    },
    template: {
        _code: {
            _value: 1000121,
            _ver: 5
        },
        store: [
            storeMapCommon.get('storeUuidCommon-v1'),
            storeMapCommon.get('storeUuidCommon-v2'),
            storeMapCommon.get('storeUuidCommon-v3'),
            storeMapCommon.get('storeUuidCommon-v4'),
            storeMapCommon.get('storeUuidCommon-v5')
        ]
    }
}

/**
 * App04の蓄積定義1
 * ver6
 * 再同意要
 */
export const App04_store01_6: IDataStoreCatalog = {
    catalogItem: {
        ns: 'app/store/actor_1000101',
        _code: {
            _value: 1000121,
            _ver: 6
        }
    },
    template: {
        _code: {
            _value: 1000121,
            _ver: 6
        },
        store: [
            storeMapCommon.get('storeUuidCommon-v1'),
            storeMapCommon.get('storeUuidCommon-v2'),
            storeMapCommon.get('storeUuidCommon-v3'),
            storeMapCommon.get('storeUuidCommon-v4'),
            storeMapCommon.get('storeUuidCommon-v5'),
            storeMapCommon.get('storeUuidCommon-v6')
        ]
    }
}

/**
 * App04の蓄積定義2
 * ver1
 * 再同意要
 */
export const App04_store02_1: IDataStoreCatalog = {
    catalogItem: {
        ns: 'app/store/actor_1000101',
        _code: {
            _value: 1000122,
            _ver: 1
        }
    },
    template: {
        _code: {
            _value: 1000122,
            _ver: 1
        },
        store: [
            storeMapApp04.get('storeUuidApp04-v1')
        ]
    }
}

/**
 * App04の蓄積定義2
 * ver2
 * 再同意不要
 */
export const App04_store02_2: IDataStoreCatalog = {
    catalogItem: {
        ns: 'app/store/actor_1000101',
        _code: {
            _value: 1000122,
            _ver: 2
        }
    },
    template: {
        _code: {
            _value: 1000122,
            _ver: 2
        },
        store: [
            storeMapApp04.get('storeUuidApp04-v1'),
            storeMapApp04.get('storeUuidApp04-v2')
        ]
    }
}

/**
 * App04の蓄積定義2
 * ver3
 * 再同意不要
 */
export const App04_store02_3: IDataStoreCatalog = {
    catalogItem: {
        ns: 'app/store/actor_1000101',
        _code: {
            _value: 1000122,
            _ver: 3
        }
    },
    template: {
        _code: {
            _value: 1000122,
            _ver: 3
        },
        store: [
            storeMapApp04.get('storeUuidApp04-v1'),
            storeMapApp04.get('storeUuidApp04-v2'),
            storeMapApp04.get('storeUuidApp04-v3')
        ]
    }
}

/**
 * App04の蓄積定義2
 * ver4
 * 再同意要
 */
export const App04_store02_4: IDataStoreCatalog = {
    catalogItem: {
        ns: 'app/store/actor_1000101',
        _code: {
            _value: 1000122,
            _ver: 4
        }
    },
    template: {
        _code: {
            _value: 1000122,
            _ver: 4
        },
        store: [
            storeMapApp04.get('storeUuidApp04-v1'),
            storeMapApp04.get('storeUuidApp04-v2'),
            storeMapApp04.get('storeUuidApp04-v3'),
            storeMapApp04.get('storeUuidApp04-v4')
        ]
    }
}

/**
 * App04の蓄積定義1
 * ver5
 * 再同意要
 */
export const App04_store02_5: IDataStoreCatalog = {
    catalogItem: {
        ns: 'app/store/actor_1000101',
        _code: {
            _value: 1000122,
            _ver: 5
        }
    },
    template: {
        _code: {
            _value: 1000122,
            _ver: 5
        },
        store: [
            storeMapApp04.get('storeUuidApp04-v1'),
            storeMapApp04.get('storeUuidApp04-v2'),
            storeMapApp04.get('storeUuidApp04-v3'),
            storeMapApp04.get('storeUuidApp04-v4'),
            storeMapApp04.get('storeUuidApp04-v5')
        ]
    }
}

/**
 * App04の蓄積定義2
 * ver6
 * 再同意不要
 */
export const App04_store02_6: IDataStoreCatalog = {
    catalogItem: {
        ns: 'app/store/actor_1000101',
        _code: {
            _value: 1000122,
            _ver: 6
        }
    },
    template: {
        _code: {
            _value: 1000122,
            _ver: 6
        },
        store: [
            storeMapApp04.get('storeUuidApp04-v1'),
            storeMapApp04.get('storeUuidApp04-v2'),
            storeMapApp04.get('storeUuidApp04-v3'),
            storeMapApp04.get('storeUuidApp04-v4'),
            storeMapApp04.get('storeUuidApp04-v5'),
            storeMapApp04.get('storeUuidApp04-v6')
        ]
    }
}


/**
 * App04の蓄積定義3
 * ver6
 * 再同意要（ver1~5が存在しないため）
 */
export const App04_store03_6: IDataStoreCatalog = {
    catalogItem: {
        ns: 'app/store/actor_1000101',
        _code: {
            _value: 1000123,
            _ver: 6
        }
    },
    template: {
        _code: {
            _value: 1000123,
            _ver: 6
        },
        store: [
            storeMapApp04.get('storeUuidApp04-v1'),
            storeMapApp04.get('storeUuidApp04-v2'),
            storeMapApp04.get('storeUuidApp04-v3'),
            storeMapApp04.get('storeUuidApp04-v4'),
            storeMapApp04.get('storeUuidApp04-v5'),
            storeMapApp04.get('storeUuidApp04-v6')
        ]
    }
}


/**
 * App04の共有定義1
 * ver1
 * 再同意要
 */
export const App04_share01_1: IDataShareCatalog = {
    catalogItem: {
        ns: 'app/share/actor_1000101',
        _code: {
            _value: 1000131,
            _ver: 1
        }
    },
    template: {
        _code: {
            _value: 1000131,
            _ver: 1
        },
        share: [
            shareMapByAllToApp04.get('shareUuidCommon-v1')
        ]
    }
}

/**
 * App04の共有定義1
 * ver2
 * 再同意不要
 */
export const App04_share01_2: IDataShareCatalog = {
    catalogItem: {
        ns: 'app/share/actor_1000101',
        _code: {
            _value: 1000131,
            _ver: 2
        }
    },
    template: {
        _code: {
            _value: 1000131,
            _ver: 2
        },
        share: [
            shareMapByAllToApp04.get('shareUuidCommon-v1'),
            shareMapByAllToApp04.get('shareUuidCommon-v2')
        ]
    }
}

/**
 * App04の共有定義1
 * ver3
 * 再同意不要
 */
export const App04_share01_3: IDataShareCatalog = {
    catalogItem: {
        ns: 'app/share/actor_1000101',
        _code: {
            _value: 1000131,
            _ver: 3
        }
    },
    template: {
        _code: {
            _value: 1000131,
            _ver: 3
        },
        share: [
            shareMapByAllToApp04.get('shareUuidCommon-v1'),
            shareMapByAllToApp04.get('shareUuidCommon-v2'),
            shareMapByAllToApp04.get('shareUuidCommon-v3'),
        ]
    }
}

/**
 * App04の共有定義1
 * ver4
 * 再同意要
 */
export const App04_share01_4: IDataShareCatalog = {
    catalogItem: {
        ns: 'app/share/actor_1000101',
        _code: {
            _value: 1000131,
            _ver: 4
        }
    },
    template: {
        _code: {
            _value: 1000131,
            _ver: 4
        },
        share: [
            shareMapByAllToApp04.get('shareUuidCommon-v1'),
            shareMapByAllToApp04.get('shareUuidCommon-v2'),
            shareMapByAllToApp04.get('shareUuidCommon-v3'),
            shareMapByAllToApp04.get('shareUuidCommon-v4'),
        ]
    }
}

/**
 * App04の共有定義1
 * ver5
 * 再同意要
 */
export const App04_share01_5: IDataShareCatalog = {
    catalogItem: {
        ns: 'app/share/actor_1000101',
        _code: {
            _value: 1000131,
            _ver: 5
        }
    },
    template: {
        _code: {
            _value: 1000131,
            _ver: 5
        },
        share: [
            shareMapByAllToApp04.get('shareUuidCommon-v1'),
            shareMapByAllToApp04.get('shareUuidCommon-v2'),
            shareMapByAllToApp04.get('shareUuidCommon-v3'),
            shareMapByAllToApp04.get('shareUuidCommon-v4'),
            shareMapByAllToApp04.get('shareUuidCommon-v5')
        ]
    }
}

/**
 * App04の共有定義1
 * ver6
 * 再同意不要
 */
export const App04_share01_6: IDataShareCatalog = {
    catalogItem: {
        ns: 'app/share/actor_1000101',
        _code: {
            _value: 1000131,
            _ver: 6
        }
    },
    template: {
        _code: {
            _value: 1000131,
            _ver: 6
        },
        share: [
            shareMapByAllToApp04.get('shareUuidCommon-v1'),
            shareMapByAllToApp04.get('shareUuidCommon-v2'),
            shareMapByAllToApp04.get('shareUuidCommon-v3'),
            shareMapByAllToApp04.get('shareUuidCommon-v4'),
            shareMapByAllToApp04.get('shareUuidCommon-v5'),
            shareMapByAllToApp04.get('shareUuidCommon-v6'),
            shareMapByAllToApp04.get('shareUuidCommon-v6-2')
        ]
    }
}

/**
 * App04の共有定義2
 * ver1
 * 再同意要
 */
export const App04_share02_1: IDataShareCatalog = {
    catalogItem: {
        ns: 'app/share/actor_1000101',
        _code: {
            _value: 1000132,
            _ver: 1
        }
    },
    template: {
        _code: {
            _value: 1000132,
            _ver: 1
        },
        share: [
            shareMapByApp03ToApp04.get('shareUuidApp03ToApp04-v1'),
            shareMapByApp04ToApp04.get('shareUuidApp04ToApp04-v1')
        ]
    }
}

/**
 * App04の共有定義2
 * ver2
 * 再同意不要
 */
export const App04_share02_2: IDataShareCatalog = {
    catalogItem: {
        ns: 'app/share/actor_1000101',
        _code: {
            _value: 1000132,
            _ver: 2
        }
    },
    template: {
        _code: {
            _value: 1000132,
            _ver: 2
        },
        share: [
            shareMapByApp03ToApp04.get('shareUuidApp03ToApp04-v1'),
            shareMapByApp04ToApp04.get('shareUuidApp04ToApp04-v1'),
            shareMapByApp03ToApp04.get('shareUuidApp03ToApp04-v2'),
            shareMapByApp04ToApp04.get('shareUuidApp04ToApp04-v2')
        ]
    }
}

/**
 * App04の共有定義2
 * ver3
 * 再同意不要
 */
export const App04_share02_3: IDataShareCatalog = {
    catalogItem: {
        ns: 'app/share/actor_1000101',
        _code: {
            _value: 1000132,
            _ver: 3
        }
    },
    template: {
        _code: {
            _value: 1000132,
            _ver: 3
        },
        share: [
            shareMapByApp03ToApp04.get('shareUuidApp03ToApp04-v1'),
            shareMapByApp04ToApp04.get('shareUuidApp04ToApp04-v1'),
            shareMapByApp03ToApp04.get('shareUuidApp03ToApp04-v2'),
            shareMapByApp04ToApp04.get('shareUuidApp04ToApp04-v2'),
            shareMapByApp03ToApp04.get('shareUuidApp03ToApp04-v3'),
            shareMapByApp04ToApp04.get('shareUuidApp04ToApp04-v3')
        ]
    }
}

/**
 * App04の共有定義2
 * ver4
 * 再同意要
 */
export const App04_share02_4: IDataShareCatalog = {
    catalogItem: {
        ns: 'app/share/actor_1000101',
        _code: {
            _value: 1000132,
            _ver: 4
        }
    },
    template: {
        _code: {
            _value: 1000132,
            _ver: 4
        },
        share: [
            shareMapByApp03ToApp04.get('shareUuidApp03ToApp04-v1'),
            shareMapByApp04ToApp04.get('shareUuidApp04ToApp04-v1'),
            shareMapByApp03ToApp04.get('shareUuidApp03ToApp04-v2'),
            shareMapByApp04ToApp04.get('shareUuidApp04ToApp04-v2'),
            shareMapByApp03ToApp04.get('shareUuidApp03ToApp04-v3'),
            shareMapByApp04ToApp04.get('shareUuidApp04ToApp04-v3'),
            shareMapByApp03ToApp04.get('shareUuidApp03ToApp04-v4'),
            shareMapByApp04ToApp04.get('shareUuidApp04ToApp04-v4')
        ]
    }
}

/**
 * App04の共有定義2
 * ver5
 * 再同意要
 */
export const App04_share02_5: IDataShareCatalog = {
    catalogItem: {
        ns: 'app/share/actor_1000101',
        _code: {
            _value: 1000132,
            _ver: 5
        }
    },
    template: {
        _code: {
            _value: 1000132,
            _ver: 5
        },
        share: [
            shareMapByApp03ToApp04.get('shareUuidApp03ToApp04-v1'),
            shareMapByApp04ToApp04.get('shareUuidApp04ToApp04-v1'),
            shareMapByApp03ToApp04.get('shareUuidApp03ToApp04-v2'),
            shareMapByApp04ToApp04.get('shareUuidApp04ToApp04-v2'),
            shareMapByApp03ToApp04.get('shareUuidApp03ToApp04-v3'),
            shareMapByApp04ToApp04.get('shareUuidApp04ToApp04-v3'),
            shareMapByApp03ToApp04.get('shareUuidApp03ToApp04-v4'),
            shareMapByApp04ToApp04.get('shareUuidApp04ToApp04-v4'),
            shareMapByApp03ToApp04.get('shareUuidApp03ToApp04-v5'),
            shareMapByApp04ToApp04.get('shareUuidApp04ToApp04-v5')
        ]
    }
}

/**
 * App04の共有定義2
 * ver6
 * 再同意不要
 */
export const App04_share02_6: IDataShareCatalog = {
    catalogItem: {
        ns: 'app/share/actor_1000101',
        _code: {
            _value: 1000132,
            _ver: 6
        }
    },
    template: {
        _code: {
            _value: 1000132,
            _ver: 6
        },
        share: [
            shareMapByApp03ToApp04.get('shareUuidApp03ToApp04-v1'),
            shareMapByApp04ToApp04.get('shareUuidApp04ToApp04-v1'),
            shareMapByApp03ToApp04.get('shareUuidApp03ToApp04-v2'),
            shareMapByApp04ToApp04.get('shareUuidApp04ToApp04-v2'),
            shareMapByApp03ToApp04.get('shareUuidApp03ToApp04-v3'),
            shareMapByApp04ToApp04.get('shareUuidApp04ToApp04-v3'),
            shareMapByApp03ToApp04.get('shareUuidApp03ToApp04-v4'),
            shareMapByApp04ToApp04.get('shareUuidApp04ToApp04-v4'),
            shareMapByApp03ToApp04.get('shareUuidApp03ToApp04-v5'),
            shareMapByApp04ToApp04.get('shareUuidApp04ToApp04-v5'),
            shareMapByApp03ToApp04.get('shareUuidApp03ToApp04-v6'),
            shareMapByApp04ToApp04.get('shareUuidApp04ToApp04-v6'),
            shareMapByApp03ToApp04.get('shareUuidApp03ToApp04-v6-2'),
            shareMapByApp04ToApp04.get('shareUuidApp04ToApp04-v6-2')
        ]
    }
}

/**
 * App04の共有定義3
 * ver6
 * 再同意要（ver1~5が存在しないため）
 */
export const App04_share03_6: IDataShareCatalog = {
    catalogItem: {
        ns: 'app/share/actor_1000101',
        _code: {
            _value: 1000133,
            _ver: 6
        }
    },
    template: {
        _code: {
            _value: 1000133,
            _ver: 6
        },
        share: [
            shareMapByApp03ToApp04.get('shareUuidApp03ToApp04-v1'),
            shareMapByApp04ToApp04.get('shareUuidApp04ToApp04-v1'),
            shareMapByApp03ToApp04.get('shareUuidApp03ToApp04-v2'),
            shareMapByApp04ToApp04.get('shareUuidApp04ToApp04-v2'),
            shareMapByApp03ToApp04.get('shareUuidApp03ToApp04-v3'),
            shareMapByApp04ToApp04.get('shareUuidApp04ToApp04-v3'),
            shareMapByApp03ToApp04.get('shareUuidApp03ToApp04-v4'),
            shareMapByApp04ToApp04.get('shareUuidApp04ToApp04-v4'),
            shareMapByApp03ToApp04.get('shareUuidApp03ToApp04-v5'),
            shareMapByApp04ToApp04.get('shareUuidApp04ToApp04-v5'),
            shareMapByApp03ToApp04.get('shareUuidApp03ToApp04-v6'),
            shareMapByApp04ToApp04.get('shareUuidApp04ToApp04-v6'),
            shareMapByApp03ToApp04.get('shareUuidApp03ToApp04-v6-2'),
            shareMapByApp04ToApp04.get('shareUuidApp04ToApp04-v6-2')
        ]
    }
}