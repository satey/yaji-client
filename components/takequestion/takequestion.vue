<template>

	<view class="takeQuestion">
		<!-- {{item}} -->
		<view class="takeQuestion-item" @tap="$u.route('/pages/user/topicspeed',{post_cate_id:item.id,type:'index'})"
			:style="{background:colors[index % 4 ]}">
			<view style="display: flex;align-items: center;margin-right: 10rpx;">
				<text class="ri-fire-fill" style="color: #FFA000;font-size: 40rpx;"></text>
				<view class="question-title">
					{{item.title}}
				</view>
			</view>
			<!-- 话题 -->
			<view class="pics">
				<image :src="items" class="pics-item" mode="aspectFill" v-for="(items,index) in item.avatar" v-if="index<=5">
				</image>
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
		padding: 25rpx 10rpx 25rpx 20rpx;
		box-sizing: border-box;
		border-radius: 10rpx;
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 146rpx;
	}

	.hot {
		width: 30rpx;
		height: 30rpx;
		float: right;
		margin-right: 80rpx;
		/* border: 1px solid #000; */
	}

	.question-title {
		font-size: 32rpx;
		color: #6F93BD;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		display: box;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		margin-left: 10rpx;
	}

	.pics {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.pics-item {
		width: 50rpx;
		height: 50rpx;
		margin-top: 15rpx;
		border-radius: 50%;
		margin-right: 10rpx;
	}
</style>