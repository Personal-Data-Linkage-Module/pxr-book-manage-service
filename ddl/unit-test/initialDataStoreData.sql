/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
INSERT INTO pxr_book_manage.my_condition_book
(
    pxr_id, attributes,
    is_disabled, created_by, created_at, updated_by, updated_at
)
VALUES
(
    '58di2dfse2.test.org', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
);
INSERT INTO pxr_book_manage.DATA_OPERATION
(
    book_id, type,
    actor_catalog_code, actor_catalog_version,
    app_catalog_code, app_catalog_version,
    wf_catalog_code, wf_catalog_version,
    attributes,
    is_disabled, created_by, created_at, updated_by, updated_at
)
VALUES
(
    1, 'store',
    1000004,1,
    1000107,1,
    null,null,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
);

INSERT INTO pxr_book_manage.DATA_OPERATION_DATA_TYPE
(
    data_operation_id, catalog_uuid,
    document_catalog_code, document_catalog_version,
    event_catalog_code, event_catalog_version,
    thing_catalog_code, thing_catalog_version,
    consent_flg, attributes,
    is_disabled, created_by, created_at, updated_by, updated_at
)
VALUES
(
    1, null,
    null, null,
    1000107, 1,
    null, null,
    false, null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
);
