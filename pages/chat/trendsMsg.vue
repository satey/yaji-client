<template>
	<view class="trends">
		<view>
			<u-navbar title="通知" :safeAreaInsetTop="true" :placeholder="true">
				<view slot="left">
					<i class="ri-arrow-left-s-line text-3xl" style="color: #333 !important;"
						@click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
				</view>
			</u-navbar>
		</view>

		<scroll-view scroll-y="true" class="myScroll">
			<block v-for="(item,index) in trendsMsgList" :key="index">
				<view class="items" v-if="item.show_type ==1">
					<view class="rightBox">
						<view style="color: #999;font-size: 28rpx;">{{item.createtime}}</view>
						<view class="contentBox">
							<view style="display: flex;align-items: center;">
								<image style="width: 72rpx;height: 72rpx;border-radius: 50%;"
									:src="item.ori_user_info.avatar" mode="aspectFill"
									@click="$u.route('/pages/user/home',{user_id:item.ori_user_info.user_id})"></image>
								<view style="color: #333333;font-size: 32rpx;margin-left: 20rpx;flex: 1;">
									{{item.content}}
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="items" v-if="item.show_type == 2">
					<view class="rightBox">
						<view style="color: #999;font-size: 28rpx;">{{item.createtime}}</view>
						<view class="contentBox">
							<view>
								<view style="color: #333333;font-size: 32rpx;">{{item.content}}
								</view>
								<view style="display: flex;justify-content: space-between;">
									<view></view>
									<view @click="$u.route(item.href)"
										style="margin-top: 20rpx;color: #fff;font-size: 28rpx;text-align: center;border-radius: 26rpx;background: #FFB96A;width: 140rpx;height: 45rpx;line-height: 45rpx;">
										前往查看</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="items" v-if="item.show_type == 3">
					<view class="rightBox">
						<view style="color: #999;font-size: 28rpx;">{{item.createtime}}</view>
						<view class="contentBox">
							<view>
								<view style="color: #333333;font-size: 32rpx;">{{item.content}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</block>
			<u-empty v-if="!trendsMsgList.length" icon="/static/iconImage/jilu.png" text="暂无通知" textColor="#a1a1a1"
				marginTop="50"></u-empty>
		</scroll-view>
		<feiqslsHit></feiqslsHit>
	</view>
</template>

<script>
	export default {
		name: "trendsMsg",
		data() {
			return {
				trendsMsgList: [],
				page: 1
			}
		},
		onLoad() {
			this.trendsLists()
		},
		onReachBottom() {
			this.page++;
			this.trendsLists()
		},
		methods: {
			//动态消息列表
			trendsLists() {
				this.$api("message.getNoticeList", {
					page: this.page
				}).then(res => {
					if (res.code == 1) {
						this.trendsMsgList.push(...res.data.list);
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.trends {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.myScroll {
		width: 100%;
		flex: 1;
		background: #F8F8F8;
		box-sizing: border-box;

		.items {
			display: flex;
			padding-left: 30rpx;
			padding-right: 72rpx;
			padding-top: 45rpx;

			.userImg {
				width: 96rpx;
				height: 96rpx;
				border-radius: 50%;
			}

			.rightBox {
				flex: 1;
				margin-left: 22rpx;
				margin-top: 11rpx;

				.contentBox {
					margin-top: 20rpx;
					width: 100%;
					background: #fff;
					border-radius: 20rpx;
					padding: 37rpx 25rpx;
					box-sizing: border-box;
				}
			}
		}

	}

	.notice {
		width: 96rpx;
		height: 96rpx;
		background: #FFB96A;
		font-size: 50rpx;
		border-radius: 50%;
		text-align: center;
		line-height: 96rpx;
		color: #fff;
		margin-right: 30rpx;
	}
</style>