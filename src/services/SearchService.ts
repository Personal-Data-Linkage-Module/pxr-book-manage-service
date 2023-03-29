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
import SearchServiceDto from './dto/SearchServiceDto';
import SearchUserServiceDto from './dto/SearchUserServiceDto';
import SearchCooperateServiceDto from './dto/SearchCooperateServiceDto';
import MyConditionBook from '../repositories/postgres/MyConditionBook';
import Operator from '../resources/dto/OperatorReqDto';
/* eslint-enable */
import EntityOperation from '../repositories/EntityOperation';
import PostSearchResDto from '../resources/dto/PostSearchResDto';
import PostSearchUserResDto from '../resources/dto/PostSearchUserResDto';
import PostSearchCooperateResDto from '../resources/dto/PostSearchCooperateResDto';
import AppError from '../common/AppError';
import { ResponseCode } from '../common/ResponseCode';
import OperatorService from './OperatorService';
import UserInfoDto from './dto/UserInfoDto';
import Config from '../common/Config';
const configure = Config.ReadConfig('./config/config.json');

@Service()
export default class SearchService {
    static readonly BOOK_STATUS_ENABLE: number = 0;
    static readonly BOOK_STATUS_FORCE_DELETION: number = 1;

    /**
     * My-Condition-Book一覧取得
     * @param dto
     */
    public async getMyConditionBookList (dto: SearchServiceDto): Promise<any> {
        const message = dto.getMessage();

        // Book一覧を取得
        const bookList = await EntityOperation.getConditionBookRecord(dto.getPxrIdList(), dto.getStart(), dto.getEnd(), dto.getDisableFlg(), dto.getOffset(), dto.getLimit(), dto.getIncludeDeleteCoop());
        if (!bookList || bookList.length <= 0) {
            // 対象データが存在しない場合、エラーを返す
            throw new AppError(message.TARGET_NO_DATA, ResponseCode.NO_CONTENT);
        }

        // 連携情報を取得
        let list = await this.getCooperation(bookList);

        // 利用者情報を取得
        list = await this.getUserInformation(list, dto.getOperator(), dto.getMessage(), dto.getDisableFlg());

        // レスポンスを生成
        const response = new PostSearchResDto();
        response.setFromJson(list);

        // レスポンスを返す
        return response;
    }

    /**
     * My-Condition-Book一覧取得
     * @param dto
     */
    public async getMyConditionBookFromUser (dto: SearchUserServiceDto): Promise<PostSearchUserResDto> {
        const message = dto.getMessage();

        // Book一覧を取得
        const bookList = await EntityOperation.getConditionBookRecordFromUser(dto.getUserId(), dto.getActor(), dto.getApp(), null);
        if (!bookList || bookList.length <= 0) {
            // 対象データが存在しない場合、エラーを返す
            throw new AppError(message.TARGET_NO_DATA, ResponseCode.NO_CONTENT);
        }

        // 連携情報を取得
        let list = await this.getCooperation(bookList);

        // 利用者情報を取得
        list = await this.getUserInformation(list, dto.getOperator(), dto.getMessage());

        // レスポンスを生成
        const response = new PostSearchUserResDto();
        response.setFromJson(list[0]);

        // レスポンスを返す
        return response;
    }

    /**
     * 利用者ID連携一覧取得
     * @param dto
     */
    public async getUserFromCooperate (dto: SearchCooperateServiceDto): Promise<PostSearchCooperateResDto> {
        // 利用者ID連携一覧を取得
        const users = await EntityOperation.getUserFromCooperate(dto.getActor(), dto.getApp(), null);
        // レスポンスを返す
        return new PostSearchCooperateResDto({
            actor: dto.getActor(),
            app: dto.getApp(),
            wf: null,
            users: users
        });
    }

    /**
     * 連携情報取得
     * @param bookList
     * リファクタ履歴
     *  separate : setCooperation（連携情報設定処理）
     */
    private async getCooperation (books: MyConditionBook[]): Promise<any[]> {
        const list: {}[] = [];
        let preBookId: number = null;
        for (const book of books) {
            const coop = this.setCooperation(book);
            if (preBookId === Number(book.id)) {
                let cooperation = list.length > 0 ? list[list.length - 1]['cooperation'] : [];
                if (!Array(cooperation)) {
                    cooperation = [];
                }
                cooperation.push(coop);
            } else {
                list.push({
                    id: book.id,
                    pxrId: book.pxrId,
                    status: book.forceDeletionFlag ? SearchService.BOOK_STATUS_FORCE_DELETION : SearchService.BOOK_STATUS_ENABLE,
                    bookStatus: book.status,
                    attribute: book.attributes,
                    cooperation: coop ? [coop] : null,
                    userInformation: null
                });
            }
            preBookId = Number(book.id);
        }
        return list;
    }

    /**
     * 連携情報設定
     * @param book
     * @returns
     */
    private setCooperation (book: MyConditionBook) {
        return book.userIdCooperate && book.userIdCooperate.id ? {
            actor: {
                _value: book.userIdCooperate.actorCatalogCode,
                _ver: book.userIdCooperate.actorCatalogVersion
            },
            userId: book.userIdCooperate.userId,
            startAt: book.userIdCooperate.startAt,
            status: book.userIdCooperate.status,
            region: book.userIdCooperate.regionCatalogCode ? {
                _value: book.userIdCooperate.regionCatalogCode,
                _ver: book.userIdCooperate.regionCatalogVersion
            } : null,
            app: book.userIdCooperate.appCatalogCode ? {
                _value: book.userIdCooperate.appCatalogCode,
                _ver: book.userIdCooperate.appCatalogVersion
            } : null
        } : null;
    }

    /**
     * 利用者情報取得
     * @param books
     * @param searchDto
     */
    private async getUserInformation (books: any[], operator: Operator, message: any, includeDeleted: boolean = false): Promise<any[]> {
        // オペレーターサービスの追加APIを使用し、type0のオペレーターを登録
        const operatorService = new OperatorService();
        const resBooks: any[] = [];
        const pxrIds: string[] = [];
        for (const book of books) {
            pxrIds.push(book['pxrId']);
        }
        // オペレーター追加のdtoにセット
        const userInfoDto = new UserInfoDto();
        userInfoDto.setUrl(configure['operatorUrl']);
        userInfoDto.setRequest({
            pxrId: pxrIds
        });
        userInfoDto.setOperator(operator);
        userInfoDto.setMessage(message);
        const resUserInfos: any[] = await operatorService.getUserInfoList(userInfoDto);
        for (const book of books) {
            let existsUserInfo = false;
            for (const resUserInfo of resUserInfos) {
                if (book['pxrId'] === resUserInfo['pxrId']) {
                    existsUserInfo = true;
                    book['userInformation'] = null;
                    if (resUserInfo) {
                        book['userInformation'] = resUserInfo['userInfo'] ? resUserInfo['userInfo'] : null;
                    }
                    resBooks.push(book);
                    break;
                }
            }
            if (includeDeleted && !existsUserInfo) {
                book['userInformation'] = null;
                resBooks.push(book);
            }
        }
        return resBooks;
    }
}
