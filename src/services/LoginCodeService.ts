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
import LoginCodeServiceDto from './dto/LoginCodeServiceDto';
import AppError from '../common/AppError';
/* eslint-enable */
import OperatorAddDto from './dto/OperatorAddDto';
import OperatorService from './OperatorService';
import GetLoginCodeResDto from '../resources/dto/GetLoginCodeResDto';
import Password from '../common/Password';
import urljoin = require('url-join');

@Service()
export default class LoginCodeService {
    /**
     * ログインコード再作成
     * @param loginCodeDto
     */
    public async reCreateLoginCode (loginCodeDto: LoginCodeServiceDto): Promise<any> {
        // メッセージを取得
        const message = loginCodeDto.getMessage();

        // オペレータを取得
        const operator = loginCodeDto.getOperator();

        // 設定ファイルを取得
        const config = loginCodeDto.getConfig();

        // オペレータ情報を取得
        let operatorDto = new OperatorAddDto();
        operatorDto.setUrl(urljoin(config['operatorUrl'], '?pxrId=' + loginCodeDto.getPxrId()));
        operatorDto.setMessage(message);
        operatorDto.setOperator(operator);
        operatorDto.setProcMode(0);
        const operatorService = new OperatorService();
        const operatorInfo = await operatorService.loginCodeProc(operatorDto);

        // 電話番号を取り出す
        const phoneNumber = operatorInfo.mobilePhone;
        if (!phoneNumber) {
            throw new AppError(message.OPERATOR_DONT_HAVE_MOBILE, 400);
        }

        // ランダムパスワードをハッシュ化(基12桁, SHA-256, SALT指定、ストレッチング5000回)
        const password: string = await Password.getRandomStr();
        const hashPassword: string = await Password.hashing(password);

        // パスワードを再作成
        operatorDto = new OperatorAddDto();
        operatorDto.setHpassword(hashPassword);
        operatorDto.setUrl(urljoin(config['operatorUrl'], 'password', operatorInfo['operatorId'].toString()));
        operatorDto.setMessage(message);
        operatorDto.setOperator(operator);
        operatorDto.setProcMode(2);
        await operatorService.loginCodeProc(operatorDto);

        // レスポンスを生成
        const response = new GetLoginCodeResDto();
        response.pxrId = loginCodeDto.getPxrId();
        response.resetPassword = password;

        // レスポンスを返す
        return response;
    }
}
