/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import { connectDatabase } from '../common/Connection';
import path = require('path');
import fs = require('fs');

// テスト用にlisten数を無制限に設定
require('events').EventEmitter.defaultMaxListeners = 0;

/**
 * URL
 */
export namespace Url {
    /**
     * ベースURL
     */
    export const baseURI: string = '/book-manage';

    /**
     * PXR-ID重複チェックURL
     */
    export const checkPxrIdURI: string = baseURI + '/check/pxr-id';

    /**
     * 本人性確認書類重複チェックURL
     */
    export const checkIdentificationURI: string = baseURI + '/check/identification';

    /**
     * Book強制削除URL
     */
    export const bookForceDeleteURI: string = baseURI + '/force';

    /**
     * My-Condition-Book一覧取得URL
     */
    export const searchURI: string = baseURI + '/search';

    /**
     * 利用者情報によるMy-Condition-Book一覧取得URL
     */
    export const searchUserURI: string = baseURI + '/search/user';

    /**
     * 利用者情報によるMy-Condition-Book一覧取得URL
     */
    export const searchCooperateURI: string = baseURI + '/search/cooperate';

    /**
     * Book削除予約URL
     */
    export const deletionURI: string = baseURI + '/reserve_deletion';

    /**
     * 本人性確認事項取得URL
     */
    export const identiryURI: string = baseURI + '/identity';

    /**
     * 利用者ID連携URL
     */
    export const cooperateURI: string = baseURI + '/cooperate';

    /**
     * 利用者ID連携URL（非推奨）
     */
    export const indCooperateURI: string = baseURI + '/ind/cooperate';

    /**
     * 利用者ID連携解除
     */
    export const cooperateReleaseURI: string = baseURI + '/cooperate/release';

    /**
     * 利用者ID連携申請URL
     */
    export const cooperateRequestURI: string = baseURI + '/cooperate/request';

    /**
     * 利用者ID連携解除申請URL
     */
    export const cooperateRequestReleaseURI: string = baseURI + '/cooperate/request/release';

    /**
     * 利用者ID設定URL
     */
    export const cooperateUserURI: string = baseURI + '/cooperate/user';

    /**
     * データ蓄積定義URL
     */
    export const dataStoreURI: string = baseURI + '/settings/store';

    /**
     * データ蓄積定義URL
     */
    export const loginCodeURI: string = baseURI + '/login-code';

    /**
     * 共有アクセス取得依頼URL(非推奨)
     */
    export const indAccessLogURI: string = baseURI + '/ind/accesslog';

    /**
     * 共有アクセス取得依頼URL
     */
    export const accessLogURI: string = baseURI + '/accesslog';

    /**
     * データ出力URL
     */
    export const outputURI: string = baseURI + '/output';

    /**
     * データ出力コード一覧（非推奨）
     */
    export const indOutputCodeURI: string = baseURI + '/ind/output/code';

    /**
     * データ出力コード一覧
     */
    export const outputCodeURI: string = baseURI + '/output/code';

    /**
     * 出力データ収集アクター取得URL
     */
    export const outputConditionURI: string = baseURI + '/output/condition';

    /**
     * データ出力管理取得URL
     */
    export const outputConditionDataURI: string = baseURI + '/output/condition/data_mng/search';

    /**
     * データ出力管理更新URL
     */
    export const updateOutputConditionDataURI: string = baseURI + '/output/condition/data_mng';

    /**
     * データ出力準備URL
     */
    export const outputConditionPrepare: string = baseURI + '/output/condition/prepare';

    /**
     * データ共有URL
     */
    export const shareURI: string = baseURI + '/setting/share';

    /**
     * データ共有URL(個人)(非推奨)
     */
    export const sharePersonURI: string = baseURI + '/ind/setting/share';

    /**
     * 利用者管理情報による個人の特定
     */
    export const userInfoSearchURI: string = baseURI + '/user/info/search';

    /**
     * 利用者管理情報の更新
     */
    export const userInfoURI: string = baseURI + '/user/info';

    /**
     * Book参照
     */
    export const bookURI: string = baseURI + '/book/search';

    /**
     * appendix更新（個人）(非推奨)
     */
    export const indAppendixURI: string = baseURI + '/ind/appendix';

    /**
     * appendix更新（個人）
     */
    export const appendixURI: string = baseURI + '/appendix';

    /**
     * 削除可能Book取得
     */
    export const getDeleteTargetBookURI: string = baseURI + '/delete/target';

    /**
     * CToken件数取得
     */
    export const ctokenSearchURI: string = baseURI + '/ctoken';

    /**
     * 一時的データ共有コード生成(Post)/取得(Get)（非推奨）
     */
    export const generateIndTempShareCodeURI: string = baseURI + '/ind/share/temp';

    /**
     * 一時的データ共有コード生成(Post)/取得(Get)
     */
    export const generateTempShareCodeURI: string = baseURI + '/share/temp';

    /**
     * 一時的データ共有コード照合
     */
    export const compairTempShareCodeURI: string = baseURI + '/share/temp/collation';

    /**
     * 提供データ収集
     */
    export const contractURI: string = baseURI + '/contract/collect';

    /**
     * Book取得個人
     */
    export const getIndBookURI: string = baseURI + '/ind';

    /**
     * 開示請求通知
     */
    export const getDisclosureURI: string = baseURI + '/demand' + '/disclosure';

    /**
    * 開示請求承認結果登録
    */
    export const getDisclosureApprovalURI: string = baseURI + '/demand' + '/disclosure/approval';

    /**
    * 変更請求通知
    */
    export const getAlterationURI: string = baseURI + '/demand' + '/alteration';

    /**
     * 変更請求承認結果登録
     */
    export const getAlterationApprovalURI: string = baseURI + '/demand' + '/alteration/approval';

    /**
     * ドキュメント取得
     */
    export const searchDocumentURI: string = baseURI + '/document/search';

    /**
     * 蓄積イベント通知
     */
    export const postStoreEventNotificate: string = baseURI + '/store-event/' + 'notificate';

    /**
     * 蓄積イベント通知
     */
    export const postStoreEvent: string = baseURI + '/store-event/';

    /**
     * 未同意規約取得（個人）（非推奨）
     */
    export const indTermsOfUseRequestList: string = baseURI + '/ind/term_of_use/request/list';

    /**
     * 未同意規約取得（個人）
     */
    export const termsOfUseRequestList: string = baseURI + '/term_of_use/request/list';

    /**
      * リージョン規約
      */
    export const termsOfUseRegion: string = baseURI + '/term_of_use/region';

    /**
     * PF規約
     */
    export const termsOfUsePlatform: string = baseURI + '/term_of_use/platform';

    /**
     * PF利用規約更新通知登録
     */
    export const postPlatformUpdate: string = baseURI + '/term_of_use/platform/update';

    /**
     * Region利用規約更新通知登録
     */
    export const postRegionUpdate: string = baseURI + '/term_of_use/region/update';

    /**
     * Region終了対象登録/取得
     */
    export const regionClose: string = baseURI + '/region/close';

    /**
     * データ操作定義追加
     */
    export const settingsUpdate: string = baseURI + '/settings/update';

    /**
     * データ操作定義更新
     */
    export const settingsTargetFind: string = baseURI + '/settings/target/find';

    /**
     * データ操作定義取得
     */
    export const settingsTarget: string = baseURI + '/settings/target';

    /**
     * データ操作定義最終送付日時更新
     */
    export const settingsNotificationComplete: string = baseURI + '/settings/notification/complete';
}

/**
 * テスト用共通クラス
 */
export default class Common {
    /**
     * DB接続
     */
    public async connect () {
        await connectDatabase();
    }

    /**
     * SQLファイル実行
     * @param fileName
     */
    public async executeSqlFile (fileName: string) {
        // ファイルをオープン
        const fd: number = fs.openSync(path.join('./ddl/unit-test/', fileName), 'r');

        // ファイルからSQLを読込
        const sql: string = fs.readFileSync(fd, 'utf-8');

        // ファイルをクローズ
        fs.closeSync(fd);

        // DBを初期化
        await this.executeSqlString(sql);
    }

    /**
     * SQL実行
     * @param sql
     */
    public async executeSqlString (sql: string) {
        // DBを初期化
        const connection = await connectDatabase();
        await connection.query(sql);
    }
}
