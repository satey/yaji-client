// /**
//  * 本模块封装了Android、iOS的应用权限判断、打开应用权限设置界面、以及位置系统服务是否开启
//  */

// var isIos
// // #ifdef APP-PLUS
// isIos = (plus.os.name == "iOS")
// // #endif

// // 判断推送权限是否开启
// function judgeIosPermissionPush() {
// 	var result = false;
// 	var UIApplication = plus.ios.import("UIApplication");
// 	var app = UIApplication.sharedApplication();
// 	var enabledTypes = 0;
// 	if (app.currentUserNotificationSettings) {
// 		var settings = app.currentUserNotificationSettings();
// 		enabledTypes = settings.plusGetAttribute("types");
// 		console.log("enabledTypes1:" + enabledTypes);
// 		if (enabledTypes == 0) {
// 			console.log("推送权限没有开启");
// 		} else {
// 			result = true;
// 			console.log("已经开启推送功能!")
// 		}
// 		plus.ios.deleteObject(settings);
// 	} else {
// 		enabledTypes = app.enabledRemoteNotificationTypes();
// 		if (enabledTypes == 0) {
// 			console.log("推送权限没有开启!");
// 		} else {
// 			result = true;
// 			console.log("已经开启推送功能!")
// 		}
// 		console.log("enabledTypes2:" + enabledTypes);
// 	}
// 	plus.ios.deleteObject(app);
// 	plus.ios.deleteObject(UIApplication);
// 	return result;
// }

// // Android权限查询
// function requestAndroidPermission(permissionID) {
// 	return new Promise((resolve, reject) => {
// 		plus.android.requestPermissions(
// 			[permissionID], // 理论上支持多个权限同时查询，但实际上本函数封装只处理了一个权限的情况。有需要的可自行扩展封装
// 			function(resultObj) {
// 				var result = 0;
// 				for (var i = 0; i < resultObj.granted.length; i++) {
// 					var grantedPermission = resultObj.granted[i];
// 					console.log('已获取的权限：' + grantedPermission);
// 					result = 1
// 				}
// 				for (var i = 0; i < resultObj.deniedPresent.length; i++) {
// 					var deniedPresentPermission = resultObj.deniedPresent[i];
// 					console.log('拒绝本次申请的权限：' + deniedPresentPermission);
// 					result = 0
// 				}
// 				for (var i = 0; i < resultObj.deniedAlways.length; i++) {
// 					var deniedAlwaysPermission = resultObj.deniedAlways[i];
// 					console.log('永久拒绝申请的权限：' + deniedAlwaysPermission);
// 					result = -1
// 				}
// 				resolve(result);
// 				// 若所需权限被拒绝,则打开APP设置界面,可以在APP设置界面打开相应权限
// 				// if (result != 1) {
// 				// gotoAppPermissionSetting()
// 				// }
// 			},
// 			function(error) {
// 				console.log('申请权限错误：' + error.code + " = " + error.message);
// 				resolve({
// 					code: error.code,
// 					message: error.message
// 				});
// 			}
// 		);
// 	});
// }

// // 使用一个方法，根据参数判断权限
// function judgeIosPermission(permissionID) {
// 	if (permissionID == "push") {
// 	return judgeIosPermissionPush()
// 	}
// 	return false;
// }

// // 跳转到**应用**的权限页面
// function gotoAppPermissionSetting() {
// 	if (isIos) {
// 		var UIApplication = plus.ios.import("UIApplication");
// 		var application2 = UIApplication.sharedApplication();
// 		var NSURL2 = plus.ios.import("NSURL");
// 		// var setting2 = NSURL2.URLWithString("prefs:root=LOCATION_SERVICES");		
// 		var setting2 = NSURL2.URLWithString("app-settings:");
// 		application2.openURL(setting2);

// 		plus.ios.deleteObject(setting2);
// 		plus.ios.deleteObject(NSURL2);
// 		plus.ios.deleteObject(application2);
// 	} else {
// 		// console.log(plus.device.vendor);
// 		var Intent = plus.android.importClass("android.content.Intent");
// 		var Settings = plus.android.importClass("android.provider.Settings");
// 		var Uri = plus.android.importClass("android.net.Uri");
// 		var mainActivity = plus.android.runtimeMainActivity();
// 		var intent = new Intent();
// 		intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
// 		var uri = Uri.fromParts("package", mainActivity.getPackageName(), null);
// 		intent.setData(uri);
// 		mainActivity.startActivity(intent);
// 	}
// }

// //
// module.exports = {
// 	judgeIosPermission: judgeIosPermission,
// 	requestAndroidPermission: requestAndroidPermission,
// 	gotoAppPermissionSetting: gotoAppPermissionSetting
// }
