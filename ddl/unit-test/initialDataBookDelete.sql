/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
INSERT INTO pxr_book_manage.my_condition_book
(
    pxr_id, attributes, book_close_available, book_close_available_at,
    is_disabled, created_by, created_at, updated_by, updated_at
)
VALUES
(
    '58di2dfse2.test.org', NULL, true, NOW(),
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    '58di2dfse2.test.org', NULL, true, now() + cast( '-1 months' as INTERVAL ),
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    '58di2dfse2.test.org', NULL, true, now() + cast( '-11 hours' as INTERVAL ),
    false, 'test_user', NOW(), 'test_user', NOW()
);
