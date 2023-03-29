/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Connection, createConnection, getConnectionManager, getConnection } from 'typeorm';
/* eslint-enable */
import AppError from './AppError';
import MyConditionBook from '../repositories/postgres/MyConditionBook';
import UserIdCooperate from '../repositories/postgres/UserIdCooperate';
import Identification from '../repositories/postgres/Identification';
import TouConsentEntity from '../repositories/postgres/TouConsent';
import DataOperation from '../repositories/postgres/DataOperation';
import DataOperationDataType from '../repositories/postgres/DataOperationDataType';
import DataOperationData from '../repositories/postgres/DetaOperationData';
import TemporarilySharedCode from '../repositories/postgres/TemporarilySharedCode';
import MyConditionDataOutputCode from '../repositories/postgres/MyConditionDataOutputCode';
import McdOutputCodeDataFile from '../repositories/postgres/McdOutputCodeDataFile';
import DataOperationNotification from '../repositories/postgres/DataOperationNotification';
import DataOperationNotificationInd from '../repositories/postgres/DataOperationNotificationInd';
import TermsOfUseNotification from '../repositories/postgres/TermsOfUseNotification';
import TermsOfUseNotificationInd from '../repositories/postgres/TermsOfUseNotificationInd';
import McdOutputCodeActor from '../repositories/postgres/McdOutputCodeActor';
import McdOutputCodeDataType from '../repositories/postgres/McdOutputCodeDataType';
import McdAlteration from '../repositories/postgres/McdAlteration';
import McdAlterationActor from '../repositories/postgres/McdAlterationActor';
import McdAlterationData from '../repositories/postgres/McdAlterationData';
import StoreEventNotificate from '../repositories/postgres/StoreEventNotificate';
import StoreEventNotificateHistory from '../repositories/postgres/StoreEventNotificateHistory';
import ShareSourceSource from '../repositories/postgres/ShareSourceSource';
import ShareSourceDatatype from '../repositories/postgres/ShareSourceDatatype';
import StoppedRegion from '../repositories/postgres/StoppedRegion';
import Config from '../common/Config';
import fs = require('fs');
const Message = Config.ReadConfig('./config/message.json');

const connectOption = JSON.parse(fs.readFileSync('./config/ormconfig.json', 'utf-8'));
// エンティティを設定
connectOption['entities'] = [
    MyConditionBook,
    UserIdCooperate,
    Identification,
    TouConsentEntity,
    DataOperation,
    DataOperationDataType,
    DataOperationData,
    TemporarilySharedCode,
    MyConditionDataOutputCode,
    McdOutputCodeActor,
    McdOutputCodeDataFile,
    McdOutputCodeDataType,
    McdAlteration,
    McdAlterationActor,
    McdAlterationData,
    DataOperationNotification,
    DataOperationNotificationInd,
    TermsOfUseNotification,
    TermsOfUseNotificationInd,
    StoreEventNotificate,
    StoreEventNotificateHistory,
    ShareSourceSource,
    ShareSourceDatatype,
    StoreEventNotificateHistory,
    StoppedRegion
];

/**
 * コネクションの生成
 */
export async function connectDatabase (): Promise<Connection> {
    let connection = null;
    try {
        // データベースに接続
        connection = await createConnection(connectOption);
    } catch (err) {
        if (err.name === 'AlreadyHasActiveConnectionError') {
            // すでにコネクションが張られている場合には、流用する
            connection = getConnectionManager().get('postgres');
        } else {
            // エラーが発生した場合は、アプリケーション例外に内包してスローする
            throw new AppError(
                Message.FAILED_CONNECT_TO_DATABASE, 500, err);
        }
    }
    // 接続したコネクションを返却
    return connection;
}
