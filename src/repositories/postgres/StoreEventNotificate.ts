/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

/**
 * 蓄積イベント通知定義エンティティ
 */
@Entity('store_event_notificate')
export default class StoreEventNotificate {
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
     * 蓄積イベント通知/共有トリガー定義カタログコード
     */
    @Column({ type: 'bigint', name: 'store_event_notificate_catalog_code' })
    storeEventNotificateCatalogCode: number = 0;

    /**
     * 蓄積イベント通知/共有トリガー定義カタログバージョン
     */
    @Column({ type: 'bigint', name: 'store_event_notificate_catalog_version' })
    storeEventNotificateCatalogVersion: number = 0;

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
            const entityName = 'store_event_notificate';
            this.id = Number(entity[entityName + 'id']);
            this.notificateType = entity[entityName + 'notificate_type'];
            this.storeEventNotificateCatalogCode = Number(entity[entityName + 'store_event_notificate_catalog_code']);
            this.storeEventNotificateCatalogVersion = Number(entity[entityName + 'store_event_notificate_catalog_version']);
            this.shareCatalogCode = Number(entity[entityName + 'share_catalog_code']);
            this.shareCatalogVersion = Number(entity[entityName + 'share_catalog_version']);
            this.shareUuid = entity[entityName + 'share_uuid'];
            this.isDisabled = entity[entityName + 'is_disabled'];
            this.createdBy = entity[entityName + 'created_by'];
            this.createdAt = new Date(entity[entityName + 'created_at']);
            this.updatedBy = entity[entityName + 'updated_by'];
            this.updatedAt = new Date(entity[entityName + 'updated_at']);
        }
    }
}
