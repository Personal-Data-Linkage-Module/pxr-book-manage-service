INSERT INTO pxr_book_manage.my_condition_book
(
    id, pxr_id, attributes,
    is_disabled, created_by, created_at, updated_by, updated_at
)
VALUES
(
    1, 'pxrId01', null,
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
    1, 1, 1000101, 1,
    1000110, 1, null, null,
    'appUser01', false, 'test_user', NOW(), 'test_user', NOW()
),
(
    2, 1, 1000201, 1,
    1000210, 1, null, null,
    'appUser01', false, 'test_user', NOW(), 'test_user', NOW()
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
    1000101, 1,
    null, null,
    1000110, 1,
    1000120, 5,
    null, false, 'test_user', NOW(), 'test_user', NOW()
),
(
    2, 1, 'store',
    1000201, 1,
    1000210, 1,
    null, null,
    1000220, 5,
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
    1, 'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09',
    1000501, 1,
    null, null,
    null, null,
    true, null, false, 'test_user', NOW(), 'test_user', NOW()
),
(
    1, 'b87b27c1-5da8-37dd-6ee6-2c7831cf6a09',
    null, null,
    1000511, 1,
    1000521, 1,
    true, null, false, 'test_user', NOW(), 'test_user', NOW()
),
(
    2, 'c87b27c1-5da8-37dd-6ee6-2c7831cf6a09',
    1000801, 1,
    null, null,
    null, null,
    true, null, false, 'test_user', NOW(), 'test_user', NOW()
),
(
    2, 'c87b27c1-5da8-37dd-6ee6-2c7831cf6a09',
    null, null,
    1000811, 1,
    1000821, 1,
    true, null, false, 'test_user', NOW(), 'test_user', NOW()
);