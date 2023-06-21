<template>
	<view class="">
		<u-navbar title="反馈记录详情" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view class="content">
			<view style="color: #999;font-size: 24rpx;">
				<text>{{ $u.timeFormat(timer, 'yyyy-mm-dd hh:MM') }}</text><text>反馈：</text>
			</view>
			<view style="color: #323232;font-size: 32rpx;margin-top: 20rpx;font-weight: bold;">
				{{title}}
			</view>
			<view style="color: #808080;font-size: 28rpx;margin-top: 20rpx;">
				{{content}}
			</view>
			<view v-if="images.length"
				style="color: #323232;font-size: 32rpx;margin-top: 20rpx;font-weight: bold;margin-top: 70rpx;">描述图片
			</view>
			<view style="color: #808080;font-size: 28rpx;" v-if="images.length">
				<image class="imgs" :src="item" v-for="(item,index) in images" @click="openImg(index)"></image>
			</view>
		</view>
		<view class="feedbackBack" v-if="reply_content||reply_images">
			<view style="display: flex;align-items: center;justify-content: space-between;">
				<text style="color: #323232;font-size: 32rpx;margin-top: 20rpx;font-weight: bold;">客服回复</text>
				<text style="color: #999;font-size: 24rpx;">{{ $u.timeFormat(timer2, 'yyyy-mm-dd hh:MM') }}</text>
			</view>

			<view class="content2">{{reply_content}}</view>
			<view style="color: #808080;font-size: 28rpx;">
				<image class="imgs" :src="item" v-for="(item,index) in reply_images" @click="openImg2(index)"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'feedbackSuggest',
		data() {
			return {
				title: "",
				content: "",
				images: [],
				reply_content: "",
				reply_images: [],
				timer: "",
				timer2: ''
			}
		},
		onLoad() {
			this.init();
		},
		methods: {
			init() {
				var that = this;
				that.$api('feedback.detail', {
					"id": that.$Route.query.id,
				}).then(res => {
					if (res.code === 1) {
						that.title = res.data.title;
						that.content = res.data.content;
						if (res.data.images != "" && res.data.images != null) {
							that.images = res.data.images.split(",");
						}
						that.reply_content = res.data.reply_content
						that.reply_images = res.data.reply_images == null ? null : res.data.reply_images.split(
							",");
						that.timer = res.data.createtime;
						that.timer2 = res.time;
					} else {
						that.$u.toast(res.msg)
					}
				})
			},
			//打开图片
			openImg(index) {
				var that = this;
				uni.previewImage({
					current: index,
					urls: that.images
				})
			},
			openImg2(index) {
				var that = this;
				uni.previewImage({
					current: index,
					urls: that.reply_images
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		margin: 30rpx;
		padding-bottom: 30rpx;
		border-bottom: 1rpx solid #ECECEC;
	}

	.imgs {
		margin-right: 20rpx;
		width: 150rpx;
		height: 150rpx;
		border-radius: 8rpx;
		margin-top: 20rpx;
	}

	.feedbackBack {
		padding: 0 30rpx;
	}

	.content2 {
		color: #808080;
		font-size: 28rpx;
		margin-top: 20rpx;
	}
</style>