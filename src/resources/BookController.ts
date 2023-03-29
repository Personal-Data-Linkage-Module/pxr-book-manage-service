/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import { Request } from 'express';
import {
    JsonController, Get, Post, Put, Header, Req, UseBefore, Body, QueryParam, Param
} from 'routing-controllers';
import PostGetBookReqDto from './dto/PostGetBookReqDto';
import { transformAndValidate } from 'class-transformer-validator';
import EnableSimpleBackPressure from './backpressure/EnableSimpleBackPressure';
import OperatorService from '../services/OperatorService';
import PostGetBookRequestValidator from './validator/PostGetBookRequestValidator';
import BookServiceDto from '../services/dto/BookServiceDto';
import BookService from '../services/BookService';
import PutIndAppendixRequestValidator from './validator/PutIndAppendixRequestValidator';
import PutIndAppendixReqDto from './dto/PutIndAppendixReqDto';
import { OperatorType } from '../common/Operator';
import AppError from '../common/AppError';
import Config from '../common/Config';
import { ResponseCode } from '../common/ResponseCode';
/* eslint-enable */
const Message = Config.ReadConfig('./config/message.json');

/**
 * Book開設コントローラ
 */
@JsonController('/book-manage')
export default class BookController {
    /**
     * Book参照依頼
     */
    @Post('/book/search')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(PostGetBookRequestValidator)
    async postGetBook (@Req() req: Request) {
        // パラメータを取得
        let dto = await transformAndValidate(PostGetBookReqDto, req.body);
        dto = <PostGetBookReqDto>dto;

        // オペレーターセッション情報を取得
        const operator = await OperatorService.authMe(req);

        // BOOK参照オブジェクトを生成
        const bookDto = new BookServiceDto();
        bookDto.setOperator(operator);
        bookDto.setPxrId(operator.pxrId);
        bookDto.setType(dto.type);
        bookDto.setIdentifier(dto.identifier);
        bookDto.setUpdatedAt(dto.updatedAt);
        bookDto.setCondition(dto.condition);

        // サービス層のBOOK参照を実行
        const service: BookService = new BookService();
        const ret = await service.getBook(bookDto);
        return ret;
    }

    /**
     * Book取得（個人）（非推奨）
     * @param req
     * @deprecated 代わりに GET . を使用
     */
    @Get('/ind')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    async getIndBook (@Req() req: Request) {
        // オペレーター情報の取得
        const operator = await OperatorService.authMe(req);
        // オペレーターが個人でない場合エラー
        if (operator.type !== 0) {
            throw new AppError(Message.REQUEST_UNAUTORIZED, ResponseCode.UNAUTHORIZED);
        }
        const bookServiceDto = new BookServiceDto();
        bookServiceDto.setOperator(operator);

        // サービス層のBOOK参照を実行
        const bookService = new BookService();
        const response = await bookService.getIndBook(bookServiceDto);

        return response;
    }

    /**
     * Book取得（個人）
     * @param req
     */
    @Get()
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    async getBook (@Req() req: Request) {
        // オペレーター情報の取得
        const operator = await OperatorService.authMe(req);
        // オペレーターが個人でない場合エラー
        if (operator.type !== 0) {
            throw new AppError(Message.REQUEST_UNAUTORIZED, ResponseCode.UNAUTHORIZED);
        }
        const bookServiceDto = new BookServiceDto();
        bookServiceDto.setOperator(operator);

        // サービス層のBOOK参照を実行
        const bookService = new BookService();
        const response = await bookService.getIndBook(bookServiceDto);

        return response;
    }

    /**
     * appendix更新（個人）（非推奨）
     * @param req
     * @deprecated 代わりに PUT /appendix を使用
     */
    @Put('/ind/appendix')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @UseBefore(PutIndAppendixRequestValidator)
    async putIndAppendix (@Req() req:Request, @Body() body: PutIndAppendixReqDto) {
        // オペレーター情報の取得
        const operator = await OperatorService.authMe(req);

        const bookServiceDto = new BookServiceDto();
        bookServiceDto.setOperator(operator);
        bookServiceDto.setAppendix(body.appendix);

        // サービス層のBOOK参照を実行
        const response = await new BookService().updateIndAppendix(bookServiceDto);
        return response;
    }

    /**
     * appendix更新（個人）
     * @param req
     */
    @Put('/appendix')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @UseBefore(PutIndAppendixRequestValidator)
    async putAppendix (@Req() req:Request, @Body() body: PutIndAppendixReqDto) {
        // オペレーター情報の取得
        const operator = await OperatorService.authMe(req);

        const bookServiceDto = new BookServiceDto();
        bookServiceDto.setOperator(operator);
        bookServiceDto.setAppendix(body.appendix);

        // サービス層のBOOK参照を実行
        const response = await new BookService().updateIndAppendix(bookServiceDto);
        return response;
    }

    /**
     * 削除可能Book取得
     */
    @Get('/delete/target')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    async getDeleteTarget (@QueryParam('offset') offset: number, @QueryParam('limit') limit: number, @Req() req: Request) {
        // オペレーター情報の取得
        const operator = await OperatorService.authMe(req);
        if (operator.type !== OperatorType.TYPE_MANAGE_MEMBER) {
            // ログイン情報のtypeが3(運営メンバー)か確認する。それ以外の場合はエラー
            throw new AppError(Message.REQUEST_UNAUTORIZED, 400);
        }

        const bookServiceDto = new BookServiceDto();
        bookServiceDto.setOperator(operator);
        bookServiceDto.setOffset(offset);
        bookServiceDto.setLimit(limit);

        // サービス層のBOOK参照を実行
        const bookService = new BookService();
        const response = await bookService.getDeleteTargetBook(bookServiceDto);

        return response;
    }

    /**
     * Book削除予約
     */
    @Post('/reserve_deletion/:id')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    // SDE-MSA-PRIN 過負荷を回避する （MSA-PRIN-ID-02）
    @EnableSimpleBackPressure()
    async postReserveDeletion (@Req() req: Request, @Param('id') id: number): Promise<any> {
        // オペレーター情報の取得
        const operator = await OperatorService.authMe(req);
        if (operator.type !== OperatorType.TYPE_MANAGE_MEMBER) {
            // ログイン情報のtypeが3(運営メンバー)か確認する。それ以外の場合はエラー
            throw new AppError(Message.REQUEST_UNAUTORIZED, 400);
        }

        const bookServiceDto = new BookServiceDto();
        bookServiceDto.setOperator(operator);
        bookServiceDto.setBookId(id);

        // サービス層のBOOK参照を実行
        const bookService = new BookService();
        const response = await bookService.reserveDeletionBook(bookServiceDto);

        return response;
    }
}
