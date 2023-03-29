/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * データ操作定義テーブルエンティティ
 */
@Entity('data_operation')
export default class DataOperation {
    /**
     * ID
     */
    @PrimaryGeneratedColumn({ type: 'bigint' })
    readonly id: number = 0;

    /**
     * ブックID
     */
    @Column({ type: 'bigint', nullable: false, name: 'book_id' })
    bookId: number = 0;

    /**
     * Region利用設定ID
     */
    @Column({ type: 'bigint', name: 'region_use_id' })
    regionUseId: number = null;

    /**
     * 種別
     */
    @Column({ type: 'varchar', length: 255, nullable: false, name: 'type' })
    type: string = '';

    /**
     * データ操作カタログコード
     */
    @Column({ type: 'bigint', name: 'operation_catalog_code' })
    operationCatalogCode: number;

    /**
     * データ操作カタログバージョン
     */
    @Column({ type: 'bigint', name: 'operation_catalog_version' })
    operationCatalogVersion: number;

    /**
     * アクターカタログコード
     */
    @Column({ type: 'bigint', nullable: false, name: 'actor_catalog_code' })
    actorCatalogCode: number = 0;

    /**
     * アクターカタログバージョン
     */
    @Column({ type: 'bigint', nullable: false, name: 'actor_catalog_version' })
    actorCatalogVersion: number = 0;

    /**
     * アプリケーションカタログコード
     */
    @Column({ type: 'bigint', name: 'app_catalog_code' })
    appCatalogCode: number = 0;

    /**
     * アプリケーションカタログバージョン
     */
    @Column({ type: 'bigint', name: 'app_catalog_version' })
    appCatalogVersion: number = 0;

    /**
     * ワークフローカタログコード
     */
    @Column({ type: 'bigint', name: 'wf_catalog_code' })
    wfCatalogCode: number = 0;

    /**
     * ワークフローカタログバージョン
     */
    @Column({ type: 'bigint', name: 'wf_catalog_version' })
    wfCatalogVersion: number = 0;

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
            const entityName = 'data_operation_';
            this.id = parseInt(entity[entityName + 'id']);
            this.bookId = parseInt(entity[entityName + 'book_id']);
            this.regionUseId = entity[entityName + 'region_use_id'] ? parseInt(entity[entityName + 'region_use_id']) : 0;
            this.type = entity[entityName + 'type'];
            this.operationCatalogCode = parseInt(entity[entityName + 'operation_catalog_code']);
            this.operationCatalogVersion = parseInt(entity[entityName + 'operation_catalog_version']);
            this.actorCatalogCode = parseInt(entity[entityName + 'actor_catalog_code']);
            this.actorCatalogVersion = parseInt(entity[entityName + 'actor_catalog_version']);
            this.appCatalogCode = entity[entityName + 'app_catalog_code'] ? parseInt(entity[entityName + 'app_catalog_code']) : 0;
            this.appCatalogVersion = entity[entityName + 'app_catalog_version'] ? parseInt(entity[entityName + 'app_catalog_version']) : 0;
            this.wfCatalogCode = entity[entityName + 'wf_catalog_code'] ? parseInt(entity[entityName + 'wf_catalog_code']) : 0;
            this.wfCatalogVersion = entity[entityName + 'wf_catalog_version'] ? parseInt(entity[entityName + 'wf_catalog_version']) : 0;
            this.attributes = entity[entityName + 'attributes'];
            this.isDisabled = entity[entityName + 'is_disabled'];
            this.createdBy = entity[entityName + 'created_by'];
            this.createdAt = new Date(entity[entityName + 'created_at']);
            this.updatedBy = entity[entityName + 'updated_by'];
            this.updatedAt = new Date(entity[entityName + 'updated_at']);
        }
    }

    public getId (): number {
        return this.id;
    }

    public getBookId (): number {
        return this.bookId;
    }

    public setBookId (bookId: number): void {
        this.bookId = bookId;
    }

    public getRegionUseId (): number {
        return this.regionUseId;
    }

    public getType (): string {
        return this.type;
    }

    public setType (type: string): void {
        this.type = type;
    }

    public getActorCatalogCode (): number {
        return this.actorCatalogCode;
    }

    public setActorCatalogCode (actorCatalogCode: number): void {
        this.actorCatalogCode = actorCatalogCode;
    }

    public getActorCatalogVersion (): number {
        return this.actorCatalogVersion;
    }

    public setActorCatalogVersion (actorCatalogVersion: number): void {
        this.actorCatalogVersion = actorCatalogVersion;
    }

    public getAppCatalogCode (): number {
        return this.appCatalogCode;
    }

    public setAppCatalogCode (appCatalogCode: number): void {
        this.appCatalogCode = appCatalogCode;
    }

    public getAppCatalogVersion (): number {
        return this.appCatalogVersion;
    }

    public setAppCatalogVersion (appCatalogVersion: number): void {
        this.appCatalogVersion = appCatalogVersion;
    }

    public getWfCatalogCode (): number {
        return this.wfCatalogCode;
    }

    public setWfCatalogCode (wfCatalogCode: number): void {
        this.wfCatalogCode = wfCatalogCode;
    }

    public getWfCatalogVersion (): number {
        return this.wfCatalogVersion;
    }

    public setWfCatalogVersion (wfCatalogVersion: number): void {
        this.wfCatalogVersion = wfCatalogVersion;
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
