<template>
	<view>
		<view class="qslsHeadContainer">
			<image src="../../static/iconImage/qsls.png" style="width: 100%;height: 100%;" mode=""></image>
			<image src="../../static/beizi.png" :style="{animationPlayState:cupAnimation}"
				:class="isDriftCup?'driftCup':''" class="drift " mode="widthFix">
			</image>
			<view class="qslsUserItemBox">
				<block v-for="(item,index) in qslsUserList">
					<view class="qslsUserItem" style="" @click="openUser(item)">
						<view style="position: relative;display: inline;">
							<text
								style="color: #fff;font-size: 20rpx;position: relative;z-index: 2;">{{item.role_realname.slice(0,4)}}</text>
							<text
								style="height: 8rpx;width: 100%;position: absolute;left: 0;bottom: 5rpx;background: #FFA000;display: inline;">
							</text>
						</view>
						<view style="width: 102rpx;height: 102rpx;">
							<image style="width: 100%;height: 100%;" :src="item.profile_url" mode="heightFix">
							</image>
						</view>

					</view>
				</block>
			</view>
		</view>
		<userContainer ref="userContainer"></userContainer>
	</view>
</template>

<script>
	import userContainer from "@/components/fei-userContainer/fei-userContainer.vue"
	export default {
		props: ["qslsUserList", "roomId"],
		components: {
			userContainer
		},
		data() {
			return {
				isDriftCup: false,
				cupAnimation: "running"
			}
		},
		created() {
			this.$store.watch((state, getters) => {
				if (Number(state.qsls.roomId) == this.roomId) {
					if (state.qsls.qslsCupType == "1") {
						this.start()
					} else if (state.qsls.qslsCupType == "2") {
						this.paused()
					} else if (state.qsls.qslsCupType == "3") {
						this.stop()
					}
				}
			})
		},

		methods: {
			start() {
				this.isDriftCup = true;
				this.cupAnimation = 'running'
			},
			paused() {
				this.cupAnimation = 'paused'
			},
			stop() {
				this.isDriftCup = false;
				this.cupAnimation = 'paused'
			},
			openUser(item) {
				const currentPage = getCurrentPages();
				if (currentPage[currentPage.length - 1].route != 'pages/index/index') {
					if (item.user_id == uni.getStorageSync("userInfo").id) {
						uni.showToast({
							icon: "none",
							title: "这是您自己"
						})
					} else {
						this.$refs.userContainer.show(item.user_id, this.roomId)
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.drift {
		position: absolute;
		top: 58%;
		left: 1%;
		z-index: 10;
		width: 60rpx;
		height: 60rpx;
		z-index: 2;
	}

	.driftCup {
		transition: all 0.3s;
		animation-direction: normal;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
		animation-fill-mode: forwards;
		animation-duration: 15s;
		animation-delay: 0.5s;
		animation-name: cup;
	}

	@keyframes cup {
		0 {
			top: 58%;
			left: 1%;
		}

		10% {
			top: 55%;
			left: 19%;
		}

		20% {
			top: 52%;
			left: 38%;
		}

		30% {
			top: 49%;
			left: 57%;
		}

		40% {
			top: 46%;
			left: 76%;
		}

		47% {
			top: 41%;
			left: 83%;
		}

		50% {
			top: 38%;
			left: 82%;
			transform: scale(1);
		}

		55% {
			top: 33%;
			left: 78%;
			transform: scale(0.8);
		}

		58% {
			top: 32%;
			left: 71%;
			transform: scale(1);
		}

		68% {
			top: 30%;
			left: 50%;
		}

		75% {
			top: 27%;
			left: 35%;
		}

		86% {
			top: 26%;
			left: 10%;
		}

		100% {
			top: 26%;
			left: 10%;
		}
	}

	.qslsHeadContainer {
		width: 100vw;
		overflow: hidden;
		height: 1033rpx;
		box-sizing: border-box;
		background: pink;
		position: relative;
		background: #fff;

		.qslsUserItemBox {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			box-sizing: border-box;

			.qslsUserItem {
				text-align: center;
			}
		}

		.indexFB {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 165rpx;
			width: 100%;
			// background: url(@/static/iconImage/mao2.png);
			// background-position: 100% 100%;
			// background-size: 100% 100%;
			// background-repeat: no-repeat;
			background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.8), #ffffff);
			backdrop-filter: blur(8px);
			position: absolute;
			left: 0;
			bottom: 0;

			.fabei {
				background-image: url(@/static/iconImage/fabeiBg.png);
				width: 198rpx;
				height: 58rpx;
				text-align: center;
				line-height: 58rpx;
				font-size: 30rpx;
				color: #fff;
				background-size: 100% 100%;
				background-repeat: no-repeat;
				background-position: 100% 100%;
			}

		}

		.headContainerFooter {
			height: 165rpx;
			width: 100%;
			// background: url(@/static/iconImage/mao2.png);
			// background-position: 100% 100%;
			// background-size: 100% 100%;
			// background-repeat: no-repeat;
			background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.8), #ffffff);
			backdrop-filter: blur(8px);
			position: absolute;
			left: 0;
			bottom: -5rpx;
		}

		.fabei {
			background-image: url(@/static/iconImage/fabeiBg.png);
			width: 198rpx;
			height: 58rpx;
			text-align: center;
			line-height: 58rpx;
			font-size: 30rpx;
			color: #fff;
			background-size: 100% 100%;
			background-repeat: no-repeat;
			background-position: 100% 100%;
		}

		.refuse {
			width: 430rpx;
			color: #333;
			font-size: 26rpx;
		}

		.hit {
			padding: 18rpx 30rpx 10rpx 23rpx;
			box-sizing: border-box;
			height: 100%;
			display: flex;
			align-items: center;
		}

		.complete {
			padding: 12rpx 25rpx 7rpx 23rpx;
			box-sizing: border-box;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.taskAudioLine {
				width: 336rpx;
				height: 65rpx;
				line-height: 65rpx;
				background: #FFA000;
				border-radius: 50rpx;
				color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 23rpx;
			}
		}

		.time {
			width: 89rpx;
			height: 43rpx;
			border-radius: 50rpx;
			background: rgba(255, 255, 255, 0.72);
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 23rpx;
			color: #FF9429;
		}

		.audioLine {
			width: 336rpx;
			height: 65rpx;
			border-radius: 50rpx;
			background: #FFA000;
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

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

		.selsectTask {
			margin-top: 100rpx;
			padding: 0 80rpx;
			box-sizing: border-box;
			height: 665rpx;

			.selsectTaskItem {
				font-size: 28rpx;
				color: #666666;
				display: flex;
				align-items: center;
				margin-bottom: 21rpx;
			}

			.releaseType {
				width: 220rpx;
				height: 96rpx;
				background: #F3F3F3;
				border: 1px solid transparent;
				font-size: 23rpx;
				color: #666666;
				display: flex;
				flex-direction: column;
				align-content: center;
				justify-content: center;
				align-items: center;
				border-radius: 10rpx;
				margin-top: 80rpx;

				&Active {
					background: #FFDDA4 !important;
					border: 1px solid #FFA000 !important;
					color: #333 !important;
				}
			}

			.releaseBtn {
				width: 100%;
				height: 72rpx;
				background-image: url(@/static/iconImage/btnBg2.png);
				background-position: 100% 100%;
				background-size: 100% 100%;
				background-repeat: no-repeat;
				text-align: center;
				line-height: 72rpx;
				font-weight: bold;
				color: #fff;
				margin-top: 53rpx;
			}
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

		.taskCenter {
			height: 665rpx;
			padding: 125rpx 82rpx 50rpx 82rpx;
			box-sizing: border-box;

			.taskAudioLine {
				width: 336rpx;
				height: 65rpx;
				line-height: 65rpx;
				background: #FFA000;
				border-radius: 50rpx;
				color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 23rpx;
				margin: 0 auto;
			}

			.soundBtn {
				width: 128rpx;
				height: 128rpx;
				border-radius: 50%;
				border: 1px solid #333333;
				text-align: center;
				line-height: 128rpx;
				font-size: 55rpx;
				margin: 0 auto;
				margin-top: 98rpx;
			}

			.releaseBtn {
				width: 100%;
				height: 72rpx;
				background-image: url(@/static/iconImage/btnBg2.png);
				background-position: 100% 100%;
				background-size: 100% 100%;
				background-repeat: no-repeat;
				text-align: center;
				line-height: 72rpx;
				font-weight: bold;
				color: #fff;
				margin-top: 67rpx;
			}
		}

		.taskCenter2 {
			.taskAudioLine {
				width: 336rpx;
				height: 65rpx;
				line-height: 65rpx;
				background: #FFA000;
				border-radius: 50rpx;
				color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 23rpx;
				margin: 0 auto;
				margin-top: 50rpx;
			}

			.soundBtn {
				width: 128rpx;
				height: 128rpx;
				border-radius: 50%;
				border: 1px solid #333333;
				text-align: center;
				line-height: 128rpx;
				font-size: 55rpx;
				margin: 0 auto;
				margin-top: 38rpx;
			}

			.releaseBtn {
				width: 100%;
				height: 72rpx;
				background-image: url(@/static/iconImage/btnBg2.png);
				background-position: 100% 100%;
				background-size: 100% 100%;
				background-repeat: no-repeat;
				text-align: center;
				line-height: 72rpx;
				font-weight: bold;
				color: #fff;
				margin-top: 26rpx;
			}
		}

		.prop {
			height: 665rpx;
			padding: 105rpx 30rpx 89rpx 30rpx;
			box-sizing: border-box;

			.hitBtn {
				width: 190rpx;
				height: 85rpx;
				border: 1px solid #FFA000;
				text-align: center;
				line-height: 85rpx;
				border-radius: 50rpx;
				font-size: 36rpx;
				margin-top: 89rpx;
			}
		}
	}

	.drawerContainer {
		width: 479rpx;
		height: 100vh;
		background: #000000;
		border-radius: 30rpx 0rpx 0rpx 30rpx;
		padding: var(--status-bar-height) 35rpx 35rpx 35rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;

		.drawerMenu {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			margin-top: 60rpx;

			.menuItem {
				width: 50%;
				display: flex;
				flex-direction: column;
				font-size: 32rpx;
				color: #fff;
				align-items: center;
				justify-content: center;
				box-sizing: border-box;
				margin-bottom: 70rpx;
			}

			.iconMenu {
				width: 96rpx;
				height: 96rpx;
				background: #212121;
				border-radius: 50rpx;
				text-align: center;
				line-height: 96rpx;
				color: #E2E2E2;
			}
		}

		.drawerOperate {
			color: #BDBDBD;
			font-size: 28rpx;
			display: flex;
			align-items: center;

			.drawerOperateText {
				position: relative;

				.line {
					width: 100%;
					height: 10rpx;
					background: #FFA000;
					position: absolute;
					z-index: 0;
					top: 50%;
					left: 0%;
					transform: translateY(-50%);
				}
			}
		}

		.drawerScroll {
			flex: 1;
			height: 0;
			margin-top: 50rpx;

			.userItem {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 40rpx;
			}
		}
	}

	// ------------
	.qslsUserItem:nth-child(1) {
		position: absolute;
		top: 27%;
		left: 65%;
		z-index: 3;
	}

	.qslsUserItem:nth-child(2) {
		position: absolute;
		top: 32%;
		left: 62%;
		z-index: 4;
	}

	.qslsUserItem:nth-child(3) {
		position: absolute;
		top: 34%;
		left: 51%;
		z-index: 5;
	}

	.qslsUserItem:nth-child(4) {
		position: absolute;
		top: 35%;
		left: 40%;
		z-index: 6;
	}

	.qslsUserItem:nth-child(5) {
		position: absolute;
		top: 38%;
		left: 28%;
		z-index: 7;
	}

	.qslsUserItem:nth-child(6) {
		position: absolute;
		top: 40%;
		left: 15%;
		z-index: 8;
	}

	.qslsUserItem:nth-child(7) {
		position: absolute;
		top: 43%;
		left: 2%;
		z-index: 9;
	}

	.qslsUserItem:nth-child(8) {
		position: absolute;
		top: 40%;
		right: 9%;
		z-index: 10;
	}

	.qslsUserItem:nth-child(9) {
		position: absolute;
		top: 46%;
		right: 19%;
		z-index: 11;
	}

	.qslsUserItem:nth-child(10) {
		position: absolute;
		top: 49%;
		right: 31%;
		z-index: 12;
	}

	.qslsUserItem:nth-child(11) {
		position: absolute;
		top: 50%;
		right: 46%;
		z-index: 13;
	}

	.qslsUserItem:nth-child(12) {
		position: absolute;
		top: 53%;
		right: 60%;
		z-index: 14;
	}

	.qslsUserItem:nth-child(13) {
		position: absolute;
		top: 57%;
		left: 15%;
		z-index: 15;
	}

	.qslsUserItem:nth-child(14) {
		position: absolute;
		top: 60%;
		left: 3%;
		z-index: 16;
	}

	.qslsUserItem:nth-child(15) {
		position: absolute;
		top: 62%;
		left: 38%;
		z-index: 17;
	}

	.qslsUserItem:nth-child(16) {
		position: absolute;
		top: 62%;
		left: 63%;
		z-index: 18;
	}

	.qslsUserItem:nth-child(17) {
		position: absolute;
		top: 26%;
		left: 50%;
		z-index: 19;
	}

	.qslsUserItem:nth-child(18) {
		position: absolute;
		top: 27%;
		left: 35%;
		z-index: 20;
	}

	.qslsUserItem:nth-child(19) {
		position: absolute;
		top: 25%;
		left: 20%;
		z-index: 21;
	}

	.qslsUserItem:nth-child(20) {
		position: absolute;
		top: 18%;
		right: 15%;
		z-index: 22;
	}

	.qslsUserItem:nth-child(21) {
		position: absolute;
		top: 15%;
		right: 38%;
		z-index: 23;
	}

	.qslsUserItem:nth-child(22) {
		position: absolute;
		top: 13%;
		left: 31%;
		z-index: 24;
	}

	.qslsUserItem:nth-child(23) {
		position: absolute;
		top: 12%;
		left: 18%;
		z-index: 25;
	}

	.qslsUserItem:nth-child(24) {
		position: absolute;
		top: 13%;
		left: 3%;
		z-index: 26;
	}
</style>