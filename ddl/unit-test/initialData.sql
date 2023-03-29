/** Copyright 2022 NEC Corporation
Released under the MIT license.
https://opensource.org/licenses/mit-license.php
*/
-- 対象テーブルのデータをすべて削除
DELETE FROM pxr_book_manage.terms_of_use_notification_ind;
DELETE FROM pxr_book_manage.terms_of_use_notification;
DELETE FROM pxr_book_manage.mcd_output_code_data_file;
DELETE FROM pxr_book_manage.mcd_output_code_data_type;
DELETE FROM pxr_book_manage.mcd_output_code_actor;
DELETE FROM pxr_book_manage.my_condition_data_output_code;
DELETE FROM pxr_book_manage.user_id_cooperate;
DELETE FROM pxr_book_manage.identification;
DELETE FROM pxr_book_manage.temporarily_shared_code;
DELETE FROM pxr_book_manage.data_operation_data_type;
DELETE FROM pxr_book_manage.data_operation_data;
DELETE FROM pxr_book_manage.data_operation;
DELETE FROM pxr_book_manage.region_use;
DELETE FROM pxr_book_manage.tou_consent;
DELETE FROM pxr_book_manage.mcd_alteration_data;
DELETE FROM pxr_book_manage.mcd_alteration_actor;
DELETE FROM pxr_book_manage.mcd_alteration;
DELETE FROM pxr_book_manage.data_operation_notification_ind;
DELETE FROM pxr_book_manage.data_operation_notification;
DELETE FROM pxr_book_manage.my_condition_book;
DELETE FROM pxr_book_manage.share_source_source;
DELETE FROM pxr_book_manage.share_source_datatype;
DELETE FROM pxr_book_manage.store_event_notificate;
DELETE FROM pxr_book_manage.stopped_region;

-- 対象テーブルのシーケンスを初期化
SELECT SETVAL('pxr_book_manage.my_condition_book_id_seq', 1, false);
SELECT SETVAL('pxr_book_manage.user_id_cooperate_id_seq', 1, false);
SELECT SETVAL('pxr_book_manage.identification_id_seq', 1, false);
SELECT SETVAL('pxr_book_manage.data_operation_id_seq', 1, false);
SELECT SETVAL('pxr_book_manage.data_operation_data_id_seq', 1, false);
SELECT SETVAL('pxr_book_manage.data_operation_data_type_id_seq', 1, false);
SELECT SETVAL('pxr_book_manage.region_use_id_seq', 1, false);
SELECT SETVAL('pxr_book_manage.terms_of_use_notification_ind_id_seq', 1, false);
SELECT SETVAL('pxr_book_manage.terms_of_use_notification_id_seq', 1, false);
SELECT SETVAL('pxr_book_manage.tou_consent_id_seq', 1, false);
SELECT SETVAL('pxr_book_manage.my_condition_data_output_code_id_seq', 1, false);
SELECT SETVAL('pxr_book_manage.mcd_output_code_data_type_id_seq', 1, false);
SELECT SETVAL('pxr_book_manage.mcd_output_code_actor_id_seq', 1, false);
SELECT SETVAL('pxr_book_manage.mcd_output_code_data_file_id_seq', 1, false);
SELECT SETVAL('pxr_book_manage.mcd_alteration_id_seq', 1, false);
SELECT SETVAL('pxr_book_manage.mcd_alteration_actor_id_seq', 1, false);
SELECT SETVAL('pxr_book_manage.data_operation_notification_ind_id_seq', 1, false);
SELECT SETVAL('pxr_book_manage.data_operation_notification_id_seq', 1, false);
SELECT SETVAL('pxr_book_manage.mcd_alteration_data_id_seq', 1, false);
SELECT SETVAL('pxr_book_manage.share_source_source_id_seq', 1, false);
SELECT SETVAL('pxr_book_manage.share_source_datatype_id_seq', 1, false);
SELECT SETVAL('pxr_book_manage.stopped_region_id_seq', 1, false);
