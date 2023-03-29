/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/**
 *
 *
 *
 * $Date$
 * $Revision$
 * $Author$
 *
 * TEMPLATE VERSION :  76463
 */

// SDE-IMPL-REQUIRED 本ファイルをコピーしてサービスレイヤーの処理を実装します。
/* eslint-disable */
import { Service } from 'typedi';
import * as _ from 'lodash';
import { InsertResult } from 'typeorm';
import BookOpenDto from './dto/BookOpenServiceDto';
import OperatorAddDto from './dto/OperatorAddDto';
import OperatorService from '../services/OperatorService';
import IdentEntity from '../repositories/postgres/Identification';
import CatalogService from './CatalogService';
import CatalogDto from './dto/CatalogDto';
import IdentityDto from './dto/IdentityServiceDto';
import IdentityService from './IdentityService';
import PostBookOpenResDto from '../resources/dto/PostBookOpenResDto';
import PostCheckPxrIdResDto from '../resources/dto/PostCheckPxrIdResDto';
import PostCheckIdentificationResDto from '../resources/dto/PostCheckIdentificationResDto';
import configFile = require('config');
import * as crypto from 'crypto';
import EntityOperation from '../repositories/EntityOperation';
import Password from '../common/Password';
import { ResponseCode } from '../common/ResponseCode';
import { connectDatabase } from '../common/Connection';
import AppError from '../common/AppError';
import Config from '../common/Config';
import { OperatorType } from '../common/Operator';
import { transformFromDateTimeToString } from '../common/Transform';
import IdService from './IdService_Stub';
import urljoin = require('url-join');
import TouConsent from '../repositories/postgres/TouConsent';
const config = Config.ReadConfig('./config/config.json');

/* eslint-enable */

@Service()
export default class BookOpenService {
    /** identification catalogCode */
    readonly DRIVER_LICENCE = 30001;
    readonly MY_NUMBER_CARD = 30007;
    readonly RESIDENCE_CARD = 30009;

    /** identification item catalogCode */
    readonly GENDER = 30021;
    readonly BIRTHDAY = 30022;
    readonly ADDRESS = 30035;
    readonly FULL_NAME = 30037;
    readonly BIRTHDAY_JAPANESE = 30038;

    /**
     * Book開設
     * リファクタ履歴
     *  separate : linkageIDService（特定技術のため）
     *  separate : insertBook（My-Condition-Bookレコード登録処理）
     *  separate : verifyIdentCode（data-trader特定処理）
     *  separate : checkIdentRate（本人性確認検証率確認処理）
     */
    public async bookOpen (bookOpenDto: BookOpenDto): Promise<any> {
        // dtoから扱いやすいように値を取り出す
        let pxrId = bookOpenDto.getPxrId();
        const loginId = bookOpenDto.getLoginId();
        const attrs = bookOpenDto.getAttributes();
        const appendix = bookOpenDto.getAppendix();
        const userInfo = bookOpenDto.getUserInformation();
        const message = bookOpenDto.getMessage();
        // 電話番号だけ取り出す
        let smsVerificateFlg = false;
        const phoneNumber = await (async u => {
            if (!u || !Array.isArray(u['item-group'])) {
                return null;
            }
            for (const itemGroup of u['item-group']) {
                for (const item of itemGroup.item) {
                    if (item.type._value === parseInt(configFile.get('phoneNumberCode'))) {
                        const value = item.content;
                        if (typeof value !== 'string') {
                            throw new AppError(message.PHONE_NUMBER_FIELD_IS_NOT_STRING, 400);
                        }
                        if (item['require-sms-verification']) {
                            smsVerificateFlg = true;
                        }
                        return value;
                    }
                }
            }
        })(userInfo);
        if (!phoneNumber) {
            throw new AppError(message.REQUIRED_PHONE_NUMBER, 400);
        }

        // PXR-IDの重複確認（削除フラグ関係なく、リクエストとPXR-IDが重複するBookが既に存在する場合エラー）
        const checkPxrId = await EntityOperation.isPxrIdAlreadyExists(pxrId);
        if (pxrId && checkPxrId !== null) {
            throw new AppError(message.PXR_ID_EXISTS, ResponseCode.BAD_REQUEST);
        }

        // 本人性検証率検証
        await this.checkIdentRate(bookOpenDto);

        // 初回パスワードを生成（8桁の大文字小文字英数による乱数）
        const initialPassword = await Password.getRandomStr();
        const hpassword = await Password.hashing(initialPassword);
        const expire = new Date();
        expire.setDate(expire.getDate() + bookOpenDto.getInitialPasswordExpire());
        const operatorAttrs = {
            initialPasswordExpire: transformFromDateTimeToString(config['timezone'], expire),
            smsAuth: smsVerificateFlg
        };

        // グローバル設定を取得し、IDサービスを使用する設定となっているか確認する
        pxrId = await this.linkageIDService(bookOpenDto, pxrId, initialPassword);

        // トランザクションの開始 MyConditionBook登録
        await this.insertBook(pxrId, bookOpenDto, hpassword, operatorAttrs);
        // カタログのcatalogItem.ns: Data-Trader(データ取引)だった場合の処理
        await this.verifyIdentCode(bookOpenDto, pxrId);

        // PXR-ID、ログインID、初回パスワード、attributeをレスポンスとして返す
        // レスポンスを生成
        const response = new PostBookOpenResDto();
        response.pxrId = pxrId;
        response.loginId = loginId;
        response.initialPassword = initialPassword;
        response.attributes = attrs;
        response.appendix = appendix;
        // データ取引はサポート外のため本人性確認コードはレスポンスに含まない

        // レスポンスを返す
        return response;
    }

    /**
     * IDサービス連携
     * @param bookOpenDto
     * @param pxrId
     * @param initialPassword
     * @returns
     */
    private async linkageIDService (bookOpenDto: BookOpenDto, pxrId: string, initialPassword: string) {
        const message = bookOpenDto.getMessage();
        const operator = bookOpenDto.getOperator();
        const idServiceFlg = bookOpenDto.getIdServiceFlg();
        const loginId = bookOpenDto.getLoginId();
        const ident = bookOpenDto.getIdentification();
        // グローバル設定を取得し、IDサービスを使用する設定となっているか確認する
        const catalogService: CatalogService = new CatalogService();
        const globalSettingDto = new CatalogDto();
        globalSettingDto.setUrl(bookOpenDto.getCatalogUrl());
        globalSettingDto.setOperator(operator);
        globalSettingDto.setProcNum(1);
        globalSettingDto.setMessage(message);

        // カタログサービスから対象カタログを取得
        const globalSetting = await catalogService.getGlobalSettinCatalog(globalSettingDto);
        if (globalSetting && globalSetting['template'] && globalSetting['template']['use_id_connect']) {
            // idServiceFlgがtrue  => PXR-ID  必須
            // idServiceFlgがfalse => LoginID 必須 かつ IDサービス連携実施
            if ((idServiceFlg && !pxrId) || (!idServiceFlg && !loginId)) {
                throw new AppError(message.REQUIRED_VALUE_FOR_ID_SERVICE, ResponseCode.BAD_REQUEST);
            }

            if (!idServiceFlg && loginId) {
                let userattributes = {};
                for (let index = 0; index < ident.length; index++) {
                    // リクエストから本人性確認書類を取得し、name, birthdate, birthdate_jp, address, genderを取り出す
                    if (ident[index]['_code']['_value'] === this.DRIVER_LICENCE) {
                        userattributes = this.setUserattributesDriversLicence(ident[index]);
                    } else if (ident[index]['_code']['_value'] === this.MY_NUMBER_CARD) {
                        userattributes = this.setUserattributesMyNumberCard(ident[index]);
                    } else if (ident[index]['_code']['_value'] === this.RESIDENCE_CARD) {
                        userattributes = this.setUserattributesResidenceCard(ident[index]);
                    }
                }
                // SC個人ID発行を呼び出す
                const idServiceBody = {
                    id: loginId,
                    password: initialPassword,
                    passwordflg: '1',
                    userattributes: userattributes
                };

                const idService: IdService = new IdService();
                // IDサービスからのレスポンスをリクエストにpxrIdとして追加する
                const idServiceRes = await idService.issuePersonalID(idServiceBody, bookOpenDto.getOperator());
                pxrId = idServiceRes;
            }
        } else {
            // PXR-ID 必須
            if (!pxrId) {
                throw new AppError(message.REQUIRED_VALUE_FOR_ID_SERVICE, ResponseCode.BAD_REQUEST);
            }
        }

        return pxrId;
    }

    /**
     * 本人性確認コードを本人性確認済みの状態で発行する(処理削除、エラー検出のみ行う)
     * @param bookOpenDto
     * @param pxrId
     * @returns
     */
    private async verifyIdentCode (bookOpenDto: BookOpenDto, pxrId: string) {
        const message = bookOpenDto.getMessage();
        const userId = bookOpenDto.getUserId();
        const operator = bookOpenDto.getOperator();
        // ログイン情報のactor._valueを使用してカタログを取得する
        const catalogService = new CatalogService();
        const catalogDto = new CatalogDto();
        catalogDto.setOperator(operator);
        catalogDto.setUrl(bookOpenDto.getCatalogUrl());
        catalogDto.setCode(operator.getActorCode());
        catalogDto.setMessage(message);
        const catalogInfo = await catalogService.getCatalogInfo(catalogDto);
        // Data-Trader(データ取引)の場合
        const ns: string = catalogInfo['catalogItem'] ? catalogInfo['catalogItem']['ns'] : null;
        if ((ns) && (ns.indexOf('/data-trader') >= 0) && userId) {
            throw new AppError(message.UNSUPPORTED_ACTOR, ResponseCode.BAD_REQUEST);
        }
    }

    /**
     * My-Condition-Book登録
     * @param pxrId
     * @param bookOpenDto
     * @param hpassword
     * @param operatorAttrs
     * リファクタ履歴
     *  separate : addOperator（オペレーター追加処理）
     */
    private async insertBook (pxrId: string, bookOpenDto: BookOpenDto, hpassword: string, operatorAttrs: { initialPasswordExpire: string; smsAuth: boolean; }) {
        const attrs = bookOpenDto.getAttributes();
        const appendix = bookOpenDto.getAppendix();
        const ident = bookOpenDto.getIdentification();
        const register = bookOpenDto.getRegister();
        const platformTermsOfUse = bookOpenDto.getPlatformTermsOfUse();
        const message = bookOpenDto.getMessage();
        const operator = bookOpenDto.getOperator();
        const connection = await connectDatabase();
        await connection.transaction(async (trans) => {
            // My-Condition-Bookテーブルにレコードを登録
            const bookResult: InsertResult = await EntityOperation.insertCondBookRecord(trans, pxrId, JSON.stringify(attrs), JSON.stringify(appendix), register);
            const BookId = parseInt(bookResult.raw[0].id);

            // 本人性確認書類テーブルにidentificationの配列分レコードを登録
            for (let n = 0; n < ident.length; n++) {
                const identData: IdentEntity = new IdentEntity(null);
                // データをセット
                identData.bookId = BookId;
                identData.identificationCatalogCode = ident[n]['_code']['_value'];
                identData.identificationCatalogVersion = ident[n]['_code']['_ver'];
                identData.template = ident[n];
                identData.templateHash = this.convSha256(JSON.stringify(ident[n]));
                // insertを実行
                await EntityOperation.insertIdentificationRecord(trans, identData, register);
            }

            // プラットフォーム利用規約同意テーブルにレコードを登録する
            const catalogService = new CatalogService();
            const platformTouCatalogDto = new CatalogDto();
            platformTouCatalogDto.setUrl(bookOpenDto.getCatalogUrl());
            platformTouCatalogDto.setCode(platformTermsOfUse['_value']);
            platformTouCatalogDto.setOperator(operator);
            platformTouCatalogDto.setMessage(message);
            // カタログサービスから対象カタログを取得
            let platformTouCatalogInfo;
            try {
                platformTouCatalogInfo = await catalogService.getCatalogInfo(platformTouCatalogDto);
            } catch (e) {
                throw new AppError(message.NOT_EXIST_PLATFORM_TOU, ResponseCode.BAD_REQUEST);
            }
            if (!platformTouCatalogInfo || (Number(platformTouCatalogInfo['catalogItem']['_code']['_ver']) !== Number(platformTermsOfUse['_ver']))) {
                throw new AppError(message.NOT_EXIST_PLATFORM_TOU, ResponseCode.BAD_REQUEST);
            }

            const touConsent = new TouConsent(null);
            touConsent.bookId = BookId;
            touConsent.termsType = 1;
            touConsent.termsOfUseCode = platformTermsOfUse['_value'];
            touConsent.termsOfUseVersion = platformTermsOfUse['_ver'];
            await EntityOperation.insertTouConsentRecord(trans, touConsent, register);

            // オペレーター追加
            await this.addOperator(pxrId, hpassword, operatorAttrs, bookOpenDto);
        });
    }

    /**
     * オペレーター追加
     * @param pxrId
     * @param hpassword
     * @param operatorAttrs
     * @param bookOpenDto
     */
    private async addOperator (pxrId: string, hpassword: string, operatorAttrs: { initialPasswordExpire: string; smsAuth: boolean; }, bookOpenDto: BookOpenDto) {
        const sessionId = bookOpenDto.getSessionId();
        const userInfo = bookOpenDto.getUserInformation();
        const message = bookOpenDto.getMessage();
        // オペレーター追加のdtoにセット
        const operatorAddDto = new OperatorAddDto();
        operatorAddDto.setLoginId(pxrId);
        operatorAddDto.setHpassword(hpassword);
        operatorAddDto.setPxrId(pxrId);
        operatorAddDto.setAttributes(operatorAttrs);
        operatorAddDto.setSessionId(sessionId);
        operatorAddDto.setUrl(bookOpenDto.getOperatorUrl());
        operatorAddDto.setOperator(bookOpenDto.getOperator());
        operatorAddDto.setMessage(message);
        operatorAddDto.setProcMode(1);

        // オペレーターユーザ情報のdtoにセット
        const userInfoDto = new OperatorAddDto();
        userInfoDto.setPxrId(pxrId);
        userInfoDto.setUserInformation(userInfo);
        let url;
        const baseUrl = bookOpenDto.getOperatorUrl();
        if ((baseUrl + '').indexOf('pxr-block-proxy') === -1) {
            url = baseUrl + '/user/info';
        } else {
            url = baseUrl + encodeURIComponent('/user/info');
        }
        userInfoDto.setUrl(url);
        userInfoDto.setOperator(bookOpenDto.getOperator());
        userInfoDto.setMessage(message);
        userInfoDto.setProcMode(0);

        const operatorService = new OperatorService();
        try {
            // オペレーターサービスの追加APIを使用し、type0のオペレーターを登録
            await operatorService.postOperatorAdd(operatorAddDto);

            // オペレーターサービスのAPIを使用し、user情報を登録
            await operatorService.postOperatorAdd(userInfoDto);
        } catch (err) {
            try {
                // オペレーターサービスのAPIでエラーが発生した場合は対象のオペレーターを取得し削除
                const operatorDto = new OperatorAddDto();
                operatorDto.setLoginId(operatorAddDto.getLoginId());
                operatorDto.setPxrId(operatorAddDto.getPxrId());
                let url;
                {
                    const baseUrl = bookOpenDto.getOperatorUrl();
                    if ((baseUrl + '').indexOf('pxr-block-proxy') === -1) {
                        url = baseUrl + '/?type=' + OperatorType.TYPE_IND.toString() + '&loginId=' + operatorAddDto.getLoginId();
                    } else {
                        url = baseUrl + encodeURIComponent('/?type=' + OperatorType.TYPE_IND.toString() + '&loginId=' + operatorAddDto.getLoginId());
                    }
                }
                userInfoDto.setUrl(url);
                operatorDto.setOperator(bookOpenDto.getOperator());
                operatorDto.setMessage(bookOpenDto.getMessage());
                const operatorInfo = await operatorService.operatorDeleteInfo(operatorDto);
                // オペレーターを削除する
                const operatorDelDto = new OperatorAddDto();
                operatorDelDto.setLoginId(operatorAddDto.getLoginId());
                operatorDelDto.setPxrId(operatorAddDto.getPxrId());
                const operatorBody = operatorInfo.body;
                {
                    const baseUrl = bookOpenDto.getOperatorUrl();
                    if ((baseUrl + '').indexOf('pxr-block-proxy') === -1) {
                        url = urljoin(baseUrl, operatorBody.operatorId.toString());
                    } else {
                        url = baseUrl + encodeURIComponent('/' + operatorBody.operatorId.toString());
                    }
                }
                userInfoDto.setUrl(url);
                operatorDelDto.setOperator(bookOpenDto.getOperator());
                operatorDelDto.setMessage(bookOpenDto.getMessage());
                operatorDelDto.setProcMode(3); // 3:削除
                await operatorService.operatorDeleteInfo(operatorDelDto);
            } catch (e) {
                // オペレーターの削除に失敗した場合、エラー元のExceptionをThrow
                throw err;
            }
            // エラー元のExceptionをThrow
            throw err;
        }
    }

    /**
     * 本人性検証率チェック
     * @param bookOpenDto
     */
    private async checkIdentRate (bookOpenDto: BookOpenDto) {
        const ident = bookOpenDto.getIdentification();
        const message = bookOpenDto.getMessage();
        const operator = bookOpenDto.getOperator();
        // カタログから本人性検証率を取得して合計が100以上になることを確認する
        let totalRatio: number = 0;
        // 本人性検証率の記載があるpxr-rootグローバルsettingを取得
        const pxrRootGlobalSettingDto = new CatalogDto();
        pxrRootGlobalSettingDto.setUrl(bookOpenDto.getCatalogUrl());
        pxrRootGlobalSettingDto.setNs(config['pxrRootGrobalSettingNs']);
        pxrRootGlobalSettingDto.setOperator(operator);
        pxrRootGlobalSettingDto.setProcNum(1);
        pxrRootGlobalSettingDto.setMessage(message);

        // カタログサービスから対象カタログを取得
        const catalogService: CatalogService = new CatalogService();
        const pxrRootGlobalSettingArray = await catalogService.getCatalogInfo(pxrRootGlobalSettingDto);
        const pxrRootGlobalSetting = pxrRootGlobalSettingArray[0];

        for (let index = 0; index < ident.length; index++) {
            // カタログコードを取得
            const code = ident[index]['_code']['_value'];
            const version = ident[index]['_code']['_ver'];
            // 配列全てのidentification[n]._code, _verを使用してカタログを取得する
            const identCatalogDto = new CatalogDto();
            identCatalogDto.setUrl(bookOpenDto.getCatalogUrl());
            identCatalogDto.setCode(code);
            identCatalogDto.setVersion(version);
            identCatalogDto.setOperator(operator);
            identCatalogDto.setMessage(message);
            // カタログサービスから対象カタログを取得
            const identCatalogInfo = await catalogService.getCatalogInfo(identCatalogDto);
            // 取得したカタログを確認し、catalogItem.nsがcatalog/*/person/identificationであることを確認する
            if (!/^catalog\/[^/]*\/person\/identification$/g.test(identCatalogInfo['catalogItem']['ns'])) {
                throw new AppError(message.NOT_IDENTIFICATION_CATALOG_CODE, ResponseCode.BAD_REQUEST);
            }
            if (pxrRootGlobalSetting && pxrRootGlobalSetting['template'] && pxrRootGlobalSetting['template']['identification-document']) {
                for (const document of pxrRootGlobalSetting['template']['identification-document']) {
                    if (document['document']['_value'] === code && document['document']['_ver'] === version) {
                        const ratio: number = document['satisfaction-rate'] ? parseInt(document['satisfaction-rate']) : 0;
                        totalRatio += ratio;
                        break;
                    }
                }
            }
        }
        // 本人性検証率が100未満の場合、エラー
        if (totalRatio < 100) {
            throw new AppError(message.VERIFICATION_RATIO_NOT_ENOUGH, ResponseCode.BAD_REQUEST);
        }

        // catalog/built_in/person/item-type, catalog/ext/*/person/item-typeでカタログをネームスペース取得
        // identification-item.typeがすべて含まれているか確認する
        // item-groupの配列を作成
        const identGroups: any[] = [];
        for (let i = 0; i < ident.length; i++) {
            const identGroup = _.cloneDeep(ident[i]['item-group']);
            identGroups.push(identGroup);
        }
        const catalogDto = new CatalogDto();
        catalogDto.setUrl(bookOpenDto.getCatalogUrl());
        catalogDto.setProcNum(1);
        catalogDto.setNs('catalog/built_in/person/item-type');
        catalogDto.setOperator(bookOpenDto.getOperator());
        catalogDto.setMessage(message);
        // カタログサービスから対象カタログを取得
        const catalogInfo1 = await catalogService.getCatalogInfo(catalogDto);
        const notExistsFlg = await checkExistsIdentType(identGroups, catalogInfo1);
        let notExistsFlg2 = false;
        if (notExistsFlg) {
            // extを検索
            catalogDto.setNs('catalog/ext/' + bookOpenDto.getExtName() + '/person/item-type');
            const catalogInfo2 = await catalogService.getCatalogInfo(catalogDto);
            notExistsFlg2 = await checkExistsIdentType(identGroups, catalogInfo2);
        }
        if (notExistsFlg2) {
            // すべては含まれていなかった
            throw new AppError(message.NOT_IDENTIFICATION_ITEM, ResponseCode.BAD_REQUEST);
        }
        // 本人性確認事項一致確認
        async function checkExistsIdentType (identGroupsList: any[], catalogInfo: any) {
            for (let i = 0; i < identGroupsList.length; i++) {
                for (let p = 0; p < identGroupsList[i].length; p++) {
                    for (let j = 0; j < identGroupsList[i][p]['item'].length; j++) {
                        for (let k = 0; k < catalogInfo.length; k++) {
                            if ((identGroupsList[i][p]['item'][j]['type']['_value'] === catalogInfo[k]['catalogItem']['_code']['_value']) &&
                                (identGroupsList[i][p]['item'][j]['type']['_ver'] === catalogInfo[k]['catalogItem']['_code']['_ver'])) {
                                identGroupsList[i][p]['item'][j]['exists'] = 1;
                                break;
                            }
                        }
                    }
                }
            }
            // すべて一致したか確認
            let flg = false;
            for (let i = 0; i < identGroupsList.length; i++) {
                for (let p = 0; p < identGroupsList[i].length; p++) {
                    for (let j = 0; j < identGroupsList[i][p]['item'].length; j++) {
                        if (!identGroupsList[i][p]['item'][j]['exists']) {
                            flg = true;
                        }
                    }
                }
            }
            return flg;
        }
    }

    /**
     * 初回パスワードを生成
     */
    private createInitialPassword (digit: number): string {
        // 対象を大小英数字とする
        const c = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const cl = c.length;
        var result = '';

        // 生成
        for (var i = 0; i < digit; i++) {
            result += c[Math.floor(Math.random() * cl)];
        }
        return result;
    }

    /**
     * SHA256化
     * @param base
     */
    private convSha256 (base: string): string {
        // hash化
        const sha256 = crypto.createHash('sha256');
        sha256.update(base);
        return sha256.digest('hex');
    }

    /**
     * PXR-ID重複チェック
     */
    public async checkPxrId (bookOpenDto: BookOpenDto): Promise<any> {
        // dtoから扱いやすいように値を取り出す
        const pxrId = bookOpenDto.getPxrId();

        // PXR-IDの重複確認（削除フラグ関係なく、リクエストとPXR-IDが重複するBookが既に存在する場合エラー）
        const retDto = new PostCheckPxrIdResDto();
        const checkPxrId = await EntityOperation.isPxrIdAlreadyExists(pxrId);
        if (checkPxrId === null) {
            retDto.status = 'ok';
        } else {
            retDto.status = 'ng';
        }
        return retDto;
    }

    /**
     * 本人性確認書類重複チェック
     */
    public async checkIdentification (bookOpenDto: BookOpenDto): Promise<any> {
        // dtoから扱いやすいように値を取り出す
        const identifications = bookOpenDto.getIdentification();
        const retDto = new PostCheckIdentificationResDto();

        // 本人性確認書類によるBook照合
        for (const identification of identifications) {
            // 文字列変換してからsha256化
            const hash = this.convSha256(JSON.stringify(identification));
            const checkResults = await EntityOperation.isTemplateHashExists(hash);
            if (checkResults.length > 0) {
                const duplicationBookIds: number[] = [];
                for (const checkResult of checkResults) {
                    duplicationBookIds.push(checkResult.bookId);
                }
                const myConditionBookResults = await EntityOperation.getBookRecordFromBookId(duplicationBookIds);
                const duplicationPxrIds: string[] = [];
                for (const myConditionBookResult of myConditionBookResults) {
                    duplicationPxrIds.push(myConditionBookResult.pxrId);
                }
                const resEle = {
                    duplicationPxrId: duplicationPxrIds,
                    identification: identification
                };
                retDto.identification.push(resEle);
            }
        }
        return retDto;
    }

    /**
     * Book閉鎖
     */
    public async bookClose (bookOpenDto: BookOpenDto): Promise<any> {
        // dtoから扱いやすいように値を取り出す
        const message = bookOpenDto.getMessage();
        const operator = bookOpenDto.getOperator();
        const pxrId = operator.getPxrId();
        const configure = bookOpenDto.getConfigure();

        // PXR-IDの存在確認 存在しなかったらエラー
        const checkPxrId = await EntityOperation.isPxrIdExists(pxrId);
        if (!checkPxrId) {
            throw new AppError(message.PXR_ID_NOT_EXISTS, ResponseCode.BAD_REQUEST);
        }

        // My-Condition-Data出力コード生成処理
        const mcdOutputCode = this.createInitialPassword(8);

        // 関連データの削除
        const bookId = checkPxrId.id;
        const operatorUrl = configure['operatorUrl'];
        const connection = await connectDatabase();
        await connection.transaction(async trans => {
            // My-Condition-Bookテーブルのレコードを削除する
            await EntityOperation.deleteCondBookRecordPxrId(trans, pxrId, operator.getLoginId());

            // 利用者ID連携テーブルのレコードを削除する
            await EntityOperation.deleteUserIdCooperateRecordBookId(trans, bookId, operator.getLoginId());

            // 本人性確認書類テーブルの該当するレコードを削除する
            await EntityOperation.deleteIdentificationRecordBookId(trans, bookId, operator.getLoginId());

            // データ操作定義を削除する
            const dataOpResult = await EntityOperation.deleteDataOperationRecordBookId(trans, bookId, operator.getLoginId());
            for (let i = 0; i < dataOpResult.raw.length; i++) {
                await EntityOperation.deleteDataOperationDataTypeRecord(trans, dataOpResult.raw[i].id, operator.getLoginId());
            }

            // オペレータを削除するためオペレータ情報を取得する
            const operatorDto = new OperatorAddDto();
            operatorDto.setLoginId(pxrId);
            operatorDto.setPxrId(pxrId);
            let url;
            if ((operatorUrl + '').indexOf('pxr-block-proxy') === -1) {
                url = operatorUrl + '/?type=' + OperatorType.TYPE_IND.toString() + '&loginId=' + operator.getLoginId();
            } else {
                url = operatorUrl + encodeURIComponent('/?type=' + OperatorType.TYPE_IND.toString() + '&loginId=' + operator.getLoginId());
            }
            operatorDto.setUrl(url);
            operatorDto.setOperator(operator);
            operatorDto.setMessage(message);
            const operatorService = new OperatorService();
            const operatorInfo = await operatorService.operatorDeleteInfo(operatorDto);
            // オペレータを削除する
            const operatorDelDto = new OperatorAddDto();
            operatorDelDto.setLoginId(pxrId);
            operatorDelDto.setPxrId(pxrId);
            const operatorBody = operatorInfo.body;
            if ((operatorUrl + '').indexOf('pxr-block-proxy') === -1) {
                url = urljoin(operatorUrl, operatorBody.operatorId.toString());
            } else {
                url = operatorUrl + encodeURIComponent('/' + operatorBody.operatorId.toString());
            }
            operatorDelDto.setUrl(url);
            operatorDelDto.setOperator(operator);
            operatorDelDto.setMessage(message);
            operatorDelDto.setProcMode(3);
            await operatorService.operatorDeleteInfo(operatorDelDto);

            // グローバル設定を取得し、IDサービスを使用する設定となっているか確認する
            const globalSettingDto = new CatalogDto();
            globalSettingDto.setOperator(operator);
            globalSettingDto.setProcNum(1);
            globalSettingDto.setMessage(message);
            const catalogService: CatalogService = new CatalogService();
            const globalSetting = await catalogService.getGlobalSettinCatalog(globalSettingDto);
            if (globalSetting && globalSetting['template'] && globalSetting['template']['use_id_connect']) {
                // PXR-ID を uid としてIDサービスのアカウント削除 API を呼び出す
                const idService: IdService = new IdService();
                await idService.deleteAccount(pxrId);
            }
        });

        const ret = {
            mcdOutputCode: mcdOutputCode
        };
        return ret;
    }

    /**
     * Book強制削除
     */
    public async bookForceDelete (bookOpenDto: BookOpenDto): Promise<any> {
        // dtoから扱いやすいように値を取り出す
        const message = bookOpenDto.getMessage();
        const operator = bookOpenDto.getOperator();
        const pxrId = bookOpenDto.getPxrId();
        const configure = bookOpenDto.getConfigure();
        const isPhysicalDelete = bookOpenDto.getPhysicalDelete();

        // PXR-IDの存在確認 存在しなかったらエラー
        const checkPxrId = await EntityOperation.isPxrIdExists(pxrId);
        if (!checkPxrId) {
            throw new AppError(message.PXR_ID_NOT_EXISTS, ResponseCode.BAD_REQUEST);
        }

        // 関連データの削除
        const bookId = checkPxrId.id;
        const operatorUrl = configure['operatorUrl'];
        const connection = await connectDatabase();
        await connection.transaction(async trans => {
            // My-Condition-Bookテーブルのレコードを削除する
            await EntityOperation.deleteCondBookRecordPxrId(trans, pxrId, operator.getLoginId(), isPhysicalDelete);

            // 利用者ID連携テーブルのレコードを削除する
            await EntityOperation.deleteUserIdCooperateRecordBookId(trans, bookId, operator.getLoginId(), isPhysicalDelete);

            // 本人性確認書類テーブルの該当するレコードを削除する
            await EntityOperation.deleteIdentificationRecordBookId(trans, bookId, operator.getLoginId(), isPhysicalDelete);

            // データ操作定義を削除する
            const dataOpResult = await EntityOperation.deleteDataOperationRecordBookId(trans, bookId, operator.getLoginId(), isPhysicalDelete);
            for (let i = 0; i < dataOpResult.raw.length; i++) {
                await EntityOperation.deleteDataOperationDataTypeRecord(trans, dataOpResult.raw[i].id, operator.getLoginId(), isPhysicalDelete);
            }

            // オペレータを削除するためオペレータ情報を取得する
            const operatorDto = new OperatorAddDto();
            operatorDto.setLoginId(pxrId);
            operatorDto.setPxrId(pxrId);
            let url;
            if ((operatorUrl + '').indexOf('pxr-block-proxy') === -1) {
                url = operatorUrl + '/?type=' + OperatorType.TYPE_IND.toString() + '&pxrId=' + pxrId;
            } else {
                url = operatorUrl + encodeURIComponent('/?type=' + OperatorType.TYPE_IND.toString() + '&pxrId=' + pxrId);
            }
            operatorDto.setUrl(url);
            operatorDto.setOperator(operator);
            operatorDto.setMessage(message);
            const operatorService = new OperatorService();
            const operatorInfo = await operatorService.operatorDeleteInfo(operatorDto);
            // オペレータを削除する
            const operatorDelDto = new OperatorAddDto();
            operatorDelDto.setLoginId(pxrId);
            operatorDelDto.setPxrId(pxrId);
            const operatorBody = operatorInfo.body;
            if ((operatorUrl + '').indexOf('pxr-block-proxy') === -1) {
                url = urljoin(operatorUrl, operatorBody.operatorId.toString());
            } else {
                url = operatorUrl + encodeURIComponent('/' + operatorBody.operatorId.toString());
            }
            operatorDelDto.setUrl(url);
            operatorDelDto.setOperator(operator);
            operatorDelDto.setMessage(message);
            operatorDelDto.setProcMode(3);
            const deleteResponse = await operatorService.operatorDeleteInfo(operatorDelDto);

            try {
                // グローバル設定を取得し、IDサービスを使用する設定となっているか確認する
                const catalogService: CatalogService = new CatalogService();
                const globalSettingDto = new CatalogDto();
                globalSettingDto.setOperator(operator);
                globalSettingDto.setProcNum(1);
                globalSettingDto.setMessage(message);
                const globalSetting = await catalogService.getGlobalSettinCatalog(globalSettingDto);
                if (globalSetting && globalSetting['template'] && globalSetting['template']['use_id_connect']) {
                    // PXR-ID を uid としてIDサービスのアカウント削除 API を呼び出す
                    const idService: IdService = new IdService();
                    await idService.deleteAccount(pxrId);
                }
            } catch (err) {
                // オペレーター削除はロールバック対象外なので、別途オペレーター復元を行う
                const operatorCancelDelDto = new OperatorAddDto();
                const deletedOperator = deleteResponse.body;
                if ((operatorUrl + '').indexOf('pxr-block-proxy') === -1) {
                    url = operatorUrl + '/cancelDelete/' + deletedOperator['operatorId'] + '?register=' + deletedOperator['register'];
                } else {
                    url = operatorUrl + encodeURIComponent('/cancelDelete/' + deletedOperator['operatorId'] + '?register=' + deletedOperator['register']);
                }
                operatorCancelDelDto.setUrl(url);
                operatorCancelDelDto.setOperator(operator);
                operatorCancelDelDto.setMessage(message);
                await operatorService.operatorCancelDelete(operatorCancelDelDto);

                throw err;
            }
        });

        const ret = {
            result: 'success'
        };
        return ret;
    }

    /**
     * 本人性確認書類の種別：運転免許証のユーザー属性情報を設定します。
     * @param identification 本人性確認書類
     * @returns ユーザー属性情報
     */
    private setUserattributesDriversLicence (identification: any) {
        const userattributes = {};
        for (const itemGroup of identification['item-group']) {
            if (!itemGroup['item'] || !Array.isArray(itemGroup['item'])) {
                continue;
            }
            for (const item of itemGroup.item) {
                const typeValue = item.type._value;
                if (Number(typeValue) === this.FULL_NAME) {
                    userattributes['name'] = item.content;
                } else if (Number(typeValue) === this.BIRTHDAY_JAPANESE) {
                    userattributes['birthdate_jp'] = item.content;
                } else if (Number(typeValue) === this.ADDRESS) {
                    userattributes['address'] = item.content;
                }
            }
        }
        return userattributes;
    }

    /**
     * 本人性確認書類の種別：マイナンバーカードのユーザー属性情報を設定します。
     * @param identification 本人性確認書類
     * @returns ユーザー属性情報
     */
    private setUserattributesMyNumberCard (identification: any) {
        const userattributes = {};
        for (const itemGroup of identification['item-group']) {
            if (!itemGroup['item'] || !Array.isArray(itemGroup['item'])) {
                continue;
            }
            for (const item of itemGroup.item) {
                const typeValue = item.type._value;
                if (Number(typeValue) === this.FULL_NAME) {
                    userattributes['name'] = item.content;
                } else if (Number(typeValue) === this.GENDER) {
                    userattributes['gender'] = item.content;
                } else if (Number(typeValue) === this.BIRTHDAY_JAPANESE) {
                    userattributes['birthdate_jp'] = item.content;
                } else if (Number(typeValue) === this.ADDRESS) {
                    userattributes['address'] = item.content;
                }
            }
        }
        return userattributes;
    }

    /**
     * 本人性確認書類の種別：運転免許証のユーザー属性情報を設定します。
     * @param identification 本人性確認書類
     * @returns ユーザー属性情報
     */
    private setUserattributesResidenceCard (identification: any) {
        const userattributes = {};
        for (const itemGroup of identification['item-group']) {
            if (!itemGroup['item'] || !Array.isArray(itemGroup['item'])) {
                continue;
            }
            for (const item of itemGroup.item) {
                const typeValue = item.type._value;
                if (Number(typeValue) === this.FULL_NAME) {
                    userattributes['name'] = item.content;
                } else if (Number(typeValue) === this.GENDER) {
                    userattributes['gender'] = item.content;
                } else if (Number(typeValue) === this.BIRTHDAY) {
                    userattributes['birthdate'] = item.content;
                } else if (Number(typeValue) === this.ADDRESS) {
                    userattributes['address'] = item.content;
                }
            }
        }
        return userattributes;
    }
}
