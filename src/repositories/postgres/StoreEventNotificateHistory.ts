/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('store_event_notificate_history')
export default class StoreEventNotificateHistory {
    /**
     * ID
     */
    @PrimaryGeneratedColumn({ type: 'bigint' })
    readonly id: number = 0;

    /**
     * 送信種別
     */
    @Column({ type: 'varchar', length: 255, name: 'notificate_type' })
    notificateType: string = '';

    /**
     * 処理種別
     */
    @Column({ type: 'varchar', length: 255, name: 'process_type' })
    processType: string = '';

    /**
     * 利用者ID
     */
    @Column({ type: 'varchar', length: 255, name: 'user_id' })
    userId: string = '';

    /**
     * データID
     */
    @Column({ type: 'varchar', length: 255, name: 'data_id' })
    dataId: string = '';

    /**
     * ドキュメント種別カタログコード
     */
    @Column({ type: 'bigint', name: 'document_catalog_code' })
    documentCatalogCode: number = 0;

    /**
     * ドキュメント種別カタログバージョン
     */
    @Column({ type: 'bigint', name: 'document_catalog_version' })
    documentCatalogVersion: number = 0;

    /**
     * イベント種別カタログコード
     */
    @Column({ type: 'bigint', name: 'event_catalog_code' })
    eventCatalogCode: number = 0;

    /**
     * イベント種別カタログバージョン
     */
    @Column({ type: 'bigint', name: 'event_catalog_version' })
    eventCatalogVersion: number = 0;

    /**
     * モノ種別カタログコード
     */
    @Column({ type: 'bigint', name: 'thing_catalog_code' })
    thingCatalogCode: number = 0;

    /**
     * モノ種別カタログバージョン
     */
    @Column({ type: 'bigint', name: 'thing_catalog_version' })
    thingCatalogVersion: number = 0;

    /**
     * 共有元アクターカタログコード
     */
    @Column({ type: 'bigint', name: 'share_source_actor_catalog_code' })
    shareSourceActorCatalogCode: number = 0;

    /**
     * 共有元アクターカタログバージョン
     */
    @Column({ type: 'bigint', name: 'share_source_actor_catalog_version' })
    shareSourceActorCatalogVersion: number = 0;

    /**
     * 共有元アプリケーションカタログコード
     */
    @Column({ type: 'bigint', name: 'share_source_app_catalog_code' })
    shareSourceAppCatalogCode: number = 0;

    /**
     * 共有元アプリケーションカタログバージョン
     */
    @Column({ type: 'bigint', name: 'share_source_app_catalog_version' })
    shareSourceAppCatalogVersion: number = 0;

    /**
     * 共有元ワークフローカタログコード
     */
    @Column({ type: 'bigint', name: 'share_source_wf_catalog_code' })
    shareSourceWfCatalogCode: number = 0;

    /**
     * 共有元ワークフローカタログバージョン
     */
    @Column({ type: 'bigint', name: 'share_source_wf_catalog_version' })
    shareSourceWfCatalogVersion: number = 0;

    /**
     * 共有先アクターカタログコード
     */
    @Column({ type: 'bigint', name: 'share_target_actor_catalog_code' })
    shareTargetActorCatalogCode: number = 0;

    /**
     * 共有先アクターカタログバージョン
     */
    @Column({ type: 'bigint', name: 'share_target_actor_catalog_version' })
    shareTargetActorCatalogVersion: number = 0;

    /**
     * 共有先アプリケーションカタログコード
     */
    @Column({ type: 'bigint', name: 'share_target_app_catalog_code' })
    shareTargetAppCatalogCode: number = 0;

    /**
     * 共有先アプリケーションカタログバージョン
     */
    @Column({ type: 'bigint', name: 'share_target_app_catalog_version' })
    shareTargetAppCatalogVersion: number = 0;

    /**
     * 共有先ワークフローカタログコード
     */
    @Column({ type: 'bigint', name: 'share_target_wf_catalog_code' })
    shareTargetWfCatalogCode: number = 0;

    /**
     * 共有先ワークフローカタログバージョン
     */
    @Column({ type: 'bigint', name: 'share_target_wf_catalog_version' })
    shareTargetWfCatalogVersion: number = 0;

    /**
     * 削除フラグ（削除済：true）
     */
    @Column({ type: 'boolean', nullable: false, default: false, name: 'is_disabled' })
    isDisabled: boolean = false;

    /**
     * 登録者
     */
    @Column({ type: 'varchar', length: 255, nullable: false, name: 'created_by' })
    createdBy: string = '';

    /**
     * 登録日時
     */
    @CreateDateColumn({ type: 'timestamp without time zone', nullable: false, default: 'NOW()', name: 'created_at' })
    readonly createdAt: Date = new Date();

    /**
     * 更新者
     */
    @Column({ type: 'varchar', length: 255, nullable: false, name: 'updated_by' })
    updatedBy: string = '';

    /**
     * 更新日時
     */
    @UpdateDateColumn({ type: 'timestamp without time zone', nullable: false, default: 'NOW()', name: 'updated_at' })
    readonly updatedAt: Date = new Date();

    /**
     * コンストラクタ
     * @param entity
     */
    constructor (entity?: {}) {
        if (entity) {
            const entityName = 'store_event_notificate_history';
            this.id = Number(entity[entityName + 'id']);
            this.notificateType = entity[entityName + 'notificate_type'];
            this.processType = entity[entityName + 'process_type'];
            this.userId = entity[entityName + 'user_id'];
            this.dataId = entity[entityName + 'data_id'];
            this.documentCatalogCode = Number(entity[entityName + 'document_catalog_code']);
            this.documentCatalogVersion = Number(entity[entityName + 'document_catalog_version']);
            this.eventCatalogCode = Number(entity[entityName + 'event_catalog_code']);
            this.eventCatalogVersion = Number(entity[entityName + 'event_catalog_version']);
            this.thingCatalogCode = Number(entity[entityName + 'thing_catalog_code']);
            this.thingCatalogVersion = Number(entity[entityName + 'thing_catalog_version']);
            this.shareSourceActorCatalogCode = Number(entity[entityName + 'share_source_actor_catalog_code']);
            this.shareSourceActorCatalogVersion = Number(entity[entityName + 'share_source_actor_catalog_version']);
            this.shareSourceAppCatalogCode = Number(entity[entityName + 'share_source_app_catalog_code']);
            this.shareSourceAppCatalogVersion = Number(entity[entityName + 'share_source_app_catalog_version']);
            this.shareSourceWfCatalogCode = Number(entity[entityName + 'share_source_wf_catalog_code']);
            this.shareSourceWfCatalogVersion = Number(entity[entityName + 'share_source_wf_catalog_version']);
            this.shareTargetActorCatalogCode = Number(entity[entityName + 'share_target_actor_catalog_code']);
            this.shareTargetActorCatalogVersion = Number(entity[entityName + 'share_target_actor_catalog_version']);
            this.shareTargetAppCatalogCode = Number(entity[entityName + 'share_target_app_catalog_code']);
            this.shareTargetAppCatalogVersion = Number(entity[entityName + 'share_target_app_catalog_version']);
            this.shareTargetWfCatalogCode = Number(entity[entityName + 'share_target_wf_catalog_code']);
            this.shareTargetWfCatalogVersion = Number(entity[entityName + 'share_target_wf_catalog_version']);
            this.isDisabled = entity[entityName + 'is_disabled'];
            this.createdBy = entity[entityName + 'created_by'];
            this.createdAt = new Date(entity[entityName + 'created_at']);
            this.updatedBy = entity[entityName + 'updated_by'];
            this.updatedAt = new Date(entity[entityName + 'updated_at']);
        }
    }
}
