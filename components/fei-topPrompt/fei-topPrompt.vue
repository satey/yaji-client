<template>
	<view class="topBox" v-if="showFlag" @click="openGameStart">
		<view>曲水流觞匹配中…</view>
		<text class="ri-close-line close" style="font-size: 40rpx;" @click.stop="cancellation"></text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showFlag: false,
			}
		},
		created() {
			var that = this;
			that.$store.watch((state, getters) => {
				if (state.game.gameBarFlag == false) {
					that.showFlag = false;
				} else {
					that.showFlag = true;
				}
			})
		},
		methods: {
			cancellation() {
				var that = this;
				let params = {
					type: "leave_game_room",
					cate: 2,
					user_punished_code: ""
				}
				getApp().globalData.socketTask.send({
					data: JSON.stringify(params),
					success() {
						console.log("离开房间消息成功");
						uni.removeStorageSync("waterData")
						that.$store.commit("setGameRoomData", [])
						that.$store.commit("setGameBarFlag", false)
					},
					fail() {
						console.log("离开房间消息失败");
					}
				});
			},
			openGameStart() {
				var that = this;
				var gameRoomData = this.$store.state.game.gameRoomData
				uni.navigateTo({
					url: `/pages/joy/poetry?roomId=${gameRoomData.game_room_id}`
				})
				that.$store.commit("setGameRoomData", [])
				that.$store.commit("setGameBarFlag", false)
			}
		}
	}
</script>

<style scoped lang="scss">
	.topBox {
		width: 350rpx;
		height: 60rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 4rpx 10rpx 0rpx rgba(0, 0, 0, 0.302);
		border-radius: 60rpx 60rpx 60rpx 60rpx;
		opacity: 1;
		position: fixed;
		top: 0;
		left: 50%;
		margin-left: -175rpx;
		z-index: 999999;
		margin-top: var(--status-bar-height);
		color: #8A7F82;
		font-size: 26rpx;
		text-align: center;
		line-height: 60rpx;
	}

	.close {
		position: absolute;
		right: 20rpx;
		top: 0;
	}
</style>