<template>
	<view>
		<u-navbar title="充值" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" style="color: #333 !important;"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view style="padding-bottom: 40rpx;">
			<view style="font-size: 30rpx;color: #323232;padding-left: 30rpx;">选择充值数额：</view>
			<view class="numList">
				<view class="numItem" :class="currentIndex == index?'numItemActive':''"
					v-for="(item,index) in copperList" @click="selectMoney(index,item.money,item.copper,item.id)">
					<view><text class="num">{{item.copper}}</text><text class="numText">铜钱</text></view>
					<view class="money">{{item.money}}元</view>
					<image v-show="currentIndex == index" src="../../static/czicon.png" class="selectIcon" mode="">
					</image>
				</view>
			</view>
		</view>
		<view class="selectType">
			<radio-group @change="radioChange">
				<label>
					<view style="display: flex;align-items: center;justify-content: space-between;padding: 30rpx;">
						<view style="display: flex;align-items: center;">
							<image class="typeImg" src="/static/vv.png" mode=""></image>
							<view>
								<view style="display: flex;align-items: center;">
									<view style="font-size: 30rpx; color: #323232;">微信支付</view>
									<image src="/static/tj.png" mode="widthFix"
										style="width: 70rpx;height: 40rpx;margin-left: 20rpx;"></image>
								</view>
								<view style="color: #A9A8A8;font-size: 22rpx;">亿万用户的选择，更快更安全</view>
							</view>
						</view>
						<radio value="wechat" checked="true" color="#FE4373" style="transform: scale(0.9);" />
					</view>
				</label>
				<!-- 后续开放 -->
				<label>
					<view style="display: flex;align-items: center;justify-content: space-between;padding: 30rpx;">
						<view style="display: flex;align-items: center;">
							<image class="typeImg" src="/static/zfb.png" mode=""></image>
							<view style="font-size: 30rpx; color: #323232;">支付宝支付</view>
						</view>
						<radio value="alipay" color="#FE4373" style="transform: scale(0.9);" />
					</view>
				</label>
			</radio-group>
		</view>
		<view class="footer">
			<!-- 	<checkbox-group @change="isCheckedChange">
				<label>
					<view style="display: flex;align-items: center;margin-bottom: 20rpx;justify-content: center;">
						<checkbox value="checked" :checked="isChecked" color="#FE4373" style="transform: scale(0.8);" />
						<view class="footerTitle">同意<text style="color: #FE4373;"
								@click="$u.route('/pages/public/page', { id: 4 })">《充值协议》</text></view>
					</view>
				</label>
			</checkbox-group> -->
			<view style="display: flex;align-items: center;justify-content: space-between;">
				<view style="height: 85rpx;display: flex;flex-direction: column;justify-content: space-between;">
					<view style="font-size: 32rpx;color: #1F1F1F;">支付：<text
							style="color: #FE4373;">￥{{moneyCount}}</text></view>
					<view style="font-size: 24rpx;color: #A9A8A8;">到账铜钱{{copper}}</view>
				</view>
				<view class="btnOk" @click="recharge">立即充值</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				payType: "wechat",
				currentIndex: 0,
				copperList: [],
				moneyCount: "",
				copper: "",
				copperListItem: null,
				copperId: null,
				isChecked: false,
			};
		},
		onLoad() {
			this.moneyList();
		},
		methods: {
			// isCheckedChange(e) {
			// 	if (e.detail.value.length) {
			// 		this.isChecked = true;
			// 	} else {
			// 		this.isChecked = false;
			// 	}
			// },
			//充值
			recharge() {
				var that = this;
				// if (!this.isChecked) {
				// 	that.$u.toast('请勾选协议')
				// 	return;
				// }
				uni.showLoading();
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
										},
										fail(e) {
											uni.hideLoading();
											that.$u.toast('支付失败')
										}
									})
									break;
								case 'alipay':
									uni.requestPayment({
										"provider": "alipay",
										"orderInfo": resData.data,
										success(res) {
											uni.hideLoading();
											that.$u.toast('支付成功')
										},
										fail(e) {
											uni.hideLoading();
											that.$u.toast('支付失败')
										}
									})
									break;
							}
						})
					}
				})



			},
			//充值铜钱列表
			moneyList() {
				var that = this;
				that.$api("user_recharge.moneyList").then((res) => {
					if (res.code == 1) {
						that.copperList = res.data;
						that.moneyCount = res.data[0].money
						that.copper = res.data[0].copper;
						that.copperId = res.data[0].id;

					}
				})
			},
			//选择
			selectMoney(index, money, copper, id) {
				this.currentIndex = index;
				this.moneyCount = money;
				this.copper = copper;
				this.copperId = id;
			},
			radioChange(evt) {
				this.payType = evt.detail.value
			},
		}
	}
</script>

<style lang="scss">
	.footer {
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		box-sizing: border-box;
		padding: 0rpx 40rpx 30rpx 40rpx;
	}

	.btnOk {
		width: 200rpx;
		height: 85rpx;
		line-height: 85rpx;
		text-align: center;
		color: #fff;
		font-size: 28rpx;
		border-radius: 43rpx;
		background: #FE4373;
	}

	.footerTitle {
		color: #A9A8A8;
		font-size: 22rpx;
		text-align: center;
	}

	.selectType {
		border-top: 16rpx solid #f7f7f7;
	}

	.typeImg {
		width: 42rpx;
		height: 42rpx;
		margin-right: 20rpx;
	}

	.numList {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		padding-right: 30rpx;
	}

	.numItem {
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
		background: rgba(254, 67, 115, 0.1) !important;
		border: 2rpx solid #FE4373 !important;
	}

	.num {
		color: #323232;
		font-size: 40rpx;
		font-weight: bold;
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