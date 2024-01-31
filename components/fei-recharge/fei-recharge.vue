<template>
	<view class="fei-recharge">
		<u-popup :show="rechargeShow" @close="showAction = false" :closeable="false" :round="30">
			<view style="background: #f7f7f7;border-radius: 30rpx;">
				<view
					style="display: flex;align-items: center;justify-content: space-between;padding: 30rpx 30rpx 0rpx 30rpx;">
					<view></view>
					<view style="text-align: center;color: #000;font-size: 28rpx;">余额不足</view>
					<text class="ri-close-fill" style="font-size: 32rpx;color: #000;"
						@click="rechargeShow = false"></text>
				</view>

				<view>
					<view class="numList" v-if="platform =='ios'">
						<view class="numItem" :class="currentIndex == index?'numItemActive':''"
							v-for="(item,index) in copperList.slice(0,3)" @click="iosSelectMoney(item,index)">
							<view><text class="num">{{item.title}}</text><text class="numText">铜钱</text></view>
							<view class="money">{{item.price}}元</view>
							<image v-show="currentIndex == index" src="../../static/czicon.png" class="selectIcon"
								mode="">
							</image>
						</view>
					</view>
					<view class="numList" v-if="platform =='android'">
						<view class="numItem" :class="currentIndex == index?'numItemActive':''"
							v-for="(item,index) in copperList.slice(0,3)"
							@click="selectMoney(index,item.money,item.copper,item.id)">
							<view><text class="num">{{item.copper}}</text><text class="numText">铜钱</text></view>
							<view class="money">{{item.money}}元</view>
							<image v-show="currentIndex == index" src="../../static/czicon.png" class="selectIcon"
								mode="">
							</image>
						</view>
					</view>
				</view>
				<radio-group @change="radioChange" v-if="platform!='ios'">
					<view
						style="display: flex;align-items: center;justify-content: space-between;margin-bottom: 56rpx;padding: 0rpx 30rpx;box-sizing: border-box;">
						<label class="type">
							<view style="display: flex;align-items: center;">
								<image src="/static/zfb.png" style="width: 43rpx;height: 43rpx;" mode=""></image>
								<text style="margin-left: 20rpx;color: #323232;font-size: 26rpx;">支付宝支付</text>
							</view>
							<radio value="alipay" checked="true" color="#FFA000" style="transform: scale(0.9);" />
						</label>
						<label class="type">
							<view style="display: flex;align-items: center;">
								<image src="/static/vv.png" style="width: 43rpx;height: 43rpx;" mode=""></image>
								<text style="margin-left: 20rpx;color: #323232;font-size: 26rpx;">微信支付</text>
							</view>
							<radio value="wechat" checked="false" color="#FFA000" style="transform: scale(0.9);" />
						</label>
					</view>
				</radio-group>
				<view
					style="display: flex;align-items: center;justify-content: space-between;padding: 30rpx 40rpx;box-sizing: border-box;background: #fff;">
					<view>
						<view>
							<text style="color: #1F1F1F;font-size: 32rpx;">支付：</text>
							<text style="color: #FFA000;font-size: 32rpx;">￥{{moneyCount}}</text>
						</view>
						<view style="color: #A9A8A8;font-size: 23rpx;margin-top: 15rpx;">到账铜钱{{copper}}</view>
					</view>
					<view @click="recharge"
						style="width: 200rpx;height: 85rpx;background: #FFA000;border-radius: 42rpx 42rpx 42rpx 42rpx;opacity: 1;text-align: center;line-height: 85rpx;color: #fff;font-size: 28rpx;">
						充值</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rechargeShow: false,
				copperList: [],
				currentIndex: 0,
				copperListItem: null,
				copper: "",
				moneyCount: "",
				copperId: null,
				payType: "wechat",
				platform: uni.getSystemInfoSync().platform,
				product: [],
				iapChannel: null
			}
		},
		beforeMount() {
			
		},
		methods: {
			show() {
				console.log("chongzhi")
				this.rechargeShow = true;
				this.moneyList()
			},
			recharge() {
				var that = this;
				uni.showLoading();
				if (that.platform == 'ios') {
					that.iapChannel.requestOrder(that.product, function() {
						uni.requestPayment({
							provider: 'appleiap',
							orderInfo: {
								"productid": that.copperId,
								"quantity": 1,
								"manualFinishTransaction": true
							},
							success: (e) => {
								console.log(e)
								that.$api("pay.apple_pay_callback", {
									order_sn: "",
									transaction_id: e.transactionIdentifier,
									receipt_data: e.transactionReceipt
								}).then(apple_pay_res => {
									console.log(apple_pay_res)
									if (apple_pay_res.code == 1) {
										that.rechargeShow = false;
										that.iapChannel.finishTransaction(e)
									}
								})
							},
							fail: (err) => {
								uni.showToast({
									icon: "none",
									title: "充值失败"
								})
							},
							complete() {
								uni.hideLoading()
							}
						})
					})
					return;
				} else {
					that.$api("pay.order", {
						"id": that.copperId
					}).then(orderRes => {
						if (orderRes.code == 1) {
							var order_sn = orderRes.data;
							that.$api("pay.prepay", {
								type: that.payType,
								order_sn: order_sn
							}).then(resData => {
								switch (that.payType) {
									case 'wechat':
										var data = JSON.parse(resData.data);
										uni.requestPayment({
											"provider": "wxpay",
											"orderInfo": data,
											success(res) {
												uni.hideLoading();
												that.$u.toast('支付成功')
												that.rechargeShow = false;
												that.payType = 'wechat';
												that.moneyList();
												that.currentIndex = 0;
											},
											fail(e) {
												uni.hideLoading();
												that.$u.toast('支付失败');
												that.rechargeShow = false;
												that.payType = 'wechat';
												that.moneyList();
												that.currentIndex = 0;
											}
										})
										break;
									case 'alipay':
										uni.requestPayment({
											"provider": "alipay",
											"orderInfo": resData.data,
											success(res) {
												uni.hideLoading();
												that.$u.toast('支付成功');
												that.rechargeShow = false;
												that.payType = 'wechat';
												that.moneyList();
												that.currentIndex = 0;
											},
											fail(e) {
												uni.hideLoading();
												that.$u.toast('支付失败');
												that.rechargeShow = false;
												that.payType = 'wechat'
												that.moneyList();
												that.currentIndex = 0;
											}
										})
										break;
								}
							})
						}
					})
				}
			},
			radioChange(evt) {
				this.payType = evt.detail.value
			},
			//android选择
			selectMoney(index, money, copper, id) {
				this.currentIndex = index;
				this.moneyCount = money;
				this.copper = copper;
				this.copperId = id;
			},
			//苹果选择
			iosSelectMoney(item, index) {
				this.currentIndex = index;
				this.moneyCount = item.price;
				this.copper = item.title;
				this.copperId = item.productid;
			},
			//充值铜钱列表
			moneyList() {
				var that = this;
				console.log(that.platform)
				if (that.platform == 'ios') {
					uni.showLoading()
					that.$api("pay.getApplePayProductList").then(res => {
						if (res.code == 1) {
							that.product = res.data;
							uni.getProvider({
								service: 'payment',
								success: (res) => {
									console.log(res)
									that.iapChannel = res.providers.find((channel) => {
										return (channel.id === 'appleiap')
									})
									console.log(that.iapChannel)
									that.iapChannel.requestProduct(that.product, function(productRes) {
										console.log(productRes)
										uni.hideLoading()
										productRes.sort((a, b) => {
											return a.price - b.price
										})
										that.copperList = productRes;
										that.moneyCount = that.copperList[0].price
										that.copper = that.copperList[0].title;
										that.copperId = that.copperList[0].productid;
									})
									that.iapChannel.restoreCompletedTransactions({
										manualFinishTransaction: true,
									}, (res) => {
										if (res.length != 0) {
											res.forEach((item, index) => {
												that.iapChannel
													.finishTransaction(item)
											})
										}
									}, (err) => {
										console.log(err);
									})
								}
							})
						}
					})
				} else if (that.platform == 'android') {
					that.$api("user_recharge.moneyList").then((res) => {
						if (res.code == 1) {
							that.copperList = [];
							that.copperList = res.data;
							that.moneyCount = res.data[0].money
							that.copper = res.data[0].copper;
							that.copperId = res.data[0].id;
						}
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.type {
		width: calc(100% / 2 - 15rpx);
		height: 115rpx;
		background: #fff;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		padding: 35rpx 20rpx 35rpx 40rpx;
		box-sizing: border-box;
		justify-content: space-between;
	}

	.numList {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		padding-right: 30rpx;
		margin-top: 20rpx;
		margin-bottom: 50rpx;
	}

	.numItem {
		background: #fff;
		width: calc(100% / 3 - 30rpx);
		border: 2rpx solid #ECECEC;
		box-sizing: border-box;
		height: 120rpx;
		margin-left: 30rpx;
		margin-top: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 10rpx;
		position: relative;
		overflow: hidden;
		transition: all 0.3s;
	}

	.selectIcon {
		position: absolute;
		right: -2rpx;
		bottom: -2rpx;
		width: 45rpx;
		height: 35rpx;
		transition: all 0.3s;
	}

	.numItemActive {
		background: #FFDDA4 !important;
		border: 2rpx solid #FFA000 !important;
	}

	.num {
		color: #323232;
		font-size: 40rpx;
		margin-right: 5rpx;
	}

	.numText {
		color: #323232;
		font-size: 25rpx;
	}

	.money {
		color: #808080;
		font-size: 25rpx;
	}
</style>