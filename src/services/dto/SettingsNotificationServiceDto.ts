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

// SDE-IMPL-REQUIRED 本ファイルをコピーしてサービスレイヤーのDTOを実装します。
/* eslint-disable */
import Operator from '../../resources/dto/OperatorReqDto';
/* eslint-enable */

export class CodeObject {
    /**
     * _value
     */
    _value: number;

    /**
     * _ver
     */
    _ver: number;
}

export default class SettingsNotificationServiceDto {
    /**
     * pxrId
     */
    pxrId: string;

    /**
     * オペレータ情報
     */
    operator: Operator;

    /**
     * コード配列
     */
    codes: CodeObject[];

    /**
     * offset
     */
    offset: number;

    /**
     * limit
     */
    limit: number;
}
