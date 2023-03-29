/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { BaseEntity, Entity, Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
/* eslint-enable */

@Entity('temporarily_shared_code')
export default class TemporarilySharedCode {
    /**
     * ID
     */
    @PrimaryGeneratedColumn({ type: 'uuid' })
    readonly id!: string;

    /**
     * データ操作定義ID
     */
    @Column({ type: 'bigint', nullable: false, name: 'data_operate_definition_id' })
    dataOperateDefinitionId: number;

    /**
     * 有効期限
     */
    @Column({ type: 'timestamp without time zone', nullable: false, name: 'expire_at' })
    expireAt: Date;

    /**
     * 削除フラグ
     */
    @Column({ type: 'boolean', nullable: false, default: false, name: 'is_disabled' })
    isDisabled: boolean;

    /**
     * 登録者
     */
    @Column({ type: 'varchar', length: 255, nullable: false, name: 'created_by' })
    createdBy: string;

    /**
     * 登録日時
     */
    @CreateDateColumn({ type: 'timestamp without time zone', nullable: false, default: 'NOW()', name: 'created_at' })
    readonly createdAt!: Date;

    /**
     * 更新者
     */
    @Column({ type: 'varchar', length: 255, nullable: false, name: 'updated_by' })
    updatedBy: string;

    /**
     * 更新日時
     */
    @CreateDateColumn({ type: 'timestamp without time zone', nullable: false, default: 'NOW()', name: 'updated_at' })
    readonly updatedAt!: Date;
}
