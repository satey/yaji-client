const COS=require('../dist/cos-js-sdk-v5.js')
// const COS=require("cos-wx-sdk-v5")
// import Cos from 'cos-js-sdk-v5'
const Bucket="yaji-1318192409";//存储桶的名称，命名规则为 BucketName-APPID，此处填写的存储桶名称必须为此格式
const Region="ap-shanghai";//存储桶所在地域
//创建一个 COS SDK 实例
// SECRETID 和 SECRETKEY请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
const cos = new COS({
  SecretId: ' AKID5KWSK8sdK4kNxSF0joldRAoNrHbr2BDB',
  SecretKey: ' 2zqbHrR0VyLet6FIMfzIawEUgpuxwsk5',
});
//创建存储桶
cos.putBucket({
  Bucket:Bucket,
  Region: Region,
}, function (err, data) {
  console.log(err || data);
});

//查询存储桶列表
cos.getService(function (err, data) {
	console.log("[查询存储桶列表]")
  console.log(data && data.Buckets);
});
//删除
function deleteFileToTencentClound(Key){
	return new Promise((resolve,reject)=>{
		cos.deleteObject({
		  Bucket:Bucket,
		  Region: Region,
		  Key: Key,
		}, function (err, data) {
		  console.log(err || data);
		  resolve(data)
		});
	})
}
//上传图片到腾讯云
function uploadFileToTencentClound(filename,filePath){
	return new Promise((resolve,reject)=>{
		cos.postObject({
		    Bucket: Bucket,
		    Region: Region,
		    Key: filePath+filename,
		    FilePath: filePath,
		    onProgress: function (info) {
		        console.log("[cos.postObject-seccess]",JSON.stringify(info));
		    }      
		}, 
		function (err, data) {
		    console.log("[cos.postObject-err]",err || data);
			resolve(data.headers.location)
		})
	})
}
export default {
	uploadFileToTencentClound,
	deleteFileToTencentClound
}




