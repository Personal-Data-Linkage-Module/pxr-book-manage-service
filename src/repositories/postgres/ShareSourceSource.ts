/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

/**
 * 共有元指定共有元テーブル
 */
@Entity('share_source_source')
export default class ShareSourceSource {
    /**
     * ID
     */
    @PrimaryGeneratedColumn({ type: 'bigint' })
    readonly id: number = 0;

    /**
     * 共有元指定データ種ID
     */
    @Column({ type: 'bigint', nullable: false, name: 'share_source_datatype_id' })
    shareSourceDatatypeId: number = 0;

    /**
     * アクターカタログコード
     */
    @Column({ type: 'bigint', name: 'actor_catalog_code' })
    actorCatalogCode: number = 0;

    /**
     * アクターカタログバージョン
     */
    @Column({ type: 'bigint', name: 'actor_catalog_version' })
    actorCatalogVersion: number = 0;

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
            const entityName = 'share_source_source';
            this.id = Number(entity[entityName + 'id']);
            this.shareSourceDatatypeId = Number(entity[entityName + 'share_source_datatype_id']);
            this.actorCatalogCode = Number(entity[entityName + 'actor_catalog_code']);
            this.actorCatalogVersion = Number(entity[entityName + 'actor_catalog_version']);
            this.isDisabled = entity[entityName + 'is_disabled'];
            this.createdBy = entity[entityName + 'created_by'];
            this.createdAt = new Date(entity[entityName + 'created_at']);
            this.updatedBy = entity[entityName + 'updated_by'];
            this.updatedAt = new Date(entity[entityName + 'updated_at']);
        }
    }
}
