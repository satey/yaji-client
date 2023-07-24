<template>
	<view>
		<web-view v-if="isShow" class="webView" @message="message" :src="src" :fullscreen="false"
			:webview-styles="webviewStyles"></web-view>
		<view class="flooter">
			<view class="next" @click="nextBall">换一批</view>
			<view style="margin-top: 50rpx;">
				<view>请填写一句含关键字<text v-show="selectText!=''" style="color:#FE4373;">【{{selectText}}】</text>的古诗词：</view>
				<input type="text" class="myInput" placeholder="请输入5字以上的诗句" v-model="conetnt">
				<view class="okBtn" @click="submit">发布结缘</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				webviewStyles: {
					progress: {
						color: '#ffffff',
					},
					width: uni.getSystemInfoSync().screenWidth,
					height: "330"
				},
				src: "",
				selectText: "",
				conetnt: "",
				selectId: "",
				isShow: false,
			}
		},
		onLoad() {
			let that = this;
			that.$api("poetry.textList", {
				type: 0
			}).then((res) => {
				if (res.code == 1) {
					that.src = "/hybrid/html/ball.html?data=" + JSON.stringify(res.data);
				}
			})
		},
		onShow() {
			var that = this;
			that.isShow = true;
		},
		onHide() {
			var that = this;
			that.isShow = false;
		},
		onNavigationBarButtonTap() {
			var that = this;
			that.$u.route(`/pages/joy/wineList`);
		},
		methods: {
			//换一批
			nextBall() {
				var that = this;
				that.isShow = false;
				that.$api("poetry.textList", {
					type: 1
				}).then((res) => {
					if (res.code == 1) {
						that.isShow = true;
						that.src = "/hybrid/html/ball.html?data=" + JSON.stringify(res.data);
					}
				})
			},
			//发布
			submit() {
				var that = this;
				if (that.selectText == "") {
					that.$u.toast("请选择关键字")
					return;
				}
				if (that.conetnt.length == 0) {
					that.$u.toast("请输入诗句")
					return;
				}
				if (that.conetnt.length < 5) {
					that.$u.toast("请输入5字以上的诗句")
					return;
				}
				if (that.conetnt.indexOf(that.selectText) == -1) {
					that.$u.toast(`请输入包含${that.selectText}的诗句`)
					return;
				} else {
					// that.$u.route('/pages/joy/wineContent');
					that.$api("poetry.poetryAdd", {
						poetry: that.conetnt,
						poetry_word_id: that.selectId
					}).then((res) => {
						if (res.code == 1) {
							that.conetnt = "";
							that.selectId = "";
							that.selectText = "";
							uni.redirectTo({
								url: '/pages/joy/wineContent'
							});
							// that.$u.route(`/pages/joy/wineContent?data=${JSON.stringify(res.data)}`);
						} else {
							that.$u.toast(res.msg)
						}
					})
				}
			},
			//html发回来的数据
			message(event) {
				this.selectText = event.detail.data[0].action;
				this.selectId = event.detail.data[0].actionId;
			}
		}
	}
</script>

<style scoped lang="scss">
	.flooter {
		padding: 30rpx;
		box-sizing: border-box;
		position: absolute;
		bottom: 260rpx;
		left: 0;
		width: 100%;
		z-index: 999999999;
	}

	.ballItem {
		position: absolute;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		text-align: center;
		line-height: 100rpx;
		color: #fff;
		font-size: 30rpx;
		background: red;
	}

	.contentBox {
		padding: 30rpx;
	}

	.ballBox {
		margin-top: 20rpx;
		width: 100%;
		height: 700rpx;
		position: relative;
		transition: all 0.3s;
		border: 1px solid red;
	}


	.ball {
		position: absolute;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		text-align: center;
		line-height: 100rpx;
		color: #fff;
		font-size: 30rpx;
		transition: all 0.1s;
		animation-play-state: paused;
	}

	.ballActive {
		box-shadow: 0rpx 0rpx 50rpx #333;
	}

	.myInput {
		margin: 30rpx 0rpx;
		height: 72rpx;
		background: #F7F7F7;
		border-radius: 36rpx;
		padding-left: 20rpx;
		font-size: 28rpx;
		color: #323232;
		border: 1rpx solid #ccc;
	}

	.okBtn {
		background: #FE4373;
		border-radius: 43px;
		height: 85rpx;
		text-align: center;
		line-height: 85rpx;
		color: #fff;
	}

	.next {
		color: #FE4373;
		text-align: center;
		font-size: 26rpx;
	}

	.ballItem {
		position: absolute;
		z-index: 99;
	}

	.ping {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -40rpx;
		margin-top: -40rpx;
		z-index: -1;
		opacity: 0.3;
	}
</style>