/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
DELETE FROM pxr_book_manage.identification;
DELETE FROM pxr_book_manage.user_id_cooperate;
DELETE FROM pxr_book_manage.tou_consent;

-- my-condition-book
INSERT INTO pxr_book_manage.my_condition_book
(
    pxr_id,
    status,
    attributes,
    appendix,
    is_disabled,
    created_by,
    created_at,
    updated_by,
    updated_at
)
VALUES
(
	'58di2dfse2.test.org',
    0,
    'aaa',
    '{ "region": [{ "_value": 1000003, "_ver": 1 }] }',
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
);

-- 本人性確認書類レコード
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
);

-- 利用者ID連携レコード
INSERT INTO pxr_book_manage.user_id_cooperate
(
    book_id,
    actor_catalog_code, actor_catalog_version,
    region_catalog_code, region_catalog_version,
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
    1,
    1000004,1,
    1000006,1,
    null,null,
    null,null,
    'userid01',
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
);

-- 利用規約同意レコード(terms_type 1：プラットフォーム規約 2：リージョン規約)
INSERT INTO pxr_book_manage.tou_consent
(
    book_id,
    terms_type,
    terms_of_use_code, terms_of_use_version,
    created_by, created_at,
    updated_by, updated_at
)
VALUES
(
    '1',
    '1',
    '1001007',1,
    'pxr_user', NOW(),
    'pxr_user', NOW()
),
(
    '1',
    '1',
    '1001007',2,
    'pxr_user', NOW(),
    'pxr_user', NOW()
),
(
    '1',
    '2',
    '1001008',1,
    'pxr_user', NOW(),
    'pxr_user', NOW()
),
(
    '1',
    '2',
    '1001008',2,
    'pxr_user', NOW(),
    'pxr_user', NOW()
);
