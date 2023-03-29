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
    1000004,1,
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
    1000104,1,
    1000009,1,
    null,null,
    'userid02',
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
);

INSERT INTO pxr_book_manage.my_condition_data_output_code
(
    id, book_id, code, presigned_url_expire_at, output_type,
    is_disabled, created_by, created_at, updated_by, updated_at
)
VALUES
(
    1, 1, 'test_mcd_output_code',
    NOW() + '7 days', 1,
    false, 'test_user', NOW(), 'test_user', NOW()
);

INSERT INTO pxr_book_manage.mcd_output_code_actor
(
    mcd_output_code_id,
    target_term_start,
    target_term_end,
    actor_catalog_code,
    actor_catalog_version,
    app_catalog_code,
    app_catalog_version,
    wf_catalog_code,
    wf_catalog_version,
    ind_request,
    release_cooperate_spec,
    release_cooperate_status,
    return_data_spec,
    approval_status,
    message,
    delete_data_spec,
    is_disabled, created_by, created_at, updated_by, updated_at
)
VALUES
(
    1,
    null,
    null,
    1000020,
    1,
    null,
    null,
    null,
    null,
    null,
    0,
    0,
    0,
    1,
    null,
    0,
    false, 'test_user', NOW(), 'test_user', NOW()
);

INSERT INTO pxr_book_manage.mcd_output_code_data_file
(
    mcd_output_code_actor_id,
    mcd_output_code,
    actor_catalog_code,
    actor_catalog_version,
    output_data_approval_status,
    output_file_type,
    upload_file_type,
    notification_status,
    file_name,
    input_file_preparation_status,
    output_status,
    delete_data_spec,
    delete_status,
    is_processing,
    is_disabled, created_by, created_at, updated_by, updated_at
)
VALUES
(
    1,
    'test_mcd_output_code',
    null,
    null,
    1,
    1,
    1,
    1,
    'file_name',
    1,
    1,
    1,
    0,
    false,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    1,
    'test_mcd_output_code',
    1000001,
    1,
    1,
    2,
    1,
    1,
    'file_name',
    1,
    1,
    1,
    0,
    false,
    false, 'test_user', NOW(), 'test_user', NOW()
);
