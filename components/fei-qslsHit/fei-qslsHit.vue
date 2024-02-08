<template>
	<view>
		<u-popup :show="qslsHitShow" @close="qslsHitShow" mode="center" :closeable="false" :round="20"
			:customStyle="{background:'transparent'}">
			<view class="popupContainer" v-if="taskData.length !=0">
				<view style="display: flex;align-items: center;justify-content: center;">
					<view class="title">
						<text style="position: relative;z-index: 5;">您中杯了</text>
						<view class="line"></view>
					</view>
				</view>
				<view class="subTitle">杯子顺溪而流，停在了你的面前，请完成任务</view>
				<view class="popupHit">
					<view class="hitTopic">
						{{taskData.task_info.type_str}}
					</view>
					<view
						style="display: flex;align-items: center;justify-content: space-between;padding: 0rpx 110rpx;box-sizing: border-box;">
						<view class="hitBtn" style="background: #FFDDA4;color: #FFA000;" @click="refuse">拒绝</view>
						<view class="hitBtn" style="background: #FFA000;color: #fff;" @click="accept">前往{{refuseTime}}S
						</view>
					</view>
					<view
						style="display: flex;justify-content: center;margin-top: 53rpx;font-size: 23rpx;color: #333333;padding: 0rpx 80rpx;box-sizing: border-box;">
						<view style="flex: 1;padding-left: 39rpx;">名望降低×2</view>
						<view style="width: 216rpx;">完成任务可获取铜钱 和更多礼物哦~</view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				qslsHitShow: false,
				refuseTime: 5,
				refuseInterval: null,
				taskData: [],
				flag: false,
			}
		},
		mounted() {
			var that = this;
			uni.$on("qslsTaskHit", function(data) {
				that.taskData = data.taskData;
			})
		},
		watch: {
			"$store.state.qsls.showHif"(newVal, oldVal) {
				console.log("fei")
				if (newVal == true) {
					clearInterval(this.refuseInterval)
					this.refuseTime = 5;
					this.show()
				} else {
					this.qslsHitShow = false;
					clearInterval(this.refuseInterval)
				}
			}
		},
		methods: {
			show() {
				var that = this;
				that.refuseTime = 5;
				that.qslsHitShow = true;
				clearInterval(that.refuseInterval)
				that.refuseInterval = setInterval(() => {
					that.refuseTime = --that.refuseTime;
					if (that.refuseTime <= 0) {
						const currentPage = getCurrentPages();
						clearInterval(that.refuseInterval)
						that.$store.commit("setShowHif", false)
						if (currentPage[currentPage.length - 1].route != 'pages/qsls/qsls') {
							console.log(that.taskData)
							uni.navigateTo({
								url: '/pages/qsls/qsls?roomId=' + that.taskData.room_id,
								animationType: 'fade-in',
								animationDuration: 200,
							})
							uni.$emit("qslsAccept", {
								taskData: that.taskData
							})
						} else {
							uni.$emit("qslsAccept", {
								taskData: that.taskData
							})
						}
						that.qslsHitShow = false;
					}
				}, 1000)
			},
			//拒绝任务
			refuse() {
				clearInterval(this.refuseInterval)
				clearInterval(this.refuseInterval)
				this.$store.commit("setShowHif", false)
				this.qslsHitShow = false;
				this.$api("qsls.refuseCupTask", {
					room_id: this.taskData.room_id,
					task_id: this.taskData.task_info.task_id
				}).then(res => {
					if (res.code == 1) {
						this.refuseInterval = null;
						this.$store.commit("setShowHif", false)
					}
				})

			},
			//接受任务
			accept() {
				var that = this;
				this.qslsHitShow = false;
				clearInterval(this.refuseInterval)
				const currentPage = getCurrentPages();
				if (currentPage[currentPage.length - 1].route != 'pages/qsls/qsls') {
					console.log(that.taskData)
					uni.navigateTo({
						url: '/pages/qsls/qsls?roomId=' + that.taskData.room_id,
						animationType: 'fade-in',
						animationDuration: 200,
					})
					uni.$emit("qslsAccept", {
						taskData: that.taskData
					})
				} else {
					uni.$emit("qslsAccept", {
						taskData: that.taskData
					})
				}
				this.$nextTick(() => {
					that.refuseTime = 5;
					clearInterval(this.refuseInterval)
					that.refuseInterval = null;
					that.taskData = [];
				})

			},
		}
	}
</script>

<style lang="scss" scoped>
	.popupContainer {
		width: 655rpx;
		height: 828rpx;
		background-image: url(@/static/iconImage/bg.png);
		background-position: 100% 100%;
		background-size: 100% 100%;
		background-repeat: no-repeat;

		.title {
			position: relative;
			text-align: center;
			font-size: 32rpx;
			color: #333333;
			font-family: font-test !important;
			display: inline;
			margin-top: 50rpx;

			.line {
				width: 100%;
				height: 16rpx;
				background: #FFA000;
				position: absolute;
				left: 0;
				bottom: 0;
			}
		}

		.subTitle {
			text-align: center;
			color: #666666;
			font-size: 23rpx;
			margin-top: 25rpx;
			margin-bottom: 16rpx;
		}

		.popupHit {
			padding-bottom: 50rpx;
			height: 665rpx;
			box-sizing: border-box;
			border: 1px solid transparent;

			.hitTopic {
				font-size: 56rpx;
				color: #FFA000;
				text-align: center;
				margin: 161rpx 0rpx;
				font-family: font-test !important;
			}

			.hitBtn {
				width: 190rpx;
				height: 85rpx;
				border: 1px solid #FFA000;
				text-align: center;
				line-height: 85rpx;
				border-radius: 50rpx;
				font-size: 36rpx;
			}
		}
	}
</style>