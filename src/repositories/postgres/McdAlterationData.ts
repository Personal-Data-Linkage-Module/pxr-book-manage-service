/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

/**
 * 変更対象データ
 */
@Entity('mcd_alteration_data')
export default class McdAlterationData {
    /**
     * ID
     */
    @PrimaryGeneratedColumn({ type: 'bigint' })
    readonly id: number = 0;

    /**
     * 利用者データ変更アクターID
     */
    @Column({ type: 'bigint', nullable: false, name: 'mcd_alteration_actor_id' })
    mcdAlterationActorId: number;

    /**
     * ドキュメントカタログコード
     */
    @Column({ type: 'bigint', name: 'document_catalog_code' })
    documentCatalogCode: number;

    /**
     * ドキュメントカタログバージョン
     */
    @Column({ type: 'bigint', name: 'document_catalog_version' })
    documentCatalogVersion: number;

    /**
     * ドキュメント識別子
     */
    @Column({ type: 'varchar', length: 255, name: 'document_id' })
    documentId: string;

    /**
     * イベントカタログコード
     */
    @Column({ type: 'bigint', name: 'event_catalog_code' })
    eventCatalogCode: number;

    /**
     * イベントカタログバージョン
     */
    @Column({ type: 'bigint', name: 'event_catalog_version' })
    eventCatalogVersion: number;

    /**
     * イベント識別子
     */
    @Column({ type: 'varchar', length: 255, name: 'event_id' })
    eventId: string;

    /**
     * モノカタログコード
     */
    @Column({ type: 'bigint', name: 'thing_catalog_code' })
    thingCatalogCode: number;

    /**
     * モノカタログバージョン
     */
    @Column({ type: 'bigint', name: 'thing_catalog_version' })
    thingCatalogVersion: number;

    /**
     * モノ識別子
     */
    @Column({ type: 'varchar', length: 255, name: 'thing_id' })
    thingId: string;

    /**
     * 削除フラグ
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
            const entityName = 'mcd_alteration_data_';
            this.id = parseInt(entity[entityName + 'id']);
            this.mcdAlterationActorId = entity[entityName + 'mcd_alteration_actor_id'];
            this.documentCatalogCode = parseInt(entity[entityName + 'document_catalog_code']);
            this.documentCatalogVersion = parseInt(entity[entityName + 'document_catalog_version']);
            this.documentId = entity[entityName + 'document_id'];
            this.eventCatalogCode = parseInt(entity[entityName + 'event_catalog_code']);
            this.eventCatalogVersion = parseInt(entity[entityName + 'event_catalog_version']);
            this.eventId = entity[entityName + 'event_id'];
            this.thingCatalogCode = parseInt(entity[entityName + 'thing_catalog_code']);
            this.thingCatalogVersion = parseInt(entity[entityName + 'thing_catalog_version']);
            this.thingId = entity[entityName + 'thing_id'];
            this.isDisabled = entity[entityName + 'is_disabled'];
            this.createdBy = entity[entityName + 'created_by'];
            this.createdAt = new Date(entity[entityName + 'created_at']);
            this.updatedBy = entity[entityName + 'updated_by'];
            this.updatedAt = new Date(entity[entityName + 'updated_at']);
        }
    }
}
