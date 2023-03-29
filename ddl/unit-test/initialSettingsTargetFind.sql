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

INSERT INTO pxr_book_manage.data_operation
(
    id, book_id, type,
    actor_catalog_code, actor_catalog_version,
    app_catalog_code, app_catalog_version,
    wf_catalog_code, wf_catalog_version,
    operation_catalog_code, operation_catalog_version,
    attributes, is_disabled, created_by, created_at, updated_by, updated_at
)
VALUES
(
    1, 1, 'store',
    1000004, 1,
    null, null,
    1000007, 1,
    1001106, 1,
    null, false, 'test_user', NOW(), 'test_user', NOW()
);

INSERT INTO pxr_book_manage.data_operation_notification
(
    id, _value, _ver, status,
    is_disabled, created_by, created_at, updated_by, updated_at
)
VALUES
(
    1, 1001106, 1, 0,
    false, 'test_user', NOW(), 'test_user', NOW()
);
