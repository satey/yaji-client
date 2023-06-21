<template>
	<view class="">
		<u-navbar title="话题速配" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view class="face">###{{title}}</view>
		<image src="../../static/hot.png" class="hot" style="margin-top: 20rpx;" mode=""></image>
		<view class="mw">{{hot}}</view>

		<view class="topic">
			<uc-topicspeed v-for="(item,index) in topicspeedList" key="index" :item='item'
				:roleTotalList='roleTotalList'></uc-topicspeed>
			<!-- <view class="topic-item"  v-for="(item,index) in topicspeedList.data" key="index">
				<image class="pic" :src="item.user.avatar" mode=""></image>
				<view class="name">{{item.user.role_realname}}  {{item.user.role_dynasty}}</view>
				<view class="chenghao">{{item.user.role_titles}} </view>
				<view class="content">{{item.content}}</view>
				<view class="tag">#诗词歌赋</view>
				<view class="total">
					<view class="" style="display: inline-block;">
					<i  @click="$u.route('/pages/post/detail', { post_id: item.id })" class="ri-message-3-fill text-l leading-none bg-gradient-to-b from-gray-300 to-gray-200 bg-clip-text text-transparent"></i>
					<view class="" style="		font-size: 24rpx; display: inline-block;position: relative; top: -5rpx;left: 10rpx;">评论</view>
					</view>
					<view class="" style="display: inline-block;" @click="handlePostDig()">
						<i style="margin-left: 20rpx;"  v-show='is_zan==0'class="ri-heart-3-fill text-l bg-gradient-to-b from-gray-300 to-gray-200 bg-clip-text text-transparent ;"></i>
						<i  style="margin-left: 20rpx;"  v-show='is_zan==1' class="ri-heart-3-fill text-l bg-gradient-to-b from-red-400 to-red-400 bg-clip-text text-transparent"></i>
						<view class="" style="font-size: 24rpx; display: inline-block;position: relative; top: -5rpx;left: 10rpx;">出彩</view>
					</view>
					<view class="" style="display: inline-block;">
					<i  style="margin-left: 20rpx;" v-show='is_cai==0'  class="ri-hail-line text-l bg-gradient-to-b from-gray-300 to-gray-200 bg-clip-text text-transparent"></i>
					<i  style="margin-left: 20rpx;"  v-show='is_cai==1' class="ri-hail-line text-l bg-gradient-to-b from-red-400 to-red-400 bg-clip-text text-transparent"></i>
					<view class="" style="font-size: 24rpx; display: inline-block;position: relative; top: -5rpx;left: 10rpx;">无聊</view>
					</view>
				</view>
				
			</view>
	 -->
		</view>
		<!-- </view> -->

	</view>
</template>

<script>
	export default {
		name: 'topicspeed',
		data() {
			return {
				page: 1,
				post_cate_id: null,
				topicspeedList: [],
				hot: '',
				title: '',
				roleTotalList: []

			}
		},
		onLoad(options) {
			let that = this
			that.post_cate_id = options.post_cate_id
			uni.setStorageSync('post_cate_id', options.post_cate_id)
		},
		mounted() {
			let that = this
			this.init()
			// console.log('hot',uni.getStorageSync('hot'));
			that.hot = uni.getStorageSync('hot')
			that.title = uni.getStorageSync('title')
			uni.removeStorageSync('hot')
			uni.removeStorageSync('title')
		},
		computed: {

		},
		methods: {

			init() {
				let that = this
				let data = {
					page: 1,
					post_cate_id: uni.getStorageSync('post_cate_id')
				}
				that.$api('post.recommend', data).then(res => {
					if (res.code === 1) {
						that.topicspeedList = res.data.data
						// console.log('sc',that.topicspeedList);
						for (let i = 0; i < that.topicspeedList.length; i++) {
							console.log('11', that.topicspeedList[i].user.role_titles.split(','));
							that.roleTotalList = that.topicspeedList[i].user.role_titles.split(',')
						}

					}
				})
			},

		},
		created() {

		},



	}
</script>

<style lang="scss" scoped>
	.face {
		display: inline-block;
		height: 45rpx;
		font-size: 32rpx;
		color: #6F93BD;
		line-height: 45rpx;
		margin-left: 40rpx;
		margin-top: 20rpx;
	}

	.hot {
		display: inline-block;
		width: 40rpx;
		height: 40rpx;
		margin-left: 600rpx;
		margin-top: -200rpx;
	}

	.mw {
		margin-left: 650rpx;
		margin-top: -40rpx;
	}

	.topic {
		margin-top: 30rpx;
	}

	.topic-item {
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
		margin-left: 150rpx;
	}

	.total {
		width: 440rpx;
		height: 60rpx;
		margin-top: 30rpx;
		margin-left: 400rpx;
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