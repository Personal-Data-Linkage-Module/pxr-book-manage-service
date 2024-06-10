/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import CatalogDto from './dto/CatalogDto';
import { doGetRequest, doPostRequest } from '../common/DoRequest';
import AppError from '../common/AppError';
import { ResponseCode } from '../common/ResponseCode';
import urljoin = require('url-join');
import OperatorDomain from '../domains/OperatorDomain';
import Operator from '../resources/dto/OperatorReqDto';
import Config from '../common/Config';
import { checkCatalog, checkShareCatalog, checkActorCatalog } from '../common/CatalogChecker';
import BaseCatalogType from '../domains/catalog/Base';
import { applicationLogger } from '../common/logging';
import { Catalog, ISharingRestrictionCatalog } from '../domains/catalog/Catalogs';
const Configure = Config.ReadConfig('./config/config.json');
const Message = Config.ReadConfig('./config/message.json');
/* eslint-enable */

export default class CatalogService {
    static async getNs (ns: string, operator: OperatorDomain) {
        // URLを生成
        const url = urljoin(Configure.catalogUrl, 'ns', '?ns=' + ns);
        const options = {
            headers: {
                accept: 'application/json',
                session: operator.encoded
            }
        };
        try {
            // カタログサービスからカタログを取得
            const result = await doGetRequest(url, options);
            // ステータスコードを判定
            const statusCode: string = result.response.statusCode.toString();
            if (result.response.statusCode === ResponseCode.BAD_REQUEST) {
                // 応答が400の場合、エラーを返す
                throw new AppError(Message.FAILED_CATALOG_GET, ResponseCode.BAD_REQUEST);
            } else if (result.response.statusCode === ResponseCode.NOT_FOUND) {
                // 応答が400 NOT FOUNDの場合、空配列を返す
                return [];
            } else if (statusCode.match(/^5.+/)) {
                // 応答が500系の場合、エラーを返す
                throw new AppError(Message.FAILED_CATALOG_GET, ResponseCode.SERVICE_UNAVAILABLE);
            } else if (result.response.statusCode !== ResponseCode.OK) {
                // 応答が200 OK以外の場合、エラーを返す
                throw new AppError(Message.FAILED_CATALOG_GET, ResponseCode.UNAUTHORIZED);
            }
            // カタログ情報を戻す
            return result.body;
        } catch (err) {
            if (err.name === AppError.NAME) {
                throw err;
            }
            // サービスへの接続に失敗した場合
            throw new AppError(Message.FAILED_CONNECT_TO_CATALOG, ResponseCode.SERVICE_UNAVAILABLE, err);
        }
    }

    /**
     * カタログを取得する（NS）
     * @param ns
     * @param operator
     */
    static async getCatalog (arg: number | string, operator: OperatorDomain) {
        const dto = new CatalogDto();
        dto.setMessage(Config.ReadConfig('./config/message.json'));
        dto.setUrl(Configure.catalogUrl);
        if (typeof arg === 'string') {
            dto.setProcNum(1);
            dto.setNs(arg);
        } else {
            dto.setProcNum(0);
            dto.setCode(arg);
        }
        dto.setOperatorDomain(operator);
        return checkCatalog((await new CatalogService().getCatalogInfo(dto)), arg);
    }

    /**
     * カタログを取得する（NS）
     * @param ns
     * @param operator
     */
    static async getCatalogNonFail (arg: number | string, operator: OperatorDomain) {
        const dto = new CatalogDto();
        dto.setMessage(Config.ReadConfig('./config/message.json'));
        dto.setUrl(Configure.catalogUrl);
        try {
            if (!arg) { return null; }
            if (typeof arg === 'string') {
                dto.setProcNum(1);
                dto.setNs(arg);
            } else {
                dto.setProcNum(0);
                dto.setCode(arg);
            }
            dto.setOperatorDomain(operator);
            return checkCatalog((await new CatalogService().getCatalogInfo(dto)), arg);
        } catch (err) {
            if (err instanceof AppError) {
                return null;
            }
            throw err;
        }
    }

    /**
     * アクターカタログを取得する
     * @param arg
     * @param operator
     */
    static async getActorCatalog (arg: number | string, operator: OperatorDomain | Operator) {
        const dto = new CatalogDto();
        dto.setMessage(Config.ReadConfig('./config/message.json'));
        dto.setUrl(Configure.catalogUrl);
        if (typeof arg === 'string') {
            dto.setProcNum(1);
            dto.setNs(arg);
        } else {
            dto.setProcNum(0);
            dto.setCode(arg);
        }
        if (operator instanceof OperatorDomain) {
            dto.setOperatorDomain(operator);
        } else {
            dto.setOperator(operator);
        }
        return checkActorCatalog((await new CatalogService().getCatalogInfo(dto)), arg);
    }

    /**
     * NS検索をしつつ、それらのコードを配列化する
     * @param ns
     * @param operator
     */
    static async getArrayOfItemsCodeObj (ns: string, operator: OperatorDomain) {
        const data = await this.getCatalogNonFail(ns, operator) as BaseCatalogType[];
        if (!data) {
            return [];
        }
        const codeObjList: any[] = [];
        data.forEach(item => {
            codeObjList.push({
                _value: item.catalogItem._code._value,
                _ver: item.catalogItem._code._ver
            });
        });
        return codeObjList;
    }

    /**
     * カタログ情報取得
     * @param catalogDto
     * @param acceptNoResult 取得結果0件を許容するフラグ（任意）
     */
    public async getCatalogInfo (catalogDto: CatalogDto, acceptNoResult?: boolean): Promise<any> {
        // URLを生成
        let url = null;
        const procNum = catalogDto.getProcNum();
        if (procNum === 0) {
            // コードでカタログを取得する
            const code: string = catalogDto.getCode() ? catalogDto.getCode().toString() : null;
            const version: string = catalogDto.getVersion() ? catalogDto.getVersion().toString() : null;
            if (catalogDto.getVersion()) {
                url = urljoin(catalogDto.getUrl(), code, version);
            } else {
                url = urljoin(catalogDto.getUrl(), code);
            }
        } else {
            // ネームスペースでカタログを取得する
            url = catalogDto.getUrl() + '/?ns=' + catalogDto.getNs();
        }
        const options = {
            headers: {
                accept: 'application/json',
                session: catalogDto.getOperator() ? encodeURIComponent(JSON.stringify(catalogDto.getOperator())) : catalogDto.getOperatorDomain().encoded
            }
        };
        const message = catalogDto.getMessage();

        try {
            // カタログサービスからカタログを取得
            applicationLogger.info('getCatalogInfo: ' + url);
            const result = await doGetRequest(url, options);

            // ステータスコードを判定
            const statusCode: string = result.response.statusCode.toString();
            if (result.response.statusCode === ResponseCode.BAD_REQUEST) {
                // 応答が400の場合、エラーを返す
                throw new AppError(message.FAILED_CATALOG_GET, ResponseCode.BAD_REQUEST);
            } else if (statusCode.match(/^5.+/)) {
                // 応答が500系の場合、エラーを返す
                throw new AppError(message.FAILED_CATALOG_GET, ResponseCode.SERVICE_UNAVAILABLE);
            } else if (result.response.statusCode === ResponseCode.NOT_FOUND) {
                if (acceptNoResult) {
                    // 取得結果0件を許容する場合、code指定はnull, ns指定は空配列を返却する
                    return procNum === 0 ? null : [];
                } else {
                    // 応答が404の場合、エラーを返す
                    throw new AppError(message.FAILED_CATALOG_GET, ResponseCode.NOT_FOUND);
                }
            } else if (result.response.statusCode !== ResponseCode.OK) {
                // 応答が200 OK以外の場合、エラーを返す
                throw new AppError(message.FAILED_CATALOG_GET, ResponseCode.UNAUTHORIZED);
            }
            // カタログ情報を戻す
            return result.body;
        } catch (err) {
            if (err.name === AppError.NAME) {
                throw err;
            }
            // サービスへの接続に失敗した場合
            throw new AppError(message.FAILED_CONNECT_TO_CATALOG, ResponseCode.SERVICE_UNAVAILABLE, err);
        }
    }

    /**
     * カタログ複数取得
     * @param catalogDto
     */
    public async getCatalogInfos (catalogDto: CatalogDto): Promise<any> {
        // URLを生成
        const message = catalogDto.getMessage();
        const url = catalogDto.getUrl();
        const body = JSON.stringify(catalogDto.getRequest());
        const options = {
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(body),
                session: catalogDto.getOperator() ? encodeURIComponent(JSON.stringify(catalogDto.getOperator())) : catalogDto.getOperatorDomain().encoded
            },
            body: body
        };

        try {
            // カタログサービスからカタログを取得
            const result = await doPostRequest(url, options);

            // ステータスコードを判定
            const statusCode: string = result.response.statusCode.toString();
            if (result.response.statusCode === ResponseCode.BAD_REQUEST) {
                // 応答が400の場合、エラーを返す
                throw new AppError(message.FAILED_CATALOG_GET, ResponseCode.BAD_REQUEST);
            } else if (statusCode.match(/^5.+/)) {
                // 応答が500系の場合、エラーを返す
                throw new AppError(message.FAILED_CATALOG_GET, ResponseCode.SERVICE_UNAVAILABLE);
            } else if (result.response.statusCode !== ResponseCode.OK) {
                // 応答が200 OK以外の場合、エラーを返す
                throw new AppError(message.FAILED_CATALOG_GET, ResponseCode.UNAUTHORIZED);
            }
            // カタログ情報を戻す
            return result.body;
        } catch (err) {
            if (err.name === AppError.NAME) {
                throw err;
            }
            // サービスへの接続に失敗した場合
            throw new AppError(message.FAILED_CONNECT_TO_CATALOG, ResponseCode.SERVICE_UNAVAILABLE, err);
        }
    }

    /**
     * extNameを取得する
     * @param catalogDto
     */
    public async getExtName (catalogDto: CatalogDto) {
        const message = catalogDto.getMessage();
        const url = Configure.catalogUrl + '/name';
        const options = {
            headers: {
                accept: 'application/json',
                session: catalogDto.getOperator() ? encodeURIComponent(JSON.stringify(catalogDto.getOperator())) : catalogDto.getOperatorDomain().encoded
            }
        };
        try {
            // カタログサービスからカタログを取得
            const result = await doGetRequest(url, options);

            // ステータスコードを判定
            const statusCode: string = result.response.statusCode.toString();
            if (result.response.statusCode === ResponseCode.BAD_REQUEST) {
                // 応答が400の場合、エラーを返す
                throw new AppError(message.FAILED_CATALOG_GET, ResponseCode.BAD_REQUEST);
            } else if (statusCode.match(/^5.+/)) {
                // 応答が500系の場合、エラーを返す
                throw new AppError(message.FAILED_CATALOG_GET, ResponseCode.SERVICE_UNAVAILABLE);
            } else if (result.response.statusCode !== ResponseCode.OK) {
                // 応答が200 OK以外の場合、エラーを返す
                throw new AppError(message.FAILED_CATALOG_GET, ResponseCode.UNAUTHORIZED);
            }
            // カタログ情報を戻す
            return result.body['ext_name'];
        } catch (err) {
            if (err.name === AppError.NAME) {
                throw err;
            }
            // サービスへの接続に失敗した場合
            throw new AppError(message.FAILED_CONNECT_TO_CATALOG, ResponseCode.SERVICE_UNAVAILABLE, err);
        }
    }

    /**
     * グローバル設定カタログの取得
     * @param catalogDto
     */
    public async getGlobalSettinCatalog (catalogDto: CatalogDto) {
        catalogDto.setUrl(Configure['catalogUrl']);
        catalogDto.setMessage(Message);
        const extName = await this.getExtName(catalogDto);
        catalogDto.setNs(`catalog/ext/${extName}/setting/global`);
        catalogDto.setProcNum(1);
        const globalCatalog = await this.getCatalogInfo(catalogDto);
        return globalCatalog[0];
    }

    /**
     * analyzerで使用するカタログの取得
     * @param code カタログコード
     * @param history 履歴取得フラグ
     * @param minVersion 取得起点カタログバージョン
     * @param maxVersion 取得終点カタログバージョン
     * @returns カタログ配列
     */
    public async catalogAccessor (operator: Operator, code: number, history: boolean, minVersion?: number, maxVersion?: number): Promise<Catalog[]> {
        if (!operator) {
            throw new AppError(Message.NOT_SET_OPERATOR, ResponseCode.BAD_REQUEST);
        }
        if (!code) {
            throw new AppError(Message.validation.isNotEmpty, ResponseCode.BAD_REQUEST);
        }
        if (history && !minVersion) {
            throw new AppError(Message.CATALOG_HISTORY_REQUIRE_MIN_VERSION, ResponseCode.BAD_REQUEST);
        }
        if (minVersion && maxVersion && minVersion > maxVersion) {
            throw new AppError(Message.INVALID_MIN_AND_MAX_VERSION, ResponseCode.BAD_REQUEST);
        }
        // 履歴取得フラグがfalseの場合、コードによるカタログ取得APIを呼び出す
        if (history === false) {
            // 履歴取得フラグがfalseの場合、コードのみ指定で最新カタログを取得
            const dto = new CatalogDto();
            dto.setMessage(Config.ReadConfig('./config/message.json'));
            dto.setUrl(Configure.catalogUrl);
            dto.setProcNum(0);
            dto.setCode(code);
            dto.setOperator(operator);
            const result = await new CatalogService().getCatalogInfo(dto);
            // 返却値が配列でない場合は、配列に格納して返却する
            if (!result || result.length === 0) {
                return [];
            } else if (Array.isArray(result)) {
                return result;
            } else {
                return [result];
            }
        } else {
            const result: Catalog[] = [];
            // 履歴取得フラグがtrueの場合は、指定の最小バージョンから最新バージョンまでを取得する
            const gotHistoryCatalogs = await new CatalogService().getCatalogHistory(operator, code, minVersion, maxVersion);
            result.push(...gotHistoryCatalogs);

            return result;
        }
    }

    /**
     * カタログ履歴取得処理
     * 必ず配列型で返却する
     * @param url
     * @param options
     * @returns
     */
    private async getCatalogHistory (operator: Operator, code: number, minVersion?: number, maxVersion?: number): Promise<Catalog[]> {
        let query: string;
        if (!maxVersion) {
            query = '?min=' + minVersion;
        } else {
            query = '?min=' + minVersion + '&max=' + maxVersion;
        }
        const url = urljoin(Configure['catalogUrl'], 'history', code.toString(), '', query);
        const options = {
            headers: {
                accept: 'application/json',
                session: encodeURIComponent(JSON.stringify(operator))
            }
        };
        try {
            // カタログサービスからカタログを取得
            applicationLogger.info('getCatalogInfo: ' + url);
            const result = await doGetRequest(url, options);

            // ステータスコードを判定
            const statusCode: string = result.response.statusCode.toString();
            if (result.response.statusCode === ResponseCode.NOT_FOUND) {
                // 応答が404, 204の場合、エラー送出せず空レスポンスを返す
                return [];
            }
            if (result.response.statusCode === ResponseCode.BAD_REQUEST) {
                // 応答が400の場合、エラーを返す
                throw new AppError(Message.FAILED_CATALOG_GET, ResponseCode.BAD_REQUEST);
            } else if (statusCode.match(/^5.+/)) {
                // 応答が500系の場合、エラーを返す
                throw new AppError(Message.FAILED_CATALOG_GET, ResponseCode.SERVICE_UNAVAILABLE);
            } else if (result.response.statusCode !== ResponseCode.OK) {
                // 応答が200 OK以外の場合、エラーを返す
                throw new AppError(Message.FAILED_CATALOG_GET, ResponseCode.UNAUTHORIZED);
            }
            // カタログ情報を戻す（catalog/history:code は配列型レスポンス）
            return result.body;
        } catch (err) {
            if (err.name === AppError.NAME) {
                throw err;
            }
            // サービスへの接続に失敗した場合
            throw new AppError(Message.FAILED_CONNECT_TO_CATALOG, ResponseCode.SERVICE_UNAVAILABLE, err);
        }
    }

    /**
     * アクターコードのみ指定して共有先制限定義カタログを取得する
     * @param actorCode
     * @param operator
     */
    public async shareRestrictionAccessor (operator: Operator, actorCode: number): Promise<ISharingRestrictionCatalog[]> {
        const extName = Configure['extName'];
        const result: Catalog[] = [];
        const newCatalogService = new CatalogService();

        // app,wf指定無しのため、両方取得する
        const appNs = 'catalog/ext/' + extName + '/actor/app/actor_' + actorCode + '/sharing-restriction';
        const dto = new CatalogDto();
        dto.setMessage(Config.ReadConfig('./config/message.json'));
        dto.setUrl(Configure.catalogUrl);
        dto.setProcNum(1);
        dto.setNs(appNs);
        dto.setOperator(operator);
        const appResult = await newCatalogService.getCatalogInfo(dto, true);
        // 返却値が配列でない場合は、配列に格納して返却する
        if (!appResult || appResult.length === 0) {
            // 何もしない
        } else if (Array.isArray(appResult)) {
            result.push(...appResult);
        } else {
            result.push(appResult);
        }

        const wfNs = 'catalog/ext/' + extName + '/actor/wf/actor_' + actorCode + '/sharing-restriction';
        dto.setNs(wfNs);
        const wfResult = await newCatalogService.getCatalogInfo(dto, true);
        // 返却値が配列でない場合は、配列に格納して返却する
        if (!wfResult || wfResult.length === 0) {
            // 何もしない
        } else if (Array.isArray(wfResult)) {
            result.push(...wfResult);
        } else {
            result.push(wfResult);
        }

        return result as ISharingRestrictionCatalog[];
    }
}
