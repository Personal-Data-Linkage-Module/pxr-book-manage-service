/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import express = require('express');
import { JsonController, Get, Header, Post, QueryParam, Req, UseBefore, Body } from 'routing-controllers';
import EnableSimpleBackPressure from './backpressure/EnableSimpleBackPressure';
import OperatorService from '../services/OperatorService';
import { getConnection } from 'typeorm';
import AppError from '../common/AppError';
import DataOperation from '../repositories/postgres/DataOperation';
import DataOperationDataType from '../repositories/postgres/DataOperationDataType';
import moment = require('moment');
import TemporarilySharedCode from '../repositories/postgres/TemporarilySharedCode';
import GetTemporarilySharedCodesValidator from './validator/GetTemporarilySharedCodesValidator';
import CollationSharedCodeValidator from './validator/CollationSharedCodeValidator';
import CollationSharedCode from './dto/CollationSharedCode';
import IssuanceTemporarilySharedCode from './dto/IssuanceTemporarilySharedCode';
import IssuanceTemporarilySharedCodeValidator from './validator/IssuanceTemporarilySharedCodeValidator';
import config = require('config');
import CatalogService from '../services/CatalogService';
import Config from '../common/Config';
import { CodeObject } from './dto/PostBookOpenReqDto';
import { sprintf } from 'sprintf-js';
import MyConditionBook from '../repositories/postgres/MyConditionBook';
import Base from '../domains/catalog/Base';
import Actor from '../domains/catalog/Actor';
import CTokenLedgerDto from '../services/dto/CTokenLedgerDto';
import CatalogDto from '../services/dto/CatalogDto';
import CTokenLedgerService from '../services/CTokenLedgerService';
import DetaOperationData from '../repositories/postgres/DetaOperationData';
import { ResponseCode } from '../common/ResponseCode';
const Configure = Config.ReadConfig('./config/config.json');
const Message = Config.ReadConfig('./config/message.json');
/* eslint-enable */

@JsonController('/book-manage')
export default class {
    /**
     * 一時的データ共有コード取得（非推奨）
     * @deprecated 代わりに GET /share/temp を使用
     */
    @Get('/ind/share/temp')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(GetTemporarilySharedCodesValidator)
    async get (@QueryParam('expiration') flag: boolean = false, @Req() req: express.Request) {
        const operator = await OperatorService.authMe(req);
        if (!operator.pxrId) {
            throw new AppError(Message.PXR_USER_ONLY, 400);
        }
        const myBook = await getConnection('postgres').getRepository(MyConditionBook).findOne({
            pxrId: operator.pxrId,
            isDisabled: false
        });
        if (!myBook) {
            throw new AppError(Message.CAN_NOT_FIND_BOOK, 400);
        }

        const result = [];
        const dataOperateDefinitions = await getConnection('postgres').getRepository(DataOperation).find({
            order: {
                id: 'ASC'
            },
            where: {
                bookId: myBook.id,
                type: 'temp',
                isDisabled: false
            }
        });
        for (const dataOperateDefinition of dataOperateDefinitions) {
            const temporaryCode = await getConnection('postgres').getRepository(TemporarilySharedCode).findOne({
                dataOperateDefinitionId: dataOperateDefinition.id,
                isDisabled: false
            });
            // 一時的共有コードが取得できなかった場合
            if (!temporaryCode) {
                // 処理をスキップ
                continue;
            }

            // 有効期限切れを含むかの制御フラグを確認
            // 有効期限切れを含まない場合、現在日時より過去であればスキップする
            if (!flag && temporaryCode.expireAt.getTime() < new Date().getTime()) {
                continue;
            }
            const dataOperateDefinitionType = await getConnection('postgres').getRepository(DataOperationDataType).find({
                order: {
                    id: 'ASC'
                },
                where: {
                    dataOperationId: dataOperateDefinition.id,
                    isDisabled: false
                }
            });

            const dataOperateDefinitionData = await getConnection('postgres').getRepository(DetaOperationData).find({
                order: {
                    type: 'ASC'
                },
                where: {
                    dataOperationId: dataOperateDefinition.id,
                    isDisabled: false
                }
            });

            const res: any = {
                id: 0,
                tempShareCode: '',
                actor: { _value: 0 },
                wf: undefined,
                app: { _value: 0 },
                expireAt: ''
            };
            if (dataOperateDefinitionType && dataOperateDefinitionType.length > 0) {
                res.document = [] as CodeObject[];
                res.event = [] as CodeObject[];
                res.thing = [] as CodeObject[];
                for (const defineType of dataOperateDefinitionType) {
                    if (defineType.documentCatalogCode) {
                        const codeObject = {
                            _value: Number(defineType.documentCatalogCode),
                            _ver: Number(defineType.documentCatalogVersion)
                        };
                        res.document.push(codeObject);
                    }
                    if (defineType.eventCatalogCode) {
                        const codeObject = {
                            _value: Number(defineType.eventCatalogCode),
                            _ver: Number(defineType.eventCatalogVersion)
                        };
                        res.event.push(codeObject);
                    }
                    if (defineType.thingCatalogCode) {
                        const codeObject = {
                            _value: Number(defineType.thingCatalogCode),
                            _ver: Number(defineType.thingCatalogVersion)
                        };
                        res.thing.push(codeObject);
                    }
                }
            }
            if (dataOperateDefinitionData && dataOperateDefinitionData.length > 0) {
                res.identifier = [];
                for (const defineData of dataOperateDefinitionData) {
                    if (defineData.type === 1) {
                        // ドキュメント
                        const identifier: any = {
                            document: defineData.identifier,
                            event: [],
                            thing: []
                        };
                        res.identifier.push(identifier);
                    } else if (defineData.type === 2) {
                        // イベント
                        const identifier: any = res.identifier.find((ident: any) => {
                            return ident.document && ident.document === defineData.parentDataId;
                        }) ||
                        {
                            event: defineData.identifier,
                            thing: []
                        };
                        if (typeof identifier.event === 'string') {
                            res.identifier.push(identifier);
                        } else {
                            identifier.event.push(defineData.identifier);
                        }
                    } else if (defineData.type === 3) {
                        // モノ
                        let identifier: any = res.identifier.find((ident: any) => {
                            return (ident.document && ident.document === defineData.parentDataId) ||
                                (typeof ident.event === 'string' && ident.event === defineData.parentDataId);
                        }) ||
                            res.identifier.find((ident: any) => {
                                return !ident.document && !ident.event;
                            });
                        if (identifier) {
                            identifier.thing.push(defineData.identifier);
                        } else {
                            identifier = {
                                thing: [defineData.identifier]
                            };
                            res.identifier.push(identifier);
                        }
                    }
                }
            }
            res.id = parseInt(dataOperateDefinition.id + '');
            res.tempShareCode = temporaryCode.id;
            res.actor._value = parseInt(dataOperateDefinition.actorCatalogCode + '');
            const { wfCatalogCode, appCatalogCode } = dataOperateDefinition;
            if (wfCatalogCode || !appCatalogCode) {
                // サポート対象外：WF
                throw new AppError(Message.UNSUPPORTED_ACTOR, ResponseCode.BAD_REQUEST);
            }
            res.app._value = parseInt(appCatalogCode + '');
            res.expireAt = moment(temporaryCode.expireAt).tz(config.get('date.timezone')).format();

            result.push(res);
        }

        return result;
    }

    /**
     * 一時的データ共有コード取得
     */
    @Get('/share/temp')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(GetTemporarilySharedCodesValidator)
    async getShareTemp (@QueryParam('expiration') flag: boolean = false, @Req() req: express.Request) {
        const operator = await OperatorService.authMe(req);
        if (!operator.pxrId) {
            throw new AppError(Message.PXR_USER_ONLY, 400);
        }
        const myBook = await getConnection('postgres').getRepository(MyConditionBook).findOne({
            pxrId: operator.pxrId,
            isDisabled: false
        });
        if (!myBook) {
            throw new AppError(Message.CAN_NOT_FIND_BOOK, 400);
        }

        const result = [];
        const dataOperateDefinitions = await getConnection('postgres').getRepository(DataOperation).find({
            order: {
                id: 'ASC'
            },
            where: {
                bookId: myBook.id,
                type: 'temp',
                isDisabled: false
            }
        });
        for (const dataOperateDefinition of dataOperateDefinitions) {
            const temporaryCode = await getConnection('postgres').getRepository(TemporarilySharedCode).findOne({
                dataOperateDefinitionId: dataOperateDefinition.id,
                isDisabled: false
            });
            // 一時的共有コードが取得できなかった場合
            if (!temporaryCode) {
                // 処理をスキップ
                continue;
            }

            // 有効期限切れを含むかの制御フラグを確認
            // 有効期限切れを含まない場合、現在日時より過去であればスキップする
            if (!flag && temporaryCode.expireAt.getTime() < new Date().getTime()) {
                continue;
            }
            const dataOperateDefinitionType = await getConnection('postgres').getRepository(DataOperationDataType).find({
                order: {
                    id: 'ASC'
                },
                where: {
                    dataOperationId: dataOperateDefinition.id,
                    isDisabled: false
                }
            });

            const dataOperateDefinitionData = await getConnection('postgres').getRepository(DetaOperationData).find({
                order: {
                    type: 'ASC'
                },
                where: {
                    dataOperationId: dataOperateDefinition.id,
                    isDisabled: false
                }
            });

            const res: any = {
                id: 0,
                tempShareCode: '',
                actor: { _value: 0 },
                wf: undefined,
                app: { _value: 0 },
                expireAt: ''
            };
            if (dataOperateDefinitionType && dataOperateDefinitionType.length > 0) {
                res.document = [] as CodeObject[];
                res.event = [] as CodeObject[];
                res.thing = [] as CodeObject[];
                for (const defineType of dataOperateDefinitionType) {
                    if (defineType.documentCatalogCode) {
                        const codeObject = {
                            _value: Number(defineType.documentCatalogCode),
                            _ver: Number(defineType.documentCatalogVersion)
                        };
                        res.document.push(codeObject);
                    }
                    if (defineType.eventCatalogCode) {
                        const codeObject = {
                            _value: Number(defineType.eventCatalogCode),
                            _ver: Number(defineType.eventCatalogVersion)
                        };
                        res.event.push(codeObject);
                    }
                    if (defineType.thingCatalogCode) {
                        const codeObject = {
                            _value: Number(defineType.thingCatalogCode),
                            _ver: Number(defineType.thingCatalogVersion)
                        };
                        res.thing.push(codeObject);
                    }
                }
            }
            if (dataOperateDefinitionData && dataOperateDefinitionData.length > 0) {
                res.identifier = [];
                for (const defineData of dataOperateDefinitionData) {
                    if (defineData.type === 1) {
                        // ドキュメント
                        const identifier: any = {
                            document: defineData.identifier,
                            event: [],
                            thing: []
                        };
                        res.identifier.push(identifier);
                    } else if (defineData.type === 2) {
                        // イベント
                        const identifier: any = res.identifier.find((ident: any) => {
                            return ident.document && ident.document === defineData.parentDataId;
                        }) ||
                        {
                            event: defineData.identifier,
                            thing: []
                        };
                        if (typeof identifier.event === 'string') {
                            res.identifier.push(identifier);
                        } else {
                            identifier.event.push(defineData.identifier);
                        }
                    } else if (defineData.type === 3) {
                        // モノ
                        let identifier: any = res.identifier.find((ident: any) => {
                            return (ident.document && ident.document === defineData.parentDataId) ||
                                (typeof ident.event === 'string' && ident.event === defineData.parentDataId);
                        }) ||
                            res.identifier.find((ident: any) => {
                                return !ident.document && !ident.event;
                            });
                        if (identifier) {
                            identifier.thing.push(defineData.identifier);
                        } else {
                            identifier = {
                                thing: [defineData.identifier]
                            };
                            res.identifier.push(identifier);
                        }
                    }
                }
            }
            res.id = parseInt(dataOperateDefinition.id + '');
            res.tempShareCode = temporaryCode.id;
            res.actor._value = parseInt(dataOperateDefinition.actorCatalogCode + '');
            const { wfCatalogCode, appCatalogCode } = dataOperateDefinition;
            if (wfCatalogCode || !appCatalogCode) {
                // サポート対象外：WF
                throw new AppError(Message.UNSUPPORTED_ACTOR, ResponseCode.BAD_REQUEST);
            }
            res.app._value = parseInt(appCatalogCode + '');
            res.expireAt = moment(temporaryCode.expireAt).tz(config.get('date.timezone')).format();

            result.push(res);
        }

        return result;
    }

    /**
     * 一時的データ共有コード生成（非推奨）
     * @deprecated 代わりに POST /share/temp を使用
     */
    @Post('/ind/share/temp')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(IssuanceTemporarilySharedCodeValidator)
    async post (@Body() dto: IssuanceTemporarilySharedCode, @Req() req: express.Request) {
        const operator = await OperatorService.authMe(req);
        if (!operator.pxrId) {
            throw new AppError(Message.PXR_USER_ONLY, 400);
        }
        // リクエストされたコードをオブジェクト化
        let codeProperties = {};
        if (dto.document || dto.event || dto.thing) {
            codeProperties = {
                document: dto.document,
                thing: dto.thing,
                event: dto.event
            };
        }

        const cTokenService = new CTokenLedgerService();
        const ctokenDto = new CTokenLedgerDto();
        ctokenDto.setUrl(Configure.ctokenLedgerUrl);
        ctokenDto.setOperatorDomain(operator);
        ctokenDto.setConfigure(Configure);
        ctokenDto.setMessage(Message);
        let target: any;
        for (const property in codeProperties) {
            if (!codeProperties[property] || codeProperties[property].length === 0) {
                dto[property] = null;
                continue;
            }
            // コード指定
            const codes = codeProperties[property] as CodeObject[];
            ctokenDto.setType(property);
            ctokenDto.setData(codes);
            const cToken = await cTokenService.postGetCToken(ctokenDto);
            const checkRes = await this.checkCTokenData(cToken, dto);
            if (!checkRes) {
                // 絞り込めなかった場合、カタログコードをnullとして扱う
                codeProperties[property] = [];
                dto[property] = null;
            } else {
                target = checkRes;
            }
        }
        ctokenDto.setType(null);
        ctokenDto.setData(null);
        if (dto.identifier) {
            // 識別子指定
            for (const identifier of dto.identifier) {
                for (const property in identifier) {
                    const ident = identifier[property] as string | string[];
                    if (!ident || ident.length === 0) {
                        continue;
                    }
                    ctokenDto.setType(property);
                    ctokenDto.setDataIdentifier(Array.isArray(ident) ? ident : [ident]);
                    const cToken = await cTokenService.postGetCToken(ctokenDto);
                    const checkRes = await this.checkCTokenData(cToken, dto);
                    target = target || checkRes;
                }
            }
        }

        // My-Condition-Bookが開設済みでなければ、エラーとする
        const myBook = await getConnection('postgres').getRepository(MyConditionBook).findOne({
            pxrId: operator.pxrId,
            isDisabled: false
        });
        if (!myBook) {
            throw new AppError(Message.CAN_NOT_FIND_BOOK, 400);
        }

        // 更新処理フラグ
        let isUpdated = false;
        // 操作定義を発行する
        const definitionRepository = getConnection('postgres').getRepository(DataOperation);
        let operateDefinition = await (async () => {
            const appCatalog = await CatalogService.getCatalogNonFail(target.app ? target.app._value : null, operator) as Base;
            if (!appCatalog) {
                throw new AppError(Message.CAN_NOT_FOUND_APP_AND_WF, 400);
            }
            const actorCatalog = await CatalogService.getActorCatalog(target.actor._value, operator) as Actor;
            if (actorCatalog.template.workflow) {
                // サポート対象外：WF
                throw new AppError(Message.UNSUPPORTED_ACTOR, ResponseCode.BAD_REQUEST);
            }
            const appCatalogArray = actorCatalog.template.application;
            if (appCatalogArray && appCatalog && !appCatalogArray.some(item => item._value === appCatalog.catalogItem._code._value)) {
                throw new AppError(Message.REQUEST_APPLICATION_IS_NOT_RELATION, 400);
            }
            const e: DataOperation = await getConnection('postgres').getRepository(DataOperation).findOne({
                bookId: myBook.id,
                type: 'temp',
                actorCatalogCode: target.actor._value,
                appCatalogCode: target.app._value,
                isDisabled: false
            }) || new DataOperation();
            isUpdated = Boolean(e.id);
            e.bookId = myBook.id;
            e.type = 'temp';
            e.operationCatalogCode = target.app._value;
            e.actorCatalogCode = target.actor._value;
            e.actorCatalogVersion = target.actor._ver;
            e.wfCatalogCode = null;
            e.wfCatalogVersion = null;
            e.appCatalogCode = target.app ? target.app._value : null;
            e.appCatalogVersion = target.app ? target.app._ver : null;
            e.attributes = null;
            e.regionUseId = null;
            e.createdBy = e.createdBy || operator.loginId;
            e.updatedBy = operator.loginId;
            return e;
        })();

        // カタログから必要なコード配列を取得する
        const catalogDto = new CatalogDto();
        catalogDto.setOperatorDomain(operator);
        catalogDto.setMessage(Message);
        catalogDto.setUrl(Configure.catalogUrl);
        const extName = await new CatalogService().getExtName(catalogDto);
        // ドキュメントを取得
        const documentResult: any[] = [];
        const documentNs = await CatalogService.getNs(`catalog/ext/${extName}/document/`, operator);
        for (const ns of documentNs) {
            const catalogList = await CatalogService.getArrayOfItemsCodeObj(ns['ns'], operator);
            documentResult.push(...catalogList);
        }
        // イベントを取得
        const eventResult: any[] = [];
        const eventNs = await CatalogService.getNs(`catalog/ext/${extName}/event/`, operator);
        for (const ns of eventNs) {
            const catalogList = await CatalogService.getArrayOfItemsCodeObj(ns['ns'], operator);
            eventResult.push(...catalogList);
        }
        // モノを取得
        const thingResult: any[] = [];
        const thingNs = await CatalogService.getNs(`catalog/ext/${extName}/thing/`, operator);
        for (const ns of thingNs) {
            const catalogList = await CatalogService.getArrayOfItemsCodeObj(ns['ns'], operator);
            thingResult.push(...catalogList);
        }
        const catalogCodeProperties = {
            document: documentResult,
            event: eventResult,
            thing: thingResult
        };

        // データ定義エンティティを生成する
        const dataTypeDefinitions: DataOperationDataType[] = [];
        for (const property in codeProperties) {
            const codes = codeProperties[property] as CodeObject[];
            for (const elem of codes) {
                // ドキュメント、イベント、モノカタログ以外の場合はエラー
                if (!catalogCodeProperties[property].some((codeObj: any) => codeObj._value === elem._value && codeObj._ver === elem._ver)) {
                    throw new AppError(
                        sprintf(
                            Message[property.toLocaleUpperCase() + '_CODE_IS_NOT_ALLOWED_FOR_SHARE'],
                            elem._value
                        ),
                        400
                    );
                }
                const entity = new DataOperationDataType();
                if (property === 'document') {
                    entity.documentCatalogCode = elem._value;
                    entity.documentCatalogVersion = elem._ver;
                } else if (property === 'event') {
                    entity.eventCatalogCode = elem._value;
                    entity.eventCatalogVersion = elem._ver;
                } else if (property === 'thing') {
                    entity.thingCatalogCode = elem._value;
                    entity.thingCatalogVersion = elem._ver;
                }
                entity.createdBy = operator.loginId;
                entity.updatedBy = operator.loginId;
                dataTypeDefinitions.push(entity);
            }
        }

        // データ定義データエンティティを生成する
        const dataDataDefinitions: DetaOperationData[] = [];
        const dataType = { document: 1, event: 2, thing: 3 };
        if (dto.identifier) {
            for (const identifier of dto.identifier) {
                for (const property in identifier) {
                    const ident = identifier[property] as string | string[];
                    let parentDataId: string = null;
                    if (identifier.document && property !== 'document') {
                        parentDataId = identifier.document;
                    } else if (identifier.event && property === 'thing') {
                        parentDataId = typeof identifier.event === 'string' ? identifier.event : null;
                    }
                    if (Array.isArray(ident)) {
                        ident.forEach(id => {
                            const entity = new DetaOperationData();
                            entity.parentDataId = parentDataId;
                            entity.identifier = id;
                            entity.type = dataType[property];
                            entity.attributes = null;
                            entity.createdBy = operator.loginId;
                            entity.updatedBy = operator.loginId;
                            dataDataDefinitions.push(entity);
                        });
                    } else {
                        const entity = new DetaOperationData();
                        entity.parentDataId = parentDataId;
                        entity.identifier = ident;
                        entity.type = dataType[property];
                        entity.attributes = null;
                        entity.createdBy = operator.loginId;
                        entity.updatedBy = operator.loginId;
                        dataDataDefinitions.push(entity);
                    }
                }
            }
        }

        const dataDataRepository = getConnection('postgres').getRepository(DetaOperationData);
        const dataTypeRepository = getConnection('postgres').getRepository(DataOperationDataType);
        const temporarySharedRepository = getConnection('postgres').getRepository(TemporarilySharedCode);

        // 操作定義が登録済み（今回のリクエストが登録済みのレコードに対する更新処理）の場合
        // 既に紐づけされた登録済みのデータ操作定義 種別、データレコードおよび一時的データ共有コードレコードを全部消す（論理削除）
        if (isUpdated) {
            await dataDataRepository.update({ dataOperationId: operateDefinition.id }, { isDisabled: true });
            await dataTypeRepository.update({ dataOperationId: operateDefinition.id }, { isDisabled: true });
            await temporarySharedRepository.update({ dataOperateDefinitionId: operateDefinition.id }, { isDisabled: true });
        }

        // それぞれ登録する
        operateDefinition = await definitionRepository.save(operateDefinition);
        dataTypeDefinitions.forEach(elem => (elem.dataOperationId = operateDefinition.id));
        dataDataDefinitions.forEach(elem => (elem.dataOperationId = operateDefinition.id));
        await dataTypeRepository.save(dataTypeDefinitions);
        await dataDataRepository.save(dataDataDefinitions);
        const codeEntity = await temporarySharedRepository.save({
            dataOperateDefinitionId: operateDefinition.id,
            expireAt: moment().add('7', 'days').toDate(),
            updatedBy: operator.loginId,
            createdBy: operator.loginId
        } as TemporarilySharedCode);

        // レスポンスを返却する
        const result = dto as any;
        result.tempShareCode = codeEntity.id;
        result.expireAt = moment(codeEntity.expireAt).tz(config.get('date.timezone')).format();
        return result;
    }

    /**
     * 一時的データ共有コード生成
     */
    @Post('/share/temp')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(IssuanceTemporarilySharedCodeValidator)
    async postShareTemp (@Body() dto: IssuanceTemporarilySharedCode, @Req() req: express.Request) {
        const operator = await OperatorService.authMe(req);
        if (!operator.pxrId) {
            throw new AppError(Message.PXR_USER_ONLY, 400);
        }
        // リクエストされたコードをオブジェクト化
        let codeProperties = {};
        if (dto.document || dto.event || dto.thing) {
            codeProperties = {
                document: dto.document,
                thing: dto.thing,
                event: dto.event
            };
        }

        const cTokenService = new CTokenLedgerService();
        const ctokenDto = new CTokenLedgerDto();
        ctokenDto.setUrl(Configure.ctokenLedgerUrl);
        ctokenDto.setOperatorDomain(operator);
        ctokenDto.setConfigure(Configure);
        ctokenDto.setMessage(Message);
        let target: any;
        for (const property in codeProperties) {
            if (!codeProperties[property] || codeProperties[property].length === 0) {
                dto[property] = null;
                continue;
            }
            // コード指定
            const codes = codeProperties[property] as CodeObject[];
            ctokenDto.setType(property);
            ctokenDto.setData(codes);
            const cToken = await cTokenService.postGetCToken(ctokenDto);
            const checkRes = await this.checkCTokenData(cToken, dto);
            if (!checkRes) {
                // 絞り込めなかった場合、カタログコードをnullとして扱う
                codeProperties[property] = [];
                dto[property] = null;
            } else {
                target = checkRes;
            }
        }
        ctokenDto.setType(null);
        ctokenDto.setData(null);
        if (dto.identifier) {
            // 識別子指定
            for (const identifier of dto.identifier) {
                for (const property in identifier) {
                    const ident = identifier[property] as string | string[];
                    if (!ident || ident.length === 0) {
                        continue;
                    }
                    ctokenDto.setType(property);
                    ctokenDto.setDataIdentifier(Array.isArray(ident) ? ident : [ident]);
                    const cToken = await cTokenService.postGetCToken(ctokenDto);
                    const checkRes = await this.checkCTokenData(cToken, dto);
                    target = target || checkRes;
                }
            }
        }

        // My-Condition-Bookが開設済みでなければ、エラーとする
        const myBook = await getConnection('postgres').getRepository(MyConditionBook).findOne({
            pxrId: operator.pxrId,
            isDisabled: false
        });
        if (!myBook) {
            throw new AppError(Message.CAN_NOT_FIND_BOOK, 400);
        }

        // 更新処理フラグ
        let isUpdated = false;
        // 操作定義を発行する
        const definitionRepository = getConnection('postgres').getRepository(DataOperation);
        let operateDefinition = await (async () => {
            const appCatalog = await CatalogService.getCatalogNonFail(target.app ? target.app._value : null, operator) as Base;
            if (!appCatalog) {
                throw new AppError(Message.CAN_NOT_FOUND_APP_AND_WF, 400);
            }
            const actorCatalog = await CatalogService.getActorCatalog(target.actor._value, operator) as Actor;
            if (actorCatalog.template.workflow) {
                // サポート対象外：WF
                throw new AppError(Message.UNSUPPORTED_ACTOR, ResponseCode.BAD_REQUEST);
            }
            const appCatalogArray = actorCatalog.template.application;
            if (appCatalogArray && appCatalog && !appCatalogArray.some(item => item._value === appCatalog.catalogItem._code._value)) {
                throw new AppError(Message.REQUEST_APPLICATION_IS_NOT_RELATION, 400);
            }
            const e: DataOperation = await getConnection('postgres').getRepository(DataOperation).findOne({
                bookId: myBook.id,
                type: 'temp',
                actorCatalogCode: target.actor._value,
                appCatalogCode: target.app._value,
                isDisabled: false
            }) || new DataOperation();

            isUpdated = Boolean(e.id);
            e.bookId = myBook.id;
            e.type = 'temp';
            e.operationCatalogCode = target.app._value;
            e.actorCatalogCode = target.actor._value;
            e.actorCatalogVersion = target.actor._ver;
            e.wfCatalogCode = null;
            e.wfCatalogVersion = null;
            e.appCatalogCode = target.app ? target.app._value : null;
            e.appCatalogVersion = target.app ? target.app._ver : null;
            e.attributes = null;
            e.regionUseId = null;
            e.createdBy = e.createdBy || operator.loginId;
            e.updatedBy = operator.loginId;
            return e;
        })();

        // カタログから必要なコード配列を取得する
        const catalogDto = new CatalogDto();
        catalogDto.setOperatorDomain(operator);
        catalogDto.setMessage(Message);
        catalogDto.setUrl(Configure.catalogUrl);
        const extName = await new CatalogService().getExtName(catalogDto);
        // ドキュメントを取得
        const documentResult: any[] = [];
        const documentNs = await CatalogService.getNs(`catalog/ext/${extName}/document/`, operator);
        for (const ns of documentNs) {
            const catalogList = await CatalogService.getArrayOfItemsCodeObj(ns['ns'], operator);
            documentResult.push(...catalogList);
        }
        // イベントを取得
        const eventResult: any[] = [];
        const eventNs = await CatalogService.getNs(`catalog/ext/${extName}/event/`, operator);
        for (const ns of eventNs) {
            const catalogList = await CatalogService.getArrayOfItemsCodeObj(ns['ns'], operator);
            eventResult.push(...catalogList);
        }
        // モノを取得
        const thingResult: any[] = [];
        const thingNs = await CatalogService.getNs(`catalog/ext/${extName}/thing/`, operator);
        for (const ns of thingNs) {
            const catalogList = await CatalogService.getArrayOfItemsCodeObj(ns['ns'], operator);
            thingResult.push(...catalogList);
        }
        const catalogCodeProperties = {
            document: documentResult,
            event: eventResult,
            thing: thingResult
        };

        // データ定義エンティティを生成する
        const dataTypeDefinitions: DataOperationDataType[] = [];
        for (const property in codeProperties) {
            const codes = codeProperties[property] as CodeObject[];
            for (const elem of codes) {
                // ドキュメント、イベント、モノカタログ以外の場合はエラー
                if (!catalogCodeProperties[property].some((codeObj: any) => codeObj._value === elem._value && codeObj._ver === elem._ver)) {
                    throw new AppError(
                        sprintf(
                            Message[property.toLocaleUpperCase() + '_CODE_IS_NOT_ALLOWED_FOR_SHARE'],
                            elem._value
                        ),
                        400
                    );
                }
                const entity = new DataOperationDataType();
                if (property === 'document') {
                    entity.documentCatalogCode = elem._value;
                    entity.documentCatalogVersion = elem._ver;
                } else if (property === 'event') {
                    entity.eventCatalogCode = elem._value;
                    entity.eventCatalogVersion = elem._ver;
                } else if (property === 'thing') {
                    entity.thingCatalogCode = elem._value;
                    entity.thingCatalogVersion = elem._ver;
                }
                entity.createdBy = operator.loginId;
                entity.updatedBy = operator.loginId;
                dataTypeDefinitions.push(entity);
            }
        }

        // データ定義データエンティティを生成する
        const dataDataDefinitions: DetaOperationData[] = [];
        const dataType = { document: 1, event: 2, thing: 3 };
        if (dto.identifier) {
            for (const identifier of dto.identifier) {
                for (const property in identifier) {
                    const ident = identifier[property] as string | string[];
                    let parentDataId: string = null;
                    if (identifier.document && property !== 'document') {
                        parentDataId = identifier.document;
                    } else if (identifier.event && property === 'thing') {
                        parentDataId = typeof identifier.event === 'string' ? identifier.event : null;
                    }
                    if (Array.isArray(ident)) {
                        ident.forEach(id => {
                            const entity = new DetaOperationData();
                            entity.parentDataId = parentDataId;
                            entity.identifier = id;
                            entity.type = dataType[property];
                            entity.attributes = null;
                            entity.createdBy = operator.loginId;
                            entity.updatedBy = operator.loginId;
                            dataDataDefinitions.push(entity);
                        });
                    } else {
                        const entity = new DetaOperationData();
                        entity.parentDataId = parentDataId;
                        entity.identifier = ident;
                        entity.type = dataType[property];
                        entity.attributes = null;
                        entity.createdBy = operator.loginId;
                        entity.updatedBy = operator.loginId;
                        dataDataDefinitions.push(entity);
                    }
                }
            }
        }

        const dataDataRepository = getConnection('postgres').getRepository(DetaOperationData);
        const dataTypeRepository = getConnection('postgres').getRepository(DataOperationDataType);
        const temporarySharedRepository = getConnection('postgres').getRepository(TemporarilySharedCode);

        // 操作定義が登録済み（今回のリクエストが登録済みのレコードに対する更新処理）の場合
        // 既に紐づけされた登録済みのデータ操作定義 種別、データレコードおよび一時的データ共有コードレコードを全部消す（論理削除）
        if (isUpdated) {
            await dataDataRepository.update({ dataOperationId: operateDefinition.id }, { isDisabled: true });
            await dataTypeRepository.update({ dataOperationId: operateDefinition.id }, { isDisabled: true });
            await temporarySharedRepository.update({ dataOperateDefinitionId: operateDefinition.id }, { isDisabled: true });
        }

        // それぞれ登録する
        operateDefinition = await definitionRepository.save(operateDefinition);
        dataTypeDefinitions.forEach(elem => (elem.dataOperationId = operateDefinition.id));
        dataDataDefinitions.forEach(elem => (elem.dataOperationId = operateDefinition.id));
        await dataTypeRepository.save(dataTypeDefinitions);
        await dataDataRepository.save(dataDataDefinitions);
        const codeEntity = await temporarySharedRepository.save({
            dataOperateDefinitionId: operateDefinition.id,
            expireAt: moment().add('7', 'days').toDate(),
            updatedBy: operator.loginId,
            createdBy: operator.loginId
        } as TemporarilySharedCode);

        // レスポンスを返却する
        const result = dto as any;
        result.tempShareCode = codeEntity.id;
        result.expireAt = moment(codeEntity.expireAt).tz(config.get('date.timezone')).format();
        return result;
    }

    /**
     * 一時的データ共有コード照合
     */
    @Post('/share/temp/collation')
    @Header('X-Content-Type-Options', 'nosniff')
    @Header('X-XSS-Protection', '1; mode=block')
    @Header('X-Frame-Options', 'deny')
    @EnableSimpleBackPressure()
    @UseBefore(CollationSharedCodeValidator)
    async collation (@Body() dto: CollationSharedCode, @Req() req: express.Request) {
        await OperatorService.authMe(req);
        const entity = await getConnection('postgres').getRepository(TemporarilySharedCode).findOne({
            id: dto.tempShareCode,
            isDisabled: false
        });
        if (!entity) {
            throw new AppError(Message.NOT_FOUND_REQUESTED_SHARED_CODE, 400);
        }
        if (entity.expireAt.getTime() < new Date().getTime()) {
            throw new AppError(Message.EXPIRE_SHARE_CODE, 400);
        }
        const dataOperateDefinition = await getConnection('postgres').getRepository(DataOperation).findOne({
            id: entity.dataOperateDefinitionId,
            type: 'temp',
            isDisabled: false
        });
        const dataOperateDefinitionType = await getConnection('postgres').getRepository(DataOperationDataType).find({
            dataOperationId: dataOperateDefinition.id,
            isDisabled: false
        });
        const dataOperateDefinitionData = await getConnection('postgres').getRepository(DetaOperationData).find({
            order: {
                type: 'ASC'
            },
            where: {
                dataOperationId: dataOperateDefinition.id,
                isDisabled: false
            }
        });
        const myConditionBook = await getConnection('postgres').getRepository(MyConditionBook).findOne({
            id: Number(dataOperateDefinition.bookId)
        });

        const res: any = {
            id: 0,
            status: 0,
            pxrId: '',
            actor: { _value: 0 },
            wf: undefined,
            app: { _value: 0 }
        };

        if (dataOperateDefinitionType && dataOperateDefinitionType.length > 0) {
            res.document = [] as CodeObject[];
            res.event = [] as CodeObject[];
            res.thing = [] as CodeObject[];
            for (const defineType of dataOperateDefinitionType) {
                if (defineType.documentCatalogCode) {
                    const codeObject = {
                        _value: Number(defineType.documentCatalogCode),
                        _ver: Number(defineType.documentCatalogVersion)
                    };
                    res.document.push(codeObject);
                }
                if (defineType.eventCatalogCode) {
                    const codeObject = {
                        _value: Number(defineType.eventCatalogCode),
                        _ver: Number(defineType.eventCatalogVersion)
                    };
                    res.event.push(codeObject);
                }
                if (defineType.thingCatalogCode) {
                    const codeObject = {
                        _value: Number(defineType.thingCatalogCode),
                        _ver: Number(defineType.thingCatalogVersion)
                    };
                    res.thing.push(codeObject);
                }
            }
        }
        if (dataOperateDefinitionData && dataOperateDefinitionData.length > 0) {
            res.identifier = [];
            for (const defineData of dataOperateDefinitionData) {
                if (defineData.type === 1) {
                    // ドキュメント
                    const identifier: any = {
                        document: defineData.identifier,
                        event: [],
                        thing: []
                    };
                    res.identifier.push(identifier);
                } else if (defineData.type === 2) {
                    // イベント
                    const identifier: any = res.identifier.find((ident: any) => {
                        return ident.document && ident.document === defineData.parentDataId;
                    }) ||
                    {
                        event: defineData.identifier,
                        thing: []
                    };
                    if (typeof identifier.event === 'string') {
                        res.identifier.push(identifier);
                    } else {
                        identifier.event.push(defineData.identifier);
                    }
                } else if (defineData.type === 3) {
                    // モノ
                    let identifier: any = res.identifier.find((ident: any) => {
                        return (ident.document && ident.document === defineData.parentDataId) ||
                            (typeof ident.event === 'string' && ident.event === defineData.parentDataId);
                    }) ||
                        res.identifier.find((ident: any) => {
                            return !ident.document && !ident.event;
                        });
                    if (identifier) {
                        identifier.thing.push(defineData.identifier);
                    } else {
                        identifier = {
                            thing: [defineData.identifier]
                        };
                        res.identifier.push(identifier);
                    }
                }
            }
        }
        res.id = parseInt(dataOperateDefinition.id + '');
        res.pxrId = myConditionBook.pxrId;
        res.status = myConditionBook.status;
        res.actor._value = parseInt(dataOperateDefinition.actorCatalogCode + '');
        const { wfCatalogCode, appCatalogCode } = dataOperateDefinition;
        if (wfCatalogCode || !appCatalogCode) {
            // サポート対象外：WF
            throw new AppError(Message.UNSUPPORTED_ACTOR, ResponseCode.BAD_REQUEST);
        }
        res.app._value = parseInt(appCatalogCode + '');
        return res;
    }

    /**
     * CTokenチェック
     * @param cToken cToken
     */
    private async checkCTokenData (cToken: any, dto: IssuanceTemporarilySharedCode): Promise<any> {
        const checkData: any[] = cToken.document || cToken.event || cToken.thing;
        if (!checkData || checkData.length === 0) {
            throw new AppError(Message.NOT_FOUND_CTOKEN, 400);
        }
        let actor: any;
        let app: any;
        let isEnabled = true;
        // アクター、app/wfが一件に絞り込めるか判定
        for (const data of checkData) {
            if (!isEnabled) {
                break;
            }
            if (dto.actor && dto.actor._value) {
                // 共有元の actor の指定がある場合、指定した actor に一致しない ctoken はスキップ
                if (data.actor && dto.actor._value !== data.actor._value) {
                    continue;
                }
            }
            if (dto.app && dto.app._value) {
                // 共有元の app の指定がある場合、指定した app に一致しない ctoken はスキップ
                if (data.app && dto.app._value !== data.app._value) {
                    continue;
                }
            }
            if (data.actor && data.actor._value && data.actor._ver) {
                if (actor) {
                    isEnabled = isEnabled && actor._value === Number(data.actor._value);
                } else {
                    actor = {
                        _value: Number(data.actor._value),
                        _ver: Number(data.actor._ver)
                    };
                }
            }
            if (data.app && data.app._value && data.app._ver) {
                if (app) {
                    isEnabled = isEnabled && app._value === Number(data.app._value);
                } else {
                    app = {
                        _value: Number(data.app._value),
                        _ver: Number(data.app._ver)
                    };
                }
            }
            if (data.wf && data.wf._value && data.wf._ver) {
                // サポート対象外：WF
                throw new AppError(Message.UNSUPPORTED_ACTOR, ResponseCode.BAD_REQUEST);
            }
        }

        return isEnabled ? {
            actor: actor,
            app: app,
            wf: null
        } : null;
    }
}
