<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<view class="px-4">
		<image src='@/static/embed/s3.png'
			style="position: fixed; width: 100%; height: 100%; top: 0; left: 0; z-index: -1"></image>
		<view style="padding-top: 100rpx;">
			<view style="font-size: 36rpx;color: #FFFFFF;">获得角色</view>
			<view style="padding: 50rpx 30rpx 0rpx 30rpx;display: flex;flex-direction: column;box-sizing: border-box;">
				<view class="container">
					<view class="contentHead">
						<view class="text-2xl name">{{ userRole.realname||"无名氏" }}</view>
						<view
							style="position: absolute;right: 66rpx;color: #808080;font-size: 28rpx;padding-top:10rpx ;">
							名望<text style="color: #FE4373;padding-left: 5rpx;">{{userRole.role_mw|| '无'}}</text></view>
					</view>
					<image src="../../static/fenge.png" style="width: 100%;margin-top: -1px;" mode="widthFix"></image>
					<view class="contentBody">
						<view class="types flex" style="display: flex;flex-wrap: wrap;align-items: center;">
							<view>{{userRole.gender == 1?'男':"女"}}</view>
							<view style="margin-left: 26rpx;">{{userRole.dynasty||"未知朝代"}}</view>
						</view>
						<view
							style="padding: 40rpx 38rpx 0rpx 38rpx;box-sizing: border-box;font-size: 28rpx;color: #808080;">
							<view>
								<text>别称：</text>
								<text>{{userRole.aliasnames||"无"}}</text>
							</view>
							<view style="margin-top: 20rpx;">
								<text>身份：</text>
								<text v-if="userRole.achievements.length == 0">无</text>
								<block v-else v-for="(item2,index2) in userRole.achievements" :key="index2">
									<text style="margin-right: 20rpx;">{{item2}}</text>
								</block>
							</view>
							<view style="margin-top: 20rpx;">
								<text>称号：</text>
								<text v-if="userRole.titles.length == 0">无</text>
								<block v-else v-for="(item2,index2) in userRole.titles" :key="index2">
									<text>{{item2}}</text>
								</block>
							</view>
						</view>
						<view class="contentText text-xl">{{ userRole.content || '暂无介绍' }} </view>
						<view style="padding:0rpx 38rpx;margin-top: 60rpx;">
							<view
								style="text-align: center;font-size: 28rpx;width: 100%; height: 85rpx;background: #FE4373;line-height: 85rpx;color: #FFFFFF;border-radius: 50rpx;"
								@click="openIndex()">进入首页
							</view>
						</view>

					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				role: [],
				colors: ["red", "pink", "blue", "yellow", "#FE4373"],
				data: [],
				choose_num: '',
				isClick: true,
				userRole: []
			};
		},
		onLoad(e) {
			this.userRole = JSON.parse(e.role)
		},
		methods: {

			//重新选择
			handleRematch() {
				uni.reLaunch({
					url: '/pages/auth/s2'
				})
			},
			openIndex() {
				uni.reLaunch({
					url: '/pages/index/index'
				});
			},
			// 开始体验
			handleSubmit() {
				let that = this;
				if (that.isClick) {
					that.isClick = false;
					if (!that.role) {
						that.$u.toast('角色必须选择')
						return false
					}
					if (that.choose_num == 0) {
						that.isClick = true;
						uni.reLaunch({
							url: '/pages/index/index'
						});
						return;
					}
					uni.setStorageSync('times', that.times);
					let gender = uni.getStorageSync('gender')
					that.formGender = gender

					let data = {
						role_id: that.role.id,
						dynasty: that.data.dynasty,
						gender: that.formGender
					}
					that.$api('user.bindrole', data).then(res => {
						if (res.code === 1) {
							uni.reLaunch({
								url: '/pages/index/index'
							});
							// that.$u.route('/pages/index/index')
						} else {
							uni.reLaunch({
								url: '/pages/index/index'
							});
						}
						that.isClick = true;
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		width: 100%;
	}

	.container {
		flex: 1;
		height: 0;
		// background: #fff;
		border-radius: 25rpx;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		// padding: 50rpx 0rpx 160rpx 0rpx;

		.contentHead {
			text-align: center;
			display: flex;
			text-align: center;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			position: relative;
			padding-bottom: 50rpx;
			background: #fff;
			padding-top: 55rpx;
			border-top-left-radius: 25rpx;
			border-top-right-radius: 25rpx;
			border-bottom-left-radius: 5rpx;
			border-bottom-right-radius: 5rpx;

			.name {
				color: #5F5D5D;
				font-weight: bold;
				font-size: 56rpx;
			}

			.headDetails {
				margin-top: 10rpx;
				color: #808080;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

		.contentBody {
			padding-top: 10rpx;
			box-sizing: border-box;
			background: #fff;
			margin-top: -4px;
			padding-bottom: 160rpx;
			border-bottom-left-radius: 25rpx;
			border-bottom-right-radius: 25rpx;
			border-top-left-radius: 5rpx;
			border-top-right-radius: 5rpx;

			.types {
				display: flex;
				align-items: center;
				justify-content: center;
				color: #808080;
				font-size: 28rpx;

				.lable {
					width: 35rpx;
					height: 35rpx;
					margin-right: 6rpx;
				}
			}

			.contentText {
				padding: 40rpx 38rpx 0rpx 38rpx;
				color: #808080;
				font-size: 28rpx;
				position: relative;
				box-sizing: border-box;

				.more {
					position: absolute;
					bottom: -5rpx;
					right: 38rpx;
					background: #fff;
					padding-left: 20rpx;
					color: #FE4373;
				}
			}

			.tips {
				padding: 0rpx 30rpx;
				color: #999999;
			}
		}
	}

	.myScroll {}

	.dynastyBox {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.u-modal__content {
		padding: 0 !important;
	}

	.dynastyItem {
		margin-top: 20rpx;
		margin-right: 20rpx;
		width: calc(100% / 3 - 20rpx);
		border: 1px solid #CCCCCC;
		border-radius: 30rpx;
		box-sizing: border-box;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		font-size: 28rpx;
		color: #323232;
		white-space: nowrap;
		text-overflow: ellipsis;
		transition: all 0.3s;
	}

	.dynastyItemActive {
		background: #FE4373 !important;
		color: #fff !important;
		border: none !important;
	}

	.myScroll2 {
		max-height: 600rpx;
	}
</style>