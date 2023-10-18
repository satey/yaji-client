<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<view class="px-4"
		style="background: #ffd9e3;height: 100%;min-height: 100vh;padding: 30rpx;box-sizing: border-box;">
		<!-- <image src='@/static/user_background.png' style="position: fixed; width: 100%; height: 100%; top: 0; left: 0; z-index: -1"></image> -->
		<u-navbar bgColor="transparent" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-4xl text-black"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
			<view slot="center">
				<view class="text-black">我的礼物</view>
			</view>
			<view slot="right">
				<view class="text-right" style="color: #999999;" @click="skipGifts">礼物记录</view>
			</view>
		</u-navbar>
		<view class="head">
			<view style="padding-top: 36rpx;margin-left: 44rpx;color: #585858;font-size: 28rpx;">风雅度</view>
			<view style="padding-top: 36rpx;margin-left: 146rpx;color: #585858;font-size: 58rpx;">
				{{userInfo.feng_ya_du}}
			</view>
			<view style="display: flex;align-items: center;justify-content: space-between;">
				<view></view>
				<view class="exchange" @click="exchange">兑换铜钱</view>
			</view>
		</view>
		<u-modal :show="exchangeActive" :closeOnClickOverlay='true' :showConfirmButton="false" :showCancelButton="false"
			@confirm="$u.route('/pages/mine/recharge')">
			<view style="width: 100%;">
				<view style="display: flex;flex-direction: column;width: 100%;">
					<view
						style="display: flex;align-items: center;justify-content: space-between;font-size: 28rpx;color: #999999;">
						<text>可兑风雅度</text>
						<text>可得铜钱</text>
					</view>
				</view>
				<view
					style="display: flex;align-items: center;justify-content: center;margin-top: 39rpx;font-size: 59rpx;color: #766B84;">
					<text>{{fengyadu.my_usable_fengyadu}}</text>
					<image style="width: 50rpx;height: 50rpx;margin: 0rpx 44rpx;" src="../../static/right.png" mode="">
					</image>
					<text>{{fengyadu.money}}</text>
				</view>
				<view style="font-size: 28rpx;color: #999999;margin-top: 66rpx;">
					新获得的风雅度，要经过24小时以后才可兑换。整百起兑
				</view>
				<view style="display: flex;align-items: center;justify-content: space-between;">
					<view @click="exchangeActive=false"
						style="width: 250rpx;height: 80rpx;font-size: 28rpx;color: #767676;line-height: 80rpx;text-align: center;border-radius: 8rpx;margin: 0 auto;margin-top: 66rpx;border:1px solid #C7C7C7">
						取消</view>
					<view @click="exchangeFengyaodu"
						style="width: 250rpx;height: 80rpx;font-size: 28rpx;color: #FFFFFF;line-height: 80rpx;text-align: center;background: #FE4373;border-radius: 8rpx;margin: 0 auto;margin-top: 66rpx;">
						全部兑换</view>
				</view>

			</view>
		</u-modal>
		<view>
			<view style="width: 100%;" v-for="(item, index) in listUserGift" :key="index">
				<view class="giftListItem">
					<view
						style="width: 116rpx;height: 116rpx;background: #FFFFFF;box-shadow: inset 0rpx 4rpx 10rpx 0rpx rgba(0,0,0,0.302);opacity: 1;border-radius: 50%;display: flex;flex-direction: column;align-items: center;justify-content: center;">
						<image :src="item.image" style="width: 92rpx;height: 92rpx;"></image>
					</view>
					<view style="flex: 1;margin-left: 28rpx;">
						<view style="display: flex;align-items: center;justify-content: space-between;">
							<text style="color:#585858 ;font-size: 32rpx;">{{item.title}}</text>
							<text style="color:#766B84 ;font-size: 26rpx;">×{{item.nums}}</text>
						</view>
						<view style="color:#BAAFC8 ;font-size: 28rpx;margin-top: 26rpx">
							{{item.introduction||'暂无说明'}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-loadmore v-if="listUserGift.length" :status="loadmore" nomoreText="" color="#a1a1a1" marginTop="20" />
		<u-empty v-if="!listUserGift.length" icon="/static/null3.png" text="数据为空" textColor="#a1a1a1"
			marginTop="100"></u-empty>
		<topPrompt></topPrompt>
	</view>
</template>
<script>
	export default {
		name: 'gift',
		components: {},
		data() {
			return {
				listUserGift: [],
				params: {
					page: 1,
				},
				paginator: {
					total: 0,
					last_page: 0,
				},
				loadmore: false,
				exchangeActive: false,
				userInfo: [],
				fengyadu: []
			}
		},
		onLoad(option) {
			let that = this
			that.getUserGift()
			that.getUserInfo()
		},
		onReachBottom() {
			let that = this
			if (that.loadmore === 'nomore') return false
			that.loadmore = 'loading'
			that.params.page = ++that.params.page
			that.getUserGift()
		},
		methods: {
			getUserInfo() {
				let that = this;
				that.$api("user.info").then(res => {
					if (res.code == 1) {
						that.userInfo = res.data;
					}
				})
			},
			exchange() {
				let that = this;
				that.$api("fengyadu.my_usable_fengyadu").then((res) => {
					if (res.code == 1) {
						that.fengyadu = res.data;
						that.exchangeActive = true;
					} else {
						uni.showToast({
							icon: "none",
							title: res.msg
						})
					}
				})
			},
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
			backPage() {
				uni.navigateTo({
					url: '/pages/index/mine'
				})
			},
			getUserGift() {
				let that = this
				that.loadmore = 'loading'
				that.$api('user_gift.lists', that.params).then(res => {
					console.log(res)
					if (res.code === 1) {
						that.listUserGift.push(...res.data)
						that.paginator.total = res.data.total
						that.paginator.last_page = res.data.last_page
						// that.listUserGift = [...that.listUserGift, ...res.data.data];
						if (that.params.page < res.data.last_page) {
							that.loadmore = 'loadmore'
						} else {
							that.loadmore = 'nomore'
						}
					}
				})
			},
			skipGifts() {
				uni.navigateTo({
					url: '/pages/mine/giftsRecord',
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.giftListItem {
		display: flex;
		background: #FBF6F9;
		box-shadow: 6rpx 8rpx 10rpx 0rpx rgba(150, 143, 143, 0.38), -4rpx -6rpx 8rpx 0rpx #FFFFFF;
		border-radius: 10rpx 10rpx 10rpx 10rpx;
		margin-top: 30rpx;
		background: rgba(251, 246, 249, 0.6);
		padding: 30rpx;
		box-sizing: border-box;
	}

	.head {
		height: 291rpx;
		background: #FBF6F9;
		box-shadow: 6rpx 8rpx 10rpx 0rpx rgba(150, 143, 143, 0.38), -4rpx -6rpx 8rpx 0rpx #FFFFFF;
		border-radius: 10rpx 10rpx 10rpx 10rpx;
		background: rgba(251, 246, 249, 0.6);
	}

	.exchange {
		width: 220rpx;
		height: 72rpx;
		background: #FCDBDB;
		box-shadow: 6rpx 8rpx 10rpx 0rpx rgba(150, 143, 143, 0.38), -4rpx -6rpx 8rpx 0rpx #FFFFFF;
		border-radius: 10rpx 10rpx 10rpx 10rpx;
		font-size: 28rpx;
		color: #585858;
		text-align: center;
		line-height: 72rpx;
		margin-right: 36rpx;
	}
</style>