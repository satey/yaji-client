<template>
	<view style="background: #F8F8F7;min-height: 100%;height: 100vh;">
		<u-navbar title="未成年模式" :bgColor="'#F8F8F7'" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view style="padding: 35rpx; 37rpx 0rpx 37rpx;box-sizing: border-box;font-size: 28rpx;color: #333333;">
			<text>{{teenageModeData.dialog_content}}</text>
		</view>
		<view style="padding:0rpx 30rpx;position: fixed;left: 0;bottom: 68rpx;width: 100vw;">
			<view v-if="teenageModeData.young_model_switch ==2" @click="$u.route('pages/public/closeTeenageMode',{
				mode:'close'
			})" style="width: 690rpx;height: 85rpx;color: #FFFFFF;font-size: 36rpx;text-align: center;line-height: 85rpx;background: #FFA000;border-radius: 50rpx;">
				关闭未成年模式</view>
			<view v-if="teenageModeData.young_model_switch ==1" @click="openTeenageMode"
				style="width: 690rpx;height: 85rpx;color: #FFFFFF;font-size: 36rpx;text-align: center;line-height: 85rpx;background: #FFA000;border-radius: 50rpx;">
				开启未成年模式</view>
			<!-- 	<view v-if="teenageModeData.is_set_pwd ==1" @click="$u.route('pages/public/setPassword')"
				style="width: 690rpx;height: 85rpx;color: #666666;font-size: 36rpx;text-align: center;line-height: 85rpx;border-radius: 50rpx;border:1px solid #999999 ;margin-top: 25rpx;box-sizing: border-box;">
				修改密码</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				teenageModeData: []
			}
		},
		onShow() {
			this.youngModelInfo()
		},
		methods: {
			//青少年模式
			youngModelInfo() {
				this.$api("teenageMode.youngModelInfo",{
					type:1
				}).then(res => {
					if (res.code == 1) {
						this.teenageModeData = res.data;
					}
				})
			},
			openTeenageMode() {
				if (this.teenageModeData.is_set_pwd == 1) {
					this.$api("teenageMode.changeYoungModelStatus", {
						status: 2
					}).then(res => {
						uni.showToast({
							icon: "none",
							title: res.msg
						})
						this.youngModelInfo()
					})
				} else {
					this.$u.route('pages/public/setPassword')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		min-height: 100vh;
		background: #F8F8F7;
	}
</style>