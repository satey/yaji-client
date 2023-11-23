<template>
	<view>
		<u-navbar title="" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" style="color: #333 !important;"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view>
			<view style="text-align: center;">
				<image mode="aspectFill" class="bannerImg"
					src="https://yaji-1318192409.cos.ap-shanghai.myqcloud.com/app_file/duiGe/duigeStart.png">
				</image>
			</view>
			<view class="title">桑田对歌</view>
			<view class="sunTitle">桑田，承载着华夏民族数千年的辉煌与落寞。是先民祭祀、劳作的生活写照。</view>
			<view class="okBtn" @click="start">进入</view>
		</view>
	</view>
</template>

<script>
	import permision from "@/js_sdk/wa-permission/permission.js"
	export default {
		name: "",
		data() {
			return {
				isModule: false,
				countNum: 0,
			}
		},

		onLoad() {

		},
		onBackPress() {

		},
		onBeforeBack(args) {

		},
		methods: {
			async start() {
				let that = this;
				// #ifdef APP-PLUS
				if (uni.getSystemInfoSync().platform == "ios") {
					var recorder = uni.getRecorderManager();
					var appAuthorizeSetting = uni.getAppAuthorizeSetting();
					if (appAuthorizeSetting.microphoneAuthorized == 'authorized' || appAuthorizeSetting
						.microphoneAuthorized ==
						'not determined') {
						uni.navigateTo({
							url: "/pages/song/songLists"
						})
					} else {
						uni.showModal({
							title: "请开启录音权限",
							content: "请去设置里面开启录音权限！",
							success(res1) {
								if (res1.confirm) {
									permision.gotoAppPermissionSetting()
								}
							}
						})
					}
				} else {
					var result = await permision.requestAndroidPermission('android.permission.RECORD_AUDIO');
					if (result == 1) {
						uni.navigateTo({
							url: "/pages/song/songLists"
						})
					} else {
						uni.showModal({
							title: "请开启录音权限",
							content: "请去设置里面开启录音权限！",
							success(res1) {
								if (res1.confirm) {
									permision.gotoAppPermissionSetting()
								}
							}
						})
					}
				}

				// #endif
				// #ifdef H5
				uni.navigateTo({
					url: "/pages/song/songLists"
				})
				// #endif
			}
		}
	}
</script>

<style lang="scss" scoped>
	.module {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(255, 255, 255, 0.8);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		z-index: 999;

		.lodding {
			width: 100rpx;
			height: 100rpx;
		}

		.cancel {
			margin-top: 50rpx;
			color: #FE4373;
		}
	}

	// ---------
	.bannerImg {
		width: 400rpx;
		height: 400rpx;
	}

	.title {
		font-size: 36rpx;
		color: #555555;
		text-align: center;
	}

	.sunTitle {
		font-size: 32rpx;
		color: #555555;
		margin: 25rpx 100rpx;
	}

	.okBtn {
		width: 650rpx;
		height: 85rpx;
		background: inherit;
		background-color: #FE4373;
		border-radius: 43px;
		color: #fff;
		text-align: center;
		line-height: 85rpx;
		margin: 50rpx auto;
		font-size: 32rpx;
	}

	.tips {
		border: 1rpx dashed #999;
		padding: 10rpx;
		margin: 0 auto;
		width: 550rpx;
		color: #999;
		line-height: 50rpx;
	}
</style>