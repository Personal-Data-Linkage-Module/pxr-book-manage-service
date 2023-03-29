/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * 終了済Regionテーブルエンティティ
 */
@Entity('stopped_region')
export default class StoppedRegion {
    /**
     * ID
     */
    @PrimaryGeneratedColumn({ type: 'bigint' })
    readonly id: number = 0;

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
     * 終了日時
     */
    @Column({ type: 'timestamp without time zone', name: 'closed_at' })
    closedAt: Date = null;

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
            const entityName = 'stopped_region';
            this.id = parseInt(entity[entityName + 'id']);
            this.actorCatalogCode = parseInt(entity[entityName + 'actor_catalog_code']);
            this.actorCatalogVersion = parseInt(entity[entityName + 'actor_catalog_version']);
            this.regionCatalogCode = parseInt(entity[entityName + 'region_catalog_code']);
            this.regionCatalogVersion = parseInt(entity[entityName + 'region_catalog_version']);
            this.closedAt = new Date(entity[entityName + 'closed_at']);
            this.isDisabled = entity[entityName + 'is_disabled'];
            this.createdBy = entity[entityName + 'created_by'];
            this.createdAt = new Date(entity[entityName + 'created_at']);
            this.updatedBy = entity[entityName + 'updated_by'];
            this.updatedAt = new Date(entity[entityName + 'updated_at']);
        }
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

    public getRegionCatalogCode (): number {
        return this.regionCatalogCode;
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

    public setClosedAt (stoppedAt: Date): void {
        this.closedAt = stoppedAt;
    }

    public getClosedAt (): Date {
        return this.closedAt;
    }

    public getCreatedBy (): string {
        return this.createdBy;
    }

    public getUpdatedBy (): string {
        return this.updatedBy;
    }
}
