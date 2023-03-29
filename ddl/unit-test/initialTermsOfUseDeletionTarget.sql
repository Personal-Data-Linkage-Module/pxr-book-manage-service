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
),
(
    '58di2dfse2.test.org', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    'test.test.org', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    'test2.test.org', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
);

INSERT INTO pxr_book_manage.user_id_cooperate
(
    book_id, actor_catalog_code, actor_catalog_version, app_catalog_code, app_catalog_version, wf_catalog_code, wf_catalog_version, region_catalog_code, region_catalog_version,
    user_id, status, is_disabled, created_by, created_at, updated_by, updated_at
)
VALUES
(
    1, 1000001, 1, null, null, null, null, 1000209, 1,
    'userid01', 3, false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    1, 1000001, 1, null, null, null, null, 1000210, 1,
    'userid01', 3, false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    2, 1000001, 1, null, null, null, null, 1000209, 1,
    'userid05', 3, false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    3, 1000001, 1, null, null, null, null, 1000209, 1,
    'userid06', 2, false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    1, 1000001, 1, null, null, null, null, 1000451, 1,
    'userid01', 3, false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    1, 1000001, 1, null, null, 1000482, 1, null, null,
    'userid01', 3, false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    1, 1000001, 1, 1000461, 1, null, null, null, null,
    'userid01', 3, false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    1, 1000001, 1, null, null, null, null, 1000452, 1,
    'userid01', 3, false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    1, 1000001, 1, null, null, null, null, 1000453, 1,
    'userid01', 1, false, 'pxr_user', NOW(), 'pxr_user', NOW()
);

INSERT INTO pxr_book_manage.terms_of_use_notification
(
    terms_type, _value, _ver, status,
    is_disabled, created_by, created_at, updated_by, updated_at
)
VALUES
(
    1, 1000009, 1, 0,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    1, 1000010, 1, 0,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    2, 1000109, 1, 0,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    2, 1000110, 1, 0,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    2, 1000111, 1, 0,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    2, 1000119, 1, 0,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    2, 1001015, 3, 0,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    2, 1001016, 1, 0,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
);

INSERT INTO pxr_book_manage.terms_of_use_notification_ind
(
    terms_of_use_notification_id, book_id, status, last_sent_at,
    is_disabled, created_by, created_at, updated_by, updated_at
)
VALUES
(
    1, 1, 0, '2020-01-01T00:00:00.000+0900',
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    2, 1, 0, '2020-01-01T00:00:00.000+0900',
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    3, 1, 0, '2020-01-01T00:00:00.000+0900',
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    3, 2, 0, '2020-01-01T00:00:00.000+0900',
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    3, 3, 0, '2020-01-01T00:00:00.000+0900',
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    3, 4, 0, '2020-01-01T00:00:00.000+0900',
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    4, 1, 0, '2020-01-01T00:00:00.000+0900',
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    5, 1, 0, '2020-01-01T00:00:00.000+0900',
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    6, 1, 0, '2020-01-01T00:00:00.000+0900',
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    7, 1, 0, '2020-01-01T00:00:00.000+0900',
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    8, 1, 0, '2020-01-01T00:00:00.000+0900',
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
);
