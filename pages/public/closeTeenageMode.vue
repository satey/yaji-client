<template>
	<view style="background: #F8F8F7;min-height: 100%;height: 100vh;">
		<u-navbar title="" :bgColor="'#F8F8F7'" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i v-if="mode=='close'" class="ri-arrow-left-s-line text-3xl"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view>
			<view style="color: #333333;font-size: 36rpx;text-align: center;">
				关闭未成年人模式
			</view>
			<view style="color: #666666;font-size: 30rpx;text-align: center;margin-top: 25rpx;">
				请输入密码确认
			</view>
			<view
				style="display: flex;margin-top: 35rpx;position: relative;box-sizing: border-box;align-items: center;justify-content: center;">
				<view style="display: flex;position: relative;">
					<block v-for="(item,index) in 4" :key="index">
						<view @touchend.prevent="onTap" class="kuang" @click="passwordValue = '';passwordFocus = true;"
							:style="{border:passwordValue.length ==index?'1px solid #FFA000':'1px solid transparent',marginRight:index==3?'0':'30rpx'}"
							style="width: 92rpx;height: 92rpx;border-radius: 8rpx;background: #D9D9D9;text-align: center;display: flex;align-items: center;justify-content: center;">
							<view v-if="passwordValue.length >=index+1"
								style="width: 12rpx;height: 12rpx;border-radius: 50%;background: #000000;"></view>
						</view>
					</block>
					<input type="number" v-model="passwordValue" @input="changePassword" @focus="passwordValue = ''"
						:focus='passwordFocus'
						style="opacity: 0;border-radius: 8rpx;background: #D9D9D9;text-align: center;margin-right: 30rpx;width: 100%;height: 100%;position: absolute;top: 0;left: 0;border: 1px solid red;box-sizing: border-box;">
				</view>
			</view>
			<view style="text-align: center;margin-top: 40rpx;color: #666666;font-size: 30rpx;">
				<text>忘记密码了？</text><text style="color: #FF7A00;" @click="getPasswordShow=true">点击找回</text>
			</view>

			<!-- <input type="number" password="true" :focus='passwordFocus'
				style="width: 92rpx;height: 92rpx;border-radius: 8rpx;background: #D9D9D9;text-align: center;margin-right: 30rpx;visibility: hidden;"> -->
		</view>
		<u-popup :show="getPasswordShow" @close="getPasswordShow = false" mode="center" :overlayOpacity="0.5"
			:closeable="false" :round="20" :customStyle="{background:'#fff'}">
			<view class="teenageMode">
				<view style="font-size: 33rpx;color: #333333;text-align: center;">找回密码</view>
				<view style="font-size: 28rpx;color: #666666;margin-top: 43rpx;">请联系客服，人工验证身份后找回密码</view>
				<view style="margin-top: 33rpx;display: flex;align-items: center;">
					<text style="color: #333333;font-size: 28rpx;">客服QQ：6428882</text>
					<text @click="copy(copyQQ)">
						<img style="width: 30rpx; height: 30rpx; margin-left: 20rpx;"
							src="	https://axhub.im/ax10/85ee1db375b49826/images/%E5%85%B3%E4%BA%8E/u5.svg" alt="">
					</text>
				</view>
				<view style="margin-top: 33rpx;display: flex;align-items: center;">
					<text style="color: #333333;font-size: 28rpx;">微信：yajixiaoya</text>
					<text @click="copy(copyWechat)">
						<img style="width: 30rpx; height: 30rpx; margin-left: 20rpx;"
							src="	https://axhub.im/ax10/85ee1db375b49826/images/%E5%85%B3%E4%BA%8E/u5.svg" alt="">
					</text>
				</view>
				<view @click="getPasswordShow =false"
					style="width: 195rpx;height: 85rpx;text-align: center;line-height: 85rpx;color: #fff;font-size: 36rpx;background: #ffa000;margin: 0 auto;margin-top: 72rpx;border-radius: 50rpx;">
					关闭
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				passwordFocus: true,
				passwordValue: "",
				getPasswordShow: false,
				copyQQ: '6428882',
				copyWechat: 'yajixiaoya',
				mode: 'close'
			}
		},
		onLoad(e) {
			console.log(e)
			this.mode = e.mode;
		},
		methods: {
			onTap() {},
			clickPassword() {
				this.passwordFocus = false;
				this.$nextTick(() => {
					this.passwordFocus = true;
				})

				console.log(this.passwordFocus)
			},
			// 复制
			copy(value) {
				uni.setClipboardData({
					data: value,
					success: function() {
						//调用方法成功
						console.log('success');
					}
				})
			},
			changePassword(e) {
				this.passwordValue = e.detail.value;
				if (e.detail.value.length >= 4) {
					this.passwordFocus = false;
					this.$api("teenageMode.changeYoungModelStatus", {
						status: 1,
						password: this.passwordValue
					}).then(res => {
						uni.showToast({
							icon: "none",
							title: res.msg
						})
						if (res.code == 1) {
							if (this.mode == 'close') {
								let timeOut = setTimeout(() => {
									this.$u.route({
										type: 'navigateBack',
										delta: 1
									})
									clearTimeout(timeOut)
								}, 1000)
							} else {
								let timeOut = setTimeout(() => {
									uni.reLaunch({
										url: `/pages/index/index`
									});
									clearTimeout(timeOut)
								}, 1000)
							}
						} else {
							this.passwordValue = '';
							this.passwordFocus = true;
						}

					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.kuang:last-child {
		margin-right: 0rpx;
	}

	.teenageMode {
		width: 626rpx;
		height: 506rpx;
		background: #fff;
		border-radius: 10rpx;
		padding: 33rpx 32rpx;
		box-sizing: border-box;
	}
</style>