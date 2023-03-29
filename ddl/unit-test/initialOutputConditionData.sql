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
),
(
    '58di2dfse2.test.org', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    '58di2dfse2.test.org', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
)
;

INSERT INTO pxr_book_manage.my_condition_data_output_code
(
	book_id, code, output_type,
	actor_catalog_code, actor_catalog_version,
	region_catalog_code, region_catalog_version,
	app_catalog_code, app_catalog_version,
	wf_catalog_code, wf_catalog_version,
	bucket_name, presigned_url_expire_at, presigned_url_status,
	release_cooperate_approval_status, release_cooperate_status,
	release_service_cooperate_status,
	is_processing, created_by, updated_by
)
VALUES
(
	1, '4adb7ad5-a5e7-454c-rae1-34a564a155c7', 0,
	1000001, 1,
	null, null,
	1000004, 1,
	null, null,
	'foos3stack-bars3bucket-6qlqstql4bog', '2020-01-01T00:00:00.000+09:00', 0,
	1, 1,
	null,
	false, 'test-user', 'test-user'
),
(
	1, '4adb7ad5-a5e7-454c-rae1-34a564a155c8', 1,
	1000001, 1,
	1000005, 1,
	1000004, 1,
	null, null,
	'foos3stack-bars3bucket-6qlqstql4bog', null, 0,
	1, 1,
	1,
	false, 'test-user', 'test-user'
),
(
	2, '4adb7ad5-a5e7-454c-rae1-34a564a155c9', 2,
	1000001, 1,
	null, null,
	1000004, 1,
	null, null,
	'foos3stack-bars3bucket-6qlqstql4bog', '2020-01-01T00:00:00.000+09:00', 0,
	1, 1,
	null,
	false, 'test-user', 'test-user'
),
(
	2, '4adb7ad5-a5e7-454c-rae1-34a564a155c10', 3,
	1000001, 1,
	null, null,
	1000004, 1,
	null, null,
	'foos3stack-bars3bucket-6qlqstql4bog', null, 0,
	1, 1,
	null,
	false, 'test-user', 'test-user'
),
(
	3, '4adb7ad5-a5e7-454c-rae1-34a564a155c11', 2,
	null, null,
	null, null,
	null, null,
	null, null,
	'foos3stack-bars3bucket-6qlqstql4bog', null, 0,
	1, 1,
	null,
	true, 'test-user', 'test-user'
)
;

INSERT INTO pxr_book_manage.mcd_output_code_actor
(
	mcd_output_code_id,
	target_term_start, target_term_end,
	actor_catalog_code, actor_catalog_version,
	app_catalog_code, app_catalog_version,
	wf_catalog_code, wf_catalog_version,
	ind_request, release_cooperate_spec, release_cooperate_status,
	return_data_spec, approval_status, delete_data_spec,
	created_by, updated_by,
	is_disabled
)
VALUES
(
	1,
	null, null,
	1000001, 1,
	1000004, 1,
	null, null,
	'個別リクエスト', 1, 1,
	0, 0, 0,
	'test-user', 'test-user',
	false
),
(
	1,
	null, null,
	1000001, 2,
	1000004, 2,
	null, null,
	'個別リクエスト', 1, 1,
	0, 0, 0,
	'test-user', 'test-user',
	false
),
(
	2,
	null, null,
	1000001, 1,
	null, null,
	null, null,
	'個別リクエスト', 1, 1,
	0, 0, 0,
	'test-user', 'test-user',
	false
),
(
	3,
	'2020-01-01T00:00:00.000+09:00', '2021-01-01T00:00:00.000+09:00',
	1000001, 1,
	1000004, 1,
	null, null,
	'個別リクエスト', 1, 1,
	0, 0, 0,
	'test-user', 'test-user',
	false
),
(
	4,
	'2020-01-01T00:00:00.000+09:00', '2021-01-01T00:00:00.000+09:00',
	1000001, 1,
	1000004, 1,
	null, null,
	'個別リクエスト', 1, 1,
	0, 0, 0,
	'test-user', 'test-user',
	false
)
;

INSERT INTO pxr_book_manage.mcd_output_code_data_file
(
    mcd_output_code_actor_id, mcd_output_code,
    actor_catalog_code, actor_catalog_version,
    output_data_approval_status,
    output_file_type, upload_file_type,
    notification_status,
    file_name,
    input_file_preparation_status,
    output_status,
    delete_data_spec, delete_status,
    is_processing,
    is_disabled, created_by, created_at, updated_by, updated_at
)
VALUES
(
    1, '4adb7ad5-a5e7-454c-rae1-34a564a155c7',
    1000001, 1,
    0,
    1, 1,
    1,
    'file1',
    1,
    1,
    0, 0,
    false,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    2, '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
    1000001, 1,
    0,
    1, 1,
    1,
    'file2',
    1,
    1,
    0, 0,
    false,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    3, '4adb7ad5-a5e7-454c-rae1-34a564a155c8',
    1000001, 1,
    0,
    1, 1,
    1,
    'file2',
    1,
    1,
    0, 0,
    true,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    4, '4adb7ad5-a5e7-454c-rae1-34a564a155c9',
    1000001, 1,
    0,
    1, 1,
    1,
    'file3',
    1,
    1,
    0, 0,
    false,
    false, 'test_user', NOW(), 'test_user', NOW()
)
;

INSERT INTO pxr_book_manage.mcd_output_code_data_type
(
    mcd_output_code_actor_id,
    document_catalog_code, document_catalog_version, document_id,
	event_catalog_code, event_catalog_version, event_id,
	thing_catalog_code, thing_catalog_version, thing_id,
    is_disabled, created_by, created_at, updated_by, updated_at
)
VALUES
(
	1,
	1000012, 1, 'doc00001-agvd-dt4g-eub3t9bn79jn',
	null, null, null,
	null, null, null,
	false, 'test_user', NOW(), 'test_user', NOW()
),
(
	2,
	null, null, null,
	1000013, 1, 'eve00001-agvd-dt4g-eub3t9bn79jn',
	1000014, 1, 'thi00001-agvd-dt4g-eub3t9bn79jn',
	false, 'test_user', NOW(), 'test_user', NOW()
),
(
	3,
	null, null, null,
	null, null, null,
	1000014, 1, 'thi00001-agvd-dt4g-eub3t9bn79jn',
	false, 'test_user', NOW(), 'test_user', NOW()
)
;
