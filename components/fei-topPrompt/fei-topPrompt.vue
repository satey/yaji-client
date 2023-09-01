<template>
	<view class="topBox" v-if="showFlag" @click="openGameStart">
		<view>曲水流觞匹配中…</view>
		<text class="ri-close-line close" style="font-size: 50rpx;" @click.stop="cancellation"></text>
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

				if (state.game.gameUserLength >= 6) {
					that.$u.route('pages/joy/poetry?mode=back')
				}
			})
		},
		methods: {
			cancellation() {
				var that = this;
				that.$api("game.cancel_match_room", {
					"match_id": that.$store.state.game.mateId
				}).then(res => {
					if (res.code == 1) {
						that.mateId = "";
						that.$store.commit("setMateId", "")
						that.$store.commit("setGameBarFlag", false)
						uni.showToast({
							icon: "none",
							title: res.msg
						})
					}
				})
			},
			openGameStart() {
				var pages = getCurrentPages();
				if (pages[pages.length - 1].route != 'pages/joy/poetryStart') {
					this.$u.route('pages/joy/poetryStart')
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.topBox {
		width: 407rpx;
		height: 60rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 4rpx 10rpx 0rpx rgba(0, 0, 0, 0.302);
		border-radius: 60rpx 60rpx 60rpx 60rpx;
		opacity: 1;
		position: fixed;
		top: 0;
		left: 50%;
		margin-left: -203.5rpx;
		z-index: 999999;
		margin-top: var(--status-bar-height);
		color: #8A7F82;
		font-size: 26rpx;
		text-align: center;
		line-height: 60rpx;
	}

	.close {
		position: absolute;
		right: 30rpx;
		top: 0;
	}
</style>