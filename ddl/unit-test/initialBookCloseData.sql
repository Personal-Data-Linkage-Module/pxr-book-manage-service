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
),
(
    '58di2dfse3.test.org', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    '58di2dfse4.test.org', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    '58di2dfse5.test.org', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    '58di2dfse6.test.org', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
);
INSERT INTO pxr_book_manage.USER_ID_COOPERATE
(
    book_id,
    actor_catalog_code, actor_catalog_version,
    app_catalog_code, app_catalog_version,
    wf_catalog_code, wf_catalog_version,
    user_id,
    is_disabled,
    created_by,
    created_at,
    updated_by,
    updated_at
)
VALUES
(
    1,
    1000004,1,
    null,null,
    1000007,1,
    'userid01',
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
),
(
    1,
    1000004,1,
    1000107,1,
    null,null,
    'userid01',
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
),
(
    2,
    1000004,1,
    null,null,
    1000007,1,
    'userid01',
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
),
(
    3,
    1000004,1,
    null,null,
    1000007,1,
    'userid01',
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
),
(
    4,
    1000004,1,
    null,null,
    1000007,1,
    'userid01',
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
),
(
    5,
    1000000,1,
    null,null,
    1000007,1,
    'userid02',
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
);
INSERT INTO pxr_book_manage.identification
(
    book_id,
    identification_code, identification_version,
    template, template_hash,
    is_disabled, created_by, created_at, updated_by, updated_at
)
VALUES
(
    1,
    1000004,1,
    '{ "test1": "data1" }', 'abcd',
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    2,
    1000004,1,
    '{ "test1": "data1" }', 'abcd',
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    3,
    1000004,1,
    '{ "test1": "data1" }', 'abcd',
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
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
    null,null,
    1000007,1,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    2, 'store',
    1000004,1,
    null,null,
    1000007,1,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    3, 'store',
    1000004,1,
    null,null,
    1000007,1,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
);
INSERT INTO pxr_book_manage.DATA_OPERATION_DATA_TYPE
(
    data_operation_id,
    document_catalog_code, document_catalog_version,
    event_catalog_code, event_catalog_version,
    thing_catalog_code, thing_catalog_version,
    consent_flg,
    attributes,
    is_disabled, created_by, created_at, updated_by, updated_at
)
VALUES
(
    1,
    null, null,
    1000107, 1,
    null, null,
    true,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    1,
    null, null,
    1000107, 1,
    null, null,
    false,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    2,
    1000106, 1,
    null, null,
    null, null,
    false,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    3,
    null, null,
    null, null,
    1000108, 1,
    false,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
);
