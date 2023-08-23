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
				<image class="bannerImg" src="@/static/q.png">
				</image>
			</view>
			<view class="title">曲水流觞</view>
			<view class="sunTitle">古代三月初三上巳节的传统习俗，最早可追溯到周代，后发展成为一种聚会雅事。著名的有王羲之的兰亭集会。</view>
			<view class="okBtn" @click="start">开始体验</view>
			<view
				style="display: flex;align-items: center;margin-top: 45rpx;justify-content: center;margin-bottom: 50rpx;">
				<view style="width: 20rpx;height: 20rpx;border-radius: 50%;background: #13D898;"></view>
				<text style="font-size: 28rpx;color: #767373;margin-left: 10rpx;">{{countNum}}在线</text>
			</view>
		</view>
		<view class="module" v-show="isModule">
			<image class="lodding" src="@/static/lodding.gif" mode=""></image>
			<view style="margin-top: 10rpx;">匹配房间...</view>
			<view class="cancel" @click="cancel">取消</view>
		</view>
		<!-- <reward></reward> -->
	</view>
</template>

<script>
	import reward from "@/components/fei-reward/fei-reward.vue"
	export default {
		name: "poetryStart",
		data() {
			return {
				isModule: false,
				countNum: 0,
			}
		},
		components: {
			reward
		},
		onLoad() {
			var that = this;
			that.$api("game.countNum").then(res => {
				if (res.code == 1) {
					that.countNum = res.data
				}
			})
		},
		methods: {
			//开始
			start() {
				var that = this;
				that.isModule = true;
				that.$api("game.joinRoom").then(res => {
					if (res.code == 1) {
						that.isModule = false;
						uni.navigateTo({
							url: '/pages/joy/poetry'
						})
					} else {
						that.isModule = false;
						uni.showToast({
							icon: "none",
							title: res.msg
						})
					}
				})
			},
			//取消匹配
			cancel() {
				var that = this;
				that.isModule = false;
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
		font-size: 32rpx;
		color: #555555;
		text-align: center;
	}

	.sunTitle {
		font-size: 28rpx;
		color: #555555;
		margin: 25rpx 100rpx;
	}

	.okBtn {
		width: 450rpx;
		height: 85rpx;
		background: inherit;
		background-color: #FE4373;
		border-radius: 43px;
		color: #fff;
		text-align: center;
		line-height: 85rpx;
		margin: 50rpx auto;
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