<template>
	<view class="start">
		<image src="@/static/start/start.png" class="lodding" mode=""></image>
	</view>
</template>

<script>
	import user from '../../common/store/modules/user';
	export default {
		data() {
			return {
				phoneMode: uni.getSystemInfoSync().platform,
				startImg: ""
			}
		},
		onReady() {
			var that = this;
			var timeOut = setTimeout(() => {
				let token = uni.getStorageSync('token');
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
				clearTimeout(timeOut)
			}, 2000)
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
</style>