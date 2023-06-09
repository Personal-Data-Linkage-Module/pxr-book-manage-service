/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
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
    '58di2dfse2.test.org',
    'aaa',
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
),
(
    '58di2dfse2.test.org2',
    'aaa',
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
);
INSERT INTO pxr_book_manage.user_id_cooperate
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
    1000004,1,
    null,null,
    null,null,
    1000007,1,
    0,
    'userid1_wf',
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
),
(
    1,
    1000020,1,
    1000020,1,
    null,null,
    null,null,
    0,
    'userid1_app',
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
),
(
    1,
    1000020,1,
    1000020,1,
    null,null,
    null,null,
    1,
    'userid1_app',
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
    null,null,
    1000007,1,
    0,
    'userid2_wf',
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
),
(
    2,
    1000020,1,
    null,null,
    1000107,1,
    null,null,
    0,
    'userid2_app',
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
);

INSERT INTO pxr_book_manage.terms_of_use_notification
(
    terms_type,
    _value,
    _ver,
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
    1001007,
    1,
    0,
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
),
(
    1,
    1001007,
    2,
    1,
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
),
(
    1,
    1001007,
    3,
    0,
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
),
(
    2,
    1001008,
    1,
    0,
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
),
(
    2,
    1001008,
    2,
    0,
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
),
(
    2,
    1001008,
    3,
    0,
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
);

INSERT INTO pxr_book_manage.terms_of_use_notification_ind
(
    terms_of_use_notification_id,
    book_id,
    status,
    last_sent_at,
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
    0,
    NOW(),
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
),
(
    2,
    1,
    0,
    NOW(),
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
),
(
    3,
    1,
    0,
    NOW(),
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
),
(
    4,
    1,
    0,
    NOW(),
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
),
(
    5,
    1,
    0,
    NOW(),
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
),
(
    6,
    1,
    0,
    NOW(),
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
);
