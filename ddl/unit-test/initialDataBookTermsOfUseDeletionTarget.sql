/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
INSERT INTO pxr_book_manage.user_id_cooperate
(
    book_id,
    actor_catalog_code, actor_catalog_version,
    app_catalog_code, app_catalog_version,
    wf_catalog_code, wf_catalog_version,
    region_catalog_code, region_catalog_version,
    user_id,
    status,
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
    1000209,1,
    'userid01',
    3,
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
),
(
    2,
    1000001,1,
    null,null,
    1000007,1,
    1000219,1,
    'userid02',
    1,
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
),
(
    1,
    1000001,1,
    1000461,1,
    null,null,
    1000209,1,
    'userid05',
    3,
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
),
(
    1,
    1000001,1,
    null,null,
    1000483,1,
    1000209,1,
    'userid06',
    3,
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
);
