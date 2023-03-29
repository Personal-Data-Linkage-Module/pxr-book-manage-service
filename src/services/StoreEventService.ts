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
/* eslint-enable */
const message = Config.ReadConfig('./config/message.json');
const config = Config.ReadConfig('./config/config.json');

@Service()
export default class StoreEventService {
    /** ドキュメント */
    private TYPE_DOCUMENT = 1;
    /**  イベント */
    private TYPE_EVENT = 2;
    /** モノ */
    private TYPE_THING = 3;

    /**
     * 蓄積イベント通知
     */
    public async postStoreEventNotificate (operator: Operator, dto: PostStoreEventNotificateReqDto) {
        if (dto.add && dto.add.length > 0) {
            for (const add of dto.add) {
                await this.storeEventNotificateProcess(add, 'add', operator);
            }
        }
        if (dto.update && dto.update.length > 0) {
            for (const update of dto.update) {
                await this.storeEventNotificateProcess(update, 'update', operator);
            }
        }
        if (dto.delete && dto.delete.length > 0) {
            for (const delet of dto.delete) {
                await this.storeEventNotificateProcess(delet, 'delete', operator);
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
     *  seprate : getSharingRestriction（共有制限定義取得）
     *  seprate : checkRestrict（共有制限定義チェック）
     *  seprate : receiveStoreEvent（蓄積イベント受信API呼び出し）
     *  seprate : addStoreEventNotificateHistory（蓄積イベント通知履歴登録処理）
     */
    public async storeEventNotificateProcess (cmatrix: CMatrix, type: string, operator: Operator) {
        // PXR-IDを取得
        const userId = cmatrix.userId;
        const userIdCooperate = await EntityOperation.getUserIdCooperateRecordFromUserId(userId);
        const book = await EntityOperation.getBookRecordById(userIdCooperate.bookId);
        const pxrId = book.pxrId;

        // ドキュメント
        if (cmatrix.document && cmatrix.document.length > 0) {
            for (const document of cmatrix.document) {
                const results = await EntityOperation.getStoreEventNotificateData(
                    pxrId, this.TYPE_DOCUMENT,
                    document.docCatalogCode, document.docCatalogVersion,
                    document.docActorCode);
                await this.storeNotificateEveryData(results, type, operator, userId, document, 'document');
            }
        }
        // イベント
        if (cmatrix.event) {
            const event = cmatrix.event;
            const results = await EntityOperation.getStoreEventNotificateData(
                pxrId, this.TYPE_EVENT,
                event.eventCatalogCode, event.eventCatalogVersion,
                event.eventActorCode);
            await this.storeNotificateEveryData(results, type, operator, userId, event, 'event');
        }
        // モノ
        if (cmatrix.thing && cmatrix.thing.length > 0) {
            for (const thing of cmatrix.thing) {
                const results = await EntityOperation.getStoreEventNotificateData(
                    pxrId, this.TYPE_THING,
                    thing.thingCatalogCode, thing.thingCatalogVersion,
                    thing.thingActorCode);
                await this.storeNotificateEveryData(results, type, operator, userId, thing, 'thing');
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
    private async storeNotificateEveryData (results: any[], type: string, operator: Operator, userId: string, data: any, dataType: 'document' | 'event' | 'thing') {
        for (const res of results) {
            // レコードが取得できない または
            // 共有元指定データ種が存在し、共有元指定共有元が取得できなかった場合
            if (!res || (res['shareSourceDatatypeId'] && !res['shareSourceSourceId'])) {
                continue;
            }

            const dataOperationActorCode = res['dataOperationActorCode'] ? Number(res['dataOperationActorCode']) : null;
            const dataOperationActorVersion = res['dataOperationActorVersion'] ? Number(res['dataOperationActorVersion']) : null;
            const dataOperationAppCode = res['dataOperationAppCode'] ? Number(res['dataOperationAppCode']) : null;
            const dataOperationAppVersion = res['dataOperationAppVersion'] ? Number(res['dataOperationAppVersion']) : null;

            // 共有制限定義取得
            const sharingRestriction = await this.getSharingRestriction(operator, data, dataOperationAppCode, dataType === 'document' ? 'doc' : dataType);
            // 共有制限定義のデータ種が対象データ種の場合
            await this.checkRestrict(sharingRestriction, operator, dataOperationAppCode, dataType);

            // 共有先の利用者IDを取得
            const shareTargetUserId = await EntityOperation.getShareUserIdCooperate(
                userId, data,
                dataOperationActorCode, dataOperationAppCode, null);

            // 蓄積イベント受信APIを呼び出す
            await this.receiveStoreEvent(res, type, shareTargetUserId, data, dataOperationActorCode, dataOperationActorVersion, dataOperationAppCode, dataOperationAppVersion, operator, dataType === 'document' ? 'doc' : dataType);

            // 蓄積イベント通知履歴にデータを登録
            await this.addStoreEventNotificateHistory(res, type, shareTargetUserId, data, dataOperationActorCode, dataOperationActorVersion, dataOperationAppCode, dataOperationAppVersion, operator, dataType === 'document' ? 'doc' : dataType);
        }
    }

    /**
     * 共有制限チェック
     * @param sharingRestriction
     * @param operator
     * @param dataOperationAppCode
     * @param type
     * リファクタ履歴
     *  inner : checkPermissionOrProhibition（制限許可チェック共通処理）
     */
    private async checkRestrict (sharingRestriction: any, operator: Operator, dataOperationAppCode: number, type: 'document' | 'event' | 'thing') {
        if (sharingRestriction) {
            const catalogDto = new CatalogDto();
            catalogDto.setMessage(message);
            catalogDto.setOperator(operator);
            catalogDto.setUrl(config['catalogUrl']);
            let permissionFlag = false;
            let prohibitionFlag = true;
            const permission = sharingRestriction['permission'];
            const prohibition = sharingRestriction['prohibition'];
            // appのリージョンを取得
            applicationLogger.info('storeEvent' + type + 'catalogDto_1: ' + JSON.stringify(catalogDto));
            catalogDto.setCode(dataOperationAppCode);
            catalogDto.setProcNum(0);
            applicationLogger.info('storeEvent' + type + 'catalogDto_2: ' + JSON.stringify(catalogDto));
            const appWfCatalog = await new CatalogService().getCatalogInfo(catalogDto);
            const regions: number[] = [];
            if (appWfCatalog['template']['region-alliance']) {
                for (const region of appWfCatalog['template']['region-alliance']) {
                    regions.push(Number(region['_value']));
                }
            }
            // 許可リストと禁止リストの両方に値が設定されている場合エラー
            if (permission && permission.length > 0 && prohibition && prohibition.length > 0) {
                throw new AppError('共有制限許可リストと禁止リストの両方に値が設定されています', ResponseCode.BAD_REQUEST);
                // 許可リストが設定されている場合
            } else if (permission && permission.length > 0) {
                for (const service of permission) {
                    permissionFlag = checkPermissionOrProhibition(service, regions, permissionFlag, true);
                }
                // 禁止リストが設定されている場合
            } else if (prohibition && prohibition.length > 0) {
                permissionFlag = true;
                for (const service of prohibition) {
                    prohibitionFlag = checkPermissionOrProhibition(service, regions, prohibitionFlag, false);
                }
            }
            // 許可フラグがtrueでない場合エラー
            if (!permissionFlag) {
                throw new AppError('共有制限許可リストに含まれていません', ResponseCode.BAD_REQUEST);
            }
            // 禁止フラグがtrueでない場合エラー
            if (!prohibitionFlag) {
                throw new AppError('共有制限禁止リストに含まれています', ResponseCode.BAD_REQUEST);
            }
        }
        // 制限許可チェック
        function checkPermissionOrProhibition (service: any, regions: number[], permissionFlag: boolean, isPermission: boolean) {
            if (service['region'] && service['region'].length > 0 && !service['service']) {
                for (const targetRegion of service['region']) {
                    for (const regionValue of regions) {
                        if (regionValue === Number(targetRegion['_value'])) {
                            // 許可リストにリージョンが一致する場合
                            permissionFlag = isPermission;
                        }
                    }
                }
            } else if (service['service'] && service['service'].length > 0) {
                for (const code of service['service']) {
                    if (Number(code['_value']) === dataOperationAppCode) {
                        // 許可リストにappのコードが含まれている場合
                        permissionFlag = isPermission;
                    }
                }
            }
            return permissionFlag;
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
     * @param operator
     * @param dataType
     * リファクタ履歴
     *  separate : createReceiveStoreEventReqBody（蓄積イベント受信リクエストボディ作成）
     */
    private async receiveStoreEvent (res: any, type: string, shareTargetUserId: any, data: any, dataOperationActorCode: number, dataOperationActorVersion: number, dataOperationAppCode: number, dataOperationAppVersion: number, operator: Operator, dataType: 'doc' | 'event' | 'thing') {
        const reqBody: any = this.createReceiveStoreEventReqBody(res, type, shareTargetUserId, data, dataType, dataOperationActorCode, dataOperationActorVersion);
        if (data[dataType + 'AppCatalogCode'] && data[dataType + 'AppCatalogVersion']) {
            reqBody['sourceApp'] = {
                _value: data[dataType + 'AppCatalogCode'],
                _ver: data[dataType + 'AppCatalogVersion']
            };
        }
        if (dataOperationAppCode && dataOperationAppVersion) {
            reqBody['destinationApp'] = {
                _value: dataOperationAppCode,
                _ver: dataOperationAppVersion
            };
        }
        // アクターカタログの取得
        const actorCatalog = await CatalogService.getActorCatalog(dataOperationActorCode, operator);

        // ブロックコードの取得
        const blockCode = actorCatalog['template']['main-block'] ? Number(actorCatalog['template']['main-block']['_value']) : null;
        if (!blockCode) {
            throw new AppError(message.NOT_EXIST_BLOCK_CODE, ResponseCode.INTERNAL_SERVER_ERROR);
        }
        await BookOperateService.doLinkingPostStoreEventRequest(blockCode, reqBody, operator);
    }

    /**
     * 蓄積イベント受信 リクエストボディ作成
     * @param res
     * @param type
     * @param shareTargetUserId
     * @param data
     * @param dataType
     * @param dataOperationActorCode
     * @param dataOperationActorVersion
     * @returns
     */
    private createReceiveStoreEventReqBody (res: any, type: string, shareTargetUserId: any, data: any, dataType: string, dataOperationActorCode: number, dataOperationActorVersion: number): any {
        return {
            type: res['eventType'],
            operate: type,
            userId: shareTargetUserId,
            identifier: data[dataType + 'Identifier'],
            document: data.docCatalogCode ? {
                _value: data.docCatalogCode,
                _ver: data.docCatalogVersion
            } : undefined,
            event: data.eventCatalogCode ? {
                _value: data.eventCatalogCode,
                _ver: data.eventCatalogVersion
            } : undefined,
            thing: data.thingCatalogCode ? {
                _value: data.thingCatalogCode,
                _ver: data.thingCatalogVersion
            } : undefined,
            sourceActor: {
                _value: data[dataType + 'ActorCode'],
                _ver: data[dataType + 'ActorVersion']
            },
            destinationActor: {
                _value: dataOperationActorCode,
                _ver: dataOperationActorVersion
            }
        };
    }

    /**
     * 蓄積イベント通知履歴登録
     * @param res
     * @param type
     * @param shareTargetUserId
     * @param data
     * @param dataOperationActorCode
     * @param dataOperationActorVersion
     * @param dataOperationAppCode
     * @param dataOperationAppVersion
     * @param operator
     * @param dataType
     */
    private async addStoreEventNotificateHistory (res: any, type: string, shareTargetUserId: any, data: any, dataOperationActorCode: number, dataOperationActorVersion: number, dataOperationAppCode: number, dataOperationAppVersion: number, operator: Operator, dataType: 'doc' | 'event' | 'thing') {
        const entity = new StoreEventNotificateHistory();
        entity.notificateType = res['eventType'];
        entity.processType = type;
        entity.userId = shareTargetUserId;
        entity.dataId = data.docIdentifier;
        if (dataType === 'doc') {
            entity.documentCatalogCode = data.docCatalogCode;
            entity.documentCatalogVersion = data.docCatalogVersion;
        }
        if (dataType === 'event') {
            entity.eventCatalogCode = data.eventCatalogCode;
            entity.eventCatalogVersion = data.eventCatalogVersion;
        }
        if (dataType === 'thing') {
            entity.thingCatalogCode = data.thingCatalogCode;
            entity.thingCatalogVersion = data.thingCatalogVersion;
        }
        entity.shareSourceActorCatalogCode = Number(data[dataType + 'ActorCode']);
        entity.shareSourceActorCatalogVersion = Number(data[dataType + 'ActorVersion']);
        entity.shareSourceAppCatalogCode = Number(data[dataType + 'AppCatalogCode']);
        entity.shareSourceAppCatalogVersion = Number(data[dataType + 'AppCatalogVersion']);
        entity.shareSourceWfCatalogCode = null;
        entity.shareSourceWfCatalogVersion = null;
        entity.shareTargetActorCatalogCode = dataOperationActorCode;
        entity.shareTargetActorCatalogVersion = dataOperationActorVersion;
        entity.shareTargetAppCatalogCode = dataOperationAppCode;
        entity.shareTargetAppCatalogVersion = dataOperationAppVersion;
        entity.shareTargetWfCatalogCode = null;
        entity.shareTargetWfCatalogVersion = null;
        entity.isDisabled = false;
        entity.createdBy = operator.getLoginId();
        entity.updatedBy = operator.getLoginId();
        const connection = await connectDatabase();
        await connection.transaction(async (trans) => {
            await EntityOperation.insertStoreEventNotificateHistory(trans, entity);
        });
    }

    /**
     * 共有制限定義の取得
     * @param operator
     * @param data
     * @param dataOperationAppCode
     * @param type
     * @returns
     */
    private async getSharingRestriction (operator: Operator, data: any, dataOperationAppCode: number, type: 'doc' | 'event' | 'thing') {
        // 共有制限カタログnsの取得
        const catalogDto = new CatalogDto();
        catalogDto.setMessage(message);
        catalogDto.setOperator(operator);
        const extName = await new CatalogService().getExtName(catalogDto);
        let sharingRestrictionCatalogNs: string = config['sharingRestrictionCatalogNs'];
        sharingRestrictionCatalogNs = sharingRestrictionCatalogNs
            .replace('{ext_name}', extName)
            .replace('{app_or_wf}', 'app')
            .replace('{actor_code}', data[type + 'ActorCode'].toString());
        catalogDto.setCode(dataOperationAppCode);

        // 共有制限カタログを取得
        catalogDto.setProcNum(1);
        catalogDto.setNs(sharingRestrictionCatalogNs);
        catalogDto.setUrl(config['catalogUrl']);
        let sharingRestrictionCatalog;
        try {
            sharingRestrictionCatalog = (await new CatalogService().getCatalogInfo(catalogDto))[0];
        } catch (e) {
            if (e.statusCode !== 401) {
                throw e;
            }
        }
        const dataType: string = type === 'doc' ? 'document' : type;
        const sharingRestrictions = sharingRestrictionCatalog ? sharingRestrictionCatalog['template'][dataType] : null;
        let sharingRestriction = null;
        if (sharingRestrictions) {
            for (const ele of sharingRestrictions) {
                if (Number(ele['code']['_value']) === data[type + 'CatalogCode'] &&
                    Number(ele['code']['_ver']) === data[type + 'CatalogVersion']) {
                    sharingRestriction = ele;
                }
            }
        }
        return sharingRestriction;
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
