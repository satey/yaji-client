<template>

	<view class="takeQuestion">
		<!-- {{item}} -->
		<view class="takeQuestion-item" @click="skipTopic(item)" :style="{background:colors[index % 4 ]}">
			<!-- 话题 -->
			<view class="question-title">
				<view @tap="$u.route('/pages/user/topicspeed',{post_cate_id:item.id})">{{item.title}}</view>
				<view class="pics">
					<image :src="items" class="pics-item" mode="" v-for="(items,index) in item.avatar"></image>
				</view>
			</view>
			<view style="display: flex;align-items: center;">
				<text class="ri-fire-fill" style="color: #FE4373;font-size: 50rpx;"></text>
				<text style="color: #FE4373;font-size: 30rpx;">{{item.hot_num}}</text>
			</view>
		</view>

	</view>

</template>

<script>
	export default {
		props: {
			item: {},
			index: 0
		},
		data() {
			return {
				colors: ["#F6F6FF", "#F1FEFF", "#FFFBF4", "#FFF6FE"],
			}
		},
		created() {},
		onShow() {
			uni.removeStorageSync('hot')
			uni.removeStorageSync('title')
		},
		methods: {
			skipTopic(item) {
				uni.setStorageSync('hot', item.hot_num)
				uni.setStorageSync('title', item.title)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.takeQuestion-item {
		width: 100%;
		height: 160rpx;
		padding: 30rpx;
		box-sizing: border-box;
		border-radius: 10rpx;
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.hot {
		width: 30rpx;
		height: 30rpx;
		float: right;
		margin-right: 80rpx;
		/* border: 1px solid #000; */
	}

	.question-title {
		font-size: 28rpx;
		color: #6F93BD;
	}

	.pics-item {
		width: 40rpx;
		height: 40rpx;
		margin-left: 10rpx;
		margin-top: 15rpx;
		border-radius: 50%;
		margin-right: 10rpx;
		/* border: 1px solid rgba(0, 0, 0, 0.05); */
	}
</style>