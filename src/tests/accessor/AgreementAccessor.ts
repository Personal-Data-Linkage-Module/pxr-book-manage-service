/* eslint-disable */
import { IDataOperationAsset } from 'common/DataOperationRequest';
import { AGREEMENT_TYPE, IAgreementForAsset, IAgreementForDataType } from 'common/PermissionAnalyzer';
import { CodeObject } from 'resources/dto/PostBookOpenReqDto';

/**
 * アセットマップ
 * キー: アセットコード
 * 値: {
 * アクターコード, 
 * アセットコード, 
 * 蓄積同意フラグマップ, 
 * 共有同意フラグマップ
 * }
 */
const assetMap: Map<number, {actorCode: number, assetCode: number, storeAgreementFlgMap: Map<number, boolean>, shareAgreementFlgMap: Map<number, boolean>}> = new Map()
.set(1000110, {
    actorCode: 1000101,
    assetCode: 1000110,
    storeAgreementFlgMap: new Map().set(1000120, true),
    shareAgreementFlgMap: new Map().set(1000130, true)
})
.set(1000111, {
    actorCode: 1000101,
    assetCode: 1000111,
    storeAgreementFlgMap: new Map().set(1000121, true).set(1000122, true).set(1000123, true),
    shareAgreementFlgMap: new Map().set(1000131, true).set(1000132, true).set(1000133, true)
})
.set(1000112, {
    actorCode: 1000101,
    assetCode: 1000112,
    storeAgreementFlgMap: new Map(),
    shareAgreementFlgMap: new Map()
})
.set(1000210, {
    actorCode: 1000201,
    assetCode: 1000210,
    storeAgreementFlgMap: new Map().set(1000220, true),
    shareAgreementFlgMap: new Map().set(1000230, true)
})
.set(1000211, {
    actorCode: 1000201,
    assetCode: 1000211,
    storeAgreementFlgMap: new Map().set(1000221, true).set(1000222, true),
    shareAgreementFlgMap: new Map().set(1000231, true).set(1000232, true)
})

// 同意バージョン管理用変数
let version: number = 1;

/**
 * 同意バージョン変更関数
 * @param setVersion 設定するバージョン情報
 */
export const changeAgreementVersion = (setVersion: number): void => {
    version = setVersion;
}

/**
 * 同意状態変更関数
 * @param assetCode 対象定義と紐づくアセットコード
 * @param type 'store' | 'share'
 * @param codeValue 対象定義カタログコード
 * @param flg 設定する同意状態
 */
export const changeAgreement = (assetCode: number, type: 'store' | 'share', codeValue: number, flg: boolean): void => {
    const asset = assetMap.get(assetCode);
    type === 'store' ? asset.storeAgreementFlgMap.set(codeValue, flg)
        : asset.shareAgreementFlgMap.set(codeValue, flg);
};

/**
 * 個人同意フラグ変更関数
 * @param operationDatatypeList 対象データ操作定義バージョンで追加されるデータ種配列
 * @param code 対象データ種コード・バージョン
 * @param flg 設定するconsentFlg
 */
export const changeConsentFlg = (operationDatatypeList: IAgreementForDataType[], code: CodeObject, flg: boolean): void => {
    const targetDatatype = operationDatatypeList.find((ele) => ele.code._value === code._value && ele.code._ver === code._ver);
    targetDatatype.consentFlag = flg;
};



// データ操作定義バージョンごとに追加するデータ種配列
// app01の蓄積定義1
export const storeDatatype1000220_1: IAgreementForDataType[] = [
    {
        uuid: 'storeUuidCommon-v1',
        type: 'document',
        code: {
            _value: 1000501,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v1',
        type: 'event',
        code: {
            _value: 1000511,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v1',
        type: 'thing',
        code: {
            _value: 1000521,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp01-v1',
        type: 'document',
        code: {
            _value: 1000801,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp01-v1',
        type: 'event',
        code: {
            _value: 1000811,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp01-v1',
        type: 'thing',
        code: {
            _value: 1000821,
            _ver: 1
        },
        consentFlag: true
    }
]
export const storeDatatype1000220_2: IAgreementForDataType[] = [
    {
        uuid: 'storeUuidCommon-v2',
        type: 'event',
        code: {
            _value: 1000511,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v2',
        type: 'thing',
        code: {
            _value: 1000521,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp01-v2',
        type: 'event',
        code: {
            _value: 1000811,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp01-v2',
        type: 'thing',
        code: {
            _value: 1000821,
            _ver: 2
        },
        consentFlag: true
    }
]
export const storeDatatype1000220_3: IAgreementForDataType[] = [
    {
        uuid: 'storeUuidCommon-v3',
        type: 'document',
        code: {
            _value: 1000501,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp01-v3',
        type: 'document',
        code: {
            _value: 1000801,
            _ver: 2
        },
        consentFlag: true
    }
]
export const storeDatatype1000220_4: IAgreementForDataType[] = [
    {
        uuid: 'storeUuidCommon-v4',
        type: 'document',
        code: {
            _value: 1000502,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v4',
        type: 'event',
        code: {
            _value: 1000512,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v4',
        type: 'thing',
        code: {
            _value: 1000522,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp01-v4',
        type: 'document',
        code: {
            _value: 1000802,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp01-v4',
        type: 'event',
        code: {
            _value: 1000812,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp01-v4',
        type: 'thing',
        code: {
            _value: 1000822,
            _ver: 1
        },
        consentFlag: true
    }
]
export const storeDatatype1000220_5: IAgreementForDataType[] = [
    {
        uuid: 'storeUuidCommon-v5',
        type: 'document',
        code: {
            _value: 1000503,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v5',
        type: 'event',
        code: {
            _value: 1000512,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v5',
        type: 'event',
        code: {
            _value: 1000513,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v5',
        type: 'event',
        code: {
            _value: 1000514,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v5',
        type: 'thing',
        code: {
            _value: 1000522,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v5',
        type: 'thing',
        code: {
            _value: 1000523,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v5',
        type: 'thing',
        code: {
            _value: 1000524,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v5',
        type: 'thing',
        code: {
            _value: 1000524,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp01-v5',
        type: 'document',
        code: {
            _value: 1000803,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp01-v5',
        type: 'event',
        code: {
            _value: 1000812,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp01-v5',
        type: 'event',
        code: {
            _value: 1000813,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp01-v5',
        type: 'thing',
        code: {
            _value: 1000822,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp01-v5',
        type: 'thing',
        code: {
            _value: 1000823,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp01-v5',
        type: 'thing',
        code: {
            _value: 1000824,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp01-v5',
        type: 'thing',
        code: {
            _value: 1000824,
            _ver: 1
        },
        consentFlag: true
    }
]
export const storeDatatype1000220_6: IAgreementForDataType[] = [
    {
        uuid: 'storeUuidCommon-v6',
        type: 'document',
        code: {
            _value: 1000503,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v6',
        type: 'event',
        code: {
            _value: 1000513,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v6',
        type: 'thing',
        code: {
            _value: 1000523,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v6',
        type: 'thing',
        code: {
            _value: 1000524,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp01-v6',
        type: 'document',
        code: {
            _value: 1000803,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp01-v6',
        type: 'event',
        code: {
            _value: 1000813,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp01-v6',
        type: 'thing',
        code: {
            _value: 1000823,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp01-v6',
        type: 'thing',
        code: {
            _value: 1000824,
            _ver: 2
        },
        consentFlag: true
    }
]

// app02の蓄積定義1 (App04の蓄積定義1も兼用)
export const storeDatatype1000221_1: IAgreementForDataType[] = [
    {
        uuid: 'storeUuidCommon-v1',
        type: 'document',
        code: {
            _value: 1000501,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v1',
        type: 'event',
        code: {
            _value: 1000511,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v1',
        type: 'thing',
        code: {
            _value: 1000521,
            _ver: 1
        },
        consentFlag: true
    }
]
export const storeDatatype1000221_2: IAgreementForDataType[] = [
    {
        uuid: 'storeUuidCommon-v2',
        type: 'event',
        code: {
            _value: 1000511,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v2',
        type: 'thing',
        code: {
            _value: 1000521,
            _ver: 2
        },
        consentFlag: true
    }
]
export const storeDatatype1000221_3: IAgreementForDataType[] = [
    {
        uuid: 'storeUuidCommon-v3',
        type: 'document',
        code: {
            _value: 1000501,
            _ver: 2
        },
        consentFlag: true
    }
]
export const storeDatatype1000221_4: IAgreementForDataType[] = [
    {
        uuid: 'storeUuidCommon-v4',
        type: 'document',
        code: {
            _value: 1000502,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v4',
        type: 'event',
        code: {
            _value: 1000512,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v4',
        type: 'thing',
        code: {
            _value: 1000522,
            _ver: 1
        },
        consentFlag: true
    }
]
export const storeDatatype1000221_5: IAgreementForDataType[] = [
    {
        uuid: 'storeUuidCommon-v5',
        type: 'document',
        code: {
            _value: 1000503,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v5',
        type: 'event',
        code: {
            _value: 1000512,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v5',
        type: 'event',
        code: {
            _value: 1000513,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v5',
        type: 'thing',
        code: {
            _value: 1000522,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v5',
        type: 'thing',
        code: {
            _value: 1000523,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v5',
        type: 'thing',
        code: {
            _value: 1000524,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v5',
        type: 'thing',
        code: {
            _value: 1000524,
            _ver: 1
        },
        consentFlag: true
    }
]
export const storeDatatype1000221_6: IAgreementForDataType[] = [
    {
        uuid: 'storeUuidCommon-v6',
        type: 'document',
        code: {
            _value: 1000503,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v6',
        type: 'event',
        code: {
            _value: 1000513,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v6',
        type: 'thing',
        code: {
            _value: 1000523,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v6',
        type: 'thing',
        code: {
            _value: 1000524,
            _ver: 2
        },
        consentFlag: true
    }
]

// app02の蓄積定義2
export const storeDatatype1000222_1: IAgreementForDataType[] = [
    {
        uuid: 'storeUuidApp02-v1',
        type: 'document',
        code: {
            _value: 1000901,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp02-v1',
        type: 'event',
        code: {
            _value: 1000911,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp02-v1',
        type: 'thing',
        code: {
            _value: 1000921,
            _ver: 1
        },
        consentFlag: true
    }
]
export const storeDatatype1000222_2: IAgreementForDataType[] = [
    {
        uuid: 'storeUuidApp02-v2',
        type: 'event',
        code: {
            _value: 1000911,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp02-v2',
        type: 'thing',
        code: {
            _value: 1000921,
            _ver: 2
        },
        consentFlag: true
    }
]
export const storeDatatype1000222_3: IAgreementForDataType[] = [
    {
        uuid: 'storeUuidApp02-v3',
        type: 'document',
        code: {
            _value: 1000901,
            _ver: 2
        },
        consentFlag: true
    }
]
export const storeDatatype1000222_4: IAgreementForDataType[] = [
    {
        uuid: 'storeUuidApp02-v4',
        type: 'document',
        code: {
            _value: 1000902,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp02-v4',
        type: 'event',
        code: {
            _value: 1000912,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp02-v4',
        type: 'thing',
        code: {
            _value: 1000922,
            _ver: 1
        },
        consentFlag: true
    }
]
export const storeDatatype1000222_5: IAgreementForDataType[] = [
    {
        uuid: 'storeUuidApp02-v5',
        type: 'document',
        code: {
            _value: 1000903,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp02-v5',
        type: 'event',
        code: {
            _value: 1000912,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp02-v5',
        type: 'event',
        code: {
            _value: 1000913,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp02-v5',
        type: 'thing',
        code: {
            _value: 1000922,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp02-v5',
        type: 'thing',
        code: {
            _value: 1000923,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp02-v5',
        type: 'thing',
        code: {
            _value: 1000924,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp02-v5',
        type: 'thing',
        code: {
            _value: 1000924,
            _ver: 1
        },
        consentFlag: true
    }
]
export const storeDatatype1000222_6: IAgreementForDataType[] = [
    {
        uuid: 'storeUuidApp02-v6',
        type: 'document',
        code: {
            _value: 1000903,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp02-v6',
        type: 'event',
        code: {
            _value: 1000913,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp02-v6',
        type: 'thing',
        code: {
            _value: 1000923,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp02-v6',
        type: 'thing',
        code: {
            _value: 1000924,
            _ver: 2
        },
        consentFlag: true
    }
]

// App03の蓄積定義1
export const storeDatatype1000120_1: IAgreementForDataType[] = [
    {
        uuid: 'storeUuidCommon-v1',
        type: 'document',
        code: {
            _value: 1000501,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v1',
        type: 'event',
        code: {
            _value: 1000511,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v1',
        type: 'thing',
        code: {
            _value: 1000521,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp03-v1',
        type: 'document',
        code: {
            _value: 1000601,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp03-v1',
        type: 'event',
        code: {
            _value: 1000611,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp03-v1',
        type: 'thing',
        code: {
            _value: 1000621,
            _ver: 1
        },
        consentFlag: true
    }
]
export const storeDatatype1000120_2: IAgreementForDataType[] = [
    {
        uuid: 'storeUuidCommon-v2',
        type: 'event',
        code: {
            _value: 1000511,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v2',
        type: 'thing',
        code: {
            _value: 1000521,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp03-v2',
        type: 'event',
        code: {
            _value: 1000611,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp03-v2',
        type: 'thing',
        code: {
            _value: 1000621,
            _ver: 2
        },
        consentFlag: true
    }
]
export const storeDatatype1000120_3: IAgreementForDataType[] = [
    {
        uuid: 'storeUuidCommon-v3',
        type: 'document',
        code: {
            _value: 1000501,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp03-v3',
        type: 'document',
        code: {
            _value: 1000601,
            _ver: 2
        },
        consentFlag: true
    }
]
export const storeDatatype1000120_4: IAgreementForDataType[] = [
    {
        uuid: 'storeUuidCommon-v4',
        type: 'document',
        code: {
            _value: 1000502,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v4',
        type: 'event',
        code: {
            _value: 1000512,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v4',
        type: 'thing',
        code: {
            _value: 1000522,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp03-v4',
        type: 'document',
        code: {
            _value: 1000602,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp03-v4',
        type: 'event',
        code: {
            _value: 1000612,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp03-v4',
        type: 'thing',
        code: {
            _value: 1000622,
            _ver: 1
        },
        consentFlag: true
    }
]
export const storeDatatype1000120_5: IAgreementForDataType[] = [
    {
        uuid: 'storeUuidCommon-v5',
        type: 'document',
        code: {
            _value: 1000503,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v5',
        type: 'event',
        code: {
            _value: 1000512,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v5',
        type: 'event',
        code: {
            _value: 1000513,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v5',
        type: 'thing',
        code: {
            _value: 1000522,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v5',
        type: 'thing',
        code: {
            _value: 1000523,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v5',
        type: 'thing',
        code: {
            _value: 1000524,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v5',
        type: 'thing',
        code: {
            _value: 1000524,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp03-v5',
        type: 'document',
        code: {
            _value: 1000603,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp03-v5',
        type: 'event',
        code: {
            _value: 1000612,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp03-v5',
        type: 'event',
        code: {
            _value: 1000613,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp03-v5',
        type: 'thing',
        code: {
            _value: 1000622,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp03-v5',
        type: 'thing',
        code: {
            _value: 1000623,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp03-v5',
        type: 'thing',
        code: {
            _value: 1000624,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp03-v5',
        type: 'thing',
        code: {
            _value: 1000624,
            _ver: 1
        },
        consentFlag: true
    }
]
export const storeDatatype1000120_6: IAgreementForDataType[] = [
    {
        uuid: 'storeUuidCommon-v6',
        type: 'document',
        code: {
            _value: 1000503,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v6',
        type: 'event',
        code: {
            _value: 1000513,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v6',
        type: 'thing',
        code: {
            _value: 1000523,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidCommon-v6',
        type: 'thing',
        code: {
            _value: 1000524,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp03-v6',
        type: 'document',
        code: {
            _value: 1000603,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp03-v6',
        type: 'event',
        code: {
            _value: 1000613,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp03-v6',
        type: 'thing',
        code: {
            _value: 1000623,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp03-v6',
        type: 'thing',
        code: {
            _value: 1000624,
            _ver: 2
        },
        consentFlag: true
    }
]

// App04の蓄積定義2
export const storeDatatype1000122_1: IAgreementForDataType[] = [
    {
        uuid: 'storeUuidApp04-v1',
        type: 'document',
        code: {
            _value: 1000701,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp04-v1',
        type: 'event',
        code: {
            _value: 1000711,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp04-v1',
        type: 'thing',
        code: {
            _value: 1000721,
            _ver: 1
        },
        consentFlag: true
    }
]
export const storeDatatype1000122_2: IAgreementForDataType[] = [
    {
        uuid: 'storeUuidApp04-v2',
        type: 'event',
        code: {
            _value: 1000711,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp04-v2',
        type: 'thing',
        code: {
            _value: 1000721,
            _ver: 2
        },
        consentFlag: true
    }
]
export const storeDatatype1000122_3: IAgreementForDataType[] = [
    {
        uuid: 'storeUuidApp04-v3',
        type: 'document',
        code: {
            _value: 1000701,
            _ver: 2
        },
        consentFlag: true
    }
]
export const storeDatatype1000122_4: IAgreementForDataType[] = [
    {
        uuid: 'storeUuidApp04-v4',
        type: 'document',
        code: {
            _value: 1000702,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp04-v4',
        type: 'event',
        code: {
            _value: 1000712,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp04-v4',
        type: 'thing',
        code: {
            _value: 1000722,
            _ver: 1
        },
        consentFlag: true
    }
]
export const storeDatatype1000122_5: IAgreementForDataType[] = [
    {
        uuid: 'storeUuidApp04-v5',
        type: 'document',
        code: {
            _value: 1000703,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp04-v5',
        type: 'event',
        code: {
            _value: 1000712,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp04-v5',
        type: 'event',
        code: {
            _value: 1000713,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp04-v5',
        type: 'thing',
        code: {
            _value: 1000722,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp04-v5',
        type: 'thing',
        code: {
            _value: 1000723,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp04-v5',
        type: 'thing',
        code: {
            _value: 1000724,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp04-v5',
        type: 'thing',
        code: {
            _value: 1000724,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp04-v5',
        type: 'event',
        code: {
            _value: 1000714,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp04-v5',
        type: 'thing',
        code: {
            _value: 1000725,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp04-v5',
        type: 'event',
        code: {
            _value: 1000714,
            _ver: 1
        },
        consentFlag: false
    },
    {
        uuid: 'storeUuidApp04-v5',
        type: 'thing',
        code: {
            _value: 1000726,
            _ver: 1
        },
        consentFlag: false
    },
    {
        uuid: 'storeUuidApp04-v5',
        type: 'event',
        code: {
            _value: 1000715,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp04-v5',
        type: 'thing',
        code: {
            _value: 1000727,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp04-v5',
        type: 'event',
        code: {
            _value: 1000716,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp04-v5',
        type: 'thing',
        code: {
            _value: 1000727,
            _ver: 1
        },
        consentFlag: false
    }
]
export const storeDatatype1000122_6: IAgreementForDataType[] = [
    {
        uuid: 'storeUuidApp04-v6',
        type: 'document',
        code: {
            _value: 1000703,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp04-v6',
        type: 'event',
        code: {
            _value: 1000713,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp04-v6',
        type: 'thing',
        code: {
            _value: 1000723,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp04-v6',
        type: 'thing',
        code: {
            _value: 1000724,
            _ver: 2
        },
        consentFlag: true
    }
]

// App04の蓄積定義3
export const storeDatatype1000123_6: IAgreementForDataType[] = [
    {
        uuid: 'storeUuidApp04-v6',
        type: 'document',
        code: {
            _value: 1000703,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp04-v6',
        type: 'event',
        code: {
            _value: 1000713,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'storeUuidApp04-v6',
        type: 'thing',
        code: {
            _value: 1000723,
            _ver: 2
        },
        consentFlag: true
    },
    
    {
        uuid: 'storeUuidApp04-v6',
        type: 'thing',
        code: {
            _value: 1000724,
            _ver: 2
        },
        consentFlag: true
    }
]

// app01の共有定義1
export const shareDatatype1000230_1: IAgreementForDataType[] = [
    {
        uuid: 'shareUuidCommon-v1',
        type: 'document',
        code: {
            _value: 1000501,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidCommon-v1',
        type: 'event',
        code: {
            _value: 1000511,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidCommon-v1',
        type: 'thing',
        code: {
            _value: 1000521,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp01-v1',
        type: 'document',
        code: {
            _value: 1000801,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp01-v1',
        type: 'event',
        code: {
            _value: 1000811,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp01-v1',
        type: 'thing',
        code: {
            _value: 1000821,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp01-v1',
        type: 'document',
        code: {
            _value: 1000601,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp01-v1',
        type: 'event',
        code: {
            _value: 1000611,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp01-v1',
        type: 'thing',
        code: {
            _value: 1000621,
            _ver: 1
        },
        consentFlag: true
    }
]
export const shareDatatype1000230_2: IAgreementForDataType[] = [
    {
        uuid: 'shareUuidCommon-v2',
        type: 'event',
        code: {
            _value: 1000511,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidCommon-v2',
        type: 'thing',
        code: {
            _value: 1000521,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp01-v2',
        type: 'event',
        code: {
            _value: 1000811,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp01-v2',
        type: 'thing',
        code: {
            _value: 1000821,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp01-v2',
        type: 'event',
        code: {
            _value: 1000611,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp01-v2',
        type: 'thing',
        code: {
            _value: 1000621,
            _ver: 2
        },
        consentFlag: true
    }
]
export const shareDatatype1000230_3: IAgreementForDataType[] = [
    {
        uuid: 'shareUuidCommon-v3',
        type: 'document',
        code: {
            _value: 1000501,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp01-v3',
        type: 'document',
        code: {
            _value: 1000801,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp01-v3',
        type: 'document',
        code: {
            _value: 1000601,
            _ver: 2
        },
        consentFlag: true
    }
]
export const shareDatatype1000230_4: IAgreementForDataType[] = [
    {
        uuid: 'shareUuidCommon-v4',
        type: 'document',
        code: {
            _value: 1000502,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidCommon-v4',
        type: 'event',
        code: {
            _value: 1000512,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidCommon-v4',
        type: 'thing',
        code: {
            _value: 1000522,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp01-v4',
        type: 'document',
        code: {
            _value: 1000802,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp01-v4',
        type: 'event',
        code: {
            _value: 1000812,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp01-v4',
        type: 'thing',
        code: {
            _value: 1000822,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp01-v4',
        type: 'document',
        code: {
            _value: 1000602,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp01-v4',
        type: 'event',
        code: {
            _value: 1000612,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp01-v4',
        type: 'thing',
        code: {
            _value: 1000622,
            _ver: 1
        },
        consentFlag: true
    }
]
export const shareDatatype1000230_5: IAgreementForDataType[] = [
    {
        uuid: 'shareUuidCommon-v5',
        type: 'document',
        code: {
            _value: 1000503,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidCommon-v5',
        type: 'event',
        code: {
            _value: 1000512,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidCommon-v5',
        type: 'event',
        code: {
            _value: 1000513,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidCommon-v5',
        type: 'thing',
        code: {
            _value: 1000522,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidCommon-v5',
        type: 'thing',
        code: {
            _value: 1000523,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidCommon-v5',
        type: 'thing',
        code: {
            _value: 1000524,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp01-v5',
        type: 'document',
        code: {
            _value: 1000803,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp01-v5',
        type: 'event',
        code: {
            _value: 1000812,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp01-v5',
        type: 'event',
        code: {
            _value: 1000813,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp01-v5',
        type: 'thing',
        code: {
            _value: 1000822,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp01-v5',
        type: 'thing',
        code: {
            _value: 1000823,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp01-v5',
        type: 'thing',
        code: {
            _value: 1000824,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp01-v5',
        type: 'document',
        code: {
            _value: 1000603,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp01-v5',
        type: 'event',
        code: {
            _value: 1000612,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp01-v5',
        type: 'event',
        code: {
            _value: 1000613,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp01-v5',
        type: 'thing',
        code: {
            _value: 1000622,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp01-v5',
        type: 'thing',
        code: {
            _value: 1000623,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp01-v5',
        type: 'thing',
        code: {
            _value: 1000624,
            _ver: 1
        },
        consentFlag: true
    }
]
export const shareDatatype1000230_6: IAgreementForDataType[] = [
    {
        uuid: 'shareUuidCommon-v6',
        type: 'document',
        code: {
            _value: 1000503,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidCommon-v6',
        type: 'event',
        code: {
            _value: 1000513,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidCommon-v6',
        type: 'thing',
        code: {
            _value: 1000523,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidCommon-v6-2',
        type: 'thing',
        code: {
            _value: 1000524,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp01-v6',
        type: 'document',
        code: {
            _value: 1000803,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp01-v6',
        type: 'event',
        code: {
            _value: 1000813,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp01-v6',
        type: 'thing',
        code: {
            _value: 1000823,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp01-v6-2',
        type: 'thing',
        code: {
            _value: 1000824,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp01-v6',
        type: 'document',
        code: {
            _value: 1000603,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp01-v6',
        type: 'event',
        code: {
            _value: 1000613,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp01-v6',
        type: 'thing',
        code: {
            _value: 1000623,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp01-v6-2',
        type: 'thing',
        code: {
            _value: 1000624,
            _ver: 2
        },
        consentFlag: true
    }
]

// app02の共有定義1 (App03の共有定義1: 1000131も兼用)
export const shareDatatype1000231_1: IAgreementForDataType[] = [
    {
        uuid: 'shareUuidCommon-v1',
        type: 'document',
        code: {
            _value: 1000501,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidCommon-v1',
        type: 'event',
        code: {
            _value: 1000511,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidCommon-v1',
        type: 'thing',
        code: {
            _value: 1000521,
            _ver: 1
        },
        consentFlag: true
    }
]
export const shareDatatype1000231_2: IAgreementForDataType[] = [
    {
        uuid: 'shareUuidCommon-v2',
        type: 'event',
        code: {
            _value: 1000511,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidCommon-v2',
        type: 'thing',
        code: {
            _value: 1000521,
            _ver: 2
        },
        consentFlag: true
    }
]
export const shareDatatype1000231_3: IAgreementForDataType[] = [
    {
        uuid: 'shareUuidCommon-v3',
        type: 'document',
        code: {
            _value: 1000501,
            _ver: 2
        },
        consentFlag: true
    }
]
export const shareDatatype1000231_4: IAgreementForDataType[] = [
    {
        uuid: 'shareUuidCommon-v4',
        type: 'document',
        code: {
            _value: 1000502,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidCommon-v4',
        type: 'event',
        code: {
            _value: 1000512,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidCommon-v4',
        type: 'thing',
        code: {
            _value: 1000522,
            _ver: 1
        },
        consentFlag: true
    }
]
export const shareDatatype1000231_5: IAgreementForDataType[] = [
    {
        uuid: 'shareUuidCommon-v5',
        type: 'document',
        code: {
            _value: 1000503,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidCommon-v5',
        type: 'event',
        code: {
            _value: 1000512,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidCommon-v5',
        type: 'event',
        code: {
            _value: 1000513,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidCommon-v5',
        type: 'thing',
        code: {
            _value: 1000522,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidCommon-v5',
        type: 'thing',
        code: {
            _value: 1000523,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidCommon-v5',
        type: 'thing',
        code: {
            _value: 1000524,
            _ver: 1
        },
        consentFlag: true
    }
]
export const shareDatatype1000231_6: IAgreementForDataType[] = [
    {
        uuid: 'shareUuidCommon-v6',
        type: 'document',
        code: {
            _value: 1000503,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidCommon-v6',
        type: 'event',
        code: {
            _value: 1000513,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidCommon-v6',
        type: 'thing',
        code: {
            _value: 1000523,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidCommon-v6-2',
        type: 'thing',
        code: {
            _value: 1000524,
            _ver: 2
        },
        consentFlag: true
    }
]

// app01の共有定義2
export const shareDatatype1000232_1: IAgreementForDataType[] = [
    {
        uuid: 'shareUuidApp01ToApp02-v1',
        type: 'document',
        code: {
            _value: 1000801,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp02-v1',
        type: 'event',
        code: {
            _value: 1000811,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp02-v1',
        type: 'thing',
        code: {
            _value: 1000821,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp02ToApp02-v1',
        type: 'document',
        code: {
            _value: 1000901,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp02ToApp02-v1',
        type: 'event',
        code: {
            _value: 1000911,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp02ToApp02-v1',
        type: 'thing',
        code: {
            _value: 1000921,
            _ver: 1
        },
        consentFlag: true
    }
]
export const shareDatatype1000232_2: IAgreementForDataType[] = [
    {
        uuid: 'shareUuidApp01ToApp02-v2',
        type: 'event',
        code: {
            _value: 1000811,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp02-v2',
        type: 'thing',
        code: {
            _value: 1000821,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp02ToApp02-v2',
        type: 'event',
        code: {
            _value: 1000911,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp02ToApp02-v2',
        type: 'thing',
        code: {
            _value: 1000921,
            _ver: 2
        },
        consentFlag: true
    }
]
export const shareDatatype1000232_3: IAgreementForDataType[] = [
    {
        uuid: 'shareUuidApp01ToApp02-v3',
        type: 'document',
        code: {
            _value: 1000801,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp02ToApp02-v3',
        type: 'document',
        code: {
            _value: 1000901,
            _ver: 2
        },
        consentFlag: true
    }
]
export const shareDatatype1000232_4: IAgreementForDataType[] = [
    {
        uuid: 'shareUuidApp01ToApp02-v4',
        type: 'document',
        code: {
            _value: 1000802,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp02-v4',
        type: 'event',
        code: {
            _value: 1000812,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp02-v4',
        type: 'thing',
        code: {
            _value: 1000822,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp02ToApp02-v4',
        type: 'document',
        code: {
            _value: 1000902,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp02ToApp02-v4',
        type: 'event',
        code: {
            _value: 1000912,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp02ToApp02-v4',
        type: 'thing',
        code: {
            _value: 1000922,
            _ver: 1
        },
        consentFlag: true
    }
]
export const shareDatatype1000232_5: IAgreementForDataType[] = [
    {
        uuid: 'shareUuidApp01ToApp02-v5',
        type: 'document',
        code: {
            _value: 1000803,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp02-v5',
        type: 'event',
        code: {
            _value: 1000812,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp02-v5',
        type: 'event',
        code: {
            _value: 1000813,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp02-v5',
        type: 'thing',
        code: {
            _value: 1000822,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp02-v5',
        type: 'thing',
        code: {
            _value: 1000823,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp02-v5',
        type: 'thing',
        code: {
            _value: 1000824,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp02ToApp02-v5',
        type: 'document',
        code: {
            _value: 1000903,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp02ToApp02-v5',
        type: 'event',
        code: {
            _value: 1000912,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp02ToApp02-v5',
        type: 'event',
        code: {
            _value: 1000913,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp02ToApp02-v5',
        type: 'thing',
        code: {
            _value: 1000922,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp02ToApp02-v5',
        type: 'thing',
        code: {
            _value: 1000923,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp02ToApp02-v5',
        type: 'thing',
        code: {
            _value: 1000924,
            _ver: 1
        },
        consentFlag: true
    }
]
export const shareDatatype1000232_6: IAgreementForDataType[] = [
    {
        uuid: 'shareUuidApp01ToApp02-v6',
        type: 'document',
        code: {
            _value: 1000803,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp02-v6',
        type: 'event',
        code: {
            _value: 1000813,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp02-v6',
        type: 'thing',
        code: {
            _value: 1000823,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp02-v6-2',
        type: 'thing',
        code: {
            _value: 1000824,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp02ToApp02-v6',
        type: 'document',
        code: {
            _value: 1000903,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp02ToApp02-v6',
        type: 'event',
        code: {
            _value: 1000913,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp02ToApp02-v6',
        type: 'thing',
        code: {
            _value: 1000923,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp02ToApp02-v6-2',
        type: 'thing',
        code: {
            _value: 1000924,
            _ver: 2
        },
        consentFlag: true
    }
]

// App03の共有定義1
export const shareDatatype1000130_1: IAgreementForDataType[] = [
    {
        uuid: 'shareUuidCommon-v1',
        type: 'document',
        code: {
            _value: 1000501,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidCommon-v1',
        type: 'event',
        code: {
            _value: 1000511,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidCommon-v1',
        type: 'thing',
        code: {
            _value: 1000521,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp03-v1',
        type: 'document',
        code: {
            _value: 1000801,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp03-v1',
        type: 'event',
        code: {
            _value: 1000811,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp03-v1',
        type: 'thing',
        code: {
            _value: 1000821,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp03-v1',
        type: 'document',
        code: {
            _value: 1000601,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp03-v1',
        type: 'event',
        code: {
            _value: 1000611,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp03-v1',
        type: 'thing',
        code: {
            _value: 1000621,
            _ver: 1
        },
        consentFlag: true
    }
]
export const shareDatatype1000130_2: IAgreementForDataType[] = [
    {
        uuid: 'shareUuidCommon-v2',
        type: 'event',
        code: {
            _value: 1000511,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidCommon-v2',
        type: 'thing',
        code: {
            _value: 1000521,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp03-v2',
        type: 'event',
        code: {
            _value: 1000811,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp03-v2',
        type: 'thing',
        code: {
            _value: 1000821,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp03-v2',
        type: 'event',
        code: {
            _value: 1000611,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp03-v2',
        type: 'thing',
        code: {
            _value: 1000621,
            _ver: 2
        },
        consentFlag: true
    }
]
export const shareDatatype1000130_3: IAgreementForDataType[] = [
    {
        uuid: 'shareUuidCommon-v3',
        type: 'document',
        code: {
            _value: 1000501,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp03-v3',
        type: 'document',
        code: {
            _value: 1000801,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp03-v3',
        type: 'document',
        code: {
            _value: 1000601,
            _ver: 2
        },
        consentFlag: true
    }
]
export const shareDatatype1000130_4: IAgreementForDataType[] = [
    {
        uuid: 'shareUuidCommon-v4',
        type: 'document',
        code: {
            _value: 1000502,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidCommon-v4',
        type: 'event',
        code: {
            _value: 1000512,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidCommon-v4',
        type: 'thing',
        code: {
            _value: 1000522,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp03-v4',
        type: 'document',
        code: {
            _value: 1000802,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp03-v4',
        type: 'event',
        code: {
            _value: 1000812,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp03-v4',
        type: 'thing',
        code: {
            _value: 1000822,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp03-v4',
        type: 'document',
        code: {
            _value: 1000602,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp03-v4',
        type: 'event',
        code: {
            _value: 1000612,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp03-v4',
        type: 'thing',
        code: {
            _value: 1000622,
            _ver: 1
        },
        consentFlag: true
    }
]
export const shareDatatype1000130_5: IAgreementForDataType[] = [
    {
        uuid: 'shareUuidCommon-v5',
        type: 'document',
        code: {
            _value: 1000503,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidCommon-v5',
        type: 'event',
        code: {
            _value: 1000512,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidCommon-v5',
        type: 'event',
        code: {
            _value: 1000513,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidCommon-v5',
        type: 'thing',
        code: {
            _value: 1000522,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidCommon-v5',
        type: 'thing',
        code: {
            _value: 1000523,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidCommon-v5',
        type: 'thing',
        code: {
            _value: 1000524,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp03-v5',
        type: 'document',
        code: {
            _value: 1000803,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp03-v5',
        type: 'event',
        code: {
            _value: 1000812,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp03-v5',
        type: 'event',
        code: {
            _value: 1000813,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp03-v5',
        type: 'thing',
        code: {
            _value: 1000822,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp03-v5',
        type: 'thing',
        code: {
            _value: 1000823,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp03-v5',
        type: 'thing',
        code: {
            _value: 1000824,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp03-v5',
        type: 'document',
        code: {
            _value: 1000603,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp03-v5',
        type: 'event',
        code: {
            _value: 1000612,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp03-v5',
        type: 'event',
        code: {
            _value: 1000613,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp03-v5',
        type: 'thing',
        code: {
            _value: 1000622,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp03-v5',
        type: 'thing',
        code: {
            _value: 1000623,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp03-v5',
        type: 'thing',
        code: {
            _value: 1000624,
            _ver: 1
        },
        consentFlag: true
    }
]
export const shareDatatype1000130_6: IAgreementForDataType[] = [
    {
        uuid: 'shareUuidCommon-v6',
        type: 'document',
        code: {
            _value: 1000503,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidCommon-v6',
        type: 'event',
        code: {
            _value: 1000513,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidCommon-v6',
        type: 'thing',
        code: {
            _value: 1000523,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidCommon-v6-2',
        type: 'thing',
        code: {
            _value: 1000524,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp03-v6',
        type: 'document',
        code: {
            _value: 1000803,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp03-v6',
        type: 'event',
        code: {
            _value: 1000813,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp03-v6',
        type: 'thing',
        code: {
            _value: 1000823,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp01ToApp03-v6-2',
        type: 'thing',
        code: {
            _value: 1000824,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp03-v6',
        type: 'document',
        code: {
            _value: 1000603,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp03-v6',
        type: 'event',
        code: {
            _value: 1000613,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp03-v6',
        type: 'thing',
        code: {
            _value: 1000623,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp03-v6-2',
        type: 'thing',
        code: {
            _value: 1000624,
            _ver: 2
        },
        consentFlag: true
    }
]

// App04の共有定義2
export const shareDatatype1000132_1: IAgreementForDataType[] = [
    {
        uuid: 'shareUuidApp04ToApp04-v1',
        type: 'document',
        code: {
            _value: 1000701,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp04ToApp04-v1',
        type: 'event',
        code: {
            _value: 1000711,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp04ToApp04-v1',
        type: 'thing',
        code: {
            _value: 1000721,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp04-v1',
        type: 'document',
        code: {
            _value: 1000601,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp04-v1',
        type: 'event',
        code: {
            _value: 1000611,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp04-v1',
        type: 'thing',
        code: {
            _value: 1000621,
            _ver: 1
        },
        consentFlag: true
    }
]
export const shareDatatype1000132_2: IAgreementForDataType[] = [
    {
        uuid: 'shareUuidApp04ToApp04-v2',
        type: 'event',
        code: {
            _value: 1000711,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp04ToApp04-v2',
        type: 'thing',
        code: {
            _value: 1000721,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp04-v2',
        type: 'event',
        code: {
            _value: 1000611,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp04-v2',
        type: 'thing',
        code: {
            _value: 1000621,
            _ver: 2
        },
        consentFlag: true
    }
]
export const shareDatatype1000132_3: IAgreementForDataType[] = [
    {
        uuid: 'shareUuidApp04ToApp04-v3',
        type: 'document',
        code: {
            _value: 1000701,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp04-v3',
        type: 'document',
        code: {
            _value: 1000601,
            _ver: 2
        },
        consentFlag: true
    }
]
export const shareDatatype1000132_4: IAgreementForDataType[] = [
    {
        uuid: 'shareUuidApp04ToApp04-v4',
        type: 'document',
        code: {
            _value: 1000702,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp04ToApp04-v4',
        type: 'event',
        code: {
            _value: 1000712,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp04ToApp04-v4',
        type: 'thing',
        code: {
            _value: 1000722,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp04-v4',
        type: 'document',
        code: {
            _value: 1000602,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp04-v4',
        type: 'event',
        code: {
            _value: 1000612,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp04-v4',
        type: 'thing',
        code: {
            _value: 1000622,
            _ver: 1
        },
        consentFlag: true
    }
]
export const shareDatatype1000132_5: IAgreementForDataType[] = [
    {
        uuid: 'shareUuidApp04ToApp04-v5',
        type: 'document',
        code: {
            _value: 1000703,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp04ToApp04-v5',
        type: 'event',
        code: {
            _value: 1000712,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp04ToApp04-v5',
        type: 'event',
        code: {
            _value: 1000713,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp04ToApp04-v5',
        type: 'thing',
        code: {
            _value: 1000722,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp04ToApp04-v5',
        type: 'thing',
        code: {
            _value: 1000723,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp04ToApp04-v5',
        type: 'thing',
        code: {
            _value: 1000724,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp04-v5',
        type: 'document',
        code: {
            _value: 1000603,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp04-v5',
        type: 'event',
        code: {
            _value: 1000612,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp04-v5',
        type: 'event',
        code: {
            _value: 1000613,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp04-v5',
        type: 'thing',
        code: {
            _value: 1000622,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp04-v5',
        type: 'thing',
        code: {
            _value: 1000623,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp04-v5',
        type: 'thing',
        code: {
            _value: 1000624,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp04-v5',
        type: 'event',
        code: {
            _value: 1000714,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp04-v5',
        type: 'thing',
        code: {
            _value: 1000725,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp04-v5',
        type: 'event',
        code: {
            _value: 1000714,
            _ver: 1
        },
        consentFlag: false
    },
    {
        uuid: 'shareUuidApp03ToApp04-v5',
        type: 'thing',
        code: {
            _value: 1000726,
            _ver: 1
        },
        consentFlag: false
    },
    {
        uuid: 'shareUuidApp03ToApp04-v5',
        type: 'event',
        code: {
            _value: 1000715,
            _ver: 1
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp04-v5',
        type: 'thing',
        code: {
            _value: 1000726,
            _ver: 1
        },
        consentFlag: true
    }
]
export const shareDatatype1000132_6: IAgreementForDataType[] = [
    {
        uuid: 'shareUuidApp04ToApp04-v6',
        type: 'document',
        code: {
            _value: 1000703,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp04ToApp04-v6',
        type: 'event',
        code: {
            _value: 1000713,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp04ToApp04-v6',
        type: 'thing',
        code: {
            _value: 1000723,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp04ToApp04-v6-2',
        type: 'thing',
        code: {
            _value: 1000724,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp04-v6',
        type: 'document',
        code: {
            _value: 1000603,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp04-v6',
        type: 'event',
        code: {
            _value: 1000613,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp04-v6',
        type: 'thing',
        code: {
            _value: 1000623,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp04-v6-2',
        type: 'thing',
        code: {
            _value: 1000624,
            _ver: 2
        },
        consentFlag: true
    }
]

/**
 * App04の共有定義3
 */
export const shareDatatype1000133_6: IAgreementForDataType[] = [
    {
        uuid: 'shareUuidApp04ToApp04-v6',
        type: 'document',
        code: {
            _value: 1000703,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp04ToApp04-v6',
        type: 'event',
        code: {
            _value: 1000713,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp04ToApp04-v6',
        type: 'thing',
        code: {
            _value: 1000723,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp04ToApp04-v6-2',
        type: 'thing',
        code: {
            _value: 1000724,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp04-v6',
        type: 'document',
        code: {
            _value: 1000603,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp04-v6',
        type: 'event',
        code: {
            _value: 1000613,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp04-v6',
        type: 'thing',
        code: {
            _value: 1000623,
            _ver: 2
        },
        consentFlag: true
    },
    {
        uuid: 'shareUuidApp03ToApp04-v6-2',
        type: 'thing',
        code: {
            _value: 1000624,
            _ver: 2
        },
        consentFlag: true
    }
]

// 蓄積同意データ種追加用Map
// 1000221と1000121は共通データ種のみを含む蓄積定義のため要素を兼用
const storeDatatypeMap: Map<number, IAgreementForDataType[][]> = new Map()
.set(1000220, [storeDatatype1000220_1, storeDatatype1000220_2, storeDatatype1000220_3, storeDatatype1000220_4, storeDatatype1000220_5, storeDatatype1000220_6])
.set(1000221, [storeDatatype1000221_1, storeDatatype1000221_2, storeDatatype1000221_3, storeDatatype1000221_4, storeDatatype1000221_5, storeDatatype1000221_6])
.set(1000222, [storeDatatype1000222_1, storeDatatype1000222_2, storeDatatype1000222_3, storeDatatype1000222_4, storeDatatype1000222_5, storeDatatype1000222_6])
.set(1000120, [storeDatatype1000120_1, storeDatatype1000120_2, storeDatatype1000120_3, storeDatatype1000120_4, storeDatatype1000120_5, storeDatatype1000120_6])
.set(1000121, [storeDatatype1000221_1, storeDatatype1000221_2, storeDatatype1000221_3, storeDatatype1000221_4, storeDatatype1000221_5, storeDatatype1000221_6])
.set(1000122, [storeDatatype1000122_1, storeDatatype1000122_2, storeDatatype1000122_3, storeDatatype1000122_4, storeDatatype1000122_5, storeDatatype1000122_6])
.set(1000123, [storeDatatype1000122_1, storeDatatype1000122_2, storeDatatype1000122_3, storeDatatype1000122_4, storeDatatype1000122_5, storeDatatype1000123_6])


// 共有同意データ種追加用Map
// 1000231と1000131は共通データ種のみを含む共有定義のため要素を兼用
const shareDatatypeMap: Map<number, IAgreementForDataType[][]> = new Map()
.set(1000230, [shareDatatype1000230_1, shareDatatype1000230_2, shareDatatype1000230_3, shareDatatype1000230_4, shareDatatype1000230_5, shareDatatype1000230_6])
.set(1000231, [shareDatatype1000231_1, shareDatatype1000231_2, shareDatatype1000231_3, shareDatatype1000231_4, shareDatatype1000231_5, shareDatatype1000231_6])
.set(1000232, [shareDatatype1000232_1, shareDatatype1000232_2, shareDatatype1000232_3, shareDatatype1000232_4, shareDatatype1000232_5, shareDatatype1000232_6])
.set(1000130, [shareDatatype1000130_1, shareDatatype1000130_2, shareDatatype1000130_3, shareDatatype1000130_4, shareDatatype1000130_5, shareDatatype1000130_6])
.set(1000131, [shareDatatype1000231_1, shareDatatype1000231_2, shareDatatype1000231_3, shareDatatype1000231_4, shareDatatype1000231_5, shareDatatype1000231_6])
.set(1000132, [shareDatatype1000132_1, shareDatatype1000132_2, shareDatatype1000132_3, shareDatatype1000132_4, shareDatatype1000132_5, shareDatatype1000132_6])
.set(1000133, [shareDatatype1000132_1, shareDatatype1000132_2, shareDatatype1000132_3, shareDatatype1000132_4, shareDatatype1000132_5, shareDatatype1000133_6])

// 同意取得関数
export const getAgreement = 
    async (
        pxrId: string,
        type: AGREEMENT_TYPE | null,
        assets: IDataOperationAsset[] | null
    ): Promise<IAgreementForAsset[]> => {
        const resList: IAgreementForAsset[] = [];
        for (const [assetCode, asset] of assetMap) {
            const res: IAgreementForAsset = {
                pxrId: pxrId,
                actor: {
                    _value: asset.actorCode,
                    _ver: 1
                },
                asset: {
                    _value: assetCode,
                    _ver: 1
                },
                store: [],
                share: []
            };
            if (assets && assets.length > 0 && !(assets.some((ele) => ele.asset === assetCode))) {
                // アセット指定の場合、指定されているアセットではないものは蓄積同意を取得しない
                res.store = [];
            } else {
                for (const [codeValue, flg] of asset.storeAgreementFlgMap) {
                    if (flg) {
                        const storeDatatype: IAgreementForDataType[] = [];
                        // 指定バージョンまでの同意データ種を追加
                        for (let i = 0; i < version; i++) {
                            storeDatatypeMap.get(codeValue)[i].forEach((ele) => storeDatatype.push(ele));
                        }
                        // 蓄積定義ごとにidを区別するため、カタログコードの下3桁を用いる
                        res.store.push({
                            target: {
                                _value: codeValue,
                                _ver: version
                            },
                            id: codeValue - 1000000,
                            dataType: storeDatatype
                        });
                    }
                }
            }
            for (const [codeValue, flg] of asset.shareAgreementFlgMap) {
                // 同意種別が継続的共有の場合のみ共有同意を取得する
                if (type === 'SHARE_CONTINUOUS' && flg) {
                    const shareDatatype: IAgreementForDataType[] = [];
                    // 指定バージョンまでの同意データ種を追加
                    for (let i = 0; i < version; i++) {
                        shareDatatypeMap.get(codeValue)[i].forEach((ele) => shareDatatype.push(ele));
                    }
                    res.share.push({
                        target: {
                            _value: codeValue,
                            _ver: version
                        },
                        id: codeValue - 1000000,
                        dataType: shareDatatype
                    });
                }
            }
            resList.push(res);
        }
        return resList;
    };