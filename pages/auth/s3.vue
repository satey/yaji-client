<template>
	<page-meta :root-font-size="'13px'"></page-meta>
	<view class="px-4" style="background: #F7F7F7;">

		<view style="padding-top: 100rpx;">
			<!-- <view style="font-size: 36rpx;color: #FFFFFF;">获得角色</view> -->
			<view
				style="padding: 28rpx 30rpx 102rpx 30rpx;display: flex;flex-direction: column;box-sizing: border-box;background: #fff;border-radius: 20rpx;">
				<view style="display: flex;align-items: center;justify-content: center;">
					<view style="position: relative;text-align: center;display: inline;margin: 0 auto;">
						<text
							style="color: #333;font-size:32rpx ;position: relative;z-index: 1;font-family: font-test !important;">获得角色</text>
						<text
							style="width: 100%;height: 13rpx;background: #FFA000;position: absolute;left: 0;bottom: 0;"></text>
					</view>
				</view>
				<view class="container">
					<view class="contentHead" style="display: flex;align-items: center;margin-bottom: 20rpx;">
						<view style="color: #333;font-size: 36rpx;margin-right: 25rpx;">{{ userRole.realname||"无名氏" }}
						</view>
						<view style="color:#666 ;font-size: 28rpx;">
							名望：<text style="color: #FFA000;">{{userRole.role_mw|| '无'}}</text></view>
					</view>
					<view class="contentBody">
						<view style="color:#666 ;font-size: 28rpx;">
							<text style="margin-right: 20rpx;">{{userRole.dynasty}}</text>
							<text>{{userRole.birthyear||'?'}}年-{{userRole.deathyear||'?'}}年</text>
						</view>
						<!-- <view class="types flex" style="display: flex;flex-wrap: wrap;align-items: center;">
							<view>{{userRole.gender == 1?'男':"女"}}</view>
							<view style="margin-left: 26rpx;">{{userRole.dynasty||"未知朝代"}}</view>
						</view> -->
						<view style="display: flex;align-items: center;margin-top: 50rpx;flex-wrap: wrap;">
							<block v-for="(item2,index2) in userRole.achievements.split(',')" :key="index2">
								<view
									style="width: 125rpx;height: 50rpx;border-radius: 50rpx;text-align: center;line-height: 50rpx;color: #333;font-size: 28rpx;border: 1px solid #FFA000;margin-right: 15rpx;">
									{{item2}}
								</view>
							</block>
						</view>
						<!-- <view>
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
						</view> -->
						<view class="contentText text-xl">{{ userRole.content || '暂无介绍' }} </view>

					</view>
				</view>
			</view>
			<view style="padding:0rpx 38rpx;margin-top: 60rpx;">
				<view class="btna"
					style="text-align: center;font-size: 28rpx;width: 100%; height: 85rpx;;line-height: 85rpx;color: #FFFFFF;border-radius: 50rpx;"
					@click="openIndex()">进入首页
				</view>
			</view>
			<view style="color: #666;font-size: 28rpx;text-align: center;margin-top: 50rpx;">进入之后还可以再次更换角色哦~</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				role: [],
				colors: ["red", "pink", "blue", "yellow", "#FFA000"],
				data: [],
				choose_num: '',
				isClick: true,
				userRole: []
			};
		},
		onLoad(e) {
			this.userRole = JSON.parse(e.role)
			this.setFontFamily();
			this.$api('user.info').then(res => {
				if (res.code == 1) {
					uni.setStorageSync("userInfo", res.data)
					getApp().globalData.initFun()
				}
			})
		},
		methods: {
			setFontFamily() {
				// #ifdef APP-PLUS
				uni.loadFontFace({
					family: 'font-test',
					// 本地字体路径需转换为平台绝对路径
					source: `url(${plus.io.convertLocalFileSystemURL('_www/static/AaHouDiHei.ttf')})`,
					success() {
						console.log('success')
					},
					fail(e) {
						console.log('fail')
					}
				})
				// #endif
			},
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
						getApp().globalData.initFun()
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
		background: #f7f7f7;
	}

	.container {
		flex: 1;
		height: 0;
		background: rgba(255, 221, 164, 0.40);
		border-radius: 25rpx;
		height: 669rpx;
		padding: 44rpx 28rpx;
		box-sizing: border-box;
		margin-top: 55rpx;

		.contentHead {
			display: flex;
			flex-direction: row;
			position: relative;
			border-top-left-radius: 25rpx;
			border-top-right-radius: 25rpx;
			border-bottom-left-radius: 5rpx;
			border-bottom-right-radius: 5rpx;


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
				color: #808080;
				font-size: 28rpx;
				position: relative;
				box-sizing: border-box;
				margin-top: 29rpx;

				.more {
					position: absolute;
					bottom: -5rpx;
					right: 38rpx;
					background: #fff;
					padding-left: 20rpx;
					color: #FFA000;
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
		background: #FFA000 !important;
		color: #fff !important;
		border: none !important;
	}

	.myScroll2 {
		max-height: 600rpx;
	}

	.btna {
		background-image: url(@/static/iconImage/btnBg2.png) !important;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-position: 100% 100%;
		width: 490rpx;
		margin: 0 auto;
	}
</style>