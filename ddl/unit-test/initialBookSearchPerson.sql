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
    'dummy2.test.org', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    '58di2dfse3.test.org', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    'dummy5.test.org', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
);

INSERT INTO pxr_book_manage.user_id_cooperate
(
    book_id,
    actor_catalog_code, actor_catalog_version,
    app_catalog_code, app_catalog_version,
    wf_catalog_code, wf_catalog_version,
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
    1000004,1,
    1000481,1,
    null,null,
    'userid01',
    1,
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
),
(
    1,
    1000104,1,
    1000461,1,
    null,null,
    'userid02',
    1,
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
),
(
    2,
    1000004,1,
    1000481,1,
    null,null,
    'userid03',
    1,
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
),
(
    2,
    1000104,1,
    1000461,1,
    null,null,
    'userid04',
    1,
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
);