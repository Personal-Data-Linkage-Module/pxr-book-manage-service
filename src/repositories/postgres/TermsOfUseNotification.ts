/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * データ操作定義テーブルエンティティ
 */
@Entity('terms_of_use_notification')
export default class TermsOfUseNotification {
    /**
     * ID
     */
    @PrimaryGeneratedColumn({ type: 'bigint' })
    readonly id: number = 0;

    /**
     * 規約タイプ
     */
    @Column({ type: 'bigint', nullable: false, name: 'terms_type' })
    termsType: number = 0;

    /**
     * 利用規約カタログコード
     */
    @Column({ type: 'bigint', nullable: false, name: '_value' })
    _value: number = 0;

    /**
     * 利用規約カタログバージョン
     */
    @Column({ type: 'bigint', nullable: false, name: '_ver' })
    _ver: number = 0;

    /**
     * ステータス
     */
    @Column({ type: 'bigint', nullable: false, name: 'status' })
    status: number;

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
            const entityName = 'terms_of_use_notification_';
            this.id = parseInt(entity[entityName + 'id']);
            this.termsType = parseInt(entity[entityName + 'terms_type']);
            this._value = Number(entity[entityName + '_value']);
            this._ver = Number(entity[entityName + '_ver']);
            this.status = Number(entity[entityName + 'status']);
            this.isDisabled = entity[entityName + 'is_disabled'];
            this.createdBy = entity[entityName + 'created_by'];
            this.createdAt = new Date(entity[entityName + 'created_at']);
            this.updatedBy = entity[entityName + 'updated_by'];
            this.updatedAt = new Date(entity[entityName + 'updated_at']);
        }
    }
}
