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
    'dummy.test.org', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
);


INSERT INTO pxr_book_manage.user_id_cooperate
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
    1000001,1,
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
    1000001,1,
    1000009,1,
    null,null,
    'userid02',
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
),
(
    1,
    1000002,1,
    1000009,1,
    null,null,
    'userid03',
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
);
