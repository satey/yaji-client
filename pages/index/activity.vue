<template>
	<view>
		<u-navbar title="新年新气象，抽签赢好运" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" style="color: #333 !important;"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view style="position: relative;">
			<image style="width: 100vw;height:2457rpx" src="/static/huodongbg.png" mode="widthFix"></image>
			<image @click="drawPopup = true" src="../../static/iconImage/chouqian.png"
				style="width: 246rpx;height: 243rpx;position: absolute;right: 65rpx;top: 241rpx;" mode="heightFix">
			</image>
			<image @click="rolePopup = true" src="../../static/iconImage/shoujiaose.png"
				style="width: 246rpx;height: 243rpx;position: absolute;left: 60rpx;top: 800rpx;" mode="heightFix">
			</image>
			<image @click="yearPopup = true" src="../../static/iconImage/bainian.png"
				style="width: 246rpx;height: 243rpx;position: absolute;right: 58rpx;top: 1150rpx;" mode="heightFix">
			</image>
		</view>
		<!-- 抽签弹窗 -->
		<u-popup :show="drawPopup" @close="drawPopup = false;" :closeable="false" mode="center" :round="30">
			<view class="draw">
				<image src="../../static/iconImage/chouqianBg.png" style="width: 671rpx;height: 722rpx;"
					mode="heightFix"></image>
				<view style="text-align: center;margin-top: -75rpx;">
					<view style="position: relative;height: 105rpx;line-height: 105rpx;" @click="draw">
						<image src="@/static/iconImage/chouqianBtn.png" style="width: 443rpx;height: 105rpx;"
							mode="widthFix"></image>
						<text
							style="position: absolute;left: 59%;top: 0;color: #fff;font-size: 28rpx;">（{{draw_count}}次）</text>
					</view>
				</view>
				<view style="text-align: center;margin-top: 30rpx;">
					<image @click="drawPopup = false" src="@/static/iconImage/close.png"
						style="width: 73rpx;height: 73rpx;margin: 0 auto;" mode=""></image>
				</view>
			</view>
		</u-popup>
		<!-- 抽角色弹窗 -->
		<u-popup :show="rolePopup" @close="rolePopup = false;" :closeable="false" mode="center" :round="30">
			<view class="draw">
				<image src="../../static/iconImage/choujiaoeBg.png" style="width: 671rpx;height: 722rpx;"
					mode="heightFix"></image>
				<view style="text-align: center;margin-top: -75rpx;">
					<image @click="$u.route('/pages/mine/role');rolePopup = false"
						src="@/static/iconImage/choujiaoseBtn.png" style="width: 443rpx;height: 105rpx;"
						mode="widthFix"></image>
				</view>
				<view style="text-align: center;margin-top: 30rpx;">
					<image @click="rolePopup = false" src="@/static/iconImage/close.png"
						style="width: 73rpx;height: 73rpx;margin: 0 auto;" mode=""></image>
				</view>
			</view>
		</u-popup>
		<!-- 拜年弹窗 -->
		<u-popup :show="yearPopup" @close="yearPopup = false;" :closeable="false" mode="center" :round="30">
			<view class="draw">
				<image src="../../static/iconImage/bainianBg.png" style="width: 671rpx;height: 722rpx;"
					mode="heightFix"></image>
				<view @click="jump" style="text-align: center;margin-top: -75rpx;">
					<image src="@/static/iconImage/bainianBtn.png" style="width: 443rpx;height: 105rpx;"
						mode="widthFix">
					</image>
				</view>
				<view style="text-align: center;margin-top: 30rpx;">
					<image @click="yearPopup = false" src="@/static/iconImage/close.png"
						style="width: 73rpx;height: 73rpx;margin: 0 auto;" mode=""></image>
				</view>
			</view>
		</u-popup>
		<!-- 抽签获得弹窗 -->
		<u-popup :show="obtainPopup" @close="obtainPopup = false;" :closeable="false" mode="center" :round="30">
			<view class="draw" style="width: 669rpx;height: 555rpx;position: relative;">
				<image src="../../static/iconImage/huode.png"
					style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;" mode="aspectFill">
				</image>
				<view
					style="display: flex;align-items: center;width: 100%;height: 100%;position: relative;z-index: 2;flex-direction: column;">
					<view style="margin-top: 161rpx;">
						<image style="width: 206rpx;height: 222rpx;" :src="drawResultData.prize_img" mode="widthFix">
						</image>
					</view>
					<view style="color:#fff ;font-size: 28rpx;margin-top: 16rpx;">{{drawResultData.title}}</view>
				</view>
			</view>
			<view style="text-align: center;margin-top: -85rpx;position: relative;z-index: 5;" @click="drawcontinue">
				<image src="@/static/iconImage/huodeBtn.png" style="width: 443rpx;height: 105rpx;" mode="widthFix">
				</image>
			</view>
		</u-popup>
		<!-- 动画 -->
		<u-popup :show="gifPopup" :closeable="false" mode="center" :round="30">
			<view class="draw"
				style="width: 100vw;height: 100vh;display: flex;align-items: center;justify-content: center;">
				<image src="../../static/iconImage/chouqian.gif" style="width: 669rpx;height: 555rpx;" mode="heightFix">
				</image>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				drawPopup: false,
				rolePopup: false,
				yearPopup: false,
				obtainPopup: false,
				draw_count: 0,
				gifPopup: false,
				drawResultData: []
			}
		},
		onLoad() {
			this.getdrawcount()
		},
		methods: {
			getdrawcount() {
				this.$api("activity.getdrawcount").then(res => {
					if (res.code == 1) {
						this.draw_count = res.data.draw_count
					}
				})
			},
			draw() {
				if (this.draw_count <= 0) {
					this.drawPopup = false;
					uni.showToast({
						icon: "none",
						title: "暂无抽奖次数"
					})
					return;
				}
				this.drawPopup = false;
				this.gifPopup = true;
				this.getDrawResult()
				var timeOut = setTimeout(() => {
					this.gifPopup = false;
					clearTimeout(timeOut)
					this.obtainPopup = true
				}, parseInt((Math.random() * (7 - 3)) + 3) * 1000)
			},
			getDrawResult() {
				this.$api("activity.draw").then(res => {
					if (res.code == 1) {
						this.drawResultData = res.data;
						this.getdrawcount()
					}
				})
			},
			jump() {
				uni.switchTab({
					url: '/pages/index/message'
				});
			},
			drawcontinue() {
				if (this.draw_count <= 0) {
					uni.showToast({
						icon: "none",
						title: "暂无抽奖次数"
					})
					return;
				}
				this.obtainPopup = false;
				this.gifPopup = false;
				this.draw()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.draw {
		position: relative;
	}
</style>