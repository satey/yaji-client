<template>
	<view>
		<u-navbar title="" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" style="color: #333 !important;" @click="backIndex"></i>
			</view>
		</u-navbar>
		<view>
			<view style="text-align: center;">
				<image mode="aspectFill" class="bannerImg" src="@/static/q.png">
				</image>
			</view>
			<view class="title">曲水流觞</view>
			<view class="sunTitle">古代三月初三上巳节的传统习俗，最早可追溯到周代，后发展成为一种聚会雅事。著名的有王羲之的兰亭集会。</view>
			<view class="okBtn" @click="start" :style="{background:isModule==false?'#FFA000':'#13D898'}">
				{{isModule==false?'开始体验':'匹配中...'}}
			</view>
			<view v-show="isModule" class="sunTitle" style="text-align: center;font-size: 23rpx;">
				您可返回使用其他功能，匹配达成后会自动进房
			</view>
			<view
				style="display: flex;align-items: center;margin-top: 45rpx;justify-content: center;margin-bottom: 50rpx;">
				<view style="width: 20rpx;height: 20rpx;border-radius: 50%;background: #13D898;"></view>
				<text style="font-size: 28rpx;color: #767373;margin-left: 10rpx;">{{countNum}}在线</text>
			</view>
		</view>
		<!-- <view class="module" v-show="isModule">
			<image class="lodding" src="@/static/lodding.gif" mode=""></image>
			<view style="margin-top: 10rpx;">匹配房间...</view>
			<view class="cancel" @click="cancel">取消</view>
		</view> -->
		<!-- <reward></reward> -->
		<feiqslsHit></feiqslsHit>
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
		onShow() {
			var that = this;
			let waterData = uni.getStorageSync("waterData");
			if (waterData != '') {
				that.$api("game.is_in_game_room", {
					game_room_id: waterData.game_room_id,
					game_room_place_num: waterData.game_room_place_num
				}).then(res => {
					console.log(res)
					if (res.code == 2) {
						that.isModule = true;
					} else if (res.code == 0) {
						uni.removeStorageSync("waterData")
						that.isModule = false;
					} else if (res.code == 1) {
						that.isModule = true;
					}
				})
			}
			getApp().globalData.socketTask._callbacks.message.splice(1);
			that.$nextTick(() => {
				that.initSocket()
			})
		},
		onLoad() {
			var that = this;
			that.$api("game.countNum").then(res => {
				if (res.code == 1) {
					that.countNum = res.data
				}
			})
		},
		onBackPress() {
			uni.switchTab({
				url: '/pages/index/index'
			});
			return true //阻止页面关闭
		},
		onBeforeBack(args) {
			uni.switchTab({
				url: '/pages/index/index'
			});
			return true //阻止页面关闭
		},
		methods: {
			initSocket() {
				getApp().globalData.socketTask.onMessage((res) => {
					var socketDate = JSON.parse(res.data);
					if (socketDate.cate != 2) {
						return;
					}
					console.log(socketDate)
					if (socketDate.room_count == 6) {
						this.$store.commit("setGameRoomData", socketDate.data.list)
						// uni.navigateTo({
						// 	url: `/pages/joy/poetry?roomId=${socketDate.data.new_user_data.game_room_id}`
						// })
						this.$u.route('pages/joy/poetry?roomId=' + socketDate.data.new_user_data.game_room_id +
							'&roomData=' + res.data);
					} else {
						if (socketDate.type == "add_game_room") {
							uni.setStorageSync("waterData", socketDate.data.new_user_data)
						}
					}
				})
			},
			//开始
			start() {
				var that = this;
				that.$api("game.joinRoom").then(res => {
					if (res.code == 1) {
						that.isModule = !that.isModule;
						if (that.isModule) {
							let params = {
								type: "add_game_room",
								cate: "2",
							}
							getApp().globalData.socketTask.send({
								data: JSON.stringify(params),
								success() {
									console.log("加入房间成功");
								},
								fail() {
									console.log("加入房间失败");
								}
							});
						} else {
							let params = {
								type: "leave_game_room",
								cate: "2",
							}
							getApp().globalData.socketTask.send({
								data: JSON.stringify(params),
								success() {
									console.log("离开房间成功");
									uni.removeStorageSync("waterData")
								},
								fail() {
									console.log("离开房间失败");
								}
							});
						}
					} else {
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
			},
			backIndex() {
				uni.switchTab({
					url: '/pages/index/index'
				});
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
			color: #FFA000;
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
		width: 450rpx;
		height: 85rpx;
		background: inherit;
		border-radius: 43px;
		color: #fff;
		text-align: center;
		line-height: 85rpx;
		margin: 50rpx auto;
		font-size: 32rpx;
		transition: all 0.3s;
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