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
    'not.found.share.catalog', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    'invalid.book', NULL,
    true, 'test_user', NOW(), 'test_user', NOW()
),
(
    'not.data.operation', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    'invalid.actor.catalog', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
);

INSERT INTO pxr_book_manage.data_operation
(
    book_id, type,
    operation_catalog_code, operation_catalog_version,
    actor_catalog_code, actor_catalog_version,
    app_catalog_code, app_catalog_version,
    wf_catalog_code, wf_catalog_version,
    attributes,
    is_disabled, created_by, created_at, updated_by, updated_at
)
VALUES
(
    1, 'share',
    1000501,1,
    1000104,1,
    1000009,1,
    null,null,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    1, 'share',
    1000502,1,
    1000104,1,
    1000009,1,
    null,null,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    1, 'share',
    9999999,1,
    1000104,1,
    1000009,1,
    null,null,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    1, 'share',
    1000511,1,
    1000104,1,
    1000009,1,
    null,null,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    1, 'share',
    1000512,1,
    1000004,1,
    1000007,1,
    null,null,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    2, 'share',
    9999999,1,
    1000104,1,
    1000009,1,
    null,null,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    1, 'share',
    1000513,1,
    1000104,1,
    1000009,1,
    null,null,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    5, 'share',
    1000501,1,
    1000002,1,
    1000009,1,
    null,null,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
)
;

INSERT INTO pxr_book_manage.data_operation_data_type
(
    data_operation_id,
    catalog_uuid,
    document_catalog_code, document_catalog_version,
    event_catalog_code, event_catalog_version,
    thing_catalog_code, thing_catalog_version,
    consent_flg,
    attributes,
    is_disabled, created_by, created_at, updated_by, updated_at
)
VALUES
(
    1, 'event',
    null,null,
    1000007,1,
    null,null,
    false,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    1, 'event',
    null,null,
    1000007,1,
    1000000,1,
    true,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    1, 'event02',
    1000017,1,
    1000018,1,
    1000019,1,
    true,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    1, 'event02',
    1000017,1,
    null,null,
    null,null,
    true,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    1, 'event02',
    1000017,1,
    null,null,
    1000019,1,
    true,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    1, 'event02',
    1000017,1,
    1000018,1,
    1000020,2,
    true,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    1, 'event03',
    1000017,1,
    1000018,1,
    1000019,2,
    true,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    1, 'event03',
    1000017,1,
    1000018,1,
    1000020,2,
    true,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    1, 'event04',
    1000017,1,
    1000018,1,
    1000019,2,
    true,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    2,
    'event',
    null,null,
    1000009,1,
    null,null,
    true,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    2,
    'event',
    null,null,
    1000009,1,
    null,null,
    false,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    3, 'event02',
    1000027,1,
    1000018,1,
    1000029,1,
    true,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    4, 'event',
    1000037,1,
    1000038,1,
    1000039,1,
    true,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    4, 'event',
    null,null,
    1000007,1,
    1000029,1,
    true,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    4, 'event',
    1000017,1,
    1000007,1,
    1000030,1,
    true,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    1, 'event02',
    null,null,
    1001018,1,
    1000019,1,
    true,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    4, 'event02',
    null,null,
    1000028,1,
    1000029,1,
    true,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    4, 'event02',
    null,null,
    1000028,1,
    1000030,1,
    true,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    4, 'event02',
    null,null,
    1000028,1,
    1000029,1,
    true,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    1, 'event02',
    null,null,
    1001018,1,
    1000019,1,
    true,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    4, 'event02',
    null,null,
    1001018,1,
    1000019,1,
    true,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    1, 'event05',
    1000017,1,
    1000018,1,
    1000019,1,
    true,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    1, 'event05',
    1000017,1,
    1000118,1,
    1000019,1,
    true,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    4, 'event05',
    null, null,
    1000118,1,
    1000029,1,
    true,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    1, 'event06',
    1000017,1,
    1000018,1,
    1000019,1,
    true,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    4, 'event06',
    null, null,
    1000018,1,
    1000019,1,
    true,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    1, 'event07',
    null, null,
    1000018,1,
    1000019,1,
    true,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    4, 'event07',
    null, null,
    1000018,1,
    1000019,1,
    true,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    1, 'event08',
    null, null,
    1000018,1,
    1000019,2,
    true,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    4, 'event04',
    null, null,
    1000028,1,
    1000029,1,
    true,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    1, 'event02',
    1000017,1,
    1000018,1,
    1000021,2,
    true,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    4, 'event02',
    1000027,1,
    1000018,1,
    null,null,
    true,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    4, 'event02',
    null,null,
    1000018,1,
    1000030,1,
    true,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
),
(
    4, 'event03',
    1000017,1,
    1000018,1,
    1000021,2,
    true,
    null,
    false, 'pxr_user', NOW(), 'pxr_user', NOW()
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
    1000104,1,
    1000009,1,
    null,null,
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
),
(
    2,
    1000104,1,
    1000009,1,
    null,null,
    'userid02',
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
),
(
    3,
    1000104,1,
    1000008,1,
    null,null,
    'invalidBookUser',
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
),
(
    4,
    1000104,1,
    1000009,1,
    null,null,
    'notFoundDataOperate',
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
),
(
    5,
    1000002,1,
    1000009,1,
    null,null,
    'invalidActorCatalog',
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
);

INSERT INTO pxr_book_manage.store_event_notificate
(
    id,
    notificate_type,
    store_event_notificate_catalog_code,
    store_event_notificate_catalog_version,
    share_catalog_code,
    share_catalog_version,
    share_uuid,
    is_disabled,
    created_by,
    created_at,
    updated_by,
    updated_at
)
VALUES
(
    1,
    '',
    1000510,1,
    1000501,1,
    'userid01',
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
),
(
    8,
    '',
    1000510,1,
    1000501,1,
    'invalidActorCatalog',
    false,
    'pxr_user',
    NOW(),
    'pxr_user',
    NOW()
);
