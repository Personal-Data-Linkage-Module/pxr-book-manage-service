/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import OperatorAddDto from './dto/OperatorAddDto';
import UserInfoDto from './dto/UserInfoDto';
import { CoreOptions } from 'request';
import { Request } from 'express';
import { doPostRequest, doGetRequest, doDeleteRequest, doPutRequest } from '../common/DoRequest';
import AppError from '../common/AppError';
import { ResponseCode } from '../common/ResponseCode';
import { OperatorType } from '../common/Operator';
import OperatorDomain from '../domains/OperatorDomain';
import ConfigReader from '../common/Config';
import PostUserInfoSearchReqDto from '../resources/dto/PostUserInfoSearchReqDto';
import PostUserInfoReqDto from '../resources/dto/PostUserInfoReqDto';
import request = require('request');
/* eslint-enable */
import config = require('config');
const message = ConfigReader.ReadConfig('./config/message.json');
const configure = ConfigReader.ReadConfig('./config/config.json');

/**
 * オペレーターサービス
 */
export default class OperatorService {
    /**
     * オペレーターのセッション情報を取得する
     * @param req リクエストオブジェクト
     */
    static async authMe (req: Request): Promise<OperatorDomain> {
        const { cookies } = req;
        const sessionId = cookies[OperatorDomain.TYPE_PERSONAL_KEY]
            ? cookies[OperatorDomain.TYPE_PERSONAL_KEY]
            : cookies[OperatorDomain.TYPE_APPLICATION_KEY]
                ? cookies[OperatorDomain.TYPE_APPLICATION_KEY]
                : cookies[OperatorDomain.TYPE_MANAGER_KEY];
        // Cookieからセッションキーが取得できた場合、オペレーターサービスに問い合わせる
        if (typeof sessionId === 'string' && sessionId.length > 0) {
            const data = JSON.stringify({ sessionId: sessionId });
            const options: request.CoreOptions = {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(data)
                },
                body: data
            };
            try {
                const result = await doPostRequest(
                    config.get('operatorService.session'),
                    options
                );
                // ステータスコードにより制御
                const { statusCode } = result.response;
                if (statusCode === 204 || statusCode === 400) {
                    throw new AppError(message.NOT_AUTHORIZED, 401);
                } else if (statusCode !== 200) {
                    throw new AppError(message.FAILED_TAKE_SESSION, 500);
                }
                return new OperatorDomain(result.body);
            } catch (err) {
                if (err instanceof AppError) {
                    throw new AppError(err.message, err.statusCode);
                }
                throw new AppError(message.FAILED_CONNECT_TO_OPERATOR, 500, err);
            }

            // ヘッダーにセッション情報があれば、それを流用する
        } else if (req.headers.session) {
            let data = decodeURIComponent(req.headers.session + '');
            while (typeof data === 'string') {
                data = JSON.parse(data);
            }
            return new OperatorDomain(data, req.headers.session + '');

            // セッション情報が存在しない場合、未ログインとしてエラーをスローする
        } else {
            throw new AppError(message.NOT_AUTHORIZED, 401);
        }
    }

    /**
     * PXR-IDからオペレーターIDを特定する
     * @param pxrId
     * @param operator
     */
    static async getOperatorIdWithPxrId (pxrId: string, operator: OperatorDomain) {
        const result = await doGetRequest(config.get('operatorService.get') + `?pxrId=${pxrId}&type=0`, {
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
                session: operator.encoded
            }
        });

        // レスポンスコードが200以外の場合
        // ステータスコードを判定
        const statusCode = result.response.statusCode;
        if (statusCode === 400 || statusCode === 204 || statusCode === 404) {
            // 応答が400の場合、エラーを返す
            throw new AppError(message.FAILED_OPERATOR_GET_PXR_ID, ResponseCode.BAD_REQUEST);
        } else if (statusCode !== 200) {
            // 応答が200以外の場合、エラーを返す
            throw new AppError(message.FAILED_OPERATOR_GET, ResponseCode.SERVICE_UNAVAILABLE);
        }

        return parseInt(result.body.operatorId);
    }

    /**
     * ログイン禁止フラグを更新する
     * @param operatorId
     * @param flag
     * @param operator
     */
    static async changeProhibitedFlag (operatorId: number, flag: boolean, operator: OperatorDomain) {
        const data = JSON.stringify({
            loginProhibitedFlg: flag
        });
        const result = await doPutRequest(config.get('operatorService.update') + `/${operatorId}`, {
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
                'Content-Length': Buffer.byteLength(data),
                session: operator.encoded
            },
            body: data
        });
        if (result.response.statusCode !== 200) {
            throw new AppError(message.FAILED_UPDATE_OPERATOR, 500);
        }
    }

    /**
     * オペレーター追加と利用者情報確認
     * @param OperatorAddDto
     */
    public async postOperatorAdd (operatorAddDto: OperatorAddDto): Promise<any> {
        let body = null;
        let errorMessage = null;
        const procMode = operatorAddDto.getProcMode();
        // procMode:1(addリクエスト処理)
        if (procMode === 1) {
            errorMessage = message.FAILED_OPERATOR_ADD;

            // ログインIDはPXR-ID、パスワードは初回パスワードをハッシュ化したもの
            // attributesに初回ログイン期限(initialPasswordExpire)を設定する
            body = JSON.stringify({
                type: OperatorType.TYPE_IND,
                loginId: operatorAddDto.getLoginId(),
                hpassword: operatorAddDto.getHpassword(),
                pxrId: operatorAddDto.getPxrId(),
                attributes: operatorAddDto.getAttributes()
            });
        } else {
            errorMessage = message.FAILED_OPERATOR_USER_INFO;
            body = JSON.stringify({
                pxrId: operatorAddDto.getPxrId(),
                userInfo: operatorAddDto.getUserInformation()
            });
        }

        // 接続のためのオプションを生成
        const options: CoreOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(body),
                accept: 'application/json',
                session: encodeURIComponent(JSON.stringify(operatorAddDto.getOperator()))
            },
            body: body
        };

        try {
            // postを実行
            const result = await doPostRequest(operatorAddDto.getUrl(), options);

            // レスポンスコードが200以外の場合
            // ステータスコードを判定
            const statusCode: string = result.response.statusCode.toString();
            if (result.response.statusCode === ResponseCode.BAD_REQUEST) {
                // 応答が400の場合、エラーを返す
                throw new AppError(errorMessage, ResponseCode.BAD_REQUEST);
            } else if (statusCode.match(/^5.+/)) {
                // 応答が500系の場合、エラーを返す
                throw new AppError(errorMessage, ResponseCode.SERVICE_UNAVAILABLE);
            } else if (result.response.statusCode !== ResponseCode.OK) {
                // 応答が200以外の場合、エラーを返す
                throw new AppError(errorMessage, ResponseCode.UNAUTHORIZED);
            }
        } catch (err) {
            if (err.name === AppError.NAME) {
                throw err;
            }
            // サービスへの接続に失敗した場合
            throw new AppError(message.FAILED_CONNECT_TO_OPERATOR, ResponseCode.SERVICE_UNAVAILABLE, err);
        }
    }

    static async getUserInfo (pxrId: string, operator: OperatorDomain) {
        const dto = new UserInfoDto();
        dto.setMessage(message);
        dto.operatorDomain = operator;
        dto.setPxrId(pxrId);
        dto.setUrl(configure['operatorUrl']);
        const userInfo = await new OperatorService().getUserInfo(dto);
        return userInfo.userInfo;
    }

    /**
     * 利用者情報取得
     * @param userInfoDto
     */
    public async getUserInfo (userInfoDto: UserInfoDto): Promise<any> {
        // 接続のためのオプションを生成
        const options: CoreOptions = {
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
                session: userInfoDto.operatorDomain ? userInfoDto.operatorDomain.encoded : encodeURIComponent(JSON.stringify(userInfoDto.getOperator()))
            }
        };

        let url;
        if ((userInfoDto.operatorDomain && userInfoDto.operatorDomain.type === OperatorDomain.TYPE_PERSONAL_NUMBER) ||
            (userInfoDto.getOperator() && userInfoDto.getOperator().getType() === OperatorDomain.TYPE_PERSONAL_NUMBER)) {
            url = userInfoDto.getUrl() + '/user/info';
        } else {
            url = userInfoDto.getUrl() + '/user/info?pxrId=' + userInfoDto.getPxrId();
        }

        try {
            // postを実行
            const result = await doGetRequest(url, options);

            // レスポンスコードが200以外の場合
            // ステータスコードを判定
            const statusCode: string = result.response.statusCode.toString();
            if (result.response.statusCode === ResponseCode.BAD_REQUEST) {
                // 応答が400の場合、エラーを返す
                throw new AppError(message.FAILED_GET_USER_INFORMATION, ResponseCode.BAD_REQUEST);
            } else if (statusCode.match(/^5.+/)) {
                // 応答が500系の場合、エラーを返す
                throw new AppError(message.FAILED_GET_USER_INFORMATION, ResponseCode.SERVICE_UNAVAILABLE);
            } else if (result.response.statusCode === ResponseCode.NO_CONTENT) {
                // 応答が204の場合、nullを返す
                return null;
            } else if (result.response.statusCode !== ResponseCode.OK) {
                // 応答が200以外の場合、エラーを返す
                throw new AppError(message.FAILED_GET_USER_INFORMATION, ResponseCode.UNAUTHORIZED);
            }
            return result.body;
        } catch (err) {
            if (err.name === AppError.NAME) {
                throw err;
            }
            // サービスへの接続に失敗した場合
            throw new AppError(message.FAILED_CONNECT_TO_OPERATOR, ResponseCode.SERVICE_UNAVAILABLE, err);
        }
    }

    /**
     * 利用者情報取得
     * @param userInfoDto
     */
    public async getUserInfoList (userInfoDto: UserInfoDto): Promise<any> {
        // 接続のためのオプションを生成
        const body = JSON.stringify(userInfoDto.getRequest());
        const options: CoreOptions = {
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(body),
                session: userInfoDto.operatorDomain ? userInfoDto.operatorDomain.encoded : encodeURIComponent(JSON.stringify(userInfoDto.getOperator()))
            },
            body: body
        };

        try {
            // postを実行
            const result = await doPostRequest(userInfoDto.getUrl() + '/user/info/list', options);

            // レスポンスコードが200以外の場合
            // ステータスコードを判定
            const statusCode: string = result.response.statusCode.toString();
            if (result.response.statusCode === ResponseCode.BAD_REQUEST) {
                // 応答が400の場合、エラーを返す
                throw new AppError(message.FAILED_GET_USER_INFORMATION, ResponseCode.BAD_REQUEST);
            } else if (statusCode.match(/^5.+/)) {
                // 応答が500系の場合、エラーを返す
                throw new AppError(message.FAILED_GET_USER_INFORMATION, ResponseCode.SERVICE_UNAVAILABLE);
            } else if (result.response.statusCode === ResponseCode.NO_CONTENT) {
                // 応答が204の場合、nullを返す
                return null;
            } else if (result.response.statusCode !== ResponseCode.OK) {
                // 応答が200以外の場合、エラーを返す
                throw new AppError(message.FAILED_GET_USER_INFORMATION, ResponseCode.UNAUTHORIZED);
            }
            return result.body;
        } catch (err) {
            if (err.name === AppError.NAME) {
                throw err;
            }
            // サービスへの接続に失敗した場合
            throw new AppError(message.FAILED_CONNECT_TO_OPERATOR, ResponseCode.SERVICE_UNAVAILABLE, err);
        }
    }

    /**
     * オペレーター情報取得と削除
     * @param OperatorDto
     */
    public async operatorDeleteInfo (operatorDto: OperatorAddDto) {
        // 接続のためのオプションを生成
        const options: CoreOptions = {
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
                session: encodeURIComponent(JSON.stringify(operatorDto.getOperator()))
            }
        };

        let errorMessage = message.FAILED_OPERATOR_GET;
        const procMode = operatorDto.getProcMode();
        // procMode:3(deleteリクエスト処理)
        if (procMode === 3) {
            errorMessage = message.FAILED_OPERATOR_DEL;
        }

        try {
            // 実行
            let result = null;
            if (procMode === 3) {
                result = await doDeleteRequest(operatorDto.getUrl(), options);
            } else {
                result = await doGetRequest(operatorDto.getUrl(), options);
            }

            // レスポンスコードが200以外の場合
            // ステータスコードを判定
            const statusCode: string = result.response.statusCode.toString();
            if (result.response.statusCode === ResponseCode.BAD_REQUEST) {
                // 応答が400の場合、エラーを返す
                throw new AppError(errorMessage, ResponseCode.BAD_REQUEST);
            } else if (statusCode.match(/^5.+/)) {
                // 応答が500系の場合、エラーを返す
                throw new AppError(errorMessage, ResponseCode.SERVICE_UNAVAILABLE);
            } else if (result.response.statusCode !== ResponseCode.OK) {
                // 応答が200以外の場合、エラーを返す
                throw new AppError(errorMessage, ResponseCode.UNAUTHORIZED);
            }
            return result;
        } catch (err) {
            if (err.name === AppError.NAME) {
                throw err;
            }
            // サービスへの接続に失敗した場合
            throw new AppError(message.FAILED_CONNECT_TO_OPERATOR, ResponseCode.SERVICE_UNAVAILABLE, err);
        }
    }

    /**
     * オペレーター削除取り消し
     * @param OperatorDto
     */
    public async operatorCancelDelete (operatorDto: OperatorAddDto) {
        // 接続のためのオプションを生成
        const options: CoreOptions = {
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
                session: encodeURIComponent(JSON.stringify(operatorDto.getOperator()))
            }
        };

        try {
            // 実行
            const result = await doPutRequest(operatorDto.getUrl(), options);

            // レスポンスコードが200以外の場合
            // ステータスコードを判定
            const statusCode: string = result.response.statusCode.toString();
            if (result.response.statusCode === ResponseCode.BAD_REQUEST) {
                // 応答が400の場合、エラーを返す
                throw new AppError(message.FAILED_UPDATE_OPERATOR, ResponseCode.BAD_REQUEST);
            } else if (statusCode.match(/^5.+/)) {
                // 応答が500系の場合、エラーを返す
                throw new AppError(message.FAILED_UPDATE_OPERATOR, ResponseCode.SERVICE_UNAVAILABLE);
            } else if (result.response.statusCode !== ResponseCode.OK) {
                // 応答が200以外の場合、エラーを返す
                throw new AppError(message.FAILED_UPDATE_OPERATOR, ResponseCode.UNAUTHORIZED);
            }
            return result;
        } catch (err) {
            if (err.name === AppError.NAME) {
                throw err;
            }
            // サービスへの接続に失敗した場合
            throw new AppError(message.FAILED_CONNECT_TO_OPERATOR, ResponseCode.SERVICE_UNAVAILABLE, err);
        }
    }

    /**
     * ログインコード再作成用
     * @param OperatorAddDto
     */
    public async loginCodeProc (operatorDto: OperatorAddDto): Promise<any> {
        let options: CoreOptions = null;
        let body: any = null;
        let errorMessage = null;
        const procMode = operatorDto.getProcMode();
        // procMode:0(getリクエスト処理),2(putリクエスト処理)
        if (procMode === 0) {
            errorMessage = message.FAILED_OPERATOR_GET_PXR_ID;
            options = {
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                    session: encodeURIComponent(JSON.stringify(operatorDto.getOperator()))
                }
            };
        } else {
            errorMessage = message.FAILED_OPERATOR_PASSWORD_RESET;
            body = JSON.stringify({
                newHpassword: operatorDto.getHpassword()
            });
            options = {
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(body),
                    accept: 'application/json',
                    session: encodeURIComponent(JSON.stringify(operatorDto.getOperator()))
                },
                body: body
            };
        }

        try {
            let result: any = null;
            if (procMode === 0) {
                result = await doGetRequest(operatorDto.getUrl(), options);
            } else {
                result = await doPutRequest(operatorDto.getUrl(), options);
            }

            // レスポンスコードが200以外の場合
            // ステータスコードを判定
            const statusCode: string = result.response.statusCode.toString();
            if (result.response.statusCode === ResponseCode.BAD_REQUEST) {
                // 応答が400の場合、エラーを返す
                throw new AppError(errorMessage, ResponseCode.BAD_REQUEST);
            } else if (statusCode.match(/^5.+/)) {
                // 応答が500系の場合、エラーを返す
                throw new AppError(errorMessage, ResponseCode.SERVICE_UNAVAILABLE);
            } else if (result.response.statusCode !== ResponseCode.OK) {
                // 応答が200以外の場合、エラーを返す
                throw new AppError(errorMessage, ResponseCode.UNAUTHORIZED);
            }
            if (procMode === 0) {
                return result.body;
            }
        } catch (err) {
            if (err.name === AppError.NAME) {
                throw err;
            }
            // サービスへの接続に失敗した場合
            throw new AppError(message.FAILED_CONNECT_TO_OPERATOR, ResponseCode.SERVICE_UNAVAILABLE, err);
        }
    }

    /**
     * 利用者管理情報によるPXR-ID取得
     * @param url
     * @param userInfoDto
     */
    public async getUserInfoSearch (userInfoDto: UserInfoDto): Promise<any> {
        // リクエストボディを生成
        const list = userInfoDto.getRequest<PostUserInfoSearchReqDto[]>();
        const body: {}[] = [];
        for (let index = 0; index < list.length; index++) {
            body.push(list[index].getAsJson());
        }
        const bodyStr: string = JSON.stringify(body);

        // 接続のためのオプションを生成
        const options: CoreOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(bodyStr),
                accept: 'application/json',
                session: encodeURIComponent(JSON.stringify(userInfoDto.getOperator()))
            },
            body: bodyStr
        };

        try {
            // postを実行
            const result = await doPostRequest(userInfoDto.getUrl() + '/user/info/search', options);

            // レスポンスコードが200以外の場合
            // ステータスコードを判定
            const statusCode: string = result.response.statusCode.toString();
            if (result.response.statusCode === ResponseCode.BAD_REQUEST) {
                // 応答が400の場合、エラーを返す
                throw new AppError(message.FAILED_GET_USER_INFORMATION, ResponseCode.BAD_REQUEST);
            } else if (statusCode.match(/^5.+/)) {
                // 応答が500系の場合、エラーを返す
                throw new AppError(message.FAILED_GET_USER_INFORMATION, ResponseCode.SERVICE_UNAVAILABLE);
            } else if (result.response.statusCode === ResponseCode.NO_CONTENT) {
                // 応答が204の場合、nullを返す
                return null;
            } else if (result.response.statusCode !== ResponseCode.OK) {
                // 応答が200以外の場合、エラーを返す
                throw new AppError(message.FAILED_GET_USER_INFORMATION, ResponseCode.UNAUTHORIZED);
            }
            return result.body;
        } catch (err) {
            if (err.name === AppError.NAME) {
                throw err;
            }
            // サービスへの接続に失敗した場合
            throw new AppError(message.FAILED_CONNECT_TO_OPERATOR, ResponseCode.SERVICE_UNAVAILABLE, err);
        }
    }

    /**
     * 利用者管理情報の登録
     * @param userInfoDto
     */
    public async postUserInfoSearch (userInfoDto: UserInfoDto): Promise<any> {
        // 接続のためのオプションを生成
        const bodyStr: string = JSON.stringify(userInfoDto.getRequest<PostUserInfoReqDto>());
        const options: CoreOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(bodyStr),
                accept: 'application/json',
                session: encodeURIComponent(JSON.stringify(userInfoDto.getOperator()))
            },
            body: bodyStr
        };

        try {
            // postを実行
            const result = await doPostRequest(userInfoDto.getUrl() + '/user/info', options);

            // レスポンスコードが200以外の場合
            // ステータスコードを判定
            const statusCode: string = result.response.statusCode.toString();
            if (result.response.statusCode === ResponseCode.BAD_REQUEST) {
                // 応答が400の場合、エラーを返す
                throw new AppError(message.FAILED_GET_USER_INFORMATION, ResponseCode.BAD_REQUEST);
            } else if (statusCode.match(/^5.+/)) {
                // 応答が500系の場合、エラーを返す
                throw new AppError(message.FAILED_GET_USER_INFORMATION, ResponseCode.SERVICE_UNAVAILABLE);
            } else if (result.response.statusCode === ResponseCode.NO_CONTENT) {
                // 応答が204の場合、nullを返す
                return null;
            } else if (result.response.statusCode !== ResponseCode.OK) {
                // 応答が200以外の場合、エラーを返す
                throw new AppError(message.FAILED_GET_USER_INFORMATION, ResponseCode.UNAUTHORIZED);
            }
            return result.body;
        } catch (err) {
            if (err.name === AppError.NAME) {
                throw err;
            }
            // サービスへの接続に失敗した場合
            throw new AppError(message.FAILED_CONNECT_TO_OPERATOR, ResponseCode.SERVICE_UNAVAILABLE, err);
        }
    }
}
