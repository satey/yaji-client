<template>
	<view>
		<image style="position: absolute;top: 0;left: 0;width: 100%;height: 360rpx;"
			src="https://yaji-1318192409.cos.ap-shanghai.myqcloud.com/app_file/index/ta.png" mode="">
		</image>
		<view class="seach">
			<u-navbar :safeAreaInsetTop="true" :placeholder="true" bgColor="transparent">
				<view slot="left">
					<i class="ri-arrow-left-s-line text-3xl" @click="$u.route({ type: 'navigateBack', delta: 1 })"></i>
				</view>
			</u-navbar>
			<view
				style="display: flex;align-items: center;padding-top: 70rpx;justify-content: space-between;margin-right: 36rpx;">
				<view></view>
				<view style="display: flex;align-items: center;">
					<view @click="viewThis"
						style="width: 65rpx;height: 65rpx;opacity: 1;border: 2rpx solid #FE4373;border-radius: 50%;text-align: center;line-height: 65rpx;color: #FE4373;"
						:style="{color:viewThisCode==0?'#FE4373':'#fff',background:viewThisCode==0?'':'#FE4373'}">
						<text class="ri-user-fill" style="font-size: 39rpx;"></text>
					</view>
					<view @click="$u.route('pages/joy/archeryPublish')"
						style="margin-left: 30rpx;width: 185rpx;height: 65rpx;text-align: center;line-height: 65rpx;border-radius: 10rpx;color: #fff;background: #FE4373;font-size: 28rpx;">
						发一个</view>
				</view>
			</view>
		</view>
		<view style="height: 360rpx;"></view>
		<view style="margin: 0 auto;">
			<u-empty v-if="!lists.length" icon="/static/empty2.png" text="数据为空" textColor="#a1a1a1"
				marginTop="100"></u-empty>
		</view>
		<view class="archeryList">
			<view class="archeryItemBox">
				<block v-for="(item,index) in lists" :key='index' v-if="index%2==0">
					<view style="padding: 15rpx 15rpx 15rpx 30rpx;"
						@click="$u.route('pages/joy/archeryDetail',{archeryId:item.id})">
						<view class="archeryItem">
							<view class="archeryImgBox">
								<image class="archeryImg" mode="widthFix" :src="item.image" alt=""></image>
							</view>
							<view style="display: flex;align-items: center;margin-top: 15rpx;">
								<image :src="item.avatar"
									style="width: 44rpx;height: 44rpx;border-radius: 50%;margin-left: 10rpx;"
									mode="aspectFill">
								</image>
								<view style="font-size: 28rpx;color: #323232;margin-left: 10rpx;">
									{{item.role_realname}}·{{item.role_dynasty}}
								</view>
								<block v-if="item.gender == 2">
									<text class="ri-women-fill"
										style="margin-left: 15rpx;color: #E87B7B;font-size: 19rpx;"></text>
								</block>
								<block v-if="item.gender == 1">
									<text class="ri-men-fill"
										style="margin-left: 15rpx;color: #8FB992;font-size: 19rpx;"></text>
								</block>
							</view>
							<view style="display: flex;align-items: center;margin-top: 15rpx;margin-left: 10rpx;">
								<view style="color: #323232;opacity: 0.6;font-size: 28rpx;">射辞：</view>
								<view
									style="color: #323232;opacity: 0.8;font-size: 28rpx;flex: 1;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
									{{item.prompt||"无"}}
								</view>
							</view>
							<view style="display: flex;align-items: center;margin-top: 15rpx;margin-left: 10rpx;">
								<view style="color: #323232;opacity: 0.6;font-size: 28rpx;">奖励：</view>
								<view
									style="color: #323232;opacity: 0.8;font-size: 28rpx;flex: 1;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
									{{item.reward||"无"}}
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
			<view class="archeryItemBox">
				<block v-for="(item,index) in lists" :key='index' v-if="index%2!=0">
					<view style="padding: 15rpx 30rpx 15rpx 15rpx;"
						@click="$u.route('pages/joy/archeryDetail',{archeryId:item.id})">
						<view class="archeryItem">
							<view class="archeryImgBox">
								<image class="archeryImg" mode="widthFix" :src="item.image" alt=""></image>
							</view>
							<view style="display: flex;align-items: center;margin-top: 15rpx;">
								<image :src="item.avatar"
									style="width: 44rpx;height: 44rpx;border-radius: 50%;margin-left: 10rpx;"
									mode="aspectFill">
								</image>
								<view style="font-size: 28rpx;color: #323232;margin-left: 10rpx;">
									{{item.role_realname}}·{{item.role_dynasty}}
								</view>
								<block v-if="item.gender == 2">
									<text class="ri-women-fill"
										style="margin-left: 15rpx;color: #E87B7B;font-size: 19rpx;"></text>
								</block>
								<block v-if="item.gender == 1">
									<text class="ri-men-fill"
										style="margin-left: 15rpx;color: #8FB992;font-size: 19rpx;"></text>
								</block>
							</view>
							<view style="display: flex;align-items: center;margin-top: 15rpx;margin-left: 10rpx;">
								<view style="color: #323232;opacity: 0.6;font-size: 28rpx;">射辞：</view>
								<view
									style="color: #323232;opacity: 0.8;font-size: 28rpx;flex: 1;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
									{{item.prompt||"无"}}
								</view>
							</view>
							<view style="display: flex;align-items: center;margin-top: 15rpx;margin-left: 10rpx;">
								<view style="color: #323232;opacity: 0.6;font-size: 28rpx;">奖励：</view>
								<view
									style="color: #323232;opacity: 0.8;font-size: 28rpx;flex: 1;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
									{{item.reward||"无"}}
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
		<topPrompt></topPrompt>
		<feiqslsHit></feiqslsHit>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				viewThisCode: 0,
				lists: []
			}
		},
		onLoad(e) {
			var that = this;
			that.getLists();
			uni.$on('archeryUpdate', function(data) {
				that.lists = [];
				that.page = 1;
				that.viewThisCode = 0;
				that.$forceUpdate();
				that.getLists();
			})
		},
		onUnload() {
			uni.$off("archeryUpdate");
		},
		onReachBottom() {
			this.page++;
			this.getLists();
		},
		methods: {
			//获取列表
			getLists() {
				var that = this;
				that.$api("archery.lists", {
					page: that.page,
					limit: "limit",
					is_show_only_me: that.viewThisCode,
				}).then(res => {
					if (res.code == 1) {
						that.lists = [...that.lists, ...res.data];
					}
				})
			},
			//查看自己的
			viewThis() {
				this.lists = [];
				this.page = 1;
				this.viewThisCode = this.viewThisCode == 0 ? 1 : 0;
				this.getLists()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.archeryList {
		flex-direction: row;
		justify-content: space-between;
		box-sizing: border-box;
		display: flex;
		// padding: 0rpx 30rpx;

		.archeryItemBox {
			flex: 1;
			flex-basis: 49%;
			box-sizing: border-box;
			overflow: hidden;

			.archeryItem {
				border-radius: 10rpx;
				background: #fff;
				box-sizing: border-box;
				box-shadow: 0rpx 4rpx 10rpx 0rpx rgba(0, 0, 0, 0.302);
				padding: 10rpx;

				.archeryImgBox {
					max-height: 300rpx;
					border-radius: 5rpx;
					overflow: hidden;
					width: 100%;

					.archeryImg {
						width: 100%;
						height: 100%;
						border-radius: 5rpx;
					}
				}

			}
		}
	}



	.seach {
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		box-sizing: border-box;
		background: linear-gradient(180deg, rgba(185, 177, 177, 0) 0%, #FFFFFF 100%);
		height: 360rpx;

		.myInput {
			width: 100%;
			height: 80rpx;
			background: rgba(255, 255, 255, 0.6);
			border-radius: 10rpx;
			padding-left: 10rpx;
			box-sizing: border-box;
			position: relative;
			display: flex;
			align-items: center;
			z-index: 999;
			border: 1px solid #FE4373;
			margin-top: 50rpx;

			.searchIcon {
				position: absolute;
				right: 28rpx;
				top: 0;
				height: 80rpx;
				line-height: 80rpx;
			}
		}
	}
</style>