<template>
	<view>
		<view v-show="showSvga" id="svgaPlayer"
			style="z-index: 99999;box-sizing: border-box;position: fixed;top:0;left: 0;width: 100%;height: 100%;">
			<l-svga ref="svgaPlayer" style="width: 100%;height: 100%;box-sizing: border-box;"></l-svga>
		</view>
		<u-popup :show="userContainer" @close="userContainer = false" mode="bottom" :closeable="false" :round="20">
			<view class="container">
				<scroll-view scroll-y="true" class="giftBox">
					<view class="top">
						<view style="display: flex;align-items: center;">
							<image class="userImg" v-if="userProfile!=null" :src="userProfile.avatar" mode="aspectFill">
							</image>
							<view class="userBox">
								<view style="display: flex;align-items: center;">
									<text style="font-size: 32rpx;"
										v-if="userProfile!=null">{{userProfile.role_realname}}·{{userProfile.role_dynasty}}</text>
									<block v-if="userProfile!=null">
										<i class="iconfont icon-nan1" v-if="userProfile.role_info.gender_str=='男'"
											style="font-size: 26rpx;color: #00C2FF;margin: 0rpx 15rpx;"></i>
									</block>
									<block v-if="userProfile!=null">
										<i class="iconfont icon-nv" v-if="userProfile.role_info.gender_str=='女'"
											style="font-size: 26rpx;color: #FFA000;margin: 0rpx 15rpx;"></i>
									</block>

									<view style="position: relative;">
										<text style="position: relative;z-index: 9;color: #333;font-size: 23rpx;">名望：
											<text v-if="userProfile!=null">{{userProfile.total_mw}}</text>
										</text>
										<view class="line"></view>
									</view>
								</view>
								<view style="display: flex;align-items: center;" v-if="userProfile!=null">
									<block v-for="(item,index) in userProfile.role_info.identity" :key="index">
										<view class="labels">{{item}}</view>
									</block>
								</view>
							</view>
						</view>
						<view
							style="height: 122rpx;display: flex;flex-direction: column;justify-content: space-between;">
							<block v-if="userProfile!=null">
								<view class="topRightBtn" v-if="userProfile.is_follow ==0" @click="interest">
									<i class="iconfont icon-guanzhu" style="font-size: 28rpx;color: #FFFFFF;"></i>
									<text style="margin-left: 10rpx;font-size: 28rpx;">关注</text>
								</view>
							</block>
							<block v-if="userProfile!=null">
								<view class="topRightBtn"
									@click="$u.route('/pages/user/home',{user_id:userProfile.user_id})">
									<i class="iconfont icon-gerenzhuyeshezhi"
										style="font-size: 28rpx;color: #FFFFFF;"></i>
									<text style="margin-left: 10rpx;font-size: 28rpx;">主页</text>
								</view>
							</block>
						</view>
					</view>
					<view style="color: #333;font-size: 30rpx;margin-top: 50rpx;">送Ta礼物</view>
					<view class="giftList">
						<block v-for="(item,index) in giftList" :key="index">
							<view class="giftItem" @click="giftCurrentIndex =index"
								:class="giftCurrentIndex == index?'giftItemActive':''" v-if="item.status=='normal'">
								<view>
									<image :src="item.image" style="width: 140rpx;height: 140rpx;" mode="aspectFill">
									</image>
								</view>
								<view style="color:#323232;font-size: 23rpx;">{{item.title}}</view>
								<view>
									<image src="../../static/qian.png" style="width:20rpx ;height: 20rpx;" mode="">
									</image>
									<text
										style="color:#808080;font-size: 20rpx;margin-left: 5rpx;">{{item.price}}</text>
								</view>
							</view>
						</block>
					</view>
					<view class="giftFooter" style="display: flex;align-items: center;">
						<view @click="$u.route('/pages/mine/recharge')">
							<text style="color:#FF8000 ;font-size: 23rpx;">限时优惠，去充值</text>
							<i class="iconfont icon-right" style="color: #FF8000;font-size: 28rpx;"></i>
						</view>
						<view style="display: flex;align-items: center;">
							<image src="../../static/qian.png" style="width: 38rpx;height:38rpx;margin-right: 10rpx ;"
								mode=""></image>
							<view class="giftNum" style="margin-right: 30rpx ;">余额{{userInfo.money}}</view>
							<view class="sendGiftBtn" @click="sendGift">赠送</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userContainer: false,
				giftList: [],
				giftCurrentIndex: -1,
				showSvga: false,
				userInfo: [],
				sendId: '',
				userProfile: null,
				room_id: ""
			}
		},
		created() {
			this.getGiftList()
			this.getUserInfo()
		},
		methods: {
			show(id, roomId) {
				console.log(id)
				if (roomId == undefined) {
					this.room_id = ''
				} else {
					this.room_id = roomId;
				}
				this.sendId = id;
				this.userContainer = true;
				this.$api('user.index', {
					user_id: id
				}).then(res => {
					console.log(res)
					if (res.code == 1) {
						this.userProfile = res.data;
					}
				})
			},
			//用户信息
			getUserInfo() {
				var that = this;
				that.$api("user.info").then(res => {
					if (res.code == 1) {
						that.userInfo = res.data;
					}
				})
			},
			//获取礼物列表
			getGiftList() {
				var that = this;
				that.$api('gift.lists').then(res => {
					if (res.code === 1) {
						that.giftList = res.data;
					}
				})
			},
			//关注
			interest() {
				var that = this;
				that.$api('user_follow.follow', {
					user_id: that.sendId
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							icon: "none",
							title: "关注成功"
						})
						that.userProfile.is_follow = 1;
					}
				})
			},
			//送礼物
			sendGift() {
				var that = this;
				var url = ''
				var parment = {}
				console.log(that.room_id)
				if (that.room_id != '') {
					url = "gift.giveGift2";
					parment = {
						"to_user_id": [that.sendId],
						"gift_id": that.giftList[that.giftCurrentIndex].id,
						"room_id": that.room_id
					}
				} else {
					url = "gift.giveGift";
					parment = {
						"receiver_user_id": that.sendId,
						"nums": 1,
						"gift_id": that.giftList[that.giftCurrentIndex].id,
					}
				}
				that.$api(url, parment).then(data => {
					if (data.code == 1) {
						that.getUserInfo()
						if (that.room_id == '') {
							that.showSvga = true;
							that.$refs.svgaPlayer.render(async (parser, player) => {
								let videoItem = await parser.load(item.url);
								await player.setVideoItem(videoItem)
								player.loops = 1;
								player.setContentMode(item.is_full_screen == 1 ?
									"AspectFill" :
									"AspectFit")
								player.startAnimation();
								player.onFinished(() => {
									that.showSvga = false
								})
							})
						}
					} else if (data.code == 3001) {
						that.userContainer = false;
						uni.showToast({
							icon: "none",
							title: data.msg,
						})
					} else if (data.code == 2001) {
						that.userContainer = false;
						uni.showToast({
							icon: "none",
							title: data.msg,
						})
					} else if (data.code == 0) {
						that.userContainer = false;
						uni.showToast({
							icon: "none",
							title: data.msg,
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100vw;
		height: 830rpx;
		background: #fff;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		// padding: 50rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		overflow: hidden;

		.top {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30rpx 0rpx 0;
			box-sizing: border-box;

			.topRightBtn {
				border-radius: 10rpx;
				width: 125rpx;
				height: 46rpx;
				background: #FFA000;
				text-align: center;
				line-height: 46rpx;
				font-size: 26rpx;
				color: #fff;
			}

			.userImg {
				width: 122rpx;
				height: 122rpx;
				border-radius: 50%;
			}

			.userBox {
				margin-left: 16rpx;
				display: flex;
				flex-direction: column;
				height: 122rpx;
				justify-content: space-around;

				.line {
					height: 16rpx;
					width: 100%;
					background: #8FFF00;
					position: absolute;
					top: 50%;
					left: 0;
					margin-top: -8rpx;
				}

				.labels {
					margin-right: 16rpx;
					padding: 5rpx 16rpx;
					border: 1px solid #FFA000;
					border-radius: 50rpx;
					font-size: 23rpx;
					color: #333;
				}
			}
		}



		.giftBox {
			flex: 1;
			height: 0;
			padding: 35rpx 0rpx 35rpx 30rpx;
			box-sizing: border-box;
			position: relative;

			.giftFooter {
				height: 125rpx;
				background-image: url(@/static/iconImage/mao.png);
				background-position: 100% 100%;
				background-repeat: no-repeat;
				background-size: 100% 100%;
				position: fixed;
				left: 0;
				right: 0;
				bottom: 33rpx;
				display: flex;
				padding: 0rpx 35rpx;
				box-sizing: border-box;
				align-items: flex-end;
				justify-content: space-between;

				.giftNum {
					// padding: 10rpx 30rpx;
					// background: #FFEAC7;
					// border-radius: 50rpx;
					// text-align: center;
					color: #FFA000;
					font-size: 23rpx;
				}

				.sendGiftBtn {
					width: 140rpx;
					height: 66rpx;
					text-align: center;
					line-height: 66rpx;
					color: #fff;
					background: #FFA000;
					border-radius: 50rpx;
					font-size: 30rpx;
					font-weight: bold;
				}
			}

			.giftList {
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				margin-top: 23rpx;
				padding-bottom: 200rpx;
				margin-right: 35rpx;

				.giftItem {
					width: calc(100% / 4);
					height: 223rpx;
					border-radius: 12rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					border: 1px solid transparent;
					box-sizing: border-box;
				}

				.giftItemActive {
					background: #FFEAC7;
					border: 1px solid #FFA000;
					box-sizing: border-box;
				}
			}

			.giftUserContainer {
				width: 50%;
				height: 151rpx;
				border-radius: 20rpx;
				border: 2px solid #B9B9B9;

				&:first-child {
					margin-right: 40rpx;
				}

				.giftUserBox {
					display: flex;
					align-items: center;
					padding: 0rpx 16rpx;
					box-sizing: border-box;

					.line {
						background: #FFA000;
						height: 15rpx;
						width: 100%;
						position: absolute;
						top: 50%;
						left: 0;
						margin-top: -7.5rpx;
					}
				}
			}

			.giftUserContainerActive {
				border: 2px solid #FFA000;
			}
		}
	}

	.giftContainer {
		height: 776rpx;
		background: #fff;
		display: flex;
		flex-direction: column;
		border-radius: 20rpx 20rpx;
		overflow: hidden;

	}
</style>