/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * 本人性確認事項テーブルエンティティ
 */
@Entity('identification')
export default class Identification {
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
     * 本人性確認事項カタログコード
     */
    @Column({ type: 'bigint', nullable: false, name: 'identification_code' })
    identificationCatalogCode: number = 0;

    /**
     * 本人性確認事項カタログバージョン
     */
    @Column({ type: 'bigint', nullable: false, name: 'identification_version' })
    identificationCatalogVersion: number = 0;

    /**
     * カタログテンプレート
     */
    @Column({ type: 'text', nullable: false })
    template: string = '';

    /**
     * カタログテンプレートハッシュ
     */
    @Column({ type: 'varchar', length: 255, nullable: false, name: 'template_hash' })
    templateHash: string = '';

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
            const entityName = 'identification_';
            this.id = Number(entity[entityName + 'id']);
            this.bookId = Number(entity[entityName + 'book_id']);
            this.identificationCatalogCode = Number(entity[entityName + 'identification_code']);
            this.identificationCatalogVersion = Number(entity[entityName + 'identification_version']);
            this.template = entity[entityName + 'template'];
            this.templateHash = entity[entityName + 'template_hash'];
            this.isDisabled = entity[entityName + 'is_disabled'];
            this.createdBy = entity[entityName + 'created_by'];
            this.createdAt = new Date(entity[entityName + 'created_at']);
            this.updatedBy = entity[entityName + 'updated_by'];
            this.updatedAt = new Date(entity[entityName + 'updated_at']);
        }
    }
}
