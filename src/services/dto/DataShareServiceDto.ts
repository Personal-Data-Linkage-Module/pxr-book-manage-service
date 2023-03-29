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
/* eslint-disable */
import Operator from '../../resources/dto/OperatorReqDto';
/* eslint-enable */
/**
 * データ蓄積定義追加サービスデータ
 */
export default class DataShareServiceDto {
    /**
     * オペレータ情報
     */
    operator: Operator = null;

    /**
     * userId
     */
    userId: string = null;

    /**
     * message
     */
    request: any = null;

    /**
     * storeId
     */
    shareId: number = null;
}
