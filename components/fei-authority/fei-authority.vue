<template>
	<view>
		<u-popup :show="authorityPopup" @close="authorityPopup = false" mode="bottom" :closeable="false" :round="20">
			<view style="padding:40rpx;box-sizing: border-box;">
				<view style="background: #fff;border-radius: 10rpx;padding: 35rpx;box-sizing: border-box;">
					<view style="color:#000 ;font-size: 30rpx;font-weight: bold;text-align: center;">获取权限说明</view>
					<block v-if="type =='recorde'">
						<view style="font-size: 28rpx;color: #000;margin-top: 25rpx;">
							<text style="font-weight: bold;">录音权限 ：</text>
							在您录制语音条、进行语音通话聊天室语音上麦等场景中，需要授权我们使用手机权限，用于录音本地声音并上传、发布、播放实时推/拉流音频数据。</br>
							您可以点击前往，在接下来出现的系统弹框中，选择“同意”或“仅在使用时允许”等选项，以授权我们使用权限。</br> 若您未授权，可能相应的操作无法实现，但不影响其他功能的使用。
						</view>
					</block>
					<block v-if="type=='image'">
						<view style="font-size: 28rpx;color: #000;margin-top: 25rpx;">
							<text style="font-weight: bold;">存储空间/照片/相机权限
							</text></br>在您发布动态、聊天过程中、设置背景、反馈问题等场景中，需要授权我们使用手机权限，用于添加、制作、上传、发布、分享、下载图片时，读取和写入相册和文件内容。</br>
							您可以点击前往，在接下来出现的系统弹框中，选择“同意”或“仅在使用时允许”等选项，以授权我们使用权限。</br> 若您未授权，可能相应的操作无法实现，但不影响其他功能的使用
						</view>
					</block>
					<view style="display: flex;align-items: center;justify-content: center;margin-top: 69rpx;">
						<view @click="authorityPopup = false" style="color: #666666;font-size: 36rpx;">拒绝</view>
						<view style="width: 1px;height: 33rpx;background: #999999;margin: 0rpx 86rpx;"></view>
						<view style="color: #FFA000;font-size: 36rpx;" @click="forward">前往</view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import permision from "@/js_sdk/wa-permission/permission.js"
	export default {
		data() {
			return {
				authorityPopup: false,
				type: ''
			}
		},
		methods: {
			show(type) {
				switch (type) {
					case "recorde":
						if (uni.getSystemInfoSync().platform == "android") {
							if (uni.getStorageSync("audioEmpower") == false) {
								this.type = type;
								this.authorityPopup = true;
							} else {
								this.$emit("audioEmpower")
							}
						}
						break;
					case "image":
						if (uni.getSystemInfoSync().platform == "android") {
							if (uni.getStorageSync("imageEmpower") == false) {
								this.type = type;
								this.authorityPopup = true;
							} else {
								this.$emit("imageEmpower")
							}
						}
						break;
				}
			},
			async forward() {
				switch (this.type) {
					case "recorde":
						if (uni.getSystemInfoSync().platform == "android") {
							var audioResult = await permision.requestAndroidPermission(
								'android.permission.RECORD_AUDIO');
							console.log(audioResult)
							if (audioResult == 1) {
								uni.setStorageSync("audioEmpower", true)
								uni.removeStorageSync("audioEmpowerCount")
								this.authorityPopup = false;
								this.$emit("audioEmpower")
								return
							} else if (audioResult == -1) {
								if (uni.getStorageSync("audioEmpowerCount") == 0) {
									uni.setStorageSync("audioEmpowerCount", 1)
								} else {
									permision.gotoAppPermissionSetting()
								}
							}
						}
						break;
					case "image":
						if (uni.getSystemInfoSync().platform == "android") {
							var iamgeResult = await permision.requestAndroidPermission(
								'android.permission.READ_EXTERNAL_STORAGE');
							if (iamgeResult == 1) {
								uni.setStorageSync("imageEmpower", true)
								uni.removeStorageSync("imageEmpowerCount")
								this.authorityPopup = false;
								this.$emit("imageEmpower")
								return
							} else if (iamgeResult == -1) {
								if (uni.getStorageSync("imageEmpowerCount") == 0) {
									uni.setStorageSync("imageEmpowerCount", 1)
								} else {
									permision.gotoAppPermissionSetting()
								}
							}
						}
						break;
				}
				this.authorityPopup = false;
			},
		}
	}
</script>

<style lang="scss">
	.authority {
		width: 100vw;
		height: 776rpx;
		border-radius: 20rpx 20rpx 0 0;
		background: #fff;
	}
</style>