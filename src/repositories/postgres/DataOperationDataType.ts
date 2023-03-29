/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * データ操作定義データ種テーブルエンティティ
 */
@Entity('data_operation_data_type')
export default class DataOperationDataType {
    /**
     * ID
     */
    @PrimaryGeneratedColumn({ type: 'bigint' })
    readonly id: number = 0;

    /**
     * データ操作定義ID
     */
    @Column({ type: 'bigint', nullable: false, name: 'data_operation_id' })
    dataOperationId: number = 0;

    /**
     * 種別
     */
    @Column({ type: 'varchar', length: 255, name: 'catalog_uuid' })
    catalogUuid: string;

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
     * モノカタログコード
     */
    @Column({ type: 'bigint', name: 'thing_catalog_code' })
    thingCatalogCode: number;

    /**
     * モノカタログバージョン
     */
    @Column({ type: 'bigint', nullable: false, name: 'thing_catalog_version' })
    thingCatalogVersion: number;

    /**
     * 同意フラグ
     */
    @Column({ type: 'boolean', nullable: false, default: true, name: 'consent_flg' })
    consentFlg: boolean = true;

    /**
     * 属性
     */
    @Column({ type: 'text' })
    attributes: string = '';

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
            const entityName = 'data_operation_data_type_';
            this.id = Number(entity[entityName + 'id']);
            this.dataOperationId = Number(entity[entityName + 'data_operation_id']);
            this.catalogUuid = entity[entityName + 'catalog_uuid'];
            this.documentCatalogCode = entity[entityName + 'document_catalog_code'] ? Number(entity[entityName + 'document_catalog_code']) : null;
            this.documentCatalogVersion = entity[entityName + 'document_catalog_version'] ? Number(entity[entityName + 'document_catalog_version']) : null;
            this.eventCatalogCode = entity[entityName + 'event_catalog_code'] ? Number(entity[entityName + 'event_catalog_code']) : null;
            this.eventCatalogVersion = entity[entityName + 'event_catalog_version'] ? Number(entity[entityName + 'event_catalog_version']) : null;
            this.thingCatalogCode = entity[entityName + 'thing_catalog_code'] ? Number(entity[entityName + 'thing_catalog_code']) : null;
            this.thingCatalogVersion = entity[entityName + 'thing_catalog_version'] ? Number(entity[entityName + 'thing_catalog_version']) : null;
            this.consentFlg = entity[entityName + 'consent_flg'];
            this.attributes = entity[entityName + 'attributes'];
            this.isDisabled = entity[entityName + 'is_disabled'];
            this.createdBy = entity[entityName + 'created_by'];
            this.createdAt = new Date(entity[entityName + 'created_at']);
            this.updatedBy = entity[entityName + 'updated_by'];
            this.updatedAt = new Date(entity[entityName + 'updated_at']);
        }
    }

    public setDataOperationId (dataOperationId: number): void {
        this.dataOperationId = dataOperationId;
    }

    public setAttributes (attributes: string): void {
        this.attributes = attributes;
    }

    public setCreatedBy (createdBy: string): void {
        this.createdBy = createdBy;
    }

    public setUpdatedBy (updatedBy: string): void {
        this.updatedBy = updatedBy;
    }
}
