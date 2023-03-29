/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import UserIdCooperate from '../../repositories/postgres/UserIdCooperate';
/* eslint-enable */
import { DateTimeFormatString } from '../../common/Transform';
import Config from '../../common/Config';
import moment = require('moment-timezone');
const config = Config.ReadConfig('./config/config.json');

export default class PostCooperateRequestResDto {
    /**
     * PXR-ID
     */
    public pxrId: string = null;

    /**
     * 利用者ID
     */
    public userId: string = null;

    /**
     * actorCode
     */
    public actorCode: number = null;

    /**
     * actorVersion
     */
    public actorVersion: number = null;

    /**
     * regionCode
     */
    public regionCode: number = null;

    /**
     * regionVersion
     */
    public regionVersion: number = null;

    /**
     * appCode
     */
    public appCode: number = null;

    /**
     * appVersion
     */
    public appVersion: number = null;

    /**
     * wfCode
     */
    public wfCode: number = null;

    /**
     * wfVersion
     */
    public wfVersion: number = null;

    /**
     * ステータス
     */
    public status: number = null;

    /**
     * 連携開始日時
     */
    public startAt: Date = null;

    /**
     * データ構造取得App(JSON用連想配列)
     */
    public getAsJson (): {} {
        const res:any = {};
        res.pxrId = this.pxrId;
        if (this.userId) {
            res.userId = this.userId;
        }
        res.actor = {};
        res.actor._value = this.actorCode;
        res.actor._ver = this.actorVersion;
        if (this.regionCode) {
            res.region = {};
            res.region._value = this.regionCode;
            res.region._ver = this.regionVersion;
        }
        if (this.appCode) {
            res.app = {};
            res.app._value = this.appCode;
            res.app._ver = this.appVersion;
        }
        res.status = this.status;
        if (this.startAt) {
            res.startAt = moment(this.startAt).tz(config['timezone']).format(DateTimeFormatString);
        }
        return res;
    }

    /**
     * データ構造設定
     * @param entity
     */
    public setFromEntity (entity: UserIdCooperate): void {
        this.userId = entity.userId;
        this.actorCode = entity.actorCatalogCode;
        this.actorVersion = entity.actorCatalogVersion;
        this.regionCode = entity.regionCatalogCode;
        this.regionVersion = entity.regionCatalogVersion;
        this.appCode = entity.appCatalogCode;
        this.appVersion = entity.appCatalogVersion;
        this.wfCode = entity.wfCatalogCode;
        this.wfVersion = entity.wfCatalogVersion;
        this.status = entity.status;
        this.startAt = entity.startAt;
    }
}
