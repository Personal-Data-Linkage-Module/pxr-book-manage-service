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
import { Service } from 'typedi';
/* eslint-disable */
import BookServiceDto from './dto/BookServiceDto';
import UserIdCooperate from '../repositories/postgres/UserIdCooperate';
import EntityOperation from '../repositories/EntityOperation';
import BookOperateService from './BookOperateService';
import BookOperateServiceDto from './dto/BookOperateServiceDto';
import PostGetBookResDto from '../resources/dto/PostGetBookResDto';
import Config from '../common/Config';
import CatalogDto from './dto/CatalogDto';
import CatalogService from './CatalogService';
import AppError from '../common/AppError';
import { ResponseCode } from '../common/ResponseCode';
import TouConsent from '../repositories/postgres/TouConsent';
import { OperatorType } from 'common/Operator';
import MyConditionBook from '../repositories/postgres/MyConditionBook';
import Identification from 'repositories/postgres/Identification';
import OperatorDomain from 'domains/OperatorDomain';
const Message = Config.ReadConfig('./config/message.json');
const Configure = Config.ReadConfig('./config/config.json');
/* eslint-enable */

@Service()
export default class BookService {
    /**
     * Book参照
     * リファクタ履歴
     *  separate : getBlockCode（ブロックコード取得処理を分離
     */
    public async getBook (dto: BookServiceDto): Promise<any> {
        // 検索条件リストを取得
        const condition = dto.getCondition();

        // 本リクエストをBook運用のBook参照用に変換
        const bookDto = new BookOperateServiceDto();
        bookDto.setOperator(dto.getOperator());
        bookDto.setType(dto.getType());
        bookDto.setIdentifier(dto.getIdentifier());
        bookDto.setUpdatedAt(dto.getUpdatedAt());

        let resultList: {}[] = [];
        if (!condition || condition.length <= 0) {
            // PXRIDを基にユーザIDを取得
            const userList: UserIdCooperate[] = await EntityOperation.getUserIdByPxrId(dto.getPxrId(), null, null, null);
            for (let index = 0; index < userList.length; index++) {
                const userInfo = userList[index];

                // 検索条件リストの初期化
                bookDto.setUserId(userInfo.getUserId());

                // Blockコードを取得
                const blockCode: number = await this.getBlockCode(userInfo.getActorCatalogCode(), dto);

                // Book運用のBook参照と連携
                const result = await BookOperateService.doLinkingGetBook(blockCode, bookDto.getAsJson(), dto.getOperator());
                resultList = resultList.concat(result);
            }
        } else {
            for (let index = 0; index < condition.length; index++) {
                // PXRIDを基にユーザIDを取得
                const userList: UserIdCooperate[] = await EntityOperation.getUserIdByPxrId(
                    dto.getPxrId(),
                    condition[index].actor._value,
                    condition[index].app ? condition[index].app._value : null,
                    null
                );
                if (!userList || userList.length <= 0) {
                    continue;
                }
                const userInfo = userList[0];

                // 検索条件リストの初期化
                bookDto.setUserId(userInfo.getUserId());
                bookDto.setCode(condition[index]._code);
                bookDto.setApp(condition[index].app);
                bookDto.setWf(null);

                // Blockコードを取得
                const blockCode: number = await this.getBlockCode(condition[index].actor._value, dto);

                // Book運用のBook参照と連携
                const result = await BookOperateService.doLinkingGetBook(blockCode, bookDto.getAsJson(), dto.getOperator());
                resultList = resultList.concat(result);
            }
        }
        // 対象データが存在しない場合
        if (resultList.length <= 0) {
            throw new AppError(Message.TARGET_NO_DATA, ResponseCode.NO_CONTENT);
        }

        // レスポンスを生成
        const response: PostGetBookResDto = new PostGetBookResDto();
        response.setFromJson(resultList);

        // レスポンスを返す
        return response.getAsJson();
    }

    /**
     * ブロックコード取得
     * @param actorCode
     * @param dto
     * @returns
     */
    private async getBlockCode (actorCode: number, dto: BookServiceDto) {
        // アクターカタログを取得
        const actorCatalogDto = new CatalogDto();
        actorCatalogDto.setUrl(Configure['catalogUrl']);
        actorCatalogDto.setCode(actorCode);
        actorCatalogDto.setOperatorDomain(dto.getOperator());
        actorCatalogDto.setProcNum(0);
        actorCatalogDto.setMessage(Message);

        // カタログサービスから対象カタログを取得
        const catalogService: CatalogService = new CatalogService();
        const actorCatalog = await catalogService.getCatalogInfo(actorCatalogDto);

        // アクターコードを取得
        const blockCode: number = actorCatalog['template']['main-block'] ? actorCatalog['template']['main-block']['_value'] : null;
        return blockCode;
    }

    /**
     * BOOKを取得しレスポンスを生成する
     * @param operator
     * リファクタ履歴
     *  separate : getTouConsent（利用規約取得処理を分離）
     *  separate : createGetIndResponse（レスポンス生成処理を分離）
     */
    public async getIndBook (serviceDto: BookServiceDto) {
        const operator = serviceDto.getOperator();
        const pxrId = operator.pxrId;

        // 本人性確認書類レコードを取得
        const identificationList = await EntityOperation.getIdentityRecord(pxrId);

        // 利用者ID連携レコードを取得
        const userIdCooperateList = await EntityOperation.getUserIdCooperateByPxrId(pxrId);

        // 利用規約同意レコードを取得
        const touConsentList = await EntityOperation.getTouConsentByPxrId(pxrId);

        const { platformTouConsent, regionTouConsents }: { platformTouConsent: TouConsent, regionTouConsents: any[] } = await this.getTouConsent(touConsentList, operator);

        // レスポンスの生成
        const response: {} = await this.createGetIndResponse(pxrId, identificationList, userIdCooperateList, regionTouConsents, platformTouConsent);
        return response;
    }

    /**
     * 利用規約取得
     * @param touConsentList
     * @param operator
     * @returns
     */
    private async getTouConsent (touConsentList: TouConsent[], operator: OperatorDomain) {
        let platformTouConsent: TouConsent = null;
        const regionTouConsents: {
            touConsent: TouConsent,
            actor?: {
                _value: number,
                _ver: number
            },
            region?: {
                _value: number,
                _ver: number
            }
        }[] = [];
        touConsentList.forEach(touConsent => {
            // プラットフォーム規約
            if (touConsent.termsType === 1) {
                if (!platformTouConsent) {
                    platformTouConsent = touConsent;
                } else if (Number(platformTouConsent.termsOfUseCode) === Number(touConsent.termsOfUseCode) &&
                    Number(platformTouConsent.termsOfUseVersion) < Number(touConsent.termsOfUseVersion)) {
                    platformTouConsent = touConsent;
                }
                // リージョン規約
            } else if (touConsent.termsType === 2) {
                const tempRegionTouConsent = regionTouConsents.find(ele => Number(ele.touConsent.termsOfUseCode) === Number(touConsent.termsOfUseCode));
                if (!tempRegionTouConsent) {
                    const ele = {
                        touConsent: touConsent
                    };
                    regionTouConsents.push(ele);
                } else if (Number(tempRegionTouConsent.touConsent.termsOfUseVersion) < Number(touConsent.termsOfUseVersion)) {
                    tempRegionTouConsent.touConsent.termsOfUseVersion = touConsent.termsOfUseVersion;
                }
            }
        });

        if (regionTouConsents.length > 0) {
            // ext-nameの取得
            const catalogDto = new CatalogDto();
            catalogDto.setOperatorDomain(operator);
            catalogDto.setMessage(Message);
            const catalogService = new CatalogService();
            const extName = await catalogService.getExtName(catalogDto);

            // カタログの取得
            const codes = [];
            for (const regionTouConsent of regionTouConsents) {
                codes.push({
                    _code: {
                        _value: regionTouConsent.touConsent.termsOfUseCode,
                        _ver: regionTouConsent.touConsent.termsOfUseVersion
                    }
                });
            }
            catalogDto.setUrl(Configure['catalogUrl']);
            catalogDto.setRequest(codes);
            const catalogs = await catalogService.getCatalogInfos(catalogDto);
            const actorCodeList = [];
            for (const catalog of catalogs) {
                const ns: string = catalog['catalogItem']['ns'];
                const actorCode = ns.slice(ns.lastIndexOf('_') + 1, ns.length);
                actorCodeList.push(actorCode);
            }
            // アクターカタログ、リージョンカタログの取得
            for (const actorCode of actorCodeList) {
                const actorCatalog = await CatalogService.getActorCatalog(Number(actorCode), operator);

                const ns = 'catalog/ext/' + extName + '/actor/region-root/actor_' + actorCode + '/region';
                const regionCatalogs = await CatalogService.getCatalog(ns, operator) as [];

                for (const regionTouConsent of regionTouConsents) {
                    if (regionTouConsent.actor && regionTouConsent.region) {
                        continue;
                    }
                    for (const regionCatalog of regionCatalogs) {
                        if (regionCatalog['template']['terms-of-use'] &&
                            Number(regionCatalog['template']['terms-of-use']['_value']) === Number(regionTouConsent.touConsent.termsOfUseCode)) {
                            regionTouConsent.actor = {
                                _value: Number(actorCatalog['catalogItem']['_code']['_value']),
                                _ver: Number(actorCatalog['catalogItem']['_code']['_ver'])
                            };
                            regionTouConsent.region = {
                                _value: Number(regionCatalog['catalogItem']['_code']['_value']),
                                _ver: Number(regionCatalog['catalogItem']['_code']['_ver'])
                            };
                        }
                    }
                }
            }
        }
        return { platformTouConsent, regionTouConsents };
    }

    /**
     * Book取得（個人）レスポンス生成
     * @param pxrId
     * @param identificationList
     * @param userIdCooperateList
     * @param regionTouConsents
     * @param platformTouConsent
     * @returns
     */
    private async createGetIndResponse (pxrId: string, identificationList: Identification[], userIdCooperateList: UserIdCooperate[], regionTouConsents: {
        touConsent: TouConsent; actor?: {
            _value: number;
            _ver: number;
        }; region?: {
            _value: number;
            _ver: number;
        };
    }[], platformTouConsent: TouConsent) {
        let response: {};
        // ブックステータスの取得
        const book = await EntityOperation.isPxrIdExists(pxrId);
        // ブックが取得できない場合エラー
        if (!book) {
            throw new AppError(Message.NOT_EXIST_BOOK, ResponseCode.UNAUTHORIZED);
        }
        if (book.status === 0) {
            const identifications = [];
            for (const identification of identificationList) {
                identifications.push(JSON.parse(identification.template));
            }
            const cooperations = [];
            for (const userIdCooperate of userIdCooperateList) {
                cooperations.push(
                    {
                        actor: {
                            _value: userIdCooperate.actorCatalogCode,
                            _ver: userIdCooperate.actorCatalogVersion
                        },
                        region: userIdCooperate.regionCatalogCode ? {
                            _value: userIdCooperate.regionCatalogCode,
                            _ver: userIdCooperate.regionCatalogVersion
                        } : undefined,
                        app: userIdCooperate.appCatalogCode ? {
                            _value: userIdCooperate.appCatalogCode,
                            _ver: userIdCooperate.appCatalogVersion
                        } : undefined,
                        wf: undefined,
                        userId: userIdCooperate.userId,
                        status: userIdCooperate.status
                    }
                );
            }

            const resRegion: {
                actor: {
                    _value: number;
                    _ver: number;
                };
                region: {
                    _value: number;
                    _ver: number;
                };
                _code: {
                    _value: number;
                    _ver: number;
                };
            }[] = [];
            for (const regionTouConsent of regionTouConsents) {
                if (regionTouConsent.actor && regionTouConsent.region) {
                    resRegion.push({
                        actor: {
                            _value: regionTouConsent.actor._value,
                            _ver: regionTouConsent.actor._ver
                        },
                        region: {
                            _value: regionTouConsent.region._value,
                            _ver: regionTouConsent.region._ver
                        },
                        _code: {
                            _value: regionTouConsent.touConsent.termsOfUseCode,
                            _ver: regionTouConsent.touConsent.termsOfUseVersion
                        }
                    });
                }
            }

            response = {
                status: book.status,
                identification: identifications,
                cooperation: cooperations,
                termsOfUse: {
                    platform: platformTouConsent ? {
                        _value: platformTouConsent.termsOfUseCode,
                        _ver: platformTouConsent.termsOfUseVersion
                    } : {},
                    region: resRegion
                },
                appendix: book.appendix ? JSON.parse(book.appendix) : null
            };
        } else {
            response = {
                status: book.status
            };
        }
        return response;
    }

    public async updateIndAppendix (dto: BookServiceDto): Promise<any> {
        const operator = dto.getOperator();
        if (!operator.pxrId) {
            throw new AppError(Message.EMPTY_PXR_ID, ResponseCode.BAD_REQUEST);
        }

        await EntityOperation.updateAppendix(operator, JSON.stringify(dto.getAppendix()));

        return { result: 'success' };
    }

    /**
     * 削除可能Book取得
     */
    public async getDeleteTargetBook (serviceDto: BookServiceDto) {
        const actorCatalog = await CatalogService.getActorCatalog(Number(serviceDto.getOperator().actorCode), serviceDto.getOperator());
        if (!/^catalog\/ext\/.*\/actor\/pxr-root$/.test(actorCatalog['catalogItem']['ns'])) {
            throw new AppError(Message.NOT_PXR_ROOT_CATALOG, 400);
        }
        const catalogDto = new CatalogDto();
        catalogDto.setOperatorDomain(serviceDto.getOperator());
        const globalSetting = await new CatalogService().getGlobalSettinCatalog(catalogDto);
        const amount = Number(globalSetting['template']['book_deletion_pending_term']['value']);
        const unit = globalSetting['template']['book_deletion_pending_term']['type'];
        const targets = await EntityOperation.getDeleteTargetBook(amount, unit, serviceDto.getOffset(), serviceDto.getLimit(), false);

        // レスポンス作成
        const response = [];
        for (const target of targets) {
            response.push({ pxrId: target['pxrId'] });
        }
        return response;
    }

    /**
     * Book削除予約
     */
    public async reserveDeletionBook (serviceDto: BookServiceDto) {
        await EntityOperation.updateReserveDeletionBook(serviceDto.getBookId(), serviceDto.getOperator().loginId);
        return {
            result: 'success'
        };
    }
}
