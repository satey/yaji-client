<template>
	<view>
		<view class="topic-item">
			<!-- <image class="pic" style="" :src="item.user.avatar" mode=""></image>
			<view class="name">{{item.user.role_realname}} {{item.user.role_dynasty}}</view>
			<view class="chenghao">{{item.user.role_titles}} </view>
			<view class="content" @click="$u.route('/pages/post/detail', { post_id: item.id })">{{item.content}}</view>
			<text class="tag" style="display: inline-block;" v-for="items in item.tags">#{{items}}</text>
			<view class="total">
				<view class="" style="display: inline-block;">
					<i @click="$u.route('/pages/post/detail', { post_id: item.id })"
						class="ri-message-3-fill text-l leading-none bg-gradient-to-b from-gray-300 to-gray-200 bg-clip-text text-transparent"></i>
					<view class=""
						style="		font-size: 24rpx; display: inline-block;position: relative; top: -5rpx;left: 10rpx;">评论
					</view>
				</view>
				<view class="" style="display: inline-block;" @click="handlePostDig()">
					<i style="margin-left: 25rpx;" v-show='is_zan==0'
						class="ri-heart-3-fill text-l bg-gradient-to-b from-gray-300 to-gray-200 bg-clip-text text-transparent ;"></i>
					<i style="margin-left: 25rpx;" v-show='is_zan==1'
						class="ri-heart-3-fill text-l bg-gradient-to-b from-red-400 to-red-400 bg-clip-text text-transparent"></i>
					<view class=""
						style="font-size: 24rpx; display: inline-block;position: relative; top: -5rpx;left: 10rpx;"
						v-show="item.diggnums>0">{{ item.diggnums }}</view>
					<view class=""
						style="font-size: 24rpx; display: inline-block;position: relative; top: -5rpx;left: 10rpx;"
						v-show="item.diggnums<=0">出彩</view>
				</view>
				<view class="" style="display: inline-block;" @click="handleConcleDig()">
					<image v-show='is_cai==0' src="../../static/nolove.png"
						style="width: 30rpx; margin-left: 30rpx; margin-top: 10rpx; height: 30rpx;" mode=""></image>
					<image v-show='is_cai==1' src="../../static/nolove-red.png"
						style="width: 30rpx;margin-left: 30rpx; margin-top: 10rpx;height: 30rpx;" mode=""></image>

					<view class=""
						style="font-size: 24rpx; display: inline-block;position: relative; top: -5rpx;left: 10rpx;">无聊
					</view>
				</view>
			</view>
 -->
		</view>

	</view>
</template>

<script>
	export default {
		name: "uc-topicspeed",
		props: {
			list: {},
		},
		data() {
			return {
				is_zan: '',
				is_cai: ''
			};
		},
		created() {

		},
		mounted() {
			console.log(this.list)
			// this.isZan()
			// this.isCai()
		},

		methods: {
			isZan() {
				let that = this
				that.$api('post.detail', {
					post_id: that.item.id
				}).then(res => {
					if (res.code === 1) {
						that.is_zan = res.data.is_zan
					} else {
						that.$u.toast(res.msg)
					}
				})
			},
			isCai() {
				let that = this
				that.$api('post.detail', {
					post_id: that.item.id
				}).then(res => {
					if (res.code === 1) {
						that.is_cai = res.data.is_cai
					} else {
						that.$u.toast(res.msg)
					}
				})
			},
			// 点赞红心
			handlePostDig() {
				console.log('点赞');
				let that = this
				console.log(that.item);
				that.$api('post.dig', {
					post_id: that.item.id,
				}).then(res => {
					if (res.code === 1) {
						that.getPostDetail()
						that.isZan()
					} else {
						that.$u.toast(res.msg)

					}
				})
			},
			getPostDetail() {
				let that = this
				that.$api('post.detail', {
					post_id: that.item.id
				}).then(res => {
					if (res.code === 1) {
						that.item.diggnums = res.data.diggnums
					}
				})
			},
			// 点踩
			handleConcleDig() {
				let that = this
				that.$api('user.info').then(res => {
					if (res.code === 1) {
						if (that.item.user.id != res.data.id) {
							that.$api('post.cai', {
								post_id: that.item.id,
							}).then(res => {
								if (res.code === 1) {
									that.is_cai = 1
									that.getPostDetailCancle()
									that.isCai()
								} else {
									that.is_cai = 0
									that.$u.toast(res.msg)
								}
							})
						} else {
							that.$u.toast('不能给自己点踩哦')
						}

					} else {
						that.$u.toast(res.msg)
						return
					}
				})
			},
			// 点踩详情
			getPostDetailCancle() {
				let that = this
				that.$api('post.detail', {
					post_id: that.item.id
				}).then(res => {
					if (res.code === 1) {
						that.item.cainums = res.data.cainums
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.topic-item {
		width: 700rpx;
		border-bottom: 1px solid rgba(0, 0, 0, 0.02);

	}

	.topic-item .pic {
		width: 84rpx;
		height: 84rpx;
		margin-top: 30rpx;
		margin-left: 30rpx;
		border-radius: 50%;
	}

	.topic-item .name {
		height: 40rpx;
		font-size: 28rpx;
		color: #323232;
		line-height: 40rpx;
		margin-left: 150rpx;
		margin-top: -90rpx;
	}

	.topic-item .chenghao {
		height: 33rpx;
		font-size: 24rpx;
		color: #999999;
		line-height: 33rpx;
		margin-left: 150rpx;
		margin-top: 10rpx;
	}

	.topic-item .content {
		width: 572rpx;
		font-size: 26rpx;
		color: #323232;
		line-height: 37rpx;
		margin-top: 20rpx;
		margin-left: 150rpx;
	}

	.tag {
		height: 35rpx;
		font-size: 28rpx;
		color: #6F93BD;
		line-height: 35rpx;
		// margin-left: 150rpx;
		position: relative;
		left: 150rpx;
	}

	.total {
		// width: 440rpx;
		height: 60rpx;
		margin-top: 30rpx;
		margin-left: 350rpx;
		margin-bottom: 30rpx;
		// border: 1px solid #000;
	}

	.total_pic1 {
		width: 30rpx;
		height: 30rpx;
		margin-top: 10rpx;
		margin-left: 20rpx;
		// border: 1px solid #000;
	}

	.total_pic2 {
		width: 30rpx;
		height: 30rpx;
		margin-left: 20rpx;
		// border: 1px solid #000;
	}

	.total_pic3 {
		width: 30rpx;
		height: 30rpx;
		margin-left: 20rpx;
		// border: 1px solid #000;
	}
</style>