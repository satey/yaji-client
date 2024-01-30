<template>
	<view class="mine">
		<view style="background: #f8f8f8;">
			<view class="portraitContainer">
				<block v-if="userInfo.length !=0">
					<block v-if="userInfo.profile_type==1">
						<image class="portraitBg"
							style="z-index: 3;position: absolute;top: 0;left: 50%;transform: translateX(-50%);"
							:src="userInfo.profile_url" mode="heightFix">
						</image>
						<image class="portraitBg" style="z-index: 2;position: relative;" :src="userInfo.profile_bg_url"
							mode="heightFix">
						</image>

					</block>
					<block v-else>
						<image class="portraitBg" :src="userInfo.bgimg_url" mode="aspectFill">
						</image>
					</block>
				</block>

				<image @click="$u.route('/pages/user/customized')" class="dingzhi" src="@/static/iconImage/dingzhi.png"
					mode=""></image>
			</view>
			<view class="userContainer">
				<view style="position: relative;">
					<block v-if="userInfo.length!=0">
						<image v-if="userInfo.is_change_avatar!=1"
							style="width: 153rpx;height: 50rpx;position: absolute;top: -60rpx;left: 0;"
							src="../../static/iconImage/huantouxiang.png" mode="widthFix"></image>
					</block>
					<view class="userImg">
						<image style="width: 100%;height: 100%;" @click="changeImage" :src="userImg" mode="aspectFill">
						</image>
					</view>
				</view>

				<view class="userBox">
					<view style="color: #333333;font-size: 36rpx;font-weight: bold;">
						{{userInfo.realname}}·{{userInfo.dynasty}}
					</view>
					<view style="color: #333333;font-size: 25rpx;">雅集号：{{userInfo.uid}}</view>
					<view style="display: flex;align-items: center;	">
						<view style="display: flex;align-items: center;" @click="$u.route('/pages/public/reputation')">
							<view class="reputation">名望：{{userInfo.total_mw}}
							</view>
							<i class="iconfont icon-wenhao"
								style="margin-left: 10rpx;margin-right: 30rpx;color: #FFA000;"></i>
						</view>
						<view class="achieve" @click="$u.route('/pages/mine/achieve')">{{userInfo.talent_glory}}</view>
					</view>
				</view>
			</view>
			<view class="nav">
				<view class="navItem" @click="$u.route('/pages/user/information')">
					<image src="../../static/iconImage/ziliao.png" style="width: 68rpx;height: 68rpx;" mode=""></image>
					<view style="color:#333 ;font-size: 30rpx;margin-top: 20rpx;">资料</view>
				</view>
				<view class="navItem" @click="$u.route('/pages/mine/gift')">
					<image src="../../static/iconImage/liwu.png" style="width: 68rpx;height: 68rpx;" mode=""></image>
					<view style="color:#333 ;font-size: 30rpx;margin-top: 20rpx;">物品</view>
				</view>
				<view class="navItem" @click="$u.route('/pages/mine/role')">
					<image src="../../static/iconImage/jiaose.png" style="width: 68rpx;height: 68rpx;" mode=""></image>
					<view style="color:#333 ;font-size: 30rpx;margin-top: 20rpx;">角色</view>
				</view>
				<view class="navItem" @click="$u.route('/pages/mine/wallet')">
					<image src="../../static/iconImage/qianbao.png" style="width: 68rpx;height: 68rpx;" mode=""></image>
					<view style="color:#333 ;font-size: 30rpx;margin-top: 20rpx;">钱包</view>
				</view>
			</view>
			<view style="padding:50rpx 30rpx 0rpx 30rpx;">
				<view class="menu">
					<view class="menuItem" @click="$u.route('/pages/mine/works')">动态作品</view>
					<view class="menuItem" @click="$u.route('/pages/mine/room')">我的房间</view>
					<view class="menuItem" @click="$u.route('/pages/mine/setting')">设置</view>
				</view>
			</view>

			<view class="userHome" @click="$u.route('/pages/user/home',{user_id:userInfo.id})">
				<text>个人主页预览</text>
				<i class="iconfont icon-right"></i>
			</view>
		</view>
		<feiqslsHit></feiqslsHit>
	</view>
</template>
<script>
	import permision from "@/js_sdk/wa-permission/permission.js"
	export default {
		name: 'mine',
		data() {
			return {
				userImg: '',
				userInfo: [],
				background_image: ""
			}
		},

		onLoad() {},
		onShow() {
			this.init()
			uni.showTabBar()
		},
		methods: {
			//初始化
			init() {
				let that = this;
				that.$api("user.info").then(res => {
					if (res.code == 1) {
						uni.setStorageSync("userInfo", res.data)
						if (res.data.background_image == null) {
							that.background_image = `../../static/userBg.png`;
						} else {
							that.background_image = res.data.background_image;
						}
						that.userInfo = res.data;
						that.userImg = res.data.avatar
					}
				})
			},
			//上传头像
			async changeImage() {
				this.upload()
			},
			//上传
			upload() {
				var that = this;
				uni.chooseImage({
					count: 1,
					sourceType: ['album'],
					sizeType: "",
					success(res) {
						var token = uni.getStorageSync("token");
						uni.showLoading()
						uni.uploadFile({
							url: uni.getStorageSync("hostData").host+"/api/hey/" + 'index/upload',
							filePath: res.tempFilePaths[0],
							name: 'file',
							formData: {
								"token": token
							},
							success: res => {
								var data = JSON.parse(res.data);
								if (data.code == 1) {
									that.$api("user.update_avatar", {
										avatar: data.data.fullurl
									}).then((resData) => {
										uni.hideLoading()
										if (resData.code == 1) {
											that.userInfo.is_change_avatar = 1;
											that.userImg = data.data.fullurl +
												'?imageMogr2/thumbnail/280x280';
											that.init()
										}
									})
								} else {
									uni.hideLoading()
								}
							},
							complete: e => {
								uni.hideLoading()
							}
						})
					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	page {
		background: #F8F8F8;
	}

	.dingzhi {
		width: 175rpx;
		height: 60rpx;
		position: absolute;
		right: 0rpx;
		bottom: 100rpx;
		z-index: 5;
	}

	.mine {
		background: #f7f7f7;
		height: 100vh;
	}

	.portraitContainer {
		width: 100vw;
		height: 678rpx;
		box-sizing: border-box;
		overflow: hidden;
		position: relative;

		.customized {
			position: absolute;
			right: 0;
			bottom: 85rpx;
			font-size: 30rpx;
			color: #FFA000;
			background: rgba(255, 255, 255, 0.3);
			display: flex;
			align-items: center;
			padding: 9rpx;
			border-top-left-radius: 36rpx;
			border-bottom-left-radius: 36rpx;
			z-index: 9;
		}

		.portraitBg {
			width: 100%;
			height: 100%;
		}
	}

	.userContainer {
		padding: 50rpx 30rpx;
		box-sizing: border-box;
		margin-top: -50rpx;
		position: relative;
		z-index: 9;
		background: #F8F8F8;
		border-top-left-radius: 23rpx;
		border-top-right-radius: 23rpx;
		display: flex;

		.userImg {
			width: 150rpx;
			height: 150rpx;
			border-radius: 50%;
			overflow: hidden;
		}

		.userBox {
			height: 150rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-left: 25rpx;

			.reputation {
				font-size: 25rpx;
				color: #333;
				position: relative;
				z-index: 11;

				&::after {
					content: " ";
					width: 100%;
					background: #8FFF00;
					height: 16rpx;
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
					z-index: -1;
				}
			}

			.achieve {
				font-size: 25rpx;
				color: #333;
				position: relative;
				z-index: 11;
				margin-right: 30rpx;

				&::after {
					content: " ";
					width: 100%;
					background: #FFA000;
					height: 16rpx;
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
					z-index: -1;
				}
			}
		}
	}

	.nav {
		padding: 30rpx 45rpx;
		box-sizing: border-box;
		background: #ffffff;
		margin: 0rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-radius: 25rpx;

		.navItem {
			text-align: center;
		}
	}

	.menu {
		box-sizing: border-box;
		background: #ffffff;
		border-radius: 25rpx;
		font-size: 28rpx;
		padding: 30rpx 45rpx;
		color: #000;

		.menuItem {
			padding-bottom: 28rpx;
			margin-top: 26rpx;
			border-bottom: 1px solid #F8F8F8;

			&:last-child {
				padding-bottom: 0;
				border-bottom: none;
			}

			&:first-child {
				margin-top: 0;
				padding-bottom: 28rpx;
				border-bottom: 1px solid #F8F8F8;
			}
		}
	}

	.userHome {
		font-size: 28rpx;
		text-align: center;
		color: #333;
		padding-top: 68rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #F8F8F8;
		padding-bottom: 50rpx;
	}
</style>