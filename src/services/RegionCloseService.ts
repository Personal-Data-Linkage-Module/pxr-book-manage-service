/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
/* eslint-disable */
import EntityOperation from '../repositories/EntityOperation';
import StoppedRegion from '../repositories/postgres/StoppedRegion';
import { Service } from 'typedi';
import { connectDatabase } from '../common/Connection';
import RegionCloseServiceDto from '../services/dto/RegionCloseServiceDto';
import Config from '../common/Config';
const Message = Config.ReadConfig('./config/message.json');
/* eslint-enable */

@Service()
export default class RegionCloseService {
    /**
     * Region終了対象追加
     */
    public async postRegionClose (dto: RegionCloseServiceDto) {
        // 終了済Regionテーブルにレコード追加
        const connection = await connectDatabase();
        let res;
        await connection.transaction(async trans => {
            const stoppedRegion = new StoppedRegion();
            stoppedRegion.actorCatalogCode = dto.getActorCode()._value;
            stoppedRegion.actorCatalogVersion = dto.getActorCode()._ver;
            stoppedRegion.regionCatalogCode = dto.getRegionCode()._value;
            stoppedRegion.regionCatalogVersion = dto.getRegionCode()._ver;
            stoppedRegion.closedAt = dto.getCloseDate();
            stoppedRegion.isDisabled = false;
            stoppedRegion.createdBy = dto.getOperator().getLoginId();
            stoppedRegion.updatedBy = dto.getOperator().getLoginId();

            // 更新を実行
            res = await EntityOperation.insertClosedRegionRecord(trans, stoppedRegion);
        });

        return res;
    }

    /**
     * Region終了時利用者ID連携解除対象個人取得
     */
    public async getRegionCloseTarget (dto: RegionCloseServiceDto) {
        // Region終了済みで利用者ID連携未解除の個人を取得する
        const regionCloseTargets = await EntityOperation.getClosedRegionUnclosedUserIdCooperateRecord(dto.getOffset(), dto.getLimit());
        const ret = {
            offset: dto.getOffset(),
            targets: regionCloseTargets
        };
        return ret;
    }

    /**
     * Region終了対象取得
     */
    public async getRegionClose (dto: RegionCloseServiceDto) {
        // 本日付以前でRegion終了済のレコードを取得する
        const regionCloses = await EntityOperation.getClosedRegion(dto.getOffset(), dto.getLimit());
        const ret = {
            offset: dto.getOffset(),
            targets: regionCloses
        };
        return ret;
    }

    /**
     * 終了済Region更新
     */
    public async updateRegionClose (dto: RegionCloseServiceDto) {
        await EntityOperation.updateCloseRegion(dto.getOperator().getLoginId(), dto.getActorCode()._value, dto.getRegionCode()._value);
        return { result: 'success' };
    }
}
