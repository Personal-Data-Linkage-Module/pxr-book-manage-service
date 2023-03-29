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
);

INSERT INTO pxr_book_manage.data_operation_notification
(
    id, _value, _ver, status,
    is_disabled, created_by, created_at, updated_by, updated_at
)
VALUES
(
    1, 1001106, 1, 0,
    false, 'test_user', NOW(), 'test_user', NOW()
);

INSERT INTO pxr_book_manage.data_operation_notification_ind
(
    id, data_operation_notification_id, book_id,
    status, last_sent_at,
    is_disabled, created_by, created_at, updated_by, updated_at
)
VALUES
(
    1, 1, 1,
    0, null,
    false, 'test_user', NOW(), 'test_user', NOW()
);
