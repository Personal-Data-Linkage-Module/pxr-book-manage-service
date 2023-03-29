/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 * セッション情報
 */
export namespace Session {
    /**
    * 正常(流通制御)
    */
    export const PXR_ROOT = JSON.stringify({
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

    /**
    * 正常(データ取引)
    */
    export const DATA_TRADER = JSON.stringify({
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
            _value: 1000109,
            _ver: 1
        },
        actor: {
            _value: 1000020,
            _ver: 1
        }
    });

    /**
    * 正常(データ取引だがactorコードがcatalogItemを取得できないもの)
    */
    export const DATA_TRADER1 = JSON.stringify({
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
            _value: 1000109,
            _ver: 1
        },
        actor: {
            _value: 1,
            _ver: 1
        }
    });

    /**
    * 異常(オペレーター種別が運営メンバー以外)
    */
    export const NOT_OPE_TYPE3 = JSON.stringify({
        sessionId: '494a44bb97aa0ef964f6a666b9019b2d20bf05aa811919833f3e0c0ae2b09b38',
        operatorId: 1,
        type: 1,
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

    /**
    * 異常（オペレーター追加の権限がない）
    */
    export const NOT_ADD_AUTH = JSON.stringify({
        sessionId: '494a44bb97aa0ef964f6a666b9019b2d20bf05aa811919833f3e0c0ae2b09b38',
        operatorId: 1,
        type: 3,
        loginId: 'test-user',
        name: 'test-user',
        mobilePhone: '0311112222',
        auth: {
            member: {
                add: false,
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

    /**
    * 異常（流通制御およびデータ取引以外）
    */
    export const NOT_AUTH_ACTOR = JSON.stringify({
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
            _value: 1000002,
            _ver: 1
        }
    });

    /**
    * 異常（アクター情報がない）
    */
    export const NOT_ACTOR_INFO = JSON.stringify({
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
        }
    });

    /**
    * 異常（BOOK作成権限がない）
    */
    export const NOT_CREATE_BOOK = JSON.stringify({
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
            _value: 1000109,
            _ver: 1
        },
        actor: {
            _value: 1000021,
            _ver: 1
        }
    });

    /**
    * 異常（cotalogItemがない）
    */
    export const NOT_CATALOG_ITEM = JSON.stringify({
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
            _value: 1000109,
            _ver: 1
        },
        actor: {
            _value: 1000022,
            _ver: 1
        }
    });
}
