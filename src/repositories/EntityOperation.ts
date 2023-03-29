/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { InsertResult, UpdateResult, EntityManager, getRepository, BaseEntity, Brackets, getConnection, DeleteResult } from 'typeorm';
import UserIdCooperate from './postgres/UserIdCooperate';
import MyConditionBook from './postgres/MyConditionBook';
import Identification from './postgres/Identification';
import DataOperationDataType from './postgres/DataOperationDataType';
import DataOperation from './postgres/DataOperation';
import AppError from '../common/AppError';
import { applicationLogger } from '../common/logging';
import { connectDatabase } from '../common/Connection';
import Config from '../common/Config';
import Operator from '../resources/dto/OperatorReqDto';
import OperatorDomain from '../domains/OperatorDomain';
import MyConditionDataOutputCode from './postgres/MyConditionDataOutputCode';
import DataOperationNotification from './postgres/DataOperationNotification';
import DataOperationNotificationInd from './postgres/DataOperationNotificationInd';
import TouConsent from './postgres/TouConsent';
import TermsOfUseNotificationInd from './postgres/TermsOfUseNotificationInd';
import TermsOfUseNotification from './postgres/TermsOfUseNotification';
const Message = Config.ReadConfig('./config/message.json');
import moment = require('moment-timezone');
import McdOutputCodeDataFile from './postgres/McdOutputCodeDataFile';
import McdOutputCodeActor from './postgres/McdOutputCodeActor';
import McdOutputCodeDataType from './postgres/McdOutputCodeDataType';
import McdAlteration from './postgres/McdAlteration';
import McdAlterationActor from './postgres/McdAlterationActor';
import McdAlterationData from './postgres/McdAlterationData';
import StoreEventNotificate from './postgres/StoreEventNotificate';
import ShareSourceDatatype from './postgres/ShareSourceDatatype';
import ShareSourceSource from './postgres/ShareSourceSource';
import StoppedRegion from './postgres/StoppedRegion';
import { Document, Event, Thing } from '../resources/dto/PostStoreEventNotificateReqDto';
import StoreEventNotificateHistory from './postgres/StoreEventNotificateHistory';
import e = require('express');
/* eslint-enable */

/**
 * 各エンティティ操作クラス
 */
export default class EntityOperation {
    /**
     * 強制削除フラグを操作する
     * @param entity
     * @param flag
     * @param operator
     */
    static async updateForceDeletionFlag (entity: MyConditionBook, flag: boolean, operator: OperatorDomain) {
        const repository = getConnection('postgres').getRepository(MyConditionBook);
        await repository.update(entity.id, {
            forceDeletionFlag: flag,
            updatedBy: operator.loginId
        });
    }

    /**
     * Book削除予約
     */
    static async updateReserveDeletionBook (id: number, loginId: string) {
        const currentDate = new Date();
        const repository = getConnection('postgres').getRepository(MyConditionBook);
        await repository.update(id, {
            bookCloseAvailable: true,
            bookCloseAvailableAt: currentDate,
            updatedBy: loginId
        });
    }

    /**
     * bookId、userIdをキーにUserIdCooperateレコードを取得
     * @param bookId
     * @param userId
     */
    static async getUserIdCooperateRecordFromUserId (userId: string): Promise<UserIdCooperate> {
        const connection = await connectDatabase();
        const repository = getRepository(UserIdCooperate, connection.name);
        const entity = repository.createQueryBuilder('user_id_cooperate')
            .where('user_id_cooperate.is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('user_id_cooperate.user_id = :user_id', { user_id: userId });
        const result = await entity.getRawOne();
        return result ? new UserIdCooperate(result) : null;
    }

    /**
     * bookId、userIdをキーにUserIdCooperateレコードを取得
     * @param bookId
     * @param userId
     */
    static async getUserIdCooperateRecordFromUserIdAndCode (bookId: number, actorCatalogCode: number, regionCatalogCode: number, wfCatalogCode: number, appCatalogCode: number, userId: string): Promise<UserIdCooperate> {
        const connection = await connectDatabase();
        const repository = getRepository(UserIdCooperate, connection.name);
        let entity = repository.createQueryBuilder('user_id_cooperate')
            .where('user_id_cooperate.is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('user_id_cooperate.book_id = :book_id', { book_id: bookId })
            .andWhere('user_id_cooperate.user_id = :user_id', { user_id: userId })
            .andWhere('user_id_cooperate.actor_catalog_code = :actor_catalog_code', { actor_catalog_code: actorCatalogCode });
        if (regionCatalogCode) {
            entity = entity.andWhere('user_id_cooperate.region_catalog_code = :region_catalog_code', { region_catalog_code: regionCatalogCode });
        }
        if (appCatalogCode) {
            entity = entity.andWhere('user_id_cooperate.app_catalog_code = :app_catalog_code', { app_catalog_code: appCatalogCode });
        }
        entity = entity.andWhere('user_id_cooperate.wf_catalog_code IS NULL');

        const result = await entity.getRawOne();
        return result ? new UserIdCooperate(result) : null;
    }

    /**
     * PXR-IDの存在確認
     * @param pxrId
     */
    static async isPxrIdExists (pxrId: string): Promise<MyConditionBook> {
        const connection = await connectDatabase();
        const repository = getRepository(MyConditionBook, connection.name);
        const ret = await repository.createQueryBuilder('my_condition_book')
            .where('pxr_id = :pxrId', { pxrId: pxrId })
            .andWhere('is_disabled = :is_disabled', { is_disabled: false })
            .getRawOne();
        return ret ? new MyConditionBook(ret) : null;
    }

    /**
     * PXR-IDの重複確認
     * @param pxrId
     */
    static async isPxrIdAlreadyExists (pxrId: string): Promise<MyConditionBook> {
        const connection = await connectDatabase();
        const repository = getRepository(MyConditionBook, connection.name);
        const ret = await repository.createQueryBuilder('my_condition_book')
            .where('pxr_id = :pxrId', { pxrId: pxrId })
            .getRawOne();
        return ret ? new MyConditionBook(ret) : null;
    }

    /**
     * テンプレートハッシュの存在確認
     * @param hash
     */
    static async isTemplateHashExists (hash: string): Promise<Identification[]> {
        const connection = await connectDatabase();
        const repository = getRepository(Identification, connection.name);
        const ret = await repository
            .createQueryBuilder('identification')
            .where('template_hash = :tempHash', { tempHash: hash })
            .andWhere('is_disabled = :is_disabled', { is_disabled: false })
            .getRawMany();
        const list: Identification[] = [];
        ret.forEach(element => {
            list.push(new Identification(element));
        });
        return list;
    }

    /**
     * My-Condition-Bookレコード取得
     * @param pxrIdList
     * @param start
     * @param end
     */
    static async getConditionBookRecord (pxrIdList: Array<string>, start: Date, end: Date, includeDisabled?: boolean, offset?: number, limit?: number, includeDeleteCoop?: boolean): Promise<MyConditionBook[]> {
        const connection = await connectDatabase();
        const repository = getRepository(MyConditionBook, connection.name);
        let sql = repository
            .createQueryBuilder('my_condition_book')
            .addSelect('user_id_cooperate', 'user_id_cooperate');
        if (includeDeleteCoop) {
            sql = sql.leftJoin(UserIdCooperate, 'user_id_cooperate', 'user_id_cooperate.book_id = my_condition_book.id AND wf_catalog_code IS NULL');
        } else {
            sql = sql.leftJoin(UserIdCooperate, 'user_id_cooperate', 'user_id_cooperate.book_id = my_condition_book.id AND wf_catalog_code IS NULL AND user_id_cooperate.is_disabled = :is_disabled', { is_disabled: false });
        }
        if (!includeDisabled) {
            sql = sql.where('my_condition_book.is_disabled = :is_disabled', { is_disabled: false });
        }
        if (pxrIdList) {
            sql = sql.andWhere('my_condition_book.pxr_id IN (:...ids)', { ids: pxrIdList });
        }
        if (start) {
            sql = sql.andWhere('my_condition_book.created_at >= :start', { start: moment(start).utc().format('YYYY-MM-DD HH:mm:ss') });
        }
        if (end) {
            sql = sql.andWhere('my_condition_book.created_at <= :end', { end: moment(end).utc().format('YYYY-MM-DD HH:mm:ss') });
        }
        if (offset !== null && limit) {
            sql = sql.andWhere(qb => {
                let subQuery;
                if (includeDisabled) {
                    subQuery = qb.subQuery()
                        .select('my_condition_book_limit.id')
                        .from(MyConditionBook, 'my_condition_book_limit');
                } else {
                    subQuery = qb.subQuery()
                        .select('my_condition_book_limit.id')
                        .from(MyConditionBook, 'my_condition_book_limit')
                        .where('my_condition_book_limit.is_disabled = :is_disabled', { is_disabled: false });
                }
                if (pxrIdList) {
                    subQuery = subQuery.andWhere('my_condition_book_limit.pxr_id IN (:...ids)', { ids: pxrIdList });
                }
                if (start) {
                    subQuery = subQuery.andWhere('my_condition_book_limit.created_at >= :start', { start: moment(start).utc().format('YYYY-MM-DD HH:mm:ss') });
                }
                if (end) {
                    subQuery = subQuery.andWhere('my_condition_book_limit.created_at <= :end', { end: moment(end).utc().format('YYYY-MM-DD HH:mm:ss') });
                }
                const subQueryStr = subQuery.orderBy('my_condition_book_limit.id', 'ASC')
                    .offset(offset).limit(limit)
                    .getQuery();
                return 'my_condition_book.id IN ' + subQueryStr;
            });
        }
        sql = sql.orderBy('my_condition_book.id', 'ASC')
            .addOrderBy('user_id_cooperate.id', 'ASC');
        const ret = await sql.getRawMany();
        const list: MyConditionBook[] = [];
        ret.forEach(element => {
            list.push(new MyConditionBook(element));
        });
        return list;
    }

    /**
     * ユーザー情報によるMy-Condition-Bookレコード取得
     * @param pxrIdList
     * @param start
     * @param end
     */
    static async getConditionBookRecordFromUser (userId: string, actor: number, app: number, wf: number): Promise<MyConditionBook[]> {
        const connection = await connectDatabase();
        const repository = getRepository(MyConditionBook, connection.name);
        let sql = repository
            .createQueryBuilder('my_condition_book')
            .addSelect('user_id_cooperate', 'user_id_cooperate')
            .leftJoin(UserIdCooperate, 'user_id_cooperate', 'user_id_cooperate.book_id = my_condition_book.id AND user_id_cooperate.is_disabled = :is_disabled', { is_disabled: false })
            .where('my_condition_book.is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('user_id_cooperate.user_id = :userId', { userId: userId });
        if (actor) {
            sql = sql.andWhere('user_id_cooperate.actor_catalog_code = :actor', { actor: actor });
        }
        if (app) {
            sql = sql.andWhere('user_id_cooperate.app_catalog_code = :app', { app: app });
        }
        sql = sql.andWhere('user_id_cooperate.wf_catalog_code IS NULL');

        sql = sql.orderBy('my_condition_book.id', 'ASC')
            .addOrderBy('user_id_cooperate.id', 'ASC');
        const ret = await sql.getRawMany();
        const list: MyConditionBook[] = [];
        ret.forEach(element => {
            list.push(new MyConditionBook(element));
        });
        return list;
    }

    /**
     * 対象のアクター, app, wfに連携されているユーザーの一覧を返す
     * @param actor
     * @param app
     * @param wf
     */
    static async getUserFromCooperate (actor: number, app: number, wf: number): Promise<any[]> {
        const connection = await connectDatabase();
        const repository = getRepository(MyConditionBook, connection.name);
        let sql = repository.createQueryBuilder('my_condition_book')
            .select('my_condition_book.pxr_id', 'pxrId')
            .addSelect('user_id_cooperate.user_id', 'userId')
            .innerJoin(UserIdCooperate, 'user_id_cooperate', 'user_id_cooperate.book_id = my_condition_book.id')
            .where('my_condition_book.is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('user_id_cooperate.is_disabled = :is_disabled', { is_disabled: false });
        if (actor) {
            sql = sql.andWhere('user_id_cooperate.actor_catalog_code = :actor', { actor: actor });
        }
        if (app) {
            sql = sql.andWhere('user_id_cooperate.app_catalog_code = :app', { app: app });
        }
        sql = sql.andWhere('user_id_cooperate.wf_catalog_code IS NULL');
        sql = sql.orderBy('my_condition_book.id', 'ASC')
            .addOrderBy('user_id_cooperate.id', 'ASC');
        const ret = await sql.getRawMany();
        const users: {
            userId: string,
            pxrId: string
        }[] = [];
        ret.forEach(element => {
            users.push({
                userId: element['userId'],
                pxrId: element['pxrId']
            });
        });
        return users;
    }

    /**
     * ブックIDによるMy-Condition-Bookレコード取得
     * @param pxrId
     */
    static async getBookRecordFromBookId (bookIdList: Array<number>): Promise<MyConditionBook[]> {
        const connection = await connectDatabase();
        const repository = getRepository(MyConditionBook, connection.name);
        const ret = await repository.createQueryBuilder('my_condition_book')
            .where('id IN (:...ids)', { ids: bookIdList })
            .andWhere('is_disabled = :is_disabled', { is_disabled: false })
            .orderBy('my_condition_book.id')
            .getRawMany();
        const list: MyConditionBook[] = [];
        ret.forEach(element => {
            list.push(new MyConditionBook(element));
        });
        return list;
    }

    /**
     * ブックIDによるMy-Condition-Bookレコード取得
     * @param pxrId
     */
    static async getBookRecordById (bookId: number): Promise<MyConditionBook> {
        const connection = await connectDatabase();
        const repository = getRepository(MyConditionBook, connection.name);
        const ret = await repository.createQueryBuilder('my_condition_book')
            .where('id = :id', { id: bookId })
            .andWhere('is_disabled = :is_disabled', { is_disabled: false })
            .getRawOne();
        return ret ? new MyConditionBook(ret) : null;
    }

    /**
     * 本人性確認事項レコード取得
     * @param pxrId
     */
    static async getIdentityRecord (pxrId: string): Promise<Identification[]> {
        const connection = await connectDatabase();
        const repository = getRepository(Identification, connection.name);
        const ret = await repository.createQueryBuilder('identification')
            .innerJoin(MyConditionBook, 'my_condition_book', 'my_condition_book.id = identification.book_id')
            .where('my_condition_book.pxr_id = :pxr_id', { pxr_id: pxrId })
            .andWhere('my_condition_book.is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('identification.is_disabled = :is_disabled', { is_disabled: false })
            .orderBy('identification.id')
            .getRawMany();
        const list: Identification[] = [];
        ret.forEach(element => {
            list.push(new Identification(element));
        });
        return list;
    }

    /**
     * ブックIDによるデータ蓄積定義を取得
     * @param code
     */
    static async getDataOperationByCatalogCode (code: number): Promise<DataOperation[]> {
        const connection = await connectDatabase();
        const repository = getRepository(DataOperation, connection.name);
        const ret = await repository.createQueryBuilder('data_operation')
            .where('is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('operation_catalog_code = :code', { code: code })
            .getRawMany();
        const list: DataOperation[] = [];
        ret.forEach(element => {
            list.push(new DataOperation(element));
        });
        return list;
    }

    /**
     * ブックIDによるデータ蓄積定義を取得
     * @param bookId
     * @param app
     * @param wf
     */
    static async getStoreDataOperationsByBookId (bookId: number, app: number, wf: number): Promise<DataOperation[]> {
        const connection = await connectDatabase();
        const repository = getRepository(DataOperation, connection.name);
        let sql = repository.createQueryBuilder('data_operation')
            .where('book_id = :book_id', { book_id: bookId })
            .andWhere('type = :type', { type: 'store' })
            .andWhere('is_disabled = :is_disabled', { is_disabled: false });
        if (app) {
            sql = sql.andWhere('app_catalog_code = :app', { app: app });
        }
        sql = sql.andWhere('wf_catalog_code IS NULL');
        sql = sql.orderBy('id', 'ASC');
        const ret = await sql.getRawMany();
        const list: DataOperation[] = [];
        ret.forEach(element => {
            list.push(new DataOperation(element));
        });
        return list;
    }

    /**
     * ブックIDによるデータ共有定義を取得
     * @param bookId
     * @param app
     * @param wf
     */
    static async getShareDataOperationsByBookId (bookId: number, app: number, wf: number): Promise<DataOperation[]> {
        const connection = await connectDatabase();
        const repository = getRepository(DataOperation, connection.name);
        let sql = repository.createQueryBuilder('data_operation')
            .where('book_id = :book_id', { book_id: bookId })
            .andWhere('type = :type', { type: 'share' })
            .andWhere('is_disabled = :is_disabled', { is_disabled: false });
        if (app) {
            sql = sql.andWhere('app_catalog_code = :app', { app: app });
        }
        sql = sql.andWhere('wf_catalog_code IS NULL');
        sql = sql.orderBy('id', 'ASC');
        const ret = await sql.getRawMany();
        const list: DataOperation[] = [];
        ret.forEach(element => {
            list.push(new DataOperation(element));
        });
        return list;
    }

    /**
     * ブックIDによるデータ蓄積データ種定義を取得
     * @param dataOperationId
     */
    static async getDataOperationDataTypeByDataOperationId (dataOperationId: number): Promise<DataOperationDataType[]> {
        const connection = await connectDatabase();
        const repository = getRepository(DataOperationDataType, connection.name);
        const ret = await repository.createQueryBuilder('data_operation_data_type')
            .where('data_operation_id = :dataOperationId', { dataOperationId: dataOperationId })
            .andWhere('is_disabled = :is_disabled', { is_disabled: false })
            .orderBy('id', 'ASC')
            .getRawMany();
        const list: DataOperationDataType[] = [];
        ret.forEach(element => {
            list.push(new DataOperationDataType(element));
        });
        return list;
    }

    /**
     * storeIdによるデータ蓄積定義を取得
     * @param storeId
     */
    static async getDataOperationRecordFromStoreId (storeId: number, bookId: number): Promise<DataOperation> {
        const connection = await connectDatabase();
        const repository = getRepository(DataOperation, connection.name);
        const ret = await repository.createQueryBuilder('data_operation')
            .where('id = :id', { id: storeId })
            .andWhere('book_id = :bookId', { bookId: bookId })
            .andWhere('type = :type', { type: 'store' })
            .andWhere('is_disabled = :is_disabled', { is_disabled: false })
            .getRawOne();
        return ret ? new DataOperation(ret) : null;
    }

    /**
     * shareIdによるデータ蓄積定義を取得
     * @param shareId
     */
    static async getDataOperationRecordFromShareId (shareId: number, bookId: number): Promise<DataOperation> {
        const connection = await connectDatabase();
        const repository = getRepository(DataOperation, connection.name);
        const ret = await repository.createQueryBuilder('data_operation')
            .where('id = :id', { id: shareId })
            .andWhere('book_id = :bookId', { bookId: bookId })
            .andWhere('type = :type', { type: 'share' })
            .andWhere('is_disabled = :isDisabled', { isDisabled: false })
            .getRawOne();
        return ret ? new DataOperation(ret) : null;
    }

    /**
     * データ種を取得
     * @param dataOperationId
     */
    static async getDataTypes (dataOperationId: number): Promise<DataOperationDataType[]> {
        const connection = await connectDatabase();
        const repository = getRepository(DataOperationDataType, connection.name);
        const ret = await repository.createQueryBuilder('data_operation_data_type')
            .where('data_operation_id = :dataOperationId', { dataOperationId: dataOperationId })
            .andWhere('is_disabled = :isDisabled', { isDisabled: false })
            .orderBy('id', 'ASC')
            .getRawMany();
        const list: DataOperationDataType[] = [];
        ret.forEach(element => {
            list.push(new DataOperationDataType(element));
        });
        return list;
    }

    /**
     * データ蓄積定義を取得
     * @param bookId
     * @param actor
     * @param app
     * @param wf
     */
    static async getDataOperationDataStoreSetting (bookId: number, actor: object, app: object, wf: object): Promise<DataOperation> {
        const connection = await connectDatabase();
        const repository = getRepository(DataOperation, connection.name);
        const sql = repository.createQueryBuilder('data_operation')
            .where('book_id = :book_id', { book_id: bookId })
            .andWhere('type = :type', { type: 'store' })
            .andWhere('actor_catalog_code = :actor_catalog_code', { actor_catalog_code: actor['_value'] })
            .andWhere('app_catalog_code = :app_catalog_code', { app_catalog_code: app['_value'] })
            .andWhere('wf_catalog_code IS NULL')
            .andWhere('is_disabled = :is_disabled', { is_disabled: false })
            .orderBy('id', 'ASC');

        const ret = await sql.getRawOne();
        return ret ? new DataOperation(ret) : null;
    }

    /**
     * 連携情報取得(bookId単独)
     * @param bookId
     */
    static async getUserIdCooperate (bookId: number): Promise<UserIdCooperate[]> {
        const connection = await connectDatabase();
        const ret = await connection.getRepository(UserIdCooperate)
            .createQueryBuilder('user_id_cooperate')
            .where('book_id = :bookId', { bookId: bookId })
            .andWhere('is_disabled = :is_disabled', { is_disabled: false })
            .orderBy('id')
            .getMany();
        return ret;
    }

    /**
     * レコード取得（利用者IDからブックIDを取得）
     * @param userId
     * @param actor
     * @param appCatalogCode
     * @param wfCatalogCode
     */
    static async getUserIdCooperateBookId (userId: string, actor: object, appCatalogCode: number, wfCatalogCode: number): Promise<UserIdCooperate> {
        const connection = await connectDatabase();
        const repository = getRepository(UserIdCooperate, connection.name);
        const sql = repository.createQueryBuilder('user_id_cooperate')
            .where('user_id = :user_id', { user_id: userId })
            .andWhere('actor_catalog_code = :actor_catalog_code', { actor_catalog_code: actor['_value'] })
            .andWhere('app_catalog_code = :app_catalog_code', { app_catalog_code: appCatalogCode })
            .andWhere('wf_catalog_code IS NULL')
            .andWhere('is_disabled = :is_disabled', { is_disabled: false })
            .orderBy('app_catalog_version', 'DESC');
        const ret = await sql.getRawOne();
        return ret ? new UserIdCooperate(ret) : null;
    }

    /**
     * My-Condition-Bookレコード追加
     * @param pxrId
     * @param attributes
     * @param register
     */
    static async insertCondBookRecord (em: EntityManager, pxrId: string, attributes: string, appendix: string, register: string): Promise<InsertResult> {
        // SQLを生成及び実行
        const ret = await em
            .createQueryBuilder()
            .insert()
            .into(MyConditionBook)
            .values({
                pxrId: pxrId,
                attributes: attributes,
                appendix: appendix,
                createdBy: register,
                updatedBy: register
            })
            .execute();
        return ret;
    }

    /**
     * My-Condition-Bookレコード appendix更新
     * @param pxrId
     * @param appendix
     */
    static async updateAppendix (operator: OperatorDomain, appendix: string) {
        const connection = await connectDatabase();
        await connection.createQueryBuilder()
            .update(MyConditionBook)
            .set({
                appendix: appendix,
                updatedBy: operator.loginId
            })
            .where('pxr_id = :pxrId', { pxrId: operator.pxrId })
            .andWhere('is_disabled = :isDisabled', { isDisabled: false })
            .execute();
    }

    /**
     * 本人性確認書類レコード追加
     * @param em
     * @param entity
     * @param register
     */
    static async insertIdentificationRecord (em: EntityManager, entity: Identification, register: string): Promise<InsertResult> {
        // SQLを生成及び実行
        const ret = await em
            .createQueryBuilder()
            .insert()
            .into(Identification)
            .values({
                bookId: entity.bookId,
                identificationCatalogCode: entity.identificationCatalogCode,
                identificationCatalogVersion: entity.identificationCatalogVersion,
                template: entity.template,
                templateHash: entity.templateHash,
                createdBy: register,
                updatedBy: register
            })
            .execute();
        return ret;
    }

    /**
     * エンティティの登録|更新（共通）
     * @param entity
     */
    static async saveEntity<T extends BaseEntity> (entity: T): Promise<T> {
        const connection = await connectDatabase();
        const queryRunner = connection.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            const ret = await queryRunner.manager.save(entity);
            await queryRunner.commitTransaction();
            return ret;
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw new AppError(Message.FAILED_SAVE_ENTITY, 500, err);
        } finally {
            await queryRunner.release();
            // await connection.close();
        }
    }

    static async getDataOperation (bookId: number, actorCode: number, appCode: number, wfCode: number, operationCode: number, incluedDisabled: boolean = false): Promise<DataOperation> {
        const connection = await connectDatabase();
        const repository = getRepository(DataOperation, connection.name);
        let sql = repository.createQueryBuilder('data_operation')
            .where('book_id = :book_id', { book_id: bookId })
            .andWhere('actor_catalog_code = :actor_catalog_code', { actor_catalog_code: actorCode })
            .andWhere('operation_catalog_code = :operation_catalog_code', { operation_catalog_code: operationCode });
        if (!incluedDisabled) {
            sql.andWhere('is_disabled = :is_disabled', { is_disabled: false });
        }
        if (appCode) {
            sql = sql.andWhere('app_catalog_code = :app', { app: appCode });
        }
        sql = sql.andWhere('wf_catalog_code IS NULL');
        const ret = await sql.getRawOne();
        return ret ? new DataOperation(ret) : null;
    }

    static async insertDataOperation (em: EntityManager, entity: DataOperation): Promise<InsertResult> {
        const ret = await em
            .createQueryBuilder()
            .insert()
            .into(DataOperation)
            .values({
                bookId: entity.bookId,
                type: entity.type,
                operationCatalogCode: entity.operationCatalogCode,
                operationCatalogVersion: entity.operationCatalogVersion,
                actorCatalogCode: entity.actorCatalogCode,
                actorCatalogVersion: entity.actorCatalogVersion,
                appCatalogCode: entity.appCatalogCode,
                appCatalogVersion: entity.appCatalogVersion,
                wfCatalogCode: null,
                wfCatalogVersion: null,
                createdBy: entity.createdBy,
                updatedBy: entity.updatedBy
            })
            .execute();
        return ret;
    }

    static async updateDataOperationCatalogVersion (em: EntityManager, id: number, version: number, register: string) {
        const ret = await em
            .createQueryBuilder()
            .update(DataOperation)
            .set({
                operationCatalogVersion: version,
                isDisabled: false,
                updatedBy: register
            })
            .where('id = :id', { id: id })
            .execute();
        return ret;
    }

    static async insertDataOperationDataType (em: EntityManager, entity: DataOperationDataType): Promise<InsertResult> {
        const ret = await em
            .createQueryBuilder()
            .insert()
            .into(DataOperationDataType)
            .values({
                catalogUuid: entity.catalogUuid,
                dataOperationId: entity.dataOperationId,
                documentCatalogCode: entity.documentCatalogCode,
                documentCatalogVersion: entity.documentCatalogVersion,
                eventCatalogCode: entity.eventCatalogCode,
                eventCatalogVersion: entity.eventCatalogVersion,
                thingCatalogCode: entity.thingCatalogCode,
                thingCatalogVersion: entity.thingCatalogVersion,
                consentFlg: entity.consentFlg,
                createdBy: entity.createdBy,
                updatedBy: entity.updatedBy
            })
            .execute();
        return ret;
    }

    /**
     * MyConditionBookレコード削除
     * @param em
     * @param pxrId
     * @param register
     */
    static async deleteCondBookRecordPxrId (em: EntityManager, pxrId: string, register: string, isPhysicalDelete: boolean = false): Promise<DeleteResult | UpdateResult> {
        let ret;
        if (isPhysicalDelete) {
            // 物理削除
            ret = await em
                .createQueryBuilder()
                .delete()
                .from(MyConditionBook)
                .where('pxr_id = :pxrId', { pxrId: pxrId })
                .execute();
        } else {
            // 論理削除
            ret = await em
                .createQueryBuilder()
                .update(MyConditionBook)
                .set({
                    isDisabled: true,
                    updatedBy: register
                })
                .where('pxr_id = :pxrId', { pxrId: pxrId })
                .andWhere('is_disabled = false')
                .execute();
        }
        return ret;
    }

    /**
     * 利用者ID連携UserIdCooperateレコード削除
     * @param em
     * @param bookId
     * @param register
     */
    static async deleteUserIdCooperateRecordBookId (em: EntityManager, bookId: number, register: string, isPhysicalDelete: boolean = false): Promise<DeleteResult | UpdateResult> {
        let ret;
        if (isPhysicalDelete) {
            // 物理削除
            ret = await em
                .createQueryBuilder()
                .delete()
                .from(UserIdCooperate)
                .where('book_id = :id', { id: bookId })
                .execute();
        } else {
            // 論理削除
            ret = await em
                .createQueryBuilder()
                .update(UserIdCooperate)
                .set({
                    isDisabled: true,
                    updatedBy: register
                })
                .where('book_id = :id', { id: bookId })
                .andWhere('is_disabled = false')
                .execute();
        }
        return ret;
    }

    /**
     * 本人性確認事項Identificationレコード削除
     * @param em
     * @param bookId
     * @param register
     */
    static async deleteIdentificationRecordBookId (em: EntityManager, bookId: number, register: string, isPhysicalDelete: boolean = false): Promise<DeleteResult | UpdateResult> {
        let ret;
        if (isPhysicalDelete) {
            // 物理削除
            ret = await em
                .createQueryBuilder()
                .delete()
                .from(Identification)
                .where('book_id = :id', { id: bookId })
                .execute();
        } else {
            // 論理削除
            ret = await em
                .createQueryBuilder()
                .update(Identification)
                .set({
                    isDisabled: true,
                    updatedBy: register
                })
                .where('book_id = :id', { id: bookId })
                .andWhere('is_disabled = false')
                .execute();
        }
        return ret;
    }

    /**
     * データ操作定義DataOperationレコード削除
     * @param em
     * @param dataId
     * @param register
     */
    static async deleteDataOperationRecord (em: EntityManager, dataId: number, register: string): Promise<UpdateResult> {
        const ret = await em
            .createQueryBuilder()
            .update(DataOperation)
            .set({
                isDisabled: true,
                updatedBy: register
            })
            .where('id = :id', { id: dataId })
            .andWhere('is_disabled = false')
            .execute();
        return ret;
    }

    /**
     * データ操作定義DataOperationレコードをBookIdで削除
     * @param em
     * @param bookId
     * @param register
     */
    static async deleteDataOperationRecordBookId (em: EntityManager, bookId: number, register: string, isPhysicalDelete: boolean = false): Promise<DeleteResult | UpdateResult> {
        let ret;
        if (isPhysicalDelete) {
            // 物理削除
            ret = await em
                .createQueryBuilder()
                .delete()
                .from(DataOperation)
                .where('book_id = :bookId', { bookId: bookId })
                .returning('id')
                .execute();
        } else {
            // 論理削除
            ret = await em
                .createQueryBuilder()
                .update(DataOperation)
                .set({
                    isDisabled: true,
                    updatedBy: register
                })
                .where('book_id = :bookId', { bookId: bookId })
                .andWhere('is_disabled = false')
                .returning('id')
                .execute();
        }
        return ret;
    }

    /**
     * データ操作定義DataOperationレコード削除
     * @param em
     * @param dataId
     * @param register
     */
    static async deleteDataOperationRecordFromActor (em: EntityManager, dataOperation: DataOperation): Promise<UpdateResult> {
        const sql = em.createQueryBuilder()
            .update(DataOperation)
            .set({
                isDisabled: true,
                updatedBy: dataOperation.updatedBy
            })
            .where('actor_catalog_code = :actorCatalogCode', { actorCatalogCode: dataOperation.actorCatalogCode })
            .andWhere('is_disabled = false')
            .andWhere('book_id = :bookId', { bookId: dataOperation.bookId })
            .andWhere('type = :type', { type: dataOperation.type })
            .andWhere('app_catalog_code = :appCatalogCode', { appCatalogCode: dataOperation.appCatalogCode })
            .andWhere('wf_catalog_code IS NULL')
            .returning('id');
        const ret = await sql.execute();
        return ret;
    }

    /**
     * データ操作定義データ種DataOperationDataTypeレコード削除
     * @param em
     * @param dataId
     * @param register
     */
    static async deleteDataOperationDataTypeRecord (em: EntityManager, dataId: number, register: string, isPhysicalDelete: boolean = false): Promise<DeleteResult | UpdateResult> {
        let ret;
        if (isPhysicalDelete) {
            ret = await em
                .createQueryBuilder()
                .delete()
                .from(DataOperationDataType)
                .where('data_operation_id = :id', { id: dataId })
                .execute();
        } else {
            ret = await em
                .createQueryBuilder()
                .update(DataOperationDataType)
                .set({
                    isDisabled: true,
                    updatedBy: register
                })
                .where('data_operation_id = :id', { id: dataId })
                .andWhere('is_disabled = false')
                .execute();
        }
        return ret;
    }

    /**
     * bookId、actorCatalogCode、wfCode、appCode、userIdをキーにUserIdCooperateレコードを無効化
     * @param bookId
     * @param actorCatalogCode
     */
    static async deleteUserIdCooperateRecordActorWfApUser (em: EntityManager, bookId: number, actorCatalogCode: number, regionCatalogCode: number, wfCatalogCode: number, appCatalogCode: number, userId: string, register: string): Promise<UpdateResult> {
        const connection = await connectDatabase();
        const repository = getRepository(UserIdCooperate, connection.name);
        let sql = repository.createQueryBuilder()
            .update(UserIdCooperate)
            .set({
                isDisabled: true,
                updatedBy: register
            })
            .where('is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('is_disabled = false')
            .andWhere('book_id = :book_id', { book_id: bookId })
            .andWhere('user_id = :user_id', { user_id: userId })
            .andWhere('actor_catalog_code = :actor_catalog_code', { actor_catalog_code: actorCatalogCode });
        if (regionCatalogCode) {
            sql = sql.andWhere('region_catalog_code = :region_catalog_code', { region_catalog_code: regionCatalogCode });
        }
        if (appCatalogCode) {
            sql = sql.andWhere('app_catalog_code = :app_catalog_code', { app_catalog_code: appCatalogCode });
        }
        sql = sql.andWhere('wf_catalog_code IS NULL');
        sql = sql.returning('id');
        const ret = await sql.execute();
        return ret;
    }

    static async getIdentifications (operator: Operator, message: any) {
        const connection = await connectDatabase();
        const pxrId = operator.getPxrId();
        const entity = await connection.getRepository(MyConditionBook).findOne({
            pxrId: pxrId,
            isDisabled: false
        });
        if (!entity) {
            throw new AppError(message.NOT_EXIST_BOOK, 400);
        }
        return connection.getRepository(Identification).find({
            where: {
                bookId: entity.id,
                isDisabled: false
            },
            order: {
                id: 'ASC'
            }
        });
    }

    /**
     * bookId,actorCode,wfCode(appCode)が一致するレコード件数を取得
     * @param bookId
     * @param actorCode
     * @param appCode
     * @param wfCode
     */
    static async getCooperate (bookId: number, actorCode: number, regionCode: number, appCode: number, wfCode: number, userId: string): Promise<UserIdCooperate> {
        const connection = await connectDatabase();
        const repository = getRepository(UserIdCooperate, connection.name);
        let sql = repository.createQueryBuilder('user_id_cooperate')
            .where('is_disabled = :is_disabled', { is_disabled: false });
        if (bookId) {
            sql = sql.andWhere('book_id = :bookId', { bookId: bookId });
        }
        if (actorCode) {
            sql = sql.andWhere('actor_catalog_code = :actor_catalog_code', { actor_catalog_code: actorCode });
        }
        if (regionCode) {
            sql = sql.andWhere('region_catalog_code = :region_catalog_code', { region_catalog_code: regionCode });
        }
        if (appCode) {
            sql = sql.andWhere('app_catalog_code = :app_catalog_code', { app_catalog_code: appCode });
        }
        sql = sql.andWhere('wf_catalog_code IS NULL');
        if (userId) {
            sql.andWhere('user_id = :user_id', { user_id: userId });
        }
        const ret = await sql.getRawOne();
        return ret ? new UserIdCooperate(ret) : null;
    }

    /**
     * 重複する利用者IDがあれば取得する
     * @param bookId
     * @param actorCode
     * @param appCode
     * @param wfCode
     */
    static async getDuplicateUserId (actorCode: number, appCode: number, wfCode: number, userId: string): Promise<UserIdCooperate> {
        const connection = await connectDatabase();
        const repository = getRepository(UserIdCooperate, connection.name);
        let sql = repository.createQueryBuilder('user_id_cooperate')
            .where('user_id = :user_id', { user_id: userId })
            .andWhere('actor_catalog_code = :actor_catalog_code', { actor_catalog_code: actorCode });
        if (appCode) {
            sql = sql.andWhere('app_catalog_code = :app_catalog_code', { app_catalog_code: appCode });
        }
        sql = sql.andWhere('wf_catalog_code IS NULL');
        const ret = await sql.getRawOne();
        return ret ? new UserIdCooperate(ret) : null;
    }

    /**
     * 連携レコードを解除申請中に変更する
     * @param em
     * @param entity
     */
    static async updateCooperateRelease (id: number, operator: Operator): Promise<UpdateResult> {
        const connection = await connectDatabase();
        const repository = connection.getRepository(UserIdCooperate);
        const ret = await repository.createQueryBuilder()
            .update(UserIdCooperate)
            .set({
                status: 2,
                updatedBy: operator.getLoginId()
            })
            .where('id = :id', { id: id })
            .andWhere('is_disabled = :is_disabled', { is_disabled: false })
            .execute();
        return ret;
    }

    /**
     * 申請中の連携レコードに利用者IDを設定する
     * @param em
     * @param entity
     */
    static async setUserIdToCooperate (em: EntityManager, entity: UserIdCooperate): Promise<UpdateResult> {
        const ret = await em
            .createQueryBuilder()
            .update(UserIdCooperate)
            .set({
                userId: entity.userId,
                updatedBy: entity.updatedBy
            })
            .where('id = :id', { id: entity.id })
            .andWhere('is_disabled = :is_disabled', { is_disabled: false })
            .execute();
        return ret;
    }

    /**
     * 申請中の連携レコードを連携済みにする
     * @param em
     * @param entity
     */
    static async setStatusToCooperate (em: EntityManager, entity: UserIdCooperate): Promise<UpdateResult> {
        const ret = await em
            .createQueryBuilder()
            .update(UserIdCooperate)
            .set({
                status: entity.status,
                startAt: entity.startAt,
                updatedBy: entity.updatedBy
            })
            .where('id = :id', { id: entity.id })
            .andWhere('is_disabled = :is_disabled', { is_disabled: false })
            .execute();
        return ret;
    }

    /**
     * ユーザID取得
     * @param pxrId
     * @param actor
     * @param app
     * @param wf
     */
    static async getUserIdByPxrId (pxrId: string, actor: number, app: number, wf: number): Promise<UserIdCooperate[]> {
        const connection = await connectDatabase();
        const repository = getRepository(UserIdCooperate, connection.name);
        let sql = repository.createQueryBuilder('user_id_cooperate')
            .innerJoin(MyConditionBook, 'my_condition_book', 'my_condition_book.id = user_id_cooperate.book_id')
            .where('user_id_cooperate.is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('my_condition_book.pxr_id = :pxr_id', { pxr_id: pxrId })
            .andWhere('my_condition_book.is_disabled = :is_disabled', { is_disabled: false });
        if (actor) {
            sql = sql.andWhere('user_id_cooperate.actor_catalog_code = :actor', { actor: actor });
        }
        if (app) {
            sql = sql.andWhere('user_id_cooperate.app_catalog_code = :app', { app: app });
        }
        sql = sql.andWhere('user_id_cooperate.wf_catalog_code IS NULL');
        if (!actor && !app) {
            sql = sql.andWhere('user_id_cooperate.actor_catalog_code IS NOT NULL');
            sql = sql.andWhere(
                new Brackets(subQb => {
                    subQb.orWhere('user_id_cooperate.app_catalog_code IS NOT NULL');
                })
            );
        }
        sql = sql.orderBy('user_id_cooperate.user_id');
        sql = sql.addOrderBy('user_id_cooperate.book_id');
        const result = await sql.getRawMany();
        const list: UserIdCooperate[] = [];
        result.forEach(element => {
            list.push(new UserIdCooperate(element));
        });
        return list;
    }

    /**
     * PXR-IDに紐づくBookを取得し、既に閉鎖 or それが解除されているか確認する
     * @param pxrId
     * @param flag
     */
    static async findBookWithPxrIdAndChecksDeletionFlag (pxrId: string, flag: boolean) {
        const result = await getConnection('postgres').getRepository(MyConditionBook)
            .findOne({
                pxrId: pxrId,
                isDisabled: false
            });

        if (!result) {
            throw new AppError(Message.PXR_ID_NOT_EXISTS, 400);
        }
        if (result.forceDeletionFlag === flag) {
            throw new AppError(Message.ALREADY_FORCE_DELETED, 400);
        }
        return result;
    }

    static async insertDataOperationNotification (em: EntityManager, entity: DataOperationNotification) {
        // SQLを生成及び実行
        await em.createQueryBuilder()
            .insert()
            .into(DataOperationNotification)
            .values({
                _value: entity._value,
                _ver: entity._ver,
                status: entity.status,
                isDisabled: entity.isDisabled,
                createdBy: entity.createdBy,
                updatedBy: entity.updatedBy
            })
            .execute();
    }

    static async updateDataOperationNotification (em: EntityManager, id: number, operator: Operator) {
        const treated = 1;
        await em.createQueryBuilder()
            .update(DataOperationNotification)
            .set({
                status: treated,
                updatedBy: operator.getLoginId()
            })
            .where('id = :id', { id: id })
            .where('is_disabled = :isDisabled', { isDisabled: false })
            .execute();
    }

    static async getUntreatedDataOperationNotifications (): Promise<DataOperationNotification[]> {
        const untreated = 0;
        const connection = await connectDatabase();
        const repository = getRepository(DataOperationNotification, connection.name);
        const ret = await repository
            .createQueryBuilder()
            .where('is_disabled = :isDisabled', { isDisabled: false })
            .andWhere('status = :status', { status: untreated })
            .getRawMany();
        const list: DataOperationNotification[] = [];
        ret.forEach(element => {
            list.push(new DataOperationNotification(element));
        });
        return list;
    }

    static async insertDataOperationNotificationInd (em: EntityManager, entity: DataOperationNotificationInd) {
        // SQLを生成及び実行
        await em.createQueryBuilder()
            .insert()
            .into(DataOperationNotificationInd)
            .values({
                dataOperationNotificationId: entity.dataOperationNotificationId,
                bookId: entity.bookId,
                status: entity.status,
                lastSentAt: entity.lastSentAt,
                isDisabled: entity.isDisabled,
                createdBy: entity.createdBy,
                updatedBy: entity.updatedBy
            })
            .execute();
    }

    static async getNotAgreedDataOperationNotificationTargets (offset: number, limit: number): Promise<any[]> {
        const notAgreed = 0;
        const oneWeek = 7;
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - oneWeek);
        const connection = await connectDatabase();
        const repository = getRepository(DataOperationNotificationInd, connection.name);
        const ret = await repository
            .createQueryBuilder('data_operation_notification_ind')
            .select('data_operation_notification_ind.id', 'id')
            .addSelect('my_condition_book.pxr_id', 'pxrId')
            .addSelect('data_operation_notification._value', '_value')
            .addSelect('data_operation_notification._ver', '_ver')
            .innerJoin(DataOperationNotification, 'data_operation_notification', 'data_operation_notification.id = data_operation_notification_ind.data_operation_notification_id')
            .innerJoin(MyConditionBook, 'my_condition_book', 'my_condition_book.id = data_operation_notification_ind.book_id')
            .where('data_operation_notification_ind.is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('data_operation_notification.is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('my_condition_book.is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('data_operation_notification_ind.status = :status', { status: notAgreed })
            .andWhere('(data_operation_notification_ind.last_sent_at IS null OR data_operation_notification_ind.last_sent_at < :lastSentAt)', { lastSentAt: oneWeekAgo })
            .orderBy('data_operation_notification_ind.id', 'ASC')
            .offset(offset)
            .limit(limit)
            .getRawMany();
        return ret;
    }

    static async updateDataOperationNotificationInds (em: EntityManager, bookId: number, operator: Operator) {
        await em.createQueryBuilder()
            .update(DataOperationNotificationInd)
            .set({
                lastSentAt: new Date(),
                updatedBy: operator.getLoginId()
            })
            .where('book_id = :bookId', { bookId: bookId })
            .andWhere('is_disabled = :isDisabled', { isDisabled: false })
            .execute();
    }

    /**
     * 利用規約同意レコード追加
     * @param em
     * @param entity
     * @param register
     */
    static async insertTouConsentRecord (em: EntityManager, entity: TouConsent, register: string): Promise<InsertResult> {
        // SQLを生成及び実行
        const ret = await em
            .createQueryBuilder()
            .insert()
            .into(TouConsent)
            .values({
                bookId: entity.bookId,
                termsType: entity.termsType,
                termsOfUseCode: entity.termsOfUseCode,
                termsOfUseVersion: entity.termsOfUseVersion,
                createdBy: register,
                updatedBy: register
            })
            .execute();
        return ret;
    }

    /**
     * pxrIdで利用者ID連携テーブルを検索する
     * @param pxrId
     */
    static async getUserIdCooperateByPxrId (pxrId: string): Promise<UserIdCooperate[]> {
        const connection = await connectDatabase();
        const repository = getRepository(UserIdCooperate, connection.name);
        const ret = await repository.createQueryBuilder('user_id_cooperate')
            .innerJoin(MyConditionBook, 'my_condition_book', 'my_condition_book.id = user_id_cooperate.book_id')
            .where('my_condition_book.pxr_id = :pxr_id', { pxr_id: pxrId })
            .andWhere('my_condition_book.is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('user_id_cooperate.is_disabled = :is_disabled', { is_disabled: false })
            .orderBy('user_id_cooperate.id')
            .getRawMany();
        const list: UserIdCooperate[] = [];
        ret.forEach(element => {
            list.push(new UserIdCooperate(element));
        });
        return list;
    }

    /**
     * pxrIdで利用規約同意テーブルを検索する
     * @param pxrId
     */
    static async getTouConsentByPxrId (pxrId: string): Promise<TouConsent[]> {
        const connection = await connectDatabase();
        const repository = getRepository(TouConsent, connection.name);
        const ret = await repository.createQueryBuilder('tou_consent')
            .innerJoin(MyConditionBook, 'my_condition_book', 'my_condition_book.id = tou_consent.book_id')
            .where('my_condition_book.pxr_id = :pxr_id', { pxr_id: pxrId })
            .andWhere('my_condition_book.is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('tou_consent.is_disabled = :is_disabled', { is_disabled: false })
            .orderBy('tou_consent.id')
            .getRawMany();
        const list: TouConsent[] = [];
        ret.forEach(element => {
            list.push(new TouConsent(element));
        });
        return list;
    }

    /**
     * 未処理の利用規約更新通知管理を取得
     */
    static async getUntreatedTermsOfUseNotifications (termsType: number): Promise<TermsOfUseNotification[]> {
        const untreated = 0;
        const connection = await connectDatabase();
        const repository = getRepository(TermsOfUseNotification, connection.name);
        const ret = await repository
            .createQueryBuilder('terms_of_use_notification')
            .where('terms_of_use_notification.is_disabled = :isDisabled', { isDisabled: false })
            .andWhere('terms_of_use_notification.terms_type = :termsType', { termsType: termsType })
            .andWhere('terms_of_use_notification.status = :status', { status: untreated })
            .getRawMany();
        const list: TermsOfUseNotification[] = [];
        ret.forEach(element => {
            list.push(new TermsOfUseNotification(element));
        });
        return list;
    }

    /**
     * ブックIDによる個人の同意を取得
     * @param code
     */
    static async getTouConsentByCatalogCode (code: number, termsType: number): Promise<TouConsent[]> {
        const connection = await connectDatabase();
        const repository = getRepository(TouConsent, connection.name);
        const ret = await repository.createQueryBuilder('tou_consent')
            .where('is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('terms_type = :termsType', { termsType: termsType })
            .andWhere('terms_of_use_code = :code', { code: code })
            .getRawMany();
        const list: TouConsent[] = [];
        ret.forEach(element => {
            list.push(new TouConsent(element));
        });
        return list;
    }

    /**
     * 利用規約更新通知個人管理を登録
     * @param em
     * @param entity
     */
    static async insertTermsOfUseNotificationInd (em: EntityManager, entity: TermsOfUseNotificationInd) {
        // SQLを生成及び実行
        await em.createQueryBuilder()
            .insert()
            .into(TermsOfUseNotificationInd)
            .values({
                termsOfUseNotificationId: entity.termsOfUseNotificationId,
                bookId: entity.bookId,
                status: entity.status,
                lastSentAt: entity.lastSentAt,
                isDisabled: entity.isDisabled,
                createdBy: entity.createdBy,
                updatedBy: entity.updatedBy
            })
            .execute();
    }

    static async updateBookStatusConsentRequest (em: EntityManager, bookId: number, status: number, loginId: string) {
        await em.createQueryBuilder()
            .update(MyConditionBook)
            .set({
                status: status,
                updatedBy: loginId
            })
            .where('id = :id', { id: bookId })
            .andWhere('is_disabled = :isDisabled', { isDisabled: false })
            .execute();
    }

    /**
     * 利用規約更新通知管理を登録する
     * @param em
     * @param entity
     */
    static async insertTermsOfUseNotification (em: EntityManager, entity: TermsOfUseNotification) {
        // SQLを生成及び実行
        await em.createQueryBuilder()
            .insert()
            .into(TermsOfUseNotification)
            .values({
                termsType: entity.termsType,
                _value: entity._value,
                _ver: entity._ver,
                status: entity.status,
                isDisabled: entity.isDisabled,
                createdBy: entity.createdBy,
                updatedBy: entity.updatedBy
            })
            .execute();
    }

    /**
     * 利用規約更新通知管理を処理済みに更新する
     * @param em
     * @param id
     * @param operator
     */
    static async updateTermsOfUseNotification (em: EntityManager, id: number, operator: Operator) {
        const treated = 1;
        await em.createQueryBuilder()
            .update(TermsOfUseNotification)
            .set({
                status: treated,
                updatedBy: operator.getLoginId()
            })
            .where('id = :id', { id: id })
            .andWhere('is_disabled = :isDisabled', { isDisabled: false })
            .execute();
    }

    /**
     * 利用規約更新通知の個人管理同意の最大バージョン取得
     * @param em
     * @param code
     */
    static async getCountMoreThanVersionTermsOfUse (code: Number, ver: Number) {
        const treated = 1;
        const connection = await connectDatabase();
        const repository = getRepository(TermsOfUseNotification, connection.name);
        const ret = await repository
            .createQueryBuilder('terms_of_use_notification')
            .where('terms_of_use_notification.is_disabled = :isDisabled', { isDisabled: false })
            .andWhere('terms_of_use_notification._value = :_value', { _value: code })
            .andWhere('terms_of_use_notification._ver > :_ver', { _ver: ver })
            .andWhere('terms_of_use_notification.status = :status', { status: treated })
            .getCount();
        return ret;
    }

    /**
     * 利用規約の更新通知の対象取得
     * @param offset
     * @param limit
     * @param notificationPeriod
     */
    static async getNotAgreedTermsOfUseNotificationTargets (offset: number, limit: number, amount: number, unit: any, termsType: number) {
        const notAgreed = 0;
        const notPeriod = moment(new Date()).add(-amount, unit).toDate();
        const connection = await connectDatabase();
        const repository = getRepository(TermsOfUseNotificationInd, connection.name);
        const ret = await repository
            .createQueryBuilder('terms_of_use_notification_ind')
            .select('terms_of_use_notification_ind.id', 'id')
            .addSelect('my_condition_book.pxr_id', 'pxrId')
            .addSelect('terms_of_use_notification._value', '_value')
            .addSelect('terms_of_use_notification._ver', '_ver')
            .innerJoin(TermsOfUseNotification, 'terms_of_use_notification', 'terms_of_use_notification.id = terms_of_use_notification_ind.terms_of_use_notification_id')
            .innerJoin(MyConditionBook, 'my_condition_book', 'my_condition_book.id = terms_of_use_notification_ind.book_id')
            .where('terms_of_use_notification_ind.is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('terms_of_use_notification.is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('my_condition_book.is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('terms_of_use_notification.terms_type = :terms_type', { terms_type: termsType })
            .andWhere('terms_of_use_notification_ind.status = :status', { status: notAgreed })
            .andWhere('(terms_of_use_notification_ind.last_sent_at IS null OR terms_of_use_notification_ind.last_sent_at < :lastSentAt)', { lastSentAt: notPeriod })
            .orderBy('terms_of_use_notification_ind.id', 'ASC')
            .offset(offset)
            .limit(limit)
            .getRawMany();
        return ret;
    }

    static async getLessThanTouNotificationIndIds (_value: number, _ver: number, operator: OperatorDomain, termsType: number): Promise<number[]> {
        const notAgreed = 0;
        const connection = await connectDatabase();
        const repository = getRepository(TermsOfUseNotificationInd, connection.name);
        const entity = await repository
            .createQueryBuilder('terms_of_use_notification_ind')
            .select('terms_of_use_notification_ind.id', 'id')
            .innerJoin(TermsOfUseNotification, 'terms_of_use_notification', 'terms_of_use_notification.id = terms_of_use_notification_ind.terms_of_use_notification_id')
            .innerJoin(MyConditionBook, 'my_condition_book', 'my_condition_book.id = terms_of_use_notification_ind.book_id')
            .where('my_condition_book.pxr_id = :pxr_id', { pxr_id: operator.pxrId })
            .andWhere('my_condition_book.is_disabled = false')
            .andWhere('terms_of_use_notification.terms_type = :terms_type', { terms_type: termsType })
            .andWhere('terms_of_use_notification._value = :_value', { _value: _value })
            .andWhere('terms_of_use_notification._ver <= :_ver', { _ver: _ver })
            .andWhere('terms_of_use_notification.is_disabled = false')
            .andWhere('terms_of_use_notification_ind.is_disabled = false')
            .andWhere('terms_of_use_notification_ind.status = :status', { status: notAgreed })
            .getRawMany();
        const res: number[] = [];
        for (const ele of entity) {
            res.push(Number(ele.id));
        }
        return res;
    }

    /**
     * 利用規約更新通知最終送信日時登録
     * @param em
     * @param bookId
     * @param operator
     */
    static async updateLastSentAtTermsOfUseNotificationInds (em: EntityManager, pxrId: string, termsType: number, operator: Operator) {
        const notAgreed = 0;
        await em.createQueryBuilder()
            .update(TermsOfUseNotificationInd)
            .set({
                lastSentAt: new Date(),
                updatedBy: operator.getLoginId()
            })
            .where('id IN ' +
                em.createQueryBuilder()
                    .subQuery()
                    .select('terms_of_use_notification_ind.id')
                    .from(TermsOfUseNotificationInd, 'terms_of_use_notification_ind')
                    .innerJoin(TermsOfUseNotification, 'terms_of_use_notification', 'terms_of_use_notification.id = terms_of_use_notification_ind.terms_of_use_notification_id')
                    .innerJoin(MyConditionBook, 'my_condition_book', 'my_condition_book.id = terms_of_use_notification_ind.book_id')
                    .where('my_condition_book.pxr_id = :pxr_id')
                    .andWhere('terms_of_use_notification.terms_type = :terms_type')
                    .andWhere('terms_of_use_notification_ind.status = :status')
                    .andWhere('terms_of_use_notification.is_disabled = :is_disabled')
                    .andWhere('terms_of_use_notification_ind.is_disabled = :is_disabled')
                    .andWhere('my_condition_book.is_disabled = :is_disabled')
                    .getQuery())
            .setParameters({ pxr_id: pxrId, terms_type: termsType, status: notAgreed, is_disabled: false })
            .execute();
    }

    /**
     * 利用規約更新通知個人管理を同意済に更新する
     * @param em
     * @param bookId
     * @param operator
     */
    static async updateTermsOfUseNotificationInds (em: EntityManager, touNotificationIndIds: number[], loginId: string) {
        const consented = 1;
        await em.createQueryBuilder()
            .update(TermsOfUseNotificationInd)
            .set({
                status: consented,
                updatedBy: loginId
            })
            .where('id IN (:...ids)', { ids: touNotificationIndIds })
            .andWhere('is_disabled = :isDisabled', { isDisabled: false })
            .execute();
    }

    /**
    * pxrIdで利用規約更新通知管理テーブルを検索する
    * @param pxrId
    */
    static async getTermsOfUseNotificationsByPxrId (pxrId: string): Promise<TermsOfUseNotification[]> {
        const notAgreed = 0;
        const connection = await connectDatabase();
        const repository = getRepository(TermsOfUseNotification, connection.name);
        const ret = await repository.createQueryBuilder('terms_of_use_notification')
            .innerJoin(TermsOfUseNotificationInd, 'terms_of_use_notification_ind', 'terms_of_use_notification_ind.terms_of_use_notification_id = terms_of_use_notification.id')
            .innerJoin(MyConditionBook, 'my_condition_book', 'my_condition_book.id = terms_of_use_notification_ind.book_id')
            .where('my_condition_book.pxr_id = :pxr_id', { pxr_id: pxrId })
            .andWhere('my_condition_book.is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('terms_of_use_notification.is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('terms_of_use_notification_ind.is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('terms_of_use_notification_ind.status = :status', { status: notAgreed })
            .orderBy('terms_of_use_notification_ind.id')
            .getRawMany();
        const list: TermsOfUseNotification[] = [];
        ret.forEach(element => {
            list.push(new TermsOfUseNotification(element));
        });
        return list;
    }

    static async getNotAgreedDataOperationNotificationByPxrId (pxrId: string): Promise<any[]> {
        const notAgreed = 0;
        const connection = await connectDatabase();
        const repository = getRepository(DataOperationNotificationInd, connection.name);
        const ret = await repository
            .createQueryBuilder('data_operation_notification_ind')
            .select('data_operation_notification_ind.id', 'id')
            .addSelect('my_condition_book.pxr_id', 'pxrId')
            .addSelect('data_operation_notification._value', '_value')
            .addSelect('data_operation_notification._ver', '_ver')
            .innerJoin(DataOperationNotification, 'data_operation_notification', 'data_operation_notification.id = data_operation_notification_ind.data_operation_notification_id')
            .innerJoin(MyConditionBook, 'my_condition_book', 'my_condition_book.id = data_operation_notification_ind.book_id')
            .where('my_condition_book.pxr_id = :pxr_id', { pxr_id: pxrId })
            .andWhere('data_operation_notification_ind.is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('data_operation_notification.is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('my_condition_book.is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('data_operation_notification_ind.status = :status', { status: notAgreed })
            .orderBy('data_operation_notification_ind.id', 'ASC')
            .getRawMany();
        return ret;
    }

    static async getTargetTermsOfUseCode (_value: number, _ver: number, operator: OperatorDomain, termsType: number): Promise<any> {
        const notAgreed = 0;
        const connection = await connectDatabase();
        const repository = getRepository(TermsOfUseNotification, connection.name);
        const entity = await repository
            .createQueryBuilder('terms_of_use_notification')
            .select('my_condition_book.id', 'bookId')
            .addSelect('terms_of_use_notification_ind.id', 'notificationIndId')
            .addSelect('terms_of_use_notification._value', 'code')
            .addSelect('terms_of_use_notification._ver', 'ver')
            .innerJoin(TermsOfUseNotificationInd, 'terms_of_use_notification_ind', 'terms_of_use_notification_ind.terms_of_use_notification_id = terms_of_use_notification.id')
            .innerJoin(MyConditionBook, 'my_condition_book', 'my_condition_book.id = terms_of_use_notification_ind.book_id')
            .where('my_condition_book.pxr_id = :pxr_id', { pxr_id: operator.pxrId })
            .andWhere('my_condition_book.is_disabled = false')
            .andWhere('terms_of_use_notification.terms_type = :terms_type', { terms_type: termsType })
            .andWhere('terms_of_use_notification._value = :_value', { _value: _value })
            .andWhere('terms_of_use_notification._ver = :_ver', { _ver: _ver })
            .andWhere('terms_of_use_notification.is_disabled = false')
            .andWhere('terms_of_use_notification_ind.is_disabled = false')
            .andWhere('terms_of_use_notification_ind.status = :status', { status: notAgreed })
            .getRawOne();
        return entity;
    }

    /**
     * 削除対象Book取得
     */
    static async getDeleteTargetBook (amount: number, unit: any, offset: number, limit: number, includeDisabled: Boolean = false) {
        const closeAvailable = true;
        const closeAvailableAt = moment(new Date()).add(-amount, unit).toDate();
        const connection = await connectDatabase();
        const repository = getRepository(MyConditionBook, connection.name);
        let sql = repository
            .createQueryBuilder('my_condition_book')
            .select('my_condition_book.pxr_id', 'pxrId')
            .addSelect('my_condition_book.attributes', 'userInfo')
            .where('my_condition_book.book_close_available = :closeAvailable', { closeAvailable: closeAvailable })
            .andWhere('my_condition_book.book_close_available_at < :closeAvailableAt', { closeAvailableAt: closeAvailableAt });
        if (!includeDisabled) {
            sql = sql.andWhere('is_disabled = :isDisabled', { isDisabled: false });
        }
        const ret = await sql.orderBy('my_condition_book.id')
            .offset(offset)
            .limit(limit)
            .getRawMany();
        return ret;
    }

    /**
     * 利用規約未同意個人取得
     * @param termsType
     */
    static async getNotAgreedTouBookRecord (termsType: number, offset: number, limit: number): Promise<any[]> {
        const notAgreed = 0;
        const connection = await connectDatabase();
        const repository = getRepository(MyConditionBook, connection.name);
        const sql = repository
            .createQueryBuilder('my_condition_book')
            .select('my_condition_book.id', 'bookId')
            .addSelect('my_condition_book.pxr_id', 'pxrId')
            .addSelect('terms_of_use_notification._value', '_value')
            .addSelect('terms_of_use_notification._ver', '_ver')
            .innerJoin(TermsOfUseNotificationInd,
                'terms_of_use_notification_ind',
                'terms_of_use_notification_ind.book_id = my_condition_book.id AND terms_of_use_notification_ind.is_disabled = :is_disabled', { is_disabled: false })
            .innerJoin(TermsOfUseNotification,
                'terms_of_use_notification',
                'terms_of_use_notification.id = terms_of_use_notification_ind.terms_of_use_notification_id AND terms_of_use_notification.is_disabled = :is_disabled', { is_disabled: false })
            .where('my_condition_book.is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('terms_of_use_notification.terms_type = :terms_type', { terms_type: termsType })
            .andWhere('terms_of_use_notification_ind.status = :status', { status: notAgreed })
            .andWhere('terms_of_use_notification_ind.last_sent_at IS NOT NULL')
            .orderBy('my_condition_book.id', 'ASC')
            .offset(offset)
            .limit(limit);
        const ret = await sql.getRawMany();
        return ret;
    }

    /**
     *  My-Condition-Data出力コードレコード取得
     * @param entity
     * @param offset
     * @param limit
     */
    static async getMyConditionDataOutputCodeRecord (entity: MyConditionDataOutputCode, offset: number, limit: number): Promise<any[]> {
        // SQLを生成及び実行
        const connection = await connectDatabase();
        const repository = getRepository(MyConditionDataOutputCode, connection.name);
        let sql = repository.createQueryBuilder('my_condition_data_output_code')
            .where('my_condition_data_output_code.is_disabled = :is_disabled', { is_disabled: false });
        if (entity.bookId) {
            sql = sql.andWhere('my_condition_data_output_code.book_id = :book_id', { book_id: entity.bookId });
        }
        if (entity.code) {
            sql = sql.andWhere('my_condition_data_output_code.code = :code', { code: entity.code });
        }
        if (entity && typeof entity.outputType === 'number') {
            sql = sql.andWhere('my_condition_data_output_code.output_type = :output_type', { output_type: entity.outputType });
        }
        if (entity.actorCatalogCode) {
            sql = sql.andWhere('my_condition_data_output_code.actor_catalog_code = :actor_catalog_code', { actor_catalog_code: entity.actorCatalogCode });
        }
        if (entity.regionCatalogCode) {
            sql = sql.andWhere('my_condition_data_output_code.region_catalog_code = :region_catalog_code', { region_catalog_code: entity.regionCatalogCode });
        }
        if (entity.appCatalogCode) {
            sql = sql.andWhere('my_condition_data_output_code.app_catalog_code = :app_catalog_code', { app_catalog_code: entity.appCatalogCode });
        }
        sql = sql.andWhere('my_condition_data_output_code.wf_catalog_code IS NULL');
        if (entity.bucketName) {
            sql = sql.andWhere('my_condition_data_output_code.bucket_name = :bucket_name', { bucket_name: entity.bucketName });
        }
        if (entity.presignedUrlExpireAt) {
            sql = sql.andWhere('my_condition_data_output_code.presignedUrlExpireAt <= :presignedUrlExpireAt', { presignedUrlExpireAt: entity.presignedUrlExpireAt });
        }
        if (entity && typeof entity.presignedUrlStatus === 'number') {
            sql = sql.andWhere('my_condition_data_output_code.presigned_url_status = :presigned_url_status', { presigned_url_status: entity.presignedUrlStatus });
        }
        if (entity && typeof entity.releaseCooperateApprovalStatus === 'number') {
            sql = sql.andWhere('my_condition_data_output_code.release_cooperate_approval_status = :release_cooperate_approval_status', { release_cooperate_approval_status: entity.releaseCooperateApprovalStatus });
        }
        if (entity && typeof entity.releaseCooperateStatus === 'number') {
            sql = sql.andWhere('my_condition_data_output_code.release_cooperate_status = :release_cooperate_status', { release_cooperate_status: entity.releaseCooperateStatus });
        }
        if (entity && typeof entity.releaseServiceCooperateStatus === 'number') {
            sql = sql.andWhere('my_condition_data_output_code.release_service_cooperate_status = :release_service_cooperate_status', { release_service_cooperate_status: entity.releaseServiceCooperateStatus });
        }
        if (entity && typeof entity.isProcessing === 'boolean') {
            sql = sql.andWhere('my_condition_data_output_code.is_processing = :is_processing', { is_processing: entity.isProcessing });
        }
        applicationLogger.info(sql.getSql());
        applicationLogger.info(JSON.stringify(sql.getParameters()));
        const ret = await sql
            .offset(offset)
            .limit(limit)
            .getRawMany();

        return ret;
    }

    /**
     *  出力データ管理レコード取得
     * @param entity
     * @param types
     * @param offset
     * @param limit
     */
    static async getMcdOutputCodeDataFile (entity: McdOutputCodeDataFile, types: number[], offset: number, limit: number): Promise<any[]> {
        // SQLを生成及び実行
        const connection = await connectDatabase();
        const repository = getRepository(McdOutputCodeDataFile, connection.name);
        let sql = repository.createQueryBuilder('mcd_output_code_data_file')
            .select('mcd_output_code_data_file.id', 'id')
            .addSelect('my_condition_book.pxr_id', 'pxrId')
            .addSelect('my_condition_data_output_code.id', 'mcdOutputCodeId')
            .addSelect('my_condition_data_output_code.code', 'code')
            .addSelect('my_condition_data_output_code.output_type', 'outputType')
            .addSelect('my_condition_data_output_code.bucket_name', 's3Bucket')
            .addSelect('my_condition_data_output_code.presigned_url_expire_at', 'expirationDate')
            .addSelect('mcd_output_code_actor.id', 'mcdOutputCodeActorId')
            .addSelect('my_condition_data_output_code.region_catalog_code', 'regionCatalogCode')
            .addSelect('my_condition_data_output_code.region_catalog_version', 'regionCatalogVersion')
            .addSelect('mcd_output_code_actor.actor_catalog_code', 'actorCatalogCode')
            .addSelect('mcd_output_code_actor.actor_catalog_version', 'actorCatalogVersion')
            .addSelect('mcd_output_code_actor.app_catalog_code', 'appCatalogCode')
            .addSelect('mcd_output_code_actor.app_catalog_version', 'appCatalogVersion')
            .addSelect('mcd_output_code_actor.ind_request', 'request')
            .addSelect('mcd_output_code_data_file.output_file_type', 'outputFileType')
            .addSelect('mcd_output_code_data_file.upload_file_type', 'uploadFileType')
            .addSelect('mcd_output_code_data_file.notificationStatus', 'extDataRequested')
            .addSelect('mcd_output_code_data_file.file_name', 'fileName')
            .addSelect('mcd_output_code_data_file.input_file_preparation_status', 'inputFileIsReady')
            .addSelect('mcd_output_code_data_file.output_status', 'outputStatus')
            .addSelect('mcd_output_code_data_file.delete_data_spec', 'isDeleteTarget')
            .addSelect('mcd_output_code_data_file.delete_status', 'deleteStatus')
            .addSelect('mcd_output_code_data_file.is_processing', 'processing')
            .innerJoin(MyConditionDataOutputCode, 'my_condition_data_output_code',
                'my_condition_data_output_code.code = mcd_output_code_data_file.mcd_output_code AND my_condition_data_output_code.is_disabled = :is_disabled', { is_disabled: false })
            .innerJoin(MyConditionBook, 'my_condition_book',
                'my_condition_book.id = my_condition_data_output_code.book_id')
            .leftJoin(McdOutputCodeActor, 'mcd_output_code_actor',
                'mcd_output_code_actor.id = mcd_output_code_data_file.mcd_output_code_actor_id AND mcd_output_code_actor.is_disabled = :is_disabled', { is_disabled: false })
            .where('mcd_output_code_data_file.is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('mcd_output_code_actor.wf_catalog_code IS NULL');
        if (entity.mcdOutputCodeActorId) {
            sql = sql.andWhere('mcd_output_code_data_file.mcd_output_code_actor_id = :mcd_output_code_actor_id', { mcd_output_code_actor_id: entity.mcdOutputCodeActorId });
        }
        if (entity.mcdOutputCode) {
            sql = sql.andWhere('mcd_output_code_data_file.mcd_output_code = :mcd_output_code', { mcd_output_code: entity.mcdOutputCode });
        }
        if (entity.actorCatalogCode) {
            sql = sql.andWhere('mcd_output_code_data_file.actor_catalog_code = :actor_catalog_code', { actor_catalog_code: entity.actorCatalogCode });
        }
        if (entity.actorCatalogVersion) {
            sql = sql.andWhere('mcd_output_code_data_file.actor_catalog_version = :actor_catalog_version', { actor_catalog_version: entity.actorCatalogVersion });
        }
        if (entity && typeof entity.ouputDataApprovalStatus === 'number') {
            sql = sql.andWhere('mcd_output_code_data_file.output_data_approval_status = :output_data_approval_status', { output_data_approval_status: entity.ouputDataApprovalStatus });
        }
        if (entity && typeof entity.outputFileType === 'number') {
            sql = sql.andWhere('mcd_output_code_data_file.output_file_type = :output_file_type', { output_file_type: entity.outputFileType });
        }
        if (entity && typeof entity.uploadFileType === 'number') {
            sql = sql.andWhere('mcd_output_code_data_file.upload_file_type = :upload_file_type', { upload_file_type: entity.uploadFileType });
        }
        if (entity && typeof entity.notificationStatus === 'number') {
            sql = sql.andWhere('mcd_output_code_data_file.notification_status = :notification_status', { notification_status: entity.notificationStatus });
        }
        if (entity.fileName) {
            sql = sql.andWhere('mcd_output_code_data_file.file_name = :file_name', { file_name: entity.fileName });
        }
        if (entity && typeof entity.inputFilePreparationStatus === 'number') {
            sql = sql.andWhere('mcd_output_code_data_file.input_file_preparation_status = :input_file_preparation_status', { input_file_preparation_status: entity.inputFilePreparationStatus });
        }
        if (entity && typeof entity.outputStatus === 'number') {
            sql = sql.andWhere('mcd_output_code_data_file.output_status = :output_status', { output_status: entity.outputStatus });
        }
        if (entity && typeof entity.deleteDataSpec === 'number') {
            sql = sql.andWhere('mcd_output_code_data_file.delete_data_spec = :delete_data_spec', { delete_data_spec: entity.deleteDataSpec });
        }
        if (entity && typeof entity.deleteStatus === 'number') {
            sql = sql.andWhere('mcd_output_code_data_file.delete_status = :delete_status', { delete_status: entity.deleteStatus });
        }
        if (entity && typeof entity.isProcessing === 'boolean') {
            sql = sql.andWhere('mcd_output_code_data_file.is_processing = :is_processing', { is_processing: entity.isProcessing });
        }
        if (types) {
            sql = sql.andWhere('my_condition_data_output_code.output_type IN (:...types)', { types: types });
        }
        const ret = await sql
            .offset(offset)
            .limit(limit)
            .getRawMany();

        return ret;
    }

    /**
     * My-Condition-Data出力コード取得
     * @param id
     */
    static async getMyConditionDataOutputCodeById (id: number): Promise<MyConditionDataOutputCode> {
        const connection = await connectDatabase();
        const repository = connection.getRepository(MyConditionDataOutputCode);
        return repository.findOne({
            id: id,
            isDisabled: false
        });
    }

    /**
     * My-Condition-Data出力コード更新
     * @param em
     * @param id
     * @param version
     * @param register
     * @returns
     */
    static async updateMyConditionDataOutputCodeById (entity: MyConditionDataOutputCode) {
        const connection = await connectDatabase();
        const ret = await connection.createQueryBuilder()
            .update(MyConditionDataOutputCode)
            .set({
                bookId: entity.bookId,
                code: entity.code,
                outputType: entity.outputType,
                actorCatalogCode: entity.actorCatalogCode,
                actorCatalogVersion: entity.actorCatalogVersion,
                regionCatalogCode: entity.regionCatalogCode,
                regionCatalogVersion: entity.regionCatalogVersion,
                appCatalogCode: entity.appCatalogCode,
                appCatalogVersion: entity.appCatalogVersion,
                wfCatalogCode: null,
                wfCatalogVersion: null,
                bucketName: entity.bucketName,
                presignedUrlExpireAt: entity.presignedUrlExpireAt,
                presignedUrlStatus: entity.presignedUrlStatus,
                releaseCooperateApprovalStatus: entity.releaseCooperateApprovalStatus,
                releaseCooperateStatus: entity.releaseCooperateStatus,
                releaseServiceCooperateStatus: entity.releaseServiceCooperateStatus,
                isProcessing: entity.isProcessing,
                updatedBy: entity.updatedBy
            })
            .where('id = :id', { id: entity.id })
            .andWhere('is_disabled = :is_disabled', { is_disabled: false })
            .execute();
        return ret;
    }

    /**
     * 出力データ管理取得
     * @param id
     */
    static async getMcdOutputCodeDataFileById (id: number): Promise<McdOutputCodeDataFile> {
        const connection = await connectDatabase();
        const repository = connection.getRepository(McdOutputCodeDataFile);
        return repository.findOne({
            id: id,
            isDisabled: false
        });
    }

    /**
     * 指定されたbookIdとリージョンコードで利用者ID連携レコードを取得します
     * @param bookId
     * @param regions
     */
    static async getCooperatedRecordByBookIdAndRegions (bookId: number, regions: number[]): Promise<UserIdCooperate[]> {
        const cooperated = 1;
        const connection = await connectDatabase();
        const repository = getRepository(UserIdCooperate, connection.name);
        const entity = repository.createQueryBuilder('user_id_cooperate')
            .where('user_id_cooperate.is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('user_id_cooperate.region_catalog_code IN (:...regions)', { regions: regions })
            .andWhere('user_id_cooperate.book_id = :book_id', { book_id: bookId })
            .andWhere('user_id_cooperate.status = :status', { status: cooperated })
            .andWhere('user_id_cooperate.wf_catalog_code is null');
        const result = await entity.getRawMany();
        const list: UserIdCooperate[] = [];
        result.forEach(element => {
            list.push(new UserIdCooperate(element));
        });
        return list;
    }

    /**
     * 指定されたbookId、アクターコード、app/wf/regionコードで利用者ID連携レコードを取得します
     * @param bookId
     * @param actor
     * @param region
     */
    static async getCooperatedRecordByBookIdAndActor (bookId: number, actor: number, code: number, type: number): Promise<UserIdCooperate> {
        const APP = 0;
        const REGION = 2;
        const connection = await connectDatabase();
        const repository = getRepository(UserIdCooperate, connection.name);
        const sql = repository.createQueryBuilder('user_id_cooperate')
            .where('user_id_cooperate.is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('user_id_cooperate.actor_catalog_code = :actor', { actor: actor })
            .andWhere('user_id_cooperate.book_id = :book_id', { book_id: bookId });
        if (type === APP) {
            sql.andWhere('user_id_cooperate.app_catalog_code = :app', { app: code });
        } else if (type === REGION) {
            sql.andWhere('user_id_cooperate.region_catalog_code = :region', { region: code });
        }
        sql.andWhere('user_id_cooperate.wf_catalog_code IS NULL');
        const res = await sql.getRawOne();
        return res ? new UserIdCooperate(res) : null;
    }

    /**
     * APP/WF連携中の利用者ID連携レコードを取得します
     * @param bookId
     * @param appWfCodes
     */
    static async getAppWfCooperatedRecordByBookIdAndAppWfCodes (bookId: number, appWfCodes: number[]): Promise<UserIdCooperate[]> {
        const cooperated = 1;
        const connection = await connectDatabase();
        const repository = getRepository(UserIdCooperate, connection.name);
        const entity = repository.createQueryBuilder('user_id_cooperate')
            .where('user_id_cooperate.is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('user_id_cooperate.book_id = :book_id', { book_id: bookId })
            .andWhere('user_id_cooperate.status = :status', { status: cooperated })
            .andWhere('user_id_cooperate.wf_catalog_code  IS NULL');
        if (appWfCodes && appWfCodes.length > 0) {
            entity.andWhere(
                new Brackets(subQb => {
                    subQb.orWhere('user_id_cooperate.app_catalog_code IN (:...codes)', { codes: appWfCodes });
                })
            );
        }
        const result = await entity.getRawMany();
        const list: UserIdCooperate[] = [];
        result.forEach(element => {
            list.push(new UserIdCooperate(element));
        });
        return list;
    }

    /**
     * 出力データ収集アクター取得
     */
    static async getOutputCondition (offset: number, limit: number, id?: number, mcdOutputCodeId?: number, approved?: number, isServiceCanceled?: boolean) {
        const enabled = false;
        const releasedServiceStatus = 1;
        const connection = await connectDatabase();
        const repository = getRepository(McdOutputCodeActor, connection.name);
        const sql = repository
            .createQueryBuilder('mcd_output_code_actor')
            .select('my_condition_data_output_code.code', 'code')
            .addSelect('my_condition_data_output_code.output_type', 'type')
            .addSelect('mcd_output_code_actor.id', 'id')
            .addSelect('mcd_output_code_actor.target_term_start', 'start')
            .addSelect('mcd_output_code_actor.target_term_end', 'end')
            .addSelect('mcd_output_code_actor.actor_catalog_code', 'actorCode')
            .addSelect('mcd_output_code_actor.actor_catalog_version', 'actorVersion')
            .addSelect('mcd_output_code_actor.app_catalog_code', 'appCode')
            .addSelect('mcd_output_code_actor.app_catalog_version', 'appVersion')
            .addSelect('mcd_output_code_actor.return_data_spec', 'returnable')
            .addSelect('mcd_output_code_actor.delete_data_spec', 'deletable')
            .addSelect('mcd_output_code_actor.ind_request', 'request')
            .addSelect('mcd_output_code_data_type.document_catalog_code', 'documentCode')
            .addSelect('mcd_output_code_data_type.document_catalog_version', 'documentVersion')
            .addSelect('mcd_output_code_data_type.document_id', 'documentId')
            .addSelect('mcd_output_code_data_type.event_catalog_code', 'eventCode')
            .addSelect('mcd_output_code_data_type.event_catalog_version', 'eventVersion')
            .addSelect('mcd_output_code_data_type.event_id', 'eventId')
            .addSelect('mcd_output_code_data_type.thing_catalog_code', 'thingCode')
            .addSelect('mcd_output_code_data_type.thing_catalog_version', 'thingVersion')
            .addSelect('mcd_output_code_data_type.thing_id', 'thingId')
            .innerJoin(MyConditionDataOutputCode, 'my_condition_data_output_code', 'my_condition_data_output_code.id = mcd_output_code_actor.mcd_output_code_id')
            .leftJoin(McdOutputCodeDataType, 'mcd_output_code_data_type', 'mcd_output_code_data_type.mcd_output_code_actor_id = mcd_output_code_actor.id and mcd_output_code_data_type.is_disabled = :is_disabled', { is_disabled: enabled })
            .where('mcd_output_code_actor.is_disabled = :is_disabled', { is_disabled: enabled })
            .andWhere('mcd_output_code_actor.wf_catalog_code  IS NULL');
        if (Number.isInteger(id)) {
            sql.andWhere('mcd_output_code_actor.id = :id', { id: id });
        }
        if (Number.isInteger(mcdOutputCodeId)) {
            sql.andWhere('my_condition_data_output_code.id = :mcdOutputCodeId', { mcdOutputCodeId: mcdOutputCodeId });
        }
        if (Number.isInteger(approved)) {
            sql.andWhere('mcd_output_code_actor.approval_status = :approved', { approved: approved });
        }
        if (isServiceCanceled) {
            sql.andWhere('my_condition_data_output_code.release_service_cooperate_status = :status', { status: releasedServiceStatus });
        }
        const ret = await sql
            .orderBy('my_condition_data_output_code.code')
            .addOrderBy('mcd_output_code_actor.id')
            .offset(offset)
            .limit(limit)
            .getRawMany();
        return ret;
    }

    /**
     * 蓄積イベント通知データ取得
     */
    static async getStoreEventNotificateData (pxrId: string, type: number, code: number, version: number, actorCode: number) {
        let subQuery = '';
        let params = {};
        // ドキュメントの場合
        if (type === 1) {
            subQuery = subQuery + 'share_source_datatype.document_catalog_code = :code';
            params = { ...params, code: code };
            subQuery = subQuery + ' and share_source_datatype.document_catalog_version = :version';
            params = { ...params, version: version };
        }
        // イベントの場合
        if (type === 2) {
            subQuery = subQuery + 'share_source_datatype.event_catalog_code = :code';
            params = { ...params, code: code };
            subQuery = subQuery + ' and share_source_datatype.event_catalog_version = :version';
            params = { ...params, version: version };
        }
        // モノの場合
        if (type === 3) {
            subQuery = subQuery + 'share_source_datatype.thing_catalog_code = :code';
            params = { ...params, code: code };
            subQuery = subQuery + ' and share_source_datatype.thing_catalog_version = :version';
            params = { ...params, version: version };
        }
        subQuery = subQuery + ' and share_source_source.actor_catalog_code = :actorCode';
        params = { ...params, actorCode: actorCode };

        const connection = await connectDatabase();
        const repository = getRepository(MyConditionBook, connection.name);
        let sql = repository.createQueryBuilder('my_condition_book')
            .select('store_event_notificate.notificate_type', 'eventType')
            .distinct()
            .addSelect('data_operation.actor_catalog_code', 'dataOperationActorCode')
            .addSelect('data_operation.actor_catalog_version', 'dataOperationActorVersion')
            .addSelect('data_operation.app_catalog_code', 'dataOperationAppCode')
            .addSelect('data_operation.app_catalog_version', 'dataOperationAppVersion')
            .addSelect('store_event_notificate.store_event_notificate_catalog_code', 'storeEventNotificateCatalogCode')
            .addSelect('store_event_notificate.store_event_notificate_catalog_version', 'storeEventNotificateCatalogVersion')
            .addSelect('share_source_datatype.id', 'shareSourceDatatypeId')
            .addSelect('share_source_source.id', 'shareSourceSourceId')
            .innerJoin(DataOperation, 'data_operation', 'data_operation.book_id = my_condition_book.id')
            .innerJoin(DataOperationDataType, 'data_operation_data_type', 'data_operation_data_type.data_operation_id = data_operation.id')
            .innerJoin(StoreEventNotificate, 'store_event_notificate',
                `store_event_notificate.share_catalog_code = data_operation.operation_catalog_code
                and store_event_notificate.share_catalog_version = data_operation.operation_catalog_version
                and store_event_notificate.share_uuid = data_operation_data_type.catalog_uuid`)
            .leftJoin(ShareSourceDatatype, 'share_source_datatype', 'share_source_datatype.store_event_notificate_id = store_event_notificate.id')
            .leftJoin(ShareSourceSource, 'share_source_source',
                'share_source_source.share_source_datatype_id = share_source_datatype.id and ' + subQuery, params)
            .where('my_condition_book.pxr_id = :pxrId', { pxrId: pxrId })
            .andWhere('my_condition_book.is_disabled = :isDisabled', { isDisabled: false })
            .andWhere('data_operation.type = :type', { type: 'share' })
            .andWhere('data_operation.is_disabled = :isDisabled', { isDisabled: false })
            .andWhere('data_operation.wf_catalog_code  IS NULL');
        // ドキュメントの場合
        if (type === 1) {
            sql = sql.andWhere('data_operation_data_type.document_catalog_code = :code', { code: code })
                .andWhere('data_operation_data_type.document_catalog_version = :version', { version: version });
        }
        // イベントの場合
        if (type === 2) {
            sql = sql.andWhere('data_operation_data_type.event_catalog_code = :code', { code: code })
                .andWhere('data_operation_data_type.event_catalog_version = :version', { version: version });
        }
        // モノの場合
        if (type === 3) {
            sql = sql.andWhere('data_operation_data_type.thing_catalog_code = :code', { code: code })
                .andWhere('data_operation_data_type.thing_catalog_version = :version', { version: version });
        }
        sql = sql.andWhere('data_operation_data_type.consent_flg= :consentFlag ', { consentFlag: true })
            .andWhere('data_operation_data_type.is_disabled = :isDisabled', { isDisabled: false })
            .andWhere('store_event_notificate.is_disabled = :isDisabled', { isDisabled: false });
        applicationLogger.info(sql.getSql());
        applicationLogger.info(sql.getParameters());
        const ret = await sql.getRawMany();
        applicationLogger.info('store-event data: ' + JSON.stringify(ret));
        return ret;
    }

    /**
     * 共有先利用者ID取得
     */
    static async getShareUserIdCooperate (userId: string, data: Document | Event | Thing, dataOperationActorCode: number, dataOperationAppCode: number, dataOperationWfCode: number) {
        let actorCode = null;
        let appCatalogCode = null;
        if (data instanceof Document) {
            actorCode = data.docActorCode;
            if (data.docAppCatalogCode && typeof data.docAppCatalogCode === 'number') {
                appCatalogCode = data.docAppCatalogCode;
            }
        } else if (data instanceof Event) {
            actorCode = data.eventActorCode;
            if (data.eventAppCatalogCode && typeof data.eventAppCatalogCode === 'number') {
                appCatalogCode = data.eventAppCatalogCode;
            }
        } else if (data instanceof Thing) {
            actorCode = data.thingActorCode;
            if (data.thingAppCatalogCode && typeof data.thingAppCatalogCode === 'number') {
                appCatalogCode = data.thingAppCatalogCode;
            }
        }
        const connection = await connectDatabase();
        const repository = getRepository(UserIdCooperate, connection.name);
        const query = repository.createQueryBuilder('user_id_cooperate')
            .select('user_id_cooperate_b.user_id', 'userId')
            .innerJoin(UserIdCooperate, 'user_id_cooperate_b', 'user_id_cooperate_b.book_id = user_id_cooperate.book_id')
            .where('user_id_cooperate.user_id = :userId', { userId: userId })
            .andWhere('user_id_cooperate.actor_catalog_code = :actorCode', { actorCode: actorCode })
            .andWhere('user_id_cooperate_b.actor_catalog_code = :dataOperationActorCode', { dataOperationActorCode: dataOperationActorCode })
            .andWhere('user_id_cooperate.is_disabled = false')
            .andWhere('user_id_cooperate_b.is_disabled = false');
        if (appCatalogCode) {
            query.andWhere('user_id_cooperate.app_catalog_code = :appCatalogCode', { appCatalogCode: appCatalogCode });
        }
        query.andWhere('user_id_cooperate.wf_catalog_code IS NULL');
        if (dataOperationAppCode) {
            query.andWhere('user_id_cooperate_b.app_catalog_code = :dataOperationAppCode', { dataOperationAppCode: dataOperationAppCode });
        }
        query.andWhere('user_id_cooperate_b.wf_catalog_code IS NULL');
        applicationLogger.info(query.getSql());
        applicationLogger.info(query.getParameters());
        const ret = await query.getRawOne();
        return ret ? ret['userId'] : null;
    }

    /**
     * 蓄積イベント通知履歴登録
     */
    static async insertStoreEventNotificateHistory (em: EntityManager, entity: StoreEventNotificateHistory): Promise<InsertResult> {
        // SQLを生成及び実行
        const ret = await em
            .createQueryBuilder()
            .insert()
            .into(StoreEventNotificateHistory)
            .values({
                notificateType: entity.notificateType,
                processType: entity.processType,
                userId: entity.userId,
                dataId: entity.dataId,
                documentCatalogCode: entity.documentCatalogCode,
                documentCatalogVersion: entity.documentCatalogVersion,
                eventCatalogCode: entity.eventCatalogCode,
                eventCatalogVersion: entity.eventCatalogVersion,
                thingCatalogCode: entity.thingCatalogCode,
                thingCatalogVersion: entity.thingCatalogVersion,
                shareSourceActorCatalogCode: entity.shareSourceActorCatalogCode,
                shareSourceActorCatalogVersion: entity.shareSourceActorCatalogVersion,
                shareSourceAppCatalogCode: entity.shareSourceAppCatalogCode,
                shareSourceAppCatalogVersion: entity.shareSourceAppCatalogVersion,
                shareSourceWfCatalogCode: null,
                shareSourceWfCatalogVersion: null,
                shareTargetActorCatalogCode: entity.shareTargetActorCatalogCode,
                shareTargetActorCatalogVersion: entity.shareTargetActorCatalogVersion,
                shareTargetAppCatalogCode: entity.shareTargetAppCatalogCode,
                shareTargetAppCatalogVersion: entity.shareTargetAppCatalogVersion,
                shareTargetWfCatalogCode: null,
                shareTargetWfCatalogVersion: null,
                createdBy: entity.createdBy,
                updatedBy: entity.updatedBy
            })
            .execute();
        return ret;
    }

    /**
     * 蓄積イベント通知定義削除
     */
    static async deleteStoreEventNotificate (code: number, version: number) {
        const connection = await connectDatabase();
        const repository = getRepository(StoreEventNotificate, connection.name);
        const ret = repository.createQueryBuilder()
            .update(StoreEventNotificate)
            .set({
                isDisabled: true
            })
            .where('store_event_notificate.store_event_notificate_catalog_code = :code', { code: code })
            .andWhere('store_event_notificate.store_event_notificate_catalog_version = :version', { version: version })
            .andWhere('is_disabled = false')
            .execute();
        return ret;
    }

    /**
     * 蓄積イベント通知定義登録
     */
    static async insertStoreEventNotificate (em: EntityManager, type: string, code: number, version: number, shareCode: number, shareVersion: number, shareUuid: string, operator: Operator) {
        const ret = await em.createQueryBuilder()
            .insert()
            .into(StoreEventNotificate)
            .values(
                {
                    notificateType: type,
                    storeEventNotificateCatalogCode: code,
                    storeEventNotificateCatalogVersion: version,
                    shareCatalogCode: shareCode,
                    shareCatalogVersion: shareVersion,
                    shareUuid: shareUuid,
                    createdBy: operator.getLoginId(),
                    updatedBy: operator.getLoginId()
                }
            ).execute();
        return ret;
    }

    /**
     * 共有元指定データ種登録(type 1：ドキュメント 2：イベント 3：モノ)
     */
    static async insertShareSourceDataType (em: EntityManager, storeEventNotificateId: number, code: number, version: number, type: number, operator: Operator) {
        const ret = await em.createQueryBuilder()
            .insert()
            .into(ShareSourceDatatype)
            .values(
                {
                    storeEventNotificateId: storeEventNotificateId,
                    documentCatalogCode: type === 1 ? code : null,
                    documentCatalogVersion: type === 1 ? version : null,
                    eventCatalogCode: type === 2 ? code : null,
                    eventCatalogVersion: type === 2 ? version : null,
                    thingCatalogCode: type === 3 ? code : null,
                    thingCatalogVersion: type === 3 ? version : null,
                    createdBy: operator.getLoginId(),
                    updatedBy: operator.getLoginId()
                }
            ).execute();
        return ret;
    }

    /**
     * 共有元指定共有元登録
     */
    static async insertShareSourceSource (em: EntityManager, shareSourceDatatypeId: number, actorCode: number, actorVersion: number, operator: Operator) {
        const ret = await em.createQueryBuilder()
            .insert()
            .into(ShareSourceSource)
            .values(
                {
                    shareSourceDatatypeId: shareSourceDatatypeId,
                    actorCatalogCode: actorCode,
                    actorCatalogVersion: actorVersion,
                    createdBy: operator.getLoginId(),
                    updatedBy: operator.getLoginId()
                }
            ).execute();
        return ret;
    }

    /**
     * 終了済Regionレコード登録
     */
    static async insertClosedRegionRecord (em: EntityManager, entity: StoppedRegion): Promise<InsertResult> {
        const ret = await em.createQueryBuilder()
            .insert()
            .into(StoppedRegion)
            .values(
                {
                    actorCatalogCode: entity.getActorCatalogCode(),
                    actorCatalogVersion: entity.getActorCatalogVersion(),
                    regionCatalogCode: entity.getRegionCatalogCode(),
                    regionCatalogVersion: entity.getRegionCatalogVersion(),
                    closedAt: entity.getClosedAt(),
                    createdBy: entity.getCreatedBy(),
                    updatedBy: entity.getUpdatedBy()
                }
            ).execute();
        return ret;
    }

    /**
     * Region終了済、利用者ID連携未解除個人取得
     */
    static async getClosedRegionUnclosedUserIdCooperateRecord (offset: number, limit: number) {
        const connection = await connectDatabase();
        const repository = getRepository(MyConditionBook, connection.name);
        const sql = repository.createQueryBuilder('my_condition_book')
            .select('my_condition_book.id', 'bookId')
            .addSelect('my_condition_book.pxr_id', 'pxrId')
            .addSelect('user_id_cooperate.actor_catalog_code', 'actorCatalogCode')
            .addSelect('user_id_cooperate.actor_catalog_version', 'actorCatalogVersion')
            .addSelect('user_id_cooperate.region_catalog_code', 'regionCatalogCode')
            .addSelect('user_id_cooperate.region_catalog_version', 'regionCatalogVersion')
            .innerJoin(UserIdCooperate, 'user_id_cooperate', 'user_id_cooperate.book_id = my_condition_book.id')
            .innerJoin(StoppedRegion, 'stopped_region', 'user_id_cooperate.actor_catalog_code = stopped_region.actor_catalog_code')
            .where('my_condition_book.is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('user_id_cooperate.is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('stopped_region.is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('user_id_cooperate.region_catalog_code = stopped_region.region_catalog_code')
            .offset(offset)
            .limit(limit);
        const ret = await sql.getRawMany();
        const list = [];
        for (const ele of ret) {
            list.push({
                bookId: ele.bookId,
                pxrId: ele.pxrId,
                actor: {
                    _value: ele.actorCatalogCode,
                    _ver: ele.actorCatalogVersion
                },
                region: {
                    _value: ele.regionCatalogCode,
                    _ver: ele.regionCatalogVersion
                }
            });
        }
        return list;
    }

    /**
     * Region終了対象取得
     */
    static async getClosedRegion (offset: number, limit: number) {
        const connection = await connectDatabase();
        const repository = getRepository(StoppedRegion, connection.name);
        const currentDate = new Date();
        const sql = repository.createQueryBuilder('stopped_region')
            .select('stopped_region.actor_catalog_code', 'actorCatalogCode')
            .addSelect('stopped_region.actor_catalog_version', 'actorCatalogVersion')
            .addSelect('stopped_region.region_catalog_code', 'regionCatalogCode')
            .addSelect('stopped_region.region_catalog_version', 'regionCatalogVersion')
            .andWhere('stopped_region.is_disabled = false')
            .andWhere('stopped_region.closed_at <= :currentDate', { currentDate: currentDate })
            .orderBy('stopped_region.region_catalog_code', 'ASC')
            .offset(offset)
            .limit(limit);
        const ret = await sql.getRawMany();
        const list = [];
        for (const ele of ret) {
            list.push({
                actor: {
                    _value: ele.actorCatalogCode,
                    _ver: ele.actorCatalogVersion
                },
                region: {
                    _value: ele.regionCatalogCode,
                    _ver: ele.regionCatalogVersion
                }
            });
        }
        return list;
    }

    /**
     * 終了済Region更新
     */
    static async updateCloseRegion (loginId: string, actorCode: number, regionCode: number) {
        // 削除フラグを true（削除済）に更新する
        const connection = await connectDatabase();
        await connection.createQueryBuilder()
            .update(StoppedRegion)
            .set({
                isDisabled: true,
                updatedBy: loginId
            })
            .where('actor_catalog_code = :actorCode', { actorCode: actorCode })
            .andWhere('region_catalog_code = :regionCode', { regionCode: regionCode })
            .andWhere('is_disabled = :isDisabled', { isDisabled: false })
            .execute();
    }

    /**
     * Region利用規約カタログコード、カタログバージョン取得
     */
    static async getRegionTermsOfUseCodeVer (bookId: number, pxrId: string, termsOfUseCode: number) {
        const notAgreed = 0;
        const connection = await connectDatabase();
        const repository = getRepository(TermsOfUseNotificationInd, connection.name);
        const ret = await repository
            .createQueryBuilder('terms_of_use_notification_ind')
            .select('terms_of_use_notification._value', '_value')
            .addSelect('terms_of_use_notification._ver', '_ver')
            .innerJoin(TermsOfUseNotification, 'terms_of_use_notification', 'terms_of_use_notification.id = terms_of_use_notification_ind.terms_of_use_notification_id')
            .innerJoin(MyConditionBook, 'my_condition_book', 'my_condition_book.id = terms_of_use_notification_ind.book_id')
            .where('my_condition_book.is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('my_condition_book.id = :id', { id: bookId })
            .andWhere('my_condition_book.pxr_id = :pxrId', { pxrId: pxrId })
            .andWhere('terms_of_use_notification.is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('terms_of_use_notification.terms_type = :terms_type', { terms_type: 2 })
            .andWhere('terms_of_use_notification._value = :_value', { _value: termsOfUseCode })
            .andWhere('terms_of_use_notification_ind.is_disabled = :is_disabled', { is_disabled: false })
            .andWhere('terms_of_use_notification_ind.status = :status', { status: notAgreed })
            .andWhere('terms_of_use_notification_ind.last_sent_at IS NOT NULL')
            .getRawOne();
        return ret;
    }
}
