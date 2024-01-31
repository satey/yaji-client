<template>
	<view>
		<u-navbar title="" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" style="color: #333 !important;"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view>
			<view style="text-align: center;">
				<image mode="aspectFill" class="bannerImg"
					src="https://yaji-1318192409.cos.ap-shanghai.myqcloud.com/app_file/index/shefu.png">
				</image>
			</view>
			<view class="title">射覆</view>
			<view class="sunTitle">古代在瓯、盂等器具下覆盖某一物件，让人猜测里面是什么东西。汉代在宫廷中已经非常流行。</view>
			<view class="okBtn" @click="start">进入</view>
		</view>
		<topPrompt></topPrompt>
		<feiqslsHit></feiqslsHit>
	</view>
</template>

<script>
	export default {
		name: "",
		data() {
			return {
				isModule: false,
				countNum: 0,
			}
		},

		onLoad() {

		},
		onBackPress() {

		},
		onBeforeBack(args) {

		},
		methods: {
			start() {
				uni.navigateTo({
					url: "/pages/joy/archery"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.module {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(255, 255, 255, 0.8);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		z-index: 999;

		.lodding {
			width: 100rpx;
			height: 100rpx;
		}

		.cancel {
			margin-top: 50rpx;
			color: #FE4373;
		}
	}

	// ---------
	.bannerImg {
		width: 400rpx;
		height: 400rpx;
	}

	.title {
		font-size: 36rpx;
		color: #555555;
		text-align: center;
	}

	.sunTitle {
		font-size: 32rpx;
		color: #555555;
		margin: 25rpx 100rpx;
	}

	.okBtn {
		width: 650rpx;
		height: 85rpx;
		background: inherit;
		background-color: #FE4373;
		border-radius: 43px;
		color: #fff;
		text-align: center;
		line-height: 85rpx;
		margin: 50rpx auto;
		font-size: 32rpx;
	}

	.tips {
		border: 1rpx dashed #999;
		padding: 10rpx;
		margin: 0 auto;
		width: 550rpx;
		color: #999;
		line-height: 50rpx;
	}
</style>