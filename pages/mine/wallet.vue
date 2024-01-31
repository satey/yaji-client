<template>
	<view style="min-height: 100vh;background: #F8F8F8;height: 100%;">
		<u-navbar title="钱包" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" style="color: #333 !important;"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<u-popup :show="exchangeActive" @close="exchangeActive = false" mode="center" :closeable="false" :round="20">
			<view class="exchangeContainer">
				<view class="exchangeBox">
					<view style="display: flex;align-items: center;justify-content: space-between;">
						<view style="display: flex;flex-direction: column;align-items: center;">
							<text style="color:#FFA000 ;font-size: 28rpx;font-weight: bold;">可兑风雅度</text>
							<text
								style="color:#FFA000 ;font-size: 56rpx;font-weight: bold;margin-top: 62rpx;">{{fengyadu.my_usable_fengyadu}}</text>
						</view>
						<view style="display: flex;flex-direction: column;align-items: center;">
							<text style="color:#FFA000 ;font-size: 28rpx;font-weight: bold;">可兑铜钱</text>
							<text
								style="color:#FFA000 ;font-size: 56rpx;font-weight: bold;margin-top: 62rpx;">{{fengyadu.money}}</text>
						</view>
					</view>
				</view>
				<view style="color:#FFFFFF ;font-size: 28rpx;margin-top: -25rpx;">新获得的风雅度，要经过24小时以后才可兑换哦~整百起兑！</view>
				<view class="exchangeBtn" @click="exchangeFengyaodu">全部兑换</view>
			</view>
		</u-popup>
		<view class="moneyContainer">
			<view class="record" @click="$u.route('/pages/mine/moneyRecord')">
				<text>查看记录</text>
				<i class="iconfont icon-right"></i>
			</view>
			<view style="color:#fff ;font-size: 30rpx;">铜钱</view>
			<view>
				<view style="display: flex;align-items: center;">
					<image style="width: 60rpx;height: 60rpx;margin-right: 20rpx;" src="@/static/qian.png" mode="">
					</image>
					<text style="font-size: 56rpx;color: #fff;font-family: font-test !important;">{{money}}</text>
				</view>
				<view style="display: flex;align-items: center;justify-content: space-between;">
					<view />
					<view class="purchaseBtn" @click="$u.route('/pages/mine/recharge')">购买铜钱</view>
				</view>
			</view>
		</view>
		<view class="fengyaContainer">
			<view class="fengyaNum">{{feng_ya_du}}</view>
			<view class="exchange" @click="exchangeActive=true">兑换铜钱</view>
		</view>
		<feiqslsHit></feiqslsHit>
	</view>
</template>
<script>
	export default {
		name: 'wallet',
		components: {},
		data() {
			return {
				money: 0,
				feng_ya_du: 0,
				exchangeActive: false,
				fengyadu: {}
			}
		},
		onLoad() {
			this.setFontFamily()
		},
		onShow() {
			this.getUserInfo();
			this.exchange()
		},
		methods: {
			//兑换
			exchangeFengyaodu() {
				let that = this;
				that.$api("fengyadu.fengyadu_redeem_money").then(res => {
					that.exchangeActive = false;
					that.getUserInfo()
					uni.showToast({
						icon: "none",
						title: res.msg
					})
				})
			},
			//可兑换风雅度信息
			exchange() {
				let that = this;
				that.$api("fengyadu.my_usable_fengyadu").then((res) => {
					if (res.code == 1) {
						that.fengyadu = res.data;
					} else {
						uni.showToast({
							icon: "none",
							title: res.msg
						})
					}
				})
			},
			//设置字体
			setFontFamily() {
				// #ifdef APP-PLUS
				uni.loadFontFace({
					family: 'font-test',
					// 本地字体路径需转换为平台绝对路径
					source: `url(${plus.io.convertLocalFileSystemURL('_www/static/AaHouDiHei.ttf')})`,
					success() {
						console.log('success')
					},
					fail(e) {
						console.log('fail')
					}
				})
				// #endif
			},
			//获取用户信息
			getUserInfo() {
				var that = this;
				that.$api("user.info").then(res => {
					if (res.code == 1) {
						that.money = res.data.money;
						that.feng_ya_du = res.data.feng_ya_du;
					}
				})
			},
		}
	}
</script>
<style lang="scss" scoped>
	page {
		height: 100vh;
		background: #F8F8F8;
	}

	.moneyContainer {
		margin: 50rpx 40rpx;
		height: 298rpx;
		background-image: url(@/static/qianbaoBg.png);
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		position: relative;
		padding: 52rpx 50rpx 32rpx 35rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.record {
			height: 46rpx;
			line-height: 46rpx;
			text-align: center;
			color: #fff;
			font-size: 26rpx;
			background: rgba(255, 255, 255, 0.3);
			position: absolute;
			top: 0;
			right: 0;
			border-radius: 0rpx 20rpx 0rpx 20rpx;
			padding: 0rpx 10rpx;
			display: flex;
			align-items: center;
		}

		.purchaseBtn {
			display: inline;
			padding: 9rpx 28rpx;
			box-sizing: border-box;
			background: #fff;
			line-height: 62rpx;
			border-radius: 36rpx;
			font-size: 36rpx;
			font-family: font-test !important;
			color: #FFA000;
		}
	}

	.fengyaContainer {
		margin: 50rpx;
		height: 188rpx;
		background-image: url(@/static/fengyadu.png);
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		position: relative;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: relative;

		.fengyaNum {
			font-size: 80rpx;
			font-weight: bold;
			line-height: 188rpx;
			padding-left: 150rpx;
			background-image: -webkit-linear-gradient(bottom, #FFA102, #FFC52F);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			font-family: font-test !important;
		}

		.exchange {
			font-size: 36rpx;
			color: #FFA000;
			font-family: font-test !important;
			padding: 9rpx 10rpx;
			background: #fff;
			position: absolute;
			right: 0;
			top: 50%;
			transform: translateY(-50%);
			border-radius: 31rpx 0rpx 0rpx 31rpx;
		}
	}

	.exchangeContainer {
		height: 615rpx;
		width: 590rpx;
		background: linear-gradient(180deg, #FFDC7E 0%, #FF9B05 100%);
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		padding: 87rpx 30rpx 95rpx 30rpx;
		box-sizing: border-box;

		.exchangeBox {
			height: 388rpx;
			background-image: url(@/static/iconImage/tiqubg.png);
			background-position: 100% 100%;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			position: relative;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			position: relative;
			padding: 43rpx 70rpx 0rpx 70rpx;
			box-sizing: border-box;
		}

		.exchangeBtn {
			background-image: url(@/static/iconImage/tiquBtnBg.png);
			background-position: 100% 100%;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			font-family: font-test !important;
			width: 416rpx;
			padding: 30rpx 0rpx;
			text-align: center;
			margin: 0 auto;
			font-size: 36rpx;
			color: #fff;
			margin-top: 65rpx;
		}
	}
</style>