<template>
	<view class="start">
		<image src="@/static/start/start.png" class="lodding" mode="" @click="openUrl"></image>
		<view class="timeNumBox" @click="skip">跳过 {{timeNum}}</view>
	</view>
</template>

<script>
	import user from '../../common/store/modules/user';
	export default {
		data() {
			return {
				phoneMode: uni.getSystemInfoSync().platform,
				startImg: "",
				timeNum: 2,
				isSkip:false
			}
		},
		onReady() {
			var that = this;
			var interval = setInterval(function() {
				that.timeNum = --that.timeNum
				if (that.timeNum <= 0) {
					clearInterval(interval)
				}
			}, 1000)
			var timeOut = setTimeout(() => {
				let token = uni.getStorageSync('token');
				console.log(that.isSkip)
				if(that.isSkip == false){
					if (token) {
						let userInfo = uni.getStorageSync('userInfo');
						if (userInfo.gender == 0) {
							uni.reLaunch({
								url: '/pages/auth/s1'
							});
						} else {
							uni.reLaunch({
								url: '/pages/index/index'
							});
						}
					} else {
						uni.reLaunch({
							url: '/pages/auth/login'
						});
					}
				}
				clearTimeout(timeOut)
			}, 2200)
			if (that.phoneMode == 'ios') {
				that.$api("pay.getApplePayProductList").then(res => {
					that.product = res.data;
					if (res.code == 1) {
						that.product = res.data;
						uni.getProvider({
							service: 'payment',
							success: (res) => {
								if (res.provider.length == 0) {
									return;
								}
								that.iapChannel = res.providers.find((channel) => {
									return (channel.id === 'appleiap')
								})
								that.iapChannel.restoreComplateRequest({
									manualFinishTransaction: true
								}, function(results) {
									console.log(results)
									results.forEach((item, index) => {
										that.$api("pay.apple_pay_callback", {
											order_sn: '',
											transaction_id: item
												.transactionIdentifier,
											receipt_data: item
												.transactionReceipt
										}).then(apple_pay_res => {
											console.log(apple_pay_res)
											if (apple_pay_res.code == 1) {
												that.iapChannel
													.finishTransaction(item)
											}
										})
									})
								});
							}
						})
					}
				})
			}
		},
		methods: {
			skip() {
				let token = uni.getStorageSync('token');
				this.isSkip = true;
				if (token) {
					let userInfo = uni.getStorageSync('userInfo');
					if (userInfo.gender == 0) {
						uni.reLaunch({
							url: '/pages/auth/s1'
						});
					} else {
						uni.reLaunch({
							url: '/pages/index/index'
						});
					}
				} else {
					uni.reLaunch({
						url: '/pages/auth/login'
					});
				}
			},
			openUrl() {
				// #ifdef APP-PLUS
				plus.runtime.openURL(
					"https://o.youku.com/m/6xlbqybldi?unic_co=pha&hideNavigatorBar=true&unicLoading=null&shouldHideNavigationBar=1&isNeedBaseImage=1&bc_fl_src=youku&refer=shaonianbaimazuichunfeng_market_platform.milo.yg_0"
				)
				// #endif
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
	}

	.start {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.lodding {
		width: 100vw;
		height: 100vh;
	}

	.timeNumBox {
		position: fixed;
		top: 80rpx;
		right: 25rpx;
		z-index: 9;
		background: rgba(255, 255, 255, 0.8);
		padding: 8rpx 15rpx;
		box-sizing: border-box;
		font-size: 25rpx;
		border-radius: 50rpx;
		margin-top: var(--status-bar-height);
	}
</style>