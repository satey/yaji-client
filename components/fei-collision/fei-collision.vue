<template>
	<view>
		<view class="collision" v-if="show">
			<view class="collisionBox">
				<view class="collisionLeft" :style="'animation-play-state:'+animationPlay+';'">
					<view style="padding-left:20rpx;box-sizing: border-box;">
						<slot name="left"></slot>
					</view>
				</view>
				<view class="collisionRight" :style="'animation-play-state:'+animationPlay+';'">
					<view style="padding-right: 20rpx;box-sizing: border-box;">
						<slot name="right"></slot>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: '',
		data() {
			return {
				userInfo: [],
				show: false,
				animationPlay: "paused",
				animationTimeOut: null
			}
		},

		onLoad() {
			this.init()
		},
		methods: {
			start() {
				this.show = !this.show;
				clearTimeout(this.animationTimeOut);
				this.$nextTick(() => {
					this.animationPlay = 'running';
					this.animationTimeOut = setTimeout(() => {
						this.show = !this.show;
						this.animationPlay = "paused";
						clearTimeout(this.animationTimeOut)
					}, 1800)
				})
			},
			hide() {
				this.show = false;
			},
			//初始化
			init() {
				let that = this;
				that.$api("user.info").then(res => {
					console.log(res)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.collision {
		width: 100vw;
		position: absolute;
		top: 37%;
		left: 0%;

		.collisionBox {
			display: flex;
			align-items: center;
			position: relative;

			.collisionLeft {
				width: 50%;
				position: absolute;
				top: 0;
				left: 0;
				transform: translateX(-200%);
				text-align: left;
				position: relative;
				animation-fill-mode: forwards;
				animation-timing-function: linear;
				animation-iteration-count: 1;
				animation-duration: 1.2s;
				animation-name: leftAnimation;
				background-image: url(@/static/iconImage/zhuangLeft.png);
				background-position: 100% 100%;
				background-size: contain;
				background-repeat: no-repeat;
				// height: 111rpx;
			}

			.collisionRight {
				width: 50%;
				// height: 111rpx;
				position: absolute;
				top: 0;
				right: 0;
				position: relative;
				transform: translateX(200%);
				text-align: right;
				animation-fill-mode: forwards;
				animation-timing-function: linear;
				animation-iteration-count: 1;
				animation-duration: 1.2s;
				animation-name: rightAnimation;
				background-image: url(@/static/iconImage/zhuangRight.png);
				background-position: 100% 100%;
				background-size: contain;
				background-repeat: no-repeat;
			}
		}
	}

	// 左边动画
	@keyframes rightAnimation {
		0% {
			transform: translateX(200%);
		}

		40% {
			transform: translateX(-35rpx);
		}

		55% {
			transform: translateX(50rpx);
		}

		65% {
			transform: translateX(-35rpx);
		}

		85% {
			transform: translateX(0rpx);
		}

		100% {
			transform: translateX(-28rpx);
		}

	}


	// 右边动画
	@keyframes leftAnimation {
		0% {
			transform: translateX(-200%);
		}

		40% {
			transform: translateX(35rpx);
		}

		55% {
			transform: translateX(-50rpx);
		}

		65% {
			transform: translateX(35rpx);
		}

		85% {
			transform: translateX(0rpx);
		}

		100% {
			transform: translateX(28rpx);
		}
	}
</style>