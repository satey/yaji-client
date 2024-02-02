<template>
	<view style="min-height: 100vh;background: #F8F8F8;height: 100%;">
		<image style="width: 100vw;height: 100vh;" src="@/static/iconImage/caihuaBg.png" mode="">
		</image>
		<view class="seach">
			<u-navbar title="才华成就" :safeAreaInsetTop="true" :placeholder="true" bgColor="transparent">
				<view slot="left">
					<i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
				</view>
			</u-navbar>
		</view>
		<view class="listBox">
			<view style="padding-top: 55rpx;display: flex;align-items: center;justify-content: center;">
				<image src="@/static/iconImage/leftTou.png" style="width: 80rpx;height: 15rpx;" mode=""></image>
				<text style="color: #000;font-size:32rpx ;padding: 0rpx 15rpx;">我的勋章</text>
				<image src="@/static/iconImage/rightTou.png" style="width: 80rpx;height: 15rpx;" mode=""></image>
			</view>
			<view
				style="display: flex;align-items: center;flex-wrap: wrap;padding:20rpx 25rpx 0rpx 50rpx;box-sizing: border-box;">
				<view style="width:200rpx;height:200rpx;box-sizing: border-box;margin-right: 26rpx;margin-bottom: 30rpx;"
					v-for="(item,index) in lists" :key="index">
					<image :src="item.image" style="width: 100%;height: 100%;" mode=""></image>
				</view>
			</view>
			<u-empty v-if="!lists.length" icon="/static/iconImage/jilu.png" text="暂未获得才华勋章" textColor="#a1a1a1"
				marginTop="100"></u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lists: []
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			getList() {
				this.$api("user.gloryList").then(res => {
					console.log(res)
					if (res.code == 1) {
						this.lists = res.data;
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100vh;
		background: #F8F8F8;
	}

	.seach {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 5;
	}

	.listBox {
		background-image: url(@/static/iconImage/boli.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-position: 100% 100%;
		position: absolute;
		top: 25%;
		left: 0;
		width: 100vw;
		min-height: 100vh;
	}
</style>