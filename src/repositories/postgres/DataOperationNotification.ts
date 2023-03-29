/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * データ操作定義テーブルエンティティ
 */
@Entity('data_operation_notification')
export default class DataOperationNotification {
    /**
     * ID
     */
    @PrimaryGeneratedColumn({ type: 'bigint' })
    readonly id: number;

    /**
     * コード
     */
    @Column({ type: 'bigint', nullable: false, name: '_value' })
    _value: number;

    /**
     * バージョン
     */
    @Column({ type: 'bigint', nullable: false, name: '_ver' })
    _ver: number;

    /**
     * ステータス
     */
    @Column({ type: 'smallint', nullable: false, default: 0, name: 'status' })
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
    createdBy: string;

    /**
     * 登録日時
     */
    @CreateDateColumn({ type: 'timestamp without time zone', nullable: false, default: 'NOW()', name: 'created_at' })
    readonly createdAt: Date = new Date();

    /**
     * 更新者
     */
    @Column({ type: 'varchar', length: 255, nullable: false, name: 'updated_by' })
    updatedBy: string;

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
            const entityName = 'DataOperationNotification_';
            this.id = parseInt(entity[entityName + 'id']);
            this._value = parseInt(entity[entityName + '_value']);
            this._ver = parseInt(entity[entityName + '_ver']);
            this.status = parseInt(entity[entityName + 'status']);
            this.isDisabled = entity[entityName + 'is_disabled'];
            this.createdBy = entity[entityName + 'created_by'];
            this.createdAt = new Date(entity[entityName + 'created_at']);
            this.updatedBy = entity[entityName + 'updated_by'];
            this.updatedAt = new Date(entity[entityName + 'updated_at']);
        }
    }
}
