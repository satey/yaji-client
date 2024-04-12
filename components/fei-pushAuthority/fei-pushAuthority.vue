<template>
	<view>
		<u-popup :show="isPushShow" mode="bottom" :closeable="false" :round="20"
			:customStyle="{background:'transparent'}">
			<view class="pushContainer">
				<view class="pushBg">
					<u-icon @click="isPushShow =false" style="position: absolute;top: 25rpx;right: 25rpx;z-index: 9999;"
						name="close" color="#909399" size="35" bold></u-icon>
					<view
						style="position: absolute;left: 0;width: 100%;bottom: 70rpx;display: flex;align-items: center;justify-content: center;">
						<view @click="oepnSet"
							style="width: 383rpx;height: 85rpx;background: #FFA800;border-radius: 50rpx;text-align: center;line-height: 85rpx;color: #fff;font-size: 35rpx;">
							开启通知
						</view>
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
				isPushShow: false
			}
		},
		created() {
			// #ifdef APP
			if (uni.getAppAuthorizeSetting().notificationAuthorized != 'authorized') {
				console.log(uni.getAppAuthorizeSetting().notificationAuthorized)
				this.$api("teenageMode.youngModelInfo",{
					type:2
				}).then(res => {
					console.log(res)
					if (res.data.is_push_notice_dialog == 1) {
						this.isPushShow = true;
					}
				})
			}
			// #endif
		},
		methods: {
			oepnSet() {
				this.isPushShow = false;
				// #ifdef APP
				uni.openAppAuthorizeSetting({
					success(res) {
						console.log(res)
					},
					fail() {
						uni.showToast({
							icon: "none",
							title: "打开失败"
						})
					}
				})
				// #endif
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pushContainer {
		padding: 0rpx 33rpx 126rpx 33rpx;
		box-sizing: border-box;
	}

	.pushBg {
		background-image: url(/static/pushBg2.png);
		background-position: 100% 100%;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		box-sizing: border-box;
		height: 661rpx;
		width: 100%;
		position: relative;
	}
</style>