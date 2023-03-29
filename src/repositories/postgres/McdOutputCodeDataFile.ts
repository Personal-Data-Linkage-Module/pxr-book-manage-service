/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * 出力データ管理テーブルエンティティ
 */
@Entity('mcd_output_code_data_file')
export default class McdOutputCodeDataFile {
    /**
     * ID
     */
    @PrimaryGeneratedColumn({ type: 'bigint' })
    readonly id: number = 0;

    /**
     * 出力データ収集アクターID
     */
    @Column({ type: 'bigint', name: 'mcd_output_code_actor_id' })
    mcdOutputCodeActorId: number = null;

    /**
     * My-Condition-Data出力コード
     */
    @Column({ type: 'varchar', length: 255, nullable: false, name: 'mcd_output_code' })
    mcdOutputCode: string = null;

    /**
     * アクターカタログコード
     */
    @Column({ type: 'bigint', name: 'actor_catalog_code' })
    actorCatalogCode: number;

    /**
     * アクターカタログバージョン
     */
    @Column({ type: 'bigint', name: 'actor_catalog_version' })
    actorCatalogVersion: number;

    /**
     * データ出力承認ステータス（未回答：0, 承認：1, 否認：2）
     */
    @Column({ type: 'smallint', name: 'output_data_approval_status' })
    ouputDataApprovalStatus: number;

    /**
     * 出力ファイル種別（ダウンロード: 1, アップロード: 2）
     */
    @Column({ type: 'smallint', nullable: false, name: 'output_file_type' })
    outputFileType: number;

    /**
     * アップロードファイル種別（利用者データ: 1, 個別データ: 2）
     */
    @Column({ type: 'smallint', name: 'upload_file_type' })
    uploadFileType: number;

    /**
     * 個別データ通知ステータス（未通知:0, 通知済:1）
     */
    @Column({ type: 'smallint', name: 'notification_status' })
    notificationStatus: number;

    /**
     * ファイル名
     */
    @Column({ type: 'varchar', length: 255, nullable: false, name: 'file_name' })
    fileName: string;

    /**
     * 入力ファイル準備ステータス（未完了：0, 完了：1）
     */
    @Column({ type: 'smallint', nullable: false, name: 'input_file_preparation_status' })
    inputFilePreparationStatus: number;

    /**
     * 出力ステータス（未作成：0, 作成済：1）
     */
    @Column({ type: 'smallint', nullable: false, name: 'output_status' })
    outputStatus: number;

    /**
     * データ削除指定（削除不可：0, 削除可：1）
     */
    @Column({ type: 'smallint', nullable: false, name: 'delete_data_spec' })
    deleteDataSpec: number;

    /**
     * 削除ステータス（削除なし:0, 削除準備中：1, 削除待ち:2, 削除済：3）
     */
    @Column({ type: 'smallint', nullable: false, name: 'delete_status' })
    deleteStatus: number;

    /**
     * 処理中フラグ
     */
    @Column({ type: 'boolean', nullable: false, default: false, name: 'is_processing' })
    isProcessing: boolean = false;

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
            const entityName = 'McdOutputCodeDataFile_';
            this.id = parseInt(entity[entityName + 'id']);
            this.mcdOutputCodeActorId = entity[entityName + 'mcd_output_code_actor_id'];
            this.mcdOutputCode = entity[entityName + 'code'];
            this.actorCatalogCode = parseInt(entity[entityName + 'actor_catalog_code']);
            this.actorCatalogVersion = parseInt(entity[entityName + 'actor_catalog_version']);
            this.ouputDataApprovalStatus = entity[entityName + 'output_data_approval_status'];
            this.outputFileType = entity[entityName + 'output_file_type'];
            this.uploadFileType = entity[entityName + 'upload_file_type'];
            this.notificationStatus = entity[entityName + 'notification_status'];
            this.fileName = entity[entityName + 'entity_name'];
            this.inputFilePreparationStatus = entity[entityName + 'input_file_perapration_status'];
            this.outputStatus = entity[entityName + 'output_status'];
            this.deleteDataSpec = entity[entityName + 'delete_data_spec'];
            this.isProcessing = entity[entityName + 'is_processing'];
            this.isDisabled = entity[entityName + 'is_disabled'];
            this.createdBy = entity[entityName + 'created_by'];
            this.createdAt = new Date(entity[entityName + 'created_at']);
            this.updatedBy = entity[entityName + 'updated_by'];
            this.updatedAt = new Date(entity[entityName + 'updated_at']);
        }
    }
}
