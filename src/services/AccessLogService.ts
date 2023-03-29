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
import PostGetIndAccessLogReqDto, { DateStartEndObject, CodeVersionObject } from '../resources/dto/PostGetIndAccessLogReqDto';
import UserIdCooperate from '../repositories/postgres/UserIdCooperate';
import OperatorDomain from '../domains/OperatorDomain';
/* eslint-enable */
import EntityOperation from '../repositories/EntityOperation';
import BookOperateService from './BookOperateService';
import BookOperateServiceDto from './dto/BookOperateServiceDto';
import Config from '../common/Config';
import CatalogDto from './dto/CatalogDto';
import CatalogService from './CatalogService';
import AppError from '../common/AppError';
import { ResponseCode } from '../common/ResponseCode';
import { OperatorType } from '../common/Operator';
import { transformFromDateTimeToString } from '../common/Transform';
import { sprintf } from 'sprintf-js';
const Message = Config.ReadConfig('./config/message.json');
const Configure = Config.ReadConfig('./config/config.json');

@Service()
export default class AccessLogService {
    /**
     * Book参照
     * リファクタ履歴
     *  separate : createResponse（レスポンス作成処理）
     *  separate : getBlockCode（ブロックコード取得処理）
     *  separate : getShareCatalogName（共有定義カタログ取得処理）
     */
    public async getIndAccessLog (dto: PostGetIndAccessLogReqDto, operator: OperatorDomain): Promise<any> {
        // 個人以外ならエラー
        if (operator.type !== OperatorType.TYPE_IND) {
            throw new AppError(Message.REQUEST_UNAUTORIZED, ResponseCode.UNAUTHORIZED);
        }

        // 検索条件リストを取得
        const condition = dto.condition;

        // 本リクエストをBook運用のBook参照用に変換
        const bookDto = new BookOperateServiceDto();
        bookDto.setOperator(operator);

        let resultList: {}[] = [];
        if (!condition || condition.length <= 0) {
            // PXRIDを基にユーザIDを取得
            const userList: UserIdCooperate[] = await EntityOperation.getUserIdByPxrId(operator.pxrId, null, null, null);
            for (let index = 0; index < userList.length; index++) {
                const userInfo = userList[index];

                // 利用者ID連携.ステータスが 1:連携中 or 2:連携解除申請中 or 3:無効 の利用者連携情報のみ処理対象とする
                if (!userInfo.status || (userInfo.status !== 1 && userInfo.status !== 2 && userInfo.status !== 3)) {
                    continue;
                }

                // 対象ブロックコードを取得
                const blockCode: number = await this.getBlockCode(userInfo.actorCatalogCode, operator);

                // bodyを生成
                const body = await this.createRequestBody(
                    dto.accessAt,
                    userInfo.appCatalogCode,
                    null,
                    userInfo.userId,
                    null, null, null
                );

                // Book運用の共有アクセスログ取得と連携
                const result = await BookOperateService.doLinkingGetAccessLog(blockCode, body, operator);
                resultList = resultList.concat(result);
            }
        } else {
            for (let index = 0; index < condition.length; index++) {
                // PXRIDを基にユーザIDを取得
                const userList: UserIdCooperate[] = await EntityOperation.getUserIdByPxrId(
                    operator.pxrId,
                    condition[index].actor._value,
                    condition[index].app ? condition[index].app._value : null,
                    null
                );
                if (!userList || userList.length <= 0) {
                    continue;
                }
                const userInfo = userList[0];

                // 利用者ID連携.ステータスが 1:連携中 or 2:連携解除申請中 or 3:無効 の利用者連携情報のみ処理対象とする
                if (!userInfo.status || (userInfo.status !== 1 && userInfo.status !== 2 && userInfo.status !== 3)) {
                    continue;
                }

                // 対象ブロックコードを取得
                const blockCode: number = await this.getBlockCode(condition[index].actor._value, operator);

                // bodyを生成
                const body = await this.createRequestBody(
                    dto.accessAt,
                    condition[index].app ? condition[index].app._value : null,
                    null,
                    userInfo.userId,
                    condition[index].document ? condition[index].document : null,
                    condition[index].event ? condition[index].event : null,
                    condition[index].thing ? condition[index].thing : null
                );

                // Book運用の共有アクセスログ取得と連携
                const result = await BookOperateService.doLinkingGetAccessLog(blockCode, body, operator);
                resultList = resultList.concat(result);
            }
        }
        // 対象データが存在しない場合
        if (resultList.length <= 0) {
            throw new AppError(Message.TARGET_NO_DATA, ResponseCode.NO_CONTENT);
        }

        // 共有定義カタログ取得
        const catalogCodeNames: any[] = await this.getShareCatalogNames(resultList, operator);

        // レスポンス作成
        const response = await this.createResponse(resultList, catalogCodeNames);

        // レスポンスを返す
        return response;
    }

    /**
     * 共有定義カタログ取得
     * @param resultList
     * @param operator
     * @returns
     */
    private async getShareCatalogNames (resultList: {}[], operator: OperatorDomain) {
        const catalogCodes: any[] = [];
        for (const result of resultList) {
            if (result['shareCatalogCode']) {
                catalogCodes.push({
                    _code: {
                        _value: result['shareCatalogCode']
                    }
                });
            }
        }
        const catalogCodeNames: any[] = [];
        // 取得した共有アクセスログに共有定義カタログコードが存在する場合、共有定義カタログを取得
        if (catalogCodes && catalogCodes.length > 0) {
            const catalogDto = new CatalogDto();
            catalogDto.setUrl(Configure['catalogUrl']);
            catalogDto.setRequest(catalogCodes);
            catalogDto.setOperatorDomain(operator);
            catalogDto.setMessage(Message);
            const catalogs = await new CatalogService().getCatalogInfos(catalogDto);
            for (const catalog of catalogs) {
                const ele = {
                    code: Number(catalog['catalogItem']['_code']['_value']),
                    name: catalog['catalogItem']['name']
                };
                catalogCodeNames.push(ele);
            }
        }
        return catalogCodeNames;
    }

    /**
     * ブロックコード取得
     * @param actorCode
     * @param operator
     * @returns
     */
    private async getBlockCode (actorCode: number, operator: OperatorDomain) {
        // カタログサービスから対象カタログを取得
        const actorCatalogDto = new CatalogDto();
        actorCatalogDto.setUrl(Configure['catalogUrl']);
        actorCatalogDto.setCode(actorCode);
        actorCatalogDto.setOperatorDomain(operator);
        actorCatalogDto.setProcNum(0);
        actorCatalogDto.setMessage(Message);
        const catalogService: CatalogService = new CatalogService();
        const actorCatalog = await catalogService.getCatalogInfo(actorCatalogDto);

        // ブロックコードを取得
        const blockCode: number = actorCatalog['template']['main-block'] ? Number(actorCatalog['template']['main-block']['_value']) : null;
        if (!blockCode) {
            throw new AppError(sprintf(Message.FAILED_CATALOG_SET, 'アクター'), 500);
        }
        return blockCode;
    }

    /**
     * 個人用アクセスログ取得用のリクエストを生成
     * @param accessAt
     * @param app
     * @param wf
     * @param document
     * @param event
     * @param thing
     */
    private async createRequestBody (
        accessAt: DateStartEndObject,
        app: number, wf: number, userId: string,
        document: CodeVersionObject[],
        event: CodeVersionObject[],
        thing: CodeVersionObject[]
    ) {
        const body: any = {};
        body.accessAt = accessAt ? {} : null;
        if (accessAt && accessAt.start) {
            body.accessAt.start = transformFromDateTimeToString(Configure['timezone'], accessAt.start);
        }
        if (accessAt && accessAt.end) {
            body.accessAt.end = transformFromDateTimeToString(Configure['timezone'], accessAt.end);
        }
        body.app = app ? {
            _value: app
        } : null;
        body.wf = null;
        body.userId = userId;
        if (document && document.length > 0) {
            body.document = document;
        }
        if (event && event.length > 0) {
            body.event = event;
        }
        if (thing && thing.length > 0) {
            body.thing = thing;
        }
        return body;
    }

    /**
     * レスポンス作成
     * @param resultList
     * @param catalogCodeNames
     * @returns
     * リファクタ履歴
     *  inner : setData（共通処理）
     */
    private async createResponse (resultList: {}[], catalogCodeNames: number[]) {
        const responses: any[] = [];
        for (const result of resultList) {
            if (result['shareCatalogCode']) {
                const targetEle = catalogCodeNames.find(ele => ele['code'] === Number(result['shareCatalogCode']));
                result['shareName'] = targetEle ? targetEle['name'] : '';
            } else {
                result['shareName'] = '一時データ共有';
            }

            let isExist = false;
            for (const response of responses) {
                if (result['logIdentifier'] === response['logIdentifier']) {
                    isExist = true;
                    if (result['accessAt'] < response['accessAt']) {
                        response['accessAt'] = result['accessAt'];
                    }
                    if (result['document'] && Array.isArray(result['document'])) {
                        await setData(result, response, 'document');
                    }
                    if (result['event'] && Array.isArray(result['event'])) {
                        await setData(result, response, 'event');
                    }
                    if (result['thing'] && Array.isArray(result['thing'])) {
                        await setData(result, response, 'thing');
                    }
                }
            }
            if (!isExist) {
                responses.push(result);
            }
        }
        // データ種設定
        async function setData (result: {}, response: {}, type: 'document' | 'event' | 'thing') {
            for (const data of result[type]) {
                let exist = false;
                for (const resData of response[type]) {
                    if (data._code._value === resData._code._value && data._code._ver === resData._code._ver) {
                        resData.count = Number(resData.count) + Number(data.count);
                        exist = true;
                        break;
                    }
                }
                if (!exist) {
                    response[type].push(data);
                }
            }
        }
        return responses;
    }
}
