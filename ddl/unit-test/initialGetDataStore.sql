/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/

INSERT INTO pxr_book_manage.my_condition_book
(
    id, pxr_id, attributes,
    is_disabled, created_by, created_at, updated_by, updated_at
)
VALUES
(
    1, '58di2dfse2.test.org', null,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    2, '12342dfse2.test.org', null,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    3, '56782dfse2.test.org', null,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    4, '11112dfse2.test.org', null,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    5, '58di2dfse3.test.org', null,
    false, 'test_user', NOW(), 'test_user', NOW()
);
INSERT INTO pxr_book_manage.user_id_cooperate
(
    id, book_id, actor_catalog_code, actor_catalog_version,
    app_catalog_code, app_catalog_version, wf_catalog_code, wf_catalog_version,
    user_id, is_disabled, created_by, created_at, updated_by, updated_at
)
VALUES
(
    1, 1, 1000004, 1,
    null, null, 1000007, 1,
    'userid01', false, 'test_user', NOW(), 'test_user', NOW()
),
(
    2, 1, 1000104, 1,
    1000107, 1, null, null,
    'userid01', false, 'test_user', NOW(), 'test_user', NOW()
),
(
    3, 2, 1000104, 1,
    1000107, 1, null, null,
    'userid03', false, 'test_user', NOW(), 'test_user', NOW()
),
(
    4, 4, 1000104, 1,
    1000107, 1, null, null,
    'userid04', false, 'test_user', NOW(), 'test_user', NOW()
),
(
    5, 5, 1000104, 1,
    1000107, 1, null, null,
    'userid05', false, 'test_user', NOW(), 'test_user', NOW()
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
),
(
    2, 1, 'store',
    1000104, 1,
    1000107, 1,
    null, null,
    1001107, 1,
    null, false, 'test_user', NOW(), 'test_user', NOW()
),
(
    3, 3, 'store',
    1000104, 1,
    1000107, 1,
    null, null,
    9999999, 1,
    null, false, 'test_user', NOW(), 'test_user', NOW()
),
(
    4, 4, 'store',
    1000104, 1,
    1000107, 1,
    null, null,
    9999999, 1,
    null, false, 'test_user', NOW(), 'test_user', NOW()
),
(
    5, 1, 'store',
    1000104, 1,
    null, null,
    1000007, 1,
    1002106, 1,
    null, false, 'test_user', NOW(), 'test_user', NOW()
),
(
    6, 5, 'store',
    1000104, 1,
    1000107, 1,
    null, null,
    1001106, 1,
    null, false, 'test_user', NOW(), 'test_user', NOW()
);

INSERT INTO pxr_book_manage.data_operation_data_type
(
    data_operation_id, catalog_uuid,
    document_catalog_code, document_catalog_version,
    event_catalog_code, event_catalog_version,
    thing_catalog_code, thing_catalog_version,
    consent_flg, attributes, is_disabled, created_by, created_at, updated_by, updated_at
)
VALUES
(
    2, 'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09',
    null, null,
    null, null,
    null, null,
    false, null, false, 'test_user', NOW(), 'test_user', NOW()
),
(
    1, 'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09',
    null, null,
    1000009, 1,
    1000014, 1,
    true, null, false, 'test_user', NOW(), 'test_user', NOW()
),
(
    1, 'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09',
    null, null,
    1000009, 1,
    1000015, 1,
    true, null, false, 'test_user', NOW(), 'test_user', NOW()
),
(
    1, 'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09',
    null, null,
    1000009, 1,
    1000016, 1,
    true, null, false, 'test_user', NOW(), 'test_user', NOW()
),
(
    1, 'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09',
    null, null,
    1000010, 1,
    1000017, 1,
    true, null, false, 'test_user', NOW(), 'test_user', NOW()
),
(
    1, 'ccc0c076-f73f-7ce1-7c5f-fdc1634aa5c1',
    null, null,
    1000011, 1,
    1000018, 1,
    true, null, false, 'test_user', NOW(), 'test_user', NOW()
),
(
    1, '69db43f2-6643-19e9-117c-4bdece4bddd7',
    1001010, 1,
    null, null,
    null, null,
    true, null, false, 'test_user', NOW(), 'test_user', NOW()
),
(
    1, '69db43f2-6643-19e9-117c-4bdece4bddd7',
    null, null,
    9999999, 1,
    9999999, 1,
    true, null, false, 'test_user', NOW(), 'test_user', NOW()
),
(
    1, '6acb33e4-4b6e-1d46-9c11-0fcf8320fb49',
    null, null,
    9999999, 1,
    9999999, 1,
    true, null, false, 'test_user', NOW(), 'test_user', NOW()
),
(
    2, 'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09',
    null, null,
    1000009, 1,
    1000014, 1,
    true, null, false, 'test_user', NOW(), 'test_user', NOW()
),
(
    2, 'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09',
    null, null,
    1000009, 1,
    1000015, 1,
    true, null, false, 'test_user', NOW(), 'test_user', NOW()
),
(
    2, 'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09',
    null, null,
    1000009, 1,
    1000016, 1,
    true, null, false, 'test_user', NOW(), 'test_user', NOW()
),
(
    2, 'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09',
    null, null,
    1000010, 1,
    1000017, 1,
    true, null, false, 'test_user', NOW(), 'test_user', NOW()
),
(
    2, 'ccc0c076-f73f-7ce1-7c5f-fdc1634aa5c1',
    null, null,
    1000011, 1,
    1000018, 1,
    true, null, false, 'test_user', NOW(), 'test_user', NOW()
),
(
    2, '69db43f2-6643-19e9-117c-4bdece4bddd7',
    1001010, 1,
    null, null,
    null, null,
    true, null, false, 'test_user', NOW(), 'test_user', NOW()
),
(
    2, '69db43f2-6643-19e9-117c-4bdece4bddd7',
    null, null,
    9999999, 1,
    9999999, 1,
    true, null, false, 'test_user', NOW(), 'test_user', NOW()
),
(
    2, '6acb33e4-4b6e-1d46-9c11-0fcf8320fb49',
    null, null,
    9999999, 1,
    9999999, 1,
    true, null, false, 'test_user', NOW(), 'test_user', NOW()
),
(
    5, 'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09',
    null, null,
    1000009, 1,
    1000014, 1,
    true, null, false, 'test_user', NOW(), 'test_user', NOW()
),
(
    6, 'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09',
    null, null,
    null, null,
    null, null,
    false, null, false, 'test_user', NOW(), 'test_user', NOW()
),
(
    6, 'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09',
    null, null,
    1000009, 1,
    1000014, 1,
    true, null, false, 'test_user', NOW(), 'test_user', NOW()
),
(
    6, 'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09',
    null, null,
    1000009, 1,
    1000015, 1,
    true, null, false, 'test_user', NOW(), 'test_user', NOW()
),
(
    6, 'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09',
    null, null,
    1000009, 1,
    1000016, 1,
    true, null, false, 'test_user', NOW(), 'test_user', NOW()
),
(
    6, 'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09',
    null, null,
    1000010, 1,
    1000017, 1,
    true, null, false, 'test_user', NOW(), 'test_user', NOW()
),
(
    6, 'ccc0c076-f73f-7ce1-7c5f-fdc1634aa5c1',
    null, null,
    1000011, 1,
    1000018, 1,
    true, null, false, 'test_user', NOW(), 'test_user', NOW()
),
(
    6, '69db43f2-6643-19e9-117c-4bdece4bddd7',
    1001010, 1,
    null, null,
    null, null,
    true, null, false, 'test_user', NOW(), 'test_user', NOW()
),
(
    6, '69db43f2-6643-19e9-117c-4bdece4bddd7',
    null, null,
    9999999, 1,
    9999999, 1,
    true, null, false, 'test_user', NOW(), 'test_user', NOW()
),
(
    6, '6acb33e4-4b6e-1d46-9c11-0fcf8320fb49',
    null, null,
    9999999, 1,
    9999999, 1,
    true, null, false, 'test_user', NOW(), 'test_user', NOW()
);
