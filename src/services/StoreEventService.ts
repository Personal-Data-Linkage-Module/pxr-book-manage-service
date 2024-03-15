/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import EntityOperation from '../repositories/EntityOperation';
import PostStoreEventNotificateReqDto, { CMatrix, Document } from '../resources/dto/PostStoreEventNotificateReqDto';
import StoreEventNotificateHistory from '../repositories/postgres/StoreEventNotificateHistory';
import { Service } from 'typedi';
import Operator from '../resources/dto/OperatorReqDto';
import { connectDatabase } from '../common/Connection';
import Config from '../common/Config';
import CatalogService from './CatalogService';
import CatalogDto from './dto/CatalogDto';
import AppError from '../common/AppError';
import { ResponseCode } from '../common/ResponseCode';
import PostStoreEventReqDto from '../resources/dto/PostStoreEventReqDto';
import BookOperateService from './BookOperateService';
import { applicationLogger } from '../common/logging';
import { CodeObject } from '../resources/dto/PostBookOpenReqDto';
import PermissionAnalyzer from '../common/PermissionAnalyzer';
import { IDataOperationRequest } from '../common/DataOperationRequest';
import { IAllDataOperationRequestResponse } from '../common/DataOperationResponse';
import UserIdCooperate from '../repositories/postgres/UserIdCooperate';
/* eslint-enable */
const message = Config.ReadConfig('./config/message.json');
const config = Config.ReadConfig('./config/config.json');

/**
 * 蓄積イベント受信APIに送信するリクエストボディ定義
 */
export interface IPostStoreEventReceiveRequest {
    /**
     * 送信種別
     */
    type: 'store-event' | 'share-trigger';
    /**
     * 処理種別
     */
    operate: 'add' | 'update' | 'delete';
    /**
     * 利用者ID
     */
    userId: string;
    /**
     * データ識別子
     */
    identifier: string;
    /**
     * ドキュメント種別カタログコード
     */
    document: CodeObject | null;
    /**
     * イベント種別カタログコード
     */
    event: CodeObject | null;
    /**
     * モノ種別カタログコード
     */
    thing: CodeObject | null;
    /**
     * 共有元アクター
     */
    sourceActor: CodeObject;
    /**
     * 共有元アプリケーション
     */
    sourceApp: CodeObject | null;
    /**
     * 共有元ワークフロー
     */
    sourceWf: CodeObject | null;
    /**
     * 共有先アクター
     */
    destinationActor: CodeObject;
    /**
     * 共有先アプリケーション
     */
    destinationApp: CodeObject | null;
    /**
     * 共有先ワークフロー
     */
    destinationWf: CodeObject | null;
    /**
     * 共有トリガー定義カタログコード
     */
    trigger: CodeObject | null;
}

@Service()
export default class StoreEventService {
    /**
     * 蓄積イベント通知
     */
    public async postStoreEventNotificate (operator: Operator, dto: PostStoreEventNotificateReqDto) {
        // リクエストのadd, update, delete 各CMatrixリストのうち、存在するものを用いてpxrIdを取得する
        const cMatrix = dto.add && dto.add.length > 0 ? dto.add[0] : dto.update && dto.update.length > 0 ? dto.update[0] : dto.delete[0];
        if (!cMatrix) {
            // リクエストのCMatrixリストが全て空の場合、処理を行わない
            return { result: 'success' };
        }
        // cMatrix.eventが無い場合はバリデーションチェックで確認済のため、考慮不要

        // PXR-IDを取得
        const userId = cMatrix.userId;
        const app: number = cMatrix.event.eventAppCatalogCode;
        const wf: number = cMatrix.event.eventWfCatalogCode;
        const userIdCooperate = await EntityOperation.getUserIdCooperateRecordFromUserId(userId, app, wf);
        const book = await EntityOperation.getBookRecordById(userIdCooperate.bookId);
        const pxrId = book.pxrId;

        // 蓄積元アクター、アセット情報を取得
        const sourceActor: CodeObject = {
            _value: userIdCooperate.actorCatalogCode,
            _ver: userIdCooperate.actorCatalogVersion
        };
        const sourceApp: CodeObject = userIdCooperate.appCatalogCode
            ? {
                _value: userIdCooperate.appCatalogCode,
                _ver: userIdCooperate.appCatalogVersion
            }
            : null;
        const sourceWf: CodeObject = userIdCooperate.wfCatalogCode
            ? {
                _value: userIdCooperate.wfCatalogCode,
                _ver: userIdCooperate.wfCatalogVersion
            }
            : null;

        const catalogService = new CatalogService();
        // analyzerインスタンス生成、有効な共有定義の特定
        const analyzer = PermissionAnalyzer
            .create(operator, EntityOperation.agreementAccessor, catalogService.catalogAccessor, catalogService.shareRestrictionAccessor, EntityOperation.storeEventNotificationAccessor)
            .setDataOperationType('STORE_EVENT');
        await analyzer.setAgreement(pxrId, 'SHARE_CONTINUOUS', null);
        await analyzer.setAssetCatalog();
        await analyzer.specifyTarget();

        if (dto.add && dto.add.length > 0) {
            for (const addCMatrices of dto.add) {
                await this.storeEventNotificateProcess(operator, analyzer, pxrId, addCMatrices, 'add', sourceActor, sourceApp, sourceWf);
            }
        }
        if (dto.update && dto.update.length > 0) {
            for (const updateCMatrices of dto.update) {
                await this.storeEventNotificateProcess(operator, analyzer, pxrId, updateCMatrices, 'update', sourceActor, sourceApp, sourceWf);
            }
        }
        if (dto.delete && dto.delete.length > 0) {
            for (const deleteCMatrices of dto.delete) {
                await this.storeEventNotificateProcess(operator, analyzer, pxrId, deleteCMatrices, 'delete', sourceActor, sourceApp, sourceWf);
            }
        }
        const response = {
            result: 'success'
        };
        return response;
    }

    /**
     * 蓄積イベント通知 処理
     * リファクタ履歴
     *  seprate: storeNotificateEveryData（各データ種毎の蓄積イベント通知処理）
     *  seprate : receiveStoreEvent（蓄積イベント受信API呼び出し）
     *  seprate : addStoreEventNotificateHistory（蓄積イベント通知履歴登録処理）
     */
    public async storeEventNotificateProcess (operator: Operator, analyzer: PermissionAnalyzer, pxrId: string, cmatrix: CMatrix, operation: 'add' | 'update' | 'delete', sourceActor: CodeObject, sourceApp: CodeObject, sourceWf: CodeObject) {
        // ドキュメント
        if (cmatrix.document && cmatrix.document.length > 0) {
            for (const cMatrixDoc of cmatrix.document) {
                const document = {
                    _value: cMatrixDoc.docCatalogCode,
                    _ver: cMatrixDoc.docCatalogVersion
                };
                await this.storeNotificateEveryData(operator, analyzer, pxrId, operation, 'document', document, cMatrixDoc.docIdentifier, sourceActor, sourceApp, sourceWf);
            }
        }
        // イベント
        if (cmatrix.event) {
            const event = {
                _value: cmatrix.event.eventCatalogCode,
                _ver: cmatrix.event.eventCatalogVersion
            };
            await this.storeNotificateEveryData(operator, analyzer, pxrId, operation, 'event', event, cmatrix.event.eventIdentifier, sourceActor, sourceApp, sourceWf);
        }
        // モノ
        if (cmatrix.thing && cmatrix.thing.length > 0) {
            for (const cMatrixThing of cmatrix.thing) {
                const thing = {
                    _value: cMatrixThing.thingCatalogCode,
                    _ver: cMatrixThing.thingCatalogVersion
                };
                await this.storeNotificateEveryData(operator, analyzer, pxrId, operation, 'thing', thing, cMatrixThing.thingIdentifier, sourceActor, sourceApp, sourceWf);
            }
        }
    }

    /**
     * 各データ種毎の蓄積イベント通知処理
     * @param results
     * @param type
     * @param operator
     * @param userId
     * @param data
     * @param dataType
     */
    private async storeNotificateEveryData (operator: Operator, analyzer: PermissionAnalyzer, pxrId: string, operation: 'add' | 'update' | 'delete', type: 'document' | 'event' | 'thing', data: CodeObject, identifier: string, sourceActor: CodeObject, sourceApp: CodeObject, sourceWf: CodeObject) {
        // analyzerによる判定、通知先取得
        const permissionRequest: IDataOperationRequest = {
            pxrId: pxrId,
            operationType: 'STORE_EVENT',
            storedBy: {
                actor: sourceActor._value,
                asset: sourceApp ? sourceApp._value : sourceWf._value
            },
            shareTo: null,
            dataType: {
                type: type,
                code: data
            }
        };
        const storeEventRequestList = await analyzer.getAllPermitted(permissionRequest);

        if (storeEventRequestList && storeEventRequestList.length > 0) {
            const reqList: IPostStoreEventReceiveRequest[] = [];
            for (const storeEventRequest of storeEventRequestList) {
                if (storeEventRequest.shareTo.asset === storeEventRequest.storedBy.asset) {
                    // 蓄積元アセットと通知先アセットが一致する場合は、通知対象外
                    continue;
                }
                // 共有先の利用者IDを取得
                const shareTargetUser = await EntityOperation.getShareUserIdCooperateByPxrId(pxrId, storeEventRequest.shareTo.actor, storeEventRequest.shareTo.asset);
                if (!shareTargetUser || shareTargetUser.status === 0) {
                    // 連携ステータスが0: 連携申請中 の場合は利用者が未作成のため、通知しない
                    applicationLogger.info('通知先アセットに対する対象個人の利用者連携が未完了のため、蓄積イベント通知送信をスキップします。');
                    continue;
                }
                // リクエスト整形
                const request = this.createReceiveStoreEventReqBodyByAnalyzer(storeEventRequest, operation, sourceActor, sourceApp, sourceWf, shareTargetUser, identifier);
                if (reqList.length > 0) {
                    // 既にリクエスト配列に入っているものと同じ内容であれば追加しない
                    if (reqList.some((ele) => JSON.stringify(ele) === JSON.stringify(request))) {
                        continue;
                    }
                }
                reqList.push(request);
            }
            if (reqList.length > 0) {
                for (const req of reqList) {
                    // 蓄積イベント受信APIを呼び出す
                    await this.receiveStoreEvent(operator, req);

                    // 蓄積イベント通知履歴にデータを登録
                    await this.addStoreEventNotificateHistory(operator, req);
                }
            }
        }
    }

    /**
     * 蓄積イベント受信API呼び出し処理
     * @param res
     * @param type
     * @param shareTargetUserId
     * @param data
     * @param dataOperationActorCode
     * @param dataOperationActorVersion
     * @param dataOperationAppCode
     * @param dataOperationAppVersion
     * @param dataOperationWfCode
     * @param dataOperationWfVersion
     * @param operator
     * @param dataType
     * リファクタ履歴
     *  separate : createReceiveStoreEventReqBody（蓄積イベント受信リクエストボディ作成）
     */
    private async receiveStoreEvent (operator: Operator, req: IPostStoreEventReceiveRequest) {
        // アクターカタログの取得
        const actorCatalog = await CatalogService.getActorCatalog(req.destinationActor._value, operator);

        // ブロックコードの取得
        const blockCode = actorCatalog['template']['main-block'] ? Number(actorCatalog['template']['main-block']['_value']) : null;
        if (!blockCode) {
            throw new AppError(message.NOT_EXIST_BLOCK_CODE, ResponseCode.INTERNAL_SERVER_ERROR);
        }
        await BookOperateService.doLinkingPostStoreEventRequest(blockCode, req, operator);
    }

    /**
     * 蓄積イベント受信 リクエストボディ作成
     * @param res データ操作実行許可レスポンス
     * @param operation リクエストの処理種別
     * @param sourceActor 蓄積アクター
     * @param sourceApp 蓄積アプリケーション
     * @param sourceWf 蓄積ワークフロー
     * @param cooperation 通知先の利用者連携情報
     * @param identifier 蓄積データ種の識別子
     * @returns IPostStoreEventReceiveRequest
     */
    private createReceiveStoreEventReqBodyByAnalyzer (res: IAllDataOperationRequestResponse, operation: 'add' | 'update' | 'delete', sourceActor: CodeObject, sourceApp: CodeObject, sourceWf: CodeObject, cooperation: UserIdCooperate, identifier: string): IPostStoreEventReceiveRequest {
        // 共有先アセットがWFかAPPかについて => 利用者連携から取る
        return {
            type: res.notificationType,
            operate: operation,
            userId: cooperation.userId,
            identifier: identifier,
            document: res.document ? res.document : undefined,
            event: res.event ? res.event : undefined,
            thing: res.thing ? res.thing : undefined,
            sourceActor: sourceActor,
            sourceApp: sourceApp,
            sourceWf: sourceWf,
            destinationActor: {
                _value: cooperation.actorCatalogCode,
                _ver: cooperation.actorCatalogVersion
            },
            destinationApp: cooperation.appCatalogCode
                ? {
                    _value: cooperation.appCatalogCode,
                    _ver: cooperation.appCatalogVersion
                }
                : null,
            destinationWf: cooperation.wfCatalogCode
                ? {
                    _value: cooperation.wfCatalogCode,
                    _ver: cooperation.wfCatalogVersion
                }
                : null,
            trigger: res.notificationType === 'share-trigger'
                ? {
                    _value: res.storeEventNotificationCode._value,
                    _ver: res.storeEventNotificationCode._ver
                }
                : null
        };
    }

    /**
     * 蓄積イベント通知履歴登録
     * @param operator オペレータ
     * @param storeEventReq 蓄積イベント通知リクエスト内容
     * @param sourceIdStoreEventReq ソース蓄積イベント通知リクエスト内容
     */
    private async addStoreEventNotificateHistory (operator: Operator, storeEventReq: IPostStoreEventReceiveRequest) {
        const entity = new StoreEventNotificateHistory();
        if (storeEventReq) {
            // 通常の蓄積イベント通知の場合
            entity.notificateType = storeEventReq.type;
            entity.processType = storeEventReq.operate;
            entity.userId = storeEventReq.userId;
            if (storeEventReq.document) {
                entity.dataId = storeEventReq.identifier;
                entity.documentCatalogCode = storeEventReq.document._value;
                entity.documentCatalogVersion = storeEventReq.document._ver;
            }
            if (storeEventReq.event) {
                entity.dataId = storeEventReq.identifier;
                entity.eventCatalogCode = storeEventReq.event._value;
                entity.eventCatalogVersion = storeEventReq.event._ver;
            }
            if (storeEventReq.thing) {
                entity.dataId = storeEventReq.identifier;
                entity.thingCatalogCode = storeEventReq.thing._value;
                entity.thingCatalogVersion = storeEventReq.thing._ver;
            }
            entity.shareSourceActorCatalogCode = storeEventReq.sourceActor._value;
            entity.shareSourceActorCatalogVersion = storeEventReq.sourceActor._ver;
            entity.shareSourceAppCatalogCode = storeEventReq.sourceApp ? storeEventReq.sourceApp._value : null;
            entity.shareSourceAppCatalogVersion = storeEventReq.sourceApp ? storeEventReq.sourceApp._ver : null;
            entity.shareSourceWfCatalogCode = storeEventReq.sourceWf ? storeEventReq.sourceWf._value : null;
            entity.shareSourceWfCatalogVersion = storeEventReq.sourceWf ? storeEventReq.sourceWf._ver : null;

            entity.shareTargetActorCatalogCode = storeEventReq.destinationActor._value;
            entity.shareTargetActorCatalogVersion = storeEventReq.destinationActor._ver;
            entity.shareTargetAppCatalogCode = storeEventReq.destinationApp ? storeEventReq.destinationApp._value : null;
            entity.shareTargetAppCatalogVersion = storeEventReq.destinationApp ? storeEventReq.destinationApp._ver : null;
            entity.shareTargetWfCatalogCode = storeEventReq.destinationWf ? storeEventReq.destinationWf._value : null;
            entity.shareTargetWfCatalogVersion = storeEventReq.destinationWf ? storeEventReq.destinationWf._ver : null;
        }

        entity.isDisabled = false;
        entity.createdBy = operator.getLoginId();
        entity.updatedBy = operator.getLoginId();
        const connection = await connectDatabase();
        await connection.transaction(async (trans) => {
            await EntityOperation.insertStoreEventNotificateHistory(trans, entity);
        });
    }

    /**
     * 蓄積イベント通知定義更新
     * リファクタ履歴
     *  separate : getShareDataType（共有元アクターが指定されているデータ保持処理）
     *  inner : insertShareSource（共有元指定レコード登録共通処理）
     */
    public async postStoreEvent (dto: PostStoreEventReqDto, operator: Operator) {
        const shareCode = dto.shareCode._value;
        const shareVersion = dto.shareCode._ver;
        const notificateCode = dto.notificateCatalog._value;
        const notificateVersion = dto.notificateCatalog._ver;
        // 共有定義カタログを取得
        const catalogDto = new CatalogDto();
        catalogDto.setProcNum(0);
        catalogDto.setCode(shareCode);
        catalogDto.setVersion(shareVersion);
        catalogDto.setOperator(operator);
        catalogDto.setMessage(message);
        catalogDto.setUrl(config['catalogUrl']);
        const shareCatalog = await new CatalogService().getCatalogInfo(catalogDto);
        const shareList = shareCatalog['template']['share'];

        // 蓄積イベント通知のデータを削除
        await EntityOperation.deleteStoreEventNotificate(notificateCode, notificateVersion);

        for (const uuid of dto.shareUuid) {
            // 共有元アクターが指定されているドキュメント/イベント/モノを保持
            const { sourceActorShareDoc, sourceActorShareEvent, sourceActorShareThing }: { sourceActorShareDoc: {}[]; sourceActorShareEvent: {}[]; sourceActorShareThing: {}[]; } = this.getShareDataType(shareList, uuid);

            const connection = await connectDatabase();
            await connection.transaction(async trans => {
                // 蓄積イベント通知定義 登録
                const storeEventNotificateResult = await EntityOperation.insertStoreEventNotificate(trans, dto.type, notificateCode, notificateVersion, shareCode, shareVersion, uuid, operator);
                const storeEventNotificateId = Number(storeEventNotificateResult.identifiers[0]['id']);
                // ドキュメント
                await insertShareSource(sourceActorShareDoc, trans, storeEventNotificateId, 1);
                // イベント
                await insertShareSource(sourceActorShareEvent, trans, storeEventNotificateId, 2);
                // モノ
                await insertShareSource(sourceActorShareThing, trans, storeEventNotificateId, 3);
            });
        }
        const response = {
            result: 'success'
        };
        return response;

        async function insertShareSource (sourceActorShareData: {}[], trans: any, storeEventNotificateId: number, type: 1 | 2 | 3) {
            if (sourceActorShareData.length > 0) {
                for (const data of sourceActorShareData) {
                    const dataCode = Number(data['code']['_value']);
                    const dataVersion = Number(data['code']['_ver']);
                    const sourceActorList = data['sourceActor'];
                    // 共有元指定データ種 登録
                    const shareSourceDatatypeResult = await EntityOperation.insertShareSourceDataType(trans, storeEventNotificateId, dataCode, dataVersion, type, operator);
                    const shareSourceDatatypeId = Number(shareSourceDatatypeResult.identifiers[0]['id']);
                    for (const sourceActor of sourceActorList) {
                        const actorCode = Number(sourceActor['_value']);
                        const actorVersion = Number(sourceActor['_ver']);
                        // 共有元指定共有元 登録
                        await EntityOperation.insertShareSourceSource(trans, shareSourceDatatypeId, actorCode, actorVersion, operator);
                    }
                }
            }
        }
    }

    /**
     * 共有元アクターが指定されているデータ保持処理
     * @param shareList
     * @param uuid
     * @returns
     * リファクタ履歴
     *  inner : setShareData（データ設定処理）
     */
    private getShareDataType (shareList: any, uuid: string) {
        let shareDoc = null;
        let shareEvent = null;
        let shareThing = null;
        for (const share of shareList) {
            if (share['id'] === uuid) {
                shareDoc = share['document'];
                shareEvent = share['event'];
                shareThing = share['thing'];
            }
        }
        // ドキュメント
        const sourceActorShareDoc: {}[] = setShareData(shareDoc);
        // イベント
        const sourceActorShareEvent: {}[] = setShareData(shareEvent);
        // モノ
        const sourceActorShareThing: {}[] = setShareData(shareThing);
        return { sourceActorShareDoc, sourceActorShareEvent, sourceActorShareThing };

        function setShareData (shareDataList: any[]) {
            const sourceActorShare: {}[] = [];
            if (shareDataList && shareDataList.length > 0) {
                for (const data of shareDataList) {
                    if (data['sourceActor']) {
                        sourceActorShare.push(data);
                    }
                }
            }
            return sourceActorShare;
        }
    }
}
