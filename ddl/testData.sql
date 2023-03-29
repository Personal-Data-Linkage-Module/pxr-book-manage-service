/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
DELETE FROM pxr_book_manage.USER_ID_COOPERATE;
DELETE FROM pxr_book_manage.my_condition_book;

-- 対象テーブルのシーケンスを初期化
SELECT SETVAL('pxr_book_manage.USER_ID_COOPERATE_id_seq', 1, false);
SELECT SETVAL('pxr_book_manage.my_condition_book_id_seq', 1, false);

INSERT INTO pxr_book_manage.my_condition_book
(
    pxr_id,
    attributes,
    is_disabled,
    created_by,
    created_at,
    updated_by,
    updated_at
)
VALUES
(
	'123',
    'aaa',
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
);
INSERT INTO pxr_book_manage.USER_ID_COOPERATE
(
    book_id,
    actor_catalog_code,
    actor_catalog_version,
    app_catalog_code,
    app_catalog_version,
    wf_catalog_code,
    wf_catalog_version,
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
    1,
    2,
    3,
    4,
    5,
    6,
    'loginId',
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
);
