/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/

import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

/**
 * 共有元指定データ種
 */
@Entity('share_source_datatype')
export default class ShareSourceDatatype {
    /**
     * ID
     */
    @PrimaryGeneratedColumn({ type: 'bigint' })
    readonly id: number = 0;

    /**
     * 蓄積イベント通知定義ID
     */
    @Column({ type: 'bigint', nullable: false, name: 'store_event_notificate_id' })
    storeEventNotificateId: number = 0;

    /**
     * 共有定義カタログコード
     */
    @Column({ type: 'bigint', name: 'share_catalog_code' })
    shareCatalogCode: number = 0;

    /**
     * 共有定義カタログバージョン
     */
    @Column({ type: 'bigint', name: 'share_catalog_version' })
    shareCatalogVersion: number = 0;

    /**
     * 共有定義UUID
     */
    @Column({ type: 'varchar', length: 255, name: 'share_uuid' })
    shareUuid: string = '';

    /**
     * ドキュメントカタログコード
     */
    @Column({ type: 'bigint', name: 'document_catalog_code' })
    documentCatalogCode: number = 0;

    /**
     * ドキュメントカタログバージョン
     */
    @Column({ type: 'bigint', name: 'document_catalog_version' })
    documentCatalogVersion: number = 0;

    /**
     * イベントカタログコード
     */
    @Column({ type: 'bigint', name: 'event_catalog_code' })
    eventCatalogCode: number = 0;

    /**
     * イベントカタログバージョン
     */
    @Column({ type: 'bigint', name: 'event_catalog_version' })
    eventCatalogVersion: number = 0;

    /**
     * モノカタログコード
     */
    @Column({ type: 'bigint', name: 'thing_catalog_code' })
    thingCatalogCode: number = 0;

    /**
     * モノカタログバージョン
     */
    @Column({ type: 'bigint', name: 'thing_catalog_version' })
    thingCatalogVersion: number = 0;

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
            const entityName = 'share_source_datatype';
            this.id = Number(entity[entityName + 'id']);
            this.storeEventNotificateId = Number(entity[entityName + 'store_event_notificate_id']);
            this.shareCatalogCode = Number(entity[entityName + 'share_catalog_code']);
            this.shareCatalogVersion = Number(entity[entityName + 'share_catalog_version']);
            this.shareUuid = entity[entityName + 'share_uuid'];
            this.documentCatalogCode = Number(entity[entityName + 'document_catalog_code']);
            this.documentCatalogVersion = Number(entity[entityName + 'document_catalog_version']);
            this.eventCatalogCode = Number(entity[entityName + 'event_catalog_code']);
            this.eventCatalogVersion = Number(entity[entityName + 'event_catalog_version']);
            this.thingCatalogCode = Number(entity[entityName + 'thing_catalog_code']);
            this.thingCatalogVersion = Number(entity[entityName + 'thing_catalog_version']);
            this.isDisabled = entity[entityName + 'is_disabled'];
            this.createdBy = entity[entityName + 'created_by'];
            this.createdAt = new Date(entity[entityName + 'created_at']);
            this.updatedBy = entity[entityName + 'updated_by'];
            this.updatedAt = new Date(entity[entityName + 'updated_at']);
        }
    }
}
