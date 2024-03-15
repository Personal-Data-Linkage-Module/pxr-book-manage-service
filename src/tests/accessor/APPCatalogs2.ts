/* eslint-disable */

import { IStoreEventNotificate } from "common/PermissionAnalyzer";
import { IActorCatalog, IAssetCatalog, IDataShareCatalog, IDataStoreCatalog, IOperationTarget, ISharingDatatype, ISharingRestrictionCatalog, IStoringDatatype } from "domains/catalog/Catalogs";


/**
 * 1000201 App01アクターカタログ
 * 1000211 app02アセットカタログ
 * 1000221 app02蓄積定義カタログ1
 * 1000222 app02蓄積定義カタログ2
 * 1000231 app02共有定義カタログ1
 * 1000232 app02共有定義カタログ2
 * 1000311 region02カタログ
 * 
 * 100090n app02のドキュメント
 * 100091n app02のイベント
 * 100092n app02のモノ
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
 * app02で蓄積可能なデータ種（10009xx）
 */
const storeMapApp02: Map<string, IOperationTarget> = new Map()
    .set('storeUuidApp02-v1', {
        id: 'storeUuidApp02-v1',
        role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
        document: [
            {
                code: {
                    _value: 1000901,
                    _ver: 1
                },
                requireConsent: true
            }
        ] as IStoringDatatype[],
        event: [
            {
                code: {
                    _value: 1000911,
                    _ver: 1
                },
                requireConsent: true,
                thing: [
                    {
                        code: {
                            _value: 1000921,
                            _ver: 1
                        },
                        requireConsent: true
                    }
                ] as IStoringDatatype[]
            }
        ] as IStoringDatatype[]
    })
    .set('storeUuidApp02-v2', {
        id: 'storeUuidApp02-v2',
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
                    _value: 1000911,
                    _ver: 2
                },
                requireConsent: false,
                thing: [
                    {
                        code: {
                            _value: 1000921,
                            _ver: 2
                        },
                        requireConsent: false
                    }
                ] as IStoringDatatype[]
            }
        ] as IStoringDatatype[]
    })
    .set('storeUuidApp02-v3', {
        id: 'storeUuidApp02-v3',
        role: [
            {
                _value: 1001101,
                _ver: 1
            }
        ],
        document: [
            {
                code: {
                    _value: 1000901,
                    _ver: 2
                },
                requireConsent: false
            }
        ] as IStoringDatatype[]
    })
    .set('storeUuidApp02-v4', {
        id: 'storeUuidApp02-v4',
        role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
        document: [
            {
                code: {
                    _value: 1000902,
                    _ver: 1
                },
                requireConsent: true
            }
        ] as IStoringDatatype[],
        event: [
            {
                code: {
                    _value: 1000912,
                    _ver: 1
                },
                requireConsent: true,
                thing: [
                    {
                        code: {
                            _value: 1000922,
                            _ver: 1
                        },
                        requireConsent: true
                    }
                ] as IStoringDatatype[]
            }
        ] as IStoringDatatype[]
    })
    .set('storeUuidApp02-v5', {
        id: 'storeUuidApp02-v5',
        role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
        document: [
            {
                code: {
                    _value: 1000903,
                    _ver: 1
                },
                requireConsent: true
            }
        ] as IStoringDatatype[],
        event: [
            {
                code: {
                    _value: 1000912,
                    _ver: 2
                },
                requireConsent: false,
                thing: [
                    {
                        code: {
                            _value: 1000922,
                            _ver: 2
                        }
                    },
                    {
                        code: {
                            _value: 1000924,
                            _ver: 1
                        }
                    }
                ] as IStoringDatatype[]
            },
            {
                code: {
                    _value: 1000913,
                    _ver: 1
                },
                requireConsent: true,
                thing: [
                    {
                        code: {
                            _value: 1000922,
                            _ver: 2
                        }
                    },
                    {
                        code: {
                            _value: 1000924,
                            _ver: 1
                        }
                    }
                ] as IStoringDatatype[]
            }
        ] as IStoringDatatype[]
    })
    .set('storeUuidApp02-v6', {
        id: 'storeUuidApp02-v6',
        role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
        document: [
            {
                code: {
                    _value: 1000903,
                    _ver: 2
                },
                requireConsent: false
            }
        ] as IStoringDatatype[],
        event: [
            {
                code: {
                    _value: 1000913,
                    _ver: 2
                },
                requireConsent: false,
                thing: [
                    {
                        code: {
                            _value: 1000923,
                            _ver: 2
                        }
                    },
                    {
                        code: {
                            _value: 1000924,
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
const shareMapByAllToApp02: Map<string, IOperationTarget> = new Map()
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
 * app01から共有可能なデータ種（10008xx）
 */
const shareMapByApp01ToApp02: Map<string, IOperationTarget> = new Map()
    .set('shareUuidApp01ToApp02-v1', {
        id: 'shareUuidApp01ToApp02-v1',
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
    .set('shareUuidApp01ToApp02-v2', {
        id: 'shareUuidApp01ToApp02-v2',
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
    .set('shareUuidApp01ToApp02-v3', {
        id: 'shareUuidApp01ToApp02-v3',
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
    ] as ISharingDatatype[]
    })
    .set('shareUuidApp01ToApp02-v4', {
        id: 'shareUuidApp01ToApp02-v4',
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
    .set('shareUuidApp01ToApp02-v5', {
        id: 'shareUuidApp01ToApp02-v5',
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
                            _value: 1000823,
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
    .set('shareUuidApp01ToApp02-v6', {
        id: 'shareUuidApp01ToApp02-v6',
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
    .set('shareUuidApp01ToApp02-v6-2', {
        id: 'shareUuidApp01ToApp02-v6-2',
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
 * app02から共有可能なデータ種（10009xx）
 */
const shareMapByApp03ToApp02: Map<string, IOperationTarget> = new Map()
    .set('shareUuidApp02ToApp02-v1', {
        id: 'shareUuidApp02ToApp02-v1',
        role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
        document: [
            {
                code: {
                    _value: 1000901,
                    _ver: 1
                },
                requireConsent: true,
                sourceActor: null
            }
        ] as ISharingDatatype[],
        event: [
            {
                code: {
                    _value: 1000911,
                    _ver: 1
                },
                requireConsent: true,
                sourceActor: null,
                thing: [
                    {
                        code: {
                            _value: 1000921,
                            _ver: 1
                        },
                        requireConsent: true,
                        sourceActor: null
                    }
                ] as ISharingDatatype[]
            }
        ] as ISharingDatatype[]
    })
    .set('shareUuidApp02ToApp02-v2', {
        id: 'shareUuidApp02ToApp02-v2',
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
                    _value: 1000911,
                    _ver: 2
                },
                requireConsent: false,
                sourceActor: null,
                thing: [
                    {
                        code: {
                            _value: 1000921,
                            _ver: 2
                        },
                        requireConsent: false,
                        sourceActor: null
                    }
                ] as ISharingDatatype[]
            }
        ] as ISharingDatatype[]
    })
    .set('shareUuidApp02ToApp02-v3', {
        id: 'shareUuidApp02ToApp02-v3',
        role: [
            {
                _value: 1001101,
                _ver: 1
            }
        ],
        document: [
            {
                code: {
                    _value: 1000901,
                    _ver: 2
                },
                requireConsent: false,
                sourceActor: null
            }
        ] as ISharingDatatype[]
    })
    .set('shareUuidApp02ToApp02-v4', {
        id: 'shareUuidApp02ToApp02-v4',
        role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
        document: [
            {
                code: {
                    _value: 1000902,
                    _ver: 1
                },
                requireConsent: true,
                sourceActor: null
            }
        ] as ISharingDatatype[],
        event: [
            {
                code: {
                    _value: 1000912,
                    _ver: 1
                },
                requireConsent: true,
                sourceActor: null,
                thing: [
                    {
                        code: {
                            _value: 1000922,
                            _ver: 1
                        },
                        requireConsent: true,
                        sourceActor: null
                    }
                ] as ISharingDatatype[]
            }
        ] as ISharingDatatype[]
    })
    .set('shareUuidApp02ToApp02-v5', {
        id: 'shareUuidApp02ToApp02-v5',
        role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
        document: [
            {
                code: {
                    _value: 1000903,
                    _ver: 1
                },
                requireConsent: true,
                sourceActor: null
            }
        ] as ISharingDatatype[],
        event: [
            {
                code: {
                    _value: 1000912,
                    _ver: 2
                },
                requireConsent: false,
                sourceActor: null,
                thing: [
                    {
                        code: {
                            _value: 1000922,
                            _ver: 2
                        }
                    }
                ] as ISharingDatatype[]
            },
            {
                code: {
                    _value: 1000913,
                    _ver: 1
                },
                requireConsent: true,
                sourceActor: null,
                thing: [
                    {
                        code: {
                            _value: 1000923,
                            _ver: 1
                        }
                    }
                ] as ISharingDatatype[]
            }
        ] as ISharingDatatype[],
        thing: [
            {
                code: {
                    _value: 1000924,
                    _ver: 1
                },
                requireConsent: true,
                sourceActor: null
            }
        ] as ISharingDatatype[]
    })
    .set('shareUuidApp02ToApp02-v6', {
        id: 'shareUuidApp02ToApp02-v6',
        role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
        document: [
            {
                code: {
                    _value: 1000903,
                    _ver: 2
                },
                requireConsent: false,
                sourceActor: null
            }
        ] as ISharingDatatype[],
        event: [
            {
                code: {
                    _value: 1000913,
                    _ver: 2
                },
                requireConsent: false,
                sourceActor: null,
                thing: [
                    {
                        code: {
                            _value: 1000923,
                            _ver: 2
                        },
                        requireConsent: false,
                        sourceActor: null
                    }
                ] as ISharingDatatype[]
            }
        ] as ISharingDatatype[]
    })
    .set('shareUuidApp02ToApp02-v6-2', {
        id: 'shareUuidApp02ToApp02-v6-2',
        role: [
        {
            _value: 1001101,
            _ver: 1
        }
    ],
        thing: [
            {
                code: {
                    _value: 1000924,
                    _ver: 2
                },
                requireConsent: false,
                sourceActor: null
            }
        ] as ISharingDatatype[]
    });


/**
 * アプリケーションアクター01に属するapp02
 */
export const app02: IAssetCatalog = {
    catalogItem: {
        ns: 'application/application/1000210',
        _code: {
            _value: 1000211,
            _ver: 1
        }
    },
    template: {
        _code: {
            _value: 1000211,
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
                _value: 1000221,
                _ver: 1
            },
            {
                _value: 1000222,
                _ver: 1
            }
        ],
        share: [
            {
                _value: 1000231,
                _ver: 1
            },
            {
                _value: 1000232,
                _ver: 1
            }
        ]
    }
}

/**
 * app02の蓄積定義1
 * ver1
 * 再同意要
 */
export const app02_store01_1: IDataStoreCatalog = {
    catalogItem: {
        ns: 'application/store/actor_1000201',
        _code: {
            _value: 1000221,
            _ver: 1
        }
    },
    template: {
        _code: {
            _value: 1000221,
            _ver: 1
        },
        store: [
            storeMapCommon.get('storeUuidCommon-v1')
        ]
    }
}

/**
 * app02の蓄積定義1
 * ver2
 * 再同意不要
 */
export const app02_store01_2: IDataStoreCatalog = {
    catalogItem: {
        ns: 'application/store/actor_1000201',
        _code: {
            _value: 1000221,
            _ver: 2
        }
    },
    template: {
        _code: {
            _value: 1000221,
            _ver: 2
        },
        store: [
            storeMapCommon.get('storeUuidCommon-v1'),
            storeMapCommon.get('storeUuidCommon-v2')
        ]
    }
}

/**
 * app02の蓄積定義1
 * ver3
 * 再同意不要
 */
export const app02_store01_3: IDataStoreCatalog = {
    catalogItem: {
        ns: 'application/store/actor_1000201',
        _code: {
            _value: 1000221,
            _ver: 3
        }
    },
    template: {
        _code: {
            _value: 1000221,
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
 * app02の蓄積定義1
 * ver4
 * 再同意要
 */
export const app02_store01_4: IDataStoreCatalog = {
    catalogItem: {
        ns: 'application/store/actor_1000201',
        _code: {
            _value: 1000221,
            _ver: 4
        }
    },
    template: {
        _code: {
            _value: 1000221,
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
 * app02の蓄積定義1
 * ver5
 * 再同意要
 */
export const app02_store01_5: IDataStoreCatalog = {
    catalogItem: {
        ns: 'application/store/actor_1000201',
        _code: {
            _value: 1000221,
            _ver: 5
        }
    },
    template: {
        _code: {
            _value: 1000221,
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
 * app02の蓄積定義1
 * ver6
 * 再同意要
 */
export const app02_store01_6: IDataStoreCatalog = {
    catalogItem: {
        ns: 'application/store/actor_1000201',
        _code: {
            _value: 1000221,
            _ver: 6
        }
    },
    template: {
        _code: {
            _value: 1000221,
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
 * app02の蓄積定義2
 * ver1
 * 再同意要
 */
export const app02_store02_1: IDataStoreCatalog = {
    catalogItem: {
        ns: 'application/store/actor_1000201',
        _code: {
            _value: 1000222,
            _ver: 1
        }
    },
    template: {
        _code: {
            _value: 1000222,
            _ver: 1
        },
        store: [
            storeMapApp02.get('storeUuidApp02-v1')
        ]
    }
}

/**
 * app02の蓄積定義2
 * ver2
 * 再同意不要
 */
export const app02_store02_2: IDataStoreCatalog = {
    catalogItem: {
        ns: 'application/store/actor_1000201',
        _code: {
            _value: 1000222,
            _ver: 2
        }
    },
    template: {
        _code: {
            _value: 1000222,
            _ver: 2
        },
        store: [
            storeMapApp02.get('storeUuidApp02-v1'),
            storeMapApp02.get('storeUuidApp02-v2')
        ]
    }
}

/**
 * app02の蓄積定義2
 * ver3
 * 再同意不要
 */
export const app02_store02_3: IDataStoreCatalog = {
    catalogItem: {
        ns: 'application/store/actor_1000201',
        _code: {
            _value: 1000222,
            _ver: 3
        }
    },
    template: {
        _code: {
            _value: 1000222,
            _ver: 3
        },
        store: [
            storeMapApp02.get('storeUuidApp02-v1'),
            storeMapApp02.get('storeUuidApp02-v2'),
            storeMapApp02.get('storeUuidApp02-v3')
        ]
    }
}

/**
 * app02の蓄積定義2
 * ver4
 * 再同意要
 */
export const app02_store02_4: IDataStoreCatalog = {
    catalogItem: {
        ns: 'application/store/actor_1000201',
        _code: {
            _value: 1000222,
            _ver: 4
        }
    },
    template: {
        _code: {
            _value: 1000222,
            _ver: 4
        },
        store: [
            storeMapApp02.get('storeUuidApp02-v1'),
            storeMapApp02.get('storeUuidApp02-v2'),
            storeMapApp02.get('storeUuidApp02-v3'),
            storeMapApp02.get('storeUuidApp02-v4')
        ]
    }
}

/**
 * app02の蓄積定義2
 * ver5
 * 再同意要
 */
export const app02_store02_5: IDataStoreCatalog = {
    catalogItem: {
        ns: 'application/store/actor_1000201',
        _code: {
            _value: 1000222,
            _ver: 5
        }
    },
    template: {
        _code: {
            _value: 1000222,
            _ver: 5
        },
        store: [
            storeMapApp02.get('storeUuidApp02-v1'),
            storeMapApp02.get('storeUuidApp02-v2'),
            storeMapApp02.get('storeUuidApp02-v3'),
            storeMapApp02.get('storeUuidApp02-v4'),
            storeMapApp02.get('storeUuidApp02-v5')
        ]
    }
}

/**
 * app02の蓄積定義2
 * ver6
 * 再同意要
 */
export const app02_store02_6: IDataStoreCatalog = {
    catalogItem: {
        ns: 'application/store/actor_1000201',
        _code: {
            _value: 1000222,
            _ver: 6
        }
    },
    template: {
        _code: {
            _value: 1000222,
            _ver: 6
        },
        store: [
            storeMapApp02.get('storeUuidApp02-v1'),
            storeMapApp02.get('storeUuidApp02-v2'),
            storeMapApp02.get('storeUuidApp02-v3'),
            storeMapApp02.get('storeUuidApp02-v4'),
            storeMapApp02.get('storeUuidApp02-v5'),
            storeMapApp02.get('storeUuidApp02-v6')
        ]
    }
}

/**
 * app02の共有定義1
 * ver1
 * 再同意要
 */
export const app02_share01_1: IDataShareCatalog = {
    catalogItem: {
        ns: 'application/share/actor_1000201',
        _code: {
            _value: 1000231,
            _ver: 1
        }
    },
    template: {
        _code: {
            _value: 1000231,
            _ver: 1
        },
        share: [
            shareMapByAllToApp02.get('shareUuidCommon-v1')
        ]
    }
}

/**
 * app02の共有定義1
 * ver2
 * 再同意不要
 */
export const app02_share01_2: IDataShareCatalog = {
    catalogItem: {
        ns: 'application/share/actor_1000201',
        _code: {
            _value: 1000231,
            _ver: 2
        }
    },
    template: {
        _code: {
            _value: 1000231,
            _ver: 2
        },
        share: [
            shareMapByAllToApp02.get('shareUuidCommon-v1'),
            shareMapByAllToApp02.get('shareUuidCommon-v2')
        ]
    }
}

/**
 * app02の共有定義1
 * ver3
 * 再同意不要
 */
export const app02_share01_3: IDataShareCatalog = {
    catalogItem: {
        ns: 'application/share/actor_1000201',
        _code: {
            _value: 1000231,
            _ver: 3
        }
    },
    template: {
        _code: {
            _value: 1000231,
            _ver: 3
        },
        share: [
            shareMapByAllToApp02.get('shareUuidCommon-v1'),
            shareMapByAllToApp02.get('shareUuidCommon-v2'),
            shareMapByAllToApp02.get('shareUuidCommon-v3')
        ]
    }
}

/**
 * app02の共有定義1
 * ver4
 * 再同意要
 */
export const app02_share01_4: IDataShareCatalog = {
    catalogItem: {
        ns: 'application/share/actor_1000201',
        _code: {
            _value: 1000231,
            _ver: 4
        }
    },
    template: {
        _code: {
            _value: 1000231,
            _ver: 4
        },
        share: [
            shareMapByAllToApp02.get('shareUuidCommon-v1'),
            shareMapByAllToApp02.get('shareUuidCommon-v2'),
            shareMapByAllToApp02.get('shareUuidCommon-v3'),
            shareMapByAllToApp02.get('shareUuidCommon-v4')
        ]
    }
}

/**
 * app02の共有定義1
 * ver5
 * 再同意要
 */
export const app02_share01_5: IDataShareCatalog = {
    catalogItem: {
        ns: 'application/share/actor_1000201',
        _code: {
            _value: 1000231,
            _ver: 5
        }
    },
    template: {
        _code: {
            _value: 1000231,
            _ver: 5
        },
        share: [
            shareMapByAllToApp02.get('shareUuidCommon-v1'),
            shareMapByAllToApp02.get('shareUuidCommon-v2'),
            shareMapByAllToApp02.get('shareUuidCommon-v3'),
            shareMapByAllToApp02.get('shareUuidCommon-v4'),
            shareMapByAllToApp02.get('shareUuidCommon-v5')
        ]
    }
}

/**
 * app02の共有定義1
 * ver6
 * 再同意不要
 */
export const app02_share01_6: IDataShareCatalog = {
    catalogItem: {
        ns: 'application/share/actor_1000201',
        _code: {
            _value: 1000231,
            _ver: 6
        }
    },
    template: {
        _code: {
            _value: 1000231,
            _ver: 6
        },
        share: [
            shareMapByAllToApp02.get('shareUuidCommon-v1'),
            shareMapByAllToApp02.get('shareUuidCommon-v2'),
            shareMapByAllToApp02.get('shareUuidCommon-v3'),
            shareMapByAllToApp02.get('shareUuidCommon-v4'),
            shareMapByAllToApp02.get('shareUuidCommon-v5'),
            shareMapByAllToApp02.get('shareUuidCommon-v6'),
            shareMapByAllToApp02.get('shareUuidCommon-v6-2')
        ]
    }
}

/**
 * app02の共有定義2
 * ver1
 * 再同意要
 */
export const app02_share02_1: IDataShareCatalog = {
    catalogItem: {
        ns: 'application/share/actor_1000201',
        _code: {
            _value: 1000232,
            _ver: 1
        }
    },
    template: {
        _code: {
            _value: 1000232,
            _ver: 1
        },
        share: [
            shareMapByApp01ToApp02.get('shareUuidApp01ToApp02-v1'),
            shareMapByApp03ToApp02.get('shareUuidApp02ToApp02-v1')
        ]
    }
}

/**
 * app02の共有定義2
 * ver2
 * 再同意不要
 */
export const app02_share02_2: IDataShareCatalog = {
    catalogItem: {
        ns: 'application/share/actor_1000201',
        _code: {
            _value: 1000232,
            _ver: 2
        }
    },
    template: {
        _code: {
            _value: 1000232,
            _ver: 2
        },
        share: [
            shareMapByApp01ToApp02.get('shareUuidApp01ToApp02-v1'),
            shareMapByApp03ToApp02.get('shareUuidApp02ToApp02-v1'),
            shareMapByApp01ToApp02.get('shareUuidApp01ToApp02-v2'),
            shareMapByApp03ToApp02.get('shareUuidApp02ToApp02-v2')
        ]
    }
}

/**
 * app02の共有定義2
 * ver3
 * 再同意不要
 */
export const app02_share02_3: IDataShareCatalog = {
    catalogItem: {
        ns: 'application/share/actor_1000201',
        _code: {
            _value: 1000232,
            _ver: 3
        }
    },
    template: {
        _code: {
            _value: 1000232,
            _ver: 3
        },
        share: [
            shareMapByApp01ToApp02.get('shareUuidApp01ToApp02-v1'),
            shareMapByApp03ToApp02.get('shareUuidApp02ToApp02-v1'),
            shareMapByApp01ToApp02.get('shareUuidApp01ToApp02-v2'),
            shareMapByApp03ToApp02.get('shareUuidApp02ToApp02-v2'),
            shareMapByApp01ToApp02.get('shareUuidApp01ToApp02-v3'),
            shareMapByApp03ToApp02.get('shareUuidApp02ToApp02-v3')
        ]
    }
}

/**
 * app02の共有定義2
 * ver4
 * 再同意要
 */
export const app02_share02_4: IDataShareCatalog = {
    catalogItem: {
        ns: 'application/share/actor_1000201',
        _code: {
            _value: 1000232,
            _ver: 4
        }
    },
    template: {
        _code: {
            _value: 1000232,
            _ver: 4
        },
        share: [
            shareMapByApp01ToApp02.get('shareUuidApp01ToApp02-v1'),
            shareMapByApp03ToApp02.get('shareUuidApp02ToApp02-v1'),
            shareMapByApp01ToApp02.get('shareUuidApp01ToApp02-v2'),
            shareMapByApp03ToApp02.get('shareUuidApp02ToApp02-v2'),
            shareMapByApp01ToApp02.get('shareUuidApp01ToApp02-v3'),
            shareMapByApp03ToApp02.get('shareUuidApp02ToApp02-v3'),
            shareMapByApp01ToApp02.get('shareUuidApp01ToApp02-v4'),
            shareMapByApp03ToApp02.get('shareUuidApp02ToApp02-v4')
        ]
    }
}

/**
 * app02の共有定義2
 * ver5
 * 再同意要
 */
export const app02_share02_5: IDataShareCatalog = {
    catalogItem: {
        ns: 'application/share/actor_1000201',
        _code: {
            _value: 1000232,
            _ver: 5
        }
    },
    template: {
        _code: {
            _value: 1000232,
            _ver: 5
        },
        share: [
            shareMapByApp01ToApp02.get('shareUuidApp01ToApp02-v1'),
            shareMapByApp03ToApp02.get('shareUuidApp02ToApp02-v1'),
            shareMapByApp01ToApp02.get('shareUuidApp01ToApp02-v2'),
            shareMapByApp03ToApp02.get('shareUuidApp02ToApp02-v2'),
            shareMapByApp01ToApp02.get('shareUuidApp01ToApp02-v3'),
            shareMapByApp03ToApp02.get('shareUuidApp02ToApp02-v3'),
            shareMapByApp01ToApp02.get('shareUuidApp01ToApp02-v4'),
            shareMapByApp03ToApp02.get('shareUuidApp02ToApp02-v4'),
            shareMapByApp01ToApp02.get('shareUuidApp01ToApp02-v5'),
            shareMapByApp03ToApp02.get('shareUuidApp02ToApp02-v5')
        ]
    }
}

/**
 * app02の共有定義2
 * ver6
 * 再同意不要
 */
export const app02_share02_6: IDataShareCatalog = {
    catalogItem: {
        ns: 'application/share/actor_1000201',
        _code: {
            _value: 1000232,
            _ver: 6
        }
    },
    template: {
        _code: {
            _value: 1000232,
            _ver: 6
        },
        share: [
            shareMapByApp01ToApp02.get('shareUuidApp01ToApp02-v1'),
            shareMapByApp03ToApp02.get('shareUuidApp02ToApp02-v1'),
            shareMapByApp01ToApp02.get('shareUuidApp01ToApp02-v2'),
            shareMapByApp03ToApp02.get('shareUuidApp02ToApp02-v2'),
            shareMapByApp01ToApp02.get('shareUuidApp01ToApp02-v3'),
            shareMapByApp03ToApp02.get('shareUuidApp02ToApp02-v3'),
            shareMapByApp01ToApp02.get('shareUuidApp01ToApp02-v4'),
            shareMapByApp03ToApp02.get('shareUuidApp02ToApp02-v4'),
            shareMapByApp01ToApp02.get('shareUuidApp01ToApp02-v5'),
            shareMapByApp03ToApp02.get('shareUuidApp02ToApp02-v5'),
            shareMapByApp01ToApp02.get('shareUuidApp01ToApp02-v6'),
            shareMapByApp03ToApp02.get('shareUuidApp02ToApp02-v6'),
            shareMapByApp01ToApp02.get('shareUuidApp01ToApp02-v6-2'),
            shareMapByApp03ToApp02.get('shareUuidApp02ToApp02-v6-2')
        ]
    }
}