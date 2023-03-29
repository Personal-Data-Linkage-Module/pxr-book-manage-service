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
    1, 'wf.success.pxrid', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    2, 'app.success.pxrid', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    3, 'wf.not.store.share', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    4, 'app.not.store.share', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    5, 'wf.invalid.dataoperate.catalog.ns', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    6, 'app.invalid.dataoperate.catalog.ns', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    7, 'wf.success.not.share.store', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    8, 'app.success.not.share.store', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    9, 'not.wf.app', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
);

INSERT INTO pxr_book_manage.terms_of_use_notification
(
    id, terms_type, _value, _ver, status, 
    is_disabled, created_by, created_at, updated_by, updated_at
)
VALUES
( 
    1, 1, 1000004, 1, 0,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    2, 1, 1000005, 1, 0,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    3, 2, 1000006, 1, 0,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    4, 2, 1000007, 1, 0,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    5, 2, 1000008, 1, 0,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    6, 2, 1000009, 1, 0,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    7, 2, 1000010, 1, 0,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    8, 2, 1000011, 1, 0,
    false, 'test_user', NOW(), 'test_user', NOW()
);

INSERT INTO pxr_book_manage.terms_of_use_notification_ind
(
    id, terms_of_use_notification_id, book_id,
    status, last_sent_at,
    is_disabled, created_by, created_at, updated_by, updated_at
)
VALUES
(
    1, 1, 1,
    0, null,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    2, 2, 2,
    0, null,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    3, 3, 1,
    0, null,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    4, 4, 2,
    0, null,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    5, 5, 5,
    0, null,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    6, 6, 6,
    0, null,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    7, 7, 7,
    0, null,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    8, 7, 7,
    0, null,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    9, 8, 8,
    0, null,
    false, 'test_user', NOW(), 'test_user', NOW()
);

INSERT INTO pxr_book_manage.data_operation_notification 
(
    _value, _ver, status,
    is_disabled, created_by, created_at, updated_by, updated_at
)
VALUES
(
    1000304, 1, 0,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    1000305, 1, 0,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    1000306, 1, 0,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    1000307, 1, 0,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    1000308, 1, 0,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    1000309, 1, 0,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    1000310, 1, 0,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    1000311, 1, 0,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    1000312, 1, 0,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    1000313, 1, 0,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    1000314, 1, 0,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    1000315, 1, 0,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    1000316, 1, 0,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    1000317, 1, 0,
    false, 'test_user', NOW(), 'test_user', NOW()
);

INSERT INTO pxr_book_manage.data_operation_notification_ind
(
    data_operation_notification_id, book_id, status, last_sent_at,
    is_disabled, created_by, created_at, updated_by, updated_at
)
VALUES
(
    1, 1, 0, null,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    2, 2, 0, null,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    3, 1, 0, null,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    4, 2, 0, null,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    5, 3, 0, null,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    6, 4, 0, null,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    7, 3, 0, null,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    8, 4, 0, null,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    9, 4, 0, null,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    10, 4, 0, null,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    11, 5, 0, null,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    12, 6, 0, null,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    13, 7, 0, null,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    14, 8, 0, null,
    false, 'test_user', NOW(), 'test_user', NOW()
);
