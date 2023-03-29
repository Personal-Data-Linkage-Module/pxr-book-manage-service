/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import UserIdCooperate from './UserIdCooperate';

/**
 * My-Condition-Bookテーブルエンティティ
 */
@Entity('my_condition_book')
export default class MyConditionBook {
    /**
     * ID
     */
    @PrimaryGeneratedColumn({ type: 'bigint' })
    readonly id: number = 0;

    /**
     * PXR-ID
     */
    @Column({ type: 'varchar', length: 255, nullable: false, name: 'pxr_id' })
    pxrId: string = '';

    /**
     * ステータス
     */
    @Column({ type: 'bigint', nullable: false, default: 0 })
    status: number = 0;

    /**
     * Book閉鎖可能フラグ
     */
    @Column({ type: 'boolean', nullable: false, default: false, name: 'book_close_available' })
    bookCloseAvailable: boolean;

    /**
     * Book閉鎖フラグON日時
     */
    @CreateDateColumn(({ type: 'timestamp without time zone', name: 'book_close_available_at' }))
    bookCloseAvailableAt: Date = new Date();

    /**
     * 属性
     */
    @Column({ type: 'text' })
    attributes: string = '';

    /**
     * 付録
     */
    @Column({ type: 'text' })
    appendix: string = '';

    // 強制削除フラグ
    @Column({ type: 'boolean', nullable: false, default: false, name: 'force_deletion_flag' })
    forceDeletionFlag: boolean;

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
     * UserIdCooperate
     */
    @OneToOne(() => UserIdCooperate, userIdCooperate => userIdCooperate.bookId)
    userIdCooperate?: UserIdCooperate;

    /**
     * コンストラクタ
     * @param entity
     */
    constructor (entity?: {}) {
        if (entity) {
            const entityName = 'my_condition_book_';
            this.id = Number(entity[entityName + 'id']);
            this.pxrId = entity[entityName + 'pxr_id'];
            this.status = Number(entity[entityName + 'status']);
            this.attributes = entity[entityName + 'attributes'];
            this.appendix = entity[entityName + 'appendix'];
            this.bookCloseAvailable = entity[entityName + 'book_close_available'];
            this.bookCloseAvailableAt = entity[entityName + 'book_close_available_at'] ? new Date(entity[entityName + 'book_close_available_at']) : null;
            this.forceDeletionFlag = entity[entityName + 'force_deletion_flag'];
            this.isDisabled = entity[entityName + 'is_disabled'];
            this.createdBy = entity[entityName + 'created_by'];
            this.createdAt = new Date(entity[entityName + 'created_at']);
            this.updatedBy = entity[entityName + 'updated_by'];
            this.updatedAt = new Date(entity[entityName + 'updated_at']);
            this.userIdCooperate = new UserIdCooperate(entity);
        }
    }
}
