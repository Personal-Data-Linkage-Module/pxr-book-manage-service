/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * My-Condition-Data出力テーブルエンティティ
 */
@Entity('my_condition_data_output_code')
export default class MyConditionDataOutputCode {
    /**
     * ID
     */
    @PrimaryGeneratedColumn({ type: 'bigint' })
    readonly id: number = 0;

    /**
     * コード
     */
    @Column({ type: 'varchar', length: 255, name: 'code' })
    code: string = null;

    /**
     * ブックID
     */
    @Column({ type: 'bigint', nullable: false, name: 'book_id' })
    bookId: number;

    /**
     * 出力タイプ
     */
    @Column({ type: 'bigint', nullable: false, name: 'output_type' })
    outputType: number;

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
     * リージョンカタログコード
     */
    @Column({ type: 'bigint', name: 'region_catalog_code' })
    regionCatalogCode: number;

    /**
     * リージョンカタログバージョン
     */
    @Column({ type: 'bigint', name: 'region_catalog_version' })
    regionCatalogVersion: number;

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
     * S3バケット名
     */
    @Column({ type: 'varchar', name: 'bucket_name' })
    bucketName: string = null;

    /**
     * 署名付きURL出力有効期限
     */
    @Column({ type: 'timestamp without time zone', name: 'presigned_url_expire_at' })
    presignedUrlExpireAt: Date = null;

    /**
     * 署名付きURL出力ステータス（未出力: 0, 出力済: 1）
     */
    @Column({ type: 'smallint', name: 'presigned_url_status' })
    presignedUrlStatus: number;

    /**
     * Region利用者連携解除承認ステータス（承認不要：0, 未承認: 1, 承認：2, 否認：3）
     */
    @Column({ type: 'smallint', name: 'release_cooperate_approval_status' })
    releaseCooperateApprovalStatus: number;

    /**
     * Region利用者連携解除ステータス（0: 未処理, 1: 処理済）
     */
    @Column({ type: 'smallint', name: 'release_cooperate_status' })
    releaseCooperateStatus: number;

    /**
     * Region利用者連携解除ステータス（0: 未処理, 1: 処理済）
     */
    @Column({ type: 'smallint', name: 'release_service_cooperate_status' })
    releaseServiceCooperateStatus: number;

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
            const entityName = 'my_condition_data_output_code_';
            this.id = parseInt(entity[entityName + 'id']);
            this.code = entity[entityName + 'code'];
            this.outputType = parseInt(entity[entityName + 'output_type']);
            this.bookId = parseInt(entity[entityName + 'book_id']);
            this.actorCatalogCode = parseInt(entity[entityName + 'actor_catalog_code']);
            this.actorCatalogVersion = parseInt(entity[entityName + 'actor_catalog_version']);
            this.regionCatalogCode = entity[entityName + 'region_catalog_code'] ? parseInt(entity[entityName + 'region_catalog_code']) : 0;
            this.regionCatalogVersion = entity[entityName + 'region_catalog_version'] ? parseInt(entity[entityName + 'region_catalog_version']) : 0;
            this.appCatalogCode = entity[entityName + 'app_catalog_code'] ? parseInt(entity[entityName + 'app_catalog_code']) : 0;
            this.appCatalogVersion = entity[entityName + 'app_catalog_version'] ? parseInt(entity[entityName + 'app_catalog_version']) : 0;
            this.wfCatalogCode = entity[entityName + 'wf_catalog_code'] ? parseInt(entity[entityName + 'wf_catalog_code']) : 0;
            this.wfCatalogVersion = entity[entityName + 'wf_catalog_version'] ? parseInt(entity[entityName + 'wf_catalog_version']) : 0;
            this.bucketName = entity[entityName + 'bucket_name'];
            this.presignedUrlExpireAt = entity[entityName + 'presigned_url_expire_at'] ? new Date(entity[entityName + 'presigned_url_expire_at']) : null;
            this.presignedUrlStatus = entity[entityName + 'presigned_url_status'];
            this.releaseCooperateApprovalStatus = entity[entityName + 'release_cooperate_approval_status'];
            this.releaseCooperateStatus = entity[entityName + 'release_cooperate_status'];
            this.releaseServiceCooperateStatus = entity[entityName + 'release_service_cooperate_status'];
            this.isProcessing = entity[entityName + 'is_processing'];
            this.isDisabled = entity[entityName + 'is_disabled'];
            this.createdBy = entity[entityName + 'created_by'];
            this.createdAt = new Date(entity[entityName + 'created_at']);
            this.updatedBy = entity[entityName + 'updated_by'];
            this.updatedAt = new Date(entity[entityName + 'updated_at']);
        }
    }

    public getId (): number {
        return this.id;
    }

    public getBookId (): number {
        return this.bookId;
    }

    public setBookId (bookId: number): void {
        this.bookId = bookId;
    }

    public getCode (): string {
        return this.code;
    }

    public setCode (code: string): void {
        this.code = code;
    }

    public getOutputType (): number {
        return this.outputType;
    }

    public setOutputType (outputType: number): void {
        this.outputType = outputType;
    }

    public getActorCatalogCode (): number {
        return this.actorCatalogCode;
    }

    public setActorCatalogCode (actorCatalogCode: number): void {
        this.actorCatalogCode = actorCatalogCode;
    }

    public getActorCatalogVersion (): number {
        return this.actorCatalogVersion;
    }

    public setActorCatalogVersion (actorCatalogVersion: number): void {
        this.actorCatalogVersion = actorCatalogVersion;
    }

    public getRegionCatalogCode (): number {
        return this.regionCatalogCode;
    }

    public setRegionCatalogCode (regionCatalogCode: number): void {
        this.regionCatalogCode = regionCatalogCode;
    }

    public getRegionCatalogVersion (): number {
        return this.regionCatalogVersion;
    }

    public setRegionCatalogVersion (regionCatalogVersion: number): void {
        this.regionCatalogVersion = regionCatalogVersion;
    }

    public getAppCatalogCode (): number {
        return this.appCatalogCode;
    }

    public setAppCatalogCode (appCatalogCode: number): void {
        this.appCatalogCode = appCatalogCode;
    }

    public getAppCatalogVersion (): number {
        return this.appCatalogVersion;
    }

    public setAppCatalogVersion (appCatalogVersion: number): void {
        this.appCatalogVersion = appCatalogVersion;
    }

    public getWfCatalogCode (): number {
        return this.wfCatalogCode;
    }

    public setWfCatalogCode (wfCatalogCode: number): void {
        this.wfCatalogCode = wfCatalogCode;
    }

    public getWfCatalogVersion (): number {
        return this.wfCatalogVersion;
    }

    public setWfCatalogVersion (wfCatalogVersion: number): void {
        this.wfCatalogVersion = wfCatalogVersion;
    }

    public getS3bucketName (): string {
        return this.bucketName;
    }

    public setS3bucketName (bucketName: string): void {
        this.bucketName = bucketName;
    }

    public getPresignedUrlExpireAt (): Date {
        return this.presignedUrlExpireAt;
    }

    public setPresignedUrlExpireAt (presignedUrlExpireAt: Date): void {
        this.presignedUrlExpireAt = presignedUrlExpireAt;
    }

    public getPresignedUrlStatus (): number {
        return this.presignedUrlStatus;
    }

    public setPresignedUrlStatus (presignedUrlStatus: number): void {
        this.presignedUrlStatus = presignedUrlStatus;
    }

    public getReleaseCooperateApprovalStatus (): number {
        return this.releaseCooperateApprovalStatus;
    }

    public setReleaseCooperateApprovalStatus (releaseCooperateApprovalStatus: number): void {
        this.releaseCooperateApprovalStatus = releaseCooperateApprovalStatus;
    }

    public getReleaseCooperateStatus (): number {
        return this.releaseCooperateStatus;
    }

    public setReleaseCooperateStatus (releaseCooperateStatus: number): void {
        this.releaseCooperateStatus = releaseCooperateStatus;
    }

    public getReleaseServiceCooperateStatus (): number {
        return this.releaseServiceCooperateStatus;
    }

    public setReleaseServiceCooperateStatus (releaseServiceCooperateStatus: number): void {
        this.releaseServiceCooperateStatus = releaseServiceCooperateStatus;
    }

    public getIsProcessing (): boolean {
        return this.isProcessing;
    }

    public setIsProcessing (isProcessing: boolean): void {
        this.isProcessing = isProcessing;
    }

    public getIsDisabled (): boolean {
        return this.isDisabled;
    }

    public setIsDisabled (isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    public setCreatedBy (createdBy: string): void {
        this.createdBy = createdBy;
    }

    public setUpdatedBy (updatedBy: string): void {
        this.updatedBy = updatedBy;
    }
}
