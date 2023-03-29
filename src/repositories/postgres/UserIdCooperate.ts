/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * 利用者ID連携テーブルエンティティ
 */
@Entity('user_id_cooperate')
export default class UserIdCooperate {
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
     * リージョンカタログコード
     */
    @Column({ type: 'bigint', name: 'region_catalog_code' })
    regionCatalogCode: number = 0;

    /**
     * リージョンカタログバージョン
     */
    @Column({ type: 'bigint', name: 'region_catalog_version' })
    regionCatalogVersion: number = 0;

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
     * 利用者ID
     */
    @Column({ type: 'varchar', length: 255, name: 'user_id' })
    userId: string = null;

    /**
     * ステータス
     */
    @Column({ type: 'smallint', name: 'status' })
    status: number = 0;

    /**
     * 連携開始日時
     */
    @Column({ type: 'timestamp without time zone', name: 'start_at' })
    startAt: Date = null;

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
            const entityName = 'user_id_cooperate_';
            this.id = parseInt(entity[entityName + 'id']);
            this.bookId = parseInt(entity[entityName + 'book_id']);
            this.actorCatalogCode = parseInt(entity[entityName + 'actor_catalog_code']);
            this.actorCatalogVersion = parseInt(entity[entityName + 'actor_catalog_version']);
            this.regionCatalogCode = entity[entityName + 'region_catalog_code'] ? parseInt(entity[entityName + 'region_catalog_code']) : 0;
            this.regionCatalogVersion = entity[entityName + 'region_catalog_version'] ? parseInt(entity[entityName + 'region_catalog_version']) : 0;
            this.appCatalogCode = entity[entityName + 'app_catalog_code'] ? parseInt(entity[entityName + 'app_catalog_code']) : 0;
            this.appCatalogVersion = entity[entityName + 'app_catalog_version'] ? parseInt(entity[entityName + 'app_catalog_version']) : 0;
            this.wfCatalogCode = entity[entityName + 'wf_catalog_code'] ? parseInt(entity[entityName + 'wf_catalog_code']) : 0;
            this.wfCatalogVersion = entity[entityName + 'wf_catalog_version'] ? parseInt(entity[entityName + 'wf_catalog_version']) : 0;
            this.userId = entity[entityName + 'user_id'];
            this.status = entity[entityName + 'status'];
            this.startAt = entity[entityName + 'start_at'] ? new Date(entity[entityName + 'start_at']) : null;
            this.isDisabled = entity[entityName + 'is_disabled'];
            this.createdBy = entity[entityName + 'created_by'];
            this.createdAt = new Date(entity[entityName + 'created_at']);
            this.updatedBy = entity[entityName + 'updated_by'];
            this.updatedAt = new Date(entity[entityName + 'updated_at']);
        }
    }

    public getBookId (): number {
        return this.bookId;
    }

    public setBookId (bookId: number): void {
        this.bookId = bookId;
    }

    public getActorCatalogCode (): number {
        return this.actorCatalogCode;
    }

    public setActorCatalogCode (actorCatalogCode: number): void {
        this.actorCatalogCode = actorCatalogCode;
    }

    public setActorCatalogVersion (actorCatalogVersion: number): void {
        this.actorCatalogVersion = actorCatalogVersion;
    }

    public setRegionCatalogCode (regionCatalogCode: number): void {
        this.regionCatalogCode = regionCatalogCode;
    }

    public getRegionCatalogVersion (): number {
        return this.regionCatalogVersion;
    }

    public setRegionCatalogVersion (regionCatalogVersion: number): void {
        this.regionCatalogVersion = regionCatalogVersion;
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

    public setWfCatalogCode (wfCatalogCode: number): void {
        this.wfCatalogCode = wfCatalogCode;
    }

    public getWfCatalogVersion (): number {
        return this.wfCatalogVersion;
    }

    public setWfCatalogVersion (wfCatalogVersion: number): void {
        this.wfCatalogVersion = wfCatalogVersion;
    }

    public getUserId (): string {
        return this.userId;
    }

    public setUserId (userId: string): void {
        this.userId = userId;
    }

    public setCreatedBy (createdBy: string): void {
        this.createdBy = createdBy;
    }

    public setUpdatedBy (updatedBy: string): void {
        this.updatedBy = updatedBy;
    }
}
