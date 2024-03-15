/* eslint-disable */
import { CodeObject } from "resources/dto/PostBookOpenReqDto";
import { IDataOperationAsset, IDataOperationRequest } from "common/DataOperationRequest";
import { IAllDataOperationRequestResponse, NOTIFICATION_TYPE } from "common/DataOperationResponse";

// 通知種別管理用変数
let notificationType: NOTIFICATION_TYPE = 'store-event';

// 蓄積イベント通知定義（or 共有トリガー定義）カタログコード管理用変数
let notificationCatalogCode: CodeObject = null;

// 通知先アクター、アセットの組み合わせ管理用変数
let notificationToActor: IDataOperationAsset[] = [];


/**
 * 通知種別変更関数
 * @param setNotificationType 設定する通知種別
 */
export const changeNotificationType = (setNotificationType: NOTIFICATION_TYPE): void => {
    notificationType = setNotificationType;
}

// 蓄積イベント通知定義カタログコードバージョン設定用関数
export const setNotificationCatalogCode = (code: CodeObject): void => {
    notificationCatalogCode = code;
}

// 通知先アクター、アセットの組み合わせ設定用関数
export const setNotificationToActors = (actorAssets: IDataOperationAsset[]): void => {
    notificationToActor = actorAssets;
}

// 許可される蓄積イベント通知リクエストリスト取得関数
export const getAllPermitted = 
    async (request: IDataOperationRequest): Promise<IAllDataOperationRequestResponse[]> => {
        let res: IAllDataOperationRequestResponse[] = [];
        if (request.dataType.type === 'document' && request.dataType.code._value === 1099910) {
            res.push({
                operationType: 'STORE_EVENT',
                notificationType: notificationType,
                document: request.dataType.type === 'document' ? request.dataType.code : null,
                event: null,
                thing: null,
                storedBy: request.storedBy,
                shareTo: {
                    actor: 1000445,
                    asset: 1000603
                },
                storeEventNotificationCode: notificationCatalogCode
            })
        } else if (request.dataType.type === 'event' && request.dataType.code._value === 1000018) {
            res.push({
                operationType: 'STORE_EVENT',
                notificationType: notificationType,
                document: null,
                event: request.dataType.type === 'event' ? request.dataType.code : null,
                thing: null,
                storedBy: request.storedBy,
                shareTo: {
                    actor: 1000445,
                    asset: 1000603
                },
                storeEventNotificationCode: notificationCatalogCode
            })
        } else if (request.dataType.type === 'thing' && request.dataType.code._value === 1000933) {
            res.push({
                operationType: 'STORE_EVENT',
                notificationType: notificationType,
                document: null,
                event: null,
                thing: request.dataType.type === 'thing' ? request.dataType.code : null,
                storedBy: request.storedBy,
                shareTo: {
                    actor: 1000445,
                    asset: 1000603
                },
                storeEventNotificationCode: notificationCatalogCode
            })
        } else {
            for (const actorAsset of notificationToActor) {
                res.push({
                    operationType: 'STORE_EVENT',
                    notificationType: notificationType,
                    document: request.dataType.type === 'document' ? request.dataType.code : null,
                    event: request.dataType.type === 'event' ? request.dataType.code : null,
                    thing: request.dataType.type === 'thing' ? request.dataType.code : null,
                    storedBy: request.storedBy,
                    shareTo: {
                        actor: actorAsset.actor,
                        asset: actorAsset.asset
                    },
                    storeEventNotificationCode: notificationCatalogCode
                })
            }
        }
        return res;
    }

// // export const getAllPermitted = 
//     async (request: IDataOperationRequest): Promise<IAllDataOperationRequestResponse[]> => {
//         let res: IAllDataOperationRequestResponse[] = [];
//         for (const actorAsset of notificationToActor) {
//             res.push({
//                 operationType: 'STORE_EVENT',
//                 notificationType: notificationType,
//                 document: request.dataType.type === 'document' ? request.dataType.code : null,
//                 event: request.dataType.type === 'event' ? request.dataType.code : null,
//                 thing: request.dataType.type === 'thing' ? request.dataType.code : null,
//                 storedBy: request.storedBy,
//                 shareTo: {
//                     actor: actorAsset.actor,
//                     asset: actorAsset.asset
//                 },
//                 storeEventNotificationCode: notificationCatalogCode
//             })
//         }
//         return res;
//     }

// 許可されるリクエストリスト0件のケース
export const getNoPermitted =
    async (request: IDataOperationRequest): Promise<IAllDataOperationRequestResponse[]> => {
        return [];
    }