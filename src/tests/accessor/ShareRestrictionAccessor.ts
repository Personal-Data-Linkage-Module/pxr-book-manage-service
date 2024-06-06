/* eslint-disable */
import Operator from "resources/dto/OperatorReqDto";
import { appActor01} from "./APPCatalogs1";
import { appActor03 } from "./APPCatalogs3";
import { ISharingRestrictionCatalog } from "domains/catalog/Catalogs";

/**
 * 共有制限定義カタログ取得関数
 * @param actorCode
 * @returns
 */
export const getShareRestrictionCatalogs =
    async (
        operator: Operator,
        actorCode: number
    ): Promise<ISharingRestrictionCatalog[]> => {
        let res: ISharingRestrictionCatalog[] = [];

        // appアクター02の共有制限定義
        const app02SharingRestriction: ISharingRestrictionCatalog = {
            catalogItem: {
                ns: '/share-restriction',
                _code: {
                    _value: 1000140,
                    _ver: 1
                }
            },
            template: {
                _code: {
                    _value: 1000140,
                    _ver: 1
                },
                document: [
                    {
                        code: {
                            _value: 1000501,
                            _ver: 1
                        },
                        permission: [
                            {
                                region: null,
                                service: [
                                    {
                                        _value: 1000110,
                                        _ver: 1
                                    }
                                ]
                            }
                        ],
                        prohibition: null
                    },
                    {
                        code: {
                            _value: 1000502,
                            _ver: 1
                        },
                        permission: [
                            {
                                region: null,
                                service: null
                            }
                        ],
                        prohibition: []
                    },
                    {
                        code: {
                            _value: 1000503,
                            _ver: 1
                        },
                        permission: null,
                        prohibition: [
                            {
                                region: null,
                                service: null
                            }
                        ]
                    }
                ],
                event: [
                    {
                        code: {
                            _value: 1000512,
                            _ver: 1
                        },
                        permission: [
                            {
                                region: [
                                    {
                                        _value: 1000310,
                                        _ver: 1
                                    }
                                ],
                                service: null
                            }
                        ],
                        prohibition: null
                    }
                ],
                thing: [
                    {
                        code: {
                            _value: 1000522,
                            _ver: 1
                        },
                        permission: null,
                        prohibition: [
                            {
                                region: null,
                                service: [
                                    {
                                        _value: 1000111,
                                        _ver: 1
                                    },
                                    {
                                        _value: 1000210,
                                        _ver: 1
                                    }
                                ]
                            },
                            {
                                region: null,
                                service: [
                                    {
                                        _value: 1000212,
                                        _ver: 1
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        code: {
                            _value: 1000523,
                            _ver: 2
                        },
                        permission: null,
                        prohibition: [
                            {
                                region: [
                                    {
                                        _value: 1000311,
                                        _ver: 1
                                    }
                                ],
                                service: null
                            }
                        ]
                    }
                ]
            }
        };

        // appアクター01の共有制限定義
        const app01SharingRestriction: ISharingRestrictionCatalog = {
            catalogItem: {
                ns: '/share-restriction',
                _code: {
                    _value: 1000240,
                    _ver: 1
                }
            },
            template: {
                _code: {
                    _value: 1000240,
                    _ver: 1
                },
                document: [
                    {
                        code: {
                            _value: 1000501,
                            _ver: 1
                        },
                        permission: [
                            {
                                region: null,
                                service: [
                                    {
                                        _value: 1000110,
                                        _ver: 1
                                    }
                                ]
                            }
                        ],
                        prohibition: null
                    }
                ],
                event: [
                    {
                        code: {
                            _value: 1000512,
                            _ver: 1
                        },
                        permission: [
                            {
                                region: [
                                    {
                                        _value: 1000310,
                                        _ver: 1
                                    }
                                ],
                                service: null
                            }
                        ],
                        prohibition: null
                    },
                    {
                        code: {
                            _value: 1000511,
                            _ver: 1
                        },
                        permission: [
                            {
                                region: null,
                                service: [
                                    {
                                        _value: 1000110,
                                        _ver: 1
                                    }
                                ]
                            }
                        ],
                        prohibition: null
                    }
                ],
                thing: [
                    {
                        code: {
                            _value: 1000523,
                            _ver: 1
                        },
                        permission: null,
                        prohibition: [
                            {
                                region: null,
                                service: [
                                    {
                                        _value: 1000210,
                                        _ver: 1
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        code: {
                            _value: 1000521,
                            _ver: 1
                        },
                        permission: [
                            {
                                region: null,
                                service: [
                                    {
                                        _value: 1000110,
                                        _ver: 1
                                    }
                                ]
                            }
                        ],
                        prohibition: null
                    }
                ]
            }
        };

        switch (actorCode) {
            case appActor03.catalogItem._code._value:
                res.push(app02SharingRestriction);
                break;
            case appActor01.catalogItem._code._value:
                res.push(app01SharingRestriction);
                break;
            default:
                break;
        }
        return res;
    }


/**
 * 不正な共有制限定義カタログ取得関数
 * @param actorCode
 * @returns
 */
export const getInvalidShareRestrictionCatalogs =
    async (
        operator: Operator,
        actorCode: number
    ): Promise<ISharingRestrictionCatalog[]> => {
        return [
            {
                catalogItem: {
                    ns: '/share-restriction',
                    _code: {
                        _value: 1000141,
                        _ver: 1
                    }
                },
                template: {
                    _code: {
                        _value: 1000140,
                        _ver: 1
                    },
                    document: [
                        {
                            code: {
                                _value: 1000501,
                                _ver: 1
                            },
                            permission: [
                                {
                                    region: null,
                                    service: [
                                        {
                                            _value: 1000110,
                                            _ver: 1
                                        }
                                    ]
                                }
                            ],
                            prohibition: [
                                {
                                    region: null,
                                    service: [
                                        {
                                            _value: 1000210,
                                            _ver: 1
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    event: [
                        {
                            code: {
                                _value: 1000512,
                                _ver: 1
                            },
                            permission: [
                                {
                                    region: [
                                        {
                                            _value: 1000310,
                                            _ver: 1
                                        }
                                    ],
                                    service: null
                                }
                            ],
                            prohibition: null
                        }
                    ],
                    thing: [
                        {
                            code: {
                                _value: 1000522,
                                _ver: 1
                            },
                            permission: null,
                            prohibition: [
                                {
                                    region: null,
                                    service: [
                                        {
                                            _value: 1000210,
                                            _ver: 1
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        ];
    }

/**
 * 共有制限定義カタログ取得関数（取得結果なしパターン）
 * @param actorCode 
 * @returns 
 */
export const getNoShareRestrictionCatalogs =
    async (
        operator: Operator,
        actorCode: number
    ): Promise<ISharingRestrictionCatalog[]> => {
        return [];
    }