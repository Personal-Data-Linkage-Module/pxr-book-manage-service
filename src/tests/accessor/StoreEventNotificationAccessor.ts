/* eslint-disable */
import { IStoreEventNotificate } from "common/PermissionAnalyzer";

/**
 * 蓄積イベント通知マップ
 * キー：カタログコード_バージョン（string）
 * 値：蓄積イベント通知定義、共有トリガー定義（object[]）
 */
const storeEventNotificationMap: Map<string, Map<number, Map<string, IStoreEventNotificate>>> = new Map();
// App03, store-event, share-trigger両方あり
storeEventNotificationMap.set('1000130_1', new Map()
    .set(1000150, new Map()
        .set('shareUuidApp01ToApp03-v1', {
            type: 'store-event',
            notificationCatalogCode: {
                _value: 1000150,
                _ver: 1
            },
            uuid: 'shareUuidApp01ToApp03-v1',
            shareSourceDatatype: null
        })
        .set('shareUuidCommon-v1', {
            type: 'store-event',
            notificationCatalogCode: {
                _value: 1000150,
                _ver: 1
            },
            uuid: 'shareUuidCommon-v1',
            shareSourceDatatype: null
        })
    )
    .set(1000160, new Map()
        .set('shareUuidApp01ToApp03-v1', {
            type: 'share-trigger',
            notificationCatalogCode: {
                _value: 1000160,
                _ver: 1
            },
            uuid: 'shareUuidApp01ToApp03-v1',
            shareSourceDatatype: null
        })
        .set('shareUuidCommon-v1', {
            type: 'share-trigger',
            notificationCatalogCode: {
                _value: 1000160,
                _ver: 1
            },
            uuid: 'shareUuidCommon-v1',
            shareSourceDatatype: null
        })
    )
);
storeEventNotificationMap.set('1000130_2', new Map()
    .set(1000150, new Map()
        .set('shareUuidApp01ToApp03-v1',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000150,
                    _ver: 2
                },
                uuid: 'shareUuidApp01ToApp03-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v1',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000150,
                    _ver: 2
                },
                uuid: 'shareUuidCommon-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp03-v2',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000150,
                    _ver: 2
                },
                uuid: 'shareUuidApp01ToApp03-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v2',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000150,
                    _ver: 2
                },
                uuid: 'shareUuidCommon-v2',
                shareSourceDatatype: null
            })
    )
    .set(1000160, new Map()
        .set('shareUuidApp01ToApp03-v1',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000160,
                    _ver: 2
                },
                uuid: 'shareUuidApp01ToApp03-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v1',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000160,
                    _ver: 2
                },
                uuid: 'shareUuidCommon-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp03-v2',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000160,
                    _ver: 2
                },
                uuid: 'shareUuidApp01ToApp03-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v2',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000160,
                    _ver: 2
                },
                uuid: 'shareUuidCommon-v2',
                shareSourceDatatype: null
            })
    )
);
storeEventNotificationMap.set('1000130_3', new Map()
    .set(1000150, new Map()
        .set('shareUuidApp01ToApp03-v1',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000150,
                    _ver: 3
                },
                uuid: 'shareUuidApp01ToApp03-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v1',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000150,
                    _ver: 3
                },
                uuid: 'shareUuidCommon-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp03-v2',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000150,
                    _ver: 3
                },
                uuid: 'shareUuidApp01ToApp03-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v2',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000150,
                    _ver: 3
                },
                uuid: 'shareUuidCommon-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp03-v3',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000150,
                    _ver: 3
                },
                uuid: 'shareUuidApp01ToApp03-v3',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v3',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000150,
                    _ver: 3
                },
                uuid: 'shareUuidCommon-v3',
                shareSourceDatatype: null
            }
        )
    )
    .set(1000160, new Map()
        .set('shareUuidApp01ToApp03-v1',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000160,
                    _ver: 3
                },
                uuid: 'shareUuidApp01ToApp03-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v1',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000160,
                    _ver: 3
                },
                uuid: 'shareUuidCommon-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp03-v2',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000160,
                    _ver: 3
                },
                uuid: 'shareUuidApp01ToApp03-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v2',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000160,
                    _ver: 3
                },
                uuid: 'shareUuidCommon-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp03-v3',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000160,
                    _ver: 3
                },
                uuid: 'shareUuidApp01ToApp03-v3',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v3',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000160,
                    _ver: 3
                },
                uuid: 'shareUuidCommon-v3',
                shareSourceDatatype: null
            })
    )
);
storeEventNotificationMap.set('1000130_4', new Map()
    .set(1000150, new Map()
        .set('shareUuidApp01ToApp03-v1',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000150,
                    _ver: 4
                },
                uuid: 'shareUuidApp01ToApp03-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v1',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000150,
                    _ver: 4
                },
                uuid: 'shareUuidCommon-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp03-v2',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000150,
                    _ver: 4
                },
                uuid: 'shareUuidApp01ToApp03-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v2',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000150,
                    _ver: 4
                },
                uuid: 'shareUuidCommon-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp03-v3',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000150,
                    _ver: 4
                },
                uuid: 'shareUuidApp01ToApp03-v3',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v3',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000150,
                    _ver: 4
                },
                uuid: 'shareUuidCommon-v3',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp03-v4',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000150,
                    _ver: 4
                },
                uuid: 'shareUuidApp01ToApp03-v4',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v4',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000150,
                    _ver: 4
                },
                uuid: 'shareUuidCommon-v4',
                shareSourceDatatype: null
            })
    )
    .set(1000160, new Map()
        .set('shareUuidApp01ToApp03-v1',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000160,
                    _ver: 4
                },
                uuid: 'shareUuidApp01ToApp03-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v1',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000160,
                    _ver: 4
                },
                uuid: 'shareUuidCommon-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp03-v2',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000160,
                    _ver: 4
                },
                uuid: 'shareUuidApp01ToApp03-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v2',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000160,
                    _ver: 4
                },
                uuid: 'shareUuidCommon-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp03-v3',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000160,
                    _ver: 4
                },
                uuid: 'shareUuidApp01ToApp03-v3',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v3',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000160,
                    _ver: 4
                },
                uuid: 'shareUuidCommon-v3',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp03-v4',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000160,
                    _ver: 4
                },
                uuid: 'shareUuidApp01ToApp03-v4',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v4',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000160,
                    _ver: 4
                },
                uuid: 'shareUuidCommon-v4',
                shareSourceDatatype: null
            })
    )
);
storeEventNotificationMap.set('1000130_5', new Map()
    .set(1000150, new Map()
        .set('shareUuidApp01ToApp03-v1',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000150,
                    _ver: 5
                },
                uuid: 'shareUuidApp01ToApp03-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v1',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000150,
                    _ver: 5
                },
                uuid: 'shareUuidCommon-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp03-v2',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000150,
                    _ver: 5
                },
                uuid: 'shareUuidApp01ToApp03-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v2',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000150,
                    _ver: 5
                },
                uuid: 'shareUuidCommon-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp03-v3',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000150,
                    _ver: 5
                },
                uuid: 'shareUuidApp01ToApp03-v3',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v3',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000150,
                    _ver: 5
                },
                uuid: 'shareUuidCommon-v3',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp03-v4',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000150,
                    _ver: 5
                },
                uuid: 'shareUuidApp01ToApp03-v4',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v4',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000150,
                    _ver: 5
                },
                uuid: 'shareUuidCommon-v4',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp03-v5',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000150,
                    _ver: 5
                },
                uuid: 'shareUuidApp01ToApp03-v5',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v5',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000150,
                    _ver: 5
                },
                uuid: 'shareUuidCommon-v5',
                shareSourceDatatype: null
            })
    )
    .set(1000160, new Map()
        .set('shareUuidApp01ToApp03-v1',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000160,
                    _ver: 5
                },
                uuid: 'shareUuidApp01ToApp03-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v1',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000160,
                    _ver: 5
                },
                uuid: 'shareUuidCommon-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp03-v2',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000160,
                    _ver: 5
                },
                uuid: 'shareUuidApp01ToApp03-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v2',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000160,
                    _ver: 5
                },
                uuid: 'shareUuidCommon-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp03-v3',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000160,
                    _ver: 5
                },
                uuid: 'shareUuidApp01ToApp03-v3',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v3',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000160,
                    _ver: 5
                },
                uuid: 'shareUuidCommon-v3',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp03-v4',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000160,
                    _ver: 5
                },
                uuid: 'shareUuidApp01ToApp03-v4',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v4',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000160,
                    _ver: 5
                },
                uuid: 'shareUuidCommon-v4',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp03-v5',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000160,
                    _ver: 5
                },
                uuid: 'shareUuidApp01ToApp03-v5',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v5',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000160,
                    _ver: 5
                },
                uuid: 'shareUuidCommon-v5',
                shareSourceDatatype: null
            })
    )
);
storeEventNotificationMap.set('1000130_6', new Map()
    .set(1000150, new Map()
        .set('shareUuidApp01ToApp03-v1',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000150,
                    _ver: 6
                },
                uuid: 'shareUuidApp01ToApp03-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v1',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000150,
                    _ver: 6
                },
                uuid: 'shareUuidCommon-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp03-v2',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000150,
                    _ver: 6
                },
                uuid: 'shareUuidApp01ToApp03-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v2',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000150,
                    _ver: 6
                },
                uuid: 'shareUuidCommon-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp03-v3',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000150,
                    _ver: 6
                },
                uuid: 'shareUuidApp01ToApp03-v3',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v3',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000150,
                    _ver: 6
                },
                uuid: 'shareUuidCommon-v3',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp03-v4',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000150,
                    _ver: 6
                },
                uuid: 'shareUuidApp01ToApp03-v4',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v4',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000150,
                    _ver: 6
                },
                uuid: 'shareUuidCommon-v4',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp03-v5',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000150,
                    _ver: 6
                },
                uuid: 'shareUuidApp01ToApp03-v5',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v5',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000150,
                    _ver: 6
                },
                uuid: 'shareUuidCommon-v5',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp03-v6',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000150,
                    _ver: 6
                },
                uuid: 'shareUuidApp01ToApp03-v6',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v6',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000150,
                    _ver: 6
                },
                uuid: 'shareUuidCommon-v6',
                shareSourceDatatype: null
            })
    )
    .set(1000160, new Map()
        .set('shareUuidApp01ToApp03-v1',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000160,
                    _ver: 6
                },
                uuid: 'shareUuidApp01ToApp03-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v1',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000160,
                    _ver: 6
                },
                uuid: 'shareUuidCommon-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp03-v2',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000160,
                    _ver: 6
                },
                uuid: 'shareUuidApp01ToApp03-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v2',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000160,
                    _ver: 6
                },
                uuid: 'shareUuidCommon-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp03-v3',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000160,
                    _ver: 6
                },
                uuid: 'shareUuidApp01ToApp03-v3',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v3',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000160,
                    _ver: 6
                },
                uuid: 'shareUuidCommon-v3',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp03-v4',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000160,
                    _ver: 6
                },
                uuid: 'shareUuidApp01ToApp03-v4',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v4',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000160,
                    _ver: 6
                },
                uuid: 'shareUuidCommon-v4',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp03-v5',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000160,
                    _ver: 6
                },
                uuid: 'shareUuidApp01ToApp03-v5',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v5',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000160,
                    _ver: 6
                },
                uuid: 'shareUuidCommon-v5',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp03-v6',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000160,
                    _ver: 6
                },
                uuid: 'shareUuidApp01ToApp03-v6',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v6',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000160,
                    _ver: 6
                },
                uuid: 'shareUuidCommon-v6',
                shareSourceDatatype: null
            })
    )
);
// App04, store-eventのみ、共有元指定あり
storeEventNotificationMap.set('1000131_4', new Map()
    .set(1000151, new Map()
        .set('shareUuidCommon-v1',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000151,
                    _ver: 4
                },
                uuid: 'shareUuidCommon-v1',
                shareSourceDatatype: []
            })
        .set('shareUuidCommon-v2',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000151,
                    _ver: 4
                },
                uuid: 'shareUuidCommon-v2',
                shareSourceDatatype: []
            })
        .set('shareUuidCommon-v3',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000151,
                    _ver: 4
                },
                uuid: 'shareUuidCommon-v3',
                shareSourceDatatype: []
            })
        .set('shareUuidCommon-v4',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000151,
                    _ver: 4
                },
                uuid: 'shareUuidCommon-v4',
                shareSourceDatatype: [
                    {
                        code: {
                            _value: 1000512,
                            _ver: 1
                        },
                        shareSourceSource: [
                            {
                                _value: 1000101,
                                _ver: 1
                            }
                        ]
                    },
                    {
                        code: {
                            _value: 1000522,
                            _ver: 1
                        },
                        shareSourceSource: [
                            {
                                _value: 1000101,
                                _ver: 1
                            }
                        ]
                    }
                ]
            })
    )
);
storeEventNotificationMap.set('1000131_5', new Map()
    .set(1000151, new Map()
        .set('shareUuidCommon-v1',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000151,
                    _ver: 5
                },
                uuid: 'shareUuidCommon-v1',
                shareSourceDatatype: []
            })
        .set('shareUuidCommon-v2',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000151,
                    _ver: 5
                },
                uuid: 'shareUuidCommon-v2',
                shareSourceDatatype: []
            })
        .set('shareUuidCommon-v3',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000151,
                    _ver: 5
                },
                uuid: 'shareUuidCommon-v3',
                shareSourceDatatype: []
            })
        .set('shareUuidCommon-v4',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000151,
                    _ver: 5
                },
                uuid: 'shareUuidCommon-v4',
                shareSourceDatatype: [
                    {
                        code: {
                            _value: 1000512,
                            _ver: 1
                        },
                        shareSourceSource: [
                            {
                                _value: 1000101,
                                _ver: 1
                            }
                        ]
                    },
                    {
                        code: {
                            _value: 1000522,
                            _ver: 1
                        },
                        shareSourceSource: [
                            {
                                _value: 1000101,
                                _ver: 1
                            }
                        ]
                    }
                ]
            })
        .set('shareUuidCommon-v5',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000151,
                    _ver: 5
                },
                uuid: 'shareUuidCommon-v5',
                shareSourceDatatype: [
                    {
                        code: {
                            _value: 1000512,
                            _ver: 2
                        },
                        shareSourceSource: [
                            {
                                _value: 1000101,
                                _ver: 1
                            }
                        ]
                    },
                    {
                        code: {
                            _value: 1000522,
                            _ver: 2
                        },
                        shareSourceSource: [
                            {
                                _value: 1000101,
                                _ver: 1
                            }
                        ]
                    },
                    {
                        code: {
                            _value: 1000513,
                            _ver: 1
                        },
                        shareSourceSource: [
                            {
                                _value: 1000201,
                                _ver: 1
                            }
                        ]
                    },
                    {
                        code: {
                            _value: 1000523,
                            _ver: 1
                        },
                        shareSourceSource: [
                            {
                                _value: 1000201,
                                _ver: 1
                            }
                        ]
                    }
                ]
            })
    )
);
storeEventNotificationMap.set('1000131_6', new Map()
    .set(1000151, new Map()
        .set('shareUuidCommon-v1',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000151,
                    _ver: 6
                },
                uuid: 'shareUuidCommon-v1',
                shareSourceDatatype: []
            })
        .set('shareUuidCommon-v2',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000151,
                    _ver: 6
                },
                uuid: 'shareUuidCommon-v2',
                shareSourceDatatype: []
            })
        .set('shareUuidCommon-v3',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000151,
                    _ver: 6
                },
                uuid: 'shareUuidCommon-v3',
                shareSourceDatatype: []
            })
        .set('shareUuidCommon-v4',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000151,
                    _ver: 6
                },
                uuid: 'shareUuidCommon-v4',
                shareSourceDatatype: [
                    {
                        code: {
                            _value: 1000512,
                            _ver: 1
                        },
                        shareSourceSource: [
                            {
                                _value: 1000101,
                                _ver: 1
                            }
                        ]
                    },
                    {
                        code: {
                            _value: 1000522,
                            _ver: 1
                        },
                        shareSourceSource: [
                            {
                                _value: 1000101,
                                _ver: 1
                            }
                        ]
                    }
                ]
            })
        .set('shareUuidCommon-v5',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000151,
                    _ver: 6
                },
                uuid: 'shareUuidCommon-v5',
                shareSourceDatatype: [
                    {
                        code: {
                            _value: 1000512,
                            _ver: 2
                        },
                        shareSourceSource: [
                            {
                                _value: 1000101,
                                _ver: 1
                            }
                        ]
                    },
                    {
                        code: {
                            _value: 1000522,
                            _ver: 2
                        },
                        shareSourceSource: [
                            {
                                _value: 1000101,
                                _ver: 1
                            }
                        ]
                    },
                    {
                        code: {
                            _value: 1000513,
                            _ver: 1
                        },
                        shareSourceSource: [
                            {
                                _value: 1000201,
                                _ver: 1
                            }
                        ]
                    },
                    {
                        code: {
                            _value: 1000523,
                            _ver: 1
                        },
                        shareSourceSource: [
                            {
                                _value: 1000201,
                                _ver: 1
                            }
                        ]
                    }
                ]
            })
        .set('shareUuidCommon-v6',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000151,
                    _ver: 6
                },
                uuid: 'shareUuidCommon-v6',
                shareSourceDatatype: [
                    {
                        code: {
                            _value: 1000513,
                            _ver: 2
                        },
                        shareSourceSource: [
                            {
                                _value: 1000201,
                                _ver: 1
                            }
                        ]
                    },
                    {
                        code: {
                            _value: 1000523,
                            _ver: 2
                        },
                        shareSourceSource: [
                            {
                                _value: 1000201,
                                _ver: 1
                            }
                        ]
                    }
                ]
            })
    )
);
// App04, store-eventのみ、一部ver(ver2, ver5)欠落
storeEventNotificationMap.set('1000132_1', new Map()
    .set(1000152, new Map()
        .set('shareUuidApp03ToApp04-v1',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000152,
                    _ver: 1
                },
                uuid: 'shareUuidApp03ToApp04-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidApp04ToApp04-v1',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000152,
                    _ver: 1
                },
                uuid: 'shareUuidApp04ToApp04-v1',
                shareSourceDatatype: null
            })
    )
);
storeEventNotificationMap.set('1000132_3', new Map()
    .set(1000152, new Map()
        .set('shareUuidApp03ToApp04-v1',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000152,
                    _ver: 3
                },
                uuid: 'shareUuidApp03ToApp04-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidApp04ToApp04-v1',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000152,
                    _ver: 3
                },
                uuid: 'shareUuidApp04ToApp04-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidApp03ToApp04-v2',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000152,
                    _ver: 3
                },
                uuid: 'shareUuidApp03ToApp04-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidApp04ToApp04-v2',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000152,
                    _ver: 3
                },
                uuid: 'shareUuidApp04ToApp04-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidApp03ToApp04-v3',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000152,
                    _ver: 3
                },
                uuid: 'shareUuidApp03ToApp04-v3',
                shareSourceDatatype: null
            })
        .set('shareUuidApp04ToApp04-v3',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000152,
                    _ver: 3
                },
                uuid: 'shareUuidApp04ToApp04-v3',
                shareSourceDatatype: null
            })
    )
);
storeEventNotificationMap.set('1000132_4', new Map()
    .set(1000152, new Map()
        .set('shareUuidApp03ToApp04-v1',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000152,
                    _ver: 4
                },
                uuid: 'shareUuidApp03ToApp04-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidApp04ToApp04-v1',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000152,
                    _ver: 4
                },
                uuid: 'shareUuidApp04ToApp04-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidApp03ToApp04-v2',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000152,
                    _ver: 4
                },
                uuid: 'shareUuidApp03ToApp04-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidApp04ToApp04-v2',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000152,
                    _ver: 4
                },
                uuid: 'shareUuidApp04ToApp04-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidApp03ToApp04-v3',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000152,
                    _ver: 4
                },
                uuid: 'shareUuidApp03ToApp04-v3',
                shareSourceDatatype: null
            })
        .set('shareUuidApp04ToApp04-v3',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000152,
                    _ver: 4
                },
                uuid: 'shareUuidApp04ToApp04-v3',
                shareSourceDatatype: null
            })
        .set('shareUuidApp03ToApp04-v4',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000152,
                    _ver: 4
                },
                uuid: 'shareUuidApp03ToApp04-v4',
                shareSourceDatatype: null
            })
        .set('shareUuidApp04ToApp04-v4',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000152,
                    _ver: 4
                },
                uuid: 'shareUuidApp04ToApp04-v4',
                shareSourceDatatype: null
            })
    )
);
storeEventNotificationMap.set('1000132_6', new Map()
    .set(1000152, new Map()
        .set('shareUuidApp03ToApp04-v1',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000152,
                    _ver: 6
                },
                uuid: 'shareUuidApp03ToApp04-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidApp04ToApp04-v1',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000152,
                    _ver: 6
                },
                uuid: 'shareUuidApp04ToApp04-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidApp03ToApp04-v2',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000152,
                    _ver: 6
                },
                uuid: 'shareUuidApp03ToApp04-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidApp04ToApp04-v2',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000152,
                    _ver: 6
                },
                uuid: 'shareUuidApp04ToApp04-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidApp03ToApp04-v3',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000152,
                    _ver: 6
                },
                uuid: 'shareUuidApp03ToApp04-v3',
                shareSourceDatatype: null
            })
        .set('shareUuidApp04ToApp04-v3',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000152,
                    _ver: 6
                },
                uuid: 'shareUuidApp04ToApp04-v3',
                shareSourceDatatype: null
            })
        .set('shareUuidApp03ToApp04-v4',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000152,
                    _ver: 6
                },
                uuid: 'shareUuidApp03ToApp04-v4',
                shareSourceDatatype: null
            })
        .set('shareUuidApp04ToApp04-v4',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000152,
                    _ver: 6
                },
                uuid: 'shareUuidApp04ToApp04-v4',
                shareSourceDatatype: null
            })
        .set('shareUuidApp03ToApp04-v5',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000152,
                    _ver: 6
                },
                uuid: 'shareUuidApp03ToApp04-v5',
                shareSourceDatatype: null
            })
        .set('shareUuidApp04ToApp04-v5',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000152,
                    _ver: 6
                },
                uuid: 'shareUuidApp04ToApp04-v5',
                shareSourceDatatype: null
            })
        .set('shareUuidApp03ToApp04-v6',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000152,
                    _ver: 6
                },
                uuid: 'shareUuidApp03ToApp04-v6',
                shareSourceDatatype: null
            })
        .set('shareUuidApp04ToApp04-v6',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000152,
                    _ver: 6
                },
                uuid: 'shareUuidApp04ToApp04-v6',
                shareSourceDatatype: null
            })
    )
);

// App04, store-eventのみ、複数の共有定義に同一データ種あり
storeEventNotificationMap.set('1000133_6', new Map()
    .set(1000153, new Map()
        .set('shareUuidApp03ToApp04-v1',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000153,
                    _ver: 6
                },
                uuid: 'shareUuidApp03ToApp04-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidApp04ToApp04-v1',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000153,
                    _ver: 6
                },
                uuid: 'shareUuidApp04ToApp04-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidApp03ToApp04-v2',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000153,
                    _ver: 6
                },
                uuid: 'shareUuidApp03ToApp04-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidApp04ToApp04-v2',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000153,
                    _ver: 6
                },
                uuid: 'shareUuidApp04ToApp04-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidApp03ToApp04-v3',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000153,
                    _ver: 6
                },
                uuid: 'shareUuidApp03ToApp04-v3',
                shareSourceDatatype: null
            })
        .set('shareUuidApp04ToApp04-v3',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000153,
                    _ver: 6
                },
                uuid: 'shareUuidApp04ToApp04-v3',
                shareSourceDatatype: null
            })
        .set('shareUuidApp03ToApp04-v4',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000153,
                    _ver: 6
                },
                uuid: 'shareUuidApp03ToApp04-v4',
                shareSourceDatatype: null
            })
        .set('shareUuidApp04ToApp04-v4',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000153,
                    _ver: 6
                },
                uuid: 'shareUuidApp04ToApp04-v4',
                shareSourceDatatype: null
            })
        .set('shareUuidApp03ToApp04-v5',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000153,
                    _ver: 6
                },
                uuid: 'shareUuidApp03ToApp04-v5',
                shareSourceDatatype: null
            })
        .set('shareUuidApp04ToApp04-v5',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000153,
                    _ver: 6
                },
                uuid: 'shareUuidApp04ToApp04-v5',
                shareSourceDatatype: null
            })
        .set('shareUuidApp03ToApp04-v6',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000153,
                    _ver: 6
                },
                uuid: 'shareUuidApp03ToApp04-v6',
                shareSourceDatatype: null
            })
        .set('shareUuidApp04ToApp04-v6',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000153,
                    _ver: 6
                },
                uuid: 'shareUuidApp04ToApp04-v6',
                shareSourceDatatype: null
            })
    )
);
// app01, store-event, share-trigger両方あり
storeEventNotificationMap.set('1000230_1', new Map()
    .set(1000250, new Map()
        .set('shareUuidApp01ToApp01-v1',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 1
                },
                uuid: 'shareUuidApp01ToApp01-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v1',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 1
                },
                uuid: 'shareUuidCommon-v1',
                shareSourceDatatype: null
            })
    )
    .set(1000260, new Map()
        .set('shareUuidApp01ToApp01-v1',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 1
                },
                uuid: 'shareUuidApp01ToApp01-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v1',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 1
                },
                uuid: 'shareUuidCommon-v1',
                shareSourceDatatype: null
            })
    )
);
storeEventNotificationMap.set('1000230_2', new Map()
    .set(1000250, new Map()
        .set('shareUuidApp01ToApp01-v1',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 2
                },
                uuid: 'shareUuidApp01ToApp01-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v1',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 2
                },
                uuid: 'shareUuidCommon-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp01-v2',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 2
                },
                uuid: 'shareUuidApp01ToApp01-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v2',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 2
                },
                uuid: 'shareUuidCommon-v2',
                shareSourceDatatype: null
            })
    )
    .set(1000260, new Map()
        .set('shareUuidApp01ToApp01-v1',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 2
                },
                uuid: 'shareUuidApp01ToApp01-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v1',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 2
                },
                uuid: 'shareUuidCommon-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp01-v2',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 2
                },
                uuid: 'shareUuidApp01ToApp01-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v2',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 2
                },
                uuid: 'shareUuidCommon-v2',
                shareSourceDatatype: null
            })
    )
);
storeEventNotificationMap.set('1000230_3', new Map()
    .set(1000250, new Map()
        .set('shareUuidApp01ToApp01-v1',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 3
                },
                uuid: 'shareUuidApp01ToApp01-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v1',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 3
                },
                uuid: 'shareUuidCommon-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp01-v2',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 3
                },
                uuid: 'shareUuidApp01ToApp01-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v2',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 3
                },
                uuid: 'shareUuidCommon-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp01-v3',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 3
                },
                uuid: 'shareUuidApp01ToApp01-v3',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v3',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 3
                },
                uuid: 'shareUuidCommon-v3',
                shareSourceDatatype: null
            })
    )
    .set(1000260, new Map()
        .set('shareUuidApp01ToApp01-v1',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 3
                },
                uuid: 'shareUuidApp01ToApp01-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v1',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 3
                },
                uuid: 'shareUuidCommon-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp01-v2',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 3
                },
                uuid: 'shareUuidApp01ToApp01-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v2',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 3
                },
                uuid: 'shareUuidCommon-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp01-v3',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 3
                },
                uuid: 'shareUuidApp01ToApp01-v3',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v3',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 3
                },
                uuid: 'shareUuidCommon-v3',
                shareSourceDatatype: null
            })
    )
);
storeEventNotificationMap.set('1000230_4', new Map()
    .set(1000250, new Map()
        .set('shareUuidApp01ToApp01-v1',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 4
                },
                uuid: 'shareUuidApp01ToApp01-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v1',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 4
                },
                uuid: 'shareUuidCommon-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp01-v2',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 4
                },
                uuid: 'shareUuidApp01ToApp01-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v2',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 4
                },
                uuid: 'shareUuidCommon-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp01-v3',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 4
                },
                uuid: 'shareUuidApp01ToApp01-v3',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v3',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 4
                },
                uuid: 'shareUuidCommon-v3',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp01-v4',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 4
                },
                uuid: 'shareUuidApp01ToApp01-v4',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v4',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 4
                },
                uuid: 'shareUuidCommon-v4',
                shareSourceDatatype: null
            })
    )
    .set(1000260, new Map()
        .set('shareUuidApp01ToApp01-v1',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 4
                },
                uuid: 'shareUuidApp01ToApp01-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v1',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 4
                },
                uuid: 'shareUuidCommon-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp01-v2',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 4
                },
                uuid: 'shareUuidApp01ToApp01-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v2',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 4
                },
                uuid: 'shareUuidCommon-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp01-v3',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 4
                },
                uuid: 'shareUuidApp01ToApp01-v3',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v3',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 4
                },
                uuid: 'shareUuidCommon-v3',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp01-v4',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 4
                },
                uuid: 'shareUuidApp01ToApp01-v4',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v4',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 4
                },
                uuid: 'shareUuidCommon-v4',
                shareSourceDatatype: null
            })
    )
);
storeEventNotificationMap.set('1000230_5', new Map()
    .set(1000250, new Map()
        .set('shareUuidApp01ToApp01-v1',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 5
                },
                uuid: 'shareUuidApp01ToApp01-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v1',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 5
                },
                uuid: 'shareUuidCommon-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp01-v2',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 5
                },
                uuid: 'shareUuidApp01ToApp01-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v2',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 5
                },
                uuid: 'shareUuidCommon-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp01-v3',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 5
                },
                uuid: 'shareUuidApp01ToApp01-v3',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v3',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 5
                },
                uuid: 'shareUuidCommon-v3',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp01-v4',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 5
                },
                uuid: 'shareUuidApp01ToApp01-v4',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v4',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 5
                },
                uuid: 'shareUuidCommon-v4',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp01-v5',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 5
                },
                uuid: 'shareUuidApp01ToApp01-v5',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v5',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 5
                },
                uuid: 'shareUuidCommon-v5',
                shareSourceDatatype: null
            })
    )
    .set(1000260, new Map()
        .set('shareUuidApp01ToApp01-v1',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 5
                },
                uuid: 'shareUuidApp01ToApp01-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v1',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 5
                },
                uuid: 'shareUuidCommon-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp01-v2',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 5
                },
                uuid: 'shareUuidApp01ToApp01-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v2',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 5
                },
                uuid: 'shareUuidCommon-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp01-v3',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 5
                },
                uuid: 'shareUuidApp01ToApp01-v3',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v3',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 5
                },
                uuid: 'shareUuidCommon-v3',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp01-v4',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 5
                },
                uuid: 'shareUuidApp01ToApp01-v4',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v4',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 5
                },
                uuid: 'shareUuidCommon-v4',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp01-v5',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 5
                },
                uuid: 'shareUuidApp01ToApp01-v5',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v5',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 5
                },
                uuid: 'shareUuidCommon-v5',
                shareSourceDatatype: null
            })
    )
);
storeEventNotificationMap.set('1000230_6', new Map()
    .set(1000250, new Map()
        .set('shareUuidApp01ToApp01-v1',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 6
                },
                uuid: 'shareUuidApp01ToApp01-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v1',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 6
                },
                uuid: 'shareUuidCommon-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp01-v2',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 6
                },
                uuid: 'shareUuidApp01ToApp01-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v2',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 6
                },
                uuid: 'shareUuidCommon-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp01-v3',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 6
                },
                uuid: 'shareUuidApp01ToApp01-v3',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v3',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 6
                },
                uuid: 'shareUuidCommon-v3',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp01-v4',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 6
                },
                uuid: 'shareUuidApp01ToApp01-v4',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v4',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 6
                },
                uuid: 'shareUuidCommon-v4',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp01-v5',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 6
                },
                uuid: 'shareUuidApp01ToApp01-v5',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v5',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 6
                },
                uuid: 'shareUuidCommon-v5',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp03-v6',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 6
                },
                uuid: 'shareUuidApp01ToApp01-v6',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v6',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000250,
                    _ver: 6
                },
                uuid: 'shareUuidCommon-v6',
                shareSourceDatatype: null
            })
    )
    .set(1000260, new Map()
        .set('shareUuidApp01ToApp01-v1',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 6
                },
                uuid: 'shareUuidApp01ToApp01-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v1',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 6
                },
                uuid: 'shareUuidCommon-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp01-v2',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 6
                },
                uuid: 'shareUuidApp01ToApp01-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v2',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 6
                },
                uuid: 'shareUuidCommon-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp01-v3',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 6
                },
                uuid: 'shareUuidApp01ToApp01-v3',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v3',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 6
                },
                uuid: 'shareUuidCommon-v3',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp01-v4',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 6
                },
                uuid: 'shareUuidApp01ToApp01-v4',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v4',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 6
                },
                uuid: 'shareUuidCommon-v4',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp01-v5',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 6
                },
                uuid: 'shareUuidApp01ToApp01-v5',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v5',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 6
                },
                uuid: 'shareUuidCommon-v5',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp03-v6',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 6
                },
                uuid: 'shareUuidApp01ToApp01-v6',
                shareSourceDatatype: null
            })
        .set('shareUuidCommon-v6',
            {
                type: 'share-trigger',
                notificationCatalogCode: {
                    _value: 1000260,
                    _ver: 6
                },
                uuid: 'shareUuidCommon-v6',
                shareSourceDatatype: null
            })
    )
);
// app02, store-eventのみ、共有元指定あり
storeEventNotificationMap.set('1000231_4', new Map()
    .set(1000251, new Map()
        .set('shareUuidCommon-v1',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000251,
                    _ver: 4
                },
                uuid: 'shareUuidCommon-v1',
                shareSourceDatatype: []
            })
        .set('shareUuidCommon-v2',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000251,
                    _ver: 4
                },
                uuid: 'shareUuidCommon-v2',
                shareSourceDatatype: []
            })
        .set('shareUuidCommon-v3',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000251,
                    _ver: 4
                },
                uuid: 'shareUuidCommon-v3',
                shareSourceDatatype: []
            })
        .set('shareUuidCommon-v4',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000251,
                    _ver: 4
                },
                uuid: 'shareUuidCommon-v4',
                shareSourceDatatype: [
                    {
                        code: {
                            _value: 1000512,
                            _ver: 1
                        },
                        shareSourceSource: [
                            {
                                _value: 1000101,
                                _ver: 1
                            }
                        ]
                    },
                    {
                        code: {
                            _value: 1000522,
                            _ver: 1
                        },
                        shareSourceSource: [
                            {
                                _value: 1000101,
                                _ver: 1
                            }
                        ]
                    }
                ]
            })
    )
);
storeEventNotificationMap.set('1000231_5', new Map()
    .set(1000251, new Map()
        .set('shareUuidCommon-v1',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000251,
                    _ver: 5
                },
                uuid: 'shareUuidCommon-v1',
                shareSourceDatatype: []
            })
        .set('shareUuidCommon-v2',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000251,
                    _ver: 5
                },
                uuid: 'shareUuidCommon-v2',
                shareSourceDatatype: []
            })
        .set('shareUuidCommon-v3',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000251,
                    _ver: 5
                },
                uuid: 'shareUuidCommon-v3',
                shareSourceDatatype: []
            })
        .set('shareUuidCommon-v4',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000251,
                    _ver: 5
                },
                uuid: 'shareUuidCommon-v4',
                shareSourceDatatype: [
                    {
                        code: {
                            _value: 1000512,
                            _ver: 1
                        },
                        shareSourceSource: [
                            {
                                _value: 1000101,
                                _ver: 1
                            }
                        ]
                    },
                    {
                        code: {
                            _value: 1000522,
                            _ver: 1
                        },
                        shareSourceSource: [
                            {
                                _value: 1000101,
                                _ver: 1
                            }
                        ]
                    }
                ]
            })
        .set('shareUuidCommon-v5',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000251,
                    _ver: 5
                },
                uuid: 'shareUuidCommon-v5',
                shareSourceDatatype: [
                    {
                        code: {
                            _value: 1000512,
                            _ver: 2
                        },
                        shareSourceSource: [
                            {
                                _value: 1000101,
                                _ver: 1
                            }
                        ]
                    },
                    {
                        code: {
                            _value: 1000522,
                            _ver: 2
                        },
                        shareSourceSource: [
                            {
                                _value: 1000101,
                                _ver: 1
                            }
                        ]
                    },
                    {
                        code: {
                            _value: 1000513,
                            _ver: 1
                        },
                        shareSourceSource: [
                            {
                                _value: 1000201,
                                _ver: 1
                            }
                        ]
                    },
                    {
                        code: {
                            _value: 1000523,
                            _ver: 1
                        },
                        shareSourceSource: [
                            {
                                _value: 1000201,
                                _ver: 1
                            }
                        ]
                    }
                ]
            })
    )
);
storeEventNotificationMap.set('1000231_6', new Map()
    .set(1000251, new Map()
        .set('shareUuidCommon-v1',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000251,
                    _ver: 6
                },
                uuid: 'shareUuidCommon-v1',
                shareSourceDatatype: []
            })
        .set('shareUuidCommon-v2',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000251,
                    _ver: 6
                },
                uuid: 'shareUuidCommon-v2',
                shareSourceDatatype: []
            })
        .set('shareUuidCommon-v3',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000251,
                    _ver: 6
                },
                uuid: 'shareUuidCommon-v3',
                shareSourceDatatype: []
            })
        .set('shareUuidCommon-v4',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000251,
                    _ver: 6
                },
                uuid: 'shareUuidCommon-v4',
                shareSourceDatatype: [
                    {
                        code: {
                            _value: 1000512,
                            _ver: 1
                        },
                        shareSourceSource: [
                            {
                                _value: 1000101,
                                _ver: 1
                            }
                        ]
                    },
                    {
                        code: {
                            _value: 1000522,
                            _ver: 1
                        },
                        shareSourceSource: [
                            {
                                _value: 1000101,
                                _ver: 1
                            }
                        ]
                    }
                ]
            })
        .set('shareUuidCommon-v5',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000251,
                    _ver: 6
                },
                uuid: 'shareUuidCommon-v5',
                shareSourceDatatype: [
                    {
                        code: {
                            _value: 1000512,
                            _ver: 2
                        },
                        shareSourceSource: [
                            {
                                _value: 1000101,
                                _ver: 1
                            }
                        ]
                    },
                    {
                        code: {
                            _value: 1000522,
                            _ver: 2
                        },
                        shareSourceSource: [
                            {
                                _value: 1000101,
                                _ver: 1
                            }
                        ]
                    },
                    {
                        code: {
                            _value: 1000513,
                            _ver: 1
                        },
                        shareSourceSource: [
                            {
                                _value: 1000201,
                                _ver: 1
                            }
                        ]
                    },
                    {
                        code: {
                            _value: 1000523,
                            _ver: 1
                        },
                        shareSourceSource: [
                            {
                                _value: 1000201,
                                _ver: 1
                            }
                        ]
                    }
                ]
            })
        .set('shareUuidCommon-v6',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000251,
                    _ver: 6
                },
                uuid: 'shareUuidCommon-v6',
                shareSourceDatatype: [
                    {
                        code: {
                            _value: 1000513,
                            _ver: 2
                        },
                        shareSourceSource: [
                            {
                                _value: 1000201,
                                _ver: 1
                            }
                        ]
                    },
                    {
                        code: {
                            _value: 1000523,
                            _ver: 2
                        },
                        shareSourceSource: [
                            {
                                _value: 1000201,
                                _ver: 1
                            }
                        ]
                    }
                ]
            })
    )
);
// app02, store-eventのみ、一部ver(ver2, ver5)欠落
storeEventNotificationMap.set('1000232_1', new Map()
    .set(1000252, new Map()
        .set('shareUuidApp01ToApp02-v1',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000252,
                    _ver: 1
                },
                uuid: 'shareUuidApp01ToApp02-v1',
                shareSourceDatatype: null
            })
        .set('shareUuidApp02ToApp02-v1',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000252,
                    _ver: 1
                },
                uuid: 'shareUuidApp02ToApp02-v1',
                shareSourceDatatype: null
            })
    )
);
storeEventNotificationMap.set('1000232_3', new Map()
    .set(1000252, new Map()
        .set('shareUuidApp01ToApp02-v2',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000252,
                    _ver: 3
                },
                uuid: 'shareUuidApp01ToApp02-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidApp02ToApp02-v2',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000252,
                    _ver: 3
                },
                uuid: 'shareUuidApp02ToApp02-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp02-v2',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000252,
                    _ver: 3
                },
                uuid: 'shareUuidApp01ToApp02-v3',
                shareSourceDatatype: null
            })
        .set('shareUuidApp02ToApp02-v3',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000252,
                    _ver: 3
                },
                uuid: 'shareUuidApp02ToApp02-v3',
                shareSourceDatatype: null
            })
    )
);
storeEventNotificationMap.set('1000232_4', new Map()
    .set(1000252, new Map()
        .set('shareUuidApp01ToApp02-v2',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000252,
                    _ver: 4
                },
                uuid: 'shareUuidApp01ToApp02-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidApp02ToApp02-v2',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000252,
                    _ver: 4
                },
                uuid: 'shareUuidApp02ToApp02-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp02-v3',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000252,
                    _ver: 4
                },
                uuid: 'shareUuidApp01ToApp02-v3',
                shareSourceDatatype: null
            })
        .set('shareUuidApp02ToApp02-v3',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000252,
                    _ver: 4
                },
                uuid: 'shareUuidApp02ToApp02-v3',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp02-v4',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000252,
                    _ver: 4
                },
                uuid: 'shareUuidApp01ToApp02-v4',
                shareSourceDatatype: null
            })
        .set('shareUuidApp02ToApp02-v4',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000252,
                    _ver: 4
                },
                uuid: 'shareUuidApp02ToApp02-v4',
                shareSourceDatatype: null
            })
    )
);
storeEventNotificationMap.set('1000232_6', new Map()
    .set(1000252, new Map()
        .set('shareUuidApp01ToApp02-v2',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000252,
                    _ver: 6
                },
                uuid: 'shareUuidApp01ToApp02-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidApp02ToApp02-v2',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000252,
                    _ver: 6
                },
                uuid: 'shareUuidApp02ToApp02-v2',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp02-v3',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000252,
                    _ver: 6
                },
                uuid: 'shareUuidApp01ToApp02-v3',
                shareSourceDatatype: null
            })
        .set('shareUuidApp02ToApp02-v3',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000252,
                    _ver: 6
                },
                uuid: 'shareUuidApp02ToApp02-v3',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp02-v4',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000252,
                    _ver: 6
                },
                uuid: 'shareUuidApp01ToApp02-v4',
                shareSourceDatatype: null
            })
        .set('shareUuidApp02ToApp02-v4',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000252,
                    _ver: 6
                },
                uuid: 'shareUuidApp02ToApp02-v4',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp02-v5',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000252,
                    _ver: 6
                },
                uuid: 'shareUuidApp01ToApp02-v5',
                shareSourceDatatype: null
            })
        .set('shareUuidApp02ToApp02-v5',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000252,
                    _ver: 6
                },
                uuid: 'shareUuidApp02ToApp02-v5',
                shareSourceDatatype: null
            })
        .set('shareUuidApp01ToApp02-v6',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000252,
                    _ver: 6
                },
                uuid: 'shareUuidApp01ToApp02-v6',
                shareSourceDatatype: null
            })
        .set('shareUuidApp02ToApp02-v6',
            {
                type: 'store-event',
                notificationCatalogCode: {
                    _value: 1000252,
                    _ver: 6
                },
                uuid: 'shareUuidApp02ToApp02-v6',
                shareSourceDatatype: null
            })
    )
);

// 蓄積イベント通知定義取得関数
export const getStoreEventNotifications =
    async (
        shareCatalogCode: number,
        shareCatalogVersion: number
    ): Promise<Map<number, Map<string, IStoreEventNotificate>>> => {
        const key = shareCatalogCode.toString() + '_' + shareCatalogVersion.toString();
        const value = storeEventNotificationMap.get(key);
        if (value) {
            return value;
        } else {
            return null;
        }
    }