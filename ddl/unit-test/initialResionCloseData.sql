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
    'test01.test.org', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    'test02.test.org', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    'test03.test.org', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    'test04.test.org', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    'test05.test.org', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    'test00.test.org', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
);
INSERT INTO pxr_book_manage.USER_ID_COOPERATE
(
    book_id,
    actor_catalog_code, actor_catalog_version,
    region_catalog_code, region_catalog_version,
    app_catalog_code, app_catalog_version,
    wf_catalog_code, wf_catalog_version,
    status,
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
    1000001,1,
    1000017,1,
    null,null,
    null,null,
    2,
    'userid01',
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
),
(
    2,
    1000001,1,
    1000027,1,
    null,null,
    null,null,
    2,
    'userid02',
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
),
(
    3,
    1000001,1,
    1000037,1,
    null,null,
    null,null,
    2,
    'userid03',
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
),
(
    4,
    1000001,1,
    1000047,1,
    null,null,
    null,null,
    2,
    'userid04',
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
),
(
    5,
    1000001,1,
    1000057,1,
    null,null,
    null,null,
    2,
    'userid05',
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
),
(
    6,
    1000001,1,
    1000007,1,
    null,null,
    null,null,
    2,
    'userid00',
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
)
;

INSERT INTO pxr_book_manage.stopped_region
(
    actor_catalog_code, actor_catalog_version,
    region_catalog_code, region_catalog_version,
    closed_at,
    is_disabled,
    created_by,
    created_at,
    updated_by,
    updated_at
)
VALUES
(
    1000001,1,
    1000017,1,
    Now(),
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
),
(
    1000001,1,
    1000027,1,
    now() + '+1 day',
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
),
(
    1000001,1,
    1000037,1,
    Now(),
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
),
(
    1000001,1,
    1000047,1,
    now() + '+1 year',
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
),
(
    1000001,1,
    1000057,1,
    now() + '+1 day',
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
);
