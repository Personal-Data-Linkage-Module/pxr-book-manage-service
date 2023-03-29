/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * My-Condition-Data変更請求
 */
@Entity('mcd_alteration')
export default class McdAlteration {
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
    regionCatalogCode: number;

    /**
     * リージョンカタログバージョン
     */
    @Column({ type: 'bigint', name: 'region_catalog_version' })
    regionCatalogVersion: number;

    /**
     * 変更内容
     */
    @Column({ type: 'text' })
    alteration: string = '';

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
            const entityName = 'mcd_alteration_';
            this.id = parseInt(entity[entityName + 'id']);
            this.bookId = parseInt(entity[entityName + 'book_id']);
            this.actorCatalogCode = parseInt(entity[entityName + 'actor_catalog_code']);
            this.actorCatalogVersion = parseInt(entity[entityName + 'actor_catalog_version']);
            this.regionCatalogCode = entity[entityName + 'region_catalog_code'] ? parseInt(entity[entityName + 'region_catalog_code']) : 0;
            this.regionCatalogVersion = entity[entityName + 'region_catalog_version'] ? parseInt(entity[entityName + 'region_catalog_version']) : 0;
            this.alteration = entity[entityName + 'alteration'];
            this.isDisabled = entity[entityName + 'is_disabled'];
            this.createdBy = entity[entityName + 'created_by'];
            this.createdAt = new Date(entity[entityName + 'created_at']);
            this.updatedBy = entity[entityName + 'updated_by'];
            this.updatedAt = new Date(entity[entityName + 'updated_at']);
        }
    }
}
