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
INSERT INTO pxr_book_manage.USER_ID_COOPERATE
(
    book_id,
    actor_catalog_code, actor_catalog_version,
    region_catalog_code, region_catalog_version,
    app_catalog_code, app_catalog_version,
    wf_catalog_code, wf_catalog_version,
    user_id,
    status,
    start_at,
    is_disabled,
    created_by,
    created_at,
    updated_by,
    updated_at
)
VALUES
(
    1,
    1000004,0,
    null,null,
    1000007,0,
    null,null,
    'userid01',
    1,
    '2020-09-01 10:00:00.000',
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
),
(
    1,
    1000004,0,
    null,null,
    1000107,0,
    null,null,
    'userid02',
    0,
    null,
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
),
(
    1,
    1000004,0,
    1000207,0,
    null,null,
    null,null,
    'userid03',
    0,
    null,
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
);
