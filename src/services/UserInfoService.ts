/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Service } from 'typedi';
import UserInfoServiceDto from './dto/UserInfoServiceDto';
import PostUserInfoSearchReqDto from '../resources/dto/PostUserInfoSearchReqDto';
import PostUserInfoReqDto from '../resources/dto/PostUserInfoReqDto';
import AppError from '../common/AppError';
import { ResponseCode } from '../common/ResponseCode';
import EntityOperation from '../repositories/EntityOperation';
/* eslint-enable */
import PostUserInfoSearchResDto from '../resources/dto/PostUserInfoSearchResDto';
import PostUserInfoResDto from '../resources/dto/PostUserInfoResDto';
import UserInfoDto from './dto/UserInfoDto';
import OperatorService from './OperatorService';
import Config from '../common/Config';
const message = Config.ReadConfig('./config/message.json');
const configure = Config.ReadConfig('./config/config.json');

@Service()
export default class UserInfoService {
    /**
     * 利用者管理情報による個人の特定
     * @param dto
     */
    public async getUserInfo (dto: UserInfoServiceDto): Promise<PostUserInfoSearchResDto> {
        // オペレーターサービスから利用者管理情報によるPXR-IDを取得
        const userInfoDto = new UserInfoDto();
        userInfoDto.setUrl(configure['operatorUrl']);
        userInfoDto.setOperator(dto.getOperator());
        userInfoDto.setRequest<PostUserInfoSearchReqDto[]>(dto.getRequest());
        const resUserInfo = await new OperatorService().getUserInfoSearch(userInfoDto);

        // レスポンスを返す
        const response = new PostUserInfoSearchResDto();
        response.setFromJson(resUserInfo);
        return response;
    }

    /**
     * 利用者管理情報の更新
     * @param dto
     */
    public async postUserInfo (dto: UserInfoServiceDto): Promise<PostUserInfoResDto> {
        const request: PostUserInfoReqDto = dto.getRequest();
        // pxrIdでBookを取得し、存在しなければエラー
        const myConditionBook = await EntityOperation.isPxrIdExists(request.pxrId);
        // MyConditionBookデータが存在しない場合
        if (!myConditionBook) {
            throw new AppError(message.TARGET_NO_DATA, ResponseCode.NOT_FOUND);
        }

        // オペレーターサービスに利用者管理情報を連携し登録
        const userInfoDto = new UserInfoDto();
        userInfoDto.setUrl(configure['operatorUrl']);
        userInfoDto.setOperator(dto.getOperator());
        userInfoDto.setRequest<PostUserInfoReqDto>(request);
        await new OperatorService().postUserInfoSearch(userInfoDto);

        // レスポンスを返す
        const response = new PostUserInfoResDto();
        response.result = 'success';
        return response;
    }
}
