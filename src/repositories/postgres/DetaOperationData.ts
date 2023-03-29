/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

/**
 * データ操作定義データ
 */
@Entity('data_operation_data')
export default class DetaOperationData {
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
     * 親データID
     */
    @Column({ type: 'varchar', length: 255, name: 'parent_data_id' })
    parentDataId: string = null;

    /**
     * データ種（1：document, 2：event, 3：thing）
     */
    @Column({ type: 'smallint', nullable: false })
    type: number;

    /**
     * データ識別子
     */
    @Column({ type: 'varchar', length: 255 })
    identifier: string;

    /**
     * 属性
     */
    @Column({ type: 'text', name: 'attributes' })
    attributes: string = null;

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
            const entityName = 'data_operation_data_';
            this.id = parseInt(entity[entityName + 'id']);
            this.dataOperationId = Number(entity[entityName + 'data_operation_id']);
            this.parentDataId = entity[entityName + 'parent_data_id'];
            this.type = parseInt(entity[entityName + 'type']);
            this.identifier = entity[entityName + 'identifier'];
            this.attributes = entity[entityName + 'attributes'];
            this.isDisabled = entity[entityName + 'is_disabled'];
            this.createdBy = entity[entityName + 'created_by'];
            this.createdAt = new Date(entity[entityName + 'created_at']);
            this.updatedBy = entity[entityName + 'updated_by'];
            this.updatedAt = new Date(entity[entityName + 'updated_at']);
        }
    }
}
