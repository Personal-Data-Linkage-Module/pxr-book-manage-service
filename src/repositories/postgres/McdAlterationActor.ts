/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * 利用者データ変更アクター
 */
@Entity('mcd_alteration_actor')
export default class McdAlterationActor {
    /**
     * ID
     */
    @PrimaryGeneratedColumn({ type: 'bigint' })
    readonly id: number = 0;

    /**
     * My-Condition-Data変更請求ID
     */
    @Column({ type: 'bigint', nullable: false, name: 'mcd_alteration_id' })
    mcdAlterationId: number = 0;

    /**
     * 対象期間From
     */
    @Column({ type: 'timestamp without time zone', name: 'target_term_start' })
    targetTermStart: Date;

    /**
     * 対象期間To
     */
    @Column({ type: 'timestamp without time zone', name: 'target_term_end' })
    targetTermEnd: Date;

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
    appCatalogCode: number;

    /**
     * アプリケーションカタログバージョン
     */
    @Column({ type: 'bigint', name: 'app_catalog_version' })
    appCatalogVersion: number;

    /**
     * WFカタログコード
     */
    @Column({ type: 'bigint', name: 'wf_catalog_code' })
    wfCatalogCode: number;

    /**
     * WFカタログバージョン
     */
    @Column({ type: 'bigint', name: 'wf_catalog_version' })
    wfCatalogVersion: number;

    /**
     * 変更内容
     */
    @Column({ type: 'text' })
    alteration: string = '';

    /**
     * 承認ステータス（未回答：0, 承認：1, 否認：2）
     */
    @Column({ type: 'smallint', nullable: false, name: 'approval_status' })
    approvalStatus: number = 0;

    /**
     * 対応予定時期・対応内容/否認理由
     */
    @Column({ type: 'text' })
    message: string = '';

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
            const entityName = 'mcd_alteration_actor_';
            this.id = parseInt(entity[entityName + 'id']);
            this.mcdAlterationId = entity[entityName + 'mcd_alteration_id'];
            this.targetTermStart = entity[entityName + 'target_term_start'];
            this.targetTermEnd = entity[entityName + 'target_term_end'];
            this.actorCatalogCode = parseInt(entity[entityName + 'actor_catalog_code']);
            this.actorCatalogVersion = parseInt(entity[entityName + 'actor_catalog_version']);
            this.appCatalogCode = entity[entityName + 'app_catalog_code'] ? parseInt(entity[entityName + 'app_catalog_code']) : 0;
            this.appCatalogVersion = entity[entityName + 'app_catalog_version'] ? parseInt(entity[entityName + 'app_catalog_version']) : 0;
            this.wfCatalogCode = entity[entityName + 'wf_catalog_code'] ? parseInt(entity[entityName + 'wf_catalog_code']) : 0;
            this.wfCatalogVersion = entity[entityName + 'wf_catalog_version'] ? parseInt(entity[entityName + 'wf_catalog_version']) : 0; this.alteration = entity[entityName + 'alteration'];
            this.approvalStatus = entity[entityName + 'approval_status'] ? parseInt(entity[entityName + 'approval_status']) : 0;
            this.message = entity[entityName + 'message'];
            this.isDisabled = entity[entityName + 'is_disabled'];
            this.createdBy = entity[entityName + 'created_by'];
            this.createdAt = new Date(entity[entityName + 'created_at']);
            this.updatedBy = entity[entityName + 'updated_by'];
            this.updatedAt = new Date(entity[entityName + 'updated_at']);
        }
    }
}
