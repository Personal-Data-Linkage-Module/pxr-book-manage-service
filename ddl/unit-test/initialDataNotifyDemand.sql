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
    '68di2dfse2.test.org', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    '78di2dfse2.test.org', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    '88di2dfse2.test.org', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    'e1di2dfse2.test.org', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    'e2di2dfse2.test.org', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    'e3di2dfse2.test.org', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    'e4di2dfse2.test.org', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    'e5di2dfse2.test.org', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    'e6di2dfse2.test.org', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    'e7di2dfse2.test.org', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    'e8di2dfse2.test.org', NULL,
    false, 'test_user', NOW(), 'test_user', NOW()
),
(
    'e9di2dfse2.test.org', NULL,
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
	is_processing, created_by, updated_by
)
VALUES
(
	1, '4adb7ad5-a5e7-454c-rae1-34a564a155c7', 1,
	1002700, 1,
	null, null,
	null, null,
	1000004, 1,
	'foos3stack-bars3bucket-6qlqstql4bog', null, 0,
	1, 1,
	false, 'test-user', 'test-user'
),
(
	2, '4adb7ad5-a5e7-454c-rae1-34a564a155c8', 1,
	1002700, 1,
	1000005, 1,
	1000004, 1,
	null, null,
	'foos3stack-bars3bucket-6qlqstql4bog', null, 0,
	1, 1,
	false, 'test-user', 'test-user'
),
(
	3, '4adb7ad5-a5e7-454c-rae1-34a564a155c9', 1,
	1002700, 1,
	null, null,
	null, null,
	1000004, 1,
	'foos3stack-bars3bucket-6qlqstql4bog', null, 0,
	1, 1,
	false, 'test-user', 'test-user'
),
(
	4, '4adb7ad5-a5e7-454c-rae1-34a564a155c0', 1,
	1002700, 1,
	1000005, 1,
	null, null,
	1000004, 1,
	'foos3stack-bars3bucket-6qlqstql4bog', null, 0,
	1, 1,
	false, 'test-user', 'test-user'
),
(
	5, '4adb7ad5-a5e7-454c-rae1-34a564a155e1', 1,
	1002701, 1,
	1000005, 1,
	null, null,
	1000004, 1,
	'foos3stack-bars3bucket-6qlqstql4bog', null, 0,
	1, 1,
	false, 'test-user', 'test-user'
),
(
	6, '4adb7ad5-a5e7-454c-rae1-34a564a155e2', 1,
	1002702, 1,
	1000005, 1,
	null, null,
	1000004, 1,
	'foos3stack-bars3bucket-6qlqstql4bog', null, 0,
	1, 1,
	false, 'test-user', 'test-user'
),
(
	7, '4adb7ad5-a5e7-454c-rae1-34a564a155e3', 1,
	1002703, 1,
	1000005, 1,
	null, null,
	1000004, 1,
	'foos3stack-bars3bucket-6qlqstql4bog', null, 0,
	1, 1,
	false, 'test-user', 'test-user'
),
(
	8, '4adb7ad5-a5e7-454c-rae1-34a564a155e4', 1,
	1002704, 1,
	1000005, 1,
	null, null,
	1000004, 1,
	'foos3stack-bars3bucket-6qlqstql4bog', null, 0,
	1, 1,
	false, 'test-user', 'test-user'
),
(
	9, '4adb7ad5-a5e7-454c-rae1-34a564a155e5', 1,
	1002705, 1,
	1000005, 1,
	null, null,
	1000004, 1,
	'foos3stack-bars3bucket-6qlqstql4bog', null, 0,
	1, 1,
	false, 'test-user', 'test-user'
),
(
	10, '4adb7ad5-a5e7-454c-rae1-34a564a155e6', 1,
	1002706, 1,
	1000005, 1,
	null, null,
	1000004, 1,
	'foos3stack-bars3bucket-6qlqstql4bog', null, 0,
	1, 1,
	false, 'test-user', 'test-user'
),
(
	11, '4adb7ad5-a5e7-454c-rae1-34a564a155e7', 1,
	1002707, 1,
	1000005, 1,
	null, null,
	1000004, 1,
	'foos3stack-bars3bucket-6qlqstql4bog', null, 0,
	1, 1,
	false, 'test-user', 'test-user'
),
(
	12, '4adb7ad5-a5e7-454c-rae1-34a564a155e8', 1,
	1002708, 1,
	1000005, 1,
	null, null,
	1000004, 1,
	'foos3stack-bars3bucket-6qlqstql4bog', null, 0,
	1, 1,
	false, 'test-user', 'test-user'
),
(
	13, '4adb7ad5-a5e7-454c-rae1-34a564a155e9', 1,
	1002709, 1,
	1000005, 1,
	null, null,
	1000004, 1,
	'foos3stack-bars3bucket-6qlqstql4bog', null, 0,
	1, 1,
	false, 'test-user', 'test-user'
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
	1002700, 1,
	null, null,
	1000004, 1,
	'個別リクエスト', 1, 1,
	0, 0, 0,
	'test-user', 'test-user',
	false
),
(
	2,
	'2020-01-01T00:00:00.000+09:00', '2021-01-01T00:00:00.000+09:00',
	1002700, 1,
	1000004, 1,
	null, null,
	'個別リクエスト', 1, 1,
	0, 0, 0,
	'test-user', 'test-user',
	false
),
(
	3,
	null, null,
	1002700, 1,
	null, null,
	1000004, 1,
	'個別リクエスト', 1, 1,
	0, 0, 0,
	'test-user', 'test-user',
	false
),
(
	4,
	null, null,
	1002700, 1,
	null, null,
	1000004, 1,
	'個別リクエスト', 1, 1,
	0, 0, 0,
	'test-user', 'test-user',
	false
),
(
	5,
	null, null,
	1002701, 1,
	null, null,
	1000004, 1,
	'個別リクエスト', 1, 1,
	0, 0, 0,
	'test-user', 'test-user',
	false
),
(
	6,
	null, null,
	1002702, 1,
	null, null,
	1000004, 1,
	'個別リクエスト', 1, 1,
	0, 0, 0,
	'test-user', 'test-user',
	false
),
(
	7,
	null, null,
	1002703, 1,
	null, null,
	1000004, 1,
	'個別リクエスト', 1, 1,
	0, 0, 0,
	'test-user', 'test-user',
	false
),
(
	8,
	null, null,
	1002704, 1,
	null, null,
	1000004, 1,
	'個別リクエスト', 1, 1,
	0, 0, 0,
	'test-user', 'test-user',
	false
),
(
	9,
	null, null,
	1002705, 1,
	null, null,
	1000004, 1,
	'個別リクエスト', 1, 1,
	0, 0, 0,
	'test-user', 'test-user',
	false
),
(
	10,
	null, null,
	1002706, 1,
	null, null,
	1000004, 1,
	'個別リクエスト', 1, 1,
	0, 0, 0,
	'test-user', 'test-user',
	false
),
(
	11,
	null, null,
	1002707, 1,
	null, null,
	1000004, 1,
	'個別リクエスト', 1, 1,
	0, 0, 0,
	'test-user', 'test-user',
	false
),
(
	12,
	null, null,
	1002708, 1,
	null, null,
	1000004, 1,
	'個別リクエスト', 1, 1,
	0, 0, 0,
	'test-user', 'test-user',
	false
),
(
	13,
	null, null,
	1002709, 1,
	null, null,
	1000004, 1,
	'個別リクエスト', 1, 1,
	0, 0, 0,
	'test-user', 'test-user',
	false
)
;

INSERT INTO pxr_book_manage.mcd_alteration
(
	book_id,
	actor_catalog_code,	actor_catalog_version,
	region_catalog_code, region_catalog_version,
	alteration,
	is_disabled, created_by, created_at,
	updated_by, updated_at
)
VALUES
(
	1,
	1002700, 1,
	null, null,
	'wf',
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	2,
	1002700, 1,
	1000005, 1,
	'app',
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	3,
	1002700, 1,
	null, null,
	'wf',
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	4,
	1002700, 1,
	1000005, 1,
	'region',
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	5,
	1002700, 1,
	null, null,
	'wf',
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	6,
	1002700, 1,
	null, null,
	'wf',
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	7,
	1002700, 1,
	null, null,
	'wf',
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	6,
	1002700, 1,
	null, null,
	'wf',
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	6,
	1002700, 1,
	null, null,
	'wf',
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	6,
	1002700, 1,
	null, null,
	'wf',
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	6,
	1002700, 1,
	null, null,
	'wf',
	false, 'test-user', NOW(),
	'test-user', NOW()
)
;

INSERT INTO pxr_book_manage.mcd_alteration_actor
(
	mcd_alteration_id,
	target_term_start, target_term_end,
	actor_catalog_code, actor_catalog_version,
	app_catalog_code, app_catalog_version,
	wf_catalog_code, wf_catalog_version,
	alteration, approval_status,
	created_by, updated_by,
	is_disabled, message
)
VALUES
(
	1,
	null, null,
	1002700, 1,
	null, null,
	1000004, 1,
	'wf', 1,
	'test-user', 'test-user',
	false, null
),
(
	2,
	'2020-01-01T00:00:00.000+09:00', '2021-01-01T00:00:00.000+09:00',
	1002700, 1,
	1000004, 1,
	null, null,
	'app', 1,
	'test-user', 'test-user',
	false, null
),
(
	2,
	'2020-01-01T00:00:00.000+09:00', '2021-01-01T00:00:00.000+09:00',
	1002700, 1,
	1000004, 1,
	null, null,
	'app2', 1,
	'test-user', 'test-user',
	false, null
),
(
	3,
	null, null,
	1002700, 1,
	null, null,
	1000004, 1,
	'wf', 0,
	'test-user', 'test-user',
	false, 'actor'
),
(
	4,
	null, null,
	1002700, 1,
	null, null,
	1000004, 1,
	'region', 1,
	'test-user', 'test-user',
	false, 'region'
),
(
	4,
	null, null,
	1002700, 1,
	null, null,
	1000004, 1,
	'region', 1,
	'test-user', 'test-user',
	false, 'region'
),
(
	5,
	null, null,
	1002700, 1,
	null, null,
	1000004, 1,
	'wf', 1,
	'test-user', 'test-user',
	false, null
),
(
	6,
	null, null,
	1002700, 1,
	null, null,
	1000004, 1,
	'wf', 1,
	'test-user', 'test-user',
	false, null
),
(
	6,
	null, null,
	1002700, 1,
	null, null,
	1000004, 1,
	'wf', 1,
	'test-user', 'test-user',
	false, null
),
(
	6,
	null, null,
	1002700, 1,
	null, null,
	2000004, 1,
	'no_wf', 1,
	'test-user', 'test-user',
	false, null
),
(
	7,
	null, null,
	1002700, 1,
	null, null,
	1000004, 1,
	'wf', 1,
	'test-user', 'test-user',
	false, 'not_available'
),
(
	6,
	null, null,
	1002700, 1,
	null, null,
	2000004, 1,
	'no_wf', 1,
	'test-user', 'test-user',
	false, null
),
(
	6,
	null, null,
	1002700, 1,
	null, null,
	2000004, 1,
	'no_wf', 1,
	'test-user', 'test-user',
	false, null
),
(
	6,
	null, null,
	1002700, 1,
	null, null,
	2000004, 1,
	'no_wf', 1,
	'test-user', 'test-user',
	false, null
),
(
	6,
	null, null,
	1002700, 1,
	null, null,
	2000004, 1,
	'no_wf', 1,
	'test-user', 'test-user',
	false, null
),
(
	6,
	null, null,
	1002700, 1,
	null, null,
	2000004, 1,
	'no_wf', 1,
	'test-user', 'test-user',
	false, null
),
(
	6,
	null, null,
	1002700, 1,
	null, null,
	2000004, 1,
	'no_wf', 1,
	'test-user', 'test-user',
	false, null
),
(
	6,
	null, null,
	1002700, 1,
	null, null,
	2000004, 1,
	'no_wf', 1,
	'test-user', 'test-user',
	false, null
),
(
	6,
	null, null,
	1002700, 1,
	null, null,
	2000004, 1,
	'no_wf', 1,
	'test-user', 'test-user',
	false, null
),
(
	6,
	null, null,
	1002700, 1,
	null, null,
	2000004, 1,
	'no_wf', 1,
	'test-user', 'test-user',
	false, null
),
(
	8,
	null, null,
	1002700, 1,
	null, null,
	2000004, 1,
	'no_wf', 1,
	'test-user', 'test-user',
	false, null
),
(
	8,
	null, null,
	1002700, 1,
	null, null,
	2000004, 1,
	'no_wf', 1,
	'test-user', 'test-user',
	false, null
),
(
	8,
	null, null,
	1002700, 1,
	null, null,
	2000004, 1,
	'no_wf', 1,
	'test-user', 'test-user',
	false, null
)
;
INSERT INTO pxr_book_manage.mcd_alteration_data
(
	mcd_alteration_actor_id,
	document_catalog_code, document_catalog_version, document_id,
	event_catalog_code, event_catalog_version, event_id,
	thing_catalog_code, thing_catalog_version, thing_id,
	is_disabled, created_by, created_at,
	updated_by, updated_at
)
VALUES
(
	1,
	null, null, null,
	1000008, 1, 'af3c6486-7a26-944d-3c95-bbbf65ca3f2c',
	null, null, null,
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(	2,
	1000007, 1, 'bf3c6486-7a26-944d-3c95-bbbf65ca3f2c',
	null, null, null,
	null, null, null,
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(	2,
	1000006, 1, 'af3c6486-7a26-944d-3c95-bbbf65ca3f2c',
	null, null, null,
	null, null, null,
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(	3,
	1000006, 1, '2f3c6486-7a26-944d-3c95-bbbf65ca3f2c',
	null, null, null,
	null, null, null,
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	4,
	null, null, null,
	null, null, null,
	1000012, 1, 'af3c6486-7a26-944d-3c95-bbbf65ca3f2c',
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	5,
	null, null, null,
	null, null, null,
	1000013, 1, 'cf3c6486-7a26-944d-3c95-bbbf65ca3f2c',
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	5,
	null, null, null,
	null, null, null,
	1000012, 1, 'af3c6486-7a26-944d-3c95-bbbf65ca3f2c',
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	6,
	null, null, null,
	null, null, null,
	1000012, 1, '4f3c6486-7a26-944d-3c95-bbbf65ca3f2c',
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	7,
	null, null, null,
	1000008, 1, 'af3c6486-7a26-944d-3c95-bbbf65ca3f2c',
	1000010, 1, 'bf3c6486-7a26-944d-3c95-bbbf65ca3f2c',
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	8,
	null, null, null,
	1000008, 1, 'af3c6486-7a26-944d-3c95-bbbf65ca3f2c',
	1000012, 1, 'bf3c6486-7a26-944d-3c95-bbbf65ca3f2c',
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	8,
	null, null, null,
	1000008, 1, 'af3c6486-7a26-944d-3c95-bbbf65ca3f2c',
	1000012, 1, 'bf3c6486-7a26-944d-3c95-bbbf65ca3f2c',
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	9,
	null, null, null,
	1000008, 1, 'af3c6486-7a26-944d-3c95-bbbf65ca3f2c',
	1000012, 1, 'bf3c6486-7a26-944d-3c95-bbbf65ca3f2c',
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	10,
	null, null, null,
	1000008, 1, 'af3c6486-7a26-944d-3c95-bbbf65ca3f2c',
	1000012, 1, 'bf3c6486-7a26-944d-3c95-bbbf65ca3f2c',
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	11,
	null, null, null,
	1000008, 1, 'af3c6486-7a26-944d-3c95-bbbf65ca3f2c',
	1000012, 1, 'bf3c6486-7a26-944d-3c95-bbbf65ca3f2c',
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	11,
	null, null, null,
	1000008, 1, 'af3c6486-7a26-944d-3c95-bbbf65ca3f2c',
	1000012, 1, 'bf3c6486-7a26-944d-3c95-bbbf65ca3f2c',
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	12,
	null, null, 'bf3c6486-7a26-944d-3c95-bbbf65ca3f2c',
	null, null, null,
	null, null, null,
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	13,
	null, null, null,
	null, null, 'af3c6486-7a26-944d-3c95-bbbf65ca3f2c',
	null, null, null,
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	14,
	null, null, null,
	null, null, null,
	null, null, 'bf3c6486-7a26-944d-3c95-bbbf65ca3f2c',
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	15,
	null, null, null,
	null, null, null,
	null, null, null,
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	15,
	1000007, 1, 'bf3c6486-7a26-944d-3c95-bbbf65ca3f2c',
	null, null, null,
	null, null, null,
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	16,
	null, null, null,
	null, null, null,
	null, null, null,
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	16,
	null, null, 'bf3c6486-7a26-944d-3c95-bbbf65ca3f2c',
	null, null, null,
	null, null, null,
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	17,
	null, null, null,
	null, null, null,
	null, null, null,
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	17,
	null, null, null,
	1000008, 1, 'af3c6486-7a26-944d-3c95-bbbf65ca3f2c',
	null, null, null,
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	18,
	null, null, null,
	null, null, null,
	null, null, null,
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	18,
	null, null, null,
	null, null, 'af3c6486-7a26-944d-3c95-bbbf65ca3f2c',
	null, null, null,
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	19,
	null, null, null,
	null, null, null,
	null, null, null,
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	19,
	null, null, null,
	null, null, null,
	1000012, 1, 'bf3c6486-7a26-944d-3c95-bbbf65ca3f2c',
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	20,
	null, null, null,
	null, null, null,
	null, null, null,
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	20,
	null, null, null,
	null, null, null,
	null, null, 'bf3c6486-7a26-944d-3c95-bbbf65ca3f2c',
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	21,
	null, null, 'bf3c6486-7a26-944d-3c95-bbbf65ca3f2c',
	null, null, null,
	null, null, null,
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	22,
	null, null, null,
	null, null, 'af3c6486-7a26-944d-3c95-bbbf65ca3f2c',
	null, null, null,
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	23,
	null, null, null,
	null, null, null,
	null, null, 'bf3c6486-7a26-944d-3c95-bbbf65ca3f2c',
	false, 'test-user', NOW(),
	'test-user', NOW()
)
;

INSERT INTO pxr_book_manage.user_id_cooperate
(
	book_id,
	actor_catalog_code, actor_catalog_version,
	region_catalog_code, region_catalog_version,
	app_catalog_code, app_catalog_version,
	wf_catalog_code, wf_catalog_version,
	user_id, status,
	start_at,
	is_disabled, created_by, created_at,
	updated_by, updated_at
)
VALUES
(
	1,
	1002700, 1,
	null, null,
	null, null,
	1000004, 1,
	1, 1,
	NOW(),
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	1,
	1002700, 1,
	null, null,
	1000004, 1,
	null, null,
	1, 1,
	NOW(),
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	2,
	1002700, 1,
	1000005, 1,
	1000004, 1,
	null, null,
	2, 1,
	NOW(),
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	3,
	1002700, 1,
	null, null,
	null, null,
	1000004, 1,
	3, 1,
	NOW(),
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	4,
	1002700, 1,
	1000005, 1,
	null, null,
	1000004, 1,
	4, 1,
	NOW(),
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	5,
	1002700, 1,
	null, null,
	null, null,
	1000004, 1,
	1, 1,
	NOW(),
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	6,
	1002700, 1,
	null, null,
	null, null,
	1000004, 1,
	1, 1,
	NOW(),
	false, 'test-user', NOW(),
	'test-user', NOW()
),
(
	7,
	1002700, 1,
	null, null,
	null, null,
	1000004, 1,
	1, 1,
	NOW(),
	false, 'test-user', NOW(),
	'test-user', NOW()
)
;
