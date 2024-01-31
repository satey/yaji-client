const COS = require('cos-wx-sdk-v5')
const Bucket = "yaji-1318192409"; //存储桶的名称，命名规则为 BucketName-APPID，此处填写的存储桶名称必须为此格式
const Region = "ap-shanghai"; //存储桶所在地域
//创建一个 COS SDK 实例
// SECRETID 和 SECRETKEY请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
const cos = new COS({
	SecretId: 'AKID5KWSK8sdK4kNxSF0joldRAoNrHbr2BDB',
	SecretKey: '2zqbHrR0VyLet6FIMfzIawEUgpuxwsk5',
	SimpleUploadMethod: "putObject"
});
cos.headBucket({
	Bucket: Bucket,
	/* 必须 */
	Region: Region,
	/* 存储桶所在地域，必须字段 */
}, function(err, data) {
	if (data) {
		console.log('存储桶存在');
	} else if (err.statusCode == 403) {
		console.log('没有该存储桶读权限');
	}
});

//删除
function deleteFileToTencentClound(Key) {
	return new Promise((resolve, reject) => {
		cos.deleteObject({
			Bucket: Bucket,
			Region: Region,
			Key: Key,
		}, function(err, data) {
			console.log(err || data);
			resolve(data)
		});
	})
}
//上传图片到腾讯云
function uploadFileToTencentClound(file) {
	console.log(file)
	return new Promise((resolve, reject) => {
		cos.uploadFile({
			Bucket: Bucket,
			Region: Region,
			Key: file[0].name,
			FilePath:`xingxiang/`+file[0].path,
			onTaskReady: function(taskId) {
				/* 非必须 */
				console.log(taskId);
			},
			onProgress: function(progressData) {
				/* 非必须 */
				console.log(JSON.stringify(progressData));
			},
			onFileFinish: function(err, data, options) {
				/* 非必须 */
				console.log(options.Key + '上传' + (err ? '失败' : '完成'));
			},
			// 支持自定义headers 非必须
			Headers: {
				"Content-Type": "image/png"
			},
		}, function(err, data) {
			console.log(err || data);
		});
	})
}
export default {
	uploadFileToTencentClound,
	deleteFileToTencentClound
}