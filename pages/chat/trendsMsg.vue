<template>
	<view>
		<u-navbar title="动态消息" :safeAreaInsetTop="true" :placeholder="true">
			<view slot="left">
				<i class="ri-arrow-left-s-line text-3xl" style="color: #333 !important;"
					@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
			</view>
		</u-navbar>
		<view class="px-4" v-if="trendsMsgList.length != 0">
			<view style="display: flex;justify-content: space-between;padding: 30rpx 0rpx;"
				v-for="(item,index) in trendsMsgList">
				<view>
					<image :src="item.avatar"
						style="width: 92rpx;height: 92rpx;border-radius: 50%;margin-right: 20rpx;"></image>
				</view>
				<view class="noticeRight" style="border-bottom:1px solid #ededed;flex: 1;padding-bottom: 30rpx;">
					<view style="display: flex;align-items: center;justify-content: space-between;">
						<text
							style="font-size: 30rpx;color:#323232;font-weight: bold;">{{item.realname}}·{{item.dynasty}}</text>
					</view>
					<view style="display: flex;align-items: center;color: #808080;font-size: 26rpx;">
						<text v-if="item.cate == 1">给您评论了！</text>
						<text v-if="item.cate == 2">给您动态点赞了！</text>
						<text v-if="item.cate == 3">给您评论点赞了！</text>
						<text v-if="item.cate == 4">回复您的评论了！</text>
						<text v-if="item.cate == 5">查看您的主页了！</text>
						<text>{{ $u.timeFormat(item.createtime, 'mm-dd hh:MM') }}</text>
					</view>
				</view>
			</view>
		</view>
		<view v-else>
			<u-loadmore v-if="trendsMsgList.length" nomoreText="" color="#a1a1a1" marginTop="20" />
			<u-empty v-if="!trendsMsgList.length" icon="/static/null.png" text="数据为空" textColor="#a1a1a1"
				marginTop="100"></u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		name: "trendsMsg",
		data() {
			return {
				trendsMsgList: []
			}
		},
		onLoad() {
			this.trendsLists()
		},
		methods: {
			//动态消息列表
			async trendsLists() {
				var that = this;
				that.$api('message.trendsMsgLists').then(res => {
					console.log(res)
					if (res.code === 1) {
						that.trendsMsgList = res.data;
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.notice {
		width: 96rpx;
		height: 96rpx;
		background: #FE4373;
		font-size: 50rpx;
		border-radius: 50%;
		text-align: center;
		line-height: 96rpx;
		color: #fff;
		margin-right: 30rpx;
	}

	.noticeRight {
		flex: 1;
		height: 96rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.userImg {
		width: 96rpx;
		height: 96rpx;
		border-radius: 50%;
		margin-right: 30rpx;
	}

	.tips {
		background: #EB3446;
		color: #fff;
		width: 30rpx;
		height: 30rpx;
		border-radius: 50%;
		text-align: center;
	}
</style>