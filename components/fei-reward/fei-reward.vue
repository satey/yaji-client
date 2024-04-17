<template>
	<view class="feiReward">
		<!-- <image v-if="giftFlag" src="@/static/hongbao/b.png" class="hb animate-bounce" @click="bindReward"></image> -->
		<image src="@/static/hongbao/b.png" class="hb" :class="class1" :style="styles" @click="bindReward"></image>
		<u-modal :show="rewardPopup" :showConfirmButton="false" :showCancelButton="false">
			<view>
				<text class="ri-close-circle-fill close" style="" @click="close"></text>
				<view class="title">天降红包</view>
				<view style="display: flex;align-items: flex-end;">
					<view>
						<image class="rewardImg" :src="giftData.gift_image">
						</image>
					</view>
					<view style="color: #FFD700;font-size: 35rpx;font-family: bold;">
						X {{giftData.gift_num}}
					</view>
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rewardPopup: false,
				giftFlag: false,
				giftId: "",
				giftData: [],
				styles: {
					top: "-1000rpx",
					transform: "scale(0.1)"
				},
				class1: ""
			}
		},
		props: ["giftIsShow"],
		watch: {
			"giftIsShow": {
				handler(newVal, oldVal) {
					var that = this;
					if (newVal) {
						this.styles = {
							top: "350rpx",
							transform: "scale(1)"
						}
						that.class1 = "animate-bounce"
						that.giftId = that.$store.state.message.giftId;
					}
				}
			}
		},
		created() {},
		methods: {
			aaaaa() {
				this.giftFlag = true;
				this.styles = {
					top: "200rpx",
					transform: "scale(1)"
				}
				this.class1 = "animate-bounce"
			},
			bindReward() {
				var that = this;
				that.styles = {
					top: "-1000rpx",
					transform: "scale(0.1)"
				};
				that.$emit("changend")
				that.$api("user.openBox", {
					id: that.giftId
				}).then(res => {
					if (res.code == 1) {
						that.rewardPopup = true;
						that.styles = {
							top: "-1000rpx",
							transform: "scale(0.1)"
						};
						that.$store.commit("setGiftId", "");
						that.giftId = ""
						that.giftData = res.data;
					}
				})
			},
			close() {
				this.rewardPopup = false;
				this.styles = {
					top: "-1000rpx",
					transform: "scale(0.1)"
				};
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hb {
		position: absolute;
		left: 50%;
		width: 390rpx;
		height: 380rpx;
		position: absolute;
		margin-left: -195rpx;
		transition: all 0.5s;
	}

	.fei-popup {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.title {
		font-size: 50rpx;
		text-align: center;
		background-image: -webkit-linear-gradient(bottom,
				red,
				#fd8403,
				yellow);
		-webkit-background-clip: text;
		-webkit-text-fill-color:
			transparent;
		font-weight: bold;
	}

	.rewardImg {
		width: 260rpx;
		height: 260rpx;
	}

	.close {
		font-size: 50rpx;
		position: absolute;
		right: 15rpx;
		top: 15rpx;
		color: #FFA000;
	}
</style>