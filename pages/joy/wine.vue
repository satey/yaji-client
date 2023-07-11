<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<u-navbar title="诗词结缘" :safeAreaInsetTop="true" :placeholder="true">
		<view slot="left">
			<i class="ri-arrow-left-s-line text-3xl" style="color: #333 !important;"
				@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
		</view>
		<view slot="right">
			<i class="ri-align-justify text-3xl" style="color: #333 !important;"
				@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
		</view>
	</u-navbar>
	<view class="contentBox">
		<view style="font-size: 26rpx;color: #323232;">请小主根据今天的心情，选择一个关键字：</view>
		<view class="ballBox">
			<view class="ball" :class="ballIndex==index?'ballActive':''" v-for="(item,index) in 11" :key="index"
				@click="clickBall(index)"
				:style="'background: linear-gradient(to top, '+colors[index%7]+', #ffffff);animation: bounce 1s infinite;animation-delay:'+index*0.2+'s;'">
				<view class="ballItem">
					<text>春{{index}}</text>
					<view class="animate-ping ping" v-if="ballIndex!=index" :style="{background:colors[index%7]}">
					</view>
				</view>
			</view>
		</view>
		<view class="next">换一批</view>
		<view style="margin-top: 50rpx;">
			<view>请填写一句含关键字的古诗词：</view>
			<input type="text" class="myInput">
			<view class="okBtn">发布结缘</view>
		</view>
		<view style="display: flex;align-items: center;margin-top: 20rpx;">
			<view>cid</view>
			<input type="text" style="border: 1px solid red;" v-model="cid">
		</view>
		<view style="display: flex;align-items: center;margin-top: 20rpx;">
			<view>标题</view>
			<input type="text" style="border: 1px solid red;" v-model="title">
		</view>
		<view style="display: flex;align-items: center;margin-top: 20rpx;">
			<view>内容</view>
			<input type="text" style="border: 1px solid red;" v-model="content">
		</view>
		<view class="okBtn" style="margin-top: 50rpx;" @click="requestPush">请求push</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				colors: ["#F53F3F", "#F77234", "#483D8B", "#008080", "#2E8B57", "#808000", "#CD853F"],
				ballIndex: -1,
				cid: "",
				title: "",
				content: ""
			}
		},
		computed: {

		},
		onLoad() {
			let that = this;
		},
		methods: {
			requestPush() {
				var that = this;
				uni.request({
					url: "https://fc-mp-15e70763-0ed0-4cbb-afb0-10b1b3db8c43.next.bspapp.com/push",
					method: "POST",
					dataType: "json",
					header: {
						"Content-Type": "application/json"
					},
					data: {
						"push_clientid": that.cid,
						"title": that.title,
						"content": that.content,
						"force_notification": true,
						"payload": {
							"title": that.title,
							"content": that.content
						}
					},
					success(res) {
						console.log(res)
					}
				})
			},
			//点击小球
			clickBall(i) {
				this.ballIndex = i;
			}
		}
	}
</script>

<style scoped lang="scss">
	.contentBox {
		padding: 30rpx;
	}

	.ballBox {
		margin-top: 20rpx;
		width: 100%;
		height: 700rpx;
		position: relative;
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
	}

	.ballActive {
		animation: none !important;
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

	.ball:nth-child(1) {
		left: 80rpx;
		top: 50rpx;
	}

	.ball:nth-child(2) {
		left: 300rpx;
		top: 100rpx;
	}

	.ball:nth-child(3) {
		left: 500rpx;
		top: 100rpx;
	}

	.ball:nth-child(4) {
		left: 50rpx;
		top: 200rpx;
	}

	.ball:nth-child(5) {
		left: 350rpx;
		top: 260rpx;
	}

	.ball:nth-child(6) {
		left: 550rpx;
		top: 300rpx;
	}

	.ball:nth-child(7) {
		left: 360rpx;
		top: 550rpx;
	}

	.ball:nth-child(8) {
		left: 100rpx;
		top: 400rpx;
	}

	.ball:nth-child(9) {
		left: 260rpx;
		top: 450rpx;
	}

	.ball:nth-child(10) {
		left: 500rpx;
		top: 450rpx;
	}

	.ball:nth-child(11) {
		left: 20rpx;
		top: 550rpx;
	}

	.ball:nth-child(12) {
		left: 0rpx;
		top: 550rpx;
	}

	.ballItem {
		position: relative;
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