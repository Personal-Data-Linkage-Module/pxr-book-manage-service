/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 *
 *
 *
 * $Date$
 * $Revision$
 * $Author$
 *
 * TEMPLATE VERSION :  76463
 */

/* eslint-disable */
import DataOperationNotification from '../repositories/postgres/DataOperationNotification';
import { Service } from 'typedi';
import SettingsNotificationServiceDto from './dto/SettingsNotificationServiceDto';
/* eslint-enable */
import { connectDatabase } from '../common/Connection';
import EntityOperation from '../repositories/EntityOperation';
import DataOperationNotificationInd from '../repositories/postgres/DataOperationNotificationInd';
import GetSettingsTargetResDto, { CodeObject } from '../resources/dto/GetSettingsTargetResDto';

@Service()
export default class SettingsNotificationService {
    readonly UNTREATED = 0;
    readonly NOT_AGREED = 0;

    public async postSettingsUpdate (dto: SettingsNotificationServiceDto) {
        for (const code of dto.codes) {
            const connection = await connectDatabase();
            await connection.transaction(async trans => {
                const dataOperationNotification = new DataOperationNotification();
                dataOperationNotification._value = code._value;
                dataOperationNotification._ver = code._ver;
                dataOperationNotification.status = this.UNTREATED;
                dataOperationNotification.createdBy = dto.operator.getLoginId();
                dataOperationNotification.updatedBy = dto.operator.getLoginId();
                await EntityOperation.insertDataOperationNotification(trans, dataOperationNotification);
            });
        }

        return { result: 'success' };
    }

    public async getSettingTargetFind (dto: SettingsNotificationServiceDto) {
        // 未処理のデータ操作定義通知を取得
        const dataOperationNotifications = await EntityOperation.getUntreatedDataOperationNotifications();

        // 対象のカタログを特定
        const connection = await connectDatabase();
        await connection.transaction(async trans => {
            // データ操作定義通知をループで回す
            for (const dataOperationNotification of dataOperationNotifications) {
                // 対象のカタログの個人の同意を取得
                const dataOperations = await EntityOperation.getDataOperationByCatalogCode(dataOperationNotification._value);

                for (const dataOperation of dataOperations) {
                    // 対象の個人だった場合、個人データ操作定義通知を作成
                    const dataOperationNotificationInd = new DataOperationNotificationInd();
                    dataOperationNotificationInd.dataOperationNotificationId = dataOperationNotification.id;
                    dataOperationNotificationInd.bookId = dataOperation.bookId;
                    dataOperationNotificationInd.status = this.NOT_AGREED;
                    dataOperationNotificationInd.lastSentAt = null;
                    dataOperationNotificationInd.createdBy = dto.operator.getLoginId();
                    dataOperationNotificationInd.updatedBy = dto.operator.getLoginId();
                    await EntityOperation.insertDataOperationNotificationInd(trans, dataOperationNotificationInd);
                }

                // データ操作定義通知を処理済にアップデータとして完了
                await EntityOperation.updateDataOperationNotification(trans, dataOperationNotification.id, dto.operator);
            }
        });
        return { result: 'success' };
    }

    public async getSettingsTarget (dto: SettingsNotificationServiceDto) {
        const notifications = await EntityOperation.getNotAgreedDataOperationNotificationTargets(dto.offset, dto.limit);

        const ret: GetSettingsTargetResDto[] = [];
        for (const notification of notifications) {
            let ele = ret.find(retEle =>
                retEle.pxrId === notification['pxrId']
            );
            if (ele) {
                const code = new CodeObject();
                code._value = Number(notification['_value']);
                code._ver = notification['_ver'] ? Number(notification['_ver']) : null;
                ele.dataOperations.push(code);
            } else {
                ele = new GetSettingsTargetResDto();
                ele.pxrId = notification['pxrId'];
                const code = new CodeObject();
                code._value = Number(notification['_value']);
                code._ver = notification['_ver'] ? Number(notification['_ver']) : null;
                ele.dataOperations = [];
                ele.dataOperations.push(code);
                ret.push(ele);
            }
        }
        return ret;
    }

    public async postSettingNotificationComplete (dto: SettingsNotificationServiceDto) {
        const book = await EntityOperation.isPxrIdExists(dto.pxrId);

        const connection = await connectDatabase();
        await connection.transaction(async trans => {
            await EntityOperation.updateDataOperationNotificationInds(trans, book.id, dto.operator);
        });
        return { result: 'success' };
    }
}
