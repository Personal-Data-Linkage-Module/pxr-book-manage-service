/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
DELETE FROM pxr_book_manage.share_source_source;
DELETE FROM pxr_book_manage.share_source_datatype;
DELETE FROM pxr_book_manage.store_event_notificate_history;
DELETE FROM pxr_book_manage.store_event_notificate;
DELETE FROM pxr_book_manage.data_operation_data_type;
DELETE FROM pxr_book_manage.data_operation;
DELETE FROM pxr_book_manage.user_id_cooperate;
DELETE FROM pxr_book_manage.my_condition_book;

SELECT SETVAL('pxr_book_manage.share_source_source_id_seq', 1, false);
SELECT SETVAL('pxr_book_manage.share_source_datatype_id_seq', 1, false);
SELECT SETVAL('pxr_book_manage.store_event_notificate_history_id_seq', 1, false);
SELECT SETVAL('pxr_book_manage.store_event_notificate_id_seq', 1, false);
SELECT SETVAL('pxr_book_manage.data_operation_data_type_id_seq', 1, false);
SELECT SETVAL('pxr_book_manage.data_operation_id_seq', 1, false);
SELECT SETVAL('pxr_book_manage.user_id_cooperate_id_seq', 1, false);
SELECT SETVAL('pxr_book_manage.my_condition_book_id_seq', 1, false);

INSERT INTO pxr_book_manage.my_condition_book
(
    pxr_id,
    is_disabled,
    created_by, created_at,
    updated_by, updated_at
)
VALUES
(
    'testpxr01',
    false,
    'test_user', NOW(),
    'test_user', NOW()
),
(
    'testpxr02',
    false,
    'test_user', NOW(),
    'test_user', NOW()
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
    created_by, created_at,
    updated_by, updated_at
)
VALUES
(
    1,
    1000445,1,
    1000601,1,
    null,null,
    'testuserapp2',
    1,
    false,
    'pxr_user', NOW(),
    'pxr_user', NOW()
),
(
    2,
    1000437,1,
    1000471,1,
    null,null,
    'testuserapp',
    2,
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
);
INSERT INTO pxr_book_manage.data_operation
(
    book_id,
    type,
    operation_catalog_code, operation_catalog_version,
    actor_catalog_code, actor_catalog_version,
    app_catalog_code, app_catalog_version,
    wf_catalog_code, wf_catalog_version,
    is_disabled,
    created_by, created_at,
    updated_by, updated_at
)
VALUES
(
    2,
    'share',
    1000473, 1,
    1000437, 1,
    1000471, 1,
    null, null,
    false,
    'test',
    NOW(),
    'test',
    NOW()
),
(
    1,
    'share',
    1000473, 1,
    1000445, 1,
    1000601, 1,
    null, null,
    false,
    'test',
    NOW(),
    'test',
    NOW()
);

INSERT INTO pxr_book_manage.data_operation_data_type
(
    data_operation_id,
    catalog_uuid,
    document_catalog_code, document_catalog_version,
    event_catalog_code, event_catalog_version,
    thing_catalog_code, thing_catalog_version,
    consent_flg,
    attributes,
    is_disabled,
    created_by, created_at,
    updated_by, updated_at
)
VALUES
(
    1,
    'a5baf9b6-1c7d-836b-019c-cf16a69656f0',
    1099999, 1,
    null, null,
    null, null,
    true,
    null,
    false,
    'pxr_user', NOW(),
    'pxr_user', NOW()
),
(
    1,
    'a5baf9b6-1c7d-836b-019c-cf16a69656f0',
    null, null,
    1000008, 1,
    null, null,
    true,
    null,
    false,
    'pxr_user', NOW(),
    'pxr_user', NOW()
),
(
    1,
    'a5baf9b6-1c7d-836b-019c-cf16a69656f0',
    null, null,
    null, null,
    1000922, 1,
    true,
    null,
    false,
    'pxr_user', NOW(),
    'pxr_user', NOW()
),
(
    2,
    'a5baf9b6-1c7d-836b-019c-cf16a69656f0',
    1099999, 1,
    null, null,
    null, null,
    true,
    null,
    false,
    'pxr_user', NOW(),
    'pxr_user', NOW()
),
(
    2,
    'a5baf9b6-1c7d-836b-019c-cf16a69656f0',
    null, null,
    1000008, 1,
    null, null,
    true,
    null,
    false,
    'pxr_user', NOW(),
    'pxr_user', NOW()
),
(
    2,
    'a5baf9b6-1c7d-836b-019c-cf16a69656f0',
    null, null,
    null, null,
    1000922, 1,
    true,
    null,
    false,
    'pxr_user', NOW(),
    'pxr_user', NOW()
);

INSERT INTO pxr_book_manage.store_event_notificate
(
    notificate_type,
    store_event_notificate_catalog_code, store_event_notificate_catalog_version,
    share_catalog_code, share_catalog_version,
    share_uuid,
    is_disabled,
    created_by, created_at,
    updated_by, updated_at
)
VALUES
(
    'share-trigger',
    1001023, 1,
    1000473, 1,
    'a5baf9b6-1c7d-836b-019c-cf16a69656f0',
    false,
    'test', NOW(),
    'test', NOW()
);
INSERT INTO pxr_book_manage.share_source_datatype
(
    store_event_notificate_id,
    document_catalog_code, document_catalog_version,
    event_catalog_code, event_catalog_version,
    thing_catalog_code, thing_catalog_version,
    is_disabled,
    created_by, created_at,
    updated_by, updated_at
)
VALUES
(
    1,
    1099999, 1,
    null, null,
    null, null,
    false,
    'test', NOW(),
    'test', NOW()
),
(
    1,
    null, null,
    1000008, 1,
    null, null,
    false,
    'test', NOW(),
    'test', NOW()
),
(
    1,
    null, null,
    null, null,
    1000922, 1,
    false,
    'test', NOW(),
    'test', NOW()
);
INSERT INTO pxr_book_manage.share_source_source
(
    share_source_datatype_id,
    actor_catalog_code, actor_catalog_version,
    is_disabled,
    created_by, created_at,
    updated_by, updated_at
)
VALUES
(
    1,
    1000437, 1,
    false,
    'test', NOW(),
    'test', NOW()
),
(
    2,
    1000437, 1,
    false,
    'test', NOW(),
    'test', NOW()
),
(
    3,
    1000437, 1,
    false,
    'test', NOW(),
    'test', NOW()
),
(
    1,
    1000445, 1,
    false,
    'test', NOW(),
    'test', NOW()
),
(
    2,
    1000445, 1,
    false,
    'test', NOW(),
    'test', NOW()
),
(
    3,
    1000445, 1,
    false,
    'test', NOW(),
    'test', NOW()
);
