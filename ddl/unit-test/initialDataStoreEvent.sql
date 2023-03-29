/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
DELETE FROM pxr_book_manage.share_source_source;
DELETE FROM pxr_book_manage.share_source_datatype;
DELETE FROM pxr_book_manage.store_event_notificate;

SELECT SETVAL('pxr_book_manage.share_source_source_id_seq', 1, false);
SELECT SETVAL('pxr_book_manage.share_source_datatype_id_seq', 1, false);
SELECT SETVAL('pxr_book_manage.store_event_notificate_id_seq', 1, false);

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
