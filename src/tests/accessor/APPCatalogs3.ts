/* eslint-disable */

import { IStoreEventNotificate } from "common/PermissionAnalyzer";
import { IActorCatalog, IAssetCatalog, IDataShareCatalog, IDataStoreCatalog, IOperationTarget, ISharingDatatype, ISharingRestrictionCatalog, IStoringDatatype } from "domains/catalog/Catalogs";


/**
 * 備忘：コード規則
 * 1000101 APP02アクターカタログ
 * 1000110 APP02アセットカタログ
 * 1000120 app03蓄積定義カタログ1
 * 1000130 app03共有定義カタログ1
 * 1000310 region01カタログ
 * 
 * 100060n app03のドキュメント
 * 100061n app03のイベント
 * 100062n app03のモノ
 * 
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
 * app03で蓄積可能なデータ種（10006xx）
 */
const storeMapApp03: Map<string, IOperationTarget> = new Map()
    .set('storeUuidApp03-v1', {
        id: 'storeUuidApp03-v1',
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
                requireConsent: true
            }
        ] as IStoringDatatype[],
        event: [
            {
                code: {
                    _value: 1000611,
                    _ver: 1
                },
                requireConsent: true,
                thing: [
                    {
                        code: {
                            _value: 1000621,
                            _ver: 1
                        },
                        requireConsent: true
                    }
                ] as IStoringDatatype[]
            }
        ] as IStoringDatatype[]
    })
    .set('storeUuidApp03-v2', {
        id: 'storeUuidApp03-v2',
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
                    _value: 1000611,
                    _ver: 2
                },
                requireConsent: false,
                thing: [
                    {
                        code: {
                            _value: 1000621,
                            _ver: 2
                        },
                        requireConsent: false
                    }
                ] as IStoringDatatype[]
            }
        ] as IStoringDatatype[]
    })
    .set('storeUuidApp03-v3', {
        id: 'storeUuidApp03-v3',
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
                _ver: 2
            },
            requireConsent: false
        }
    ] as IStoringDatatype[]
    })
    .set('storeUuidApp03-v4', {
        id: 'storeUuidApp03-v4',
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
                requireConsent: true
            }
        ] as IStoringDatatype[],
        event: [
            {
                code: {
                    _value: 1000612,
                    _ver: 1
                },
                requireConsent: true,
                thing: [
                    {
                        code: {
                            _value: 1000622,
                            _ver: 1
                        },
                        requireConsent: true
                    }
                ] as IStoringDatatype[]
            }
        ] as IStoringDatatype[]
    })
    .set('storeUuidApp03-v5', {
        id: 'storeUuidApp03-v5',
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
                requireConsent: true
            }
        ] as IStoringDatatype[],
        event: [
            {
                code: {
                    _value: 1000612,
                    _ver: 2
                },
                requireConsent: false,
                thing: [
                    {
                        code: {
                            _value: 1000622,
                            _ver: 2
                        },
                        requireConsent: false
                    },
                    {
                        code: {
                            _value: 1000624,
                            _ver: 1
                        },
                        requireConsent: false
                    }
                ] as IStoringDatatype[]
            },
            {
                code: {
                    _value: 1000613,
                    _ver: 1
                },
                requireConsent: true,
                thing: [
                    {
                        code: {
                            _value: 1000623,
                            _ver: 1
                        }
                    },
                    {
                        code: {
                            _value: 1000624,
                            _ver: 1
                        }
                    }
                ] as IStoringDatatype[]
            },
        ] as IStoringDatatype[]
    })
    .set('storeUuidApp03-v6', {
        id: 'storeUuidApp03-v6',
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
                requireConsent: false
            }
        ] as IStoringDatatype[],
        event: [
            {
                code: {
                    _value: 1000613,
                    _ver: 2
                },
                requireConsent: false,
                thing: [
                    {
                        code: {
                            _value: 1000623,
                            _ver: 2
                        }
                    },
                    {
                        code: {
                            _value: 1000624,
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
const shareMapByAllToApp03: Map<string, IOperationTarget> = new Map()
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
                },
                {
                    code: {
                        _value: 1000523,
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
            sourceActor: null
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
            sourceActor: null,
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
            sourceActor: null
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
            sourceActor: null
        }
    ] as ISharingDatatype[],
    event: [
        {
            code: {
                _value: 1000513,
                _ver: 2
            },
            requireConsent: false,
            sourceActor: null,
            thing: [
                {
                    code: {
                        _value: 1000523,
                        _ver: 2
                    }
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
            sourceActor: null
        }
    ] as ISharingDatatype[]
});

/**
 * 共有定義カタログの各verで追加する共有定義のMap
 * app1から共有可能なデータ種（10008xx）
 */
const shareMapByApp01ToApp03: Map<string, IOperationTarget> = new Map()
    .set('shareUuidApp01ToApp03-v1', {
        id: 'shareUuidApp01ToApp03-v1',
        role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
        document: [
            {
                code: {
                    _value: 1000801,
                    _ver: 1
                },
                requireConsent: true,
                sourceActor: null
            }
        ] as ISharingDatatype[],
        event: [
            {
                code: {
                    _value: 1000811,
                    _ver: 1
                },
                requireConsent: true,
                sourceActor: null,
                thing: [
                    {
                        code: {
                            _value: 1000821,
                            _ver: 1
                        },
                        requireConsent: true,
                        sourceActor: null
                    }
                ] as ISharingDatatype[]
            }
        ] as ISharingDatatype[]
    })
    .set('shareUuidApp01ToApp03-v2', {
        id: 'shareUuidApp01ToApp03-v2',
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
                    _value: 1000811,
                    _ver: 2
                },
                requireConsent: false,
                sourceActor: null,
                thing: [
                    {
                        code: {
                            _value: 1000821,
                            _ver: 2
                        },
                        requireConsent: false,
                        sourceActor: null
                    }
                ] as ISharingDatatype[]
            }
        ] as ISharingDatatype[]
    })
    .set('shareUuidApp01ToApp03-v3', {
        id: 'shareUuidApp01ToApp03-v3',
        role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
    document: [
        {
            code: {
                _value: 1000801,
                _ver: 2
            },
            requireConsent: false,
            sourceActor: null
        }
    ] as ISharingDatatype[],
    })
    .set('shareUuidApp01ToApp03-v4', {
        id: 'shareUuidApp01ToApp03-v4',
        role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
        document: [
            {
                code: {
                    _value: 1000802,
                    _ver: 1
                },
                requireConsent: true,
                sourceActor: null
            }
        ] as ISharingDatatype[],
        event: [
            {
                code: {
                    _value: 1000812,
                    _ver: 1
                },
                requireConsent: true,
                sourceActor: null,
                thing: [
                    {
                        code: {
                            _value: 1000822,
                            _ver: 1
                        },
                        requireConsent: true,
                        sourceActor: null
                    }
                ] as ISharingDatatype[]
            }
        ] as ISharingDatatype[]
    })
    .set('shareUuidApp01ToApp03-v5', {
        id: 'shareUuidApp01ToApp03-v5',
        role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
        document: [
            {
                code: {
                    _value: 1000803,
                    _ver: 1
                },
                requireConsent: true,
                sourceActor: null
            }
        ] as ISharingDatatype[],
        event: [
            {
                code: {
                    _value: 1000812,
                    _ver: 2
                },
                requireConsent: false,
                sourceActor: null,
                thing: [
                    {
                        code: {
                            _value: 1000822,
                            _ver: 2
                        }
                    }
                ] as ISharingDatatype[]
            },
            {
                code: {
                    _value: 1000813,
                    _ver: 1
                },
                requireConsent: true,
                sourceActor: null,
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
                    _value: 1000824,
                    _ver: 1
                },
                requireConsent: true,
                sourceActor: null
            }
        ] as ISharingDatatype[]
    })
    .set('shareUuidApp01ToApp03-v6', {
        id: 'shareUuidApp01ToApp03-v6',
        role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
        document: [
            {
                code: {
                    _value: 1000803,
                    _ver: 2
                },
                requireConsent: false,
                sourceActor: null
            }
        ] as ISharingDatatype[],
        event: [
            {
                code: {
                    _value: 1000813,
                    _ver: 2
                },
                requireConsent: false,
                sourceActor: null,
                thing: [
                    {
                        code: {
                            _value: 1000823,
                            _ver: 2
                        }
                    }
                ] as ISharingDatatype[]
            }
        ] as ISharingDatatype[]
    })
    .set('shareUuidApp01ToApp03-v6-2', {
        id: 'shareUuidApp01ToApp03-v6-2',
        role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
        thing: [
            {
                code: {
                    _value: 1000824,
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
const shareMapByApp03ToApp01: Map<string, IOperationTarget> = new Map()
    .set('shareUuidApp03ToApp03-v1', {
        id: 'shareUuidApp03ToApp03-v1',
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
    .set('shareUuidApp03ToApp03-v2', {
        id: 'shareUuidApp03ToApp03-v2',
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
    .set('shareUuidApp03ToApp03-v3', {
        id: 'shareUuidApp03ToApp03-v3',
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
                _ver: 2
            },
            requireConsent: false,
            sourceActor: null
        }
    ] as ISharingDatatype[]
    })
    .set('shareUuidApp03ToApp03-v4', {
        id: 'shareUuidApp03ToApp03-v4',
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
    .set('shareUuidApp03ToApp03-v5', {
        id: 'shareUuidApp03ToApp03-v5',
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
    .set('shareUuidApp03ToApp03-v6', {
        id: 'shareUuidApp03ToApp03-v6',
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
                        }
                    }
                ] as ISharingDatatype[]
            }
        ] as ISharingDatatype[]
    })
    .set('shareUuidApp03ToApp03-v6-2', {
        id: 'shareUuidApp03ToApp03-v6-2',
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
 * アプリケーションアクター03
 */
export const appActor03: IActorCatalog = {
    catalogItem: {
        ns: 'app/actor/1000101',
        _code: {
            _value: 1000101,
            _ver: 1
        }
    },
    template: {
        _code: {
            _value: 1000101,
            _ver: 1
        },
        workflow: [
            {
                _value: 1000110,
                _ver: 1
            },
            {
                _value: 1000111,
                _ver: 1
            },
            {
                _value: 1000112,
                _ver: 1
            }
        ],
        application: null
    }
}

/**
 * アプリケーションアクター02に属するapp03
 */
export const app03: IAssetCatalog = {
    catalogItem: {
        ns: 'app/app/1000110',
        _code: {
            _value: 1000110,
            _ver: 1
        }
    },
    template: {
        _code: {
            _value: 1000110,
            _ver: 1
        },
        'region-alliance': [
            {
                _value: 1000310,
                _ver: 1
            }
        ],
        store: [
            {
                _value: 1000120,
                _ver: 1
            }
        ],
        share: [
            {
                _value: 1000130,
                _ver: 1
            }
        ]
    }
}

/**
 * アプリケーションアクター02に属するapp05
 * 蓄積定義、共有定義なし
 */
export const app05: IAssetCatalog = {
    catalogItem: {
        ns: 'app/app/1000112',
        _code: {
            _value: 1000112,
            _ver: 1
        }
    },
    template: {
        _code: {
            _value: 1000112,
            _ver: 1
        },
        'region-alliance': [
            {
                _value: 1000312,
                _ver: 1
            }
        ],
        store: [],
        share: []
    }
}


/**
 * App03の蓄積定義1
 * ver1
 * 再同意要
 */
export const App03_store01_1: IDataStoreCatalog = {
    catalogItem: {
        ns: 'app/store/actor_1000101',
        _code: {
            _value: 1000120,
            _ver: 1
        }
    },
    template: {
        _code: {
            _value: 1000120,
            _ver: 1
        },
        store: [
            storeMapCommon.get('storeUuidCommon-v1'),
            storeMapApp03.get('storeUuidApp03-v1')
        ]
    }
}

/**
 * App03の蓄積定義1
 * ver2
 * 再同意不要
 */
export const App03_store01_2: IDataStoreCatalog = {
    catalogItem: {
        ns: 'app/store/actor_1000101',
        _code: {
            _value: 1000120,
            _ver: 2
        }
    },
    template: {
        _code: {
            _value: 1000120,
            _ver: 2
        },
        store: [
            storeMapCommon.get('storeUuidCommon-v1'),
            storeMapApp03.get('storeUuidApp03-v1'),
            storeMapCommon.get('storeUuidCommon-v2'),
            storeMapApp03.get('storeUuidApp03-v2')
        ]
    }
}

/**
 * App03の蓄積定義1
 * ver3
 * 再同意不要
 */
export const App03_store01_3: IDataStoreCatalog = {
    catalogItem: {
        ns: 'app/store/actor_1000101',
        _code: {
            _value: 1000120,
            _ver: 3
        }
    },
    template: {
        _code: {
            _value: 1000120,
            _ver: 3
        },
        store: [
            storeMapCommon.get('storeUuidCommon-v1'),
            storeMapApp03.get('storeUuidApp03-v1'),
            storeMapCommon.get('storeUuidCommon-v2'),
            storeMapApp03.get('storeUuidApp03-v2'),
            storeMapCommon.get('storeUuidCommon-v3'),
            storeMapApp03.get('storeUuidApp03-v3')
        ]
    }
}

/**
 * App03の蓄積定義1
 * ver4
 * 再同意要
 */
export const App03_store01_4: IDataStoreCatalog = {
    catalogItem: {
        ns: 'app/store/actor_1000101',
        _code: {
            _value: 1000120,
            _ver: 4
        }
    },
    template: {
        _code: {
            _value: 1000120,
            _ver: 4
        },
        store: [
            storeMapCommon.get('storeUuidCommon-v1'),
            storeMapApp03.get('storeUuidApp03-v1'),
            storeMapCommon.get('storeUuidCommon-v2'),
            storeMapApp03.get('storeUuidApp03-v2'),
            storeMapCommon.get('storeUuidCommon-v3'),
            storeMapApp03.get('storeUuidApp03-v3'),
            storeMapCommon.get('storeUuidCommon-v4'),
            storeMapApp03.get('storeUuidApp03-v4')
        ]
    }
}

/**
 * App03の蓄積定義1
 * ver5
 * 再同意要
 */
export const App03_store01_5: IDataStoreCatalog = {
    catalogItem: {
        ns: 'app/store/actor_1000101',
        _code: {
            _value: 1000120,
            _ver: 5
        }
    },
    template: {
        _code: {
            _value: 1000120,
            _ver: 5
        },
        store: [
            storeMapCommon.get('storeUuidCommon-v1'),
            storeMapApp03.get('storeUuidApp03-v1'),
            storeMapCommon.get('storeUuidCommon-v2'),
            storeMapApp03.get('storeUuidApp03-v2'),
            storeMapCommon.get('storeUuidCommon-v3'),
            storeMapApp03.get('storeUuidApp03-v3'),
            storeMapCommon.get('storeUuidCommon-v4'),
            storeMapApp03.get('storeUuidApp03-v4'),
            storeMapCommon.get('storeUuidCommon-v5'),
            storeMapApp03.get('storeUuidApp03-v5')
        ]
    }
}

/**
 * App03の蓄積定義1
 * ver6
 * 再同意要
 */
export const App03_store01_6: IDataStoreCatalog = {
    catalogItem: {
        ns: 'app/store/actor_1000101',
        _code: {
            _value: 1000120,
            _ver: 6
        }
    },
    template: {
        _code: {
            _value: 1000120,
            _ver: 6
        },
        store: [
            storeMapCommon.get('storeUuidCommon-v1'),
            storeMapApp03.get('storeUuidApp03-v1'),
            storeMapCommon.get('storeUuidCommon-v2'),
            storeMapApp03.get('storeUuidApp03-v2'),
            storeMapCommon.get('storeUuidCommon-v3'),
            storeMapApp03.get('storeUuidApp03-v3'),
            storeMapCommon.get('storeUuidCommon-v4'),
            storeMapApp03.get('storeUuidApp03-v4'),
            storeMapCommon.get('storeUuidCommon-v5'),
            storeMapApp03.get('storeUuidApp03-v5'),
            storeMapCommon.get('storeUuidCommon-v6'),
            storeMapApp03.get('storeUuidApp03-v6')
        ]
    }
}

/**
 * App03の共有定義1
 * ver1
 * 再同意要
 */
export const App03_share01_1: IDataShareCatalog = {
    catalogItem: {
        ns: 'app/share/actor_1000101',
        _code: {
            _value: 1000130,
            _ver: 1
        }
    },
    template: {
        _code: {
            _value: 1000130,
            _ver: 1
        },
        share: [
            shareMapByAllToApp03.get('shareUuidCommon-v1'),
            shareMapByApp01ToApp03.get('shareUuidApp01ToApp03-v1'),
            shareMapByApp03ToApp01.get('shareUuidApp03ToApp03-v1')
        ]
    }
}

/**
 * App03の共有定義1
 * ver2
 * 再同意不要
 */
export const App03_share01_2: IDataShareCatalog = {
    catalogItem: {
        ns: 'app/share/actor_1000101',
        _code: {
            _value: 1000130,
            _ver: 2
        }
    },
    template: {
        _code: {
            _value: 1000130,
            _ver: 2
        },
        share: [
            shareMapByAllToApp03.get('shareUuidCommon-v1'),
            shareMapByApp01ToApp03.get('shareUuidApp01ToApp03-v1'),
            shareMapByApp03ToApp01.get('shareUuidApp03ToApp03-v1'),
            shareMapByAllToApp03.get('shareUuidCommon-v2'),
            shareMapByApp01ToApp03.get('shareUuidApp01ToApp03-v2'),
            shareMapByApp03ToApp01.get('shareUuidApp03ToApp03-v2')
        ]
    }
}

/**
 * App03の共有定義1
 * ver3
 * 再同意不要
 */
export const App03_share01_3: IDataShareCatalog = {
    catalogItem: {
        ns: 'app/share/actor_1000101',
        _code: {
            _value: 1000130,
            _ver: 3
        }
    },
    template: {
        _code: {
            _value: 1000130,
            _ver: 3
        },
        share: [
            shareMapByAllToApp03.get('shareUuidCommon-v1'),
            shareMapByApp01ToApp03.get('shareUuidApp01ToApp03-v1'),
            shareMapByApp03ToApp01.get('shareUuidApp03ToApp03-v1'),
            shareMapByAllToApp03.get('shareUuidCommon-v2'),
            shareMapByApp01ToApp03.get('shareUuidApp01ToApp03-v2'),
            shareMapByApp03ToApp01.get('shareUuidApp03ToApp03-v2'),
            shareMapByAllToApp03.get('shareUuidCommon-v3'),
            shareMapByApp01ToApp03.get('shareUuidApp01ToApp03-v3'),
            shareMapByApp03ToApp01.get('shareUuidApp03ToApp03-v3')
        ]
    }
}

/**
 * App03の共有定義1
 * ver4
 * 再同意要
 */
export const App03_share01_4: IDataShareCatalog = {
    catalogItem: {
        ns: 'app/share/actor_1000101',
        _code: {
            _value: 1000130,
            _ver: 4
        }
    },
    template: {
        _code: {
            _value: 1000130,
            _ver: 4
        },
        share: [
            shareMapByAllToApp03.get('shareUuidCommon-v1'),
            shareMapByApp01ToApp03.get('shareUuidApp01ToApp03-v1'),
            shareMapByApp03ToApp01.get('shareUuidApp03ToApp03-v1'),
            shareMapByAllToApp03.get('shareUuidCommon-v2'),
            shareMapByApp01ToApp03.get('shareUuidApp01ToApp03-v2'),
            shareMapByApp03ToApp01.get('shareUuidApp03ToApp03-v2'),
            shareMapByAllToApp03.get('shareUuidCommon-v3'),
            shareMapByApp01ToApp03.get('shareUuidApp01ToApp03-v3'),
            shareMapByApp03ToApp01.get('shareUuidApp03ToApp03-v3'),
            shareMapByAllToApp03.get('shareUuidCommon-v4'),
            shareMapByApp01ToApp03.get('shareUuidApp01ToApp03-v4'),
            shareMapByApp03ToApp01.get('shareUuidApp03ToApp03-v4')
        ]
    }
}

/**
 * App03の共有定義1
 * ver5
 * 再同意要
 */
export const App03_share01_5: IDataShareCatalog = {
    catalogItem: {
        ns: 'app/share/actor_1000101',
        _code: {
            _value: 1000130,
            _ver: 5
        }
    },
    template: {
        _code: {
            _value: 1000130,
            _ver: 5
        },
        share: [
            shareMapByAllToApp03.get('shareUuidCommon-v1'),
            shareMapByApp01ToApp03.get('shareUuidApp01ToApp03-v1'),
            shareMapByApp03ToApp01.get('shareUuidApp03ToApp03-v1'),
            shareMapByAllToApp03.get('shareUuidCommon-v2'),
            shareMapByApp01ToApp03.get('shareUuidApp01ToApp03-v2'),
            shareMapByApp03ToApp01.get('shareUuidApp03ToApp03-v2'),
            shareMapByAllToApp03.get('shareUuidCommon-v3'),
            shareMapByApp01ToApp03.get('shareUuidApp01ToApp03-v3'),
            shareMapByApp03ToApp01.get('shareUuidApp03ToApp03-v3'),
            shareMapByAllToApp03.get('shareUuidCommon-v4'),
            shareMapByApp01ToApp03.get('shareUuidApp01ToApp03-v4'),
            shareMapByApp03ToApp01.get('shareUuidApp03ToApp03-v4'),
            shareMapByAllToApp03.get('shareUuidCommon-v5'),
            shareMapByApp01ToApp03.get('shareUuidApp01ToApp03-v5'),
            shareMapByApp03ToApp01.get('shareUuidApp03ToApp03-v5')
        ]
    }
}

/**
 * App03の共有定義1
 * ver6
 * 再同意不要
 */
export const App03_share01_6: IDataShareCatalog = {
    catalogItem: {
        ns: 'app/share/actor_1000101',
        _code: {
            _value: 1000130,
            _ver: 6
        }
    },
    template: {
        _code: {
            _value: 1000130,
            _ver: 6
        },
        share: [
            shareMapByAllToApp03.get('shareUuidCommon-v1'),
            shareMapByApp01ToApp03.get('shareUuidApp01ToApp03-v1'),
            shareMapByApp03ToApp01.get('shareUuidApp03ToApp03-v1'),
            shareMapByAllToApp03.get('shareUuidCommon-v2'),
            shareMapByApp01ToApp03.get('shareUuidApp01ToApp03-v2'),
            shareMapByApp03ToApp01.get('shareUuidApp03ToApp03-v2'),
            shareMapByAllToApp03.get('shareUuidCommon-v3'),
            shareMapByApp01ToApp03.get('shareUuidApp01ToApp03-v3'),
            shareMapByApp03ToApp01.get('shareUuidApp03ToApp03-v3'),
            shareMapByAllToApp03.get('shareUuidCommon-v4'),
            shareMapByApp01ToApp03.get('shareUuidApp01ToApp03-v4'),
            shareMapByApp03ToApp01.get('shareUuidApp03ToApp03-v4'),
            shareMapByAllToApp03.get('shareUuidCommon-v5'),
            shareMapByApp01ToApp03.get('shareUuidApp01ToApp03-v5'),
            shareMapByApp03ToApp01.get('shareUuidApp03ToApp03-v5'),
            shareMapByAllToApp03.get('shareUuidCommon-v6'),
            shareMapByApp01ToApp03.get('shareUuidApp01ToApp03-v6'),
            shareMapByApp03ToApp01.get('shareUuidApp03ToApp03-v6'),
            shareMapByAllToApp03.get('shareUuidCommon-v6-2'),
            shareMapByApp01ToApp03.get('shareUuidApp01ToApp03-v6-2'),
            shareMapByApp03ToApp01.get('shareUuidApp03ToApp03-v6-2')
        ]
    }
}