/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
import Common from './Common';

export async function updatesCodesBeExpireOnly2 () {
    const common = new Common();
    await common.executeSqlString(`
    UPDATE pxr_book_manage.temporarily_shared_code SET expire_at = '2010-01-01 00:00:00.000' WHERE data_operate_definition_id = 2;
    `);
}
