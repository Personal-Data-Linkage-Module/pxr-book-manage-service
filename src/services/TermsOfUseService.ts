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

/* eslint-disable */
import AppError from '../common/AppError';
import TouConsent from '../repositories/postgres/TouConsent';
import { Service } from 'typedi';
import Config from '../common/Config';
import { connectDatabase } from '../common/Connection';
import EntityOperation from '../repositories/EntityOperation';
import TermsOfUseNotification from '../repositories/postgres/TermsOfUseNotification';
import TermsOfUseNotificationInd from '../repositories/postgres/TermsOfUseNotificationInd';
import GetTermsOfUseTargetResDto, { CodeObject } from '../resources/dto/GetTermsOfUseTargetResDto';
import CatalogService from './CatalogService';
import CatalogDto from './dto/CatalogDto';
import TermsOfUseServiceDto from './dto/TermsOfUseServiceDto';
import moment = require('moment');
import Operator from 'resources/dto/OperatorReqDto';
import OperatorDomain from 'domains/OperatorDomain';
import { ResponseCode } from '../common/ResponseCode';
const Message = Config.ReadConfig('./config/message.json');
const config = Config.ReadConfig('./config/config.json');
/* eslint-enable */
@Service()
export default class TermsOfUseService {
    readonly UNTREATED = 0;
    readonly NOT_AGREED = 0;
    readonly APP = 0;
    readonly REGION = 2;

    /**
     * 利用規約更新通知登録
     * @param dto
     */
    public async postTermsOfUseTargetUpdate (dto: TermsOfUseServiceDto) {
        const connection = await connectDatabase();
        await connection.transaction(async trans => {
            const termsOfUseNotification = new TermsOfUseNotification();
            termsOfUseNotification.termsType = dto.getTermsType();
            termsOfUseNotification._value = dto.getCatalogCode();
            termsOfUseNotification._ver = dto.getCatalogVersion();
            termsOfUseNotification.status = this.UNTREATED;
            termsOfUseNotification.createdBy = dto.getOperator().getLoginId();
            termsOfUseNotification.updatedBy = dto.getOperator().getLoginId();
            await EntityOperation.insertTermsOfUseNotification(trans, termsOfUseNotification);
        });

        return { result: 'success' };
    }

    /**
     * 利用規約更新通知個人登録
     * @param dto
     */
    public async getTermsOfUseTargetFind (dto: TermsOfUseServiceDto) {
        // 利用規約更新通知管理から未処理のデータを取得する
        const termsOfUseNotifications = await EntityOperation.getUntreatedTermsOfUseNotifications(dto.getTermsType());

        // 対象のカタログを特定
        const connection = await connectDatabase();
        await connection.transaction(async trans => {
            // データ操作定義通知をループで回す
            for (const termsOfUseNotification of termsOfUseNotifications) {
                // 対象のカタログの個人の同意を取得
                const touConsents = await EntityOperation.getTouConsentByCatalogCode(termsOfUseNotification._value, dto.getTermsType());
                const targetBookIds: number[] = [];
                for (const touConsent of touConsents) {
                    if (!targetBookIds.includes(touConsent.bookId)) {
                        targetBookIds.push(touConsent.bookId);
                    }
                }

                for (const targetBookId of targetBookIds) {
                    // 対象の個人だった場合、利用規約更新通知個人管理を作成
                    const termsOfUseNotificationInd = new TermsOfUseNotificationInd();
                    termsOfUseNotificationInd.termsOfUseNotificationId = termsOfUseNotification.id;
                    termsOfUseNotificationInd.bookId = targetBookId;
                    termsOfUseNotificationInd.status = this.NOT_AGREED;
                    termsOfUseNotificationInd.lastSentAt = null;
                    termsOfUseNotificationInd.isDisabled = false;
                    termsOfUseNotificationInd.createdBy = dto.getOperator().getLoginId();
                    termsOfUseNotificationInd.updatedBy = dto.getOperator().getLoginId();
                    await EntityOperation.insertTermsOfUseNotificationInd(trans, termsOfUseNotificationInd);
                    const typePlatform = 1;
                    if (dto.getTermsType() === typePlatform) {
                        await EntityOperation.updateBookStatusConsentRequest(trans, targetBookId, 1, dto.getOperator().getLoginId());
                    }
                }

                // 利用規約更新通知管理を処理済にアップデータとして完了
                await EntityOperation.updateTermsOfUseNotification(trans, termsOfUseNotification.id, dto.getOperator());
            }
        });
        return { result: 'success' };
    }

    /**
     * Region/PF利用規約更新通知個人取得
     * @param dto
     */
    public async getTermsOfUseTarget (dto: TermsOfUseServiceDto) {
        const catalogDto = new CatalogDto();
        catalogDto.setUrl(dto.getCatalogUrl());
        catalogDto.setOperator(dto.getOperator());
        catalogDto.setProcNum(0);
        catalogDto.setMessage(dto.getMessage());
        const catalogService = new CatalogService();

        // グローバル設定からRegion/PF利用規約通知間隔を取得する
        const globalSettingCatalog = await catalogService.getGlobalSettinCatalog(catalogDto);
        let amount;
        let unit;
        if (dto.getTermsType() === 1) {
            // PF
            amount = Number(globalSettingCatalog['template']['platform-tou_re-consent_notification_interval']['value']);
            unit = globalSettingCatalog['template']['platform-tou_re-consent_notification_interval']['type'];
        } else {
            // Region
            amount = Number(globalSettingCatalog['template']['region-tou_re-consent_notification_interval']['value']);
            unit = globalSettingCatalog['template']['region-tou_re-consent_notification_interval']['type'];
        }

        const notifications = await EntityOperation.getNotAgreedTermsOfUseNotificationTargets(dto.getOffset(), dto.getLimit(), amount, unit, dto.getTermsType());

        const ret: GetTermsOfUseTargetResDto[] = [];
        for (const notification of notifications) {
            let ele = ret.find(retEle =>
                retEle.pxrId === notification['pxrId']
            );
            if (ele) {
                const code = new CodeObject();
                code._value = Number(notification['_value']);
                code._ver = notification['_ver'] ? Number(notification['_ver']) : null;
                ele.termOfUse.push(code);
            } else {
                ele = new GetTermsOfUseTargetResDto();
                ele.pxrId = notification['pxrId'];
                const code = new CodeObject();
                code._value = Number(notification['_value']);
                code._ver = notification['_ver'] ? Number(notification['_ver']) : null;
                ele.termOfUse = [];
                ele.termOfUse.push(code);
                ret.push(ele);
            }
        }
        return ret;
    }

    /**
     * Region利用規約更新通知最終送信日時登録
     * @param dto
     */
    public async postTermsOfUseNotificationComplete (dto: TermsOfUseServiceDto) {
        const connection = await connectDatabase();
        await connection.transaction(async trans => {
            await EntityOperation.updateLastSentAtTermsOfUseNotificationInds(trans, dto.getPxrId(), dto.getTermsType(), dto.getOperator());
        });
        return { result: 'success' };
    }

    /**
     * 未同意規約取得
     * 個人が未同意の規約をを取得しレスポンスを生成する
     * @param operator
     * リファクタ履歴
     *  seprate : getTargetRegion（対象リージョンと利用規約カタログコード取得）
     *  seprate : setShareStoreData（共有、蓄積定義コード設定）
     *  seprate : setAppWfCode（app/wfコード設定処理）
     *  seprate : getActorCodes（アクターコード設定処理）
     *  seprate : getNotAgreedTermsOfUseCreateResponse（レスポンス生成処理）
     */
    public async getNotAgreedTermsOfUse (serviceDto: TermsOfUseServiceDto) {
        const pxrId = serviceDto.getPxrId();
        const operator = serviceDto.getOperatorDomain();

        // ext_nameを取得する
        const catalogDto = new CatalogDto();
        catalogDto.setOperatorDomain(operator);
        catalogDto.setMessage(Message);
        const catalogService = new CatalogService();
        const extName = await catalogService.getExtName(catalogDto);

        // 利用規約更新通知管理レコードを取得する
        const termsOfUseNotifications = await EntityOperation.getTermsOfUseNotificationsByPxrId(pxrId);

        // 対象リージョン、利用規約を取得する
        const { regionActorCodes, platformTou, regions }: { regionActorCodes: any[]; platformTou: any; regions: any[]; } = await this.getTargetRegion(termsOfUseNotifications, extName, operator);

        // 未同意のデータ操作定義通知テーブルを取得
        const dataOperationNotifications = await EntityOperation.getNotAgreedDataOperationNotificationByPxrId(pxrId);

        // store, shareの判別やアクターの特定を行うため、8で取得したデータ操作定義通知管理レコードのコード、バージョンを用いてカタログを取得する
        const dataOperationCatalogCodes: any[] = [];
        let dataOperationCatalogs: any[] = [];
        const appActorCodes: any[] = [];
        let appCatalogs: any[] = [];
        // アクターカタログからappコードを取得する
        ({ dataOperationCatalogs, appCatalogs } = await this.setAppWfCode(dataOperationNotifications, dataOperationCatalogCodes, catalogDto, dataOperationCatalogs, catalogService, appActorCodes, extName, appCatalogs, operator));

        // アクターのバージョンを取得するため、5, 10で取得したアクターコードを使用して、アクターカタログを取得する
        const actorCatalogs: any[] = await this.getActorCodes(regionActorCodes, appActorCodes, operator);

        // レスポンスの生成
        const response = this.getNotAgreedTermsOfUseCreateResponse(platformTou, regions, actorCatalogs, dataOperationCatalogs, appCatalogs);

        return response;
    }

    /**
     * レスポンス生成
     * @param platformTou
     * @param regions
     * @param actorCatalogs
     * @param dataOperationCatalogs
     * @param appCatalogs
     * @returns
     */
    private getNotAgreedTermsOfUseCreateResponse (platformTou: any, regions: any[], actorCatalogs: any[], dataOperationCatalogs: any[], appCatalogs: any[]) {
        let platform = null;
        const resRegion = [];
        const store: any[] = [];
        const share: any[] = [];

        // platform
        if (platformTou) {
            platform = {
                _code: {
                    _value: platformTou['catalogItem']['_code']['_value'],
                    _ver: platformTou['catalogItem']['_code']['_ver']
                },
                expireAt: platformTou['template']['period-of-re-consent']
            };
        }
        // region
        for (const region of regions) {
            const actorCatalog = actorCatalogs.find((ele: any) => Number(ele['catalogItem']['_code']['_value']) === Number(region['actor']['_value']));
            if (actorCatalog) {
                resRegion.push(
                    {
                        actor: {
                            _value: actorCatalog['catalogItem']['_code']['_value'],
                            _ver: actorCatalog['catalogItem']['_code']['_ver']
                        },
                        region: {
                            _value: region['region']['_value'],
                            _ver: region['region']['_ver']
                        },
                        _code: {
                            _value: region['_code']['_value'],
                            _ver: region['_code']['_ver']
                        },
                        expireAt: region['expireAt']
                    }
                );
            }
        }
        // store,share
        for (const dataOperationCatalog of dataOperationCatalogs) {
            const ns: string = dataOperationCatalog['catalogItem']['ns'];
            const actorCode = ns.slice(ns.lastIndexOf('_') + 1, ns.indexOf('/', ns.lastIndexOf('_')) < 0 ? ns.length - 1 : ns.indexOf('/', ns.lastIndexOf('_')));
            const actor = actorCatalogs.find((ele: any) => Number(ele['catalogItem']['_code']['_value']) === Number(actorCode));
            if (dataOperationCatalog['catalogItem']['ns'].endsWith('store')) {
                this.setShareStoreData(dataOperationCatalog, appCatalogs, store, actor, 'store');
            } else if (dataOperationCatalog['catalogItem']['ns'].endsWith('share')) {
                this.setShareStoreData(dataOperationCatalog, appCatalogs, share, actor, 'share');
            }
        }

        // レスポンスの生成
        const response = {
            termsOfUse: {
                platform: platform !== null ? platform : null,
                region: resRegion.length > 0 ? resRegion : null
            },
            store: store.length > 0 ? store : null,
            share: share.length > 0 ? share : null
        };
        return response;
    }

    /**
     * 共有、蓄積定義コード設定
     * @param dataOperationCatalog
     * @param appCatalogs
     * @param store
     * @param actor
     * @param shareOrStore
     * リファクタ履歴
     *  inner : checkAppWfCatalog（共通処理）
     */
    private setShareStoreData (dataOperationCatalog: any, appCatalogs: any[], store: any[], actor: any, shareOrStore: 'share' | 'store') {
        if (dataOperationCatalog['catalogItem']['ns'].includes('app')) {
            if (appCatalogs) {
                const appCatalog = checkAppWfCatalog(appCatalogs);
                if (appCatalog) {
                    store.push({
                        actor: {
                            _value: actor['catalogItem']['_code']['_value'],
                            _ver: actor['catalogItem']['_code']['_ver']
                        },
                        app: {
                            _value: appCatalog['catalogItem']['_code']['_value'],
                            _ver: appCatalog['catalogItem']['_code']['_ver']
                        },
                        _code: {
                            _value: dataOperationCatalog['catalogItem']['_code']['_value'],
                            _ver: dataOperationCatalog['catalogItem']['_code']['_ver']
                        }
                    });
                }
            }
        }
        // 対象共有
        function checkAppWfCatalog (catalogs: any[]) {
            let appWfCatalog: any = null;
            for (const ele of catalogs) {
                if (ele['template'][shareOrStore] && Array.isArray(ele['template'][shareOrStore])) {
                    const targetEles: any[] = ele['template'][shareOrStore];
                    for (const target of targetEles) {
                        if (Number(target['_value']) === Number(dataOperationCatalog['catalogItem']['_code']['_value'])) {
                            appWfCatalog = ele;
                        }
                    }
                }
            }
            return appWfCatalog;
        }
    }

    /**
     * アクターカタログコード、バージョン設定
     * @param regionActorCodes
     * @param appActorCodes
     * @param operator
     * @returns
     * リファクタ履歴
     *  inner : setActorCodes（アクターコード設定共通処理）
     */
    private async getActorCodes (regionActorCodes: number[], appActorCodes: number[], operator: OperatorDomain) {
        // アクターのバージョンを取得するため、5, 10で取得したアクターコードを使用して、アクターカタログを取得する
        const actorCodes: any[] = [];
        setActorCodes(regionActorCodes, actorCodes);
        setActorCodes(appActorCodes, actorCodes);
        let actorCatalogs: any[] = [];
        if (actorCodes.length > 0) {
            const catalogDto = new CatalogDto();
            catalogDto.setOperatorDomain(operator);
            catalogDto.setMessage(Message);
            catalogDto.setUrl(config['catalogUrl']);
            catalogDto.setRequest(actorCodes);
            const catalogService = new CatalogService();
            actorCatalogs = await catalogService.getCatalogInfos(catalogDto);
        }
        return actorCatalogs;
        // アクターコード設定
        function setActorCodes (regionAppWfActorCodes: {}[], targetActors: {}[]) {
            for (const regionAppWfActorCode of regionAppWfActorCodes) {
                if (targetActors.find(actorCode => actorCode['_code']['_value'] === Number(regionAppWfActorCode))) {
                    continue;
                }
                targetActors.push({
                    _code: {
                        _value: Number(regionAppWfActorCode),
                        _ver: null
                    }
                });
            }
        }
    }

    /**
     * app/wfコードを設定する
     * @param dataOperationNotifications
     * @param dataOperationCatalogCodes
     * @param catalogDto
     * @param dataOperationCatalogs
     * @param catalogService
     * @param appActorCodes
     * @param extName
     * @param appCatalogs
     * @param operator
     * @returns
     */
    private async setAppWfCode (dataOperationNotifications: any[], dataOperationCatalogCodes: any[], catalogDto: CatalogDto, dataOperationCatalogs: any[], catalogService: CatalogService, appActorCodes: any[], extName: any, appCatalogs: any[], operator: OperatorDomain) {
        for (const dataOperationNotification of dataOperationNotifications) {
            dataOperationCatalogCodes.push({
                _code: {
                    _value: Number(dataOperationNotification['_value']),
                    _ver: Number(dataOperationNotification['_ver'])
                }
            });
        }
        if (dataOperationCatalogCodes.length > 0) {
            catalogDto.setUrl(config['catalogUrl']);
            catalogDto.setRequest(dataOperationCatalogCodes);
            dataOperationCatalogs = await catalogService.getCatalogInfos(catalogDto);

            // 取得したカタログをループさせ、nsからアクターのコードを取得する
            for (const catalog of dataOperationCatalogs) {
                const ns: string = catalog['catalogItem']['ns'];
                if (ns.includes('app')) {
                    const actorCode = ns.slice(ns.lastIndexOf('_') + 1, ns.indexOf('/', ns.lastIndexOf('_')) < 0 ? ns.length + 1 : ns.indexOf('/', ns.lastIndexOf('_')));
                    appActorCodes.push(actorCode);
                } else if (ns.includes('wf')) {
                    // サポート対象外：WF
                    throw new AppError(Message.UNSUPPORTED_ACTOR, ResponseCode.BAD_REQUEST);
                }
            }

            // 取得したアクターコード分カタログサービスを呼出して、Regionの特定のためのカタログを取得する
            for (const actorCode of appActorCodes) {
                const ns = 'catalog/ext/' + extName + '/actor/app/actor_' + actorCode + '/application';
                appCatalogs = await CatalogService.getCatalog(ns, operator) as [];
            }
        }
        return { dataOperationCatalogs, appCatalogs };
    }

    /**
     * 対象リージョンと利用規約カタログコードを取得する
     * @param termsOfUseNotifications
     * @param extName
     * @param operator
     * @returns
     */
    private async getTargetRegion (termsOfUseNotifications: TermsOfUseNotification[], extName: any, operator: OperatorDomain) {
        // 同意期限やリージョンの特定を行うため、取得した利用規約更新通知管理レコードのコード、バージョンを用いて利用規約のカタログを取得する
        const touCatalogCodes: any[] = [];
        const regionTouCodes: any[] = [];
        let platformTou: any = null;
        const regions: any[] = [];
        const regionActorCodes: any[] = [];
        for (const termsOfUseNotification of termsOfUseNotifications) {
            touCatalogCodes.push({
                _code: {
                    _value: Number(termsOfUseNotification._value),
                    _ver: Number(termsOfUseNotification._ver)
                }
            });
            // 規約タイプが2:regionのカタログコードを退避
            if (termsOfUseNotification.termsType === 2) {
                regionTouCodes.push(Number(termsOfUseNotification._value));
            }
        }
        if (touCatalogCodes.length > 0) {
            const catalogDto = new CatalogDto();
            catalogDto.setOperatorDomain(operator);
            catalogDto.setMessage(Message);
            catalogDto.setUrl(config['catalogUrl']);
            catalogDto.setRequest(touCatalogCodes);
            const catalogService = new CatalogService();
            const touCatalogs = await catalogService.getCatalogInfos(catalogDto);

            // Region利用規約のカタログのnsからアクターのコードを取得する
            for (const catalog of touCatalogs) {
                if (regionTouCodes.includes(catalog['catalogItem']['_code']['_value'])) {
                    const ns: string = catalog['catalogItem']['ns'];
                    const actorCode = ns.slice(ns.lastIndexOf('_') + 1, ns.length);
                    regionActorCodes.push(actorCode);
                } else {
                    // platform利用規約を退避
                    platformTou = catalog;
                }
            }

            // 取得したRegionアクターコード分カタログサービスを呼出して、Region定義のカタログを取得する
            for (const actorCode of regionActorCodes) {
                const regionCatalogNs = 'catalog/ext/' + extName + '/actor/region-root/actor_' + actorCode + '/region';
                const regionCatalogs = await CatalogService.getCatalog(regionCatalogNs, operator) as [];

                // 取得したRegion定義カタログから、利用規約更新通知管理レコードのコード、バージョンが、template.terms-of-use に設定されているカタログを見つけ、
                // 利用規約カタログコードと紐づける
                for (const regionCatalog of regionCatalogs) {
                    const regionTouCatalog = touCatalogs.find((touCatalog: any) => regionCatalog['template']['terms-of-use'] &&
                        regionCatalog['template']['terms-of-use']['_value'] === touCatalog['catalogItem']['_code']['_value'] &&
                        regionCatalog['template']['terms-of-use']['_ver'] === touCatalog['catalogItem']['_code']['_ver']
                    );

                    if (regionTouCatalog) {
                        const regionTouCatalogNs: string = regionTouCatalog['catalogItem']['ns'];
                        regions.push({
                            actor: {
                                _value: regionTouCatalogNs.slice(regionTouCatalogNs.lastIndexOf('_') + 1, regionTouCatalogNs.length),
                                _ver: null
                            },
                            region: {
                                _value: regionCatalog['catalogItem']['_code']['_value'],
                                _ver: regionCatalog['catalogItem']['_code']['_ver']
                            },
                            _code: {
                                _value: regionCatalog['template']['terms-of-use']['_value'],
                                _ver: regionCatalog['template']['terms-of-use']['_ver']
                            },
                            expireAt: regionTouCatalog['template']['period-of-re-consent']
                        });
                    }
                }
            }
        }
        return { regionActorCodes, platformTou, regions };
    }

    /**
     * 利用規約同意
     * @param serviceDto
     * リファクタ履歴
     *  seprate : getTermsOfUse（同意対象利用規約取得）
     *  seprate : checkCoopRegion（リージョン利用者連携存在チェック）
     *  seprate : agreementTermsOfUse（利用規約同意処理）
     */
    public async termOfUseAgreement (serviceDto: TermsOfUseServiceDto) {
        // 同意対象の利用規約を取得
        const operator = serviceDto.getOperatorDomain();
        const code = serviceDto.getCatalogCode();
        const ver = serviceDto.getCatalogVersion();
        const termsType = serviceDto.getTermsType();
        let { targetTermsOfUse, termsOfUseCatalog } = await this.getTermsOfUse(serviceDto, operator, code, ver, termsType);

        // リージョンの場合、対象リージョンと連携しているか確認する
        targetTermsOfUse = await this.checkCoopRegion(targetTermsOfUse, termsType, operator, termsOfUseCatalog, code, ver);

        // 利用規約同意処理
        await this.agreementTermsOfUse(targetTermsOfUse, termsType, operator, code, ver);
        return { result: 'success' };
    }

    /**
     * リージョン利用者連携存在チェック
     * @param targetTermsOfUse
     * @param termsType
     * @param operator
     * @param termsOfUseCatalog
     * @param code
     * @param ver
     * @returns
     */
    private async checkCoopRegion (targetTermsOfUse: any, termsType: number, operator: OperatorDomain, termsOfUseCatalog: any, code: number, ver: number) {
        const typeRegion = 2;
        let isUpdate = true;
        if (!targetTermsOfUse && termsType === typeRegion) {
            // ext_nameを取得する
            const catalogService = new CatalogService();
            const regionCatalogDto = new CatalogDto();
            regionCatalogDto.setMessage(Message);
            regionCatalogDto.setOperatorDomain(operator);
            const extName = await catalogService.getExtName(regionCatalogDto);

            // 該当の利用規約を持つRegionを取得する
            // Regionカタログを取得する
            regionCatalogDto.setUrl(config['catalogUrl']);
            const ns: string = termsOfUseCatalog['catalogItem']['ns'];
            const actorCode = ns.slice(ns.lastIndexOf('_') + 1, ns.length);
            regionCatalogDto.setNs('catalog/ext/' + extName + '/actor/region-root/actor_' + actorCode + '/region');
            regionCatalogDto.setProcNum(1);
            const regionCatalogs = await catalogService.getCatalogInfo(regionCatalogDto);

            // 取得したRegionから該当の利用規約を持つRegionを見つける
            let regionCode;
            for (const regionCatalog of regionCatalogs) {
                if (regionCatalog['template']['terms-of-use'] &&
                    Number(regionCatalog['template']['terms-of-use']['_value']) === Number(code) &&
                    Number(regionCatalog['template']['terms-of-use']['_ver']) === Number(ver)) {
                    regionCode = Number(regionCatalog['catalogItem']['_code']['_value']);
                    break;
                }
            }

            // そのRegionと連携申請中または連携中か確認
            if (regionCode) {
                const coops = await EntityOperation.getUserIdCooperateByPxrId(operator.pxrId);
                for (const coop of coops) {
                    if (Number(coop.regionCatalogCode) === regionCode && (coop.status === 0 || coop.status === 1)) {
                        const book = await EntityOperation.isPxrIdExists(operator.pxrId);
                        targetTermsOfUse = {
                            bookId: book.id,
                            code: code,
                            ver: ver
                        };
                    }
                }
            }

            // 連携もしていない場合、Region規約の新規登録でもないためエラー
            if (!targetTermsOfUse) {
                throw new AppError(Message.TARGET_NO_DATA, 400);
            }

            isUpdate = false;
        }

        // 更新の場合、期限を確認する
        if (isUpdate) {
            const periodReOfConsent = new Date(termsOfUseCatalog['template']['period-of-re-consent']);
            const currentDate = new Date();
            if (currentDate > periodReOfConsent) {
                throw new AppError(Message.EXPIRE_TERMS_CONSENT, 400);
            }
        }

        return targetTermsOfUse;
    }

    /**
     * 利用規約同意処理
     * @param targetTermsOfUse
     * @param termsType
     * @param operator
     * @param code
     * @param ver
     */
    private async agreementTermsOfUse (targetTermsOfUse: any, termsType: number, operator: OperatorDomain, code: number, ver: number) {
        const typePlatform = 1;
        const connection = await connectDatabase();
        await connection.transaction(async (trans) => {
            // 利用規約同意テーブルにレコード追加
            const entity = new TouConsent();
            entity.bookId = targetTermsOfUse.bookId;
            entity.termsType = termsType;
            entity.termsOfUseCode = Number(targetTermsOfUse.code);
            entity.termsOfUseVersion = Number(targetTermsOfUse.ver);
            await EntityOperation.insertTouConsentRecord(trans, entity, operator.loginId);
            // 指定バージョン以前の更新利用規約更新通知個人管理テーブル.ステータス = 1(同意済)に更新
            const touNotificationIndIds = await EntityOperation.getLessThanTouNotificationIndIds(code, ver, operator, termsType);
            if (touNotificationIndIds.length > 0) {
                await EntityOperation.updateTermsOfUseNotificationInds(trans, touNotificationIndIds, operator.loginId);
            }
            if (termsType === typePlatform) {
                const count = await EntityOperation.getCountMoreThanVersionTermsOfUse(Number(targetTermsOfUse.code), Number(targetTermsOfUse.ver));
                // バージョンの大きい利用規約がなければ、Bookのステータスを正常に戻す
                if (count === 0) {
                    await EntityOperation.updateBookStatusConsentRequest(trans, targetTermsOfUse.bookId, 0, operator.loginId);
                }
            }
        });
    }

    /**
     * 同意対象利用規約取得
     * @param serviceDto
     * @param operator
     * @param code
     * @param ver
     * @param termsType
     * @returns
     */
    private async getTermsOfUse (serviceDto: TermsOfUseServiceDto, operator: OperatorDomain, code: number, ver: number, termsType: number) {
        const typePlatform = 1;
        const targetTermsOfUse = await EntityOperation.getTargetTermsOfUseCode(code, ver, operator, termsType);

        // 更新対象がなく対象がPlatformの場合、エラーとする
        if (!targetTermsOfUse && termsType === typePlatform) {
            throw new AppError(Message.TARGET_NO_DATA, 400);
        }

        const catalogDto = new CatalogDto();
        catalogDto.setUrl(config['catalogUrl']);
        catalogDto.setMessage(Message);
        catalogDto.setOperatorDomain(operator);
        catalogDto.setCode(Number(code));
        catalogDto.setVersion(Number(ver));
        catalogDto.setProcNum(0);
        const catalogService = new CatalogService();
        const termsOfUseCatalog = await catalogService.getCatalogInfo(catalogDto);
        return { targetTermsOfUse, termsOfUseCatalog };
    }

    /**
     * Region利用規約未同意個人取得
     * @param dto
     */
    public async getDeletionTargetRegion (dto: TermsOfUseServiceDto) {
        const operator = dto.getOperator();
        const now: Date = new Date();
        let offset = dto.getOffset();
        const deletionTargets: any[] = [];
        while (deletionTargets.length < dto.getLimit()) {
            // 規約に未同意の個人を取得
            const targets = await EntityOperation.getNotAgreedTouBookRecord(dto.getTermsType(), offset, dto.getLimit());
            if (!targets || targets.length < 1) {
                break;
            }

            for (const target of targets) {
                // 利用規約のカタログを取得
                const catalogDto = new CatalogDto();
                catalogDto.setUrl(config['catalogUrl']);
                catalogDto.setOperator(operator);
                catalogDto.setMessage(Message);
                catalogDto.setCode(target['_value']);
                catalogDto.setVersion(target['_ver']);
                catalogDto.setProcNum(0);
                const touCatalog = await new CatalogService().getCatalogInfo(catalogDto);
                // 利用規約の同意期限が現在日時より過去日の場合、返却対象とする
                if (moment(now).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ') > moment(touCatalog['template']['period-of-re-consent']).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ')) {
                    const deletionTarget = {};
                    deletionTarget['bookId'] = Number(target['bookId']);
                    deletionTarget['pxrId'] = target['pxrId'];
                    deletionTarget['cooperation_release'] = false;
                    let isTargetRegion = true;

                    // Regionのカタログを取得
                    const extName = await new CatalogService().getExtName(catalogDto);
                    const ns = touCatalog['catalogItem']['ns'];
                    const actorCode = ns.slice(ns.lastIndexOf('_') + 1, ns.length);
                    catalogDto.setNs('catalog/ext/' + extName + '/actor/region-root/actor_' + actorCode + '/region');
                    catalogDto.setProcNum(1);
                    // 利用規約のカタログコード、カタログバージョンが一致するRegionのカタログコード、バージョンを設定
                    const regionCatalogs = await new CatalogService().getCatalogInfo(catalogDto);
                    for (const regionCatalog of regionCatalogs) {
                        if (regionCatalog['template']['terms-of-use'] &&
                            Number(regionCatalog['template']['terms-of-use']['_value']) === Number(touCatalog['catalogItem']['_code']['_value'])) {
                            // Regionのアクターカタログを取得
                            catalogDto.setCode(actorCode);
                            catalogDto.setVersion(null);
                            catalogDto.setProcNum(0);
                            const actorCatalog = await new CatalogService().getCatalogInfo(catalogDto);

                            // 利用者ID連携データを取得し、レスポンスに返却データの利用者ID連携解除フラグを設定
                            const cooperateData = await EntityOperation.getCooperatedRecordByBookIdAndActor(target['bookId'], actorCatalog['catalogItem']['_code']['_value'], regionCatalog['catalogItem']['_code']['_value'], this.REGION);
                            if (cooperateData) {
                                if (cooperateData.status === 3 && moment(now).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ') > moment(touCatalog['template']['period-of-release']).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ')) {
                                    deletionTarget['cooperation_release'] = true;
                                }
                                deletionTarget['actor'] = {
                                    _value: Number(actorCatalog['catalogItem']['_code']['_value']),
                                    _ver: Number(actorCatalog['catalogItem']['_code']['_ver'])
                                };
                                deletionTarget['region'] = {
                                    _value: Number(regionCatalog['catalogItem']['_code']['_value']),
                                    _ver: Number(regionCatalog['catalogItem']['_code']['_ver'])
                                };
                            } else {
                                // 利用者ID連携データが存在しない場合処理対象外
                                isTargetRegion = false;
                                break;
                            }

                            // Region カタログ内の app-alliance/wf-alliance から返却対象のapp/wfを取得し、必要ならばレスポンスに追加する
                            const appCodes = await this.checkAndAddAppWfAllianceCodes(operator, target, touCatalog, actorCatalog, regionCatalog, this.APP);
                            deletionTarget['app'] = appCodes['codes'];
                            if (appCodes['cooperation_release']) {
                                deletionTarget['cooperation_release'] = true;
                            }
                        }
                    }
                    // 処理対象外でなければレスポンスに追加
                    if (isTargetRegion && deletionTarget['actor'] && deletionTarget['region']) {
                        deletionTargets.push(deletionTarget);
                    }
                }
                offset++;
                // 返却対象が指定された件数になったら返却対象の値を返却する
                if (deletionTargets.length === dto.getLimit()) {
                    break;
                }
            }
        }
        // レスポンスの生成
        const ret: {} = {
            offset: offset,
            targets: deletionTargets.length > 0 ? deletionTargets : null
        };
        return ret;
    }

    /**
     * PF利用規約未同意個人取得
     * @param dto
     */
    public async getDeletionTargetPlatform (dto: TermsOfUseServiceDto) {
        const operator = dto.getOperator();
        const now: Date = new Date();
        let offset = dto.getOffset();
        const deletionTargets: any[] = [];
        while (deletionTargets.length < dto.getLimit()) {
            // 規約に未同意の個人を取得
            const targets = await EntityOperation.getNotAgreedTouBookRecord(dto.getTermsType(), offset, dto.getLimit());
            if (!targets || targets.length < 1) {
                break;
            }

            for (const target of targets) {
                // 利用規約のカタログを取得
                const catalogDto = new CatalogDto();
                catalogDto.setUrl(config['catalogUrl']);
                catalogDto.setOperator(operator);
                catalogDto.setMessage(Message);
                catalogDto.setCode(target['_value']);
                catalogDto.setVersion(target['_ver']);
                catalogDto.setProcNum(0);
                const touCatalog = await new CatalogService().getCatalogInfo(catalogDto);
                // 利用規約の同意期限が現在日時より過去日の場合、返却対象とする
                if (moment(now).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ') > moment(touCatalog['template']['period-of-re-consent']).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ')) {
                    const deletionTarget = {};
                    deletionTarget['bookId'] = Number(target['bookId']);
                    deletionTarget['pxrId'] = target['pxrId'];

                    deletionTargets.push(deletionTarget);
                }
                offset++;
                // 返却対象が指定された件数になったら返却対象の値を返却する
                if (deletionTargets.length === dto.getLimit()) {
                    break;
                }
            }
        }
        // レスポンスの生成
        const ret: {} = {
            offset: offset,
            targets: deletionTargets.length > 0 ? deletionTargets : null
        };
        return ret;
    }

    /**
     * app/wf-allianceのカタログコードが処理対象かどうかチェックする
     * リファクタ履歴
     *  seprate : checkCoopTermsOfUse（利用者連携情報のステータスと同意期限チェック）
     */
    private async checkAndAddAppWfAllianceCodes (operator: Operator, target: any, touCatalog: any, actorCatalog: any, regionCatalog: any, appWf: number): Promise<{}> {
        const now = new Date();
        const appWfAlliance = regionCatalog['template']['app-alliance'];
        if (regionCatalog['template']['wf-alliance']) {
            // サポート対象外：WF
            throw new AppError(Message.UNSUPPORTED_ACTOR, ResponseCode.BAD_REQUEST);
        }
        const res = {};
        res['cooperation_release'] = false;
        const codes = [];
        if (appWfAlliance && appWfAlliance.length > 0) {
            for (const code of appWfAlliance) {
                // 取得した APP/WF カタログコードで APP/WF カタログを取得し、region-alliance を取得する
                const catalogDto = new CatalogDto();
                catalogDto.setUrl(config['catalogUrl']);
                catalogDto.setOperator(operator);
                catalogDto.setMessage(Message);
                catalogDto.setCode(code['_value']);
                catalogDto.setVersion(null);
                catalogDto.setProcNum(0);
                const appWfCatalog = await new CatalogService().getCatalogInfo(catalogDto);
                if (appWfCatalog) {
                    let isTargert = true;
                    // リージョンカタログコードに、取得した Region カタログ以外の Region カタログコードが存在する場合
                    isTargert = await this.checkCoopTermsOfUse(appWfCatalog, regionCatalog, target, actorCatalog, catalogDto, now, isTargert);
                    if (isTargert) {
                        codes.push({
                            _value: Number(appWfCatalog['catalogItem']['_code']['_value']),
                            _ver: Number(appWfCatalog['catalogItem']['_code']['_ver'])
                        });
                        // 利用者ID連携データを取得
                        // ステータスが無効の場合、利用者ID連携解除フラグをONに設定
                        const cooperateData = await EntityOperation.getCooperatedRecordByBookIdAndActor(target['bookId'], Number(actorCatalog['catalogItem']['_code']['_value']), Number(appWfCatalog['catalogItem']['_code']['_value']), appWf);
                        if (cooperateData && cooperateData.status === 3 &&
                            (moment(now).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ') > moment(touCatalog['template']['period-of-release']).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ'))) {
                            res['cooperation_release'] = true;
                        }
                    }
                }
            }
        }
        res['codes'] = codes;
        return res;
    }

    /**
     * 利用者連携情報のステータスと同意期限チェックを行う
     * @param appWfCatalog
     * @param regionCatalog
     * @param target
     * @param actorCatalog
     * @param catalogDto
     * @param now
     * @param isTargert
     * @returns
     */
    private async checkCoopTermsOfUse (appWfCatalog: any, regionCatalog: any, target: any, actorCatalog: any, catalogDto: CatalogDto, now: Date, isTargert: boolean) {
        for (const regionAlliance of appWfCatalog.template['region-alliance']) {
            if (Number(regionAlliance._value) !== Number(regionCatalog['catalogItem']['_code']['_value'])) {
                // 利用者ID連携を取得
                const cooperateData = await EntityOperation.getCooperatedRecordByBookIdAndActor(target['bookId'], Number(actorCatalog['catalogItem']['_code']['_value']), Number(regionAlliance._value), this.REGION);
                if (cooperateData) {
                    if (cooperateData.status === 3) {
                        // レコードが取得できた場合 かつ 取得した利用者ID連携データ.ステータスが無効の場合
                        // Region利用規約のカタログコード、バージョンを取得する
                        catalogDto.setCode(regionAlliance._value);
                        catalogDto.setVersion(regionAlliance._ver);
                        catalogDto.setProcNum(0);
                        const regionAllianceCatalog = await new CatalogService().getCatalogInfo(catalogDto);
                        const termsOfuseCodeVer = await EntityOperation.getRegionTermsOfUseCodeVer(target['bookId'], target['pxrId'], Number(regionAllianceCatalog['template']['terms-of-use']['_value']));

                        // 利用規約のカタログを取得する
                        catalogDto.setCode(termsOfuseCodeVer._value);
                        catalogDto.setVersion(termsOfuseCodeVer._ver);
                        catalogDto.setProcNum(0);
                        const termsOfUseCatalog = await new CatalogService().getCatalogInfo(catalogDto);

                        // 取得した利用規約のカタログの利用者連携解除期限が現在日時より未来の場合処理対象外とする
                        if (moment(now).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ') < moment(termsOfUseCatalog['template']['period-of-release']).tz(config['timezone']).format('YYYY-MM-DDTHH:mm:ss.SSSZZ')) {
                            isTargert = false;
                        }
                    } else {
                        // ステータスが無効以外の場合処理対象外
                        isTargert = false;
                    }
                }
            }
        }
        return isTargert;
    }
}
